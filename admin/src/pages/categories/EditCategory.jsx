import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllCategories.css";

export const EditCategory = () => {
  const { id } = useParams(); // category ID from route
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // new image file
  const [preview, setPreview] = useState(null); // preview image
  const [message, setMessage] = useState("");

  // Fetch category details
  const fetchCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/categories/${id}`);
      setName(res.data.name);
      setPreview(`http://localhost:8000${res.data.image}`);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching category details");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit updated category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:8000/api/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Category updated successfully!");
      setTimeout(() => navigate("/categories/categoryTable"), 1000); // redirect after success
    } catch (err) {
      console.error(err);
      setMessage("Error updating category");
    }
  };

  return (
    <div className="upload-category">
      <h2>Edit Category</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <div className="image-preview">
            <p>Preview:</p>
            <img src={preview} alt="Preview" className="img-card" />
          </div>
        )}

        <button type="submit">Update Category</button>
        <button type="button" onClick={() => navigate("/categories/categoryTable")}>
          Cancel
        </button>
      </form>
    </div>
  );
};
