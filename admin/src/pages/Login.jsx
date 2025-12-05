import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // axios wrapper

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Submitting admin login...");
      const res = await api.post("/admin/login", { email, password });

      console.log("Login response:", res.data);

      // ✅ Redirect after successful login
      navigate("/users/userTable");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-form">
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};
