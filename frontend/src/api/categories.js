export const getAllCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.keys(categoriesData).map(key => ({
        id: key,
        name: categoriesData[key].name,
        description: categoriesData[key].description
      })));
    }, 100);
  });
};

export const getSeriesByCategory = (categoryName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categoryKey = Object.keys(categoriesData).find(key => categoriesData[key].name === categoryName);
      resolve(categoryKey ? categoriesData[categoryKey].series : []);
    }, 100);
  });
};

export const getCategoryInfo = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categoriesData[categoryId] || null);
    }, 100);
  });
};

// DONE