// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// const CompanyList = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.state?.success) {
//       setSuccessMessage(location.state.success);
//       const timer = setTimeout(() => {
//         setSuccessMessage(null);
//         navigate(location.pathname, { replace: true, state: {} });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [location.state, navigate]);

//   const fetchCompanies = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await companyService.getAllCompanies();
//       setCompanies(res.data || []);
//     } catch (err) {
//       setError("Failed to load companies. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this company?")) {
//       try {
//         await companyService.deleteCompany(id);
//         await fetchCompanies();
//         setSuccessMessage("Company deleted successfully!");
//         setTimeout(() => setSuccessMessage(null), 3000);
//       } catch (err) {
//         setError("Failed to delete company. Please try again.");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto my-12 shadow-md">
//         <p className="text-lg font-medium">{error}</p>
//         <button
//           onClick={fetchCompanies}
//           className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       <h2 className="text-3xl font-semibold text-gray-900 mb-8">
//         Company List
//       </h2>
//       {successMessage && (
//         <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//           {successMessage}
//         </div>
//       )}
//       <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                 ID
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                 Company Name
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                 Contact Email
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                 Contact Phone
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                 Address
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {companies.map((company) => (
//               <tr key={company.companyId} className="hover:bg-gray-50">
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {company.companyId}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {company.companyName}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {company.contactEmail}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {company.contactPhone}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   {company.address}
//                 </td>
//                 <td className="py-4 px-6 text-sm text-gray-600">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() =>
//                         navigate(`/companies/${company.companyId}`)
//                       }
//                       className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                       title="Update Company"
//                     >
//                       <PencilIcon className="h-4 w-4 mr-1" />
//                       Update
//                     </button>
//                     <button
//                       onClick={() => handleDelete(company.companyId)}
//                       className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                       title="Delete Company"
//                     >
//                       <TrashIcon className="h-4 w-4 mr-1" />
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CompanyList;

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Building, ArrowLeft, Plus, CheckCircle } from "lucide-react";
// import CompanyTable from "../components/CompanyTable";
// import { companyService } from "../services/companyService";

// const CompanyList = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     if (location.state?.success) {
//       setSuccessMessage(location.state.success);
//       const timer = setTimeout(() => {
//         setSuccessMessage(null);
//         navigate(location.pathname, { replace: true, state: {} });
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [location.state, navigate]);

//   const fetchCompanies = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await companyService.getAllCompanies();
//       setCompanies(res.data || []);
//     } catch (err) {
//       setError("Failed to load companies. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this company?")) {
//       try {
//         await companyService.deleteCompany(id);
//         await fetchCompanies();
//         setSuccessMessage("Company deleted successfully!");
//         setTimeout(() => setSuccessMessage(null), 3000);
//       } catch (err) {
//         setError("Failed to delete company. Please try again.");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto shadow-xl border border-red-100">
//           <p className="text-lg font-medium flex items-center justify-center">
//             <svg
//               className="w-5 h-5 text-red-400 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             {error}
//           </p>
//           <button
//             onClick={fetchCompanies}
//             className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate("/companies")}
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </button>
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//                   <Building className="w-8 h-8 text-blue-600" />
//                   Company List
//                 </h1>
//                 <p className="text-gray-600 mt-1">
//                   Browse and manage all companies
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate("/companies/create")}
//                 className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
//               >
//                 <Plus className="w-5 h-5 mr-2" />
//                 Create Company
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Success Message */}
//         {successMessage && (
//           <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-xl shadow-lg">
//             <div className="flex items-center">
//               <CheckCircle className="w-5 h-5 text-green-400" />
//               <p className="ml-3 text-green-700 font-medium">
//                 {successMessage}
//               </p>
//             </div>
//           </div>
//         )}

//         <CompanyTable companies={companies} onDelete={handleDelete} />
//       </div>
//     </div>
//   );
// };

// export default CompanyList;

"use client";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Building, ArrowLeft, Plus, CheckCircle } from "lucide-react";
import CompanyTable from "../components/CompanyTable";
import { companyService } from "../services/companyService";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const CompanyList = () => {
  const { user } = useContext(AuthContext);
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
    if (!user?.permissions?.includes("view_company")) {
      setError("You don't have permission to view companies.");
      setLoading(false);
      return;
    }
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
    if (!user?.permissions?.includes("delete_company")) {
      toast.error("You don't have permission to delete companies");
      return;
    }
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
            onClick={fetchCompanies}
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
                  Company List
                </h1>
                <p className="text-gray-600 mt-1">
                  Browse and manage all companies
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative group">
                <button
                  onClick={() => navigate("/companies/create")}
                  className={`inline-flex items-center px-6 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
                    user?.permissions?.includes("create_company")
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!user?.permissions?.includes("create_company")}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Company
                </button>
                {!user?.permissions?.includes("create_company") && (
                  <div className="absolute top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    You don't have permission to create companies
                  </div>
                )}
              </div>
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

        <CompanyTable companies={companies} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default CompanyList;
