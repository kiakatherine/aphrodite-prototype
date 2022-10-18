import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import '../firebase.js';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function Dashboard(props) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  let [hasCards, setHasCards] = useState(props.route.params ? props.route.params.hasCards : false);

  const app = getApp();
  const auth = getAuth(app);
  const db = getDatabase();

  // function storeFirstThing() {
  //   const db = getDatabase();
  //   const reference = ref(db, 'users/' + 'Alexa');
  //   set(reference, {
  //     highscore: 10,
  //   });
  // }

  useEffect(() => {
    let isMounted = true;    
    
    if(isMounted) {
      const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');

      onValue(cardsRef, (snapshot) => {
        if(snapshot.val()) {
          setHasCards(true);
        } else {
          setHasCards(false);
        }
      });
    }

    return () => { isMounted = false };
  }, [])

  return (
    <>
      {hasCards && <View style={[Styles.lightBackground]}>
        <Pressable
          style={Styles.DashboardVisionView}
          onPress={() => props.navigation.navigate('PreviewTiles', {previousScreen: 'Dashboard'})}>
            {/* <Text style={[Styles.heading1, Styles.textWhite, {fontFamily: 'Poppins_600SemiBold'}]}>Relationship Vision</Text>
            <Ionicons style={{color: 'white'}} name='play-circle' size={64} /> */}
            <Image source={require('../assets/images/play.png')} style={{width: '100%', height: '100%'}} />
        </Pressable>
      </View>}

      {!hasCards && <View style={[Styles.centerContainer, Styles.lightBackground]}>
        <Image source={require('../assets/images/ladder.png')} resizeMode='contain' style={{alignSelf: 'center', height: '55%'}}  />
        <Text style={[Styles.heading1, Styles.textAlignCenter]}>Create Vision</Text>
        <Text style={[Styles.bodyText, Styles.textAlignCenter]}>Clarify what you want & need in your dream relationship.</Text>
        <Pressable
            style={Styles.button}
            onPress={() => props.navigation.navigate('VisionBuilder')}>
            <Text style={Styles.buttonText}>Begin</Text>
        </Pressable>
      </View>}
    </>
  );
}
  
export default Dashboard;