import api from "./api";

export const inventoryService = {
  createInventoryItem: (data) => api.post("/inventory", data),

  updateInventoryItem: (id, data) => api.put(`/inventory/${id}`, data),

  deleteInventoryItem: (id) => api.delete(`/inventory/${id}`),

  getAllInventoryItems: () => api.get("/inventory"),

  getInventoryItemsByCategory: (category) =>
    api.get(`/inventory/category/${category}`),
};
