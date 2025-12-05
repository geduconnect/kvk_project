import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import wishlistimg from "../../../assets/img/wishlist.png";
import previewimg from "../../../assets/img/eyeicon.jpg";

const RelatedProducts = ({ related, categoryName, addToWishlist }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [sortOption, setSortOption] = useState("Featured");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);

  const totalPages = Math.ceil(related.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  let displayedRelated = [...related].slice(indexOfFirst, indexOfLast);

  if (sortOption === "PriceLowToHigh") displayedRelated.sort((a, b) => a.discount_price - b.discount_price);
  else if (sortOption === "PriceHighToLow") displayedRelated.sort((a, b) => b.discount_price - a.discount_price);
  else if (sortOption === "AvgRating") displayedRelated.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => setCurrentPage(1), [itemsPerPage, sortOption, related]);

  return (
    <div className="related-products">
      <h2>Related Products</h2>

      {/* Top Bar */}
      <div className="top-strip">
        <div className="strip-bar-tab">
          <div className="strip-bar-tab-btn1">
            <button onClick={() => setIsOpenDropdown(!isOpenDropdown)}>Show: {itemsPerPage}</button>
            {isOpenDropdown && (
              <ul className="dropdownMenu">
                {[50, 100, 150, 200, related.length].map((num) => (
                  <li key={num}><button onClick={() => { setItemsPerPage(num); setIsOpenDropdown(false); }}>{num}</button></li>
                ))}
              </ul>
            )}
          </div>
          <div className="strip-bar-tab-btn2">
            <button onClick={() => setIsOpenDropdown2(!isOpenDropdown2)}>Sort by: {sortOption}</button>
            {isOpenDropdown2 && (
              <ul className="dropdownMenu">
                {[
                  { label: "Featured", value: "Featured" },
                  { label: "Price: Low to High", value: "PriceLowToHigh" },
                  { label: "Price: High to Low", value: "PriceHighToLow" },
                  { label: "Avg. Rating", value: "AvgRating" },
                ].map((option) => (
                  <li key={option.value}><button onClick={() => { setSortOption(option.value); setIsOpenDropdown2(false); }}>{option.label}</button></li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="product-row">
        {displayedRelated.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-imgcard">
              {p.images?.[0] ? <img src={`http://localhost:8000${p.images[0]}`} alt={p.title} /> : <span>No Image</span>}
              <div className="img_overlay">
                <ul className="list-product-overlay">
                  <li onClick={() => addToWishlist(p)}><img src={wishlistimg} alt="Wishlist" /></li>
                  <Link to={`/products-categories/${categoryName}/${p.id}`}><li><img src={previewimg} alt="Preview" /></li></Link>
                </ul>
              </div>
            </div>
            <div className="product-contentcard">
              <span>{p.category_name}</span>
              <h2>{p.title}</h2>
              <h6>{p.brand}</h6>
              <h5>Stock: {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}</h5>
              <div className="price">
                <span className="original-price">₹{p.oldPrice}</span>
                <span className="discount-price">₹{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} className={currentPage === i + 1 ? "active" : ""} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
