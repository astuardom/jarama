import React from 'react';

const LayoutHeader = () => {
  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="text-white">ESTILO</span>
          <span className="text-yellow-400">URBANO</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-yellow-400 transition">Inicio</a>
          <a href="#" className="hover:text-yellow-400 transition">Catálogo</a>
          <a href="#" className="hover:text-yellow-400 transition">Nosotros</a>
          <a href="#" className="hover:text-yellow-400 transition">Contacto</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-full transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;