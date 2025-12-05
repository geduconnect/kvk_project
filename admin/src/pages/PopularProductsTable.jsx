import React, { useEffect, useState } from "react";
import axios from "axios";

export const PopularProductsTable = () => {
  const [products, setProducts] = useState([]);

  const fetchPopular = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products/popular");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching popular products:", err);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  const handleToggle = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/products/${id}/toggle-popular`);
      fetchPopular(); // refresh list
    } catch (err) {
      console.error("Error toggling popular:", err);
    }
  };

  return (
    <div className="popular-products">
      <h2>Popular Products</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Image</th>
            <th>Category</th>
            <th>Original Price</th>
            <th>Discounted Price</th>
            <th>Popular</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                <img
                  src={`http://localhost:8000${p.pimage}`}
                  alt={p.name}
                  style={{ width: "60px" }}
                />
              </td>
              <td>{p.category_name}</td>
              <td>₹{p.orgprice}</td>
              <td>₹{p.disprice}</td>
              <td>{p.is_popular ? "✅ Yes" : "❌ No"}</td>
              <td>
                <button onClick={() => handleToggle(p.id)}>
                  {p.is_popular ? "Remove from Popular" : "Mark as Popular"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
