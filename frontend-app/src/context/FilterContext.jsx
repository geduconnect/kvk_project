import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null); // ✅ IMPORTANT

export const FilterProvider = ({ children }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const clearFilters = () => {
    setMinPrice(0);
    setMaxPrice(100000);
    setSelectedBrands([]);
    setSelectedStock("");
    setSortOption("");
  };

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used inside FilterProvider");
  }
  return context;
};
