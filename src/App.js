import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import UserHome from './UserHome';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';
import TodoList from './TodoList';
import DeleteTodoButton from './DeleteTodoButton';
import './DarkMode.css'; // Import the DarkMode.css file

function App() {
  // 1. Create state variables to track the dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Implement functions to toggle the dark mode state
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // 3. Implement logic to apply dark mode styles dynamically
  useEffect(() => {
    // Check if dark mode is enabled
    if (isDarkMode) {
      // Add 'dark-mode' class to the body when dark mode is enabled
      document.body.classList.add('dark-mode');
    } else {
      // Remove 'dark-mode' class from the body when dark mode is disabled
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const redirectToLogin = () => {
    // Redirect to the login page
    // You can replace '/login' with your actual login route
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="App">
        {/* 4. Pass down the dark mode state and toggle function as props */}
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          {/* Define your routes */}
          {/* For example: */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/add-todo" element={<AddTodoForm />} />
          <Route path="/delete-todo" element={<DeleteTodoButton />} />
          <Route path="/update-todo" element={<EditTodoForm />} />
          <Route path="/get-todo" element={<TodoList />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
