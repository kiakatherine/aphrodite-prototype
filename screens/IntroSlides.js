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

    const [buttonLabel, setButtonLabel] = useState("Let's begin");
    const [slideHeader, setSlideHeader] = useState('Create Vision');
    const [slideText, setSlideText] = useState('Clarify what you want and need in your dream relationship.');
    
    function handleClick() {
      if(slideHeader == 'Create Vision') {
        return navigation.navigate('VisionBuilder');
      }
    }

    if(!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
          <View style={Styles.centerContainer}>
            {slideHeader === 'Create Vision' && <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>{slideHeader}</Text>}
            {slideHeader === 'Create Vision' && <Text style={[Styles.bodyText, {fontFamily: 'Poppins_400Regular'}]}>{slideText}</Text>}

            {slideHeader !== 'Create Vision' && <Text style={[Styles.leftHeading1, {fontFamily: 'Poppins_600SemiBold'}]}>{slideHeader}</Text>}
            {slideHeader !== 'Create Vision' && <Text style={[Styles.bodyText, {fontFamily: 'Poppins_400Regular'}]}>{slideText}</Text>}
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