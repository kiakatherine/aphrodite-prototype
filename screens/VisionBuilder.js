import React from 'react';
import { useState, useEffect } from 'react';
import { Pressable, View, ScrollView, Text } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';

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

    const currentUser = props.initialParams.user;
    const cards = props.initialParams.cards;

    // const db = getDatabase();
    // const currentUserId = '7133026633'; // FIX
    // const cardsRef = ref(db, 'users/' + currentUserId + '/cards');

    const [selectedCards, setSelectedCards] = useState(cards ? cards : []);
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
      setSelectedCards([...cards]);

      const isSelectedAlready = cards.filter(selectedCard =>
        selectedCard.text == card.text);
      
      if(isSelectedAlready.length === 0) {
        // do props.onSelectCard from App.js
        const addedCard = push(cardsRef, card);
        const uid = addedCard.key;
        update(addedCard, { id: uid });
        const newCard = {
          'text': card.text,
          'type': card.type,
          'id': uid
        };        
        setSelectedCards([...cards, newCard]);
      } else {
        const cardRef = ref(db, 'users/' + currentUserId + '/cards/' + isSelectedAlready[0].id);
        const updatedCards = cards.filter(selectedCard =>
          selectedCard.text !== card.text);
        setSelectedCards(updatedCards);
        remove(cardRef);
      }
    }

    // save all cards
    function clickDone() {
      setSelectedCards(cards);

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
              style={[Styles.buttonSmall, cards.length === 0 && Styles.buttonDisabled]}
              disabled={cards.length === 0}
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
                    isSelected={cards.filter(selectedCard => selectedCard.text == card.text).length > 0}
                    onCardPress={() => clickCard(card)} />)}
              </ScrollView>
            </View>
          </View>
        </View>
      );
    }
  };
  
  export default VisionBuilder;