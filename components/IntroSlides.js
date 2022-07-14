import React, { Component, useState } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';

const IntroSlides = ({ navigation }) => {
    let [buttonLabel, setButtonLabel] = useState('Next');
    const [slideText, setButtonText] = useState('Dream relationship builder');
    
    function handleClick() {
      if(slideText == 'Dream relationship builder') {
        setButtonText('Include');
      } else if(slideText == 'Include') {
        setButtonText('Not to include');
        setButtonLabel("Let's begin");
      } else if(slideText == 'Not to include') {
        return navigation.navigate('VisionBuilder');
      }
    }

    return (
      <View style={styles.center}>
        <Text>{slideText}</Text>
        <Button
          title={buttonLabel}
          onPress={handleClick}
        />
        
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
  
  export default IntroSlides;