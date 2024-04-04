import React, { useState } from 'react';

const TodoFilter = ({ onFilter }) => {
  const [priority, setPriority] = useState('');
  const [completed, setCompleted] = useState('');

  const handleFilter = () => {
    // Call the onFilter function passed from the parent component
    // Pass the selected filter options as parameters
    onFilter({ priority, completed });
  };

  return (
    <div>
      <h3>Filter Todos</h3>
      <label htmlFor="priority">Priority:</label>
      <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Select Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <label htmlFor="completed">Completed:</label>
      <select id="completed" value={completed} onChange={(e) => setCompleted(e.target.value)}>
        <option value="">Select Completed</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default TodoFilter;
