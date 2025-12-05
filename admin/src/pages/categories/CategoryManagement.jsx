import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

export const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Trigger refresh from child components
  const refreshCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error refreshing categories:", err);
    }
  };

  return (
    <>
      <Outlet context={{ categories, setCategories, refreshCategories }} />
    </>
  );
};
