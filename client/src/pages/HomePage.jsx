// src/pages/HomePage.jsx
import HeroSection from '../components/HeroSection/HeroSection';
import MainVideo from '../components/MainVideo/MainVideo';
import PortfolioSection from '../components/Portfolio/PortfolioSection';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">

      <MainVideo />

      <HeroSection />

      <PortfolioSection />

      {/* Future sections (featured, trending, etc.) go here */}
    </div>
  );
}