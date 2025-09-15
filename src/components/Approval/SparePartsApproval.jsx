// // "use client";

// // import { useState, useEffect } from "react";
// // import {
// //   Search,
// //   RefreshCw,
// //   Package,
// //   Calendar,
// //   User,
// //   CheckCircle,
// //   XCircle,
// // } from "lucide-react";
// // import { approvalService } from "../../services/ApprovalService";
// // import { toast } from "react-toastify";

// // const SparePartsApproval = ({ onBack }) => {
// //   const [requests, setRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [reviewingId, setReviewingId] = useState(null);
// //   const [reviewModal, setReviewModal] = useState({
// //     show: false,
// //     request: null,
// //     status: "",
// //     comment: "",
// //   });

// //   useEffect(() => {
// //     loadSparePartsRequests();
// //   }, []);

// //   const loadSparePartsRequests = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await approvalService.getAllSparePartsRequests();
// //       setRequests(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading spare parts requests:", error);
// //       toast.error("Failed to load spare parts requests");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await loadSparePartsRequests();
// //       toast.success("Spare parts requests refreshed successfully");
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 500);
// //     }
// //   };

// //   const openReviewModal = (request, status) => {
// //     setReviewModal({
// //       show: true,
// //       request,
// //       status,
// //       comment: "",
// //     });
// //   };

// //   const closeReviewModal = () => {
// //     setReviewModal({ show: false, request: null, status: "", comment: "" });
// //   };

// //   const handleReview = async () => {
// //     if (!reviewModal.comment.trim()) {
// //       toast.error("Please provide a review comment");
// //       return;
// //     }

