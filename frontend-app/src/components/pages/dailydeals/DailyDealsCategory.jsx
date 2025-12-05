// src/components/dailydeals/DailyDealsAll.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { DailyDealsCard } from "./DailyDealsCard";
import "./DailyDeals.css";

export const DailyDealsCategory = () => {
  const [ddproducts, setDdProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllDailyDeals = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/daily-deals");
        // ✅ Ensure only valid daily deal products are shown
        const validDeals = res.data.filter(
          (p) => p.is_daily_deal === 1 && p.daily_deal_price
        );
        setDdProducts(validDeals);
      } catch (err) {
        console.error("Error fetching daily deals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDailyDeals();
  }, []);

  if (loading) return <p>Loading daily deals...</p>;

  return (
    <div className="daily-deals">
      <div className="section-title">
        <h2>All Daily Deals</h2>
      </div>

      <div className="dailydeals-container">
        {ddproducts.length > 0 ? (
          <div className="dailydeals-grid">
            {ddproducts.map((ddproduct) => (
              <DailyDealsCard key={ddproduct.id} ddproduct={ddproduct} />
            ))}
          </div>
        ) : (
          <p>No daily deals available right now.</p>
        )}
      </div>
    </div>
  );
};
