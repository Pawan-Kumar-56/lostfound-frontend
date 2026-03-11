import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import {authAPI} from "./services/api";
import "./Register.css";

const Register=()=>{

const navigate=useNavigate();

const[formData,setFormData]=useState({
fullName:"",
email:"",
password:"",
contactNumber:"",
department:"",
year:""
});

const[otp,setOtp]=useState("");
const[otpSent,setOtpSent]=useState(false);
const[otpVerified,setOtpVerified]=useState(false);

const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};

const handleSendOtp = async () => {
  if (!formData.email) {
    alert("Please enter your email address first");
    return;
  }

  // Validate email format
  if (!formData.email.includes('@')) {
    alert("Please enter a valid email address");
    return;
  }

  try {
    console.log('Sending OTP to:', formData.email);
    const response = await authAPI.sendOtp(formData.email);
    
    console.log('OTP Response:', response);
    
    alert("OTP sent to your email. Please check your inbox (including spam folder).");
    
    setOtpSent(true);
  } catch (error) {
    console.error('Send OTP Error:', error);
    alert(`Failed to send OTP: ${error.message || 'Please try again later'}`);
  }
};

const handleVerifyOtp=async()=>{

try{

await authAPI.verifyOtp(formData.email,otp);

alert("OTP verified successfully");

setOtpVerified(true);

}catch(err){

console.error(err);
alert("Invalid OTP");

}

};

const handleSubmit=async(e)=>{

e.preventDefault();

if(!otpVerified){
alert("Verify OTP first");
return;
}

try{

await authAPI.register(formData);

alert("Registration successful");

navigate("/login");

}catch(err){

console.error(err);
alert("Registration failed");

}

};

return(
  <div className="register-container">
    <div className="register-card">
      <div className="register-header">
        <h2>Create Account</h2>
        <p>Join NIT KKR Lost & Found Portal</p>
      </div>
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@nitkkr.ac.in"
              required
            />
            <button type="button" onClick={handleSendOtp} className="otp-btn">
              Send OTP
            </button>
          </div>
        </div>

        {otpSent && (
          <div className="form-group">
            <label htmlFor="otp">Enter OTP *</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
            />
            <button type="button" onClick={handleVerifyOtp} className="otp-btn verify">
              Verify OTP
            </button>
            {otpVerified && <span className="verified">✓ Verified</span>}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Your phone number"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="ME">Mechanical</option>
              <option value="CE">Civil</option>
              <option value="EE">Electrical</option>
              <option value="IT">Information Technology</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
          </div>
        </div>

        <button type="submit" className="register-btn" disabled={!otpVerified}>
          Create Account
        </button>
        
        <div className="login-link">
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </form>
    </div>
  </div>
);

};

export default Register;