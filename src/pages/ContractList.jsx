// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// const ContractList = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(
//     location.state?.success || null
//   );

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

//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await contractService.getAllContracts();
//         setContracts(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         console.error("Error fetching contracts:", err);
//         setError("Failed to load contracts. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContracts();
//   }, []);

//   const handleDelete = async (contractId) => {
//     if (!window.confirm("Are you sure you want to delete this contract?"))
//       return;

//     try {
//       await contractService.deleteContract(contractId);
//       setContracts(
//         contracts.filter((contract) => contract.contractId !== contractId)
//       );
//       setSuccessMessage("Contract deleted successfully!");
//       setTimeout(() => setSuccessMessage(null), 3000);
//     } catch (err) {
//       console.error("Error deleting contract:", err);
//       setError("Failed to delete contract. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto my-12 shadow-lg">
//         <p className="text-lg font-medium">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold text-gray-900">Contracts</h2>
//         <button
//           onClick={() => navigate("/contracts")}
//           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors"
//         >
//           Create New Contract
//         </button>
//       </div>

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

//       {contracts.length === 0 ? (
//         <div className="text-center p-6 bg-gray-100 rounded-lg shadow-sm">
//           <p className="text-gray-600">
//             No contracts found. Create a new contract to get started.
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                   Contract Name
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                   Company
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                   Project Type
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                   Start Date
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                   End Date
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                   Status
//                 </th>
//                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {contracts.map((contract) => (
//                 <tr key={contract.contractId} className="hover:bg-gray-50">
//                   <td className="py-4 px-6 text-sm text-gray-600">
//                     {contract.contractName}
//                   </td>
//                   <td className="py-4 px-6 text-sm text-gray-600">
//                     {contract.companyName || "N/A"}
//                   </td>
//                   <td className="py-4 px-6 text-sm text-gray-600">
//                     {contract.projectType}
//                   </td>
//                   <td className="py-4 px-6 text-sm text-gray-600">
//                     {contract.startDate
//                       ? new Date(contract.startDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="py-4 px-6 text-sm text-gray-600">
//                     {contract.endDate
//                       ? new Date(contract.endDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="py-4 px-6 text-sm text-gray-600">
//                     {contract.status || "N/A"}
//                   </td>
//                   <td className="py-4 px-6 text-sm text-gray-600">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() =>
//                           navigate(`/contracts/${contract.contractId}`)
//                         }
//                         className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
//                         title="View Details"
//                       >
//                         <EyeIcon className="h-4 w-4 mr-1" />
//                         View
//                       </button>
//                       <button
//                         onClick={() =>
//                           navigate(`/contracts/update/${contract.contractId}`)
//                         }
//                         className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors"
//                         title="Update Contract"
//                       >
//                         <PencilIcon className="h-4 w-4 mr-1" />
//                         Update
//                       </button>
//                       <button
//                         onClick={() => handleDelete(contract.contractId)}
//                         className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors"
//                         title="Delete Contract"
//                       >
//                         <TrashIcon className="h-4 w-4 mr-1" />
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContractList;

"use client";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { contractService } from "../services/contractService";
import {
  EyeIcon,
  ArrowLeftIcon,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Building,
  FileText,
} from "lucide-react";

const ContractList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(
    location.state?.success || null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  useEffect(() => {
    fetchContracts();
  }, []);

  useEffect(() => {
    filterContracts();
  }, [contracts, searchTerm]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await contractService.getAllContracts();
      setContracts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching contracts:", err);
      setError("Failed to load contracts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchContracts();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const filterContracts = () => {
    let filtered = contracts;

    if (searchTerm) {
      filtered = filtered.filter(
        (contract) =>
          contract.contractName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          contract.companyName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          contract.projectType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContracts(filtered);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    const totalPages = Math.ceil(filteredContracts.length / pageSize);
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedContracts = filteredContracts.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const totalPages = Math.ceil(filteredContracts.length / pageSize);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Loading Contracts
          </h3>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Contracts
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
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
                onClick={() => navigate("/contracts")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Contract Management
                </h1>
                <p className="text-gray-600 mt-1">
                  View and manage all contracts in your system
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/contracts")}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FileText className="w-5 h-5 mr-2" />
                Create New Contract
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-xl shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-green-400"
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
              </div>
              <div className="ml-3">
                <p className="text-green-700 font-medium">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search contracts by name, company, or project type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              title="Refresh"
            >
              <RefreshCw
                className={`w-5 h-5 text-gray-600 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      Contract Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      Company
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Project Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Start Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      End Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-lg font-medium text-gray-700">
                          Loading contracts...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedContracts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">
                          No contracts found
                        </p>
                        <p className="text-sm">
                          {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Create your first contract to get started"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedContracts.map((contract, index) => (
                    <tr
                      key={contract.contractId}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {contract.contractName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {contract.companyName || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                            contract.projectType === "ANNUAL"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {contract.projectType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {contract.startDate
                            ? new Date(contract.startDate).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {contract.endDate
                            ? new Date(contract.endDate).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
                          {contract.status || "Active"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            navigate(`/contracts/${contract.contractId}`)
                          }
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{paginatedContracts.length}</span>{" "}
              of <span className="font-medium">{filteredContracts.length}</span>{" "}
              contracts
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-sm font-medium">
                Page {currentPage + 1} of {Math.max(1, totalPages)}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractList;
