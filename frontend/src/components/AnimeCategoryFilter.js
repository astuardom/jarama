import React from 'react';

const AnimeCategoryFilter = ({ activeCategory, setActiveCategory, activeSeries, setActiveSeries }) => {
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'shonen', name: 'Shōnen' },
    { id: 'seinen', name: 'Seinen' },
    { id: 'Psicológico / Thriller', name: 'Psicológico / Thriller' },
    { id: 'deportes', name: 'Deportes' },
    { id: 'slice', name: 'Slice of Life / Comedia' }
  ];

  const series = [
    { id: 'attackontitan', name: 'Attack on Titan' },
    { id: 'blackclover', name: 'Black Clover' },
    { id: 'bleach', name: 'Bleach' },
    { id: 'bluelock', name: 'Blue Lock' },
    { id: 'chainsawman', name: 'Chainsaw Man' },
    { id: 'dragonballz', name: 'Dragon Ball Z' },
    { id: 'demonslayer', name: 'Demon Slayer' },
    { id: 'fullmetalalchemist', name: 'Fullmetal Alchemist' },
    { id: 'jujutsukaisen', name: 'Jujutsu Kaisen' },
    { id: 'kaijuno8', name: 'Kaiju No. 8' },
    { id: 'myheroacademia', name: 'My Hero Academia' },
    { id: 'naruto', name: 'Naruto' },
    { id: 'One Piece', name: 'One Piece' },
    { id: 'onepunchman', name: 'One Punch Man' },
    { id: 'samuraix', name: 'Samurai X (Rurouni Kenshin)' },
    { id: 'baki', name: 'Baki' },
    { id: 'berserk', name: 'Berserk' },
    { id: 'hellsparadise', name: "Hell's Paradise" },
    { id: 'tokyoghoul', name: 'Tokyo Ghoul' },
    { id: 'dandadan', name: 'Dan Da Dan' },
    { id: 'deathnote', name: 'Death Note' },
    { id: 'evangelion', name: 'Evangelion' },
    { id: 'tokyorevengers', name: 'Tokyo Revengers' },
    { id: 'haikyuu', name: 'Haikyuu!!' },
    { id: 'slamdunk', name: 'Slam Dunk' },
    { id: 'spyxfamily', name: 'SPY x FAMILY' }
  ];

  return (
    <div className="mb-8 bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Filtrar por:</h3>

      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <span className="font-semibold text-gray-700 mr-2">Categorías:</span>
        {categories.map(category => {
          const isActive = activeCategory === category.id;
          const className = isActive
            ? 'px-4 py-2 rounded-full font-medium bg-red-600 text-white shadow-md transition-colors'
            : 'px-4 py-2 rounded-full font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors';

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={className}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      <div>
        <span className="font-semibold text-gray-700 mr-2">Series Populares:</span>
        <div className="flex flex-wrap gap-2">
          {series.map(serie => {
            const isActive = activeSeries === serie.id;
            const className = isActive
              ? 'px-3 py-1 rounded-full text-sm font-medium bg-yellow-400 text-gray-900 shadow-md transition-colors'
              : 'px-3 py-1 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors';

            return (
              <button
                key={serie.id}
                onClick={() => setActiveSeries(serie.id)}
                className={className}
              >
                {serie.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimeCategoryFilter;