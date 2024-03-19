import React, { useState } from 'react';
import axios from 'axios';
import './AddTodoForm.css'; // Import your CSS file

const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const authToken = localStorage.getItem('token'); // Change 'authToken' to 'token'
      await axios.post('http://localhost:8080/addtodo', {
        title,
        description,
        completed,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Todo added successfully');
  
      // Clear form fields after submission
      setTitle('');
      setDescription('');
      setCompleted(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  

  return (
    <div className="add-todo-form-container">
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>
            Completed:
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          </label>
        </div>
        <button type="submit" className="submit-button">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
