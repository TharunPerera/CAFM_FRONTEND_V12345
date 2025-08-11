// "use client";

// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   FileText,
//   RefreshCw,
//   Search,
//   Calendar,
//   AlertCircle,
// } from "lucide-react";
// import { workRequestService } from "../../services/WorkRequestService";
// import { toast } from "react-toastify";

// const WorkRequestTable = ({ onBack }) => {
//   const [workRequests, setWorkRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadWorkRequests();
//   }, []);

//   const loadWorkRequests = async () => {
//     setLoading(true);
//     try {
//       const response = await workRequestService.getAllWorkRequests();
//       setWorkRequests(response.data || []);
//     } catch (error) {
//       console.error("Error loading work requests:", error);
//       toast.error("Failed to load work requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadWorkRequests();
//       toast.success("Work requests refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       PENDING: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-800",
//         label: "Pending",
//       },
//       APPROVED: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Approved",
//       },
//       REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
//     };

//     const config = statusConfig[status] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: status,
//     };

//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const getPriorityBadge = (priority) => {
//     const priorityConfig = {
//       RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
//       RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
//       RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
//       CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
//       CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
//       CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
//       PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
//     };

//     const config = priorityConfig[priority] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: priority,
//     };

//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   // Filter work requests based on search term
//   const filteredWorkRequests = workRequests.filter(
//     (request) =>
//       request.workRequestId.toString().includes(searchTerm) ||
//       request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (request.reasonComment &&
//         request.reasonComment
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())) ||
//       request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
//           <FileText className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           All Work Requests
//         </h2>
//         <p className="text-gray-600">
//           View and manage all work requests in the system
//         </p>
//       </div>

//       {/* Search and Actions */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search by ID, asset name, comment, priority, or status..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={isRefreshing}
//           className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           title="Refresh"
//         >
//           <RefreshCw
//             className={`w-5 h-5 text-gray-600 ${
//               isRefreshing ? "animate-spin" : ""
//             }`}
//           />
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Work Request ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Asset Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Reason/Comment
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Priority
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Created At
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                       <span className="ml-3 text-lg font-medium text-gray-700">
//                         Loading work requests...
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredWorkRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center">
//                     <div className="text-gray-500">
//                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">
//                         No work requests found
//                       </p>
//                       <p className="text-sm">
//                         {searchTerm
//                           ? "Try adjusting your search criteria"
//                           : "No work requests have been created yet"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredWorkRequests.map((request, index) => (
//                   <tr
//                     key={request.workRequestId}
//                     className={`hover:bg-gray-50 ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     }`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         #{request.workRequestId}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {request.assetName}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900 max-w-xs truncate">
//                         {request.reasonComment || "-"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getPriorityBadge(request.priority)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStatusBadge(request.status)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 flex items-center">
//                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                         {request.createdAt
//                           ? new Date(request.createdAt).toLocaleDateString()
//                           : "-"}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         {!loading && filteredWorkRequests.length > 0 && (
//           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//             <div className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">{filteredWorkRequests.length}</span>{" "}
//               of <span className="font-medium">{workRequests.length}</span> work
//               requests
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Back Button */}
//       <div className="mt-8 text-center">
//         <button
//           onClick={onBack}
//           className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Work Requests
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WorkRequestTable;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   FileText,
//   RefreshCw,
//   Search,
//   Calendar,
//   AlertCircle,
//   Settings,
// } from "lucide-react";
// import { workRequestService } from "../../services/WorkRequestService";
// import { toast } from "react-toastify";
// import { assetService } from "../../services/assetService"; // Declare the assetService variable

// const WorkRequestTable = ({ onBack }) => {
//   const [workRequests, setWorkRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
//   const [assigningServiceScope, setAssigningServiceScope] = useState(false);

//   useEffect(() => {
//     loadWorkRequests();
//   }, []);

