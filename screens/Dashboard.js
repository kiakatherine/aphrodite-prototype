import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
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

  // const app = getApp();
  // const auth = getAuth(app);
  // const user = auth.currentUser;

  // function storeFirstThing() {
  //   const db = getDatabase();
  //   const reference = ref(db, 'users/' + 'Alexa');
  //   set(reference, {
  //     highscore: 10,
  //   });
  // }

  return (
    <View style={[Styles.lightBackground]}>
        <Pressable
          style={Styles.DashboardVisionView}
          onPress={() => props.navigation.navigate('PreviewTiles', {previousScreen: 'Dashboard'})}>
            {/* <Text style={[Styles.heading1, Styles.textWhite, {fontFamily: 'Poppins_600SemiBold'}]}>Relationship Vision</Text>
            <Ionicons style={{color: 'white'}} name='play-circle' size={64} /> */}
            <Image source={require('../assets/images/play.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
    </View>
  );
}
  
export default Dashboard;