// "use client";

// import { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Search } from "lucide-react";
// import { checklistService } from "../services/checklistService";
// import { contractService } from "../services/contractService";
// import ChecklistForm from "../components/Checklist/ChecklistForm";

// const ChecklistManagement = () => {
//   const [checklists, setChecklists] = useState([]);
//   const [serviceScopes, setServiceScopes] = useState([]);
//   const [selectedServiceScope, setSelectedServiceScope] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingChecklist, setEditingChecklist] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchServiceScopes();
//   }, []);

//   useEffect(() => {
//     if (selectedServiceScope) {
//       fetchChecklists();
//     }
//   }, [selectedServiceScope]);

//   const fetchServiceScopes = async () => {
//     try {
//       // Assuming you have an endpoint to get all service scopes
//       // You might need to adjust this based on your actual API
//       const response = await contractService.getServices();
//       setServiceScopes(response.data);
//     } catch (error) {
//       console.error("Error fetching service scopes:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchChecklists = async () => {
//     if (!selectedServiceScope) return;

//     setLoading(true);
//     try {
//       const response = await checklistService.getChecklistsByServiceScope(
//         selectedServiceScope
//       );
//       setChecklists(response.data);
//     } catch (error) {
//       console.error("Error fetching checklists:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateSuccess = () => {
//     setShowForm(false);
//     setEditingChecklist(null);
//     fetchChecklists();
//   };

//   const handleEdit = (checklist) => {
//     setEditingChecklist(checklist);
//     setShowForm(true);
//   };

//   const handleDelete = async (checklistId) => {
//     if (!window.confirm("Are you sure you want to delete this checklist?")) {
//       return;
//     }

//     try {
//       await checklistService.deleteChecklist(checklistId);
//       fetchChecklists();
//     } catch (error) {
//       console.error("Error deleting checklist:", error);
//       alert("Failed to delete checklist. Please try again.");
//     }
//   };

