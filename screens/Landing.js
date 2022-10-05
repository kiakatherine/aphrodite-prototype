import React from 'react';
import AppLoading from 'expo-app-loading';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';

function Landing({navigation}) {
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
            <View style={[Styles.centerContainer, {display: 'flex', backgroundColor: 'white'}]}>
                <Image source={require('../assets/images/moon.png')} style={{alignSelf: 'center', position: 'absolute', top: 125}} />
                
                <Text style={[Styles.heading1, Styles.textAlignCenter, {fontFamily: 'Poppins_600SemiBold', textTransform: 'uppercase', letterSpacing: 3}]}>Aphrodite</Text>
                <Text style={[Styles.heading2, Styles.textAlignCenter, {fontFamily: 'Poppins_400Regular'}]}>Manifest your dream relationship.</Text>
                <Pressable
                    style={[Styles.button, {marginBottom: 20}]}
                    onPress={() => navigation.navigate('PhoneNumber')}>
                        <Text style={Styles.buttonText}>New user</Text>
                </Pressable>
                <Pressable
                    style={Styles.buttonInverted}
                    onPress={() => navigation.navigate('SignIn')}>
                        <Text style={Styles.buttonInvertedText}>Sign in</Text>
                </Pressable>

                <Image source={require('../assets/images/landing.png')} style={{position: 'absolute', bottom: 0, alignSelf: 'center'}} />
            </View>
        )
    }
};

export default Landing;