import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../components/api";
import { useCart } from "../../../context/CartContext";
import { useCustomerAuth } from "../../../context/CustomerContext";
import "./cart.css";

export const Checkout = () => {

  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { customer } = useCustomerAuth();
  const customerId = customer?.id;

  const [orderId, setOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [billingInfo, setBillingInfo] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    additionalInfo: "",
  });

  // ✅ Billing handler
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Calculate total
  const totalCost = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  // ✅ PLACE ORDER
  const handlePlaceOrder = async () => {
    if (!customerId) return alert("Please login first");
    if (!billingInfo.fname || !billingInfo.lname || !billingInfo.address)
      return alert("Please fill required billing details");
    if (!cartItems.length) return alert("Your cart is empty");

    try {
      const items = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        description: item.title,
        amount: Number(item.price) * item.quantity,
      }));

      const payload = {
        customerId,
        totalCost,
        status: "Pending",
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "Unpaid" : "Paid",
        remarks: billingInfo.additionalInfo || "",
        items,
      };

      const res = await api.post("/orders", payload);
      const newOrderId = res.data.orderId;

      setOrderId(newOrderId);
      clearCart();

      alert(`✅ Order placed successfully! Order ID: ${newOrderId}`);
      navigate("/trackmyorder", { state: { orderId: newOrderId } });
    } catch (err) {
      console.error("❌ Checkout failed:", err);
      alert("Order placement failed. Please try again.");
    }
  };
  useEffect(() => {
    if (customer) {
      setBillingInfo((prev) => ({
        ...prev,
        fname: customer.name?.split(" ")[0] || "",
        lname: customer.name?.split(" ")[1] || "",
        mobile: customer.mobile || "",
        email: customer.email || "",
        address: customer.address || "",
        state: customer.state || "",
        city: customer.city || "",
        pincode: customer.pincode || "",
      }));
    }
  }, [customer]);
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-row">
        {/* ✅ BILLING */}
        <div className="col-lg-7">
          <h4>Billing Details</h4>

          {[
            "fname",
            "lname",
            "mobile",
            "email",
            "address",
            "state",
            "city",
            "pincode",
            "additionalInfo",
          ].map((field) => (
            <input
              key={field}
              name={field}
              value={billingInfo[field]}
              onChange={handleBillingChange}
              placeholder={field.toUpperCase()}
            />
          ))}
        </div>

        {/* ✅ ORDER SUMMARY (WITH IMAGE) */}
        <div className="cart-summary">
          <h3>Your Order</h3>

          {cartItems.map((item) => {
            const imageUrl =
              item.images?.length > 0
                ? `http://localhost:8000${item.images[0]}`
                : item.image
                  ? `http://localhost:8000${item.image}`
                  : null;

            return (
              <div key={item.productId} className="summary-row">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div className="img-box">
                    {imageUrl ? <img src={imageUrl} alt={item.title} /> : "No Image"}
                  </div>
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                </div>

                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            );
          })}

          <div className="divider-2"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalCost.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-text">Free</span>
          </div>

          <div className="summary-row">
            <span>Estimate For</span>
            <span>India</span>
          </div>

          <div className="divider-2"></div>

          <div className="summary-total">
            <strong>Total</strong>
            <strong>₹{totalCost.toFixed(2)}</strong>
          </div>

          {/* ✅ PAYMENT */}
          <div style={{ marginTop: "12px" }}>
            <label>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label style={{ marginLeft: "12px" }}>
              <input
                type="radio"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Online Payment
            </label>
          </div>

          <button className="btn-place-order" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>

      {orderId && (
        <div style={{ marginTop: 20 }}>
          <h3>✅ Order Placed Successfully</h3>
          <p>Order ID: {orderId}</p>
        </div>
      )}
    </div>
  );
};
