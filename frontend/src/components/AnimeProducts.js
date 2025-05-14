import React from 'react';

const AnimeProducts = () => {
  const collections = [
    {
      name: "Shonen Jump",
      items: [
        { id: 1, name: 'Polera Naruto Uzumaki', price: 24990, image: 'https://i.imgur.com/J1vBmQa.png' },
        { id: 2, name: 'Polera Goku SSJ', price: 25990, image: 'https://i.imgur.com/LwYVd3Q.png' },
        { id: 3, name: 'Polera Luffy Gear 5', price: 26990, image: 'https://i.imgur.com/8Q3Zf9G.png' },
      ]
    },
    {
      name: "Shojo Beat",
      items: [
        { id: 4, name: 'Polera Sailor Moon', price: 23990, image: 'https://i.imgur.com/5XwW3bC.png' },
        { id: 5, name: 'Polera Cardcaptor Sakura', price: 22990, image: 'https://i.imgur.com/3mJQk2x.png' },
        { id: 6, name: 'Polera Fruits Basket', price: 21990, image: 'https://i.imgur.com/9zXwL2m.png' },
      ]
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
          COLECCIONES DESTACADAS
        </h2>
        
        {collections.map((collection, index) => (
          <div key={index} className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">{collection.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collection.items.map(item => (
                <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                  <div className="relative h-64 bg-gray-100 flex items-center justify-center p-4">
                    <img src={item.image} alt={item.name} className="h-48 object-contain transition group-hover:scale-110 duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-30 transition duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold text-pink-500">${item.price.toLocaleString('es-CL')}</span>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm font-medium transition transform hover:scale-105">
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeProducts;