import React, { useState } from 'react'
import { dailydealscategories } from '../dailydeals/DDData';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';


export const SmartFarmingProductPage = () => {
    const { categoryName, productName } = useParams();  // Accessing the name param from the URL

    const allProducts = dailydealscategories
        .filter((ddproduc) => ddproduc.name === categoryName) // Filter based on category name
        .flatMap((ddproduc) => ddproduc.ddproducts);
    const ddproduc = allProducts.find(
        (produc) => produc.title === productName
    );

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [filteredProducts, setFilteredProducts] = useState([]);

    if (!ddproduc) {
        return <div>Product not found</div>;
    }
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const [inputValue, setInputValue] = useState(1); // Initialize with 1

    const plus = () => {
        setInputValue((prev) => prev + 1);
    };

    const minus = () => {
        setInputValue((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
    };
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10) || 1; // Default to 1 if input is invalid
        setInputValue(value > 0 ? value : 1); // Ensure value is positive
    };
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (color) => {
        setCheckboxes((prev) => ({
            ...prev,
            [color]: !prev[color],
        }));
    };
    const [activeImage, setActiveImage] = useState(ddproduc?.images?.[0]);

    // State for zoom effect
    const [zoomPosition, setZoomPosition] = useState({
        x: 0,
        y: 0,
        visible: false,
    });

    // Handle mouse movement for zoom effect
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPosition({ x, y, visible: true });
    };

    // Hide zoom when the mouse leaves the image
    const handleMouseLeave = () => {
        setZoomPosition({ ...zoomPosition, visible: false });
    };
    const [checkboxes, setCheckboxes] = useState({
        red: false,
        green: false,
        yellow: false,
    });

    const { addToCart } = useCart(); // Access addToCart function from context
    const { addToWishlist } = useWishlist(); // Access addToCart function from context
    const handleAddToCart = () => {
        const product = {
            id: ddproduc.id,
            title: ddproduc.title,
            price: ddproduc.disprice,
            quantity: inputValue,
        };
        setIsPopupVisible(true); // Show popup when item is added to the cart

        addToCart(product); // Add product to the cart
    };
    const handleAddToWishlist = () => {
        const product = {
            id: ddproduc.id,
            title: ddproduc.title,
            price: ddproduc.disprice,
            quantity: inputValue,
        };
        addToWishlist(product); // Add product to the cart
    }; const [isPopupVisible, setIsPopupVisible] = useState(false);


    const handleClosePopup = () => {
        setIsPopupVisible(false); // Hide popup when OK is clicked
    };
    return (
        <>
            <section className="details-home">
                <div className="breadcumbwrapper">
                    <div className="container-fluid">
                        <ul className="breadcumb-content">
                            <h1>{ddproduc.title}</h1>
                        </ul>
                    </div>
                </div>
                <div className="detailspage-row">
                    <div className="detailspage-cont">
                        <div className="details-left">
                            <div className="producat_wrapper">
                                <div
                                    className="detailshome-zoom-container"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img
                                        src={activeImage}
                                        alt="Active Product"
                                        className="detailshome-main-image"
                                    />
                                    {zoomPosition.visible && (
                                        <div
                                            className="detailshome-image-zoom-lens"
                                            style={{
                                                backgroundImage: `url(${activeImage})`,
                                                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                            }}
                                        ></div>
                                    )}
                                </div>
                                <div className="detailshome-image-gallery">
                                    {ddproduc.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Product ${index + 1}`}
                                            onClick={() => setActiveImage(image)}
                                            className={`detailshome-gallery-image ${activeImage === image ? "detailshomeimageactive" : ""
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="product-details">
                                <h1 className="product-title">{ddproduc.title}</h1>
                                <p className="product-description">{ddproduc.pdescription}</p>
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
                                    <span className="old-price">
                                        {ddproduc?.orgprice}
                                    </span>
                                    <span className="discount-price">
                                        {ddproduc?.orgprice}
                                    </span>
                                </div>
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
                                <div className="product-details-button">
                                    <button className="add-to-cart" onClick={() => handleAddToCart(ddproduc.title, ddproduc.disprice)}>Add to Cart</button>
                                    <button className="buy-now">Buy Now</button>
                                    <button className="add-to-cart" onClick={handleAddToWishlist}>Wishlist Now</button>
                                </div>
                                <div className="product-details-description">
                                    <ul>
                                        <li> <b>Type : </b> Organic</li>
                                        <li> <b>MFG : </b> Jun 4.2024</li>
                                        <li> <b>MFG : </b> Jun 4.2024</li>
                                        <li> <b>SKU : </b> FWM15VKT</li>
                                        <li> <b>Tags : </b> Snack, Organic, Brown</li>
                                        <li> <b>Stock : </b>8 Items In Stock</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {isPopupVisible && (
                            <div className="popup">
                                <div className="popup-content">
                                    <p>{ddproduc.title} has been added to your cart successfully!</p>
                                    <button className="showpopupbutton" onClick={handleClosePopup}>OK</button>
                                </div>
                            </div>
                        )}
                        <div className="detailspage-descriptions-container">
                            <div className="detailspage-descriptions">
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
                            </div>
                        </div>
                    </div>
                    <div className="listing-wrapper">
                        <div className="sidebar-category-card">
                            <h3>Category</h3>
                            <div className="listing-catList">
                                {/* Loop through each category to display dynamically */}
                                {dailydealscategories.map((category) => (
                                    <div key={category.id} className="listing-catItem">
                                        <span className="catList-img">
                                            {/* Using category image */}
                                            <img src={category.imgcat} alt={category.name} width={30} />
                                        </span>
                                        <h4>{category.name}</h4>
                                        <span className="catList-stock">
                                            {/* Show the number of products in the category (stock count) */}
                                            {category.ddproducts.length}
                                        </span>
                                        <div className="listing-products">
                                            {category.ddproducts.map((product) => (
                                                <div key={product.id} className="listing-productItem">
                                                    <Link
                                                        to={`/product/${product.id}`} // Linking to the product page using product id
                                                        className="product-link"
                                                    >
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="listing-card">
                            <h3>Fill By Price</h3>
                            <div className="listing-catList">
                                <div className="listing-catItem">
                                    <div className="price-filter">
                                        <div>
                                            <label>Min Price: ${minPrice}</label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1000"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                                                className="slider"
                                            />
                                        </div>
                                        <div>
                                            <label>Max Price: ${maxPrice}</label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1000"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                                className="slider"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="filter-sidebar">
                                <h5>Color</h5>
                                <ul>
                                    <li>
                                        <label className="check-sider">
                                            <input
                                                className="input-sider"
                                                type="checkbox"
                                                checked={isChecked}
                                                color="success"
                                                onChange={handleCheckboxChange}
                                            />
                                            {/* Label for the checkbox */}
                                            {isChecked ? "Red" : "Red"}
                                        </label>
                                        {56}
                                    </li>
                                    <li>
                                        <label className="check-sider">
                                            <input
                                                className="input-sider"
                                                type="checkbox"
                                                checked={isChecked}
                                                color="success"
                                                onChange={handleCheckboxChange}
                                            />
                                            {/* Label for the checkbox */}
                                            {isChecked ? "Green" : "Green"}
                                        </label>
                                        {78}
                                    </li>
                                    <li>
                                        <label className="check-sider">
                                            <input
                                                className="input-sider"
                                                type="checkbox"
                                                checked={isChecked}
                                                color="success"
                                                onChange={handleCheckboxChange}
                                            />
                                            {/* Label for the checkbox */}
                                            {isChecked ? "Yellow" : "Yellow"}
                                        </label>
                                        {64}
                                    </li>
                                </ul>
                            </div>
                            <div className="filter-sidebar">
                                <h5>Item Condition</h5>
                                <ul>
                                    <li>
                                        <label className="check-sider">
                                            <input
                                                className="input-sider"
                                                type="checkbox"
                                                checked={isChecked}
                                                color="success"
                                                onChange={handleCheckboxChange}
                                            />
                                            {/* Label for the checkbox */}
                                            {isChecked ? "Red" : "Red"}
                                        </label>
                                        {56}
                                    </li>
                                    <li>
                                        <label className="check-sider">
                                            <input
                                                className="input-sider"
                                                type="checkbox"
                                                checked={isChecked}
                                                color="success"
                                                onChange={handleCheckboxChange}
                                            />
                                            {/* Label for the checkbox */}
                                            {isChecked ? "Green" : "Green"}
                                        </label>
                                        {78}
                                    </li>
                                    <li>
                                        <label className="check-sider">
                                            <input
                                                className="input-sider"
                                                type="checkbox"
                                                checked={isChecked}
                                                color="success"
                                                onChange={handleCheckboxChange}
                                            />
                                            {/* Label for the checkbox */}
                                            {isChecked ? "Yellow" : "Yellow"}
                                        </label>
                                        {64}
                                    </li>
                                </ul>
                            </div>
                            <div className="filter-button">
                                <i className="fa-solid fa-filter"></i>Filter
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
