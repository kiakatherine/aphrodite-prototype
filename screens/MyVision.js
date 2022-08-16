import React, { Component } from 'react';
import { useRef } from "react";
import { useState, useEffect } from 'react';
import { Button, Pressable, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';
import AddTextModal from '../components/AddTextModal.js';
import RBSheet from "react-native-raw-bottom-sheet";

function MyVision({ route }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [myVisionCards, setMyVisionCards] = useState(route.params.selectedCards);
  const [userInputs, setUserInputs] = useState([]);
  const refRBSheet = useRef();

  const ListItems = (props) => {
    if(myVisionCards.length) {
      console.log('myVisionCards', myVisionCards);
      return myVisionCards.map((card, i) => (
          <Card card={card} key={card.text} isMyVision={true}></Card>));
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
                  onPress={() => alert('Preview.')}>
                    <Text style={Styles.buttonText}>Preview</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>}
      </SafeAreaView>
    );
  };
  
  export default MyVision;