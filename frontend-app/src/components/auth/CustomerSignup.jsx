// src/components/auth/CustomerSignup.jsx
import React, { useState } from "react";
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
    <div className="auth-container">
      <h2>Customer Signup</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
