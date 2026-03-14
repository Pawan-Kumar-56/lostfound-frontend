import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from './services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [stats, setStats] = useState({
    totalItems: 0,
    lostItems: 0,
    foundItems: 0,
    recentActivity: 0,
    resolvedItems: 0
  });

  // Get actual user data from storage
  const userData = storage.getUser();
  const username = userData?.fullName || "User";
  const userDepartment = userData?.department || "Student";
  const userRollNumber = userData?.rollNumber || "N/A";

  const motivationalMessages = [
    "Together we've helped 147 students find their belongings this semester!",
    "Your contribution makes our campus community stronger and more trustworthy.",
    "Every item returned is a story of campus unity and care.",
    "NIT KKR students have successfully reunited over 500 items this year!",
    "Your honesty reflects the true spirit of our institution.",
    "Building a culture of trust, one found item at a time.",
    "Together we're making NIT Kurukshetra a model campus for integrity."
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

  // Load dashboard stats
  useEffect(() => {
    // Simulate realistic stats for NIT KKR
    setStats({
      totalItems: 23,
      lostItems: 14,
      foundItems: 9,
      recentActivity: 5,
      resolvedItems: 18
    });
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

  const handleMyPosts = () => {
    navigate('/myposts');
  };

  const handlePostReview = () => {
    navigate('/postreview');
  };

  const handleViewReviews = () => {
    navigate('/viewreviews');
  };

  const getCurrentTime = () => {
    return new Date().toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🔍</span>
            <div className="logo-text">
              <span className="logo-main">NIT KKR Lost & Found</span>
              <span className="logo-sub">Campus Portal</span>
            </div>
          </div>
          <div className="nav-right">
            <div className="user-info">
              <span className="profile-icon">👤</span>
              <div className="user-details">
                <span className="username">{username}</span>
                <span className="user-meta">{userDepartment} • {userRollNumber}</span>
              </div>
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
          <div className="welcome-content">
            <div className="welcome-header">
              <h1 className="welcome-title">Welcome to NIT KKR Lost & Found Portal</h1>
              <div className="campus-info">
                <span className="campus-badge">National Institute of Technology Kurukshetra</span>
                <span className="time-info">{getCurrentTime()}</span>
              </div>
            </div>
            <div className="motivational-text">
              <p className={`message ${isFading ? 'fade-out' : 'fade-in'}`}>
                {currentMessage}
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard Cards */}
        <section className="cards-section">
          <h2 className="cards-title">Portal Services</h2>
          <div className="cards-container">
            {/* Card 1: Post Item */}
            <div className="dashboard-card post-card">
              <div className="card-icon">📦</div>
              <h2 className="card-title">Report Lost Item</h2>
              <p className="card-description">
                File a detailed report for your lost belonging. Our campus community will help you locate it.
              </p>
              <button className="card-btn post-btn" onClick={handlePostItem}>
                Report Lost Item
              </button>
            </div>

            {/* Card 2: View Items */}
            <div className="dashboard-card view-card">
              <div className="card-icon">🔍</div>
              <h2 className="card-title">Browse Items</h2>
              <p className="card-description">
                Search through all reported lost and found items across campus departments and facilities.
              </p>
              <button className="card-btn view-btn" onClick={handleViewItems}>
                Browse Items
              </button>
            </div>

            {/* Card 3: Report Found Item */}
            <div className="dashboard-card found-card">
              <div className="card-icon">🎯</div>
              <h2 className="card-title">Report Found Item</h2>
              <p className="card-description">
                Help fellow students by reporting items you've found on campus. Your honesty matters!
              </p>
              <button className="card-btn found-btn" onClick={handlePostItem}>
                Report Found Item
              </button>
            </div>

            {/* Card 4: My Posts */}
            <div className="dashboard-card my-posts-card">
              <div className="card-icon">📝</div>
              <h2 className="card-title">My Reports</h2>
              <p className="card-description">
                Track the status of your lost and found reports. Manage updates and communications.
              </p>
              <button className="card-btn my-posts-btn" onClick={handleMyPosts}>
                My Reports
              </button>
            </div>

            {/* Card 5: Post Review */}
            <div className="dashboard-card post-review-card">
              <div className="card-icon">⭐</div>
              <h2 className="card-title">Post Review</h2>
              <p className="card-description">
                Help us improve the portal by sharing your experience and suggestions for better service.
              </p>
              <button className="card-btn post-review-btn" onClick={handlePostReview}>
                Post Review
              </button>
            </div>

            {/* Card 6: View Reviews */}
            <div className="dashboard-card view-reviews-card">
              <div className="card-icon">📖</div>
              <h2 className="card-title">View Reviews</h2>
              <p className="card-description">
                Read experiences and testimonials from fellow NIT KKR students about the portal.
              </p>
              <button className="card-btn view-reviews-btn" onClick={handleViewReviews}>
                View Reviews
              </button>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="quick-actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            <button className="quick-action-btn" onClick={handlePostItem}>
              <span className="quick-action-icon">➕</span>
              <span className="quick-action-text">Lost Something?</span>
            </button>
            <button className="quick-action-btn" onClick={handlePostItem}>
              <span className="quick-action-icon">🎯</span>
              <span className="quick-action-text">Found Something?</span>
            </button>
            <button className="quick-action-btn" onClick={handleViewItems}>
              <span className="quick-action-icon">🔎</span>
              <span className="quick-action-text">Search Database</span>
            </button>
            <button className="quick-action-btn" onClick={handleMyPosts}>
              <span className="quick-action-icon">📋</span>
              <span className="quick-action-text">My Activity</span>
            </button>
            <button className="quick-action-btn" onClick={handlePostReview}>
              <span className="quick-action-icon">⭐</span>
              <span className="quick-action-text">Post Review</span>
            </button>
            <button className="quick-action-btn" onClick={handleViewReviews}>
              <span className="quick-action-icon">📖</span>
              <span className="quick-action-text">View Reviews</span>
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <h2 className="stats-title">Campus Impact Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.totalItems}</h3>
                <p className="stat-label">Active Reports</p>
                <p className="stat-sublabel">This month</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.lostItems}</h3>
                <p className="stat-label">Lost Items</p>
                <p className="stat-sublabel">Awaiting recovery</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.foundItems}</h3>
                <p className="stat-label">Found Items</p>
                <p className="stat-sublabel">Ready for claim</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.resolvedItems}</h3>
                <p className="stat-label">Successfully Returned</p>
                <p className="stat-sublabel">This semester</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔔</div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.recentActivity}</h3>
                <p className="stat-label">Recent Activity</p>
                <p className="stat-sublabel">Last 24 hours</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-main">
            <p>National Institute of Technology Kurukshetra</p>
            <p className="footer-subtitle">Student Welfare Division • Lost & Found Portal</p>
          </div>
          <div className="footer-info">
            <p>Building a trusted campus community since 1963</p>
            <p className="footer-contact">Contact: student.welfare@nitkkr.ac.in</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;