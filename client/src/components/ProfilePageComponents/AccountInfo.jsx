import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../contexts/AppContext.jsx';

export default function AccountInfo() {
  const { account, setAccount } = useContext(AppContext);
  return (
    <div className="component-container">
      <h1>Account Information</h1>
      <div className="account-container">
        <span>Name: </span>
        <span>Username: </span>
        <span>Email: </span>
      </div>
    </div>
  );
}
