import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import Styles from "../style.js";

function Card(props) {
    return (
        <Pressable
            style={[Styles.Card, props.isSelected ? Styles.CardSelected : '']}
            selected={props.isSelected}
            onPress={props.onCardPress}>
              <Text style={Styles.CardText}>{props.card.text}</Text>
            </Pressable>
    );
  }

  export default Card;

