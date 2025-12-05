import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import viewimg from "../../assets/159078.png";
import editimg from "../../assets/edit-new-icon-22.png";
import deleteimg from "../../assets/1214428.png";

axios.defaults.baseURL = "http://localhost:8000/api/admin/customers";
axios.defaults.withCredentials = true;

export const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all customers
  const fetchCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:8000/api/admin/customers/`);
      // Ensure we always have an array
      const data = Array.isArray(res.data) ? res.data : res.data.customers || [];
      setCustomers(data);
    } catch (err) {
      console.error("❌ Error fetching customers:", err);
      setError(
        err.response?.data?.error ||
        "Failed to fetch customers. Make sure you are logged in as admin."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [sortOrder]);

  // Delete customer
  const deleteCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("❌ Error deleting customer:", err);
      alert(err.response?.data?.error || "Failed to delete customer.");
    }
  };

  // Filter + search
  const filteredCustomers = Array.isArray(customers)
    ? customers
      .filter((c) =>
        [
          c.customerName,
          c.email,
          c.mobile,
          c.address,
          c.city,
          c.state,
          c.pincode,
        ]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => (sortOrder === "newest" ? b.id - a.id : a.id - b.id))
    : [];

  return (
    <div className="user-details-page">
      <div className="adminproduct-head">
        <h2>All Customers</h2>

      </div>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by name, email, mobile, or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {loading && <p>Loading customers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="table-customer">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Total Orders</th>
            <th>Total Spent</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>{c.customerName}</td>
                <td>
                  {[c.address, c.city, c.state, c.pincode].filter(Boolean).join(", ") || "-"}
                </td>
                <td>
                  <Link
                    to={`/customers/customer/${c.id}/orders`}
                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                  >
                    {c.totalOrders || 0}
                  </Link>
                </td>
                <td>₹{Number(c.totalSpent || 0).toFixed(2)}</td>
                <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-"}</td>
                <td>
                  <Link to={`/customers/${c.id}`}>
                    <span className="preview-icon">
                      <img src={viewimg} alt="view" />
                    </span>
                  </Link>
                  <Link to={`/customers/edit/${c.id}`}>
                    <span className="preview-icon">
                      <img src={editimg} alt="edit" />
                    </span>
                  </Link>
                  <span
                    onClick={() => deleteCustomer(c.id)}
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
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No customers found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
