// import api from "./api";

// export const userService = {
//   // User Management
//   getAllUsers: () => api.get("/users"),
//   getUserById: (id, userType) => api.get(`/users/${id}/${userType}`),
//   createUser: (userData) => api.post("/users", userData),

//   // User Management page - uses PUT /api/users/{id}/{userType}
//   updateUser: (id, userType, userData) =>
//     api.put(`/users/${id}/${userType}`, userData),

//   deleteUser: (id, userType) => api.delete(`/users/${id}/${userType}`),
//   changePassword: (id, userType, newPassword) =>
//     api.put(`/users/${id}/password/${userType}`, newPassword, {
//       headers: { "Content-Type": "text/plain" },
//     }),

//   // Profile management - uses PUT /api/users/{id}/credentials/{userType}
//   getCurrentUserProfile: () => api.get("/users/me"),
//   changeCredentials: (id, userType, credentialsData) =>
//     api.put(`/users/${id}/credentials/${userType}`, credentialsData),

//   // Role and Permission Management
//   getAllRoles: () => api.get("/users/roles"),
//   assignPermissions: (id, userType, permissionIds) =>
//     api.post(`/users/${id}/permissions/${userType}`, permissionIds),

//   // Password Reset
//   requestPasswordReset: (email) =>
//     api.post("/auth/password-reset-request", { email }),
//   confirmPasswordReset: (resetData) =>
//     api.post("/auth/password-reset-confirm", resetData),
// };

// import api from "./api";

// export const userService = {
//   // Paginated user fetching by type
//   getUsersByType: (userType, page = 0, size = 10) => {
//     const endpoint =
//       userType === "INTERNAL" ? "/users/internal" : "/users/company";
//     return api.get(`${endpoint}?page=${page}&size=${size}`);
//   },

//   // Individual user operations
//   getUserById: (id, userType) => api.get(`/users/${id}/${userType}`),
//   createUser: (userData) => api.post("/users", userData),
//   updateUser: (id, userType, userData) =>
//     api.put(`/users/${id}/${userType}`, userData),
//   deleteUser: (id, userType) => api.delete(`/users/${id}/${userType}`),

//   // Password management
//   changePassword: (id, userType, newPassword) =>
//     api.put(`/users/${id}/password/${userType}`, newPassword, {
//       headers: { "Content-Type": "text/plain" },
//     }),

//   // Profile management
//   getCurrentUserProfile: () => api.get("/users/me"),
//   changeCredentials: (id, userType, credentialsData) =>
//     api.put(`/users/${id}/credentials/${userType}`, credentialsData),

//   // Role and Permission Management
//   getAllRoles: () => api.get("/users/roles"),
//   assignPermissions: (id, userType, permissionIds) =>
//     api.post(`/users/${id}/permissions/${userType}`, permissionIds),

//   // Password Reset
//   requestPasswordReset: (email) =>
//     api.post("/auth/password-reset-request", { email }),
//   confirmPasswordReset: (resetData) =>
//     api.post("/auth/password-reset-confirm", resetData),
// };

// import api from "./api";

// export const userService = {
//   // Role-based user fetching with pagination
//   getInternalUsers: (page = 0, size = 10) =>
//     api.get(`/users/internal?page=${page}&size=${size}`),

//   getCompanyUsers: (page = 0, size = 10) =>
//     api.get(`/users/company?page=${page}&size=${size}`),

//   getTechnicians: (page = 0, size = 10) =>
//     api.get(`/users/technicians?page=${page}&size=${size}`),

//   getTenantsByCompany: (companyId, page = 0, size = 10) =>
//     api.get(`/users/tenants?companyId=${companyId}&page=${page}&size=${size}`),

//   getClientAdminsByCompany: (companyId, page = 0, size = 10) =>
//     api.get(
//       `/users/client-admins?companyId=${companyId}&page=${page}&size=${size}`
//     ),

//   getSuperAdmins: (page = 0, size = 10) =>
//     api.get(`/users/super-admins?page=${page}&size=${size}`),

//   getSupervisors: (page = 0, size = 10) =>
//     api.get(`/users/supervisors?page=${page}&size=${size}`),

//   // Legacy methods for backward compatibility
//   getAllUsers: () => api.get("/users/internal?page=0&size=1000"), // Fallback
//   getUserById: (id, userType) => api.get(`/users/${id}/${userType}`),
//   createUser: (userData) => api.post("/users", userData),
//   updateUser: (id, userType, userData) =>
//     api.put(`/users/${id}/${userType}`, userData),
//   deleteUser: (id, userType) => api.delete(`/users/${id}/${userType}`),
//   changePassword: (id, userType, newPassword) =>
//     api.put(`/users/${id}/password/${userType}`, newPassword, {
//       headers: { "Content-Type": "text/plain" },
//     }),

//   // Profile management
//   getCurrentUserProfile: () => api.get("/users/me"),
//   changeCredentials: (id, userType, credentialsData) =>
//     api.put(`/users/${id}/credentials/${userType}`, credentialsData),

//   // Role and Permission Management
//   getAllRoles: () => api.get("/users/roles"),
//   assignPermissions: (id, userType, permissionIds) =>
//     api.post(`/users/${id}/permissions/${userType}`, permissionIds),

//   // Password Reset
//   requestPasswordReset: (email) =>
//     api.post("/auth/password-reset-request", { email }),
//   confirmPasswordReset: (resetData) =>
//     api.post("/auth/password-reset-confirm", resetData),
// };

import api from "./api";

export const userService = {
  // Role-based user fetching with pagination
  getInternalUsers: (page = 0, size = 10) =>
    api.get(`/users/internal?page=${page}&size=${size}`),
  getCompanyUsers: (page = 0, size = 10) =>
    api.get(`/users/company?page=${page}&size=${size}`),
  getTechnicians: (page = 0, size = 10) =>
    api.get(`/users/technicians?page=${page}&size=${size}`),
  getTenantsByCompany: (companyId, page = 0, size = 10) =>
    api.get(`/users/tenants?companyId=${companyId}&page=${page}&size=${size}`),
  getClientAdminsByCompany: (companyId, page = 0, size = 10) =>
    api.get(
      `/users/client-admins?companyId=${companyId}&page=${page}&size=${size}`
    ),
  getSuperAdmins: (page = 0, size = 10) =>
    api.get(`/users/super-admins?page=${page}&size=${size}`),
  getSupervisors: (page = 0, size = 10) =>
    api.get(`/users/supervisors?page=${page}&size=${size}`),

  // Legacy methods for backward compatibility
  getAllUsers: () => api.get("/users/internal?page=0&size=1000"), // Fallback
  getUserById: (id, userType) => api.get(`/users/${id}/${userType}`),
  createUser: (userData) => api.post("/users", userData),
  updateUser: (id, userType, userData) =>
    api.put(`/users/${id}/${userType}`, userData),
  deleteUser: (id, userType) => api.delete(`/users/${id}/${userType}`),

  // Updated password change method
  changePassword: (id, userType, credentialsData) =>
    api.put(`/users/${id}/password/${userType}`, credentialsData),

  // Profile management
  getCurrentUserProfile: () => api.get("/users/me"),

  // Updated credentials change method
  changeCredentials: (id, userType, credentialsData) =>
    api.put(`/users/${id}/credentials/${userType}`, credentialsData),

  // Check if user is temporary
  isTemporaryUser: () => api.get("/auth/is-temporary"),

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
