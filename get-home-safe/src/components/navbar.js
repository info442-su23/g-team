import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import '../../src/style.css';
import logo from '../IMG/get home safe logo.png';

const Navbar = ({ onSearchSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(searchTerm);
  };

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const isHomepage = location.pathname === '/home';

  return (
    <nav className="navbar">
      <div className="nav-content">
        <img src={logo} className="logo" alt="Get Home Safe Logo" />

        {isHomepage && (
          <form className="search-bar" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        )}

        <div className="hamburger-menu" onClick={() => setMenuOpen(prevState => !prevState)}>
            <FontAwesomeIcon icon={faBars} />
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li className={isActive('/home') ? 'active' : ''}>
            <Link to="/home">Home</Link>
          </li>
          <li className={isActive('/friend-list-page') ? 'active' : ''}>
            <Link to="/friend-list-page">Friends List Page</Link>
          </li>
          <li className={isActive('/request-walking-buddy') ? 'active' : ''}>
            <Link to="/request-walking-buddy">Request A Walking Buddy</Link>
          </li>
          <li className={isActive('/settings') ? 'active' : ''}>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
