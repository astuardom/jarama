import React from 'react';

const AnimeProductsPro = () => {
  const collections = [
    {
      name: "Colección Shonen",
      description: "Los héroes más poderosos en tu polera",
      items: [
        { id: 1, name: 'Naruto Uzumaki', price: 29990, image: 'https://i.imgur.com/J1vBmQa.png', color: '#FF7F11' },
        { id: 2, name: 'Goku SSJ', price: 30990, image: 'https://i.imgur.com/LwYVd3Q.png', color: '#FFD166' },
        { id: 3, name: 'Luffy Gear 5', price: 31990, image: 'https://i.imgur.com/8Q3Zf9G.png', color: '#EF476F' },
      ]
    },
    {
      name: "Colección Shojo",
      description: "El encanto y magia del anime femenino",
      items: [
        { id: 4, name: 'Sailor Moon', price: 28990, image: 'https://i.imgur.com/5XwW3bC.png', color: '#6D4CFF' },
        { id: 5, name: 'Cardcaptor Sakura', price: 27990, image: 'https://i.imgur.com/3mJQk2x.png', color: '#FF70A6' },
        { id: 6, name: 'Fruits Basket', price: 26990, image: 'https://i.imgur.com/9zXwL2m.png', color: '#A5FFD6' },
      ]
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f1620]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#45f882] to-[#2bc46c]">
          COLECCIONES PREMIUM
        </h2>
        <p className="text-center text-[#45f882] mb-12">Diseños exclusivos de alta calidad</p>
        
        {collections.map((collection, index) => (
          <div key={index} className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">{collection.name}</h3>
              <p className="text-[#45f882]">{collection.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {collection.items.map(item => (
                <div key={item.id} className="group relative bg-[#1b2330] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-[#45f882]/10 hover:border-[#45f882]/30">
                  <div className="relative h-64 bg-[#0f1620] flex items-center justify-center p-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-48 object-contain transition group-hover:scale-110 duration-500"
                      style={{ filter: `drop-shadow(0 0 8px ${item.color})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition duration-300">
                      <button className="bg-[#45f882] text-[#1b2330] px-4 py-1 rounded-full text-sm font-bold transition transform hover:scale-105">
                        Personalizar
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold text-[#45f882]">${item.price.toLocaleString('es-CL')}</span>
                      <button className="bg-[#45f882]/10 hover:bg-[#45f882]/20 text-[#45f882] px-4 py-1 rounded-full text-sm font-medium transition transform hover:scale-105 border border-[#45f882]/30">
                        + Carrito
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

export default AnimeProductsPro;