//   const filteredChecklists = checklists.filter((checklist) =>
//     checklist.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Checklist Management
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Create and manage checklists for service scopes
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 setEditingChecklist(null);
//                 setShowForm(true);
//               }}
//               disabled={!selectedServiceScope}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Plus className="w-5 h-5" />
//               Create Checklist
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Service Scope
//               </label>
//               <select
//                 value={selectedServiceScope}
//                 onChange={(e) => setSelectedServiceScope(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select a service scope</option>
//                 {serviceScopes.map((scope) => (
//                   <option
//                     key={scope.serviceScopeId}
//                     value={scope.serviceScopeId}
//                   >
//                     {scope.serviceScopeName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Search Checklists
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search by checklist name..."
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Checklists Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Checklists{" "}
//               {selectedServiceScope && `(${filteredChecklists.length})`}
//             </h2>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//           ) : !selectedServiceScope ? (
//             <div className="p-12 text-center">
//               <p className="text-gray-500 text-lg">
//                 Please select a service scope to view checklists
//               </p>
//             </div>
//           ) : filteredChecklists.length === 0 ? (
//             <div className="p-12 text-center">
//               <p className="text-gray-500 text-lg">No checklists found</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Service Scope
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Created By
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Created At
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredChecklists.map((checklist) => (
//                     <tr
//                       key={checklist.checklistId}
//                       className="hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {checklist.name}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {checklist.serviceScopeName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {checklist.createdBy}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(checklist.createdAt).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(checklist)}
//                             className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
//                           >
//                             <Edit className="w-4 h-4" />
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(checklist.checklistId)}
//                             className="text-red-600 hover:text-red-900 flex items-center gap-1"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <ChecklistForm
//           checklist={editingChecklist}
//           serviceScopes={serviceScopes}
//           onClose={() => {
//             setShowForm(false);
//             setEditingChecklist(null);
//           }}
//           onSuccess={handleCreateSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default ChecklistManagement;

// "use client";

// import { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Search } from "lucide-react";
// import { checklistService } from "../services/checklistService";
// import { serviceManagementService } from "../services/serviceManagementService";
// import ChecklistForm from "../components/Checklist/ChecklistForm";

// const ChecklistManagement = () => {
//   const [checklists, setChecklists] = useState([]);
//   const [serviceScopes, setServiceScopes] = useState([]);
//   const [selectedServiceScope, setSelectedServiceScope] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingChecklist, setEditingChecklist] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchServiceScopes();
//   }, []);

//   useEffect(() => {
//     if (selectedServiceScope) {
//       fetchChecklists();
//     } else {
//       setChecklists([]); // Clear checklists when no scope is selected
//     }
//   }, [selectedServiceScope]);

//   const fetchServiceScopes = async () => {
//     try {
//       const response = await serviceManagementService.getServiceScopes();
//       console.log("Service scopes response:", response.data); // Debug API response
//       setServiceScopes(response.data || []);
//     } catch (error) {
//       console.error("Error fetching service scopes:", error);
//       setServiceScopes([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchChecklists = async () => {
//     if (!selectedServiceScope) return;

//     setLoading(true);
//     try {
//       const response = await checklistService.getChecklistsByServiceScope(
//         selectedServiceScope
//       );
//       console.log("Checklists response:", response.data); // Debug API response
//       setChecklists(response.data || []);
//     } catch (error) {
//       console.error("Error fetching checklists:", error);
//       setChecklists([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateSuccess = () => {
//     setShowForm(false);
//     setEditingChecklist(null);
//     fetchChecklists();
//   };

//   const handleEdit = (checklist) => {
//     setEditingChecklist(checklist);
//     setShowForm(true);
//   };

//   const handleDelete = async (checklistId) => {
//     if (!window.confirm("Are you sure you want to delete this checklist?")) {
//       return;
//     }

//     try {
//       await checklistService.deleteChecklist(checklistId);
//       fetchChecklists();
//     } catch (error) {
//       console.error("Error deleting checklist:", error);
//       alert("Failed to delete checklist. Please try again.");
//     }
//   };

//   const filteredChecklists = checklists.filter((checklist) =>
//     checklist.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Checklist Management
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Create and manage checklists for service scopes
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 setEditingChecklist(null);
//                 setShowForm(true);
//               }}
//               disabled={!selectedServiceScope}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Plus className="w-5 h-5" />
//               Create Checklist
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Service Scope
//               </label>
//               <select
//                 value={selectedServiceScope}
//                 onChange={(e) => {
//                   console.log("Selected service scope:", e.target.value);
//                   setSelectedServiceScope(e.target.value);
//                 }}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
//               >
//                 <option key="default" value="">
//                   Select a service scope
//                 </option>
//                 {serviceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId}>
//                     {scope.scopeName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Search Checklists
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search by checklist name..."
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Checklists Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Checklists{" "}
//               {selectedServiceScope && `(${filteredChecklists.length})`}
//             </h2>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//           ) : !selectedServiceScope ? (
//             <div className="p-12 text-center">
//               <p className="text-gray-500 text-lg">
//                 Please select a service scope to view checklists
//               </p>
//             </div>
//           ) : filteredChecklists.length === 0 ? (
//             <div className="p-12 text-center">
//               <p className="text-gray-500 text-lg">No checklists found</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Service Scope
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Created By
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Created At
//                     </th>
//                     <th className="IANA Time Zone Databasepx-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredChecklists.map((checklist) => (
//                     <tr
//                       key={checklist.checklistId}
//                       className="hover:bg-gray-50"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {checklist.name}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {checklist.serviceScopeName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {checklist.createdBy || "Unknown"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {checklist.createdAt
//                           ? new Date(checklist.createdAt).toLocaleDateString()
//                           : "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(checklist)}
//                             className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
//                           >
//                             <Edit className="w-4 h-4" />
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(checklist.checklistId)}
//                             className="text-red-600 hover:text-red-900 flex items-center gap-1"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <ChecklistForm
//           checklist={editingChecklist}
//           serviceScopes={serviceScopes}
//           onClose={() => {
//             setShowForm(false);
//             setEditingChecklist(null);
//           }}
//           onSuccess={handleCreateSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default ChecklistManagement;

