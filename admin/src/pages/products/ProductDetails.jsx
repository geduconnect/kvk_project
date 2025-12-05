import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data);
        setCurrentImage(
          res.data.images?.[0] ? `http://localhost:8000${res.data.images[0]}` : "/placeholder.png"
        );
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details-page">

      {/* Product Images */}
      <div className="product-details-container">
        <div className="product-images">
          <h1>Product Gallery</h1>
          <div className="main-image">
            <img src={currentImage} alt={product.title} />
          </div>
          <div className="thumbnail-images">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:8000${img}`}
                className={`thumbnail ${currentImage === `http://localhost:8000${img}` ? "active" : ""}`}
                onClick={() => setCurrentImage(`http://localhost:8000${img}`)}
                alt={`Thumbnail ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>Product Details</h1>
          <h2>{product.title}</h2>
          <h2>{product.brand}</h2>
          <h2>{product.category_name}</h2>

          {/* New Fields */}
          <ul className="product-extra-info">
            {product.size && <li><strong>Size:</strong> {product.size}</li>}
            {product.weight && <li><strong>Weight:</strong> {product.weight}</li>}
            {product.type && <li><strong>Type:</strong> {product.type}</li>}
            {product.mfg && <li><strong>MFG:</strong> {product.mfg}</li>}
            {product.tags && <li><strong>Tags:</strong> {product.tags}</li>}
            {product.life && <li><strong>Life:</strong> {product.life}</li>}
          </ul>

          <p className="price">₹{product.price}</p>
          {product.oldPrice && <p className="old-price">₹{product.oldPrice}</p>}
          <p className="status"><strong>Status:</strong> {product.status}</p>
          <p className="stock"><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : "Out of Stock"}</p>
          <p className="description">{product.description}</p>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="product-details-container">
        <div className="product-info">
          <h1>Product Description</h1>
          <p>{product.description}</p>
        </div>
      </div>

      {/* Vendor Info Section */}
      <div className="product-details-container">
        <div className="vendor-card">
          <h3>Vendor Information</h3>
          {product.vendorName ? (
            <>
              <p><strong>Company:</strong> {product.vendorName}</p>
              <p><strong>Contact:</strong> {product.contactPerson || "N/A"}</p>
              <p><strong>Email:</strong> {product.vendorEmail || "N/A"}</p>
            </>
          ) : (
            <p>No vendor linked</p>
          )}
        </div>
      </div>

    </div>
  );
};
