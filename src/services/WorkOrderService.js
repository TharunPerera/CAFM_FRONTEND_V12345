// import api from "./api";

// export const workOrderService = {
//   // Create work order (general)
//   createWorkOrder: (workOrderData) => api.post("/work-orders", workOrderData),

//   // Create PM work order (specific endpoint)
//   createPmWorkOrder: (workRequestId, technicianId, checklistId) =>
//     api.post(`/work-orders/pm/${workRequestId}`, null, {
//       params: { technicianId, checklistId },
//     }),

//   // Get all work orders
//   getAllWorkOrders: () => api.get("/work-orders"),

//   // Get work orders by technician
//   getWorkOrdersByTechnician: (technicianId) =>
//     api.get(`/work-orders/technician/${technicianId}`),

//   // Update attempt status
//   updateAttemptStatus: (workOrderId, attemptStatus) =>
//     api.put(`/work-orders/${workOrderId}/attempt-status`, null, {
//       params: { attemptStatus },
//     }),

//   // Assign checklist to work order
//   assignChecklist: (workOrderId, checklistId) =>
//     api.put(`/work-orders/${workOrderId}/checklist`, null, {
//       params: { checklistId },
//     }),
// // };

// import api from "./api";

// export const workOrderService = {
//   // Create work order (general)
//   createWorkOrder: (workOrderData) => api.post("/work-orders", workOrderData),

//   // Create PM work order (specific endpoint)
//   createPmWorkOrder: (workRequestId, technicianId, checklistId) =>
//     api.post(`/work-orders/pm/${workRequestId}`, null, {
//       params: { technicianId, checklistId },
//     }),

//   // Get all work orders
//   getAllWorkOrders: () => api.get("/work-orders"),

//   // Get work orders by technician
//   getWorkOrdersByTechnician: (technicianId) =>
//     api.get(`/work-orders/technician/${technicianId}`),

//   // Update attempt status
//   updateAttemptStatus: (workOrderId, attemptStatus) =>
//     api.put(`/work-orders/${workOrderId}/attempt-status`, null, {
//       params: { attemptStatus },
//     }),
// };

import api from "./api";

export const workOrderService = {
  // Create work order (general)
  createWorkOrder: (workOrderData) => api.post("/work-orders", workOrderData),

  // Create PM work order (specific endpoint)
  createPmWorkOrder: (workRequestId, technicianId, checklistId) =>
    api.post(`/work-orders/pm/${workRequestId}`, null, {
      params: { technicianId, checklistId },
    }),

  // Get all work orders
  getAllWorkOrders: () => api.get("/work-orders"),

  // Get work orders by technician
  getWorkOrdersByTechnician: (technicianId) =>
    api.get(`/work-orders/technician/${technicianId}`),

  // Update attempt status
  updateAttemptStatus: (workOrderId, attemptStatus) =>
    api.put(`/work-orders/${workOrderId}/attempt-status`, null, {
      params: { attemptStatus },
    }),

  // Cancel work order
  cancelWorkOrder: (workOrderId, cancelData) =>
    api.put(`/work-orders/${workOrderId}/cancel`, cancelData),
};
