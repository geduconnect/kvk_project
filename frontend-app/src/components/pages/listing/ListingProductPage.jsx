import { Link } from "react-router-dom";
import React from 'react';
import wishlistimg from '../../assets/wishlist.png'
import previewimg from '../../assets/eyeicon.jpg'
export const ListingProductPage = ({ catproducts1 }) => {
  return (
    <div className="product-card">
      <span className="product-badge">
        Hot
      </span>
      <div className="product-imgcard">
        <img className="product-image" src={catproducts1.pimage} alt={catproducts1.ptitle} />
        <div className="img_overlay">
          <ul className="list-product-overlay">
            <li className="list-item-overlay"><img src={wishlistimg} alt='Wishlist Image' /></li>
            <li className="list-item-overlay"><img src={previewimg} alt='Wishlist Image' /></li>
          </ul>
        </div>
      </div>


      <div className="product-contentcard">
        <span className="catName">{featuredcategory.name}</span>
        <h2 className="products-name">{catproducts1.ptitle}</h2>
        <div className='product-ratings'>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>
        <h6 className="products-description">{catproducts1.pdescription}</h6>

        <h6 className="products-description">By {catproducts1.vendorname}</h6>
        <div className="price">
          <span className='original-price'>{catproducts1.orgprice}</span>
          <span className='discount-price'>{catproducts1.disprice}</span>
          <p>
            <button className='addtocart'><i className="fa-solid fa-cart-shopping"></i>Add to Cart</button>
          </p>
        </div>

      </div>

    </div>
  );
};
