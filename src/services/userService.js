import api from "./api";

export const userService = {
  // User Management
  getAllUsers: () => api.get("/users"),
  getUserById: (id, userType) => api.get(`/users/${id}/${userType}`),
  createUser: (userData) => api.post("/users", userData),

  // User Management page - uses PUT /api/users/{id}/{userType}
  updateUser: (id, userType, userData) =>
    api.put(`/users/${id}/${userType}`, userData),

  deleteUser: (id, userType) => api.delete(`/users/${id}/${userType}`),
  changePassword: (id, userType, newPassword) =>
    api.put(`/users/${id}/password/${userType}`, newPassword, {
      headers: { "Content-Type": "text/plain" },
    }),

  // Profile management - uses PUT /api/users/{id}/credentials/{userType}
  getCurrentUserProfile: () => api.get("/users/me"),
  changeCredentials: (id, userType, credentialsData) =>
    api.put(`/users/${id}/credentials/${userType}`, credentialsData),

  // Role and Permission Management
  getAllRoles: () => api.get("/users/roles"),
  assignPermissions: (id, userType, permissionIds) =>
    api.post(`/users/${id}/permissions/${userType}`, permissionIds),

  // Password Reset
  requestPasswordReset: (email) =>
    api.post("/auth/password-reset-request", { email }),
  confirmPasswordReset: (resetData) =>
    api.post("/auth/password-reset-confirm", resetData),
};
