import React from 'react';
import { useCart } from '../context/CartContext';

const AnimeCartItems = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center py-8">Tu carrito está vacío 😢</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-6 last:border-0 last:pb-0">
              <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-inner">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">Talla: {item.size}</p>
                </div>
                <div className="flex items-center mt-4 sm:mt-0">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-3 w-8 text-center font-medium text-gray-800">{item.quantity}</span>
                  <button 
                    onClick={() => setQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right flex flex-col justify-between items-end">
                <p className="font-bold text-xl text-red-600">${item.price * item.quantity}</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:text-red-700 transition-colors mt-2 sm:mt-0"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeCartItems;