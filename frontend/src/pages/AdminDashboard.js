import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    } else {
      fetch('${import.meta.env.VITE_API_URL}/products')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error('Error al cargar productos:', err));
    }
  }, [navigate]);

  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const lowStock = products.filter(p => (p.stock || 0) <= 5).length;

  const categories = products.reduce((acc, p) => {
    const cat = p.category || 'Sin categoría';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Productos</h2>
          <p className="text-3xl font-bold text-red-600">{products.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Stock Total</h2>
          <p className="text-3xl font-bold text-yellow-500">{totalStock}</p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">Stock Bajo (&le; 5)</h2>
          <p className="text-3xl font-bold text-red-500">{lowStock}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Productos por Categoría</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {Object.entries(categories).map(([cat, count]) => (
            <li key={cat}><strong>{cat}:</strong> {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;