import React from 'react';
import { Link } from 'react-router-dom';
import logout from '../../../server/controllers/firebaseController.js'

// added logout button accessible in the navbar, feel free to style/change as needed
// otherwise, to log out you would need to clear cookies
function Navbar() {
  return (
    <nav>
      <div>
        <Link className="logo" to="/">neonCollab</Link>
        <Link className="link" to="/problemspage">Problems</Link>
        <Link className="link" to="/editor/:problemId">Editor</Link>
        <Link className="link" to="/feedback">Feedback</Link>
      </div>
      <input type="button" onClick={logout}>Sign Out</input>
      <Link to="/profile"><img className="profile-pic" src="https://i.stack.imgur.com/frlIf.png" alt="profile pic" /></Link>
    </nav>
  );
}

export default Navbar;
