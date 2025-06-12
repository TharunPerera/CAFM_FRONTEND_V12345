// import api from "./api";

// export const serviceManagementService = {
//   // Service CRUD
//   getServices: () => api.get("/service-management/services"),
//   createService: (service) => api.post("/service-management/services", service),
//   createServicesBulk: (services) =>
//     api.post("/service-management/services/bulk", services),
//   updateService: (id, service) =>
//     api.put(`/service-management/services/${id}`, service),
//   deleteService: (id) => api.delete(`/service-management/services/${id}`),
//   deleteServicesBulk: (ids) =>
//     api.post("/service-management/services/bulk/delete", { ids }),

//   // SubService CRUD
//   getSubServices: () => api.get("/service-management/sub-services"),
//   createSubService: (subService) =>
//     api.post("/service-management/sub-services", subService),
//   createSubServicesBulk: (subServices) =>
//     api.post("/service-management/sub-services/bulk", subServices),
//   updateSubService: (id, subService) =>
//     api.put(`/service-management/sub-services/${id}`, subService),
//   deleteSubService: (id) =>
//     api.delete(`/service-management/sub-services/${id}`),
//   deleteSubServicesBulk: (ids) =>
//     api.post("/service-management/sub-services/bulk/delete", { ids }),

//   // ServiceScope CRUD
//   getServiceScopes: () => api.get("/service-management/service-scopes"),
//   createServiceScope: (serviceScope) =>
//     api.post("/service-management/service-scopes", serviceScope),
//   createServiceScopesBulk: (serviceScopes) =>
//     api.post("/service-management/service-scopes/bulk", serviceScopes),
//   updateServiceScope: (id, serviceScope) =>
//     api.put(`/service-management/service-scopes/${id}`, serviceScope),
//   deleteServiceScope: (id) =>
//     api.delete(`/service-management/service-scopes/${id}`),
//   deleteServiceScopesBulk: (ids) =>
//     api.post("/service-management/service-scopes/bulk/delete", { ids }),
// };

// //11111
// import api from "./api";

// export const serviceManagementService = {
//   // Service CRUD
//   getServices: () => api.get("/service-management/services"),
//   createService: (service) => api.post("/service-management/services", service),
//   createServicesBulk: (services) =>
//     api.post("/service-management/services/bulk", services),
//   updateService: (id, service) =>
//     api.put(`/service-management/services/${id}`, service),
//   deleteService: (id) => api.delete(`/service-management/services/${id}`),
//   deleteServicesBulk: (ids) =>
//     api.delete("/service-management/services/bulk", { data: { ids } }),

//   // SubService CRUD
//   getSubServices: () => api.get("/service-management/sub-services"),
//   createSubService: (subService) =>
//     api.post("/service-management/sub-services", subService),
//   createSubServicesBulk: (subServices) =>
//     api.post("/service-management/sub-services/bulk", subServices),
//   updateSubService: (id, subService) =>
//     api.put(`/service-management/sub-services/${id}`, subService),
//   deleteSubService: (id) =>
//     api.delete(`/service-management/sub-services/${id}`),
//   deleteSubServicesBulk: (ids) =>
//     api.delete("/service-management/sub-services/bulk", { data: { ids } }),

//   // ServiceScope CRUD
//   getServiceScopes: () => api.get("/service-management/service-scopes"),
//   createServiceScope: (serviceScope) =>
//     api.post("/service-management/service-scopes", serviceScope),
//   createServiceScopesBulk: (serviceScopes) =>
//     api.post("/service-management/service-scopes/bulk", serviceScopes),
//   updateServiceScope: (id, serviceScope) =>
//     api.put(`/service-management/service-scopes/${id}`, serviceScope),
//   deleteServiceScope: (id) =>
//     api.delete(`/service-management/service-scopes/${id}`),
//   deleteServiceScopesBulk: (ids) =>
//     api.delete("/service-management/service-scopes/bulk", { data: { ids } }),
// };

import api from "./api";

export const serviceManagementService = {
  // Service CRUD
  getServices: () => api.get("/service-management/services"),
  createService: (service) => api.post("/service-management/services", service),
  createServicesBulk: (services) =>
    api.post("/service-management/services/bulk", services),
  updateService: (id, service) =>
    api.put(`/service-management/services/${id}`, service),
  deleteService: (id) => api.delete(`/service-management/services/${id}`),
  deleteServicesBulk: (ids) =>
    api.delete("/service-management/services/bulk", { data: { ids } }),

  // SubService CRUD
  getSubServices: () => api.get("/service-management/sub-services"),
  createSubService: (subService) =>
    api.post("/service-management/sub-services", subService),
  createSubServicesBulk: (subServices) =>
    api.post("/service-management/sub-services/bulk", subServices),
  updateSubService: (id, subService) =>
    api.put(`/service-management/sub-services/${id}`, subService),
  deleteSubService: (id) =>
    api.delete(`/service-management/sub-services/${id}`),
  deleteSubServicesBulk: (ids) =>
    api.delete("/service-management/sub-services/bulk", { data: { ids } }),

  // ServiceScope CRUD
  getServiceScopes: () => api.get("/service-management/service-scopes"),
  createServiceScope: (serviceScope) =>
    api.post("/service-management/service-scopes", serviceScope),
  createServiceScopesBulk: (serviceScopes) =>
    api.post("/service-management/service-scopes/bulk", serviceScopes),
  updateServiceScope: (id, serviceScope) =>
    api.put(`/service-management/service-scopes/${id}`, serviceScope),
  deleteServiceScope: (id) =>
    api.delete(`/service-management/service-scopes/${id}`),
  deleteServiceScopesBulk: (ids) =>
    api.delete("/service-management/service-scopes/bulk", { data: { ids } }),
};
