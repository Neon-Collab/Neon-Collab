import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

import {
  // GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  // signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

/*
"Unlike how API keys are typically used, API keys for Firebase services
are not used to control access to backend resources; that can only be
done with Firebase Security Rules (to control which users can access
resources) and App Check (to control which apps can access resources).
Usually, you need to fastidiously guard API keys (for example, by using
a vault service or setting the keys as environment variables); however,
API keys for Firebase services are ok to include in code or checked-in config files."
*/

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
//const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (firstname, lastname, username, skill, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      firstname,
      lastname,
      username,
      skill,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
