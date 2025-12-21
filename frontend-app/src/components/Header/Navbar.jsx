import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const groupedCategories = categories.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];
    acc[cat.type].push(cat);
    return acc;
  }, {});

  const handleDropdownClick = (setter) => {
    if (window.innerWidth <= 768) {
      setter((prev) => !prev);
    }
  };

  return (
    <>
      {/* === MOBILE MENU BUTTON === */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
        <ul>
          <li className="nav-item">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          </li>

          {/* SHOP DROPDOWN */}
          <li
            className="nav-item dropdown"
            onMouseEnter={() => window.innerWidth > 768 && setIsDropdownOpen(true)}
            onMouseLeave={() => window.innerWidth > 768 && setIsDropdownOpen(false)}
            onClick={() => handleDropdownClick(setIsDropdownOpen)}
          >
            <span>Shop</span>

            {isDropdownOpen && (
              <div className="mega-dropdown single-column">
                {Object.keys(groupedCategories).map((type) =>
                  groupedCategories[type].map((cat) => (
                    <div className="dropdown-item" key={cat.id}>
                      <Link
                        to={`/products-categories/${cat.name}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </li>

          {/* BLOG */}
          <li className="nav-item">
            <Link to="/blogs" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          </li>

          {/* PAGES DROPDOWN */}
          <li
            className="nav-item dropdown"
            onMouseEnter={() => window.innerWidth > 768 && setIsDropdownOpen1(true)}
            onMouseLeave={() => window.innerWidth > 768 && setIsDropdownOpen1(false)}
            onClick={() => handleDropdownClick(setIsDropdownOpen1)}
          >
            <span>Pages</span>

            {isDropdownOpen1 && (
              <div className="mega-dropdown single-column">
                <div className="dropdown-item">
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                </div>
                <div className="dropdown-item">
                  <Link to="/brands" onClick={() => setMobileMenuOpen(false)}>Brands</Link>
                </div>
                <div className="dropdown-item">
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                </div>
                <div className="dropdown-item">
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
                </div>
              </div>
            )}
          </li>

          <li className="nav-item">
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
