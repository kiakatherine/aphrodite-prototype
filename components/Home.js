import React, { Component } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Home = ({ navigation }) => {
    return (
      <View style={styles.center}>
        <Text>Welcome!</Text>
        <Button
          title="Let's begin"
          onPress={() => navigation.navigate("VisionBuilder")}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
  });
  
  export default Home;