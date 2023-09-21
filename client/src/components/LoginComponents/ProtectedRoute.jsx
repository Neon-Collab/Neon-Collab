import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AppContext from '../../contexts/AppContext.jsx';

export default function ProtectedRoute({ account, children }) {
  if (!account.isReady) {
    return <p>...</p>;
  }
  if (!account.loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}
