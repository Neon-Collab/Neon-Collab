import React, { useEffect, useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../server/firebase.js';
import { useNavigate } from 'react-router-dom';
import {
  logInWithEmailAndPassword,
} from '../../../../server/controllers/firebaseController';
import AppContext from '../../contexts/AppContext.jsx';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const { account, setAccount } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      setAccount((previousObj) => ({
        ...previousObj,
        loggedIn: true,
      }));
      navigate('/problemspage');
    }
  }, [user, loading]);

  const submitLoginInfo = async (event) => {
    event.preventDefault();
    try {
      logInWithEmailAndPassword(email, password);
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
