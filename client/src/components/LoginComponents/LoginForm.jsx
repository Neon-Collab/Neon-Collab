import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/AppContext.jsx';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { account, setAccount } = useContext(AppContext);
  const navigate = useNavigate();

  const submitLoginInfo = async (event) => {
    event.preventDefault();
    try {
      const usernameResult = await axios.get('/api/login', {
        params: {
          email,
          password,
        },
      });
      setAccount({
        ...account,
        loggedIn: true,
        username: usernameResult.data,
        isReady: true,
      });
      navigate('/problemspage');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="login">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input type="button" value="Log In" onClick={(e) => submitLoginInfo(e)} />
    </form>
  );
}
