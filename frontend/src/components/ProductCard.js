import React, { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

const ProductCard = ({ product }) => {
  const { navigate } = useContext(NavigationContext);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer"
         onClick={() => navigate('producto', product.id)}>
      <div className="relative pt-[100%]">
        <img 
          src={product.image} 
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-800">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-red-600 text-xl">${product.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Evita navegar al hacer click en el botón
              // Lógica para añadir al carrito
              alert(`Añadido ${product.title} al carrito!`);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors transform hover:scale-105"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;