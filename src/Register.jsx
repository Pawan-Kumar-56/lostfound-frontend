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

const handleSendOtp=async()=>{

if(!formData.email){
alert("Enter email first");
return;
}

try{

await authAPI.sendOtp(formData.email);

alert("OTP sent to your email");

setOtpSent(true);

}catch(err){

console.error(err);
alert("Failed to send OTP");

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

<h2>Create Account</h2>

<form onSubmit={handleSubmit}>

<input
name="fullName"
placeholder="Full Name"
onChange={handleChange}
/>

<input
name="email"
placeholder="Email"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
/>

<input
name="contactNumber"
placeholder="Contact Number"
onChange={handleChange}
/>

<input
name="department"
placeholder="Department"
onChange={handleChange}
/>

<input
name="year"
placeholder="Year"
onChange={handleChange}
/>

{!otpSent &&(
<button type="button" onClick={handleSendOtp}>
Send OTP
</button>
)}

{otpSent && !otpVerified &&(
<>
<input
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>

<button type="button" onClick={handleVerifyOtp}>
Verify OTP
</button>
</>
)}

{otpVerified &&(
<button type="submit">
Register
</button>
)}

</form>

</div>

);

};

export default Register;