import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../api/productsService';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
  if (localStorage.getItem('isAdmin') !== 'true') {
    return <Navigate to="/" />;
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    await deleteProduct(id);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="pt-20 px-4 container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>
      {loading ? (
        <p className="text-gray-600">Cargando productos...</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Categoría</th>
              <th className="px-6 py-3">Serie</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{p.title}</td>
                <td className="px-6 py-3">{p.category}</td>
                <td className="px-6 py-3">{p.series}</td>
                <td className="px-6 py-3">${p.price}</td>
                <td className="px-6 py-3 space-x-2">
                  <button className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
