import { useEffect, useRef } from 'react';
import { Pressable, Text, ScrollView, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useScrollToTop } from '@react-navigation/native';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function InfoModal(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const ref = useRef(null);
    useScrollToTop(ref);

    return (
        <ScrollView ref={ref} style={[Styles.containerWithoutHeader, Styles.lightBackground]}>
            <Pressable
                style={[Styles.topRightCloseButton, {zIndex: 2}]}
                onPress={() => props.onCancel()}>
                    <Ionicons name="close-outline" size={40}></Ionicons>
            </Pressable>

            <View style={[Styles.containerPadding, {paddingTop: 75}]}>
                <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>{props.heading}</Text>
                <Text style={[Styles.bodyText, {fontFamily: 'Poppins_400Regular'}]}>{props.text}</Text>
            </View>
        </ScrollView>
    );
  }

export default InfoModal;

