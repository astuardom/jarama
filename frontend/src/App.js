import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AnimeNavbar from './components/AnimeNavbar';
import AnimeFooter from './components/AnimeFooter';
import { NavigationProvider } from './context/NavigationContext';
import { CartProvider } from './context/CartContext';

import AdminLayout from './admin/AdminLayout';
import AdminLoginPage from './pages/AdminLoginPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import DesignPage from './pages/DesignPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <AnimeNavbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tienda" element={<ShopPage />} />
          <Route path="/disena" element={<DesignPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              localStorage.getItem('isAdmin') === 'true' ? (
                <AdminLayout />
              ) : (
                <AdminLoginPage />
              )
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <AnimeFooter />}
    </>
  );
};

const App = () => {
  return (
    <NavigationProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-100">
            <AppContent />
          </div>
        </Router>
      </CartProvider>
    </NavigationProvider>
  );
};

export default App;
