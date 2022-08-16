import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from "../screens/Dashboard";
import IntroSlidesScreen from "../screens/IntroSlides";
import VisionBuilderScreen from "../screens/VisionBuilder";
import VisionCustomizerScreen from "../screens/VisionCustomizer";
import VisionViewScreen from "../screens/VisionView";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: true }} />
      <Stack.Screen name="IntroSlides" component={IntroSlidesScreen} options={{ headerShown: true }} />
      <Stack.Screen name="VisionBuilder" component={VisionBuilderScreen} options={{ headerShown: true }} />
      <Stack.Screen name="VisionCustomizer" options={{ headerShown: true }}>{props => <VisionCustomizerScreen {...props} />}</Stack.Screen>
      <Stack.Screen name="VisionView" options={{ headerShown: true }}>{props => <VisionViewScreen {...props} />}</Stack.Screen>
    </Stack.Navigator>
  );
}

export { MainStackNavigator };