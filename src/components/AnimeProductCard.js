import React from 'react';
import { Link } from 'react-router-dom';

const AnimeProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-4 flex flex-col">
      <Link to={`/producto/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full object-contain bg-white rounded-lg mb-4"
        />
      </Link>
      <div className="flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-1">
          {product.series} — <span className="capitalize">{product.category}</span>
        </p>
        <p className="text-red-600 font-semibold text-xl">${product.price}</p>
      </div>
      <Link
        to={`/producto/${product._id}`}
        className="mt-4 inline-block text-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold"
      >
        Ver Detalles
      </Link>
    </div>
  );
};

export default AnimeProductCard;