import React from 'react';
import { Pressable, Text, ScrollView, View } from 'react-native';
import Styles from "../style.js";
import {app, auth, db, storage } from '../firebase.js';
import termsAndConditionsText from '../termsAndConditions.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';

function Terms(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });

    return (
        <ScrollView style={[Styles.containerWithoutHeader, Styles.lightBackground]}>
            <Pressable
                style={[Styles.topRightCloseButton, {zIndex: 2}]}
                onPress={() => props.navigation.goBack()}>
                    <Ionicons name="close-outline" size={40}></Ionicons>
            </Pressable>

            <View style={[Styles.containerPadding, {paddingTop: 75}]}>
                <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>Terms and Conditions of Service</Text>
                <Text style={[Styles.bodyText, {fontFamily: 'Poppins_400Regular'}]}>{termsAndConditionsText}</Text>
            </View>
        </ScrollView>
    )
}

export default Terms;