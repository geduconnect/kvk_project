const StockFilter = ({
  selectedStock,
  setSelectedStock,
  stockSummary
}) => {
  return (
    <div className="sidebar-category-card">
      <h3>Filter By Stock</h3>

     <div className="sf-list">
        <label className="sf-item">
          <input
            type="radio"
            name="stock"
            checked={selectedStock === "in"}
            onChange={() => setSelectedStock("in")}
          />
          <span className="sf-label">In Stock ({stockSummary.inStock})</span>
        </label>

        <label className="sf-item">
          <input
            type="radio"
            name="stock"
            checked={selectedStock === "out"}
            onChange={() => setSelectedStock("out")}
          />
          <span className="sf-label">Out of Stock ({stockSummary.outStock})</span>
        </label>

        <label className="sf-item">
          <input
            type="radio"
            name="stock"
            checked={selectedStock === ""}
            onChange={() => setSelectedStock("")}
          />
          <span className="sf-label">All</span>
        </label>
      </div>
    </div>
  );
};

export default StockFilter;
