import React from 'react';
import './Home.css'; // Import a CSS file for styling
import todoImage from './todo.jpg'; // Import the image

const Home = () => (
  <div className="home-container">
    <div className="content">
      <h2>Welcome to Todo List Manager</h2>
      {/* Updated home page content here */}
      <p>Manage your tasks efficiently with our Todo List Manager. Stay organized, prioritize your tasks, and accomplish your goals seamlessly. Experience the simplicity and effectiveness of our tool designed to enhance your productivity.</p>
    </div>
    <div className="image-container">
      <img
        src={todoImage} // Replace with the actual image URL
        alt="Todo List Manager Image"
        className="image"
      />
    </div>
  </div>
);

export default Home;
