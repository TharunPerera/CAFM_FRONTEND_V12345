import api from "./api";

export const assetCategoryService = {
  // Get all asset categories
  getAllCategories: () => api.get("/asset-categories"),

  // Get asset category by ID
  getCategoryById: (id) => api.get(`/asset-categories/${id}`),

  // Create new asset category
  createCategory: (categoryData) => api.post("/asset-categories", categoryData),

  // Update asset category
  updateCategory: (id, categoryData) =>
    api.put(`/asset-categories/${id}`, categoryData),

  // Delete asset category
  deleteCategory: (id) => api.delete(`/asset-categories/${id}`),

  // Search categories by name
  searchCategoriesByName: (name) =>
    api.get(`/asset-categories/filter?name=${encodeURIComponent(name)}`),
};
