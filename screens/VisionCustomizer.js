import React from 'react';
import { useRef } from "react";
import { useState } from 'react';
import { Image, Pressable, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Styles from "../style.js";
import RemovableCard from '../components/RemovableCard.js';
import AddTextModal from '../components/AddTextModal.js';
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';

function VisionCustomizer({ navigation, route }) {
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

  function handleSaveText(newInput) {
    setMyVisionCards(rest => [...rest, {
      text: newInput
    }]);
    setIsModalVisible(false);
  }

  function handleRemovableCardPress(card) {
    const updatedCards = myVisionCards.filter(visionCard => {
      return visionCard !== card;
    });
    setMyVisionCards(updatedCards.length ? updatedCards : []);
  }

    return (
      <SafeAreaView style={Styles.container}>
        {isModalVisible && <AddTextModal onSave={handleSaveText} />}
        
        {!isModalVisible && <View>
          <Text style={Styles.heading1}>My vision</Text>
          <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
              <Pressable
                  style={Styles.Card}
                  onPress={() => refRBSheet.current.open()}>
                    <Text style={Styles.CardText}>+</Text>
              </Pressable>
              
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  wrapper: {
                    backgroundColor: "transparent"
                  },
                  draggableIcon: {
                    backgroundColor: "#000"
                  }
                }}>
                  <View style={Styles.bottomDrawer}>
                    <Text style={Styles.bottomDrawerHeader}>New pin</Text>
                    <Text style={Styles.bottomDrawerText} onPress={pickImage}>Upload photo</Text>
                    <Text style={Styles.bottomDrawerText} onPress={openAddTextModal}>Write text</Text>
                    <Text style={Styles.bottomDrawerText}>Examples</Text>
                  </View>
                </RBSheet>
              
              <ListItems selectedCards={route.params.selectedCards} />
              
              <TouchableOpacity
                  style={Styles.button}
                  onPress={() => navigation.navigate("VisionView", {myVisionCards})}>
                    <Text style={Styles.buttonText}>Preview</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>}
      </SafeAreaView>
    );
  };
  
  export default VisionCustomizer;