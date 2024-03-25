import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for registration success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error when the user starts entering text
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validation logic
    if (!/^[a-zA-Z\s]+$/.test(formData.username)) {
      newErrors.username = 'Username should have only characters and spaces';
      isValid = false;
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number should have only ten digits and starting with 6,7,8 or 9 ';
      isValid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,15}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'password should be having at least one capital, one small letter, one digit, one special character, and no spaces allowed and length should be between 6 to 15 ';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      // Form is not valid, do not proceed with the submission
      return;
    }
  
    try {
      // Update the backend API URL to point to your backend deployed on Render
      const response = await axios.post('https://todolistmanager.onrender.com/register', formData);
  
      // Handle the response (you can add more logic here)
      console.log('API Response:', response.data);
  
      if (response.status === 200) {
        // Display registration success message
        setRegistrationSuccess(true);
        // Reset form data
        setFormData({
          username: '',
          email: '',
          mobileNumber: '',
          password: '',
          confirmPassword: '',
        });
        // Redirect to the login page after successful registration
        onNavigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register Form</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Username:</td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <div className="error">{errors.username}</div>}
                </td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </td>
              </tr>
              <tr>
                <td>Mobile Number:</td>
                <td>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  {errors.mobileNumber && <div className="error">{errors.mobileNumber}</div>}
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="error">{errors.password}</div>}
                </td>
              </tr>
              <tr>
                <td>Confirm Password:</td>
                <td>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="error">{errors.confirmPassword}</div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <button type="submit">Register</button>
        </form>
        {registrationSuccess && <p className="success-message">Registration Successful</p>} {/* Display success message */}
        </div>
    </div>
  );
};

export default Register;
