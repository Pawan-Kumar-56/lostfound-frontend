import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      // First try to get from localStorage (for offline mode)
      const localReviews = JSON.parse(localStorage.getItem('localReviews') || '[]');
      
      // Try to fetch from backend
      const response = await fetch('http://localhost:8080/api/reviews');
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      setReviews(data);
      setError(null); // Clear any previous errors
      
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message);
      
      // Use localStorage reviews as fallback
      const localReviews = JSON.parse(localStorage.getItem('localReviews') || '[]');
      
      if (localReviews.length > 0) {
        setReviews(localReviews);
      } else {
        // Fallback to hardcoded data if no localStorage reviews
        setReviews([
          {
            id: 1,
            name: "Rahul Kumar",
            email: "rahul@nitkkr.ac.in",
            rating: 5,
            title: "Amazing Platform!",
            review: "I lost my wallet during the fest and found it within hours thanks to this platform! The notification system is amazing and the community is very helpful.",
            department: "CSE",
            year: "3rd Year",
            createdAt: "2024-03-10T10:30:00"
          },
          {
            id: 2,
            name: "Priya Sharma",
            email: "priya@nitkkr.ac.in",
            rating: 5,
            title: "Very Helpful",
            review: "Found someone's laptop bag and was able to return it to the owner quickly. The platform made it super easy to connect with the right person.",
            department: "ECE",
            year: "2nd Year",
            createdAt: "2024-03-08T14:20:00"
          },
          {
            id: 3,
            name: "Dr. Singh",
            email: "singh@nitkkr.ac.in",
            rating: 5,
            title: "Excellent Service",
            review: "Amazing platform! Very user-friendly and effective for finding lost items. I've recommended it to all my students.",
            department: "Faculty",
            year: "Professor",
            createdAt: "2024-03-05T09:15:00"
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        {index < rating ? '⭐' : '☆'}
      </span>
    ));
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return "Recent";
    }
  };

  if (loading) {
    return (
      <div className="reviews-wrapper">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews-wrapper">
        <div className="error-container">
          <h2>Connection Error</h2>
          <p>{error}</p>
          <p>Showing sample reviews instead...</p>
          <button onClick={fetchReviews} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-wrapper">
      {/* Header */}
      <header className="reviews-header">
        <div className="header-content">
          <h1 className="reviews-title">All Reviews</h1>
          <p className="reviews-subtitle">See what our community is saying about the platform</p>
          <button onClick={handleBackToHome} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Reviews Grid */}
      <main className="reviews-main">
        <div className="reviews-grid">
          {reviews.length === 0 ? (
            <div className="no-reviews">
              <div className="no-reviews-icon">📝</div>
              <h3>No Reviews Yet</h3>
              <p>Be the first to share your experience!</p>
              <button onClick={() => navigate('/postreview')} className="post-review-btn">
                Post a Review
              </button>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-author">
                    <div className="author-avatar">👤</div>
                    <div className="author-info">
                      <h3 className="author-name">{review.name}</h3>
                      <p className="author-role">{review.department} • {review.year}</p>
                    </div>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="review-content">
                  <h4 className="review-title">{review.title || "Great Experience"}</h4>
                  <p className="review-text">{review.review}</p>
                  <div className="review-meta">
                    <span className="review-date">{formatDate(review.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="reviews-footer">
        <div className="footer-content">
          <p>&copy; 2024 NIT KKR Lost & Found Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Reviews;
