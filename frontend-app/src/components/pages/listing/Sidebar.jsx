import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ categories }) => (
  <div className="listing-wrapper">
    <div className="sidebar-category-card">
      <h3>Categories</h3>
      <div className="listing-catList">
        {categories.map((cat) => (
          <div key={cat.id} className="listing-catItem">
            <h4>{cat.name}</h4>
            <span className="catList-stock">{cat.product_count || 0}</span>
            <div className="listing-products">
              {cat.products?.map((prod) => (
                <div key={prod.id} className="listing-productItem">
                  <Link to={`/products-categories/${cat.name}/${prod.id}`} className="product-link">{prod.name}</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Sidebar;
