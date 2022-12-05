import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
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

    if(props.route.params.isDeletingAccount) {
      setTimeout(function() { props.navigation.navigate('Landing') }, 2000);
    } else if(props.route.params.isSigningIn) {
      setTimeout(function() { props.navigation.navigate('Dashboard', { hasCards: props.route.params.hasCards }) }, 2000);
    } else if(props.route.params.isUpdatingInfo) {
      setTimeout(function() { props.navigation.navigate('Account') }, 2000);
    } else if(props.route.params.isCreatingAccount) {
      setTimeout(function() { props.navigation.navigate('Dashboard', { hasCards: false }) }, 2000);
    } else if(props.route.params.isSavingText) {
      setTimeout(function() { props.navigation.navigate('PreviewTiles') }, 2000);
    }
    
    return (
      <View style={[Styles.centerContainer, Styles.lightBackground]}>
          <Text style={[Styles.heading3, Styles.textAlignCenter, {fontFamily: 'Poppins_600SemiBold'}]}>{props.route.params.text}</Text>
          {/* <Image source={require('../assets/images/spinning.png')} resizeMode='contain' style={{alignSelf: 'center', height: '55%'}}  /> */}
          {/* <Text style={[Styles.heading3, Styles.textWhite, Styles.textAlignCenter, {fontFamily: 'Poppins_600SemiBold'}]}>Sending to the universe</Text> */}
      </View>
    );
}
  
export default Sending;