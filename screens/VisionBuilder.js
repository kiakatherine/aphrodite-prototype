import React, { Component } from 'react';
import { useState } from 'react';
import { Button, Pressable, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';

function VisionBuilder({ navigation }) {
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

    return (
      <SafeAreaView style={Styles.container}>
        <Text style={Styles.heading1}>Tap the cards that speak to you.</Text>
        <Text style={Styles.heading1}>Selected cards: {selectedCards.length}</Text>
        <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
          {cards.map((card, index) =>
            <Card key={card.text} card={card} isSelected={card.isSelected} onCardClick={(card) => card.isSelected ? setSelectedCards(card, ...selectedCards) :
              setSelectedCards(...selectedCards, card)} />)}
        </ScrollView>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => navigation.navigate("MyVision", { selectedCards })}>
            <Text style={Styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  export default VisionBuilder;