import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function IntroSlides({ navigation }) {
    let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
    });

    const [buttonLabel, setButtonLabel] = useState('Begin');
    const [slideHeader, setSlideHeader] = useState('Create Vision');
    const [slideText, setSlideText] = useState('Clarify what you want and need in your dream relationship.');
    
    function handleClick() {
      if(slideHeader == 'Create Vision') {
        setSlideHeader('What to include');
        setSlideText("We recommend focusing on how you feel when you're with your partner. This could include specific special moments like 'hiking together' or your dynamic as a couple like 'my partner is my rock.'")
        setButtonLabel('Next');
      } else if(slideHeader == 'What to include') {
        setSlideHeader('What NOT to include');
        setSlideText("While we all have preferences, we recommend staying away from physical attributes like height or hair color. Instead of 'tall' you can reframe it to 'I feel safe.' Instead of 'brunette' you can reframe it to 'I am physically attracted to them.'");
        setButtonLabel("Let's begin");
      } else if(slideHeader == 'What NOT to include') {
        return navigation.navigate('VisionBuilder');
      }
    }

    if(!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
          <View style={Styles.centerContainer}>
            {slideHeader === 'Create Vision' && <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>{slideHeader}</Text>}
            {slideHeader === 'Create Vision' && <Text style={[Styles.heading2, {fontFamily: 'Poppins_400Regular'}]}>{slideText}</Text>}

            {slideHeader !== 'Create Vision' && <Text style={[Styles.leftHeading1, {fontFamily: 'Poppins_600SemiBold'}]}>{slideHeader}</Text>}
            {slideHeader !== 'Create Vision' && <Text style={[Styles.leftHeading2, {fontFamily: 'Poppins_400Regular'}]}>{slideText}</Text>}
            <Pressable
              style={[Styles.button, Styles.buttonFullWidth]}
              onPress={handleClick}>
                <Text style={[Styles.buttonText, {fontFamily: 'Poppins_500Medium'}]}>{buttonLabel}</Text>
            </Pressable>
            
          </View>
      );
    }
  };
  
  export default IntroSlides;