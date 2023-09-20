import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { logout } from '../../../server/controllers/firebaseController.js';
import AppContext from '../contexts/AppContext.jsx';
import { auth } from '../../../server/firebase';

// added logout button accessible in the navbar, feel free to style/change as needed
// we should keep in the nav bar to be accessible everywhere
// otherwise, to log out you would need to clear cookies
function Navbar() {
  // const { account, setAccount } = useContext(AppContext);
  const context = useContext(AppContext);
  console.log(context);

  const { account, setAccount } = context;
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      setAccount({
        loggedIn: false
      });
      navigate('/');
    }
  }, [user]);

  return (
    <nav>
      <div>
        <Link className='logo' to={account.loggedIn ? '/problemspage' : '/'}>
          neonCollab
        </Link>
        <Link className='link' to='/problemspage'>
          Problems
        </Link>
        <Link className='link' to='/feedback'>
          Feedback
        </Link>
      </div>
      <input type='button' value='Sign Out' onClick={logout} />
      <Link to='/profile'>
        <img className='profile-pic' src='https://i.stack.imgur.com/frlIf.png' alt='profile pic' />
      </Link>
    </nav>
  );
}

export default Navbar;
