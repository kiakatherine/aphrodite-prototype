import React, { Component } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';

const VisionBuilder = ({ navigation }) => {
    return (
      <View style={styles.center}>
        <Text>Welcome!</Text>
        <Button
          title="Press"
          onPress={() => alert('yay!')} // We added an onPress event which would navigate to the About screen
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