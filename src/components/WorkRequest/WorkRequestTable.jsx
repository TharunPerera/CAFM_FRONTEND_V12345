// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import {
// // //   ArrowLeft,
// // //   FileText,
// // //   RefreshCw,
// // //   Search,
// // //   Calendar,
// // //   AlertCircle,
// // // } from "lucide-react";
// // // import { workRequestService } from "../../services/WorkRequestService";
// // // import { toast } from "react-toastify";

// // // const WorkRequestTable = ({ onBack }) => {
// // //   const [workRequests, setWorkRequests] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [isRefreshing, setIsRefreshing] = useState(false);

// // //   useEffect(() => {
// // //     loadWorkRequests();
// // //   }, []);

// // //   const loadWorkRequests = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await workRequestService.getAllWorkRequests();
// // //       setWorkRequests(response.data || []);
// // //     } catch (error) {
// // //       console.error("Error loading work requests:", error);
// // //       toast.error("Failed to load work requests");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleRefresh = async () => {
// // //     setIsRefreshing(true);
// // //     try {
// // //       await loadWorkRequests();
// // //       toast.success("Work requests refreshed successfully");
// // //     } finally {
// // //       setTimeout(() => setIsRefreshing(false), 500);
// // //     }
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const statusConfig = {
// // //       PENDING: {
// // //         bg: "bg-yellow-100",
// // //         text: "text-yellow-800",
// // //         label: "Pending",
// // //       },
// // //       APPROVED: {
// // //         bg: "bg-green-100",
// // //         text: "text-green-800",
// // //         label: "Approved",
// // //       },
// // //       REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
// // //     };

// // //     const config = statusConfig[status] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: status,
// // //     };

// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   const getPriorityBadge = (priority) => {
// // //     const priorityConfig = {
// // //       RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
// // //       RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
// // //       RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
// // //       CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
// // //       CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
// // //       CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
// // //       PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
// // //     };

// // //     const config = priorityConfig[priority] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: priority,
// // //     };

// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   // Filter work requests based on search term
// // //   const filteredWorkRequests = workRequests.filter(
// // //     (request) =>
// // //       request.workRequestId.toString().includes(searchTerm) ||
// // //       request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       (request.reasonComment &&
// // //         request.reasonComment
// // //           .toLowerCase()
// // //           .includes(searchTerm.toLowerCase())) ||
// // //       request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       request.status.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   return (
// // //     <div>
// // //       {/* Header */}
// // //       <div className="text-center mb-8">
// // //         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
// // //           <FileText className="w-8 h-8 text-white" />
// // //         </div>
// // //         <h2 className="text-2xl font-bold text-gray-900 mb-2">
// // //           All Work Requests
// // //         </h2>
// // //         <p className="text-gray-600">
// // //           View and manage all work requests in the system
// // //         </p>
// // //       </div>

// // //       {/* Search and Actions */}
// // //       <div className="flex flex-col sm:flex-row gap-4 mb-6">
// // //         <div className="relative flex-1">
// // //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //           <input
// // //             type="text"
// // //             placeholder="Search by ID, asset name, comment, priority, or status..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //           />
// // //         </div>
// // //         <button
// // //           onClick={handleRefresh}
// // //           disabled={isRefreshing}
// // //           className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// // //           title="Refresh"
// // //         >
// // //           <RefreshCw
// // //             className={`w-5 h-5 text-gray-600 ${
// // //               isRefreshing ? "animate-spin" : ""
// // //             }`}
// // //           />
// // //         </button>
// // //       </div>

// // //       {/* Table */}
// // //       <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
// // //         <div className="overflow-x-auto">
// // //           <table className="min-w-full divide-y divide-gray-200">
// // //             <thead className="bg-gray-50">
// // //               <tr>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Work Request ID
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Asset Name
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Reason/Comment
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Priority
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Status
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Created At
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="6" className="px-6 py-12 text-center">
// // //                     <div className="flex justify-center items-center">
// // //                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //                       <span className="ml-3 text-lg font-medium text-gray-700">
// // //                         Loading work requests...
// // //                       </span>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ) : filteredWorkRequests.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="6" className="px-6 py-12 text-center">
// // //                     <div className="text-gray-500">
// // //                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
// // //                       <p className="text-lg font-medium">
// // //                         No work requests found
// // //                       </p>
// // //                       <p className="text-sm">
// // //                         {searchTerm
// // //                           ? "Try adjusting your search criteria"
// // //                           : "No work requests have been created yet"}
// // //                       </p>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 filteredWorkRequests.map((request, index) => (
// // //                   <tr
// // //                     key={request.workRequestId}
// // //                     className={`hover:bg-gray-50 ${
// // //                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
// // //                     }`}
// // //                   >
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm font-medium text-gray-900">
// // //                         #{request.workRequestId}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm font-medium text-gray-900">
// // //                         {request.assetName}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4">
// // //                       <div className="text-sm text-gray-900 max-w-xs truncate">
// // //                         {request.reasonComment || "-"}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {getPriorityBadge(request.priority)}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {getStatusBadge(request.status)}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm text-gray-900 flex items-center">
// // //                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
// // //                         {request.createdAt
// // //                           ? new Date(request.createdAt).toLocaleDateString()
// // //                           : "-"}
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Footer */}
// // //         {!loading && filteredWorkRequests.length > 0 && (
// // //           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
// // //             <div className="text-sm text-gray-700">
// // //               Showing{" "}
// // //               <span className="font-medium">{filteredWorkRequests.length}</span>{" "}
// // //               of <span className="font-medium">{workRequests.length}</span> work
// // //               requests
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Back Button */}
// // //       <div className="mt-8 text-center">
// // //         <button
// // //           onClick={onBack}
// // //           className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
// // //         >
// // //           <ArrowLeft className="w-5 h-5 mr-2" />
// // //           Back to Work Requests
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default WorkRequestTable;

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import {
// // //   ArrowLeft,
// // //   FileText,
// // //   RefreshCw,
// // //   Search,
// // //   Calendar,
// // //   AlertCircle,
// // //   Settings,
// // // } from "lucide-react";
// // // import { workRequestService } from "../../services/WorkRequestService";
// // // import { toast } from "react-toastify";
// // // import { assetService } from "../../services/assetService"; // Declare the assetService variable

// // // const WorkRequestTable = ({ onBack }) => {
// // //   const [workRequests, setWorkRequests] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [isRefreshing, setIsRefreshing] = useState(false);
// // //   const [showAssignModal, setShowAssignModal] = useState(false);
// // //   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
// // //   const [assigningServiceScope, setAssigningServiceScope] = useState(false);

// // //   useEffect(() => {
// // //     loadWorkRequests();
// // //   }, []);

// // //   const loadWorkRequests = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await workRequestService.getAllWorkRequests();
// // //       setWorkRequests(response.data || []);
// // //     } catch (error) {
// // //       console.error("Error loading work requests:", error);
// // //       toast.error("Failed to load work requests");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleRefresh = async () => {
// // //     setIsRefreshing(true);
// // //     try {
// // //       await loadWorkRequests();
// // //       toast.success("Work requests refreshed successfully");
// // //     } finally {
// // //       setTimeout(() => setIsRefreshing(false), 500);
// // //     }
// // //   };

// // //   const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
// // //     setAssigningServiceScope(true);
// // //     try {
// // //       await workRequestService.assignServiceScopeToPmWorkRequest(
// // //         workRequestId,
// // //         serviceScopeId
// // //       );
// // //       toast.success("Service scope assigned to PM work request successfully");
// // //       setShowAssignModal(false);
// // //       setSelectedWorkRequest(null);
// // //       await loadWorkRequests(); // Refresh the list
// // //     } catch (error) {
// // //       console.error("Error assigning service scope:", error);
// // //       toast.error(
// // //         error.response?.data?.message || "Failed to assign service scope"
// // //       );
// // //     } finally {
// // //       setAssigningServiceScope(false);
// // //     }
// // //   };

// // //   const openAssignModal = (workRequest) => {
// // //     setSelectedWorkRequest(workRequest);
// // //     setShowAssignModal(true);
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const statusConfig = {
// // //       PENDING: {
// // //         bg: "bg-yellow-100",
// // //         text: "text-yellow-800",
// // //         label: "Pending",
// // //       },
// // //       APPROVED: {
// // //         bg: "bg-green-100",
// // //         text: "text-green-800",
// // //         label: "Approved",
// // //       },
// // //       REJECTED: {
// // //         bg: "bg-red-100",
// // //         text: "text-red-800",
// // //         label: "Rejected",
// // //       },
// // //     };

// // //     const config = statusConfig[status] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: status,
// // //     };

// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   const getPriorityBadge = (priority) => {
// // //     const priorityConfig = {
// // //       RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
// // //       RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
// // //       RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
// // //       CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
// // //       CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
// // //       CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
// // //       PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
// // //     };

// // //     const config = priorityConfig[priority] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: priority,
// // //     };

// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   // Filter work requests based on search term
// // //   const filteredWorkRequests = workRequests.filter(
// // //     (request) =>
// // //       request.workRequestId.toString().includes(searchTerm) ||
// // //       request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       (request.reasonComment &&
// // //         request.reasonComment
// // //           .toLowerCase()
// // //           .includes(searchTerm.toLowerCase())) ||
// // //       request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       request.status.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   // Get PM work requests that don't have service scope assigned
// // //   const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
// // //     (request) =>
// // //       request.priority === "PM_P4" &&
// // //       (!request.serviceScopeId || request.serviceScopeId === null)
// // //   );

// // //   return (
// // //     <div>
// // //       {/* Header */}
// // //       <div className="text-center mb-8">
// // //         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
// // //           <FileText className="w-8 h-8 text-white" />
// // //         </div>
// // //         <h2 className="text-2xl font-bold text-gray-900 mb-2">
// // //           All Work Requests
// // //         </h2>
// // //         <p className="text-gray-600">
// // //           View and manage all work requests in the system
// // //         </p>
// // //       </div>

// // //       {/* Search and Actions */}
// // //       <div className="flex flex-col sm:flex-row gap-4 mb-6">
// // //         <div className="relative flex-1">
// // //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //           <input
// // //             type="text"
// // //             placeholder="Search by ID, asset name, comment, priority, or status..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //           />
// // //         </div>
// // //         <button
// // //           onClick={handleRefresh}
// // //           disabled={isRefreshing}
// // //           className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// // //           title="Refresh"
// // //         >
// // //           <RefreshCw
// // //             className={`w-5 h-5 text-gray-600 ${
// // //               isRefreshing ? "animate-spin" : ""
// // //             }`}
// // //           />
// // //         </button>
// // //       </div>

// // //       {/* PM Work Requests Alert */}
// // //       {pmWorkRequestsWithoutServiceScope.length > 0 && (
// // //         <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
// // //           <div className="flex">
// // //             <AlertCircle className="h-5 w-5 text-blue-400" />
// // //             <div className="ml-3">
// // //               <p className="text-sm text-blue-700 font-medium">
// // //                 {pmWorkRequestsWithoutServiceScope.length} PM work request(s)
// // //                 need service scope assignment
// // //               </p>
// // //               <p className="text-sm text-blue-600 mt-1">
// // //                 Click the "Assign Service Scope" button for PM work requests to
// // //                 assign asset-defined services of scope.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Table */}
// // //       <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
// // //         <div className="overflow-x-auto">
// // //           <table className="min-w-full divide-y divide-gray-200">
// // //             <thead className="bg-gray-50">
// // //               <tr>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Work Request ID
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Asset Name
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Service Scope
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Reason/Comment
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Priority
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Status
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Created At
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Actions
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="8" className="px-6 py-12 text-center">
// // //                     <div className="flex justify-center items-center">
// // //                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //                       <span className="ml-3 text-lg font-medium text-gray-700">
// // //                         Loading work requests...
// // //                       </span>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ) : filteredWorkRequests.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="8" className="px-6 py-12 text-center">
// // //                     <div className="text-gray-500">
// // //                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
// // //                       <p className="text-lg font-medium">
// // //                         No work requests found
// // //                       </p>
// // //                       <p className="text-sm">
// // //                         {searchTerm
// // //                           ? "Try adjusting your search criteria"
// // //                           : "No work requests have been created yet"}
// // //                       </p>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 filteredWorkRequests.map((request, index) => (
// // //                   <tr
// // //                     key={request.workRequestId}
// // //                     className={`hover:bg-gray-50 ${
// // //                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
// // //                     }`}
// // //                   >
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm font-medium text-gray-900">
// // //                         #{request.workRequestId}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm font-medium text-gray-900">
// // //                         {request.assetName}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm text-gray-900">
// // //                         {request.serviceScopeName || (
// // //                           <span className="text-gray-400 italic">
// // //                             Not assigned
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4">
// // //                       <div className="text-sm text-gray-900 max-w-xs truncate">
// // //                         {request.reasonComment || "-"}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {getPriorityBadge(request.priority)}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {getStatusBadge(request.status)}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm text-gray-900 flex items-center">
// // //                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
// // //                         {request.createdAt
// // //                           ? new Date(request.createdAt).toLocaleDateString()
// // //                           : "-"}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {request.priority === "PM_P4" &&
// // //                         !request.serviceScopeId && (
// // //                           <button
// // //                             onClick={() => openAssignModal(request)}
// // //                             className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
// // //                             title="Assign PM Work Request for Asset Defined Services of Scope"
// // //                           >
// // //                             <Settings className="w-3 h-3 mr-1" />
// // //                             Assign Service Scope
// // //                           </button>
// // //                         )}
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Footer */}
// // //         {!loading && filteredWorkRequests.length > 0 && (
// // //           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
// // //             <div className="text-sm text-gray-700">
// // //               Showing{" "}
// // //               <span className="font-medium">{filteredWorkRequests.length}</span>{" "}
// // //               of <span className="font-medium">{workRequests.length}</span> work
// // //               requests
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Back Button */}
// // //       <div className="mt-8 text-center">
// // //         <button
// // //           onClick={onBack}
// // //           className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
// // //         >
// // //           <ArrowLeft className="w-5 h-5 mr-2" />
// // //           Back to Work Requests
// // //         </button>
// // //       </div>

// // //       {/* Assign Service Scope Modal */}
// // //       {showAssignModal && selectedWorkRequest && (
// // //         <AssignServiceScopeModal
// // //           workRequest={selectedWorkRequest}
// // //           onClose={() => {
// // //             setShowAssignModal(false);
// // //             setSelectedWorkRequest(null);
// // //           }}
// // //           onAssign={handleAssignServiceScope}
// // //           isAssigning={assigningServiceScope}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // Modal component for assigning service scope to PM work requests
// // // const AssignServiceScopeModal = ({
// // //   workRequest,
// // //   onClose,
// // //   onAssign,
// // //   isAssigning,
// // // }) => {
// // //   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
// // //   const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     loadAssetServiceScopes();
// // //   }, []);

// // //   const loadAssetServiceScopes = async () => {
// // //     setLoading(true);
// // //     try {
// // //       // Get asset details to extract service scopes
// // //       const assetResponse = await assetService.getAssetById(
// // //         workRequest.assetId
// // //       );
// // //       const asset = assetResponse.data;

// // //       // Extract all service scopes from all sub-services
// // //       const allServiceScopes = [];
// // //       if (asset.subServices && asset.subServices.length > 0) {
// // //         asset.subServices.forEach((subService) => {
// // //           if (subService.serviceScopeIds && subService.serviceScopeNames) {
// // //             subService.serviceScopeIds.forEach((scopeId, index) => {
// // //               allServiceScopes.push({
// // //                 scopeId: scopeId,
// // //                 scopeName: subService.serviceScopeNames[index],
// // //                 subServiceName: subService.subServiceName,
// // //               });
// // //             });
// // //           }
// // //         });
// // //       }

// // //       setAssetServiceScopes(allServiceScopes);
// // //     } catch (error) {
// // //       console.error("Error loading asset service scopes:", error);
// // //       toast.error("Failed to load asset service scopes");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (!selectedServiceScopeId) {
// // //       toast.error("Please select a service scope");
// // //       return;
// // //     }
// // //     onAssign(workRequest.workRequestId, selectedServiceScopeId);
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //       <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
// // //         <div className="flex justify-between items-center mb-6">
// // //           <h3 className="text-xl font-bold text-gray-900">
// // //             Assign Service Scope
// // //           </h3>
// // //           <button
// // //             onClick={onClose}
// // //             className="text-gray-500 hover:text-gray-700 text-2xl"
// // //           >
// // //             ×
// // //           </button>
// // //         </div>

// // //         <div className="mb-4">
// // //           <p className="text-sm text-gray-600">
// // //             <strong>Work Request:</strong> #{workRequest.workRequestId}
// // //           </p>
// // //           <p className="text-sm text-gray-600">
// // //             <strong>Asset:</strong> {workRequest.assetName}
// // //           </p>
// // //         </div>

// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-6">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Asset Defined Services of Scope{" "}
// // //               <span className="text-red-500">*</span>
// // //             </label>
// // //             {loading ? (
// // //               <div className="text-center py-4">
// // //                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
// // //                 <p className="text-sm text-gray-600 mt-2">
// // //                   Loading service scopes...
// // //                 </p>
// // //               </div>
// // //             ) : assetServiceScopes.length === 0 ? (
// // //               <p className="text-sm text-gray-500 py-4 text-center">
// // //                 No service scopes available for this asset
// // //               </p>
// // //             ) : (
// // //               <select
// // //                 value={selectedServiceScopeId}
// // //                 onChange={(e) => setSelectedServiceScopeId(e.target.value)}
// // //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                 required
// // //               >
// // //                 <option value="">Select Service Scope</option>
// // //                 {assetServiceScopes.map((scope) => (
// // //                   <option key={scope.scopeId} value={scope.scopeId}>
// // //                     {scope.scopeName} ({scope.subServiceName})
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             )}
// // //           </div>

// // //           <div className="flex gap-3">
// // //             <button
// // //               type="button"
// // //               onClick={onClose}
// // //               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               disabled={
// // //                 isAssigning || loading || assetServiceScopes.length === 0
// // //               }
// // //               className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
// // //             >
// // //               {isAssigning ? (
// // //                 <>
// // //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // //                   Assigning...
// // //                 </>
// // //               ) : (
// // //                 "Assign"
// // //               )}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default WorkRequestTable;

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   ArrowLeft,
// // //   FileText,
// // //   RefreshCw,
// // //   Search,
// // //   Calendar,
// // //   AlertCircle,
// // //   Settings,
// // // } from "lucide-react";
// // // import { workRequestService } from "../../services/WorkRequestService";
// // // import { toast } from "react-toastify";
// // // import { assetService } from "../../services/assetService";

// // // const WorkRequestTable = ({ onBack }) => {
// // //   const [workRequests, setWorkRequests] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [isRefreshing, setIsRefreshing] = useState(false);
// // //   const [showAssignModal, setShowAssignModal] = useState(false);
// // //   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
// // //   const [assigningServiceScope, setAssigningServiceScope] = useState(false);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     loadWorkRequests();
// // //   }, []);

// // //   const loadWorkRequests = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await workRequestService.getAllWorkRequests();
// // //       setWorkRequests(response.data || []);
// // //     } catch (error) {
// // //       console.error("Error loading work requests:", error);
// // //       toast.error("Failed to load work requests");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleRefresh = async () => {
// // //     setIsRefreshing(true);
// // //     try {
// // //       await loadWorkRequests();
// // //       toast.success("Work requests refreshed successfully");
// // //     } finally {
// // //       setTimeout(() => setIsRefreshing(false), 500);
// // //     }
// // //   };

// // //   const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
// // //     setAssigningServiceScope(true);
// // //     try {
// // //       await workRequestService.assignServiceScopeToPmWorkRequest(
// // //         workRequestId,
// // //         serviceScopeId
// // //       );
// // //       toast.success("Service scope assigned to PM work request successfully");
// // //       setShowAssignModal(false);
// // //       setSelectedWorkRequest(null);
// // //       await loadWorkRequests();
// // //     } catch (error) {
// // //       console.error("Error assigning service scope:", error);
// // //       toast.error(
// // //         error.response?.data?.message || "Failed to assign service scope"
// // //       );
// // //     } finally {
// // //       setAssigningServiceScope(false);
// // //     }
// // //   };

// // //   const openAssignModal = (workRequest) => {
// // //     setSelectedWorkRequest(workRequest);
// // //     setShowAssignModal(true);
// // //   };

// // //   const handleCreateWorkOrder = (workRequest) => {
// // //     const priority = workRequest.priority;
// // //     let orderType;
// // //     if (priority.startsWith("CM_")) {
// // //       orderType = "cm";
// // //     } else if (priority.startsWith("RM_")) {
// // //       orderType = "rm";
// // //     } else if (priority === "PM_P4") {
// // //       orderType = "pm";
// // //     }
// // //     navigate(
// // //       `/work-orders?type=${orderType}&workRequestId=${workRequest.workRequestId}`
// // //     );
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const statusConfig = {
// // //       PENDING: {
// // //         bg: "bg-yellow-100",
// // //         text: "text-yellow-800",
// // //         label: "Pending",
// // //       },
// // //       APPROVED: {
// // //         bg: "bg-green-100",
// // //         text: "text-green-800",
// // //         label: "Approved",
// // //       },
// // //       REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
// // //     };
// // //     const config = statusConfig[status] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: status,
// // //     };
// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   const getPriorityBadge = (priority) => {
// // //     const priorityConfig = {
// // //       RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
// // //       RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
// // //       RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
// // //       CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
// // //       CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
// // //       CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
// // //       PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
// // //     };
// // //     const config = priorityConfig[priority] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: priority,
// // //     };
// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   const filteredWorkRequests = workRequests.filter(
// // //     (request) =>
// // //       request.workRequestId.toString().includes(searchTerm) ||
// // //       request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       (request.reasonComment &&
// // //         request.reasonComment
// // //           .toLowerCase()
// // //           .includes(searchTerm.toLowerCase())) ||
// // //       request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       request.status.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
// // //     (request) =>
// // //       request.priority === "PM_P4" &&
// // //       (!request.serviceScopeId || request.serviceScopeId === null)
// // //   );

// // //   return (
// // //     <div>
// // //       <div className="text-center mb-8">
// // //         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
// // //           <FileText className="w-8 h-8 text-white" />
// // //         </div>
// // //         <h2 className="text-2xl font-bold text-gray-900 mb-2">
// // //           All Work Requests
// // //         </h2>
// // //         <p className="text-gray-600">
// // //           View and manage all work requests in the system
// // //         </p>
// // //       </div>

// // //       <div className="flex flex-col sm:flex-row gap-4 mb-6">
// // //         <div className="relative flex-1">
// // //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //           <input
// // //             type="text"
// // //             placeholder="Search by ID, asset name, comment, priority, or status..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //           />
// // //         </div>
// // //         <button
// // //           onClick={handleRefresh}
// // //           disabled={isRefreshing}
// // //           className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// // //           title="Refresh"
// // //         >
// // //           <RefreshCw
// // //             className={`w-5 h-5 text-gray-600 ${
// // //               isRefreshing ? "animate-spin" : ""
// // //             }`}
// // //           />
// // //         </button>
// // //       </div>

// // //       {pmWorkRequestsWithoutServiceScope.length > 0 && (
// // //         <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
// // //           <div className="flex">
// // //             <AlertCircle className="h-5 w-5 text-blue-400" />
// // //             <div className="ml-3">
// // //               <p className="text-sm text-blue-700 font-medium">
// // //                 {pmWorkRequestsWithoutServiceScope.length} PM work request(s)
// // //                 need service scope assignment
// // //               </p>
// // //               <p className="text-sm text-blue-600 mt-1">
// // //                 Click the "Assign Service Scope" button for PM work requests to
// // //                 assign asset-defined services of scope.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
// // //         <div className="overflow-x-auto">
// // //           <table className="min-w-full divide-y divide-gray-200">
// // //             <thead className="bg-gray-50">
// // //               <tr>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Work Request ID
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Asset Name
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Service Scope
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Reason/Comment
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Priority
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Status
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Created At
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Actions
// // //                 </th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                   Create Work Order
// // //                 </th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {loading ? (
// // //                 <tr>
// // //                   <td colSpan="9" className="px-6 py-12 text-center">
// // //                     <div className="flex justify-center items-center">
// // //                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //                       <span className="ml-3 text-lg font-medium text-gray-700">
// // //                         Loading work requests...
// // //                       </span>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ) : filteredWorkRequests.length === 0 ? (
// // //                 <tr>
// // //                   <td colSpan="9" className="px-6 py-12 text-center">
// // //                     <div className="text-gray-500">
// // //                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
// // //                       <p className="text-lg font-medium">
// // //                         No work requests found
// // //                       </p>
// // //                       <p className="text-sm">
// // //                         {searchTerm
// // //                           ? "Try adjusting your search criteria"
// // //                           : "No work requests have been created yet"}
// // //                       </p>
// // //                     </div>
// // //                   </td>
// // //                 </tr>
// // //               ) : (
// // //                 filteredWorkRequests.map((request, index) => (
// // //                   <tr
// // //                     key={request.workRequestId}
// // //                     className={`hover:bg-gray-50 ${
// // //                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
// // //                     }`}
// // //                   >
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm font-medium text-gray-900">
// // //                         #{request.workRequestId}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm font-medium text-gray-900">
// // //                         {request.assetName}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm text-gray-900">
// // //                         {request.serviceScopeName || (
// // //                           <span className="text-gray-400 italic">
// // //                             Not assigned
// // //                           </span>
// // //                         )}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4">
// // //                       <div className="text-sm text-gray-900 max-w-xs truncate">
// // //                         {request.reasonComment || "-"}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {getPriorityBadge(request.priority)}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {getStatusBadge(request.status)}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <div className="text-sm text-gray-900 flex items-center">
// // //                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
// // //                         {request.createdAt
// // //                           ? new Date(request.createdAt).toLocaleDateString()
// // //                           : "-"}
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       {request.priority === "PM_P4" &&
// // //                         !request.serviceScopeId && (
// // //                           <button
// // //                             onClick={() => openAssignModal(request)}
// // //                             className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
// // //                             title="Assign PM Work Request for Asset Defined Services of Scope"
// // //                           >
// // //                             <Settings className="w-3 h-3 mr-1" />
// // //                             Assign Service Scope
// // //                           </button>
// // //                         )}
// // //                     </td>
// // //                     <td className="px-6 py-4 whitespace-nowrap">
// // //                       <button
// // //                         onClick={() => handleCreateWorkOrder(request)}
// // //                         className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
// // //                         title={`Create ${
// // //                           request.priority.startsWith("CM_")
// // //                             ? "CM"
// // //                             : request.priority.startsWith("RM_")
// // //                             ? "RM"
// // //                             : "PM"
// // //                         } Work Order`}
// // //                       >
// // //                         <FileText className="w-3 h-3 mr-1" />
// // //                         Create Work Order
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //         {!loading && filteredWorkRequests.length > 0 && (
// // //           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
// // //             <div className="text-sm text-gray-700">
// // //               Showing{" "}
// // //               <span className="font-medium">{filteredWorkRequests.length}</span>{" "}
// // //               of <span className="font-medium">{workRequests.length}</span> work
// // //               requests
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="mt-8 text-center">
// // //         <button
// // //           onClick={onBack}
// // //           className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
// // //         >
// // //           <ArrowLeft className="w-5 h-5 mr-2" />
// // //           Back to Work Requests
// // //         </button>
// // //       </div>

// // //       {showAssignModal && selectedWorkRequest && (
// // //         <AssignServiceScopeModal
// // //           workRequest={selectedWorkRequest}
// // //           onClose={() => {
// // //             setShowAssignModal(false);
// // //             setSelectedWorkRequest(null);
// // //           }}
// // //           onAssign={handleAssignServiceScope}
// // //           isAssigning={assigningServiceScope}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const AssignServiceScopeModal = ({
// // //   workRequest,
// // //   onClose,
// // //   onAssign,
// // //   isAssigning,
// // // }) => {
// // //   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
// // //   const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     loadAssetServiceScopes();
// // //   }, []);

// // //   const loadAssetServiceScopes = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const assetResponse = await assetService.getAssetById(
// // //         workRequest.assetId
// // //       );
// // //       const asset = assetResponse.data;
// // //       const allServiceScopes = [];
// // //       if (asset.subServices && asset.subServices.length > 0) {
// // //         asset.subServices.forEach((subService) => {
// // //           if (subService.serviceScopeIds && subService.serviceScopeNames) {
// // //             subService.serviceScopeIds.forEach((scopeId, index) => {
// // //               allServiceScopes.push({
// // //                 scopeId: scopeId,
// // //                 scopeName: subService.serviceScopeNames[index],
// // //                 subServiceName: subService.subServiceName,
// // //               });
// // //             });
// // //           }
// // //         });
// // //       }
// // //       setAssetServiceScopes(allServiceScopes);
// // //     } catch (error) {
// // //       console.error("Error loading asset service scopes:", error);
// // //       toast.error("Failed to load asset service scopes");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (!selectedServiceScopeId) {
// // //       toast.error("Please select a service scope");
// // //       return;
// // //     }
// // //     onAssign(workRequest.workRequestId, selectedServiceScopeId);
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //       <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
// // //         <div className="flex justify-between items-center mb-6">
// // //           <h3 className="text-xl font-bold text-gray-900">
// // //             Assign Service Scope
// // //           </h3>
// // //           <button
// // //             onClick={onClose}
// // //             className="text-gray-500 hover:text-gray-700 text-2xl"
// // //           >
// // //             ×
// // //           </button>
// // //         </div>
// // //         <div className="mb-4">
// // //           <p className="text-sm text-gray-600">
// // //             <strong>Work Request:</strong> #{workRequest.workRequestId}
// // //           </p>
// // //           <p className="text-sm text-gray-600">
// // //             <strong>Asset:</strong> {workRequest.assetName}
// // //           </p>
// // //         </div>
// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-6">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Asset Defined Services of Scope{" "}
// // //               <span className="text-red-500">*</span>
// // //             </label>
// // //             {loading ? (
// // //               <div className="text-center py-4">
// // //                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
// // //                 <p className="text-sm text-gray-600 mt-2">
// // //                   Loading service scopes...
// // //                 </p>
// // //               </div>
// // //             ) : assetServiceScopes.length === 0 ? (
// // //               <p className="text-sm text-gray-500 py-4 text-center">
// // //                 No service scopes available for this asset
// // //               </p>
// // //             ) : (
// // //               <select
// // //                 value={selectedServiceScopeId}
// // //                 onChange={(e) => setSelectedServiceScopeId(e.target.value)}
// // //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //                 required
// // //               >
// // //                 <option value="">Select Service Scope</option>
// // //                 {assetServiceScopes.map((scope) => (
// // //                   <option key={scope.scopeId} value={scope.scopeId}>
// // //                     {scope.scopeName} ({scope.subServiceName})
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             )}
// // //           </div>
// // //           <div className="flex gap-3">
// // //             <button
// // //               type="button"
// // //               onClick={onClose}
// // //               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               disabled={
// // //                 isAssigning || loading || assetServiceScopes.length === 0
// // //               }
// // //               className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
// // //             >
// // //               {isAssigning ? (
// // //                 <>
// // //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // //                   Assigning...
// // //                 </>
// // //               ) : (
// // //                 "Assign"
// // //               )}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default WorkRequestTable;

// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   ArrowLeft,
// // //   FileText,
// // //   RefreshCw,
// // //   Search,
// // //   Calendar,
// // //   AlertCircle,
// // //   Settings,
// // // } from "lucide-react";
// // // import { workRequestService } from "../../services/WorkRequestService";
// // // import { toast } from "react-toastify";
// // // import { assetService } from "../../services/assetService";

// // // const WorkRequestTable = ({ onBack }) => {
// // //   const [workRequests, setWorkRequests] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [isRefreshing, setIsRefreshing] = useState(false);
// // //   const [showAssignModal, setShowAssignModal] = useState(false);
// // //   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
// // //   const [assigningServiceScope, setAssigningServiceScope] = useState(false);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     loadWorkRequests();
// // //   }, []);

// // //   const loadWorkRequests = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await workRequestService.getAllWorkRequests();
// // //       setWorkRequests(response.data || []);
// // //     } catch (error) {
// // //       console.error("Error loading work requests:", error);
// // //       toast.error("Failed to load work requests");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleRefresh = async () => {
// // //     setIsRefreshing(true);
// // //     try {
// // //       await loadWorkRequests();
// // //       toast.success("Work requests refreshed successfully");
// // //     } finally {
// // //       setTimeout(() => setIsRefreshing(false), 500);
// // //     }
// // //   };

// // //   const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
// // //     setAssigningServiceScope(true);
// // //     try {
// // //       await workRequestService.assignServiceScopeToPmWorkRequest(
// // //         workRequestId,
// // //         serviceScopeId
// // //       );
// // //       toast.success("Service scope assigned to PM work request successfully");
// // //       setShowAssignModal(false);
// // //       setSelectedWorkRequest(null);
// // //       await loadWorkRequests();
// // //     } catch (error) {
// // //       console.error("Error assigning service scope:", error);
// // //       toast.error(
// // //         error.response?.data?.message || "Failed to assign service scope"
// // //       );
// // //     } finally {
// // //       setAssigningServiceScope(false);
// // //     }
// // //   };

// // //   const openAssignModal = (workRequest) => {
// // //     setSelectedWorkRequest(workRequest);
// // //     setShowAssignModal(true);
// // //   };

