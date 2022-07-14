import React, { Component, useState } from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Styles from "../style.js";

const IntroSlides = ({ navigation }) => {
    let [buttonLabel, setButtonLabel] = useState('Next');
    const [slideText, setButtonText] = useState('Dream relationship builder');
    
    function handleClick() {
      if(slideText == 'Dream relationship builder') {
        setButtonText('Include');
      } else if(slideText == 'Include') {
        setButtonText('Do not include');
        setButtonLabel("Let's begin");
      } else if(slideText == 'Do not include') {
        return navigation.navigate('VisionBuilder');
      }
    }

    return (
      <View style={Styles.centerContainer}>
        <Text style={Styles.heading1}>{slideText}</Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={handleClick}>
            <Text style={Styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
        
      </View>
    );
  };
  
  export default IntroSlides;