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

//   // Cancel work order
//   cancelWorkOrder: (workOrderId, cancelData) =>
//     api.put(`/work-orders/${workOrderId}/cancel`, cancelData),
// };

// import api from "./api";

// export const workOrderService = {
//   // Create work order (general)
//   createWorkOrder: (workOrderData) => api.post("/work-orders", workOrderData),

//   // Create PM work order (specific endpoint)
//   createPmWorkOrder: (workRequestId, technicianId, checklistId) =>
//     api.post(`/work-orders/pm/${workRequestId}`, null, {
//       params: { technicianId, checklistId },
//     }),

//   // Assign technician to work order
//   assignTechnician: (workOrderId, technicianId) =>
//     api.put(`/work-orders/${workOrderId}/assign-technician`, null, {
//       params: { technicianId },
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

//   // Cancel work order
//   cancelWorkOrder: (workOrderId, cancelData) =>
//     api.put(`/work-orders/${workOrderId}/cancel`, cancelData),
// };

// import api from "./api";

// export const workOrderService = {
//   // Create work order (general)
//   createWorkOrder: (workOrderData) => api.post("/work-orders", workOrderData),

//   // Create PM work order (specific endpoint)
//   createPmWorkOrder: (workRequestId, technicianId, checklistId) =>
//     api.post(`/work-orders/pm/${workRequestId}`, null, {
//       params: { technicianId, checklistId },
//     }),

//   // Assign technician to work order
//   assignTechnician: (workOrderId, technicianId) =>
//     api.put(`/work-orders/${workOrderId}/assign-technician`, null, {
//       params: { technicianId },
//     }),

//   getAllWorkOrders: (page = 0, size = 10) =>
//     api.get("/work-orders", {
//       params: { page, size },
//     }),

//   getWorkOrdersByTechnician: (technicianId, page = 0, size = 10) =>
//     api.get(`/work-orders/technician/${technicianId}`, {
//       params: { page, size },
//     }),

//   getWorkOrdersByTenant: (username, page = 0, size = 10) =>
//     api.get("/work-orders/tenant", {
//       params: { username, page, size },
//     }),

//   getFilteredWorkOrders: (filterData, page = 0, size = 10) =>
//     api.post("/work-orders/filter", filterData, {
//       params: { page, size },
//     }),

//   // Update attempt status
//   updateAttemptStatus: (workOrderId, attemptStatus) =>
//     api.put(`/work-orders/${workOrderId}/attempt-status`, null, {
//       params: { attemptStatus },
//     }),

//   // Cancel work order
//   cancelWorkOrder: (workOrderId, cancelData) =>
//     api.put(`/work-orders/${workOrderId}/cancel`, cancelData),

//   // Complete checklist tasks
//   completeChecklistTasks: (workOrderId, taskCompletions) =>
//     api.post(`/work-orders/${workOrderId}/checklist/complete`, taskCompletions),
// };

// import api from "./api";

// export const workOrderService = {
//   // Create work order (general)
//   createWorkOrder: (workOrderData) => api.post("/work-orders", workOrderData),

//   // Create PM work order (specific endpoint)
//   createPmWorkOrder: (workRequestId, technicianId, checklistId) =>
//     api.post(`/work-orders/pm/${workRequestId}`, null, {
//       params: { technicianId, checklistId },
//     }),

//   // Assign technician to work order
//   assignTechnician: (workOrderId, technicianId) =>
//     api.put(`/work-orders/${workOrderId}/assign-technician`, null, {
//       params: { technicianId },
//     }),

//   getAllWorkOrders: (page = 0, size = 10) =>
//     api.get("/work-orders", {
//       params: { page, size },
//     }),

//   getWorkOrdersByTechnician: (technicianId, page = 0, size = 10) =>
//     api.get(`/work-orders/technician/${technicianId}`, {
//       params: { page, size },
//     }),

//   getWorkOrdersByTenant: (username, page = 0, size = 10) =>
//     api.get("/work-orders/tenant", {
//       params: { username, page, size },
//     }),

//   getFilteredWorkOrders: (filterData, page = 0, size = 10) =>
//     api.post("/work-orders/filter", filterData, {
//       params: { page, size },
//     }),

//   // Update attempt status
//   updateAttemptStatus: (workOrderId, attemptStatus) =>
//     api.put(`/work-orders/${workOrderId}/attempt-status`, null, {
//       params: { attemptStatus },
//     }),

//   // Cancel work order
//   cancelWorkOrder: (workOrderId, cancelData) =>
//     api.put(`/work-orders/${workOrderId}/cancel`, cancelData),

