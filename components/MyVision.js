import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Button, Pressable, View, Text, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

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
    alert(selectedCards);

    if(selectedCards.length) {
        return selectedCards.map((card) => (
           <Card text={card}></Card>));
    } else {
        alert('none!')
        return null;
    }
};

const MyVision = ({ route }) => {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>My vision</Text>
        <ListItems selectedCards={route.params.selectedCards} />
        <Button
          style={styles.Button}
          title="Preview"
          onPress={() => saveSelections()}></Button>
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
    },
    Button: {
      backgroundColor: '#000',
      color: 'white',
      width: '100%',
      padding: 20
    }
  });
  
  export default MyVision;