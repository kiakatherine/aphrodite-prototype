import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import EditProfile from '../components/EditProfile.js';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, deleteUser, reauthenticateWithCredential, PhoneAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import {app, auth, db, storage } from '../firebase.js';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function AccountScreen(props) {
  const userRef = ref(db, 'users/' + auth.currentUser.uid);
  const credential = props.route.params ? props.route.params.credential : null;

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

  useEffect(() => {
    let isMounted = true;    
    
    if(isMounted) {
      onValue(userRef, (snapshot) => {
        setCurrentUser(snapshot.val());
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

  function deleteAccount() {
    alert('work in progress')
    // const userRef = ref(db, 'users/' + auth.currentUser.uid);

    // // const credential = promptForCredentials();
    // reauthenticateWithCredential(auth.currentUser, credential).then(() => {
    //   deleteUser(auth.currentUser)
    //     .then(() => {
    //       remove(userRef);
    //       console.log('Successfully deleted user');
    //       props.navigation.navigate('Landing');
    //     })
    //     .catch((error) => {
    //       alert('Verify account before deleting')
    //       props.navigation.navigate('PhoneNumber', {previousScreen: 'Account'});
    //     });
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
            onPress={() => deleteAccount()}>
              <Text style={[Styles.buttonLinkText, {fontFamily: 'Poppins_400Regular'}]}>Delete account</Text>
          </Pressable>
        </View>
    )}

    </View>
    }</>);
};

export default AccountScreen;