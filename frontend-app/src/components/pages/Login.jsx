import React, { useState } from "react";
import "./Login.css";
import loginIcons from "../../assets/img/signin.gif";
import iconpass from "../../assets/img/eyeicon.jpg";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; // ✅ use centralized axios instance (withCredentials: true)

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Login request — backend will set cookie
      await API.post("/auth/login", form);

      // 2️⃣ Fetch profile to identify logged-in user
      const { data } = await API.get("/auth/profile");

      if (data?.role) {
        // Redirect based on role
        switch (data.role) {
          case "customer":
            navigate("/");
            break;
          case "vendor":
            navigate("/vendor/dashboard");
            break;
          case "admin":
            navigate("/admin/dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        setError("Unable to fetch user details.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Customer Login</h1>

        <div className="login-icon">
          <img src={loginIcons} alt="login icon" />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="txtb">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="text-pass">
          <label>Password</label>
          <span className="txtb-pass">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnChange}
              required
            />
            <span
              className="toggle-pass"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img src={iconpass} alt="toggle visibility" />
            </span>
          </span>
        </div>

        <div className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <input type="submit" className="logbtn" value="Login" />

        <p>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};
