// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// const ContractDetail = () => {
//   const { contractId } = useParams();
//   const navigate = useNavigate();
//   const [contract, setContract] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContract = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await contractService.getContractById(contractId);
//         console.log("Contract details:", response.data); // Debug log
//         setContract(response.data);
//       } catch (err) {
//         console.error("Error fetching contract:", err);
//         setError("Failed to load contract details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

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

//   if (!contract) {
//     return (
//       <div className="text-center p-6 bg-yellow-100 text-yellow-700 rounded-lg max-w-7xl mx-auto">
//         Contract not found.
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">
//           <button
//             onClick={() => navigate("/contracts/list")}
//             className="flex items-center bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-4"
//           >
//             <ArrowLeftIcon className="h-5 w-5 mr-1" />
//             Back to List
//           </button>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {contract.contractName}
//           </h2>
//         </div>
//         <button
//           onClick={() => navigate("/contracts", { state: { contractId } })}
//           className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Edit Contract
//         </button>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">
//           Contract Details
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Company
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.company && contract.company.companyName
//                 ? contract.company.companyName
//                 : "Unknown Company"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Project Location
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.projectLocation || "N/A"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Project Type
//             </label>
//             <p className="mt-1 text-gray-800">{contract.projectType}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Start Date
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.startDate
//                 ? new Date(contract.startDate).toLocaleDateString()
//                 : "N/A"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               End Date
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.endDate
//                 ? new Date(contract.endDate).toLocaleDateString()
//                 : "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {contract.contractServices && contract.contractServices.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Services</h3>
//           {contract.contractServices.map((service, serviceIndex) => (
//             <div
//               key={serviceIndex}
//               className="bg-blue-50 p-4 rounded-lg shadow-sm mb-4"
//             >
//               <h4 className="text-lg font-semibold text-blue-800 mb-2">
//                 Service {serviceIndex + 1}:{" "}
//                 {service.service?.serviceName || "N/A"}
//               </h4>
//               {service.contractSubServices &&
//                 service.contractSubServices.length > 0 && (
//                   <div className="ml-4">
//                     <h5 className="text-md font-medium text-gray-700 mb-2">
//                       Sub-Services
//                     </h5>
//                     {service.contractSubServices.map(
//                       (subService, subServiceIndex) => (
//                         <div
//                           key={subServiceIndex}
//                           className="bg-gray-50 p-4 rounded-lg shadow-sm mb-2"
//                         >
//                           <h6 className="text-sm font-medium text-gray-700">
//                             Sub-Service {subServiceIndex + 1}:{" "}
//                             {subService.subService?.subServiceName || "N/A"}
//                           </h6>
//                           {subService.contractServiceScopes &&
//                             subService.contractServiceScopes.length > 0 && (
//                               <div className="ml-4 mt-2">
//                                 <h6 className="text-sm font-medium text-gray-600">
//                                   Scopes
//                                 </h6>
//                                 {subService.contractServiceScopes.map(
//                                   (scope, scopeIndex) => (
//                                     <div
//                                       key={scopeIndex}
//                                       className="bg-white p-3 rounded-lg shadow-sm mt-2"
//                                     >
//                                       <p className="text-sm text-gray-600">
//                                         <strong>Scope {scopeIndex + 1}:</strong>{" "}
//                                         {scope.scope?.scopeName || "N/A"}
//                                       </p>
//                                       <p className="text-sm text-gray-600">
//                                         <strong>SLA Type:</strong>{" "}
//                                         {scope.slaType?.slaTypeName || "N/A"}
//                                       </p>
//                                       <p className="text-sm text-gray-600">
//                                         <strong>Priority:</strong>{" "}
//                                         {scope.priority?.priorityName || "N/A"}
//                                       </p>
//                                       <p className="text-sm text-gray-600">
//                                         <strong>Duty Hours:</strong>{" "}
//                                         {scope.dutyHours || "N/A"}
//                                       </p>
//                                       <p className="text-sm text-gray-600">
//                                         <strong>Off-Duty Hours:</strong>{" "}
//                                         {scope.offDutyHours || "N/A"}
//                                       </p>
//                                     </div>
//                                   )
//                                 )}
//                               </div>
//                             )}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContractDetail;

