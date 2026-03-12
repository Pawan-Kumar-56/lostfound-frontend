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

const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{

e.preventDefault();

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
          </div>
        </div>

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

        <button type="submit" className="register-btn">
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