// // //   const handleCreateWorkOrder = (workRequest) => {
// // //     const priority = workRequest.priority;
// // //     let orderType;
// // //     if (priority.startsWith("CM_")) {
// // //       orderType = "cm";
// // //     } else if (priority.startsWith("RM_")) {
// // //       orderType = "rm";
// // //     } else if (priority === "PM_P4") {
// // //       orderType = "pm";
// // //     }
// // //     navigate(
// // //       `/work-orders?type=${orderType}&workRequestId=${workRequest.workRequestId}`
// // //     );
// // //   };

// // //   const getStatusBadge = (status) => {
// // //     const statusConfig = {
// // //       PENDING: {
// // //         bg: "bg-yellow-100",
// // //         text: "text-yellow-800",
// // //         label: "Pending",
// // //       },
// // //       APPROVED: {
// // //         bg: "bg-green-100",
// // //         text: "text-green-800",
// // //         label: "Approved",
// // //       },
// // //       REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
// // //     };
// // //     const config = statusConfig[status] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: status,
// // //     };
// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   const getPriorityBadge = (priority) => {
// // //     const priorityConfig = {
// // //       RM_P1: { bg: "bg-red-100", text: "text-red-800", label: "RM P1" },
// // //       RM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "RM P2" },
// // //       RM_P3: { bg: "bg-green-100", text: "text-green-800", label: "RM P3" },
// // //       CM_P1: { bg: "bg-red-100", text: "text-red-800", label: "CM P1" },
// // //       CM_P2: { bg: "bg-yellow-100", text: "text-yellow-800", label: "CM P2" },
// // //       CM_P3: { bg: "bg-green-100", text: "text-green-800", label: "CM P3" },
// // //       PM_P4: { bg: "bg-blue-100", text: "text-blue-800", label: "PM P4" },
// // //     };
// // //     const config = priorityConfig[priority] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: priority,
// // //     };
// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   const getWorkOrderStatusBadge = (workOrderStatus) => {
// // //     const statusConfig = {
// // //       ASSIGNED: { bg: "bg-blue-100", text: "text-blue-800", label: "Assigned" },
// // //       IN_PROGRESS: {
// // //         bg: "bg-blue-100",
// // //         text: "text-blue-800",
// // //         label: "In Progress",
// // //       },
// // //       COMPLETED: {
// // //         bg: "bg-green-100",
// // //         text: "text-green-800",
// // //         label: "Completed",
// // //       },
// // //       CANCELLED: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
// // //     };
// // //     const config = statusConfig[workOrderStatus] || {
// // //       bg: "bg-gray-100",
// // //       text: "text-gray-800",
// // //       label: workOrderStatus || "No Work Order",
// // //     };
// // //     return (
// // //       <span
// // //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// // //       >
// // //         {config.label}
// // //       </span>
// // //     );
// // //   };

// // //   const filteredWorkRequests = workRequests.filter(
// // //     (request) =>
// // //       request.workRequestId.toString().includes(searchTerm) ||
// // //       request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       (request.reasonComment &&
// // //         request.reasonComment
// // //           .toLowerCase()
// // //           .includes(searchTerm.toLowerCase())) ||
// // //       request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //       (request.workOrderStatus &&
// // //         request.workOrderStatus
// // //           .toLowerCase()
// // //           .includes(searchTerm.toLowerCase()))
// // //   );

// // //   const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
// // //     (request) =>
// // //       request.priority === "PM_P4" &&
// // //       (!request.serviceScopeId || request.serviceScopeId === null)
// // //   );

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
// // //       {/* Outer Cover */}
// // //       <div className="w-full max-w-7xl bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
// // //         {/* Middle Cover */}
// // //         <div className="p-8">
// // //           <div className="text-center mb-8">
// // //             <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
// // //               <FileText className="w-8 h-8 text-white" />
// // //             </div>
// // //             <h2 className="text-2xl font-bold text-gray-900 mb-2">
// // //               All Work Requests
// // //             </h2>
// // //             <p className="text-gray-600">
// // //               View and manage all work requests in the system
// // //             </p>
// // //           </div>

// // //           <div className="flex flex-col sm:flex-row gap-4 mb-6">
// // //             <div className="relative flex-1">
// // //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search by ID, asset name, comment, priority, status, or work order status..."
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
// // //               />
// // //             </div>
// // //             <button
// // //               onClick={handleRefresh}
// // //               disabled={isRefreshing}
// // //               className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
// // //               title="Refresh"
// // //             >
// // //               <RefreshCw
// // //                 className={`w-5 h-5 text-gray-600 ${
// // //                   isRefreshing ? "animate-spin" : ""
// // //                 }`}
// // //               />
// // //             </button>
// // //           </div>

