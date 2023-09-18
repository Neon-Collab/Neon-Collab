import React from 'react';
import LoginForm from '../components/LoginComponents/LoginForm.jsx';
import SignupForm from '../components/LoginComponents/SignupForm.jsx';

// save skill level in postgres and auth data in firestore

export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm />
    </div>
  );
}
