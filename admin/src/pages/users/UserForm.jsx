import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/admin/users";
axios.defaults.withCredentials = true;

const ALLOWED_ROLES = ["admin"]; // only admin role exists in your table

export const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    resetPassword: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing user if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:8000/api/admin/users/${id}`)
        .then((res) =>
          setUserData((prev) => ({
            ...prev,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
          }))
        )
        .catch(() => setError("Failed to load user data"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (id) {
        // Update user
        const updatedData = { name: userData.name, email: userData.email, role: userData.role };
        if (userData.resetPassword) updatedData.password = userData.resetPassword;

        await axios.put(`/${id}`, updatedData);
      } else {
        // Add new user
        if (!userData.password) {
          setError("Password is required for new user");
          return;
        }
        await axios.post("/", userData);
      }
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-form">
      <h2>{id ? "Edit User" : "Add User"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />
        </div>

        {id && (
          <div>
            <label>Reset Password</label>
            <input
              type="password"
              name="resetPassword"
              value={userData.resetPassword}
              onChange={handleChange}
              placeholder="Leave blank if not changing"
            />
          </div>
        )}

        {!id && (
          <div>
            <label>Password</label>
            <input type="password" name="password" value={userData.password} onChange={handleChange} required />
          </div>
        )}

        <div>
          <label>Role</label>
          <select name="role" value={userData.role} onChange={handleChange}>
            {ALLOWED_ROLES.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          {id ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};
