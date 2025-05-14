import React from 'react';

const AboutPage = () => {
  return (
    <div className="pt-20 pb-16 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Sobre Nosotros</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Historia</h2>
              <p className="text-gray-700 mb-6">
                AniMerch nació de la pasión por el anime y la moda urbana. 
                Queríamos crear poleras que los verdaderos fans pudieran lucir con orgullo.
              </p>
              <p className="text-gray-700">
                Hoy somos la tienda líder en poleras anime personalizadas, con envíos a todo el mundo.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
              <p className="text-gray-700">
                Crear productos de alta calidad que permitan a los fans expresar su amor por el anime
                a través de diseños únicos y personalizables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;