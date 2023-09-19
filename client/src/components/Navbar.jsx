import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../server/controllers/firebaseController.js';
import AppContext from '../contexts/AppContext.jsx';

// added logout button accessible in the navbar, feel free to style/change as needed
// otherwise, to log out you would need to clear cookies
function Navbar() {
  const { account, setAccount } = useContext(AppContext);
  const navigate = useNavigate();

  const signOut = () => {
    setAccount((previousObj) => ({
      ...previousObj,
      loggedIn: false,
    }));
    try {
      logout();
      console.log('Signing out...');
      navigate('/loginpage');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav>
      <div>
        <Link className="logo" to={account.loggedIn ? "/problemspage" : "/loginpage"}>neonCollab</Link>
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
