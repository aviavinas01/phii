import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import './App.css';

// Placeholder pages for other routes
const OffersPage = () => (
  <div className="page-wrapper">
    <div className="page-container">
      <h1>Special Offers</h1>
      <p>All your offers and deals will be displayed here</p>
    </div>
  </div>
);

const BundlesPage = () => (
  <div className="page-wrapper">
    <div className="page-container">
      <h1>Product Bundles</h1>
      <p>Bundle offers will be shown here</p>
    </div>
  </div>
);

const LikesPage = () => (
  <div className="page-wrapper">
    <div className="page-container">
      <h1>My Likes</h1>
      <p>Your liked/favorited products will appear here</p>
    </div>
  </div>
);

const NewsPage = () => (
  <div className="page-wrapper">
    <div className="page-container">
      <h1>News & Updates</h1>
      <p>Latest news and product updates</p>
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="page-wrapper">
    <div className="page-container">
      <h1>My Profile</h1>
      <p>User profile and account settings</p>
    </div>
  </div>
);

const CategoryPage = () => {
  const categoryId = window.location.pathname.split('/')[2];
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <h1>{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h1>
        <p>Products in this category will be displayed here</p>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q');
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <h1>Search Results</h1>
        <p>Showing results for: <strong>{query}</strong></p>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/bundles" element={<BundlesPage />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/category/:categoryId/:subcategory" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
