// src/components/HeroSection/HeroSection.jsx

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/MainHero.png';
import './HeroSection.css';
import { supabase } from '../../supabaseClient';

/* ─────────────────────────────────────────────
   PRODUCT CARD (UNCHANGED)
───────────────────────────────────────────── */

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [activeColor, setActiveColor] = useState(0);

  const handleCardClick = () => {
    if (!product.slug) {
      console.error("Missing slug for product:", product.name);
      return;
    }
    window.scrollTo(0, 0); 
    navigate(`/products/${product.slug}`);
  };

  return (
    <div
      className="hero-product-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <div className="hero-card-image-stack ">
        <img src={product.image} alt={product.name} className="hero-card-image primary" draggable={false} />
        {product.hoverImage && (
          <img src={product.hoverImage} alt={`${product.name} alternate`} className="hero-card-image hover" draggable={false} />
        )}
      </div>

      <div className="hero-card-info">
        <p className="hero-card-name">{product.name}</p>

        {product.colors && product.colors.length > 0 && (
          <div className="hero-card-colors">
            {product.colors.map((hex, i) => (
              <button
                key={i}
                className={`hero-color-swatch ${i === activeColor ? 'active' : ''}`}
                style={{ background: hex }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColor(i);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION (FADE PAGINATION)
───────────────────────────────────────────── */

export default function HeroSection() {
const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    const fetchHeroProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_hero', true)
        .limit(16); 

      if (!error && data) {
        const liveProducts = data.map(item => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          image: item.main_image,
          hoverImage: item.gallery_images && item.gallery_images.length > 0 ? item.gallery_images[0] : null,
          colors: [] 
        }));
        setDisplayProducts(liveProducts);
      }
    };

    fetchHeroProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const maxScroll = rect.height - windowHeight;
      let scrolled = -rect.top;

      if (scrolled < 0) scrolled = 0;
      if (scrolled > maxScroll) scrolled = maxScroll;

      const progress = scrolled / maxScroll;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const col1 = displayProducts.filter((_, i) => i % 4 === 0);
  const col2 = displayProducts.filter((_, i) => i % 4 === 1);
  const col3 = displayProducts.filter((_, i) => i % 4 === 2);
  const col4 = displayProducts.filter((_, i) => i % 4 === 3);

  const transformUp = `translateY(-${scrollProgress * 150}vh)`;
  const transformDown = `translateY(${scrollProgress * 150}vh)`;

  return (
    <section ref={containerRef} className="hero-scroll-container">
      <div className="hero-sticky-viewport">
        <div className="hero-bg"aria-hidden="true"style={{ backgroundImage: `url(${heroImage})` }}/>
          <div className="hero-content">
              <div className="hero-heading">
                <h1 className="hero-title">Newly Arrived</h1>
                <span className="hero-subtitle">Shop now</span>
              </div>
              <div className="hero-parallax-wrapper">

                <div className="hero-column" style={{ transform: transformUp }}>
                  {col1.map((product, idx) => (
                    <ProductCard key={`${product.id}-${idx}-c1`} product={product} />
                  ))}
                </div>

                <div className="hero-column col-down" style={{ transform: transformDown }}>
                  {col2.map((product, idx) => (
                    <ProductCard key={`${product.id}-${idx}-c2`} product={product} />
                  ))}
                </div>

                <div className="hero-column" style={{ transform: transformUp }}>
                  {col3.map((product, idx) => (
                    <ProductCard key={`${product.id}-${idx}-c3`} product={product} />
                  ))}
                </div>

                <div className="hero-column col-down" style={{ transform: transformDown }}>
                  {col4.map((product, idx) => (
                    <ProductCard key={`${product.id}-${idx}-c4`} product={product} />
                  ))}
                </div>

            </div>
          </div>
      </div>
    </section>
  );
}
