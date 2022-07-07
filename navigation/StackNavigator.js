import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../components/Home";
import NotificationsScreen from "../components/Notifications";
import AccountScreen from "../components/Account";
import VisionBuilderScreen from "../components/VisionBuilder";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Stack.Screen name="VisionBuilder" component={VisionBuilderScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator };