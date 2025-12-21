import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // axios wrapper
import loginIcons from "../assets/signin.gif";
import iconpass from "../assets/eyeicon.jpg";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(
        "/admin/login",
        { email, password },
        { withCredentials: true } // ✅ IMPORTANT
      );

      navigate("/users/userTable"); // ✅ redirect only
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        <div className="login-icon">
          <img src={loginIcons} alt="login icon" />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="txtb">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="text-pass">
          <label>Password</label>
          <span className="txtb-pass">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
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
        <button className="logbtn" type="submit" style={{ marginTop: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};
