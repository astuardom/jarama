import React from 'react';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import DesignPage from '../pages/DesignPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import CartPage from '../pages/CartPage';

const Router = ({ currentPage, navigate }) => {
  switch(currentPage) {
    case 'home':
      return <HomePage navigate={navigate} />;
    case 'shop':
      return <ShopPage navigate={navigate} />;
    case 'design':
      return <DesignPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    case 'cart':
      return <CartPage />;
    default:
      return <HomePage navigate={navigate} />;
  }
};

export default Router;

// DONE