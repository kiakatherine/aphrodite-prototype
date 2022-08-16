import React, { Component, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Styles from "../style.js";

function VisionView({ navigation, route }) {
    let myVisionCards = route.params.myVisionCards;
    const [currentCard, setCurrentCard] = useState(myVisionCards[0]);

    function handleNextClick() {
        let currentCardIndex = myVisionCards.indexOf(currentCard);

        if(currentCardIndex < myVisionCards.length) {
            setCurrentCard(myVisionCards[myVisionCards.indexOf(currentCard) + 1]);
        } else {
            setCurrentCard(myVisionCards[myVisionCards.length - 1]);
        }
    }

    function handleBackClick() {
        let currentCardIndex = myVisionCards.indexOf(currentCard);
        
        if(currentCardIndex > 0) {
            setCurrentCard(myVisionCards[myVisionCards.indexOf(currentCard) - 1]);
        } else {
            setCurrentCard(myVisionCards[0]);
        }
    }

    return (
      <View style={[Styles.centerContainer, Styles.VisionViewCard]}>
        {currentCard && <View>
            <Text style={Styles.VisionViewCardText}>{currentCard.text}</Text>
        </View>}

        {currentCard !== myVisionCards[0] && <TouchableHighlight onPress={handleBackClick}>
            <Text>Back</Text>
        </TouchableHighlight>}
        
        {myVisionCards.indexOf(currentCard) !== (myVisionCards.length - 1) && <TouchableHighlight onPress={handleNextClick}>
            <Text>Next</Text>
        </TouchableHighlight>}
      </View>
    );
  };
  
  export default VisionView;