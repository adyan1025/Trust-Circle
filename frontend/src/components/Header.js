import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ showButtons = true }) => {
  return (
    <header>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1>Trust Circle</h1>
      </Link>
      {showButtons && (
        <nav>
          <Link to="/login">
            <button>Log In</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;