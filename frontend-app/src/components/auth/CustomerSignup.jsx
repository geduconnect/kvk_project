// src/components/auth/CustomerSignup.jsx
import React, { useState } from "react";
import "./Login.css";
import loginIcons from "../../assets/img/signin.gif";
import iconpass from "../../assets/img/eyeicon.jpg";
import { useNavigate, Link } from "react-router-dom";

export const CustomerSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signup(form);
    if (res.success) {
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(res.message || "Signup failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Customer Signup</h2>

        <div className="login-icon">
          <img src={loginIcons} alt="login icon" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="txtb">
          <input name="name" placeholder="Name" onChange={handleChange} required /></div>
        <div className="txtb">
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required /></div>
        <div className="text-pass">
          <span className="txtb-pass">
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required /> <span
              className="toggle-pass"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src={iconpass} alt="toggle visibility" />
            </span>
          </span>
        </div>
        <div className="txtb">
          <input name="mobile" placeholder="Mobile" onChange={handleChange} /></div>
        <div className="txtb">
          <input name="address" placeholder="Address" onChange={handleChange} /></div>
        <div className="txtb">
          <input name="city" placeholder="City" onChange={handleChange} /></div>
        <div className="txtb">
          <input name="state" placeholder="State" onChange={handleChange} /></div>
        <div className="txtb">
          <input name="pincode" placeholder="Pincode" onChange={handleChange} /></div>
        {success && <p className="success">{success}</p>}
        <button className="logbtn" type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form >
    </div >
  );
};
