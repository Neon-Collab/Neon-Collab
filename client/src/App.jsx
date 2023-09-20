import React, { useEffect, useState, useMemo } from 'react';
import LoginPage from './pages/LoginPage.jsx';
// import CodeEditorPage from './pages/CodeEditorPage.jsx';
import AppContext from './contexts/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CodeEditorPage from './pages/CodeEditorPage.jsx';
import Feedback from './pages/Feedback.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

// import { addUserData } from '../../db/exampleAddUserData.js';
// import { retrieveUserData } from '../../db/exampleRetrieveUserData.js';

function App() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    loggedIn: false,
  });
  // useEffect(() => {
  //   addUserData();
  //   retrieveUserData();
  // }, []);

  const contextValue = useMemo(
    () => ({
      account,
      setAccount,
    }),
    [
      account,
      setAccount,
    ],
  );
  // add states and their setter functions that you want shared into...
  // the use memo and dependency array
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  return (
    <div>
      <AppContext.Provider value={contextValue}>
        { account.loggedIn && <Navbar /> }
        { !account.loggedIn && <h1>Hello, Neon-Collab!</h1> }
        { !account.loggedIn && <LoginPage />}
        <div>
          <Routes>
            <Route path="/problemspage" element={<ProblemsPage />} />
            <Route path="/editor/:problemId" element={<CodeEditorPage />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;