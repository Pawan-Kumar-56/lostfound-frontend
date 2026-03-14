import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-main">NIT KKR</span>
              <span className="title-sub">Lost & Found Portal</span>
            </h1>
            <p className="hero-description">
              Your trusted platform for finding lost items and returning found belongings. 
              Join our community of 2,500+ students and faculty members.
            </p>
            <div className="hero-buttons">
              <button onClick={handleRegister} className="hero-btn primary">
                Get Started
              </button>
              <button onClick={handleLogin} className="hero-btn secondary">
                Sign In
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-icons">
              <div className="floating-icon icon-1">🔍</div>
              <div className="floating-icon icon-2">📱</div>
              <div className="floating-icon icon-3">🎓</div>
              <div className="floating-icon icon-4">📚</div>
              <div className="floating-icon icon-5">🔐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <p className="section-subtitle">Discover the features that make us the best lost & found solution</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">🚀</div>
            </div>
            <h3 className="feature-title">Quick Reporting</h3>
            <p className="feature-description">
              Report lost or found items in seconds with our intuitive interface
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">🎯</div>
            </div>
            <h3 className="feature-title">Smart Matching</h3>
            <p className="feature-description">
              Our AI-powered system matches lost items with found items automatically
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">📸</div>
            </div>
            <h3 className="feature-title">Photo Upload</h3>
            <p className="feature-description">
              Upload images for better identification and faster recovery
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">🔔</div>
            </div>
            <h3 className="feature-title">Instant Alerts</h3>
            <p className="feature-description">
              Get notified immediately when someone reports a matching item
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">🏫</div>
            </div>
            <h3 className="feature-title">Campus Wide</h3>
            <p className="feature-description">
              Covers all departments, hostels, and campus buildings
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <div className="feature-icon">📊</div>
            </div>
            <h3 className="feature-title">Track Progress</h3>
            <p className="feature-description">
              Monitor the status of your reported items in real-time
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="stats-background"></div>
        <div className="stats-content">
          <div className="section-header">
            <h2 className="section-title">Making a Difference</h2>
            <p className="section-subtitle">See how we're helping the NIT KKR community</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">2,500+</div>
              <div className="stat-label">Active Users</div>
              <div className="stat-description">Students and faculty members</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1,800+</div>
              <div className="stat-label">Items Returned</div>
              <div className="stat-description">Successfully reunited</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">85%</div>
              <div className="stat-label">Success Rate</div>
              <div className="stat-description">Items recovered within 48 hours</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Availability</div>
              <div className="stat-description">Always here to help</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in just 3 simple steps</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3 className="step-title">Create Account</h3>
              <p className="step-description">
                Register with your NIT KKR email to get started
              </p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3 className="step-title">Report Item</h3>
              <p className="step-description">
                Describe the lost or found item with details and photos
              </p>
            </div>
          </div>
          <div className="step-connector"></div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3 className="step-title">Get Connected</h3>
              <p className="step-description">
                Our system matches and connects the right people
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">Real stories from our community</p>
          <button onClick={() => navigate('/reviews')} className="view-all-btn">
            View All Reviews →
          </button>
        </div>
        <div className="testimonials-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">
                "I lost my wallet during the fest and found it within hours thanks to this platform!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🎓</div>
                <div className="author-info">
                  <div className="author-name">Rahul Kumar</div>
                  <div className="author-role">CSE Student</div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">
                "Found someone's laptop bag and was able to return it to the owner quickly."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍🎓</div>
                <div className="author-info">
                  <div className="author-name">Priya Sharma</div>
                  <div className="author-role">ECE Student</div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p className="testimonial-text">
                "Amazing platform! Very user-friendly and effective for finding lost items."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🏫</div>
                <div className="author-info">
                  <div className="author-name">Dr. Singh</div>
                  <div className="author-role">Faculty Member</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join our community today and never worry about lost items again
          </p>
          <div className="cta-buttons">
            <button onClick={handleRegister} className="cta-btn primary">
              Create Account
            </button>
            <button onClick={handleLogin} className="cta-btn secondary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">NIT KKR Lost & Found</h3>
            <p className="footer-description">
              Connecting students and faculty to recover lost items since 2024
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/login">Sign In</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li>support@nitkkr.ac.in</li>
              <li>Help Desk: Room 101, Admin Block</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NIT KKR Lost & Found Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
