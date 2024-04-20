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
  const [dueDate, setDueDate] = useState(''); // New state for due date
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const userId = await getUserId();
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/getalltodo/${userId}`, {
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

  const getUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/getuserid', {
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
    setDueDate(todo.dueDate); // Set due date from todo
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/updatetodo/${editedTodo.id}`, {
        title: title,
        description: description,
        completed: completed,
        dueDate: dueDate // Include due date in the update request
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditedTodo(null);
      setTitle('');
      setDescription('');
      setCompleted(false);
      setDueDate(''); // Clear due date
      setEditMode(false);
      fetchTodos();
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
          <div className="edit-todo-input-group">
            <label className="edit-todo-label">Due Date:</label>
            <input type="date" className="edit-todo-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
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

