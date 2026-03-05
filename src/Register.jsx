import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { authAPI } from './services/api';

const Register = () => {
  const navigate = useNavigate();
  
  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    department: '',
    year: ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [emailSending, setEmailSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

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

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Contact Number validation
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (formData.contactNumber.length !== 10) {
      newErrors.contactNumber = 'Contact number must be exactly 10 digits';
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Please select your year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate and send OTP
  const handleSendOtp = async () => {
    if (!validateForm()) {
      return;
    }

    setEmailSending(true);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setOtpSentTime(Date.now());
    setOtpError('');
    
    // Start resend timer (60 seconds)
    setResendTimer(60);
    const timerInterval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Enhanced Email Simulation
    console.log('='.repeat(50));
    console.log('📧 EMAIL SENT SUCCESSFULLY');
    console.log('='.repeat(50));
    console.log('From: noreply@nitkkr.ac.in');
    console.log('To:', formData.email);
    console.log('Subject: 🔐 Verify Your NIT KKR Account');
    console.log('Date:', new Date().toLocaleString());
    console.log('');
    console.log('📝 MESSAGE BODY:');
    console.log('─'.repeat(30));
    console.log('Dear ' + formData.fullName + ',');
    console.log('');
    console.log('Thank you for registering with the NIT Kurukshetra Lost & Found Portal!');
    console.log('');
    console.log('🔢 Your One-Time Password (OTP) is:');
    console.log('');
    console.log('   ' + otp + '   ');
    console.log('');
    console.log('⏰ This OTP will expire in 10 minutes.');
    console.log('');
    console.log('If you didn\'t request this OTP, please ignore this email.');
    console.log('');
    console.log('Best regards,');
    console.log('NIT Kurukshetra Lost & Found Team');
    console.log('─'.repeat(30));
    console.log('='.repeat(50));
    
    // Store in localStorage for persistence
    localStorage.setItem('simulationOtp', otp);
    localStorage.setItem('simulationEmail', formData.email);
    localStorage.setItem('simulationTime', Date.now().toString());
    
    setEmailSending(false);
    
    // Show browser notification if permitted
    if (Notification.permission === 'granted') {
      new Notification('OTP Sent', {
        body: `Check console for OTP sent to ${formData.email}`,
        icon: '📧'
      });
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setEmailSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSentTime(Date.now());
    setOtpError('');
    
    setResendTimer(60);
    const timerInterval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    console.log('📧 RESENT EMAIL SIMULATION:');
    console.log('New OTP:', otp);
    
    setEmailSending(false);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    // Check if OTP expired (10 minutes)
    if (otpSentTime && Date.now() - otpSentTime > 10 * 60 * 1000) {
      setOtpError('OTP has expired. Please request a new one.');
      return;
    }

    if (otpInput === generatedOtp) {
      setOtpVerified(true);
      setOtpError('');
      console.log('✅ Email verification successful!');
    } else {
      setOtpError('Invalid OTP. Please check your email and try again.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!otpVerified) {
    alert('Please verify your email first.');
    return;
  }

  try {

    const response = await authAPI.register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      contactNumber: formData.contactNumber,
      department: formData.department || 'Computer Science',
      year: formData.year
    });

    alert("Registration successful!");
    navigate('/login');

  } catch (error) {
    console.error("Register error:", error);
    alert("Registration failed");
  }
};

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Lost & Found Portal - NIT Kurukshetra</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
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

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPassword}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={errors.contactNumber ? 'error' : ''}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
            />
            {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
          </div>

          {/* Year */}
          <div className="form-group">
            <label htmlFor="year">Year of Study</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={errors.year ? 'error' : ''}
            >
              <option value="">Select your year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
            {errors.year && <span className="error-message">{errors.year}</span>}
          </div>

          {/* OTP Section */}
          {!otpVerified && (
            <div className="otp-section">
              {!otpSent ? (
                <button
                  type="button"
                  className="otp-btn"
                  onClick={handleSendOtp}
                  disabled={emailSending}
                >
                  {emailSending ? 'Sending...' : 'Send OTP'}
                </button>
              ) : (
                <div className="otp-verification">
                  <div className="otp-success-message">
                    ✅ OTP sent to {formData.email}
                  </div>
                  <div className="form-group">
                    <label htmlFor="otp">Enter OTP</label>
                    <input
                      type="text"
                      id="otp"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                    />
                    {otpError && <span className="error-message">{otpError}</span>}
                  </div>
                  <div className="otp-buttons">
                    <button
                      type="button"
                      className="otp-btn verify-btn"
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                    <button
                      type="button"
                      className="otp-btn resend-btn"
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0 || emailSending}
                    >
                      {resendTimer > 0 ? `Resend (${resendTimer}s)` : 'Resend OTP'}
                    </button>
                  </div>
                  <div className="otp-hint">
                    💡 Check the browser console for the OTP (simulation)
                  </div>
                </div>
              )}
            </div>
          )}

          {otpVerified && (
            <div className="otp-verified">
              ✅ Email verified successfully!
            </div>
          )}

          {/* Real Email Integration Info */}
          <div className="email-info">
            <div className="info-header">
              📧 Email Service Status
            </div>
            <div className="info-content">
              <p><strong>Current Mode:</strong> Simulation (Console Output)</p>
              <p><strong>For Real Email:</strong> Backend service required</p>
              <div className="integration-options">
                <strong>Available Options:</strong>
                <ul>
                  <li>EmailJS (200 free emails/month)</li>
                  <li>SendGrid (100 free emails/day)</li>
                  <li>AWS SES (62,000 free emails/month)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={!otpVerified}
          >
            Register
          </button>

          {/* Login Link */}
          <div className="login-link">
            Already have an account? <button type="button" onClick={() => navigate('/login')}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
