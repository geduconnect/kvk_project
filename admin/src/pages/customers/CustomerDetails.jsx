import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/admin/customers/";
axios.defaults.withCredentials = true;

export const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Fetch Single Customer
        const res = await axios.get(`/admin/customers/${id}`);
        setCustomer(res.data);
      } catch (err) {
        console.error("Error fetching customer details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  const deleteCustomer = async () => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await axios.delete(`/admin/customers/${id}`);
      navigate("/customers");
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="user-details-container">
      {/* Header Section */}
      <div className="user-header">
        <h2>{customer.customerName}</h2>
        <p>{customer.email}</p>
        <small>Customer ID: {customer.id}</small>
      </div>

      {/* Main Body */}
      <div className="details-grid">
        {/* Left Card */}
        <div className="user-details-card-left">
          <h3>Basic Details</h3>

          <p>
            <b>Phone:</b> {customer.mobile}
          </p>
          <p>
            <b>Email:</b> {customer.email}
          </p>
          <p>
            <b>State:</b> {customer.state}
          </p>
          <p>
            <b>City:</b> {customer.city}
          </p>
          <p>
            <b>Address:</b> {customer.address}
          </p>
          <p>
            <b>Pincode:</b> {customer.pincode}
          </p>
          <p>
            <b>Created At:</b>{" "}
            {new Date(customer.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Right Cards */}
        <div className="user-details-card-right-container">

          {/* Orders / Payments */}
          <div className="user-details-card-right">
            <h3>Order Summary</h3>

            <p>
              <b>Total Orders:</b> {customer.totalOrders ?? 0}
            </p>

            <p>
              <b>Total Spent:</b> ₹{customer.totalSpent ?? 0}
            </p>

            <button
              onClick={() => navigate(`/orders/${customer.id}`)}
              className="view-orders-btn"
            >
              View Orders
            </button>
          </div>

          {/* Data Management */}
          <div className="user-details-card-right">
            <h3>Data Management</h3>
            <button className="delete-btn" onClick={deleteCustomer}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
