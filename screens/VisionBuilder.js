import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, Image, Pressable, View, SafeAreaView, ScrollView, Text } from 'react-native';
import Styles from "../style.js";
import Card from '../components/Card.js';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { getStorage, getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import {app, auth, db, storage } from '../firebase.js';

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

    let isCancelled = React.useRef(false);

    const [selectedCards, setSelectedCards] = useState([]);
    const [exampleCards, setExampleCards] = useState([]);
    let [shownVisionCards, setShownVisionCards] = useState([...exampleCards]);
    let [example1Url, setExample1Url] = useState();
    let [example2Url, setExample2Url] = useState();
    let [category, setCategory] = useState('all');

    useEffect(() => {
      getSelectedCards();
    }, [])

    function getSelectedCards() {
      if(!isCancelled.current) {
        const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');

        // get user's cards
        onValue(cardsRef, (snapshot) => {
            const cards = snapshot.val();
            let cardsArr = [];
            for (var key in cards) {
                cardsArr.push(cards[key])
            }
            setSelectedCards(cardsArr);
        });

        setExampleCards([
          { id: 1, text: "My partner is kind.", type: "text", category: "qualities" },
          { id: 2, uri: 'https://firebasestorage.googleapis.com/v0/b/aphrodite-prototype-59a3b.appspot.com/o/images%2Fexamples%2Fexample1.jpg?alt=media&token=7675714d-7806-44af-b396-289944ebaae6', type: "image" },
          { id: 3, uri: 'https://firebasestorage.googleapis.com/v0/b/aphrodite-prototype-59a3b.appspot.com/o/images%2Fexamples%2Fexample2.jpg?alt=media&token=7b349f73-f3da-4d6b-ac24-a415b6bfac3d', type: "image" },
          { id: 4, text: "We are a power couple.", type: "text", category: "career" },
          { id: 5, text: "We support each other.", type: "text", category: "qualities" },
          { id: 6, text: "My partner is patient.", type: "text", category: "qualities" },
          { id: 7, text: "My partner is faithful.", type: "text", category: "qualities" },
          { id: 8, text: "My partner is generous.", type: "text", category: "qualities" },
          { id: 9, text: "My partner sees me for who I am.", type: "text", category: "qualities" },
          { id: 10, text: "My partner is healthy.", type: "text", category: "health" },
          { id: 11, text: "We go out to eat once a week.", type: "text", category: "lifestyle" },
        ]);
        setShownVisionCards([...exampleCards]);
      }
    }

    const uploadImage = async(uri) => {
      // push example image ref to user in database
      const response = await fetch(uri);
      const blob = await response.blob();

      // upload reference in the database
      const userRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/');
      const newCard = push(userRef, {
        name: blob.data.name,
        type: 'image',
        blob,
        dateAdded: Date.now(),
        uri: blob.data.name === 'example1.jpg' ? 'https://firebasestorage.googleapis.com/v0/b/aphrodite-prototype-59a3b.appspot.com/o/images%2Fexamples%2Fexample1.jpg?alt=media&token=7675714d-7806-44af-b396-289944ebaae6' : 'https://firebasestorage.googleapis.com/v0/b/aphrodite-prototype-59a3b.appspot.com/o/images%2Fexamples%2Fexample2.jpg?alt=media&token=7b349f73-f3da-4d6b-ac24-a415b6bfac3d'
      });
      const uid = newCard.key;
      update(newCard, {id: uid});
    }

    // select/deselect card
    const clickCard = async(card) => {
      let isSelectedAlready = [];
      let cardsRef = [];

      // if user already has cards
      if(selectedCards.length > 0) {
        isSelectedAlready = selectedCards.filter(selectedCard =>
          card.type === 'text' ? selectedCard.text == card.text : selectedCard.uri == card.uri);
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
          // setSelectedCards([...selectedCards, newCard]);
        } else {
          uploadImage(card.uri);
        }
      } else {
        const isSelectedAlreadyId = isSelectedAlready[0].id;
        cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards/' + isSelectedAlreadyId);
        // const updatedCards = selectedCards.length > 0 ? selectedCards.filter(selectedCard =>
        //   selectedCard.text !== card.text) : null;
        // if(selectedCards.length > 0) {
        //   setSelectedCards(updatedCards);
        // }
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

    function clickChip(category) {
      setCategory(category);
      if(category === 'all') {
        setShownVisionCards(exampleCards);
      } else if(category === 'lifestyle') {
        setShownVisionCards(exampleCards.filter(card => { return card.category === 'lifestyle' }));
      } else if(category === 'qualities') {
        setShownVisionCards(exampleCards.filter(card => { return card.category === 'qualities' }));
      } else if(category === 'career') {
        setShownVisionCards(exampleCards.filter(card => { return card.category === 'career' }));
      } else if(category === 'health') {
        setShownVisionCards(exampleCards.filter(card => { return card.category === 'health' }));
      }
    }

    return (
      <View style={[Styles.containerWithoutHeader, Styles.lightBackground, {flex: 1}]}>
        <View style={[Styles.customHeader, {marginBottom: 30}]}>
          <Pressable
            style={[Styles.textAlignRight, Styles.flexOne]}
            onPress={() => selectedCards.length > 0 ? props.navigation.navigate('Dashboard', {hasCards: true}) : props.navigation.navigate('Dashboard', {hasCards: false})}>
              <Ionicons name='arrow-back-outline' size={24} />
          </Pressable>

          <Pressable
            style={[Styles.button, Styles.buttonSmall]}
            onPress={() => clickDone()}>
              <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}>Done</Text>
          </Pressable>
        </View>

        <View style={Styles.containerPadding}>
          <ScrollView
            style={{height: '90%'}}
            showsVerticalScrollIndicator={false}>
            
            <Text style={[Styles.heading1, {marginBottom: 20, fontFamily: 'Poppins_600SemiBold'}]}>What do you want in your relationship?</Text>
            <Text style={[Styles.heading2, {fontFamily: 'Poppins_500Medium', marginBottom: 20}]}>Tap any that apply</Text>
          
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={[Styles.displayFlex, Styles.chipsContainer]}>
                <Pressable style={[Styles.chip, category === 'all' ? Styles.selectedChip : null]}
                    onPress={() => clickChip('all')}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>all</Text>
                </Pressable>
                <Pressable style={[Styles.chip, category === 'lifestyle' ? Styles.selectedChip : null]}
                    onPress={() => clickChip('lifestyle')}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>lifestyle</Text>
                </Pressable>
                <Pressable style={[Styles.chip, category === 'qualities' ? Styles.selectedChip : null]}
                    onPress={() => clickChip('qualities')}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>qualities</Text>
                </Pressable>
                <Pressable style={[Styles.chip, category === 'career' ? Styles.selectedChip : null]}
                    onPress={() => clickChip('career')}>
                  <Text style={[Styles.chipText, {fontFamily: 'Poppins_600SemiBold'}]}>career</Text>
                </Pressable>
                <Pressable style={[Styles.chip, category === 'health' ? Styles.selectedChip : null]}
                    onPress={() => clickChip('health')}>
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

            <ScrollView contentContainerStyle={Styles.twoColumnLayout} showsVerticalScrollIndicator={false}>
              {shownVisionCards.map(card => 
                <Card
                  key={card.id}
                  card={card}
                  isSelected={selectedCards.filter(selectedCard => selectedCard.type === 'text' ? selectedCard.text == card.text : selectedCard.uri == card.uri).length > 0}
                  onCardPress={() => clickCard(card)} />)}
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    )
  }
  
  export default VisionBuilder;