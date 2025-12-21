import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DailyDealsCard } from "./DailyDealsCard";
import "./DailyDeals.css";

export const DailyDealsProducts = () => {
  const [ddproducts, setDdProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("");

  // ✅ Base URL setup for convenience
  const API_BASE = "http://localhost:8000/api";

  /** 🔹 Fetch Daily Deals */
  const fetchDailyDeals = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products/dailydeals`);
      console.log("✅ Daily Deals Response:", res.data);
      setDdProducts(res.data || []);
    } catch (err) {
      console.error(
        "❌ Error fetching daily deals:",
        err.response?.data || err.message
      );
      setDdProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Fetch Categories */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/categories`);
      console.log("✅ Categories Response:", res.data);
      setCategories(res.data || []);
      if (res.data?.length && !activeCategory) {
        setActiveCategory(String(res.data[0].id));
      }
    } catch (err) {
      console.error(
        "❌ Error fetching categories:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchDailyDeals();
    fetchCategories();
  }, []);

  /** 🔹 Filter + Search + Sort */
  const filteredProducts = ddproducts
    .filter((p) =>
      activeCategory === "" ? true : String(p.category_id) === String(activeCategory)
    )
    .filter(
      (p) =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (priceSort === "low") return a.daily_deal_price - b.daily_deal_price;
      if (priceSort === "high") return b.daily_deal_price - a.daily_deal_price;
      return 0;
    });

  return (
    <div className="daily-deals">

      <div className="dailydeals-container">
        <div
          className="section-title"

        >
          <h2>Daily Deals</h2>
          <Link to="/daily-deals-category">
          <button className="view-all-btn">View All</button>
          </Link>
        </div>

        {/* 🔹 Category Tabs */}
        <div className="dailydealstab-header">


          {categories.map((cat) => (
            <button
              key={cat.id}

              className={activeCategory === String(cat.id) ? "dailydealstab-active" : "dailydealstab"}
              onClick={() => setActiveCategory(String(cat.id))}
            >
              {cat.name}
            </button>
          ))}
        </div>



        {/* 🔹 Products */}
        {loading ? (
          <p className="loading">⏳ Loading daily deals...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="dailydeals-content">
            {filteredProducts.map((ddproduct) => (
              <DailyDealsCard key={ddproduct.id} ddproduct={ddproduct} />
            ))}
          </div>
        ) : (
          <p className="no-products">🚫 No daily deals available today.</p>
        )}
      </div>
    </div>
  );
};