// //     setReviewingId(reviewModal.request.requestId);
// //     try {
// //       await approvalService.reviewSparePartsRequest(
// //         reviewModal.request.requestId,
// //         reviewModal.status,
// //         reviewModal.comment
// //       );
// //       toast.success(
// //         `Spare parts request ${reviewModal.status.toLowerCase()} successfully`
// //       );
// //       await loadSparePartsRequests();
// //       closeReviewModal();
// //     } catch (error) {
// //       console.error("Error reviewing spare parts request:", error);
// //       toast.error(error.response?.data?.message || "Failed to review request");
// //     } finally {
// //       setReviewingId(null);
// //     }
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusConfig = {
// //       PENDING: {
// //         bg: "bg-yellow-100",
// //         text: "text-yellow-800",
// //         label: "Pending",
// //       },
// //       APPROVED: {
// //         bg: "bg-green-100",
// //         text: "text-green-800",
// //         label: "Approved",
// //       },
// //       REJECTED: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
// //     };

// //     const config = statusConfig[status] || {
// //       bg: "bg-gray-100",
// //       text: "text-gray-800",
// //       label: status,
// //     };

// //     return (
// //       <span
// //         className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
// //       >
// //         {config.label}
// //       </span>
// //     );
// //   };

// //   // Filter requests based on search term
// //   const filteredRequests = requests.filter(
// //     (request) =>
// //       request.requestId.toString().includes(searchTerm) ||
// //       request.workOrderId.toString().includes(searchTerm) ||
// //       request.inventoryItemName
// //         .toLowerCase()
// //         .includes(searchTerm.toLowerCase()) ||
// //       request.requestedByUsername
// //         .toLowerCase()
// //         .includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div>
// //       {/* Header */}
// //       <div className="text-center mb-8">
// //         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-md mb-4">
// //           <Package className="w-8 h-8 text-white" />
// //         </div>
// //         <h2 className="text-2xl font-bold text-gray-900 mb-2">
// //           Spare Parts Request Approval
// //         </h2>
// //         <p className="text-gray-600">
// //           Review and approve spare parts requests from technicians
// //         </p>
// //       </div>

// //       {/* Search and Actions */}
// //       <div className="flex flex-col sm:flex-row gap-4 mb-6">
// //         <div className="relative flex-1">
// //           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //           <input
// //             type="text"
// //             placeholder="Search by request ID, work order ID, item name, or technician..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //           />
// //         </div>
// //         <button
// //           onClick={handleRefresh}
// //           disabled={isRefreshing}
// //           className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
// //           title="Refresh"
// //         >
// //           <RefreshCw
// //             className={`w-5 h-5 text-gray-600 ${
// //               isRefreshing ? "animate-spin" : ""
// //             }`}
// //           />
// //         </button>
// //       </div>

// //       {/* Table */}
// //       <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Request ID
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Work Order ID
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Item Name
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Quantity
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Requested By
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Status
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Requested At
// //                 </th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                   Actions
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="8" className="px-6 py-12 text-center">
// //                     <div className="flex justify-center items-center">
// //                       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
// //                       <span className="ml-3 text-lg font-medium text-gray-700">
// //                         Loading requests...
// //                       </span>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ) : filteredRequests.length === 0 ? (
// //                 <tr>
// //                   <td colSpan="8" className="px-6 py-12 text-center">
// //                     <div className="text-gray-500">
// //                       <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
// //                       <p className="text-lg font-medium">
// //                         No spare parts requests found
// //                       </p>
// //                       <p className="text-sm">
// //                         {searchTerm
// //                           ? "Try adjusting your search criteria"
// //                           : "No requests have been submitted yet"}
// //                       </p>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 filteredRequests.map((request, index) => (
// //                   <tr
// //                     key={request.requestId}
// //                     className={`hover:bg-gray-50 ${
// //                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
// //                     }`}
// //                   >
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="text-sm font-medium text-gray-900">
// //                         #{request.requestId}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="text-sm text-gray-900">
// //                         #{request.workOrderId}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="text-sm font-medium text-gray-900">
// //                         {request.inventoryItemName}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="text-sm text-gray-900">
// //                         {request.requestedQuantity}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="flex items-center">
// //                         <User className="w-4 h-4 mr-2 text-gray-400" />
// //                         <div className="text-sm text-gray-900">
// //                           {request.requestedByUsername}
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       {getStatusBadge(request.status)}
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       <div className="text-sm text-gray-900 flex items-center">
// //                         <Calendar className="w-4 h-4 mr-1 text-gray-400" />
// //                         {request.requestedAt
// //                           ? new Date(request.requestedAt).toLocaleDateString()
// //                           : "-"}
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 whitespace-nowrap">
// //                       {request.status === "PENDING" ? (
// //                         <div className="flex space-x-2">
// //                           <button
// //                             onClick={() => openReviewModal(request, "APPROVED")}
// //                             disabled={reviewingId === request.requestId}
// //                             className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all disabled:opacity-50"
// //                             title="Approve"
// //                           >
// //                             <CheckCircle className="w-5 h-5" />
// //                           </button>
// //                           <button
// //                             onClick={() => openReviewModal(request, "REJECTED")}
// //                             disabled={reviewingId === request.requestId}
// //                             className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all disabled:opacity-50"
// //                             title="Reject"
// //                           >
// //                             <XCircle className="w-5 h-5" />
// //                           </button>
// //                         </div>
// //                       ) : (
// //                         <span className="text-sm text-gray-500">
// //                           {request.status === "APPROVED"
// //                             ? "Approved"
// //                             : "Rejected"}
// //                         </span>
// //                       )}
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Footer */}
// //         {!loading && filteredRequests.length > 0 && (
// //           <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
// //             <div className="text-sm text-gray-700">
// //               Showing{" "}
// //               <span className="font-medium">{filteredRequests.length}</span> of{" "}
// //               <span className="font-medium">{requests.length}</span> requests
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Review Modal */}
// //       {reviewModal.show && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
// //             <h3 className="text-lg font-semibold text-gray-900 mb-4">
// //               {reviewModal.status === "APPROVED" ? "Approve" : "Reject"} Request
// //             </h3>
// //             <p className="text-gray-600 mb-4">
// //               Are you sure you want to {reviewModal.status.toLowerCase()} this
// //               spare parts request?
// //             </p>
// //             <div className="mb-4">
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Review Comment *
// //               </label>
// //               <textarea
// //                 value={reviewModal.comment}
// //                 onChange={(e) =>
// //                   setReviewModal((prev) => ({
// //                     ...prev,
// //                     comment: e.target.value,
// //                   }))
// //                 }
// //                 rows={3}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Enter your review comment..."
// //               />
// //             </div>
// //             <div className="flex gap-3">
// //               <button
// //                 onClick={closeReviewModal}
// //                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleReview}
// //                 disabled={reviewingId === reviewModal.request?.requestId}
// //                 className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
// //                   reviewModal.status === "APPROVED"
// //                     ? "bg-green-600 hover:bg-green-700"
// //                     : "bg-red-600 hover:bg-red-700"
// //                 } disabled:opacity-50`}
// //               >
// //                 {reviewingId === reviewModal.request?.requestId ? (
// //                   <>
// //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
// //                     Processing...
// //                   </>
// //                 ) : (
// //                   `${reviewModal.status === "APPROVED" ? "Approve" : "Reject"}`
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SparePartsApproval;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Package,
//   RefreshCw,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
//   Filter,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUp,
//   ArrowDown,
//   Settings,
// } from "lucide-react";
// import { sparePartsService } from "../../services/sparePartsService";
// import { toast } from "react-toastify";

