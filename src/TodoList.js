import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await axios.get('https://todolistmanager.onrender.com/getalltodo', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } 
  };

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-header">Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;