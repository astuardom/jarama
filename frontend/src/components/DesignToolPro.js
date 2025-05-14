import React, { useState, useRef } from 'react';
import ImageUploader from './ImageUploader';

const DesignToolPro = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [tshirtColor, setTshirtColor] = useState('white');
  const [customText, setCustomText] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [userDesign, setUserDesign] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const tshirtRef = useRef(null);

  const characters = [
    { id: 1, name: 'Naruto', image: 'https://i.imgur.com/J1vBmQa.png' },
    { id: 2, name: 'Goku', image: 'https://i.imgur.com/LwYVd3Q.png' },
    { id: 3, name: 'Sailor Moon', image: 'https://i.imgur.com/5XwW3bC.png' },
    { id: 4, name: 'Luffy', image: 'https://i.imgur.com/8Q3Zf9G.png' },
  ];

  const colors = [
    { name: 'Blanco', value: 'white' },
    { name: 'Negro', value: 'black' },
    { name: 'Azul Oscuro', value: '#1b2330' },
    { name: 'Neon Verde', value: '#45f882' },
    { name: 'Gris', value: 'gray-500' },
  ];

  const textColors = [
    { name: 'Negro', value: 'black' },
    { name: 'Blanco', value: 'white' },
    { name: 'Neon Verde', value: '#45f882' },
    { name: 'Dorado', value: 'yellow-400' },
  ];

  const rotateLeft = () => setRotation(rotation - 15);
  const rotateRight = () => setRotation(rotation + 15);
  const zoomIn = () => setScale(Math.min(scale + 0.1, 1.5));
  const zoomOut = () => setScale(Math.max(scale - 0.1, 0.5));

  const handleDesignUpload = (image) => {
    setUserDesign(image);
    if (image) setActiveTab('design');
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1b2330] to-[#0f1620]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#45f882] to-[#2bc46c]">
          DISEÑA TU POLERA
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="relative group">
              <div 
                ref={tshirtRef}
                className={`bg-${tshirtColor} rounded-xl shadow-2xl overflow-hidden relative h-96 flex items-center justify-center transition-all duration-300`}
                style={{ 
                  backgroundColor: tshirtColor.startsWith('#') ? tshirtColor : '',
                  transform: `rotateY(${rotation}deg)`
                }}
              >
                {selectedCharacter && (
                  <img 
                    src={selectedCharacter.image} 
                    alt={selectedCharacter.name} 
                    className="absolute h-64 object-contain transition-transform duration-500 z-10"
                    style={{ 
                      transform: `rotate(${rotation/5}deg) scale(${scale})`,
                      filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))'
                    }}
                  />
                )}
                {userDesign && (
                  <img 
                    src={userDesign} 
                    alt="Diseño personalizado" 
                    className="absolute h-64 object-contain transition-transform duration-500 z-20"
                    style={{ 
                      transform: `rotate(${rotation/5}deg) scale(${scale})`,
                    }}
                  />
                )}
                {customText && (
                  <div 
                    className={`absolute bottom-20 font-bold text-xl z-30`} 
                    style={{ 
                      color: textColor.startsWith('#') ? textColor : '',
                      fontFamily: "'Comic Sans MS', cursive",
                      transform: `rotate(${-rotation/10}deg) scale(${scale})`,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {customText}
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <button onClick={rotateLeft} className="control-btn">↻</button>
                <button onClick={zoomOut} className="control-btn">-</button>
                <button onClick={zoomIn} className="control-btn">+</button>
                <button onClick={rotateRight} className="control-btn">↺</button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3 bg-[#1b2330] rounded-xl shadow-lg p-6 border border-[#45f882]/20">
            <div className="flex border-b border-[#45f882]/20 mb-6">
              <button 
                className={`tab-btn ${activeTab === 'upload' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                Subir
              </button>
              <button 
                className={`tab-btn ${activeTab === 'characters' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('characters')}
              >
                Personajes
              </button>
              <button 
                className={`tab-btn ${activeTab === 'design' ? 'active-tab' : ''}`}
                onClick={() => setActiveTab('design')}
              >
                Diseño
              </button>
            </div>
            
            {activeTab === 'upload' && (
              <ImageUploader onImageUpload={handleDesignUpload} />
            )}
            
            {activeTab === 'characters' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-white">Diseños Exclusivos</h3>
                <div className="grid grid-cols-2 gap-4">
                  {characters.map(character => (
                    <div 
                      key={character.id}
                      className={`character-card ${selectedCharacter?.id === character.id ? 'selected-character' : ''}`}
                      onClick={() => {
                        setSelectedCharacter(character);
                        setActiveTab('design');
                      }}
                    >
                      <img src={character.image} alt={character.name} className="character-image" />
                      <p className="character-name">{character.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'design' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Color de polera</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <div 
                        key={color.value}
                        className={`color-option ${tshirtColor === color.value ? 'selected-color' : ''}`}
                        style={{ backgroundColor: color.value.startsWith('#') ? color.value : '' }}
                        onClick={() => setTshirtColor(color.value)}
                        title={color.name}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Texto personalizado</h3>
                  <input
                    type="text"
                    placeholder="Escribe tu texto"
                    className="design-input"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Color de texto</h3>
                  <div className="flex flex-wrap gap-2">
                    {textColors.map(color => (
                      <div 
                        key={color.value}
                        className={`color-option ${textColor === color.value ? 'selected-color' : ''}`}
                        style={{ backgroundColor: color.value.startsWith('#') ? color.value : '' }}
                        onClick={() => setTextColor(color.value)}
                        title={color.name}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <button className="add-to-cart-btn">
              <span className="text-xl">🛒</span> AÑADIR AL CARRITO - $29.990
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignToolPro;