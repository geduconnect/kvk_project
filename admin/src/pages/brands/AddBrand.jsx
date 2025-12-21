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

    const formData = new FormData();
    formData.append("brand_name", brandName);
    formData.append("image", brandImage);

    await axios.post("/brands", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
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
  name="image"
  onChange={(e) => setBrandImage(e.target.files[0])}
/>


        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="upload-btn">
          Add Brand
        </button>
      </form>
    </div>
  );
};
