import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Styles from "../style.js";

function AddTextModal(props) {
    const [newText, onChangeText] = useState('');

    return (
        <View>
            <TextInput
                style={Styles.textInput}
                placeholder="Type here"
                value={newText}
                onChangeText={onChangeText}
            />
            <Text style={[Styles.button, Styles.fullWidthButton]} onPress={() => props.onSave(newText)}>Save</Text>
        </View>
    );
  }

export default AddTextModal;

