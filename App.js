import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import WelcomeScreen from "./screens/Welcome";
import DashboardScreen from "./screens/Dashboard";
import LandingScreen from "./screens/Landing";
import PhoneNumberScreen from "./screens/PhoneNumber";
import SignInScreen from "./screens/SignIn";
import NewUserScreen from "./screens/NewUser";
import VisionBuilderScreen from "./screens/VisionBuilder";
import VisionCustomizerScreen from "./screens/VisionCustomizer";
import VisionViewTiles from "./screens/VisionViewTiles";
import VisionViewFullScreen from "./screens/VisionViewFullScreen";
import SendingScreen from "./screens/Sending";
import NotificationsScreen from "./screens/Notifications";
import AccountScreen from "./screens/Account";

// firebase
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

function App() {
  const [cards, setCards] = useState([]);

  // Firebase references
  const app = getApp();
  const auth = getAuth(app);
  const isLoggedIn = auth.currentUser ? auth.currentUser : false;

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {
  //   function setUser() {
  //     auth.onAuthStateChanged((user) => {
  //       if(user) {
  //         setIsLoggedIn(state => ({...state}));
  //         setCurrentUser(state => ({...state}));
  //         navigation.navigate('Dashboard', {user});
  //       }
  //     });
  //   }
  //   setUser();
    // return onValue(userRef, (snapshot) => {
    //   const user = snapshot.val();
    //   const cards = snapshot.val().cards;
    //   let cardsArr = [];
      
    //   for (var key in cards) {
    //     cardsArr.push(cards[key])
    //   }
    //   setCurrentUser(user);
    //   // console.log('user', user)
      
    //   if(cardsArr.length > 0) {
    //     setCards(cardsArr);
    //     // setCurrentUser(snapshot.val());
    //     // setFirstName(snapshot.val().firstName);
    //     // setLastName(snapshot.val().lastName);
    //     // setEmail(snapshot.val().email);
    //     // setBirthdayMonth(snapshot.val().birthdayMonth);
    //     // setBirthdayDay(snapshot.val().birthdayDay);
    //     // setBirthdayYear(snapshot.val().birthdayYear);
    //     // setPronouns(snapshot.val().pronouns);
    //     // setIdentity(snapshot.val().identity);
    //   }
    // });
  // }, [])

  // navigation
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const HomeTabs = () => {
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
        <Tab.Screen name="Home" component={DashboardScreen} options={(route) => ({ headerShown: false })} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    );
  }

  if (initializing) return null;

  // FIX
  // if (!auth.currentUser) {
  //   return (
  //     <LandingScreen />
  //   );
  // }

  return (
    <>      
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn && <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />}
          <Stack.Screen name="Dashboard" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="PhoneNumber" options={{ headerShown: false }}>
            {props => <PhoneNumberScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="NewUser" component={NewUserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />

          <Stack.Screen name="VisionBuilder" options={{ headerShown: false }}>
            {props => <VisionBuilderScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="VisionCustomizer" options={{ headerShown: false }}>
            {props => <VisionCustomizerScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="VisionViewTiles" options={{ headerShown: false }}>
            {props => <VisionViewTiles {...props} />}
          </Stack.Screen>
          <Stack.Screen name="VisionViewFullScreen" options={{ headerShown: false }}>
            {props => <VisionViewFullScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Sending" component={SendingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;