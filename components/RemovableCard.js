import { Image, Pressable, Text, View } from 'react-native';
import Styles from "../style.js";
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function RemovableCard(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if(!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={[Styles.Card, !props.card.text ? Styles.CardWithImage : '']}>
                <Pressable
                    style={Styles.RemovableCardButton}
                    onPress={() => props.onRemovableCardPress(props.card)}>
                        <Text style={[Styles.RemovableCardButtonText, {fontFamily: 'Poppins_500Medium'}]}>X</Text>
                </Pressable>

                {props.card.text && <Text style={[Styles.CardText, {fontFamily: 'Poppins_400Regular'}]}>{props.card.text}</Text>}
                
                {!props.card.text && <Image source={{ uri: props.card.uri }} style={{flex:1 , width: '100%', height: undefined}} />}
            </View>
        );
    }
  }

export default RemovableCard;