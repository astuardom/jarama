import React, { createContext, useState } from 'react';

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [productId, setProductId] = useState(null);

  const navigate = (page, id = null) => {
    setCurrentPage(page);
    if (id) setProductId(id);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, productId, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;