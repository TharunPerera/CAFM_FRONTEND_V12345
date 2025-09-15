// "use client";
// import { useState, useEffect } from "react";
// import {
//   Search,
//   RefreshCw,
//   User,
//   Filter,
//   Users,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   MessageSquare,
//   Eye,
//   Wrench,
// } from "lucide-react";
// import { technicianService } from "../services/TechnicianService";
// import { toast } from "react-toastify";

// const TechnicianAvailability = () => {
//   const [technicians, setTechnicians] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [skillFilter, setSkillFilter] = useState("");
//   const [sortBy, setSortBy] = useState("all");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
//   const [showSkillsModal, setShowSkillsModal] = useState(false);
//   const [showViewSkillsModal, setShowViewSkillsModal] = useState(false);
//   const [selectedTechnician, setSelectedTechnician] = useState(null);
//   const [availabilityStatus, setAvailabilityStatus] = useState("");
//   const [notAvailableReason, setNotAvailableReason] = useState("");
//   const [updatingAvailability, setUpdatingAvailability] = useState(false);
//   const [showReasonPopup, setShowReasonPopup] = useState(false);
//   const [selectedReason, setSelectedReason] = useState("");
//   const [technicianSkills, setTechnicianSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");
//   const [skillsToRemove, setSkillsToRemove] = useState([]);
//   const [updatingSkills, setUpdatingSkills] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);

//   const statusOptions = [
//     { value: "", label: "All Status" },
//     { value: "AVAILABLE", label: "Available", color: "text-green-600" },
//     { value: "NOT_AVAILABLE", label: "Not Available", color: "text-red-600" },
//     { value: "BUSY", label: "Busy", color: "text-yellow-600" },
//   ];

//   const sortOptions = [
//     { value: "all", label: "All Technicians" },
//     { value: "least-assigned", label: "Least Assigned First" },
//   ];

//   const truncateReason = (reason, maxLength = 30) => {
//     if (!reason) return "-";
//     if (reason.length <= maxLength) return reason;
//     return reason.substring(0, maxLength) + "...";
//   };

//   useEffect(() => {
//     loadTechnicians();
//   }, [currentPage, statusFilter, skillFilter, sortBy]);

//   const loadTechnicians = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (sortBy === "least-assigned") {
//         response = await technicianService.getTechniciansByLeastAssigned();
//         const data = response.data || [];
//         setTechnicians(data);
//         setTotalElements(data.length);
//         setTotalPages(Math.ceil(data.length / pageSize));
//       } else if (skillFilter) {
//         response = await technicianService.getTechniciansBySingleSkill(
//           { skill: skillFilter.trim() },
//           currentPage,
//           pageSize
//         );
//         const pageData = response.data;
//         setTechnicians(pageData.content || []);
//         setTotalElements(pageData.totalElements || 0);
//         setTotalPages(pageData.totalPages || 0);
//       } else {
//         response = await technicianService.getAllTechnicians(
//           currentPage,
//           pageSize,
//           statusFilter || null
//         );
//         const pageData = response.data;
//         setTechnicians(pageData.content || []);
//         setTotalElements(pageData.totalElements || 0);
//         setTotalPages(pageData.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading technicians:", error);
//       toast.error("Failed to load technicians");
//       setTechnicians([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadTechnicians();
//       toast.success("Technicians list refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleOpenAvailabilityModal = (technician) => {
//     setSelectedTechnician(technician);
//     setAvailabilityStatus(technician.availabilityStatus || "AVAILABLE");
//     setNotAvailableReason(technician.notAvailableReason || "");
//     setShowAvailabilityModal(true);
//   };

//   const handleOpenSkillsModal = async (technician) => {
//     setSelectedTechnician(technician);
//     try {
//       const response = await technicianService.getTechnicianSkills(
//         technician.technicianId
//       );
//       setTechnicianSkills(response.data || []);
//       setShowSkillsModal(true);
//     } catch (error) {
//       console.error("Error loading technician skills:", error);
//       toast.error("Failed to load technician skills");
//     }
//   };

//   const handleViewSkills = async (technician) => {
//     setSelectedTechnician(technician);
//     try {
//       const response = await technicianService.getTechnicianSkills(
//         technician.technicianId
//       );
//       setTechnicianSkills(response.data || []);
//       setShowViewSkillsModal(true);
//     } catch (error) {
//       console.error("Error loading technician skills:", error);
//       toast.error("Failed to load technician skills");
//     }
//   };

//   const handleAvailabilityUpdate = async () => {
//     if (!availabilityStatus) {
//       toast.error("Please select an availability status");
//       return;
//     }
//     if (availabilityStatus === "NOT_AVAILABLE" && !notAvailableReason.trim()) {
//       toast.error(
//         "Please provide a reason for setting technician as not available"
//       );
//       return;
//     }
//     setUpdatingAvailability(true);
//     try {
//       await technicianService.updateAvailability(
//         selectedTechnician.technicianId,
//         {
//           availabilityStatus,
//           notAvailableReason:
//             availabilityStatus === "NOT_AVAILABLE" ? notAvailableReason : null,
//         }
//       );
//       toast.success("Technician availability updated successfully");
//       setShowAvailabilityModal(false);
//       setSelectedTechnician(null);
//       setAvailabilityStatus("");
//       setNotAvailableReason("");
//       await loadTechnicians();
//     } catch (error) {
//       console.error("Error updating technician availability:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to update technician availability"
//       );
//     } finally {
//       setUpdatingAvailability(false);
//     }
//   };

//   const handleSkillsUpdate = async () => {
//     if (!newSkill && skillsToRemove.length === 0) {
//       toast.error("Please add a skill or select skills to remove");
//       return;
//     }
//     setUpdatingSkills(true);
//     try {
//       const skillData = {
//         technicianId: selectedTechnician.technicianId,
//         skillsToAdd: newSkill ? [newSkill] : [],
//         skillsToRemove,
//       };
//       await technicianService.updateSkills(
//         selectedTechnician.technicianId,
//         skillData
//       );
//       toast.success("Technician skills updated successfully");
//       setShowSkillsModal(false);
//       setSelectedTechnician(null);
//       setNewSkill("");
//       setSkillsToRemove([]);
//       setTechnicianSkills([]);
//       await loadTechnicians();
//     } catch (error) {
//       console.error("Error updating technician skills:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update technician skills"
//       );
//     } finally {
//       setUpdatingSkills(false);
//     }
//   };

