import React, { useEffect, useState } from 'react';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      await fetch(`http://localhost:5050/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Lista de Productos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 border">Imagen</th>
              <th className="px-3 py-2 border">Título</th>
              <th className="px-3 py-2 border">Categoría</th>
              <th className="px-3 py-2 border">Serie</th>
              <th className="px-3 py-2 border">Precio</th>
              <th className="px-3 py-2 border">Stock</th>
              <th className="px-3 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2 border">
                  <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-3 py-2 border">{p.title}</td>
                <td className="px-3 py-2 border">{p.category}</td>
                <td className="px-3 py-2 border">{p.series}</td>
                <td className="px-3 py-2 border">${p.price}</td>
                <td className="px-3 py-2 border">{p.stock}</td>
                <td className="px-3 py-2 border">
                  <button className="mr-2 text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductList;