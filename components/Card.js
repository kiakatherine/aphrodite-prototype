import { Image, Pressable, Text, View } from 'react-native';
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
      key={props.card.id}
      style={[Styles.Card, !props.card.text ? Styles.CardWithImage : '',
        props.isSelected ? Styles.CardSelected : '',
        props.darkTheme ? Styles.darkCard : '']}
      onPress={() => props.onCardPress(props.card)}>
        {props.card.text && <Text style={[Styles.CardText, props.darkTheme ? Styles.textWhite : '', {fontFamily: 'Poppins_600SemiBold'}]}>{props.card.text}</Text>}
        {props.card.type === 'image' && <Image source={{ uri: props.card.uri }} style={{borderRadius: 7, flex:1 , width: '100%', height: undefined}} />}
    </Pressable>
  );
}

export default Card;