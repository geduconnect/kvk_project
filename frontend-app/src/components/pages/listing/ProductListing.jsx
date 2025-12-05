import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HomeProduct } from "./HomeProduct";

import "./Listing.css";
import { useFilters } from "../../../FilterContext";
import { FilterPage } from "../FilterPage";
import { useWishlist } from "../../../context/WishlistContext";

export const ProductListing = () => {
  const { categoryName } = useParams();
  const { addToWishlist } = useWishlist();
  const {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedBrands,
    setSelectedBrands,
    selectedStock,
    setSelectedStock,
    sortOption,
    setSortOption,
    itemsPerPage,
    setItemsPerPage,
    clearFilters,
  } = useFilters();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [stockSummary, setStockSummary] = useState({ inStock: 0, outStock: 0 });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // --- Fetch categories ---
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // --- Fetch products ---
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // --- Fetch brands + stock for current category ---
  useEffect(() => {
  if (!categoryName) return; // skip if undefined

  axios.get(`http://localhost:8000/api/brands/${categoryName}`)
    .then(res => setBrands(res.data))
    .catch(err => console.error("Brands fetch error:", err));

  axios.get(`http://localhost:8000/api/stock/${categoryName}`)
    .then(res => setStockSummary(res.data))
    .catch(err => console.error("Stock fetch error:", err));
}, [categoryName]);

  // --- Filter & sort products ---
  useEffect(() => {
    let categoryProducts = products.filter(
      (p) => p.category_name?.toLowerCase() === categoryName?.toLowerCase()
    );

    let updatedProducts = categoryProducts.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    if (selectedBrands.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        selectedBrands.includes(p.brand)
      );
    }

    if (selectedStock === "in") updatedProducts = updatedProducts.filter((p) => p.stock > 0);
    else if (selectedStock === "out") updatedProducts = updatedProducts.filter((p) => p.stock === 0);

    if (sortOption === "PriceLowToHigh") updatedProducts.sort((a, b) => a.price - b.price);
    if (sortOption === "PriceHighToLow") updatedProducts.sort((a, b) => b.price - a.price);
    if (sortOption === "Release") updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredProducts(updatedProducts);
  }, [products, categoryName, minPrice, maxPrice, selectedBrands, selectedStock, sortOption]);

  if (!products.length || !categories.length) return <h1>Loading...</h1>;

  return (
    <div className="listing-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
          <ul className="breadcrumb-content">
            <li><Link to="/">Home</Link></li>
            <li>
              <Link to={`/products-categories/${categoryName}`}>
                {categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1)}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="listing-data">
        {/* Sidebar / Filters */}
        <FilterPage
          categories={categories}
          products={products}
          brands={brands}
          stockSummary={stockSummary}
          isFilterVisible={isFilterVisible}
          setIsFilterVisible={setIsFilterVisible}
        />

        {/* Product Grid */}
        <HomeProduct
          products={filteredProducts}
          categoryName={categoryName}
          handleAddToWishlist={addToWishlist}
          handleAddToCart={() => { }}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>
    </div>
  );
};
