import React, { useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../contexts/AppContext.jsx';


// added logout button accessible in the navbar, feel free to style/change as needed
// we should keep in the nav bar to be accessible everywhere
// otherwise, to log out you would need to clear cookies
function Navbar() {
  const { account, setAccount } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      setAccount({
        ...account,
        loggedIn: false,
        username: '',
      });
      navigate('/');
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
      <input type="button" value="Sign Out" onClick={logout} />
      <Link to="/profile"><img className="profile-pic" src="https://i.stack.imgur.com/frlIf.png" alt="profile pic" /></Link>
    </nav>
  );
}

  export default Navbar;
