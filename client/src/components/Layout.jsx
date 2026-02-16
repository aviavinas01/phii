import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollVisibility from '../Features/useScrollVisibility';
import './Layout.css';


const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isCategoryNavVisible = useScrollVisibility();

  // Categories for the second navbar (div4)
  const categories = [
    {
      id: 'feed',
      label: 'Feed',
      subcategories: [] // Will be populated later
    },
    {
      id: 'women',
      label: 'Women',
      subcategories: [] // Will be populated later
    },
    {
      id: 'men',
      label: 'Men',
      subcategories: [] // Will be populated later
    },
    {
      id: 'kids',
      label: 'Kids',
      subcategories: [] // Will be populated later
    },
    {
      id: 'home',
      label: 'Home',
      subcategories: [] // Will be populated later
    },
    {
      id: 'electronics',
      label: 'Electronics',
      subcategories: [] // Will be populated later
    },
    {
      id: 'pets',
      label: 'Pets',
      subcategories: [] // Will be populated later
    },
    {
      id: 'beauty',
      label: 'Beauty & Wellness',
      subcategories: [] // Will be populated later
    },
    {
      id: 'brands',
      label: 'Brands',
      subcategories: [] // Will be populated later
    },
    {
      id: 'parties',
      label: 'Parties',
      subcategories: [] // Will be populated later
    },
    {
      id: 'shows',
      label: 'Phii Shows',
      isHighlight: true,
      subcategories: [] // Will be populated later
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
    navigate(`/category/${categoryId}`);
  };

  const handleCategoryHover = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    // Only show dropdown if category has subcategories
    if (category && category.subcategories.length > 0) {
      setActiveDropdown(categoryId);
    }
  };

  const handleCategoryLeave = () => {
    // Small delay before closing to allow moving to dropdown
    setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <div className="parent">
      {/* Top Navbar - div3 */}
      <div className="div3">
        <nav className="top-navbar">
          {/* Left Section - Logo and Search */}
          <div className="navbar-left">
            {/* Logo */}
            <div className="logo" onClick={() => handleNavigation('/')}>
              <span className="logo-text">Phii</span>
            </div>

            {/* Professional Search Bar */}
            <form className="search-container" onSubmit={handleSearch}>
              <div className="search-wrapper">
                <svg 
                  className="search-icon" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search Listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Section - Navigation Icons */}
          <div className="navbar-right">
            {/* Offers */}
            <button 
              className="nav-item"
              onClick={() => handleNavigation('/offers')}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="18" cy="8" r="3" fill="#FF6B6B" stroke="white" strokeWidth="2"/>
                <text x="18" y="9.5" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">₹</text>
              </svg>
              <span className="nav-label">Offers</span>
            </button>

            {/* Bundles */}
            <button 
              className="nav-item"
              onClick={() => handleNavigation('/bundles')}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="nav-label">Bundles</span>
            </button>

            {/* My Likes */}
            <button 
              className="nav-item"
              onClick={() => handleNavigation('/likes')}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="nav-label">My Likes</span>
            </button>

            {/* News */}
            <button 
              className="nav-item"
              onClick={() => handleNavigation('/news')}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="nav-label">News</span>
            </button>

            {/* Profile */}
            <button 
              className="nav-item profile-item"
              onClick={() => handleNavigation('/profile')}
            >
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="nav-label">Profile</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Category Navbar - div4 */}
      <div className={`div4 ${isCategoryNavVisible? '' : 'nav-hidden'}`}>
        <nav className="category-navbar">
          <div className="category-container" ref={dropdownRef}>
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-wrapper"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={handleCategoryLeave}
              >
                <button
                  className={`category-button ${category.isHighlight ? 'highlight' : ''} ${activeDropdown === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.label}
                  {category.subcategories.length > 0 && (
                    <svg 
                      className="dropdown-arrow" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === category.id && category.subcategories.length > 0 && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      {category.subcategories.map((subcat, index) => (
                        <button
                          key={index}
                          className="dropdown-item"
                          onClick={() => handleNavigation(`/category/${category.id}/${subcat.slug}`)}
                        >
                          {subcat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content Area - div13 */}
      <div className="div13">
        {children}
      </div>
    </div>
  );
};

export default Layout;