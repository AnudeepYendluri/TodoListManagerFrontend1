import React, { useState } from 'react';
import './Login.css'; // Import a CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your local backend API endpoint for login
      const apiUrl = 'http://localhost:8080/login'; // Replace with your actual backend API URL

      // Make a POST request to the backend API
      const response = await axios.post(apiUrl, loginData);

      // Handle the response
      console.log('API Response:', response.data);
      const data = response.data;

      if (response.status === 200) {
        window.alert(data);
        // Notify the parent component (App.js or wherever you render NavBar) about the login
        onLogin();
        navigate('/userhome'); // Redirect to UserHome after successful login
      } else {
        window.alert(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Email:</td>
                <td>
                  <input type="email" name="email" value={loginData.email} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  <input type="password" name="password" value={loginData.password} onChange={handleChange} />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
  
export default Login;
