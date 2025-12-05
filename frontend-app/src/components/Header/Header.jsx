import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SelectCategories } from "./SelectCategories";
import { Topbar } from "./Topbar";
import Navbar from "./Navbar";
import "./Header.css";

import logonav from "../../assets/img/kvklogo1.png";
import adminprofuserimg from "../../assets/img/image.png";
import api from "../api.js"; // use centralized axios
import { useCustomerAuth } from "../../context/CustomerContext";
import { AuthTest } from "../auth/AuthTest.jsx";

export const Header = () => {
  const [categoryItem, setCategoryItem] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Safe destructure with default
  const { customer, logout, loading } = useCustomerAuth();

  // ✅ Always call hooks, don't conditionally call them
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories", { withCredentials: true });
        setCategoryItem(data.map((c) => c.name));
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (!customer) return;
      try {
        const { data } = await api.get(`/cart/${customer.id}`, { withCredentials: true });
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [customer]);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // ✅ Show loading placeholder while checking auth
  if (loading) return <div>Loading...</div>;

  return (
    <header className="site-header">
      <Topbar />

      <div className="top-brand">
        <div className="nav-logo">
          <Link to="/">
            <img src={logonav} alt="KVK Logo" />
          </Link>
        </div>

        <div className="categories-cont">
          <div className="category-box categories-dropdown">
            <SelectCategories categoriesData={categoryItem} />
          </div>
          <div className="search-container" role="search">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search for items"
                aria-label="Search"
              />
              <button className="btn btn-search" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="head-endpart">
          <div className="cart-icons">
            <span className="cart-elem">
              <Link to="/wishlist">
                <i className="fa-solid fa-heart"></i>
                <p>Wishlist</p>
              </Link>
            </span>

            <span className="cart-elem">
              <Link to="/cartpage">
                <i className="fa-solid fa-cart-shopping"></i>
                {cartCount > 0 && (
                  <div className="cart-info">
                    <span className="cart-count">{cartCount}</span>
                    <span className="cart-total">₹{cartTotal.toFixed(2)}</span>
                  </div>
                )}
              </Link>
              <p>Cart</p>
            </span>
          </div>

          <div className="cart-icons">
            {customer ? (
              <li className="topchild dropdown">
                <div className="profile-menu">
                  <img src={adminprofuserimg} alt="Profile" />
                  <p>Welcome, {customer.name}</p>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/profile">
                        <i className="fa-solid fa-user"></i> My Profile
                      </Link>
                    </li>
                    <li>
                      <button className="logout-btn" onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            ) : (
              <li className="topchild">
                <Link to="/login">
                  <img src={adminprofuserimg} alt="Sign In" />
                  <p>Sign In</p>
                </Link>
              </li>
            )}
          </div>
        </div>
      </div>

      <Navbar />
      {/* <AuthTest /> */}
    </header>
  );
};
