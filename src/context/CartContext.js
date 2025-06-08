import React, { createContext, useState, useEffect } from 'react';

// Kreiraj kontekst
export const CartContext = createContext();

// Provider komponenta
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Dodaj sve podatke koji su potrebni u Cart.js
      const minimalProduct = {
        id: product.id,
        name: product.name,
        quantity: 1,
        prices: product.prices || {},
        image: product.image || '',
        description: product.description || '',
      };
      updatedCart = [...cartItems, minimalProduct];
    }

    try {
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Greška pri spremanju u localStorage:", error);
      alert("Korpa je puna ili je došlo do greške.");
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
