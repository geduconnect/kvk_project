import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export const MyAccount = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FETCH ADMIN PROFILE
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;

        const res = await api.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  if (error) return <p className="error-msg">{error}</p>;
  if (!profile) return null;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Admin Profile</h2>

      <div className="profile-card">
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Role:</b> {profile.role || "Admin"}</p>

        {profile.mobile && <p><b>Mobile:</b> {profile.mobile}</p>}
        {profile.address && <p><b>Address:</b> {profile.address}</p>}

        <div className="logout-box">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
