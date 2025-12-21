// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../components/api"; // ✅ centralized axios with cookies
import { useCustomerAuth } from "./CustomerContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { customer, loading } = useCustomerAuth();

  // ✅ Fetch cart (COOKIE BASED)
const fetchCart = async () => {
  if (!customer) return;

  try {
    const { data } = await api.get("/cart");
    setCartItems(data || []);
  } catch (err) {
    console.error("Fetch cart error:", err.message);
  }
};

  // ✅ Auto-fetch cart when customer loads
useEffect(() => {
  if (customer && !loading) {
    fetchCart();
  }
  // 🚨 DO NOT add fetchCart to dependency array
}, [customer, loading]);
  // ✅ Add to cart (COOKIE BASED)
  const addToCart = async (product) => {
    try {
      await api.post("/cart", {
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity || 1,
        image: product.image || (product.images ? product.images[0] : ""),
      });

      fetchCart(); // ✅ refresh cart from DB
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      fetchCart();
    } catch (err) {
      console.error("Remove cart error:", err);
    }
  };

  // ✅ Clear entire cart
  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCartItems([]);
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
