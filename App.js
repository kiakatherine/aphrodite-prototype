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
import SignInScreen from "./screens/SignIn";
import NewUserScreen from "./screens/NewUser";
import VisionBuilderScreen from "./screens/VisionBuilder";
import VisionCustomizerScreen from "./screens/VisionCustomizer";
import VisionViewTiles from "./screens/VisionViewTiles";
import VisionViewFullScreen from "./screens/VisionViewFullScreen";
import NotificationsScreen from "./screens/Notifications";
import AccountScreen from "./screens/Account";
import OtpScreen from "./screens/Otp";

// firebase
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

function App({ navigation }) {
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
  // const db = getDatabase();
  // const currentUserId = '7133026633'; // FIX
  // const cardsRef = ref(db, 'users/' + currentUserId + '/cards');
  // const userRef = ref(db, 'users/' + currentUserId);

  // Firebase references
  const app = getApp();
  const auth = getAuth(app);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setCurrentUser(user);
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

  function handleVerifyClick(user) {
    setCurrentUser(user);
    navigation.navigate('Dashboard', {user: user});
  }

  // navigation
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const MainStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
          {props => <DashboardScreen {...props} initialParams={{user: currentUser, cards: cards}} />}
        </Stack.Screen>
        <Stack.Screen name="FirstScreen" component={FirstScreenScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PhoneNumber" options={{ headerShown: false }}>
          {props => <PhoneNumberScreen {...props} onVerifyClick={handleVerifyClick} />}
        </Stack.Screen>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewUser" component={NewUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VisionBuilder" options={{ headerShown: false }}>
          {props => <VisionBuilderScreen {...props} initialParams={{user: currentUser, cards: cards}} />}
        </Stack.Screen>
        <Stack.Screen name="VisionCustomizer" options={{ headerShown: false }}>
          {props => <VisionCustomizerScreen {...props} initialParams={{user: currentUser, cards: cards}} />}
        </Stack.Screen>
        <Stack.Screen name="VisionViewTiles" options={{ headerShown: false }}>
          {props => <VisionViewTiles {...props} initialParams={{user: currentUser, cards: cards}} />}
        </Stack.Screen>
        <Stack.Screen name="VisionViewFullScreen" options={{ headerShown: false }}>
          {props => <VisionViewFullScreen {...props} initialParams={{user: currentUser, cards: cards}} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  if (initializing) return null;

  if (!currentUser) {
    return (
      <FirstScreenScreen />
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
        <Tab.Screen name="Home" component={MainStackNavigator} initialParams={{ user: currentUser }} options={{ headerShown: false }} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} initialParams={{ user: currentUser }} options={{ headerShown: false }} />
        <Tab.Screen name="Account" options={{ headerShown: false }}>
          {props => <AccountScreen {...props} initialParams={{user: currentUser, cards: cards}} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;