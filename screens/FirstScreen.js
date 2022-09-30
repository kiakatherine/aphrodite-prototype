import React from 'react';
import AppLoading from 'expo-app-loading';
import { Pressable, Text, View } from 'react-native';
import Styles from "../style.js";

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';

function FirstScreen(props) {
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
                <Text style={[Styles.heading1, Styles.textAlignCenter, {fontFamily: 'Poppins_600SemiBold'}]}>Aphrodite</Text>
                <Text style={[Styles.heading2, Styles.textAlignCenter, {fontFamily: 'Poppins_400Regular'}]}>Manifest your dream relationship.</Text>
                <Pressable
                    style={[Styles.button, {marginBottom: 20}]}
                    onPress={() => props.navigation.navigate('PhoneNumber')}>
                        <Text style={Styles.buttonText}>New user</Text>
                </Pressable>
                <Pressable
                    style={Styles.buttonInverted}
                    onPress={() => props.navigation.navigate('SignIn')}>
                        <Text style={Styles.buttonInvertedText}>Sign in</Text>
                </Pressable>
            </View>
        )
    }
};

export default FirstScreen;