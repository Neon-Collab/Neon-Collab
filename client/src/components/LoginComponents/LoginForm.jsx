import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import {
  logInWithEmailAndPassword,
} from '../../../../server/controllers/firebaseController';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitLoginInfo = async (event) => {
    event.preventDefault();
    try {
      logInWithEmailAndPassword(email, password);
      // need to prevent navigate if error
      navigate('/problemspage');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
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
      <input type="button" value="Log In" onClick={(e) => submitLoginInfo(e)} />
    </form>
  );
}
