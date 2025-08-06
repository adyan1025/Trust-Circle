import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Trust Circle</h1>
      <nav>
        <button onClick={() => window.location.href = 'login.html'}>Log In</button>
        <button onClick={() => window.location.href = 'signup.html'}>Sign Up</button>
      </nav>
    </header>
  );
};

export default Header;