import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";

function RemovableCard(props) {
    console.log('image', props.card);

    return (
        <View style={[Styles.Card, !props.card.text ? Styles.CardWithImage : '']}>
            <Pressable
                style={Styles.RemovableCardButton}
                onPress={() => props.onRemovableCardPress(props.card)}>
                    <Text style={Styles.RemovableCardButtonText}>X</Text>
            </Pressable>

            {props.card.text && <Text style={Styles.CardText}>{props.card.text}</Text>}
            
            {!props.card.text && <Image source={{ uri: props.card.uri }} style={{flex:1 , width: '100%', height: undefined}} />}
        </View>
    );
  }

export default RemovableCard;