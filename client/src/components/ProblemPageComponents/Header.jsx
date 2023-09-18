import React from 'react';

function Navigation() {
  return (
    <nav>
      <button type="button">Problems</button>
      <button type="button">Editor</button>
      <button type="button">Feedback</button>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <div>neon-collab Logo</div>
      <Navigation />
    </header>
  );
}

export default Header;