//   const handleOpenReasonPopup = (reason) => {
//     setSelectedReason(reason);
//     setShowReasonPopup(true);
//   };

//   const handleCloseReasonPopup = () => {
//     setShowReasonPopup(false);
//     setSelectedReason("");
//   };

//   const toggleSkillToRemove = (skill) => {
//     setSkillsToRemove((prev) =>
//       prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
//     );
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       AVAILABLE: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Available",
//       },
//       NOT_AVAILABLE: {
//         bg: "bg-red-100",
//         text: "text-red-800",
//         label: "Not Available",
//       },
//       BUSY: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Busy" },
//     };
//     const config = statusConfig[status] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: status || "Unknown",
//     };
//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleFilterChange = (filterType, value) => {
//     if (filterType === "status") {
//       setStatusFilter(value);
//     } else if (filterType === "sort") {
//       setSortBy(value);
//     } else if (filterType === "skill") {
//       setSkillFilter(value);
//     }
//     setCurrentPage(0);
//   };

//   const filteredTechnicians = technicians.filter((technician) => {
//     if (!searchTerm) return true;
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       technician.username?.toLowerCase().includes(searchLower) ||
//       technician.firstName?.toLowerCase().includes(searchLower) ||
//       technician.lastName?.toLowerCase().includes(searchLower)
//     );
//   });

