import React, { Component } from 'react';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import Styles from "../style.js";

export default class NotificationsScreen extends Component {
  render() {
    return (
      <View style={[Styles.container, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>Notification settings go here</Text>
        <Button
          title="Go to Account"
          onPress={() => this.props.navigation.navigate('Account')}
        />
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