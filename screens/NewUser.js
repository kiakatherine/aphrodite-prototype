import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Styles from "../style.js";
import { getDatabase, ref, update } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';

function NewUser(props) {
    const [screen, setScreen] = useState('FirstName');
    const [firstName, onChangeFirstName] = useState(null);
    const [lastName, onChangeLastName] = useState(null);
    const [birthdayMonth, onChangeBirthdayMonth] = useState(null);
    const [birthdayDay, onChangeBirthdayDay] = useState(null);
    const [birthdayYear, onChangeBirthdayYear] = useState(null);
    const [email, onChangeEmail] = useState(null);
    const [pronouns, onChangePronouns] = useState(null);
    const [identity, onChangeIdentity] = useState(null);

    function handleNextClick() {
        if(screen == 'FirstName') {
            if(firstName && firstName.length) {
                setScreen('LastName');
            }
        } else if(screen == 'LastName') {
            if(lastName && lastName.length) {
                setScreen('Birthday');
            }
        } else if(screen == 'Birthday') {
            if(birthdayMonth && birthdayDay && birthdayYear) {
                setScreen('Email');
            }
        } else if(screen == 'Email') {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if(reg.test(email) === false) {
                onChangeEmail(email);
                return false;
            } else {
                onChangeEmail(email);
                setScreen('Pronouns');
            }
        } else if(screen == 'Pronouns') {
            setScreen('Identity');
        } else if(screen == 'Identity') {
            setScreen('Terms');
        }
        // else if(screen == 'Terms') {
        //     setScreen('Creating');
        // } else if(screen == 'Creating') {
        //     props.navigation.navigate('Dashboard');
        // }
    }
    
    function saveUser() {
        const app = getApp();
        const auth = getAuth(app);
        const userData = {
            firstName,
            lastName,
            birthdayMonth,
            birthdayDay,
            birthdayYear,
            email,
            pronouns,
            identity
        };
        const db = getDatabase();
        const reference = ref(db, 'users/' + auth.currentUser.uid);
        update(reference, userData).then(() => {
            props.navigation.navigate('Welcome');
        }).catch((error) => {
            alert('Error');
        });
    }

    return (
        <View style={[Styles.centerContainer, Styles.fullScreen, {paddingBottom: 40}]}>
            <Pressable
                style={Styles.topRightCloseButton}
                onPress={() => props.navigation.navigate('Landing')}>
                  <Ionicons name="close-outline" size={48}></Ionicons>
            </Pressable>

            {screen === 'FirstName' &&
                <View>
                    <Text style={Styles.leftHeading1}>First name</Text>
                    <TextInput
                        style={Styles.textInput}
                        autoFocus={true}
                        onChangeText={(text) => {
                            onChangeFirstName(text);
                        }} />
                    <Pressable
                        style={[Styles.button, Styles.modalBottomButton]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </View>}
            
            {screen === 'LastName' &&
                <View>
                    <Text style={Styles.leftHeading1}>Last name</Text>
                    <TextInput
                        style={Styles.textInput}
                        autoFocus={true}
                        onChangeText={(text) => {
                            onChangeLastName(text);
                        }} />
                    <Pressable
                        style={[Styles.button, Styles.modalBottomButton]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </View>}
            
            {screen === 'Birthday' &&
                <View>
                    <Text style={Styles.leftHeading1}>Birthday</Text>
                    <View style={Styles.displayFlex}>
                        <TextInput
                            style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                            autoFocus={true}
                            keyboardType='numeric'
                            placeholder="MM"
                            value={birthdayMonth}
                            maxLength={2}
                            onChangeText={(text) => {
                                onChangeBirthdayMonth(text);
                            }}/>
                        <TextInput
                            style={[Styles.textInput, Styles.flexOne, Styles.validationCodeInput]}
                            keyboardType='numeric'
                            placeholder="DD"
                            maxLength={2}
                            value={birthdayDay}
                            onChangeText={(text) => {
                                onChangeBirthdayDay(text);
                            }}/>
                        <TextInput
                            style={[Styles.textInput, Styles.validationCodeInput, { flex: 2 }]}
                            keyboardType='numeric'
                            placeholder="YYYY"
                            maxLength={4}
                            value={birthdayYear}
                            onChangeText={(text) => {
                                onChangeBirthdayYear(text);
                            }}/>
                    </View>
                    <Pressable
                        style={[Styles.button, Styles.modalBottomButton]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </View>}
            
            {screen === 'Email' &&
                <View>
                    <Text style={Styles.leftHeading1}>Email</Text>
                    <TextInput
                        style={Styles.textInput}
                        autoFocus={true}
                        value={email}
                        onChangeText={(text) => {
                            onChangeEmail(text);
                        }} />
                    <Pressable
                        style={[Styles.button, Styles.modalBottomButton]}
                        onPress={handleNextClick}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </View>}
            
            {screen === 'Pronouns' &&
                <View>
                    <Text style={Styles.leftHeading1}>What pronouns do you use?</Text>
                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangePronouns('she/her/hers');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>she/her/hers</Text>
                    </Pressable>

                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangePronouns('he/him/his');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>he/him/his</Text>
                    </Pressable>

                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangePronouns('they/them/theirs');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>they/them/theirs</Text>
                    </Pressable>

                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangePronouns('ze/hir/hirs');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>ze/hir/hirs</Text>
                    </Pressable>

                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangePronouns('preferNotToSay');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Prefer not to say</Text>
                    </Pressable>
                </View>}
            
            {screen === 'Identity' &&
                <View>
                    <Text style={Styles.leftHeading1}>I identify as</Text>
                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangeIdentity('heterosexual');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Heterosexual</Text>
                    </Pressable>

                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangeIdentity('gayOrLesbian');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Gay or lesbian</Text>
                    </Pressable>

                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangeIdentity('bisexual');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Bisexual</Text>
                    </Pressable>

                    <Pressable
                        style={Styles.buttonInverted}
                        onPress={() => {
                            onChangeIdentity('preferNotToAnswer');
                            handleNextClick();
                        }}>
                        <Text style={Styles.buttonInvertedText}>Prefer not to answer</Text>
                    </Pressable>
                </View>}

            {screen === 'Terms' &&
                <View style={{flex: 1}}>
                    <View style={Styles.centerContainer}>
                        <Text style={Styles.leftHeading1}>Terms & Conditions</Text>
                        <Text style={Styles.bodyText}>Text here</Text>
                    </View>
                    <Pressable
                        style={[Styles.button, Styles.modalBottomButton, {justifyContent: 'flex-end'}]}
                        onPress={saveUser}>
                        <Text style={Styles.buttonText}>I agree</Text>
                    </Pressable>
                </View>}
            
            {/* {screen === 'Creating' &&
                <View>
                    <Text style={[Styles.allCapsHeading, Styles.textAlignCenter, {marginBottom: 25}]}>Creating account</Text>
                    <Pressable
                        style={[Styles.button, Styles.modalBottomButton]}
                        onPress={saveUser}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                </View>} */}
         </View>
    );
};

export default NewUser;