// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.imageUrl);

  // Function to show alternative image on hover
  const handleMouseEnter = () => {
    if (product.alternativeImageUrl) {
      setCurrentImage(product.alternativeImageUrl);
    }
  };

  // Function to revert to primary image on hover out
  const handleMouseLeave = () => {
    setCurrentImage(product.imageUrl);
  };

  return (
    <div 
      className="product-card" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={currentImage} 
            alt={product.name} 
            className="product-image" 
          />
        </div>
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;