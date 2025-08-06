// "use client";

// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   FileText,
//   RefreshCw,
//   Search,
//   Calendar,
//   AlertCircle,
//   User,
//   Filter,
//   Play,
//   Square,
//   Pause,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";
// import { workOrderService } from "../../services/WorkOrderService";
// import { technicianService } from "../../services/TechnicianService";
// import { toast } from "react-toastify";

// const WorkOrderTable = ({ onBack }) => {
//   const [workOrders, setWorkOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [technicianFilter, setTechnicianFilter] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [technicians, setTechnicians] = useState([]);
//   const [updatingStatus, setUpdatingStatus] = useState(null);

//   const attemptStatusOptions = [
//     {
//       value: "NOT_ATTEMPTED",
//       label: "Not Attempted",
//       icon: XCircle,
//       color: "text-gray-600",
//     },
//     { value: "START", label: "Start", icon: Play, color: "text-blue-600" },
//     {
//       value: "ATTEMPTED",
//       label: "Attempted",
//       icon: Square,
//       color: "text-yellow-600",
//     },
//     { value: "HOLD", label: "Hold", icon: Pause, color: "text-orange-600" },
//     {
//       value: "FINISH",
//       label: "Finish",
//       icon: CheckCircle,
//       color: "text-green-600",
//     },
//   ];

//   useEffect(() => {
//     loadWorkOrders();
//     loadTechnicians();
//   }, []);

//   useEffect(() => {
//     if (technicianFilter) {
//       loadWorkOrdersByTechnician();
//     } else {
//       loadWorkOrders();
//     }
//   }, [technicianFilter]);

//   const loadWorkOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await workOrderService.getAllWorkOrders();
//       setWorkOrders(response.data || []);
//     } catch (error) {
//       console.error("Error loading work orders:", error);
//       toast.error("Failed to load work orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadWorkOrdersByTechnician = async () => {
//     if (!technicianFilter) return;
//     setLoading(true);
//     try {
//       const response = await workOrderService.getWorkOrdersByTechnician(
//         technicianFilter
//       );
//       setWorkOrders(response.data || []);
//     } catch (error) {
//       console.error("Error loading work orders by technician:", error);
//       toast.error("Failed to load work orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadTechnicians = async () => {
//     try {
//       const response = await technicianService.getAllTechnicians(0, 100);
//       setTechnicians(response.data?.content || []);
//     } catch (error) {
//       console.error("Error loading technicians:", error);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       if (technicianFilter) {
//         await loadWorkOrdersByTechnician();
//       } else {
//         await loadWorkOrders();
//       }
//       toast.success("Work orders refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleStatusUpdate = async (workOrderId, attemptStatus) => {
//     setUpdatingStatus(workOrderId);
//     try {
//       await workOrderService.updateAttemptStatus(workOrderId, attemptStatus);
//       toast.success(`Work order status updated to ${attemptStatus}`);
//       // Reload work orders
//       if (technicianFilter) {
//         await loadWorkOrdersByTechnician();
//       } else {
//         await loadWorkOrders();
//       }
//     } catch (error) {
//       console.error("Error updating work order status:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update work order status"
//       );
//     } finally {
//       setUpdatingStatus(null);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       ASSIGNED: { bg: "bg-blue-100", text: "text-blue-800", label: "Assigned" },
//       IN_PROGRESS: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-800",
//         label: "In Progress",
//       },
//       COMPLETED: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Completed",
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

//   const getAttemptStatusBadge = (attemptStatus) => {
//     const statusConfig = {
//       NOT_ATTEMPTED: {
//         bg: "bg-gray-100",
//         text: "text-gray-800",
//         label: "Not Attempted",
//       },
//       START: { bg: "bg-blue-100", text: "text-blue-800", label: "Started" },
//       ATTEMPTED: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-800",
//         label: "Attempted",
//       },
//       HOLD: { bg: "bg-orange-100", text: "text-orange-800", label: "On Hold" },
//       FINISH: { bg: "bg-green-100", text: "text-green-800", label: "Finished" },
//     };

//     const config = statusConfig[attemptStatus] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: attemptStatus,
//     };

//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   const getWorkOrderTypeBadge = (type) => {
//     const typeConfig = {
//       CM: { bg: "bg-red-100", text: "text-red-800", label: "CM" },
//       RM: { bg: "bg-orange-100", text: "text-orange-800", label: "RM" },
//       PM: { bg: "bg-green-100", text: "text-green-800", label: "PM" },
//     };

