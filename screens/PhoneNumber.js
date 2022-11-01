import React, { useRef, useState } from 'react';
import { Button, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import {app, auth, db, storage } from '../firebase.js';
import ProgressBar from '../components/ProgressBar.js';

function PhoneNumber(props) {    
    // Ref or state management hooks
    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const [message, showMessage] = useState();
    const [currentStep, setCurrentStep] = useState(props.route.params ? props.route.params.currentStep : 1);
    const attemptInvisibleVerification = false;

    function removePhoneFormatting(input) {
      return input.replace(/[^a-z0-9]/gi, '');
    }

    return (
      <>
        <View style={[Styles.containerWithoutHeader, Styles.lightBackground]}>
          <View style={[Styles.customHeader, {borderBottomWidth: 0}]}>
              <Pressable
                  style={[Styles.textAlignRight, Styles.flexOne]}
                  onPress={() => currentStep === 1 ? props.navigation.navigate('Landing') : setCurrentStep(1)}>
                      <Ionicons name='arrow-back-outline' size={24} />
              </Pressable>

              <Pressable
                  onPress={() => props.navigation.navigate('Landing')}>
                    <Ionicons name="close-outline" size={32}></Ionicons>
              </Pressable>
          </View>

          <ProgressBar currentStep={currentStep} />

          <View style={[Styles.centerContainer, {paddingBottom: currentStep === 2 ? 205 : 170}]}>
              <View>
                {currentStep === 1 &&
                  <><FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={app.options}
                    attemptInvisibleVerification={true}
                  />
                  <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_600SemiBold', marginBottom: 20}]}>Phone number</Text>
                  <View style={{position: 'relative'}}>
                    <Image source={require('../assets/images/flag_emoji.jpg')} style={{width: 20, height: 15, position: 'absolute', bottom: 57}} />
                    <Text style={[{fontSize: 26, position: 'absolute', left: 30, bottom: 45, fontFamily: 'Poppins_500Medium'}]}> +1</Text>
                    <TextInput
                      style={[Styles.textInput, {paddingLeft: 80, fontFamily: 'Poppins_500Medium'}]}
                      autoFocus={true}
                      value={phoneNumber}
                      keyboardType='numeric'
                      textContentType="telephoneNumber"
                      onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                    />
                  </View>
                  <Pressable
                    style={[Styles.button, Styles.modalBottomButton, (!phoneNumber || phoneNumber.length < 10) ? Styles.buttonDisabled : null]}
                    disabled={(phoneNumber && phoneNumber.length < 10) ? true : false}
                    onPress={async () => {
                      // The FirebaseRecaptchaVerifierModal ref implements the
                      // FirebaseAuthApplicationVerifier interface and can be
                      // passed directly to `verifyPhoneNumber`.
                      try {
                        const phoneProvider = new PhoneAuthProvider(auth);
                        const verificationId = await phoneProvider.verifyPhoneNumber(
                          // phoneNumber.indexOf('+') > -1 ? phoneNumber : '+' + phoneNumber,
                          '+1' + removePhoneFormatting(phoneNumber),
                          recaptchaVerifier.current
                        );
                        setVerificationId(verificationId);
                        showMessage({
                          text: 'Verification has been sent.',
                        });
                        setCurrentStep(2);
                      } catch (err) {
                        showMessage({ text: `Error: ${err.message}`, color: 'red' });
                      }
                    }}>
                      <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}>Send verification code</Text>
                  </Pressable>
                  </>}
                
                {currentStep === 2 &&
                  <>
                    <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_600SemiBold', marginBottom: 20}]}>Validation code</Text>
                    <TextInput
                      autoFocus={true}
                      keyboardType="phone-pad"
                      style={Styles.textInput}
                      editable={!!verificationId}
                      placeholder="000000"
                      onChangeText={setVerificationCode}
                    />

                    {message && <Text style={[Styles.message, {fontFamily: 'Poppins_400Regular'}]}>{message.text}</Text>}

                    <Pressable
                      style={[Styles.button, Styles.modalBottomButton, (!verificationId || !verificationCode) ? Styles.buttonDisabled : null]}
                      disabled={!verificationId || !verificationCode}
                      onPress={async () => {
                        try {
                          const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
                          let userData = await signInWithCredential(auth, credential);
                          showMessage({ text: 'Phone authentication successful 👍' });
                          const db = getDatabase();
                          const reference = ref(db, 'users/' + userData.user.uid);
                          props.navigation.navigate('NewUser', {user: userData.user.uid, phoneNumber: userData.user.phoneNumber});
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
      </>
    );
};

export default PhoneNumber;