import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import Styles from "../style.js";

function Card(props) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <Pressable
            style={[Styles.Card, isSelected ? Styles.CardSelected : '']}
            selected={isSelected}
            onPress={() => setIsSelected(!isSelected)}>
              <Text style={Styles.CardText}>{props.card.text}</Text>
            </Pressable>
    );
  }

  export default Card;

