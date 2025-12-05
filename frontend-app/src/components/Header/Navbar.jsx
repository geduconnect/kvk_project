import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // Detect mobile to toggle on click
  const handleDropdownClick = () => {
    if (window.innerWidth <= 768) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <nav className="main-nav">
      <ul>
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>

        <li
          className="nav-item dropdown"
          onMouseEnter={() => window.innerWidth > 768 && setIsDropdownOpen(true)}
          onMouseLeave={() => window.innerWidth > 768 && setIsDropdownOpen(false)}
          onClick={handleDropdownClick} // Mobile click
        >
          <span>Shop</span>
          {isDropdownOpen && (
            <div className="mega-dropdown single-column">
              {Object.keys(groupedCategories).map((type) =>
                groupedCategories[type].map((cat) => (
                  <div className="dropdown-item" key={cat.id}>
                    <Link to={`/products-categories/${cat.name}`}>
                      {cat.name}
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}
        </li>

        <li className="nav-item">
          <Link to="/blogs">Blog</Link>
        </li>

        <li className="nav-item">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
