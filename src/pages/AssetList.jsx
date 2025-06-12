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
} from "lucide-react";
import { assetService } from "../services/assetService";
import { contractService } from "../services/contractService";
import { toast } from "react-toastify";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("assetName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadContracts();
    loadAssets();
  }, [currentPage, pageSize, sortBy, sortDirection, selectedContract]);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data || []);
    } catch (error) {
      console.error("Error loading contracts:", error);
      toast.error("Failed to load contracts");
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

  const handleSearch = (e) => {
    e.preventDefault();
    loadAssets();
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
    try {
      // Get the authentication token
      const token = localStorage.getItem("token");

      const response = await assetService.exportAssetsCSV();

      // Check if we got valid CSV data
      if (response.data.type === "application/json") {
        // If the API returns JSON instead of CSV, there's likely an error
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorJson = JSON.parse(reader.result);
            toast.error(
              `Export failed: ${errorJson.message || "Unknown error"}`
            );
          } catch (e) {
            toast.error("Failed to export assets: Invalid response format");
          }
        };
        reader.readAsText(response.data);
        return;
      }

      // Create blob and download
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `assets-export-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Assets exported successfully");
    } catch (error) {
      console.error("Error exporting assets:", error);

      // Better error handling
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Authentication error. Please login again.");
        } else if (error.response.status === 403) {
          toast.error("You don't have permission to export assets.");
        } else {
          toast.error(`Export failed with status: ${error.response.status}`);
        }
      } else {
        toast.error("Failed to export assets. Network error.");
      }
    }
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (asset.serialNumber &&
        asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedAssets = selectedContract
    ? filteredAssets.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
    : filteredAssets;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asset List</h1>
          <p className="text-gray-600">View and manage all assets</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/assets/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-5 h-5 mr-2" />
            Add New Asset
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedContract}
                onChange={(e) => setSelectedContract(e.target.value)}
                className="w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Contracts</option>
                {contracts.map((contract) => (
                  <option key={contract.contractId} value={contract.contractId}>
                    {contract.contractName}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Export CSV"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("assetTag")}
                >
                  <div className="flex items-center">
                    Asset Tag
                    {sortBy === "assetTag" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("assetName")}
                >
                  <div className="flex items-center">
                    Name
                    {sortBy === "assetName" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Serial Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("assetStatus")}
                >
                  <div className="flex items-center">
                    Status
                    {sortBy === "assetStatus" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedAssets.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No assets found
                  </td>
                </tr>
              ) : (
                paginatedAssets.map((asset) => (
                  <tr key={asset.assetId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {asset.assetTag}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.assetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.buildingName}, {asset.floorName}, {asset.roomName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.serialNumber || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/assets/detail/${asset.assetId}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/assets/edit/${asset.assetId}`}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(asset.assetId)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
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

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{paginatedAssets.length}</span> of{" "}
            <span className="font-medium">{filteredAssets.length}</span> assets
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 py-2">
              Page {currentPage + 1} of {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
              className="p-2 border border-gray-300 rounded-md disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetList;
