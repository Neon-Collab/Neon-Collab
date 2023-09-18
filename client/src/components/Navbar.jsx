import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div>
        <Link className="logo" to="/">neonCollab</Link>
        <Link className="link" to="/problemspage">Problems</Link>
        <Link className="link" to="/editor">Editor</Link>
        <Link className="link" to="/feedback">Feedback</Link>
      </div>
      <Link to="/profile"><img className="profile-pic" src="https://i.stack.imgur.com/frlIf.png" alt="profile pic" /></Link>
    </nav>
  );
}

export default Navbar;
