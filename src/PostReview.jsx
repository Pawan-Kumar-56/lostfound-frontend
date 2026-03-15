import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostReview.css';

const PostReview = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    review: ''
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
      // Try to connect to backend
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      
      // Check if it's a connection error
      if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        alert('Backend server is not running. Review saved locally!\n\nPlease start the backend server on localhost:8080 to save reviews to database.');
        
        // Save to localStorage as fallback
        const existingReviews = JSON.parse(localStorage.getItem('localReviews') || '[]');
        const newReview = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        existingReviews.push(newReview);
        localStorage.setItem('localReviews', JSON.stringify(existingReviews));
        
        // Navigate to reviews page
        navigate('/reviews');
      } else {
        alert('Network error. Please check your connection and try again.');
      }
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
          <div className="header-left">
            <h1 className="page-title">Post Your Review</h1>
            <p className="page-subtitle">Share your experience with Lost & Found Portal</p>
          </div>
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
              <div className="section-icon">📝</div>
              <div className="section-text">
                <h2 className="section-title">Write Your Review</h2>
                <h3 className="section-subtitle">Take Your Review</h3>
                <p className="section-description">
                  Help others by sharing your experience with our platform
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="review-form">
              {/* Review Details Only */}
              <div className="review-details-container">
                <div className="form-section">
                  <div className="form-section-header">
                    <div className="form-section-icon">⭐</div>
                    <h3 className="form-section-title">Review Details</h3>
                  </div>
                  <div className="form-grid-horizontal">
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
                        <div className="rating-stars">
                          {renderStars(formData.rating)}
                        </div>
                        <span className="rating-text">{formData.rating} out of 5</span>
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
                        rows="8"
                      />
                      {errors.review && <span className="error-message">{errors.review}</span>}
                    </div>
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
                  <span className="btn-icon">📝</span>
                  <span className="btn-text">{loading ? 'Posting Review...' : 'Post Review'}</span>
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