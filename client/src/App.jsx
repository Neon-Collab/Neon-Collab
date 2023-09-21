import React, { useEffect, useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/LoginComponents/ProtectedRoute.jsx'
// import CodeEditorPage from './pages/CodeEditorPage.jsx';
import AppContext from './contexts/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import CodeEditorPage from './pages/CodeEditorPage.jsx';
import Feedback from './pages/Feedback.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import WeekendContext from './contexts/WeekendContext.jsx';

function App() {
  const navigate = useNavigate();
  const [weekend, setWeekend] = useState(false);
  const [account, setAccount] = useState({});
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  const contextValue = useMemo(
    () => ({
      account,
      setAccount,
    }),
    [account, setAccount],
  );

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const currentUser = await axios.get('/api/checkLoginStatus');
        if (currentUser) {
          console.log('User is logged in: ', currentUser);
          setAccount({
            ...account,
            username: currentUser.data,
            loggedIn: true,
          });
        }
      } catch (err) {
        console.log('Please log in');
      }
    };
    checkLoginStatus();
  }, []);

  const toggleWeekend = () => {
    setWeekend((prev) => !prev);
  };

  return (
    <div>
      <AppContext.Provider value={contextValue}>
        <WeekendContext.Provider value={{ weekend, toggleWeekend }}>
          {account.loggedIn ? (
            <Navbar />
          ) : (
            <>
              <h1>Hello, Neon-Collab!</h1>
              <LoginPage />
            </>
          )}
          <div>
            <Routes>
              <Route
                path="/problemspage"
                element={(
                  <ProtectedRoute loggedIn={account.loggedIn}>
                    <ProblemsPage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/editor/:problemId"
                element={(
                  <ProtectedRoute loggedIn={account.loggedIn}>
                    <CodeEditorPage />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/feedback"
                element={(
                  <ProtectedRoute loggedIn={account.loggedIn}>
                    <Feedback />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/profile"
                element={(
                  <ProtectedRoute loggedIn={account.loggedIn}>
                    <ProfilePage />
                  </ProtectedRoute>
                )}
              />
            </Routes>
          </div>
        </WeekendContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