//   const paginatedTechnicians =
//     sortBy === "least-assigned"
//       ? filteredTechnicians.slice(
//           currentPage * pageSize,
//           (currentPage + 1) * pageSize
//         )
//       : filteredTechnicians;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="text-center">
//             <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
//               <Users className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Technician Availability Management
//             </h1>
//             <p className="text-gray-600">
//               Manage technician availability status, skills, and assignments
//             </p>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search technicians..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => handleFilterChange("status", e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
//               >
//                 {statusOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="relative">
//               <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by skill (e.g., HVAC)..."
//                 value={skillFilter}
//                 onChange={(e) => handleFilterChange("skill", e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={sortBy}
//                 onChange={(e) => handleFilterChange("sort", e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
//               >
//                 {sortOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Technicians Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900">
//                 Technicians List
//               </h2>
//               <div className="text-sm text-gray-600">
//                 Showing {paginatedTechnicians.length} of {totalElements}{" "}
//                 technicians
//               </div>
//             </div>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Username
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Full Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Not Available Reason
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Assigned Work Orders
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center">
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-lg font-medium text-gray-700">
//                           Loading technicians...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedTechnicians.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">
//                           No technicians found
//                         </p>
//                         <p className="text-sm">
//                           {searchTerm || statusFilter || skillFilter
//                             ? "Try adjusting your search criteria"
//                             : "No technicians available"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedTechnicians.map((technician, index) => (
//                     <tr
//                       key={technician.technicianId}
//                       className={`hover:bg-gray-50 ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       }`}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {technician.userId}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {technician.username}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                               <User className="h-6 w-6 text-blue-600" />
//                             </div>
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {technician.firstName} {technician.lastName}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {getStatusBadge(
//                           technician.availabilityStatus || "AVAILABLE"
//                         )}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center space-x-2">
//                           <div className="text-sm text-gray-900 max-w-xs truncate">
//                             {truncateReason(technician.notAvailableReason)}
//                           </div>
//                           {technician.notAvailableReason &&
//                             technician.availabilityStatus === "NOT_AVAILABLE" &&
//                             technician.notAvailableReason.length > 30 && (
//                               <button
//                                 onClick={() =>
//                                   handleOpenReasonPopup(
//                                     technician.notAvailableReason
//                                   )
//                                 }
//                                 className="text-blue-600 hover:text-blue-800"
//                                 title="View Full Reason"
//                               >
//                                 <Eye className="w-5 h-5" />
//                               </button>
//                             )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {technician.assignedWorkOrderCount || 0}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() =>
//                               handleOpenAvailabilityModal(technician)
//                             }
//                             className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all flex items-center"
//                             title="Update Availability"
//                           >
//                             <MessageSquare className="w-5 h-5 mr-2" />
//                             Update Availability
//                           </button>
//                           <button
//                             onClick={() => handleOpenSkillsModal(technician)}
//                             className="px-3 py-1 text-sm text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all flex items-center"
//                             title="Manage Skills"
//                           >
//                             <Wrench className="w-5 h-5 mr-2" />
//                             Manage Skills
//                           </button>
//                           <button
//                             onClick={() => handleViewSkills(technician)}
//                             className="px-3 py-1 text-sm text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-all flex items-center"
//                             title="View Skills"
//                           >
//                             <Eye className="w-5 h-5 mr-2" />
//                             View Skills
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
//             <div className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">{paginatedTechnicians.length}</span>{" "}
//               of{" "}
//               <span className="font-medium">{filteredTechnicians.length}</span>{" "}
//               technicians
//             </div>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 0}
//                 className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <span className="px-4 py-2 text-sm font-medium">
//                 Page {currentPage + 1} of {Math.max(1, totalPages)}
//               </span>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage >= totalPages - 1}
//                 className="p-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-all"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Technician Availability Modal */}
//         {showAvailabilityModal && selectedTechnician && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Update Technician Availability
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowAvailabilityModal(false);
//                     setSelectedTechnician(null);
//                     setAvailabilityStatus("");
//                     setNotAvailableReason("");
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="mb-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Technician ID:</strong>{" "}
//                   {selectedTechnician.technicianId}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Name:</strong> {selectedTechnician.firstName}{" "}
//                   {selectedTechnician.lastName}
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Availability Status <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={availabilityStatus}
//                   onChange={(e) => setAvailabilityStatus(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="AVAILABLE">Available</option>
//                   <option value="NOT_AVAILABLE">Not Available</option>
//                 </select>
//               </div>
//               {availabilityStatus === "NOT_AVAILABLE" && (
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Reason for Not Available{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={notAvailableReason}
//                     onChange={(e) => setNotAvailableReason(e.target.value)}
//                     placeholder="Please provide a reason why the technician is not available..."
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-blue-500 resize-none"
//                     rows={4}
//                   />
//                 </div>
//               )}
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowAvailabilityModal(false);
//                     setSelectedTechnician(null);
//                     setAvailabilityStatus("");
//                     setNotAvailableReason("");
//                   }}
//                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAvailabilityUpdate}
//                   disabled={updatingAvailability || !availabilityStatus}
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                 >
//                   {updatingAvailability ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <MessageSquare className="w-4 h-4 mr-2" />
//                       Update Availability
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Technician Skills Management Modal */}
//         {showSkillsModal && selectedTechnician && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Manage Technician Skills
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowSkillsModal(false);
//                     setSelectedTechnician(null);
//                     setTechnicianSkills([]);
//                     setNewSkill("");
//                     setSkillsToRemove([]);
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="mb-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Technician ID:</strong>{" "}
//                   {selectedTechnician.technicianId}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Name:</strong> {selectedTechnician.firstName}{" "}
//                   {selectedTechnician.lastName}
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">
//                   Current Skills
//                 </h4>
//                 {technicianSkills.length === 0 ? (
//                   <p className="text-sm text-gray-500">No skills assigned</p>
//                 ) : (
//                   <div className="flex flex-wrap gap-2">
//                     {technicianSkills.map((skill) => (
//                       <div
//                         key={skill}
//                         className={`px-3 py-1 text-sm rounded-full flex items-center ${
//                           skillsToRemove.includes(skill)
//                             ? "bg-red-100 text-red-800"
//                             : "bg-blue-100 text-blue-800"
//                         }`}
//                       >
//                         {skill}
//                         <button
//                           onClick={() => toggleSkillToRemove(skill)}
//                           className="ml-2 text-xs"
//                           title={
//                             skillsToRemove.includes(skill)
//                               ? "Undo Remove"
//                               : "Remove Skill"
//                           }
//                         >
//                           {skillsToRemove.includes(skill) ? "↺" : "×"}
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Add New Skill
//                 </label>
//                 <input
//                   type="text"
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   placeholder="Enter new skill..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowSkillsModal(false);
//                     setSelectedTechnician(null);
//                     setTechnicianSkills([]);
//                     setNewSkill("");
//                     setSkillsToRemove([]);
//                   }}
//                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSkillsUpdate}
//                   disabled={
//                     updatingSkills || (!newSkill && skillsToRemove.length === 0)
//                   }
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
//                 >
//                   {updatingSkills ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Wrench className="w-4 h-4 mr-2" />
//                       Update Skills
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* View Skills Modal */}
//         {showViewSkillsModal && selectedTechnician && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Technician Skills
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowViewSkillsModal(false);
//                     setSelectedTechnician(null);
//                     setTechnicianSkills([]);
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="mb-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Technician ID:</strong>{" "}
//                   {selectedTechnician.technicianId}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Name:</strong> {selectedTechnician.firstName}{" "}
//                   {selectedTechnician.lastName}
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">
//                   Skills
//                 </h4>
//                 {technicianSkills.length === 0 ? (
//                   <p className="text-sm text-gray-500">No skills assigned</p>
//                 ) : (
//                   <div className="flex flex-wrap gap-2">
//                     {technicianSkills.map((skill) => (
//                       <span
//                         key={skill}
//                         className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => {
//                     setShowViewSkillsModal(false);
//                     setSelectedTechnician(null);
//                     setTechnicianSkills([]);
//                   }}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reason Popup Modal */}
//         {showReasonPopup && (
//           <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//             <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Not Available Reason
//                 </h3>
//                 <button
//                   onClick={handleCloseReasonPopup}
//                   className="text-gray-500 hover:text-gray-700 text-xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                 {selectedReason}
//               </p>
//               <div className="mt-4">
//                 <button
//                   onClick={handleCloseReasonPopup}
//                   className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TechnicianAvailability;

// "use client";
// import { useState, useEffect } from "react";
// import {
//   Search,
//   RefreshCw,
//   User,
//   Filter,
//   Users,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   MessageSquare,
//   Eye,
//   Wrench,
// } from "lucide-react";
// import { technicianService } from "../services/TechnicianService";
// import { toast } from "react-toastify";

// const TechnicianAvailability = () => {
//   const [technicians, setTechnicians] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [skillFilter, setSkillFilter] = useState("");
//   const [debouncedSkillFilter, setDebouncedSkillFilter] = useState("");
//   const [sortBy, setSortBy] = useState("all");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
//   const [showSkillsModal, setShowSkillsModal] = useState(false);
//   const [showViewSkillsModal, setShowViewSkillsModal] = useState(false);
//   const [selectedTechnician, setSelectedTechnician] = useState(null);
//   const [availabilityStatus, setAvailabilityStatus] = useState("");
//   const [notAvailableReason, setNotAvailableReason] = useState("");
//   const [updatingAvailability, setUpdatingAvailability] = useState(false);
//   const [showReasonPopup, setShowReasonPopup] = useState(false);
//   const [selectedReason, setSelectedReason] = useState("");
//   const [technicianSkills, setTechnicianSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");
//   const [skillsToRemove, setSkillsToRemove] = useState([]);
//   const [updatingSkills, setUpdatingSkills] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);

//   const statusOptions = [
//     { value: "", label: "All Status" },
//     { value: "AVAILABLE", label: "Available", color: "text-green-600" },
//     { value: "NOT_AVAILABLE", label: "Not Available", color: "text-red-600" },
//     { value: "BUSY", label: "Busy", color: "text-yellow-600" },
//   ];

//   const sortOptions = [
//     { value: "all", label: "All Technicians" },
//     { value: "least-assigned", label: "Least Assigned First" },
//   ];

//   const truncateReason = (reason, maxLength = 30) => {
//     if (!reason) return "-";
//     if (reason.length <= maxLength) return reason;
//     return reason.substring(0, maxLength) + "...";
//   };

//   // Debounce skill filter changes
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSkillFilter(skillFilter);
//     }, 500); // 500ms debounce delay

//     return () => clearTimeout(timer);
//   }, [skillFilter]);

//   useEffect(() => {
//     loadTechnicians();
//   }, [currentPage, pageSize, statusFilter, debouncedSkillFilter, sortBy]);

//   const loadTechnicians = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (sortBy === "least-assigned") {
//         response = await technicianService.getTechniciansByLeastAssigned();
//         const data = response.data || [];
//         setTechnicians(data);
//         setTotalElements(data.length);
//         setTotalPages(Math.ceil(data.length / pageSize));
//       } else if (debouncedSkillFilter) {
//         response = await technicianService.getTechniciansBySingleSkill(
//           { skill: debouncedSkillFilter.trim() },
//           currentPage,
//           pageSize
//         );
//         const pageData = response.data;
//         setTechnicians(pageData.content || []);
//         setTotalElements(pageData.totalElements || 0);
//         setTotalPages(pageData.totalPages || 0);
//       } else {
//         response = await technicianService.getAllTechnicians(
//           currentPage,
//           pageSize,
//           statusFilter || null
//         );
//         const pageData = response.data;
//         setTechnicians(pageData.content || []);
//         setTotalElements(pageData.totalElements || 0);
//         setTotalPages(pageData.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading technicians:", error);
//       toast.error("Failed to load technicians");
//       setTechnicians([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadTechnicians();
//       toast.success("Technicians list refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleOpenAvailabilityModal = (technician) => {
//     setSelectedTechnician(technician);
//     setAvailabilityStatus(technician.availabilityStatus || "AVAILABLE");
//     setNotAvailableReason(technician.notAvailableReason || "");
//     setShowAvailabilityModal(true);
//   };

//   const handleOpenSkillsModal = async (technician) => {
//     setSelectedTechnician(technician);
//     try {
//       const response = await technicianService.getTechnicianSkills(
//         technician.technicianId
//       );
//       setTechnicianSkills(response.data || []);
//       setShowSkillsModal(true);
//     } catch (error) {
//       console.error("Error loading technician skills:", error);
//       toast.error("Failed to load technician skills");
//     }
//   };

//   const handleViewSkills = async (technician) => {
//     setSelectedTechnician(technician);
//     try {
//       const response = await technicianService.getTechnicianSkills(
//         technician.technicianId
//       );
//       setTechnicianSkills(response.data || []);
//       setShowViewSkillsModal(true);
//     } catch (error) {
//       console.error("Error loading technician skills:", error);
//       toast.error("Failed to load technician skills");
//     }
//   };

//   const handleAvailabilityUpdate = async () => {
//     if (!availabilityStatus) {
//       toast.error("Please select an availability status");
//       return;
//     }
//     if (availabilityStatus === "NOT_AVAILABLE" && !notAvailableReason.trim()) {
//       toast.error(
//         "Please provide a reason for setting technician as not available"
//       );
//       return;
//     }
//     setUpdatingAvailability(true);
//     try {
//       await technicianService.updateAvailability(
//         selectedTechnician.technicianId,
//         {
//           availabilityStatus,
//           notAvailableReason:
//             availabilityStatus === "NOT_AVAILABLE" ? notAvailableReason : null,
//         }
//       );
//       toast.success("Technician availability updated successfully");
//       setShowAvailabilityModal(false);
//       setSelectedTechnician(null);
//       setAvailabilityStatus("");
//       setNotAvailableReason("");
//       await loadTechnicians();
//     } catch (error) {
//       console.error("Error updating technician availability:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to update technician availability"
//       );
//     } finally {
//       setUpdatingAvailability(false);
//     }
//   };

//   const handleSkillsUpdate = async () => {
//     if (!newSkill && skillsToRemove.length === 0) {
//       toast.error("Please add a skill or select skills to remove");
//       return;
//     }
//     setUpdatingSkills(true);
//     try {
//       const skillData = {
//         technicianId: selectedTechnician.technicianId,
//         skillsToAdd: newSkill ? [newSkill] : [],
//         skillsToRemove,
//       };
//       await technicianService.updateSkills(
//         selectedTechnician.technicianId,
//         skillData
//       );
//       toast.success("Technician skills updated successfully");
//       setShowSkillsModal(false);
//       setSelectedTechnician(null);
//       setNewSkill("");
//       setSkillsToRemove([]);
//       setTechnicianSkills([]);
//       await loadTechnicians();
//     } catch (error) {
//       console.error("Error updating technician skills:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update technician skills"
//       );
//     } finally {
//       setUpdatingSkills(false);
//     }
//   };

//   const handleOpenReasonPopup = (reason) => {
//     setSelectedReason(reason);
//     setShowReasonPopup(true);
//   };

//   const handleCloseReasonPopup = () => {
//     setShowReasonPopup(false);
//     setSelectedReason("");
//   };

//   const toggleSkillToRemove = (skill) => {
//     setSkillsToRemove((prev) =>
//       prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
//     );
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       AVAILABLE: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Available",
//       },
//       NOT_AVAILABLE: {
//         bg: "bg-red-100",
//         text: "text-red-800",
//         label: "Not Available",
//       },
//       BUSY: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Busy" },
//     };
//     const config = statusConfig[status] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: status || "Unknown",
//     };
//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const handleFilterChange = (filterType, value) => {
//     if (filterType === "status") {
//       setStatusFilter(value);
//     } else if (filterType === "sort") {
//       setSortBy(value);
//     } else if (filterType === "skill") {
//       setSkillFilter(value);
//     }
//     setCurrentPage(0);
//   };

//   const filteredTechnicians = technicians.filter((technician) => {
//     if (!searchTerm) return true;
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       technician.username?.toLowerCase().includes(searchLower) ||
//       technician.firstName?.toLowerCase().includes(searchLower) ||
//       technician.lastName?.toLowerCase().includes(searchLower)
//     );
//   });

//   const paginatedTechnicians =
//     sortBy === "least-assigned"
//       ? filteredTechnicians.slice(
//           currentPage * pageSize,
//           (currentPage + 1) * pageSize
//         )
//       : filteredTechnicians;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="text-center">
//             <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
//               <Users className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Technician Availability Management
//             </h1>
//             <p className="text-gray-600">
//               Manage technician availability status, skills, and assignments
//             </p>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search technicians..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => handleFilterChange("status", e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
//               >
//                 {statusOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="relative">
//               <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by skill (e.g., HVAC)..."
//                 value={skillFilter}
//                 onChange={(e) => handleFilterChange("skill", e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={sortBy}
//                 onChange={(e) => handleFilterChange("sort", e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
//               >
//                 {sortOptions.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
//               />
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Technicians Table */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-bold text-gray-900">
//                 Technicians List
//               </h2>
//               <div className="text-sm text-gray-600">
//                 Showing {paginatedTechnicians.length} of {totalElements}{" "}
//                 technicians
//               </div>
//             </div>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     User ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Username
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Full Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Not Available Reason
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Assigned Work Orders
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center">
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-lg font-medium text-gray-700">
//                           Loading technicians...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : paginatedTechnicians.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">
//                           No technicians found
//                         </p>
//                         <p className="text-sm">
//                           {searchTerm || statusFilter || skillFilter
//                             ? "Try adjusting your search criteria"
//                             : "No technicians available"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedTechnicians.map((technician, index) => (
//                     <tr
//                       key={technician.technicianId}
//                       className={`hover:bg-gray-50 ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       }`}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {technician.userId}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {technician.username}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="flex-shrink-0 h-10 w-10">
//                             <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                               <User className="h-6 w-6 text-blue-600" />
//                             </div>
//                           </div>
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {technician.firstName} {technician.lastName}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {getStatusBadge(
//                           technician.availabilityStatus || "AVAILABLE"
//                         )}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center space-x-2">
//                           <div className="text-sm text-gray-900 max-w-xs truncate">
//                             {truncateReason(technician.notAvailableReason)}
//                           </div>
//                           {technician.notAvailableReason &&
//                             technician.availabilityStatus === "NOT_AVAILABLE" &&
//                             technician.notAvailableReason.length > 30 && (
//                               <button
//                                 onClick={() =>
//                                   handleOpenReasonPopup(
//                                     technician.notAvailableReason
//                                   )
//                                 }
//                                 className="text-blue-600 hover:text-blue-800"
//                                 title="View Full Reason"
//                               >
//                                 <Eye className="w-5 h-5" />
//                               </button>
//                             )}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           {technician.assignedWorkOrderCount || 0}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() =>
//                               handleOpenAvailabilityModal(technician)
//                             }
//                             className="px-3 py-1 text-sm text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all flex items-center"
//                             title="Update Availability"
//                           >
//                             <MessageSquare className="w-5 h-5 mr-2" />
//                             Update Availability
//                           </button>
//                           <button
//                             onClick={() => handleOpenSkillsModal(technician)}
//                             className="px-3 py-1 text-sm text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all flex items-center"
//                             title="Manage Skills"
//                           >
//                             <Wrench className="w-5 h-5 mr-2" />
//                             Manage Skills
//                           </button>
//                           <button
//                             onClick={() => handleViewSkills(technician)}
//                             className="px-3 py-1 text-sm text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-lg transition-all flex items-center"
//                             title="View Skills"
//                           >
//                             <Eye className="w-5 h-5 mr-2" />
//                             View Skills
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {!loading && technicians.length > 0 && (
//             <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-sm text-gray-700">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {currentPage * pageSize + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min((currentPage + 1) * pageSize, totalElements)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalElements}</span>{" "}
//                     technicians
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-sm text-gray-700">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
//                     className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
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
//                           className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
//                             currentPage === pageNum
//                               ? "bg-blue-600 text-white"
//                               : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
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
//                     className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Technician Availability Modal */}
//         {showAvailabilityModal && selectedTechnician && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Update Technician Availability
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowAvailabilityModal(false);
//                     setSelectedTechnician(null);
//                     setAvailabilityStatus("");
//                     setNotAvailableReason("");
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="mb-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Technician ID:</strong>{" "}
//                   {selectedTechnician.technicianId}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Name:</strong> {selectedTechnician.firstName}{" "}
//                   {selectedTechnician.lastName}
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Availability Status <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={availabilityStatus}
//                   onChange={(e) => setAvailabilityStatus(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="AVAILABLE">Available</option>
//                   <option value="NOT_AVAILABLE">Not Available</option>
//                 </select>
//               </div>
//               {availabilityStatus === "NOT_AVAILABLE" && (
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Reason for Not Available{" "}
//                     <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={notAvailableReason}
//                     onChange={(e) => setNotAvailableReason(e.target.value)}
//                     placeholder="Please provide a reason why the technician is not available..."
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-blue-500 resize-none"
//                     rows={4}
//                   />
//                 </div>
//               )}
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowAvailabilityModal(false);
//                     setSelectedTechnician(null);
//                     setAvailabilityStatus("");
//                     setNotAvailableReason("");
//                   }}
//                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAvailabilityUpdate}
//                   disabled={updatingAvailability || !availabilityStatus}
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                 >
//                   {updatingAvailability ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <MessageSquare className="w-4 h-4 mr-2" />
//                       Update Availability
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Technician Skills Management Modal */}
//         {showSkillsModal && selectedTechnician && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Manage Technician Skills
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowSkillsModal(false);
//                     setSelectedTechnician(null);
//                     setTechnicianSkills([]);
//                     setNewSkill("");
//                     setSkillsToRemove([]);
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="mb-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Technician ID:</strong>{" "}
//                   {selectedTechnician.technicianId}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Name:</strong> {selectedTechnician.firstName}{" "}
//                   {selectedTechnician.lastName}
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">
//                   Current Skills
//                 </h4>
//                 {technicianSkills.length === 0 ? (
//                   <p className="text-sm text-gray-500">No skills assigned</p>
//                 ) : (
//                   <div className="flex flex-wrap gap-2">
//                     {technicianSkills.map((skill) => (
//                       <div
//                         key={skill}
//                         className={`px-3 py-1 text-sm rounded-full flex items-center ${
//                           skillsToRemove.includes(skill)
//                             ? "bg-red-100 text-red-800"
//                             : "bg-blue-100 text-blue-800"
//                         }`}
//                       >
//                         {skill}
//                         <button
//                           onClick={() => toggleSkillToRemove(skill)}
//                           className="ml-2 text-xs"
//                           title={
//                             skillsToRemove.includes(skill)
//                               ? "Undo Remove"
//                               : "Remove Skill"
//                           }
//                         >
//                           {skillsToRemove.includes(skill) ? "↺" : "×"}
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Add New Skill
//                 </label>
//                 <input
//                   type="text"
//                   value={newSkill}
//                   onChange={(e) => setNewSkill(e.target.value)}
//                   placeholder="Enter new skill..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowSkillsModal(false);
//                     setSelectedTechnician(null);
//                     setTechnicianSkills([]);
//                     setNewSkill("");
//                     setSkillsToRemove([]);
//                   }}
//                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSkillsUpdate}
//                   disabled={
//                     updatingSkills || (!newSkill && skillsToRemove.length === 0)
//                   }
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
//                 >
//                   {updatingSkills ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <Wrench className="w-4 h-4 mr-2" />
//                       Update Skills
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* View Skills Modal */}
//         {showViewSkillsModal && selectedTechnician && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Technician Skills
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowViewSkillsModal(false);
//                     setSelectedTechnician(null);
//                     setTechnicianSkills([]);
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="mb-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Technician ID:</strong>{" "}
//                   {selectedTechnician.technicianId}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Name:</strong> {selectedTechnician.firstName}{" "}
//                   {selectedTechnician.lastName}
//                 </p>
//               </div>
//               <div className="mb-6">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">
//                   Skills
//                 </h4>
//                 {technicianSkills.length === 0 ? (
//                   <p className="text-sm text-gray-500">No skills assigned</p>
//                 ) : (
//                   <div className="flex flex-wrap gap-2">
//                     {technicianSkills.map((skill) => (
//                       <span
//                         key={skill}
//                         className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   onClick={() => {
//                     setShowViewSkillsModal(false);
//                     setSelectedTechnician(null);
//                     setTechnicianSkills([]);
//                   }}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reason Popup Modal */}
//         {showReasonPopup && (
//           <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//             <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Not Available Reason
//                 </h3>
//                 <button
//                   onClick={handleCloseReasonPopup}
//                   className="text-gray-500 hover:text-gray-700 text-xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <p className="text-sm text-gray-700 whitespace-pre-wrap">
//                 {selectedReason}
//               </p>
//               <div className="mt-4">
//                 <button
//                   onClick={handleCloseReasonPopup}
//                   className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TechnicianAvailability;
"use client";
import { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  User,
  Filter,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Eye,
  Wrench,
  Settings,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { technicianService } from "../services/TechnicianService";
import { toast } from "react-toastify";

const TechnicianAvailability = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showViewSkillsModal, setShowViewSkillsModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [notAvailableReason, setNotAvailableReason] = useState("");
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [technicianSkills, setTechnicianSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [skillsToRemove, setSkillsToRemove] = useState([]);
  const [updatingSkills, setUpdatingSkills] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    employeeCodeId: "",
    skill: "",
    username: "",
    fullName: "",
    availabilityStatus: "",
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [showColumnChooser, setShowColumnChooser] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    profileImage: true,
    employeeCodeId: true,
    username: true,
    fullName: true,
    availabilityStatus: true,
    notAvailableReason: true,
    assignedWorkOrderCount: true,
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Column definitions
  const columnDefinitions = [
    { key: "profileImage", label: "Profile Image" },
    { key: "employeeCodeId", label: "Employee Code" },
    { key: "username", label: "Username" },
    { key: "fullName", label: "Full Name" },
    { key: "availabilityStatus", label: "Status" },
    { key: "notAvailableReason", label: "Not Available Reason" },
    { key: "assignedWorkOrderCount", label: "Assigned Work Orders" },
  ];

  useEffect(() => {
    loadTechnicians();
  }, [currentPage, pageSize, activeFilters, sortOrder]);

  const loadTechnicians = async () => {
    setLoading(true);
    try {
      const response = await technicianService.getFilteredTechnicians(
        activeFilters,
        currentPage,
        pageSize,
        sortOrder,
        "firstName"
      );
      const pageData = response.data;
      setTechnicians(pageData.content || []);
      setTotalElements(pageData.totalElements || 0);
      setTotalPages(pageData.totalPages || 0);
    } catch (error) {
      console.error("Error loading technicians:", error);
      toast.error("Failed to load technicians");
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadTechnicians();
      toast.success("Technicians list refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleOpenAvailabilityModal = (technician) => {
    setSelectedTechnician(technician);
    setAvailabilityStatus(technician.availabilityStatus || "AVAILABLE");
    setNotAvailableReason(technician.notAvailableReason || "");
    setShowAvailabilityModal(true);
  };

  const handleOpenSkillsModal = async (technician) => {
    setSelectedTechnician(technician);
    try {
      const response = await technicianService.getTechnicianSkills(
        technician.technicianId
      );
      setTechnicianSkills(response.data || []);
      setShowSkillsModal(true);
    } catch (error) {
      console.error("Error loading technician skills:", error);
      toast.error("Failed to load technician skills");
    }
  };

  const handleViewSkills = async (technician) => {
    setSelectedTechnician(technician);
    try {
      const response = await technicianService.getTechnicianSkills(
        technician.technicianId
      );
      setTechnicianSkills(response.data || []);
      setShowViewSkillsModal(true);
    } catch (error) {
      console.error("Error loading technician skills:", error);
      toast.error("Failed to load technician skills");
    }
  };

  const handleAvailabilityUpdate = async () => {
    if (!availabilityStatus) {
      toast.error("Please select an availability status");
      return;
    }
    if (availabilityStatus === "NOT_AVAILABLE" && !notAvailableReason.trim()) {
      toast.error(
        "Please provide a reason for setting technician as not available"
      );
      return;
    }
    setUpdatingAvailability(true);
    try {
      await technicianService.updateAvailability(
        selectedTechnician.technicianId,
        {
          availabilityStatus,
          notAvailableReason:
            availabilityStatus === "NOT_AVAILABLE" ? notAvailableReason : null,
        }
      );
      toast.success("Technician availability updated successfully");
      setShowAvailabilityModal(false);
      setSelectedTechnician(null);
      setAvailabilityStatus("");
      setNotAvailableReason("");
      await loadTechnicians();
    } catch (error) {
      console.error("Error updating technician availability:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update technician availability"
      );
    } finally {
      setUpdatingAvailability(false);
    }
  };

  const handleSkillsUpdate = async () => {
    if (!newSkill && skillsToRemove.length === 0) {
      toast.error("Please add a skill or select skills to remove");
      return;
    }
    setUpdatingSkills(true);
    try {
      const skillData = {
        technicianId: selectedTechnician.technicianId,
        skillsToAdd: newSkill ? [newSkill] : [],
        skillsToRemove,
      };
      await technicianService.updateSkills(
        selectedTechnician.technicianId,
        skillData
      );
      toast.success("Technician skills updated successfully");
      setShowSkillsModal(false);
      setSelectedTechnician(null);
      setNewSkill("");
      setSkillsToRemove([]);
      setTechnicianSkills([]);
      await loadTechnicians();
    } catch (error) {
      console.error("Error updating technician skills:", error);
      toast.error(
        error.response?.data?.message || "Failed to update technician skills"
      );
    } finally {
      setUpdatingSkills(false);
    }
  };

  const handleOpenReasonPopup = (reason) => {
    setSelectedReason(reason);
    setShowReasonPopup(true);
  };

  const handleCloseReasonPopup = () => {
    setShowReasonPopup(false);
    setSelectedReason("");
  };

  const toggleSkillToRemove = (skill) => {
    setSkillsToRemove((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      AVAILABLE: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Available",
      },
      NOT_AVAILABLE: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Not Available",
      },
      BUSY: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Busy" },
    };
    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: status || "Unknown",
    };
    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== "") {
        acc[key] = value.trim();
      }
      return acc;
    }, {});
    setActiveFilters(cleanFilters);
    setCurrentPage(0);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      employeeCodeId: "",
      skill: "",
      username: "",
      fullName: "",
      availabilityStatus: "",
    });
    setActiveFilters({});
    setCurrentPage(0);
    setShowFilters(false);
  };

  const toggleColumnVisibility = (columnKey) => {
    setVisibleColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setCurrentPage(0);
  };

  const truncateReason = (reason, maxLength = 30) => {
    if (!reason) return "-";
    if (reason.length <= maxLength) return reason;
    return reason.substring(0, maxLength) + "...";
  };

  const handleImageClick = (imageUrl) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setShowImageModal(true);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">
                Technician Availability Management
              </h1>
              <p className="text-slate-600 text-sm">
                Manage technician availability status, skills, and assignments
              </p>
            </div>
          </div>
        </div>

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
                    <ArrowDown className="w-4 h-4 mr-2 inline" /> Sort by Name
                    (Desc)
                  </>
                ) : (
                  <>
                    <ArrowUp className="w-4 h-4 mr-2 inline" /> Sort by Name
                    (Asc)
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
                      Employee Code
                    </label>
                    <input
                      type="text"
                      value={filters.employeeCodeId}
                      onChange={(e) =>
                        handleFilterChange("employeeCodeId", e.target.value)
                      }
                      placeholder="Enter Employee Code (e.g., SPA-1234)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Skill
                    </label>
                    <input
                      type="text"
                      value={filters.skill}
                      onChange={(e) =>
                        handleFilterChange("skill", e.target.value)
                      }
                      placeholder="Enter Skill (e.g., HVAC)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={filters.username}
                      onChange={(e) =>
                        handleFilterChange("username", e.target.value)
                      }
                      placeholder="Enter Username"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={filters.fullName}
                      onChange={(e) =>
                        handleFilterChange("fullName", e.target.value)
                      }
                      placeholder="Enter Full Name"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Availability Status
                    </label>
                    <select
                      value={filters.availabilityStatus}
                      onChange={(e) =>
                        handleFilterChange("availabilityStatus", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value="">All Status</option>
                      <option value="AVAILABLE">Available</option>
                      <option value="NOT_AVAILABLE">Not Available</option>
                      <option value="BUSY">Busy</option>
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
                        className="rounded border-slate-300 text-slate-600 focus:ring-slate-500"
                      />
                      <span className="text-sm text-slate-700">
                        {column.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technicians Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {visibleColumns.profileImage && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Profile Image
                    </th>
                  )}
                  {visibleColumns.employeeCodeId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Employee Code
                    </th>
                  )}
                  {visibleColumns.username && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Username
                    </th>
                  )}
                  {visibleColumns.fullName && (
                    <th
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
                      onClick={toggleSortOrder}
                    >
                      <div className="flex items-center">
                        Full Name
                        {sortOrder === "desc" ? (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.availabilityStatus && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                  )}
                  {visibleColumns.notAvailableReason && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Not Available Reason
                    </th>
                  )}
                  {visibleColumns.assignedWorkOrderCount && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Assigned Work Orders
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
                          Loading technicians...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : technicians.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columnDefinitions.length + 1}
                      className="px-4 py-12 text-center"
                    >
                      <div className="text-slate-500">
                        <Users className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm font-medium">
                          No technicians found
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {Object.keys(activeFilters).length > 0
                            ? "Try adjusting your filters"
                            : "No technicians available"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  technicians.map((technician) => (
                    <tr
                      key={technician.technicianId}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {visibleColumns.profileImage && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          {technician.profileImageUrl ? (
                            <button
                              onClick={() =>
                                handleImageClick(technician.profileImageUrl)
                              }
                            >
                              <img
                                src={technician.profileImageUrl}
                                alt={`${technician.firstName} ${technician.lastName}`}
                                className="w-8 h-8 rounded-full object-cover cursor-pointer hover:shadow-md transition-shadow"
                              />
                            </button>
                          ) : (
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {technician.firstName?.charAt(0)}
                                {technician.lastName?.charAt(0)}
                              </span>
                            </div>
                          )}
                        </td>
                      )}
                      {visibleColumns.employeeCodeId && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600">
                            {technician.employeeCodeId || "N/A"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.username && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600">
                            @{technician.username}
                          </div>
                        </td>
                      )}
                      {visibleColumns.fullName && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {technician.firstName} {technician.lastName}
                          </div>
                        </td>
                      )}
                      {visibleColumns.availabilityStatus && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getStatusBadge(
                            technician.availabilityStatus || "AVAILABLE"
                          )}
                        </td>
                      )}
                      {visibleColumns.notAvailableReason && (
                        <td className="px-4 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm text-slate-600 max-w-xs truncate">
                              {truncateReason(technician.notAvailableReason)}
                            </div>
                            {technician.notAvailableReason &&
                              technician.availabilityStatus ===
                                "NOT_AVAILABLE" &&
                              technician.notAvailableReason.length > 30 && (
                                <button
                                  onClick={() =>
                                    handleOpenReasonPopup(
                                      technician.notAvailableReason
                                    )
                                  }
                                  className="text-blue-600 hover:text-blue-800"
                                  title="View Full Reason"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              )}
                          </div>
                        </td>
                      )}
                      {visibleColumns.assignedWorkOrderCount && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600">
                            {technician.assignedWorkOrderCount || 0}
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleOpenAvailabilityModal(technician)
                            }
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Update Availability"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenSkillsModal(technician)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                            title="Manage Skills"
                          >
                            <Wrench className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleViewSkills(technician)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                            title="View Skills"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {!loading && totalElements > 0 && (
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
                    technicians
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

        {/* Technician Availability Modal */}
        {showAvailabilityModal && selectedTechnician && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Update Technician Availability
                </h3>
                <button
                  onClick={() => {
                    setShowAvailabilityModal(false);
                    setSelectedTechnician(null);
                    setAvailabilityStatus("");
                    setNotAvailableReason("");
                  }}
                  className="text-slate-500 hover:text-slate-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-600">
                  <strong>Technician ID:</strong>{" "}
                  {selectedTechnician.technicianId}
                </p>
                <p className="text-sm text-slate-600">
                  <strong>Name:</strong> {selectedTechnician.firstName}{" "}
                  {selectedTechnician.lastName}
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Availability Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="AVAILABLE">Available</option>
                  <option value="NOT_AVAILABLE">Not Available</option>
                </select>
              </div>
              {availabilityStatus === "NOT_AVAILABLE" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reason for Not Available{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={notAvailableReason}
                    onChange={(e) => setNotAvailableReason(e.target.value)}
                    placeholder="Please provide a reason why the technician is not available..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                  />
                </div>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAvailabilityModal(false);
                    setSelectedTechnician(null);
                    setAvailabilityStatus("");
                    setNotAvailableReason("");
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAvailabilityUpdate}
                  disabled={updatingAvailability || !availabilityStatus}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {updatingAvailability ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Update Availability
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Technician Skills Management Modal */}
        {showSkillsModal && selectedTechnician && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Manage Technician Skills
                </h3>
                <button
                  onClick={() => {
                    setShowSkillsModal(false);
                    setSelectedTechnician(null);
                    setTechnicianSkills([]);
                    setNewSkill("");
                    setSkillsToRemove([]);
                  }}
                  className="text-slate-500 hover:text-slate-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-600">
                  <strong>Technician ID:</strong>{" "}
                  {selectedTechnician.technicianId}
                </p>
                <p className="text-sm text-slate-600">
                  <strong>Name:</strong> {selectedTechnician.firstName}{" "}
                  {selectedTechnician.lastName}
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-2">
                  Current Skills
                </h4>
                {technicianSkills.length === 0 ? (
                  <p className="text-sm text-slate-500">No skills assigned</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {technicianSkills.map((skill) => (
                      <div
                        key={skill}
                        className={`px-3 py-1 text-sm rounded-full flex items-center ${
                          skillsToRemove.includes(skill)
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {skill}
                        <button
                          onClick={() => toggleSkillToRemove(skill)}
                          className="ml-2 text-xs"
                          title={
                            skillsToRemove.includes(skill)
                              ? "Undo Remove"
                              : "Remove Skill"
                          }
                        >
                          {skillsToRemove.includes(skill) ? "↺" : "×"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Add New Skill
                </label>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter new skill..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowSkillsModal(false);
                    setSelectedTechnician(null);
                    setTechnicianSkills([]);
                    setNewSkill("");
                    setSkillsToRemove([]);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSkillsUpdate}
                  disabled={
                    updatingSkills || (!newSkill && skillsToRemove.length === 0)
                  }
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {updatingSkills ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Wrench className="w-4 h-4 mr-2" />
                      Update Skills
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Skills Modal */}
        {showViewSkillsModal && selectedTechnician && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Technician Skills
                </h3>
                <button
                  onClick={() => {
                    setShowViewSkillsModal(false);
                    setSelectedTechnician(null);
                    setTechnicianSkills([]);
                  }}
                  className="text-slate-500 hover:text-slate-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-600">
                  <strong>Technician ID:</strong>{" "}
                  {selectedTechnician.technicianId}
                </p>
                <p className="text-sm text-slate-600">
                  <strong>Name:</strong> {selectedTechnician.firstName}{" "}
                  {selectedTechnician.lastName}
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-2">
                  Skills
                </h4>
                {technicianSkills.length === 0 ? (
                  <p className="text-sm text-slate-500">No skills assigned</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {technicianSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setShowViewSkillsModal(false);
                    setSelectedTechnician(null);
                    setTechnicianSkills([]);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reason Popup Modal */}
        {showReasonPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  Not Available Reason
                </h3>
                <button
                  onClick={handleCloseReasonPopup}
                  className="text-slate-500 hover:text-slate-700 text-xl"
                >
                  ×
                </button>
              </div>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">
                {selectedReason}
              </p>
              <div className="mt-4">
                <button
                  onClick={handleCloseReasonPopup}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setShowImageModal(false)}
          >
            <div
              className="relative bg-white rounded-xl shadow-xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged Profile"
                className="max-w-[80vw] max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianAvailability;
