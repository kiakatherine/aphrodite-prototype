import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import Styles from "../style.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card.js';
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

    return (
        <View style={[Styles.containerWithoutHeader, Styles.darkBackground, {flex: 1}]}>
            <StatusBar barStyle="light-content" />
            <View style={[Styles.customHeader, {marginBottom: 30}]}>
                <Pressable
                    style={[Styles.textAlignRight, Styles.flexOne]}
                    onPress={() => props.navigation.navigate('VisionCustomizer')}>
                        <Ionicons style={{color: 'white'}} name='arrow-back-outline' size={24} />
                </Pressable>

                <Pressable
                    style={[Styles.buttonLink]}
                    onPress={() => props.navigation.navigate("VisionCustomizer")}>
                        <Ionicons style={{color: 'white'}} name='create-outline' size={24} />
                </Pressable>
            </View>
            
            <View style={{paddingLeft: 25, paddingRight: 25}}>
                <ScrollView style={{height: '86%'}} showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={[Styles.heading1, Styles.textAlignCenter, Styles.textWhite, {marginTop: 10, marginBottom: 15, fontFamily: 'Poppins_600SemiBold'}]}>Relationship Vision</Text>
                        <Text style={[Styles.heading2, Styles.textAlignCenter, Styles.textWhite, {marginBottom: 30, fontFamily: 'Poppins_500Medium'}]}>Feel the feelings of this being true</Text>
                    </View>

                    {cards.length === 0 &&
                        <Pressable
                            style={[Styles.buttonOutline, {marginBottom: 40}]}
                            onPress={() => props.navigation.navigate('VisionBuilder')}>
                                <Text style={[Styles.buttonText, {fontFamily: 'Poppins_600SemiBold'}]}><Ionicons style={{color: 'white'}} name='add' size={18} /> Add cards</Text>
                        </Pressable>}
                    
                    <ScrollView contentContainerStyle={[Styles.twoColumnLayout, {justifyContent: 'space-between'}]} showsVerticalScrollIndicator={false}>
                        {cards.length > 0 &&
                            cards.map(card => <Card key={card.id} card={card} darkTheme={true} onCardPress={clickCard} />)}
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
}

export default PreviewTiles;