import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'react-router-dom';

import {
  logInWithEmailAndPassword,
} from '../../../../server/controllers/firebaseController';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLoginInfo = async (event) => {
    try {
      await logInWithEmailAndPassword(email, password);
      redirect('/problemspage');
    } catch (err) {
      event.preventDefault();
      console.error(err);
    }
  };

  return (
    <form onSubmit={(e) => submitLoginInfo(e)}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Log In" />
    </form>
  );
}
