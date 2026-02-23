<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import './App.css';
=======
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';
>>>>>>> 7cc0d3e (New Update)

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<div>Product page coming soon</div>} />
        <Route path="/category/:cat" element={<div>Category page coming soon</div>} />
        <Route path="/category/:cat/:sub" element={<div>Subcategory page coming soon</div>} />
      </Routes>
  
    </BrowserRouter>
  );
<<<<<<< HEAD
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
=======
}
>>>>>>> 7cc0d3e (New Update)
