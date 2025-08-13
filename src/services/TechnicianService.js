// import api from "./api";

// export const technicianService = {
//   // Get all technicians with pagination and optional status filter
//   getAllTechnicians: (page = 0, size = 10, status = null) => {
//     const params = { page, size };
//     if (status) {
//       params.status = status;
//     }
//     return api.get("/technicians", { params });
//   },

//   // Get technicians ordered by least assigned work orders
//   getTechniciansByLeastAssigned: () => api.get("/technicians/least-assigned"),

//   // Update technician availability with status and optional reason
//   updateAvailability: (technicianId, availabilityData) =>
//     api.put(`/technicians/${technicianId}/availability`, availabilityData),
// };

import api from "./api";

export const technicianService = {
  // Get all technicians with pagination and optional status filter
  getAllTechnicians: (page = 0, size = 10, status = null) => {
    const params = { page, size };
    if (status) {
      params.status = status;
    }
    return api.get("/technicians", { params });
  },

  // Get technicians ordered by least assigned work orders
  getTechniciansByLeastAssigned: () => api.get("/technicians/least-assigned"),

  // Update technician availability with status and optional reason
  updateAvailability: (technicianId, availabilityData) =>
    api.put(`/technicians/${technicianId}/availability`, availabilityData),

  // Get technician skills
  getTechnicianSkills: (technicianId) =>
    api.get(`/technicians/${technicianId}/skills`),

  // Update technician skills
  updateSkills: (technicianId, skillData) =>
    api.patch(`/technicians/${technicianId}/skills`, skillData),

  // Find technicians by skill and availability
  findTechniciansBySkillAndAvailability: (
    skill,
    status,
    page = 0,
    size = 10
  ) => {
    const params = { skill, status, page, size };
    return api.get("/technicians/search", { params });
  },
};
