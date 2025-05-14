import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaCcPaypal, FaCcMastercard } from 'react-icons/fa';
import { SiMercadopago } from 'react-icons/si';
import { MdOutlineAccountBalance } from 'react-icons/md';
import logo from '../assets/Logo2.png'; // Asegúrate que la ruta sea correcta

const AnimeFooter = () => {
  const socialMedia = [
    { name: 'Instagram', icon: <FaInstagram />, url: '#' },
    { name: 'Facebook', icon: <FaFacebook />, url: '#' },
  ];

  const paymentMethods = [
    { name: 'Mercado Pago', icon: <SiMercadopago /> },
    { name: 'Transferencia', icon: <MdOutlineAccountBalance /> },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo con enlace */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="JaramaColor Logo" className="h-16 object-contain" />
          </Link>
          <p className="text-gray-400">
            Tu tienda #1 de poleras personalizadas con estilo único.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2">
            <li><Link to="/tienda" className="text-gray-400 hover:text-white transition">Tienda</Link></li>
            <li><Link to="/disena" className="text-gray-400 hover:text-white transition">Diseña tu Polera</Link></li>
            <li><Link to="/carrito" className="text-gray-400 hover:text-white transition">Carrito</Link></li>
            <li><Link to="/contacto" className="text-gray-400 hover:text-white transition">Contacto</Link></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
          <div className="flex space-x-4 text-2xl">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="text-gray-400 hover:text-red-500 transition"
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Métodos de pago */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Métodos de Pago</h4>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-800 text-gray-300 px-3 py-2 rounded text-sm shadow-sm"
              >
                <span className="text-lg">{method.icon}</span>
                <span>{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} JaramaColor. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default AnimeFooter;
