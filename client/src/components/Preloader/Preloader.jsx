// src/components/Preloader/Preloader.jsx
import React, { useState, useEffect } from 'react';
import './Preloader.css';

// 1. IMPORT YOUR HEAVIEST ASSETS HERE INSTEAD OF APP.JSX
import heroImage from '../../assets/MainHero.png';
import test1 from '../../assets/Images/product/women/test1.png';

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // ASSET MANAGER LOGIC
    const loadAssets = async () => {
      // Add the images you imported above into this array
      const imageAssets = [heroImage, test1]; 

      // Download them secretly in the background
      const cacheImages = imageAssets.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
      });

      // Force exactly 2 seconds of loading so your luxury animation gets seen
      const minTime = new Promise(resolve => setTimeout(resolve, 2000));

      // Wait for everything to finish
      await Promise.all([...cacheImages, minTime]);
      
      // Trigger the burst out animation
      setIsLoaded(true);
    };

    loadAssets();
  }, []);

  // EXIT ANIMATION LOGIC
  useEffect(() => {
    if (isLoaded) {
      // Wait 800ms for the CSS 'burst' transition to finish, then delete the component
      const timer = setTimeout(() => setHidden(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // If it's completely done, render absolutely nothing
  if (hidden) return null;

  return (
    <div className={`preloader-wrapper ${isLoaded ? 'burst-out' : ''}`}>
      <div className="preloader-logo">opihage</div>
    </div>
  );
}