import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../pages/api";

const AdminProtectedRoute = ({ children }) => {
 const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/admin/check-auth", {
          withCredentials: true, // ✅ REQUIRED for cookies
        });

        if (res.data?.isAuthenticated === true) {
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

  if (loading) return <div>Checking admin authentication...</div>;

  if (!isAuth) return <Navigate to="/admin/login" replace />;

  return children;
};
export default AdminProtectedRoute;
