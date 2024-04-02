import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; // Importing the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      // Get userId using getUserId API
      const userId = await getUserId();

      // Make API call to fetch todos for the user
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://todolistmanager.onrender.com/getalltodo/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos. Please try again.');
      setLoading(false);
    }
  };

  // Function to get user ID from token by making an API call to your backend
  const getUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://todolistmanager.onrender.com/getuserid', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve user ID from token');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="todo-list-container"> {/* Applying the CSS class */}
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