//   const loadWorkRequests = async () => {
//     setLoading(true);
//     try {
//       const response = await workRequestService.getAllWorkRequests();
//       setWorkRequests(response.data || []);
//     } catch (error) {
//       console.error("Error loading work requests:", error);
//       toast.error("Failed to load work requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadWorkRequests();
//       toast.success("Work requests refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
//     setAssigningServiceScope(true);
//     try {
//       await workRequestService.assignServiceScopeToPmWorkRequest(
//         workRequestId,
//         serviceScopeId
//       );
//       toast.success("Service scope assigned to PM work request successfully");
//       setShowAssignModal(false);
//       setSelectedWorkRequest(null);
//       await loadWorkRequests(); // Refresh the list
//     } catch (error) {
//       console.error("Error assigning service scope:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to assign service scope"
//       );
//     } finally {
//       setAssigningServiceScope(false);
//     }
//   };

//   const openAssignModal = (workRequest) => {
//     setSelectedWorkRequest(workRequest);
//     setShowAssignModal(true);
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       PENDING: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-800",
//         label: "Pending",
//       },
//       APPROVED: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Approved",
//       },
//       REJECTED: {
//         bg: "bg-red-100",
//         text: "text-red-800",
//         label: "Rejected",
//       },
//     };

//     const config = statusConfig[status] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: status,
//     };

//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const getPriorityBadge = (priority) => {
//     const priorityConfig = {
//       RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
//       RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
//       RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
//       CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
//       CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
//       CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
//       PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
//     };

//     const config = priorityConfig[priority] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: priority,
//     };

//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   // Filter work requests based on search term
//   const filteredWorkRequests = workRequests.filter(
//     (request) =>
//       request.workRequestId.toString().includes(searchTerm) ||
//       request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (request.reasonComment &&
//         request.reasonComment
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())) ||
//       request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Get PM work requests that don't have service scope assigned
//   const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
//     (request) =>
//       request.priority === "PM_P4" &&
//       (!request.serviceScopeId || request.serviceScopeId === null)
//   );

//   return (
//     <div>
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
//           <FileText className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           All Work Requests
//         </h2>
//         <p className="text-gray-600">
//           View and manage all work requests in the system
//         </p>
//       </div>

//       {/* Search and Actions */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search by ID, asset name, comment, priority, or status..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={isRefreshing}
//           className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           title="Refresh"
//         >
//           <RefreshCw
//             className={`w-5 h-5 text-gray-600 ${
//               isRefreshing ? "animate-spin" : ""
//             }`}
//           />
//         </button>
//       </div>

//       {/* PM Work Requests Alert */}
//       {pmWorkRequestsWithoutServiceScope.length > 0 && (
//         <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
//           <div className="flex">
//             <AlertCircle className="h-5 w-5 text-blue-400" />
//             <div className="ml-3">
//               <p className="text-sm text-blue-700 font-medium">
//                 {pmWorkRequestsWithoutServiceScope.length} PM work request(s)
//                 need service scope assignment
//               </p>
//               <p className="text-sm text-blue-600 mt-1">
//                 Click the "Assign Service Scope" button for PM work requests to
//                 assign asset-defined services of scope.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Work Request ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Asset Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Service Scope
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Reason/Comment
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Priority
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Created At
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                       <span className="ml-3 text-lg font-medium text-gray-700">
//                         Loading work requests...
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredWorkRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-12 text-center">
//                     <div className="text-gray-500">
//                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">
//                         No work requests found
//                       </p>
//                       <p className="text-sm">
//                         {searchTerm
//                           ? "Try adjusting your search criteria"
//                           : "No work requests have been created yet"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredWorkRequests.map((request, index) => (
//                   <tr
//                     key={request.workRequestId}
//                     className={`hover:bg-gray-50 ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     }`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         #{request.workRequestId}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {request.assetName}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {request.serviceScopeName || (
//                           <span className="text-gray-400 italic">
//                             Not assigned
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900 max-w-xs truncate">
//                         {request.reasonComment || "-"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getPriorityBadge(request.priority)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStatusBadge(request.status)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 flex items-center">
//                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                         {request.createdAt
//                           ? new Date(request.createdAt).toLocaleDateString()
//                           : "-"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {request.priority === "PM_P4" &&
//                         !request.serviceScopeId && (
//                           <button
//                             onClick={() => openAssignModal(request)}
//                             className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
//                             title="Assign PM Work Request for Asset Defined Services of Scope"
//                           >
//                             <Settings className="w-3 h-3 mr-1" />
//                             Assign Service Scope
//                           </button>
//                         )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         {!loading && filteredWorkRequests.length > 0 && (
//           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//             <div className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">{filteredWorkRequests.length}</span>{" "}
//               of <span className="font-medium">{workRequests.length}</span> work
//               requests
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Back Button */}
//       <div className="mt-8 text-center">
//         <button
//           onClick={onBack}
//           className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Work Requests
//         </button>
//       </div>

