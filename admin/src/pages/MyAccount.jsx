import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "./api"; // centralized axios

export const MyAccount = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);

  // Fetch logged-in user profile
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        // Decode token to get user ID (JWT payload contains id & role)
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        // Fetch user details
        const res = await api.get(`/users/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);

        // Unauthorized or invalid token
        localStorage.removeItem("token");
        navigate("/admin/login");
      }
    };

    fetchProfile();
  }, [token, navigate]);

 const handleLogout = () => {
  localStorage.removeItem("token"); // remove "token", not "adminToken"
  navigate("/admin/login");
};
  return (
    <div className="my-account-page">
      <nav style={{ marginBottom: "20px" }}>
        {!token ? (
          <>
            <Link to="/admin/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/signup" style={{ marginRight: "10px" }}>Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
            <Link to="/account" style={{ marginRight: "10px" }}>My Account</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      {/* Profile Section */}
      {profile ? (
        <div className="profile-card">
          <h2>My Profile</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Mobile:</strong> {profile.mobile || "-"}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>State:</strong> {profile.state || "-"}</p>
          <p><strong>City:</strong> {profile.city || "-"}</p>
          <p><strong>Address:</strong> {profile.address || "-"}</p>
          <p><strong>Pincode:</strong> {profile.pincode || "-"}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <Outlet />
    </div>
  );
};
