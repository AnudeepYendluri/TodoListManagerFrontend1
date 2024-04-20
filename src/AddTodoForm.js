import React, { useState } from 'react';
import axios from 'axios';
import './AddTodoForm.css'; // Import the CSS file for styling

const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState(''); // Step 1: Add state for due date

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to get the userId
      const userId = await getUserId();

      // Make API call to add todo
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8080/addtodo?userId=${userId}`, {
        title: title,
        description: description,
        completed: completed,
        priority: priority,
        dueDate: dueDate // Include due date in the request payload
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data); // Log success message

      // Clear form fields
      setTitle('');
      setDescription('');
      setCompleted(false);
      setPriority('');
      setDueDate(''); // Clear due date field

      // Show success message
      setSuccessMessage('Todo Added Successfully');
    } catch (error) {
      // Log the error for debugging
      console.error('Error adding todo:', error);

      // Check if error.response exists and log its data
      if (error.response) {
        console.log('Response data:', error.response.data);
      }

      setError('Failed to add todo. Please try again.'); // Set generic error message
    }
  };

    console.log("Due date" , dueDate);
  // Function to get user ID from token by making an API call to your backend
  const getUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/getuserid', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve user ID from token');
    }
  };

  return (
    <div className="add-todo-form-container">
      <h2>Add New Todo</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Completed:</label>
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group"> {/* Step 2: Add input field for due date */}
          <label>Due Date:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <button type="submit" className="submit-button">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodoForm;

