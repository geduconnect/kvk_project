import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import wishlistimg from "../../../assets/img/wishlist.png";
import previewimg from "../../../assets/img/eyeicon.jpg";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

export const HomeProduct = ({
  products,
  categoryName,
  itemsPerPage,
  setItemsPerPage,
  sortOption,
  setSortOption,
  isOpenDropdown,
  setIsOpenDropdown,
  isOpenDropdown2,
  setIsOpenDropdown2,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const showToast = (msg) => alert(msg); // replace with real toast library if desired

  // Sorting products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "PriceLowToHigh") return (a.discount_price || a.price) - (b.discount_price || b.price);
    if (sortOption === "PriceHighToLow") return (b.discount_price || b.price) - (a.discount_price || a.price);
    if (sortOption === "AvgRating") return (b.rating || 0) - (a.rating || 0);
    if (sortOption === "Release") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0; // Featured or default
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => setCurrentPage(1), [products, itemsPerPage, sortOption]);

  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="homeProduct">
      {/* Top bar */}
      <div className="top-strip">
        <p>
          We found <span className="text-success">{products.length}</span> items for you!
        </p>
        <div className="top-strip-bar">
          <div className="strip-bar-tab">
            {/* Items per page */}
            <div className="strip-bar-tab-btn1">
              <button className="tab-btn1" onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                Show: {itemsPerPage}
              </button>
              {isOpenDropdown && (
                <ul className="dropdownMenu">
                  {[50, 100, 150, 200, products.length].map((num) => (
                    <li key={num}>
                      <button
                        className="dropdownMenu-btn"
                        onClick={() => {
                          setItemsPerPage(num);
                          setIsOpenDropdown(false);
                        }}
                      >
                        {num}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Sorting */}
            <div className="strip-bar-tab-btn2">
              <button className="tab-btn2" onClick={() => setIsOpenDropdown2(!isOpenDropdown2)}>
                Sort by: {sortOption}
              </button>
              {isOpenDropdown2 && (
                <ul className="dropdownMenu">
                  {[
                    { label: "Featured", value: "Featured" },
                    { label: "Price: Low to High", value: "PriceLowToHigh" },
                    { label: "Price: High to Low", value: "PriceHighToLow" },
                    { label: "Release", value: "Release" },
                    { label: "Avg. Rating", value: "AvgRating" },
                  ].map((option) => (
                    <li key={option.value}>
                      <button
                        className="dropdownMenu-btn"
                        onClick={() => {
                          setSortOption(option.value);
                          setIsOpenDropdown2(false);
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="rightcontent">
        <div className="product-row">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-imgcard">
                {product.images && product.images[0] ? (
                  <img src={`http://localhost:8000${product.images[0]}`} alt={product.name || product.title} />
                ) : (
                  <span>No Image</span>
                )}
                <div className="img_overlay">
                  <Link to={`/products-categories/${categoryName}/${product.id}`}>
                    <div className="preview-icon">
                      <img src={previewimg} alt="Preview" />
                    </div>
                  </Link>
                </div>
                {/* Wishlist icon */}
                <div
                  className="wishlist-icon"
                  onClick={() => {
                    addToWishlist({ ...product, quantity: 1 });
                    alert(`${product.name || product.title} added to wishlist!`);
                  }}
                >
                  <img src={wishlistimg} alt="Wishlist" />
                </div>
              </div>

              <div className="product-contentcard">
                <span>{product.category_name}</span>
                <h2>{product.name || product.title}</h2>
                <h6>{product.brand}</h6>
                <h5>Stock: {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}</h5>

                <div className="product-ratings">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>

                <div className="price">
                  <span className="original-price">₹{product.oldPrice || product.price}</span>
                  <span className="discount-price">₹{product.discount_price || product.price}</span>
                </div>

                <button
                  className="addtocart"
                  onClick={() => {
                    addToCart({ ...product, quantity: 1 });
                    showToast(`${product.name || product.title} added to cart!`);
                  }}
                >
                  <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="page-btn">
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
