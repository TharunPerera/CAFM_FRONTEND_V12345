import api from "./api";

export const technicianAvailabilityService = {
  // Mark technician availability
  markAvailability: (availabilityData) =>
    api.post("/technician-availability", availabilityData),

  // Get availability by technician and date
  getAvailabilityByTechnician: (technicianId, date) =>
    api.get(`/technician-availability/technician/${technicianId}/date/${date}`),
};
