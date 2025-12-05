// src/admin/brands/EditBrand.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

export const EditBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load Brand By ID
  const loadBrand = async () => {
    try {
      const res = await axios.get(`/brands/${id}`);
      setBrandName(res.data.brand_name);
      setOldImage(res.data.image);
    } catch (err) {
      console.error("Failed to load brand:", err);
      setError("Failed to load brand data");
    }
  };

  useEffect(() => {
    loadBrand();
  }, [id]);

  // ✅ Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!brandName.trim()) {
      setError("Brand name is required");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("brand_name", brandName);

      if (brandImage) {
        formData.append("image", brandImage); // ✅ Must match multer
      }

      await axios.put(`/brands/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/brands");
    } catch (err) {
      console.error("❌ Error updating brand:", err);
      setError("Failed to update brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-details-page">
      <h2>Edit Brand</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        {/* ✅ Brand Name */}
        <label>Brand Name</label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          required
        />

        {/* ✅ Current Image Preview */}
        {oldImage && (
          <div style={{ margin: "10px 0" }}>
            <p>Current Image:</p>
            <img
              src={`http://localhost:8000${oldImage}`}
              alt="Old Brand"
              style={{ width: 80, height: 80, objectFit: "cover" }}
            />
          </div>
        )}

        {/* ✅ Upload New Image (Optional) */}
        <label>Change Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBrandImage(e.target.files[0])}
        />

        <button type="submit" className="upload-btn" disabled={loading}>
          {loading ? "Updating..." : "Update Brand"}
        </button>
      </form>
    </div>
  );
};
