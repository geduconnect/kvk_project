import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import wishlistimg from "../../../assets/img/wishlist.png";
import previewimg from "../../../assets/img/eyeicon.jpg";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

export const AllCategoriesProducts = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const showToast = (msg) => alert(msg); // ✅ Simple message popup

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all categories
        const categoriesRes = await axios.get("http://localhost:8000/api/categories");
        const allCategories = categoriesRes.data.map((cat) => ({
          ...cat,
          image: cat.image?.startsWith("http")
            ? cat.image
            : `http://localhost:8000${cat.image}`,
        }));
        setCategories(allCategories);

        // Fetch all products in one call
        const productsRes = await axios.get("http://localhost:8000/api/products");
        const allProducts = productsRes.data.map((p) => ({
          ...p,
          pimage: p.pimage
            ? p.pimage.startsWith("http")
              ? p.pimage
              : `http://localhost:8000${p.pimage}`
            : "/fallback-image.png",
        }));

        // Group products by category ID
        const grouped = {};
        allProducts.forEach((p) => {
          if (!grouped[p.category_id]) grouped[p.category_id] = [];
          grouped[p.category_id].push(p);
        });

        setProductsByCategory(grouped);
      } catch (err) {
        console.error(err.response || err.message);
        setMessage("Error fetching categories or products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!categories.length) return <p>{message || "No categories available"}</p>;

  return (
    <div className="all-categories-container">
      {categories.map((category) => (
        <div key={category.id} className="category-section">
          {/* Category Header */}
          <div className="growth-title">
            <h2>{category.name}</h2>
            <div className="view-all-btn-container">
              <Link to={`/products-categories/${category.name}`}>
                <button className="view-all-btn">View All</button>
              </Link>
            </div>
          </div>

          {/* Category Products */}
          <div className="daily-deals">
            <div className="product-wrapper">
              <div className="dailydeals-content">
                {productsByCategory[category.id] &&
                productsByCategory[category.id].length > 0 ? (
                  productsByCategory[category.id].map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-imgcard">
                        {product.images && product.images[0] ? (
                          <img
                            className="product-image"
                            src={`http://localhost:8000${product.images[0]}`}
                            alt={product.name || product.title}
                          />
                        ) : (
                          <span>No Image</span>
                        )}

                        {/* Preview Icon */}
                        <div className="img_overlay">
                          <ul className="ddproduct-product-overlay">
                            <Link
                              to={`/products-categories/${category.name}/${product.id}`}
                            >
                              <li className="ddproduct-item-overlay">
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
                            showToast(
                              `${product.name || product.title} added to wishlist!`
                            );
                          }}
                        >
                          <img src={wishlistimg} alt="Wishlist" />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="ddproduct-contentcard">
                        <span>{product.category_name}</span>
                        <h2>{product.name || product.title}</h2>
                        <h6>{product.brand}</h6>
                        <h5>
                          Stock:{" "}
                          {product.stock > 0
                            ? `In Stock (${product.stock})`
                            : "Out of Stock"}
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
                          <span className="original-price">
                            ₹{product.oldPrice || product.price}
                          </span>
                          <span className="discount-price">
                            ₹{product.discount_price || product.price}
                          </span>
                        </div>

                        {/* Add to Cart */}
                        <button
                          className="addtocart"
                          onClick={() => {
                            addToCart({ ...product, quantity: 1 });
                            showToast(
                              `${product.name || product.title} added to cart!`
                            );
                          }}
                        >
                          <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
