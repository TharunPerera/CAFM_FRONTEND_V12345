import api from "./api";

export const approvalService = {
  // Spare Parts Requests
  getAllSparePartsRequests: () => api.get("/spare-parts-requests"),

  getSparePartsRequestsByWorkOrder: (workOrderId) =>
    api.get(`/spare-parts-requests/work-order/${workOrderId}`),

  getSparePartsRequestsByTechnician: (technicianId) =>
    api.get(`/spare-parts-requests/technician/${technicianId}`),

  reviewSparePartsRequest: (requestId, status, reviewComment) =>
    api.put(`/spare-parts-requests/${requestId}/review`, null, {
      params: { status, reviewComment },
    }),

  // Work Requests
  getAllWorkRequests: () => api.get("/work-requests"),

  reviewWorkRequest: (workRequestId, status, reviewComment) =>
    api.put(`/work-requests/${workRequestId}/review`, null, {
      params: { status, reviewComment },
    }),
};
