import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import { getAuth, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { initializeApp, getApp } from 'firebase/app';
import {app, auth, db, storage } from '../firebase.js';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function PreviewFullScreen(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });

    let [myVisionCards, setMyVisionCards] = useState(props.route.params.cards);
    const [currentCard, setCurrentCard] = useState(props.route.params.currentCard ? props.route.params.currentCard : props.route.params.cards[0]);
    
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      };
    
    // useEffect(() => {
    //     const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    //     onValue(cardsRef, (snapshot) => {
    //         const cards = snapshot.val();
    //         let cardsArr = [];
    //         for (var key in cards) {
    //             cardsArr.push(cards[key])
    //         }
    //         setMyVisionCards(cardsArr);
    //         setCurrentCard(cardsArr[0]);
    //     });
    // }, [])

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
        <View style={[Styles.centerContainer, Styles.PreviewFullScreenCard]}>
            <Pressable
                style={Styles.topRightCloseButton}
                onPress={() => props.navigation.goBack()}>
                    <Ionicons style={{ color: 'white' }} name="close-outline" size={48}></Ionicons>
            </Pressable>

            {currentCard &&
                <GestureRecognizer
                    onSwipeLeft={handleNextClick}
                    onSwipeRight={handleBackClick}
                    config={config}>
                        {currentCard.text && <Text style={[Styles.PreviewFullScreenCardText, {fontFamily: 'Poppins_500Medium'}]}>{currentCard.text}</Text>}
                        {!currentCard.text && <Image source={{ uri: currentCard.uri }} style={{ width: 200, height: 200 }} />}
                </GestureRecognizer>}

                {/* <View style={Styles.progressDotBar}>
                    {myVisionCards.map((visionCard, i) =>
                        <Text key={i} style={[Styles.progressDot, myVisionCards.indexOf(currentCard) === myVisionCards.indexOf(visionCard) ? Styles.progressDotSelected : '']}>•</Text>)}
                </View> */}
        </View>
    );
}
  
export default PreviewFullScreen;