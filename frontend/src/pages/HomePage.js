import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimeHero from '../components/AnimeHeroPro';
import AnimeProductGrid from '../components/AnimeProductGrid';
import { fetchProducts } from '../api/productsService';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(products => {
      const aleatorios = products
        .sort(() => 0.5 - Math.random()) // 🔀 aleatoriza
        .slice(0, 9); // 🧩 toma solo 8 productos
      setFeaturedProducts(aleatorios);
    });
  }, []);

  return (
    <div className="pt-20 pb-16">
      <AnimeHero />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Productos Destacados</h2>
        <AnimeProductGrid products={featuredProducts} navigate={navigate} />
      </div>
    </div>
  );
};

export default HomePage;
