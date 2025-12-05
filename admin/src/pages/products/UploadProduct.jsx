import React, { useState, useContext, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ProductContext } from "../../context/ProductContext.jsx";
import "./UploadProduct.css";

export const UploadProduct = () => {
  const { triggerRefresh } = useContext(ProductContext);

  const [product, setProduct] = useState({
    title: "",
    brand: "",
    description: "",
    category_id: "",
    oldPrice: "",
    price: "",
    stock: "",
    status: "draft",
    files: [],
    previews: [],
  });

  const [categories, setCategories] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setProduct((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
      previews: [...prev.previews, ...previews],
    }));
    setShowPreview(true);
  };

  const handleDeleteImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
      previews: prev.previews.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.brand ||
      !product.description ||
      !product.category_id ||
      !product.oldPrice ||
      !product.price ||
      !product.stock ||
      !product.status ||
      product.files.length === 0
    ) {
      return alert("Please fill all fields and upload at least one image.");
    }

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("brand", product.brand);
      formData.append("description", product.description);
      formData.append("category_id", product.category_id);
      formData.append("oldPrice", parseFloat(product.oldPrice));
      formData.append("price", parseFloat(product.price));
      formData.append("stock", parseInt(product.stock));
      formData.append("status", product.status);
      formData.append("vendorId", null); // optional

      product.files.forEach((file) => formData.append("images", file));

      await axios.post("http://localhost:8000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product uploaded successfully!");
      setProduct({
        title: "",
        brand: "",
        description: "",
        category_id: "",
        oldPrice: "",
        price: "",
        stock: "",
        status: "draft",
        files: [],
        previews: [],
      });
      setShowPreview(false);
      triggerRefresh();
    } catch (err) {
      console.error("Error uploading product:", err);
      alert("Failed to upload product. Check backend logs.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-upload">
      <h1>Basic Details</h1>

      <div className="product-name">
        <label>Product Name:</label>
        <input type="text" name="title" value={product.title} onChange={handleChange} required />
      </div>

      <div className="product-name">
        <label>Brand Name:</label>
        <input type="text" name="brand" value={product.brand} onChange={handleChange} required />
      </div>

      <div className="product-description">
        <label>Product Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} required />
      </div>

      <div className="image-upload">
        <label>Upload Product Images</label>
        <label htmlFor="uploadImageInput" className="upload-img">
          <div className="upload-imgcont">
            <FaCloudUploadAlt />
            <span>Click to upload</span>
          </div>
        </label>
        <input
          type="file"
          id="uploadImageInput"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {showPreview && product.previews.length > 0 && (
          <div className="image-preview">
            {product.previews.map((img, idx) => (
              <div key={idx} className="preview-image" style={{ position: "relative" }}>
                <img src={img} alt={`Preview ${idx}`} style={{ width: "100px", height: "100px", borderRadius: "10px" }} />
                <MdDelete onClick={() => handleDeleteImage(idx)} style={{ cursor: "pointer", color: "red", position: "absolute", top: "5px", right: "5px" }} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="product-pricing">
        <div className="span-price">
          <label>Old Price</label>
          <input type="number" name="oldPrice" value={product.oldPrice} onChange={handleChange} placeholder="Enter Old Price" required />
        </div>
        <div className="span-price">
          <label>New Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Enter New Price" required />
        </div>
        <div className="span-stock">
          <label>Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Enter Stock" required />
        </div>
      </div>

      <div className="product-category">
        <label>Category</label>
        <select name="category_id" value={product.category_id} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="product-status">
        <label>Status</label>
        <select name="status" value={product.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Create Product</button>
    </form>
  );
};
