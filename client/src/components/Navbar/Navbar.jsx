import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navTheme, setNavTheme] = useState('theme-video');
  const [searchQuery, setSearchQuery] = useState('');
  const isHomePage = location.pathname === '/';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

useEffect(() => {

    if (!isHomePage) {
      setNavTheme('theme-portfolio'); 
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (scrollY < vh - 60) {
        setNavTheme('theme-video');
      } 

      else if (scrollY >= vh - 60 && scrollY < vh * 4) {
        setNavTheme('theme-hero');
      } 

      else {
        setNavTheme('theme-portfolio');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the search is open, AND the click happened outside of our referenced container...
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false); // ...close the search bar
      }
    };

    // Only add the event listener if the search bar is actually open
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener so it doesn't cause memory leaks
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      navigate(`/search?q=${searchQuery}`);
      setIsSearchOpen(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    // Apply the dynamic theme class here instead of the old boolean check
    <div className={`div3 ${navTheme}`}>
      <nav className="top-navbar">
        <div className="navbar-left">
          <div className="logo" onClick={() => handleNavigation('/')}>
            <span className="logo-text">opihage</span>
          </div>
        </div>

        {/* Right Section - Navigation Icons */}
        <div className="navbar-right">
          <div className="search-expandable-container" ref={searchRef}>
            <form 
              className={`search-slide-wrapper ${isSearchOpen ? 'open' : ''}`} 
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="search-input-slide"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button type="button" className="clear-search" onClick={() => setSearchQuery('')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </form>

            <button 
              className="nav-item" 
              onClick={() => setIsSearchOpen(!isSearchOpen)} // Toggles the bar
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="1.5" />
                <path d="m21 21-4.35-4.35" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="nav-label"></span>
            </button>
          </div>

          <button className="nav-item" onClick={() => handleNavigation('/bundles')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="3" y1="6" x2="21" y2="6" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="nav-label"></span>
          </button>

          <button className="nav-item" onClick={() => handleNavigation('/likes')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="nav-label"></span>
          </button>

          <button className="nav-item profile-item" onClick={() => handleNavigation('/profile')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="nav-label"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
