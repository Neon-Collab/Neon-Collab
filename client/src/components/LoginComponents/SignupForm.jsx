import React, { useEffect, useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../server/firebase';
import {
  registerWithEmailAndPassword,
} from '../../../../server/controllers/firebaseController';
import AppContext from '../../contexts/AppContext.jsx';

export default function SignupForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [skill, setSkill] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const { account, setAccount } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      setAccount({
        ...account,
        loggedIn: true,
        firstname,
        lastname,
        username,
        email,
        skill,
      });
      navigate('/problemspage');
    }
  }, [user, loading]);

  //todo: send info to DB so it can be matched to email in postgres
  const submitRegisterInfo = async (event) => {
    event.preventDefault();
    if (password !== verifyPassword) {
      alert('Please verify that passwords match');
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    try {
      registerWithEmailAndPassword(firstname, lastname, username, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  // add skill level/submit username/email/skill
  return (
    <form>
      <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
      <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="password" placeholder="Verify Password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required />
      <select
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        required
      >
        <option value="">Select your level of experience with JavaScript...</option>
        <option value="Beginner">Beginer</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Expert">Expert</option>
      </select>
      <input type="button" value="Create Account" onClick={(e) => submitRegisterInfo(e)} />
    </form>
  );
}
