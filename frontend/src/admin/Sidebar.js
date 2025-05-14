import React from 'react';
import {
  FaChartBar, FaBoxOpen, FaPlusCircle, FaSignOutAlt, FaTimes, FaBoxes
} from 'react-icons/fa';

const Sidebar = ({ onNavigate, isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold text-red-600">JaramaColor Admin</h2>
        <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-red-500">
          <FaTimes />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        <button onClick={() => onNavigate('dashboard')} className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-red-100 text-gray-800 font-medium">
          <FaChartBar className="text-red-500" /> Dashboard
        </button>
        <button onClick={() => onNavigate('products')} className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-red-100 text-gray-800 font-medium">
          <FaBoxOpen className="text-red-500" /> Productos
        </button>
        <button onClick={() => onNavigate('add')} className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-red-100 text-gray-800 font-medium">
          <FaPlusCircle className="text-red-500" /> Agregar
        </button>
        <button
          onClick={() => onNavigate('orders')}
          className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-red-100 text-gray-800 font-medium">
          <FaBoxes className="text-red-500" /> Pedidos
        </button>

        <button onClick={() => {
          localStorage.removeItem('isAdmin');
          window.location.href = '/';
        }} className="w-full flex items-center gap-2 px-4 py-2 rounded hover:bg-red-100 text-gray-800 font-medium">
          <FaSignOutAlt className="text-red-500" /> Cerrar sesión
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
