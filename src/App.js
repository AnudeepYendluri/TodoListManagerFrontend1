import React, { useState } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm'; // Import EditTodoForm component

const App = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  // Function to handle opening the edit form
  const handleEditClick = (todoId) => {
    setEditTodoId(todoId);
    setShowEditForm(true);
  };

  // Function to handle closing the edit form
  const handleEditClose = () => {
    setShowEditForm(false);
  };

  // Function to handle updating todos after edit or delete
  const handleUpdateTodo = () => {
    // Logic to update todos after edit or delete
    // For example, you can fetch the updated todo list
    // This function can be called after successful update or delete operation
    // In this case, we don't need to do anything specific for updating after delete
  };

  return (
    <div>
      <h1>My Todo App</h1>
      <AddTodoForm />
      {/* Render the EditTodoForm component if showEditForm is true */}
      {showEditForm && (
        <EditTodoForm 
          todoId={editTodoId} 
          onClose={handleEditClose} 
          onUpdate={handleUpdateTodo} 
        />
      )}
      <TodoList 
        onEditClick={handleEditClick} 
        onUpdate={handleUpdateTodo} // Pass handleUpdateTodo function to handle updates or deletions
      /> 
      {/* Pass handleEditClick function and handleUpdateTodo function as props */}
    </div>
  );
};

export default App;
  