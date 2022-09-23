import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import AppLoading from 'expo-app-loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import '../firebase.js';
import { getDatabase, ref, onValue, set } from 'firebase/database';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function Dashboard({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // FIX
  let firstTimeUser = false;

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
      <View style={Styles.centerContainer}>
        {firstTimeUser &&
            <Pressable
            style={[Styles.button, Styles.buttonFullWidth]}
            onPress={() => navigation.navigate("IntroSlides")}>
            <Text style={[Styles.buttonText, {fontFamily: 'Poppins_500Medium'}]}>Let's go!</Text>
          </Pressable>
        }

        {!firstTimeUser &&
            <Pressable onPress={() => navigation.navigate("VisionView")}>
              <Ionicons name='play-circle' size={32} />
              <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>Relationship Vision</Text>
            </Pressable>
        }
      </View>
    );}
  };
  
  export default Dashboard;