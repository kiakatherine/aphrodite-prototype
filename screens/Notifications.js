import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';
import Styles from "../style.js";

function NotificationsScreen({ navigation }) {
  return (
    <View style={[Styles.container, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
      <Text>Notification settings go here</Text>
      
      <Pressable onPress={() => navigation.navigate('Account')}>
        <Text>Go to Account</Text>
      </Pressable>
    </View>
  )
};

export default NotificationsScreen;