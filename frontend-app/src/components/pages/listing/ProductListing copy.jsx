import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Listing.css";
import wishlistimg from "../../../assets/img/wishlist.png";
import previewimg from "../../../assets/img/eyeicon.jpg";

import { listingcategories } from "./ListingData";
import { useWishlist } from "../../../WishlistContext";

export const ProductListing = () => {
  const { categoryName } = useParams();
  const productscategory = listingcategories.find(
    (cat) => cat.categoryitem === categoryName
  );

  if (!productscategory) {
    return <h1>Category not found!</h1>;
  }
  const { addToWishlist } = useWishlist();
  // States for filters
  const [sliderValue, setSliderValue] = useState(50);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredProducts, setFilteredProducts] = useState(productscategory.catproducts1);
  const [colors, setColors] = useState({ Red: false, Green: false, Yellow: false });
  const [conditions, setConditions] = useState({ New: false, Used: false });
  const [isChecked, setIsChecked] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false); // To toggle filter visibility

  // Handle price filter changes
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleCheckboxChange = (category, value) => {
    const updatedCategory = { ...category, [value]: !category[value] };
    setCategory(updatedCategory);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product); // Add the product to the wishlist
  };
  // Filter products based on selected filters
  useEffect(() => {
    const applyFilters = () => {
      let updatedProducts = productscategory.catproducts1.filter((product) => {
        // Filter by price range
        const isWithinPriceRange =
          product.price >= minPrice && product.price <= maxPrice;

        // Filter by color
        const isColorMatch =
          Object.keys(colors).some((color) => colors[color] && product.color.includes(color));

        // Filter by condition
        const isConditionMatch =
          Object.keys(conditions).some((condition) => conditions[condition] && product.condition === condition);

        return isWithinPriceRange && isColorMatch && isConditionMatch;
      });

      setFilteredProducts(updatedProducts);
    };
    applyFilters();
  }, [minPrice, maxPrice, colors, conditions, productscategory.catproducts1]);

  // Function to clear all filters
  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    setColors({ Red: false, Green: false, Yellow: false });
    setConditions({ New: false, Used: false });
    setFilteredProducts(productscategory.catproducts1); // Reset to all products
  };

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);
  return (
    <>
      <div className="listing">
        <div className="listing-container">
          <div className="breadcumb">
            <h1>{productscategory.categoryitem}</h1>
          </div>
        </div>
      </div>

      <div className="listing-data">
        <div className="listing-wrapper">
          <div className="sidebar-category-card">
            <h3>Category</h3>
            <div className="listing-catList">
              {/* Loop through each category to display dynamically */}
              {listingcategories.map((category) => (
                <div key={category.id} className="listing-catItem">
                  <span className="catList-img">
                    {/* Using category image */}
                    <img src={category.imgcat} alt={category.categoryitem} width={30} />
                  </span>
                  <h4>{category.categoryitem}</h4>
                  <span className="catList-stock">
                    {/* Show the number of products in the category (stock count) */}
                    {category.catproducts1.length}
                  </span>
                  <div className="listing-products">
                    {category.catproducts1.map((product) => (
                      <div key={product.id} className="listing-productItem">
                        <Link
                          to={`/product/${product.id}`} // Linking to the product page using product id
                          className="product-link"
                        >
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="listing-card">
            <h3>Filter By Price</h3>
            <div className="listing-catList">
              <div className="listing-catItem">
                <div className="price-filter">
                  <div>
                    <label>Min Price: ${minPrice}</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(parseInt(e.target.value))}
                      className="slider"
                    />
                  </div>
                  <div>
                    <label>Max Price: ${maxPrice}</label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="slider"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="filter-sidebar">
              <h5>Color</h5>
              <ul>
                {['Red', 'Green', 'Yellow'].map((color) => (
                  <li key={color}>
                    <label className="check-sider">
                      <input
                        className="input-sider"
                        type="checkbox"
                        checked={colors[color]}
                        onChange={() => handleCheckboxChange(colors, color)}
                      />
                      {color}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-sidebar">
              <h5>Item Condition</h5>
              <ul>
                {['New', 'Used'].map((condition) => (
                  <li key={condition}>
                    <label className="check-sider">
                      <input
                        className="input-sider"
                        type="checkbox"
                        checked={conditions[condition]}
                        onChange={() => handleCheckboxChange(conditions, condition)}
                      />
                      {condition}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {isFilterVisible && (
              <div className="filter-button-container">
                <button className="remove-filter-btn" onClick={clearFilters}>
                  Remove Filter
                </button>
              </div>
            )}

            <div className="filter-button" onClick={() => setIsFilterVisible(!isFilterVisible)}>
              <i className="fa-solid fa-filter"></i>
              {isFilterVisible ? "Hide Filter" : "Show Filter"}
            </div>
          </div>
        </div>

        <div className="homeProduct">
          <div className="top-strip">
            <p>
              We found <span className="text-success">{filteredProducts.length}</span> items for you!
            </p>
            <div className="top-strip-bar">
              <div className="strip-bar-tab">
                <div className="strip-bar-tab-btn1">
                  <button
                    className="tab-btn1"
                    onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                  >
                    <i className="fa-light fa-grid-2"></i>Show: 50
                  </button>
                  {isOpenDropdown !== false && (
                    <ul className="dropdownMenu">
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          50
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          100
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          150
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          200
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          All
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="strip-bar-tab-btn2">
                  <button
                    className="tab-btn2"
                    onClick={() => setIsOpenDropdown2(!isOpenDropdown2)}
                  >
                    <i className="fa-sharp fa-solid fa-bars-filter"></i>Sort by:
                    Featured
                  </button>
                  {isOpenDropdown2 !== false && (
                    <ul className="dropdownMenu">
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          Featured
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          Price: Low to High
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          Price: High to Low
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          Release
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdownMenu-btn"
                          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        >
                          Avg. Rating
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="rightcontent">
            <div className="product-row">
              <div className="featured-item">
                {productscategory.catproducts1.map((catproduct1) => (
                  <div key={catproduct1.id}>

                    <div className="product-card">
                      <span className="product-badge">Hot</span>
                      <div className="product-imgcard">
                        <img
                          className="product-image"
                          src={catproduct1.pimage}
                          alt={catproduct1.title}
                        />
                        <div className="img_overlay">
                          <ul className="list-product-overlay">
                            <li className="list-item-overlay" onClick={() => handleAddToWishlist(product)}>
                              <img src={wishlistimg} alt="Wishlist Image" />
                            </li>
                            <Link
                              to={`/products-categories/${productscategory.categoryitem}/${catproduct1.title}`}
                            >
                              <li className="list-item-overlay">
                                <img src={previewimg} alt="Wishlist Image" />
                              </li>
                            </Link>

                          </ul>
                        </div>
                      </div>

                      <div className="product-contentcard">
                        <span className="catName">
                          {productscategory.categoryitem}
                        </span>
                        <h2 className="products-name">{catproduct1.name}</h2>
                        <div className="product-ratings">
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star"></span>
                          <span className="fa fa-star"></span>
                        </div>
                        <h6 className="products-description">{catproduct1.pdescription}</h6>
                        <h6 className="products-description">
                          By {catproduct1.vendorname}
                        </h6>
                        <div className="price">
                          <span className="original-price">
                            {catproduct1.orgprice}
                          </span>
                          <span className="discount-price">
                            {catproduct1.disprice}
                          </span>
                          <p>
                            <button className="addtocart">
                              <i className="fa-solid fa-cart-shopping"></i>
                              Add to Cart
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};










//  <div className="homeProduct">
//             <div className="top-strip">
//               <p>We found <span>{filteredProducts.length}</span> items for you!</p>

//               <div className="strip-bar-tab">
//                 {/* Items per page */}
//                 <div className="strip-bar-tab-btn1">
//                   <button className="tab-btn1" onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
//                     <i className="fa-light fa-grid-2"></i> Show: {itemsPerPage}
//                   </button>
//                   {isOpenDropdown && (
//                     <ul className="dropdownMenu">
//                       {[50, 100, 150, 200, filteredProducts.length].map((num) => (
//                         <li key={num}>
//                           <button className="dropdownMenu-btn" onClick={() => { setItemsPerPage(num); setIsOpenDropdown(false); setCurrentPage(1); }}>
//                             {num}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>

//                 {/* Sorting */}
//                 <div className="strip-bar-tab-btn2">
//                   <button className="tab-btn2" onClick={() => setIsOpenDropdown2(!isOpenDropdown2)}>
//                     <i className="fa-sharp fa-solid fa-bars-filter"></i> Sort by: {sortOption}
//                   </button>
//                   {isOpenDropdown2 && (
//                     <ul className="dropdownMenu">
//                       {[
//                         { label: "Featured", value: "Featured" },
//                         { label: "Price: Low to High", value: "PriceLowToHigh" },
//                         { label: "Price: High to Low", value: "PriceHighToLow" },
//                         { label: "Release", value: "Release" },
//                         { label: "Avg. Rating", value: "AvgRating" },
//                       ].map((option) => (
//                         <li key={option.value}>
//                           <button className="dropdownMenu-btn" onClick={() => { setSortOption(option.value); setIsOpenDropdown2(false); }}>
//                             {option.label}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Product Cards */}
//             <div className="product-row">
//               {currentProducts.length > 0 ? currentProducts.map((product) => (
//                 <div key={product.id} className="product-card">
//                   <span className="product-badge">Hot</span>
//                   <div className="product-imgcard">
//                     <img src={`http://localhost:8000${product.pimage}`} alt={product.name} />
//                     <div className="img_overlay">
//                       <ul className="list-product-overlay">
//                         <li onClick={() => handleAddToWishlist(product)}>
//                           <img src={wishlistimg} alt="Wishlist" />
//                         </li>
//                         <Link to={`/products-categories/${categoryName}/${product.name}`}>
//                           <li><img src={previewimg} alt="Preview" /></li>
//                         </Link>
//                       </ul>
//                     </div>
//                   </div>
//                   <div className="product-contentcard">
//                     <span className="catName">{product.category_name}</span>
//                     <h2 className="products-name">{product.name}</h2>
//                     <h6>{product.pdescription}</h6>
//                     <h6>By {product.vendorname || "Admin"}</h6>
//                     <div className="price">
//                       <span>{product.orgprice}</span>
//                       <span>{product.disprice}</span>
//                       <button className="addtocart">Add to Cart</button>
//                     </div>
//                   </div>
//                 </div>
//               )) : <p>No products found in this category</p>}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="pagination">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <button
//                     key={i + 1}
//                     className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             )}

//           </div>