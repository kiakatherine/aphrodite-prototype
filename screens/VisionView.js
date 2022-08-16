import React, { Component, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Styles from "../style.js";
import FullScreenCard from '../components/FullScreenCard.js';

function VisionView({ navigation, route }) {
    let myVisionCards = route.params.myVisionCards;
    const [currentCard, setCurrentCard] = useState(myVisionCards[0]);

    function handleNextClick() {
        setCurrentCard(myVisionCards[myVisionCards.indexOf(currentCard) + 1]);
    }

    function handleBackClick() {
        setCurrentCard(myVisionCards[myVisionCards.indexOf(currentCard) - 1]);
    }

    return (
      <View style={Styles.centerContainer}>
        {currentCard && <View>
            <Text style={Styles.CardText}>{currentCard.text}</Text>
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