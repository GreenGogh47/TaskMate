import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
// "Module '"firebase/auth"' has no exported member 'getReactNativePersistence'."
// It's an issue with VSC that won't affect the build?
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import Constants from 'expo-constants'


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

const emulatorConfig = {
  apiKey: "1235678",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.firebasestorage.app",
};

const initConfig = __DEV__ ? emulatorConfig : firebaseConfig
//if dev is true it's in development mode


const app = initializeApp(initConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

const rawHost = Constants.expoConfig?.hostUri;
const host = rawHost?.split(':')[0] || 'localhost';

const storage = getStorage(app);
const functions = getFunctions(app);

// Connect emulators if in development
if (__DEV__) {
  connectFirestoreEmulator(db, host, 8080);
  connectAuthEmulator(auth, `http://${host}:9099`);
  connectFunctionsEmulator(functions, host, 5001);
  connectStorageEmulator(storage, host, 9199);
}

export { app, getAuth, auth, db }