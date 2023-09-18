import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginComponents/LoginForm.jsx';
import SignupForm from '../components/LoginComponents/SignupForm.jsx';

// save skill level in postgres and auth data in firestore

export default function LoginPage() {
  const [newUser, setNewUser] = useState(false);
  return (
    <div>
      <h1>Login Page</h1>
      { newUser ? <SignupForm /> : <LoginForm /> }
      <input
        type="button"
        onClick={() => setNewUser(!newUser)}
        value={newUser ? 'Already a member? Log In' : 'New to NeonCollab? Create an Account'}
      />
    </div>
  );
}
