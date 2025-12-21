import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductCategory.css"
import { Link } from "react-router-dom";

export const ProductCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Using backend API that returns categories
        const res = await axios.get("http://localhost:8000/api/categories");
        // Ensure images are prefixed properly
        const formattedCategories = res.data.map((cat) => ({
          ...cat,
          image: cat.image.startsWith("http")
            ? cat.image
            : `http://localhost:8000${cat.image}`,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="category-section">
      <div className="categories-title">
        <h2 className="">Our Categories</h2>
        <div className="line-mf"></div>

      </div>

      <div className="categories-wrapper">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div className="products-category-card" key={cat.id}>
              <Link to={`/products-categories/${cat.name}`}>
                <div className="category-image">
                  <img src={cat.image} alt={cat.name} />
                  <p className="category-name">{cat.name}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};
