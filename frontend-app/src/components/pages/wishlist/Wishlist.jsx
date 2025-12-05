import React from "react";
import "./Wishlist.css";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    removeFromWishlist(item.id);
    alert(`${item.title || item.name} moved to cart!`);
  };

  if (!wishlistItems || wishlistItems.length === 0)
    return <p className="wishlist-empty">Your wishlist is empty.</p>;

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>Your Wishlist ({wishlistItems.length} items)</h1>
        <button onClick={clearWishlist} className="checkout-btn">
          <i className="fa fa-trash"></i> Clear Wishlist
        </button>
      </div>

      <table className="table table-wishlist">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title || item.name}</td>
              <td>₹{item.price}</td>
              <td>{item.stock > 0 ? "In Stock" : "Out of Stock"}</td>
              <td>
                <button
                  className="wishlist-action-btn"
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </button>
                <button
                  className="wishlist-remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/cart")} className="checkout-btn">
        Go to Cart
      </button>
    </div>
  );
};
