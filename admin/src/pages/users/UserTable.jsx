import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import viewimg from "../../assets/159078.png";
import editimg from "../../assets/edit-new-icon-22.png";
import deleteimg from "../../assets/1214428.png";

// ✅ Axios config — connect securely with backend
axios.defaults.baseURL = "http://localhost:8000/api/admin/users";
axios.defaults.withCredentials = true;

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch all admin users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      // "" works fine because axios.defaults.baseURL is already set
    const res = await axios.get("http://localhost:8000/api/admin/users"); // full URL
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setError(err.response?.data?.error || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Delete admin user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      alert(err.response?.data?.error || "Failed to delete user.");
    }
  };

  // 🔍 Filter users by search query
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-details-page">
      <div className="adminproduct-head">
        <h2>All Admin Users</h2>
        <Link to="/users/addUser">
          <button className="upload-btn">+ Add User</button>
        </Link>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by name, email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
        />
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="table-customer">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <Link to={`/users/${user.id}`}>
                    <span className="preview-icon">
                      <img src={viewimg} alt="view" />
                    </span>
                  </Link>
                  <Link to={`/users/edit/${user.id}`}>
                    <span className="preview-icon">
                      <img src={editimg} alt="edit" />
                    </span>
                  </Link>
                  <span
                    onClick={() => deleteUser(user.id)}
                    className="preview-icon"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={deleteimg} alt="delete" />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No admin users found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
