import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, storage } from './services/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@nitkkr.ac.in')) {
      newErrors.email = 'Email must be @nitkkr.ac.in';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Call backend API for login
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password
      });

      // Save user data and token
      storage.saveUser({
        id: response.id,
        fullName: response.fullName,
        email: response.email,
        role: response.role
      });
      storage.saveToken(response.token);
      
      // Store user session if remember me is checked
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      alert('Login successful! Welcome to NIT KKR Lost & Found Portal.');
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Check for specific HTTP status codes
      if (error.response?.status === 400) {
        alert('Invalid email or password');
      } else if (error.response?.status === 401) {
        alert('Invalid email or password');
      } else if (error.response?.status === 404) {
        alert('User not found');
      } else {
        alert('Login failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For now, please contact support@nitkkr.ac.in');
  };

  return (
    <div className="login-container">
      {/* Left Section - Image and Text */}
      <div className="login-left">
        <div className="overlay">
          <div className="content">
            <h1>NIT KKR Lost & Found Portal</h1>
            <p className="tagline">Reuniting Lost Items with Their Owners</p>
            <p className="description">
              Our comprehensive lost and found system helps the NIT Kurukshetra community 
              track and recover misplaced items. Report lost items, submit found items, 
              and browse through our database to find what you're looking for.
            </p>
            <div className="features">
              <div className="feature">
                <span className="icon">🔍</span>
                <span>Search Lost Items</span>
              </div>
              <div className="feature">
                <span className="icon">📦</span>
                <span>Report Found Items</span>
              </div>
              <div className="feature">
                <span className="icon">🔔</span>
                <span>Get Notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Lost & Found Portal - NIT Kurukshetra</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="your.email@nitkkr.ac.in"
                autoComplete="email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePassword}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Register Link */}
            <div className="register-link">
              Don't have an account? <button type="button" onClick={() => navigate('/register')}>Register here</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;