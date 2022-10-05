import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddTextModal from '../components/AddTextModal.js';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential, signOut } from 'firebase/auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function AccountScreen(props) {
  // Firebase references
  const app = getApp();
  const auth = getAuth(app);
  const db = getDatabase();

  if(!auth.currentUser) {
    props.navigation.navigate('Landing');
  }
  
  const userRef = ref(db, 'users/' + auth.currentUser.uid);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentVal, setCurrentVal] = useState(null);

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      setCurrentUser(snapshot.val());
    });
  }, [])

  function handleEditClick(field, fieldData) {
    // FIX FOR BIRTHDAY
    setCurrentField(field);
    setCurrentVal(fieldData);
    setIsModalVisible(true);
  }

  function handleSaveText(text) {
    update(userRef, {
      [currentField]: text
    });
    setCurrentField(null);
    setCurrentVal(null);
    setIsModalVisible(false);
  }

  function handleCancel() {
    setCurrentField(null);
    setCurrentVal(null);
    setIsModalVisible(false);
  }

  function clickLogOut() {
    auth.signOut();
    props.navigation.navigate('Landing');
  }

  return (<>
    {currentUser && <View style={Styles.containerWithoutHeader}>
      {isModalVisible &&
          <AddTextModal value={currentVal} onSave={handleSaveText} onCancel={handleCancel} />}

      {!isModalVisible && (
        <View style={[Styles.containerPadding, {marginTop: 20}]}>
          <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>Account</Text>
          
          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.firstName}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('firstName', currentUser.firstName)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.lastName}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('lastName', currentUser.lastName)}>
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

          {/* <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{phone}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('phone', phone)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View> */}

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.birthdayMonth} / {currentUser.birthdayDay} / {currentUser.birthdayYear}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('birthday', currentUser.birthdayMonth, currentUser.birthdayDay, currentUser.birthdayYear)}>
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
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{currentUser.identity}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('identity', currentUser.identity)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <Pressable
              style={[Styles.button, Styles.textAlignCenter, {marginTop: 25}]}
              onPress={() => clickLogOut()}>
                <Text style={Styles.buttonText}>Logout</Text>
              </Pressable>
        </View>
    )}

    </View>
    }</>);
};

export default AccountScreen;