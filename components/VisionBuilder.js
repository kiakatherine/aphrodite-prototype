import React, { Component } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';

const VisionBuilder = ({ navigation }) => {
    return (
      <View style={styles.center}>
        <Text>Welcome!</Text>
        <Button
          title="Press"
          onPress={() => navigation.navigate("IntroSlides")}
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
  
  export default VisionBuilder;