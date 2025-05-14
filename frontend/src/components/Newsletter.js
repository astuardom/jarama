import React from 'react';

const Newsletter = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">ÚNETE A NUESTRA COMUNIDAD</h2>
        <p className="text-lg mb-8">
          Suscríbete y recibe un 10% de descuento en tu primera compra. Además, 
          te enviaremos nuestras novedades y ofertas exclusivas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-6 rounded-md transition">
            SUSCRIBIRME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;