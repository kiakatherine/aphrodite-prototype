import React, { Component } from 'react';
import { useRef } from "react";
import { useState, useEffect } from 'react';
import { Button, Pressable, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';
import RBSheet from "react-native-raw-bottom-sheet";

function MyVision({ route }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const refRBSheet = useRef();

  const ListItems = (props) => {
    let selectedCards = props.selectedCards;

    if(selectedCards.length) {
        return selectedCards.map((card, i) => (
           <Card card={card} key={card.text} isMyVision={true}></Card>));
    } else {
        alert('none!')
        return null;
    }
  };

  function addCard() {
    setIsDrawerOpen(true);
  }

    return (
      <SafeAreaView style={Styles.container}>
        <Text style={Styles.heading1}>My vision</Text>
        <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* <Pressable
                style={Styles.Card}
                onPress={addCard}>
                  <Text style={Styles.CardText}>+</Text>
            </Pressable> */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#eee"
              }}
            >
              <Button title="+" onPress={() => refRBSheet.current.open()} />
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
                }}
              >
                <Text>hi</Text>
              </RBSheet>
            </View>
            
            <ListItems selectedCards={route.params.selectedCards} />
            
            <TouchableOpacity
                style={Styles.button}
                onPress={() => alert('Preview.')}>
                  <Text style={Styles.buttonText}>Preview</Text>
            </TouchableOpacity>
          </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default MyVision;