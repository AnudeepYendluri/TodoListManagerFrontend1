import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';
import TodoList from './TodoList';

const DeleteTodoButton = () => {
  const location = useLocation();

  return (
    <div>
      <h1>Delete Todo List</h1>
      {location.pathname === '/delete-todo' && <TodoList showDeleteButton />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-todo" element={<AddTodoForm />} />
          <Route path="/delete-todo" element={<DeleteTodoButton />} />
          <Route path="/update-todo" element={<EditTodoForm />} />
          <Route path="/get-todo" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
