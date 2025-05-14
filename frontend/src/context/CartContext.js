import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('animeCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    localStorage.setItem('animeCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size = 'M', quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item._id === product._id && item.size === size
      );
  
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
  
      return [...prevItems, { ...product, size, quantity }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        clearCart,
        shippingCost,
        setShippingCost
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

