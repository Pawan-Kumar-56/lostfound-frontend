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
confirmPassword:"",
contactNumber:"",
department:"",
year:""
});

const[showPassword,setShowPassword]=useState(false);
const[showConfirmPassword,setShowConfirmPassword]=useState(false);
const[currentStep,setCurrentStep]=useState(1);

const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};

const togglePasswordVisibility=(field)=>{
if(field==='password'){
setShowPassword(!showPassword);
}else if(field==='confirmPassword'){
setShowConfirmPassword(!showConfirmPassword);
}
};

const validateForm=()=>{
if(!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.department || !formData.year){
return false;
}
if(formData.password !== formData.confirmPassword){
alert("Passwords do not match");
return false;
}
if(formData.password.length < 6){
alert("Password must be at least 6 characters");
return false;
}
return true;
};

const handleSubmit=async(e)=>{
e.preventDefault();

if(!validateForm()){
return;
}

try{
console.log('Registering user:', formData.email);
await authAPI.register(formData);

alert("Registration successful! Welcome to NIT KKR Lost & Found Portal 🎉");

navigate("/login");
}catch(err){
console.error(err);
alert("Registration failed. Please try again.");
}
};

const nextStep=()=>{
if(currentStep===1 && formData.fullName && formData.email){
setCurrentStep(2);
}else if(currentStep===2 && formData.password && formData.confirmPassword && formData.department && formData.year){
setCurrentStep(3);
}
};

const prevStep=()=>{
if(currentStep>1){
setCurrentStep(currentStep-1);
}
};

return(
<div className="register-container">
<div className="register-card">
<div className="register-header">
<h2>Join NIT KKR Lost & Found</h2>
<p>Connect with your campus community</p>
<div className="step-indicator">
<div className={`step ${currentStep>=1 ? 'active' : ''}`}>
<span>1</span>
<small>Personal Info</small>
</div>
<div className={`step ${currentStep>=2 ? 'active' : ''}`}>
<span>2</span>
<small>Account Setup</small>
</div>
<div className={`step ${currentStep>=3 ? 'active' : ''}`}>
<span>3</span>
<small>Additional Details</small>
</div>
</div>
</div>

{currentStep===1 && (
<div className="step-content">
<h3>👤 Personal Information</h3>
<p>Let's start with your basic information</p>
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
className="form-input"
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
className="form-input"
/>
</div>
</div>
<div className="button-group">
<button onClick={nextStep} className="next-btn" disabled={!formData.fullName || !formData.email}>
Continue to Account Setup →
</button>
</div>
</div>
)}

{currentStep===2 && (
<div className="step-content">
<h3>🔐 Account Security</h3>
<p>Create a strong password for your account</p>
<div className="form-row">
<div className="form-group">
<label htmlFor="password">Password *</label>
<div className="password-input">
<input
type={showPassword ? "text" : "password"}
id="password"
name="password"
value={formData.password}
onChange={handleChange}
placeholder="Create a strong password"
required
className="form-input"
/>
<button
type="button"
onClick={() => togglePasswordVisibility('password')}
className="password-toggle"
>
{showPassword ? '👁️' : '👁️‍🗨️'}
</button>
</div>
<small className="password-hint">Use 8+ characters with mix of letters, numbers & symbols</small>
</div>
<div className="form-group">
<label htmlFor="confirmPassword">Confirm Password *</label>
<div className="password-input">
<input
type={showConfirmPassword ? "text" : "password"}
id="confirmPassword"
name="confirmPassword"
value={formData.confirmPassword}
onChange={handleChange}
placeholder="Confirm your password"
required
className="form-input"
/>
<button
type="button"
onClick={() => togglePasswordVisibility('confirmPassword')}
className="password-toggle"
>
{showConfirmPassword ? '👁️' : '👁️‍🗨️'}
</button>
</div>
</div>
</div>
<div className="button-group">
<button onClick={prevStep} className="prev-btn">
← Back
</button>
<button onClick={nextStep} className="next-btn" disabled={!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword}>
Continue to Details →
</button>
</div>
</div>
)}

{currentStep===3 && (
<div className="step-content">
<h3>📚 Academic Information</h3>
<p>Help us connect you with the right campus resources</p>
<div className="form-row">
<div className="form-group">
<label htmlFor="contactNumber">Contact Number</label>
<input
type="tel"
id="contactNumber"
name="contactNumber"
value={formData.contactNumber}
onChange={handleChange}
placeholder="Your phone number"
className="form-input"
/>
</div>
<div className="form-group">
<label htmlFor="department">Department *</label>
<select
id="department"
name="department"
value={formData.department}
onChange={handleChange}
className="form-input"
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
<label htmlFor="year">Year *</label>
<select
id="year"
name="year"
value={formData.year}
onChange={handleChange}
className="form-input"
>
<option value="">Select Year</option>
<option value="1st">1st Year</option>
<option value="2nd">2nd Year</option>
<option value="3rd">3rd Year</option>
<option value="4th">4th Year</option>
</select>
</div>
</div>
<div className="button-group">
<button onClick={prevStep} className="prev-btn">
← Back
</button>
<button onClick={handleSubmit} className="register-btn" disabled={!formData.department || !formData.year}>
🎉 Create Account
</button>
</div>
</div>
)}

<div className="info-section">
<div className="info-card">
<h4>🌟 Why Join Our Community?</h4>
<ul>
<li>📱 <strong>Instant Notifications:</strong> Get alerts for lost & found items</li>
<li>🔍 <strong>Smart Search:</strong> Advanced filtering by department & location</li>
<li>💬 <strong>Direct Chat:</strong> Message item owners directly</li>
<li>🏫 <strong>Verified Users:</strong> Only NIT KKR students & faculty</li>
<li>📊 <strong>Success Rate:</strong> 85%+ items successfully returned</li>
</ul>
</div>
<div className="info-card">
<h4>🎯 How It Works</h4>
<ol>
<li><strong>Register:</strong> Create your account in 30 seconds</li>
<li><strong>Report:</strong> Post lost items with photos & details</li>
<li><strong>Search:</strong> Browse items by category or keyword</li>
<li><strong>Connect:</strong> Chat with owners to arrange pickup</li>
<li><strong>Resolve:</strong> Mark items as found & returned</li>
</ol>
</div>
</div>

<div className="login-link">
Already have an account? <a href="/login">Sign In</a>
</div>
</div>
</div>
);

};

export default Register;