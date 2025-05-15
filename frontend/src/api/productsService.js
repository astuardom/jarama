const API_URL = '${import.meta.env.VITE_API_URL}/products';

// Obtener todos los productos
export async function fetchProducts() {
  const res = await fetch(API_URL);
  return await res.json();
}

// Obtener producto por ID
export async function fetchProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

// Eliminar producto por ID
export async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
}

// Agregar un producto
export async function addProduct(productData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
  return await res.json();
}

// Actualizar un producto
export async function updateProduct(id, productData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
  return await res.json();
}
