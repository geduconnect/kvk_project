import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SelectCategories } from "./SelectCategories";
import { Topbar } from "./Topbar";
import Navbar from "./Navbar";
import "./Header.css";

import logonav from "../../assets/img/kvklogo1.png";
import adminprofuserimg from "../../assets/img/image.png";

import api from "../api.js";
import { useCustomerAuth } from "../../context/CustomerContext";

export const Header = () => {
  const [categoryItem, setCategoryItem] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { customer, logout, loading } = useCustomerAuth();

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategoryItem(data.map((c) => c.name));
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Fetch cart (COOKIE BASED — NO USER ID REQUIRED)
  useEffect(() => {
    const fetchCart = async () => {
      if (!customer) {
        setCartItems([]);
        return;
      }

      try {
        const { data } = await api.get("/cart");
        setCartItems(data || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [customer]);

  const cartCount = cartItems.reduce(
    (count, item) => count + (item.quantity || 0),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  // ✅ Proper logout + redirect
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  // ✅ Show loading safely
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

          <form className="search-container" role="search" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="search"
                className="search-form-control"
                placeholder="Search for items"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-search" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>

        </div>


        <div className="head-endpart">
          <div className="cart-icons">
            <span className="cart-elem">
              <Link to="/trackmyorder">
                <i class="fa-solid fa-truck"></i>
                <p>Track My Order</p>
              </Link>
            </span>
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
                    {/* <span className="cart-total">
                      ₹{cartTotal.toFixed(2)}
                    </span> */}
                  </div>
                )}
                <p>Cart</p>
              </Link>
            </span>
          </div>

          {/* ✅ AUTH SECTION */}
          <div className="cart-icons">
            {customer ? (

              <div className="topchild dropdown">
                <div className="profile-menu">
                  <span className="cart-elem">
                    <i className="fa-solid fa-user"></i>
                    <p>Welcome</p>
                  </span>


                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/profile">
                        <i className="fa-solid fa-user"></i> My Profile
                      </Link>
                    </li>

                    <li>
                      <button
                        className="logout-btn"
                        onClick={handleLogout}
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>{" "}
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="topchild">
                <Link to="/login">
                  <span className="cart-elem">
                    <i className="fa-solid fa-user"></i>
                    <p>Sign In</p>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Navbar />
    </header>
  );
};
