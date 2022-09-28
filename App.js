import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import DashboardScreen from "./screens/Dashboard";
import FirstScreenScreen from "./screens/FirstScreen";
import PhoneNumberScreen from "./screens/PhoneNumber";
import NewUserScreen from "./screens/NewUser";
import VisionBuilderScreen from "./screens/VisionBuilder";
import VisionCustomizerScreen from "./screens/VisionCustomizer";
import VisionViewTiles from "./screens/VisionViewTiles";
import VisionViewFullScreen from "./screens/VisionViewFullScreen";
import NotificationsScreen from "./screens/Notifications";
import AccountScreen from "./screens/Account";
import OtpScreen from "./screens/Otp";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthdayMonth, setBirthdayMonth] = useState(null);
  const [birthdayDay, setBirthdayDay] = useState(null);
  const [birthdayYear, setBirthdayYear] = useState(null);
  const [pronouns, setPronouns] = useState(null);
  const [identity, setIdentity] = useState(null);

  const [cards, setCards] = useState([]);

  // database
  const db = getDatabase();
  const currentUserId = '7133026633'; // FIX
  const cardsRef = ref(db, 'users/' + currentUserId + '/cards');

  useEffect(() => {
    return onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      let cardsArr = [];
      for (var key in data) {
        cardsArr.push(data[key])
      }
      if(cardsArr.length > 0) {
        setCards(cardsArr);
        // setCurrentUser(snapshot.val());
        // setFirstName(snapshot.val().firstName);
        // setLastName(snapshot.val().lastName);
        // setEmail(snapshot.val().email);
        // setBirthdayMonth(snapshot.val().birthdayMonth);
        // setBirthdayDay(snapshot.val().birthdayDay);
        // setBirthdayYear(snapshot.val().birthdayYear);
        // setPronouns(snapshot.val().pronouns);
        // setIdentity(snapshot.val().identity);
      }
    });
  }, [])

  // navigation
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const MainStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="FirstScreen" component={FirstScreenScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewUser" component={NewUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VisionBuilder" options={{ headerShown: false }}>
          {props => <VisionBuilderScreen {...props} cards={ cards } />}
        </Stack.Screen>
        <Stack.Screen name="VisionCustomizer" options={{ headerShown: false }}>
          {props => <VisionCustomizerScreen {...props} cards={ cards } />}
        </Stack.Screen>
        <Stack.Screen name="VisionViewTiles" options={{ headerShown: false }}>
          {props => <VisionViewTiles {...props} cards={ cards } />}
        </Stack.Screen>
        <Stack.Screen name="VisionViewFullScreen" options={{ headerShown: false }}>{props => <VisionViewFullScreen {...props} />}</Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default App;