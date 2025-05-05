import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the new CSS

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Regno: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.Regno.trim()) validationErrors.Regno = 'Registration number is required';
    if (!formData.email.trim()) validationErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Email is invalid';
    if (!formData.password.trim()) validationErrors.password = 'Password is required';
    else if (formData.password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) validationErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('https://studentportal-g670.onrender.com/api/signup', {
        Regno: formData.Regno,
        email: formData.email,
        password: formData.password,
      });

      console.log('User registered successfully:', response.data);
      setFormData({ Regno: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
      navigate('/login');
    } catch (err) {
      console.error('Error registering user:', err.response?.data || err.message);
      setErrors({ server: err.response?.data?.message || 'Server error' });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us and explore your dashboard</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Regno" className="form-label">Registration Number</label>
            <input
              type="text"
              id="Regno"
              name="Regno"
              className="form-input"
              value={formData.Regno}
              onChange={handleInputChange}
              required
            />
            {errors.Regno && <span className="form-error">{errors.Regno}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>
          {errors.server && <span className="form-error">{errors.server}</span>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? 
            <button onClick={() => navigate("/login")} className="signup-login-link"> Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
