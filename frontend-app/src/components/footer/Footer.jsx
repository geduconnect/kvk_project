import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Footer.css";
import footerImg from "../../assets/img/kvklogo1.png";

export const Footer = () => {
  const [categories, setCategories] = useState([]);

  const phoneNumber = "9308270123";
  const message = "Hello, I would like to Enquire about your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // ✅ Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Split categories if needed
  const peanutCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes("peanut")
  );

  const otherCategories = categories.filter(
    cat => !cat.name.toLowerCase().includes("peanut")
  );

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-area">
            <div className="footer-main">
              <div className="grid">

                {/* ✅ LOGO */}
                <div className="footer-about">
                  <div className="footer-logo">
                    <div className="footer-img">
                      <Link to="/">
                        <img src={footerImg} alt="footer-logo" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ✅ QUICK LINKS */}
                <div className="footer-widget">
                  <h3>Quick Links</h3>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/brands">Brands</Link></li>

                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </div>
                <div className="footer-widget">
                  <h3>Other Links</h3>
                  <ul>
                    <li><Link to="/profile">My Account</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/trackmyorder">Track Order</Link></li>
                  </ul>
                </div>

                {/* ✅ PEANUT PRODUCTS (DYNAMIC) */}


                {/* ✅ OUR PRODUCTS (DYNAMIC) */}
                <div className="footer-widget">
                  <h3>Our Products</h3>
                  <ul>
                    {otherCategories.length > 0 ? (
                      otherCategories.map((cat) => (
                        <li key={cat.id}>
                          <Link to={`/products-categories/${cat.name}`}>
                            {cat.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>No Products Available</li>
                    )}
                  </ul>
                </div>

                {/* ✅ CONTACT */}
                <div className="footer-widget">
                  <h3>Contact Us</h3>
                  <ul>
                    <li>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-square-whatsapp"></i> +91 930 -827-0123
                      </a>
                    </li>

                    <li>
                      <a href="mailto:krishivikashkendra@gmail.com">
                        <i className="fa fa-envelope"></i>
                        krishivikashkendra@gmail.com
                      </a>
                    </li>

                    <li>
                      <a href="https://www.google.com/maps?q=Jaipur">
                        <i className="fa fa-map-marker-alt"></i>
                        Chandwa, Latehar, Jharkhand
                      </a>
                    </li>
                  </ul>

                  {/* ✅ SOCIAL ICONS */}
                  <div className="footer-icon">
                    <a className="footer-item" href="#"><i className="fa-brands fa-facebook-f"></i></a>
                    <a className="footer-item" href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a className="footer-item" href="#"><i className="fa-brands fa-x-twitter"></i></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </footer>

      <div class="footer-bottom-wrapper">
        <div class="container">
          <div class="footer-row">
            <div class="footer-col-left">
              <p class="footer-copy">
                © 2026 <strong class="brand-text">KRISHI VIKASH KENDRA</strong> — All rights reserved.
              </p>
            </div>

            <div class="footer-col-center">
              <div class="hotline-item">
                <img src="assets/imgs/theme/icons/phone-call.svg" alt="hotline" />
                <p>+91 93082 70123 <span>8:00 AM – 10:00 PM</span></p>
              </div>

              <div class="hotline-item">
                <img src="assets/imgs/theme/icons/phone-call.svg" alt="hotline" />
                <p>+91 93082 70123 <span>24/7 Support</span></p>
              </div>
            </div>

            <div class="footer-col-right">
              <h6 class="footer-title">Follow Us</h6>
              <div class="footer-social">
                <a href="#"><img src="assets/imgs/theme/icons/icon-facebook-white.svg" alt="" /></a>
                <a href="#"><img src="assets/imgs/theme/icons/icon-twitter-white.svg" alt="" /></a>
                <a href="#"><img src="assets/imgs/theme/icons/icon-instagram-white.svg" alt="" /></a>
                <a href="#"><img src="assets/imgs/theme/icons/icon-pinterest-white.svg" alt="" /></a>
                <a href="#"><img src="assets/imgs/theme/icons/icon-youtube-white.svg" alt="" /></a>
              </div>
              {/* <p class="footer-subtext">Get 15% off on your first subscription</p> */}
            </div>

          </div>
        </div>
      </div>


    </>
  );
};
