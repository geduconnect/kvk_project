import React from "react";
import { Link } from "react-router-dom";
import { useFilters } from "../../FilterContext";

export const FilterPage = ({
  categories,
  products,
  brands,
  stockSummary,
  isFilterVisible,
  setIsFilterVisible,
}) => {
  const {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedBrands,
    setSelectedBrands,
    selectedStock,
    setSelectedStock,
    clearFilters,
  } = useFilters();

  return (
    <div className="listing-wrapper">
      {/* Categories */}
      <div className="sidebar-category-card">
        <h3>Categories</h3>
        <div className="listing-catList">
          {categories.map((cat) => (
            <div key={cat.id} className="listing-catItem">
              <span className="catList-img">
                <img src={`http://localhost:8000${cat.image}`} alt={cat.name} width={30} />
              </span>
              <Link to={`/products-categories/${cat.name}`}>
                <h4>{cat.name}</h4>
              </Link>
              <span className="catList-stock">
                {products.filter((p) => p.category_name === cat.name).length}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="sidebar-category-card">
        <h3>Filter By Price</h3>
        <div className="price-filter">
          <label>Min Price: ₹{minPrice}</label>
          <input type="range" min="0" max="100000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
          <label>Max Price: ₹{maxPrice}</label>
          <input type="range" min="0" max="100000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>
      </div>

      {/* Brand Filter */}
      <div className="sidebar-category-card">
        <h3>Filter By Brand</h3>
        <div className="brand-filter">
          {brands.map((brand) => (
            <div key={brand}>
              <label>
                <input
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) => {
                    if (e.target.checked) setSelectedBrands([...selectedBrands, brand]);
                    else setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                  }}
                />
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Filter */}
      <div className="sidebar-category-card">
        <h3>Filter By Stock</h3>
        <div className="stock-filter">
          <label>
            <input type="radio" name="stock" value="in" checked={selectedStock === "in"} onChange={() => setSelectedStock("in")} />
            In Stock ({stockSummary.inStock})
          </label>
          <label>
            <input type="radio" name="stock" value="out" checked={selectedStock === "out"} onChange={() => setSelectedStock("out")} />
            Out of Stock ({stockSummary.outStock})
          </label>
          <label>
            <input type="radio" name="stock" value="" checked={selectedStock === ""} onChange={() => setSelectedStock("")} />
            All
          </label>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="sidebar-category-card">
        <button onClick={() => setIsFilterVisible(!isFilterVisible)}>
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
        {isFilterVisible && <button onClick={clearFilters}>Clear All Filters</button>}
      </div>
    </div>
  );
};
