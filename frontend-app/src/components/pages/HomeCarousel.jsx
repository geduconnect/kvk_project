import React, { useState, useEffect } from "react";
import "./HomeCarousel.css";
import sliderimage1 from "../../assets/img/banner1.jpeg";
import sliderimage2 from "../../assets/img/banner2.jpeg";
import sliderimage3 from "../../assets/img/banner3.jpeg";

export const HomeCarousel = ({ interval = 3000 }) => {
  const sliderimage = [
    { id: 1, image: sliderimage1 },
    { id: 2, image: sliderimage2 },
    { id: 3, image: sliderimage3 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderimage.length);
    }, interval);

    return () => clearInterval(autoSlide); // Cleanup on unmount
  }, [interval, sliderimage.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderimage.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderimage.length);
  };

  return (
    <div className="carousel_container">
      <div className="carousel_inner">
        {sliderimage.map((slideritem, index) => (
          <div
            key={slideritem.id}
            className={`carousel_item ${
              index === currentIndex ? "active_carousel" : ""
            }`}
          >
            <img src={slideritem.image} alt={`Slide ${slideritem.id}`} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button onClick={prevSlide} className="prevbutton">&#10094;</button>
      <button onClick={nextSlide} className="nextbutton">&#10095;</button>

      {/* Dots */}
      <div className="carousel__dots">
        {sliderimage.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
