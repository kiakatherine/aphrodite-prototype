import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from "../screens/Dashboard";
import FirstScreenScreen from "../screens/FirstScreen";
import NewUserScreen from "../screens/NewUser";
import SigninScreen from "../screens/Signin";
import VisionBuilderScreen from "../screens/VisionBuilder";
import VisionCustomizerScreen from "../screens/VisionCustomizer";
import VisionViewTiles from "../screens/VisionViewTiles";
import VisionViewFullScreen from "../screens/VisionViewFullScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstScreen" component={FirstScreenScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewUser" component={NewUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VisionBuilder" component={VisionBuilderScreen} options={{ headerShown: true }} />
      <Stack.Screen name="VisionCustomizer" options={{ headerShown: true }}>{props => <VisionCustomizerScreen {...props} />}</Stack.Screen>
      <Stack.Screen name="VisionViewTiles" options={{ headerShown: true }}>{props => <VisionViewTiles {...props} />}</Stack.Screen>
      <Stack.Screen name="VisionViewFullScreen" options={{ headerShown: false }}>{props => <VisionViewFullScreen {...props} />}</Stack.Screen>
    </Stack.Navigator>
  );
}

export { MainStackNavigator };