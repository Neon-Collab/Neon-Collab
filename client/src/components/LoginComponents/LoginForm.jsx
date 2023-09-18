import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  signInWithEmailAndPasword
} from '../../../../server/firebase';
import {
  logInWithEmailAndPassword,
} from '../../../../server/controllers/firebaseController';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLoginInfo = () => {
    // prevent default?
    logInWithEmailAndPassword(email, password);
    // add navigation if successful
  };

  return (
    <form onSubmit={submitLoginInfo}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Log In" />
    </form>
  );
}
