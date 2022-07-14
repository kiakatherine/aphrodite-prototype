import React, { Component } from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Styles from "../style.js";

const Home = ({ navigation }) => {
    return (
      <View style={Styles.centerContainer}>
        <Text style={Styles.heading1}>Welcome!</Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => navigation.navigate("IntroSlides")}
        ><Text style={Styles.buttonText}>Let's begin</Text></TouchableOpacity>
      </View>
    );
  };
  
  export default Home;