const BrandFilter = ({ brands, selectedBrands, setSelectedBrands }) => {
  return (
    <div className="sidebar-category-card">
      <h3 className="">Brands</h3>

      <div className="bf-list">
        {brands.map((brand) => (
          <label key={brand} className="bf-item">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBrands([...selectedBrands, brand]);
                } else {
                  setSelectedBrands(
                    selectedBrands.filter((b) => b !== brand)
                  );
                }
              }}
            />
            <span className="bf-label">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