//   // Complete checklist tasks
//   completeChecklistTasks: (workOrderId, taskCompletions) =>
//     api.post(`/work-orders/${workOrderId}/checklist/complete`, taskCompletions),
// };

// import api from "./api";

// export const workOrderService = {
//   // Create work order (general)
//   createWorkOrder: (workOrderData) => api.post("/work-orders", workOrderData),

//   // Create PM work order (specific endpoint)
//   createPmWorkOrder: (workRequestId, technicianId, checklistId) =>
//     api.post(`/work-orders/pm/${workRequestId}`, null, {
//       params: { technicianId, checklistId },
//     }),

//   // Assign technician to work order
//   assignTechnician: (workOrderId, technicianId) =>
//     api.put(`/work-orders/${workOrderId}/assign-technician`, null, {
//       params: { technicianId },
//     }),

//   getAllWorkOrders: (page = 0, size = 10) =>
//     api.get("/work-orders", {
//       params: { page, size },
//     }),

//   getWorkOrdersByTechnician: (technicianId, page = 0, size = 10) =>
//     api.get(`/work-orders/technician/${technicianId}`, {
//       params: { page, size },
//     }),

//   getWorkOrdersByTenant: (username, page = 0, size = 10) =>
//     api.get("/work-orders/tenant", {
//       params: { username, page, size },
//     }),

//   getFilteredWorkOrders: (filterData, page = 0, size = 10) =>
//     api.post("/work-orders/filter", filterData, {
//       params: { page, size },
//     }),

//   // // Update attempt status
//   // updateAttemptStatus: (workOrderId, attemptStatus) =>
//   //   api.put(`/work-orders/${workOrderId}/attempt-status`, null, {
//   //     params: { attemptStatus },
//   //   }),

//   updateAttemptStatus: (workOrderId, attemptStatus, kpiNote = {}) =>
//     api.put(`/work-orders/${workOrderId}/attempt-status`, kpiNote, {
//       params: { attemptStatus },
//     }),

//   // Cancel work order
//   cancelWorkOrder: (workOrderId, cancelData) =>
//     api.put(`/work-orders/${workOrderId}/cancel`, cancelData),

//   // Complete checklist tasks
//   completeChecklistTasks: (workOrderId, taskCompletions) =>
//     api.post(`/work-orders/${workOrderId}/checklist/complete`, taskCompletions),
// };

import api from "./api";

export const workOrderService = {
  // Create work order
  createWorkOrder: (workOrderData) => {
    return api.post("/work-orders", workOrderData);
  },

  // Create PM work order
  createPmWorkOrder: (workRequestId, checklistId, pmScheduleId) => {
    return api.post(`/work-orders/pm/${workRequestId}`, null, {
      params: { checklistId, pmScheduleId },
    });
  },

  // Assign technician to work order
  assignTechnician: (workOrderId, technicianId) => {
    return api.put(`/work-orders/${workOrderId}/assign-technician`, null, {
      params: { technicianId },
    });
  },

  // Assign checklist to work order
  assignChecklist: (workOrderId, checklistId) => {
    return api.put(`/work-orders/${workOrderId}/checklist`, null, {
      params: { checklistId },
    });
  },

  // Cancel work order
  cancelWorkOrder: (workOrderId, cancelData) => {
    return api.put(`/work-orders/${workOrderId}/cancel`, cancelData);
  },

  // Update attempt status
  updateAttemptStatus: (workOrderId, attemptStatus, kpiNote) => {
    return api.put(
      `/work-orders/${workOrderId}/attempt-status`,
      kpiNote || {},
      {
        params: { attemptStatus },
      }
    );
  },

  // Complete checklist tasks
  completeChecklistTasks: (workOrderId, taskCompletions) => {
    return api.post(
      `/work-orders/${workOrderId}/checklist/complete`,
      taskCompletions
    );
  },

  // Get all work orders (paginated)
  getAllWorkOrders: (page = 0, size = 10, sort = "desc") =>
    api.get("/work-orders", {
      params: { page, size, sort },
    }),

  // Get work orders by technician
  getWorkOrdersByTechnician: (
    technicianId,
    page = 0,
    size = 10,
    sort = "desc"
  ) =>
    api.get(`/work-orders/technician/${technicianId}`, {
      params: { page, size, sort },
    }),

  // Get work orders by tenant
  getWorkOrdersByTenant: (username, page = 0, size = 10, sort = "desc") =>
    api.get("/work-orders/tenant", {
      params: { username, page, size, sort },
    }),

  // Get filtered work orders
  getFilteredWorkOrders: (filterData, page = 0, size = 10, sort = "desc") =>
    api.post("/work-orders/filter", filterData, {
      params: { page, size, sort },
    }),
};
