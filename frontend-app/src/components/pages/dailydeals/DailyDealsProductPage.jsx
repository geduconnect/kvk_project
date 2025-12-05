import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import wishlistimg from "../../../assets/img/wishlist.png";
import previewimg from "../../../assets/img/eyeicon.jpg";
import "./DailyDeals.css";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

export const DailyDealsProductPage = () => {
  const { categoryName, productName } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [inputValue, setInputValue] = useState(1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/daily-deals/${categoryName}/${productName}`
        );
        setProduct(res.data);
        setActiveImage(res.data.images?.[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [categoryName, productName]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.daily_deal_price || product.price,
      quantity: inputValue,
    });
    setIsPopupVisible(true);
  };

  const handleAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      title: product.title,
      price: product.daily_deal_price || product.price,
      quantity: inputValue,
    });
  };

  const handleClosePopup = () => setIsPopupVisible(false);

  const plus = () => setInputValue(prev => prev + 1);
  const minus = () => setInputValue(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="details-home">
      <div className="breadcumbwrapper">
        <div className="container-fluid">
          <ul className="breadcumb-content">
            <h1>{product.title}</h1>
          </ul>
        </div>
      </div>

      <div className="detailspage-row">
        <div className="detailspage-cont">
          <div className="details-left">
            <div className="producat_wrapper">
              <div className="detailshome-main-image-container">
                <img
                  src={activeImage}
                  alt="Active Product"
                  className="detailshome-main-image"
                />
              </div>
              <div className="detailshome-image-gallery">
                {product.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Product ${idx + 1}`}
                    className={activeImage === img ? "detailshomeimageactive" : ""}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            </div>

            <div className="product-details">
              <h1>{product.title}</h1>
              <p>{product.pdescription}</p>
              <div className="products-pricing">
                <span className="old-price">{product.orgprice}</span>
                <span className="discount-price">
                  ₹{product.daily_deal_price || product.price}
                </span>
              </div>

              <div className="product-quantity">
                <button onClick={minus}>-</button>
                <input
                  type="number"
                  value={inputValue}
                  onChange={e => setInputValue(parseInt(e.target.value) || 1)}
                  min="1"
                />
                <button onClick={plus}>+</button>
              </div>

              <div className="product-details-button">
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleAddToWishlist}>Wishlist Now</button>
              </div>
            </div>
          </div>
        </div>

        {isPopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <p>{product.title} has been added to your cart successfully!</p>
              <button onClick={handleClosePopup}>OK</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
