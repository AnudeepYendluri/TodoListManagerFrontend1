// DeleteTodoButton.js

import React from 'react';
import axios from 'axios';

const DeleteTodoButton = ({ todoId }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/deletetodo/${todoId}`);
      console.log('Todo deleted successfully:', todoId);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button> 
  );
};

export default DeleteTodoButton;
