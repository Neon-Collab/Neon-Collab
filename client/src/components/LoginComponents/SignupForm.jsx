import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  signInWithEmailAndPasword
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
  const [skill, setSkill] = useState('');

  const submitLoginInfo = () => {
    // prevent default?
    logInWithEmailAndPassword(email, password);
    // add navigation if successful
  };

  // add skill level/submit username/email/skill
  return (
    <form onSubmit={() => { console.log('Form Submitted'); }}>
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="text" placeholder="Username" required />
      <input type="email" placeholder="Email" required />
      <input type="text" placeholder="Password" required />
      <input type="text" placeholder="Verify Password" required />
      <select
        value={skill}
        onChange={(e) => e.target.value}
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
