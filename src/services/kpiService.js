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

// import api from "./api";

// export const kpiService = {
//   // Get KPI records by work order ID
//   getKpiRecordsByWorkOrder: (workOrderId) =>
//     api.get(`/kpi/work-order/${workOrderId}`),

//   getAllKpiRecords: (page = 0, size = 10, filters = {}) => {
//     const params = new URLSearchParams({
//       page: page.toString(),
//       size: size.toString(),
//     });

//     // Add date filters if provided
//     if (filters.startDate) {
//       params.append("startDate", filters.startDate);
//     }
//     if (filters.endDate) {
//       params.append("endDate", filters.endDate);
//     }

//     return api.get(`/kpi?${params.toString()}`);
//   },

//   // Get all work orders (for dropdown/search suggestions)
//   getAllWorkOrders: () => api.get("/work-orders"),
// };

import api from "./api";

export const kpiService = {
  // Get KPI records by work order ID
  getKpiRecordsByWorkOrder: (workOrderId) =>
    api.get(`/kpi/work-order/${workOrderId}`),

  // Get filtered KPI records with pagination
  getFilteredKpiRecords: (page = 0, size = 10, filters = {}) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    // Add filters if provided, ensuring raw numeric IDs
    if (filters.kpiRecordId) {
      params.append("kpiRecordId", filters.kpiRecordId);
    }
    if (filters.workOrderId) {
      params.append("workOrderId", filters.workOrderId);
    }
    if (filters.startDate) {
      params.append("startDate", filters.startDate);
    }
    if (filters.endDate) {
      params.append("endDate", filters.endDate);
    }
    if (filters.overallKpiMet !== undefined && filters.overallKpiMet !== "") {
      params.append("overallKpiMet", filters.overallKpiMet.toString());
    }

    return api.get(`/kpi?${params.toString()}`);
  },

  // Get all work orders (for dropdown/search suggestions if needed)
  getAllWorkOrders: () => api.get("/work-orders"),
};
