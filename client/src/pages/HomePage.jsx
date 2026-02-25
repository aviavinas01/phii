// src/pages/HomePage.jsx
import HeroSection from '../components/HeroSection/HeroSection';
import MainVideo from '../components/MainVideo/MainVideo';
import CategoryNav from '../components/CategoryNav/CategoryNav';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">

      <MainVideo />

      <HeroSection />

      <div className="home-cat-bar">
        <CategoryNav />
      </div>

      {/* Future sections (featured, trending, etc.) go here */}
    </div>
  );
}