import React, { useState } from 'react';

const AnimeHeaderPro = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);

  const navItems = [
    { id: 1, name: 'Inicio', emoji: '🏠' },
    { id: 2, name: 'Diseña', emoji: '🎨' },
    { id: 3, name: 'Colecciones', emoji: '👕' },
    { id: 4, name: 'Contacto', emoji: '📱' }
  ];

  return (
    <header className="bg-[#1b2330] text-white sticky top-0 z-50 shadow-lg border-b border-[#45f882]/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-3xl font-bold mr-2 hover:scale-105 transition-transform duration-300">
              <span className="text-white">ANIME</span>
              <span className="text-[#45f882]">PRO</span>
            </div>
            <div className="hidden md:flex ml-10 space-x-6">
              {navItems.map(item => (
                <a 
                  key={item.id}
                  href="#" 
                  className="relative group"
                  onMouseEnter={() => setHoverItem(item.id)}
                  onMouseLeave={() => setHoverItem(null)}
                >
                  <span className="mr-1">{item.emoji}</span>
                  {item.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#45f882] transition-all duration-300 ${hoverItem === item.id ? 'w-full' : 'w-0'}`}
                  ></span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-[#45f882]/10 hover:bg-[#45f882]/20 transition relative group">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#45f882] text-[#1b2330] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                3
              </span>
            </button>
            <button 
              className="md:hidden p-2 rounded-full bg-[#45f882]/10 hover:bg-[#45f882]/20 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navItems.map(item => (
              <a 
                key={item.id}
                href="#" 
                className="block hover:text-[#45f882] flex items-center transition-colors"
              >
                <span className="mr-2">{item.emoji}</span>
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default AnimeHeaderPro;