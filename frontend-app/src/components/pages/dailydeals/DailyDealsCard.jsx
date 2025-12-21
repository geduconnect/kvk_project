import React from "react";
import { Link } from "react-router-dom";
import wishlistimg from "../../../assets/img/wishlist.png";
import previewimg from "../../../assets/img/eyeicon.jpg";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import "./DailyDeals.css";

export const DailyDealsCard = ({
  ddproduct,
  isAdmin,
  openDailyDealModal,
}) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // ✅ Same behavior as FeaturedCategories
  const showToast = (msg) => alert(msg);

  if (!ddproduct) return null;

  const productLink = `/products-categories/${ddproduct.category_name || "unknown"
    }/${ddproduct.id}`;

  return (
    <div className="product-card">
      <span className="product-badge">Hot</span>

      {/* ✅ PRODUCT IMAGE */}
      <div className="product-imgcard">
        {ddproduct.images && ddproduct.images[0] ? (
          <img
            className="product-image"
            src={`http://localhost:8000${ddproduct.images}`}
            alt={ddproduct.title || ddproduct.name}
          />
        ) : (
          <span>No Image</span>
        )}

        {/* ✅ PREVIEW */}
        <div className="img_overlay">
          <ul className="list-product-overlay">
            <Link to={productLink}>
              <li className="list-item-overlay">
                <img src={previewimg} alt="Preview" />
              </li>
            </Link>
          </ul>
        </div>

        {/* ✅ WISHLIST (MATCHED WITH FEATURED) */}
        <div
          className="wishlist-icon"
          onClick={() => {
            addToWishlist({ ...ddproduct, quantity: 1 });
            showToast(
              `${ddproduct.title || ddproduct.name} added to wishlist!`
            );
          }}
        >
          <img src={wishlistimg} alt="Wishlist" />
        </div>
      </div>

      {/* ✅ PRODUCT DETAILS */}
      <div className="ddproduct-contentcard">
        <span className="catName">{ddproduct.category_name}</span>

        <Link to={productLink}>
          <h2 className="ddproducts-name">
            {ddproduct.title || ddproduct.name}
          </h2>
        </Link>

        <h4>{ddproduct.brand}</h4>

        <h5>
          Stock:{" "}
          {ddproduct.stock > 0
            ? `In Stock (${ddproduct.stock})`
            : "Out of Stock"}
        </h5>

        {/* ✅ RATINGS */}
        <div className="product-ratings">
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>

        {/* ✅ PRICE */}
        <div className="price">
          {ddproduct.orgprice && (
            <span className="original-price">₹{ddproduct.orgprice}</span>
          )}
          <span className="discount-price">
            ₹{ddproduct.daily_deal_price || ddproduct.price}
          </span>
        </div>

        {/* ✅ ADD TO CART (MATCHED WITH FEATURED) */}
        <button
          className="addtocart"
          disabled={ddproduct.stock <= 0}
          onClick={() => {
            addToCart({ ...ddproduct, quantity: 1 });
            showToast(
              `${ddproduct.title || ddproduct.name} added to cart!`
            );
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i>{" "}
          {ddproduct.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

        {/* ✅ ADMIN DAILY DEAL CONTROL */}
        {isAdmin && (
          <div style={{ marginTop: "10px" }}>
            <input
              type="checkbox"
              checked={ddproduct.is_daily_deal === 1}
              onChange={() =>
                openDailyDealModal && openDailyDealModal(ddproduct)
              }
            />{" "}
            Daily Deal
          </div>
        )}
      </div>
    </div>
  );
};