//     const config = typeConfig[type] || {
//       bg: "bg-gray-100",
//       text: "text-gray-800",
//       label: type,
//     };

//     return (
//       <span
//         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
//       >
//         {config.label}
//       </span>
//     );
//   };

//   // Filter work orders based on search term
//   const filteredWorkOrders = workOrders.filter(
//     (workOrder) =>
//       workOrder.workOrderId.toString().includes(searchTerm) ||
//       workOrder.workRequestId.toString().includes(searchTerm) ||
//       workOrder.technicianName
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       workOrder.assetName?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
//           <FileText className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Orders</h2>
//         <p className="text-gray-600">
//           View and manage all work orders in the system
//         </p>
//       </div>

//       {/* Search and Filters */}
//       <div className="flex flex-col lg:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search by work order ID, work request ID, technician, or asset..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div className="relative">
//           <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <select
//             value={technicianFilter}
//             onChange={(e) => setTechnicianFilter(e.target.value)}
//             className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none min-w-48"
//           >
//             <option value="">All Technicians</option>
//             {technicians.map((tech) => (
//               <option key={tech.internalUserId} value={tech.internalUserId}>
//                 {tech.firstName} {tech.lastName}
//               </option>
//             ))}
//           </select>
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
//                   Work Order ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Work Request
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Asset
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Technician
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Attempt Status
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
//                   <td colSpan="9" className="px-6 py-12 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                       <span className="ml-3 text-lg font-medium text-gray-700">
//                         Loading work orders...
//                       </span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredWorkOrders.length === 0 ? (
//                 <tr>
//                   <td colSpan="9" className="px-6 py-12 text-center">
//                     <div className="text-gray-500">
//                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">
//                         No work orders found
//                       </p>
//                       <p className="text-sm">
//                         {searchTerm || technicianFilter
//                           ? "Try adjusting your search criteria"
//                           : "No work orders have been created yet"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredWorkOrders.map((workOrder, index) => (
//                   <tr
//                     key={workOrder.workOrderId}
//                     className={`hover:bg-gray-50 ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     }`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         #{workOrder.workOrderId}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getWorkOrderTypeBadge(workOrder.workOrderType)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         #{workOrder.workRequestId}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {workOrder.assetName || "-"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <User className="w-4 h-4 mr-2 text-gray-400" />
//                         <div className="text-sm text-gray-900">
//                           {workOrder.technicianName || "-"}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStatusBadge(workOrder.status)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getAttemptStatusBadge(workOrder.attemptStatus)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 flex items-center">
//                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                         {workOrder.createdAt
//                           ? new Date(workOrder.createdAt).toLocaleDateString()
//                           : "-"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-wrap gap-1">
//                         {attemptStatusOptions.map((statusOption) => {
//                           const IconComponent = statusOption.icon;
//                           const isDisabled =
//                             updatingStatus === workOrder.workOrderId ||
//                             workOrder.attemptStatus === statusOption.value ||
//                             workOrder.status === "COMPLETED";

