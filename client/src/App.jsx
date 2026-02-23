
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar/Navbar';


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

};


