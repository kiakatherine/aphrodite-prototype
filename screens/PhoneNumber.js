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
    const [isNewUser, setIsNewUser] = useState(props.route.params ? props.route.params.isNewUser : true);
    const [isSigningIn, setIsSigningIn] = useState(props.route.params ? props.route.params.isSigningIn : false);
    const [isUpdatingInfo, setIsUpdatingInfo] = useState(props.route.params ? props.route.params.isUpdatingInfo : false);
    const [phoneNumber, setPhoneNumber] = useState(props.route.params ? props.route.params.phoneNumber : null);
    const [verificationId, setVerificationId] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const [message, showMessage] = useState();
    const [currentStep, setCurrentStep] = useState(props.route.params ? props.route.params.currentStep : 1);
    const attemptInvisibleVerification = false;

    function removePhoneFormatting(input) {
      const cleanNumber = input.replace('+1', '');
      return cleanNumber.replace('-', '');
    }

    function handleSavePhoneNumber() {
      const userRef = ref(db, 'users/' + auth.currentUser.uid);
      update(userRef, {phoneNumber: '+1' + phoneNumber});
      props.navigation.navigate('Account');
    }

    return (
      <>
        <View style={[Styles.containerWithoutHeader, Styles.lightBackground]}>
          {isNewUser && <View style={[Styles.customHeader, {borderBottomWidth: 0}]}>
              <Pressable
                  style={[Styles.textAlignRight, Styles.flexOne]}
                  onPress={() => currentStep === 1 ? props.navigation.navigate('Landing') : setCurrentStep(1)}>
                      <Ionicons name='arrow-back-outline' size={24} />
              </Pressable>

              <Pressable
                  onPress={() => props.navigation.navigate('Landing')}>
                    <Ionicons name="close-outline" size={32}></Ionicons>
              </Pressable>
            </View>}

          {isNewUser && <ProgressBar currentStep={currentStep} />}

          {!isNewUser && !isSigningIn &&
            <View style={Styles.customHeader}>
                <Pressable
                    style={[Styles.textAlignRight, Styles.flexOne]}
                    onPress={() => props.navigation.navigate('Account')}>
                      <Ionicons name="close-outline" size={32}></Ionicons>
                </Pressable>

                {currentStep === 2 &&
                  <Pressable
                      style={[Styles.button, Styles.buttonSmall, (!verificationCode || verificationCode.length < 6) ? Styles.buttonDisabled : null]}
                      onPress={() => handleSavePhoneNumber()}>
                          <Text style={[Styles.buttonSmallText, {fontFamily: 'Poppins_600SemiBold'}]}>Save</Text>
                  </Pressable>}
            </View>}

          {isSigningIn &&
              <Pressable
                  style={[Styles.topRightCloseButton, Styles.flexOne, {zIndex: 2}]}
                  onPress={() => props.navigation.navigate('Landing')}>
                    <Ionicons name="close-outline" size={36}></Ionicons>
              </Pressable>}

            <View style={[Styles.centerContainer, {paddingBottom: (currentStep === 2 && !isSigningIn) ? 205 : (currentStep === 2 && isNewUser && !isSigningIn) ? 165 : 170}]}>
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
                      value={(isNewUser || isSigningIn) ? phoneNumber : removePhoneFormatting(phoneNumber)}
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
                          // showMessage({ text: 'Phone authentication successful 👍' });
                          const db = getDatabase();
                          const reference = ref(db, 'users/' + userData.user.uid);

                          if(isNewUser) {
                            props.navigation.navigate('NewUser', {user: userData.user.uid, phoneNumber: userData.user.phoneNumber});
                          } else if(isSigningIn) {
                            props.navigation.navigate('Sending', {text: 'Signing in'});
                          } else if(isUpdatingInfo) {
                            props.navigation.navigate('Sending', {text: 'Saving', isUpdatingInfo: true});
                          }
                        } catch (err) {
                          showMessage({ text: `Error: ${err.message}`, color: 'red' });
                        }
                      }}>
                        <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}>{isSigningIn ? 'Sign in' : 'Next'}</Text>
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