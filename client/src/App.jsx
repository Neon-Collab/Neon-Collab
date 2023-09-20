import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
// import CodeEditorPage from './pages/CodeEditorPage.jsx';
import AppContext from "./contexts/AppContext.jsx";
import WeekendContext from "./contexts/WeekendContext.jsx";
import Navbar from "./components/Navbar.jsx";
import CodeEditorPage from "./pages/CodeEditorPage.jsx";
import Feedback from "./pages/Feedback.jsx";
import ProblemsPage from "./pages/ProblemsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    loggedIn: false,
  });

  const contextValue = useMemo(
    () => ({
      account,
      setAccount,
    }),
    [account, setAccount]
  );

  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [weekend, setWeekend] = useState(false);
  const toggleWeekend = () => {
    setWeekend((prev) => !prev);
  };
  return (
    <div>
      <AppContext.Provider value={contextValue}>
        <WeekendContext.Provider value={{ weekend, toggleWeekend }}>
          {account.loggedIn && <Navbar />}
          {!account.loggedIn && <h1>Hello, Neon-Collab!</h1>}
          {!account.loggedIn && <LoginPage />}
          <div>
            <Routes>
              <Route path="/problemspage" element={<ProblemsPage />} />
              <Route path="/editor/:problemId" element={<CodeEditorPage />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </WeekendContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
