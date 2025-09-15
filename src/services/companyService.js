// import api from "./api";

// export const companyService = {
//   createCompany: (company) => api.post("/companies", company),
//   getAllCompanies: () => api.get("/companies"),
//   getCompanyById: (id) => api.get(`/companies/${id}`),
//   updateCompany: (id, company) => api.put(`/companies/${id}`, company),
//   deleteCompany: (id) => api.delete(`/companies/${id}`),
//   // New method to fetch contracts by company ID
//   getContractsByCompanyId: (id) => api.get(`/companies/${id}/contracts`),
// };

import api from "./api";

export const companyService = {
  createCompany: (company) => api.post("/companies", company),
  getAllCompanies: () => api.get("/companies"),
  getCompanyById: (id) => api.get(`/companies/${id}`),
  updateCompany: (id, company) => api.put(`/companies/${id}`, company),
  deleteCompany: (id) => api.delete(`/companies/${id}`),
  getContractsByCompanyId: (id) => api.get(`/companies/${id}/contracts`),
  // New method to fetch filtered companies with pagination and sorting
  getFilteredCompanies: (filters, page, size, sortOrder, sortField) =>
    api.post(
      `/companies/filter?page=${page}&size=${size}&sort=${sortOrder}`,
      filters
    ),
};
