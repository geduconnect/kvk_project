import React, { useState } from "react";
import axios from "axios";
import "./OrderTracking.css"; // optional, create it if you want to style

export const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      alert("Please enter a valid order ID");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setOrderData(null);

      const res = await axios.get(`http://localhost:8000/api/orders/${orderId}`);
      if (!res.data) {
        setErrorMsg("No order found with this ID");
      } else {
        setOrderData(res.data);
      }
    } catch (err) {
      console.error("Error fetching order status:", err);
      setErrorMsg("Failed to fetch order. Please check the ID or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-tracking-container">
      <h1>Track Your Order</h1>

      {/* Input and button */}
      <div className="track-input-group">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleTrackOrder} disabled={loading}>
          {loading ? "Fetching..." : "Track Order"}
        </button>
      </div>

      {/* Error message */}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      {/* Order details */}
      {orderData && (
        <div className="order-details">
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {orderData.id || orderData.orderId}</p>
          <p><strong>Status:</strong> {orderData.status || "Pending"}</p>
          <p><strong>Date:</strong> {new Date(orderData.date).toLocaleDateString()}</p>
          <p><strong>Payment:</strong> {orderData.paymentMethod}</p>
          <p><strong>Total Amount:</strong> ${orderData.totalCost?.toFixed(2)}</p>

          <div className="order-items">
            <h3>Items</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.description}</td>
                    <td>${item.amount?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delivery info */}
          {orderData.billingInfo && (
            <div className="delivery-info">
              <h3>Delivery Address</h3>
              <p>
                {orderData.billingInfo.fname} {orderData.billingInfo.lname}<br />
                {orderData.billingInfo.address}<br />
                {orderData.billingInfo.city} - {orderData.billingInfo.pincode}<br />
                <strong>Mobile:</strong> {orderData.billingInfo.mobile}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
