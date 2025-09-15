import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Building, ArrowLeft, CheckCircle } from "lucide-react";
import CompanyForm from "../components/CompanyForm";
import { companyService } from "../services/companyService";

const CompanyUpdate = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await companyService.getCompanyById(companyId);
        setInitialData(res.data || {});
      } catch (err) {
        setError("Failed to load company details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [companyId]);

  // Memoize initialData to ensure stability
  const memoizedInitialData = useMemo(
    () => ({
      companyName: initialData.companyName || "",
      contactEmail: initialData.contactEmail || "",
      contactPhone: initialData.contactPhone || "",
      address: initialData.address || "",
    }),
    [
      initialData.companyName,
      initialData.contactEmail,
      initialData.contactPhone,
      initialData.address,
    ]
  );

  const handleSubmit = async (company) => {
    try {
      await companyService.updateCompany(companyId, company);
      setSuccessMessage("Company updated successfully!");
      setTimeout(() => {
        navigate("/companies/list", {
          state: { success: "Company updated successfully!" },
        });
      }, 2000);
    } catch (error) {
      throw error; // Handled in CompanyForm
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
          <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto shadow-xl border border-red-100">
          <p className="text-lg font-medium flex items-center justify-center">
            <svg
              className="w-5 h-5 text-red-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/companies")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Building className="w-8 h-8 text-blue-600" />
                  Update Company
                </h1>
                <p className="text-gray-600 mt-1">Edit company details</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/companies/list")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                <Building className="w-5 h-5 mr-2" />
                View All Companies
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-xl shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <p className="ml-3 text-green-700 font-medium">
                {successMessage}
              </p>
            </div>
          </div>
        )}

        <CompanyForm
          onSubmit={handleSubmit}
          initialData={memoizedInitialData}
          isEdit={true}
        />
      </div>
    </div>
  );
};

export default CompanyUpdate;
