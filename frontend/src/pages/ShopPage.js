import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../api/productsService';
import AnimeProductGrid from '../components/AnimeProductGrid';
import AnimeCategoryFilter from '../components/AnimeCategoryFilter';

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('categoria') || 'all';
  const initialSeries = params.get('serie') || 'all';
  const initialSearch = params.get('busqueda') || '';

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [series, setSeries] = useState(initialSeries);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // Actualizar la URL al cambiar filtros
  useEffect(() => {
    const query = new URLSearchParams();
    if (category !== 'all') query.set('categoria', category);
    if (series !== 'all') query.set('serie', series);
    if (searchTerm) query.set('buscar', searchTerm);
    navigate(`/tienda?${query.toString()}`, { replace: true });
  }, [category, series, searchTerm, navigate]);

  // Filtrar productos
  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();

      const normalizedCategory = category.trim().toLowerCase();
      const normalizedSeries = series.trim().toLowerCase();
      const normalizedSearch = searchTerm.trim().toLowerCase();

      const filtered = allProducts.filter((p) => {
        const productCategory = p.category?.trim().toLowerCase();
        const productSeries = p.series?.trim().toLowerCase();
        const productTitle = p.title?.trim().toLowerCase();

        const matchCategory =
          normalizedCategory === 'all' || productCategory === normalizedCategory;
        const matchSeries =
          normalizedSeries === 'all' || productSeries === normalizedSeries;
        const matchSearch =
          !normalizedSearch ||
          productTitle.includes(normalizedSearch) ||
          productSeries.includes(normalizedSearch);

        return matchCategory && matchSeries && matchSearch;
      });

      setProducts(filtered);
    };

    loadProducts();
  }, [category, series, searchTerm]);

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Tienda</h1>

        {/* Buscador */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Buscar producto o serie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Filtros */}
        <AnimeCategoryFilter
          activeCategory={category}
          setActiveCategory={setCategory}
          activeSeries={series}
          setActiveSeries={setSeries}
        />

        <AnimeProductGrid products={products} />
      </div>
    </div>
  );
};

export default ShopPage;
