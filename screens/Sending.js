import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Styles from "../style.js";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card.js';
import { getAuth, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { initializeApp, getApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function Sending(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });

    useEffect(() => {
        props.navigation.navigate('Dashboard');
    }, [])

    return (
        <View style={[Styles.centerContainer, Styles.darkBackground]}>
            <Image source={require('../assets/images/spinning.png')} resizeMode='contain' style={{alignSelf: 'center', height: '55%'}}  />
            <Text style={[Styles.heading3, Styles.textWhite, Styles.textAlignCenter, {fontFamily: 'Poppins_600SemiBold'}]}>Sending to the universe</Text>
    </View>
    );
}
  
export default Sending;