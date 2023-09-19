import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../server/controllers/firebaseController.js';
import AppContext from '../contexts/AppContext.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../server/firebase';


// added logout button accessible in the navbar, feel free to style/change as needed
// otherwise, to log out you would need to clear cookies
function Navbar() {
  const { account, setAccount } = useContext(AppContext);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      setAccount({
        loggedIn: false,
      });
      navigate('/');
    }
  }, [user]);

  const signOut = async () => {
    try {
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav>
      <div>
        <Link className="logo" to={account.loggedIn ? "/problemspage" : "/"}>neonCollab</Link>
        <Link className="link" to="/problemspage">Problems</Link>
        <Link className="link" to="/editor/:problemId">Editor</Link>
        <Link className="link" to="/feedback">Feedback</Link>
      </div>
      <input type="button" value="Sign Out" onClick={signOut} />
      <Link to="/profile"><img className="profile-pic" src="https://i.stack.imgur.com/frlIf.png" alt="profile pic" /></Link>
    </nav>
  );
}

export default Navbar;
