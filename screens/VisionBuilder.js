import React from 'react';
import { useState } from 'react';
import { Pressable, View, ScrollView, Text } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        <View style={Styles.containerWithoutHeader}>
          <View style={[Styles.customHeader, {marginBottom: 30}]}>
            <Pressable
                style={[Styles.textAlignRight, Styles.flexOne]}
                onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-outline' size={24} />
            </Pressable>

            <Pressable
              style={[Styles.buttonSmall, selectedCards.length === 0 && Styles.buttonDisabled]}
              disabled={selectedCards.length === 0}
              onPress={() => navigation.navigate("VisionCustomizer", {selectedCards})}>
                <Text style={[Styles.buttonText, {fontFamily: 'Poppins_500Medium'}]}>Done</Text>
            </Pressable>
          </View>

          <View style={Styles.containerPadding}>
            <Text style={[Styles.heading1, {marginBottom: 20, fontFamily: 'Poppins_600SemiBold'}]}>Tap the cards that speak to you.</Text>
          
            <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
              {cards.map(card => 
                <Card key={card.text} card={card} isSelected={selectedCards.filter(selectedCard => selectedCard.text == card.text).length > 0} onCardPress={() => selectedCards.filter(selectedCard => selectedCard.text == card.text).length > 0 ? unselectCard(card) : selectCard(card)} />)}
            </ScrollView>
          </View>
        </View>
      );
    }
  };
  
  export default VisionBuilder;