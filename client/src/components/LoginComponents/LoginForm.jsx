import React, { useEffect, useState } from 'react';
import { auth, signInWithEmailAndPasword } from '../../../../server/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={() => { console.log('Form Submitted'); }}>
      <input type="email" placeholder="email" />
      <input type="text" placeholder="Password" />
      <input type="submit" value="Log In" />
    </form>
  );
}
