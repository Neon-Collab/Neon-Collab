const { initializeApp } = require('firebase/app');
// import { getAnalytics } from 'firebase/analytics';
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

// tl;dr: Firebase config is ok to include in checked-in code.
// Docs: https://firebase.google.com/docs/projects/api-keys#api-keys-for-firebase-are-different
const firebaseConfig = {
  apiKey: 'AIzaSyD76PMQ7QemBetVTdn-YIPMgEoevFv3zw4',
  authDomain: 'neon-collab.firebaseapp.com',
  projectId: 'neon-collab',
  storageBucket: 'neon-collab.appspot.com',
  messagingSenderId: '416675025384',
  appId: '1:416675025384:web:e64c7111fc556894a6545d',
  measurementId: 'G-YN7ZN7ZRH7',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

module.exports = {
  auth,
  db,
};
