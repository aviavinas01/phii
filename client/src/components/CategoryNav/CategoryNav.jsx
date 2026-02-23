// src/components/CategoryNav/CategoryNav.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryNav.css';

/**
 * CATEGORIES CONFIG
 * Add/remove categories and their subcategories here freely.
 * Each subcategory: { label, slug }
 */
const CATEGORIES = [
  {
    id: 'women',
    label: 'Women',
    slug: 'women',
    subcategories: [
      { label: 'Dresses', slug: 'dresses' },
      { label: 'Tops & Blouses', slug: 'tops-blouses' },
      { label: 'Trousers', slug: 'trousers' },
      { label: 'Skirts', slug: 'skirts' },
      { label: 'Outerwear', slug: 'outerwear' },
      { label: 'Blazers', slug: 'blazers' },
      { label: 'Knitwear', slug: 'knitwear' },
      { label: 'Lingerie', slug: 'lingerie' },
      { label: 'Activewear', slug: 'activewear' },
      { label: 'Swimwear', slug: 'swimwear' },
    ],
  },
  {
    id: 'men',
    label: 'Men',
    slug: 'men',
    subcategories: [
      { label: 'Shirts', slug: 'shirts' },
      { label: 'T-Shirts', slug: 't-shirts' },
      { label: 'Trousers', slug: 'trousers-men' },
      { label: 'Jeans', slug: 'jeans' },
      { label: 'Suits', slug: 'suits' },
      { label: 'Outerwear', slug: 'outerwear-men' },
      { label: 'Knitwear', slug: 'knitwear-men' },
      { label: 'Activewear', slug: 'activewear-men' },
    ],
  },
  {
    id: 'kids',
    label: 'Kids',
    slug: 'kids',
    subcategories: [
      { label: 'Girls (0–7)', slug: 'girls-infant' },
      { label: 'Girls (8–14)', slug: 'girls-teen' },
      { label: 'Boys (0–7)', slug: 'boys-infant' },
      { label: 'Boys (8–14)', slug: 'boys-teen' },
      { label: 'School Uniforms', slug: 'school-uniforms' },
      { label: 'Baby Essentials', slug: 'baby-essentials' },
    ],
  },
  {
    id: 'beauty',
    label: 'Beauty',
    slug: 'beauty',
    subcategories: [
      { label: 'Serums', slug: 'serums' },
      { label: 'Moisturisers', slug: 'moisturisers' },
      { label: 'Cleansers', slug: 'cleansers' },
      { label: 'SPF & Suncare', slug: 'spf-suncare' },
      { label: 'Lip Care', slug: 'lip-care' },
      { label: 'Fragrance', slug: 'fragrance' },
      { label: 'Hair Care', slug: 'hair-care' },
      { label: 'Nail', slug: 'nail' },
    ],
  },
  {
    id: 'home',
    label: 'Home',
    slug: 'home',
    subcategories: [
      { label: 'Tables', slug: 'tables' },
      { label: 'Chairs', slug: 'chairs' },
      { label: 'Lighting', slug: 'lighting' },
      { label: 'Bedding', slug: 'bedding' },
      { label: 'Cushions', slug: 'cushions' },
      { label: 'Candles & Diffusers', slug: 'candles-diffusers' },
      { label: 'Storage', slug: 'storage' },
    ],
  },
  {
    id: 'gadgets',
    label: 'Gadgets',
    slug: 'gadgets',
    subcategories: [
      { label: 'Wearables', slug: 'wearables' },
      { label: 'Audio', slug: 'audio' },
      { label: 'Phone Accessories', slug: 'phone-accessories' },
      { label: 'Desk Tech', slug: 'desk-tech' },
      { label: 'Smart Home', slug: 'smart-home' },
      { label: 'Cameras', slug: 'cameras' },
    ],
  },
];

export default function CategoryNav() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(null);
  const closeTimer = useRef(null);

  const handleMouseEnter = (id) => {
    clearTimeout(closeTimer.current);
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    // small delay so moving from label → dropdown doesn't flicker
    closeTimer.current = setTimeout(() => setActiveId(null), 80);
  };

  const activeCategory = CATEGORIES.find((c) => c.id === activeId);

  return (
    <nav
      className="cat-nav"
      onMouseLeave={handleMouseLeave}
    >
      {/* Category labels row */}
      <ul className="cat-nav__list">
        {CATEGORIES.map((cat) => (
          <li
            key={cat.id}
            className={`cat-nav__item ${activeId === cat.id ? 'cat-nav__item--active' : ''}`}
            onMouseEnter={() => handleMouseEnter(cat.id)}
          >
            <button
              className="cat-nav__label"
              onClick={() => navigate(`/category/${cat.slug}`)}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Dropdown panel */}
      <div
        className={`cat-nav__dropdown ${activeId ? 'cat-nav__dropdown--open' : ''}`}
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={handleMouseLeave}
      >
        {activeCategory && (
          <div className="cat-nav__dropdown-inner">
            <p className="cat-nav__dropdown-heading">{activeCategory.label}</p>
            <ul className="cat-nav__sublist">
              {activeCategory.subcategories.map((sub) => (
                <li key={sub.slug}>
                  <button
                    className="cat-nav__subitem"
                    onClick={() => {
                      setActiveId(null);
                      navigate(`/category/${activeCategory.slug}/${sub.slug}`);
                    }}
                  >
                    {sub.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}