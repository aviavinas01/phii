import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

// Using your existing images as placeholders for the scroll column
import test1 from '../../assets/Images/product/women/test1.png';
import test2 from '../../assets/Images/product/women/test2.png';
import test3 from '../../assets/Images/product/women/test3.png';

// Mock Product Data
const PRODUCT_MOCK = {
  brand: "OPIHAGE",
  name: "Oversized Leather Jacket",
  price: "₹504,916",
  originalPrice: "$5,565",
  color: "Bronze",
  sizes: ["FR 34", "FR 36", "FR 38", "FR 40"],
  mainImage: test1,
  gallery: [test2, test3, test1, test2], // Array of images for the middle scroll
  description: "Opihage's leather jacket looks like an old favorite - the patina alone would take years to achieve. It's offset by a high funnel neck and elasticated trims, creating a piece that feels both polished and effortlessly lived in."
};

export default function ProductDetail() {
  const { slug } = useParams(); // Gets the product URL slug if you need to fetch real data later
  const [selectedSize, setSelectedSize] = useState(null);

  // Scroll to top when the page first loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pdp-wrapper">
      <div className="pdp-grid">
        
        {/* LEFT COLUMN: Fixed Main Image */}
        <div className="pdp-col-left sticky-col">
          <div className="pdp-main-image-container">
            <img src={PRODUCT_MOCK.mainImage} alt="Main Product" />
          </div>
        </div>

        {/* MIDDLE COLUMN: Scrollable Gallery */}
        <div className="pdp-col-middle scroll-col">
          {PRODUCT_MOCK.gallery.map((img, index) => (
            <div key={index} className="pdp-gallery-image">
              <img src={img} alt={`Gallery view ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Fixed Details & Cart Actions */}
        <div className="pdp-col-right sticky-col">
          <div className="pdp-details-container">
            <h1 className="pdp-brand">{PRODUCT_MOCK.brand}</h1>
            <p className="pdp-name">{PRODUCT_MOCK.name}</p>

            <div className="pdp-pricing">
              <span className="pdp-tag">RUNWAY</span>
              <p className="pdp-price">
                <strong>{PRODUCT_MOCK.originalPrice}</strong> / Approx. {PRODUCT_MOCK.price}
              </p>
            </div>

            <div className="pdp-color">
              <span>Color: </span> <strong>{PRODUCT_MOCK.color}</strong>
            </div>

            <div className="pdp-size-section">
              <div className="pdp-size-header">
                <span>Size:</span>
                <button className="pdp-size-guide">View size guide</button>
              </div>
              <div className="pdp-size-grid">
                {PRODUCT_MOCK.sizes.map((size) => (
                  <button 
                    key={size} 
                    className={`pdp-size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pdp-actions">
              <button className="btn-add-bag">Add to Bag</button>
              <button className="btn-wishlist">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add to Wish List
              </button>
            </div>

            <div className="pdp-accordion">
              <div className="pdp-accordion-header">
                <span>EDITORS' NOTES</span>
                <span className="pdp-chevron">^</span>
              </div>
              <p className="pdp-description">{PRODUCT_MOCK.description}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}