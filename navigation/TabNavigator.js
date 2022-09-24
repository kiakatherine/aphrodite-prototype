import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator } from "./StackNavigator";
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationsScreen from "../screens/Notifications";
import AccountScreen from "../screens/Account";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;
        
            if (route.name === 'Home') {
                iconName = focused
                ? 'home-outline'
                : 'home-outline';
            } else if (route.name === 'Notifications') {
                iconName = focused ? 'notifications-outline' : 'notifications-outline';
            } else if (route.name === 'Account') {
                iconName = focused ? 'settings-outline' : 'settings-outline';
            }
        
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#aaa',
        })}>
      <Tab.Screen name="Home" component={MainStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;