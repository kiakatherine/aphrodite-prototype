// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//   // ...
//   // The value of `databaseURL` depends on the location of the database
//   databaseURL: "https://aphrodite-prototype-59a3b-default-rtdb.firebaseio.com/",
// };

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'api-key',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://aphrodite-prototype-59a3b-default-rtdb.firebaseio.com/',
//   projectId: 'project-id',
//   storageBucket: 'project-id.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: 'app-id',
//   measurementId: 'G-measurement-id',
// };
// const app = initializeApp(firebaseConfig);


// // Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);


import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBdNP0ZBL-mEO0-NxZYcpwO62Pllzviueo",
    authDomain: "aphrodite-prototype-59a3b.firebaseapp.com",
    databaseURL: "https://aphrodite-prototype-59a3b-default-rtdb.firebaseio.com",
    projectId: "aphrodite-prototype-59a3b",
    storageBucket: "aphrodite-prototype-59a3b.appspot.com",
    messagingSenderId: "827712126480",
    appId: "1:827712126480:web:d1a2867c4fd0443387d495",
    measurementId: "G-Y6DNB1WE9B"
  };

// initializeApp(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
