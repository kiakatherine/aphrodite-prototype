import React, { Component } from 'react';
import { useState } from 'react';
import { Button, Pressable, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';

function VisionBuilder({ navigation }) {
    const [selectedCards, setSelectedCards] = useState([]);

    const cards = [
      {
        id: 1,
        text: "My partner is kind."
      },
      {
        id: 2,
        text: "My partner sees me for who I am."
      },
      {
        id: 3,
        text: "We are a power couple."
      },
      {
        id: 4,
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

    return (
      <SafeAreaView style={Styles.container}>
        <Text style={Styles.heading1}>Tap the cards that speak to you.</Text>
        {/* <Text style={Styles.heading1}>Selected cards: {selectedCards.length}</Text> */}
        
        <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
          {cards.map(card => 
            <Card key={card.id} card={card} isSelected={selectedCards.filter(selectedCard => selectedCard.text == card.text).length > 0} onCardPress={() => selectedCards.filter(selectedCard => selectedCard.text == card.text).length > 0 ? unselectCard(card) : selectCard(card)} />)}
        </ScrollView>

        <TouchableOpacity
          style={[Styles.button, selectedCards.length === 0 && Styles.buttonDisabled]}
          disabled={selectedCards.length === 0}
          onPress={() => navigation.navigate("MyVision", {selectedCards})}>
            <Text style={Styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  export default VisionBuilder;