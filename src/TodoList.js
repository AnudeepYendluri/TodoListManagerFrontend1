import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; // Importing the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const userId = await getUserId();
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

  const handlePriorityFilter = async (priority) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://todolistmanager.onrender.com/filter?priority=${priority}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching filtered todos:', error);
      setError('Failed to fetch filtered todos. Please try again.');
      setLoading(false);
    }
  };

  const handleCompletedFilter = async (completed) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://todolistmanager.onrender.com/filter?completed=${completed.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching filtered todos:', error);
      setError('Failed to fetch filtered todos. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="todo-list-container"> {/* Applying the CSS class */}
      <h2>Todo List</h2>
      <button onClick={() => handleCompletedFilter(true)} className='filterButton'>Completed</button>
      <button onClick={() => handleCompletedFilter(false)} className='filterButton'>Pending</button>
      <button onClick={() => handlePriorityFilter('high')} className='filterButtonHigh'>High</button>
      <button onClick={() => handlePriorityFilter('medium')} className='filterButtonMedium'>Medium</button>
      <button onClick={() => handlePriorityFilter('low')} className='filterButtonLow'>Low</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <span className={`priority-${todo.priority}`}>{todo.priority}</span> {/* Displaying priority level */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
