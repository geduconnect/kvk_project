// src/pages/user/CartPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { useCart } from "../../../context/CartContext";

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, fetchCart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const totalCost = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  if (!cartItems.length) return <p>Your cart is empty.</p>;

 return (
  <div className="cart-container">
    <div className="cart-left">
      <h1>Your Cart ({cartItems.length})</h1>

      <button onClick={clearCart} className="cartremove-btn">
        Clear Cart
      </button>

      <table className="table table-wishlist">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            const imageUrl =
              item.images && item.images.length > 0
                ? `http://localhost:8000${item.images[0]}`
                : item.image
                ? `http://localhost:8000${item.image}`
                : null;

            return (
              <tr key={item.productId}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="img-box">
                      {imageUrl ? (
                        <img src={imageUrl} alt={item.title || item.name} />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                    <span>{item.title || item.name}</span>
                  </div>
                </td>

                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{(item.price * item.quantity).toFixed(2)}</td>

                <td>
                  <button
                    className="cartremove-btn"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* ✅ ORDER SUMMARY BOX */}
    <div className="cart-summary">
      <h3>Cart Summary</h3>

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

      <button className="checkout-btn" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  </div>
);

};
