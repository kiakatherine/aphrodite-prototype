import React from 'react';
import AppLoading from 'expo-app-loading';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';

function FirstScreen({ navigation }) {
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
            <SafeAreaView style={Styles.centerContainer}>
                <Text style={[Styles.heading1, , {fontFamily: 'Poppins_600SemiBold'}]}>Aphrodite</Text>
                <Text style={Styles.heading2}>Manifest your dream relationship.</Text>
                <Pressable
                    style={[Styles.button, Styles.buttonFullWidth, {marginBottom: 20}]}
                    onPress={() => navigation.navigate('NewUser')}>
                        <Text style={Styles.buttonText}>New user</Text>
                </Pressable>
                <Pressable
                    style={[Styles.buttonInverted, Styles.buttonFullWidth]}
                    onPress={() => navigation.navigate('Signin')}>
                        <Text style={Styles.buttonInvertedText}>Sign in</Text>
                </Pressable>
            </SafeAreaView>
        )
    }
};

export default FirstScreen;