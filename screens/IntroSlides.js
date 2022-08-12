import React, { Component, useState } from 'react';
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Styles from "../style.js";

const IntroSlides = ({ navigation }) => {
    const [buttonLabel, setButtonLabel] = useState('Next');
    const [slideHeader, setSlideHeader] = useState('Create Vision');
    const [slideText, setSlideText] = useState('Clarify what you want and need in your dream relationship.');
    
    function handleClick() {
      if(slideHeader == 'Create Vision') {
        setSlideHeader('What to include');
        setSlideText("We recommend focusing on how you feel when you're with your partner. This could include specific special moments like 'hiking together' or your dynamic as a couple like 'my partner is my rock.'")
      } else if(slideHeader == 'What to include') {
        setSlideHeader('What NOT to include');
        setSlideText("While we all have preferences, we recommend staying away from physical attributes like height or hair color. Instead of 'tall' you can reframe it to 'I feel safe.' Instead of 'brunette' you can reframe it to 'I am physically attracted to them.'");
      } else if(slideHeader == 'What NOT to include') {
        setButtonLabel("Let's begin");
        return navigation.navigate('VisionBuilder');
      }
    }

    return (
      <View style={Styles.centerContainer}>
        {slideHeader === 'Create Vision' && <Text style={Styles.heading1}>{slideHeader}</Text>}
        {slideHeader === 'Create Vision' && <Text style={Styles.heading2}>{slideText}</Text>}

        {slideHeader !== 'Create Vision' && <Text style={Styles.leftHeading1}>{slideHeader}</Text>}
        {slideHeader !== 'Create Vision' && <Text style={Styles.leftHeading2}>{slideText}</Text>}
        <TouchableOpacity
          style={Styles.button}
          onPress={handleClick}>
            <Text style={Styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
        
      </View>
    );
  };
  
  export default IntroSlides;