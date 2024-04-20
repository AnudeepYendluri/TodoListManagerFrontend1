import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css';

const UserHome = ({ isDarkMode }) => {
  return (
    <div className={`userhome-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <h1>Welcome to Todo Manager</h1>
      <div className="button-container">
        <Link to="/add-todo" className="button">Add Todo</Link>
        <Link to="/get-todo" className="button">View Todos</Link>
        <Link to="/update-todo" className={`button ${isDarkMode ? 'dark-mode-button' : ''}`}>Edit Todo</Link> {/* Apply dark mode class conditionally */}
        <Link to="/delete-todo" className={`button ${isDarkMode ? 'dark-mode-button' : ''}`}>Delete Todo</Link> {/* Apply dark mode class conditionally */}
      </div>
    </div>
  );
};

export default UserHome;
