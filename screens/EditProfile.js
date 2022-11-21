import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';

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

    const [newText, onChangeText] = useState(props.route.params.currentValue);
    const [birthdayMonth, onChangeBirthdayMonth] = useState(props.route.params.currentValue[0]);
    const [birthdayDay, onChangeBirthdayDay] = useState(props.route.params.currentValue[1]);
    const [birthdayYear, onChangeBirthdayYear] = useState(props.route.params.currentValue[2]);

    function clickSave(text) {
        if(props.route.params.currentField === 'birthday') {
          update(props.route.params.userRef, {
            'birthdayMonth': text[0],
            'birthdayDay': text[1],
            'birthdayYear': text[2]
          });
          props.navigation.navigate('Sending', { text: 'Saving', isUpdatingInfo: true });
        } else {
          update(props.route.params.userRef, {
            [props.route.params.currentFieldKey]: text
          }).then(resp => {
            console.log('successfully updated user');
            props.navigation.navigate('Sending', { text: 'Saving', isUpdatingInfo: true });
          }).catch(err => {
            console.log('error: ', err);
          });
        }
    }

    return (
        <View style={[Styles.lightBackground, Styles.containerWithoutHeader, { height: '100%' }]}>
            <View style={Styles.customHeader}>
                <Pressable
                    style={[Styles.textAlignRight, Styles.flexOne]}
                    onPress={() => props.navigation.navigate('Account')}>
                        <Ionicons name='close-outline' size={32} />
                </Pressable>

                <Pressable
                    style={[Styles.button, Styles.buttonSmall]}
                    onPress={() => clickSave(props.route.params.currentField === 'birthday' ? [birthdayMonth, birthdayDay, birthdayYear] : newText)}>
                        <Text style={[Styles.buttonSmallText, {fontFamily: 'Poppins_600SemiBold'}]}>Save</Text>
                </Pressable>
            </View>
                
            <View style={[(props.route.params.currentField !== 'pronouns' && props.route.params.currentField !== 'identity') ? Styles.centerContainer : Styles.containerPadding,
                            (props.route.params.currentField !== 'pronouns' && props.route.params.currentField !== 'identity') ? '' : {paddingTop: 45}]}>
                {(props.route.params.currentField !== 'pronouns' && props.route.params.currentField !== 'identity') &&
                    <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_500Medium'}]}>{props.route.params.currentField}</Text>}
                
                {(props.route.params.currentField !== 'birthday' && props.route.params.currentField !== 'phone number' && props.route.params.currentField !== 'pronouns' && props.route.params.currentField !== 'identity') &&
                    <TextInput
                        style={Styles.textInput}
                        autoFocus={true}
                        value={newText}
                        keyboardType={props.route.params.currentField === 'phone number' ? 'numeric' : null}
                        onChangeText={onChangeText}
                    />}

                {props.route.params.currentField === 'birthday' &&
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

                {props.route.params.currentField === 'pronouns' &&
                    <View>
                        <Text style={[Styles.heading1, {marginBottom: 25, fontFamily: 'Poppins_500Medium'}]}>What pronouns do you use?</Text>
                        <Pressable
                            style={[Styles.buttonInverted, newText === 'she/her/hers' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('she/her/hers')}>
                            <Text style={Styles.buttonInvertedText}>she/her/hers</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, newText === 'he/him/his' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('he/him/his')}>
                            <Text style={Styles.buttonInvertedText}>he/him/his</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, newText === 'they/them/theirs' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('they/them/theirs')}>
                            <Text style={Styles.buttonInvertedText}>they/them/theirs</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, newText === 'ze/hir/hirs' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('ze/hir/hirs')}>
                            <Text style={Styles.buttonInvertedText}>ze/hir/hirs</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, newText === 'preferNotToSay' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('preferNotToSay')}>
                            <Text style={Styles.buttonInvertedText}>Prefer not to say</Text>
                        </Pressable>
                    </View>}
                
                {props.route.params.currentField === 'identity' &&
                    <View>
                        <Text style={[Styles.heading1, {marginBottom: 25, fontFamily: 'Poppins_500Medium'}]}>I identify as</Text>
                        <Pressable
                            style={[Styles.buttonInverted, newText === 'heterosexual' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('heterosexual')}>
                            <Text style={Styles.buttonInvertedText}>Heterosexual</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, newText === 'gayOrLesbian' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('gayOrLesbian')}>
                            <Text style={Styles.buttonInvertedText}>Gay or lesbian</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, newText === 'bisexual' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('bisexual')}>
                            <Text style={Styles.buttonInvertedText}>Bisexual</Text>
                        </Pressable>

                        <Pressable
                            style={[Styles.buttonInverted, newText === 'preferNotToAnswer' ? Styles.buttonInvertedSelected : null]}
                            onPress={() => onChangeText('preferNotToAnswer')}>
                            <Text style={Styles.buttonInvertedText}>Prefer not to answer</Text>
                        </Pressable>
                    </View>}
            </View>
        </View>
    );
  }

export default EditProfile;

