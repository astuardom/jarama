import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

const Navigation = () => {
  const { navigate } = useContext(NavigationContext);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    setCartItemsCount(3);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { page: 'home', name: 'Inicio', icon: '🏠' },
    { page: 'shop', name: 'Tienda', icon: '👕' },
    { page: 'design', name: 'Diseña', icon: '🎨' },
    { page: 'about', name: 'Nosotros', icon: '👥' },
    { page: 'contact', name: 'Contacto', icon: '📱' }
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#1b2330] shadow-lg' : 'bg-[#1b2330]/90 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate('home')} className="text-3xl font-bold hover:scale-105 transition-transform">
            <span className="text-white">ANIME</span>
            <span className="text-[#45f882]">STYLE</span>
          </button>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map(item => (
              <button 
                key={item.page}
                onClick={() => navigate(item.page)}
                className="flex items-center text-white hover:text-[#45f882] transition group"
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
                <span className="block h-0.5 bg-[#45f882] w-0 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('cart')} className="relative p-2">
              <span className="absolute -top-1 -right-1 bg-[#45f882] text-[#1b2330] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
              <span className="text-white">🛒</span>
            </button>
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => {
                  navigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className="block text-white hover:text-[#45f882] transition flex items-center py-2"
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;

// DONE