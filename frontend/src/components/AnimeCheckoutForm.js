import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const AnimeCheckoutForm = () => {
  const { cartTotal } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    payment: 'webpay'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para procesar el pago
    alert('Simulación de pago procesada!');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md sticky top-4">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-800">Resumen de Compra</h2>
      <div className="mb-6 space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal:</span>
          <span>${cartTotal}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Envío:</span>
          <span>$3.000</span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t pt-3 mt-3 text-gray-800">
          <span>Total:</span>
          <span className="text-red-600">${cartTotal + 3000}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">Nombre Completo</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:ring-red-500 focus:border-red-500"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">Correo Electrónico</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md focus:ring-red-500 focus:border-red-500"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">Dirección de Envío</label>
          <textarea
            className="w-full p-2 border rounded-md focus:ring-red-500 focus:border-red-500"
            rows={3}
            required
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-800">Método de Pago</label>
          <select 
            className="w-full p-2 border rounded-md focus:ring-red-500 focus:border-red-500"
            value={formData.payment}
            onChange={(e) => setFormData({...formData, payment: e.target.value})}
          >
            <option value="webpay">WebPay</option>
            <option value="paypal">PayPal</option>
            <option value="transferencia">Transferencia Bancaria</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-md font-bold text-lg transition-colors shadow-lg transform hover:scale-105"
          disabled={cartTotal === 0}
        >
          Finalizar Compra
        </button>
      </form>
    </div>
  );
};

export default AnimeCheckoutForm;