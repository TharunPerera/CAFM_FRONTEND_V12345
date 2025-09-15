// // import api from "./api";

// // export const approvalService = {
// //   // Spare Parts Requests
// //   getAllSparePartsRequests: () => api.get("/spare-parts-requests"),

// //   getSparePartsRequestsByWorkOrder: (workOrderId) =>
// //     api.get(`/spare-parts-requests/work-order/${workOrderId}`),

// //   getSparePartsRequestsByTechnician: (technicianId) =>
// //     api.get(`/spare-parts-requests/technician/${technicianId}`),

// //   reviewSparePartsRequest: (requestId, status, reviewComment) =>
// //     api.put(`/spare-parts-requests/${requestId}/review`, null, {
// //       params: { status, reviewComment },
// //     }),

// //   // Work Requests
// //   getAllWorkRequests: () => api.get("/work-requests"),

// //   reviewWorkRequest: (workRequestId, status, reviewComment) =>
// //     api.put(`/work-requests/${workRequestId}/review`, null, {
// //       params: { status, reviewComment },
// //     }),
// // };

// // import api from "./api";

// // export const approvalService = {
// //   // Spare Parts Requests
// //   getAllSparePartsRequests: (page = 0, size = 10) =>
// //     api.get("/spare-parts-requests", {
// //       params: { page, size },
// //     }),

// //   getSparePartsRequestsByWorkOrder: (workOrderId) =>
// //     api.get(`/spare-parts-requests/work-order/${workOrderId}`),

// //   getSparePartsRequestsByTechnician: (technicianId) =>
// //     api.get(`/spare-parts-requests/technician/${technicianId}`),

// //   reviewSparePartsRequest: (requestId, status, reviewComment) =>
// //     api.put(`/spare-parts-requests/${requestId}/review`, null, {
// //       params: { status, reviewComment },
// //     }),

// //   // Work Requests
// //   getAllWorkRequests: (page = 0, size = 10) =>
// //     api.get("/work-requests", {
// //       params: { page, size },
// //     }),

// //   reviewWorkRequest: (workRequestId, status, reviewComment) =>
// //     api.put(`/work-requests/${workRequestId}/review`, null, {
// //       params: { status, reviewComment },
// //     }),
// // };

// import api from "./api";

// export const approvalService = {
//   // Spare Parts Requests
//   getAllSparePartsRequests: (page = 0, size = 10) =>
//     api.get("/spare-parts-requests", {
//       params: { page, size },
//     }),

//   getSparePartsRequestsByWorkOrder: (workOrderId) =>
//     api.get(`/spare-parts-requests/work-order/${workOrderId}`),

//   getSparePartsRequestsByTechnician: (technicianId) =>
//     api.get(`/spare-parts-requests/technician/${technicianId}`),

//   reviewSparePartsRequest: (requestId, status, reviewComment) =>
//     api.put(`/spare-parts-requests/${requestId}/review`, null, {
//       params: { status, reviewComment },
//     }),

//   // Work Requests
//   getAllWorkRequests: (page = 0, size = 10) =>
//     api.get("/work-requests", {
//       params: { page, size },
//     }),

//   getFilteredWorkRequestsForApproval: (filters, page = 0, size = 10) =>
//     api.post("/work-requests/approval-filter", filters, {
//       params: { page, size },
//     }),

//   reviewWorkRequest: (workRequestId, status, reviewComment) =>
//     api.put(`/work-requests/${workRequestId}/review`, null, {
//       params: { status, reviewComment },
//     }),
// };

import api from "./api";

export const approvalService = {
  // Spare Parts Requests
  getAllSparePartsRequests: (page = 0, size = 10) =>
    api.get("/spare-parts-requests", {
      params: { page, size },
    }),

  getSparePartsRequestsByWorkOrder: (workOrderId) =>
    api.get(`/spare-parts-requests/work-order/${workOrderId}`),

  getSparePartsRequestsByTechnician: (technicianId) =>
    api.get(`/spare-parts-requests/technician/${technicianId}`),

  reviewSparePartsRequest: (requestId, status, reviewComment) =>
    api.put(`/spare-parts-requests/${requestId}/review`, null, {
      params: { status, reviewComment },
    }),

  // Work Requests
  getAllWorkRequests: (page = 0, size = 10, sort = "desc") =>
    api.get("/work-requests", {
      params: { page, size, sort },
    }),

  getFilteredWorkRequestsForApproval: (
    filters,
    page = 0,
    size = 10,
    sort = "desc"
  ) =>
    api.post("/work-requests/approval-filter", filters, {
      params: { page, size, sort },
    }),

  reviewWorkRequest: (workRequestId, status, reviewComment) =>
    api.put(`/work-requests/${workRequestId}/review`, null, {
      params: { status, reviewComment },
    }),
};
