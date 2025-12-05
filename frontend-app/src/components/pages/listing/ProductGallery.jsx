import React, { useState } from "react";

const ProductGallery = ({ product }) => {
  const [activeImage, setActiveImage] = useState(product.images?.[0] ? `http://localhost:8000${product.images[0]}` : null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y, visible: true });
  };
  const handleMouseLeave = () => setZoomPosition({ ...zoomPosition, visible: false });

  return (
    <>
      <div className="producat_wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {activeImage && <img src={activeImage} alt={product.name} className="detailshome-main-image" />}
        {zoomPosition.visible && (
          <div
            className="detailshome-image-zoom-lens"
            style={{ backgroundImage: `url(${activeImage})`, backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%` }}
          />
        )}
      </div>
      <div className="detailshome-image-gallery">
        {product.images?.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:8000${img}`}
            alt={`Product ${idx + 1}`}
            onClick={() => setActiveImage(`http://localhost:8000${img}`)}
            className={activeImage === `http://localhost:8000${img}` ? "detailshomeimageactive" : ""}
          />
        ))}
      </div>
    </>
  );
};

export default ProductGallery;