//2222222222
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// const ContractDetail = () => {
//   const { contractId } = useParams();
//   const navigate = useNavigate();
//   const [contract, setContract] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContract = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await contractService.getContractById(contractId);
//         console.log("Contract details:", response.data);
//         setContract(response.data);
//       } catch (err) {
//         console.error("Error fetching contract:", err);
//         setError("Failed to load contract details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

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

//   if (!contract) {
//     return (
//       <div className="text-center p-6 bg-yellow-100 text-yellow-700 rounded-lg max-w-7xl mx-auto">
//         Contract not found.
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">
//           <button
//             onClick={() => navigate("/contracts/list")}
//             className="flex items-center bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-4"
//           >
//             <ArrowLeftIcon className="h-5 w-5 mr-1" />
//             Back to List
//           </button>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {contract.contractName}
//           </h2>
//         </div>
//         <button
//           onClick={() => navigate("/contracts", { state: { contractId } })}
//           className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Edit Contract
//         </button>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">
//           Contract Details
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Contract ID
//             </label>
//             <p className="mt-1 text-gray-800">{contract.contractId}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Company
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.companyName || "Unknown Company"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Project Location
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.projectLocation || "N/A"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Project Type
//             </label>
//             <p className="mt-1 text-gray-800">{contract.projectType}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Start Date
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.startDate
//                 ? new Date(contract.startDate).toLocaleDateString()
//                 : "N/A"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               End Date
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.endDate
//                 ? new Date(contract.endDate).toLocaleDateString()
//                 : "N/A"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Status
//             </label>
//             <p className="mt-1 text-gray-800">{contract.status || "N/A"}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Created At
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.createdAt
//                 ? new Date(contract.createdAt).toLocaleString()
//                 : "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {contract.services && contract.services.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Services</h3>
//           {contract.services.map((service, serviceIndex) => (
//             <div
//               key={service.contractServiceId}
//               className="bg-blue-50 p-4 rounded-lg shadow-sm mb-4"
//             >
//               <h4 className="text-lg font-semibold text-blue-800 mb-2">
//                 Service {serviceIndex + 1}: {service.serviceName}
//               </h4>
//               {service.subServices && service.subServices.length > 0 && (
//                 <div className="ml-4">
//                   <h5 className="text-md font-medium text-gray-700 mb-2">
//                     Sub-Services
//                   </h5>
//                   {service.subServices.map((subService, subServiceIndex) => (
//                     <div
//                       key={subService.contractSubServiceId}
//                       className="bg-gray-50 p-4 rounded-lg shadow-sm mb-2"
//                     >
//                       <h6 className="text-sm font-medium text-gray-700">
//                         Sub-Service {subServiceIndex + 1}:{" "}
//                         {subService.subServiceName}
//                       </h6>
//                       {subService.serviceScopes &&
//                         subService.serviceScopes.length > 0 && (
//                           <div className="ml-4 mt-2">
//                             <h6 className="text-sm font-medium text-gray-600">
//                               Scopes
//                             </h6>
//                             {subService.serviceScopes.map(
//                               (scope, scopeIndex) => (
//                                 <div
//                                   key={scope.contractScopeId}
//                                   className="bg-white p-3 rounded-lg shadow-sm mt-2"
//                                 >
//                                   <p className="text-sm text-gray-600">
//                                     <strong>Scope {scopeIndex + 1}:</strong>{" "}
//                                     {scope.scopeName}
//                                   </p>
//                                   <p className="text-sm text-gray-600">
//                                     <strong>SLA Type:</strong>{" "}
//                                     {scope.slaTypeName}
//                                   </p>
//                                   <p className="text-sm text-gray-600">
//                                     <strong>Priority:</strong>{" "}
//                                     {scope.priorityName}
//                                   </p>
//                                   <p className="text-sm text-gray-600">
//                                     <strong>Duty Hours:</strong>{" "}
//                                     {scope.dutyHours}
//                                   </p>
//                                   <p className="text-sm text-gray-600">
//                                     <strong>Off-Duty Hours:</strong>{" "}
//                                     {scope.offDutyHours}
//                                   </p>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContractDetail;

