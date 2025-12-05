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

  // Simple alert (replace with fancier notification if needed)
  const showAlert = (msg) => {
    const alertBox = document.createElement("div");
    alertBox.className = "notification success";
    alertBox.innerText = msg;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 2000);
  };

  return (
    <div className="product-card">
      <span className="product-badge">Hot</span>

      <div className="product-imgcard">
        {ddproduct.images && ddproduct.images[0] ? (
          <img
            className="product-image"
            src={`http://localhost:8000${ddproduct.images[0]}`}
            alt={ddproduct.name || ddproduct.title}
          />
        ) : (
          <span>No Image</span>
        )}

        <div className="img_overlay">
          <ul className="list-product-overlay">
            <Link
              to={`/products-categories/${ddproduct.category_name}/${ddproduct.id}`}
            >
              <li className="list-item-overlay">
                <img src={previewimg} alt="Preview" />
              </li>
            </Link>
          </ul>
        </div>

        {/* ❤️ Wishlist */}
        <div
          className="wishlist-icon"
          onClick={() => {
            addToWishlist({ ...ddproduct, quantity: 1 });
            showAlert(`${ddproduct.title || ddproduct.name} added to wishlist!`);
          }}
        >
          <img src={wishlistimg} alt="Wishlist" />
        </div>
      </div>

      <div className="ddproduct-contentcard">
        <span className="catName">{ddproduct.category_name}</span>
        <Link
          to={`/products-categories/${ddproduct.category_name}/${ddproduct.id}`}
        >
          <h2 className="ddproducts-name">{ddproduct.title}</h2>
        </Link>
        <h4>{ddproduct.brand}</h4>
        <h5>
          Stock:{" "}
          {ddproduct.stock > 0
            ? `In Stock (${ddproduct.stock})`
            : "Out of Stock"}
        </h5>

        <div className="product-ratings">
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>

        <div className="price">
          <span className="original-price">
            ₹{ddproduct.orgprice || ddproduct.price}
          </span>
          <span className="discount-price">
            ₹{ddproduct.daily_deal_price || ddproduct.price}
          </span>
        </div>

        {/* 🛒 Add to Cart */}
        <button
          className="addtocart"
          onClick={() => {
            addToCart({ ...ddproduct, quantity: 1 });
            showAlert(`${ddproduct.title || ddproduct.name} added to cart!`);
          }}
        >
          <i className="fa-solid fa-cart-shopping"></i> Add to Cart
        </button>

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
