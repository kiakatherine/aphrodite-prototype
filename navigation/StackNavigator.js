import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../components/Home";
import VisionBuilderScreen from "../components/VisionBuilder";
import MyVisionScreen from "../components/MyVision";
import IntroSlidesScreen from "../components/IntroSlides";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Stack.Screen name="IntroSlides" component={IntroSlidesScreen} options={{ headerShown: true }} />
      <Stack.Screen name="VisionBuilder" component={VisionBuilderScreen} options={{ headerShown: true }} />
      <Stack.Screen name="MyVision" options={{ headerShown: true }}>{props => <MyVisionScreen {...props} />}</Stack.Screen>
    </Stack.Navigator>
  );
}

export { MainStackNavigator };