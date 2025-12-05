// src/context/WishlistContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const userId = 1; // TODO: Replace with real logged-in user

  // Fetch wishlist from backend
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/wishlist/${userId}`)
      .then((res) => setWishlistItems(res.data))
      .catch((err) => console.error("Wishlist fetch error:", err));
  }, []);

  const addToWishlist = async (product) => {
    try {
      await axios.post("http://localhost:8000/api/wishlist", {
        userId,
        productId: product.id,
      });
      setWishlistItems((prev) => [...prev, product]);
    } catch (err) {
      console.error("Add to wishlist error:", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/wishlist/${userId}/${productId}`);
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/wishlist/clear/${userId}`);
      setWishlistItems([]);
    } catch (err) {
      console.error("Clear wishlist error:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
