import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
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
          {isLoggedIn && <li><button onClick={onLogout}>Logout</button></li>}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
