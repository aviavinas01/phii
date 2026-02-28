import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useStore } from '../../context/StoreContext';
import { useToast } from '../../context/ToastContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams(); 
  const { addToCart, toggleLike, likes } = useStore();
  const { showToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [selectedSize, setSelectedSize] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      setLoading(true);
      console.log("Fetching for slug:", slug); // Debug 1
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  //  Sleek Loading State
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#ffffff', color: '#e5d0b3', letterSpacing: '0.2em' }}>
        loading...
      </div>
    );
  }

  //  Product Not Found State
  if (!product) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a', color: '#fff' }}>
        <h2 style={{ fontFamily: '"League Script", serif', fontSize: '3rem', color: '#e5d0b3', margin: 0 }}>Item Unavailable</h2>
        <p style={{ letterSpacing: '0.2em', color: '#666', marginTop: '10px' }}>This piece is no longer in the vault.</p>
        <Link to="/" style={{ color: '#e5d0b3', marginTop: '30px', textDecoration: 'none', borderBottom: '1px solid' }}>RETURN TO SHOWROOM</Link>
      </div>
    );
  }
  const isLiked = product ? likes.some(item => item.id === product.id) : false;
   const mockGallery = product.gallery_images && product.gallery_images.length > 0 
    ? product.gallery_images 
    : [product.main_image, product.main_image, product.main_image];

  return (
    <div className="pdp-wrapper">
      <div className="pdp-grid">
        
        {/* LEFT COLUMN: Fixed Main Image */}
        <div className="pdp-col-left sticky-col">
          <div className="pdp-main-image-container" style={{ position: 'relative' }}>
            <img src={product.main_image} alt={product.name} />
            <button 
              className={`image-like-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => toggleLike(product)}
            >
              <svg viewBox="0 0 24 24" fill={isLiked ? "#cc0000" : "none"} stroke={isLiked ? "#cc0000" : "currentColor"}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* MIDDLE COLUMN: Scrollable Gallery */}
        <div className="pdp-col-middle scroll-col">
          {mockGallery.map((img, index) => (
            <div key={index} className="pdp-gallery-image">
              <img src={img} alt={`Gallery view ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Fixed Details & Cart Actions */}
        <div className="pdp-col-right sticky-col">
          <div className="pdp-details-container">
            {/* Hardcoding OPIHAGE as the brand, or use product.brand if you add it to the DB */}
            <p className="pdp-name">{product.name}</p>

            <div className="pdp-pricing">
              <span className="pdp-tag">{product.category.toUpperCase()}</span>
              <p className="pdp-price">
                {product.original_price && (
                  <strong style={{ textDecoration: 'line-through', marginRight: '10px', color: '#666' }}>
                    ₹{product.original_price.toLocaleString()}
                  </strong>
                )}
                ₹{product.price.toLocaleString()}
              </p>
            </div>

            <div className="pdp-color">
              <span>Color: </span> <strong>{product.color}</strong>
            </div>

            <div className="pdp-size-section">
              <div className="pdp-size-header">
                <span>Size:</span>
                <button className="pdp-size-guide" onClick={() => setIsSizeGuideOpen(true)}>
                  View size guide
                </button>
              </div>
              <div className="pdp-size-grid">
                {/* Dynamically map the sizes from the database array */}
                {product.sizes && product.sizes.map((size) => (
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
              <button 
                className="btn-add-bag"
                onClick={() => {
                  if (!selectedSize) {
                    showToast("Please select a size first.");
                    return;
                  }
                  addToCart(product, selectedSize, 1);
                  showToast("Added to your bundle!");
                }}
              >
                Add to Bag
              </button>
            </div>

            <div className="pdp-accordion">
              <div className="pdp-accordion-header">
                <span>EDITORS' NOTES</span>
                <span className="pdp-chevron">^</span>
              </div>
              <p className="pdp-description">{product.description}</p>
            </div>
          </div>
        </div>
                  {/* ─────────────────────────────────────────────
          SIZE GUIDE MODAL
      ───────────────────────────────────────────── */}
      {isSizeGuideOpen && (
        <div className="size-modal-overlay" onClick={() => setIsSizeGuideOpen(false)}>
          {/* e.stopPropagation() stops clicks inside the white box from closing the modal */}
          <div className="size-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="size-modal-close" onClick={() => setIsSizeGuideOpen(false)}>
              &times;
            </button>
            
            <h2 className="size-modal-title">Size Guide</h2>
            <p className="size-modal-subtitle">Measurements are displayed in inches.</p>

            <div className="size-table-wrapper">
              <table className="size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>US</th>
                    <th>UK</th>
                    <th>Bust</th>
                    <th>Waist</th>
                    <th>Hips</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>XS</td><td>2</td><td>6</td><td>32"</td><td>24"</td><td>35"</td></tr>
                  <tr><td>S</td><td>4</td><td>8</td><td>34"</td><td>26"</td><td>37"</td></tr>
                  <tr><td>M</td><td>6</td><td>10</td><td>36"</td><td>28"</td><td>39"</td></tr>
                  <tr><td>L</td><td>8</td><td>12</td><td>38"</td><td>30"</td><td>41"</td></tr>
                  <tr><td>XL</td><td>10</td><td>14</td><td>40"</td><td>32"</td><td>43"</td></tr>
                </tbody>
              </table>
            </div>
            
            <div className="size-modal-footer">
              <p>Need further assistance? <a href="/contact" style={{color: '#1a1a1a'}}>Contact our styling team.</a></p>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}