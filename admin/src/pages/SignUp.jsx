import React, { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import iconpass from "../assets/eyeicon.jpg"; // Ensure this image exists
import "./Login.css";

export const SignUp = ({ addUser }) => {
  const navigate = useNavigate();  // Use useNavigate() to handle navigation
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    gst: '',
    password: '',
    cpassword: '',
  });

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ ...form, role: "admin" }); // force role = admin
            setMessage("Admin registered successfully. You can now login.");
            setForm({ name: "", email: "", mobile: "", password: "" });
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.msg || "Signup failed");
        }
    };
  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const { name, email, contact, address, gst, password, cpassword } = formData;
  
  //   try {
  //     const res = await fetch('http://localhost:8000/api/signup', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         name,
  //         email,
  //         contact,
  //         address,
  //         gst,
  //         password,
  //         cpassword,
  //       })
  //     });
  
  //     const data = await res.json();
  //     if (res.status === 400) {
  //       throw new Error(data.message || 'Registration failed');
  //     }
  
  //     console.log('Registration Successful:', data);
  //     // Handle success (e.g., navigate to login page)
  //   } catch (error) {
  //     console.error('Error during registration:', error.message);
  //   }
  // };
  

  return (
    <div className="login-container">
      <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className='login-icon'>
            <img src={loginIcons} alt='login icons' />
          </div>

          <div className="txtb">
            <label>Name</label>
            <input
              className="input-text"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              name="name"
            />
          </div>

          <div className="txtb">
            <label>Email</label>
            <input
              className="input-text"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              name="email"
            />
          </div>

          <div className="txtb">
            <label>Mobile</label>
            <input
              className="input-text"
              type="text"
              name="contact" 
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="txtb">
            <label>Address</label>
            <input
              className="input-text"
              type="text"
              name="address" 
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="txtb">
            <label>GST No</label>
            <input
              className="input-text"
              type="text"
              name="gst" 
              placeholder="GST No"
              value={formData.gst}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-pass">
            <label>Password</label>
            <span className="txtb-pass">
              <input
                className="input-text"
                value={formData.password}
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <img src={iconpass} alt="hide" /> : <img src={iconpass} alt="show" />}
              </span>
            </span>
          </div>

          <div className="text-pass">
            <label>Confirm Password</label>
            <span className="txtb-pass">
              <input
                className="input-text"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.cpassword}
                onChange={handleChange}
                required
                name="cpassword"
                placeholder="Confirm Password"
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <img src={iconpass} alt="hide" /> : <img src={iconpass} alt="show" />}
              </span>
            </span>
          </div>

          <div>
            <input type="submit" className="logbtn" value="Sign Up" />
          </div>

          <p>
            Already have an Account? <Link to={"/admin/login"}><span className="span-login">Login</span></Link>
          </p>
        </form>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </div>
    </div>
  );
};
