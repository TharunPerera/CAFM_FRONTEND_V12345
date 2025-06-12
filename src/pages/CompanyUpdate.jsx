import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompanyForm from "../components/CompanyForm";
import { companyService } from "../services/companyService";

const CompanyUpdate = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      navigate("/companies/list", {
        state: { success: "Company updated successfully!" },
      });
    } catch (error) {
      throw error; // Handled in CompanyForm
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
          onClick={() => window.location.reload()}
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
        Update Company
      </h2>
      <CompanyForm
        onSubmit={handleSubmit}
        initialData={memoizedInitialData}
        isEdit={true}
      />
    </div>
  );
};

export default CompanyUpdate;
