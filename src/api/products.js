export const getFeaturedProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData.filter(product => product.featured));
    }, 500);
  });
};

export const getProducts = (category = 'all') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'all') {
        resolve(productsData);
      } else {
        resolve(productsData.filter(product => 
          product.category === category || product.series === category
        ));
      }
    }, 500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = productsData.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Producto no encontrado'));
      }
    }, 500);
  });
};

// DONE