// src/components/HeroSection/HeroSection.jsx

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/MainHero.png';

import test1 from '../../assets/Images/product/women/test1.png';
import test2 from '../../assets/Images/product/women/test2.png';
import test3 from '../../assets/Images/product/women/test3.png';
import test4 from '../../assets/Images/product/women/test4.png';
import test1_alt from '../../assets/Images/product/women/test1_alt.jpg';
import test2_alt from '../../assets/Images/product/women/test2_alt.jpg';
import test3_alt from '../../assets/Images/product/women/test3_alt.jpg';
import test4_alt from '../../assets/Images/product/women/test4_alt.jpg';

import './HeroSection.css';

/* ─────────────────────────────────────────────
   PRODUCT DATA
───────────────────────────────────────────── */

const NEW_ARRIVALS = [
  {
    id: 1,
    name: 'High-Rise Faux Leather Trousers',
    image: test1,
    hoverImage: test1_alt,
    colors: ['#c8bca8', '#1a1a1a', '#8b6f5e'],
    slug: 'asymmetric-cape-coat',
  },
  {
    id: 2,
    name: 'Asymmetric Cape Coat',
    image: test2,
    hoverImage: test2_alt,
    colors: ['#b5a898', '#d4c8b8'],
    slug: 'wide-leg-suit-set',
  },
  {
    id: 3,
    name: 'Leather Cinched Blazer',
    image: test3,
    hoverImage: test3_alt,  
    colors: ['#4a2f1a', '#1a1a1a'],
    slug: 'leather-cinched-blazer',
  },
  {
    id: 4,
    name: 'Wide-Leg Suit Set',
    image: test4,
    hoverImage: test4_alt,
    colors: ['#1a1a1a'],
    slug: 'leather-trousers',
  },
  {
    id: 5,
    name: 'Draped Silk Midi Dress',
    image: test1,
    hoverImage: test1_alt,
    colors: ['#c9a87c', '#f1bcb8', '#ffffff'],
    slug: 'draped-silk-midi-dress',
  },
  {
    id: 6,
    name: 'Structured Shoulder Bag',
    image: test2,
    hoverImage: test2_alt,
    colors: ['#1a1a1a', '#8b6f5e'],
    slug: 'structured-shoulder-bag',
  },
];

const CARDS_PER_VIEW = 4;

/* ─────────────────────────────────────────────
   PRODUCT CARD (UNCHANGED)
───────────────────────────────────────────── */

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [activeColor, setActiveColor] = useState(0);

  return (
    <div
      className="hero-product-card"
      onClick={() => navigate(`/product/${product.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.slug}`)}
    >
      <div className="hero-card-image-stack ">
        <img
          src={product.image}
          alt={product.name}
          className="hero-card-image primary"
          draggable={false}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate`}
            className="hero-card-image hover"
            draggable={false}
          />
        )}
        
      </div>

      <div className="hero-card-info">
        <p className="hero-card-name">{product.name}</p>

        {product.colors.length > 0 && (
          <div className="hero-card-colors">
            {product.colors.map((hex, i) => (
              <button
                key={i}
                className={`hero-color-swatch ${
                  i === activeColor ? 'active' : ''
                }`}
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

  const displayProducts = [...NEW_ARRIVALS, ...NEW_ARRIVALS, ...NEW_ARRIVALS];

  const col1 = displayProducts.filter((_, i) => i % 4 === 0);
  const col2 = displayProducts.filter((_, i) => i % 4 === 1);
  const col3 = displayProducts.filter((_, i) => i % 4 === 2);
  const col4 = displayProducts.filter((_, i) => i % 4 === 3);

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

  // Math to move the columns. 
  // 'Up' columns start at 0% and move to -50% of their height.
  // 'Down' columns start at -50% of their height and move to 0%.
  const transformUp = `translateY(-${scrollProgress * 50}%)`;
  const transformDown = `translateY(-${50 - scrollProgress * 50}%)`;

  return (
    <section ref={containerRef} className="hero-scroll-container">
      {/* This element sticks to the screen */}
      <div className="hero-sticky-viewport">
        
        {/* Background Image */}
        <div
          className="hero-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <div className="hero-content">
          {/*}
          <div className="hero-heading">
            <h1 className="hero-title">New Arrivals</h1>
            <span className="hero-subtitle">Scroll to explore</span>
          </div>*/}

          <div className="hero-parallax-wrapper">
            
            {/* COLUMN 1: SCROLLS UP */}
            <div className="hero-column" style={{ transform: transformUp }}>
              {col1.map((product, idx) => (
                <ProductCard key={`${product.id}-${idx}-c1`} product={product} />
              ))}
            </div>

            {/* COLUMN 2: SCROLLS DOWN */}
            <div className="hero-column" style={{ transform: transformDown }}>
              {col2.map((product, idx) => (
                <ProductCard key={`${product.id}-${idx}-c2`} product={product} />
              ))}
            </div>

            {/* COLUMN 3: SCROLLS UP */}
            <div className="hero-column" style={{ transform: transformUp }}>
              {col3.map((product, idx) => (
                <ProductCard key={`${product.id}-${idx}-c3`} product={product} />
              ))}
            </div>

            {/* COLUMN 4: SCROLLS DOWN */}
            <div className="hero-column" style={{ transform: transformDown }}>
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