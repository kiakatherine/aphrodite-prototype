import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function VisionViewFullScreen({ navigation, route }) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
    
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

    if(!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
        <View style={[Styles.centerContainer, Styles.VisionViewFullScreenContainer, Styles.VisionViewFullScreenCard]}>
            <Pressable
                style={Styles.topRightCloseButton}
                onPress={() => navigation.goBack()}>
                    <Ionicons style={{ color: 'white' }} name="close-outline" size={48}></Ionicons>
            </Pressable>
            {currentCard &&
                <GestureRecognizer
                    onSwipeLeft={handleNextClick}
                    onSwipeRight={handleBackClick}
                    config={config}>
                        {currentCard.text && <Text style={[Styles.VisionViewFullScreenCardText, {fontFamily: 'Poppins_500Medium'}]}>{currentCard.text}</Text>}
                        {!currentCard.text && <Image source={{ uri: currentCard.uri }} style={{ width: 200, height: 200 }} />}
                </GestureRecognizer>}

                <View style={Styles.progressDotBar}>
                    {myVisionCards.map((visionCard, i) =>
                        <Text key={i} style={[Styles.progressDot, myVisionCards.indexOf(currentCard) === myVisionCards.indexOf(visionCard) ? Styles.progressDotSelected : '']}>•</Text>)}
                </View>
        </View>
        );
    }
  };
  
  export default VisionViewFullScreen;