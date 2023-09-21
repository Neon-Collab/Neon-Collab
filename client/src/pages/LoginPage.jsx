import React, { useState, useContext } from 'react';
import LoginForm from '../components/LoginComponents/LoginForm.jsx';
import SignupForm from '../components/LoginComponents/SignupForm.jsx';
import ParticlesComponent from '../components/LoginComponents/Particles.js';

export default function LoginPage() {
  const [newUser, setNewUser] = useState(false);

  return (
    <div className="loginPage">
      <div className="loginForm">
        <h1>Hello, Neon-Collab!</h1>
        { newUser ? <SignupForm /> : <LoginForm /> }
        <input
          type="button"
          onClick={() => setNewUser(!newUser)}
          value={newUser ? 'Already a member? Log In' : 'New to NeonCollab? Create an Account'}
        />
      </div>
      <ParticlesComponent />
    </div>
  );
}
