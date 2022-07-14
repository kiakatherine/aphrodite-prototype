import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Button, Pressable, View, Text, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Styles from "../style.js";

const selectedCards = [];

const Card = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  //  useEffect(() => {
  //    const toggle = setInterval(() => {
  //     setIsSelected(!isSelected);
  //    }, 1000);

  //    return () => clearInterval(toggle);
  // })

    if(isSelected) {
      if(selectedCards.indexOf(props.text) === -1) {
        // add to selectedCards
        selectedCards.push(props.text);
        alert(selectedCards)
      }
    } else {
      // remove from selectedCards
      selectedCards.splice(selectedCards.indexOf(props.text), 1);
      alert('removed')
    }

  return <Pressable
          style={[styles.Pressable, {borderColor: isSelected ? 'black' : '#F4ECDF'}]}
          selected={isSelected}
          onPress={() => setIsSelected(!isSelected)}>
            <Text style={styles.PressableText}>{props.text}</Text>
          </Pressable>;
}

const VisionBuilder = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Tap the cards that speak to you.</Text>
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Card
            text="My partner is kind."
          />
          <Card
            text="My partner sees me for who I am."
          />
          <Card
            text="We are a power couple."
          />
          <Card
            text="We support each other."
          />
        </ScrollView>
        <Button
          style={Styles.button}
          title="Save"
          onPress={() => navigation.navigate("MyVision", { selectedCards })} />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
    },
    heading: {
      fontSize: 24,
      marginBottom: 20
    },
    scrollView: {
      // justifyContent: "center",
      // alignItems: "center",
      // textAlign: "center",
      paddingBottom: 75,
      justifyContent: "space-around",
      flexDirection:"row",
      flexWrap: "wrap",
    },
    Pressable: {
      // flex: 1,
      justifyContent: "center",
    alignItems: "center",
      minHeight: 200,
      width: '45%',
      marginBottom: 20,
      padding: 25,
      backgroundColor: '#F4ECDF',
      borderWidth: 3,
      borderRadius: 10
    },
    PressableText: {
      fontSize: 20
    }
  });
  
  export default VisionBuilder;