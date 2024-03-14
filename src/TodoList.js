// TodoList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

const TodoList = ({ showDeleteButton }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const [pageSize, setPageSize] = useState(10); // Specify page size

  useEffect(() => {
    loadTodos();
  }, [currentPage, pageSize]); // Reload todos when page or page size changes

  const loadTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/getalltodo?page=${currentPage}&size=${pageSize}`);
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8080/deletetodo/${todoId}`);
      const updatedTodos = todos.filter(todo => todo.id !== todoId);
      setTodos(updatedTodos);
      console.log('Todo deleted successfully:', todoId);
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <span className="todo-title">{todo.title}</span>
            {showDeleteButton && <button className="delete-button" onClick={() => handleDelete(todo.id)}>Delete</button>}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
        <span>Page {currentPage + 1}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TodoList;
