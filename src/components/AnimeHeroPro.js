import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AnimeHeroPro = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const navigate = useNavigate(); // ✅ navegación real
  const words = ['CREA', 'DISFRUTA', 'PERSONALIZA', 'EXPRESA'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[#1b2330] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')]"></div>
      </div>
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
            <span className="text-[#45f882] transition-all duration-1000">
              {words[currentWord]}
            </span>{' '}
            EL ARTE
            <span className="block text-3xl md:text-5xl">EN TU POLERA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white opacity-90">
            Personalización premium con calidad de estudio
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/disena')}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
            >
              🎨 Crear Diseño
            </button>

            <button
              onClick={() => navigate('/tienda')}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded"
            >
              🛒 Ver Catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeHeroPro;
