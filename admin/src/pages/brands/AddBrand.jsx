import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

export const AddBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAddBrand = async (e) => {
    e.preventDefault();
    setError("");

    if (!brandName.trim()) {
      setError("Brand name is required.");
      return;
    }

    if (!brandImage) {
      setError("Brand image is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("brand_name", brandName);
      formData.append("image", brandImage); 

      await axios.post("/brandsTable", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/brandsTable");
    } catch (err) {
      console.error("❌ Error adding brand:", err);

      setError(
        err.response?.data?.error || "Failed to add brand."
      );
    }
  };

  return (
    <div className="user-details-page">
      <h2>Add Brand</h2>

      <form onSubmit={handleAddBrand} className="admin-form">
        <label>Brand Name</label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Enter brand name"
          required
        />

        <label>Brand Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBrandImage(e.target.files[0])}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="upload-btn">
          Add Brand
        </button>
      </form>
    </div>
  );
};
