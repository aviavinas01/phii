// src/components/HeroSection/HeroSection.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/HeroImage.png';

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
    name: 'Asymmetric Cape Coat',
    image: test1,
    hoverImage: test1_alt,
    colors: ['#c8bca8', '#1a1a1a', '#8b6f5e'],
    slug: 'asymmetric-cape-coat',
  },
  {
    id: 2,
    name: 'Wide-Leg Suit Set',
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
    name: 'High-Rise Faux Leather Trousers',
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
  /* OLD SLIDING STATE (REMOVED)
  const [offset, setOffset] = useState(0);
  */

  /* NEW PAGED FADE STATE */
  const [page, setPage] = useState(0);

  const maxPage =
    Math.ceil(NEW_ARRIVALS.length / CARDS_PER_VIEW) - 1;

  const startIndex = page * CARDS_PER_VIEW;
  const visibleProducts = NEW_ARRIVALS.slice(
    startIndex,
    startIndex + CARDS_PER_VIEW
  );

  const nextPage = () => setPage((p) => Math.min(p + 1, maxPage));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <section className="hero-section">
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      <div className="hero-content">
        <div className="hero-heading">
          <h1 className="hero-title">New Arrivals</h1>
          <span className="hero-subtitle">Shop now</span>
        </div>

        <div className="hero-catalog-wrapper">
          {/* PREV */}
          <button
            className={`hero-arrow hero-arrow--prev ${
              page === 0 ? 'hidden' : ''
            }`}
            onClick={prevPage}
          >
            &#8592;
          </button>

          {/* FADE CONTAINER */}
          <div className="hero-catalog-viewport">
            <div key={page} className="hero-catalog-fade">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* NEXT */}
          <button
            className={`hero-arrow hero-arrow--next ${
              page === maxPage ? 'hidden' : ''
            }`}
            onClick={nextPage}
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}