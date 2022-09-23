import React from 'react';
import { useRef } from "react";
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
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
          <RemovableCard key={card.text ? card.text : card} card={card} onRemovableCardPress={handleRemovableCardPress}></RemovableCard>);
    } else {
        alert('none!')
        return null;
    }
  };

  function openAddTextModal() {
    setIsModalVisible(true);
  }

  function viewExamples() {
    // TEST CODE
    navigation.navigate('VisionBuilder');
  }

  function handleSaveText(newInput) {
    setMyVisionCards(rest => [...rest, {
      text: newInput
    }]);
    setIsModalVisible(false);
  }

  // confirm delete card
  function handleRemovableCardPress(card) {
    //TEST code
    let text = "Are you sure you want to delete this card?";
    if(confirm(text) == true) {
      handleRemovableCardPress(card);
    } else {
      return;
    }
  }

  function handleRemovableCardPress(card) {
    const updatedCards = myVisionCards.filter(visionCard => {
      return visionCard !== card;
    });
    setMyVisionCards(updatedCards.length ? updatedCards : []);
  }

  if(!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={Styles.container}>
        {isModalVisible && <AddTextModal onSave={handleSaveText} />}
        
        {!isModalVisible && <View>
            <View style={Styles.displayFlex}>
              {<Pressable
                  style={[Styles.buttonSmall, Styles.flexOne]}
                  disabled={myVisionCards.length === 0}
                  onPress={() => navigation.navigate('VisionView', {myVisionCards})}>
                    <Text style={[Styles.buttonSmallText, {fontFamily: 'Poppins_500Medium'}]}>Preview</Text>
              </Pressable>}
            </View>

          <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>My vision</Text>
          
          <ScrollView contentContainerStyle={[Styles.leftAligned, Styles.scrollView]} showsVerticalScrollIndicator={false}>
              <Pressable
                  style={Styles.Card}
                  onPress={() => refRBSheet.current.open()}>
                    <Text style={[Styles.CardText, {fontFamily: 'Poppins_500Medium'}]}><Ionicons name='add' size={32} /></Text>
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
                    <Text style={[Styles.bottomDrawerHeader, , {fontFamily: 'Poppins_600SemiBold'}]}>New pin</Text>
                    
                    <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={pickImage}><Ionicons name='camera' size={20} />  Upload photo</Text>
                    
                    <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={openAddTextModal}><Ionicons name='pencil' size={20} />  Write text</Text>

                    <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]} onPress={openAddTextModal}><Ionicons name='search' size={20} />  Examples</Text>
                  </View>
                </RBSheet>
              
              <ListItems selectedCards={route.params.selectedCards} />
            </ScrollView>
          </View>}
      </SafeAreaView>
    );
    }
  };
  
  export default VisionCustomizer;