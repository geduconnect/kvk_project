// src/components/routes/CustomerProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useCustomerAuth } from "../context/CustomerContext.jsx";
export const CustomerProtectedRoute = ({ children }) => {
  const { customer, loading } = useCustomerAuth();

  // Show loading while checking authentication
  if (loading) return <div>Loading...</div>;

  // Redirect to login if not authenticated
  if (!customer) return <Navigate to="/login" replace />;

  // Render children if authenticated
  return children;
};