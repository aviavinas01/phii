// src/pages/HomePage.jsx
import HeroSection from '../components/HeroSection/HeroSection';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import Navbar from '../components/Navbar/Navbar';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
 
      <HeroSection />

      <div className="home-cat-bar">
        <CategoryNav />
      </div>

      {/* Future sections (featured, trending, etc.) go here */}
    </div>
  );
}