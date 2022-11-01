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

function EditProfile(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const [newText, onChangeText] = useState(props.currentValue);
    const [birthdayMonth, onChangeBirthdayMonth] = useState(props.currentValue[0]);
    const [birthdayDay, onChangeBirthdayDay] = useState(props.currentValue[1]);
    const [birthdayYear, onChangeBirthdayYear] = useState(props.currentValue[2]);

    return (
        <View style={[Styles.containerWithoutHeader, Styles.lightBackground]}>
            <View style={Styles.customHeader}>
                <Pressable
                    style={[Styles.textAlignRight, Styles.flexOne]}
                    onPress={() => props.onCancel()}>
                        <Ionicons name='close-outline' size={32} />
                </Pressable>

                <Pressable
                    style={[Styles.button, Styles.buttonSmall]}
                    onPress={() => props.onSave(props.currentField === 'birthday' ? [birthdayMonth, birthdayDay, birthdayYear] : newText)}>
                        <Text style={[Styles.buttonSmallText, {fontFamily: 'Poppins_600SemiBold'}]}>Save</Text>
                </Pressable>
            </View>
                
            <View style={[Styles.centerContainer, {paddingBottom: 155}]}>
                <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_500Medium'}]}>{props.currentField}</Text>
                
                {props.currentField !== 'birthday' && <TextInput
                    style={Styles.textInput}
                    autoFocus={true}
                    value={newText}
                    onChangeText={onChangeText}
                />}

                {props.currentField === 'birthday' &&
                    <View style={Styles.displayFlex}>
                        <TextInput
                            style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                            autoFocus={true}
                            keyboardType='numeric'
                            placeholder="MM"
                            value={birthdayMonth}
                            maxLength={2}
                            onChangeText={onChangeBirthdayMonth} />
                        <TextInput
                            style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                            keyboardType='numeric'
                            placeholder="DD"
                            maxLength={2}
                            value={birthdayDay}
                            onChangeText={onChangeBirthdayDay} />
                        <TextInput
                            style={[Styles.textInput, Styles.validationCodeInput, { flex: 2 }]}
                            keyboardType='numeric'
                            placeholder="YYYY"
                            maxLength={4}
                            value={birthdayYear}
                            onChangeText={onChangeBirthdayYear} />
                    </View>}
            </View>
        </View>
    );
  }

export default EditProfile;

