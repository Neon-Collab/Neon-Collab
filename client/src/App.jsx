import React, { useEffect, useState, useMemo } from 'react';
// import LoginPage from './pages/LoginPage.jsx';
import CodeEditorPage from './pages/CodeEditorPage.jsx';
// import AppContext from './contexts/AppContext.jsx';
// import { addUserData } from '../../db/exampleAddUserData.js';
// import { retrieveUserData } from '../../db/exampleRetrieveUserData.js';

function App() {
  const [user, setUser] = useState({});
  // useEffect(() => {
  //   addUserData();
  //   retrieveUserData();
  // }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [
      user,
      setUser,
    ],
  );
  // add states and their setter functions that you want shared into...
  // the use memo and dependency array
  return (
    <AppContext.Provider value={contextValue}>
      <h1>Hello, Neon-Collab!</h1>
      <LoginPage />
      {/* <CodeEditorPage /> */}
    </AppContext.Provider>
  );
}

export default App;
