import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import '../CategoryPage/CategoryPage.css'; // Re-use the beautiful category grid!

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      window.scrollTo(0, 0);

      // Search Supabase: Looks for the query in both the 'name' and 'description' columns
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error searching:", error);
      } else {
        setResults(data);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="category-page-wrapper">
      <header className="category-header">
        <span className="category-eyebrow">SEARCH RESULTS</span>
        <h1 className="category-title">"{query}"</h1>
        <p className="category-count">{results.length} Pieces Found</p>
      </header>

      {loading ? (
        <div className="category-loading"><p>SEARCHING ARCHIVES...</p></div>
      ) : results.length === 0 ? (
        <div className="category-empty">
          <h2>No matching pieces.</h2>
          <p>We couldn't find anything matching your search. Try different keywords.</p>
          <button onClick={() => navigate('/')} className="btn-return">
            RETURN :(
          </button>
        </div>
      ) : (
        <div className="category-grid">
          {results.map((product) => (
            <div 
              key={product.id} 
              className="category-product-card"
              onClick={() => navigate(`/product/${product.slug}`)}
            >
              <div className="cat-card-image-wrap">
                <img src={product.main_image} alt={product.name} className="cat-card-image primary" />
                {product.gallery_images && product.gallery_images.length > 0 && (
                  <img src={product.gallery_images[0]} alt="view" className="cat-card-image hover" />
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