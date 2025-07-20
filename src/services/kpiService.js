import api from "./api";

export const kpiService = {
  // Get KPI records by work order ID
  getKpiRecordsByWorkOrder: (workOrderId) =>
    api.get(`/kpi/work-order/${workOrderId}`),

  // Get all work orders (for dropdown/search suggestions)
  getAllWorkOrders: () => api.get("/work-orders"),
};
