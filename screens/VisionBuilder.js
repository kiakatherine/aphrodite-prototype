import React from 'react';
import { useState } from 'react';
import { Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function VisionBuilder({ navigation }) {
    let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
    });

    const [selectedCards, setSelectedCards] = useState([]);

    const cards = [
      {
        text: "My partner is kind."
      },
      {
        text: "My partner sees me for who I am."
      },
      {
        text: "We are a power couple."
      },
      {
        text: "We support each other."
      }
    ];

    function selectCard(card) {
      setSelectedCards([...selectedCards, card]);
    }

    function unselectCard(card) {
      const newState = selectedCards.filter(selectedCard => selectedCard.text !== card.text);
      setSelectedCards(newState);
    }

    if(!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <SafeAreaView style={Styles.container}>
          <Text style={[Styles.heading1, {fontFamily: 'Poppins_500Medium'}]}>Tap the cards that speak to you.</Text>
          
          <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
            {cards.map(card => 
              <Card key={card.text} card={card} isSelected={selectedCards.filter(selectedCard => selectedCard.text == card.text).length > 0} onCardPress={() => selectedCards.filter(selectedCard => selectedCard.text == card.text).length > 0 ? unselectCard(card) : selectCard(card)} />)}
          </ScrollView>

          <TouchableOpacity
            style={[Styles.button, selectedCards.length === 0 && Styles.buttonDisabled]}
            disabled={selectedCards.length === 0}
            onPress={() => navigation.navigate("VisionCustomizer", {selectedCards})}>
              <Text style={[Styles.buttonText, {fontFamily: 'Poppins_500Medium'}]}>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
  };
  
  export default VisionBuilder;