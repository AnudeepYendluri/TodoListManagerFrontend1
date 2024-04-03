import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditTodoForm.css';


const EditTodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      // Get userId using getUserId API
      const userId = await getUserId();

      // Make API call to fetch todos for the user
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://todolistmanager.onrender.com/getalltodo/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos. Please try again.');
      setLoading(false);
    }
  };

  // Function to get user ID from token by making an API call to your backend
  const getUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://todolistmanager.onrender.com/getuserid', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve user ID from token');
    }
  };

  const handleEdit = (todo) => {
    setEditedTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to edit todo
      const token = localStorage.getItem('token');
      await axios.put(`https://todolistmanager.onrender.com/updatetodo/${editedTodo.id}`, {
        title: title,
        description: description,
        completed: completed
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Reset state
      setEditedTodo(null);
      setTitle('');
      setDescription('');
      setCompleted(false);
      setEditMode(false);

      // Refetch todos
      fetchTodos();

      // Show success message
      setSuccessMessage('Todo updated successfully');

    } catch (error) {
      console.error('Error editing todo:', error);
      setError('Failed to edit todo. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="edit-todo-container">
      <h2>Edit Todo</h2>
      {editMode ? (
        <form className="edit-todo-form" onSubmit={handleSubmit}>
          <div className="edit-todo-input-group">
            <label className="edit-todo-label">Title:</label>
            <input type="text" className="edit-todo-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="edit-todo-input-group">
            <label className="edit-todo-label">Description:</label>
            <textarea className="edit-todo-textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="edit-todo-input-group">
            <label className="edit-todo-label">Completed:</label>
            <input type="checkbox" className="edit-todo-checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
          </div>
          <button type="submit" className="edit-todo-btn">Update Todo</button>
        </form>
      ) : (
        <ul className="edit-todo-list">
          {todos.map(todo => (
            <li key={todo.id} className="edit-todo-item">
              <strong>Title:</strong> {todo.title}
              <button className="edit-todo-edit-btn" onClick={() => handleEdit(todo)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
      {successMessage && <p className="edit-todo-success">{successMessage}</p>}
    </div>
  );
  
};

export default EditTodoForm;