//       {/* Assign Service Scope Modal */}
//       {showAssignModal && selectedWorkRequest && (
//         <AssignServiceScopeModal
//           workRequest={selectedWorkRequest}
//           onClose={() => {
//             setShowAssignModal(false);
//             setSelectedWorkRequest(null);
//           }}
//           onAssign={handleAssignServiceScope}
//           isAssigning={assigningServiceScope}
//         />
//       )}
//     </div>
//   );
// };

// // Modal component for assigning service scope to PM work requests
// const AssignServiceScopeModal = ({
//   workRequest,
//   onClose,
//   onAssign,
//   isAssigning,
// }) => {
//   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
//   const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadAssetServiceScopes();
//   }, []);

//   const loadAssetServiceScopes = async () => {
//     setLoading(true);
//     try {
//       // Get asset details to extract service scopes
//       const assetResponse = await assetService.getAssetById(
//         workRequest.assetId
//       );
//       const asset = assetResponse.data;

//       // Extract all service scopes from all sub-services
//       const allServiceScopes = [];
//       if (asset.subServices && asset.subServices.length > 0) {
//         asset.subServices.forEach((subService) => {
//           if (subService.serviceScopeIds && subService.serviceScopeNames) {
//             subService.serviceScopeIds.forEach((scopeId, index) => {
//               allServiceScopes.push({
//                 scopeId: scopeId,
//                 scopeName: subService.serviceScopeNames[index],
//                 subServiceName: subService.subServiceName,
//               });
//             });
//           }
//         });
//       }

//       setAssetServiceScopes(allServiceScopes);
//     } catch (error) {
//       console.error("Error loading asset service scopes:", error);
//       toast.error("Failed to load asset service scopes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedServiceScopeId) {
//       toast.error("Please select a service scope");
//       return;
//     }
//     onAssign(workRequest.workRequestId, selectedServiceScopeId);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold text-gray-900">
//             Assign Service Scope
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl"
//           >
//             ×
//           </button>
//         </div>

