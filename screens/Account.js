import React from 'react';
import { Pressable, Text, View } from 'react-native';

function AccountScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Account info goes here</Text>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Text>Go to home</Text>
      </Pressable>
    </View>
  );
};

export default AccountScreen;