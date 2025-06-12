// import { useState, useEffect } from "react";
// import CompanyForm from "../components/CompanyForm";
// import CompanyTable from "../components/CompanyTable";
// import { companyService } from "../services/companyService";

// const CompanyManagement = () => {
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     companyService.getAllCompanies().then((res) => setCompanies(res.data));
//   }, []);

//   const handleSubmit = async (company) => {
//     try {
//       await companyService.createCompany(company);
//       const res = await companyService.getAllCompanies();
//       setCompanies(res.data);
//     } catch (error) {
//       console.error("Error creating company:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Company Management</h2>
//       <CompanyForm onSubmit={handleSubmit} />
//       <CompanyTable companies={companies} />
//     </div>
//   );
// };

// export default CompanyManagement;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyForm from "../components/CompanyForm";
import { companyService } from "../services/companyService";

const CompanyManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.success || null
  );

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (company) => {
    try {
      await companyService.createCompany(company);
      setSuccessMessage("Company created successfully!");
    } catch (error) {
      throw error; // Handled in CompanyForm
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Company Management
        </h2>
        <button
          onClick={() => navigate("/companies/list")}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          View Companies
        </button>
      </div>
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          {successMessage}
        </div>
      )}
      <CompanyForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CompanyManagement;
