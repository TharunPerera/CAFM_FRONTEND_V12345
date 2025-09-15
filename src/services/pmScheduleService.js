import api from "./api";

export const pmScheduleService = {
  // Create PM schedule
  createPmSchedule: (pmScheduleData) => {
    return api.post("/pm-schedules", pmScheduleData);
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
