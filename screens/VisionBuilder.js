import React from 'react';
import { useState, useEffect } from 'react';
import { Pressable, View, ScrollView, Text } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps/index.js';

function VisionBuilder(props) {
    let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
    });

    useEffect(() => {
        const app = getApp();
        const auth = getAuth(app);
        const db = getDatabase();
        const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
        onValue(cardsRef, (snapshot) => {
            const cards = snapshot.val();
            let cardsArr = [];
            for (var key in cards) {
                cardsArr.push(cards[key])
            }
            setSelectedCards(cardsArr);
        });
    }, [])

    const [selectedCards, setSelectedCards] = useState([]);
    const exampleCards = [
      { text: "My partner is kind.", type: "text" },
      { text: "My partner sees me for who I am.", type: "text" },
      { text: "We are a power couple.", type: "text" },
      { text: "We support each other.", type: "text" },
      { text: "My partner is honest.", type: "text" },
      { text: "My partner is patient.", type: "text" },
      { text: "My partner is faithful.", type: "text" },
      { text: "My partner is generous.", type: "text" }
    ];

    // select/deselect card
    function clickCard(card) {
      const app = getApp();
      const auth = getAuth(app);
      const db = getDatabase();
      let isSelectedAlready = [];
      let cardsRef = [];

      // if user already has cards
      if(selectedCards.length > 0) {
        isSelectedAlready = selectedCards.filter(selectedCard =>
          selectedCard.text == card.text);
      }

      if(isSelectedAlready.length === 0) {
        cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/');
        const addedCard = push(cardsRef, card);
        const uid = addedCard.key;
        update(addedCard, { id: uid });
        const newCard = {
          'text': card.text,
          'type': card.type,
          'id': uid
        };        
        setSelectedCards([...selectedCards, newCard]);
      } else {
        const uid = isSelectedAlready[0].id;
        cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/' + uid);
        const updatedCards = selectedCards.length > 0 ? selectedCards.filter(selectedCard =>
          selectedCard.text !== card.text) : null;
        if(selectedCards.length > 0) {
          setSelectedCards(updatedCards);
        }
        remove(cardsRef).then(() => {
          // alert('Card removed');
        }).catch(error => {
          // alert('Error');
        });
      }
    }

    // save all cards
    function clickDone() {
      // save cards with unique id
      selectedCards.forEach(card => {
        let newCards = [];

        // check for duplicates before adding to database
        const cardsToAdd = selectedCards.filter((card, index) => {
          return card.text !== selectedCards[index].text; 
        });

        if(cardsToAdd.length === 0) {
          // no new cards to add
          props.navigation.navigate("VisionCustomizer", {selectedCards});
        } else {
          const addedCard = push(cardsRef, card);
          const uid = addedCard.key;
          update(addedCard, { id: uid });
          newCards.push({
            'text': card.text,
            'type': card.type,
            'id': uid
          });
        }
        
        setSelectedCards(newCards);
        props.navigation.navigate("VisionCustomizer", {selectedCards: newCards});
      });
    }
    
    if(!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={Styles.containerWithoutHeader}>
          <View style={[Styles.customHeader, {marginBottom: 30}]}>
            <Pressable
                style={[Styles.textAlignRight, Styles.flexOne]}
                onPress={() => props.navigation.goBack({selectedCards})}>
                    <Ionicons name='arrow-back-outline' size={24} />
            </Pressable>

            <Pressable
              style={[Styles.buttonSmall, selectedCards.length === 0 && Styles.buttonDisabled]}
              disabled={selectedCards.length === 0}
              onPress={() => clickDone()}>
                <Text style={[Styles.buttonText, {fontFamily: 'Poppins_500Medium'}]}>Done</Text>
            </Pressable>
          </View>

          <View style={Styles.containerPadding}>
            <Text style={[Styles.heading1, {marginBottom: 20, fontFamily: 'Poppins_600SemiBold'}]}>Tap the cards that speak to you.</Text>
          
            <View style={{flexGrow: 1}}>
              <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
                {exampleCards.map(card => 
                  <Card
                    key={card.text}
                    card={card}
                    isSelected={selectedCards.filter(selectedCard => selectedCard.text == card.text).length > 0}
                    onCardPress={() => clickCard(card)} />)}
              </ScrollView>
            </View>
          </View>
        </View>
      );
    }
  };
  
  export default VisionBuilder;