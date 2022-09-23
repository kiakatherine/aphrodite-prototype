import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";

function Signin({ navigation }) {
  return (
    <SafeAreaView style={Styles.centerContainer}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text>Aphrodite</Text>
        <Text>Manifest your dream relationship.</Text>
        <Pressable style={[Styles.button, Styles.buttonFullWidth]} onPress={() => navigation.navigate('Dashboard')}>
            <Text style={Styles.buttonText}>Sign in</Text></Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default Signin;