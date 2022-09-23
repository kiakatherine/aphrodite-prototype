import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";

function Signin({ navigation }) {
  return (
    <View style={Styles.centerContainer}>
        <Text style={[Styles.heading1, Styles.textAlignCenter]}>[ input phone number ]</Text>
        <Text style={[Styles.heading2, Styles.textAlignCenter]}>[ input validation code]</Text>
        <Pressable style={Styles.button} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={Styles.buttonText}>Sign in</Text>
        </Pressable>
    </View>
  );
};

export default Signin;