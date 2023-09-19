import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { redirect } from 'react-router-dom';
import {
  auth,
} from '../../../../server/firebase';
import {
  registerWithEmailAndPassword,
} from '../../../../server/controllers/firebaseController';

export default function SignupForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [skill, setSkill] = useState('');

  const submitRegisterInfo = async (event) => {
    if (password !== verifyPassword) {
      alert('Please verify that passwords match');
      event.preventDefault();
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      event.preventDefault();
      return;
    }
    // prevent default?
    try {
      await registerWithEmailAndPassword(firstname, lastname, username, email, password);
      redirect('/problemspage');
    } catch (err) {
      console.error(err);
    }
  };

  // add skill level/submit username/email/skill
  return (
    <form onSubmit={(e) => submitRegisterInfo(e)}>
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
      <input type="submit" value="Create Account" />
    </form>
  );
}
