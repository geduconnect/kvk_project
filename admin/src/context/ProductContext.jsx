import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Call this function to trigger product table refresh
  const triggerRefresh = () => setRefreshFlag(prev => !prev);

  return (
    <ProductContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </ProductContext.Provider>
  );
};
