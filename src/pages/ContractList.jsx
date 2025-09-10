// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import { contractService } from "../services/contractService";
// // // import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// // // const ContractList = () => {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const [contracts, setContracts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [successMessage, setSuccessMessage] = useState(
// // //     location.state?.success || null
// // //   );

// // //   useEffect(() => {
// // //     if (location.state?.success) {
// // //       setSuccessMessage(location.state.success);
// // //       const timer = setTimeout(() => {
// // //         setSuccessMessage(null);
// // //         navigate(location.pathname, { replace: true, state: {} });
// // //       }, 3000);
// // //       return () => clearTimeout(timer);
// // //     }
// // //   }, [location.state, navigate]);

// // //   useEffect(() => {
// // //     const fetchContracts = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError(null);
// // //         const response = await contractService.getAllContracts();
// // //         setContracts(Array.isArray(response.data) ? response.data : []);
// // //       } catch (err) {
// // //         console.error("Error fetching contracts:", err);
// // //         setError("Failed to load contracts. Please try again.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchContracts();
// // //   }, []);

// // //   const handleDelete = async (contractId) => {
// // //     if (!window.confirm("Are you sure you want to delete this contract?"))
// // //       return;

// // //     try {
// // //       await contractService.deleteContract(contractId);
// // //       setContracts(
// // //         contracts.filter((contract) => contract.contractId !== contractId)
// // //       );
// // //       setSuccessMessage("Contract deleted successfully!");
// // //       setTimeout(() => setSuccessMessage(null), 3000);
// // //     } catch (err) {
// // //       console.error("Error deleting contract:", err);
// // //       setError("Failed to delete contract. Please try again.");
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center h-screen bg-gray-100">
// // //         <div className="relative">
// // //           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
// // //           <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
// // //             Loading...
// // //           </span>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto my-12 shadow-lg">
// // //         <p className="text-lg font-medium">{error}</p>
// // //         <button
// // //           onClick={() => window.location.reload()}
// // //           className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors"
// // //         >
// // //           Try Again
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="p-8 max-w-7xl mx-auto">
// // //       <div className="flex justify-between items-center mb-8">
// // //         <h2 className="text-3xl font-semibold text-gray-900">Contracts</h2>
// // //         <button
// // //           onClick={() => navigate("/contracts")}
// // //           className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors"
// // //         >
// // //           Create New Contract
// // //         </button>
// // //       </div>

// // //       {successMessage && (
// // //         <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
// // //           <svg
// // //             className="w-5 h-5 mr-2"
// // //             fill="none"
// // //             stroke="currentColor"
// // //             viewBox="0 0 24 24"
// // //           >
// // //             <path
// // //               strokeLinecap="round"
// // //               strokeLinejoin="round"
// // //               strokeWidth="2"
// // //               d="M5 13l4 4L19 7"
// // //             />
// // //           </svg>
// // //           {successMessage}
// // //         </div>
// // //       )}

// // //       {contracts.length === 0 ? (
// // //         <div className="text-center p-6 bg-gray-100 rounded-lg shadow-sm">
// // //           <p className="text-gray-600">
// // //             No contracts found. Create a new contract to get started.
// // //           </p>
// // //         </div>
// // //       ) : (
// // //         <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
// // //           <table className="min-w-full divide-y divide-gray-200">
// // //             <thead className="bg-gray-50">
// // //               <tr>
// // //                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
// // //                   Contract Name
// // //                 </th>
// // //                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
// // //                   Company
// // //                 </th>
// // //                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
// // //                   Project Type
// // //                 </th>
// // //                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
// // //                   Start Date
// // //                 </th>
// // //                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
// // //                   End Date
// // //                 </th>
// // //                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
// // //                   Status
// // //                 </th>
// // //                 <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
// // //                   Actions
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-gray-200">
// // //               {contracts.map((contract) => (
// // //                 <tr key={contract.contractId} className="hover:bg-gray-50">
// // //                   <td className="py-4 px-6 text-sm text-gray-600">
// // //                     {contract.contractName}
// // //                   </td>
// // //                   <td className="py-4 px-6 text-sm text-gray-600">
// // //                     {contract.companyName || "N/A"}
// // //                   </td>
// // //                   <td className="py-4 px-6 text-sm text-gray-600">
// // //                     {contract.projectType}
// // //                   </td>
// // //                   <td className="py-4 px-6 text-sm text-gray-600">
// // //                     {contract.startDate
// // //                       ? new Date(contract.startDate).toLocaleDateString()
// // //                       : "N/A"}
// // //                   </td>
// // //                   <td className="py-4 px-6 text-sm text-gray-600">
// // //                     {contract.endDate
// // //                       ? new Date(contract.endDate).toLocaleDateString()
// // //                       : "N/A"}
// // //                   </td>
// // //                   <td className="py-4 px-6 text-sm text-gray-600">
// // //                     {contract.status || "N/A"}
// // //                   </td>
// // //                   <td className="py-4 px-6 text-sm text-gray-600">
// // //                     <div className="flex space-x-2">
// // //                       <button
// // //                         onClick={() =>
// // //                           navigate(`/contracts/${contract.contractId}`)
// // //                         }
// // //                         className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
// // //                         title="View Details"
// // //                       >
// // //                         <EyeIcon className="h-4 w-4 mr-1" />
// // //                         View
// // //                       </button>
// // //                       <button
// // //                         onClick={() =>
// // //                           navigate(`/contracts/update/${contract.contractId}`)
// // //                         }
// // //                         className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors"
// // //                         title="Update Contract"
// // //                       >
// // //                         <PencilIcon className="h-4 w-4 mr-1" />
// // //                         Update
// // //                       </button>
// // //                       <button
// // //                         onClick={() => handleDelete(contract.contractId)}
// // //                         className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors"
// // //                         title="Delete Contract"
// // //                       >
// // //                         <TrashIcon className="h-4 w-4 mr-1" />
// // //                         Delete
// // //                       </button>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ContractList;

