import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, Image, Pressable, View, SafeAreaView, ScrollView, Text } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps/index.js';
// import { FlatList } from 'react-native-web';

function VisionBuilder(props) {
    let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
    });

    useEffect(() => {
      let isMounted = true;

      if(isMounted) {
        const app = getApp();
        const auth = getAuth(app);
        const db = getDatabase();
        const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
        onValue(cardsRef, (snapshot) => {
            const cards = snapshot.val();
            let cardsArr = [];
            for (var key in cards) {
                cardsArr.push(cards[key])
            }
            setSelectedCards(cardsArr);
        });
      }

      return () => { isMounted = false };
    }, [])

    const [selectedCards, setSelectedCards] = useState([]);
    const exampleCards = [
      { id: 1, text: "My partner is kind.", type: "text" },
      { id: 2, filePath: '../assets/images/example1.jpg', type: "example-image-1" },
      { id: 3, filePath: '../assets/images/example2.jpg', type: "example-image-2" },
      { id: 4, text: "We are a power couple.", type: "text" },
      { id: 5, text: "We support each other.", type: "text" },
      { id: 6, text: "My partner is patient.", type: "text" },
      { id: 7, text: "My partner is faithful.", type: "text" },
      { id: 8, text: "My partner is generous.", type: "text" },
      { id: 9, text: "My partner sees me for who I am.", type: "text" },
    ];

    const uploadImage = async(uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const userRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/');
  
      const newCard = push(userRef, blob);
      const uid = newCard.key;
      update(newCard, {id: uid, 'type': 'image'});
      
      // const updatedCard = {
      //   'type': 'image',
      //   'id': uid,
      //   'image': blob
      // }
  
      // setMyVisionCards(rest => [...rest, updatedCard]);
    }

    // select/deselect card
    function clickCard(card) {
      const app = getApp();
      const auth = getAuth(app);
      const db = getDatabase();
      let isSelectedAlready = [];
      let cardsRef = [];

      // if user already has cards
      if(selectedCards.length > 0) {
        isSelectedAlready = selectedCards.filter(selectedCard =>
          selectedCard.text == card.text);
      }

      if(isSelectedAlready.length === 0) {
        cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/');

        if(card.type === 'text') {
          const addedCard = push(cardsRef, card);
          const uid = addedCard.key;
          update(addedCard, { id: uid });
          const newCard = {
            'text': card.text,
            'type': card.type,
            'id': uid
          };        
          setSelectedCards([...selectedCards, newCard]);
        } else if(card.type === 'image') {
          // FIX: upload image to firebase
          // how to get image uri?
          // uploadImage(card.filePath);
        }
      } else {
        const uid = isSelectedAlready[0].id;
        cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/' + uid);
        const updatedCards = selectedCards.length > 0 ? selectedCards.filter(selectedCard =>
          selectedCard.text !== card.text) : null;
        if(selectedCards.length > 0) {
          setSelectedCards(updatedCards);
        }
        remove(cardsRef).then(() => {
          // alert('Card removed');
        }).catch(error => {
          // alert('Error');
        });
      } 
    }

    // save all cards
    function clickDone() {
      if(selectedCards.length > 0)  {
        // save cards with unique id
        selectedCards.forEach(card => {
          let newCards = [];

          // check for duplicates before adding to database
          const cardsToAdd = selectedCards.filter((card, index) => {
            return card.text !== selectedCards[index].text; 
          });

          if(cardsToAdd.length === 0) {
            // no new cards to add
            props.navigation.navigate("VisionCustomizer", {selectedCards});
          } else {
            const addedCard = push(cardsRef, card);
            const uid = addedCard.key;
            update(addedCard, { id: uid });
            newCards.push({
              'text': card.text,
              'type': card.type,
              'id': uid
            });
          }
          
          setSelectedCards(newCards);
          props.navigation.navigate("VisionCustomizer", {selectedCards: newCards});
        });
      }
      props.navigation.navigate("VisionCustomizer", {selectedCards});
    }

    return (
      <View style={[Styles.containerWithoutHeader, Styles.lightBackground, {flex: 1}]}>
        <View style={[Styles.customHeader, {marginBottom: 30}]}>
          <Pressable
            style={[Styles.textAlignRight, Styles.flexOne]}
            onPress={() => selectedCards.length > 0 ? props.navigation.navigate('Dashboard') : props.navigation.navigate('Welcome')}>
              <Ionicons name='arrow-back-outline' size={24} />
          </Pressable>

          <Pressable
            style={[Styles.button, Styles.buttonSmall]}
            onPress={() => clickDone()}>
              <Text style={[Styles.buttonText]}>Done</Text>
          </Pressable>
        </View>

        <View style={Styles.containerPadding}>
          <ScrollView
            style={[Styles.twoColumn, {height: '85%'}]}
            showsVerticalScrollIndicator={false}>
            
            <Text style={[Styles.heading1, {marginBottom: 20, fontFamily: 'Poppins_600SemiBold'}]}>What do you want in your relationship?</Text>
            <Text style={[Styles.heading2, {fontFamily: 'Poppins_600SemiBold', marginBottom: 20}]}>Tap any that apply</Text>
          
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={[Styles.displayFlex, Styles.chipsContainer]}>
                <Pressable style={Styles.chip}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>all</Text>
                </Pressable>
                <Pressable style={Styles.chip}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>lifestyle</Text>
                </Pressable>
                <Pressable style={Styles.chip}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>qualities</Text>
                </Pressable>
                <Pressable style={Styles.chip}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>career</Text>
                </Pressable>
                <Pressable style={Styles.chip}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>health</Text>
                </Pressable>
            </ScrollView>

            {/* <FlatList
              data={exampleCards}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              /> */}

            {exampleCards.map(card => 
              <Card
                key={card.id}
                card={card}
                isSelected={selectedCards.filter(selectedCard => selectedCard.text == card.text).length > 0}
                onCardPress={() => clickCard(card)} />)}
          </ScrollView>
        </View>
      </View>
    )
  }
  
  export default VisionBuilder;