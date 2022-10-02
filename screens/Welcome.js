import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Styles from "../style.js";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import AppLoading from 'expo-app-loading';
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

function Welcome(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });

    if(!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View>
              <Text style={[Styles.heading1, Styles.textAlignCenter, {fontFamily: 'Poppins_600SemiBold'}]}>Create Vision</Text>
              <Text style={[Styles.bodyText, Styles.textAlignCenter, {fontFamily: 'Poppins_400Regular'}]}>Clarify what you want & need in your dream relationship.</Text>
              <Pressable
                style={Styles.button}
                onPress={() => props.navigation.navigate('VisionBuilder')}>
                  <Text style={Styles.buttonText}>Let's begin</Text>
              </Pressable>
          </View>
        );
    }
  };
  
  export default Welcome;