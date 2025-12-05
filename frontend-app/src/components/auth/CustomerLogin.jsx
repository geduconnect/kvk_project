import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../../context/CustomerContext.jsx";

export const CustomerLogin = () => {
  const navigate = useNavigate();
  const { customer, login, loading } = useCustomerAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (!loading && customer) {
      console.log("Already logged in, redirecting to /profile");
      navigate("/profile");
    }
  }, [customer, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    console.log("handleSubmit → login attempt");

    try {
      const auth = await login(email, password);
      console.log("handleSubmit → login success:", auth);

      if (auth) {
        navigate("/profile"); // redirect after successful login
      } else {
        setError("Login failed: no user returned");
      }
    } catch (err) {
      console.error("handleSubmit → login error:", err.response?.data || err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Checking authentication...</div>;

  return (
    <div className="login-form" style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Customer Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit"  style={{ padding: "10px 20px" }}>
          {/* {submitting ? "Logging in..." : "Login"} */}
        </button>
      </form>
    </div>
  );
};
