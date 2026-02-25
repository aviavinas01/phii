import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PortfolioSection.css';

// IMPORT YOUR IMAGES HERE
import bridalImg from '../../assets/Images/Portfolio/Bridal_H.png'; 
import modernImg from '../../assets/Images/Portfolio/Modern_H.png';
import traditionalImg from '../../assets/Images/Portfolio/Traditional_H.png';
import avantGardeImg from '../../assets/Images/Portfolio/Avant_Garde.png';

const CATEGORIES = [
  {
    id: 'bridal',
    title: 'Bridal Collection',
    subtitle: 'BESPOKE',
    image: bridalImg,
    path: '/category/bridal',
    gridClass: 'item-bridal',
  },
  {
    id: 'modern',
    title: 'Modern Silhouette',
    subtitle: 'READY TO WEAR',
    image: modernImg,
    path: '/category/modern',
    gridClass: 'item-modern',
  },
  {
    id: 'traditional',
    title: 'Traditional Elegance',
    subtitle: 'HERITAGE',
    image: traditionalImg,
    path: '/category/traditional',
    gridClass: 'item-traditional',
  },
  {
    id: 'avant-garde',
    title: 'Avant-Garde',
    subtitle: 'EDITORIAL',
    image: avantGardeImg,
    path: '/category/avant-garde',
    gridClass: 'item-avant',
  },
];

export default function PortfolioSection() {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    // This observer watches elements and adds/removes the 'visible' class
    // based on whether they are in the screen or not (creating the scroll in/out effect)
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Removing the class when it leaves the screen makes it slide out
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.15, // Triggers when 15% of the image is visible
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before the very bottom
      }
    );

    const elements = document.querySelectorAll('.portfolio-card');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section className="portfolio-section">
      {/* HEADER AREA */}
      <div className="portfolio-header">
        <div className="portfolio-header-left">
          <span className="portfolio-eyebrow">SELECTED WORKS</span>
          <h2 className="portfolio-title">Portfolio</h2>
        </div>
        <button 
          className="portfolio-view-all"
          onClick={() => navigate('/collections')}
        >
          VIEW ALL PROJECTS &rarr;
        </button>
      </div>

      {/* GRID AREA */}
      <div className="portfolio-grid">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={`portfolio-card ${cat.gridClass}`}
            onClick={() => navigate(cat.path)}
          >
            <div className="portfolio-image-wrapper">
              <img src={cat.image} alt={cat.title} className="portfolio-img" />
              {/* Dark gradient overlay so text is always readable */}
              <div className="portfolio-overlay"></div> 
            </div>
            
            <div className="portfolio-text">
              <span className="portfolio-cat-subtitle">{cat.subtitle}</span>
              <h3 className="portfolio-cat-title">{cat.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}