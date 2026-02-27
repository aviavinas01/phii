import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './LikesPage.css';

export default function LikesPage() {
  const navigate = useNavigate();
  const { likes, toggleLike } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="likes-page-wrapper">
      <header className="likes-header">
        <span className="likes-eyebrow">YOUR WISHLIST</span>
        <h1 className="likes-title">Saved Pieces</h1>
        <p className="likes-subtitle">{likes.length} {likes.length === 1 ? 'Item' : 'Items'}</p>
      </header>

      {likes.length === 0 ? (
        <div className="likes-empty">
          <h2>Your wishlist is empty.</h2>
          <p>Curate your favorite pieces by clicking the heart icon on any product.</p>
          <button onClick={() => navigate('/')} className="btn-return">
            DISCOVER THE VAULT
          </button>
        </div>
      ) : (
        <div className="likes-grid">
          {likes.map((product) => (
            <div key={product.id} className="likes-product-card">
              <div 
                className="likes-card-image-wrap"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                <img src={product.main_image} alt={product.name} className="likes-card-image" />
                
                {/* Remove from Wishlist Button */}
                <button 
                  className="likes-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents navigating to the product page when clicking the heart
                    toggleLike(product);
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="#cc0000" stroke="#cc0000">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="likes-card-details">
                <h3 className="likes-card-name">{product.name}</h3>
                <p className="likes-card-price">₹{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}