// "use client";
// import { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Search, Eye, FileText } from "lucide-react";
// import { checklistService } from "../services/checklistService";
// import { serviceManagementService } from "../services/serviceManagementService";
// import { useDebounce } from "../hooks/useDebounce";
// import ChecklistForm from "../components/Checklist/ChecklistForm";
// import ChecklistViewModal from "../components/Checklist/ChecklistViewModal";
// import Pagination from "../components/common/Pagination";

// const ChecklistManagement = () => {
//   const [checklists, setChecklists] = useState([]);
//   const [serviceScopes, setServiceScopes] = useState([]);
//   const [selectedServiceScope, setSelectedServiceScope] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingChecklist, setEditingChecklist] = useState(null);
//   const [viewingChecklistId, setViewingChecklistId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);
//   const [pageSize] = useState(10);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   useEffect(() => {
//     fetchServiceScopes();
//   }, []);

//   useEffect(() => {
//     setCurrentPage(0);
//     fetchChecklists();
//   }, [debouncedSearchTerm, selectedServiceScope]);

//   useEffect(() => {
//     fetchChecklists();
//   }, [currentPage]);

//   const fetchServiceScopes = async () => {
//     try {
//       const response = await serviceManagementService.getServiceScopes();
//       setServiceScopes(response.data || []);
//     } catch (error) {
//       console.error("Error fetching service scopes:", error);
//       setServiceScopes([]);
//     }
//   };

//   const fetchChecklists = async () => {
//     setLoading(true);
//     try {
//       let response;

//       if (debouncedSearchTerm.trim()) {
//         setSearchLoading(true);
//         response = await checklistService.searchChecklistsByName(
//           debouncedSearchTerm.trim(),
//           currentPage,
//           pageSize
//         );
//       } else if (selectedServiceScope) {
//         // For service scope filtering, we'll use the getAllChecklists endpoint
//         // and filter on the backend if possible, or handle pagination manually
//         response = await checklistService.getChecklistsByServiceScope(
//           selectedServiceScope
//         );
//         const allChecklists = response.data || [];
//         const startIndex = currentPage * pageSize;
//         const endIndex = startIndex + pageSize;
//         const paginatedData = allChecklists.slice(startIndex, endIndex);

//         response = {
//           data: {
//             content: paginatedData,
//             totalPages: Math.ceil(allChecklists.length / pageSize),
//             totalElements: allChecklists.length,
//             number: currentPage,
//             size: pageSize,
//           },
//         };
//       } else {
//         response = await checklistService.getAllChecklists(
//           currentPage,
//           pageSize
//         );
//       }

//       const data = response.data;
//       setChecklists(data.content || data || []);
//       setTotalPages(data.totalPages || 1);
//       setTotalElements(
//         data.totalElements || (data.content || data || []).length
//       );
//     } catch (error) {
//       console.error("Error fetching checklists:", error);
//       setChecklists([]);
//       setTotalPages(0);
//       setTotalElements(0);
//     } finally {
//       setLoading(false);
//       setSearchLoading(false);
//     }
//   };

//   const handleCreateSuccess = () => {
//     setShowForm(false);
//     setEditingChecklist(null);
//     setCurrentPage(0);
//     fetchChecklists();
//   };

//   const handleEdit = (checklist) => {
//     setEditingChecklist(checklist);
//     setShowForm(true);
//   };

//   const handleView = (checklistId) => {
//     setViewingChecklistId(checklistId);
//   };

//   const handleDelete = async (checklistId) => {
//     if (!window.confirm("Are you sure you want to delete this checklist?")) {
//       return;
//     }

//     try {
//       await checklistService.deleteChecklist(checklistId);
//       if (checklists.length === 1 && currentPage > 0) {
//         setCurrentPage(currentPage - 1);
//       } else {
//         fetchChecklists();
//       }
//     } catch (error) {
//       console.error("Error deleting checklist:", error);
//       alert("Failed to delete checklist. Please try again.");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(0);
//   };

