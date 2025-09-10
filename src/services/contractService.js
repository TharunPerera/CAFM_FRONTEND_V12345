// import api from "./api";

// export const contractService = {
//   getAllContracts: () => api.get("/contracts"),
//   getContractById: (id) => api.get(`/contracts/${id}`),
//   getServices: () => api.get("/contracts/services"),
//   getSubServices: (serviceId) =>
//     api.get(`/contracts/sub-services/${serviceId}`),
//   getServiceScopes: (subServiceId) =>
//     api.get(`/contracts/service-scopes/${subServiceId}`),
//   getSlaTypes: () => api.get("/contracts/sla-types"),
//   getPriorityLevels: (slaTypeId) =>
//     api.get(`/contracts/priority-levels/${slaTypeId}`),
//   createContract: (data) => api.post("/contracts", data),

//   // Fixed endpoints to match backend
//   updateContractDetails: (id, data) =>
//     api.patch(`/contracts/${id}/details`, data),
//   updateContractServices: (id, services) =>
//     api.patch(`/contracts/${id}/services`, services),
//   updateEmployeeTimings: (id, timings) =>
//     api.patch(`/contracts/${id}/employee-timings`, timings),
//   updateSlaRules: (id, slaRules) =>
//     api.patch(`/contracts/${id}/sla-rules`, slaRules),

//   deleteContract: (id) => api.delete(`/contracts/${id}`),
// };

import api from "./api";

export const contractService = {
  getAllContracts: () => api.get("/contracts"),
  getContractById: (id) => api.get(`/contracts/${id}`),
  getServices: () => api.get("/contracts/services"),
  getSubServices: (serviceId) =>
    api.get(`/contracts/sub-services/${serviceId}`),
  getServiceScopes: (subServiceId) =>
    api.get(`/contracts/service-scopes/${subServiceId}`),
  getSlaTypes: () => api.get("/contracts/sla-types"),
  getPriorityLevels: (slaTypeId) =>
    api.get(`/contracts/priority-levels/${slaTypeId}`),
  createContract: (data) => api.post("/contracts", data),
  updateContractDetails: (id, data) =>
    api.patch(`/contracts/${id}/details`, data),
  updateContractServices: (id, services) =>
    api.patch(`/contracts/${id}/services`, services),
  updateEmployeeTimings: (id, timings) =>
    api.patch(`/contracts/${id}/employee-timings`, timings),
  updateSlaRules: (id, slaRules) =>
    api.patch(`/contracts/${id}/sla-rules`, slaRules),
  deleteContract: (id) => api.delete(`/contracts/${id}`),
  // New method to fetch filtered contracts with pagination and sorting
  getFilteredContracts: (filters, page, size, sortOrder) =>
    api.post(
      `/contracts/filter?page=${page}&size=${size}&sort=${sortOrder}`,
      filters
    ),
};
