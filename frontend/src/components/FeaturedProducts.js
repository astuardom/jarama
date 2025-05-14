import React from 'react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Polera Urban Black',
      price: 24990,
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9',
      colors: ['black', 'gray']
    },
    {
      id: 2,
      name: 'Polera Basic White',
      price: 21990,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
      colors: ['white', 'beige']
    },
    {
      id: 3,
      name: 'Polera Street Yellow',
      price: 27990,
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633',
      colors: ['yellow', 'black']
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">PRODUCTOS DESTACADOS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover group-hover:opacity-75 transition duration-300"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.colors.join(' / ')}
                  </p>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  ${product.price.toLocaleString('es-CL')}
                </p>
              </div>
              <button className="mt-2 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;