import React, { useState } from 'react';
import axios from 'axios';

const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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
        completed: completed
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
    <div>
      <h2>Add New Todo</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Completed:</label>
          <input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        </div>
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodoForm;
