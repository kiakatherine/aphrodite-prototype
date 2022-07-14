import React, { Component } from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Styles from "../style.js";

const Home = ({ navigation }) => {
    return (
      <View style={styles.center}>
        <Text style={Styles.heading1}>Welcome!</Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => navigation.navigate("IntroSlides")}
        ><Text style={Styles.buttonText}>Let's begin</Text></TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
  });
  
  export default Home;