import React, { useEffect, useState, useMemo } from 'react';
import LoginPage from './pages/LoginPage.jsx';
// import CodeEditorPage from './pages/CodeEditorPage.jsx';
import AppContext from './contexts/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import CodeEditorPage from './pages/CodeEditorPage.jsx';
import Feedback from './pages/Feedback.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

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
    <div>
      <Navbar />
      {/* <AppContext.Provider value={contextValue}>
        <h1>Hello, Neon-Collab!</h1>
        <LoginPage />
      </AppContext.Provider> */}
      <div>
        <Routes>
          <Route path="/problemspage" element={<ProblemsPage />} />
          <Route path="/editor/:problemId" element={<CodeEditorPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
