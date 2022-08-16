import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Styles from "../style.js";

function RemovableCard(props) {
    return (
        <View style={Styles.Card}>
            <Pressable
                style={Styles.RemovableCardButton}
                onPress={() => props.onRemovableCardPress(props.card)}>
                    <Text style={Styles.RemovableCardButtonText}>X</Text>
            </Pressable>
            <Text style={Styles.CardText}>{props.card.text}</Text>
        </View>
    );
  }

export default RemovableCard;