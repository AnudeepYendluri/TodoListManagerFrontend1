import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css'; // Importing the CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortByDueDate, setSortByDueDate] = useState('');
  

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

  const handlePriorityFilter = async (priority) => {
    try {
      const userId = await getUserId(); // Get user ID
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/filter/${userId}?priority=${priority}`, {
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
      const userId = await getUserId(); // Get user ID
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/filter/${userId}?completed=${completed.toString()}`, {
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

 const handleSortByDueDate = async (event) => {
  const value = event.target.value;
  setSortByDueDate(value); // Update sortByDueDate state
  sortTodos(value); // Call sortTodos with the selected sorting order
};


 const sortTodos = async (order) => {
  try {
    const userId = await getUserId();
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8080/sort/${userId}?sortOrder=${order}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTodos(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error sorting todos:', error);
    setError('Failed to sort todos. Please try again.');
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
      <label htmlFor="sortByDueDate">Sort by Due Date:</label>
      <select id="sortByDueDate" value={sortByDueDate} onChange={handleSortByDueDate}>
        <option value="">Select</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <span className={`priority-${todo.priority}`}>{todo.priority}</span> 
            <span className='due-date'>{new Date(todo.dueDate).toISOString().split('T')[0]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
