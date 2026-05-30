// src/pages/CollectionPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CollectionPage.css';

// Mock product data based on image_4.png
const products = [
  { id: 1, name: 'NAAMI BAG', price: 395.00, imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=400', alternativeImageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=400' },
  { id: 2, name: 'MEDIUM BUCKET BAG', price: 450.00, imageUrl: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?q=80&w=400', alternativeImageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400' },
  { id: 3, name: 'MEDIUM BUCKET BAG', price: 450.00, imageUrl: 'https://images.unsplash.com/photo-1614179110397-033F53A04261?q=80&w=400', alternativeImageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400' },
  { id: 4, name: 'MINI BUCKET BAG', price: 365.00, imageUrl: 'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?q=80&w=400', alternativeImageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400' },
  { id: 5, name: 'MINI BUCKET BAG', price: 365.00, imageUrl: 'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?q=80&w=400', alternativeImageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400' },
  { id: 6, name: 'CANDY CROSSBODY', price: 375.00, imageUrl: 'https://images.unsplash.com/photo-1594633225954-9788d03429fc?q=80&w=400', alternativeImageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400' },
  { id: 7, name: 'CANDY CROSSBODY', price: 375.00, imageUrl: 'https://images.unsplash.com/photo-1614179110397-033F53A04261?q=80&w=400', alternativeImageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400' },
  { id: 8, name: 'LARGE TOTE', price: 595.00, imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=400', alternativeImageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=400' },
];

const CollectionPage = () => {
  return (
    <div className="collection-page">
      <header className="page-header">
        <div className="brand-logo">
          <Link to="/">DIVINE</Link>
        </div>
        <nav className="main-nav">
          <Link to="/">HOME</Link>
          <Link to="/handbags">HANDBAGS</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
        </nav>
        <div className="header-icons">
          <Link to="/account"><span className="icon">👤</span></Link>
          <Link to="/search"><span className="icon">🔍</span></Link>
          <Link to="/cart"><span className="icon">🛍️</span></Link>
        </div>
      </header>

      <main className="product-grid-container">
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CollectionPage;