import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productsService';
import AnimeProductDetail from '../components/AnimeProductDetail';
import AnimeProductReviews from '../components/AnimeProductReviews';
import { NavigationContext } from '../context/NavigationContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { navigate } = useContext(NavigationContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Error al cargar el producto.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) loadProduct();
  }, [id]);

  if (loading) return <div className="text-center py-12 text-gray-800">Cargando...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-12 text-gray-800">Producto no encontrado.</div>;

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('tienda')}
          className="text-blue-600 hover:underline mb-6 flex items-center"
        >
          ← Volver a la tienda
        </button>
        <AnimeProductDetail product={product} />
        <AnimeProductReviews productId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
