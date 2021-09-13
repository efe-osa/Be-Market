import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const configKeys = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(configKeys);
  } catch (error) {
    // log to error logging tool
    console.error('Firebase initialization error:>>', error);
  }
}
const db = firebase.firestore();
export default db;
