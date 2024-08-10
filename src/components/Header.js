import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/today">Today's Sales</Link>
        <Link to="/comparison">Sales Comparison</Link>
      </nav>
    </header>
  );
};

export default Header;