import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      name: "Rahul Kumar",
      role: "CSE Student",
      avatar: "👨‍🎓",
      text: "I lost my wallet during the fest and found it within hours thanks to this platform! The notification system is amazing and the community is very helpful.",
      rating: 5,
      date: "March 10, 2024"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "ECE Student",
      avatar: "👩‍🎓",
      text: "Found someone's laptop bag and was able to return it to the owner quickly. The platform made it super easy to connect with the right person.",
      rating: 5,
      date: "March 8, 2024"
    },
    {
      id: 3,
      name: "Dr. Singh",
      role: "Faculty Member",
      avatar: "👨‍🏫",
      text: "Amazing platform! Very user-friendly and effective for finding lost items. I've recommended it to all my students.",
      rating: 5,
      date: "March 5, 2024"
    },
    {
      id: 4,
      name: "Anjali Verma",
      role: "ME Student",
      avatar: "👩‍🎓",
      text: "Lost my phone in the library and someone found it through this app. The instant alerts are a game changer!",
      rating: 4,
      date: "March 3, 2024"
    },
    {
      id: 5,
      name: "Vikas Rao",
      role: "EE Student",
      avatar: "👨‍🎓",
      text: "Great interface and very responsive. Found my lost keys within 30 minutes of posting. Highly recommend!",
      rating: 5,
      date: "February 28, 2024"
    },
    {
      id: 6,
      name: "Neha Patel",
      role: "CHE Student",
      avatar: "👩‍🎓",
      text: "The photo upload feature is so helpful. Found my lost notebook easily because someone uploaded clear photos.",
      rating: 4,
      date: "February 25, 2024"
    },
    {
      id: 7,
      name: "Amit Kumar",
      role: "CSE Student",
      avatar: "👨‍🎓",
      text: "Best lost and found platform in NIT KKR! Very reliable and the community is very active.",
      rating: 5,
      date: "February 20, 2024"
    },
    {
      id: 8,
      name: "Sunita Reddy",
      role: "CE Student",
      avatar: "👩‍🎓",
      text: "Love the smart matching feature. It automatically connects you with people who found similar items.",
      rating: 4,
      date: "February 15, 2024"
    },
    {
      id: 9,
      name: "Prof. Kumar",
      role: "Faculty Member",
      avatar: "👨‍🏫",
      text: "As a faculty member, I've seen many students benefit from this platform. It's making our campus better.",
      rating: 5,
      date: "February 10, 2024"
    }
  ];

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
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <div className="author-avatar">{review.avatar}</div>
                  <div className="author-info">
                    <h3 className="author-name">{review.name}</h3>
                    <p className="author-role">{review.role}</p>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <div className="review-content">
                <p className="review-text">{review.text}</p>
                <div className="review-meta">
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
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