//                           return (
//                             <button
//                               key={statusOption.value}
//                               onClick={() =>
//                                 handleStatusUpdate(
//                                   workOrder.workOrderId,
//                                   statusOption.value
//                                 )
//                               }
//                               disabled={isDisabled}
//                               className={`p-1.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 ${statusOption.color} hover:bg-gray-100`}
//                               title={statusOption.label}
//                             >
//                               {updatingStatus === workOrder.workOrderId ? (
//                                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
//                               ) : (
//                                 <IconComponent className="w-4 h-4" />
//                               )}
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         {!loading && filteredWorkOrders.length > 0 && (
//           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//             <div className="text-sm text-gray-700">
//               Showing{" "}
//               <span className="font-medium">{filteredWorkOrders.length}</span>{" "}
//               of <span className="font-medium">{workOrders.length}</span> work
//               orders
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
//           Back to Work Orders
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WorkOrderTable;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   FileText,
//   RefreshCw,
//   Search,
//   Calendar,
//   AlertCircle,
//   User,
//   Filter,
// } from "lucide-react";
// import { workOrderService } from "../../services/WorkOrderService";
// import { technicianService } from "../../services/TechnicianService";
// import { toast } from "react-toastify";

// const WorkOrderTable = ({ onBack }) => {
//   const [workOrders, setWorkOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [technicianFilter, setTechnicianFilter] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [technicians, setTechnicians] = useState([]);
//   const [updatingStatus, setUpdatingStatus] = useState(null);

//   const attemptStatusOptions = [
//     {
//       value: "NOT_ATTEMPTED",
//       label: "Not Attempted",
//       color: "bg-gray-100 text-gray-800",
//     },
//     { value: "START", label: "Start", color: "bg-blue-100 text-blue-800" },
//     {
//       value: "ATTEMPTED",
//       label: "Attempted",
//       color: "bg-yellow-100 text-yellow-800",
//     },
//     { value: "HOLD", label: "Hold", color: "bg-orange-100 text-orange-800" },
//     { value: "FINISH", label: "Finish", color: "bg-green-100 text-green-800" },
//   ];

//   useEffect(() => {
//     loadWorkOrders();
//     loadTechnicians();
//   }, []);

//   useEffect(() => {
//     if (technicianFilter) {
//       loadWorkOrdersByTechnician();
//     } else {
//       loadWorkOrders();
//     }
//   }, [technicianFilter]);

//   const loadWorkOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await workOrderService.getAllWorkOrders();
//       setWorkOrders(response.data || []);
//     } catch (error) {
//       console.error("Error loading work orders:", error);
//       toast.error("Failed to load work orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadWorkOrdersByTechnician = async () => {
//     if (!technicianFilter) return;
//     setLoading(true);
//     try {
//       const response = await workOrderService.getWorkOrdersByTechnician(
//         technicianFilter
//       );
//       setWorkOrders(response.data || []);
//     } catch (error) {
//       console.error("Error loading work orders by technician:", error);
//       toast.error("Failed to load work orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadTechnicians = async () => {
//     try {
//       const response = await technicianService.getAllTechnicians(0, 100);
//       setTechnicians(response.data?.content || []);
//     } catch (error) {
//       console.error("Error loading technicians:", error);
//       toast.error("Failed to load technicians");
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       if (technicianFilter) {
//         await loadWorkOrdersByTechnician();
//       } else {
//         await loadWorkOrders();
//       }
//       toast.success("Work orders refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleStatusUpdate = async (workOrderId, attemptStatus) => {
//     setUpdatingStatus(workOrderId);
//     try {
//       await workOrderService.updateAttemptStatus(workOrderId, attemptStatus);
//       toast.success(`Work order status updated to ${attemptStatus}`);
//       if (technicianFilter) {
//         await loadWorkOrdersByTechnician();
//       } else {
//         await loadWorkOrders();
//       }
//     } catch (error) {
//       console.error("Error updating work order status:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update work order status"
//       );
//     } finally {
//       setUpdatingStatus(null);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       ASSIGNED: { bg: "bg-blue-100", text: "text-blue-800", label: "Assigned" },
//       IN_PROGRESS: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-800",
//         label: "In Progress",
//       },
//       COMPLETED: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Completed",
//       },
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

//   // Filter work orders based on search term
//   const filteredWorkOrders = workOrders.filter(
//     (workOrder) =>
//       workOrder.workOrderId.toString().includes(searchTerm) ||
//       workOrder.workRequestId.toString().includes(searchTerm) ||
//       workOrder.technicianId.toString().includes(searchTerm) ||
//       workOrder.technicianUsername
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
//                 <FileText className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                 Work Orders
//               </h2>
//               <p className="text-gray-600">
//                 View and manage all work orders in the system
//               </p>
//             </div>
//             <button
//               onClick={onBack}
//               className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back
//             </button>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by work order ID, work request ID, technician ID, or username..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={technicianFilter}
//                 onChange={(e) => setTechnicianFilter(e.target.value)}
//                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none min-w-48"
//               >
//                 <option value="">All Technicians</option>
//                 {technicians.map((tech) => (
//                   <option key={tech.internalUserId} value={tech.internalUserId}>
//                     {tech.firstName} {tech.lastName} (ID: {tech.internalUserId})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Work Order ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Work Request ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Technician ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Assigned At
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Completed At
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
//                           Loading work orders...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : filteredWorkOrders.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">
//                           No work orders found
//                         </p>
//                         <p className="text-sm">
//                           {searchTerm || technicianFilter
//                             ? "Try adjusting your search criteria"
//                             : "No work orders have been created yet"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredWorkOrders.map((workOrder, index) => (
//                     <tr
//                       key={workOrder.workOrderId}
//                       className={`hover:bg-gray-50 ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       }`}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           #{workOrder.workOrderId}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           #{workOrder.workRequestId}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <User className="w-4 h-4 mr-2 text-gray-400" />
//                           <div className="text-sm text-gray-900">
//                             {workOrder.technicianId} (
//                             {workOrder.technicianUsername || "-"})
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {getStatusBadge(workOrder.status)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 flex items-center">
//                           <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                           {workOrder.assignedAt
//                             ? new Date(workOrder.assignedAt).toLocaleString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 flex items-center">
//                           <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                           {workOrder.completedAt
//                             ? new Date(workOrder.completedAt).toLocaleString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex flex-wrap gap-2">
//                           {attemptStatusOptions.map((statusOption) => {
//                             const isDisabled =
//                               updatingStatus === workOrder.workOrderId ||
//                               workOrder.status === "COMPLETED";

//                             return (
//                               <button
//                                 key={statusOption.value}
//                                 onClick={() =>
//                                   handleStatusUpdate(
//                                     workOrder.workOrderId,
//                                     statusOption.value
//                                   )
//                                 }
//                                 disabled={isDisabled}
//                                 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${statusOption.color} hover:shadow-md`}
//                               >
//                                 {updatingStatus === workOrder.workOrderId ? (
//                                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current inline-block mr-1"></div>
//                                 ) : null}
//                                 {statusOption.label}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Footer */}
//           {!loading && filteredWorkOrders.length > 0 && (
//             <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//               <div className="text-sm text-gray-700">
//                 Showing{" "}
//                 <span className="font-medium">{filteredWorkOrders.length}</span>{" "}
//                 of <span className="font-medium">{workOrders.length}</span> work
//                 orders
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkOrderTable;

// "use client";
// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   FileText,
//   RefreshCw,
//   Search,
//   Calendar,
//   AlertCircle,
//   User,
//   Filter,
//   X,
// } from "lucide-react";
// import { workOrderService } from "../../services/WorkOrderService";
// import { technicianService } from "../../services/TechnicianService";
// import { toast } from "react-toastify";

// const WorkOrderTable = ({ onBack }) => {
//   const [workOrders, setWorkOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [technicianFilter, setTechnicianFilter] = useState("");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [technicians, setTechnicians] = useState([]);
//   const [updatingStatus, setUpdatingStatus] = useState(null);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
//   const [cancelReason, setCancelReason] = useState("");
//   const [cancelling, setCancelling] = useState(false);

//   const attemptStatusOptions = [
//     {
//       value: "NOT_ATTEMPTED",
//       label: "Not Attempted",
//       color: "bg-gray-100 text-gray-800",
//     },
//     { value: "START", label: "Start", color: "bg-blue-100 text-blue-800" },
//     {
//       value: "ATTEMPTED",
//       label: "Attempted",
//       color: "bg-yellow-100 text-yellow-800",
//     },
//     { value: "HOLD", label: "Hold", color: "bg-orange-100 text-orange-800" },
//     { value: "FINISH", label: "Finish", color: "bg-green-100 text-green-800" },
//   ];

//   useEffect(() => {
//     loadWorkOrders();
//     loadTechnicians();
//   }, []);

//   useEffect(() => {
//     if (technicianFilter) {
//       loadWorkOrdersByTechnician();
//     } else {
//       loadWorkOrders();
//     }
//   }, [technicianFilter]);

//   const loadWorkOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await workOrderService.getAllWorkOrders();
//       setWorkOrders(response.data || []);
//     } catch (error) {
//       console.error("Error loading work orders:", error);
//       toast.error("Failed to load work orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadWorkOrdersByTechnician = async () => {
//     if (!technicianFilter) return;
//     setLoading(true);
//     try {
//       const response = await workOrderService.getWorkOrdersByTechnician(
//         technicianFilter
//       );
//       setWorkOrders(response.data || []);
//     } catch (error) {
//       console.error("Error loading work orders by technician:", error);
//       toast.error("Failed to load work orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadTechnicians = async () => {
//     try {
//       const response = await technicianService.getAllTechnicians(0, 100);
//       setTechnicians(response.data?.content || []);
//     } catch (error) {
//       console.error("Error loading technicians:", error);
//       toast.error("Failed to load technicians");
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       if (technicianFilter) {
//         await loadWorkOrdersByTechnician();
//       } else {
//         await loadWorkOrders();
//       }
//       toast.success("Work orders refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleStatusUpdate = async (workOrderId, attemptStatus) => {
//     setUpdatingStatus(workOrderId);
//     try {
//       await workOrderService.updateAttemptStatus(workOrderId, attemptStatus);
//       toast.success(`Work order status updated to ${attemptStatus}`);
//       if (technicianFilter) {
//         await loadWorkOrdersByTechnician();
//       } else {
//         await loadWorkOrders();
//       }
//     } catch (error) {
//       console.error("Error updating work order status:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to update work order status"
//       );
//     } finally {
//       setUpdatingStatus(null);
//     }
//   };

//   const handleCancelWorkOrder = async () => {
//     if (!cancelReason.trim()) {
//       toast.error("Please provide a reason for cancellation");
//       return;
//     }

//     setCancelling(true);
//     try {
//       await workOrderService.cancelWorkOrder(selectedWorkOrder.workOrderId, {
//         cancelReason,
//       });
//       toast.success("Work order cancelled successfully");
//       setShowCancelModal(false);
//       setSelectedWorkOrder(null);
//       setCancelReason("");
//       if (technicianFilter) {
//         await loadWorkOrdersByTechnician();
//       } else {
//         await loadWorkOrders();
//       }
//     } catch (error) {
//       console.error("Error cancelling work order:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to cancel work order"
//       );
//     } finally {
//       setCancelling(false);
//     }
//   };

//   const openCancelModal = (workOrder) => {
//     setSelectedWorkOrder(workOrder);
//     setShowCancelModal(true);
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       ASSIGNED: { bg: "bg-blue-100", text: "text-blue-800", label: "Assigned" },
//       IN_PROGRESS: {
//         bg: "bg-yellow-100",
//         text: "text-yellow-800",
//         label: "In Progress",
//       },
//       COMPLETED: {
//         bg: "bg-green-100",
//         text: "text-green-800",
//         label: "Completed",
//       },
//       CANCELLED: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
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

//   // Filter work orders based on search term
//   const filteredWorkOrders = workOrders.filter(
//     (workOrder) =>
//       workOrder.workOrderId.toString().includes(searchTerm) ||
//       workOrder.workRequestId.toString().includes(searchTerm) ||
//       workOrder.technicianId.toString().includes(searchTerm) ||
//       workOrder.technicianUsername
//         ?.toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
//                 <FileText className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                 Work Orders
//               </h2>
//               <p className="text-gray-600">
//                 View and manage all work orders in the system
//               </p>
//             </div>
//             <button
//               onClick={onBack}
//               className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back
//             </button>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search by work order ID, work request ID, technician ID, or username..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={technicianFilter}
//                 onChange={(e) => setTechnicianFilter(e.target.value)}
//                 className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none min-w-48"
//               >
//                 <option value="">All Technicians</option>
//                 {technicians.map((tech) => (
//                   <option key={tech.internalUserId} value={tech.internalUserId}>
//                     {tech.firstName} {tech.lastName} (ID: {tech.internalUserId})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Work Order ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Work Request ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Technician
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Assigned At
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Completed At
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Cancel Reason
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-12 text-center">
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-lg font-medium text-gray-700">
//                           Loading work orders...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : filteredWorkOrders.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-12 text-center">
//                       <div className="text-gray-500">
//                         <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                         <p className="text-lg font-medium">
//                           No work orders found
//                         </p>
//                         <p className="text-sm">
//                           {searchTerm || technicianFilter
//                             ? "Try adjusting your search criteria"
//                             : "No work orders have been created yet"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredWorkOrders.map((workOrder, index) => (
//                     <tr
//                       key={workOrder.workOrderId}
//                       className={`hover:bg-gray-50 ${
//                         index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       }`}
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           #{workOrder.workOrderId}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">
//                           #{workOrder.workRequestId}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <User className="w-4 h-4 mr-2 text-gray-400" />
//                           <div className="text-sm text-gray-900">
//                             {workOrder.technicianId} (
//                             {workOrder.technicianUsername || "-"})
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {getStatusBadge(workOrder.status)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 flex items-center">
//                           <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                           {workOrder.assignedAt
//                             ? new Date(workOrder.assignedAt).toLocaleString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900 flex items-center">
//                           <Calendar className="w-4 h-4 mr-1 text-gray-400" />
//                           {workOrder.completedAt
//                             ? new Date(workOrder.completedAt).toLocaleString()
//                             : "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-900 max-w-xs truncate">
//                           {workOrder.cancelReason || "-"}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex flex-wrap gap-2">
//                           {/* Cancel Button */}
//                           {workOrder.status !== "COMPLETED" &&
//                             workOrder.status !== "CANCELLED" && (
//                               <button
//                                 onClick={() => openCancelModal(workOrder)}
//                                 className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-red-100 text-red-800 hover:bg-red-200 hover:shadow-md"
//                               >
//                                 <X className="w-3 h-3 mr-1 inline" />
//                                 Cancel
//                               </button>
//                             )}

//                           {/* Status Update Buttons */}
//                           {workOrder.status !== "COMPLETED" &&
//                             workOrder.status !== "CANCELLED" &&
//                             attemptStatusOptions.map((statusOption) => {
//                               const isDisabled =
//                                 updatingStatus === workOrder.workOrderId;
//                               return (
//                                 <button
//                                   key={statusOption.value}
//                                   onClick={() =>
//                                     handleStatusUpdate(
//                                       workOrder.workOrderId,
//                                       statusOption.value
//                                     )
//                                   }
//                                   disabled={isDisabled}
//                                   className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${statusOption.color} hover:shadow-md`}
//                                 >
//                                   {updatingStatus === workOrder.workOrderId ? (
//                                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current inline-block mr-1"></div>
//                                   ) : null}
//                                   {statusOption.label}
//                                 </button>
//                               );
//                             })}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Footer */}
//           {!loading && filteredWorkOrders.length > 0 && (
//             <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
//               <div className="text-sm text-gray-700">
//                 Showing{" "}
//                 <span className="font-medium">{filteredWorkOrders.length}</span>{" "}
//                 of <span className="font-medium">{workOrders.length}</span> work
//                 orders
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Cancel Work Order Modal */}
//         {showCancelModal && selectedWorkOrder && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Cancel Work Order
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowCancelModal(false);
//                     setSelectedWorkOrder(null);
//                     setCancelReason("");
//                   }}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Work Order:</strong> #{selectedWorkOrder.workOrderId}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Work Request:</strong> #
//                   {selectedWorkOrder.workRequestId}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Technician:</strong>{" "}
//                   {selectedWorkOrder.technicianUsername || "N/A"}
//                 </p>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Cancellation Reason <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                   value={cancelReason}
//                   onChange={(e) => setCancelReason(e.target.value)}
//                   placeholder="Please provide a reason for cancelling this work order..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
//                   rows={4}
//                   required
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowCancelModal(false);
//                     setSelectedWorkOrder(null);
//                     setCancelReason("");
//                   }}
//                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCancelWorkOrder}
//                   disabled={cancelling || !cancelReason.trim()}
//                   className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
//                 >
//                   {cancelling ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Cancelling...
//                     </>
//                   ) : (
//                     <>
//                       <X className="w-4 h-4 mr-2" />
//                       Cancel Work Order
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkOrderTable;

"use client";
import { useState, useEffect, useContext } from "react";
import {
  ArrowLeft,
  FileText,
  RefreshCw,
  Search,
  Calendar,
  AlertCircle,
  User,
  Filter,
  X,
} from "lucide-react";
import { workOrderService } from "../../services/WorkOrderService";
import { technicianService } from "../../services/TechnicianService";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const WorkOrderTable = ({ onBack }) => {
  const { user } = useContext(AuthContext);
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [technicianFilter, setTechnicianFilter] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const attemptStatusOptions = [
    {
      value: "NOT_ATTEMPTED",
      label: "Not Attempted",
      color: "bg-gray-100 text-gray-800",
    },
    { value: "START", label: "Start", color: "bg-blue-100 text-blue-800" },
    {
      value: "ATTEMPTED",
      label: "Attempted",
      color: "bg-yellow-100 text-yellow-800",
    },
    { value: "HOLD", label: "Hold", color: "bg-orange-100 text-orange-800" },
    { value: "FINISH", label: "Finish", color: "bg-green-100 text-green-800" },
  ];

  useEffect(() => {
    console.log("User data:", user); // Debug user object
    loadTechnicians();
    if (user) {
      const isTechnician =
        user.role?.toLowerCase() === "technician" ||
        (user.permissions &&
          user.permissions.includes("view_work_order") &&
          !user.permissions.includes("create_work_order"));
      if (isTechnician) {
        setTechnicianFilter(user.userId.toString());
        loadWorkOrdersByTechnician(user.userId);
      } else {
        loadWorkOrders();
      }
    }
  }, [user]);

  useEffect(() => {
    if (
      user &&
      technicianFilter &&
      user.role?.toLowerCase() !== "technician" &&
      !(
        user.permissions &&
        user.permissions.includes("view_work_order") &&
        !user.permissions.includes("create_work_order")
      )
    ) {
      loadWorkOrdersByTechnician();
    } else if (user && !technicianFilter) {
      loadWorkOrders();
    }
  }, [technicianFilter, user]);

  const loadWorkOrders = async () => {
    setLoading(true);
    try {
      const response = await workOrderService.getAllWorkOrders();
      setWorkOrders(response.data || []);
    } catch (error) {
      console.error("Error loading work orders:", error);
      toast.error("Failed to load work orders");
    } finally {
      setLoading(false);
    }
  };

  const loadWorkOrdersByTechnician = async (techId = technicianFilter) => {
    if (!techId) return;
    setLoading(true);
    try {
      const response = await workOrderService.getWorkOrdersByTechnician(techId);
      setWorkOrders(response.data || []);
    } catch (error) {
      console.error("Error loading work orders by technician:", error);
      toast.error("Failed to load work orders");
    } finally {
      setLoading(false);
    }
  };

  const loadTechnicians = async () => {
    try {
      const response = await technicianService.getAllTechnicians(0, 100);
      setTechnicians(response.data?.content || []);
    } catch (error) {
      console.error("Error loading technicians:", error);
      toast.error("Failed to load technicians");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (technicianFilter) {
        await loadWorkOrdersByTechnician();
      } else {
        await loadWorkOrders();
      }
      toast.success("Work orders refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleStatusUpdate = async (workOrderId, attemptStatus) => {
    setUpdatingStatus(workOrderId);
    try {
      await workOrderService.updateAttemptStatus(workOrderId, attemptStatus);
      toast.success(`Work order status updated to ${attemptStatus}`);
      if (technicianFilter) {
        await loadWorkOrdersByTechnician();
      } else {
        await loadWorkOrders();
      }
    } catch (error) {
      console.error("Error updating work order status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update work order status"
      );
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleCancelWorkOrder = async () => {
    if (!cancelReason.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }
    setCancelling(true);
    try {
      await workOrderService.cancelWorkOrder(selectedWorkOrder.workOrderId, {
        cancelReason,
      });
      toast.success("Work order cancelled successfully");
      setShowCancelModal(false);
      setSelectedWorkOrder(null);
      setCancelReason("");
      if (technicianFilter) {
        await loadWorkOrdersByTechnician();
      } else {
        await loadWorkOrders();
      }
    } catch (error) {
      console.error("Error cancelling work order:", error);
      toast.error(
        error.response?.data?.message || "Failed to cancel work order"
      );
    } finally {
      setCancelling(false);
    }
  };

  const openCancelModal = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setShowCancelModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      ASSIGNED: { bg: "bg-blue-100", text: "text-blue-800", label: "Assigned" },
      IN_PROGRESS: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "In Progress",
      },
      COMPLETED: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Completed",
      },
      CANCELLED: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
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

  const filteredWorkOrders = workOrders.filter(
    (workOrder) =>
      workOrder.workOrderId.toString().includes(searchTerm) ||
      workOrder.workRequestId.toString().includes(searchTerm) ||
      workOrder.technicianId.toString().includes(searchTerm) ||
      workOrder.technicianUsername
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const canCancelWorkOrder = (workOrder) => {
    if (!user || !user.permissions) return false;
    const isTechnician =
      user.role?.toLowerCase() === "technician" ||
      (user.permissions.includes("view_work_order") &&
        !user.permissions.includes("create_work_order"));
    if (isTechnician) {
      return (
        workOrder.workRequestType === "RM" &&
        user.permissions.includes("cancel_rm_work_order")
      );
    }
    return (
      user.permissions.includes("cancel_rm_work_order") ||
      user.permissions.includes("cancel_cm_pm_work_order")
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Work Orders
              </h2>
              <p className="text-gray-600">
                {user?.role?.toLowerCase() === "technician" ||
                (user?.permissions &&
                  user.permissions.includes("view_work_order") &&
                  !user.permissions.includes("create_work_order"))
                  ? "View your assigned work orders"
                  : "View and manage all work orders in the system"}
              </p>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by work order ID, work request ID, technician ID, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            {/* Show technician filter only for non-technicians */}
            {user &&
              user.role?.toLowerCase() !== "technician" &&
              !(
                user.permissions &&
                user.permissions.includes("view_work_order") &&
                !user.permissions.includes("create_work_order")
              ) && (
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={technicianFilter}
                    onChange={(e) => setTechnicianFilter(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none min-w-48"
                  >
                    <option value="">All Technicians</option>
                    {technicians.map((tech) => (
                      <option
                        key={tech.internalUserId}
                        value={tech.internalUserId}
                      >
                        {tech.firstName} {tech.lastName} (ID:{" "}
                        {tech.internalUserId})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Work Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Work Request ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cancel Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-lg font-medium text-gray-700">
                          Loading work orders...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : filteredWorkOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">
                          No work orders found
                        </p>
                        <p className="text-sm">
                          {searchTerm || technicianFilter
                            ? "Try adjusting your search criteria"
                            : "No work orders have been created yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredWorkOrders.map((workOrder, index) => (
                    <tr
                      key={workOrder.workOrderId}
                      className={`hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{workOrder.workOrderId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          #{workOrder.workRequestId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          <div className="text-sm text-gray-900">
                            {workOrder.technicianId} (
                            {workOrder.technicianUsername || "-"})
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(workOrder.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          {workOrder.assignedAt
                            ? new Date(workOrder.assignedAt).toLocaleString()
                            : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          {workOrder.completedAt
                            ? new Date(workOrder.completedAt).toLocaleString()
                            : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {workOrder.cancelReason || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {workOrder.status !== "COMPLETED" &&
                            workOrder.status !== "CANCELLED" &&
                            canCancelWorkOrder(workOrder) && (
                              <button
                                onClick={() => openCancelModal(workOrder)}
                                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-red-100 text-red-800 hover:bg-red-200 hover:shadow-md"
                              >
                                <X className="w-3 h-3 mr-1 inline" />
                                Cancel
                              </button>
                            )}
                          {workOrder.status !== "COMPLETED" &&
                            workOrder.status !== "CANCELLED" &&
                            attemptStatusOptions.map((statusOption) => {
                              const isDisabled =
                                updatingStatus === workOrder.workOrderId;
                              return (
                                <button
                                  key={statusOption.value}
                                  onClick={() =>
                                    handleStatusUpdate(
                                      workOrder.workOrderId,
                                      statusOption.value
                                    )
                                  }
                                  disabled={isDisabled}
                                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${statusOption.color} hover:shadow-md`}
                                >
                                  {updatingStatus === workOrder.workOrderId ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current inline-block mr-1"></div>
                                  ) : null}
                                  {statusOption.label}
                                </button>
                              );
                            })}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {!loading && filteredWorkOrders.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{filteredWorkOrders.length}</span>{" "}
                of <span className="font-medium">{workOrders.length}</span> work
                orders
              </div>
            </div>
          )}
        </div>

        {/* Cancel Work Order Modal */}
        {showCancelModal && selectedWorkOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Cancel Work Order
                </h3>
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedWorkOrder(null);
                    setCancelReason("");
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Work Order:</strong> #{selectedWorkOrder.workOrderId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Work Request:</strong> #
                  {selectedWorkOrder.workRequestId}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Technician:</strong>{" "}
                  {selectedWorkOrder.technicianUsername || "N/A"}
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Please provide a reason for cancelling this work order..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setSelectedWorkOrder(null);
                    setCancelReason("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCancelWorkOrder}
                  disabled={cancelling || !cancelReason.trim()}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {cancelling ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel Work Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkOrderTable;
