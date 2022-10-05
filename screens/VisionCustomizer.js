import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";
import RemovableCard from '../components/RemovableCard.js';
import AddTextModal from '../components/AddTextModal.js';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import { getAuth, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { initializeApp, getApp } from 'firebase/app';
import { getStorage, getDownloadURL, uploadBytes } from "firebase/storage";

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

  const app = getApp();
  const auth = getAuth(app);
  const db = getDatabase();
  const storage = getStorage();

  let [myVisionCards, setMyVisionCards] = useState([]);

  useEffect(() => {
      const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
      onValue(cardsRef, (snapshot) => {
          const cards = snapshot.val();
          let cardsArr = [];
          for (var key in cards) {
              cardsArr.push(cards[key])
          }
          setMyVisionCards(cardsArr);
      });
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const refRBSheet = useRef(); // bottom drawer
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!file.cancelled) {
      setImage(file.uri);
      setMyVisionCards(rest => [...rest, file]);
    }

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // FIX: properly upload image to firebase
    const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/');
    const addedCard = push(cardsRef, card); // FIX
    const uid = addedCard.key;
    update(addedCard, { id: uid });
    // const newCard = {
    //   'text': card.text,
    //   'type': card.type,
    //   'id': uid
    // };        

    const card = {
      type: 'image',
      uri: file.uri,
      id: uid
    }

    uploadImageAsync(file.uri);
  }

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await getDownloadURL(fileRef);
  }

  function openAddTextModal() {
    setIsModalVisible(true);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleSaveText(newInput) {
    setIsModalVisible(false);

    let newCards = [];
    const card = {
      text: newInput,
      type: 'text'
    };
    const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    const addedCard = push(cardsRef, card);
    const uid = addedCard.key;
    update(addedCard, { id: uid });
    newCards.push({
      'text': card.text,
      'type': card.type,
      'id': uid
    });
    setMyVisionCards(rest => [...rest, newCards]);
  }

  function confirmRemovableCardPress(card) {
    // FIX: add confirmation
    const cardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/' + card.id);
    const updatedCards = myVisionCards.filter(selectedCard =>
      selectedCard.text !== card.text);
    setMyVisionCards(updatedCards);
    remove(cardRef);
  }

  const firstCard = myVisionCards[0];

  const ListItem = ({ item, onPress, isSelected, backgroundColor, textColor }) => {
    const isFirstCard = firstCard.text === item.text;

    return(
      <>
        {isFirstCard &&
          <>
            <Pressable
              style={[Styles.Card, {borderWidth: 1, borderColor: 'black', backgroundColor: 'transparent'}]}
              onPress={() => refRBSheet.current.open()}>
                <Text style={Styles.CardText}><Ionicons name='add' size={32} /></Text>
            </Pressable>

            <RemovableCard
              key={item.text ? item.text : item}
              card={item}
              onRemovableCardPress={item => confirmRemovableCardPress(item)} />
          </>}

        {!isFirstCard &&
          <RemovableCard
            key={item.text ? item.text : item}
            card={item}
            onRemovableCardPress={item => confirmRemovableCardPress(item)} />}
      </>
    )
  }

  function clickExamples() {
    refRBSheet.current.close();
    navigation.navigate('VisionBuilder', {myVisionCards});
  }

  const renderItem = ({ item }) => {
    return (
      <ListItem item={item} />
    )
  }

  return (
    <View style={[Styles.containerWithoutHeader, {flex: 1}]}>
      {isModalVisible &&
        <AddTextModal onSave={handleSaveText} onCancel={handleCancel} />}
      
      {!isModalVisible &&
        <>
          <View style={[Styles.customHeader, {marginBottom: 30}]}>
            <Pressable
                style={[Styles.textAlignRight, Styles.flexOne]}
                onPress={() => navigation.navigate('VisionBuilder', {myVisionCards})}>
                    <Ionicons name='arrow-back-outline' size={24} />
            </Pressable>

            <Pressable
                style={[Styles.button, Styles.buttonSmall]}
                disabled={myVisionCards.length === 0}
                onPress={() => navigation.navigate('PreviewTiles', {previousScreen: 'VisionViewCustomizer'})}>
                  <Text style={Styles.buttonSmallText}>Preview</Text>
            </Pressable>
          </View>

          <View style={Styles.containerPadding}>
            <Text style={[Styles.heading1, {marginBottom: 30, fontFamily: 'Poppins_600SemiBold'}]}>My vision</Text>
            
            <SafeAreaView
              style={{height: '85%'}}
              showsVerticalScrollIndicator={false}>
              <FlatList
                  data={myVisionCards}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  />
            </SafeAreaView>

            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={false}
              customStyles={{
                wrapper: {
                  backgroundColor: 'transparent'
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