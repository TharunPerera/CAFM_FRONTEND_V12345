// import api from "./api";

// export const kpiService = {
//   // Get KPI records by work order ID
//   getKpiRecordsByWorkOrder: (workOrderId) =>
//     api.get(`/kpi/work-order/${workOrderId}`),

//   // Get all work orders (for dropdown/search suggestions)
//   getAllWorkOrders: () => api.get("/work-orders"),
// };

// import api from "./api";

// export const kpiService = {
//   // Get KPI records by work order ID
//   getKpiRecordsByWorkOrder: (workOrderId) =>
//     api.get(`/kpi/work-order/${workOrderId}`),

//   // Get all work orders (for dropdown/search suggestions)
//   getAllWorkOrders: () => api.get("/work-orders"),
// };

import api from "./api";

export const kpiService = {
  // Get KPI records by work order ID
  getKpiRecordsByWorkOrder: (workOrderId) =>
    api.get(`/kpi/work-order/${workOrderId}`),

  getAllKpiRecords: (page = 0, size = 10, filters = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    // Add date filters if provided
    if (filters.startDate) {
      params.append("startDate", filters.startDate);
    }
    if (filters.endDate) {
      params.append("endDate", filters.endDate);
    }

    return api.get(`/kpi?${params.toString()}`);
  },

  // Get all work orders (for dropdown/search suggestions)
  getAllWorkOrders: () => api.get("/work-orders"),
};