// const SparePartsApproval = ({ onBack }) => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [reviewingId, setReviewingId] = useState(null);
//   const [reviewModal, setReviewModal] = useState({
//     show: false,
//     request: null,
//     status: "",
//     comment: "",
//   });
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [showColumnChooser, setShowColumnChooser] = useState(false);
//   const [filters, setFilters] = useState({
//     workRequestId: "",
//     workOrderId: "",
//     itemName: "",
//     requestedQuantity: "",
//     requestedByEmployeeCode: "",
//     reviewedByEmployeeCode: "",
//     status: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [activeFilters, setActiveFilters] = useState({});
//   const [visibleColumns, setVisibleColumns] = useState({
//     requestId: true,
//     workRequestId: true,
//     workOrderId: true,
//     inventoryItemName: true,
//     requestedQuantity: true,
//     requestedByEmployeeCode: true,
//     reviewedByEmployeeCode: false,
//     status: true,
//     requestedAt: true,
//     reviewedAt: false,
//     reviewComment: false,
//   });

//   const columnDefinitions = [
//     { key: "requestId", label: "Request ID", required: true },
//     { key: "workRequestId", label: "Work Request ID", required: false },
//     { key: "workOrderId", label: "Work Order ID", required: true },
//     { key: "inventoryItemName", label: "Item Name", required: true },
//     { key: "requestedQuantity", label: "Quantity", required: true },
//     { key: "requestedByEmployeeCode", label: "Requested By", required: false },
//     { key: "reviewedByEmployeeCode", label: "Reviewed By", required: false },
//     { key: "status", label: "Status", required: true },
//     { key: "requestedAt", label: "Requested At", required: false },
//     { key: "reviewedAt", label: "Reviewed At", required: false },
//     { key: "reviewComment", label: "Review Comment", required: false },
//   ];

//   useEffect(() => {
//     loadSparePartsRequests();
//   }, [currentPage, pageSize, activeFilters, sortOrder]);

