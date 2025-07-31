// import api from "./api";

// export const technicianAvailabilityService = {
//   // Mark technician availability
//   markAvailability: (availabilityData) =>
//     api.post("/technician-availability", availabilityData),

//   // Get availability by technician and date
//   getAvailabilityByTechnician: (technicianId, date) =>
//     api.get(`/technician-availability/technician/${technicianId}/date/${date}`),
// // };

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

//   // Set technician as not available
//   setNotAvailable: (technicianId) =>
//     api.put(`/technicians/${technicianId}/not-available`),

//   // Set technician as available
//   setAvailable: (technicianId) =>
//     api.put(`/technicians/${technicianId}/available`),
// // };

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

//   // Set technician as available
//   setAvailable: (technicianId) =>
//     api.put(`/technicians/${technicianId}/available`),

//   // Update technician availability with reason
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
};
