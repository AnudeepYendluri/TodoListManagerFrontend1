import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
      // Update the backend API URL to point to your backend deployed on Render
      const response = await axios.post('https://todolistmanager.onrender.com/login', loginData);
      if (response.status === 200) {
        // Save token to local storage or state
        localStorage.setItem('token', response.data.authToken);
        // Notify the parent component about the login
        onLogin();
        // Redirect to user home
        navigate('/userhome');
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
                  <input type="email" name="email" value={loginData.email} onChange={handleChange} autoComplete="email" />
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  <input type="password" name="password" value={loginData.password} onChange={handleChange} autoComplete="current-password" />
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
