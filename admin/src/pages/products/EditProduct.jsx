import React, { useState, useContext, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../../context/ProductContext.jsx";
import "./UploadProduct.css";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { triggerRefresh } = useContext(ProductContext);

  const [loading, setLoading] = useState(true);

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
    existingImages: [],
    size: "",
    weight: "",
    type: "",
    mfg: "",
    tags: "",
    life: "",
  });

  const [categories, setCategories] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  // ✅ Fetch categories
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

  // ✅ Fetch product safely (NO STATE OVERWRITE BUG)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        const data = res.data;

        setProduct((prev) => ({
          ...prev,
          title: data.title || "",
          brand: data.brand || "",
          description: data.description || "",
          category_id: data.category_id || "",
          oldPrice: data.oldPrice || "",
          price: data.price || "",
          stock: data.stock || "",
          status: data.status || "draft",
          existingImages: data.images || [],
          size: data.size || "",
          weight: data.weight || "",
          type: data.type || "",
          mfg: data.mfg || "",
          tags: data.tags || "",
          life: data.life || "",
        }));

        setShowPreview(true);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        alert("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

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

  const handleDeletePreview = (index) => {
    setProduct((prev) => {
      const newFiles = [...prev.files];
      const newPreviews = [...prev.previews];

      newFiles.splice(index, 1);
      newPreviews.splice(index, 1);

      return { ...prev, files: newFiles, previews: newPreviews };
    });
  };

  const handleDeleteExisting = async (imgUrl) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${id}/image`, {
        data: { imageUrl: imgUrl },
        withCredentials: true,
      });

      setProduct((prev) => ({
        ...prev,
        existingImages: prev.existingImages.filter((img) => img !== imgUrl),
      }));
    } catch (err) {
      console.error("Error deleting existing image:", err);
      alert("Failed to delete image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.title ||
      !product.brand ||
      !product.description ||
      !product.category_id ||
      !product.price ||
      !product.stock
    ) {
      return alert("Please fill all required fields.");
    }

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("brand", product.brand);
      formData.append("description", product.description);
      formData.append("category_id", product.category_id);
      formData.append("oldPrice", product.oldPrice);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("status", product.status);
      formData.append("size", product.size);
      formData.append("weight", product.weight);
      formData.append("type", product.type);
      formData.append("mfg", product.mfg);
      formData.append("tags", product.tags);
      formData.append("life", product.life);

      product.files.forEach((file) => formData.append("images", file));

      await axios.put(`http://localhost:8000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("✅ Product updated successfully!");
      triggerRefresh();
      navigate("/allproducts");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("❌ Failed to update product.");
    }
  };

  if (loading) return <h2 style={{ padding: "40px" }}>Loading product...</h2>;

  return (
    <form onSubmit={handleSubmit} className="product-upload">
      <h1>Edit Product</h1>

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

        {showPreview && (
          <div className="image-preview">
            {product.existingImages.map((img, idx) => (
              <div key={idx} className="preview-image" style={{ position: "relative" }}>
                <img src={`http://localhost:8000${img}`} alt="" />
                <MdDelete onClick={() => handleDeleteExisting(img)} />
              </div>
            ))}

            {product.previews.map((img, idx) => (
              <div key={idx} className="preview-image" style={{ position: "relative" }}>
                <img src={img} alt="" />
                <MdDelete onClick={() => handleDeletePreview(idx)} />
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="product-pricing">
        <div className="span-price">
          <label>Size</label>
          <input type="text" name="size" value={product.size} onChange={handleChange} />
        </div>
        <div className="span-price">
          <label>Weight</label>
          <input type="text" name="weight" value={product.weight} onChange={handleChange} />
        </div>
        <div className="span-stock">
          <label>Type</label>
          <input type="text" name="type" value={product.type} onChange={handleChange} />
        </div>
        <div className="span-price">
          <label>MFG</label>
          <input type="text" name="mfg" value={product.mfg} onChange={handleChange} />
        </div>
        <div className="span-price">
          <label>Tags</label>
          <input type="text" name="tags" value={product.tags} onChange={handleChange} />
        </div>
        <div className="span-stock">
          <label>Life</label>
          <input type="text" name="life" value={product.life} onChange={handleChange} />
        </div>
      </div>

      <div className="product-pricing">
        <div className="span-price">
          <label>Old Price</label>
          <input type="number" name="oldPrice" value={product.oldPrice} onChange={handleChange} />
        </div>

        <div className="span-price">
          <label>New Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>

        <div className="span-stock">
          <label>Stock</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} required />
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

      <button type="submit" className="submit-btn">Update Product</button>
    </form>
  );
};
