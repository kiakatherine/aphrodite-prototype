import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Button, Pressable, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';

// const selectedCards = [];


// const Card = (props) => {
//     const [isSelected, setIsSelected] = useState(false);
  
//       if(isSelected) {
//         if(selectedCards.indexOf(props.text) === -1) {
//           // add to selectedCards
//           selectedCards.push(props.text);
//         }
//       } else {
//         // remove from selectedCards
//         selectedCards.slice(selectedCards.indexOf(props.text), 1);
//       }
  
//     return <Pressable
//             style={[styles.Pressable, {borderColor: isSelected ? 'black' : '#F4ECDF'}]}
//             selected={isSelected}
//             onPress={() => setIsSelected(!isSelected)}>
//               <Text style={styles.PressableText}>{props.text}</Text>
//             </Pressable>;
//   }

const ListItems = (props) => {
    let selectedCards = props.selectedCards;

    if(selectedCards.length) {
        return selectedCards.map((card, i) => (
           <Card card={card} key={card.text}></Card>));
    } else {
        alert('none!')
        return null;
    }
};

const MyVision = ({ route }) => {
    return (
      <SafeAreaView style={Styles.container}>
        <Text style={Styles.heading1}>My vision</Text>
        <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
            <ListItems selectedCards={route.params.selectedCards} />
            <TouchableOpacity
                style={Styles.button}
                onPress={() => alert('Preview.')}>
                    <Text style={Styles.buttonText}>Preview</Text>
            </TouchableOpacity>
          </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default MyVision;