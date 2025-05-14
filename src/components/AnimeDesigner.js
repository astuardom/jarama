const AnimeDesigner = () => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Diseña Tu Polera Épica</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-100 aspect-square mb-4 flex items-center justify-center rounded-lg shadow-inner">
            <span className="text-gray-500 text-xl">Vista previa de tu diseño</span>
          </div>
        </div>
        <div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">Sube tu imagen (PNG sin fondo)</label>
            <div className="border-2 border-dashed border-red-400 rounded-lg p-8 text-center cursor-pointer hover:border-red-600 transition-colors">
              <div className="text-red-600 text-4xl mb-2">⬆️</div>
              <p className="text-gray-700">Arrastra tu imagen aquí o haz clic</p>
              <input type="file" className="hidden" accept="image/png" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">Agrega Texto</label>
            <input type="text" placeholder="Escribe tu frase anime..." className="w-full p-3 border rounded-md focus:ring-red-500 focus:border-red-500" />
          </div>
          <button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-lg font-bold text-lg transition-colors shadow-lg transform hover:scale-105">
            ¡CREAR POLERA!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeDesigner;