import { useState, useEffect } from "react";
import axios from "axios";
import { FeaturedCategories } from "./FeaturedCategories";
import "./Featured.css";
import { Link } from "react-router-dom";

export const HomeProducts = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [popularCategories, setPopularCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch category-wise popular products from backend
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products/popular/by-category");
        setPopularCategories(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching popular products:", err);
        setLoading(false);
      }
    };
    fetchPopularProducts();
  }, []);

  if (loading) return <p>Loading popular products...</p>;
  if (!popularCategories.length) return <p>No popular products found.</p>;

  return (
    <div className="daily-deals" style={{background: "#f5f2edff"}}>

      <div className="dailydeals-container">
        <div
          className="section-title"

        >
          <h2>Popular Products</h2>
          <Link to="/featured-category"
            className="view-all-btn">
            View All
          </Link>
        </div>
        {/* Category Tabs */}

        <div className="dailydealstab-header">
          {popularCategories.map((category, index) => (
            <button
              key={category.id}
              className={activeTab === index ? "featuredtab-active" : "featuredtab"}
              onClick={() => setActiveTab(index)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div
          className="dailydeals-content"
          style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto",
            padding: "10px 0",
          }}
        >
          {popularCategories[activeTab] && (
            <FeaturedCategories
              featuredcategory={popularCategories[activeTab]}
            />
          )}
        </div>
      </div>
    </div>
  );
};
