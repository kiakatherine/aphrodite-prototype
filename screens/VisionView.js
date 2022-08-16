import React, { Component, useState } from 'react';
import { Image, View, Text, TouchableHighlight } from 'react-native';
import Styles from "../style.js";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function VisionView({ navigation, route }) {
    let myVisionCards = route.params.myVisionCards;
    const [currentCard, setCurrentCard] = useState(myVisionCards[0]);
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };

    function handleNextClick() {
        let currentCardIndex = myVisionCards.indexOf(currentCard);

        if((currentCardIndex + 1) < myVisionCards.length) {
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
        {currentCard && <GestureRecognizer
            onSwipeLeft={handleNextClick}
            onSwipeRight={handleBackClick}
            config={config}>
                {currentCard.text && <Text style={Styles.VisionViewCardText}>{currentCard.text}</Text>}
                {!currentCard.text && <Image source={{ uri: currentCard.uri }} style={{width: null, height: null, flex: 1, resizeMode: 'container'}} />}
            </GestureRecognizer>}

            <View style={Styles.progressDotBar}>
                {myVisionCards.map((visionCard, i) =>
                    <Text key={i} style={[Styles.progressDot, myVisionCards.indexOf(currentCard) === myVisionCards.indexOf(visionCard) ? Styles.progressDotSelected : '']}>•</Text>)}
            </View>
      </View>
    );
  };
  
  export default VisionView;