import api from "./api";

export const companyService = {
  createCompany: (company) => api.post("/companies", company),
  getAllCompanies: () => api.get("/companies"),
  getCompanyById: (id) => api.get(`/companies/${id}`),
  updateCompany: (id, company) => api.put(`/companies/${id}`, company),
  deleteCompany: (id) => api.delete(`/companies/${id}`),
};
