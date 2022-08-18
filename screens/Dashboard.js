import React from 'react';
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

function Dashboard({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={Styles.centerContainer}>
        <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>Dashboard</Text>
        <Pressable
          style={[Styles.button, Styles.buttonFullWidth]}
          onPress={() => navigation.navigate("IntroSlides")}
        ><Text style={[Styles.buttonText, {fontFamily: 'Poppins_500Medium'}]}>Let's go!</Text></Pressable>
      </View>
    );}
  };
  
  export default Dashboard;