//   const handleServiceScopeChange = (e) => {
//     setSelectedServiceScope(e.target.value);
//     setCurrentPage(0);
//     setSearchTerm("");
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Checklist Management
//               </h1>
//               <p className="text-gray-600 mt-2">
//                 Create and manage checklists for service scopes
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 setEditingChecklist(null);
//                 setShowForm(true);
//               }}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
//             >
//               <Plus className="w-5 h-5" />
//               Create Checklist
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Filter by Service Scope
//               </label>
//               <select
//                 value={selectedServiceScope}
//                 onChange={handleServiceScopeChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
//               >
//                 <option value="">All Service Scopes</option>
//                 {serviceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId}>
//                     {scope.scopeName}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Search Checklists
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   placeholder="Search by checklist name..."
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 {searchLoading && (
//                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Checklists Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Checklists
//               </h2>
//               <div className="text-sm text-gray-600">
//                 {totalElements > 0 && (
//                   <span>
//                     Showing {currentPage * pageSize + 1} to{" "}
//                     {Math.min((currentPage + 1) * pageSize, totalElements)} of{" "}
//                     {totalElements} checklists
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//           ) : checklists.length === 0 ? (
//             <div className="p-12 text-center">
//               <div className="text-gray-400 mb-4">
//                 <FileText className="w-16 h-16 mx-auto mb-4" />
//               </div>
//               <p className="text-gray-500 text-lg">
//                 {searchTerm
//                   ? `No checklists found matching "${searchTerm}"`
//                   : selectedServiceScope
//                   ? "No checklists found for the selected service scope"
//                   : "No checklists found"}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Service Scope
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Created By
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Created At
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {checklists.map((checklist) => (
//                     <tr
//                       key={checklist.checklistId}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {checklist.name}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {checklist.serviceScopeName || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {checklist.createdBy || "Unknown"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {checklist.createdAt
//                           ? new Date(checklist.createdAt).toLocaleDateString()
//                           : "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex gap-3">
//                           <button
//                             onClick={() => handleView(checklist.checklistId)}
//                             className="text-green-600 hover:text-green-900 flex items-center gap-1 hover:bg-green-50 px-2 py-1 rounded transition-colors"
//                           >
//                             <Eye className="w-4 h-4" />
//                             View
//                           </button>
//                           <button
//                             onClick={() => handleEdit(checklist)}
//                             className="text-blue-600 hover:text-blue-900 flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
//                           >
//                             <Edit className="w-4 h-4" />
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(checklist.checklistId)}
//                             className="text-red-600 hover:text-red-900 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             totalElements={totalElements}
//             pageSize={pageSize}
//             onPageChange={handlePageChange}
//             itemName="checklists"
//           />
//         </div>
//       </div>

//       {/* Form Modal */}
//       {showForm && (
//         <ChecklistForm
//           checklist={editingChecklist}
//           serviceScopes={serviceScopes}
//           onClose={() => {
//             setShowForm(false);
//             setEditingChecklist(null);
//           }}
//           onSuccess={handleCreateSuccess}
//         />
//       )}

//       {/* View Modal */}
//       {viewingChecklistId && (
//         <ChecklistViewModal
//           checklistId={viewingChecklistId}
//           onClose={() => setViewingChecklistId(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default ChecklistManagement;

"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { checklistService } from "../services/checklistService";
import { serviceManagementService } from "../services/serviceManagementService";
import { useDebounce } from "../hooks/useDebounce";
import ChecklistForm from "../components/Checklist/ChecklistForm";
import ChecklistViewModal from "../components/Checklist/ChecklistViewModal";

const ChecklistManagement = () => {
  const [checklists, setChecklists] = useState([]);
  const [serviceScopes, setServiceScopes] = useState([]);
  const [selectedServiceScope, setSelectedServiceScope] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingChecklist, setEditingChecklist] = useState(null);
  const [viewingChecklistId, setViewingChecklistId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize] = useState(10);
  const [searchLoading, setSearchLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchServiceScopes();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    fetchChecklists();
  }, [debouncedSearchTerm, selectedServiceScope]);

  useEffect(() => {
    fetchChecklists();
  }, [currentPage]);

  const fetchServiceScopes = async () => {
    try {
      const response = await serviceManagementService.getServiceScopes();
      setServiceScopes(response.data || []);
    } catch (error) {
      console.error("Error fetching service scopes:", error);
      setServiceScopes([]);
    }
  };

  const fetchChecklists = async () => {
    setLoading(true);
    try {
      let response;

      if (debouncedSearchTerm.trim()) {
        setSearchLoading(true);
        response = await checklistService.searchChecklistsByName(
          debouncedSearchTerm.trim(),
          currentPage,
          pageSize
        );
      } else if (selectedServiceScope) {
        response = await checklistService.getChecklistsByServiceScope(
          selectedServiceScope
        );
        const allChecklists = response.data || [];
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = allChecklists.slice(startIndex, endIndex);

        response = {
          data: {
            content: paginatedData,
            totalPages: Math.ceil(allChecklists.length / pageSize),
            totalElements: allChecklists.length,
            number: currentPage,
            size: pageSize,
          },
        };
      } else {
        response = await checklistService.getAllChecklists(
          currentPage,
          pageSize
        );
      }

      const data = response.data;
      setChecklists(data.content || data || []);
      setTotalPages(data.totalPages || 1);
      setTotalElements(
        data.totalElements || (data.content || data || []).length
      );
    } catch (error) {
      console.error("Error fetching checklists:", error);
      setChecklists([]);
      setTotalPages(0);
      setTotalElements(0);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setShowForm(false);
    setEditingChecklist(null);
    setCurrentPage(0);
    fetchChecklists();
  };

  const handleEdit = (checklist) => {
    setEditingChecklist(checklist);
    setShowForm(true);
  };

  const handleView = (checklistId) => {
    setViewingChecklistId(checklistId);
  };

  const handleDelete = async (checklistId) => {
    if (!window.confirm("Are you sure you want to delete this checklist?")) {
      return;
    }

    try {
      await checklistService.deleteChecklist(checklistId);
      if (checklists.length === 1 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchChecklists();
      }
    } catch (error) {
      console.error("Error deleting checklist:", error);
      alert("Failed to delete checklist. Please try again.");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleServiceScopeChange = (e) => {
    setSelectedServiceScope(e.target.value);
    setCurrentPage(0);
    setSearchTerm("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Checklist Management
              </h1>
              <p className="text-gray-600 mt-2">
                Create and manage checklists for service scopes
              </p>
            </div>
            <button
              onClick={() => {
                setEditingChecklist(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Checklist
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Service Scope
              </label>
              <select
                value={selectedServiceScope}
                onChange={handleServiceScopeChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
              >
                <option value="">All Service Scopes</option>
                {serviceScopes.map((scope) => (
                  <option key={scope.scopeId} value={scope.scopeId}>
                    {scope.scopeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Checklists
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by checklist name..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Checklists Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Checklists
              </h2>
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{checklists.length}</span>{" "}
                of <span className="font-medium">{totalElements}</span>{" "}
                checklists
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : checklists.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto mb-4" />
              </div>
              <p className="text-gray-500 text-lg">
                {searchTerm
                  ? `No checklists found matching "${searchTerm}"`
                  : selectedServiceScope
                  ? "No checklists found for the selected service scope"
                  : "No checklists found"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Checklist ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Scope
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {checklists.map((checklist) => (
                    <tr
                      key={checklist.checklistId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {checklist.checklistId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {checklist.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {checklist.serviceScopeName || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {checklist.createdBy || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {checklist.createdAt
                          ? new Date(checklist.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleView(checklist.checklistId)}
                            className="text-green-600 hover:text-green-900 flex items-center gap-1 hover:bg-green-50 px-2 py-1 rounded transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(checklist)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(checklist.checklistId)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{checklists.length}</span>{" "}
              of <span className="font-medium">{totalElements}</span> checklists
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

      {/* Form Modal */}
      {showForm && (
        <ChecklistForm
          checklist={editingChecklist}
          serviceScopes={serviceScopes}
          onClose={() => {
            setShowForm(false);
            setEditingChecklist(null);
          }}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* View Modal */}
      {viewingChecklistId && (
        <ChecklistViewModal
          checklistId={viewingChecklistId}
          onClose={() => setViewingChecklistId(null)}
        />
      )}
    </div>
  );
};

export default ChecklistManagement;
