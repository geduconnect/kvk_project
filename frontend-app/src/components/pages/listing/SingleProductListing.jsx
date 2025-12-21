import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "./DetailsPage.css";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";
import CategoriesFilter from "../filters/CategoriesPage";
import { useFilters } from "../../../context/FilterContext";

export const SingleProductListing = () => {
  const { categoryName, productId } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const {
    minPrice,
    maxPrice,
    selectedBrands,
    selectedStock,
    sortOption,
    itemsPerPage,
    clearFilters,
  } = useFilters();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [stockSummary, setStockSummary] = useState({ inStock: 0, outStock: 0 });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [inputValue, setInputValue] = useState(1);
  const [activeImage, setActiveImage] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, visible: false });

  // Quantity handlers
  const plus = () => setInputValue((prev) => prev + 1);
  const minus = () => setInputValue((prev) => (prev > 1 ? prev - 1 : 1));
  const handleInputChange = (e) => setInputValue(Math.max(parseInt(e.target.value) || 1, 1));

  // Zoom handlers
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y, visible: true });
  };
  const handleMouseLeave = () => setZoomPosition({ ...zoomPosition, visible: false });

  // Fetch product, categories, all products, brands, stock
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get(`http://localhost:8000/api/products/${productId}`);
        setProduct(productRes.data);
        if (productRes.data.images?.length)
          setActiveImage(`http://localhost:8000${productRes.data.images[0]}`);

        const categoriesRes = await axios.get("http://localhost:8000/api/categories");
        setCategories(categoriesRes.data);

        const productsRes = await axios.get("http://localhost:8000/api/products");
        setProducts(productsRes.data);

        const brandsRes = await axios.get(`http://localhost:8000/api/brands/${categoryName}`);
        setBrands(brandsRes.data);

        const stockRes = await axios.get(`http://localhost:8000/api/stock/${categoryName}`);
        setStockSummary(stockRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryName, productId]);

  // Filter products
  useEffect(() => {
    if (!products.length) return;

    let categoryProducts = products.filter(
      (p) => p.category_name?.toLowerCase() === categoryName?.toLowerCase()
    );

    let updatedProducts = categoryProducts.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    if (selectedBrands.length > 0)
      updatedProducts = updatedProducts.filter((p) => selectedBrands.includes(p.brand));

    if (selectedStock === "in") updatedProducts = updatedProducts.filter((p) => p.stock > 0);
    else if (selectedStock === "out") updatedProducts = updatedProducts.filter((p) => p.stock === 0);

    if (sortOption === "PriceLowToHigh") updatedProducts.sort((a, b) => a.price - b.price);
    if (sortOption === "PriceHighToLow") updatedProducts.sort((a, b) => b.price - a.price);
    if (sortOption === "Release")
      updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredProducts(updatedProducts);
  }, [products, categoryName, minPrice, maxPrice, selectedBrands, selectedStock, sortOption]);

  if (loading) return <h2>Loading product details...</h2>;
  if (!product) return <h2>Product not found!</h2>;

  return (
    <section className="details-home">
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
          <ul className="breadcrumb-content">
            <li><Link to="/">Home</Link></li>
            {categories
              .filter((cat) => cat.name.toLowerCase() === categoryName?.toLowerCase())
              .map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products-categories/${cat.name}`}>
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </Link>
                </li>
              ))}
            <li><span>{product.title || product.name}</span></li>
          </ul>
        </div>
      </div>

      <div className="detailspage-row">
        <div className="products-container">
          <div className="details-left">
            <div className="producat_wrapper">
              <div
                className="detailshome-zoom-container"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {activeImage && (
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="detailshome-main-image"
                  />
                )}
                {zoomPosition.visible && (
                  <div
                    className="detailshome-image-zoom-lens"
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                  />
                )}
              </div>
              <div className="detailshome-image-gallery">
                {product.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:8000${img}`}
                    alt={`Product ${idx + 1}`}
                    onClick={() => setActiveImage(`http://localhost:8000${img}`)}
                    className={activeImage === `http://localhost:8000${img}` ? "detailshome-gallery-image" : ""}
                  />
                ))}
              </div>
            </div>

            <div className="product-details">
              <h1 className="product-title">{product.title}</h1>
              <h2><b>Brand: </b>{product.brand}</h2>
              <div className="product-rating">
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star"></i>
                </span>
                <span>
                  <i className="fas fa-star-half-alt"></i>
                </span>
                <span>(350 ratings)</span>
              </div>

              <div className="products-pricing">
                <b>Price: </b>
                <span className="original-price">₹{product.oldPrice}</span>

                {product.price && <span className="discount-price">₹{product.discount_price || product.price}</span>}
              </div>

              <div className="product-actions">
                <div className="product-quantity">
                  <span className="qty-down" onClick={minus}>
                    <i className="fi-rs-angle-small-down"></i>
                  </span>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    min="1" // Optional: prevent negative values
                  />
                  <span className="qty-up" onClick={plus}>
                    <i className="fi-rs-angle-small-up"></i>
                  </span>
                </div>


                {product.description && <p><b>Description:</b> {product.description}</p>}
                <p><b>Stock:</b> {product.stock > 0 ? `${product.stock} Items In Stock` : "Out of Stock"}</p>

                <div className="product-details-button">
                  {/* ✅ ADD TO CART */}
                  <button
                    className="addtocart"
                    onClick={() => {
                      addToCart({ ...product, quantity: 1 });
                      showToast(`${product.name || product.title} added to cart!`);
                    }}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                  </button>

                  {/* ✅ ADD TO WISHLIST */}
                  <button
                    className="addtocart"
                    onClick={() => {
                      addToWishlist({
                        ...product,
                        quantity: 1,
                        price: product.discount_price || product.price,
                      });
                      showToast(`${product.title || product.name} added to wishlist!`);
                    }}
                  >
                    ❤️ Wishlist
                  </button>
                </div>

              </div>
            </div>

            {/* Related Products */}

          </div>
          <div className="detailspage-descriptions-container">
            <h2>Overview</h2>
            <table>
              <tbody>
                <tr>
                  <td><b>Product Name</b></td>
                  <td>{product.title}</td>

                </tr>


                <tr>
                  <td><b>Brand</b></td>
                  <td>{product.brand}</td>

                </tr>
                <tr>
                  <td><b>Category</b></td>
                  <td>{product.category_name}</td>

                </tr>

                <tr>
                  <div className="product-details-summary">
                    <ul>
                      {product.description && <li><b>Description:</b> {product.description}</li>}

                      {product.type && <li><b>Type:</b> {product.type}</li>}
                      {product.mfg && <li><b>MFG:</b> {product.mfg}</li>}
                      {product.size && <li><b>Size:</b> {product.size}</li>}
                      {product.weight && <li><b>Weight:</b> {product.weight}</li>}
                      {product.tags && <li><b>Tags:</b> {product.tags}</li>}
                      {product.life && <li><b>Life:</b> {product.life}</li>}
                      <li><b>Stock:</b> {product.stock > 0 ? `${product.stock} Items In Stock` : "Out of Stock"}</li>
                      {product.sku && <li><b>SKU:</b> {product.sku}</li>}
                    </ul>
                  </div>

                </tr>

              </tbody>

            </table>
            {/* <div className="detailspage-descriptions">
              <ul className="detailspage-tab">
                {[1, 2, 3, 4].map((tab) => (
                  <li
                    key={tab}
                    onClick={() => toggleTab(tab)}
                    className={
                      toggleState === tab
                        ? "detailspage-tab-list active-detailspage-tab-list"
                        : "detailspage-tab-list"
                    }
                  >
                    {tab === 1
                      ? "Description"
                      : tab === 2
                        ? "Additional info"
                        : tab === 3
                          ? "Vendor"
                          : "Reviews"}
                  </li>
                ))}
              </ul>
              <div className="detailspage-para">
                {toggleState === 1 && (
                  <div className="detailspage-para-content active-detailspage-para-content">
                    <p>Description content goes here...</p>
                  </div>
                )}
                {toggleState === 2 && (
                  <div className="detailspage-para-content active-detailspage-para-content">
                    <p>Additional info content goes here...</p>
                  </div>
                )}
                {toggleState === 3 && (
                  <div className="detailspage-para-content active-detailspage-para-content">
                    <p>Vendor content goes here...</p>
                  </div>
                )}
                {toggleState === 4 && (
                  <div className="detailspage-para-content active-detailspage-para-content">
                    <p>Reviews content goes here...</p>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
        {/* Right Column: Filter Sidebar */}
        <div className="categories-sidebar">
          <CategoriesFilter
            categories={categories}
            products={products}
          />
        </div>
      </div>
    </section>
  );
};
