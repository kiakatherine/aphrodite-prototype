import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import Styles from "../style.js";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card.js';
import { getAuth, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { initializeApp, getApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import {app, auth, db, storage } from '../firebase.js';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function PreviewTiles(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
    const previousScreen = props.route.params.previousScreen;
    let [cards, setCards] = useState([]);

    useEffect(() => {
        let isMounted = true;

        if(isMounted) {
            const cardsRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
            onValue(cardsRef, (snapshot) => {
                const cards = snapshot.val();
                let cardsArr = [];
                for (var key in cards) {
                    cardsArr.push(cards[key])
                }
                setCards(cardsArr);
            });
        }

        return () => { isMounted = false };
    }, [])

    function clickCard(card) {
        props.navigation.navigate('PreviewFullScreen', {cards, currentCard: card});
    }

    // const ListItem = ({ item, onPress, isSelected, backgroundColor, textColor }) => (
    //     // <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    //     //   <Text style={[styles.title, textColor]}>{item.title}</Text>
    //     // </TouchableOpacity>
        
    //     <Pressable
    //       style={[Styles.Card, isSelected ? Styles.CardSelected : '']}
    //       selected={isSelected}
    //       onPress={onPress}>
    //         {/* <Text style={Styles.CardText}>{item.text}</Text> */}
    //         <Text style={[Styles.CardText, {fontFamily: 'Poppins_600SemiBold'}]}>{item.text}</Text>
    //       </Pressable>
    //   );
  
    // const renderItem = ({ item }) => {  
    //     return (
    //         <Card key={item.text} card={item} darkTheme={true} onCardPress={clickCard} />
    //     );
    // };

    return (
        <View style={[Styles.containerWithoutHeader, Styles.darkBackground, {flex: 1}]}>
            <StatusBar barStyle="light-content" />
            <View style={[Styles.customHeader, {marginBottom: 30}]}>
                <Pressable
                    style={[Styles.textAlignRight, Styles.flexOne]}
                    onPress={() => props.navigation.goBack()}>
                        <Ionicons style={{color: 'white'}} name='arrow-back-outline' size={24} />
                </Pressable>

                {previousScreen === 'Dashboard' && <Pressable
                    style={[Styles.buttonLink]}
                    onPress={() => props.navigation.navigate("VisionCustomizer")}>
                        <Ionicons style={{color: 'white'}} name='create-outline' size={24} />
                </Pressable>}

                {(previousScreen === 'PreviewTiles' || previousScreen === 'VisionViewCustomizer') && (cards.length === 0) && <Pressable
                    style={[Styles.buttonWhite, Styles.buttonSmall]}
                    onPress={() => props.navigation.navigate("Sending")}>
                        <Text style={Styles.buttonWhiteText}>Create</Text>
                </Pressable>}

                {(previousScreen === 'PreviewTiles' || previousScreen === 'VisionViewCustomizer') && (cards.length > 0) && <Pressable
                    style={[Styles.buttonWhite, Styles.buttonSmall]}
                    onPress={() => props.navigation.navigate("Sending")}>
                        <Text style={Styles.buttonWhiteText}>Save</Text>
                </Pressable>}
            </View>
            
            <View style={Styles.containerPadding}>
                
                
                {/* {cards.length > 0 &&  <Pressable
                    style={[Styles.buttonOutline, {marginBottom: 40}]}
                    onPress={() => props.navigation.navigate("PreviewFullScreen")}>
                        <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}><Ionicons style={{color: 'white'}} name='play' size={18} /> Fullscreen</Text>
                </Pressable>} */}

                <ScrollView style={{height: '86%'}} showsVerticalScrollIndicator={false}>
                    {previousScreen === 'VisionViewCustomizer' &&
                        <Text style={[Styles.heading3, Styles.textAlignCenter, Styles.textWhite, {fontFamily: 'Poppins_600SemiBold'}]}>Preview</Text>}

                    <Text style={[Styles.heading1, Styles.textAlignCenter, Styles.textWhite, {fontFamily: 'Poppins_600SemiBold', marginBottom: 25}]}>Relationship Vision</Text>

                    {cards.length === 0 &&
                        <Pressable
                            style={[Styles.buttonOutline, {marginBottom: 40}]}
                            onPress={() => props.navigation.navigate('VisionBuilder')}>
                                <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}><Ionicons style={{color: 'white'}} name='add' size={18} /> Add cards</Text>
                        </Pressable>}
                    
                    <ScrollView contentContainerStyle={Styles.twoColumnLayout} showsVerticalScrollIndicator={false}>
                        {cards.length > 0 &&
                            cards.map(card => <Card card={card} darkTheme={true} onCardPress={clickCard} />)}
                    </ScrollView>

                    {/* {cards.length > 0 &&
                        // <FlatList
                        //     data={cards}
                        //     renderItem={renderItem}
                        //     keyExtractor={(item) => item.id}
                        //     numColumns={2}
                        //     showsVerticalScrollIndicator={false}
                        //     scrollEnabled={cards.length > 4}
                        //     />}
                    } */}
                    </ScrollView>
            </View>
        </View>
    );
}
  
export default PreviewTiles;