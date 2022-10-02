import React, { useState, useEffect, useRef } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Styles from "../style.js";
import RemovableCard from '../components/RemovableCard.js';
import AddTextModal from '../components/AddTextModal.js';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import { getAuth, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { initializeApp, getApp } from 'firebase/app';

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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setMyVisionCards(rest => [...rest, result]);
    }
  };

  const ListItems = (props) => {
    if(myVisionCards.length) {      
      return myVisionCards.map(card => 
          <RemovableCard key={card.text ? card.text : card} card={card} onRemovableCardPress={card => confirmRemovableCardPress(card)}></RemovableCard>);
    } else {
        alert('none!')
        return null;
    }
  };

  function openAddTextModal() {
    setIsModalVisible(true);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function viewExamples() {
    navigation.navigate('VisionBuilder', {myVisionCards});
  }

  function handleSaveText(newInput) {
    setMyVisionCards(rest => [...rest, {
      text: newInput
    }]);
    setIsModalVisible(false);
  }

  function confirmRemovableCardPress(card) {
    // FIX: add confirmation
    const cardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/' + card.id);
    const updatedCards = myVisionCards.filter(selectedCard =>
    selectedCard.text !== card.text);
    setMyVisionCards(updatedCards);
    remove(cardRef);
  }

  if(!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={Styles.containerWithoutHeader}>
        {isModalVisible && <AddTextModal onSave={handleSaveText} onCancel={handleCancel} />}
        
        {!isModalVisible && <View>
            <View style={[Styles.customHeader, {marginBottom: 30}]}>
              <Pressable
                  style={[Styles.textAlignRight, Styles.flexOne]}
                  onPress={() => navigation.navigate('VisionBuilder', {myVisionCards})}>
                      <Ionicons name='arrow-back-outline' size={24} />
              </Pressable>

              <Pressable
                  style={Styles.buttonSmall}
                  disabled={myVisionCards.length === 0}
                  onPress={() => navigation.navigate('VisionViewTiles', {myVisionCards})}>
                    <Text style={[Styles.buttonSmallText, {fontFamily: 'Poppins_500Medium'}]}>Preview</Text>
              </Pressable>
            </View>

          <View style={Styles.containerPadding}>

            <Text style={[Styles.heading1, {marginBottom: 30, fontFamily: 'Poppins_600SemiBold'}]}>My vision</Text>
            
            <ScrollView contentContainerStyle={[Styles.leftAligned, Styles.scrollView]} showsVerticalScrollIndicator={false}>
                <Pressable
                    style={[Styles.Card, {borderWidth: 1, borderColor: 'black', backgroundColor: 'transparent'}]}
                    onPress={() => refRBSheet.current.open()}>
                      <Text style={Styles.CardText}><Ionicons name='add' size={32} /></Text>
                </Pressable>
                
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

                      <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={() => navigation.navigate('VisionBuilder', {myVisionCards})}><Ionicons name='search' size={20} />  Examples</Text>
                    </View>
                  </RBSheet>
                
                <ListItems selectedCards={myVisionCards} />
              </ScrollView>
            </View>
          </View>}
      </View>
    );
    }
  };
  
  export default VisionCustomizer;