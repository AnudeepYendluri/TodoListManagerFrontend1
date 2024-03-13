// EditTodoForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditTodoForm.css';

const EditTodoForm = ({ todoId, onClose, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Fetch todo details based on todoId when the component mounts
    const fetchTodoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/gettodobyid/${todoId}`);
        const todo = response.data;
        setTitle(todo.title);
        setDescription(todo.description);
        setCompleted(todo.completed);
      } catch (error) {
        console.error('Error fetching todo details:', error);
      }
    };

    fetchTodoDetails();

  }, [todoId]); // Fetch todo details when todoId changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:8080/updatetodo/${todoId}`, {
        title,
        description,
        completed
      });
      
      console.log('Todo updated successfully:', response.data);
      
      // Close the form and trigger onUpdate callback
      onClose();
      onUpdate();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h2>Edit Todo</h2>
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
        <button className="edit-button" type="submit">Update Todo</button> {/* Apply edit-button class */}
      </form>
    </div>
  );
};

export default EditTodoForm;