//         <div className="mb-4">
//           <p className="text-sm text-gray-600">
//             <strong>Work Request:</strong> #{workRequest.workRequestId}
//           </p>
//           <p className="text-sm text-gray-600">
//             <strong>Asset:</strong> {workRequest.assetName}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Asset Defined Services of Scope{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             {loading ? (
//               <div className="text-center py-4">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
//                 <p className="text-sm text-gray-600 mt-2">
//                   Loading service scopes...
//                 </p>
//               </div>
//             ) : assetServiceScopes.length === 0 ? (
//               <p className="text-sm text-gray-500 py-4 text-center">
//                 No service scopes available for this asset
//               </p>
//             ) : (
//               <select
//                 value={selectedServiceScopeId}
//                 onChange={(e) => setSelectedServiceScopeId(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               >
//                 <option value="">Select Service Scope</option>
//                 {assetServiceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId}>
//                     {scope.scopeName} ({scope.subServiceName})
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={
//                 isAssigning || loading || assetServiceScopes.length === 0
//               }
//               className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//             >
//               {isAssigning ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Assigning...
//                 </>
//               ) : (
//                 "Assign"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default WorkRequestTable;

// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   FileText,
//   RefreshCw,
//   Search,
//   Calendar,
//   AlertCircle,
//   Settings,
// } from "lucide-react";
// import { workRequestService } from "../../services/WorkRequestService";
// import { toast } from "react-toastify";
// import { assetService } from "../../services/assetService";

// const WorkRequestTable = ({ onBack }) => {
//   const [workRequests, setWorkRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
//   const [assigningServiceScope, setAssigningServiceScope] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadWorkRequests();
//   }, []);

//   const loadWorkRequests = async () => {
//     setLoading(true);
//     try {
//       const response = await workRequestService.getAllWorkRequests();
//       setWorkRequests(response.data || []);
//     } catch (error) {
//       console.error("Error loading work requests:", error);
//       toast.error("Failed to load work requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadWorkRequests();
//       toast.success("Work requests refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
//     setAssigningServiceScope(true);
//     try {
//       await workRequestService.assignServiceScopeToPmWorkRequest(
//         workRequestId,
//         serviceScopeId
//       );
//       toast.success("Service scope assigned to PM work request successfully");
//       setShowAssignModal(false);
//       setSelectedWorkRequest(null);
//       await loadWorkRequests();
//     } catch (error) {
//       console.error("Error assigning service scope:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to assign service scope"
//       );
//     } finally {
//       setAssigningServiceScope(false);
//     }
//   };

//   const openAssignModal = (workRequest) => {
//     setSelectedWorkRequest(workRequest);
//     setShowAssignModal(true);
//   };

//   const handleCreateWorkOrder = (workRequest) => {
//     const priority = workRequest.priority;
//     let orderType;
//     if (priority.startsWith("CM_")) {
//       orderType = "cm";
//     } else if (priority.startsWith("RM_")) {
//       orderType = "rm";
//     } else if (priority === "PM_P4") {
//       orderType = "pm";
//     }
//     navigate(
//       `/work-orders?type=${orderType}&workRequestId=${workRequest.workRequestId}`
//     );
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       PENDING: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-800",
//         label: "Pending",
//       },
//       APPROVED: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Approved",
//       },
//       REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
//     };
//     const config = statusConfig[status] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: status,
//     };
//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const getPriorityBadge = (priority) => {
//     const priorityConfig = {
//       RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
//       RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
//       RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
//       CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
//       CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
//       CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
//       PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
//     };
//     const config = priorityConfig[priority] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: priority,
//     };
//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const filteredWorkRequests = workRequests.filter(
//     (request) =>
//       request.workRequestId.toString().includes(searchTerm) ||
//       request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (request.reasonComment &&
//         request.reasonComment
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())) ||
//       request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       request.status.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
//     (request) =>
//       request.priority === "PM_P4" &&
//       (!request.serviceScopeId || request.serviceScopeId === null)
//   );

//   return (
//     <div>
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
//           <FileText className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           All Work Requests
//         </h2>
//         <p className="text-gray-600">
//           View and manage all work requests in the system
//         </p>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search by ID, asset name, comment, priority, or status..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={isRefreshing}
//           className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           title="Refresh"
//         >
//           <RefreshCw
//             className={`w-5 h-5 text-gray-600 ${
//               isRefreshing ? "animate-spin" : ""
//             }`}
//           />
//         </button>
//       </div>

