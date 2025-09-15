import api from "./api";

export const workRequestService = {
  // Create work request (CM/RM)
  createWorkRequest: (workRequestData) => {
    const formData = new FormData();
    formData.append("assetId", workRequestData.assetId);
    formData.append("serviceScopeId", workRequestData.serviceScopeId);
    formData.append("reasonComment", workRequestData.reasonComment || "");
    formData.append("priority", workRequestData.priority);
    formData.append("workRequestType", workRequestData.workRequestType);

    if (workRequestData.images && workRequestData.images.length > 0) {
      workRequestData.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    return api.post("/work-requests", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Create PM schedule
  createPmSchedule: (pmScheduleData) => {
    return api.post("/pm-schedules", pmScheduleData);
  },

  // Get all work requests (paginated)
  getAllWorkRequests: (page = 0, size = 10, sort = "desc") =>
    api.get("/work-requests", {
      params: { page, size, sort },
    }),

  // Get filtered work requests
  getFilteredWorkRequests: (filterData, page = 0, size = 10, sort = "desc") =>
    api.post("/work-requests/filter", filterData, {
      params: { page, size, sort },
    }),

  // Review work request (for supervisors)
  reviewWorkRequest: (workRequestId, status, reviewComment) => {
    return api.put(`/work-requests/${workRequestId}/review`, null, {
      params: {
        status,
        reviewComment,
      },
    });
  },

  // Assign service scope to PM work request
  assignServiceScopeToPmWorkRequest: (workRequestId, serviceScopeId) => {
    return api.put(`/work-requests/${workRequestId}/service-scope`, null, {
      params: {
        serviceScopeId,
      },
    });
  },

  // Get PM schedule calendar data
  getPmScheduleCalendar: (
    scheduleId,
    contractId,
    startDate = null,
    endDate = null,
    page = 0,
    size = 50
  ) => {
    const params = {
      contractId,
      page,
      size,
    };

    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return api.get(`/pm-schedules/${scheduleId}/calendar`, { params });
  },

  // Get PM schedules by contract
  getPmSchedulesByContract: (contractId) => {
    return api.get("/pm-schedules", {
      params: { contractId },
    });
  },
};