//3333333333
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// const ContractDetail = () => {
//   const { contractId } = useParams();
//   const navigate = useNavigate();
//   const [contract, setContract] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContract = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await contractService.getContractById(contractId);
//         setContract(response.data);
//       } catch (err) {
//         console.error("Error fetching contract:", err);
//         setError("Failed to load contract details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

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

//   if (!contract) {
//     return (
//       <div className="text-center p-6 bg-yellow-100 text-yellow-700 rounded-lg max-w-7xl mx-auto">
//         Contract not found.
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">
//           <button
//             onClick={() => navigate("/contracts/list")}
//             className="flex items-center bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-4"
//           >
//             <ArrowLeftIcon className="h-5 w-5 mr-1" />
//             Back to List
//           </button>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {contract.contractName}
//           </h2>
//         </div>
//         <button
//           onClick={() => navigate("/contracts", { state: { contractId } })}
//           className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Edit Contract
//         </button>
//       </div>

//       <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">
//           Contract Details
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Contract ID
//             </label>
//             <p className="mt-1 text-gray-800">{contract.contractId}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Company
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.companyName || "Unknown Company"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Project Location
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.projectLocation || "N/A"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Project Type
//             </label>
//             <p className="mt-1 text-gray-800">{contract.projectType}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Start Date
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.startDate
//                 ? new Date(contract.startDate).toLocaleDateString()
//                 : "N/A"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               End Date
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.endDate
//                 ? new Date(contract.endDate).toLocaleDateString()
//                 : "N/A"}
//             </p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Status
//             </label>
//             <p className="mt-1 text-gray-800">{contract.status || "N/A"}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-600">
//               Created At
//             </label>
//             <p className="mt-1 text-gray-800">
//               {contract.createdAt
//                 ? new Date(contract.createdAt).toLocaleString()
//                 : "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {contract.services && contract.services.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">Services</h3>
//           {contract.services.map((service, serviceIndex) => (
//             <div
//               key={service.contractServiceId || service.serviceId}
//               className="bg-blue-50 p-4 rounded-lg shadow-sm mb-4"
//             >
//               <h4 className="text-lg font-semibold text-blue-800 mb-2">
//                 Service {serviceIndex + 1}: {service.serviceName}
//               </h4>
//               {service.subServices && service.subServices.length > 0 && (
//                 <div className="ml-4">
//                   <h5 className="text-md font-medium text-gray-700 mb-2">
//                     Sub-Services
//                   </h5>
//                   {service.subServices.map((subService, subServiceIndex) => (
//                     <div
//                       key={
//                         subService.contractSubServiceId ||
//                         subService.subServiceId
//                       }
//                       className="bg-gray-50 p-4 rounded-lg shadow-sm mb-2"
//                     >
//                       <h6 className="text-sm font-medium text-gray-700">
//                         Sub-Service {subServiceIndex + 1}:{" "}
//                         {subService.subServiceName}
//                       </h6>
//                       {subService.serviceScopes &&
//                         subService.serviceScopes.length > 0 && (
//                           <div className="ml-4 mt-2">
//                             <h6 className="text-sm font-medium text-gray-600">
//                               Scopes
//                             </h6>
//                             {subService.serviceScopes.map(
//                               (scope, scopeIndex) => (
//                                 <div
//                                   key={scope.scopeId}
//                                   className="ml-2 mt-1 text-sm text-gray-600"
//                                 >
//                                   <p>
//                                     Scope {scopeIndex + 1}: {scope.scopeName}
//                                     {scope.slaTypeName && scope.priorityName
//                                       ? ` (${scope.slaTypeName}, ${scope.priorityName})`
//                                       : ""}
//                                   </p>
//                                 </div>
//                               )
//                             )}
//                           </div>
//                         )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {contract.employeeTimings && contract.employeeTimings.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Employee Timings
//           </h3>
//           <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//                   <th className="p-3">Day</th>
//                   <th className="p-3">Duty Start</th>
//                   <th className="p-3">Duty End</th>
//                   <th className="p-3">Off-Duty Start</th>
//                   <th className="p-3">Off-Duty End</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {contract.employeeTimings.map((timing, index) => (
//                   <tr
//                     key={index}
//                     className="border-t hover:bg-gray-100 transition-colors"
//                   >
//                     <td className="p-3">{timing.dayOfWeek}</td>
//                     <td className="p-3">{timing.dutyStartTime}</td>
//                     <td className="p-3">{timing.dutyEndTime}</td>
//                     <td className="p-3">{timing.offDutyStartTime}</td>
//                     <td className="p-3">{timing.offDutyEndTime}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {contract.slaRules && contract.slaRules.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             SLA Rules
//           </h3>
//           <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
//                   <th className="p-3">SLA Type</th>
//                   <th className="p-3">Priority</th>
//                   <th className="p-3">Response Time (Hours)</th>
//                   <th className="p-3">Resolution Time (Hours)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {contract.slaRules.map((rule, index) => (
//                   <tr
//                     key={index}
//                     className="border-t hover:bg-gray-100 transition-colors"
//                   >
//                     <td className="p-3">{rule.slaTypeName || "N/A"}</td>
//                     <td className="p-3">{rule.priorityName || "N/A"}</td>
//                     <td className="p-3">{rule.responseTimeHours}</td>
//                     <td className="p-3">{rule.resolutionTimeHours}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContractDetail;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contractService } from "../services/contractService";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ContractDetail = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [slaTypes, setSlaTypes] = useState([]);
  const [priorityLevels, setPriorityLevels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch contract and SLA types
        const [contractRes, slaTypesRes] = await Promise.all([
          contractService.getContractById(contractId),
          contractService.getSlaTypes(),
        ]);

        const contractData = contractRes.data;
        const slaTypesData = Array.isArray(slaTypesRes.data)
          ? slaTypesRes.data
          : [];

        // Fetch priorities for each SLA type
        const priorityLevelsMap = {};
        await Promise.all(
          slaTypesData.map(async (slaType) => {
            try {
              const prioritiesRes = await contractService.getPriorityLevels(
                slaType.slaTypeId.toString()
              );
              priorityLevelsMap[slaType.slaTypeId] = Array.isArray(
                prioritiesRes.data
              )
                ? prioritiesRes.data
                : [];
            } catch (err) {
              priorityLevelsMap[slaType.slaTypeId] = [];
            }
          })
        );

        // Map slaTypeName and priorityName to slaRules
        const enhancedContract = {
          ...contractData,
          slaRules: (contractData.slaRules || []).map((rule) => ({
            ...rule,
            slaTypeName:
              slaTypesData.find((sla) => sla.slaTypeId === rule.slaTypeId)
                ?.slaTypeName || "N/A",
            priorityName:
              priorityLevelsMap[rule.slaTypeId]?.find(
                (p) => p.priorityId === rule.priorityId
              )?.priorityName || "N/A",
          })),
        };

        setContract(enhancedContract);
        setSlaTypes(slaTypesData);
        setPriorityLevels(priorityLevelsMap);
      } catch (err) {
        console.error("Error fetching contract:", err);
        setError("Failed to load contract details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [contractId]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg max-w-7xl mx-auto">
        {error}
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="text-center p-6 bg-yellow-100 text-yellow-700 rounded-lg max-w-7xl mx-auto">
        Contract not found.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/contracts/list")}
            className="flex items-center bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to List
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {contract.contractName}
          </h2>
        </div>
        <button
          onClick={() => navigate("/contracts", { state: { contractId } })}
          className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Contract
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Contract Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contract ID
            </label>
            <p className="mt-1 text-gray-800">{contract.contractId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Company
            </label>
            <p className="mt-1 text-gray-800">
              {contract.companyName || "Unknown Company"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Project Location
            </label>
            <p className="mt-1 text-gray-800">
              {contract.projectLocation || "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Project Type
            </label>
            <p className="mt-1 text-gray-800">{contract.projectType}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Start Date
            </label>
            <p className="mt-1 text-gray-800">
              {contract.startDate
                ? new Date(contract.startDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              End Date
            </label>
            <p className="mt-1 text-gray-800">
              {contract.endDate
                ? new Date(contract.endDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <p className="mt-1 text-gray-800">{contract.status || "N/A"}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Created At
            </label>
            <p className="mt-1 text-gray-800">
              {contract.createdAt
                ? new Date(contract.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {contract.services && contract.services.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Services</h3>
          {contract.services.map((service, serviceIndex) => (
            <div
              key={
                service.contractServiceId ||
                `service-${service.serviceId}-${serviceIndex}`
              }
              className="bg-blue-50 p-4 rounded-lg shadow-sm mb-4"
            >
              <h4 className="text-lg font-semibold text-blue-800 mb-2">
                Service {serviceIndex + 1}: {service.serviceName || "N/A"}
              </h4>
              {service.subServices && service.subServices.length > 0 && (
                <div className="ml-4">
                  <h5 className="text-md font-medium text-gray-700 mb-2">
                    Sub-Services
                  </h5>
                  {service.subServices.map((subService, subServiceIndex) => (
                    <div
                      key={
                        subService.contractSubServiceId ||
                        `subService-${subService.subServiceId}-${subServiceIndex}`
                      }
                      className="bg-gray-50 p-4 rounded-lg shadow-sm mb-2"
                    >
                      <h6 className="text-sm font-medium text-gray-700">
                        Sub-Service {subServiceIndex + 1}:{" "}
                        {subService.subServiceName || "N/A"}
                      </h6>
                      {subService.serviceScopes &&
                        subService.serviceScopes.length > 0 && (
                          <div className="ml-4 mt-2">
                            <h6 className="text-sm font-medium text-gray-600">
                              Scopes
                            </h6>
                            {subService.serviceScopes.map(
                              (scope, scopeIndex) => (
                                <div
                                  key={scope.scopeId || `scope-${scopeIndex}`}
                                  className="ml-2 mt-1 text-sm text-gray-600"
                                >
                                  <p>
                                    Scope {scopeIndex + 1}:{" "}
                                    {scope.scopeName || "N/A"}
                                    {scope.slaTypeName && scope.priorityName
                                      ? ` (${scope.slaTypeName}, ${scope.priorityName})`
                                      : ""}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {contract.employeeTimings && contract.employeeTimings.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Employee Timings
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="p-3">Day</th>
                  <th className="p-3">Duty Start</th>
                  <th className="p-3">Duty End</th>
                  <th className="p-3">Off-Duty Start</th>
                  <th className="p-3">Off-Duty End</th>
                </tr>
              </thead>
              <tbody>
                {contract.employeeTimings.map((timing, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-3">{timing.dayOfWeek}</td>
                    <td className="p-3">{timing.dutyStartTime}</td>
                    <td className="p-3">{timing.dutyEndTime}</td>
                    <td className="p-3">{timing.offDutyStartTime}</td>
                    <td className="p-3">{timing.offDutyEndTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {contract.slaRules && contract.slaRules.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            SLA Rules
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  <th className="p-3">SLA Type</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Response Time (Hours)</th>
                  <th className="p-3">Resolution Time (Hours)</th>
                </tr>
              </thead>
              <tbody>
                {contract.slaRules.map((rule, index) => (
                  <tr
                    key={rule.slaRuleId || `slaRule-${index}`}
                    className="border-t hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-3">{rule.slaTypeName}</td>
                    <td className="p-3">{rule.priorityName}</td>
                    <td className="p-3">{rule.responseTimeHours || "N/A"}</td>
                    <td className="p-3">{rule.resolutionTimeHours || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractDetail;
