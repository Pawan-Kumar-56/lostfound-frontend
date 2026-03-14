import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Get actual user data from storage
  const userData = storage.getUser();
  const username = userData?.fullName || "User";

  const motivationalMessages = [
    "Helping others find their lost items makes campus better!",
    "Every found item brings relief to someone.",
    "Your small action can help someone a lot.",
    "Lost today, found tomorrow!",
    "Together we make campus life easier.",
    "One item at a time, building community trust.",
    "Your contribution matters to someone in need."
  ];

  // Change motivational message every 5 seconds
  useEffect(() => {
    setCurrentMessage(motivationalMessages[0]);

    const messageInterval = setInterval(() => {
      setIsFading(true);
      
      setTimeout(() => {
        setMessageIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % motivationalMessages.length;
          setCurrentMessage(motivationalMessages[nextIndex]);
          return nextIndex;
        });
        setIsFading(false);
      }, 300);
    }, 5000);

    return () => clearInterval(messageInterval);
  }, []);

  const handleLogout = () => {
    // Clear user data and token
    storage.removeUser();
    storage.removeToken();
    navigate('/');
  };

  const handlePostItem = () => {
    navigate('/postitem');
  };

  const handleViewItems = () => {
    navigate('/viewitems');
  };

  const handlePostReview = () => {
    // For now, show alert since backend will be updated later
    alert('Review posting feature will be available soon! Backend integration in progress.');
  };

  const handleViewReviews = () => {
    navigate('/reviews');
  };

  return (
    <div className="dashboard">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            Lost & Found Portal - NIT KKR
          </div>
          <div className="nav-right">
            <div className="user-info">
              <span className="profile-icon">👤</span>
              <span className="username">Hello, {username}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1 className="welcome-title">Welcome back to Lost & Found Portal!</h1>
          <div className="motivational-text">
            <p className={`message ${isFading ? 'fade-out' : 'fade-in'}`}>
              {currentMessage}
            </p>
          </div>
        </section>

        {/* Dashboard Cards */}
        <section className="cards-section">
          <div className="cards-container">
            {/* Card 1: Post Item */}
            <div className="dashboard-card">
              <div className="card-icon">📦</div>
              <h2 className="card-title">Post Item</h2>
              <p className="card-description">
                Report a lost or found item on campus.
              </p>
              <button className="card-btn post-btn" onClick={handlePostItem}>
                Post Item
              </button>
            </div>

            {/* Card 2: View Items */}
            <div className="dashboard-card">
              <div className="card-icon">🔍</div>
              <h2 className="card-title">View Items</h2>
              <p className="card-description">
                Browse all lost and found items reported by students.
              </p>
              <button className="card-btn view-btn" onClick={handleViewItems}>
                View Items
              </button>
            </div>

            {/* Card 3: Post Review */}
            <div className="dashboard-card">
              <div className="card-icon">⭐</div>
              <h2 className="card-title">Post Review</h2>
              <p className="card-description">
                Share your experience and help others.
              </p>
              <button className="card-btn review-btn" onClick={handlePostReview}>
                Post Review
              </button>
            </div>

            {/* Card 4: View Reviews */}
            <div className="dashboard-card">
              <div className="card-icon">📝</div>
              <h2 className="card-title">View Reviews</h2>
              <p className="card-description">
                Read what others are saying about our platform.
              </p>
              <button className="card-btn reviews-btn" onClick={handleViewReviews}>
                View Reviews
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>NIT Kurukshetra Lost & Found Portal</p>
      </footer>
    </div>
  );
};

export default Dashboard;
