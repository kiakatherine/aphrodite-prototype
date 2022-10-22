import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import TinderCard from 'react-tinder-card';
import {app, auth, db, storage } from '../firebase.js';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';

function Swipe(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
  const [lastDirection, setLastDirection] = useState();
  let [myVisionCards, setMyVisionCards] = useState(props.route.params.cards);
  let [shownVisionCards, setShownVisionCards] = useState([...myVisionCards]);
  const [currentCard, setCurrentCard] = useState(props.route.params.currentCard ? props.route.params.currentCard : props.route.params.cards[0]);

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    },
    cardContainer: {
      width: '90%',
      maxWidth: 300,
      height: 400,
    },
    card: {
      position: 'absolute',
      backgroundColor: '#2E2F36',
      width: '100%',
      maxWidth: 300,
      height: 400,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
    //   shadowColor: 'black',
    //   shadowOpacity: 0.2,
    //   shadowRadius: 20,
      borderRadius: 20,
      resizeMode: 'cover',
    },
    cardImage: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 20,
    },
    // cardTitle: {
    //   position: 'absolute',
    //   bottom: 0,
    //   margin: 10,
    //   color: '#fff',
    // },
    // infoText: {
    //   height: 28,
    //   justifyContent: 'center',
    //   display: 'flex',
    //   zIndex: -100,
    // }
  }

  const swiped = (direction, card) => {
    console.log('removing: ' + card)
    setLastDirection(direction)

    // let updatedVisionCards = myVisionCards.filter(visionCard => { 
    //     return card.type === 'text' ? card.text == visionCard.text : card.uri == visionCard.uri
    // })

    const currCardIndex = shownVisionCards.indexOf(card);
    if (currCardIndex !== -1) {
        shownVisionCards.splice(currCardIndex, 1);
        setShownVisionCards(shownVisionCards);
        if(shownVisionCards.length === 0) {
            props.navigation.navigate('PreviewTiles', {previousScreen: 'PreviewFullScreen'})
        }
      }

    if(direction === 'down') {
        props.navigation.navigate('PreviewTiles', {previousScreen: 'PreviewFullScreen'})
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <View style={[styles.container, Styles.darkBackground]}>
        <Pressable
            style={[Styles.topRightCloseButton, {zIndex: 2}]}
            onPress={() => props.navigation.navigate('PreviewTiles', {previousScreen: 'PreviewFullScreen'})}>
            <Ionicons name="close-outline" size={48} style={{color: 'white'}}></Ionicons>
        </Pressable>

        <View style={[styles.cardContainer]}>
            {shownVisionCards.map((card) =>
                <TinderCard key={card.name} onSwipe={(dir) => swiped(dir, card)} onCardLeftScreen={() => outOfFrame(card.name)}>
                    <View style={styles.card}>
                        {card.text && <Text style={[Styles.PreviewFullScreenCardText, {fontFamily: 'Poppins_500Medium'}]}>{card.text}</Text>}
                        {!card.text && <Image source={{ uri: card.uri }} style={{ width: 200, height: 200 }} />}
                    </View>
                </TinderCard>
            )}
        </View>

        {/* {lastDirection ? <Text style={styles.infoText}>You swiped {lastDirection}</Text> : <Text style={styles.infoText} />} */}
    </View>
  )
}

export default Swipe;
