import React, { useState } from 'react';
import BrandFeedCard from './BrandFeedCard.jsx';
import './ThreeColumnLayout.css';

const ThreeColumnLayout = () => {
  const [likedItems, setLikedItems] = useState([]);

  // --- DATA SECTIONS ---

  const brands = [
    { id: 1, name: 'lululemon', filename: 'lulu.jpg' },
    { id: 2, name: 'J.CREW', filename: 'jcrew.jpg' },
    { id: 3, name: 'Abercrombie', filename: 'abercrombie.jpg' },
    { id: 4, name: 'LV', filename: 'lv.jpg' },
    { id: 5, name: 'Free people', filename: 'fp.jpg' },
    { id: 6, name: 'Chico', filename: 'chico.jpg' },
    { id: 7, name: 'Coach', filename: 'coach.jpg' },
    { id: 8, name: 'Sephora', filename: 'sephora.jpg' },
    { id: 9, name: 'Nike', filename: 'nike.jpg' },
  ];

  const myLikes = [
    { id: 1, message: '"Like" items to save them for later. Shop Now!' }
  ];

  const recentViews = [
    { id: 1, image: 'https://via.placeholder.com/150', name: 'Plaid Jacket' },
    { id: 2, image: 'https://via.placeholder.com/150', name: 'Red Dress' },
  ];

  const shows = [
    {
      id: 1,
      host: 'daddytofour',
      avatar: '👨',
      title: 'Daddy At Home Share Show',
      viewers: 21,
      live: true
    },
    {
      id: 2,
      host: 'katiegirlxoxo',
      avatar: '👩',
      title: 'Grab Your Coffee & Shop...',
      viewers: 23,
      live: true
    },
  ];

  const trends = {
    title: 'The Jeans Edit',
    description: "This is your sign to up your denim rotation.",
    items: [
      { id: 1, image: 'https://via.placeholder.com/150', name: 'Wide Leg' },
      { id: 2, image: 'https://via.placeholder.com/150', name: 'Bootcut' },
      { id: 3, image: 'https://via.placeholder.com/150', name: 'Barrel Leg' },
    ]
  };

  // --- FEED DATA (Correctly grouped for BrandFeedCard) ---
  const feedData = [
    {
      id: 1,
      brandName: "Chico's",
      products: [
        { id: 101, image: 'https://via.placeholder.com/300', title: 'Blue Pattern Blouse' },
        { id: 102, image: 'https://via.placeholder.com/300', title: 'Black Pattern Jacket' },
        { id: 103, image: 'https://via.placeholder.com/300', title: 'Striped Blue Top' },
        { id: 104, image: 'https://via.placeholder.com/300', title: 'Purple Sweater' },
      ]
    },
    {
      id: 2,
      brandName: "Lululemon",
      products: [
        { id: 201, image: 'https://via.placeholder.com/300', title: 'Align Leggings' },
        { id: 202, image: 'https://via.placeholder.com/300', title: 'Sports Bra' },
        { id: 203, image: 'https://via.placeholder.com/300', title: 'Scuba Hoodie' },
        { id: 204, image: 'https://via.placeholder.com/300', title: 'Belt Bag' },
      ]
    }
  ];

  const handleLike = (productId) => {
    setLikedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // --- RENDER ---
  return (
    <div className="three-column-container">
      
      {/* --- LEFT SIDEBAR (Fixed Width) --- */}
      <aside className="left-sidebar">
        {/* Brands Section */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3 className="section-title">Brands</h3>
            <button className="view-all-link">ALL BRANDS</button>
          </div>
          <div className="brands-grid" role="list">
             {brands.slice(0, 9).map((brand) => (
               <div key={brand.id} className="brand-image-wrapper">
                 {/* Using placeholder for demo since local images might fail */}
                 <img src="https://via.placeholder.com/50" alt={brand.name} className="brand-image" />
               </div>
             ))}
          </div>
        </div>

        {/* My Likes */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3 className="section-title">My Likes</h3>
            <button className="view-all-link">ALL LIKES</button>
          </div>
          <p style={{fontSize: '13px', color: '#666'}}>{myLikes[0].message}</p>
        </div>

        {/* Recent Views */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3 className="section-title">Recent Views</h3>
            <button className="view-all-link">VIEW ALL</button>
          </div>
          <div className="recent-views-grid" style={{display:'flex', gap:'10px'}}>
            {recentViews.map(item => (
              <img key={item.id} src={item.image} alt={item.name} style={{width:'60px', borderRadius:'4px'}} />
            ))}
          </div>
        </div>
      </aside>


      {/* --- CENTER CONTENT (Fluid Width) --- */}
      <main className="center-content">
        {feedData.map((brand,index) => (
          <BrandFeedCard 
            key={brand.id}
            brandData={brand}
            likedItems={likedItems}
            handleLike={handleLike}
            showPill={index===0}
          />
        ))}
      </main>


      {/* --- RIGHT SIDEBAR (Fixed Width) --- */}
      <aside className="right-sidebar">
        {/* Posh Shows */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3 className="section-title">Posh Shows</h3>
            <button className="view-all-link">ALL SHOWS</button>
          </div>
          <div className="shows-container">
            {shows.map(show => (
              <div key={show.id} className="show-card">
                <div className="show-thumbnail">
                   <div className="live-badge">LIVE</div>
                </div>
                <div className="show-info">
                   <div style={{fontWeight:'bold', fontSize:'13px'}}>{show.host}</div>
                   <div style={{fontSize:'12px', color:'#555'}}>{show.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trends */}
        <div className="sidebar-section">
          <div className="section-header">
            <h3 className="section-title">Today's Trends</h3>
          </div>
          <div className="trends-content">
            <h4 style={{fontSize:'14px', margin:'0 0 5px 0'}}>{trends.title}</h4>
            <p style={{fontSize:'12px', color:'#666', lineHeight:'1.4'}}>{trends.description}</p>
            <div style={{display:'flex', gap:'8px', marginTop:'10px'}}>
               {trends.items.map(item => (
                 <img key={item.id} src={item.image} style={{width:'30%', borderRadius:'4px'}} alt={item.name} />
               ))}
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
};

export default ThreeColumnLayout;