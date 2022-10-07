import { Pressable, Text } from 'react-native';
import Styles from "../style.js";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function Card(props) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  return (
      <Pressable
          style={[Styles.Card, props.isSelected ? Styles.CardSelected : '', props.darkTheme ? Styles.darkCard : '']}
          selected={props.isSelected}
          onPress={() => props.onCardPress(props.card)}>
            <Text style={[Styles.CardText, props.darkTheme ? Styles.textWhite : '', {fontFamily: 'Poppins_600SemiBold'}]}>{props.card.text}</Text>
          </Pressable>
  );
}

export default Card;