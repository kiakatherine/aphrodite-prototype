import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Button, Pressable, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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
        }
      } else {
        // remove from selectedCards
        selectedCards.splice(selectedCards.indexOf(props.text), 1);
      }
  
    return <Pressable
            style={[styles.Pressable, {borderColor: isSelected ? 'black' : '#F4ECDF'}]}
            selected={isSelected}
            onPress={() => setIsSelected(!isSelected)}>
              <Text style={styles.PressableText}>{props.text}</Text>
            </Pressable>;
  }

const ListItems = (props) => {
    let selectedCards = props.selectedCards;

    if(selectedCards.length) {
        return selectedCards.map((card, i) => (
           <Card text={card} key={i}></Card>));
    } else {
        alert('none!')
        return null;
    }
};

const MyVision = ({ route }) => {
    return (
      <SafeAreaView style={styles.container}>
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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
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
  
  export default MyVision;