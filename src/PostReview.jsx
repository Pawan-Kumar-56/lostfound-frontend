import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostReview.css';

const PostReview = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    review: '',
    department: '',
    year: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.endsWith('@nitkkr.ac.in')) {
      newErrors.email = 'Only NIT KKR email addresses are allowed';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Review title is required';
    }
    
    if (formData.review.trim().length < 10) {
      newErrors.review = 'Review must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Get token from storage
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        alert('Review posted successfully!');
        navigate('/reviews');
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to post review. Please try again.');
      }
      
    } catch (error) {
      console.error('Error posting review:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        className={`star ${index < rating ? 'filled' : ''}`}
        onClick={() => setFormData(prev => ({ ...prev, rating: index + 1 }))}
      >
        {index < rating ? '⭐' : '☆'}
      </button>
    ));
  };

  return (
    <div className="post-review-wrapper">
      {/* Header */}
      <header className="post-review-header">
        <div className="header-content">
          <h1 className="page-title">Post Your Review</h1>
          <p className="page-subtitle">Share your experience with the Lost & Found Portal</p>
          <button onClick={handleBack} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="post-review-main">
        <div className="post-review-container">
          <div className="form-section">
            <div className="section-header">
              <h2 className="section-title">Write Your Review</h2>
              <p className="section-description">
                Help others by sharing your experience with our platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="review-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="form-section-title">Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="your.email@nitkkr.ac.in"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Department</option>
                      <option value="CSE">Computer Science</option>
                      <option value="ECE">Electronics</option>
                      <option value="ME">Mechanical</option>
                      <option value="CE">Civil</option>
                      <option value="EE">Electrical</option>
                      <option value="CHE">Chemical</option>
                      <option value="MATH">Mathematics</option>
                      <option value="PHY">Physics</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                      <option value="passed">Passed Out</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="form-section">
                <h3 className="form-section-title">Review Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="title">Review Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={errors.title ? 'error' : ''}
                      placeholder="Summarize your experience"
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <div className="rating-container">
                      {renderStars(formData.rating)}
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="review">Your Review *</label>
                    <textarea
                      id="review"
                      name="review"
                      value={formData.review}
                      onChange={handleChange}
                      className={errors.review ? 'error' : ''}
                      placeholder="Share your detailed experience with the Lost & Found Portal..."
                      rows="6"
                    />
                    {errors.review && <span className="error-message">{errors.review}</span>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Posting Review...' : '📝 Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="post-review-footer">
        <div className="footer-content">
          <p>&copy; 2024 NIT KKR Lost & Found Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PostReview;
