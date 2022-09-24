import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddTextModal from '../components/AddTextModal.js';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function AccountScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentVal, setCurrentVal] = useState(null);

  const [currentUser, setCurrentUser] = useState();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthdayMonth, setBirthdayMonth] = useState(null);
  const [birthdayDay, setBirthdayDay] = useState(null);
  const [birthdayYear, setBirthdayYear] = useState(null);
  const [pronouns, setPronouns] = useState(null);
  const [identity, setIdentity] = useState(null);

  const db = getDatabase();
  const currentUserId = '7133026633';
  const currentUserRef = ref(db, 'users/' + currentUserId);

  useEffect(() => {
    return onValue(currentUserRef, (snapshot) => {
      setCurrentUser(snapshot.val());
      setFirstName(snapshot.val().firstName);
      setLastName(snapshot.val().lastName);
      setEmail(snapshot.val().email);
      setBirthdayMonth(snapshot.val().birthdayMonth);
      setBirthdayDay(snapshot.val().birthdayDay);
      setBirthdayYear(snapshot.val().birthdayYear);
      setPronouns(snapshot.val().pronouns);
      setIdentity(snapshot.val().identity);
    });
  }, [])

  function handleEditClick(field, fieldData) {
    // FIX FOR BIRTHDAY
    setCurrentField(field);
    setCurrentVal(fieldData);
    setIsModalVisible(true);
  }

  function handleSaveText(text) {
    update(currentUserRef, {
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
        <View>
          <Text style={[Styles.heading1, {fontFamily: 'Poppins_600SemiBold'}]}>Account</Text>
          
          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{firstName}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('firstName', firstName)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{lastName}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('lastName', lastName)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{email}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('email', email)}>
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
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{birthdayMonth} / {birthdayDay} / {birthdayYear}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('birthday', birthdayMonth, birthdayDay, birthdayYear)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{pronouns}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('pronouns', pronouns)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>

          <View style={Styles.accountInfoLine}>
            <Text style={[Styles.accountInfoText, { fontFamily: 'Poppins_400Regular' }]}>{identity}</Text>
            <Pressable
              style={Styles.accountInfoButton}
              onPress={() => handleEditClick('identity', identity)}>
                <Ionicons name='create-outline' size={24} />
              </Pressable>
          </View>
        </View>
    )}

    </View>
  );
};

export default AccountScreen;