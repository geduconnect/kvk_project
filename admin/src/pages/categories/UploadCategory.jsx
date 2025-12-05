import React, { useState } from "react";
import axios from "axios";

export const UploadCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      setMessage("Please provide category name and image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8000/api/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Category uploaded successfully!");
      setName("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage("Error uploading category");
    }
  };

  return (
    <div className="upload-category">
      <h2>Upload Category</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
