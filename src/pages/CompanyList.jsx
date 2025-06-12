import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { companyService } from "../services/companyService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.success) {
      setSuccessMessage(location.state.success);
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await companyService.getAllCompanies();
      setCompanies(res.data || []);
    } catch (err) {
      setError("Failed to load companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await companyService.deleteCompany(id);
        await fetchCompanies();
        setSuccessMessage("Company deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError("Failed to delete company. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
          <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto my-12 shadow-md">
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={fetchCompanies}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
        Company List
      </h2>
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
      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Company Name
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Contact Email
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Contact Phone
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Address
              </th>
              <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company.companyId} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-600">
                  {company.companyId}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {company.companyName}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {company.contactEmail}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {company.contactPhone}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {company.address}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/companies/${company.companyId}`)
                      }
                      className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      title="Update Company"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(company.companyId)}
                      className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Delete Company"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;
