import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSearch,FaBoxOpen } from 'react-icons/fa';

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [seriesList, setSeriesList] = useState([]);
  const [selectedSerie, setSelectedSerie] = useState('');

  const loadProducts = () => {
    fetch('${process.env.REACT_APP_API_URL}/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);

        const uniqueSeries = [...new Set(data.map(p => p.series).filter(Boolean))];
        setSeriesList(uniqueSeries);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const searchTerm = search.toLowerCase();
    const result = products.filter(p =>
      (!selectedSerie || p.series === selectedSerie) &&
      (
        p.title.toLowerCase().includes(searchTerm) ||
        p.series.toLowerCase().includes(searchTerm)
      )
    );
    setFiltered(result);
  }, [search, selectedSerie, products]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
    await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, { method: 'DELETE' });
    loadProducts();
  };

  return (
    <div className="space-y-6">
      <h1 
         className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaBoxOpen className="text-red-500" /> Productos</h1>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center border rounded overflow-hidden bg-white w-full max-w-md">
          <span className="p-2 text-gray-600"><FaSearch /></span>
          <input
            type="text"
            placeholder="Buscar por título o serie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 focus:outline-none"
          />
        </div>

        <select
          value={selectedSerie}
          onChange={(e) => setSelectedSerie(e.target.value)}
          className="p-2 border rounded bg-white text-gray-700"
        >
          <option value="">Todas las series</option>
          {seriesList.map(serie => (
            <option key={serie} value={serie}>{serie}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-red-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Serie</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              filtered.map(prod => (
                <tr key={prod._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-center">
                    <img src={prod.image} alt={prod.title} className="w-14 h-14 object-contain mx-auto rounded" />
                  </td>
                  <td className="px-4 py-3">{prod.title}</td>
                  <td className="px-4 py-3 capitalize">{prod.category}</td>
                  <td className="px-4 py-3">{prod.series}</td>
                  <td className="px-4 py-3">{prod.stock}</td>
                  <td className="px-4 py-3">${prod.price}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(prod)}
                      title="Editar"
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaEdit />
                      <span className="hidden sm:inline">Editar</span>
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      title="Eliminar"
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaTrash />
                      <span className="hidden sm:inline">Eliminar</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
