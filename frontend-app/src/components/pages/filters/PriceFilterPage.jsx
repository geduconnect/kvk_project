const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  return (
    <div className="sidebar-category-card">
      <h3 className="">Price Range</h3>

      <div className="pf-values">
        <div className="pf-box">₹{minPrice}</div>
        <div className="pf-box">₹{maxPrice}</div>
      </div>

      <div className="pf-slider-group">
        <input
          type="range"
          min="0"
          max="100000"
          value={minPrice}
          onChange={(e) => setMinPrice(+e.target.value)}
          className="pf-slider"
        />

        <input
          type="range"
          min="0"
          max="100000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
          className="pf-slider"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
