import React, { useEffect, useState, useMemo } from 'react';
import LoginPage from './pages/LoginPage.jsx';
// import CodeEditorPage from './pages/CodeEditorPage.jsx';
import AppContext from './contexts/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import CodeEditorPage from './pages/CodeEditorPage.jsx';
import Feedback from './pages/Feedback.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';

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
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  return (
    <div>
      <Navbar />
      <AppContext.Provider value={contextValue}>
        <h1>Hello, Neon-Collab!</h1>
        <LoginPage />
      </AppContext.Provider>
      <div>
        <Routes>
          <Route path="/problemspage" element={<ProblemsPage setSelectedProblemId={setSelectedProblemId} />} />
          <Route path="/editor/:problemId" element={<CodeEditorPage setSelectedProblemId={setSelectedProblemId} />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
