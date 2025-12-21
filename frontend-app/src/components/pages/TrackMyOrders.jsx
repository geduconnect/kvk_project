import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TrackMyOrder.css";

export const TrackMyOrders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialOrderId = location.state?.orderId || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ FETCH ORDER FROM API
  const fetchOrder = async (id) => {
    if (!id) {
      setError("Please enter a valid Order ID.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8000/api/orders/public/orders/${id}`
      );

      setOrder(res.data);
    } catch (err) {
      console.error("❌ TRACK ORDER ERROR:", err);
      setOrder(null);
      setError("No order found. Please check your Order ID.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ AUTO-LOAD IF ORDER ID PASSED FROM NAVIGATION
  useEffect(() => {
    if (initialOrderId) fetchOrder(initialOrderId);
  }, [initialOrderId]);

  // ✅ TRACKING STEPS MUST MATCH BACKEND ENUM
  const steps = ["Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled"];

  // ✅ FIND ACTIVE STEP SAFELY
  const currentStep = order?.status
    ? steps.indexOf(order.status)
    : -1;

  return (
    <div className="track-order-container">
      <h1>Track Your Order</h1>

      {/* ✅ ORDER ID INPUT */}
      <div className="track-input-box">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          className="btn btn-track"
          onClick={() => fetchOrder(orderId)}
          disabled={loading}
        >
          {loading ? "Tracking..." : "Track Order"}
        </button>
      </div>

      {loading && <p>Loading your order...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* ✅ ORDER DETAILS */}
      {order && !loading && (
        <div className="order-details">
          <h3>Order ID: {order.id}</h3>

          <h5>
            Date:{" "}
            {order.orderDate
              ? new Date(order.orderDate).toLocaleString()
              : "N/A"}
          </h5>

          <h5>Total: ₹{order.totalCost}</h5>
          <h5>Status: {order.status}</h5>

          {/* ✅ PROGRESS TRACKER */}
          <div className="order-progress">
            <div className="progress-line" />

            <div
              className="progress-line-fill"
              style={{
                width:
                  currentStep >= 0
                    ? `${(currentStep / (steps.length - 1)) * 100}%`
                    : "0%",
              }}
            />

            {steps.map((step, index) => (
              <div
                key={step}
                className={`progress-step ${index <= currentStep ? "completed" : ""
                  }`}
              >
                <div className="circle">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>

          {/* ✅ CUSTOMER INFO (MATCH BACKEND NAMES) */}
          <h4 className="mt-30">Customer Info</h4>
          <p>Name: {order.customerName || "N/A"}</p>
          <p>Email: {order.email || "N/A"}</p>
          <p>Mobile: {order.mobile || "N/A"}</p>

          {/* ✅ ORDER ITEMS */}
          <h4 className="mt-30">Order Items</h4>

          <table className="table order-items-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.length > 0 ? (
                order.items.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No items in this order.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <button className="btn btn-back" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};
