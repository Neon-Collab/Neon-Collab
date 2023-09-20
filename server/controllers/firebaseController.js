const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} = require('firebase/auth');
const {
  query,
  getDocs,
  collection,
  where,
  addDoc,
} = require('firebase/firestore');
const { auth, db } = require('../firebase.js');

module.exports = {
  logInWithEmailAndPassword: async (req, res) => {
    const { email, password } = req.query;
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const results = await getDocs(q);
      const { username } = results.docs[0].data();
      await signInWithEmailAndPassword(auth, email, password);
      res.send(username);
    } catch (err) {
      console.error(err);
    }
  },

  registerWithEmailAndPassword: async (req, res) => {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
    } = req.body;
    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const results = await getDocs(q);
      const usernameExists = results?.docs[0]?.data();
      if (usernameExists) {
        res.status(400).send('Error: Username already in use');
      } else {
        const userResult = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userResult;
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          firstname,
          lastname,
          username,
          authProvider: 'local',
          email,
        });
        res.status(201).send('Account created!');
      }
    } catch (err) {
      console.error('Error message: ', err.code);
      res.status(400).send('Error: Email already in use');
    }
  },

  sendPasswordReset: async (req, res) => {
    const { email } = req.query;
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent!');
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  },

  logout: async (req, res) => {
    await signOut(auth);
    res.sendStatus(200);
  },
};
