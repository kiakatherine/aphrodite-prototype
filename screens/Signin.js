import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Styles from "../style.js";

function Signin({ navigation }) {
  return (
    <SafeAreaView style={Styles.centerContainer}>
      <Text>Account info goes here</Text>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text>Aphrodite</Text>
        <Text>Manifest your dream relationship.</Text>
        <Pressable onPress={() => navigation.navigate('Signin')}><Text>New user</Text></Pressable>
        <Pressable><Text>Sign in</Text></Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default Signin;