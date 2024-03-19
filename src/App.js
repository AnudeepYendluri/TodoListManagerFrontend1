import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar'; // Adjust the import path here
import Register from './Register';
import Home from './Home';
import Login from './Login';
import UserHome from './UserHome';
import AddTodoForm from './AddTodoForm'; // Import AddTodoForm component
import EditTodoForm from './EditTodoForm'; // Import EditTodoForm component
import TodoList from './TodoList'; // Import TodoList component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <Router>    
      <div className="App">
        {/* Render the NavBar component outside of the Routes component */}
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        {/* Render the Routes component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/add-todo" element={<AddTodoForm />} /> {/* Add route for AddTodoForm */}
          <Route path="/edit-todo" element={<EditTodoForm />} /> {/* Add route for EditTodoForm */}
          <Route path="/view-todo" element={<TodoList />} /> {/* Add route for TodoList */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
