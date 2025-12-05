import React from "react";
import { Link } from "react-router-dom";
import wishlistimg from "../../../assets/img/wishlist.png";
import previewimg from "../../../assets/img/eyeicon.jpg";

export const RelatedProductCard = ({ product, categoryName, addToWishlist }) => {
  return (
    <div className="product-card">
      <div className="product-imgcard">
        {product.images?.[0] ? (
          <img src={`http://localhost:8000${product.images[0]}`} alt={product.name} />
        ) : (
          <span>No Image</span>
        )}
        <div className="img_overlay">
          <ul className="list-product-overlay">
            <li
              onClick={() =>
                addToWishlist({ id: product.id, title: product.name, price: product.discount_price })
              }
            >
              <img src={wishlistimg} alt="Wishlist" />
            </li>
            <Link to={`/products-categories/${categoryName}/${product.id}`}>
              <li>
                <img src={previewimg} alt="Preview" />
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="product-contentcard">
        <span>{product.category_name}</span>
        <h2>{product.name}</h2>
        <h6>{product.brand}</h6>
        <h5>Stock: {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}</h5>

        {/* Ratings stars */}
        <div className="product-ratings">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`fa fa-star ${i < (product.rating || 0) ? "checked" : ""}`}></span>
          ))}
        </div>

        <div className="price">
          <span className="original-price">₹{product.original_price}</span>
          <span className="discount-price">₹{product.discount_price}</span>
        </div>
      </div>
    </div>
  );
};
