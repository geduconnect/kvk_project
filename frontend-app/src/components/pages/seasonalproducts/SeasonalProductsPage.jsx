import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import wishlistimg from "../../../assets/img/wishlist.png";
import dailydealscarouselbanner from "../../../assets/img/banner-4.png";
import previewimg from "../../../assets/img/eyeicon.jpg";
// import "./DailyDeals.css";
// import { dailydealscategories } from "./DDData";

export const SeasonalProductsPage = () => {
      const [selectedCategory, setSelectedCategory] = useState(0);
      const [currentIndex, setCurrentIndex] = useState(0);
      const [cardWidth, setCardWidth] = useState(250); // Dynamically calculate card width
      const productsPerPage = 4;
    
      const handleTabClick = (index) => {
        setSelectedCategory(index);
        setCurrentIndex(0); // Reset filter position to first product
      };
    
      const handleNext = () => {
        const categoryProducts = dailydealscategories[selectedCategory].ddproducts;
        if (currentIndex < categoryProducts.length - productsPerPage) {
          setCurrentIndex(currentIndex + 1);
        }
      };
    
      const handlePrev = () => {
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      };
      const currentCategory = dailydealscategories[selectedCategory];
      const displayedProducts = currentCategory.ddproducts.slice(
        currentIndex,
        currentIndex + productsPerPage
      );
      return (
        <div className="dailydeals-container">
          <div className="section-title">
<div className="line-mf"></div>
            <h2>Daily Deals</h2>
          </div>
          <div className="daily-deals">
            {/* Tabs Header */}
            <div className="dailydealstab-header">
              {dailydealscategories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => handleTabClick(index)}
                  className={index === selectedCategory ? "dailydealstab-active" : "dailydealstab"}
                >
                  {category.name}
                </button>
              ))}
            </div>
    
            {/* Carousel */}
            <div className="dailydeals-item">
              <div className="dailydeals-item-carousel">
                <img className="product-image" src={dailydealscarouselbanner} />
              </div>
              <div className="product-wrapper">
                <button onClick={handlePrev} disabled={currentIndex === 0} className="associate-button prev">
                  «
                </button>
                <div
                  className="dailydeals-content"
    
                >
                  {displayedProducts.map((ddproduct) => (
                    <div
                      key={ddproduct.id}
                      className="product-card"
                    >
                      <span className="product-badge">Hot</span>
                      <div className="product-imgcard">
                        <img
                          className="product-image"
                          src={ddproduct.pimage}
                          alt={ddproduct.title}
                        />
                        <div className="img_overlay">
                          <ul className="ddproduct-product-overlay">
                            <li className="ddproduct-item-overlay">
                              <img src={wishlistimg} alt="Wishlist" />
                            </li>
                            <Link to={`/daily-deals/${currentCategory.name}/${ddproduct.title}`}>
    
                              <li className="ddproduct-item-overlay">
                                <img src={previewimg} alt="Preview" />
                              </li>
                            </Link>
    
                          </ul>
                        </div>
                      </div>
                      <div className="ddproduct-contentcard">
                        <span className="catName">{currentCategory.name}</span>
                        <h2 className="ddproducts-name">{ddproduct.title}</h2>
                        <div className='product-ratings'>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star checked"></span>
                          <span className="fa fa-star"></span>
                          <span className="fa fa-star"></span>
                        </div>
                        <h6 className="ddproducts-description">
                          {ddproduct.pdescription}
                        </h6>
    
                        <div className="price">
                          <span className="original-price">{ddproduct.orgprice}</span>
                          <span className="discount-price">{ddproduct.disprice}</span>
                          <p>
                            <Link to={`/cartpage`}>
                              <button className="addtocart">
                                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                              </button>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleNext} disabled={currentIndex >= currentCategory.ddproducts.length - productsPerPage} className="associate-button next">
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    