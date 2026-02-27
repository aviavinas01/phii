import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './CategoryPage.css';

// A simple dictionary to translate the URL slug into a beautiful page title
const CATEGORY_TITLES = {
  'bridal': 'Bridal Collection',
  'modern': 'Modern Silhouette',
  'traditional': 'Traditional Elegance',
  'avant-garde': 'Avant-Garde'
};

export default function CategoryPage() {
  const { categoryId } = useParams(); // Grabs 'bridal' or 'modern' from the URL
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Always scroll to top when opening a new category
    window.scrollTo(0, 0);

    // 2. Fetch the products for this specific category
    const fetchCategoryProducts = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryId) // 🔥 THIS IS THE MAGIC FILTER 🔥
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching category:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchCategoryProducts();
  }, [categoryId]); // Re-run if the user clicks a different category link

  // Get the beautiful title, or default to uppercase if it's a new category
  const displayTitle = CATEGORY_TITLES[categoryId] || categoryId.toUpperCase();

  if (loading) {
    return (
      <div className="category-loading">
        <p>CURATING COLLECTION...</p>
      </div>
    );
  }

  return (
    <div className="category-page-wrapper">
      <header className="category-header">
        <span className="category-eyebrow">EXPLORE</span>
        <h1 className="category-title">{displayTitle}</h1>
        <p className="category-count">{products.length} Pieces</p>
      </header>

      {products.length === 0 ? (
        <div className="category-empty">
          <h2>No pieces available.</h2>
          <p>We are currently curating new items for this collection.</p>
          <button onClick={() => navigate('/')} className="btn-return">
            RETURN :(
          </button>
        </div>
      ) : (
        <div className="category-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="category-product-card"
              onClick={() => navigate(`/product/${product.slug}`)}
            >
              <div className="cat-card-image-wrap">
                <img src={product.main_image} alt={product.name} className="cat-card-image primary" />
                {/* Optional Hover Image */}
                {product.gallery_images && product.gallery_images.length > 0 && (
                  <img src={product.gallery_images[0]} alt={`${product.name} alt`} className="cat-card-image hover" />
                )}
              </div>
              <div className="cat-card-details">
                <h3 className="cat-card-name">{product.name}</h3>
                <p className="cat-card-price">₹{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}