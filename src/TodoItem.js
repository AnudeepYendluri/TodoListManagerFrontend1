import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={() => {}} />
      <span>{todo.title}</span>
      <button>Delete</button>
    </div>
  );
};

export default TodoItem;
