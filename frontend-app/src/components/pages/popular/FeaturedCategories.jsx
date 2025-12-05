import React from "react";
import { Link } from "react-router-dom";
import wishlistimg from "../../../assets/img/wishlist.png";
import previewimg from "../../../assets/img/eyeicon.jpg";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

export const FeaturedCategories = ({ featuredcategory }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const showToast = (msg) => alert(msg); // ✅ simple message popup

  if (!featuredcategory?.products?.length) return null;

  return (
    <>
      {featuredcategory.products.map((product) => {
        const productLink = `/products-categories/${featuredcategory?.name || "unknown"}/${product?.id}`;
        return (
          <div className="product-card" key={product.id}>
            <span className="product-badge">Hot</span>

            {/* Product Image */}
            <div className="product-imgcard">
              {product.images && product.images[0] ? (
                <img
                  className="product-image"
                  src={`http://localhost:8000${product.images[0]}`}
                  alt={product.title || product.name}
                />
              ) : (
                <span>No Image</span>
              )}

              {/* Preview Icon */}
              <div className="img_overlay">
                <ul className="list-product-overlay">
                  <Link to={productLink}>
                    <li className="list-item-overlay">
                      <img src={previewimg} alt="Preview" />
                    </li>
                  </Link>
                </ul>
              </div>

              {/* Wishlist Icon */}
              <div
                className="wishlist-icon"
                onClick={() => {
                  addToWishlist({ ...product, quantity: 1 });
                  showToast(`${product.title || product.name} added to wishlist!`);
                }}
              >
                <img src={wishlistimg} alt="Wishlist" />
              </div>
            </div>

            {/* Product Details */}
            <div className="product-contentcard">
              <span className="catName">{featuredcategory.name}</span>
              <h2 className="products-name">{product.title || product.name}</h2>
              <h4>{product.brand}</h4>
              <h5>
                Stock:{" "}
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </h5>

              {/* Ratings */}
              <div className="product-ratings">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>

              {/* Price */}
              <div className="price">
                {product.oldPrice && (
                  <span className="original-price">₹{product.oldPrice}</span>
                )}
                <span className="discount-price">
                  ₹{product.discount_price || product.price}
                </span>
              </div>

              {/* Add to Cart */}
              <button
                className="addtocart"
                onClick={() => {
                  addToCart({ ...product, quantity: 1 });
                  showToast(`${product.title || product.name} added to cart!`);
                }}
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
