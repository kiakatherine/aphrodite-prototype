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
            <View style={[Styles.containerWithoutHeader, Styles.darkBackground]}>                
                <View style={[Styles.customHeader, {marginBottom: 30}]}>
                    <Pressable
                        style={[Styles.textAlignRight, Styles.flexOne]}
                        onPress={() => navigation.goBack()}>
                            <Ionicons style={{color: 'white'}} name='arrow-back-outline' size={24} />
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonLink, {alignItems: 'center'}]}
                        onPress={() => navigation.navigate("VisionCustomizer", { myVisionCards })}>
                            <Ionicons style={{color: 'white'}} name='create-outline' size={24} />
                    </Pressable>
                </View>
                
                <View style={Styles.containerPadding}>
                    <Text style={[Styles.heading1, Styles.textAlignCenter, Styles.textWhite, {fontFamily: 'Poppins_600SemiBold', marginBottom: 25}]}>Relationship Vision</Text>
                    
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
            </View>
        );
    }
  };
  
  export default VisionViewTiles;