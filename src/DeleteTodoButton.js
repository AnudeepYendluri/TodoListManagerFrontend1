import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteTodoButton = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      // Get userId using getUserId API
      const userId = await getUserId();

      // Make API call to fetch todos for the user
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/getalltodo/${userId}`, {
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
      const response = await axios.get('http://localhost:8080/getuserid', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve user ID from token');
    }
  };

  const handleDelete = async (todoId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/deletetodo/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Show success message
      setSuccessMessage('Todo Deleted Successfully');

      // Refetch todos
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <strong>Title:</strong> {todo.title}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default DeleteTodoButton;
