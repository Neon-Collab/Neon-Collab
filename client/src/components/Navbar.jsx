import React, { useContext, Text } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../../../server/controllers/firebaseController.js';
import AppContext from '../contexts/AppContext.jsx';
import WeekendContext from '../contexts/WeekendContext.jsx';
import { auth } from '../../../server/firebase';


// added logout button accessible in the navbar, feel free to style/change as needed
// we should keep in the nav bar to be accessible everywhere
// otherwise, to log out you would need to clear cookies
function Navbar() {

  // const { account, setAccount } = useContext(AppContext);
  const context = useContext(AppContext);
  const { weekend, toggleWeekend } = useContext(WeekendContext);
  const location = useLocation();
  const { account, setAccount } = context;
  const [user, loading, error] = useAuthState(auth);
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
  // alternate profile photo: https://i.ibb.co/q9TpWV6/Ash-Squirtle.png
  return (
    <nav>
      <div>
        <Link className='logo' to={account.loggedIn ? '/problemspage' : '/'}>
          neonCollab
        </Link>
        <Link className={'/problemspage' === location.pathname ? 'active-link link' : 'link'} to='/problemspage'>
          Problems
        </Link>
        {/* <Link className='link' to='/editor'>
          Editor
        </Link> */}
        <Link className={'/feedback' === location.pathname ? 'active-link link' : 'link'} to='/feedback'>
          Feedback
        </Link>
      </div>

      <div className="profile-logout">
        <button type='button' onClick={() => toggleWeekend()}>
          Change Weekday
        </button>
        <input type='button' value='Sign Out' onClick={logout} />
        <button type="button" onClick={() => navigate('/profile')}>Hello, {account.username}!</button>
        <Link className={'/profile' === location.pathname ? 'active-link link' : 'link'} to='/profile'>
          <img className='profile-pic' src='https://i.ibb.co/R4rJ15t/pokemon-lets-go-find-squirtle-copy.png' alt='profile pic' activeClassname='active-link'/>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
