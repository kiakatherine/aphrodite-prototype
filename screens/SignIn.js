import React, { useEffect, useRef, useState } from 'react';
import { Button, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';

import PhoneInput, {isValidNumber} from "react-native-phone-number-input";
import { sendSmsVerification } from "../api/verify";

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { get } from 'react-native/Libraries/Utilities/PixelRatio.js';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps/index.js';
import useKeyboardHeight from 'react-native-use-keyboard-height';

function SignIn(props) {
    const keyboardHeight = useKeyboardHeight();
    const [view, setView] = useState('phone');
    
    // Firebase references
    const app = getApp();
    const auth = getAuth(app);

    // Double-check that we can run the example
    if (!app?.options || Platform.OS === 'web') {
      throw new Error(
        'This example only works on Android or iOS, and requires a valid Firebase config.'
      );
    }

    // Ref or state management hooks
    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();

    const [message, showMessage] = React.useState();
    const attemptInvisibleVerification = false;

    return (
        <View style={{flex:1}}>
            <Pressable
                  style={[Styles.topRightCloseButton, {zIndex: 2}]}
                  onPress={() => props.navigation.navigate('Landing')}>
                    <Ionicons name="close-outline" size={48}></Ionicons>
            </Pressable>

            <View style={[Styles.centerContainer, {paddingBottom: view === 'phone' ? 50 : 95}]}>
                <View>              
                {view === 'phone' && 
                <><FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={app.options}
                    attemptInvisibleVerification={true}
                />
                <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold', marginBottom: 20}]}>Phone number</Text>
                <TextInput
                    style={Styles.textInput}
                    placeholder="+1 999 999 9999"
                    autoFocus
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                />
                <Pressable
                    style={[Styles.button, Styles.modalBottomButton]}
                    disabled={!phoneNumber}
                    onPress={async () => {
                    // The FirebaseRecaptchaVerifierModal ref implements the
                    // FirebaseAuthApplicationVerifier interface and can be
                    // passed directly to `verifyPhoneNumber`.
                    try {
                        const phoneProvider = new PhoneAuthProvider(auth);
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                        phoneNumber.indexOf('+') > -1 ? phoneNumber : '+' + phoneNumber,
                        recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);
                        showMessage({
                        text: 'Verification code sent to your phone.',
                        });
                        setView('verify');
                    } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: 'red' });
                    }
                    }}>
                    <Text style={Styles.buttonText}>Send verification code</Text>
                </Pressable>
                </>}
                
                {view === 'verify' &&
                    <>
                    <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold', marginBottom: 20}]}>Validation code</Text>
                    <TextInput
                        style={Styles.textInput}
                        editable={!!verificationId}
                        placeholder="123456"
                        onChangeText={setVerificationCode}
                    />

                    {message && <Text style={Styles.message}>{message.text}</Text>}

                    <Pressable
                        style={[Styles.button, Styles.modalBottomButton]}
                        disabled={!verificationId}
                        onPress={async () => {
                        try {
                            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
                            let userData = await signInWithCredential(auth, credential);
                            showMessage({ text: 'Phone authentication successful 👍' });
                            props.navigation.navigate('Dashboard');
                        } catch (err) {
                            showMessage({ text: `Error: ${err.message}`, color: 'red' });
                        }
                        }}>
                        <Text style={Styles.buttonText}>Next</Text>
                    </Pressable>
                    {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
                    </>}
                </View>
            </View>
        </View>
    );
};

export default SignIn;