//       {pmWorkRequestsWithoutServiceScope.length > 0 && (
//         <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
//           <div className="flex">
//             <AlertCircle className="h-5 w-5 text-blue-400" />
//             <div className="ml-3">
//               <p className="text-sm text-blue-700 font-medium">
//                 {pmWorkRequestsWithoutServiceScope.length} PM work request(s)
//                 need service scope assignment
//               </p>
//               <p className="text-sm text-blue-600 mt-1">
//                 Click the "Assign Service Scope" button for PM work requests to
//                 assign asset-defined services of scope.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Work Request ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Asset Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Service Scope
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Reason/Comment
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Priority
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Created At
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Create Work Order
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="9" className="px-6 py-12 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                       <span className="ml-3 text-lg font-medium text-gray-700">
//                         Loading work requests...
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredWorkRequests.length === 0 ? (
//                 <tr>
//                   <td colSpan="9" className="px-6 py-12 text-center">
//                     <div className="text-gray-500">
//                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">
//                         No work requests found
//                       </p>
//                       <p className="text-sm">
//                         {searchTerm
//                           ? "Try adjusting your search criteria"
//                           : "No work requests have been created yet"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredWorkRequests.map((request, index) => (
//                   <tr
//                     key={request.workRequestId}
//                     className={`hover:bg-gray-50 ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     }`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         #{request.workRequestId}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {request.assetName}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {request.serviceScopeName || (
//                           <span className="text-gray-400 italic">
//                             Not assigned
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900 max-w-xs truncate">
//                         {request.reasonComment || "-"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getPriorityBadge(request.priority)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStatusBadge(request.status)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 flex items-center">
//                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                         {request.createdAt
//                           ? new Date(request.createdAt).toLocaleDateString()
//                           : "-"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {request.priority === "PM_P4" &&
//                         !request.serviceScopeId && (
//                           <button
//                             onClick={() => openAssignModal(request)}
//                             className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
//                             title="Assign PM Work Request for Asset Defined Services of Scope"
//                           >
//                             <Settings className="w-3 h-3 mr-1" />
//                             Assign Service Scope
//                           </button>
//                         )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => handleCreateWorkOrder(request)}
//                         className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
//                         title={`Create ${
//                           request.priority.startsWith("CM_")
//                             ? "CM"
//                             : request.priority.startsWith("RM_")
//                             ? "RM"
//                             : "PM"
//                         } Work Order`}
//                       >
//                         <FileText className="w-3 h-3 mr-1" />
//                         Create Work Order
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filteredWorkRequests.length > 0 && (
//           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//             <div className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">{filteredWorkRequests.length}</span>{" "}
//               of <span className="font-medium">{workRequests.length}</span> work
//               requests
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="mt-8 text-center">
//         <button
//           onClick={onBack}
//           className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Back to Work Requests
//         </button>
//       </div>

//       {showAssignModal && selectedWorkRequest && (
//         <AssignServiceScopeModal
//           workRequest={selectedWorkRequest}
//           onClose={() => {
//             setShowAssignModal(false);
//             setSelectedWorkRequest(null);
//           }}
//           onAssign={handleAssignServiceScope}
//           isAssigning={assigningServiceScope}
//         />
//       )}
//     </div>
//   );
// };

// const AssignServiceScopeModal = ({
//   workRequest,
//   onClose,
//   onAssign,
//   isAssigning,
// }) => {
//   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
//   const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadAssetServiceScopes();
//   }, []);

//   const loadAssetServiceScopes = async () => {
//     setLoading(true);
//     try {
//       const assetResponse = await assetService.getAssetById(
//         workRequest.assetId
//       );
//       const asset = assetResponse.data;
//       const allServiceScopes = [];
//       if (asset.subServices && asset.subServices.length > 0) {
//         asset.subServices.forEach((subService) => {
//           if (subService.serviceScopeIds && subService.serviceScopeNames) {
//             subService.serviceScopeIds.forEach((scopeId, index) => {
//               allServiceScopes.push({
//                 scopeId: scopeId,
//                 scopeName: subService.serviceScopeNames[index],
//                 subServiceName: subService.subServiceName,
//               });
//             });
//           }
//         });
//       }
//       setAssetServiceScopes(allServiceScopes);
//     } catch (error) {
//       console.error("Error loading asset service scopes:", error);
//       toast.error("Failed to load asset service scopes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedServiceScopeId) {
//       toast.error("Please select a service scope");
//       return;
//     }
//     onAssign(workRequest.workRequestId, selectedServiceScopeId);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold text-gray-900">
//             Assign Service Scope
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl"
//           >
//             ×
//           </button>
//         </div>
//         <div className="mb-4">
//           <p className="text-sm text-gray-600">
//             <strong>Work Request:</strong> #{workRequest.workRequestId}
//           </p>
//           <p className="text-sm text-gray-600">
//             <strong>Asset:</strong> {workRequest.assetName}
//           </p>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Asset Defined Services of Scope{" "}
//               <span className="text-red-500">*</span>
//             </label>
//             {loading ? (
//               <div className="text-center py-4">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
//                 <p className="text-sm text-gray-600 mt-2">
//                   Loading service scopes...
//                 </p>
//               </div>
//             ) : assetServiceScopes.length === 0 ? (
//               <p className="text-sm text-gray-500 py-4 text-center">
//                 No service scopes available for this asset
//               </p>
//             ) : (
//               <select
//                 value={selectedServiceScopeId}
//                 onChange={(e) => setSelectedServiceScopeId(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               >
//                 <option value="">Select Service Scope</option>
//                 {assetServiceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId}>
//                     {scope.scopeName} ({scope.subServiceName})
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>
//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={
//                 isAssigning || loading || assetServiceScopes.length === 0
//               }
//               className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//             >
//               {isAssigning ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Assigning...
//                 </>
//               ) : (
//                 "Assign"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default WorkRequestTable;

"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  RefreshCw,
  Search,
  Calendar,
  AlertCircle,
  Settings,
} from "lucide-react";
import { workRequestService } from "../../services/WorkRequestService";
import { toast } from "react-toastify";
import { assetService } from "../../services/assetService";

const WorkRequestTable = ({ onBack }) => {
  const [workRequests, setWorkRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
  const [assigningServiceScope, setAssigningServiceScope] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkRequests();
  }, []);

  const loadWorkRequests = async () => {
    setLoading(true);
    try {
      const response = await workRequestService.getAllWorkRequests();
      setWorkRequests(response.data || []);
    } catch (error) {
      console.error("Error loading work requests:", error);
      toast.error("Failed to load work requests");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadWorkRequests();
      toast.success("Work requests refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
    setAssigningServiceScope(true);
    try {
      await workRequestService.assignServiceScopeToPmWorkRequest(
        workRequestId,
        serviceScopeId
      );
      toast.success("Service scope assigned to PM work request successfully");
      setShowAssignModal(false);
      setSelectedWorkRequest(null);
      await loadWorkRequests();
    } catch (error) {
      console.error("Error assigning service scope:", error);
      toast.error(
        error.response?.data?.message || "Failed to assign service scope"
      );
    } finally {
      setAssigningServiceScope(false);
    }
  };

  const openAssignModal = (workRequest) => {
    setSelectedWorkRequest(workRequest);
    setShowAssignModal(true);
  };

  const handleCreateWorkOrder = (workRequest) => {
    const priority = workRequest.priority;
    let orderType;
    if (priority.startsWith("CM_")) {
      orderType = "cm";
    } else if (priority.startsWith("RM_")) {
      orderType = "rm";
    } else if (priority === "PM_P4") {
      orderType = "pm";
    }
    navigate(
      `/work-orders?type=${orderType}&workRequestId=${workRequest.workRequestId}`
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Pending",
      },
      APPROVED: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Approved",
      },
      REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
    };
    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: status,
    };
    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
      RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
      RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
      CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
      CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
      CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
      PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
    };
    const config = priorityConfig[priority] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: priority,
    };
    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getWorkOrderStatusBadge = (workOrderStatus) => {
    const statusConfig = {
      ASSIGNED: { bg: "bg-blue-100", text: "text-blue-800", label: "Assigned" },
      IN_PROGRESS: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "In Progress",
      },
      COMPLETED: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Completed",
      },
      CANCELLED: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
    };
    const config = statusConfig[workOrderStatus] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      label: workOrderStatus || "No Work Order",
    };
    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const filteredWorkRequests = workRequests.filter(
    (request) =>
      request.workRequestId.toString().includes(searchTerm) ||
      request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.reasonComment &&
        request.reasonComment
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.workOrderStatus &&
        request.workOrderStatus
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
    (request) =>
      request.priority === "PM_P4" &&
      (!request.serviceScopeId || request.serviceScopeId === null)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* Outer Cover */}
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Middle Cover */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              All Work Requests
            </h2>
            <p className="text-gray-600">
              View and manage all work requests in the system
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ID, asset name, comment, priority, status, or work order status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw
                className={`w-5 h-5 text-gray-600 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>

          {pmWorkRequestsWithoutServiceScope.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-blue-400" />
                <div className="ml-3">
                  <p className="text-sm text-blue-700 font-medium">
                    {pmWorkRequestsWithoutServiceScope.length} PM work
                    request(s) need service scope assignment
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Click the "Assign Service Scope" button for PM work requests
                    to assign asset-defined services of scope.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Work Request ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Asset Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Scope
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason/Comment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Work Order Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Create Work Order
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan="10" className="px-6 py-12 text-center">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-3 text-lg font-medium text-gray-700">
                            Loading work requests...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredWorkRequests.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium">
                            No work requests found
                          </p>
                          <p className="text-sm">
                            {searchTerm
                              ? "Try adjusting your search criteria"
                              : "No work requests have been created yet"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredWorkRequests.map((request, index) => (
                      <tr
                        key={request.workRequestId}
                        className={`hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } transition-colors`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            #{request.workRequestId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {request.assetName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {request.serviceScopeName || (
                              <span className="text-gray-400 italic">
                                Not assigned
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {request.reasonComment || "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPriorityBadge(request.priority)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(request.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getWorkOrderStatusBadge(request.workOrderStatus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {request.createdAt
                              ? new Date(request.createdAt).toLocaleDateString()
                              : "-"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {request.priority === "PM_P4" &&
                            !request.serviceScopeId && (
                              <button
                                onClick={() => openAssignModal(request)}
                                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                                title="Assign PM Work Request for Asset Defined Services of Scope"
                              >
                                <Settings className="w-3 h-3 mr-1" />
                                Assign Service Scope
                              </button>
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {request.status === "APPROVED" &&
                            request.workOrderStatus !== "ASSIGNED" &&
                            request.workOrderStatus !== "IN_PROGRESS" &&
                            request.workOrderStatus !== "COMPLETED" && (
                              <button
                                onClick={() => handleCreateWorkOrder(request)}
                                className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                                title={`Create ${
                                  request.priority.startsWith("CM_")
                                    ? "CM"
                                    : request.priority.startsWith("RM_")
                                    ? "RM"
                                    : "PM"
                                } Work Order`}
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                Create Work Order
                              </button>
                            )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {!loading && filteredWorkRequests.length > 0 && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {filteredWorkRequests.length}
                  </span>{" "}
                  of <span className="font-medium">{workRequests.length}</span>{" "}
                  work requests
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Work Requests
            </button>
          </div>
        </div>
      </div>

      {showAssignModal && selectedWorkRequest && (
        <AssignServiceScopeModal
          workRequest={selectedWorkRequest}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedWorkRequest(null);
          }}
          onAssign={handleAssignServiceScope}
          isAssigning={assigningServiceScope}
        />
      )}
    </div>
  );
};

const AssignServiceScopeModal = ({
  workRequest,
  onClose,
  onAssign,
  isAssigning,
}) => {
  const [assetServiceScopes, setAssetServiceScopes] = useState([]);
  const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssetServiceScopes();
  }, []);

  const loadAssetServiceScopes = async () => {
    setLoading(true);
    try {
      const assetResponse = await assetService.getAssetById(
        workRequest.assetId
      );
      const asset = assetResponse.data;
      const allServiceScopes = [];
      if (asset.subServices && asset.subServices.length > 0) {
        asset.subServices.forEach((subService) => {
          if (subService.serviceScopeIds && subService.serviceScopeNames) {
            subService.serviceScopeIds.forEach((scopeId, index) => {
              allServiceScopes.push({
                scopeId: scopeId,
                scopeName: subService.serviceScopeNames[index],
                subServiceName: subService.subServiceName,
              });
            });
          }
        });
      }
      setAssetServiceScopes(allServiceScopes);
    } catch (error) {
      console.error("Error loading asset service scopes:", error);
      toast.error("Failed to load asset service scopes");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedServiceScopeId) {
      toast.error("Please select a service scope");
      return;
    }
    onAssign(workRequest.workRequestId, selectedServiceScopeId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Assign Service Scope
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <strong>Work Request:</strong> #{workRequest.workRequestId}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Asset:</strong> {workRequest.assetName}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asset Defined Services of Scope{" "}
              <span className="text-red-500">*</span>
            </label>
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">
                  Loading service scopes...
                </p>
              </div>
            ) : assetServiceScopes.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                No service scopes available for this asset
              </p>
            ) : (
              <select
                value={selectedServiceScopeId}
                onChange={(e) => setSelectedServiceScopeId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              >
                <option value="">Select Service Scope</option>
                {assetServiceScopes.map((scope) => (
                  <option key={scope.scopeId} value={scope.scopeId}>
                    {scope.scopeName} ({scope.subServiceName})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isAssigning || loading || assetServiceScopes.length === 0
              }
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isAssigning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Assigning...
                </>
              ) : (
                "Assign"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkRequestTable;
