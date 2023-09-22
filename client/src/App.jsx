import React, { useEffect, useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/LoginComponents/ProtectedRoute.jsx';
// import CodeEditorPage from './pages/CodeEditorPage.jsx';
import AppContext from './contexts/AppContext.jsx';
import Navbar from './components/Navbar.jsx';
import CodeEditorPage from './pages/CodeEditorPage.jsx';
import Feedback from './pages/Feedback.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import WeekendContext from './contexts/WeekendContext.jsx';
import Button from '@mui/material/Button';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [weekend, setWeekend] = useState(false);
  const [account, setAccount] = useState({});
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [currentPage, setCurrentPage] = useState('');

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
          // isReady checks if checkLoginStatus has returned before redirecting a private route
          setAccount({
            ...account,
            username: currentUser.data,
            loggedIn: true,
            isReady: true,
          });
        }
      } catch (err) {
        console.log('User is already logged in');
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    try {
      setCurrentPage(location.pathname);
      setAccount({
        ...account,
        currentPage: location.pathname,
      });
    } catch (err) {
      console.error(err);
    }
  }, [location]);

  const toggleWeekend = () => {
    setWeekend((prev) => !prev);
  };

  return (
    <div>
      <AppContext.Provider value={contextValue}>
        <WeekendContext.Provider value={{ weekend, toggleWeekend }}>
          <div>
            { (account.loggedIn && currentPage !== '/') && <Navbar /> }
            <div className="routes">
              <Routes>
                <Route
                  path="/"
                  element={<LoginPage />}
                />
                <Route
                  path="/problemspage"
                  element={(
                    <ProtectedRoute account={account}>
                      <ProblemsPage userId={account.username} />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/editor/:problemId"
                  element={(
                    <ProtectedRoute account={account}>
                      <CodeEditorPage />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/feedback"
                  element={(
                    <ProtectedRoute account={account}>
                      <Feedback />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/profile"
                  element={(
                    <ProtectedRoute account={account}>
                      <ProfilePage />
                    </ProtectedRoute>
                  )}
                />
              </Routes>
            </div>
          </div>
        </WeekendContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
