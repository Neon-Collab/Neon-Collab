import React, { useState, useEffect } from 'react';

export default function AccountInfo() {
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
