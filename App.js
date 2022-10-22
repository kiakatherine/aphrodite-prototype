import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set, remove, push, update } from 'firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppLoading from 'expo-app-loading';

// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import DashboardScreen from "./screens/Dashboard";
import LandingScreen from "./screens/Landing";
import PhoneNumberScreen from "./screens/PhoneNumber";
import SignInScreen from "./screens/SignIn";
import NewUserScreen from "./screens/NewUser";
import VisionBuilderScreen from "./screens/VisionBuilder";
import VisionCustomizerScreen from "./screens/VisionCustomizer";
import PreviewTiles from "./screens/PreviewTiles";
import PreviewFullScreen from "./screens/PreviewFullScreen";
import SendingScreen from "./screens/Sending";
import NotificationsScreen from "./screens/Notifications";
import AccountScreen from "./screens/Account";

// firebase
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import {app, auth, db, storage } from './firebase.js';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

function App(props) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  const [noCards, setNoCards] = useState(true);
  const [cards, setCards] = useState([]);
  const isLoggedIn = auth.currentUser ? true : false;

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
              tabBarLabelStyle: {
                fontFamily: 'Poppins_500Medium',
                fontSize: 14
              },
              tabBarStyle: {
                height: 90,
                paddingBottom: 25,
                paddingTop: 10,
                borderTopColor: '#C3C4CE'
              },
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
                return <Ionicons name={iconName} size={28} color={color} />;
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

  function getInitialRoute() {
    if(isLoggedIn) {
      return 'Dashboard'
    } else {
      return 'Landing'
    }
  }

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>      
        <NavigationContainer>
          <Stack.Navigator initialRouteName={getInitialRoute()}>
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="PhoneNumber" options={{ headerShown: false }}>
              {props => <PhoneNumberScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="NewUser" component={NewUserScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />

            <Stack.Screen name="VisionBuilder" options={{ headerShown: false }}>
              {props => <VisionBuilderScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="VisionCustomizer" options={{ headerShown: false, animation: 'none' }}>
              {props => <VisionCustomizerScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="PreviewTiles" options={{ headerShown: false, animation: 'fade' }}>
              {props => <PreviewTiles {...props} />}
            </Stack.Screen>
            <Stack.Screen name="PreviewFullScreen" options={{ headerShown: false }}>
              {props => <PreviewFullScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Sending" component={SendingScreen} options={{ headerShown: false, animation: 'none' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    )
  }
}

export default App;