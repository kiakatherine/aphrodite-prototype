import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import Styles from "../style.js";
import RemovableCard from '../components/RemovableCard.js';
import AddTextModal from '../components/AddTextModal.js';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, put, update } from 'firebase/database';
import { getAuth, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { initializeApp, getApp } from 'firebase/app';
import { deleteObject, getStorage, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import {app, auth, db, storage } from '../firebase.js';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function VisionCustomizer({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  let [myVisionCards, setMyVisionCards] = useState([]);
  let [selectedCard, setSelectedCard] = useState(null);
  let [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    // don't re-render when making changes to individual cards
    let isMounted = true;    
    
    if(isMounted) {
      const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
      return onValue(cardsRef, (snapshot) => {
          const cards = snapshot.val();
          let cardsArr = [];
          for (var key in cards) {
              cardsArr.push(cards[key])
          }
          setMyVisionCards(cardsArr);
      });
    }
    return () => { isMounted = false };
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const refRBSheet = useRef(); // bottom drawer
  const [image, setImage] = useState(null);

  const handleImagePicked = async(pickerResult) => {
    try {
      if (!pickerResult.cancelled) {
        return await uploadImageAsync(pickerResult.uri);
      }
    } catch (err) {
      alert('handleImagePicked:' + err);
    }
  }

  const pickImage = async () => {
    let reachedMaxPhotos = myVisionCards.filter(card => {return card.type === 'image'}).length === 15;
    
    if(reachedMaxPhotos) {
      alert('You have reached the maximum number of 15 photos.');
      refRBSheet.current.close();
    } else {
      // if (Platform.OS !== "web") {
      const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!status.granted) {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      // }
      // No permissions request is necessary for launching the image library
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 4],
        // quality: 1,
      });

      if (!pickerResult.cancelled) {
        setImage(pickerResult.uri);
        setMyVisionCards(rest => [...rest, pickerResult]);
      }

      // alert(pickerResult.uri);
      
      console.log('pickerResult', pickerResult);
      handleImagePicked(pickerResult);
    }
  }

  async function uploadImageAsync(uri) {
    const response = await fetch(uri).catch(err => alert('fetch:' + err));
    const blob = await response.blob().catch(err => alert('blob:' + err));

    // upload reference in the database
    const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    
    // problem is prob here: card not getting pushed to db and not catching error; threading
    const newCard = push(cardsRef, {
      name: blob.data.name,
      type: 'image',
      blob,
      dateAdded: Date.now()
    }).catch(err => alert('push:' + err));

    const uid = newCard.key;
    const imageRef = sRef(storage, `images/${auth.currentUser.uid}/${blob.data.name}`);

    return await update(newCard, {id: uid}).catch(err => {
      alert('update:' + err);
    }).then(resp => {
      // upload file to storage
      return uploadBytes(imageRef, blob);
    }, err => {
      alert('uploadBytes:' + err);
    }).then(resp => {
      return getDownloadURL(imageRef);
    }, err => {
      alert('getDownloadURL:' + err);
    }).then(uri => {
      if(uri == null) {
        alert('uri null' + uri);
      } else {
        alert('uri:' + uri);
        return update(newCard, {uri});
      }
    }, err => {
      alert('update:' + err);
    }).finally(() => {
      // We're done with the blob, close and release it
      blob.close();
      refRBSheet.current.close();
    });
  }

  function openAddTextModal() {
    setIsModalVisible(true);
    refRBSheet.current.close();
  }

  function handleCancel() {
    setIsModalVisible(false);
    setSelectedCard(null);
  }

  function handleSaveText(card, newInput) {
    setIsModalVisible(false);

    if(card) {
      const cardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/' + card.id);
      update(cardRef, {text: newInput});
    } else {
      const newCard = {
        text: newInput,
        type: 'text'
      };
      const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
      const addedCard = push(cardsRef, newCard);
      const uid = addedCard.key;
      update(addedCard, { id: uid });
    }
  }

  function confirmRemovableCardPress(card) {
    // FIX: add confirmation

    // delete from database
    const cardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/' + card.id);
    remove(cardRef);

    // delete from storage
    deleteObject(sRef(storage, `images/${auth.currentUser.uid}/${card.name}`));
  }

  function clickCardToEdit(card) {
    if(card.type === 'image') {
      return;
    }

    if(card) {
      setSelectedCard(card);
      setIsModalVisible(true);
    }
  }

  const ListItems = (props) => {
    if(myVisionCards.length) {      
      return (
        <>
          <Pressable
            style={[Styles.Card, {borderWidth: 1, borderColor: 'black', backgroundColor: 'transparent'}]}
            onPress={() => refRBSheet.current.open()}>
              <Text style={{ color: '#4F505A', textAlign: 'center' }}><Ionicons name='add' size={44} /></Text>
          </Pressable>
          {myVisionCards.map(card => 
            <RemovableCard key={card.id} card={card} onCardPress={card => clickCardToEdit(card)} onRemoveCard={card => confirmRemovableCardPress(card)}></RemovableCard>)}
        </>)
    } else {
      return (
        <Pressable
          style={[Styles.Card, {borderWidth: 1, borderColor: 'black', backgroundColor: 'transparent'}]}
          onPress={() => refRBSheet.current.open()}>
            <Text style={Styles.textAlignCenter}><Ionicons name='add' size={44} /></Text>
        </Pressable>);
    }
  };

  function clickExamples() {
    refRBSheet.current.close();
    navigation.navigate('VisionBuilder', {myVisionCards});
  }

  return (
    <View style={[Styles.containerWithoutHeader, Styles.lightBackground, {flex: 1}]}>
      {isModalVisible &&
        <AddTextModal card={selectedCard ? selectedCard : null} value={selectedCard ? selectedCard.text : null} onSave={handleSaveText} onCancel={handleCancel} />}
      
      {!isModalVisible &&
        <>
          <View style={[Styles.customHeader, {borderBottomColor: '#C3C4CE', marginBottom: 30}]}>
            <Pressable
                style={[Styles.textAlignRight, Styles.flexOne]}
                onPress={() => navigation.goBack()}>
                    <Ionicons name='close-outline' size={32} />
            </Pressable>

            <Pressable
                style={[Styles.button, Styles.buttonSmall]}
                // disabled={myVisionCards.length === 0}
                onPress={() => navigation.navigate("Sending", {text: 'Saving', isSavingText: true})}>
                  <Text style={[Styles.buttonSmallText, {fontFamily: 'Poppins_600SemiBold'}]}>Save</Text>
            </Pressable>
          </View>

          <View style={Styles.containerPadding}>            
            <ScrollView
              style={{height: '90%'}}
              showsVerticalScrollIndicator={false}>
                {/* <Text style={[Styles.heading1, Styles.textAlignCenter, {marginTop: 10, marginBottom: 15, fontFamily: 'Poppins_600SemiBold'}]}>Relationship Vision</Text>
                <Text style={[Styles.heading2, Styles.textAlignCenter, {marginBottom: 30, fontFamily: 'Poppins_500Medium'}]}>Feel the feelings of this being true</Text> */}
                {/* <Text>{alertMessage}</Text> */}
                <ScrollView contentContainerStyle={[Styles.twoColumnLayout, {justifyContent: 'space-between', marginTop: 10}]}>
                  <ListItems selectedCards={myVisionCards} />
                </ScrollView>
            </ScrollView>

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={290}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0, 0, 0, 0.6)'
                },
                draggableIcon: {
                  backgroundColor: '#000'
                }
              }}>
                <View style={Styles.bottomDrawer}>
                  <View style={Styles.displayFlex}>
                    <Text style={[Styles.bottomDrawerHeader, Styles.flexOne, {fontFamily: 'Poppins_600SemiBold'}]}>New pin</Text>
                    <Pressable
                      style={[Styles.topRightCloseButton, {position: 'absolute', top: -5, right: 0}]}
                      onPress={() => refRBSheet.current.close()}>
                          <Ionicons name="close-outline" size={48}></Ionicons>
                    </Pressable>
                  </View>
                    
                  <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={pickImage}><Ionicons name='camera' size={20} />  Upload photo</Text>
                  
                  <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={openAddTextModal}><Ionicons name='create-outline' size={20} />  Write text</Text>

                  <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={clickExamples}><Ionicons name='search' size={20} />  Library</Text>
                </View>
              </RBSheet>
          </View>
        </>}
    </View>
  );
}
  
export default VisionCustomizer;