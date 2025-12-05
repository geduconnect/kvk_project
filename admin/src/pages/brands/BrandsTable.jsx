import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import viewimg from "../../assets/159078.png";
import editimg from "../../assets/edit-new-icon-22.png";
import deleteimg from "../../assets/1214428.png";

// Axios Config
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

export const BrandsTable = () => {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch All Brands
  const fetchBrands = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("/brands");
      setBrands(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching brands:", err);
      setError("Failed to fetch brands.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // ✅ Delete Brand
  const deleteBrand = async (id) => {
    if (!window.confirm("Delete this brand?")) return;

    try {
      await axios.delete(`/brands/${id}`);
      setBrands((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("❌ Error deleting brand:", err);
      alert("Failed to delete brand.");
    }
  };

  // ✅ Search Filter
  const filteredBrands = brands.filter((b) =>
    (b.brand_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="user-details-page">
      <div className="adminproduct-head">
        <h2>All Brands</h2>

        <Link to="/brands/add">
          <button className="upload-btn">+ Add Brand</button>
        </Link>
      </div>

      {/* ✅ Search */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search brand name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="table-customer">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Brand Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.id}</td>

                <td>
                  {brand.image ? (
                    <img
                      src={`http://localhost:8000${brand.image}`}
                      alt={brand.brand_name}
                      className="img-card"
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>

                <td>{brand.brand_name}</td>

                <td>
                  {/* ✅ VIEW */}
                  <Link to={`/brands/${brand.id}`}>
                    <span className="preview-icon">
                      <img src={viewimg} alt="view" />
                    </span>
                  </Link>

                  {/* ✅ EDIT */}
                  <Link to={`/brands/edit/${brand.id}`}>
                    <span className="preview-icon">
                      <img src={editimg} alt="edit" />
                    </span>
                  </Link>

                  {/* ✅ DELETE */}
                  <span
                    onClick={() => deleteBrand(brand.id)}
                    className="preview-icon"
                    style={{ cursor: "pointer" }}
                  >
                    <img src={deleteimg} alt="delete" />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No brands found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
