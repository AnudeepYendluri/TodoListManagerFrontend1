import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteTodoButton.css';

const DeleteTodoButton = ({ onDelete }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/getalltodo', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      const authToken = localStorage.getItem('token');
      await axios.delete(`https://todolistmanager.onrender.com/deletetodo/${todoId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Todo deleted successfully:', todoId);
      // You can add a callback here to refresh the todos in the parent component
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1>All Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            {/* Add some margin or padding to the button */}
            <button className="delete-button" onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteTodoButton;
