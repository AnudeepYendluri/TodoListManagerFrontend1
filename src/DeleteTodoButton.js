import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteTodoButton = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const apiUrl = 'https://todolistmanager.onrender.com/getalltodo'; // Update with your Render API URL
      const response = await axios.get(apiUrl, {
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
      // After successful deletion, fetch the updated todos
      fetchTodos();
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
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteTodoButton;
