// EditTodoForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditTodoForm.css';

const EditTodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    axios.get('http://localhost:8080/getalltodo')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error.message);
      });
  }, []);

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:8080/updatetodo/${selectedTodo.id}`, {
        title,
        description,
        completed
      });
      
      console.log('Todo updated successfully');
      
      // Clear form fields after submission
      setTitle('');
      setDescription('');
      setCompleted(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="edit-todo-form-container">
      <h2>Edit Todo</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleEdit(todo)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedTodo && (
        <form onSubmit={handleSubmit}>    
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label>
              Completed:
              <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
            </label>
          </div>
          <button type="submit">Update Todo</button>
        </form>
      )}
    </div>
  );
};

export default EditTodoForm;
