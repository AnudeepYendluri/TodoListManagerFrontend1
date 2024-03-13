import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteTodoButton from './DeleteTodoButton';

const TodoList = ({ onEditClick }) => { // Removed onUpdate since it's not used in this component
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/getalltodo')
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`http://localhost:8080/deletetodo/${todoId}`);
      // After successful deletion, update the todo list
      const updatedTodos = todos.filter(todo => todo.id !== todoId);
      setTodos(updatedTodos);
      console.log('Todo deleted successfully:', todoId);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => onEditClick(todo.id)}>Edit</button>
            {/* Render DeleteTodoButton for each todo item */}
            <DeleteTodoButton todoId={todo.id} onDelete={() => handleDelete(todo.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
