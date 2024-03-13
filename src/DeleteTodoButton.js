// DeleteTodoButton.js

import React from 'react';
import axios from 'axios';
import './DeleteTodoButton.css'; // Import CSS file for DeleteTodoButton component

const DeleteTodoButton = ({ todoId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/deletetodo/${todoId}`);
      onDelete(todoId); // Notify parent component about the deletion
      console.log('Todo deleted successfully:', todoId);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>Delete</button> 
  );
};

export default DeleteTodoButton;
