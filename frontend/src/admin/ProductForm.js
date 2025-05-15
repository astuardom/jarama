import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';

const initialForm = {
  title: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  series: '',
  image: ''
};

const categories = [
  "Shonen",
  "Seinen",
  "Psicológico / Thriller",
  "Deportes",
  "Slice of Life / Comedia"
];


const ProductForm = ({ editMode = false, productData = {}, onSuccess }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editMode && productData) {
      setForm(productData);
    }
  }, [editMode, productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = editMode
      ? `${process.env.REACT_APP_API_URL}/products/${productData._id}`
      : '${process.env.REACT_APP_API_URL}/products';
  
    const method = editMode ? 'PUT' : 'POST';
  
    const formData = { ...form };
    if (editMode) delete formData._id; // 👈 solución clave
  
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      }),
    });
  
    if (response.ok) {
      alert(editMode ? 'Producto actualizado' : 'Producto agregado');
      if (onSuccess) onSuccess();
    } else {
      alert('Hubo un error al guardar el producto');
    }
  };
  

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        {editMode ? <FaEdit className="text-red-600" /> : <FaPlus className="text-red-600" />}
        {editMode ? 'Editar Producto' : 'Agregar Producto'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Título</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Serie</label>
            <input name="series" value={form.series} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Categoría</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>


          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Stock</label>
            <input type="number" name="stock" value={form.stock} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Precio</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">Imagen (URL)</label>
            <input type="url" name="image" value={form.image} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-600">Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} required className="w-full p-2 border rounded" rows={4} />
        </div>

        {form.image && (
          <div className="pt-4">
            <p className="text-sm font-semibold text-gray-600 mb-2">Vista previa de la imagen:</p>
            <img src={form.image} alt="Vista previa" className="max-w-xs h-40 object-contain rounded shadow" />
          </div>
        )}

        <button type="submit" className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded flex items-center gap-2">
          {editMode ? <FaEdit /> : <FaPlus />}
          {editMode ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
