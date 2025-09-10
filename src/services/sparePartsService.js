// // import api from "./api";

// // export const sparePartsService = {
// //   createSparePartsRequest: (data) => api.post("/spare-parts-requests", data),

// //   reviewSparePartsRequest: (id, status, reviewComment) => {
// //     const params = new URLSearchParams();
// //     params.append("status", status);
// //     if (reviewComment) {
// //       params.append("reviewComment", reviewComment);
// //     }
// //     return api.put(`/spare-parts-requests/${id}/review?${params.toString()}`);
// //   },

// //   getSparePartsRequestsByWorkOrder: (workOrderId) =>
// //     api.get(`/spare-parts-requests/work-order/${workOrderId}`),

// //   getSparePartsRequestsByTechnician: (technicianId) =>
// //     api.get(`/spare-parts-requests/technician/${technicianId}`),
// // };

// import api from "./api";

// export const sparePartsService = {
//   // Create spare parts request
//   createSparePartsRequest: (requestData) =>
//     api.post("/spare-parts-requests", requestData),

//   // Get all spare parts requests
//   getAllSparePartsRequests: () => api.get("/spare-parts-requests"),

//   // Get spare parts requests by work order
//   getSparePartsRequestsByWorkOrder: (workOrderId) =>
//     api.get(`/spare-parts-requests/work-order/${workOrderId}`),

//   // Get spare parts requests by technician
//   getSparePartsRequestsByTechnician: (technicianId) =>
//     api.get(`/spare-parts-requests/technician/${technicianId}`),

//   // Review spare parts request
//   reviewSparePartsRequest: (requestId, status, reviewComment) =>
//     api.put(`/spare-parts-requests/${requestId}/review`, null, {
//       params: { status, reviewComment },
//     }),
// };

import api from "./api";

export const sparePartsService = {
  // Create spare parts request
  createSparePartsRequest: (requestData) =>
    api.post("/spare-parts-requests", requestData),

  // Get all spare parts requests with pagination
  getAllSparePartsRequests: (page = 0, size = 10, sort = "desc") =>
    api.get("/spare-parts-requests", {
      params: { page, size, sort },
    }),

  // Get filtered spare parts requests
  getFilteredSparePartsRequests: (
    filters,
    page = 0,
    size = 10,
    sort = "desc"
  ) =>
    api.post("/spare-parts-requests/filter", filters, {
      params: { page, size, sort },
    }),

  // Get spare parts requests by work order
  getSparePartsRequestsByWorkOrder: (workOrderId) =>
    api.get(`/spare-parts-requests/work-order/${workOrderId}`),

  // Get spare parts requests by technician
  getSparePartsRequestsByTechnician: (technicianId) =>
    api.get(`/spare-parts-requests/technician/${technicianId}`),

  // Review spare parts request
  reviewSparePartsRequest: (requestId, status, reviewComment) =>
    api.put(`/spare-parts-requests/${requestId}/review`, null, {
      params: { status, reviewComment },
    }),
};
