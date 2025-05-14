import React, { useEffect, useState } from 'react';
import {
  FaBoxes, FaLayerGroup, FaCubes, FaTags, FaBook, FaClipboardList, FaMoneyBillWave
} from 'react-icons/fa';

const categoryLabels = {
  'shonen': 'Shonen',
  'seinen': 'Seinen',
  'psicológico / thriller': 'Psicológico / Thriller',
  'slice of life / comedia': 'Slice of Life / Comedia',
  'deportes': 'Deportes',
  'otros': 'Otros'
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    stock: 0,
    categorias: {},
    promedioPrecio: 0,
    categoriaPopular: '',
  });

  const [orders, setOrders] = useState({
    totalPedidos: 0,
    ingresosTotales: 0,
  });

  useEffect(() => {
    // Productos
    fetch('http://localhost:5050/api/products')
      .then(res => res.json())
      .then(products => {
        const total = products.length;
        const stock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
        const totalPrecio = products.reduce((sum, p) => sum + (p.price || 0), 0);
        const categorias = {};

        products.forEach(p => {
          const raw = p.category || 'otros';
          const key = raw.trim().toLowerCase();
          categorias[key] = (categorias[key] || 0) + 1;
        });

        const categoriaPopular = Object.entries(categorias).reduce(
          (max, [cat, count]) => (count > max.count ? { cat, count } : max),
          { cat: '', count: 0 }
        ).cat;

        setStats({
          total,
          stock,
          categorias,
          promedioPrecio: total ? (totalPrecio / total).toFixed(2) : 0,
          categoriaPopular,
        });
      })
      .catch(console.error);

    // Pedidos
    fetch('http://localhost:5050/api/dashboard-stats')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <FaLayerGroup className="text-red-600" /> Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card icon={<FaBoxes />} label="Productos Totales" value={stats.total} />
        <Card icon={<FaCubes />} label="Stock Total" value={stats.stock} />
        <Card icon={<FaTags />} label="Precio Promedio" value={`$${stats.promedioPrecio}`} />
        <Card icon={<FaLayerGroup />} label="Categoría Popular" value={categoryLabels[stats.categoriaPopular] || stats.categoriaPopular || 'N/A'} />
        <Card icon={<FaClipboardList />} label="Pedidos Realizados" value={orders.totalPedidos} />
        <Card icon={<FaMoneyBillWave />} label="Total Ingresos" value={`$${orders.ingresosTotales.toLocaleString()}`} />
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaBook className="text-red-600" /> Categorías
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm text-gray-700">
          {Object.entries(stats.categorias).map(([cat, count]) => (
            <li key={cat} className="flex justify-between px-3 py-2 bg-gray-100 rounded shadow-sm">
              <span>{categoryLabels[cat] || cat}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Card = ({ icon, label, value }) => (
  <div className="bg-white rounded shadow p-5 flex items-center gap-4">
    <div className="text-red-600 text-3xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default Dashboard;
