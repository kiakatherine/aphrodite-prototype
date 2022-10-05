import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from "../screens/Dashboard";
import FirstScreenScreen from "../screens/FirstScreen";
import PhoneNumberScreen from "../screens/PhoneNumber";
import SigninScreen from "../screens/Signin";
import VisionBuilderScreen from "../screens/VisionBuilder";
import VisionCustomizerScreen from "../screens/VisionCustomizer";
import PreviewTiles from "../screens/PreviewTiles";
import PreviewFullScreen from "../screens/PreviewFullScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstScreen" component={FirstScreenScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signin" component={SigninScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="VisionBuilder" options={{ headerShown: false }}>
        {props => <VisionBuilderScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="VisionCustomizer" options={{ headerShown: false }}>
        {props => <VisionCustomizerScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="PreviewTiles" options={{ headerShown: false }}>
        {props => <PreviewTiles {...props} />}
      </Stack.Screen>
      <Stack.Screen name="PreviewFullScreen" options={{ headerShown: false }}>{props => <PreviewFullScreen {...props} />}</Stack.Screen>
    </Stack.Navigator>
  );
}

export { MainStackNavigator };