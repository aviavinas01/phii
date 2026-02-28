
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/AdminRoute/AdminRoute';
import AdminLogin from './pages/Admin/AdminLogin';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import SearchPage from './pages/SearchPage/SearchPage';
import BundlesPage from './pages/BundlesPage/BundlesPage';
import LikesPage from './pages/LikesPage/LikesPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import TermsPage from './pages/TermsPage/TermsPage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<div>Product page coming soon</div>} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bundles" element={<BundlesPage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );

};


