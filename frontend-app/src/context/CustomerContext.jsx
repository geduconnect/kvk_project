import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../components/api.js";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check if customer is logged in
  const checkAuth = async () => {
    console.log("checkAuth → checking authentication...");
    try {
      const res = await api.get("/auth/customer/check-auth");
      console.log("checkAuth → response:", res.data);

      if (res.data.isAuthenticated) {
        setCustomer(res.data.user);
        return res.data.user;
      } else {
        setCustomer(null);
        return null;
      }
    } catch (err) {
      console.error("checkAuth → error:", err);
      setCustomer(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Login customer
  const login = async (email, password) => {
    console.log("login → sending request...");
    try {
      const res = await api.post("/auth/customer/login", { email, password });
      console.log("login → login response:", res.data);

      // Immediately check auth to update context
      const auth = await checkAuth();
      console.log("login → checkAuth result:", auth);
      return auth;
    } catch (err) {
      console.error("login → error:", err.response?.data || err);
      throw err;
    }
  };

  // ✅ Logout
  const logout = async () => {
    console.log("logout → sending request...");
    try {
      await api.post("/auth/customer/logout");
      setCustomer(null);
    } catch (err) {
      console.warn("logout → failed:", err);
    }
  };

  return (
    <CustomerContext.Provider value={{ customer, loading, checkAuth, login, logout }}>
      {children}
    </CustomerContext.Provider>
  );
};

// ✅ Hook
export const useCustomerAuth = () => {
  const context = useContext(CustomerContext);
  if (!context) throw new Error("useCustomerAuth must be used within CustomerProvider");
  return context;
};
