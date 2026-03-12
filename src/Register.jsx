import React,{useState} from "react";
import { authAPI } from './services/api';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    rollNumber: ''
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      alert('Please enter your email first');
      return;
    }

    setLoading(true);
    try {
      await authAPI.sendOtp(formData.email);
      setOtpSent(true);
      alert('OTP sent to your email!');
    } catch (error) {
      console.error('Send OTP error:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }

    setLoading(true);
    try {
      await authAPI.verifyOtp(formData.email, otp);
      setOtpVerified(true);
      alert('OTP verified successfully!');
    } catch (error) {
      console.error('Verify OTP error:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otpVerified) {
      alert('Please verify your email first');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.department || !formData.year) {
      alert('Please select department and year');
      return;
    }

    setLoading(true);
    try {
      await authAPI.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        department: formData.department,
        year: formData.year,
        rollNumber: formData.rollNumber
      });
      alert('Registration successful! Please login.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Left Side - Information */}
      <div className="info-section">
        <div className="info-content">
          <div className="logo-section">
            <h1>🎓 NIT KKR</h1>
            <h2>Lost & Found Portal</h2>
          </div>
          
          <div className="features-section">
            <h3>🌟 Why Join Our Community?</h3>
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">�</div>
                <h4>Smart Search</h4>
                <p>Advanced filtering by department & location</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏫</div>
                <h4>Verified Users</h4>
                <p>Only NIT KKR students & faculty</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">�</div>
                <h4>High Success Rate</h4>
                <p>85%+ items successfully returned</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">�</div>
                <h4>Easy to Use</h4>
                <p>Simple interface for quick reporting</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">�</div>
                <h4>Photo Upload</h4>
                <p>Upload images for better identification</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔐</div>
                <h4>Secure Platform</h4>
                <p>Your data is safe and private</p>
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <h4>2,500+</h4>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h4>1,800+</h4>
              <p>Items Found</p>
            </div>
            <div className="stat-item">
              <h4>85%</h4>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="form-section">
        <div className="form-container">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Join our NIT KKR Lost & Found community</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Personal Information */}
            <div className="form-group">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@nitkkr.ac.in"
                    required
                    disabled={otpVerified}
                  />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="form-group">
              <h3>Password Setup</h3>
              <div className="form-row">
                <div className="form-field">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="form-group">
              <h3>Academic Information</h3>
              <div className="form-row">
                <div className="form-field">
                  <label>Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EE">Electrical Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="CHE">Chemical Engineering</option>
                    <option value="BT">Biotechnology</option>
                    <option value="MME">Metallurgical & Materials</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Year *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-field full-width">
                  <label>Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="Enter your roll number (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Email Verification */}
            <div className="form-group">
              <h3>Email Verification</h3>
              <div className="otp-section">
                <div className="otp-input-group">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    disabled={otpVerified}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpVerified || loading || !formData.email}
                    className="otp-btn"
                  >
                    {loading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                  </button>
                </div>
                {otpSent && !otpVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="verify-btn"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                )}
                {otpVerified && (
                  <div className="otp-verified">
                    <span className="verified-icon">✅</span>
                    Email verified successfully
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                disabled={loading || !otpVerified}
                className="register-btn"
              >
                {loading ? 'Creating Account...' : '🎉 Create Account'}
              </button>
            </div>
          </form>

          <div className="login-link">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;