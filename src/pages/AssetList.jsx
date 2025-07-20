// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   Download,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("assetName");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         setAssets(response.data || []);
//         setTotalPages(Math.ceil((response.data || []).length / pageSize));
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     loadAssets();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredAssets = assets.filter(
//     (asset) =>
//       asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (asset.serialNumber &&
//         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Asset List</h1>
//           <p className="text-gray-600">View and manage all assets</p>
//         </div>
//         <div className="flex gap-3">
//           <Link
//             to="/assets/create"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Eye className="w-5 h-5 mr-2" />
//             Add New Asset
//           </Link>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 flex-1">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search assets..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={selectedContract}
//                 onChange={(e) => setSelectedContract(e.target.value)}
//                 className="w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//               >
//                 <option value="">All Contracts</option>
//                 {contracts.map((contract) => (
//                   <option key={contract.contractId} value={contract.contractId}>
//                     {contract.contractName}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>
//             <button
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Export"
//             >
//               <Download className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetTag")}
//                 >
//                   <div className="flex items-center">
//                     Asset Tag
//                     {sortBy === "assetTag" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetName")}
//                 >
//                   <div className="flex items-center">
//                     Name
//                     {sortBy === "assetName" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Location
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Serial Number
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetStatus")}
//                 >
//                   <div className="flex items-center">
//                     Status
//                     {sortBy === "assetStatus" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                       <span className="ml-2">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginatedAssets.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="px-6 py-4 text-center text-gray-500"
//                   >
//                     No assets found
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedAssets.map((asset) => (
//                   <tr key={asset.assetId} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {asset.assetTag}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.assetName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.buildingName}, {asset.floorName}, {asset.roomName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.serialNumber || "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                         ${
//                           asset.assetStatus === "ACTIVE"
//                             ? "bg-green-100 text-green-800"
//                             : asset.assetStatus === "UNDER_MAINTENANCE"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : asset.assetStatus === "DECOMMISSIONED"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {asset.assetStatus.replace("_", " ")}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <Link
//                           to={`/assets/${asset.assetId}`}
//                           className="text-blue-600 hover:text-blue-900"
//                           title="View"
//                         >
//                           <Eye className="w-5 h-5" />
//                         </Link>
//                         <Link
//                           to={`/assets/edit/${asset.assetId}`}
//                           className="text-green-600 hover:text-green-900"
//                           title="Edit"
//                         >
//                           <Edit className="w-5 h-5" />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(asset.assetId)}
//                           className="text-red-600 hover:text-red-900"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">{paginatedAssets.length}</span> of{" "}
//             <span className="font-medium">{filteredAssets.length}</span> assets
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 0}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <span className="px-4 py-2">
//               Page {currentPage + 1} of {Math.max(1, totalPages)}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages - 1}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetList;
// ////23333333333333333333333
// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   Download,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("assetName");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         setAssets(response.data || []);
//         setTotalPages(Math.ceil((response.data || []).length / pageSize));
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     loadAssets();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredAssets = assets.filter(
//     (asset) =>
//       asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (asset.serialNumber &&
//         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Asset List</h1>
//           <p className="text-gray-600">View and manage all assets</p>
//         </div>
//         <div className="flex gap-3">
//           <Link
//             to="/assets/create"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Eye className="w-5 h-5 mr-2" />
//             Add New Asset
//           </Link>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 flex-1">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search assets..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={selectedContract}
//                 onChange={(e) => setSelectedContract(e.target.value)}
//                 className="w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//               >
//                 <option value="">All Contracts</option>
//                 {contracts.map((contract) => (
//                   <option key={contract.contractId} value={contract.contractId}>
//                     {contract.contractName}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>
//             <button
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Export"
//             >
//               <Download className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetTag")}
//                 >
//                   <div className="flex items-center">
//                     Asset Tag
//                     {sortBy === "assetTag" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetName")}
//                 >
//                   <div className="flex items-center">
//                     Name
//                     {sortBy === "assetName" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Location
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Serial Number
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetStatus")}
//                 >
//                   <div className="flex items-center">
//                     Status
//                     {sortBy === "assetStatus" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                       <span className="ml-2">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginatedAssets.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="px-6 py-4 text-center text-gray-500"
//                   >
//                     No assets found
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedAssets.map((asset) => (
//                   <tr key={asset.assetId} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {asset.assetTag}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.assetName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.buildingName}, {asset.floorName}, {asset.roomName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.serialNumber || "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                         ${
//                           asset.assetStatus === "ACTIVE"
//                             ? "bg-green-100 text-green-800"
//                             : asset.assetStatus === "UNDER_MAINTENANCE"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : asset.assetStatus === "DECOMMISSIONED"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {asset.assetStatus.replace("_", " ")}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <Link
//                           to={`/assets/${asset.assetId}`}
//                           className="text-blue-600 hover:text-blue-900"
//                           title="View"
//                         >
//                           <Eye className="w-5 h-5" />
//                         </Link>
//                         <Link
//                           to={`/assets/edit/${asset.assetId}`}
//                           className="text-green-600 hover:text-green-900"
//                           title="Edit"
//                         >
//                           <Edit className="w-5 h-5" />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(asset.assetId)}
//                           className="text-red-600 hover:text-red-900"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">{paginatedAssets.length}</span> of{" "}
//             <span className="font-medium">{filteredAssets.length}</span> assets
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 0}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <span className="px-4 py-2">
//               Page {currentPage + 1} of {Math.max(1, totalPages)}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages - 1}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetList;
// //1111111
// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   Download,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("assetName");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         setAssets(response.data || []);
//         setTotalPages(Math.ceil((response.data || []).length / pageSize));
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     loadAssets();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       const response = await assetService.exportAssetsCSV();

//       // Create blob and download
//       const blob = new Blob([response.data], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `assets-export-${
//         new Date().toISOString().split("T")[0]
//       }.csv`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       toast.success("Assets exported successfully");
//     } catch (error) {
//       console.error("Error exporting assets:", error);
//       toast.error("Failed to export assets");
//     }
//   };

//   const filteredAssets = assets.filter(
//     (asset) =>
//       asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (asset.serialNumber &&
//         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Asset List</h1>
//           <p className="text-gray-600">View and manage all assets</p>
//         </div>
//         <div className="flex gap-3">
//           <Link
//             to="/assets/create"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Eye className="w-5 h-5 mr-2" />
//             Add New Asset
//           </Link>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 flex-1">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search assets..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={selectedContract}
//                 onChange={(e) => setSelectedContract(e.target.value)}
//                 className="w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//               >
//                 <option value="">All Contracts</option>
//                 {contracts.map((contract) => (
//                   <option key={contract.contractId} value={contract.contractId}>
//                     {contract.contractName}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>
//             <button
//               onClick={handleExport}
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Export CSV"
//             >
//               <Download className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetTag")}
//                 >
//                   <div className="flex items-center">
//                     Asset Tag
//                     {sortBy === "assetTag" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetName")}
//                 >
//                   <div className="flex items-center">
//                     Name
//                     {sortBy === "assetName" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Location
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Serial Number
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetStatus")}
//                 >
//                   <div className="flex items-center">
//                     Status
//                     {sortBy === "assetStatus" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                       <span className="ml-2">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginatedAssets.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="px-6 py-4 text-center text-gray-500"
//                   >
//                     No assets found
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedAssets.map((asset) => (
//                   <tr key={asset.assetId} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {asset.assetTag}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.assetName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.buildingName}, {asset.floorName}, {asset.roomName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.serialNumber || "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                         ${
//                           asset.assetStatus === "ACTIVE"
//                             ? "bg-green-100 text-green-800"
//                             : asset.assetStatus === "UNDER_MAINTENANCE"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : asset.assetStatus === "DECOMMISSIONED"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {asset.assetStatus.replace("_", " ")}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <Link
//                           to={`/assets/detail/${asset.assetId}`}
//                           className="text-blue-600 hover:text-blue-900"
//                           title="View"
//                         >
//                           <Eye className="w-5 h-5" />
//                         </Link>
//                         <Link
//                           to={`/assets/edit/${asset.assetId}`}
//                           className="text-green-600 hover:text-green-900"
//                           title="Edit"
//                         >
//                           <Edit className="w-5 h-5" />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(asset.assetId)}
//                           className="text-red-600 hover:text-red-900"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">{paginatedAssets.length}</span> of{" "}
//             <span className="font-medium">{filteredAssets.length}</span> assets
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 0}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <span className="px-4 py-2">
//               Page {currentPage + 1} of {Math.max(1, totalPages)}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages - 1}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetList;

//change now
// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   Download,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("assetName");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         setAssets(response.data || []);
//         setTotalPages(Math.ceil((response.data || []).length / pageSize));
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     loadAssets();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleExport = async () => {
//     try {
//       // Get the authentication token
//       const token = localStorage.getItem("token");

//       const response = await assetService.exportAssetsCSV();

//       // Check if we got valid CSV data
//       if (response.data.type === "application/json") {
//         // If the API returns JSON instead of CSV, there's likely an error
//         const reader = new FileReader();
//         reader.onload = () => {
//           try {
//             const errorJson = JSON.parse(reader.result);
//             toast.error(
//               `Export failed: ${errorJson.message || "Unknown error"}`
//             );
//           } catch (e) {
//             toast.error("Failed to export assets: Invalid response format");
//           }
//         };
//         reader.readAsText(response.data);
//         return;
//       }

//       // Create blob and download
//       const blob = new Blob([response.data], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `assets-export-${
//         new Date().toISOString().split("T")[0]
//       }.csv`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       toast.success("Assets exported successfully");
//     } catch (error) {
//       console.error("Error exporting assets:", error);

//       // Better error handling
//       if (error.response) {
//         if (error.response.status === 401) {
//           toast.error("Authentication error. Please login again.");
//         } else if (error.response.status === 403) {
//           toast.error("You don't have permission to export assets.");
//         } else {
//           toast.error(`Export failed with status: ${error.response.status}`);
//         }
//       } else {
//         toast.error("Failed to export assets. Network error.");
//       }
//     }
//   };

//   const filteredAssets = assets.filter(
//     (asset) =>
//       asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (asset.serialNumber &&
//         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Asset List</h1>
//           <p className="text-gray-600">View and manage all assets</p>
//         </div>
//         <div className="flex gap-3">
//           <Link
//             to="/assets/create"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Eye className="w-5 h-5 mr-2" />
//             Add New Asset
//           </Link>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 flex-1">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search assets..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={selectedContract}
//                 onChange={(e) => setSelectedContract(e.target.value)}
//                 className="w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//               >
//                 <option value="">All Contracts</option>
//                 {contracts.map((contract) => (
//                   <option key={contract.contractId} value={contract.contractId}>
//                     {contract.contractName}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>
//             <button
//               onClick={handleExport}
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Export CSV"
//             >
//               <Download className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetTag")}
//                 >
//                   <div className="flex items-center">
//                     Asset Tag
//                     {sortBy === "assetTag" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetName")}
//                 >
//                   <div className="flex items-center">
//                     Name
//                     {sortBy === "assetName" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Location
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Serial Number
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetStatus")}
//                 >
//                   <div className="flex items-center">
//                     Status
//                     {sortBy === "assetStatus" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                       <span className="ml-2">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginatedAssets.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="px-6 py-4 text-center text-gray-500"
//                   >
//                     No assets found
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedAssets.map((asset) => (
//                   <tr key={asset.assetId} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {asset.assetTag}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.assetName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.buildingName}, {asset.floorName}, {asset.roomName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.serialNumber || "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                         ${
//                           asset.assetStatus === "ACTIVE"
//                             ? "bg-green-100 text-green-800"
//                             : asset.assetStatus === "UNDER_MAINTENANCE"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : asset.assetStatus === "DECOMMISSIONED"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {asset.assetStatus.replace("_", " ")}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <Link
//                           to={`/assets/detail/${asset.assetId}`}
//                           className="text-blue-600 hover:text-blue-900"
//                           title="View"
//                         >
//                           <Eye className="w-5 h-5" />
//                         </Link>
//                         <Link
//                           to={`/assets/edit/${asset.assetId}`}
//                           className="text-green-600 hover:text-green-900"
//                           title="Edit"
//                         >
//                           <Edit className="w-5 h-5" />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(asset.assetId)}
//                           className="text-red-600 hover:text-red-900"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">{paginatedAssets.length}</span> of{" "}
//             <span className="font-medium">{filteredAssets.length}</span> assets
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 0}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <span className="px-4 py-2">
//               Page {currentPage + 1} of {Math.max(1, totalPages)}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages - 1}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetList;

// "use client";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Filter,
//   RefreshCw,
//   Download,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { toast } from "react-toastify";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [sortBy, setSortBy] = useState("assetName");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [exporting, setExporting] = useState(false);

//   useEffect(() => {
//     loadContracts();
//     loadAssets();
//   }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadAssets = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (selectedContract) {
//         response = await assetService.getAssetsByContract(selectedContract);
//         setAssets(response.data || []);
//         setTotalPages(Math.ceil((response.data || []).length / pageSize));
//       } else {
//         const pageable = {
//           page: currentPage,
//           size: pageSize,
//           sort: `${sortBy},${sortDirection}`,
//         };
//         response = await assetService.getAllAssets(pageable);
//         setAssets(response.data.content || []);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadAssets();
//       toast.success("Assets refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     loadAssets();
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this asset?")) {
//       try {
//         await assetService.deleteAsset(id);
//         toast.success("Asset deleted successfully");
//         loadAssets();
//       } catch (error) {
//         console.error("Error deleting asset:", error);
//         toast.error("Failed to delete asset");
//       }
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("asc");
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleExport = async () => {
//     if (!selectedContract) {
//       toast.error("Please select a contract to export assets");
//       return;
//     }

//     setExporting(true);
//     try {
//       const response = await assetService.exportAssetsCSV(selectedContract);

//       // Create blob and download
//       const blob = new Blob([response.data], { type: "text/csv" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `assets-contract-${selectedContract}-${
//         new Date().toISOString().split("T")[0]
//       }.csv`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       toast.success("Assets exported successfully");
//     } catch (error) {
//       console.error("Error exporting assets:", error);
//       toast.error("Failed to export assets. Please try again.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   const filteredAssets = assets.filter(
//     (asset) =>
//       asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (asset.serialNumber &&
//         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginatedAssets = selectedContract
//     ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
//     : filteredAssets;

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Asset List</h1>
//           <p className="text-gray-600">View and manage all assets</p>
//         </div>
//         <div className="flex gap-3">
//           <Link
//             to="/assets/create"
//             className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Eye className="w-5 h-5 mr-2" />
//             Add New Asset
//           </Link>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//           <div className="flex flex-col sm:flex-row gap-4 flex-1">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search assets..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={selectedContract}
//                 onChange={(e) => setSelectedContract(e.target.value)}
//                 className="w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
//               >
//                 <option value="">All Contracts</option>
//                 {contracts.map((contract) => (
//                   <option key={contract.contractId} value={contract.contractId}>
//                     {contract.contractName}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               title="Refresh"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>
//             <button
//               onClick={handleExport}
//               disabled={exporting || !selectedContract}
//               className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
//               title="Export CSV"
//             >
//               {exporting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Exporting...
//                 </>
//               ) : (
//                 <>
//                   <Download className="w-4 h-4 mr-2" />
//                   Export CSV
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetTag")}
//                 >
//                   <div className="flex items-center">
//                     Asset Tag
//                     {sortBy === "assetTag" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetName")}
//                 >
//                   <div className="flex items-center">
//                     Name
//                     {sortBy === "assetName" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Location
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Serial Number
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort("assetStatus")}
//                 >
//                   <div className="flex items-center">
//                     Status
//                     {sortBy === "assetStatus" && (
//                       <span className="ml-1">
//                         {sortDirection === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                   </div>
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-4 text-center">
//                     <div className="flex justify-center items-center">
//                       <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                       <span className="ml-2">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : paginatedAssets.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="px-6 py-4 text-center text-gray-500"
//                   >
//                     No assets found
//                   </td>
//                 </tr>
//               ) : (
//                 paginatedAssets.map((asset) => (
//                   <tr key={asset.assetId} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {asset.assetTag}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.assetName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.buildingName}, {asset.floorName}, {asset.roomName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {asset.serialNumber || "-"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                         ${
//                           asset.assetStatus === "ACTIVE"
//                             ? "bg-green-100 text-green-800"
//                             : asset.assetStatus === "UNDER_MAINTENANCE"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : asset.assetStatus === "DECOMMISSIONED"
//                             ? "bg-red-100 text-red-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {asset.assetStatus.replace("_", " ")}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <Link
//                           to={`/assets/detail/${asset.assetId}`}
//                           className="text-blue-600 hover:text-blue-900"
//                           title="View"
//                         >
//                           <Eye className="w-5 h-5" />
//                         </Link>
//                         <Link
//                           to={`/assets/edit/${asset.assetId}`}
//                           className="text-green-600 hover:text-green-900"
//                           title="Edit"
//                         >
//                           <Edit className="w-5 h-5" />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(asset.assetId)}
//                           className="text-red-600 hover:text-red-900"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex items-center justify-between mt-6">
//           <div className="text-sm text-gray-700">
//             Showing{" "}
//             <span className="font-medium">{paginatedAssets.length}</span> of{" "}
//             <span className="font-medium">{filteredAssets.length}</span> assets
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 0}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             <span className="px-4 py-2">
//               Page {currentPage + 1} of {Math.max(1, totalPages)}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage >= totalPages - 1}
//               className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetList;

"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  MapPin,
  Building,
  X,
  ArrowLeft,
} from "lucide-react";
import { assetService } from "../services/assetService";
import { contractService } from "../services/contractService";
import { propertyFlowService } from "../services/propertyFlowService";
import { toast } from "react-toastify";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);

  // Location filter states
  const [zones, setZones] = useState([]);
  const [subZones, setSubZones] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedSubZone, setSelectedSubZone] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");

  useEffect(() => {
    loadContracts();
    loadAssets();
  }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

  useEffect(() => {
    if (selectedContract) {
      loadZones();
    } else {
      setZones([]);
      setSubZones([]);
      setBuildings([]);
      setSelectedZone("");
      setSelectedSubZone("");
      setSelectedBuilding("");
    }
  }, [selectedContract]);

  useEffect(() => {
    if (selectedContract && selectedZone) {
      loadSubZones();
    } else {
      setSubZones([]);
      setBuildings([]);
      setSelectedSubZone("");
      setSelectedBuilding("");
    }
  }, [selectedZone]);

  useEffect(() => {
    if (selectedContract && selectedSubZone) {
      loadBuildings();
    } else {
      setBuildings([]);
      setSelectedBuilding("");
    }
  }, [selectedSubZone]);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data || []);
    } catch (error) {
      console.error("Error loading contracts:", error);
      toast.error("Failed to load contracts");
    }
  };

  const loadZones = async () => {
    if (!selectedContract) return;
    try {
      const response = await propertyFlowService.getAllZonesByContract(
        selectedContract
      );
      setZones(response.data || []);
    } catch (error) {
      console.error("Error loading zones:", error);
    }
  };

  const loadSubZones = async () => {
    if (!selectedContract || !selectedZone) return;
    try {
      const response = await propertyFlowService.getAllSubZonesByContract(
        selectedContract
      );
      setSubZones(
        (response.data || []).filter(
          (sz) => sz.zoneId.toString() === selectedZone.toString()
        )
      );
    } catch (error) {
      console.error("Error loading sub zones:", error);
    }
  };

  const loadBuildings = async () => {
    if (!selectedContract || !selectedSubZone) return;
    try {
      const response = await propertyFlowService.getAllBuildingsByContract(
        selectedContract
      );
      setBuildings(
        (response.data || []).filter(
          (b) => b.subZoneId.toString() === selectedSubZone.toString()
        )
      );
    } catch (error) {
      console.error("Error loading buildings:", error);
    }
  };

  const loadAssets = async () => {
    setLoading(true);
    try {
      let response;
      if (selectedContract) {
        response = await assetService.getAssetsByContract(selectedContract);
        setAssets(response.data || []);
        setTotalPages(Math.ceil((response.data || []).length / pageSize));
      } else {
        const pageable = {
          page: currentPage,
          size: pageSize,
          sort: `${sortBy},${sortDirection}`,
        };
        response = await assetService.getAllAssets(pageable);
        setAssets(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error("Error loading assets:", error);
      toast.error("Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadAssets();
      toast.success("Assets refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        await assetService.deleteAsset(id);
        toast.success("Asset deleted successfully");
        loadAssets();
      } catch (error) {
        console.error("Error deleting asset:", error);
        toast.error("Failed to delete asset");
      }
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleExport = async () => {
    if (!selectedContract) {
      toast.error("Please select a contract to export assets");
      return;
    }

    setExporting(true);
    try {
      const response = await assetService.exportAssetsCSV(selectedContract);
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `assets-contract-${selectedContract}-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Assets exported successfully");
    } catch (error) {
      console.error("Error exporting assets:", error);
      toast.error("Failed to export assets. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const clearLocationFilters = () => {
    setSelectedZone("");
    setSelectedSubZone("");
    setSelectedBuilding("");
    setLocationSearch("");
  };

  // Enhanced filtering logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.serialNumber &&
        asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation =
      !locationSearch ||
      asset.zoneName?.toLowerCase().includes(locationSearch.toLowerCase()) ||
      asset.subZoneName?.toLowerCase().includes(locationSearch.toLowerCase()) ||
      asset.buildingName
        ?.toLowerCase()
        .includes(locationSearch.toLowerCase()) ||
      asset.villaApartmentName
        ?.toLowerCase()
        .includes(locationSearch.toLowerCase()) ||
      asset.floorName?.toLowerCase().includes(locationSearch.toLowerCase()) ||
      asset.roomName?.toLowerCase().includes(locationSearch.toLowerCase());

    const matchesZone =
      !selectedZone || asset.zoneId?.toString() === selectedZone;
    const matchesSubZone =
      !selectedSubZone || asset.subZoneId?.toString() === selectedSubZone;
    const matchesBuilding =
      !selectedBuilding || asset.buildingId?.toString() === selectedBuilding;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesZone &&
      matchesSubZone &&
      matchesBuilding
    );
  });

  const paginatedAssets = selectedContract
    ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    : filteredAssets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                to="/assets"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Asset List</h1>
                <p className="text-gray-600 mt-1">
                  View and manage all assets in your inventory
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to="/assets/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Asset
              </Link>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search and Basic Filters */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search assets by name, tag, or serial number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="w-full sm:w-56 pl-10 pr-8 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                >
                  <option value="">All Contracts</option>
                  {contracts.map((contract) => (
                    <option
                      key={contract.contractId}
                      value={contract.contractId}
                    >
                      {contract.contractName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLocationFilter(!showLocationFilter)}
                className={`inline-flex items-center px-4 py-3 rounded-xl border-2 transition-all ${
                  showLocationFilter
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Location Filter
              </button>

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

              <button
                onClick={handleExport}
                disabled={exporting || !selectedContract}
                className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                title="Export CSV"
              >
                {exporting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Export CSV
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Location Filters */}
          {showLocationFilter && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  Location-Based Filtering
                </h3>
                <button
                  onClick={clearLocationFilters}
                  className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by location name..."
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  disabled={!selectedContract}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                >
                  <option value="">All Zones</option>
                  {zones.map((zone) => (
                    <option key={zone.zoneId} value={zone.zoneId}>
                      {zone.zoneName}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedSubZone}
                  onChange={(e) => setSelectedSubZone(e.target.value)}
                  disabled={!selectedZone}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                >
                  <option value="">All Sub Zones</option>
                  {subZones.map((subZone) => (
                    <option key={subZone.subZoneId} value={subZone.subZoneId}>
                      {subZone.subZoneName}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedBuilding}
                  onChange={(e) => setSelectedBuilding(e.target.value)}
                  disabled={!selectedSubZone}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                >
                  <option value="">All Buildings</option>
                  {buildings.map((building) => (
                    <option
                      key={building.buildingId}
                      value={building.buildingId}
                    >
                      {building.buildingName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("assetTag")}
                  >
                    <div className="flex items-center">
                      Asset Tag
                      {sortBy === "assetTag" && (
                        <span className="ml-2 text-blue-600">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("assetName")}
                  >
                    <div className="flex items-center">
                      Name
                      {sortBy === "assetName" && (
                        <span className="ml-2 text-blue-600">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
                    Serial Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("assetStatus")}
                  >
                    <div className="flex items-center">
                      Status
                      {sortBy === "assetStatus" && (
                        <span className="ml-2 text-blue-600">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Created Date
                      {sortBy === "createdAt" && (
                        <span className="ml-2 text-blue-600">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                  >
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
                          Loading assets...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedAssets.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No assets found</p>
                        <p className="text-sm">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedAssets.map((asset, index) => (
                    <tr
                      key={asset.assetId}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {asset.assetTag}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {asset.assetName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                            {asset.buildingName}, {asset.floorName},{" "}
                            {asset.roomName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {asset.serialNumber || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                            asset.assetStatus === "ACTIVE"
                              ? "bg-green-100 text-green-800"
                              : asset.assetStatus === "UNDER_MAINTENANCE"
                              ? "bg-yellow-100 text-yellow-800"
                              : asset.assetStatus === "DECOMMISSIONED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {asset.assetStatus.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {asset.createdAt
                            ? new Date(asset.createdAt).toLocaleDateString()
                            : "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <Link
                            to={`/assets/detail/${asset.assetId}`}
                            className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <Link
                            to={`/assets/edit/${asset.assetId}`}
                            className="p-2 text-green-600 hover:text-green-900 hover:bg-green-100 rounded-lg transition-all"
                            title="Edit Asset"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(asset.assetId)}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-all"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
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
              <span className="font-medium">{paginatedAssets.length}</span> of{" "}
              <span className="font-medium">{filteredAssets.length}</span>{" "}
              assets
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

export default AssetList;
