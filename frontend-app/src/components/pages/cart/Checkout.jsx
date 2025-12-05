import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../../context/CartContext";
import "./cart.css";

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const userId = user?.id;

  const [orderId, setOrderId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
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

  // Handle billing input
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Apply coupon (10% off)
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim() === "") return;
    setAppliedCoupon(true);
  };

  // Total calculation
  const calculateTotal = () =>
    cartItems.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0
    );

  const totalAmount = appliedCoupon ? calculateTotal() * 0.9 : calculateTotal();

  // Place order
  const handlePlaceOrder = async () => {
    if (!billingInfo.fname || !billingInfo.lname || !billingInfo.address) {
      alert("Please fill all required fields");
      return;
    }

    if (!cartItems.length) {
      alert("Your cart is empty");
      return;
    }

    try {
      const orderData = {
        paymentMethod,
        billingInfo,
      };

      // ✅ Use your backend’s placeOrderFromCart route
      const res = await axios.post(
        `http://localhost:8000/api/orders/place/${userId}`,
        orderData
      );

      if (!res.data.orderId) {
        alert("Order ID not generated, please try again.");
        return;
      }

      const newOrderId = res.data.orderId;
      setOrderId(newOrderId);
      clearCart();

      alert(`✅ Order placed successfully! Your Order ID: ${newOrderId}`);
    } catch (err) {
      console.error("❌ Checkout failed:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      {/* Header */}
      <div className="checkout-row">
        <div className="col-lg-8 mb-40">
          <h1 className="heading-2">Checkout</h1>
          <h6 className="text-body">
            There are{" "}
            <span className="text-brand">{cartItems.length}</span> products in
            your cart
          </h6>
        </div>
      </div>

      <div className="checkout-row">
        {/* Billing */}
        <div className="col-lg-7">
          <h4 className="mb-30">Billing Details</h4>
          <form className="checkout-form">
            {[
              "fname",
              "lname",
              "mobile",
              "email",
              "address",
              "city",
              "pincode",
              "additionalInfo",
            ].map((field) => (
              <div className="form-group col-lg-6" key={field}>
                {field === "address" || field === "additionalInfo" ? (
                  <textarea
                    name={field}
                    rows={field === "additionalInfo" ? 5 : 2}
                    placeholder={
                      field === "additionalInfo"
                        ? "Additional information"
                        : "Address"
                    }
                    value={billingInfo[field]}
                    onChange={handleBillingChange}
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={
                      field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    value={billingInfo[field]}
                    onChange={handleBillingChange}
                    required={["fname", "lname", "address"].includes(field)}
                  />
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-lg-5">
          <div className="cart-totals">
            <h4>Your Order</h4>
            <div className="divider-2 mb-30"></div>
            <div className="table-responsive order_table checkout">
              <table className="table no-border">
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td className="image product-thumbnail">
                        <img
                          src={`http://localhost:8000${item.images?.[0]}`}
                          alt={item.name}
                        />
                      </td>
                      <td>
                        <h6 className="w-160 mb-5">{item.name}</h6>
                      </td>
                      <td>
                        <h6 className="text-muted pl-20 pr-20">
                          x {item.quantity}
                        </h6>
                      </td>
                      <td>
                        <h4 className="text-brand">
                          ${(item.price * item.quantity).toFixed(2)}
                        </h4>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td>
                      <h4 className="text-brand">${totalAmount.toFixed(2)}</h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment */}
          <div className="payment ml-30">
            <h4 className="mb-30">Payment</h4>
            <div className="payment_option">
              {["bank", "cod", "paypal"].map((method) => (
                <div className="custome-radio" key={method}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment_option"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    id={`payment_${method}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`payment_${method}`}
                  >
                    {method === "bank"
                      ? "Direct Bank Transfer"
                      : method === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment Gateway"}
                  </label>
                </div>
              ))}
            </div>

            <button
              className="btn btn-place-order btn-block"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {appliedCoupon && (
        <p className="text-success mt-10">Coupon applied! 10% discount</p>
      )}

      {orderId && (
        <div className="order-confirmation mt-20 p-20 border rounded">
          <h4 className="text-success">Order Placed Successfully!</h4>
          <p>
            Your Order ID is: <strong>{orderId}</strong>
          </p>
          <button
            className="btn btn-primary mt-10"
            onClick={() => navigate("/trackmyorder", { state: { orderId } })}
          >
            Track Your Order
          </button>
        </div>
      )}
    </div>
  );
};
