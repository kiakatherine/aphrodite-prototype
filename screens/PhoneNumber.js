import React, { useRef, useState } from 'react';
import { Button, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';

import PhoneInput, {isValidNumber} from "react-native-phone-number-input";
import { sendSmsVerification } from "../api/verify";

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';


function NewUser({ navigation }) {
    
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

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;


    // const [phone, setPhone] = useState('');
    // const [formattedValue, setFormattedValue] = useState('');

    // // https://www.twilio.com/blog/phone-verification-react-native
    // const sendCode = () => {
    //     sendSmsVerification(formattedValue).then((sent) => {
    //         navigation.navigate("Otp", { phoneNumber: formattedValue });
    //       });
    // };

    return (
        <SafeAreaView style={[Styles.centerContainer, Styles.fullScreen]}>
            <Pressable
                style={Styles.topRightCloseButton}
                onPress={() => navigation.navigate('FirstScreen')}>
                <Ionicons name="close-outline" size={48}></Ionicons>
            </Pressable>

            <View>
                {/* <View>
                    <Text style={[CStyle.baseText, {marginBottom: 20, maxWidth: 300}]}>
                        Your cell phone number will be used for account verification and
                        notifications. Standard rates will apply.
                    </Text>
                </View>*/}

                {/* <View style={{marginBottom: 20, alignSelf: 'center'}}>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold', marginBottom: 20}]}>Phone number</Text>
                        
                        <PhoneInput
                            defaultCode="US"
                            layout="first"
                            value={phone}
                            onChangeFormattedText={text => {
                                setFormattedValue(text);
                                setPhone(text);
                            }}
                            withDarkTheme
                            withShadow
                            autoFocus />

                        <Pressable
                            style={[Styles.modalBottomButton, { marginTop: 50 }]}
                            onPress={sendCode}>
                                <Text style={Styles.buttonText}>Send code</Text>
                        </Pressable>
                    </View>
                </View> */}

<View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        // attemptInvisibleVerification
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          debugger
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: 'Verification code has been sent to your phone.',
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
            await signInWithCredential(auth, credential);
            showMessage({ text: 'Phone authentication successful 👍' });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: 'center' },
          ]}
          onPress={() => showMessage(undefined)}>
          <Text
            style={{
              color: message.color || 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
            </View>
         </SafeAreaView>
    );
};

export default NewUser;