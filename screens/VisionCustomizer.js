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
import { deleteObject, getStorage, getDownloadURL, uploadBytes } from "firebase/storage";
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

  const uploadImage = async(uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    // upload reference in the database
    const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    const newCard = push(cardsRef, {
      name: blob.data.name,
      type: 'image',
      blob,
      dateAdded: Date.now()
    });
    const uid = newCard.key;
    update(newCard, {id: uid});

    // upload file to storage
    const imageRef = sRef(storage, `images/${auth.currentUser.uid}/${blob.data.name}`);
    uploadBytes(imageRef, blob).then((snapshot) => {
      // alert('Uploaded photo!');
      getDownloadURL(sRef(storage, `images/${auth.currentUser.uid}/${blob.data.name}`))
        .then(uri => {
          update(newCard, {uri})
        })
        .catch(err => {
          alert('uh oh!', err);
          setAlertMessage(err);
        });
    }).catch(err => {
      alert('yikes!', err);
      setAlertMessage(err);
    });

    refRBSheet.current.close();
    
    // const updatedCard = {
    //   'type': 'image',
    //   'id': uid,
    //   'image': blob
    // }

    // setMyVisionCards(rest => [...rest, updatedCard]);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!file.cancelled) {
      setImage(file.uri);
      setMyVisionCards(rest => [...rest, file]);
    }

    uploadImage(file.uri);     
  }

  function openAddTextModal() {
    setIsModalVisible(true);
    refRBSheet.current.close();
  }

  function handleCancel() {
    setIsModalVisible(false);
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
              <Text style={{ color: '#4F505A' }}><Ionicons name='add' size={44} /></Text>
          </Pressable>
          {myVisionCards.map(card => 
            <RemovableCard card={card} onCardPress={card => clickCardToEdit(card)} onRemoveCard={card => confirmRemovableCardPress(card)}></RemovableCard>)}
        </>)
    } else {
      return (
        <Pressable
          style={[Styles.Card, {borderWidth: 1, borderColor: 'black', backgroundColor: 'transparent'}]}
          onPress={() => refRBSheet.current.open()}>
            <Text style={Styles.CardText}><Ionicons name='add' size={32} /></Text>
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
        <AddTextModal card={selectedCard} value={selectedCard.text} onSave={handleSaveText} onCancel={handleCancel} />}
      
      {!isModalVisible &&
        <>
          <View style={[Styles.customHeader, {marginBottom: 30}]}>
            <Pressable
                style={[Styles.textAlignRight, Styles.flexOne]}
                onPress={() => navigation.navigate('VisionBuilder', {myVisionCards})}>
                    <Ionicons name='close-outline' size={32} />
            </Pressable>

            <Pressable
                style={[Styles.button, Styles.buttonSmall]}
                disabled={myVisionCards.length === 0}
                onPress={() => navigation.navigate("Sending")}>
                  <Text style={[Styles.buttonSmallText, {fontFamily: 'Poppins_600SemiBold'}]}>Save</Text>
            </Pressable>
          </View>

          <View style={Styles.containerPadding}>            
            <ScrollView
              style={{height: '90%'}}
              showsVerticalScrollIndicator={false}>
                <Text style={[Styles.heading1, Styles.textAlignCenter, {marginTop: 10, marginBottom: 15, fontFamily: 'Poppins_600SemiBold'}]}>Relationship Vision</Text>
                <Text style={[Styles.heading2, Styles.textAlignCenter, {marginBottom: 30, fontFamily: 'Poppins_500Medium'}]}>Feel the feelings of this being true</Text>
                {/* <Text>{alertMessage}</Text> */}
                <View style={Styles.twoColumnLayout}>
                  <ListItems selectedCards={myVisionCards} />
                </View>
            </ScrollView>

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
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

                  <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={clickExamples}><Ionicons name='search' size={20} />  Examples</Text>
                </View>
              </RBSheet>
          </View>
        </>}
    </View>
  );
}
  
export default VisionCustomizer;