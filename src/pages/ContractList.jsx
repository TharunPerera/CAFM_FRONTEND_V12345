// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";

// const ContractList = () => {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await contractService.getAllContracts();
//         console.log("Contracts fetched:", response.data); // Debug log
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
//     if (window.confirm("Are you sure you want to delete this contract?")) {
//       try {
//         await contractService.deleteContract(contractId);
//         setContracts(
//           contracts.filter((contract) => contract.contractId !== contractId)
//         );
//         alert("Contract deleted successfully");
//       } catch (err) {
//         console.error("Error deleting contract:", err);
//         alert("Failed to delete contract. Please try again.");
//       }
//     }
//   };

//   const handleUpdate = (contractId) => {
//     navigate("/contracts", { state: { contractId } });
//   };

//   const handleViewDetails = (contractId) => {
//     navigate(`/contracts/${contractId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg max-w-7xl mx-auto">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">Contract List</h2>
//         <button
//           onClick={() => navigate("/contracts")}
//           className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Create New Contract
//         </button>
//       </div>
//       {contracts.length === 0 ? (
//         <p className="text-gray-600 text-center">No contracts found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Contract Name
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Company
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Project Location
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Project Type
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Start Date
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   End Date
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {contracts.map((contract) => (
//                 <tr key={contract.contractId} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.contractName}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.company && contract.company.companyName
//                       ? contract.company.companyName
//                       : "Unknown Company"}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.projectLocation || "N/A"}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.projectType}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.startDate
//                       ? new Date(contract.startDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.endDate
//                       ? new Date(contract.endDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="py-3 px-4 text-sm border-b">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleUpdate(contract.contractId)}
//                         className="flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         title="Update Contract"
//                       >
//                         <PencilIcon className="h-5 w-5" />
//                       </button>
//                       <button
//                         onClick={() => handleViewDetails(contract.contractId)}
//                         className="flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                         title="View Details"
//                       >
//                         <EyeIcon className="h-5 w-5" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(contract.contractId)}
//                         className="flex items-center bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                         title="Delete Contract"
//                       >
//                         <TrashIcon className="h-5 w-5" />
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

///22222222222
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/24/outline";

// const ContractList = () => {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContracts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await contractService.getAllContracts();
//         console.log("Contracts fetched:", response.data);
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
//     if (window.confirm("Are you sure you want to delete this contract?")) {
//       try {
//         await contractService.deleteContract(contractId);
//         setContracts(
//           contracts.filter((contract) => contract.contractId !== contractId)
//         );
//         alert("Contract deleted successfully");
//       } catch (err) {
//         console.error("Error deleting contract:", err);
//         alert("Failed to delete contract. Please try again.");
//       }
//     }
//   };

//   const handleUpdate = (contractId) => {
//     navigate("/contracts", { state: { contractId } });
//   };

//   const handleViewDetails = (contractId) => {
//     navigate(`/contracts/${contractId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg max-w-7xl mx-auto">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">Contract List</h2>
//         <button
//           onClick={() => navigate("/contracts")}
//           className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Create New Contract
//         </button>
//       </div>
//       {contracts.length === 0 ? (
//         <p className="text-gray-600 text-center">No contracts found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Contract Name
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Company
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Project Location
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Project Type
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Start Date
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   End Date
//                 </th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {contracts.map((contract) => (
//                 <tr key={contract.contractId} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.contractName}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.companyName || "Unknown Company"}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.projectLocation || "N/A"}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.projectType}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.startDate
//                       ? new Date(contract.startDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-gray-600 border-b">
//                     {contract.endDate
//                       ? new Date(contract.endDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="py-3 px-4 text-sm border-b">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleUpdate(contract.contractId)}
//                         className="flex items-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         title="Update Contract"
//                       >
//                         <PencilIcon className="h-5 w-5" />
//                       </button>
//                       <button
//                         onClick={() => handleViewDetails(contract.contractId)}
//                         className="flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                         title="View Details"
//                       >
//                         <EyeIcon className="h-5 w-5" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(contract.contractId)}
//                         className="flex items-center bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//                         title="Delete Contract"
//                       >
//                         <TrashIcon className="h-5 w-5" />
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

////44444
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// const ContractList = () => {
//   const navigate = useNavigate();
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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
//     } catch (err) {
//       console.error("Error deleting contract:", err);
//       setError("Failed to delete contract. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg max-w-7xl mx-auto">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Contracts</h2>
//         <button
//           onClick={() => navigate("/contracts")}
//           className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Create New Contract
//         </button>
//       </div>

//       {contracts.length === 0 ? (
//         <div className="text-center p-6 bg-gray-100 rounded-lg">
//           <p className="text-gray-600">
//             No contracts found. Create a new contract to get started.
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-gray-50 rounded-lg">
//             <thead>
//               <tr className="bg-blue-100 text-left text-sm font-semibold text-gray-700">
//                 <th className="p-4">Contract Name</th>
//                 <th className="p-4">Company</th>
//                 <th className="p-4">Project Type</th>
//                 <th className="p-4">Start Date</th>
//                 <th className="p-4">End Date</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contracts.map((contract) => (
//                 <tr
//                   key={contract.contractId}
//                   className="border-t hover:bg-blue-50 transition-colors"
//                 >
//                   <td className="p-4">{contract.contractName}</td>
//                   <td className="p-4">{contract.companyName || "N/A"}</td>
//                   <td className="p-4">{contract.projectType}</td>
//                   <td className="p-4">
//                     {contract.startDate
//                       ? new Date(contract.startDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="p-4">
//                     {contract.endDate
//                       ? new Date(contract.endDate).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="p-4">{contract.status || "N/A"}</td>
//                   <td className="p-4 flex space-x-2">
//                     <button
//                       onClick={() =>
//                         navigate(`/contracts/${contract.contractId}`)
//                       }
//                       className="text-blue-600 hover:text-blue-800"
//                       title="View Details"
//                     >
//                       <EyeIcon className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() =>
//                         navigate("/contracts", {
//                           state: { contractId: contract.contractId },
//                         })
//                       }
//                       className="text-green-600 hover:text-green-800"
//                       title="Edit Contract"
//                     >
//                       <PencilIcon className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(contract.contractId)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete Contract"
//                     >
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
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
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ContractList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(
    location.state?.success || null
  );

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

    fetchContracts();
  }, []);

  const handleDelete = async (contractId) => {
    if (!window.confirm("Are you sure you want to delete this contract?"))
      return;

    try {
      await contractService.deleteContract(contractId);
      setContracts(
        contracts.filter((contract) => contract.contractId !== contractId)
      );
      setSuccessMessage("Contract deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error deleting contract:", err);
      setError("Failed to delete contract. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto my-12 shadow-lg">
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">Contracts</h2>
        <button
          onClick={() => navigate("/contracts")}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          Create New Contract
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-sm flex items-center">
          <svg
            className="w-5 h-5 mr-2"
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
          {successMessage}
        </div>
      )}

      {contracts.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-sm">
          <p className="text-gray-600">
            No contracts found. Create a new contract to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                  Contract Name
                </th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                  Company
                </th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                  Project Type
                </th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                  Start Date
                </th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                  End Date
                </th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contracts.map((contract) => (
                <tr key={contract.contractId} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {contract.contractName}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {contract.companyName || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {contract.projectType}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {contract.startDate
                      ? new Date(contract.startDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {contract.endDate
                      ? new Date(contract.endDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {contract.status || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/contracts/${contract.contractId}`)
                        }
                        className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/contracts/update/${contract.contractId}`)
                        }
                        className="flex items-center px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors"
                        title="Update Contract"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(contract.contractId)}
                        className="flex items-center px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors"
                        title="Delete Contract"
                      >
                        <TrashIcon className="h-4 w-4 mr-1" />
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
    </div>
  );
};

export default ContractList;
