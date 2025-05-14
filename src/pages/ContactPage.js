import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
    alert('Mensaje enviado con éxito!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-20 pb-16 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Contacto</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Información de Contacto</h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <span className="text-red-600 mr-3">📍</span>
                  <p>Av. Anime 123, Santiago, Chile</p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-3">✉️</span>
                  <p>contacto@animerch.com</p>
                </div>
                <div className="flex items-start">
                  <span className="text-red-600 mr-3">📞</span>
                  <p>+56 9 1234 5678</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Formulario de Contacto</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-800 mb-1 font-medium">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-800 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-800 mb-1 font-medium">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-md"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;