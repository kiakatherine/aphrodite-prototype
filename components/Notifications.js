import React, { Component } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';

export default class NotificationsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Morning affirmation</Text>
        <Button
          title="Go to Account"
          onPress={() => this.props.navigation.navigate('Account')}
        />
        <Text>Evening affirmation</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  }
});