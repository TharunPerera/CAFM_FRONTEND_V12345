// import api from "./api";

// export const checklistService = {
//   createChecklist: (data) => api.post("/checklists", data),

//   updateChecklist: (id, data) => api.put(`/checklists/${id}`, data),

//   deleteChecklist: (id) => api.delete(`/checklists/${id}`),

//   getChecklistsByServiceScope: (serviceScopeId) =>
//     api.get(`/checklists/service-scope/${serviceScopeId}`),
// };

// import api from "./api";

// export const checklistService = {
//   createChecklist: (data) => api.post("/checklists", data),
//   updateChecklist: (id, data) => api.put(`/checklists/${id}`, data),
//   deleteChecklist: (id) => api.delete(`/checklists/${id}`),
//   getChecklistsByServiceScope: (serviceScopeId) =>
//     api.get(`/checklists/service-scope/${serviceScopeId}`),
//   getAllChecklists: (page = 0, size = 10) =>
//     api.get(`/checklists?page=${page}&size=${size}`),
//   getChecklistById: (id) => api.get(`/checklists/${id}`),
//   searchChecklistsByName: (name, page = 0, size = 10) =>
//     api.get(`/checklists/search?name=${name}&page=${page}&size=${size}`),
// };

import api from "./api";

export const checklistService = {
  createChecklist: (data) => api.post("/checklists", data),
  updateChecklist: (id, data) => api.put(`/checklists/${id}`, data),
  deleteChecklist: (id) => api.delete(`/checklists/${id}`),
  getChecklistsByServiceScope: (serviceScopeId) =>
    api.get(`/checklists/service-scope/${serviceScopeId}`),
  getAllChecklists: (page = 0, size = 10) =>
    api.get(`/checklists?page=${page}&size=${size}`),
  getChecklistById: (id) => api.get(`/checklists/${id}`),
  searchChecklistsByName: (name, page = 0, size = 10) =>
    api.get(
      `/checklists/search?name=${encodeURIComponent(
        name
      )}&page=${page}&size=${size}`
    ),
};
