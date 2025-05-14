import React from 'react';

const HeroBanner = () => {
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93" 
          alt="Modelo con polera estilo urbano"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            COLECCIÓN <span className="text-yellow-400">OTOÑO 2023</span>
          </h1>
          <p className="text-xl mb-8">
            Poleras que combinan comodidad y estilo urbano. Diseñadas para destacar.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105">
            VER COLECCIÓN
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;