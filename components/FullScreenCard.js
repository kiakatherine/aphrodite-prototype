import { Pressable, Text, View } from 'react-native';
import Styles from "../style.js";

function FullScreenCard(props) {
    return (
        <View>
            <Text style={Styles.CardText}>{props.card.text}</Text>
        </View>
    );
  }

export default FullScreenCard;