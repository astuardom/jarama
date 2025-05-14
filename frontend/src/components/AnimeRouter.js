import React, { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import DesignPage from '../pages/DesignPage';
import CartPage from '../pages/CartPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminDashboard from '../pages/AdminDashboard';

const AnimeRouter = () => {
  const { currentPage, productId } = useContext(NavigationContext);

  switch(currentPage) {
    case 'home':
      return <HomePage />;
    case 'tienda':
      return <ShopPage />;
    case 'disena':
      return <DesignPage />;
    case 'carrito':
      return <CartPage />;
    case 'producto':
      return <ProductDetailPage id={productId} />;
    case 'admin':
      return <AdminLoginPage />;
    case 'panel':
      return <AdminDashboard />;
    default:
      return <HomePage />;
  }
};

export default AnimeRouter;