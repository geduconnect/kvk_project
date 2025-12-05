import React, { createContext, useState, useContext } from 'react';

// Create a context to store the refresh state
const RefreshContext = createContext();

// Create a provider component
export const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);  // State for refresh

  // Function to toggle refresh state
  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <RefreshContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

// Custom hook to access the refresh context
export const useRefresh = () => useContext(RefreshContext);