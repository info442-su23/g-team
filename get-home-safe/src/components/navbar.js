import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import '../../src/style.css';
import logo from '../IMG/get home safe logo.png';

const Navbar = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  // Get the current user location path using useLocation hook
  const location = useLocation();

  // Function to determine if a given path is the current path.
  // Will add style to the active path so user can see which page
  // they are currently at through the nav bar.
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-content">
        <img src={logo} className="logo" />
        <ul className="nav-links">
          <li className={isActive('/') ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={isActive('/friends-list') ? 'active' : ''}>
            <Link to="/friends-list">Friends List</Link>
          </li>
          <li className={isActive('/request-walking-buddy') ? 'active' : ''}>
            <Link to="/request-walking-buddy">Request A Walking Buddy</Link>
          </li>
          <li className={isActive('/settings') ? 'active' : ''}>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
      <form className="search-bar" onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Search" />
        <Link to="/search-results">
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Link>
      </form>
    </nav>
  );
};

export default Navbar;



