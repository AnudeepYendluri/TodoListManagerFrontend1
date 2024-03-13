import React, { useState } from 'react';
import axios from 'axios';
import './AddTodoForm.css';

const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/addtodo', {
        title,
        description,
        completed
      });
      
      console.log('Todo added successfully:', response.data);
      
      // Reset form fields after successful submission
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
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
