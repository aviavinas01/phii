// src/context/StoreContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  // Global State
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState([]);

  // Load from LocalStorage on mount so data survives a refresh
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('opihage_cart')) || [];
    const savedLikes = JSON.parse(localStorage.getItem('opihage_likes')) || [];
    setCart(savedCart);
    setLikes(savedLikes);
  }, []);

  // Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('opihage_cart', JSON.stringify(cart));
  }, [cart]);

  // Save to LocalStorage whenever likes change
  useEffect(() => {
    localStorage.setItem('opihage_likes', JSON.stringify(likes));
  }, [likes]);

  // --- Cart Actions ---
  const addToCart = (product, size, quantity = 1) => {
    setCart(prev => {
      // Check if exact item & size exists
      const existingItem = prev.find(item => item.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map(item => 
          (item.id === product.id && item.size === size) 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  // --- Likes Actions ---
  const toggleLike = (product) => {
    setLikes(prev => {
      const isLiked = prev.some(item => item.id === product.id);
      if (isLiked) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <StoreContext.Provider value={{ cart, addToCart, removeFromCart, likes, toggleLike }}>
      {children}
    </StoreContext.Provider>
  );
};