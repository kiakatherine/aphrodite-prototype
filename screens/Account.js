import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddTextModal from '../components/AddTextModal.js';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { signOut } from 'firebase/auth';

function AccountScreen(props) {
  const user = props.initialParams.user;

  // Firebase references
  const app = getApp();
  const auth = getAuth(app);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentVal, setCurrentVal] = useState(null);

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

  return (
    <View style={Styles.containerWithoutHeader}>
      {isModalVisible &&
          <AddTextModal value={currentVal} onSave={handleSaveText} onCancel={handleCancel} />}

      {!isModalVisible && (
        <View style={[Styles.containerPadding, {marginTop: 20}]}>
          <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>Account</Text>
          
          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{user.firstName}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('firstName', user.firstName)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{user.lastName}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('lastName', user.lastName)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{user.email}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('email', user.email)}>
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
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{user.birthdayMonth} / {user.birthdayDay} / {user.birthdayYear}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('birthday', user.birthdayMonth, user.birthdayDay, user.birthdayYear)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{user.pronouns}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('pronouns', user.pronouns)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{user.identity}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('identity', user.identity)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <Pressable
              style={Styles.buttonLink}
              onPress={() => auth.signOut()}>
                <Text>Logout</Text>
              </Pressable>
        </View>
    )}

    </View>
  );
};

export default AccountScreen;