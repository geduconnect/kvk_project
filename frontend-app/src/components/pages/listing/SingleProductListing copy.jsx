import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "./DetailsPage.css";
import { useCart } from "../../../CartContext";
import { useWishlist } from "../../../WishlistContext";


export const SingleProductListing = () => {
  const { categoryName, productId } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  // Product & Categories
  const [brands, setBrands] = useState([]);
  const [stockSummary, setStockSummary] = useState({ inStock: 0, outStock: 0 });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);
  const [sortOption, setSortOption] = useState("Featured");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStock, setSelectedStock] = useState(""); // "in", "out" or ""
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quantity & Image Zoom
  const [inputValue, setInputValue] = useState(1);
  const [activeImage, setActiveImage] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, visible: false });

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  useEffect(() => {
    let categoryProducts = products.filter(
      (p) => p.category_name?.toLowerCase() === categoryName?.toLowerCase()
    );

    let updatedProducts = categoryProducts.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    // Brand filter
    if (selectedBrands.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        selectedBrands.includes(p.brand)
      );
    }

    // Stock filter
    if (selectedStock === "in") {
      updatedProducts = updatedProducts.filter((p) => p.stock > 0);
    } else if (selectedStock === "out") {
      updatedProducts = updatedProducts.filter((p) => p.stock === 0);
    }

    // Sorting
    if (sortOption === "PriceLowToHigh")
      updatedProducts.sort((a, b) => a.price - b.price);
    if (sortOption === "PriceHighToLow")
      updatedProducts.sort((a, b) => b.price - a.price);
    if (sortOption === "Release")
      updatedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    setFilteredProducts(updatedProducts);
  }, [products, categoryName, minPrice, maxPrice, sortOption, selectedBrands, selectedStock]);

  // Fetch product & categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${productId}`);
        setProduct(res.data);
        if (res.data.images?.length) setActiveImage(`http://localhost:8000${res.data.images[0]}`);

        const catRes = await axios.get(`http://localhost:8000/api/categories`);
        setCategories(catRes.data);

        const relatedRes = await axios.get(`http://localhost:8000/api/products?category=${categoryName}`);
        setRelated(relatedRes.data.filter((p) => p.id !== parseInt(productId)));
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId, categoryName]);

  // --- Fetch categories ---
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);
  // Quantity handlers
  const plus = () => setInputValue((prev) => prev + 1);
  const minus = () => setInputValue((prev) => (prev > 1 ? prev - 1 : 1));
  const handleInputChange = (e) => setInputValue(Math.max(parseInt(e.target.value) || 1, 1));

  // Zoom
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y, visible: true });
  };
  const handleMouseLeave = () => setZoomPosition({ ...zoomPosition, visible: false });


  // Cart / Wishlist / Checkout
  const handleAddToCart = () => {
    addToCart({ id: product.id, title: product.name, price: product.discount_price || product.price, quantity: inputValue });
    navigate("/cart"); // Go to cart page
  };

  const handleAddToWishlist = () => {
    addToWishlist({ id: product.id, title: product.name, price: product.discount_price || product.price, quantity: 1 });
    navigate("/wishlist"); // Go to wishlist page
  };

  const handleBuyNow = () => {
    addToCart({ id: product.id, title: product.name, price: product.discount_price || product.price, quantity: inputValue });
    navigate("/checkout"); // Go to checkout page
  };

  if (loading) return <h2>Loading product details...</h2>;
  if (!product) return <h2>Product not found!</h2>;

  return (
    <section className="details-home">
      {/* Breadcrumb */}
      {/* Breadcrumb */}
      <div className="breadcrumb-wrapper">
        <div className="container-fluid">
          <ul className="breadcrumb-content">
            <li>
              <Link to="/">Home</Link>
            </li>
            {categories
              .filter((cat) => cat.name.toLowerCase() === categoryName?.toLowerCase())
              .map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products-categories/${cat.name}`}>
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </Link>
                </li>
              ))}
            <li>
              <span>{product.title || product.name}</span>
            </li>
          </ul>
        </div>
      </div>


      <div className="detailspage-row">
        <div className="detailspage-cont">
          <div className="details-left">
            <div className="producat_wrapper">
              <div
                className="detailshome-zoom-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                {activeImage && <img src={activeImage} alt={product.name} className="detailshome-main-image" />}
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

            {/* Product Details */}
            <div className="product-details">
              <h1 className="product-title">{product.title}</h1>
              <h2>{product.brand}</h2>
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
                Price:
                <span className="original-price">₹{product.oldPrice}</span>

                {product.price && <span className="discount-price">₹{product.discount_price || product.price}</span>}
              </div>
              <p className="product-description">{product.description}</p>
              <div className="attr-detail attr-size mb-30">
                <strong className="mr-10">Size / Weight: </strong>
                <ul className="list-filter size-filter font-small">
                  <li className="">
                    <a href="#">50g</a>
                  </li>
                  <li className="active">
                    <a href="#">60g</a>
                  </li>
                  <li>
                    <a href="#">80g</a>
                  </li>
                  <li>
                    <a href="#">100g</a>
                  </li>
                  <li>
                    <a href="#">150g</a>
                  </li>
                </ul>
              </div>
              {/* Quantity & Actions */}
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


              </div>
              <br />

              <div className="product-details-button">
                <button
                  className="add-to-cart"
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.discount_price || product.price,
                      quantity: inputValue,
                    });
                    alert(`${product.title} added to cart!`); // replace with toast for better UX
                  }}
                >
                  Add to Cart
                </button>

                <button
                  className="buy-now"
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.discount_price || product.price,
                      quantity: inputValue,
                    });
                    alert(`Proceeding to checkout with ${product.title}`);
                    // Optionally navigate to checkout
                    // navigate("/checkout");
                  }}
                >
                  Buy Now
                </button>

                <button
                  className="add-to-cart"
                  onClick={() => {
                    addToWishlist({
                      id: product.id,
                      title: product.title,
                      price: product.discount_price || product.price,
                      quantity: 1,
                    });
                    alert(`${product.title} added to wishlist!`);
                    // Optionally navigate to wishlist
                    // navigate("/wishlist");
                  }}
                >
                  Wishlist
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
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


        <div className="listing-wrapper">
          {/* Categories */}
          <div className="sidebar-category-card">
            <h3>Categories</h3>
            <div className="listing-catList">
              {categories.map((cat) => (
                <div key={cat.id} className="listing-catItem">
                  <span className="catList-img">
                    <img
                      src={`http://localhost:8000${cat.image}`}
                      alt={cat.name}
                      width={30}
                    />
                  </span>
                  <Link to={`/products-categories/${cat.name}`}>
                    <h4>{cat.name}</h4>
                  </Link>
                  <span className="catList-stock">
                    {products.filter((p) => p.category_name === cat.name).length}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="sidebar-category-card">
            <h3>Filter By Price</h3>
            <div className="price-filter">
              <label>Min Price: ₹{minPrice}</label>
              <input
                type="range"
                min="0"
                max="100000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <label>Max Price: ₹{maxPrice}</label>
              <input
                type="range"
                min="0"
                max="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div className="sidebar-category-card">
            <h3>Filter By Brand</h3>
            <div className="brand-filter">
              {brands.map((brand) => (
                <div key={brand}>
                  <label>
                    <input
                      type="checkbox"
                      value={brand}
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(
                            selectedBrands.filter((b) => b !== brand)
                          );
                        }
                      }}
                    />
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Filter */}
          <div className="sidebar-category-card">
            <h3>Filter By Stock</h3>
            <div className="stock-filter">
              <label>
                <input
                  type="radio"
                  name="stock"
                  value="in"
                  checked={selectedStock === "in"}
                  onChange={() => setSelectedStock("in")}
                />
                In Stock ({stockSummary.inStock})
              </label>
              <label>
                <input
                  type="radio"
                  name="stock"
                  value="out"
                  checked={selectedStock === "out"}
                  onChange={() => setSelectedStock("out")}
                />
                Out of Stock ({stockSummary.outStock})
              </label>
              <label>
                <input
                  type="radio"
                  name="stock"
                  value=""
                  checked={selectedStock === ""}
                  onChange={() => setSelectedStock("")}
                />
                All
              </label>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="sidebar-category-card">
            <button onClick={() => setIsFilterVisible(!isFilterVisible)}>
              {isFilterVisible ? "Hide Filters" : "Show Filters"}
            </button>
            {isFilterVisible && (
              <button onClick={clearFilters}>Clear All Filters</button>
            )}
          </div>
        </div>

      </div>

    </section >
  );
};
