import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import {app, auth, db, storage } from '../firebase.js';

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

    return (
        <View style={[Styles.centerContainer, {display: 'flex', height: '100%', backgroundColor: 'white'}]}>
            <Image source={require('../assets/images/moon.png')} style={{alignSelf: 'center', position: 'absolute', top: 90, maxWidth: 160, maxHeight: 160}} />
            
            <Image source={require('../assets/images/aphrodite_logo.png')} style={{alignSelf: 'center', maxWidth: 200, maxHeight: 20, marginBottom: 30}} />
            <Text style={[Styles.heading2, Styles.textAlignCenter]}>Manifest your dream relationship.</Text>
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

            <Image source={require('../assets/images/lions.png')} style={{zIndex: -1, transform: [{scale: 0.7}], width: 500, height: 300, position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: -45}} />
        </View>
    )
}

export default Landing;