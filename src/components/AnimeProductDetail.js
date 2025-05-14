import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productsService';
import { useCart } from '../context/CartContext';

const AnimeProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <p className="text-center text-gray-600 mt-10">Cargando producto...</p>;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    alert(`${quantity} x ${product.title} (Talla ${selectedSize}) añadido al carrito!`);
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <img src={product.image} alt={product.title} className="w-full h-auto object-contain rounded-lg shadow-md" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-3 text-gray-800">{product.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{product.description}</p>
        <p className="text-red-600 font-bold text-2xl mb-8">${product.price}</p>

        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-800">Talla:</h3>
          <div className="flex space-x-2">
            {['S', 'M', 'L', 'XL'].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${selectedSize === size ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2 text-gray-800">Cantidad:</h3>
          <div className="flex items-center">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              -
            </button>
            <span className="mx-3 w-8 text-center font-medium text-gray-800">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-lg font-bold text-lg transition-colors shadow-lg transform hover:scale-105"
        >
          Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default AnimeProductDetail;
