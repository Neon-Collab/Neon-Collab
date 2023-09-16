import React, { useEffect, useContext, useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import AppContext from './contexts/AppContext.jsx';
// import { addUserData } from '../../db/exampleAddUserData.js';
// import { retrieveUserData } from '../../db/exampleRetrieveUserData.js';

function App() {
  const [appContext, setAppContext] = useContext({});
  // useEffect(() => {
  //   addUserData();
  //   retrieveUserData();
  // }, []);

  // appContext is an object to hold information needed across the app
  // to update app context, use setAppContext and copy contents of the current appContext to update
  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      <h1>Hello, Neon-Collab!</h1>
      <LoginPage />
    </AppContext.Provider>
  );
}

export default App;
