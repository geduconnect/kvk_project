import React from 'react';
import wishlistimg from '../../../assets/img/wishlist.png'
import previewimg from '../../../assets/img/eyeicon.jpg'
export const ProductPage = ({ fcpproduct }) => {
  return (
    <div className="product-card">
      <span className="product-badge">
        Hot
      </span>
      <div className="product-imgcard">
        <img className="product-image" src={fcpproduct.pimage} alt={fcpproduct.ptitle} />
        <div className="img_overlay">
          <ul className="list-product-overlay">
            <li className="list-item-overlay"><img src={wishlistimg} alt='Wishlist Image' /></li>
            <li className="list-item-overlay"><img src={previewimg} alt='Wishlist Image' /></li>
          </ul>
        </div>
      </div>


      <div className="product-contentcard">
        <span className="catName">hhjjvh</span>
        <h2 className="products-name">{fcpproduct.name}</h2>
        <div className='product-ratings'>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>

        <h6 className="products-description">{fcpproduct.pdescription}</h6>
        <div className="price">
          <span className='original-price'>{fcpproduct.orgprice}</span>
          <span className='discount-price'>{fcpproduct.disprice}</span>
          <p>
            <button className='addtocart'><i className="fa-solid fa-cart-shopping"></i>Add to Cart</button>
          </p>
        </div>

      </div>

    </div>
  );
};
