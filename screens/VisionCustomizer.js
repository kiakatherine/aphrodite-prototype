import React from 'react';
import { useRef } from "react";
import { useState } from 'react';
import { Pressable, View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Styles from "../style.js";
import RemovableCard from '../components/RemovableCard.js';
import AddTextModal from '../components/AddTextModal.js';
import RBSheet from "react-native-raw-bottom-sheet";

function VisionCustomizer({ navigation, route }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myVisionCards, setMyVisionCards] = useState(route.params.selectedCards);
  const refRBSheet = useRef(); // bottom drawer

  const ListItems = (props) => {
    console.log('myVisionCards', myVisionCards);
    if(myVisionCards.length) {
      console.log('myVisionCards', myVisionCards);
      return myVisionCards.map(card => 
          <RemovableCard key={card.text} card={card} onRemovableCardPress={handleRemovableCardPress}></RemovableCard>);
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
                    <Text style={Styles.bottomDrawerText}>Upload photo</Text>
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