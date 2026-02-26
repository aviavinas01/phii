
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

export default function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<div>Product page coming soon</div>} />
        <Route path="/category/:cat" element={<div>Category page coming soon</div>} />
        <Route path="/category/:cat/:sub" element={<div>Subcategory page coming soon</div>} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );

};


