import React from 'react';
import './BrandFeedCard.css'; // We will define this next

const BrandFeedCard = ({ brandData, likedItems, handleLike, showPill }) => {
  const { brandName = "Brand", products = [] } = brandData || {};
  // Get only the first 4 products for the 2x2 grid
  const displayProducts = products.slice(0, 4);

  if (!brandData) return null;

  return (
    <div className="feed-card-wrapper">
      
      {showPill && (
      <div className="floating-pill-container">
        <button className="new-feed-pill">
          <svg className="arrow-up-icon" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 4l-8 8h5v8h6v-8h5z"/>
          </svg>
          New Feed Items
        </button>
      </div>
      )}

      {/* 2. The Main Box Content */}
      <div className="brand-card-content">
        
        {/* Brand Header */}
        <div className="brand-header">
          <h2 className="brand-title">{brandName}</h2>
          <span className="listing-count">{products.length} New Listings</span>
        </div>

        {/* 2x2 Picture Grid */}
        <div className="brand-grid">
          {displayProducts.map((product) => (
            <div key={product.id} className="grid-item">
              <div className="image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="grid-image" 
                />
                
                {/* Like Button Overlay */}
                <button 
                  className={`grid-like-btn ${likedItems.includes(product.id) ? 'liked' : ''}`}
                  onClick={() => handleLike(product.id)}
                >
                   <svg viewBox="0 0 24 24" fill={likedItems.includes(product.id) ? "currentColor" : "none"} stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom "Shop More" Button */}
        <button className="shop-more-button">
          SHOP {brandName.toUpperCase()}: JUST IN
        </button>

      </div>
    </div>
  );
};

export default BrandFeedCard;