import React from 'react';
import { useRef } from "react";
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Styles from "../style.js";
import RemovableCard from '../components/RemovableCard.js';
import AddTextModal from '../components/AddTextModal.js';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function VisionCustomizer({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myVisionCards, setMyVisionCards] = useState(route.params.selectedCards);
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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setMyVisionCards(rest => [...rest, result]);
    }
  };

  const ListItems = (props) => {
    if(myVisionCards.length) {
      console.log('myVisionCards', myVisionCards);
      
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
    navigation.navigate('VisionBuilder');
  }

  function handleSaveText(newInput) {
    setMyVisionCards(rest => [...rest, {
      text: newInput
    }]);
    setIsModalVisible(false);
  }

  function confirmRemovableCardPress(card) {
    // add confirmation
    const updatedCards = myVisionCards.filter(visionCard => {
      return visionCard !== card;
    });
    setMyVisionCards(updatedCards.length ? updatedCards : []);
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
                  onPress={() => navigation.goBack()}>
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

                      <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={() => navigation.navigate('VisionBuilder')}><Ionicons name='search' size={20} />  Examples</Text>
                    </View>
                  </RBSheet>
                
                <ListItems selectedCards={route.params.selectedCards} />
              </ScrollView>
            </View>
          </View>}
      </View>
    );
    }
  };
  
  export default VisionCustomizer;