import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { authAPI } from "./services/api";

const Register = () => {

const navigate = useNavigate();

const [formData,setFormData] = useState({
fullName:"",
email:"",
password:"",
contactNumber:"",
department:"",
year:""
});

const [otp,setOtp] = useState("");
const [otpSent,setOtpSent] = useState(false);
const [otpVerified,setOtpVerified] = useState(false);
const [loading,setLoading] = useState(false);

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

// SEND OTP
const handleSendOtp = async ()=>{

```
try{

  setLoading(true);

  await authAPI.sendOtp(formData.email);

  alert("OTP sent to your email");

  setOtpSent(true);

}catch(err){

  console.error(err);
  alert("Failed to send OTP");

}

setLoading(false);
```

};

// VERIFY OTP
const handleVerifyOtp = async ()=>{

```
try{

  await authAPI.verifyOtp(formData.email,otp);

  alert("OTP verified successfully");

  setOtpVerified(true);

}catch(err){

  alert("Invalid OTP");

}
```

};

// REGISTER
const handleSubmit = async(e)=>{

```
e.preventDefault();

if(!otpVerified){
  alert("Please verify OTP first");
  return;
}

try{

  await authAPI.register({
    fullName:formData.fullName,
    email:formData.email,
    password:formData.password,
    contactNumber:formData.contactNumber,
    department:formData.department,
    year:formData.year
  });

  alert("Registration successful");

  navigate("/login");

}catch(err){

  console.error(err);
  alert("Registration failed");

}
```

};

return (

```
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
    name="password"
    type="password"
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

    {!otpSent && (
      <button type="button" onClick={handleSendOtp}>
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    )}

    {otpSent && !otpVerified && (
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

    {otpVerified && (
      <button type="submit">
        Register
      </button>
    )}

  </form>

</div>
```

);

};

export default Register;
