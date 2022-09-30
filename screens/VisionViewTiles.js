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

function VisionViewTiles(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
    
    const user = props.initialParams.user;
    let cards = props.initialParams.cards;

    if(!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={[Styles.containerWithoutHeader, Styles.darkBackground]}>                
                <View style={[Styles.customHeader, {marginBottom: 30}]}>
                    <Pressable
                        style={[Styles.textAlignRight, Styles.flexOne]}
                        onPress={() => props.navigation.goBack()}>
                            <Ionicons style={{color: 'white'}} name='arrow-back-outline' size={24} />
                    </Pressable>

                    <Pressable
                        style={[Styles.buttonLink, {alignItems: 'center'}]}
                        onPress={() => props.navigation.navigate("VisionCustomizer", { cards })}>
                            <Ionicons style={{color: 'white'}} name='create-outline' size={24} />
                    </Pressable>
                </View>
                
                <View style={Styles.containerPadding}>
                    <Text style={[Styles.heading1, Styles.textAlignCenter, Styles.textWhite, {fontFamily: 'Poppins_600SemiBold', marginBottom: 25}]}>Relationship Vision</Text>
                    
                    {cards.length > 0 &&  <Pressable
                        style={[Styles.buttonOutline, {marginBottom: 40}]}
                        onPress={() => props.navigation.navigate("VisionViewFullScreen", { cards })}>
                            <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}><Ionicons style={{color: 'white'}} name='play' size={18} /> Fullscreen</Text>
                    </Pressable>}

                    <ScrollView contentContainerStyle={Styles.scrollView} showsVerticalScrollIndicator={false}>
                        {cards.length > 0 && cards.map(card => 
                            <Card key={card.text} card={card} darkTheme={true} />)}
                        {cards.length === 0 &&
                            <Pressable
                            style={[Styles.buttonOutline, {marginBottom: 40}]}
                            onPress={() => props.navigation.navigate('VisionBuilder', { cards })}>
                                <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}><Ionicons style={{color: 'white'}} name='add' size={18} /> Add cards</Text>
                        </Pressable>}
                    </ScrollView>
                </View>
            </View>
        );
    }
  };
  
  export default VisionViewTiles;