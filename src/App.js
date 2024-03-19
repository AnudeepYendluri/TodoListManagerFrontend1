import React, { useState } from 'react';
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

function App() {
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
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
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
