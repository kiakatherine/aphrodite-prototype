import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import '../firebase.js';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function Dashboard(props) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const app = getApp();
  const auth = getAuth(app);
  const user = auth.currentUser;
  const firstTimeUser = user.hasSeenWelcome ? false : true;
  // let cards = props.initialParams.cards ? props.initialParams.cards : [];

  // FIX
  const cards = [
    {
      text: "My partner is kind."
    },
    {
      text: "My partner sees me for who I am."
    },
    {
      text: "We are a power couple."
    },
    {
      text: "We support each other."
    }
  ];

  // function storeFirstThing() {
  //   const db = getDatabase();
  //   const reference = ref(db, 'users/' + 'Alexa');
  //   set(reference, {
  //     highscore: 10,
  //   });
  // }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={[Styles.centerContainer, Styles.lightBackground]}>
        {firstTimeUser &&
            <View>
              <Text style={[Styles.heading1, Styles.textAlignCenter, {fontFamily: 'Poppins_600SemiBold'}]}>Create Vision</Text>
              <Text style={[Styles.bodyText, Styles.textAlignCenter, {fontFamily: 'Poppins_400Regular'}]}>Clarify what you want & need in your dream relationship.</Text>
              <Pressable
                style={Styles.button}
                onPress={() => props.navigation.navigate('VisionBuilder')}>
                  <Text style={Styles.buttonText}>Let's begin</Text>
              </Pressable>
          </View>
        }

        {!firstTimeUser &&
            <Pressable
              style={Styles.DashboardVisionView}
              onPress={() => props.navigation.navigate('VisionViewTiles', {cards})}>
                <Text style={[Styles.heading1, Styles.textWhite, {fontFamily: 'Poppins_600SemiBold'}]}>Relationship Vision</Text>
                <Ionicons style={{color: 'white'}} name='play-circle' size={64} />
            </Pressable>
        }
      </View>
    );}
  };
  
  export default Dashboard;