// // "use client";
// // import { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { contractService } from "../services/contractService";
// // import {
// //   EyeIcon,
// //   ArrowLeftIcon,
// //   RefreshCw,
// //   Search,
// //   ChevronLeft,
// //   ChevronRight,
// //   Calendar,
// //   Building,
// //   FileText,
// // } from "lucide-react";

// // const ContractList = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [contracts, setContracts] = useState([]);
// //   const [filteredContracts, setFilteredContracts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [successMessage, setSuccessMessage] = useState(
// //     location.state?.success || null
// //   );
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [pageSize] = useState(10);
// //   const [isRefreshing, setIsRefreshing] = useState(false);

// //   useEffect(() => {
// //     if (location.state?.success) {
// //       setSuccessMessage(location.state.success);
// //       const timer = setTimeout(() => {
// //         setSuccessMessage(null);
// //         navigate(location.pathname, { replace: true, state: {} });
// //       }, 3000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [location.state, navigate]);

// //   useEffect(() => {
// //     fetchContracts();
// //   }, []);

// //   useEffect(() => {
// //     filterContracts();
// //   }, [contracts, searchTerm]);

// //   const fetchContracts = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const response = await contractService.getAllContracts();
// //       setContracts(Array.isArray(response.data) ? response.data : []);
// //     } catch (err) {
// //       console.error("Error fetching contracts:", err);
// //       setError("Failed to load contracts. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await fetchContracts();
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 500);
// //     }
// //   };

// //   const filterContracts = () => {
// //     let filtered = contracts;

// //     if (searchTerm) {
// //       filtered = filtered.filter(
// //         (contract) =>
// //           contract.contractName
// //             .toLowerCase()
// //             .includes(searchTerm.toLowerCase()) ||
// //           contract.companyName
// //             ?.toLowerCase()
// //             .includes(searchTerm.toLowerCase()) ||
// //           contract.projectType.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }

// //     setFilteredContracts(filtered);
// //     setCurrentPage(0);
// //   };

// //   const handlePageChange = (newPage) => {
// //     const totalPages = Math.ceil(filteredContracts.length / pageSize);
// //     if (newPage >= 0 && newPage < totalPages) {
// //       setCurrentPage(newPage);
// //     }
// //   };

// //   const paginatedContracts = filteredContracts.slice(
// //     currentPage * pageSize,
// //     (currentPage + 1) * pageSize
// //   );

