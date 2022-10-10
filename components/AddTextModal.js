import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';

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

    const [newText, onChangeText] = useState(props.value);

    return (
        <View style={Styles.fullScreen}>
            <Pressable
                style={Styles.topRightCloseButton}
                onPress={() => props.onCancel()}>
                    <Ionicons name="close-outline" size={48}></Ionicons>
            </Pressable>

            <TextInput
                style={[Styles.modalTextInput, {fontFamily: 'Poppins_600SemiBold'}]}
                placeholder="Type here"
                multiline={true}
                value={newText}
                onChangeText={onChangeText} />

            <Pressable
                style={Styles.modalBottomButton}
                onPress={() => props.onSave(newText)}>
                    <Text style={[Styles.buttonText, {fontFamily: 'Poppins_500Medium'}]}>Save</Text>
            </Pressable>
        </View>
    );
  }

export default AddTextModal;

