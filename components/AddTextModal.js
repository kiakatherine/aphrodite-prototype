import { useState } from 'react';
import { Text, TextInput, TouchableHighlight, View } from 'react-native';
import Styles from "../style.js";
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function AddTextModal(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const [newText, onChangeText] = useState('');

    if(!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View>
                <TextInput
                    style={[Styles.textInput, , {fontFamily: 'Poppins_400Regular'}]}
                    placeholder="Type here"
                    value={newText}
                    onChangeText={onChangeText}
                />
                <TouchableHighlight style={[Styles.button, Styles.buttonFullWidth]} onPress={() => props.onSave(newText)}>
                    <Text style={[Styles.buttonText, {fontFamily: 'Poppins_500Medium'}]}>Save</Text>
                </TouchableHighlight>
            </View>
        );
    }
  }

export default AddTextModal;

