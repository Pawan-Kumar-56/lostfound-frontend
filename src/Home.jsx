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
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          Lost & Found - NIT KKR
        </div>
        <div className="nav-buttons">
          <button className="nav-btn login-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="nav-btn register-btn" onClick={handleRegister}>
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Lost & Found Portal - NIT Kurukshetra
          </h1>
          <p className="hero-description">
            Your one-stop solution for reporting and finding lost items within the NIT Kurukshetra campus. 
            Connect with fellow students and recover your belongings quickly and securely.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn primary-btn" onClick={handleLogin}>
              Login
            </button>
            <button className="hero-btn secondary-btn" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Report Lost Item</h3>
              <p className="feature-description">
                Easily report your lost items with detailed descriptions and photos to help others identify them.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3 className="feature-title">Report Found Item</h3>
              <p className="feature-description">
                Help fellow students by reporting items you've found around the campus.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3 className="feature-title">Secure Student Login</h3>
              <p className="feature-description">
                Protected authentication system ensuring only NIT Kurukshetra students can access the portal.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3 className="feature-title">Easy Item Tracking</h3>
              <p className="feature-description">
                Track the status of your reported items and get notifications when matches are found.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 Lost & Found Portal | NIT Kurukshetra</p>
          <p className="footer-contact">Contact: support@nitkkr.ac.in</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
