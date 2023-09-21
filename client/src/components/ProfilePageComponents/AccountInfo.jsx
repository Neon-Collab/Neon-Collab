import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from '../../contexts/AppContext.jsx';

export default function AccountInfo({ user }) {
  const { account, setAccount } = useContext(AppContext);

  return (
    <div className="common-container component-container">
      <h1>Account Information</h1>
      <div className="account-container">
        {user ? (
          <>
            <span>Name: {user.first_name} {user.last_name}</span>
            <span>Username: {user.username}</span>
            <span>Email: {user.email}</span>
            <span>Skill Level: {user.skill_level}</span>
          </>
        ) : <span>No User Data</span>}
      </div>
    </div>
  );
}