// // //           {pmWorkRequestsWithoutServiceScope.length > 0 && (
// // //             <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
// // //               <div className="flex">
// // //                 <AlertCircle className="h-5 w-5 text-blue-400" />
// // //                 <div className="ml-3">
// // //                   <p className="text-sm text-blue-700 font-medium">
// // //                     {pmWorkRequestsWithoutServiceScope.length} PM work
// // //                     request(s) need service scope assignment
// // //                   </p>
// // //                   <p className="text-sm text-blue-600 mt-1">
// // //                     Click the "Assign Service Scope" button for PM work requests
// // //                     to assign asset-defined services of scope.
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
// // //             <div className="overflow-x-auto">
// // //               <table className="min-w-full divide-y divide-gray-200">
// // //                 <thead className="bg-gray-50">
// // //                   <tr>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Work Request ID
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Asset Name
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Service Scope
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Reason/Comment
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Priority
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Status
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Work Order Status
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Created At
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Actions
// // //                     </th>
// // //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // //                       Create Work Order
// // //                     </th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="bg-white divide-y divide-gray-200">
// // //                   {loading ? (
// // //                     <tr>
// // //                       <td colSpan="10" className="px-6 py-12 text-center">
// // //                         <div className="flex justify-center items-center">
// // //                           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// // //                           <span className="ml-3 text-lg font-medium text-gray-700">
// // //                             Loading work requests...
// // //                           </span>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   ) : filteredWorkRequests.length === 0 ? (
// // //                     <tr>
// // //                       <td colSpan="10" className="px-6 py-12 text-center">
// // //                         <div className="text-gray-500">
// // //                           <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
// // //                           <p className="text-lg font-medium">
// // //                             No work requests found
// // //                           </p>
// // //                           <p className="text-sm">
// // //                             {searchTerm
// // //                               ? "Try adjusting your search criteria"
// // //                               : "No work requests have been created yet"}
// // //                           </p>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   ) : (
// // //                     filteredWorkRequests.map((request, index) => (
// // //                       <tr
// // //                         key={request.workRequestId}
// // //                         className={`hover:bg-gray-50 ${
// // //                           index % 2 === 0 ? "bg-white" : "bg-gray-50"
// // //                         } transition-colors`}
// // //                       >
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           <div className="text-sm font-medium text-gray-900">
// // //                             #{request.workRequestId}
// // //                           </div>
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           <div className="text-sm font-medium text-gray-900">
// // //                             {request.assetName}
// // //                           </div>
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           <div className="text-sm text-gray-900">
// // //                             {request.serviceScopeName || (
// // //                               <span className="text-gray-400 italic">
// // //                                 Not assigned
// // //                               </span>
// // //                             )}
// // //                           </div>
// // //                         </td>
// // //                         <td className="px-6 py-4">
// // //                           <div className="text-sm text-gray-900 max-w-xs truncate">
// // //                             {request.reasonComment || "-"}
// // //                           </div>
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           {getPriorityBadge(request.priority)}
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           {getStatusBadge(request.status)}
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           {getWorkOrderStatusBadge(request.workOrderStatus)}
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           <div className="text-sm text-gray-900 flex items-center">
// // //                             <Calendar className="w-4 h-4 mr-1 text-gray-400" />
// // //                             {request.createdAt
// // //                               ? new Date(request.createdAt).toLocaleDateString()
// // //                               : "-"}
// // //                           </div>
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           {request.priority === "PM_P4" &&
// // //                             !request.serviceScopeId && (
// // //                               <button
// // //                                 onClick={() => openAssignModal(request)}
// // //                                 className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
// // //                                 title="Assign PM Work Request for Asset Defined Services of Scope"
// // //                               >
// // //                                 <Settings className="w-3 h-3 mr-1" />
// // //                                 Assign Service Scope
// // //                               </button>
// // //                             )}
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           {request.status === "APPROVED" &&
// // //                             request.workOrderStatus !== "ASSIGNED" &&
// // //                             request.workOrderStatus !== "IN_PROGRESS" &&
// // //                             request.workOrderStatus !== "COMPLETED" && (
// // //                               <button
// // //                                 onClick={() => handleCreateWorkOrder(request)}
// // //                                 className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
// // //                                 title={`Create ${
// // //                                   request.priority.startsWith("CM_")
// // //                                     ? "CM"
// // //                                     : request.priority.startsWith("RM_")
// // //                                     ? "RM"
// // //                                     : "PM"
// // //                                 } Work Order`}
// // //                               >
// // //                                 <FileText className="w-3 h-3 mr-1" />
// // //                                 Create Work Order
// // //                               </button>
// // //                             )}
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //             {!loading && filteredWorkRequests.length > 0 && (
// // //               <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
// // //                 <div className="text-sm text-gray-700">
// // //                   Showing{" "}
// // //                   <span className="font-medium">
// // //                     {filteredWorkRequests.length}
// // //                   </span>{" "}
// // //                   of <span className="font-medium">{workRequests.length}</span>{" "}
// // //                   work requests
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           <div className="mt-8 text-center">
// // //             <button
// // //               onClick={onBack}
// // //               className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
// // //             >
// // //               <ArrowLeft className="w-5 h-5 mr-2" />
// // //               Back to Work Requests
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {showAssignModal && selectedWorkRequest && (
// // //         <AssignServiceScopeModal
// // //           workRequest={selectedWorkRequest}
// // //           onClose={() => {
// // //             setShowAssignModal(false);
// // //             setSelectedWorkRequest(null);
// // //           }}
// // //           onAssign={handleAssignServiceScope}
// // //           isAssigning={assigningServiceScope}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // const AssignServiceScopeModal = ({
// // //   workRequest,
// // //   onClose,
// // //   onAssign,
// // //   isAssigning,
// // // }) => {
// // //   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
// // //   const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     loadAssetServiceScopes();
// // //   }, []);

// // //   const loadAssetServiceScopes = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const assetResponse = await assetService.getAssetById(
// // //         workRequest.assetId
// // //       );
// // //       const asset = assetResponse.data;
// // //       const allServiceScopes = [];
// // //       if (asset.subServices && asset.subServices.length > 0) {
// // //         asset.subServices.forEach((subService) => {
// // //           if (subService.serviceScopeIds && subService.serviceScopeNames) {
// // //             subService.serviceScopeIds.forEach((scopeId, index) => {
// // //               allServiceScopes.push({
// // //                 scopeId: scopeId,
// // //                 scopeName: subService.serviceScopeNames[index],
// // //                 subServiceName: subService.subServiceName,
// // //               });
// // //             });
// // //           }
// // //         });
// // //       }
// // //       setAssetServiceScopes(allServiceScopes);
// // //     } catch (error) {
// // //       console.error("Error loading asset service scopes:", error);
// // //       toast.error("Failed to load asset service scopes");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (!selectedServiceScopeId) {
// // //       toast.error("Please select a service scope");
// // //       return;
// // //     }
// // //     onAssign(workRequest.workRequestId, selectedServiceScopeId);
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //       <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
// // //         <div className="flex justify-between items-center mb-6">
// // //           <h3 className="text-xl font-bold text-gray-900">
// // //             Assign Service Scope
// // //           </h3>
// // //           <button
// // //             onClick={onClose}
// // //             className="text-gray-500 hover:text-gray-700 text-2xl"
// // //           >
// // //             ×
// // //           </button>
// // //         </div>
// // //         <div className="mb-4">
// // //           <p className="text-sm text-gray-600">
// // //             <strong>Work Request:</strong> #{workRequest.workRequestId}
// // //           </p>
// // //           <p className="text-sm text-gray-600">
// // //             <strong>Asset:</strong> {workRequest.assetName}
// // //           </p>
// // //         </div>
// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-6">
// // //             <label className="block text-sm font-medium text-gray-700 mb-2">
// // //               Asset Defined Services of Scope{" "}
// // //               <span className="text-red-500">*</span>
// // //             </label>
// // //             {loading ? (
// // //               <div className="text-center py-4">
// // //                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
// // //                 <p className="text-sm text-gray-600 mt-2">
// // //                   Loading service scopes...
// // //                 </p>
// // //               </div>
// // //             ) : assetServiceScopes.length === 0 ? (
// // //               <p className="text-sm text-gray-500 py-4 text-center">
// // //                 No service scopes available for this asset
// // //               </p>
// // //             ) : (
// // //               <select
// // //                 value={selectedServiceScopeId}
// // //                 onChange={(e) => setSelectedServiceScopeId(e.target.value)}
// // //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
// // //                 required
// // //               >
// // //                 <option value="">Select Service Scope</option>
// // //                 {assetServiceScopes.map((scope) => (
// // //                   <option key={scope.scopeId} value={scope.scopeId}>
// // //                     {scope.scopeName} ({scope.subServiceName})
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             )}
// // //           </div>
// // //           <div className="flex gap-3">
// // //             <button
// // //               type="button"
// // //               onClick={onClose}
// // //               className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               disabled={
// // //                 isAssigning || loading || assetServiceScopes.length === 0
// // //               }
// // //               className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
// // //             >
// // //               {isAssigning ? (
// // //                 <>
// // //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // //                   Assigning...
// // //                 </>
// // //               ) : (
// // //                 "Assign"
// // //               )}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default WorkRequestTable;

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   ArrowLeft,
// //   FileText,
// //   RefreshCw,
// //   Search,
// //   Calendar,
// //   AlertCircle,
// //   Settings,
// //   Filter,
// //   X,
// // } from "lucide-react";
// // import { workRequestService } from "../../services/WorkRequestService";
// // import { toast } from "react-toastify";
// // import { assetService } from "../../services/assetService";

// // const WorkRequestTable = ({ onBack }) => {
// //   const [workRequests, setWorkRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
// //   const [assigningServiceScope, setAssigningServiceScope] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     loadWorkRequests();
// //   }, []);

// //   const loadWorkRequests = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await workRequestService.getAllWorkRequests();
// //       setWorkRequests(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading work requests:", error);
// //       toast.error("Failed to load work requests");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await loadWorkRequests();
// //       toast.success("Work requests refreshed successfully");
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 500);
// //     }
// //   };

// //   const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
// //     setAssigningServiceScope(true);
// //     try {
// //       await workRequestService.assignServiceScopeToPmWorkRequest(
// //         workRequestId,
// //         serviceScopeId
// //       );
// //       toast.success("Service scope assigned successfully");
// //       setShowAssignModal(false);
// //       setSelectedWorkRequest(null);
// //       await loadWorkRequests();
// //     } catch (error) {
// //       console.error("Error assigning service scope:", error);
// //       toast.error(
// //         error.response?.data?.message || "Failed to assign service scope"
// //       );
// //     } finally {
// //       setAssigningServiceScope(false);
// //     }
// //   };

// //   const openAssignModal = (workRequest) => {
// //     setSelectedWorkRequest(workRequest);
// //     setShowAssignModal(true);
// //   };

// //   const handleCreateWorkOrder = (workRequest) => {
// //     const priority = workRequest.priority;
// //     let orderType;
// //     if (priority.startsWith("CM_")) {
// //       orderType = "cm";
// //     } else if (priority.startsWith("RM_")) {
// //       orderType = "rm";
// //     } else if (priority === "PM_P4") {
// //       orderType = "pm";
// //     }
// //     navigate(
// //       `/work-orders?type=${orderType}&workRequestId=${workRequest.workRequestId}`
// //     );
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusConfig = {
// //       PENDING: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "Pending",
// //       },
// //       APPROVED: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "Approved",
// //       },
// //       REJECTED: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "Rejected",
// //       },
// //     };
// //     const config = statusConfig[status] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: status,
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const getPriorityBadge = (priority) => {
// //     const priorityConfig = {
// //       RM_P1: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "RM P1",
// //       },
// //       RM_P2: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "RM P2",
// //       },
// //       RM_P3: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "RM P3",
// //       },
// //       CM_P1: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "CM P1",
// //       },
// //       CM_P2: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "CM P2",
// //       },
// //       CM_P3: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "CM P3",
// //       },
// //       PM_P4: {
// //         bg: "bg-blue-50",
// //         text: "text-blue-700",
// //         border: "border-blue-200",
// //         label: "PM P4",
// //       },
// //     };
// //     const config = priorityConfig[priority] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: priority,
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const getWorkOrderStatusBadge = (workOrderStatus) => {
// //     const statusConfig = {
// //       ASSIGNED: {
// //         bg: "bg-blue-50",
// //         text: "text-blue-700",
// //         border: "border-blue-200",
// //         label: "Assigned",
// //       },
// //       IN_PROGRESS: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "In Progress",
// //       },
// //       COMPLETED: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "Completed",
// //       },
// //       CANCELLED: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "Cancelled",
// //       },
// //     };
// //     const config = statusConfig[workOrderStatus] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: workOrderStatus || "No Work Order",
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const filteredWorkRequests = workRequests.filter(
// //     (request) =>
// //       request.workRequestId.toString().includes(searchTerm) ||
// //       request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       (request.reasonComment &&
// //         request.reasonComment
// //           .toLowerCase()
// //           .includes(searchTerm.toLowerCase())) ||
// //       request.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       (request.workOrderStatus &&
// //         request.workOrderStatus
// //           .toLowerCase()
// //           .includes(searchTerm.toLowerCase()))
// //   );

// //   const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
// //     (request) =>
// //       request.priority === "PM_P4" &&
// //       (!request.serviceScopeId || request.serviceScopeId === null)
// //   );

// //   return (
// //     <div className="min-h-screen">
// //       <div className="max-w-[1600px] mx-auto p-6">
// //         {/* Header */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
// //           <div className="flex justify-between items-start">
// //             <div className="flex items-start space-x-4">
// //               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
// //                 <FileText className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
// //                   Work Request Management
// //                 </h1>
// //                 <p className="text-slate-600 text-sm">
// //                   View and manage all work requests in the system
// //                 </p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={onBack}
// //               className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //             >
// //               <ArrowLeft className="w-4 h-4 mr-2" />
// //               Back
// //             </button>
// //           </div>
// //         </div>

// //         {/* Filters */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
// //           <div className="flex flex-col sm:flex-row gap-4">
// //             <div className="relative flex-1">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
// //               <input
// //                 type="text"
// //                 placeholder="Search by ID, asset name, comment, priority, status, or work order status..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
// //               />
// //             </div>
// //             <button
// //               onClick={handleRefresh}
// //               disabled={isRefreshing}
// //               className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
// //             >
// //               <RefreshCw
// //                 className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
// //               />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Alert for PM Work Requests */}
// //         {pmWorkRequestsWithoutServiceScope.length > 0 && (
// //           <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
// //             <div className="flex items-center">
// //               <AlertCircle className="h-5 w-5 text-amber-400 mr-3" />
// //               <div>
// //                 <p className="text-sm text-amber-700 font-medium">
// //                   {pmWorkRequestsWithoutServiceScope.length} PM work request(s)
// //                   need service scope assignment
// //                 </p>
// //                 <p className="text-sm text-amber-600 mt-1">
// //                   Click the "Assign Service Scope" button for PM work requests
// //                   to assign asset-defined services of scope.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Table */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-slate-200">
// //               <thead className="bg-slate-50">
// //                 <tr>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Work Request ID
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Asset Name
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Service Scope
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Reason/Comment
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Priority
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Status
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Work Order Status
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Created At
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Actions
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Create Work Order
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-slate-100">
// //                 {loading ? (
// //                   <tr>
// //                     <td colSpan="10" className="px-4 py-12 text-center">
// //                       <div className="flex justify-center items-center">
// //                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
// //                         <span className="ml-3 text-sm font-medium text-slate-600">
// //                           Loading work requests...
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : filteredWorkRequests.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="10" className="px-4 py-12 text-center">
// //                       <div className="text-slate-500">
// //                         <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
// //                         <p className="text-sm font-medium">
// //                           No work requests found
// //                         </p>
// //                         <p className="text-xs text-slate-400 mt-1">
// //                           {searchTerm
// //                             ? "Try adjusting your search criteria"
// //                             : "No work requests have been created yet"}
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   filteredWorkRequests.map((request) => (
// //                     <tr
// //                       key={request.workRequestId}
// //                       className="hover:bg-slate-50 transition-colors"
// //                     >
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-semibold text-slate-900">
// //                           #{request.workRequestId}
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-sm font-medium text-slate-900">
// //                           {request.assetName}
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-slate-600">
// //                           {request.serviceScopeName || (
// //                             <span className="text-slate-400 italic">
// //                               Not assigned
// //                             </span>
// //                           )}
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4">
// //                         <div className="text-sm text-slate-600 max-w-xs truncate">
// //                           {request.reasonComment || "-"}
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {getPriorityBadge(request.priority)}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {getStatusBadge(request.status)}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {getWorkOrderStatusBadge(request.workOrderStatus)}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         <div className="text-sm text-slate-600 flex items-center">
// //                           <Calendar className="w-4 h-4 mr-1 text-slate-400" />
// //                           {request.createdAt
// //                             ? new Date(request.createdAt).toLocaleDateString()
// //                             : "-"}
// //                         </div>
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {request.priority === "PM_P4" &&
// //                           !request.serviceScopeId && (
// //                             <button
// //                               onClick={() => openAssignModal(request)}
// //                               className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
// //                             >
// //                               <Settings className="w-3 h-3 mr-1" />
// //                               Assign Service Scope
// //                             </button>
// //                           )}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {request.status === "APPROVED" &&
// //                           request.workOrderStatus !== "ASSIGNED" &&
// //                           request.workOrderStatus !== "IN_PROGRESS" &&
// //                           request.workOrderStatus !== "COMPLETED" && (
// //                             <button
// //                               onClick={() => handleCreateWorkOrder(request)}
// //                               className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
// //                             >
// //                               <FileText className="w-3 h-3 mr-1" />
// //                               Create Work Order
// //                             </button>
// //                           )}
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //           {!loading && filteredWorkRequests.length > 0 && (
// //             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
// //               <div className="text-xs text-slate-600">
// //                 Showing{" "}
// //                 <span className="font-medium">
// //                   {filteredWorkRequests.length}
// //                 </span>{" "}
// //                 of <span className="font-medium">{workRequests.length}</span>{" "}
// //                 work requests
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Assign Service Scope Modal */}
// //         {showAssignModal && selectedWorkRequest && (
// //           <AssignServiceScopeModal
// //             workRequest={selectedWorkRequest}
// //             onClose={() => {
// //               setShowAssignModal(false);
// //               setSelectedWorkRequest(null);
// //             }}
// //             onAssign={handleAssignServiceScope}
// //             isAssigning={assigningServiceScope}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const AssignServiceScopeModal = ({
// //   workRequest,
// //   onClose,
// //   onAssign,
// //   isAssigning,
// // }) => {
// //   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
// //   const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadAssetServiceScopes();
// //   }, []);

// //   const loadAssetServiceScopes = async () => {
// //     setLoading(true);
// //     try {
// //       const assetResponse = await assetService.getAssetById(
// //         workRequest.assetId
// //       );
// //       const asset = assetResponse.data;
// //       const allServiceScopes = [];
// //       if (asset.subServices && asset.subServices.length > 0) {
// //         asset.subServices.forEach((subService) => {
// //           if (subService.serviceScopeIds && subService.serviceScopeNames) {
// //             subService.serviceScopeIds.forEach((scopeId, index) => {
// //               allServiceScopes.push({
// //                 scopeId: scopeId,
// //                 scopeName: subService.serviceScopeNames[index],
// //                 subServiceName: subService.subServiceName,
// //               });
// //             });
// //           }
// //         });
// //       }
// //       setAssetServiceScopes(allServiceScopes);
// //     } catch (error) {
// //       console.error("Error loading asset service scopes:", error);
// //       toast.error("Failed to load asset service scopes");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!selectedServiceScopeId) {
// //       toast.error("Please select a service scope");
// //       return;
// //     }
// //     onAssign(workRequest.workRequestId, selectedServiceScopeId);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
// //         <div className="flex justify-between items-center p-6 border-b border-slate-200">
// //           <h3 className="text-lg font-semibold text-slate-900">
// //             Assign Service Scope
// //           </h3>
// //           <button
// //             onClick={onClose}
// //             className="text-slate-400 hover:text-slate-600 transition-colors"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>
// //         <div className="p-6">
// //           <div className="mb-4 p-4 bg-slate-50 rounded-lg">
// //             <p className="text-sm text-slate-600">
// //               <strong>Work Request:</strong> #{workRequest.workRequestId}
// //             </p>
// //             <p className="text-sm text-slate-600">
// //               <strong>Asset:</strong> {workRequest.assetName}
// //             </p>
// //           </div>
// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-6">
// //               <label className="block text-sm font-medium text-slate-700 mb-2">
// //                 Asset Defined Services of Scope{" "}
// //                 <span className="text-red-500">*</span>
// //               </label>
// //               {loading ? (
// //                 <div className="flex justify-center items-center py-8">
// //                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
// //                   <span className="ml-3 text-sm text-slate-600">
// //                     Loading service scopes...
// //                   </span>
// //                 </div>
// //               ) : assetServiceScopes.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
// //                   <p className="text-sm text-slate-600">
// //                     No service scopes available for this asset
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <select
// //                   value={selectedServiceScopeId}
// //                   onChange={(e) => setSelectedServiceScopeId(e.target.value)}
// //                   className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
// //                   required
// //                 >
// //                   <option value="">Select Service Scope</option>
// //                   {assetServiceScopes.map((scope) => (
// //                     <option key={scope.scopeId} value={scope.scopeId}>
// //                       {scope.scopeName} ({scope.subServiceName})
// //                     </option>
// //                   ))}
// //                 </select>
// //               )}
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 disabled={
// //                   isAssigning || loading || assetServiceScopes.length === 0
// //                 }
// //                 className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //               >
// //                 {isAssigning ? (
// //                   <>
// //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                     Assigning...
// //                   </>
// //                 ) : (
// //                   "Assign"
// //                 )}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WorkRequestTable;

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   ArrowLeft,
// //   FileText,
// //   RefreshCw,
// //   Search,
// //   Calendar,
// //   AlertCircle,
// //   Settings,
// //   Filter,
// //   X,
// //   ChevronLeft,
// //   ChevronRight,
// // } from "lucide-react";
// // import { workRequestService } from "../../services/WorkRequestService";
// // import { toast } from "react-toastify";
// // import { assetService } from "../../services/assetService";

// // const WorkRequestTable = ({ onBack }) => {
// //   const [workRequests, setWorkRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
// //   const [assigningServiceScope, setAssigningServiceScope] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [pageSize, setPageSize] = useState(10);
// //   const [totalElements, setTotalElements] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [filters, setFilters] = useState({
// //     workRequestId: "",
// //     assetId: "",
// //     serviceScopeId: "",
// //     status: "",
// //     workRequestType: "",
// //     startDate: "",
// //     endDate: "",
// //   });
// //   const [activeFilters, setActiveFilters] = useState({});
// //   const [showColumnChooser, setShowColumnChooser] = useState(false);
// //   const [visibleColumns, setVisibleColumns] = useState({
// //     workRequestId: true,
// //     assetName: true,
// //     serviceScope: true,
// //     reasonComment: true,
// //     priority: true,
// //     status: true,
// //     workOrderStatus: true,
// //     createdAt: true,
// //   });
// //   const navigate = useNavigate();

// //   const columnDefinitions = [
// //     { key: "workRequestId", label: "Work Request ID", required: true },
// //     { key: "assetName", label: "Asset Name", required: true },
// //     { key: "serviceScope", label: "Service Scope", required: false },
// //     { key: "reasonComment", label: "Reason/Comment", required: false },
// //     { key: "priority", label: "Priority", required: true },
// //     { key: "status", label: "Status", required: true },
// //     { key: "workOrderStatus", label: "Work Order Status", required: false },
// //     { key: "createdAt", label: "Created At", required: false },
// //   ];

// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => ({ ...prev, [key]: value }));
// //   };

// //   const applyFilters = () => {
// //     const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
// //       if (value && value.trim() !== "") {
// //         if (key === "startDate") {
// //           acc[key] = new Date(value).toISOString();
// //         } else if (key === "endDate") {
// //           const endDate = new Date(value);
// //           endDate.setHours(23, 59, 59, 999);
// //           acc[key] = endDate.toISOString();
// //         } else {
// //           acc[key] = value;
// //         }
// //       }
// //       return acc;
// //     }, {});
// //     setActiveFilters(cleanFilters);
// //     setCurrentPage(0);
// //     setShowFilters(false);
// //   };

// //   const clearFilters = () => {
// //     setFilters({
// //       workRequestId: "",
// //       assetId: "",
// //       serviceScopeId: "",
// //       status: "",
// //       workRequestType: "",
// //       startDate: "",
// //       endDate: "",
// //     });
// //     setActiveFilters({});
// //     setCurrentPage(0);
// //     setShowFilters(false);
// //   };

// //   const toggleColumnVisibility = (columnKey) => {
// //     if (columnDefinitions.find((col) => col.key === columnKey)?.required)
// //       return;
// //     setVisibleColumns((prev) => ({
// //       ...prev,
// //       [columnKey]: !prev[columnKey],
// //     }));
// //   };

// //   const handlePageChange = (newPage) => {
// //     setCurrentPage(newPage);
// //   };

// //   const handlePageSizeChange = (newSize) => {
// //     setPageSize(newSize);
// //     setCurrentPage(0);
// //   };

// //   useEffect(() => {
// //     loadWorkRequests();
// //   }, [currentPage, pageSize, activeFilters]);

// //   const loadWorkRequests = async () => {
// //     setLoading(true);
// //     try {
// //       let response;
// //       if (Object.keys(activeFilters).length > 0) {
// //         response = await workRequestService.getFilteredWorkRequests(
// //           activeFilters,
// //           currentPage,
// //           pageSize
// //         );
// //       } else {
// //         response = await workRequestService.getAllWorkRequests(
// //           currentPage,
// //           pageSize
// //         );
// //       }
// //       setWorkRequests(response.data.content || []);
// //       setTotalElements(response.data.totalElements || 0);
// //       setTotalPages(response.data.totalPages || 0);
// //     } catch (error) {
// //       console.error("Error loading work requests:", error);
// //       toast.error("Failed to load work requests");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await loadWorkRequests();
// //       toast.success("Work requests refreshed successfully");
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 500);
// //     }
// //   };

// //   const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
// //     setAssigningServiceScope(true);
// //     try {
// //       await workRequestService.assignServiceScopeToPmWorkRequest(
// //         workRequestId,
// //         serviceScopeId
// //       );
// //       toast.success("Service scope assigned successfully");
// //       setShowAssignModal(false);
// //       setSelectedWorkRequest(null);
// //       await loadWorkRequests();
// //     } catch (error) {
// //       console.error("Error assigning service scope:", error);
// //       toast.error(
// //         error.response?.data?.message || "Failed to assign service scope"
// //       );
// //     } finally {
// //       setAssigningServiceScope(false);
// //     }
// //   };

// //   const openAssignModal = (workRequest) => {
// //     setSelectedWorkRequest(workRequest);
// //     setShowAssignModal(true);
// //   };

// //   const handleCreateWorkOrder = (workRequest) => {
// //     const priority = workRequest.priority;
// //     let orderType;
// //     if (priority.startsWith("CM_")) {
// //       orderType = "cm";
// //     } else if (priority.startsWith("RM_")) {
// //       orderType = "rm";
// //     } else if (priority === "PM_P4") {
// //       orderType = "pm";
// //     }
// //     navigate(
// //       `/work-orders?type=${orderType}&workRequestId=${workRequest.workRequestId}`
// //     );
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusConfig = {
// //       PENDING: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "Pending",
// //       },
// //       APPROVED: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "Approved",
// //       },
// //       REJECTED: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "Rejected",
// //       },
// //     };
// //     const config = statusConfig[status] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: status || "N/A",
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const getPriorityBadge = (priority) => {
// //     const priorityConfig = {
// //       RM_P1: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "RM P1",
// //       },
// //       RM_P2: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "RM P2",
// //       },
// //       RM_P3: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "RM P3",
// //       },
// //       CM_P1: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "CM P1",
// //       },
// //       CM_P2: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "CM P2",
// //       },
// //       CM_P3: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "CM P3",
// //       },
// //       PM_P4: {
// //         bg: "bg-blue-50",
// //         text: "text-blue-700",
// //         border: "border-blue-200",
// //         label: "PM P4",
// //       },
// //     };
// //     const config = priorityConfig[priority] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: priority || "N/A",
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const getWorkOrderStatusBadge = (workOrderStatus) => {
// //     const statusConfig = {
// //       ASSIGNED: {
// //         bg: "bg-blue-50",
// //         text: "text-blue-700",
// //         border: "border-blue-200",
// //         label: "Assigned",
// //       },
// //       IN_PROGRESS: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "In Progress",
// //       },
// //       COMPLETED: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "Completed",
// //       },
// //       CANCELLED: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "Cancelled",
// //       },
// //     };
// //     const config = statusConfig[workOrderStatus] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: workOrderStatus || "No Work Order",
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const filteredWorkRequests = workRequests.filter(
// //     (request) =>
// //       request.workRequestId.toString().includes(searchTerm) ||
// //       (request.assetName &&
// //         request.assetName.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (request.reasonComment &&
// //         request.reasonComment
// //           .toLowerCase()
// //           .includes(searchTerm.toLowerCase())) ||
// //       (request.priority &&
// //         request.priority.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (request.status &&
// //         request.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (request.workOrderStatus &&
// //         request.workOrderStatus
// //           .toLowerCase()
// //           .includes(searchTerm.toLowerCase()))
// //   );

// //   const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
// //     (request) =>
// //       request.priority === "PM_P4" &&
// //       (!request.serviceScopeId || request.serviceScopeId === null)
// //   );

// //   return (
// //     <div className="min-h-screen">
// //       <div className="max-w-[1600px] mx-auto p-6">
// //         {/* Header */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
// //           <div className="flex justify-between items-start">
// //             <div className="flex items-start space-x-4">
// //               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
// //                 <FileText className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
// //                   Work Request Management
// //                 </h1>
// //                 <p className="text-slate-600 text-sm">
// //                   View and manage all work requests in the system
// //                 </p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={onBack}
// //               className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //             >
// //               <ArrowLeft className="w-4 h-4 mr-2" />
// //               Back
// //             </button>
// //           </div>
// //         </div>

// //         {/* Filters and Column Chooser */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
// //           <div className="flex flex-col gap-4">
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <div className="relative flex-1">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search by ID, asset name, comment, priority, status, or work order status..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
// //                 />
// //               </div>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => setShowFilters(!showFilters)}
// //                   className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
// //                     Object.keys(activeFilters).length > 0
// //                       ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
// //                       : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
// //                   }`}
// //                 >
// //                   <Filter className="w-4 h-4 mr-2 inline" />
// //                   Filters{" "}
// //                   {Object.keys(activeFilters).length > 0 &&
// //                     `(${Object.keys(activeFilters).length})`}
// //                 </button>
// //                 <button
// //                   onClick={() => setShowColumnChooser(!showColumnChooser)}
// //                   className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //                 >
// //                   <Settings className="w-4 h-4 mr-2 inline" />
// //                   Columns
// //                 </button>
// //                 <button
// //                   onClick={handleRefresh}
// //                   disabled={isRefreshing}
// //                   className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
// //                 >
// //                   <RefreshCw
// //                     className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
// //                   />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Filter Panel */}
// //             {showFilters && (
// //               <div className="border-t border-slate-200 pt-4">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Work Request ID
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={filters.workRequestId}
// //                       onChange={(e) =>
// //                         handleFilterChange("workRequestId", e.target.value)
// //                       }
// //                       placeholder="Enter Work Request ID"
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Asset ID
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={filters.assetId}
// //                       onChange={(e) =>
// //                         handleFilterChange("assetId", e.target.value)
// //                       }
// //                       placeholder="Enter Asset ID"
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Service Scope ID
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={filters.serviceScopeId}
// //                       onChange={(e) =>
// //                         handleFilterChange("serviceScopeId", e.target.value)
// //                       }
// //                       placeholder="Enter Service Scope ID"
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Status
// //                     </label>
// //                     <select
// //                       value={filters.status}
// //                       onChange={(e) =>
// //                         handleFilterChange("status", e.target.value)
// //                       }
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     >
// //                       <option value="">All Statuses</option>
// //                       <option value="PENDING">Pending</option>
// //                       <option value="APPROVED">Approved</option>
// //                       <option value="REJECTED">Rejected</option>
// //                     </select>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Work Request Type
// //                     </label>
// //                     <select
// //                       value={filters.workRequestType}
// //                       onChange={(e) =>
// //                         handleFilterChange("workRequestType", e.target.value)
// //                       }
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     >
// //                       <option value="">All Types</option>
// //                       <option value="RM">RM - Reactive Maintenance</option>
// //                       <option value="CM">CM - Corrective Maintenance</option>
// //                       <option value="PM">PM - Preventive Maintenance</option>
// //                     </select>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Start Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       value={filters.startDate}
// //                       onChange={(e) =>
// //                         handleFilterChange("startDate", e.target.value)
// //                       }
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       End Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       value={filters.endDate}
// //                       onChange={(e) =>
// //                         handleFilterChange("endDate", e.target.value)
// //                       }
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="flex gap-3 mt-4">
// //                   <button
// //                     onClick={applyFilters}
// //                     className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //                   >
// //                     Apply Filters
// //                   </button>
// //                   <button
// //                     onClick={clearFilters}
// //                     className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //                   >
// //                     Clear All
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Column Chooser */}
// //             {showColumnChooser && (
// //               <div className="border-t border-slate-200 pt-4">
// //                 <h3 className="text-sm font-medium text-slate-700 mb-3">
// //                   Choose Columns to Display
// //                 </h3>
// //                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                   {columnDefinitions.map((column) => (
// //                     <label
// //                       key={column.key}
// //                       className="flex items-center space-x-2"
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={visibleColumns[column.key]}
// //                         onChange={() => toggleColumnVisibility(column.key)}
// //                         disabled={column.required}
// //                         className="rounded border-slate-300 text-slate-600 focus:ring-slate-500 disabled:opacity-50"
// //                       />
// //                       <span
// //                         className={`text-sm ${
// //                           column.required ? "text-slate-500" : "text-slate-700"
// //                         }`}
// //                       >
// //                         {column.label}
// //                         {column.required && (
// //                           <span className="text-xs ml-1">(Required)</span>
// //                         )}
// //                       </span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Alert for PM Work Requests */}
// //         {pmWorkRequestsWithoutServiceScope.length > 0 && (
// //           <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
// //             <div className="flex items-center">
// //               <AlertCircle className="h-5 w-5 text-amber-400 mr-3" />
// //               <div>
// //                 <p className="text-sm text-amber-700 font-medium">
// //                   {pmWorkRequestsWithoutServiceScope.length} PM work request(s)
// //                   need service scope assignment
// //                 </p>
// //                 <p className="text-sm text-amber-600 mt-1">
// //                   Click the "Assign Service Scope" button for PM work requests
// //                   to assign asset-defined services of scope.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Table */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-slate-200">
// //               <thead className="bg-slate-50">
// //                 <tr>
// //                   {visibleColumns.workRequestId && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Work Request ID
// //                     </th>
// //                   )}
// //                   {visibleColumns.assetName && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Asset Name
// //                     </th>
// //                   )}
// //                   {visibleColumns.serviceScope && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Service Scope
// //                     </th>
// //                   )}
// //                   {visibleColumns.reasonComment && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Reason/Comment
// //                     </th>
// //                   )}
// //                   {visibleColumns.priority && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Priority
// //                     </th>
// //                   )}
// //                   {visibleColumns.status && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Status
// //                     </th>
// //                   )}
// //                   {visibleColumns.workOrderStatus && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Work Order Status
// //                     </th>
// //                   )}
// //                   {visibleColumns.createdAt && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Created At
// //                     </th>
// //                   )}
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Actions
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Create Work Order
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-slate-100">
// //                 {loading ? (
// //                   <tr>
// //                     <td
// //                       colSpan={columnDefinitions.length + 2}
// //                       className="px-4 py-12 text-center"
// //                     >
// //                       <div className="flex justify-center items-center">
// //                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
// //                         <span className="ml-3 text-sm font-medium text-slate-600">
// //                           Loading work requests...
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : filteredWorkRequests.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan={columnDefinitions.length + 2}
// //                       className="px-4 py-12 text-center"
// //                     >
// //                       <div className="text-slate-500">
// //                         <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
// //                         <p className="text-sm font-medium">
// //                           No work requests found
// //                         </p>
// //                         <p className="text-xs text-slate-400 mt-1">
// //                           {searchTerm || Object.keys(activeFilters).length > 0
// //                             ? "Try adjusting your search criteria or filters"
// //                             : "No work requests have been created yet"}
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   filteredWorkRequests.map((request) => (
// //                     <tr
// //                       key={request.workRequestId}
// //                       className="hover:bg-slate-50 transition-colors"
// //                     >
// //                       {visibleColumns.workRequestId && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           <div className="text-sm font-semibold text-slate-900">
// //                             #{request.workRequestId}
// //                           </div>
// //                         </td>
// //                       )}
// //                       {visibleColumns.assetName && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           <div className="text-sm font-medium text-slate-900">
// //                             {request.assetName || "-"}
// //                           </div>
// //                         </td>
// //                       )}
// //                       {visibleColumns.serviceScope && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-slate-600">
// //                             {request.serviceScopeName || (
// //                               <span className="text-slate-400 italic">
// //                                 Not assigned
// //                               </span>
// //                             )}
// //                           </div>
// //                         </td>
// //                       )}
// //                       {visibleColumns.reasonComment && (
// //                         <td className="px-4 py-4 max-w-xs">
// //                           <div
// //                             className="text-sm text-slate-600 truncate"
// //                             title={request.reasonComment}
// //                           >
// //                             {request.reasonComment || "-"}
// //                           </div>
// //                         </td>
// //                       )}
// //                       {visibleColumns.priority && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {getPriorityBadge(request.priority)}
// //                         </td>
// //                       )}
// //                       {visibleColumns.status && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {getStatusBadge(request.status)}
// //                         </td>
// //                       )}
// //                       {visibleColumns.workOrderStatus && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {getWorkOrderStatusBadge(request.workOrderStatus)}
// //                         </td>
// //                       )}
// //                       {visibleColumns.createdAt && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-slate-600 flex items-center">
// //                             <Calendar className="w-4 h-4 mr-1 text-slate-400" />
// //                             {request.createdAt
// //                               ? new Date(request.createdAt).toLocaleDateString()
// //                               : "-"}
// //                           </div>
// //                         </td>
// //                       )}
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {request.priority === "PM_P4" &&
// //                           !request.serviceScopeId && (
// //                             <button
// //                               onClick={() => openAssignModal(request)}
// //                               className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
// //                             >
// //                               <Settings className="w-3 h-3 mr-1" />
// //                               Assign Service Scope
// //                             </button>
// //                           )}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {request.status === "APPROVED" &&
// //                           request.workOrderStatus !== "ASSIGNED" &&
// //                           request.workOrderStatus !== "IN_PROGRESS" &&
// //                           request.workOrderStatus !== "COMPLETED" && (
// //                             <button
// //                               onClick={() => handleCreateWorkOrder(request)}
// //                               className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
// //                             >
// //                               <FileText className="w-3 h-3 mr-1" />
// //                               Create Work Order
// //                             </button>
// //                           )}
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //           {!loading && filteredWorkRequests.length > 0 && (
// //             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-4">
// //                   <div className="text-xs text-slate-600">
// //                     Showing{" "}
// //                     <span className="font-medium">
// //                       {currentPage * pageSize + 1}
// //                     </span>{" "}
// //                     to{" "}
// //                     <span className="font-medium">
// //                       {Math.min((currentPage + 1) * pageSize, totalElements)}
// //                     </span>{" "}
// //                     of <span className="font-medium">{totalElements}</span> work
// //                     requests
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <label className="text-xs text-slate-600">Show:</label>
// //                     <select
// //                       value={pageSize}
// //                       onChange={(e) =>
// //                         handlePageSizeChange(Number(e.target.value))
// //                       }
// //                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     >
// //                       <option value={5}>5</option>
// //                       <option value={10}>10</option>
// //                       <option value={25}>25</option>
// //                       <option value={50}>50</option>
// //                       <option value={100}>100</option>
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => handlePageChange(currentPage - 1)}
// //                     disabled={currentPage === 0}
// //                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                   >
// //                     <ChevronLeft className="w-3 h-3" />
// //                     Previous
// //                   </button>
// //                   <div className="flex items-center gap-1">
// //                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                       let pageNum;
// //                       if (totalPages <= 5) {
// //                         pageNum = i;
// //                       } else if (currentPage < 3) {
// //                         pageNum = i;
// //                       } else if (currentPage > totalPages - 4) {
// //                         pageNum = totalPages - 5 + i;
// //                       } else {
// //                         pageNum = currentPage - 2 + i;
// //                       }
// //                       return (
// //                         <button
// //                           key={pageNum}
// //                           onClick={() => handlePageChange(pageNum)}
// //                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
// //                             currentPage === pageNum
// //                               ? "bg-slate-800 text-white"
// //                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
// //                           }`}
// //                         >
// //                           {pageNum + 1}
// //                         </button>
// //                       );
// //                     })}
// //                   </div>
// //                   <button
// //                     onClick={() => handlePageChange(currentPage + 1)}
// //                     disabled={currentPage >= totalPages - 1}
// //                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                   >
// //                     Next
// //                     <ChevronRight className="w-3 h-3" />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Assign Service Scope Modal */}
// //         {showAssignModal && selectedWorkRequest && (
// //           <AssignServiceScopeModal
// //             workRequest={selectedWorkRequest}
// //             onClose={() => {
// //               setShowAssignModal(false);
// //               setSelectedWorkRequest(null);
// //             }}
// //             onAssign={handleAssignServiceScope}
// //             isAssigning={assigningServiceScope}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const AssignServiceScopeModal = ({
// //   workRequest,
// //   onClose,
// //   onAssign,
// //   isAssigning,
// // }) => {
// //   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
// //   const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadAssetServiceScopes();
// //   }, []);

// //   const loadAssetServiceScopes = async () => {
// //     setLoading(true);
// //     try {
// //       const assetResponse = await assetService.getAssetById(
// //         workRequest.assetId
// //       );
// //       const asset = assetResponse.data;
// //       const allServiceScopes = [];
// //       if (asset.subServices && asset.subServices.length > 0) {
// //         asset.subServices.forEach((subService) => {
// //           if (subService.serviceScopeIds && subService.serviceScopeNames) {
// //             subService.serviceScopeIds.forEach((scopeId, index) => {
// //               allServiceScopes.push({
// //                 scopeId: scopeId,
// //                 scopeName: subService.serviceScopeNames[index],
// //                 subServiceName: subService.subServiceName,
// //               });
// //             });
// //           }
// //         });
// //       }
// //       setAssetServiceScopes(allServiceScopes);
// //     } catch (error) {
// //       console.error("Error loading asset service scopes:", error);
// //       toast.error("Failed to load asset service scopes");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!selectedServiceScopeId) {
// //       toast.error("Please select a service scope");
// //       return;
// //     }
// //     onAssign(workRequest.workRequestId, selectedServiceScopeId);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
// //         <div className="flex justify-between items-center p-6 border-b border-slate-200">
// //           <h3 className="text-lg font-semibold text-slate-900">
// //             Assign Service Scope
// //           </h3>
// //           <button
// //             onClick={onClose}
// //             className="text-slate-400 hover:text-slate-600 transition-colors"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>
// //         <div className="p-6">
// //           <div className="mb-4 p-4 bg-slate-50 rounded-lg">
// //             <p className="text-sm text-slate-600">
// //               <strong>Work Request:</strong> #{workRequest.workRequestId}
// //             </p>
// //             <p className="text-sm text-slate-600">
// //               <strong>Asset:</strong> {workRequest.assetName}
// //             </p>
// //           </div>
// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-6">
// //               <label className="block text-sm font-medium text-slate-700 mb-2">
// //                 Asset Defined Services of Scope{" "}
// //                 <span className="text-red-500">*</span>
// //               </label>
// //               {loading ? (
// //                 <div className="flex justify-center items-center py-8">
// //                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
// //                   <span className="ml-3 text-sm text-slate-600">
// //                     Loading service scopes...
// //                   </span>
// //                 </div>
// //               ) : assetServiceScopes.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
// //                   <p className="text-sm text-slate-600">
// //                     No service scopes available for this asset
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <select
// //                   value={selectedServiceScopeId}
// //                   onChange={(e) => setSelectedServiceScopeId(e.target.value)}
// //                   className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
// //                   required
// //                 >
// //                   <option value="">Select Service Scope</option>
// //                   {assetServiceScopes.map((scope) => (
// //                     <option key={scope.scopeId} value={scope.scopeId}>
// //                       {scope.scopeName} ({scope.subServiceName})
// //                     </option>
// //                   ))}
// //                 </select>
// //               )}
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 disabled={
// //                   isAssigning || loading || assetServiceScopes.length === 0
// //                 }
// //                 className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //               >
// //                 {isAssigning ? (
// //                   <>
// //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                     Assigning...
// //                   </>
// //                 ) : (
// //                   "Assign"
// //                 )}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WorkRequestTable;

// // "use client";

// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   ArrowLeft,
// //   FileText,
// //   RefreshCw,
// //   Search,
// //   Calendar,
// //   AlertCircle,
// //   Settings,
// //   Filter,
// //   X,
// //   ChevronLeft,
// //   ChevronRight,
// // } from "lucide-react";
// // import { workRequestService } from "../../services/WorkRequestService";
// // import { toast } from "react-toastify";
// // import { assetService } from "../../services/assetService";

// // const WorkRequestTable = ({ onBack }) => {
// //   const [workRequests, setWorkRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [showAssignModal, setShowAssignModal] = useState(false);
// //   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
// //   const [assigningServiceScope, setAssigningServiceScope] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [pageSize, setPageSize] = useState(10);
// //   const [totalElements, setTotalElements] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [filters, setFilters] = useState({
// //     workRequestId: "",
// //     assetId: "",
// //     serviceScopeId: "",
// //     status: "",
// //     workRequestType: "",
// //     startDate: "",
// //     endDate: "",
// //   });
// //   const [activeFilters, setActiveFilters] = useState({});
// //   const [showColumnChooser, setShowColumnChooser] = useState(false);
// //   const [visibleColumns, setVisibleColumns] = useState({
// //     workRequestId: true,
// //     assetName: true,
// //     serviceScope: true,
// //     reasonComment: true,
// //     priority: true,
// //     status: true,
// //     workOrderStatus: true,
// //     createdAt: true,
// //   });
// //   const navigate = useNavigate();

// //   const columnDefinitions = [
// //     { key: "workRequestId", label: "Work Request ID", required: true },
// //     { key: "assetName", label: "Asset Name", required: true },
// //     { key: "serviceScope", label: "Service Scope", required: false },
// //     { key: "reasonComment", label: "Reason/Comment", required: false },
// //     { key: "priority", label: "Priority", required: true },
// //     { key: "status", label: "Status", required: true },
// //     { key: "workOrderStatus", label: "Work Order Status", required: false },
// //     { key: "createdAt", label: "Created At", required: false },
// //   ];

// //   const handleFilterChange = (key, value) => {
// //     setFilters((prev) => ({ ...prev, [key]: value }));
// //   };

// //   const applyFilters = () => {
// //     const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
// //       if (value && value.trim() !== "") {
// //         if (key === "startDate") {
// //           acc[key] = new Date(value).toISOString();
// //         } else if (key === "endDate") {
// //           const endDate = new Date(value);
// //           endDate.setHours(23, 59, 59, 999);
// //           acc[key] = endDate.toISOString();
// //         } else {
// //           acc[key] = value;
// //         }
// //       }
// //       return acc;
// //     }, {});
// //     setActiveFilters(cleanFilters);
// //     setCurrentPage(0);
// //     setShowFilters(false);
// //   };

// //   const clearFilters = () => {
// //     setFilters({
// //       workRequestId: "",
// //       assetId: "",
// //       serviceScopeId: "",
// //       status: "",
// //       workRequestType: "",
// //       startDate: "",
// //       endDate: "",
// //     });
// //     setActiveFilters({});
// //     setCurrentPage(0);
// //     setShowFilters(false);
// //   };

// //   const toggleColumnVisibility = (columnKey) => {
// //     if (columnDefinitions.find((col) => col.key === columnKey)?.required)
// //       return;
// //     setVisibleColumns((prev) => ({
// //       ...prev,
// //       [columnKey]: !prev[columnKey],
// //     }));
// //   };

// //   const handlePageChange = (newPage) => {
// //     setCurrentPage(newPage);
// //   };

// //   const handlePageSizeChange = (newSize) => {
// //     setPageSize(newSize);
// //     setCurrentPage(0);
// //   };

// //   useEffect(() => {
// //     loadWorkRequests();
// //   }, [currentPage, pageSize, activeFilters]);

// //   const loadWorkRequests = async () => {
// //     setLoading(true);
// //     try {
// //       let response;
// //       if (Object.keys(activeFilters).length > 0) {
// //         response = await workRequestService.getFilteredWorkRequests(
// //           activeFilters,
// //           currentPage,
// //           pageSize
// //         );
// //       } else {
// //         response = await workRequestService.getAllWorkRequests(
// //           currentPage,
// //           pageSize
// //         );
// //       }
// //       setWorkRequests(response.data.content || []);
// //       setTotalElements(response.data.totalElements || 0);
// //       setTotalPages(response.data.totalPages || 0);
// //     } catch (error) {
// //       console.error("Error loading work requests:", error);
// //       toast.error("Failed to load work requests");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await loadWorkRequests();
// //       toast.success("Work requests refreshed successfully");
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 500);
// //     }
// //   };

// //   const handleAssignServiceScope = async (workRequestId, serviceScopeId) => {
// //     setAssigningServiceScope(true);
// //     try {
// //       await workRequestService.assignServiceScopeToPmWorkRequest(
// //         workRequestId,
// //         serviceScopeId
// //       );
// //       toast.success("Service scope assigned successfully");
// //       setShowAssignModal(false);
// //       setSelectedWorkRequest(null);
// //       await loadWorkRequests();
// //     } catch (error) {
// //       console.error("Error assigning service scope:", error);
// //       toast.error(
// //         error.response?.data?.message || "Failed to assign service scope"
// //       );
// //     } finally {
// //       setAssigningServiceScope(false);
// //     }
// //   };

// //   const openAssignModal = (workRequest) => {
// //     setSelectedWorkRequest(workRequest);
// //     setShowAssignModal(true);
// //   };

// //   const handleCreateWorkOrder = (workRequest) => {
// //     const priority = workRequest.priority;
// //     let orderType;
// //     if (priority.startsWith("CM_")) {
// //       orderType = "cm";
// //     } else if (priority.startsWith("RM_")) {
// //       orderType = "rm";
// //     } else if (priority === "PM_P4") {
// //       orderType = "pm";
// //     }
// //     navigate(
// //       `/work-orders?type=${orderType}&workRequestId=${workRequest.workRequestId}`
// //     );
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusConfig = {
// //       PENDING: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "Pending",
// //       },
// //       APPROVED: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "Approved",
// //       },
// //       REJECTED: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "Rejected",
// //       },
// //     };
// //     const config = statusConfig[status] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: status || "N/A",
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const getPriorityBadge = (priority) => {
// //     const priorityConfig = {
// //       RM_P1: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "RM P1",
// //       },
// //       RM_P2: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "RM P2",
// //       },
// //       RM_P3: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "RM P3",
// //       },
// //       CM_P1: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "CM P1",
// //       },
// //       CM_P2: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "CM P2",
// //       },
// //       CM_P3: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "CM P3",
// //       },
// //       PM_P4: {
// //         bg: "bg-blue-50",
// //         text: "text-blue-700",
// //         border: "border-blue-200",
// //         label: "PM P4",
// //       },
// //     };
// //     const config = priorityConfig[priority] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: priority || "N/A",
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const getWorkOrderStatusBadge = (workOrderStatus) => {
// //     const statusConfig = {
// //       ASSIGNED: {
// //         bg: "bg-blue-50",
// //         text: "text-blue-700",
// //         border: "border-blue-200",
// //         label: "Assigned",
// //       },
// //       IN_PROGRESS: {
// //         bg: "bg-amber-50",
// //         text: "text-amber-700",
// //         border: "border-amber-200",
// //         label: "In Progress",
// //       },
// //       COMPLETED: {
// //         bg: "bg-emerald-50",
// //         text: "text-emerald-700",
// //         border: "border-emerald-200",
// //         label: "Completed",
// //       },
// //       CANCELLED: {
// //         bg: "bg-red-50",
// //         text: "text-red-700",
// //         border: "border-red-200",
// //         label: "Cancelled",
// //       },
// //     };
// //     const config = statusConfig[workOrderStatus] || {
// //       bg: "bg-slate-50",
// //       text: "text-slate-700",
// //       border: "border-slate-200",
// //       label: workOrderStatus || "No Work Order",
// //     };
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   const filteredWorkRequests = workRequests.filter(
// //     (request) =>
// //       request.workRequestId.toString().includes(searchTerm) ||
// //       (request.assetName &&
// //         request.assetName.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (request.reasonComment &&
// //         request.reasonComment
// //           .toLowerCase()
// //           .includes(searchTerm.toLowerCase())) ||
// //       (request.priority &&
// //         request.priority.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (request.status &&
// //         request.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //       (request.workOrderStatus &&
// //         request.workOrderStatus
// //           .toLowerCase()
// //           .includes(searchTerm.toLowerCase()))
// //   );

// //   const pmWorkRequestsWithoutServiceScope = filteredWorkRequests.filter(
// //     (request) =>
// //       request.priority === "PM_P4" &&
// //       (!request.serviceScopeId || request.serviceScopeId === null)
// //   );

// //   return (
// //     <div className="min-h-screen">
// //       <div className="max-w-[1600px] mx-auto p-6">
// //         {/* Header */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
// //           <div className="flex justify-between items-start">
// //             <div className="flex items-start space-x-4">
// //               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
// //                 <FileText className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
// //                   Work Request Management
// //                 </h1>
// //                 <p className="text-slate-600 text-sm">
// //                   View and manage all work requests in the system
// //                 </p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={onBack}
// //               className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //             >
// //               <ArrowLeft className="w-4 h-4 mr-2" />
// //               Back
// //             </button>
// //           </div>
// //         </div>

// //         {/* Filters and Column Chooser */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
// //           <div className="flex flex-col gap-4">
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <div className="relative flex-1">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search by ID, asset name, comment, priority, status, or work order status..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
// //                 />
// //               </div>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => setShowFilters(!showFilters)}
// //                   className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
// //                     Object.keys(activeFilters).length > 0
// //                       ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
// //                       : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
// //                   }`}
// //                 >
// //                   <Filter className="w-4 h-4 mr-2 inline" />
// //                   Filters{" "}
// //                   {Object.keys(activeFilters).length > 0 &&
// //                     `(${Object.keys(activeFilters).length})`}
// //                 </button>
// //                 <button
// //                   onClick={() => setShowColumnChooser(!showColumnChooser)}
// //                   className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //                 >
// //                   <Settings className="w-4 h-4 mr-2 inline" />
// //                   Columns
// //                 </button>
// //                 <button
// //                   onClick={handleRefresh}
// //                   disabled={isRefreshing}
// //                   className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
// //                 >
// //                   <RefreshCw
// //                     className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
// //                   />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Filter Panel */}
// //             {showFilters && (
// //               <div className="border-t border-slate-200 pt-4">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Work Request ID
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={filters.workRequestId}
// //                       onChange={(e) =>
// //                         handleFilterChange("workRequestId", e.target.value)
// //                       }
// //                       placeholder="Enter Work Request ID"
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Asset ID
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={filters.assetId}
// //                       onChange={(e) =>
// //                         handleFilterChange("assetId", e.target.value)
// //                       }
// //                       placeholder="Enter Asset ID"
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Service Scope ID
// //                     </label>
// //                     <input
// //                       type="number"
// //                       value={filters.serviceScopeId}
// //                       onChange={(e) =>
// //                         handleFilterChange("serviceScopeId", e.target.value)
// //                       }
// //                       placeholder="Enter Service Scope ID"
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Status
// //                     </label>
// //                     <select
// //                       value={filters.status}
// //                       onChange={(e) =>
// //                         handleFilterChange("status", e.target.value)
// //                       }
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     >
// //                       <option value="">All Statuses</option>
// //                       <option value="PENDING">Pending</option>
// //                       <option value="APPROVED">Approved</option>
// //                       <option value="REJECTED">Rejected</option>
// //                     </select>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Work Request Type
// //                     </label>
// //                     <select
// //                       value={filters.workRequestType}
// //                       onChange={(e) =>
// //                         handleFilterChange("workRequestType", e.target.value)
// //                       }
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     >
// //                       <option value="">All Types</option>
// //                       <option value="RM">RM - Reactive Maintenance</option>
// //                       <option value="CM">CM - Corrective Maintenance</option>
// //                       <option value="PM">PM - Preventive Maintenance</option>
// //                     </select>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       Start Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       value={filters.startDate}
// //                       onChange={(e) =>
// //                         handleFilterChange("startDate", e.target.value)
// //                       }
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 mb-1">
// //                       End Date
// //                     </label>
// //                     <input
// //                       type="date"
// //                       value={filters.endDate}
// //                       onChange={(e) =>
// //                         handleFilterChange("endDate", e.target.value)
// //                       }
// //                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="flex gap-3 mt-4">
// //                   <button
// //                     onClick={applyFilters}
// //                     className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //                   >
// //                     Apply Filters
// //                   </button>
// //                   <button
// //                     onClick={clearFilters}
// //                     className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //                   >
// //                     Clear All
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Column Chooser */}
// //             {showColumnChooser && (
// //               <div className="border-t border-slate-200 pt-4">
// //                 <h3 className="text-sm font-medium text-slate-700 mb-3">
// //                   Choose Columns to Display
// //                 </h3>
// //                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                   {columnDefinitions.map((column) => (
// //                     <label
// //                       key={column.key}
// //                       className="flex items-center space-x-2"
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={visibleColumns[column.key]}
// //                         onChange={() => toggleColumnVisibility(column.key)}
// //                         disabled={column.required}
// //                         className="rounded border-slate-300 text-slate-600 focus:ring-slate-500 disabled:opacity-50"
// //                       />
// //                       <span
// //                         className={`text-sm ${
// //                           column.required ? "text-slate-500" : "text-slate-700"
// //                         }`}
// //                       >
// //                         {column.label}
// //                         {column.required && (
// //                           <span className="text-xs ml-1">(Required)</span>
// //                         )}
// //                       </span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Alert for PM Work Requests */}
// //         {pmWorkRequestsWithoutServiceScope.length > 0 && (
// //           <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
// //             <div className="flex items-center">
// //               <AlertCircle className="h-5 w-5 text-amber-400 mr-3" />
// //               <div>
// //                 <p className="text-sm text-amber-700 font-medium">
// //                   {pmWorkRequestsWithoutServiceScope.length} PM work request(s)
// //                   need service scope assignment
// //                 </p>
// //                 <p className="text-sm text-amber-600 mt-1">
// //                   Click the "Assign Service Scope" button for PM work requests
// //                   to assign asset-defined services of scope.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Table */}
// //         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="min-w-full divide-y divide-slate-200">
// //               <thead className="bg-slate-50">
// //                 <tr>
// //                   {visibleColumns.workRequestId && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Work Request ID
// //                     </th>
// //                   )}
// //                   {visibleColumns.assetName && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Asset Name
// //                     </th>
// //                   )}
// //                   {visibleColumns.serviceScope && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Service Scope
// //                     </th>
// //                   )}
// //                   {visibleColumns.reasonComment && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Reason/Comment
// //                     </th>
// //                   )}
// //                   {visibleColumns.priority && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Priority
// //                     </th>
// //                   )}
// //                   {visibleColumns.status && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Status
// //                     </th>
// //                   )}
// //                   {visibleColumns.workOrderStatus && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Work Order Status
// //                     </th>
// //                   )}
// //                   {visibleColumns.createdAt && (
// //                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                       Created At
// //                     </th>
// //                   )}
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Actions
// //                   </th>
// //                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                     Create Work Order
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-slate-100">
// //                 {loading ? (
// //                   <tr>
// //                     <td
// //                       colSpan={columnDefinitions.length + 2}
// //                       className="px-4 py-12 text-center"
// //                     >
// //                       <div className="flex justify-center items-center">
// //                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
// //                         <span className="ml-3 text-sm font-medium text-slate-600">
// //                           Loading work requests...
// //                         </span>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : filteredWorkRequests.length === 0 ? (
// //                   <tr>
// //                     <td
// //                       colSpan={columnDefinitions.length + 2}
// //                       className="px-4 py-12 text-center"
// //                     >
// //                       <div className="text-slate-500">
// //                         <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
// //                         <p className="text-sm font-medium">
// //                           No work requests found
// //                         </p>
// //                         <p className="text-xs text-slate-400 mt-1">
// //                           {searchTerm || Object.keys(activeFilters).length > 0
// //                             ? "Try adjusting your search criteria or filters"
// //                             : "No work requests have been created yet"}
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   filteredWorkRequests.map((request) => (
// //                     <tr
// //                       key={request.workRequestId}
// //                       className="hover:bg-slate-50 transition-colors"
// //                     >
// //                       {visibleColumns.workRequestId && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           <div className="text-sm font-semibold text-slate-900">
// //                             WR-{request.workRequestId}
// //                           </div>
// //                         </td>
// //                       )}
// //                       {visibleColumns.assetName && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           <div className="text-sm font-medium text-slate-900">
// //                             {request.assetName || "-"}
// //                           </div>
// //                         </td>
// //                       )}
// //                       {visibleColumns.serviceScope && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-slate-600">
// //                             {request.serviceScopeName || (
// //                               <span className="text-slate-400 italic">
// //                                 Not assigned
// //                               </span>
// //                             )}
// //                           </div>
// //                         </td>
// //                       )}
// //                       {visibleColumns.reasonComment && (
// //                         <td className="px-4 py-4 max-w-xs">
// //                           <div
// //                             className="text-sm text-slate-600 truncate"
// //                             title={request.reasonComment}
// //                           >
// //                             {request.reasonComment || "-"}
// //                           </div>
// //                         </td>
// //                       )}
// //                       {visibleColumns.priority && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {getPriorityBadge(request.priority)}
// //                         </td>
// //                       )}
// //                       {visibleColumns.status && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {getStatusBadge(request.status)}
// //                         </td>
// //                       )}
// //                       {visibleColumns.workOrderStatus && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {getWorkOrderStatusBadge(request.workOrderStatus)}
// //                         </td>
// //                       )}
// //                       {visibleColumns.createdAt && (
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           <div className="text-sm text-slate-600 flex items-center">
// //                             <Calendar className="w-4 h-4 mr-1 text-slate-400" />
// //                             {request.createdAt
// //                               ? new Date(request.createdAt).toLocaleDateString()
// //                               : "-"}
// //                           </div>
// //                         </td>
// //                       )}
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {request.priority === "PM_P4" &&
// //                           !request.serviceScopeId && (
// //                             <button
// //                               onClick={() => openAssignModal(request)}
// //                               className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
// //                             >
// //                               <Settings className="w-3 h-3 mr-1" />
// //                               Assign Service Scope
// //                             </button>
// //                           )}
// //                       </td>
// //                       <td className="px-4 py-4 whitespace-nowrap">
// //                         {request.status === "APPROVED" &&
// //                           request.workOrderStatus !== "ASSIGNED" &&
// //                           request.workOrderStatus !== "IN_PROGRESS" &&
// //                           request.workOrderStatus !== "COMPLETED" && (
// //                             <button
// //                               onClick={() => handleCreateWorkOrder(request)}
// //                               className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
// //                             >
// //                               <FileText className="w-3 h-3 mr-1" />
// //                               Create Work Order
// //                             </button>
// //                           )}
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
// //           {!loading && filteredWorkRequests.length > 0 && (
// //             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-4">
// //                   <div className="text-xs text-slate-600">
// //                     Showing{" "}
// //                     <span className="font-medium">
// //                       {currentPage * pageSize + 1}
// //                     </span>{" "}
// //                     to{" "}
// //                     <span className="font-medium">
// //                       {Math.min((currentPage + 1) * pageSize, totalElements)}
// //                     </span>{" "}
// //                     of <span className="font-medium">{totalElements}</span> work
// //                     requests
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <label className="text-xs text-slate-600">Show:</label>
// //                     <select
// //                       value={pageSize}
// //                       onChange={(e) =>
// //                         handlePageSizeChange(Number(e.target.value))
// //                       }
// //                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
// //                     >
// //                       <option value={5}>5</option>
// //                       <option value={10}>10</option>
// //                       <option value={25}>25</option>
// //                       <option value={50}>50</option>
// //                       <option value={100}>100</option>
// //                     </select>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => handlePageChange(currentPage - 1)}
// //                     disabled={currentPage === 0}
// //                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                   >
// //                     <ChevronLeft className="w-3 h-3" />
// //                     Previous
// //                   </button>
// //                   <div className="flex items-center gap-1">
// //                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
// //                       let pageNum;
// //                       if (totalPages <= 5) {
// //                         pageNum = i;
// //                       } else if (currentPage < 3) {
// //                         pageNum = i;
// //                       } else if (currentPage > totalPages - 4) {
// //                         pageNum = totalPages - 5 + i;
// //                       } else {
// //                         pageNum = currentPage - 2 + i;
// //                       }
// //                       return (
// //                         <button
// //                           key={pageNum}
// //                           onClick={() => handlePageChange(pageNum)}
// //                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
// //                             currentPage === pageNum
// //                               ? "bg-slate-800 text-white"
// //                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
// //                           }`}
// //                         >
// //                           {pageNum + 1}
// //                         </button>
// //                       );
// //                     })}
// //                   </div>
// //                   <button
// //                     onClick={() => handlePageChange(currentPage + 1)}
// //                     disabled={currentPage >= totalPages - 1}
// //                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //                   >
// //                     Next
// //                     <ChevronRight className="w-3 h-3" />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Assign Service Scope Modal */}
// //         {showAssignModal && selectedWorkRequest && (
// //           <AssignServiceScopeModal
// //             workRequest={selectedWorkRequest}
// //             onClose={() => {
// //               setShowAssignModal(false);
// //               setSelectedWorkRequest(null);
// //             }}
// //             onAssign={handleAssignServiceScope}
// //             isAssigning={assigningServiceScope}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const AssignServiceScopeModal = ({
// //   workRequest,
// //   onClose,
// //   onAssign,
// //   isAssigning,
// // }) => {
// //   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
// //   const [selectedServiceScopeId, setSelectedServiceScopeId] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadAssetServiceScopes();
// //   }, []);

// //   const loadAssetServiceScopes = async () => {
// //     setLoading(true);
// //     try {
// //       const assetResponse = await assetService.getAssetById(
// //         workRequest.assetId
// //       );
// //       const asset = assetResponse.data;
// //       const allServiceScopes = [];
// //       if (asset.subServices && asset.subServices.length > 0) {
// //         asset.subServices.forEach((subService) => {
// //           if (subService.serviceScopeIds && subService.serviceScopeNames) {
// //             subService.serviceScopeIds.forEach((scopeId, index) => {
// //               allServiceScopes.push({
// //                 scopeId: scopeId,
// //                 scopeName: subService.serviceScopeNames[index],
// //                 subServiceName: subService.subServiceName,
// //               });
// //             });
// //           }
// //         });
// //       }
// //       setAssetServiceScopes(allServiceScopes);
// //     } catch (error) {
// //       console.error("Error loading asset service scopes:", error);
// //       toast.error("Failed to load asset service scopes");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!selectedServiceScopeId) {
// //       toast.error("Please select a service scope");
// //       return;
// //     }
// //     onAssign(workRequest.workRequestId, selectedServiceScopeId);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
// //         <div className="flex justify-between items-center p-6 border-b border-slate-200">
// //           <h3 className="text-lg font-semibold text-slate-900">
// //             Assign Service Scope
// //           </h3>
// //           <button
// //             onClick={onClose}
// //             className="text-slate-400 hover:text-slate-600 transition-colors"
// //           >
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>
// //         <div className="p-6">
// //           <div className="mb-4 p-4 bg-slate-50 rounded-lg">
// //             <p className="text-sm text-slate-600">
// //               <strong>Work Request:</strong> #{workRequest.workRequestId}
// //             </p>
// //             <p className="text-sm text-slate-600">
// //               <strong>Asset:</strong> {workRequest.assetName}
// //             </p>
// //           </div>
// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-6">
// //               <label className="block text-sm font-medium text-slate-700 mb-2">
// //                 Asset Defined Services of Scope{" "}
// //                 <span className="text-red-500">*</span>
// //               </label>
// //               {loading ? (
// //                 <div className="flex justify-center items-center py-8">
// //                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
// //                   <span className="ml-3 text-sm text-slate-600">
// //                     Loading service scopes...
// //                   </span>
// //                 </div>
// //               ) : assetServiceScopes.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
// //                   <p className="text-sm text-slate-600">
// //                     No service scopes available for this asset
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <select
// //                   value={selectedServiceScopeId}
// //                   onChange={(e) => setSelectedServiceScopeId(e.target.value)}
// //                   className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
// //                   required
// //                 >
// //                   <option value="">Select Service Scope</option>
// //                   {assetServiceScopes.map((scope) => (
// //                     <option key={scope.scopeId} value={scope.scopeId}>
// //                       {scope.scopeName} ({scope.subServiceName})
// //                     </option>
// //                   ))}
// //                 </select>
// //               )}
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 type="button"
// //                 onClick={onClose}
// //                 className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="submit"
// //                 disabled={
// //                   isAssigning || loading || assetServiceScopes.length === 0
// //                 }
// //                 className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //               >
// //                 {isAssigning ? (
// //                   <>
// //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                     Assigning...
// //                   </>
// //                 ) : (
// //                   "Assign"
// //                 )}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WorkRequestTable;

// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   FileText,
//   RefreshCw,
//   Calendar,
//   AlertCircle,
//   Settings,
//   Filter,
//   X,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { workRequestService } from "../../services/WorkRequestService";
// import { toast } from "react-toastify";
// import { assetService } from "../../services/assetService";

// const WorkRequestTable = ({ onBack }) => {
//   const [workRequests, setWorkRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showAssignModal, setShowAssignModal] = useState(false);
//   const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
//   const [assigningServiceScope, setAssigningServiceScope] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     workRequestId: "",
//     assetId: "",
//     serviceScopeId: "",
//     status: "",
//     workRequestType: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [activeFilters, setActiveFilters] = useState({});
//   const [showColumnChooser, setShowColumnChooser] = useState(false);
//   const [visibleColumns, setVisibleColumns] = useState({
//     workRequestId: true,
//     assetName: true,
//     serviceScope: true,
//     reasonComment: true,
//     priority: true,
//     status: true,
//     workOrderStatus: true,
//     createdAt: true,
//   });
//   const navigate = useNavigate();

//   const columnDefinitions = [
//     { key: "workRequestId", label: "Work Request ID", required: true },
//     { key: "assetName", label: "Asset Name", required: true },
//     { key: "serviceScope", label: "Service Scope", required: false },
//     { key: "reasonComment", label: "Reason/Comment", required: false },
//     { key: "priority", label: "Priority", required: true },
//     { key: "status", label: "Status", required: true },
//     { key: "workOrderStatus", label: "Work Order Status", required: false },
//     { key: "createdAt", label: "Created At", required: false },
//   ];

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const cleanWorkRequestId = (id) => {
//     if (!id) return "";
//     // Remove WR- prefix and any maintenance type prefix (RM_, CM_, PM_)
//     return id.replace(/^(WR-|RM_|CM_|PM_)/gi, "");
//   };

//   // const applyFilters = () => {
//   //   const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
//   //     if (value && value.trim() !== "") {
//   //       if (key === "workRequestId") {
//   //         // Clean the workRequestId to remove prefixes
//   //         acc[key] = cleanWorkRequestId(value);
//   //       } else if (key === "startDate") {
//   //         acc[key] = new Date(value).toISOString();
//   //       } else if (key === "endDate") {
//   //         const endDate = new Date(value);
//   //         endDate.setHours(23, 59, 59, 999);
//   //         acc[key] = endDate.toISOString();
//   //       } else {
//   //         acc[key] = value;
//   //       }
//   //     }
//   //     return acc;
//   //   }, {});
//   //   setActiveFilters(cleanFilters);
//   //   setCurrentPage(0);
//   //   setShowFilters(false);
//   // };

//   const applyFilters = () => {
//     // Validate dates
//     if (
//       filters.startDate &&
//       filters.endDate &&
//       new Date(filters.startDate) > new Date(filters.endDate)
//     ) {
//       toast.error("Start date cannot be after end date");
//       return;
//     }

//     const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
//       if (value && value.trim() !== "") {
//         if (key === "workRequestId") {
//           acc[key] = cleanWorkRequestId(value);
//         } else {
//           acc[key] = value; // Keep startDate and endDate as yyyy-MM-dd
//         }
//       }
//       return acc;
//     }, {});
//     setActiveFilters(cleanFilters);
//     setCurrentPage(0);
//     setShowFilters(false);
//   };

//   const clearFilters = () => {
//     setFilters({
//       workRequestId: "",
//       assetId: "",
//       serviceScopeId: "",
//       status: "",
//       workRequestType: "",
//       startDate: "",
//       endDate: "",
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

//   useEffect(() => {
//     loadWorkRequests();
//   }, [currentPage, pageSize, activeFilters]);

//   const loadWorkRequests = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (Object.keys(activeFilters).length > 0) {
//         response = await workRequestService.getFilteredWorkRequests(
//           activeFilters,
//           currentPage,
//           pageSize
//         );
//       } else {
//         response = await workRequestService.getAllWorkRequests(
//           currentPage,
//           pageSize
//         );
//       }
//       setWorkRequests(response.data.content || []);
//       setTotalElements(response.data.totalElements || 0);
//       setTotalPages(response.data.totalPages || 0);
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
//       toast.success("Service scope assigned successfully");
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
//         bg: "bg-amber-50",
//         text: "text-amber-700",
//         border: "border-amber-200",
//         label: "Pending",
//       },
//       APPROVED: {
//         bg: "bg-emerald-50",
//         text: "text-emerald-700",
//         border: "border-emerald-200",
//         label: "Approved",
//       },
//       REJECTED: {
//         bg: "bg-red-50",
//         text: "text-red-700",
//         border: "border-red-200",
//         label: "Rejected",
//       },
//     };
//     const config = statusConfig[status] || {
//       bg: "bg-slate-50",
//       text: "text-slate-700",
//       border: "border-slate-200",
//       label: status || "N/A",
//     };
//     return (
//       <span
//         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const getPriorityBadge = (priority) => {
//     const priorityConfig = {
//       RM_P1: {
//         bg: "bg-red-50",
//         text: "text-red-700",
//         border: "border-red-200",
//         label: "RM P1",
//       },
//       RM_P2: {
//         bg: "bg-amber-50",
//         text: "text-amber-700",
//         border: "border-amber-200",
//         label: "RM P2",
//       },
//       RM_P3: {
//         bg: "bg-emerald-50",
//         text: "text-emerald-700",
//         border: "border-emerald-200",
//         label: "RM P3",
//       },
//       CM_P1: {
//         bg: "bg-red-50",
//         text: "text-red-700",
//         border: "border-red-200",
//         label: "CM P1",
//       },
//       CM_P2: {
//         bg: "bg-amber-50",
//         text: "text-amber-700",
//         border: "border-amber-200",
//         label: "CM P2",
//       },
//       CM_P3: {
//         bg: "bg-emerald-50",
//         text: "text-emerald-700",
//         border: "border-emerald-200",
//         label: "CM P3",
//       },
//       PM_P4: {
//         bg: "bg-blue-50",
//         text: "text-blue-700",
//         border: "border-blue-200",
//         label: "PM P4",
//       },
//     };
//     const config = priorityConfig[priority] || {
//       bg: "bg-slate-50",
//       text: "text-slate-700",
//       border: "border-slate-200",
//       label: priority || "N/A",
//     };
//     return (
//       <span
//         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const getWorkOrderStatusBadge = (workOrderStatus) => {
//     const statusConfig = {
//       ASSIGNED: {
//         bg: "bg-blue-50",
//         text: "text-blue-700",
//         border: "border-blue-200",
//         label: "Assigned",
//       },
//       IN_PROGRESS: {
//         bg: "bg-amber-50",
//         text: "text-amber-700",
//         border: "border-amber-200",
//         label: "In Progress",
//       },
//       COMPLETED: {
//         bg: "bg-emerald-50",
//         text: "text-emerald-700",
//         border: "border-emerald-200",
//         label: "Completed",
//       },
//       CANCELLED: {
//         bg: "bg-red-50",
//         text: "text-red-700",
//         border: "border-red-200",
//         label: "Cancelled",
//       },
//     };
//     const config = statusConfig[workOrderStatus] || {
//       bg: "bg-slate-50",
//       text: "text-slate-700",
//       border: "border-slate-200",
//       label: workOrderStatus || "No Work Order",
//     };
//     return (
//       <span
//         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen">
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
//                   Work Request Management
//                 </h1>
//                 <p className="text-slate-600 text-sm">
//                   View and manage all work requests in the system
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onBack}
//               className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back
//             </button>
//           </div>
//         </div>

//         {/* Filters and Column Chooser */}
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
//             </div>

//             {/* Filter Panel */}
//             {showFilters && (
//               <div className="border-t border-slate-200 pt-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Work Request ID
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.workRequestId}
//                       onChange={(e) =>
//                         handleFilterChange("workRequestId", e.target.value)
//                       }
//                       placeholder="Enter Work Request ID (e.g., WR-123, RM_123)"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Asset ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.assetId}
//                       onChange={(e) =>
//                         handleFilterChange("assetId", e.target.value)
//                       }
//                       placeholder="Enter Asset ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Service Scope ID
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.serviceScopeId}
//                       onChange={(e) =>
//                         handleFilterChange("serviceScopeId", e.target.value)
//                       }
//                       placeholder="Enter Service Scope ID"
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
//                       <option value="">All Statuses</option>
//                       <option value="PENDING">Pending</option>
//                       <option value="APPROVED">Approved</option>
//                       <option value="REJECTED">Rejected</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Work Request Type
//                     </label>
//                     <select
//                       value={filters.workRequestType}
//                       onChange={(e) =>
//                         handleFilterChange("workRequestType", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">All Types</option>
//                       <option value="RM">RM - Reactive Maintenance</option>
//                       <option value="CM">CM - Corrective Maintenance</option>
//                       <option value="PM">PM - Preventive Maintenance</option>
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

//         {/* Alert for PM Work Requests */}
//         {workRequests.filter(
//           (request) =>
//             request.priority === "PM_P4" &&
//             (!request.serviceScopeId || request.serviceScopeId === null)
//         ).length > 0 && (
//           <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-amber-400 mr-3" />
//               <div>
//                 <p className="text-sm text-amber-700 font-medium">
//                   {
//                     workRequests.filter(
//                       (request) =>
//                         request.priority === "PM_P4" &&
//                         (!request.serviceScopeId ||
//                           request.serviceScopeId === null)
//                     ).length
//                   }{" "}
//                   PM work request(s) need service scope assignment
//                 </p>
//                 <p className="text-sm text-amber-600 mt-1">
//                   Click the "Assign Service Scope" button for PM work requests
//                   to assign asset-defined services of scope.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {visibleColumns.workRequestId && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Work Request ID
//                     </th>
//                   )}
//                   {visibleColumns.assetName && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Asset Name
//                     </th>
//                   )}
//                   {visibleColumns.serviceScope && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Service Scope
//                     </th>
//                   )}
//                   {visibleColumns.reasonComment && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Reason/Comment
//                     </th>
//                   )}
//                   {visibleColumns.priority && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Priority
//                     </th>
//                   )}
//                   {visibleColumns.status && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Status
//                     </th>
//                   )}
//                   {visibleColumns.workOrderStatus && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Work Order Status
//                     </th>
//                   )}
//                   {visibleColumns.createdAt && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Created At
//                     </th>
//                   )}
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                     Create Work Order
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={columnDefinitions.length + 2}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
//                         <span className="ml-3 text-sm font-medium text-slate-600">
//                           Loading work requests...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : workRequests.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={columnDefinitions.length + 2}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="text-slate-500">
//                         <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                         <p className="text-sm font-medium">
//                           No work requests found
//                         </p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           {Object.keys(activeFilters).length > 0
//                             ? "Try adjusting your filters"
//                             : "No work requests have been created yet"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   workRequests.map((request) => (
//                     <tr
//                       key={request.workRequestId}
//                       className="hover:bg-slate-50 transition-colors"
//                     >
//                       {visibleColumns.workRequestId && (
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm font-semibold text-slate-900">
//                             WR-{request.workRequestId}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.assetName && (
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-slate-900">
//                             {request.assetName || "-"}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.serviceScope && (
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-600">
//                             {request.serviceScopeName || (
//                               <span className="text-slate-400 italic">
//                                 Not assigned
//                               </span>
//                             )}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.reasonComment && (
//                         <td className="px-4 py-4 max-w-xs">
//                           <div
//                             className="text-sm text-slate-600 truncate"
//                             title={request.reasonComment}
//                           >
//                             {request.reasonComment || "-"}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.priority && (
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           {getPriorityBadge(request.priority)}
//                         </td>
//                       )}
//                       {visibleColumns.status && (
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           {getStatusBadge(request.status)}
//                         </td>
//                       )}
//                       {visibleColumns.workOrderStatus && (
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           {getWorkOrderStatusBadge(request.workOrderStatus)}
//                         </td>
//                       )}
//                       {visibleColumns.createdAt && (
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-600 flex items-center">
//                             <Calendar className="w-4 h-4 mr-1 text-slate-400" />
//                             {request.createdAt
//                               ? new Date(request.createdAt).toLocaleDateString()
//                               : "-"}
//                           </div>
//                         </td>
//                       )}
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         {request.priority === "PM_P4" &&
//                           !request.serviceScopeId && (
//                             <button
//                               onClick={() => openAssignModal(request)}
//                               className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                             >
//                               <Settings className="w-3 h-3 mr-1" />
//                               Assign Service Scope
//                             </button>
//                           )}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         {request.status === "APPROVED" &&
//                           request.workOrderStatus !== "ASSIGNED" &&
//                           request.workOrderStatus !== "IN_PROGRESS" &&
//                           request.workOrderStatus !== "COMPLETED" && (
//                             <button
//                               onClick={() => handleCreateWorkOrder(request)}
//                               className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
//                             >
//                               <FileText className="w-3 h-3 mr-1" />
//                               Create Work Order
//                             </button>
//                           )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {!loading && workRequests.length > 0 && (
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
//                     of <span className="font-medium">{totalElements}</span> work
//                     requests
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

//         {/* Assign Service Scope Modal */}
//         {showAssignModal && selectedWorkRequest && (
//           <AssignServiceScopeModal
//             workRequest={selectedWorkRequest}
//             onClose={() => {
//               setShowAssignModal(false);
//               setSelectedWorkRequest(null);
//             }}
//             onAssign={handleAssignServiceScope}
//             isAssigning={assigningServiceScope}
//           />
//         )}
//       </div>
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
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//         <div className="flex justify-between items-center p-6 border-b border-slate-200">
//           <h3 className="text-lg font-semibold text-slate-900">
//             Assign Service Scope
//           </h3>
//           <button
//             onClick={onClose}
//             className="text-slate-400 hover:text-slate-600 transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="p-6">
//           <div className="mb-4 p-4 bg-slate-50 rounded-lg">
//             <p className="text-sm text-slate-600">
//               <strong>Work Request:</strong> #{workRequest.workRequestId}
//             </p>
//             <p className="text-sm text-slate-600">
//               <strong>Asset:</strong> {workRequest.assetName}
//             </p>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Asset Defined Services of Scope{" "}
//                 <span className="text-red-500">*</span>
//               </label>
//               {loading ? (
//                 <div className="flex justify-center items-center py-8">
//                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
//                   <span className="ml-3 text-sm text-slate-600">
//                     Loading service scopes...
//                   </span>
//                 </div>
//               ) : assetServiceScopes.length === 0 ? (
//                 <div className="text-center py-8">
//                   <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                   <p className="text-sm text-slate-600">
//                     No service scopes available for this asset
//                   </p>
//                 </div>
//               ) : (
//                 <select
//                   value={selectedServiceScopeId}
//                   onChange={(e) => setSelectedServiceScopeId(e.target.value)}
//                   className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
//                   required
//                 >
//                   <option value="">Select Service Scope</option>
//                   {assetServiceScopes.map((scope) => (
//                     <option key={scope.scopeId} value={scope.scopeId}>
//                       {scope.scopeName} ({scope.subServiceName})
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={
//                   isAssigning || loading || assetServiceScopes.length === 0
//                 }
//                 className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {isAssigning ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                     Assigning...
//                   </>
//                 ) : (
//                   "Assign"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
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
  Calendar,
  AlertCircle,
  Settings,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { workRequestService } from "../../services/WorkRequestService";
import { toast } from "react-toastify";
import { assetService } from "../../services/assetService";

const WorkRequestTable = ({ onBack }) => {
  const [workRequests, setWorkRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedWorkRequest, setSelectedWorkRequest] = useState(null);
  const [assigningServiceScope, setAssigningServiceScope] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // Default to latest first
  const [filters, setFilters] = useState({
    workRequestId: "",
    assetId: "",
    serviceScopeId: "",
    status: "",
    workRequestType: "",
    startDate: "",
    endDate: "",
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [showColumnChooser, setShowColumnChooser] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    workRequestId: true,
    assetName: true,
    serviceScope: true,
    reasonComment: true,
    priority: true,
    status: true,
    workOrderStatus: true,
    createdAt: true,
  });
  const navigate = useNavigate();

  const columnDefinitions = [
    { key: "workRequestId", label: "Work Request ID", required: true },
    { key: "assetName", label: "Asset Name", required: true },
    { key: "serviceScope", label: "Service Scope", required: false },
    { key: "reasonComment", label: "Reason/Comment", required: false },
    { key: "priority", label: "Priority", required: true },
    { key: "status", label: "Status", required: true },
    { key: "workOrderStatus", label: "Work Order Status", required: false },
    { key: "createdAt", label: "Created At", required: false },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const cleanWorkRequestId = (id) => {
    if (!id) return "";
    return id.replace(/^(WR-|RM_|CM_|PM_)/gi, "");
  };

  const applyFilters = () => {
    if (
      filters.startDate &&
      filters.endDate &&
      new Date(filters.startDate) > new Date(filters.endDate)
    ) {
      toast.error("Start date cannot be after end date");
      return;
    }

    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== "") {
        if (key === "workRequestId") {
          acc[key] = cleanWorkRequestId(value);
        } else {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
    setActiveFilters(cleanFilters);
    setCurrentPage(0);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      workRequestId: "",
      assetId: "",
      serviceScopeId: "",
      status: "",
      workRequestType: "",
      startDate: "",
      endDate: "",
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

  useEffect(() => {
    loadWorkRequests();
  }, [currentPage, pageSize, activeFilters, sortOrder]);

  const loadWorkRequests = async () => {
    setLoading(true);
    try {
      let response;
      if (Object.keys(activeFilters).length > 0) {
        response = await workRequestService.getFilteredWorkRequests(
          activeFilters,
          currentPage,
          pageSize,
          sortOrder
        );
      } else {
        response = await workRequestService.getAllWorkRequests(
          currentPage,
          pageSize,
          sortOrder
        );
      }
      setWorkRequests(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
      setTotalPages(response.data.totalPages || 0);
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
      toast.success("Service scope assigned successfully");
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
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        label: "Pending",
      },
      APPROVED: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        label: "Approved",
      },
      REJECTED: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        label: "Rejected",
      },
    };
    const config = statusConfig[status] || {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      label: status || "N/A",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      RM_P1: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        label: "RM P1",
      },
      RM_P2: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        label: "RM P2",
      },
      RM_P3: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        label: "RM P3",
      },
      CM_P1: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        label: "CM P1",
      },
      CM_P2: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        label: "CM P2",
      },
      CM_P3: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        label: "CM P3",
      },
      PM_P4: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        label: "PM P4",
      },
    };
    const config = priorityConfig[priority] || {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      label: priority || "N/A",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  const getWorkOrderStatusBadge = (workOrderStatus) => {
    const statusConfig = {
      ASSIGNED: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        label: "Assigned",
      },
      IN_PROGRESS: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        label: "In Progress",
      },
      COMPLETED: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        label: "Completed",
      },
      CANCELLED: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        label: "Cancelled",
      },
    };
    const config = statusConfig[workOrderStatus] || {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      label: workOrderStatus || "No Work Order",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen">
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
                  Work Request Management
                </h1>
                <p className="text-slate-600 text-sm">
                  View and manage all work requests in the system
                </p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
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
                    <ArrowDown className="w-4 h-4 mr-2 inline" />
                    Latest First
                  </>
                ) : (
                  <>
                    <ArrowUp className="w-4 h-4 mr-2 inline" />
                    Oldest First
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
                      Work Request ID
                    </label>
                    <input
                      type="text"
                      value={filters.workRequestId}
                      onChange={(e) =>
                        handleFilterChange("workRequestId", e.target.value)
                      }
                      placeholder="Enter Work Request ID (e.g., WR-123, RM_123)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Asset ID
                    </label>
                    <input
                      type="number"
                      value={filters.assetId}
                      onChange={(e) =>
                        handleFilterChange("assetId", e.target.value)
                      }
                      placeholder="Enter Asset ID"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Service Scope ID
                    </label>
                    <input
                      type="number"
                      value={filters.serviceScopeId}
                      onChange={(e) =>
                        handleFilterChange("serviceScopeId", e.target.value)
                      }
                      placeholder="Enter Service Scope ID"
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
                      <option value="">All Statuses</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Work Request Type
                    </label>
                    <select
                      value={filters.workRequestType}
                      onChange={(e) =>
                        handleFilterChange("workRequestType", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value="">All Types</option>
                      <option value="RM">RM - Reactive Maintenance</option>
                      <option value="CM">CM - Corrective Maintenance</option>
                      <option value="PM">PM - Preventive Maintenance</option>
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

        {/* Alert for PM Work Requests */}
        {workRequests.filter(
          (request) =>
            request.priority === "PM_P4" &&
            (!request.serviceScopeId || request.serviceScopeId === null)
        ).length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-400 mr-3" />
              <div>
                <p className="text-sm text-amber-700 font-medium">
                  {
                    workRequests.filter(
                      (request) =>
                        request.priority === "PM_P4" &&
                        (!request.serviceScopeId ||
                          request.serviceScopeId === null)
                    ).length
                  }{" "}
                  PM work request(s) need service scope assignment
                </p>
                <p className="text-sm text-amber-600 mt-1">
                  Click the "Assign Service Scope" button for PM work requests
                  to assign asset-defined services of scope.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {visibleColumns.workRequestId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Work Request ID
                    </th>
                  )}
                  {visibleColumns.assetName && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Asset Name
                    </th>
                  )}
                  {visibleColumns.serviceScope && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Service Scope
                    </th>
                  )}
                  {visibleColumns.reasonComment && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Reason/Comment
                    </th>
                  )}
                  {visibleColumns.priority && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Priority
                    </th>
                  )}
                  {visibleColumns.status && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                  )}
                  {visibleColumns.workOrderStatus && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Work Order Status
                    </th>
                  )}
                  {visibleColumns.createdAt && (
                    <th
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
                      onClick={toggleSortOrder}
                    >
                      <div className="flex items-center">
                        Created At
                        {sortOrder === "desc" ? (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Create Work Order
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={columnDefinitions.length + 2}
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-600">
                          Loading work requests...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : workRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columnDefinitions.length + 2}
                      className="px-4 py-12 text-center"
                    >
                      <div className="text-slate-500">
                        <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm font-medium">
                          No work requests found
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {Object.keys(activeFilters).length > 0
                            ? "Try adjusting your filters"
                            : "No work requests have been created yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  workRequests.map((request) => (
                    <tr
                      key={request.workRequestId}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {visibleColumns.workRequestId && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-slate-900">
                            WR-{request.workRequestId}
                          </div>
                        </td>
                      )}
                      {visibleColumns.assetName && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {request.assetName || "-"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.serviceScope && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600">
                            {request.serviceScopeName || (
                              <span className="text-slate-400 italic">
                                Not assigned
                              </span>
                            )}
                          </div>
                        </td>
                      )}
                      {visibleColumns.reasonComment && (
                        <td className="px-4 py-4 max-w-xs">
                          <div
                            className="text-sm text-slate-600 truncate"
                            title={request.reasonComment}
                          >
                            {request.reasonComment || "-"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.priority && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getPriorityBadge(request.priority)}
                        </td>
                      )}
                      {visibleColumns.status && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getStatusBadge(request.status)}
                        </td>
                      )}
                      {visibleColumns.workOrderStatus && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getWorkOrderStatusBadge(request.workOrderStatus)}
                        </td>
                      )}
                      {visibleColumns.createdAt && (
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                            {request.createdAt
                              ? new Date(request.createdAt).toLocaleDateString()
                              : "-"}
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {request.priority === "PM_P4" &&
                          !request.serviceScopeId && (
                            <button
                              onClick={() => openAssignModal(request)}
                              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                              <Settings className="w-3 h-3 mr-1" />
                              Assign Service Scope
                            </button>
                          )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {request.status === "APPROVED" &&
                          request.workOrderStatus !== "ASSIGNED" &&
                          request.workOrderStatus !== "IN_PROGRESS" &&
                          request.workOrderStatus !== "COMPLETED" && (
                            <button
                              onClick={() => handleCreateWorkOrder(request)}
                              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
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
          {!loading && workRequests.length > 0 && (
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
                    of <span className="font-medium">{totalElements}</span> work
                    requests
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

        {/* Assign Service Scope Modal */}
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Assign Service Scope
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-4 p-4 bg-slate-50 rounded-lg">
            <p className="text-sm text-slate-600">
              <strong>Work Request:</strong> #{workRequest.workRequestId}
            </p>
            <p className="text-sm text-slate-600">
              <strong>Asset:</strong> {workRequest.assetName}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Asset Defined Services of Scope{" "}
                <span className="text-red-500">*</span>
              </label>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
                  <span className="ml-3 text-sm text-slate-600">
                    Loading service scopes...
                  </span>
                </div>
              ) : assetServiceScopes.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm text-slate-600">
                    No service scopes available for this asset
                  </p>
                </div>
              ) : (
                <select
                  value={selectedServiceScopeId}
                  onChange={(e) => setSelectedServiceScopeId(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors"
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
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isAssigning || loading || assetServiceScopes.length === 0
                }
                className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
    </div>
  );
};

export default WorkRequestTable;
