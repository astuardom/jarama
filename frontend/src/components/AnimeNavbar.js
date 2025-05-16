import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo2.png';
import { useCart } from '../context/CartContext';

const AnimeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    const query = search.trim();
    if (query) {
      navigate(`/tienda?busqueda=${encodeURIComponent(query)}`);
    }
  };

  const handleSearchKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const categories = [
    { id: 'shonen', name: 'Shonen' },
    { id: 'seinen', name: 'Seinen' },
    { id: 'psicologico / thriller', name: 'Psicológico / Thriller' },
    { id: 'deportes', name: 'Deportes' },
    { id: 'slice of life / comedia', name: 'Slice of Life / Comedia' }
  ];

  const navLinkClasses = ({ isActive }) =>
    'block text-white font-medium hover:text-yellow-300 transition-colors ' +
    (isActive ? 'underline underline-offset-4' : '');

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-xl' : 'bg-black/80 backdrop-blur-md'}`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <button onClick={() => navigate('/')}>
              <img src={logo} alt="Jarama Color Logo" className="h-12 sm:h-16 object-contain" />
            </button>
            <div className="hidden lg:flex space-x-6">
              <NavLink to="/" className={navLinkClasses}>Inicio</NavLink>
              <NavLink to="/tienda" className={navLinkClasses}>Tienda</NavLink>
              <NavLink to="/disena" className={navLinkClasses}>Diseña</NavLink>
              <NavLink to="/carrito" className={navLinkClasses}>Carrito</NavLink>
              {localStorage.getItem('isAdmin') !== 'true' && (
                <NavLink to="/admin-login" className={navLinkClasses}>Admin</NavLink>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center border rounded overflow-hidden bg-white">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder="Buscar..."
                className="px-2 py-1 w-40 text-sm text-black outline-none"
              />
              <button onClick={handleSearch} className="px-2 text-gray-600 hover:text-red-500">🔍</button>
            </div>

            <button
              onClick={() => navigate('/carrito')}
              className="relative text-xl"
            >
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-bounce">
                {cartItems.length || 0}
              </span>
              <span className="text-white hover:text-yellow-300 transition-colors">🛒</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white text-xl lg:hidden hover:text-yellow-300 transition-colors"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menú desplegable para móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black text-white px-6 py-4 space-y-3">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Inicio</NavLink>
            <NavLink to="/tienda" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Tienda</NavLink>
            <NavLink to="/disena" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Diseña</NavLink>
            <NavLink to="/carrito" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Carrito</NavLink>
            {localStorage.getItem('isAdmin') !== 'true' && (
              <NavLink to="/admin-login" onClick={() => setMobileMenuOpen(false)} className={navLinkClasses}>Admin</NavLink>
            )}
          </div>
        )}
      </nav>

      {/* Franja secundaria para categorías */}
      <div className="pt-20 bg-neutral-900 shadow-md z-40 relative">
        <div className="container mx-auto px-4 py-2 flex justify-center gap-6">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate('/tienda?categoria=' + encodeURIComponent(cat.id))}
              className="text-white font-medium hover:text-yellow-300 transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimeNavbar;