//   const loadSparePartsRequests = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (Object.keys(activeFilters).length > 0) {
//         response = await sparePartsService.getFilteredSparePartsRequests(
//           activeFilters,
//           currentPage,
//           pageSize,
//           sortOrder
//         );
//       } else {
//         response = await sparePartsService.getAllSparePartsRequests(
//           currentPage,
//           pageSize,
//           sortOrder
//         );
//       }
//       setRequests(response.data.content || []);
//       setTotalElements(response.data.totalElements || 0);
//       setTotalPages(response.data.totalPages || 0);
//       if (response.data.content?.length === 0 && currentPage === 0) {
//         toast.info("No spare parts requests found");
//       }
//     } catch (error) {
//       console.error("Error loading spare parts requests:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to load spare parts requests"
//       );
//       setRequests([]);
//       setTotalElements(0);
//       setTotalPages(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadSparePartsRequests();
//       toast.success("Spare parts requests refreshed successfully");
//     } catch (error) {
//       console.error("Error refreshing spare parts requests:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to refresh spare parts requests"
//       );
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const toggleSortOrder = () => {
//     setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
//     setCurrentPage(0);
//   };

//   const toggleColumnVisibility = (columnKey) => {
//     if (columnDefinitions.find((col) => col.key === columnKey)?.required)
//       return;
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [columnKey]: !prev[columnKey],
//     }));
//   };

//   const openReviewModal = (request, status) => {
//     setReviewModal({
//       show: true,
//       request,
//       status,
//       comment: "",
//     });
//   };

//   const closeReviewModal = () => {
//     setReviewModal({ show: false, request: null, status: "", comment: "" });
//   };

//   const handleReview = async () => {
//     if (!reviewModal.comment.trim()) {
//       toast.error("Please provide a review comment");
//       return;
//     }

//     setReviewingId(reviewModal.request.requestId);
//     try {
//       await sparePartsService.reviewSparePartsRequest(
//         reviewModal.request.requestId,
//         reviewModal.status,
//         reviewModal.comment
//       );
//       toast.success(
//         `Spare parts request ${reviewModal.status.toLowerCase()} successfully`
//       );
//       await loadSparePartsRequests();
//       closeReviewModal();
//     } catch (error) {
//       console.error("Error reviewing spare parts request:", error);
//       toast.error(error.response?.data?.message || "Failed to review request");
//     } finally {
//       setReviewingId(null);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const applyFilters = () => {
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
//       workRequestId: "",
//       workOrderId: "",
//       itemName: "",
//       requestedQuantity: "",
//       requestedByEmployeeCode: "",
//       reviewedByEmployeeCode: "",
//       status: "",
//       startDate: "",
//       endDate: "",
//     });
//     setActiveFilters({});
//     setCurrentPage(0);
//     setShowFilters(false);
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

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-[1600px] mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
//           <div className="flex justify-between items-start">
//             <div className="flex items-start space-x-4">
//               <div className="p-3 bg-blue-600 rounded-lg shadow-sm">
//                 <Package className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-900 mb-1">
//                   Spare Parts Request Approval
//                 </h2>
//                 <p className="text-slate-600 text-sm">
//                   Review and approve spare parts requests from technicians
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

//         {/* Filters and Sort */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
//           <div className="flex flex-col gap-4">
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
//                   Object.keys(activeFilters).length > 0
//                     ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
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
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//               >
//                 <Settings className="w-4 h-4 mr-2 inline" />
//                 Columns
//               </button>
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//               >
//                 <RefreshCw
//                   className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
//                 />
//               </button>
//               <button
//                 onClick={toggleSortOrder}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//               >
//                 {sortOrder === "desc" ? (
//                   <>
//                     <ArrowDown className="w-4 h-4 mr-2 inline" />
//                     Latest First
//                   </>
//                 ) : (
//                   <>
//                     <ArrowUp className="w-4 h-4 mr-2 inline" />
//                     Oldest First
//                   </>
//                 )}
//               </button>
//             </div>

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
//                       placeholder="Enter Work Request ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Work Order ID
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.workOrderId}
//                       onChange={(e) =>
//                         handleFilterChange("workOrderId", e.target.value)
//                       }
//                       placeholder="Enter Work Order ID"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Item Name
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.itemName}
//                       onChange={(e) =>
//                         handleFilterChange("itemName", e.target.value)
//                       }
//                       placeholder="Enter Item Name"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Quantity
//                     </label>
//                     <input
//                       type="number"
//                       value={filters.requestedQuantity}
//                       onChange={(e) =>
//                         handleFilterChange("requestedQuantity", e.target.value)
//                       }
//                       placeholder="Enter Quantity"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Requested By (Employee Code)
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.requestedByEmployeeCode}
//                       onChange={(e) =>
//                         handleFilterChange(
//                           "requestedByEmployeeCode",
//                           e.target.value
//                         )
//                       }
//                       placeholder="Enter Employee Code"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Reviewed By (Employee Code)
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.reviewedByEmployeeCode}
//                       onChange={(e) =>
//                         handleFilterChange(
//                           "reviewedByEmployeeCode",
//                           e.target.value
//                         )
//                       }
//                       placeholder="Enter Employee Code"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">All Statuses</option>
//                       <option value="PENDING">Pending</option>
//                       <option value="APPROVED">Approved</option>
//                       <option value="REJECTED">Rejected</option>
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
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={applyFilters}
//                     className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Apply Filters
//                   </button>
//                   <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//             )}

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
//                         className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
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
//                   {visibleColumns.requestId && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Request ID
//                     </th>
//                   )}
//                   {visibleColumns.workRequestId && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Work Request ID
//                     </th>
//                   )}
//                   {visibleColumns.workOrderId && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Work Order ID
//                     </th>
//                   )}
//                   {visibleColumns.inventoryItemName && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Item Name
//                     </th>
//                   )}
//                   {visibleColumns.requestedQuantity && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Quantity
//                     </th>
//                   )}
//                   {visibleColumns.requestedByEmployeeCode && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Requested By
//                     </th>
//                   )}
//                   {visibleColumns.reviewedByEmployeeCode && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Reviewed By
//                     </th>
//                   )}
//                   {visibleColumns.status && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Status
//                     </th>
//                   )}
//                   {visibleColumns.requestedAt && (
//                     <th
//                       className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
//                       onClick={toggleSortOrder}
//                     >
//                       <div className="flex items-center">
//                         Requested At
//                         {sortOrder === "desc" ? (
//                           <ArrowDown className="w-4 h-4 ml-1" />
//                         ) : (
//                           <ArrowUp className="w-4 h-4 ml-1" />
//                         )}
//                       </div>
//                     </th>
//                   )}
//                   {visibleColumns.reviewedAt && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Reviewed At
//                     </th>
//                   )}
//                   {visibleColumns.reviewComment && (
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Review Comment
//                     </th>
//                   )}
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={
//                         Object.values(visibleColumns).filter(Boolean).length + 1
//                       }
//                       className="px-6 py-12 text-center"
//                     >
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                         <span className="ml-3 text-sm font-medium text-slate-600">
//                           Loading spare parts requests...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : requests.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={
//                         Object.values(visibleColumns).filter(Boolean).length + 1
//                       }
//                       className="px-6 py-12 text-center"
//                     >
//                       <div className="text-slate-500">
//                         <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                         <p className="text-sm font-medium">
//                           No spare parts requests found
//                         </p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           {Object.keys(activeFilters).length > 0
//                             ? "Try adjusting your filters"
//                             : "No spare parts requests have been created yet"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   requests.map((request, index) => (
//                     <tr
//                       key={request.requestId}
//                       className={`hover:bg-slate-50 transition-colors ${
//                         index % 2 === 0 ? "bg-white" : "bg-slate-50"
//                       }`}
//                     >
//                       {visibleColumns.requestId && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-slate-900">
//                             #{request.requestId}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.workRequestId && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-900">
//                             {request.workRequestId
//                               ? `WR-${request.workRequestId}`
//                               : "-"}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.workOrderId && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-900">
//                             #{request.workOrderId}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.inventoryItemName && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-slate-900">
//                             {request.inventoryItemName || "-"}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.requestedQuantity && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-900">
//                             {request.requestedQuantity}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.requestedByEmployeeCode && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-900">
//                             {request.requestedByEmployeeCode || "-"}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.reviewedByEmployeeCode && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-900">
//                             {request.reviewedByEmployeeCode || "-"}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.status && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {getStatusBadge(request.status)}
//                         </td>
//                       )}
//                       {visibleColumns.requestedAt && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-600 flex items-center">
//                             <Calendar className="w-4 h-4 mr-1 text-slate-400" />
//                             {request.requestedAt
//                               ? new Date(
//                                   request.requestedAt
//                                 ).toLocaleDateString()
//                               : "-"}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.reviewedAt && (
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-slate-600 flex items-center">
//                             <Calendar className="w-4 h-4 mr-1 text-slate-400" />
//                             {request.reviewedAt
//                               ? new Date(
//                                   request.reviewedAt
//                                 ).toLocaleDateString()
//                               : "-"}
//                           </div>
//                         </td>
//                       )}
//                       {visibleColumns.reviewComment && (
//                         <td className="px-6 py-4">
//                           <div className="text-sm text-slate-900 max-w-xs truncate">
//                             {request.reviewComment || "-"}
//                           </div>
//                         </td>
//                       )}
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {request.status === "PENDING" ? (
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() =>
//                                 openReviewModal(request, "APPROVED")
//                               }
//                               disabled={reviewingId === request.requestId}
//                               className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all disabled:opacity-50"
//                               title="Approve"
//                             >
//                               <CheckCircle className="w-5 h-5" />
//                             </button>
//                             <button
//                               onClick={() =>
//                                 openReviewModal(request, "REJECTED")
//                               }
//                               disabled={reviewingId === request.requestId}
//                               className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all disabled:opacity-50"
//                               title="Reject"
//                             >
//                               <XCircle className="w-5 h-5" />
//                             </button>
//                           </div>
//                         ) : (
//                           <span className="text-sm text-slate-500">
//                             {request.status === "APPROVED"
//                               ? "Approved"
//                               : "Rejected"}
//                           </span>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {!loading && (
//             <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
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
//                     spare parts requests
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-600">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
//                               ? "bg-blue-600 text-white"
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
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Review Modal */}
//         {reviewModal.show && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//               <h3 className="text-lg font-semibold text-slate-900 mb-4">
//                 {reviewModal.status === "APPROVED" ? "Approve" : "Reject"} Spare
//                 Parts Request
//               </h3>
//               <p className="text-slate-600 mb-4">
//                 Are you sure you want to {reviewModal.status.toLowerCase()} this
//                 spare parts request?
//               </p>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-slate-700 mb-2">
//                   Review Comment *
//                 </label>
//                 <textarea
//                   value={reviewModal.comment}
//                   onChange={(e) =>
//                     setReviewModal((prev) => ({
//                       ...prev,
//                       comment: e.target.value,
//                     }))
//                   }
//                   rows={3}
//                   className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter your review comment..."
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={closeReviewModal}
//                   className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleReview}
//                   disabled={reviewingId === reviewModal.request?.requestId}
//                   className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
//                     reviewModal.status === "APPROVED"
//                       ? "bg-green-600 hover:bg-green-700"
//                       : "bg-red-600 hover:bg-red-700"
//                   } disabled:opacity-50`}
//                 >
//                   {reviewingId === reviewModal.request?.requestId ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     `${
//                       reviewModal.status === "APPROVED" ? "Approve" : "Reject"
//                     }`
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

// export default SparePartsApproval;

"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Package,
  RefreshCw,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Settings,
} from "lucide-react";
import { sparePartsService } from "../../services/sparePartsService";
import { toast } from "react-toastify";

const SparePartsApproval = ({ onBack }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reviewingId, setReviewingId] = useState(null);
  const [reviewModal, setReviewModal] = useState({
    show: false,
    request: null,
    status: "",
    comment: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [showColumnChooser, setShowColumnChooser] = useState(false);
  const [filters, setFilters] = useState({
    workRequestId: "",
    workOrderId: "",
    itemName: "",
    requestedQuantity: "",
    requestedByEmployeeCode: "",
    reviewedByEmployeeCode: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({
    requestId: true,
    workRequestId: true,
    workOrderId: true,
    inventoryItemName: true,
    requestedQuantity: true,
    requestedByEmployeeCode: true,
    reviewedByEmployeeCode: false,
    status: true,
    requestedAt: true,
    reviewedAt: false,
    reviewComment: false,
  });

  const columnDefinitions = [
    { key: "requestId", label: "Spare Parts Request ID", required: true },
    { key: "workRequestId", label: "Work Request ID", required: false },
    { key: "workOrderId", label: "Work Order ID", required: true },
    { key: "inventoryItemName", label: "Item Name", required: true },
    { key: "requestedQuantity", label: "Quantity", required: true },
    { key: "requestedByEmployeeCode", label: "Requested By", required: false },
    { key: "reviewedByEmployeeCode", label: "Reviewed By", required: false },
    { key: "status", label: "Status", required: true },
    { key: "requestedAt", label: "Requested At", required: false },
    { key: "reviewedAt", label: "Reviewed At", required: false },
    { key: "reviewComment", label: "Review Comment", required: false },
  ];

  useEffect(() => {
    loadSparePartsRequests();
  }, [currentPage, pageSize, activeFilters, sortOrder]);

  const loadSparePartsRequests = async () => {
    setLoading(true);
    try {
      let response;
      if (Object.keys(activeFilters).length > 0) {
        response = await sparePartsService.getFilteredSparePartsRequests(
          activeFilters,
          currentPage,
          pageSize,
          sortOrder
        );
      } else {
        response = await sparePartsService.getAllSparePartsRequests(
          currentPage,
          pageSize,
          sortOrder
        );
      }
      setRequests(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
      setTotalPages(response.data.totalPages || 0);
      if (response.data.content?.length === 0 && currentPage === 0) {
        toast.info("No spare parts requests found");
      }
    } catch (error) {
      console.error("Error loading spare parts requests:", error);
      toast.error(
        error.response?.data?.message || "Failed to load spare parts requests"
      );
      setRequests([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadSparePartsRequests();
      toast.success("Spare parts requests refreshed successfully");
    } catch (error) {
      console.error("Error refreshing spare parts requests:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to refresh spare parts requests"
      );
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setCurrentPage(0);
  };

  const toggleColumnVisibility = (columnKey) => {
    if (columnDefinitions.find((col) => col.key === columnKey)?.required)
      return;
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const openReviewModal = (request, status) => {
    setReviewModal({
      show: true,
      request,
      status,
      comment: "",
    });
  };

  const closeReviewModal = () => {
    setReviewModal({ show: false, request: null, status: "", comment: "" });
  };

  const handleReview = async () => {
    if (!reviewModal.comment.trim()) {
      toast.error("Please provide a review comment");
      return;
    }

    setReviewingId(reviewModal.request.requestId);
    try {
      await sparePartsService.reviewSparePartsRequest(
        reviewModal.request.requestId,
        reviewModal.status,
        reviewModal.comment
      );
      toast.success(
        `Spare parts request ${reviewModal.status.toLowerCase()} successfully`
      );
      await loadSparePartsRequests();
      closeReviewModal();
    } catch (error) {
      console.error("Error reviewing spare parts request:", error);
      toast.error(error.response?.data?.message || "Failed to review request");
    } finally {
      setReviewingId(null);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const cleanId = (id, prefix) => {
    if (!id) return "";
    return id.replace(new RegExp(`^${prefix}`, "i"), "").trim();
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
          acc[key] = cleanId(value, "WR-");
        } else if (key === "workOrderId") {
          acc[key] = cleanId(value, "WO-");
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
      workOrderId: "",
      itemName: "",
      requestedQuantity: "",
      requestedByEmployeeCode: "",
      reviewedByEmployeeCode: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setActiveFilters({});
    setCurrentPage(0);
    setShowFilters(false);
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

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-600 rounded-lg shadow-sm">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  Spare Parts Request Approval
                </h2>
                <p className="text-slate-600 text-sm">
                  Review and approve spare parts requests from technicians
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

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                  Object.keys(activeFilters).length > 0
                    ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
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
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2 inline" />
                Columns
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={toggleSortOrder}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
                      placeholder="Enter Work Request ID (e.g., WR-123)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Work Order ID
                    </label>
                    <input
                      type="text"
                      value={filters.workOrderId}
                      onChange={(e) =>
                        handleFilterChange("workOrderId", e.target.value)
                      }
                      placeholder="Enter Work Order ID (e.g., WO-57)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={filters.itemName}
                      onChange={(e) =>
                        handleFilterChange("itemName", e.target.value)
                      }
                      placeholder="Enter Item Name"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={filters.requestedQuantity}
                      onChange={(e) =>
                        handleFilterChange("requestedQuantity", e.target.value)
                      }
                      placeholder="Enter Quantity"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Requested By (Employee Code)
                    </label>
                    <input
                      type="text"
                      value={filters.requestedByEmployeeCode}
                      onChange={(e) =>
                        handleFilterChange(
                          "requestedByEmployeeCode",
                          e.target.value
                        )
                      }
                      placeholder="Enter Employee Code"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Reviewed By (Employee Code)
                    </label>
                    <input
                      type="text"
                      value={filters.reviewedByEmployeeCode}
                      onChange={(e) =>
                        handleFilterChange(
                          "reviewedByEmployeeCode",
                          e.target.value
                        )
                      }
                      placeholder="Enter Employee Code"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Statuses</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
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
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

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
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
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
                  {visibleColumns.requestId && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Spare Parts Request ID
                    </th>
                  )}
                  {visibleColumns.workRequestId && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Work Request ID
                    </th>
                  )}
                  {visibleColumns.workOrderId && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Work Order ID
                    </th>
                  )}
                  {visibleColumns.inventoryItemName && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Item Name
                    </th>
                  )}
                  {visibleColumns.requestedQuantity && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Quantity
                    </th>
                  )}
                  {visibleColumns.requestedByEmployeeCode && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Requested By
                    </th>
                  )}
                  {visibleColumns.reviewedByEmployeeCode && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Reviewed By
                    </th>
                  )}
                  {visibleColumns.status && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                  )}
                  {visibleColumns.requestedAt && (
                    <th
                      className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
                      onClick={toggleSortOrder}
                    >
                      <div className="flex items-center">
                        Requested At
                        {sortOrder === "desc" ? (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.reviewedAt && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Reviewed At
                    </th>
                  )}
                  {visibleColumns.reviewComment && (
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Review Comment
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={
                        Object.values(visibleColumns).filter(Boolean).length + 1
                      }
                      className="px-6 py-12 text-center"
                    >
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-600">
                          Loading spare parts requests...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        Object.values(visibleColumns).filter(Boolean).length + 1
                      }
                      className="px-6 py-12 text-center"
                    >
                      <div className="text-slate-500">
                        <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm font-medium">
                          No spare parts requests found
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {Object.keys(activeFilters).length > 0
                            ? "Try adjusting your filters"
                            : "No spare parts requests have been created yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  requests.map((request, index) => (
                    <tr
                      key={request.requestId}
                      className={`hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      {visibleColumns.requestId && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            SR-{request.requestId.toString().padStart(2, "0")}
                          </div>
                        </td>
                      )}
                      {visibleColumns.workRequestId && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {request.workRequestId
                              ? `WR-${request.workRequestId}`
                              : "-"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.workOrderId && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            WO-{request.workOrderId.toString().padStart(2, "0")}
                          </div>
                        </td>
                      )}
                      {visibleColumns.inventoryItemName && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {request.inventoryItemName || "-"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.requestedQuantity && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {request.requestedQuantity}
                          </div>
                        </td>
                      )}
                      {visibleColumns.requestedByEmployeeCode && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {request.requestedByEmployeeCode || "-"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.reviewedByEmployeeCode && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">
                            {request.reviewedByEmployeeCode || "-"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.status && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(request.status)}
                        </td>
                      )}
                      {visibleColumns.requestedAt && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                            {request.requestedAt
                              ? new Date(
                                  request.requestedAt
                                ).toLocaleDateString()
                              : "-"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.reviewedAt && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-slate-400" />
                            {request.reviewedAt
                              ? new Date(
                                  request.reviewedAt
                                ).toLocaleDateString()
                              : "-"}
                          </div>
                        </td>
                      )}
                      {visibleColumns.reviewComment && (
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-900 max-w-xs truncate">
                            {request.reviewComment || "-"}
                          </div>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {request.status === "PENDING" ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                openReviewModal(request, "APPROVED")
                              }
                              disabled={reviewingId === request.requestId}
                              className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all disabled:opacity-50"
                              title="Approve"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() =>
                                openReviewModal(request, "REJECTED")
                              }
                              disabled={reviewingId === request.requestId}
                              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all disabled:opacity-50"
                              title="Reject"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-500">
                            {request.status === "APPROVED"
                              ? "Approved"
                              : "Rejected"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && (
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
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
                    spare parts requests
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-600">Show:</label>
                    <select
                      value={pageSize}
                      onChange={(e) =>
                        handlePageSizeChange(Number(e.target.value))
                      }
                      className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                              ? "bg-blue-600 text-white"
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
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Review Modal */}
        {reviewModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {reviewModal.status === "APPROVED" ? "Approve" : "Reject"} Spare
                Parts Request
              </h3>
              <p className="text-slate-600 mb-4">
                Are you sure you want to {reviewModal.status.toLowerCase()} this
                spare parts request?
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Review Comment *
                </label>
                <textarea
                  value={reviewModal.comment}
                  onChange={(e) =>
                    setReviewModal((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your review comment..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeReviewModal}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReview}
                  disabled={reviewingId === reviewModal.request?.requestId}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    reviewModal.status === "APPROVED"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } disabled:opacity-50`}
                >
                  {reviewingId === reviewModal.request?.requestId ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `${
                      reviewModal.status === "APPROVED" ? "Approve" : "Reject"
                    }`
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

export default SparePartsApproval;
