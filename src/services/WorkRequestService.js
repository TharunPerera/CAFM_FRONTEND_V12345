import api from "./api";

export const workRequestService = {
  // Create work request (CM/RM)
  createWorkRequest: (workRequestData) => {
    const formData = new FormData();

    // Basic fields
    formData.append("assetId", workRequestData.assetId);
    formData.append("reasonComment", workRequestData.reasonComment || "");
    formData.append("priority", workRequestData.priority);
    formData.append("workRequestType", workRequestData.workRequestType);

    // Images (up to 2)
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

  // Get all work requests
  getAllWorkRequests: () => api.get("/work-requests"),

  // Review work request (for supervisors)
  reviewWorkRequest: (workRequestId, status, reviewComment) => {
    return api.put(`/work-requests/${workRequestId}/review`, null, {
      params: {
        status,
        reviewComment,
      },
    });
  },
};
