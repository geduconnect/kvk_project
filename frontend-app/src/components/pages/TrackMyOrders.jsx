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

  const fetchOrder = async (id) => {
    if (!id) {
      setError("Please enter a valid Order ID.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
      setOrder(null);
      setError("No order found. Please check your ID.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) fetchOrder(initialOrderId);
  }, [initialOrderId]);

  // Define tracking steps
  const steps = ["Placed", "Packed", "Shipped", "Delivered"];

  // Find active step
  const currentStep = steps.indexOf(order?.status);

  return (
    <div className="track-order-container">
      <h1>Track Your Order</h1>

      {/* Order ID input */}
      <div className="track-input-box">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button className="btn btn-track" onClick={() => fetchOrder(orderId)}>
          Track Order
        </button>
      </div>

      {loading && <p>Loading your order...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Order details */}
      {order && !loading && (
        <div className="order-details">
          <h3>Order ID: {order.id}</h3>
          <h5>Date: {new Date(order.date).toLocaleString()}</h5>
          <h5>Total: ${order.totalCost}</h5>

          {/* Progress bar */}
          <div className="order-progress">
            {/* Background line */}
            <div className="progress-line" />
            {/* Animated filled line */}
            <div
              className="progress-line-fill"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, index) => (
              <div
                key={step}
                className={`progress-step ${
                  index <= currentStep ? "completed" : ""
                }`}
              >
                <div className="circle">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <h4 className="mt-30">Customer Info</h4>
          <p>Name: {order.customerName}</p>
          <p>Email: {order.email}</p>
          <p>Mobile: {order.mobile}</p>

          <h4 className="mt-30">Order Items</h4>
          <table className="table order-items-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.length > 0 ? (
                order.items.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{item.description}</td>
                    <td>${item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No items in this order.</td>
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
