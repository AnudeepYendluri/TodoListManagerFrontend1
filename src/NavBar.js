import React from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle'; // Import the DarkModeToggle component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

const NavBar = ({ isLoggedIn, onLogout, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Perform logout action
    onLogout();

    // Redirect to Home component
    handleNavigation('/');
  };

  return (
    <nav className="navbar">
      <div className="right">
        <h1>Todo <span>List</span></h1>
      </div>
      <div className="left">
        <ul>
          {!isLoggedIn && <li><a href="/" onClick={() => handleNavigation('/')}>Home</a></li>}
          {!isLoggedIn && <li><a href="/register" onClick={() => handleNavigation('/register')}>Register</a></li>}
          {!isLoggedIn && <li><a href="/login" onClick={() => handleNavigation('/login')}>Login</a></li>}
          {isLoggedIn && <li><button onClick={handleLogout}>Logout</button></li>}
          {/* Show DarkModeToggle only when logged in */}
          {isLoggedIn && (
            <li>
              {/* Add title attribute to show tooltip */}
              <FontAwesomeIcon
                icon={faMoon}
                title="Dark Mode"
                style={{ cursor: 'pointer' }}
                onClick={toggleDarkMode}
              />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
