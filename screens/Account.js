import React, { useState, useEffect, useRef } from 'react';
import { Image, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import Styles from "../style.js";
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import EditProfile from '../components/EditProfile.js';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, deleteUser, reauthenticateWithCredential, PhoneAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import {app, auth, db, storage } from '../firebase.js';
import RBSheet from "react-native-raw-bottom-sheet";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function AccountScreen(props) {
  const recaptchaVerifier = useRef(null);
  const userRef = ref(db, 'users/' + auth.currentUser.uid);
  const credential = props.route.params ? props.route.params.credential : null;
  const refRBSheet = useRef(); // bottom drawer

  if(!auth.currentUser) {
    props.navigation.navigate('Landing');
  }
  
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentFieldKey, setCurrentFieldKey] = useState(null);
  const [currentVal, setCurrentVal] = useState(null);
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState(false);
  const [confirmValidationCode, setConfirmValidationCode] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [message, showMessage] = useState();
  const [currentStep, setCurrentStep] = useState(props.route.params ? props.route.params.currentStep : 1);
  const attemptInvisibleVerification = false;

  useEffect(() => {
    let isMounted = true;
    
    if(isMounted) {
      onValue(userRef, (snapshot) => {
        setCurrentUser(snapshot.val());
        setPhoneNumber(snapshot.val().phoneNumber);
      });
    }

    return () => { isMounted = false };
  }, [])

  function makeFieldKey(field) {
    if(field === 'first name') {
      return 'firstName';
    } else if(field === 'last name') {
      return 'lastName';
    } else if(field === 'email') {
      return 'email';
    } else if(field === 'phone number') {
      return 'phoneNumber';
    } else if(field === 'birthday') {
      // to do
    } else if(field === 'pronouns') {
      return 'pronouns';
    } else if(field === 'identity') {
      return 'identity';
    }
  }

  function formatPhoneNumber(phoneNumber) {
    const cleanNumber = phoneNumber.replace('+1', '');
    return addDashes(cleanNumber);
  }

  function addDashes(f) {
    return f.slice(0,3)+"-"+f.slice(3,6)+"-"+f.slice(6);
}

  function handleEditClick(field, fieldData) {
    setCurrentField(field);
    setCurrentVal(fieldData);
    setIsModalVisible(true);

    if(field === 'birthday') {
      setCurrentFieldKey(['birthdayMonth', 'birthdayDay', 'birthdayYear']);
    } else {
      setCurrentFieldKey(makeFieldKey(field));
    }
  }

  function displayIdentityText(text) {
    let displayText = null;
    
    if(text === 'heterosexual') {
      return displayText = 'Heterosexual';
    } else if(text === 'gayOrLesbian') {
      return displayText = 'Gay or lesbian';
    } else if(text === 'bisexual') {
      return displayText = 'Bisexual';
    } else if(text === 'preferNotToAnswer') {
      return displayText = 'Prefer not to answer';
    }
  }

  function handleSaveText(text) {
    if(currentField === 'birthday') {
      update(userRef, {
        'birthdayMonth': text[0],
        'birthdayDay': text[1],
        'birthdayYear': text[2]
      });
    } else {
      update(userRef, {
        [currentFieldKey]: text
      });
    }

    setCurrentField(null);
    setCurrentFieldKey(null);
    setCurrentVal(null);
    setIsModalVisible(false);
  }

  function handleCancel() {
    setCurrentField(null);
    setCurrentFieldKey(null);
    setCurrentVal(null);
    setIsModalVisible(false);
  }

  function clickLogOut() {
    auth.signOut();
    props.navigation.navigate('Landing');
  }

  function removePhoneFormatting(input) {
    const cleanNumber = input.replace('+1', '');
    return cleanNumber.replace('-', '');
  }

  function clickDeleteAccount() {
    refRBSheet.current.open();
  }

  function confirmDeleteAccount() {
    setConfirmPhoneNumber(true);
  }

  function deleteCurrentUser() {
    refRBSheet.current.close();
    setConfirmValidationCode(false);
    // const credential = promptForCredentials();
    // reauthenticateWithCredential(auth.currentUser, credential).then(() => {
      auth.currentUser.delete()
        .then(() => {
          // remove(userRef);
          props.navigation.navigate('Sending', {text: 'Deleting account', isDeletingAccount: true});
          console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log(error)
        });
    // }).catch((error) => {
    //   alert(error)
    // });
  }

  return (<>
    {currentUser && <View style={[Styles.containerWithoutHeader, Styles.lightBackground]}>
      {isModalVisible &&
          <EditProfile currentField={currentField} currentValue={currentVal} onSave={handleSaveText} onCancel={handleCancel} />}

      {!isModalVisible && (
        <View style={[Styles.containerPadding, Styles.lightBackground]}>
          <Text style={[Styles.heading1, {marginTop: 25, fontFamily: 'Poppins_600SemiBold'}]}>Account</Text>
          
          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.firstName}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('first name', currentUser.firstName)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.lastName}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('last name', currentUser.lastName)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.email}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('email', currentUser.email)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{formatPhoneNumber(currentUser.phoneNumber)}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => props.navigation.navigate('PhoneNumber', {isNewUser: false, currentStep: 1, phoneNumber: currentUser.phoneNumber})}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.birthdayMonth} / {currentUser.birthdayDay} / {currentUser.birthdayYear}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('birthday', [currentUser.birthdayMonth, currentUser.birthdayDay, currentUser.birthdayYear])}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.pronouns}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('pronouns', currentUser.pronouns)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{displayIdentityText(currentUser.identity)}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('identity', currentUser.identity)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <Pressable
              style={[Styles.button, Styles.textAlignCenter, {marginTop: 25}]}
              onPress={() => clickLogOut()}>
                <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}>Logout</Text>
          </Pressable>

          <Pressable
            style={[Styles.buttonLink, Styles.textAlignCenter, {marginTop: 25}]}
            onPress={() => clickDeleteAccount()}>
              <Text style={[Styles.buttonLinkText, {fontFamily: 'Poppins_400Regular'}]}>Delete account</Text>
          </Pressable>

          <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={325}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0, 0, 0, 0.6)'
                },
                draggableIcon: {
                  backgroundColor: '#000'
                }
              }}>
                <View style={Styles.bottomDrawer}>
                    {!confirmPhoneNumber && !confirmValidationCode &&
                      <View>
                        <View style={Styles.displayFlex}>
                          <Text style={[Styles.bottomDrawerHeader, Styles.flexOne, {marginTop: 15, fontFamily: 'Poppins_600SemiBold'}]}>Delete your account?</Text>
                          <Pressable
                            style={[Styles.topRightCloseButton, {position: 'absolute', top: -5, right: 0}]}
                            onPress={() => refRBSheet.current.close()}>
                                <Ionicons name="close-outline" size={48}></Ionicons>
                          </Pressable>
                        </View>
                          
                        <Text style={[Styles.bottomDrawerText, {fontFamily: 'Poppins_400Regular'}]}>You won't be able to recover your account.</Text>
                        <Pressable style={Styles.button} onPress={() => confirmDeleteAccount()}>
                          <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}>Delete account</Text>
                        </Pressable>
                      </View>}

                    {confirmPhoneNumber &&
                        <><View style={Styles.displayFlex}>
                          <Pressable
                            style={[Styles.topRightCloseButton, {position: 'absolute', top: -5, right: 0}]}
                            onPress={() => refRBSheet.current.close()}>
                                <Ionicons name="close-outline" size={48}></Ionicons>
                          </Pressable>
                        </View>
                        <FirebaseRecaptchaVerifierModal
                          ref={recaptchaVerifier}
                          firebaseConfig={app.options}
                          attemptInvisibleVerification={true}
                        />
                        <View style={{marginTop: 75}}>
                          <Text style={[Styles.inputLabel, {fontFamily: 'Poppins_600SemiBold', marginBottom: 20}]}>Phone number</Text>
                          <View style={{position: 'relative'}}>
                            <Image source={require('../assets/images/flag_emoji.jpg')} style={{width: 20, height: 15, position: 'absolute', bottom: 57}} />
                            <Text style={[{fontSize: 26, position: 'absolute', left: 30, bottom: 45, fontFamily: 'Poppins_500Medium'}]}> +1</Text>
                            <TextInput
                              style={[Styles.textInput, {paddingLeft: 80, fontFamily: 'Poppins_500Medium'}]}
                              autoFocus={true}
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
                                setConfirmPhoneNumber(false);
                                setConfirmValidationCode(true);
                              } catch (err) {
                                showMessage({ text: `Error: ${err.message}`, color: 'red' });
                              }
                            }}>
                              <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}>Send verification code</Text>
                          </Pressable>
                        </View>
                      </>}

                      {confirmValidationCode && 
                        <>
                        <View style={{marginTop: 35}}>
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
      
                                deleteCurrentUser();
                              } catch (err) {
                                showMessage({ text: `Error: ${err.message}`, color: 'red' });
                              }
                            }}>
                              <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}>Delete account</Text>
                          </Pressable>
      
                          {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
                        </View></>}
                </View>
              </RBSheet>
        </View>
    )}

    </View>
    }</>);
};

export default AccountScreen;