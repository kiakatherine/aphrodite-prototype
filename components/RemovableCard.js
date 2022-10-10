import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { getAuth, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { initializeApp, getApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getStorage, getDownloadURL, uploadBytes } from "firebase/storage";

function RemovableCard(props) {
  let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
  });

//   useEffect(() => {
//     if(props.card.type === 'image') {
//       const app = getApp();
//       const auth = getAuth(app);
//       const db = getDatabase();
//       // const storage = getStorage();
//       const cardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/' + props.card.id);

//       cardRef.getDownloadURL().then(snapshot => {
//         debugger
//       });
//     }
// }, [])

  return (
      <View style={[Styles.Card, !props.card.text ? Styles.CardWithImage : '']}>
          <Pressable
              style={Styles.RemovableCardButton}
              onPress={() => props.onRemovableCardPress(props.card)}>
                <Text><Ionicons name='trash' size={28} /></Text>
          </Pressable>

          {props.card.text && <Text style={[Styles.CardText, {fontFamily: 'Poppins_500Medium'}]}>{props.card.text}</Text>}
          
          {props.card.type === 'image' && <Image source={{ uri: props.card.uri }} style={{flex:1 , width: '100%', height: undefined}} />}
      </View>
  );
}

export default RemovableCard;