import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../pages/api";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call backend check-auth route
        const res = await api.get("/admin/check-auth");

        if (res.data?.isAuthenticated) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Admin auth check failed:", err);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAuth) {
    return <Navigate to="/users/userTable" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
