import api from "./api";

export const sparePartsService = {
  createSparePartsRequest: (data) => api.post("/spare-parts-requests", data),

  reviewSparePartsRequest: (id, status, reviewComment) => {
    const params = new URLSearchParams();
    params.append("status", status);
    if (reviewComment) {
      params.append("reviewComment", reviewComment);
    }
    return api.put(`/spare-parts-requests/${id}/review?${params.toString()}`);
  },

  getSparePartsRequestsByWorkOrder: (workOrderId) =>
    api.get(`/spare-parts-requests/work-order/${workOrderId}`),

  getSparePartsRequestsByTechnician: (technicianId) =>
    api.get(`/spare-parts-requests/technician/${technicianId}`),
};