// //   const totalPages = Math.ceil(filteredContracts.length / pageSize);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
// //           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
// //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //             Loading Contracts
// //           </h3>
// //           <p className="text-gray-600">Please wait...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
// //         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
// //           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <FileText className="w-8 h-8 text-red-600" />
// //           </div>
// //           <h3 className="text-xl font-bold text-gray-800 mb-2">
// //             Error Loading Contracts
// //           </h3>
// //           <p className="text-gray-600 mb-6">{error}</p>
// //           <button
// //             onClick={() => window.location.reload()}
// //             className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
// //           <div className="flex justify-between items-center">
// //             <div className="flex items-center space-x-4">
// //               <button
// //                 onClick={() => navigate("/contracts")}
// //                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
// //               >
// //                 <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
// //               </button>
// //               <div>
// //                 <h1 className="text-3xl font-bold text-gray-900">
// //                   Contract Management
// //                 </h1>
// //                 <p className="text-gray-600 mt-1">
// //                   View and manage all contracts in your system
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={() => navigate("/contracts")}
// //                 className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
// //               >
// //                 <FileText className="w-5 h-5 mr-2" />
// //                 Create New Contract
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Success Message */}
// //         {successMessage && (
// //           <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-xl shadow-lg">
// //             <div className="flex items-center">
// //               <div className="flex-shrink-0">
// //                 <svg
// //                   className="w-5 h-5 text-green-400"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth="2"
// //                     d="M5 13l4 4L19 7"
// //                   />
// //                 </svg>
// //               </div>
// //               <div className="ml-3">
// //                 <p className="text-green-700 font-medium">{successMessage}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Search and Filters */}
// //         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
// //           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
// //             <div className="flex flex-col sm:flex-row gap-4 flex-1">
// //               <div className="relative flex-1">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search contracts by name, company, or project type..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
// //                 />
// //               </div>
// //             </div>
// //             <button
// //               onClick={handleRefresh}
// //               disabled={isRefreshing}
// //               className="p-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
// //               title="Refresh"
// //             >
// //               <RefreshCw
// //                 className={`w-5 h-5 text-gray-600 ${
// //                   isRefreshing ? "animate-spin" : ""
// //                 }`}
// //               />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Contracts Table */}
// //         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-gray-200">
// //               <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
// //                 <tr>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     <div className="flex items-center">
// //                       <FileText className="w-4 h-4 mr-1" />
// //                       Contract Name
// //                     </div>
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     <div className="flex items-center">
// //                       <Building className="w-4 h-4 mr-1" />
// //                       Company
// //                     </div>
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     Project Type
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     <div className="flex items-center">
// //                       <Calendar className="w-4 h-4 mr-1" />
// //                       Start Date
// //                     </div>
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     <div className="flex items-center">
// //                       <Calendar className="w-4 h-4 mr-1" />
// //                       End Date
// //                     </div>
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     Status
// //                   </th>
// //                   <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {loading ? (
// //                   <tr>
// //                     <td colSpan="7" className="px-6 py-12 text-center">
// //                       <div className="flex justify-center items-center">
// //                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //                         <span className="ml-3 text-lg font-medium text-gray-700">
// //                           Loading contracts...
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : paginatedContracts.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="7" className="px-6 py-12 text-center">
// //                       <div className="text-gray-500">
// //                         <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
// //                         <p className="text-lg font-medium">
// //                           No contracts found
// //                         </p>
// //                         <p className="text-sm">
// //                           {searchTerm
// //                             ? "Try adjusting your search criteria"
// //                             : "Create your first contract to get started"}
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   paginatedContracts.map((contract, index) => (
// //                     <tr
// //                       key={contract.contractId}
// //                       className={`hover:bg-blue-50 transition-colors ${
// //                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
// //                       }`}
// //                     >
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-bold text-gray-900">
// //                           {contract.contractName}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-600">
// //                           {contract.companyName || "N/A"}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span
// //                           className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
// //                             contract.projectType === "ANNUAL"
// //                               ? "bg-blue-100 text-blue-800"
// //                               : "bg-green-100 text-green-800"
// //                           }`}
// //                         >
// //                           {contract.projectType}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-600">
// //                           {contract.startDate
// //                             ? new Date(contract.startDate).toLocaleDateString()
// //                             : "N/A"}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-gray-600">
// //                           {contract.endDate
// //                             ? new Date(contract.endDate).toLocaleDateString()
// //                             : "N/A"}
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
// //                           {contract.status || "Active"}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <button
// //                           onClick={() =>
// //                             navigate(`/contracts/${contract.contractId}`)
// //                           }
// //                           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
// //                           title="View Details"
// //                         >
// //                           <EyeIcon className="w-4 h-4 mr-1" />
// //                           View
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Pagination */}
// //           <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
// //             <div className="text-sm text-gray-700">
// //               Showing{" "}
// //               <span className="font-medium">{paginatedContracts.length}</span>{" "}
// //               of <span className="font-medium">{filteredContracts.length}</span>{" "}
// //               contracts
// //             </div>
// //             <div className="flex items-center space-x-3">
// //               <button
// //                 onClick={() => handlePageChange(currentPage - 1)}
// //                 disabled={currentPage === 0}
// //                 className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
// //               >
// //                 <ChevronLeft className="w-5 h-5" />
// //               </button>
// //               <span className="px-4 py-2 text-sm font-medium">
// //                 Page {currentPage + 1} of {Math.max(1, totalPages)}
// //               </span>
// //               <button
// //                 onClick={() => handlePageChange(currentPage + 1)}
// //                 disabled={currentPage >= totalPages - 1}
// //                 className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
// //               >
// //                 <ChevronRight className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContractList;

// // ContractList.jsx
// "use client";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   FileText,
//   ArrowLeft,
//   Plus,
//   CheckCircle,
//   RefreshCw,
//   Filter,
//   Settings,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUp,
//   ArrowDown,
//   Building,
//   Calendar,
//   EyeIcon,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import { contractService } from "../services/contractService";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const ContractList = () => {
//   const { user } = useContext(AuthContext);
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [sortField] = useState("contractName");
//   const [filters, setFilters] = useState({
//     contractName: "",
//     companyName: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     status: "",
//   });
//   const [activeFilters, setActiveFilters] = useState({});
//   const [showColumnChooser, setShowColumnChooser] = useState(false);
//   const [visibleColumns, setVisibleColumns] = useState({
//     contractId: true,
//     contractName: true,
//     companyName: true,
//     projectType: true,
//     startDate: true,
//     endDate: true,
//     status: true,
//   });
//   const navigate = useNavigate();
//   const location = useLocation();

//   const columnDefinitions = [
//     { key: "contractId", label: "Contract ID", required: true },
//     { key: "contractName", label: "Contract Name", required: true },
//     { key: "companyName", label: "Company Name", required: false },
//     { key: "projectType", label: "Project Type", required: false },
//     { key: "startDate", label: "Start Date", required: false },
//     { key: "endDate", label: "End Date", required: false },
//     { key: "status", label: "Status", required: false },
//   ];

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

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const applyFilters = () => {
//     const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
//       if (value && value.trim() !== "") {
//         acc[key] = value;
//       }
//       return acc;
//     }, {});
//     setActiveFilters(cleanFilters);
//     setCurrentPage(0);
//     setShowFilters(false);
//   };

//   const clearFilters = () => {
//     setFilters({
//       contractName: "",
//       companyName: "",
//       projectType: "",
//       startDate: "",
//       endDate: "",
//       status: "",
//     });
//     setActiveFilters({});
//     setCurrentPage(0);
//     setShowFilters(false);
//   };

//   const toggleColumnVisibility = (columnKey) => {
//     if (columnDefinitions.find((col) => col.key === columnKey)?.required)
//       return;
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [columnKey]: !prev[columnKey],
//     }));
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const toggleSortOrder = () => {
//     setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
//     setCurrentPage(0);
//   };

//   const fetchContracts = async () => {
//     if (!user?.permissions?.includes("view_contract")) {
//       setError("You don't have permission to view contracts.");
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await contractService.getFilteredContracts(
//         activeFilters,
//         currentPage,
//         pageSize,
//         sortOrder
//       );
//       setContracts(res.data.content || []);
//       setTotalElements(res.data.totalElements || 0);
//       setTotalPages(res.data.totalPages || 0);
//     } catch (err) {
//       console.error("Error fetching contracts:", err);
//       setError("Failed to load contracts. Please try again.");
//       setContracts([]);
//       setTotalElements(0);
//       setTotalPages(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await fetchContracts();
//       toast.success("Contracts refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!user?.permissions?.includes("delete_contract")) {
//       toast.error("You don't have permission to delete contracts");
//       return;
//     }
//     if (window.confirm("Are you sure you want to delete this contract?")) {
//       try {
//         await contractService.deleteContract(id);
//         await fetchContracts();
//         setSuccessMessage("Contract deleted successfully!");
//         setTimeout(() => setSuccessMessage(null), 3000);
//       } catch (err) {
//         setError("Failed to delete contract. Please try again.");
//       }
//     }
//   };

//   useEffect(() => {
//     fetchContracts();
//   }, [currentPage, pageSize, activeFilters, sortOrder]);

//   if (loading && !isRefreshing) {
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
//             onClick={fetchContracts}
//             className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6">
//       <div className="max-w-[1600px] mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
//           <div className="flex justify-between items-start">
//             <div className="flex items-start space-x-4">
//               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
//                 <FileText className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
//                   Contract Management
//                 </h1>
//                 <p className="text-slate-600 text-sm">
//                   View and manage all contracts in the system
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate("/contracts")}
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back
//               </button>
//               <button
//                 onClick={() => navigate("/contracts/create")}
//                 className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
//                   user?.permissions?.includes("create_contract")
//                     ? "text-white bg-slate-800 border border-transparent hover:bg-slate-900"
//                     : "text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed"
//                 }`}
//                 disabled={!user?.permissions?.includes("create_contract")}
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Contract
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

//         {/* Filters, Column Chooser, and Sort */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
//           <div className="flex flex-col gap-4">
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
//                   Object.keys(activeFilters).length > 0
//                     ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//                     : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
//                 }`}
//               >
//                 <Filter className="w-4 h-4 mr-2 inline" />
//                 Filters{" "}
//                 {Object.keys(activeFilters).length > 0 &&
//                   `(${Object.keys(activeFilters).length})`}
//               </button>
//               <button
//                 onClick={() => setShowColumnChooser(!showColumnChooser)}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <Settings className="w-4 h-4 mr-2 inline" />
//                 Columns
//               </button>
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//               >
//                 <RefreshCw
//                   className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
//                 />
//               </button>
//               <button
//                 onClick={toggleSortOrder}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 {sortOrder === "desc" ? (
//                   <>
//                     <ArrowDown className="w-4 h-4 mr-2 inline" />
//                     Sort by Name (Desc)
//                   </>
//                 ) : (
//                   <>
//                     <ArrowUp className="w-4 h-4 mr-2 inline" />
//                     Sort by Name (Asc)
//                   </>
//                 )}
//               </button>
//             </div>
//             {/* Filter Panel */}
//             {showFilters && (
//               <div className="border-t border-slate-200 pt-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Contract Name
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.contractName}
//                       onChange={(e) =>
//                         handleFilterChange("contractName", e.target.value)
//                       }
//                       placeholder="Enter Contract Name"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Company Name
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.companyName}
//                       onChange={(e) =>
//                         handleFilterChange("companyName", e.target.value)
//                       }
//                       placeholder="Enter Company Name"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Project Type
//                     </label>
//                     <select
//                       value={filters.projectType}
//                       onChange={(e) =>
//                         handleFilterChange("projectType", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">Select Project Type</option>
//                       <option value="TYPE1">Type 1</option>
//                       <option value="TYPE2">Type 2</option>
//                       <option value="TYPE3">Type 3</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       value={filters.startDate}
//                       onChange={(e) =>
//                         handleFilterChange("startDate", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       End Date
//                     </label>
//                     <input
//                       type="date"
//                       value={filters.endDate}
//                       onChange={(e) =>
//                         handleFilterChange("endDate", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       value={filters.status}
//                       onChange={(e) =>
//                         handleFilterChange("status", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">Select Status</option>
//                       <option value="ACTIVE">Active</option>
//                       <option value="INACTIVE">Inactive</option>
//                       <option value="TERMINATED">Terminated</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={applyFilters}
//                     className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Apply Filters
//                   </button>
//                   <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//             )}
//             {/* Column Chooser */}
//             {showColumnChooser && (
//               <div className="border-t border-slate-200 pt-4">
//                 <h3 className="text-sm font-medium text-slate-700 mb-3">
//                   Choose Columns to Display
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                   {columnDefinitions.map((column) => (
//                     <label
//                       key={column.key}
//                       className="flex items-center space-x-2"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={visibleColumns[column.key]}
//                         onChange={() => toggleColumnVisibility(column.key)}
//                         disabled={column.required}
//                         className="rounded border-slate-300 text-slate-600 focus:ring-slate-500 disabled:opacity-50"
//                       />
//                       <span
//                         className={`text-sm ${
//                           column.required ? "text-slate-500" : "text-slate-700"
//                         }`}
//                       >
//                         {column.label}
//                         {column.required && (
//                           <span className="text-xs ml-1">(Required)</span>
//                         )}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {visibleColumns.contractId && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Contract ID
//                     </th>
//                   )}
//                   {visibleColumns.contractName && (
//                     <th
//                       className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
//                       onClick={toggleSortOrder}
//                     >
//                       <div className="flex items-center">
//                         Contract Name
//                         {sortOrder === "desc" ? (
//                           <ArrowDown className="w-4 h-4 ml-1" />
//                         ) : (
//                           <ArrowUp className="w-4 h-4 ml-1" />
//                         )}
//                       </div>
//                     </th>
//                   )}
//                   {visibleColumns.companyName && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <Building className="w-4 h-4 mr-1" />
//                         Company Name
//                       </div>
//                     </th>
//                   )}
//                   {visibleColumns.projectType && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Project Type
//                     </th>
//                   )}
//                   {visibleColumns.startDate && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         Start Date
//                       </div>
//                     </th>
//                   )}
//                   {visibleColumns.endDate && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       <div className="flex items-center">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         End Date
//                       </div>
//                     </th>
//                   )}
//                   {visibleColumns.status && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Status
//                     </th>
//                   )}
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={columnDefinitions.length + 1}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
//                         <span className="ml-3 text-sm font-medium text-slate-600">
//                           Loading contracts...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : contracts.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={columnDefinitions.length + 1}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="text-slate-500">
//                         <FileText className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                         <p className="text-sm font-medium">
//                           No contracts found
//                         </p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           {Object.keys(activeFilters).length > 0
//                             ? "Try adjusting your filters"
//                             : "No contracts have been created yet"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   contracts.map((contract) => {
//                     const canEdit =
//                       user?.permissions?.includes("update_contract");
//                     const canDelete =
//                       user?.permissions?.includes("delete_contract");
//                     return (
//                       <tr
//                         key={contract.contractId}
//                         className="hover:bg-slate-50 transition-colors"
//                       >
//                         {visibleColumns.contractId && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-slate-600">
//                               {contract.contractId}
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.contractName && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-slate-900">
//                               {contract.contractName}
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.companyName && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <Building className="w-4 h-4 text-slate-400" />
//                               <span className="text-sm text-slate-600">
//                                 {contract.companyName || "N/A"}
//                               </span>
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.projectType && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <span
//                               className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
//                                 contract.projectType === "TYPE1"
//                                   ? "bg-blue-100 text-blue-800"
//                                   : contract.projectType === "TYPE2"
//                                   ? "bg-green-100 text-green-800"
//                                   : "bg-purple-100 text-purple-800"
//                               }`}
//                             >
//                               {contract.projectType || "N/A"}
//                             </span>
//                           </td>
//                         )}
//                         {visibleColumns.startDate && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4 text-slate-400" />
//                               <span className="text-sm text-slate-600">
//                                 {contract.startDate
//                                   ? new Date(
//                                       contract.startDate
//                                     ).toLocaleDateString()
//                                   : "N/A"}
//                               </span>
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.endDate && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4 text-slate-400" />
//                               <span className="text-sm text-slate-600">
//                                 {contract.endDate
//                                   ? new Date(
//                                       contract.endDate
//                                     ).toLocaleDateString()
//                                   : "N/A"}
//                               </span>
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.status && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <span
//                               className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
//                                 contract.status === "ACTIVE"
//                                   ? "bg-green-100 text-green-800"
//                                   : contract.status === "INACTIVE"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : "bg-red-100 text-red-800"
//                               }`}
//                             >
//                               {contract.status || "N/A"}
//                             </span>
//                           </td>
//                         )}
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() =>
//                                 navigate(`/contracts/${contract.contractId}`)
//                               }
//                               className="p-2 rounded-md text-blue-600 hover:bg-blue-50"
//                               title="View Details"
//                             >
//                               <EyeIcon className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 navigate(
//                                   `/contracts/edit/${contract.contractId}`
//                                 )
//                               }
//                               className={`p-2 rounded-md ${
//                                 canEdit
//                                   ? "text-blue-600 hover:bg-blue-50"
//                                   : "text-slate-400 cursor-not-allowed"
//                               }`}
//                               disabled={!canEdit}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleDelete(contract.contractId)}
//                               className={`p-2 rounded-md ${
//                                 canDelete
//                                   ? "text-red-600 hover:bg-red-50"
//                                   : "text-slate-400 cursor-not-allowed"
//                               }`}
//                               disabled={!canDelete}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {!loading && contracts.length > 0 && (
//             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-xs text-slate-600">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {currentPage * pageSize + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min((currentPage + 1) * pageSize, totalElements)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalElements}</span>{" "}
//                     contracts
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-600">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                       <option value={100}>100</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeft className="w-3 h-3" />
//                     Previous
//                   </button>
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i;
//                       } else if (currentPage < 3) {
//                         pageNum = i;
//                       } else if (currentPage > totalPages - 4) {
//                         pageNum = totalPages - 5 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
//                             currentPage === pageNum
//                               ? "bg-slate-800 text-white"
//                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
//                           }`}
//                         >
//                           {pageNum + 1}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContractList;

"use client";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  Plus,
  CheckCircle,
  RefreshCw,
  Filter,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Building,
  Calendar,
  EyeIcon,
  Edit,
  Trash2,
} from "lucide-react";
import { contractService } from "../services/contractService";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ContractList = () => {
  const { user } = useContext(AuthContext);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortField] = useState("contractName");
  const [filters, setFilters] = useState({
    contractName: "",
    companyName: "",
    projectType: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [showColumnChooser, setShowColumnChooser] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    contractId: true,
    contractName: true,
    companyName: true,
    projectType: true,
    startDate: true,
    endDate: true,
    status: true,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const columnDefinitions = [
    { key: "contractId", label: "Contract ID", required: true },
    { key: "contractName", label: "Contract Name", required: true },
    { key: "companyName", label: "Company Name", required: false },
    { key: "projectType", label: "Project Type", required: false },
    { key: "startDate", label: "Start Date", required: false },
    { key: "endDate", label: "End Date", required: false },
    { key: "status", label: "Status", required: false },
  ];

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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
    setActiveFilters(cleanFilters);
    setCurrentPage(0);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      contractName: "",
      companyName: "",
      projectType: "",
      startDate: "",
      endDate: "",
      status: "",
    });
    setActiveFilters({});
    setCurrentPage(0);
    setShowFilters(false);
  };

  const toggleColumnVisibility = (columnKey) => {
    if (columnDefinitions.find((col) => col.key === columnKey)?.required)
      return;
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setCurrentPage(0);
  };

  const fetchContracts = async () => {
    if (!user?.permissions?.includes("view_contract")) {
      setError("You don't have permission to view contracts.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await contractService.getFilteredContracts(
        activeFilters,
        currentPage,
        pageSize,
        sortOrder
      );
      setContracts(res.data.content || []);
      setTotalElements(res.data.totalElements || 0);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      console.error("Error fetching contracts:", err);
      setError("Failed to load contracts. Please try again.");
      setContracts([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchContracts();
      toast.success("Contracts refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleDelete = async (id) => {
    if (!user?.permissions?.includes("delete_contract")) {
      toast.error("You don't have permission to delete contracts");
      return;
    }
    if (window.confirm("Are you sure you want to delete this contract?")) {
      try {
        await contractService.deleteContract(id);
        await fetchContracts();
        setSuccessMessage("Contract deleted successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError("Failed to delete contract. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [currentPage, pageSize, activeFilters, sortOrder]);

  if (loading && !isRefreshing) {
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
            onClick={fetchContracts}
            className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">
                  Contract Management
                </h1>
                <p className="text-slate-600 text-sm">
                  View and manage all contracts in the system
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/contracts")}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={() => navigate("/contracts/create")}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
                  user?.permissions?.includes("create_contract")
                    ? "text-white bg-slate-800 border border-transparent hover:bg-slate-900"
                    : "text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed"
                }`}
                disabled={!user?.permissions?.includes("create_contract")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contract
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

        {/* Filters, Column Chooser, and Sort */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
                  Object.keys(activeFilters).length > 0
                    ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Filter className="w-4 h-4 mr-2 inline" />
                Filters{" "}
                {Object.keys(activeFilters).length > 0 &&
                  `(${Object.keys(activeFilters).length})`}
              </button>
              <button
                onClick={() => setShowColumnChooser(!showColumnChooser)}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2 inline" />
                Columns
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={toggleSortOrder}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                {sortOrder === "desc" ? (
                  <>
                    <ArrowDown className="w-4 h-4 mr-2 inline" />
                    Sort by Name (Desc)
                  </>
                ) : (
                  <>
                    <ArrowUp className="w-4 h-4 mr-2 inline" />
                    Sort by Name (Asc)
                  </>
                )}
              </button>
            </div>
            {/* Filter Panel */}
            {showFilters && (
              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Contract Name
                    </label>
                    <input
                      type="text"
                      value={filters.contractName}
                      onChange={(e) =>
                        handleFilterChange("contractName", e.target.value)
                      }
                      placeholder="Enter Contract Name"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={filters.companyName}
                      onChange={(e) =>
                        handleFilterChange("companyName", e.target.value)
                      }
                      placeholder="Enter Company Name"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Project Type
                    </label>
                    <select
                      value={filters.projectType}
                      onChange={(e) =>
                        handleFilterChange("projectType", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value="">Select Project Type</option>
                      <option value="ANNUAL">Annual</option>
                      <option value="ONE_TIME">One-Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) =>
                        handleFilterChange("startDate", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) =>
                        handleFilterChange("endDate", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value="">Select Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="EXPIRED">Expired</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
            {/* Column Chooser */}
            {showColumnChooser && (
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-sm font-medium text-slate-700 mb-3">
                  Choose Columns to Display
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {columnDefinitions.map((column) => (
                    <label
                      key={column.key}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[column.key]}
                        onChange={() => toggleColumnVisibility(column.key)}
                        disabled={column.required}
                        className="rounded border-slate-300 text-slate-600 focus:ring-slate-500 disabled:opacity-50"
                      />
                      <span
                        className={`text-sm ${
                          column.required ? "text-slate-500" : "text-slate-700"
                        }`}
                      >
                        {column.label}
                        {column.required && (
                          <span className="text-xs ml-1">(Required)</span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {visibleColumns.contractId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Contract ID
                    </th>
                  )}
                  {visibleColumns.contractName && (
                    <th
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
                      onClick={toggleSortOrder}
                    >
                      <div className="flex items-center">
                        Contract Name
                        {sortOrder === "desc" ? (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.companyName && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        Company Name
                      </div>
                    </th>
                  )}
                  {visibleColumns.projectType && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Project Type
                    </th>
                  )}
                  {visibleColumns.startDate && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Start Date
                      </div>
                    </th>
                  )}
                  {visibleColumns.endDate && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        End Date
                      </div>
                    </th>
                  )}
                  {visibleColumns.status && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={columnDefinitions.length + 1}
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-600">
                          Loading contracts...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : contracts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columnDefinitions.length + 1}
                      className="px-4 py-12 text-center"
                    >
                      <div className="text-slate-500">
                        <FileText className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm font-medium">
                          No contracts found
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {Object.keys(activeFilters).length > 0
                            ? "Try adjusting your filters"
                            : "No contracts have been created yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  contracts.map((contract) => {
                    const canEdit =
                      user?.permissions?.includes("update_contract");
                    const canDelete =
                      user?.permissions?.includes("delete_contract");
                    return (
                      <tr
                        key={contract.contractId}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        {visibleColumns.contractId && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-600">
                              CON-{contract.contractId}
                            </div>
                          </td>
                        )}
                        {visibleColumns.contractName && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">
                              {contract.contractName}
                            </div>
                          </td>
                        )}
                        {visibleColumns.companyName && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {contract.companyName || "N/A"}
                              </span>
                            </div>
                          </td>
                        )}
                        {visibleColumns.projectType && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                contract.projectType === "ANNUAL"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {contract.projectType || "N/A"}
                            </span>
                          </td>
                        )}
                        {visibleColumns.startDate && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {contract.startDate
                                  ? new Date(
                                      contract.startDate
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>
                          </td>
                        )}
                        {visibleColumns.endDate && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {contract.endDate
                                  ? new Date(
                                      contract.endDate
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>
                          </td>
                        )}
                        {visibleColumns.status && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                contract.status === "ACTIVE"
                                  ? "bg-green-100 text-green-800"
                                  : contract.status === "EXPIRED"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {contract.status || "N/A"}
                            </span>
                          </td>
                        )}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                navigate(`/contracts/${contract.contractId}`)
                              }
                              className="p-2 rounded-md text-blue-600 hover:bg-blue-50"
                              title="View Details"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/contracts/edit/${contract.contractId}`
                                )
                              }
                              className={`p-2 rounded-md ${
                                canEdit
                                  ? "text-blue-600 hover:bg-blue-50"
                                  : "text-slate-400 cursor-not-allowed"
                              }`}
                              disabled={!canEdit}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(contract.contractId)}
                              className={`p-2 rounded-md ${
                                canDelete
                                  ? "text-red-600 hover:bg-red-50"
                                  : "text-slate-400 cursor-not-allowed"
                              }`}
                              disabled={!canDelete}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {!loading && contracts.length > 0 && (
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs text-slate-600">
                    Showing{" "}
                    <span className="font-medium">
                      {currentPage * pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min((currentPage + 1) * pageSize, totalElements)}
                    </span>{" "}
                    of <span className="font-medium">{totalElements}</span>{" "}
                    contracts
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-600">Show:</label>
                    <select
                      value={pageSize}
                      onChange={(e) =>
                        handlePageSizeChange(Number(e.target.value))
                      }
                      className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i;
                      } else if (currentPage < 3) {
                        pageNum = i;
                      } else if (currentPage > totalPages - 4) {
                        pageNum = totalPages - 5 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                            currentPage === pageNum
                              ? "bg-slate-800 text-white"
                              : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum + 1}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractList;
