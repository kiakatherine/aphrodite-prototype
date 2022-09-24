import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Styles from "../style.js";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card.js';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function VisionViewTiles({ navigation, route }) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
    
    let myVisionCards = route.params.myVisionCards;

    if(!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={[Styles.centerContainer, Styles.darkBackground]}>
                <Text style={[Styles.heading1, Styles.textAlignCenter, Styles.textWhite, {fontFamily: 'Poppins_600SemiBold', marginTop: 20, marginBottom: 25}]}>Relationship Vision</Text>
                
                <Pressable
                    style={[Styles.buttonOutline, {marginBottom: 40}]}
                    onPress={() => navigation.navigate("VisionViewFullScreen", { myVisionCards })}>
                        <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}><Ionicons style={{color: 'white'}} name='play' size={18} /> Fullscreen</Text>
                </Pressable>

                <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
                    {myVisionCards.map(card => 
                        <Card key={card.text} card={card} darkTheme={true} />)}
                </ScrollView>
            </View>
        );
    }
  };
  
  export default VisionViewTiles;