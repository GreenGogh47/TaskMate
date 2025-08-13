import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
// "Module '"firebase/auth"' has no exported member 'getReactNativePersistence'."
// It's an issue with VSC that won't affect the build?
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { getFirestore } from 'firebase/firestore';

// Safe to expose on the client side.
// Use Security Rules and App Check.
const firebaseConfig = {
  apiKey: "AIzaSyBBYov_XAOX2689eVSjie5NWWeA7mrZhEk",
  authDomain: "taskmate-e9179.firebaseapp.com",
  projectId: "taskmate-e9179",
  storageBucket: "taskmate-e9179.firebasestorage.app",
  messagingSenderId: "955726626113",
  appId: "1:955726626113:web:9533a8cdebd47773d975c0"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { app, getAuth, auth, db }