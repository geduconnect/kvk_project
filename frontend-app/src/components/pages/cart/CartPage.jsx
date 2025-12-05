// src/pages/user/CartPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const userId = 1;

  const fetchCart = async () => {
    const res = await axios.get(`http://localhost:8000/api/cart/${userId}`);
    setCartItems(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, action) => {
    await axios.put(`http://localhost:8000/api/cart/${userId}/${productId}`, {
      action, // "increase" or "decrease"
    });
    fetchCart();
  };

  const removeItem = async (productId) => {
    await axios.delete(`http://localhost:8000/api/cart/${userId}/${productId}`);
    fetchCart();
  };

  const clearCart = async () => {
    await axios.delete(`http://localhost:8000/api/cart/clear/${userId}`);
    setCartItems([]);
  };

  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cartItems.length) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-container">
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
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>
                <button onClick={() => updateQuantity(item.id, "decrease")}>-</button>
                {item.quantity}
                <button onClick={() => updateQuantity(item.id, "increase")}>+</button>
              </td>
              <td>₹{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ₹{totalCost.toFixed(2)}</h3>
      <button className="checkout-btn" onClick={() => navigate("/checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
};
