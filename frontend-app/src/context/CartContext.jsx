// src/CartContext.jsx
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // Replace with actual user

  const fetchCart = async () => {
    const res = await axios.get(`http://localhost:8000/api/cart/${userId}`);
    setCartItems(res.data);
  };

  const addToCart = async (product) => {
    await axios.post(`http://localhost:8000/api/cart`, {
      userId,
      productId: product.id,
      quantity: product.quantity || 1,
    });
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = async (productId) => {
    await axios.delete(`http://localhost:8000/api/cart/${userId}/${productId}`);
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = async () => {
    await axios.delete(`http://localhost:8000/api/cart/clear/${userId}`);
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
