// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// const ContractDetail = () => {
//   const { contractId } = useParams();
//   const navigate = useNavigate();
//   const [contract, setContract] = useState(null);
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContract = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch contract and SLA types
//         const [contractRes, slaTypesRes] = await Promise.all([
//           contractService.getContractById(contractId),
//           contractService.getSlaTypes(),
//         ]);

//         const contractData = contractRes.data;
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         // Fetch priorities for each SLA type
//         const priorityLevelsMap = {};
//         await Promise.all(
//           slaTypesData.map(async (slaType) => {
//             try {
//               const prioritiesRes = await contractService.getPriorityLevels(
//                 slaType.slaTypeId.toString()
//               );
//               priorityLevelsMap[slaType.slaTypeId] = Array.isArray(
//                 prioritiesRes.data
//               )
//                 ? prioritiesRes.data
//                 : [];
//             } catch (err) {
//               priorityLevelsMap[slaType.slaTypeId] = [];
//             }
//           })
//         );

//         // Map slaTypeName and priorityName to slaRules
//         const enhancedContract = {
//           ...contractData,
//           slaRules: (contractData.slaRules || []).map((rule) => ({
//             ...rule,
//             slaTypeName:
//               slaTypesData.find((sla) => sla.slaTypeId === rule.slaTypeId)
//                 ?.slaTypeName || "N/A",
//             priorityName:
//               priorityLevelsMap[rule.slaTypeId]?.find(
//                 (p) => p.priorityId === rule.priorityId
//               )?.priorityName || "N/A",
//           })),
//         };

//         setContract(enhancedContract);
//         setSlaTypes(slaTypesData);
//         setPriorityLevels(priorityLevelsMap);
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
//               key={
//                 service.contractServiceId ||
//                 `service-${service.serviceId}-${serviceIndex}`
//               }
//               className="bg-blue-50 p-4 rounded-lg shadow-sm mb-4"
//             >
//               <h4 className="text-lg font-semibold text-blue-800 mb-2">
//                 Service {serviceIndex + 1}: {service.serviceName || "N/A"}
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
//                         `subService-${subService.subServiceId}-${subServiceIndex}`
//                       }
//                       className="bg-gray-50 p-4 rounded-lg shadow-sm mb-2"
//                     >
//                       <h6 className="text-sm font-medium text-gray-700">
//                         Sub-Service {subServiceIndex + 1}:{" "}
//                         {subService.subServiceName || "N/A"}
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
//                                   key={scope.scopeId || `scope-${scopeIndex}`}
//                                   className="ml-2 mt-1 text-sm text-gray-600"
//                                 >
//                                   <p>
//                                     Scope {scopeIndex + 1}:{" "}
//                                     {scope.scopeName || "N/A"}
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
//                     key={rule.slaRuleId || `slaRule-${index}`}
//                     className="border-t hover:bg-gray-100 transition-colors"
//                   >
//                     <td className="p-3">{rule.slaTypeName}</td>
//                     <td className="p-3">{rule.priorityName}</td>
//                     <td className="p-3">{rule.responseTimeHours || "N/A"}</td>
//                     <td className="p-3">{rule.resolutionTimeHours || "N/A"}</td>
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

// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import {
//   ArrowLeftIcon,
//   BuildingOfficeIcon,
//   CalendarIcon,
//   ClockIcon,
//   DocumentTextIcon,
//   CogIcon,
//   ChartBarIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const ContractDetail = () => {
//   const { contractId } = useParams();
//   const navigate = useNavigate();
//   const [contract, setContract] = useState(null);
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSection, setActiveSection] = useState("overview");

//   useEffect(() => {
//     const fetchContract = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch contract and SLA types
//         const [contractRes, slaTypesRes] = await Promise.all([
//           contractService.getContractById(contractId),
//           contractService.getSlaTypes(),
//         ]);

//         const contractData = contractRes.data;
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         // Fetch priorities for each SLA type
//         const priorityLevelsMap = {};
//         await Promise.all(
//           slaTypesData.map(async (slaType) => {
//             try {
//               const prioritiesRes = await contractService.getPriorityLevels(
//                 slaType.slaTypeId.toString()
//               );
//               priorityLevelsMap[slaType.slaTypeId] = Array.isArray(
//                 prioritiesRes.data
//               )
//                 ? prioritiesRes.data
//                 : [];
//             } catch (err) {
//               priorityLevelsMap[slaType.slaTypeId] = [];
//             }
//           })
//         );

//         // Map slaTypeName and priorityName to slaRules
//         const enhancedContract = {
//           ...contractData,
//           slaRules: (contractData.slaRules || []).map((rule) => ({
//             ...rule,
//             slaTypeName:
//               slaTypesData.find((sla) => sla.slaTypeId === rule.slaTypeId)
//                 ?.slaTypeName || "N/A",
//             priorityName:
//               priorityLevelsMap[rule.slaTypeId]?.find(
//                 (p) => p.priorityId === rule.priorityId
//               )?.priorityName || "N/A",
//           })),
//         };

//         setContract(enhancedContract);
//         setSlaTypes(slaTypesData);
//         setPriorityLevels(priorityLevelsMap);
//       } catch (err) {
//         console.error("Error fetching contract:", err);
//         setError("Failed to load contract details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

//   // Group SLA rules by service scope
//   const groupSlaRulesByScope = () => {
//     const grouped = {};

//     if (contract.services) {
//       contract.services.forEach((service) => {
//         if (service.subServices) {
//           service.subServices.forEach((subService) => {
//             if (subService.serviceScopes) {
//               subService.serviceScopes.forEach((scope) => {
//                 const scopeKey = `${service.serviceName}-${subService.subServiceName}-${scope.scopeName}`;
//                 const relatedRules = contract.slaRules.filter(
//                   (rule) =>
//                     // This is a simplified matching - you might need to adjust based on your data structure
//                     rule.scopeId === scope.scopeId ||
//                     rule.scopeName === scope.scopeName
//                 );

//                 if (relatedRules.length > 0) {
//                   grouped[scopeKey] = {
//                     serviceName: service.serviceName,
//                     subServiceName: subService.subServiceName,
//                     scopeName: scope.scopeName,
//                     rules: relatedRules,
//                     totalRules: relatedRules.length,
//                   };
//                 }
//               });
//             }
//           });
//         }
//       });
//     }

//     return grouped;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
//           <div className="relative mb-6">
//             <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <DocumentTextIcon className="w-6 h-6 text-blue-600 animate-pulse" />
//             </div>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">
//             Loading Contract Details
//           </h3>
//           <p className="text-gray-600">
//             Please wait while we fetch the contract information...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg
//               className="w-8 h-8 text-red-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-gray-800 mb-2">
//             Error Loading Contract
//           </h3>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!contract) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
//           <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <InformationCircleIcon className="w-8 h-8 text-yellow-600" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-800 mb-2">
//             Contract Not Found
//           </h3>
//           <p className="text-gray-600 mb-6">
//             The requested contract could not be found.
//           </p>
//           <button
//             onClick={() => navigate("/contracts/list")}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//           >
//             Back to Contracts
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const sections = [
//     { id: "overview", label: "Overview", icon: DocumentTextIcon },
//     { id: "services", label: "Services & SLA Rules", icon: CogIcon },
//     { id: "timings", label: "Working Hours", icon: ClockIcon },
//   ];

//   const groupedSlaRules = groupSlaRulesByScope();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <button
//                 onClick={() => navigate("/contracts/list")}
//                 className="flex items-center bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-3 rounded-xl transition-all duration-200 mr-6 shadow-lg hover:shadow-xl"
//               >
//                 <ArrowLeftIcon className="h-5 w-5 mr-2" />
//                 Back to List
//               </button>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                   {contract.contractName}
//                 </h1>
//                 <div className="flex items-center mt-2 space-x-4">
//                   <span className="flex items-center text-gray-600">
//                     <BuildingOfficeIcon className="w-4 h-4 mr-1" />
//                     {contract.companyName || "Unknown Company"}
//                   </span>
//                   <span className="flex items-center text-gray-600">
//                     <CalendarIcon className="w-4 h-4 mr-1" />
//                     {contract.projectType}
//                   </span>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       contract.status === "ACTIVE"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {contract.status || "DRAFT"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
//           <nav className="flex space-x-8 px-8">
//             {sections.map((section) => {
//               const Icon = section.icon;
//               return (
//                 <button
//                   key={section.id}
//                   className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center ${
//                     activeSection === section.id
//                       ? "border-blue-500 text-blue-600 bg-blue-50"
//                       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                   }`}
//                   onClick={() => setActiveSection(section.id)}
//                 >
//                   <Icon className="w-4 h-4 mr-2" />
//                   {section.label}
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           {activeSection === "overview" && (
//             <div className="space-y-8">
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                   <DocumentTextIcon className="w-6 h-6 mr-3 text-blue-600" />
//                   Contract Information
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                     <label className="block text-sm font-semibold text-gray-600 mb-2">
//                       Contract ID
//                     </label>
//                     <p className="text-lg font-medium text-gray-800">
//                       #{contract.contractId}
//                     </p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                     <label className="block text-sm font-semibold text-gray-600 mb-2">
//                       Company
//                     </label>
//                     <p className="text-lg font-medium text-gray-800">
//                       {contract.companyName || "Unknown Company"}
//                     </p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                     <label className="block text-sm font-semibold text-gray-600 mb-2">
//                       Project Location
//                     </label>
//                     <p className="text-lg font-medium text-gray-800">
//                       {contract.projectLocation || "Not specified"}
//                     </p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                     <label className="block text-sm font-semibold text-gray-600 mb-2">
//                       Project Type
//                     </label>
//                     <p className="text-lg font-medium text-gray-800">
//                       {contract.projectType}
//                     </p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                     <label className="block text-sm font-semibold text-gray-600 mb-2">
//                       Start Date
//                     </label>
//                     <p className="text-lg font-medium text-gray-800">
//                       {contract.startDate
//                         ? new Date(contract.startDate).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             }
//                           )
//                         : "Not specified"}
//                     </p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                     <label className="block text-sm font-semibold text-gray-600 mb-2">
//                       End Date
//                     </label>
//                     <p className="text-lg font-medium text-gray-800">
//                       {contract.endDate
//                         ? new Date(contract.endDate).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             }
//                           )
//                         : "Not specified"}
//                     </p>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                     <label className="block text-sm font-semibold text-gray-600 mb-2">
//                       Status
//                     </label>
//                     <div className="flex items-center">
//                       <div
//                         className={`w-3 h-3 rounded-full mr-2 ${
//                           contract.status === "ACTIVE"
//                             ? "bg-green-500"
//                             : "bg-gray-400"
//                         }`}
//                       ></div>
//                       <p className="text-lg font-medium text-gray-800">
//                         {contract.status || "DRAFT"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//                     <label className="block text-sm font-semibold text-gray-600 mb-2">
//                       Created At
//                     </label>
//                     <p className="text-lg font-medium text-gray-800">
//                       {contract.createdAt
//                         ? new Date(contract.createdAt).toLocaleDateString(
//                             "en-US",
//                             {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             }
//                           )
//                         : "Not available"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeSection === "services" && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//                 <CogIcon className="w-6 h-6 mr-3 text-green-600" />
//                 Services & SLA Rules
//               </h3>

//               {contract.services && contract.services.length > 0 ? (
//                 <div className="space-y-6">
//                   {contract.services.map((service, serviceIndex) => (
//                     <div
//                       key={
//                         service.contractServiceId ||
//                         `service-${service.serviceId}-${serviceIndex}`
//                       }
//                       className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100 overflow-hidden"
//                     >
//                       <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 border-b border-green-200">
//                         <h4 className="text-lg font-semibold text-green-800 flex items-center">
//                           <CogIcon className="w-5 h-5 mr-3" />
//                           Service {serviceIndex + 1}:{" "}
//                           {service.serviceName || "Unknown Service"}
//                         </h4>
//                       </div>

//                       {service.subServices &&
//                         service.subServices.length > 0 && (
//                           <div className="p-6">
//                             <div className="space-y-6">
//                               {service.subServices.map(
//                                 (subService, subServiceIndex) => (
//                                   <div
//                                     key={
//                                       subService.contractSubServiceId ||
//                                       `subService-${subService.subServiceId}-${subServiceIndex}`
//                                     }
//                                     className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
//                                   >
//                                     <div className="bg-gray-50 p-4 border-b border-gray-200">
//                                       <h6 className="text-sm font-semibold text-gray-700 flex items-center">
//                                         <span className="bg-gray-200 p-1 rounded mr-2">
//                                           🔹
//                                         </span>
//                                         Sub-Service {subServiceIndex + 1}:{" "}
//                                         {subService.subServiceName ||
//                                           "Unknown Sub-Service"}
//                                       </h6>
//                                     </div>

//                                     {subService.serviceScopes &&
//                                       subService.serviceScopes.length > 0 && (
//                                         <div className="p-4">
//                                           <div className="space-y-4">
//                                             {subService.serviceScopes.map(
//                                               (scope, scopeIndex) => {
//                                                 // Find SLA rules for this specific scope
//                                                 const scopeSlaRules =
//                                                   contract.slaRules.filter(
//                                                     (rule) =>
//                                                       rule.scopeId ===
//                                                       scope.scopeId
//                                                   );

//                                                 return (
//                                                   <div
//                                                     key={
//                                                       scope.scopeId ||
//                                                       `scope-${scopeIndex}`
//                                                     }
//                                                     className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden"
//                                                   >
//                                                     <div className="bg-blue-100 p-4 border-b border-blue-200">
//                                                       <div className="flex items-center justify-between">
//                                                         <h6 className="text-sm font-semibold text-blue-800 flex items-center">
//                                                           <span className="bg-blue-200 p-1 rounded mr-2">
//                                                             🎯
//                                                           </span>
//                                                           {scope.scopeName ||
//                                                             `Scope ${
//                                                               scopeIndex + 1
//                                                             }`}
//                                                         </h6>
//                                                         {scopeSlaRules.length >
//                                                           0 && (
//                                                           <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
//                                                             {
//                                                               scopeSlaRules.length
//                                                             }{" "}
//                                                             SLA Rules
//                                                           </span>
//                                                         )}
//                                                       </div>
//                                                     </div>

//                                                     {/* SLA Rules for this scope */}
//                                                     {scopeSlaRules.length >
//                                                     0 ? (
//                                                       <div className="p-4">
//                                                         <h6 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
//                                                           <ChartBarIcon className="w-4 h-4 mr-2 text-orange-600" />
//                                                           SLA Rules for this
//                                                           Scope
//                                                         </h6>
//                                                         <div className="grid gap-3">
//                                                           {scopeSlaRules.map(
//                                                             (
//                                                               rule,
//                                                               ruleIndex
//                                                             ) => (
//                                                               <div
//                                                                 key={
//                                                                   rule.slaRuleId ||
//                                                                   `rule-${ruleIndex}`
//                                                                 }
//                                                                 className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
//                                                               >
//                                                                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
//                                                                   <div>
//                                                                     <span className="text-gray-600 font-medium">
//                                                                       SLA Type:
//                                                                     </span>
//                                                                     <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold mt-1 inline-block">
//                                                                       {
//                                                                         rule.slaTypeName
//                                                                       }
//                                                                     </div>
//                                                                   </div>
//                                                                   <div>
//                                                                     <span className="text-gray-600 font-medium">
//                                                                       Priority:
//                                                                     </span>
//                                                                     <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-semibold mt-1 inline-block">
//                                                                       {
//                                                                         rule.priorityName
//                                                                       }
//                                                                     </div>
//                                                                   </div>
//                                                                   <div>
//                                                                     <span className="text-gray-600 font-medium">
//                                                                       Response
//                                                                       Time:
//                                                                     </span>
//                                                                     <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mt-1 inline-block">
//                                                                       {rule.responseTimeHours ||
//                                                                         "N/A"}{" "}
//                                                                       hours
//                                                                     </div>
//                                                                   </div>
//                                                                   <div>
//                                                                     <span className="text-gray-600 font-medium">
//                                                                       Resolution
//                                                                       Time:
//                                                                     </span>
//                                                                     <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-semibold mt-1 inline-block">
//                                                                       {rule.resolutionTimeHours ||
//                                                                         "N/A"}{" "}
//                                                                       hours
//                                                                     </div>
//                                                                   </div>
//                                                                 </div>
//                                                               </div>
//                                                             )
//                                                           )}
//                                                         </div>
//                                                       </div>
//                                                     ) : (
//                                                       <div className="p-4 text-center">
//                                                         <p className="text-gray-500 text-sm">
//                                                           No SLA rules
//                                                           configured for this
//                                                           scope
//                                                         </p>
//                                                       </div>
//                                                     )}
//                                                   </div>
//                                                 );
//                                               }
//                                             )}
//                                           </div>
//                                         </div>
//                                       )}
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 rounded-2xl p-8 max-w-md mx-auto">
//                     <CogIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <h4 className="text-lg font-semibold text-gray-700 mb-2">
//                       No Services Configured
//                     </h4>
//                     <p className="text-gray-500">
//                       This contract doesn't have any services configured yet.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {activeSection === "timings" && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800 flex items-center">
//                 <ClockIcon className="w-6 h-6 mr-3 text-purple-600" />
//                 Employee Working Hours
//               </h3>

//               {contract.employeeTimings &&
//               contract.employeeTimings.length > 0 ? (
//                 <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100">
//                   <div className="grid gap-4">
//                     {contract.employeeTimings.map((timing, index) => (
//                       <div
//                         key={index}
//                         className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex items-center">
//                           <div className="bg-purple-100 p-3 rounded-lg mr-4">
//                             <span className="text-purple-600 font-bold text-lg">
//                               {timing.dayOfWeek.charAt(0)}
//                             </span>
//                           </div>
//                           <div>
//                             <h4 className="font-semibold text-gray-800 text-lg">
//                               {timing.dayOfWeek}
//                             </h4>
//                             <p className="text-sm text-gray-500">Working Day</p>
//                           </div>
//                         </div>

//                         <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//                           <label className="block text-sm font-semibold text-green-700 mb-1">
//                             Duty Start Time
//                           </label>
//                           <p className="text-lg font-mono font-semibold text-green-800">
//                             {timing.dutyStartTime || "Not set"}
//                           </p>
//                         </div>

//                         <div className="bg-red-50 p-4 rounded-lg border border-red-200">
//                           <label className="block text-sm font-semibold text-red-700 mb-1">
//                             Duty End Time
//                           </label>
//                           <p className="text-lg font-mono font-semibold text-red-800">
//                             {timing.dutyEndTime || "Not set"}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="bg-gray-100 rounded-2xl p-8 max-w-md mx-auto">
//                     <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <h4 className="text-lg font-semibold text-gray-700 mb-2">
//                       No Working Hours Set
//                     </h4>
//                     <p className="text-gray-500">
//                       Employee working hours haven't been configured for this
//                       contract.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContractDetail;

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { contractService } from "../services/contractService";
// import {
//   ArrowLeftIcon,
//   InformationCircleIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@heroicons/react/24/outline";

// const ContractDetail = () => {
//   const { contractId } = useParams();
//   const navigate = useNavigate();
//   const [contract, setContract] = useState(null);
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedScopes, setExpandedScopes] = useState({}); // Track expanded/collapsed scopes

//   useEffect(() => {
//     const fetchContract = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [contractRes, slaTypesRes] = await Promise.all([
//           contractService.getContractById(contractId),
//           contractService.getSlaTypes(),
//         ]);

//         console.log(
//           "Raw Contract Response:",
//           JSON.stringify(contractRes.data, null, 2)
//         );

//         const contractData = contractRes.data;
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         const priorityLevelsMap = {};
//         await Promise.all(
//           slaTypesData.map(async (slaType) => {
//             try {
//               const prioritiesRes = await contractService.getPriorityLevels(
//                 slaType.slaTypeId.toString()
//               );
//               priorityLevelsMap[slaType.slaTypeId] = Array.isArray(
//                 prioritiesRes.data
//               )
//                 ? prioritiesRes.data
//                 : [];
//             } catch (err) {
//               priorityLevelsMap[slaType.slaTypeId] = [];
//             }
//           })
//         );

//         const enhancedContract = {
//           ...contractData,
//           slaRules: (contractData.slaRules || []).map((rule) => ({
//             ...rule,
//             slaTypeName:
//               slaTypesData.find((sla) => sla.slaTypeId === rule.slaTypeId)
//                 ?.slaTypeName || "N/A",
//             priorityName:
//               priorityLevelsMap[rule.slaTypeId]?.find(
//                 (p) => p.priorityId === rule.priorityId
//               )?.priorityName || "N/A",
//           })),
//         };

//         console.log(
//           "Enhanced Contract Data:",
//           JSON.stringify(enhancedContract, null, 2)
//         );
//         console.log("SLA Rules Count:", enhancedContract.slaRules?.length || 0);
//         console.log("SLA Rules Details:", enhancedContract.slaRules);
//         console.log(
//           "Service Scopes:",
//           enhancedContract.services?.flatMap((service) =>
//             service.subServices.flatMap((subService) =>
//               subService.serviceScopes.map((scope) => ({
//                 scopeId: scope.contractScopeId,
//                 scopeName: scope.scopeName,
//               }))
//             )
//           )
//         );
//         console.log("SLA Types:", slaTypesData);
//         console.log("Priority Levels Map:", priorityLevelsMap);

//         setContract(enhancedContract);
//         setSlaTypes(slaTypesData);
//         setPriorityLevels(priorityLevelsMap);
//       } catch (err) {
//         console.error("Error fetching contract:", err);
//         setError("Failed to load contract details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContract();
//   }, [contractId]);

//   // Toggle scope expansion
//   const toggleScope = (scopeId) => {
//     setExpandedScopes((prev) => ({
//       ...prev,
//       [scopeId]: !prev[scopeId],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-6 bg-red-50 text-red-700 rounded-lg max-w-6xl mx-auto">
//         {error}
//       </div>
//     );
//   }

//   if (!contract) {
//     return (
//       <div className="text-center p-6 bg-yellow-50 text-yellow-700 rounded-lg max-w-6xl mx-auto">
//         Contract not found.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate("/contracts/list")}
//               className="flex items-center bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
//               title="Return to contract list"
//             >
//               <ArrowLeftIcon className="h-5 w-5 mr-1" />
//               Back
//             </button>
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
//               {contract.contractName}
//             </h2>
//           </div>
//           <button
//             onClick={() => navigate("/contracts", { state: { contractId } })}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//             title="Edit contract details"
//           >
//             Edit Contract
//           </button>
//         </div>

//         {/* Contract Details */}
//         <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
//             Contract Details
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//             {[
//               { label: "Contract ID", value: contract.contractId },
//               {
//                 label: "Company",
//                 value: contract.companyName || "Unknown Company",
//               },
//               {
//                 label: "Project Location",
//                 value: contract.projectLocation || "N/A",
//               },
//               { label: "Project Type", value: contract.projectType },
//               {
//                 label: "Start Date",
//                 value: contract.startDate
//                   ? new Date(contract.startDate).toLocaleDateString()
//                   : "N/A",
//               },
//               {
//                 label: "End Date",
//                 value: contract.endDate
//                   ? new Date(contract.endDate).toLocaleDateString()
//                   : "N/A",
//               },
//               { label: "Status", value: contract.status || "N/A" },
//               {
//                 label: "Created At",
//                 value: contract.createdAt
//                   ? new Date(contract.createdAt).toLocaleString()
//                   : "N/A",
//               },
//             ].map((item, index) => (
//               <div key={index} className="text-sm">
//                 <label className="block font-medium text-gray-600">
//                   {item.label}
//                 </label>
//                 <p className="mt-1 text-gray-800">{item.value}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Services */}
//         {contract.services && contract.services.length > 0 && (
//           <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
//               Services
//             </h3>
//             <div className="space-y-4">
//               {contract.services.map((service, serviceIndex) => (
//                 <div
//                   key={
//                     service.contractServiceId ||
//                     `service-${service.serviceId}-${serviceIndex}`
//                   }
//                   className="bg-indigo-50 p-4 rounded-lg"
//                 >
//                   <h4 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2">
//                     Service {serviceIndex + 1}: {service.serviceName || "N/A"}
//                   </h4>
//                   {service.subServices && service.subServices.length > 0 && (
//                     <div className="ml-0 sm:ml-4 space-y-2">
//                       <h5 className="text-sm sm:text-base font-medium text-gray-700">
//                         Sub-Services
//                       </h5>
//                       {service.subServices.map(
//                         (subService, subServiceIndex) => (
//                           <div
//                             key={
//                               subService.contractSubServiceId ||
//                               `subService-${subService.subServiceId}-${subServiceIndex}`
//                             }
//                             className="bg-gray-50 p-3 rounded-lg"
//                           >
//                             <h6 className="text-sm font-medium text-gray-700">
//                               Sub-Service {subServiceIndex + 1}:{" "}
//                               {subService.subServiceName || "N/A"}
//                             </h6>
//                             {subService.serviceScopes &&
//                               subService.serviceScopes.length > 0 && (
//                                 <div className="ml-0 sm:ml-4 mt-2">
//                                   <h6 className="text-xs sm:text-sm font-medium text-gray-600">
//                                     Scopes
//                                   </h6>
//                                   {subService.serviceScopes.map(
//                                     (scope, scopeIndex) => (
//                                       <div
//                                         key={
//                                           scope.contractScopeId ||
//                                           `scope-${scopeIndex}`
//                                         }
//                                         className="text-xs sm:text-sm text-gray-600 mt-1"
//                                       >
//                                         <p>
//                                           Scope {scopeIndex + 1}:{" "}
//                                           {scope.scopeName || "N/A"}
//                                         </p>
//                                       </div>
//                                     )
//                                   )}
//                                 </div>
//                               )}
//                           </div>
//                         )
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Employee Timings */}
//         {contract.employeeTimings && contract.employeeTimings.length > 0 && (
//           <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
//             <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
//               Employee Timings
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm">
//                 <thead>
//                   <tr className="bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-700">
//                     <th className="p-3">Day</th>
//                     <th className="p-3">Duty Start</th>
//                     <th className="p-3">Duty End</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {contract.employeeTimings.map((timing, index) => (
//                     <tr
//                       key={index}
//                       className="border-t hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="p-3">{timing.dayOfWeek}</td>
//                       <td className="p-3">{timing.dutyStartTime}</td>
//                       <td className="p-3">{timing.dutyEndTime}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* SLA Rules */}
//         <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
//           <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
//             SLA Rules
//           </h3>
//           {contract.slaRules && contract.slaRules.length > 0 ? (
//             <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//               {contract.services.flatMap((service, serviceIndex) =>
//                 service.subServices.flatMap((subService, subServiceIndex) =>
//                   subService.serviceScopes.map((scope, scopeIndex) => {
//                     const scopeRules = contract.slaRules.filter(
//                       (rule) =>
//                         rule.scopeId?.toString() ===
//                         scope.contractScopeId?.toString()
//                     );

//                     console.log(
//                       `Scope ID: ${scope.contractScopeId}, Scope Name: ${scope.scopeName}, Rules Found:`,
//                       scopeRules,
//                       `All SLA Rules:`,
//                       contract.slaRules
//                     );

//                     return (
//                       <div
//                         key={`${serviceIndex}-${subServiceIndex}-${scopeIndex}`}
//                         className="border border-gray-200 rounded-lg overflow-hidden"
//                       >
//                         <button
//                           onClick={() => toggleScope(scope.contractScopeId)}
//                           className="w-full bg-indigo-100 p-4 flex justify-between items-center hover:bg-indigo-200 transition"
//                           title={`Toggle ${scope.scopeName} rules`}
//                         >
//                           <div className="flex items-center">
//                             <span className="bg-indigo-200 p-2 rounded-lg mr-3 text-indigo-800">
//                               🎯
//                             </span>
//                             <div className="text-left">
//                               <h5 className="text-sm sm:text-base font-semibold text-indigo-800">
//                                 {scope.scopeName || "Unnamed Scope"} (
//                                 {scopeRules.length} rules)
//                               </h5>
//                               <p className="text-xs sm:text-sm text-indigo-600">
//                                 Service: {service.serviceName || "Unknown"} →
//                                 Sub-Service:{" "}
//                                 {subService.subServiceName || "Unknown"}
//                               </p>
//                             </div>
//                           </div>
//                           {expandedScopes[scope.contractScopeId] ? (
//                             <ChevronUpIcon className="h-5 w-5 text-indigo-600" />
//                           ) : (
//                             <ChevronDownIcon className="h-5 w-5 text-indigo-600" />
//                           )}
//                         </button>
//                         {expandedScopes[scope.contractScopeId] && (
//                           <div className="p-4 space-y-3 transition-all duration-300">
//                             {scopeRules.length > 0 ? (
//                               scopeRules.map((rule, ruleIndex) => (
//                                 <div
//                                   key={rule.ruleId || `slaRule-${ruleIndex}`}
//                                   className="bg-gray-50 p-3 rounded-lg border-l-4 border-indigo-400 hover:bg-gray-100 transition-shadow"
//                                 >
//                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//                                     <div title="SLA Type">
//                                       <label className="block font-medium text-gray-600">
//                                         SLA Type
//                                       </label>
//                                       <p className="mt-1 text-gray-800">
//                                         {rule.slaTypeName}
//                                       </p>
//                                     </div>
//                                     <div title="Priority Level">
//                                       <label className="block font-medium text-gray-600">
//                                         Priority
//                                       </label>
//                                       <p className="mt-1 text-gray-800">
//                                         {rule.priorityName}
//                                       </p>
//                                     </div>
//                                     <div title="Response Time in Hours">
//                                       <label className="block font-medium text-gray-600">
//                                         Response Time (Hours)
//                                       </label>
//                                       <p className="mt-1 text-gray-800">
//                                         {rule.responseTimeHours || "N/A"}
//                                       </p>
//                                     </div>
//                                     <div title="Resolution Time in Hours">
//                                       <label className="block font-medium text-gray-600">
//                                         Resolution Time (Hours)
//                                       </label>
//                                       <p className="mt-1 text-gray-800">
//                                         {rule.resolutionTimeHours || "N/A"}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))
//                             ) : (
//                               <div className="bg-yellow-50 p-3 rounded-lg flex items-center text-sm">
//                                 <InformationCircleIcon className="h-5 w-5 text-yellow-600 mr-2" />
//                                 <p className="text-yellow-700">
//                                   No SLA rules found for this scope.
//                                 </p>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })
//                 )
//               )}
//               {contract.slaRules.some((rule) => !rule.scopeId) && (
//                 <div className="border border-red-200 rounded-lg p-4 mt-4">
//                   <div className="flex items-center mb-3">
//                     <InformationCircleIcon className="h-5 w-5 text-red-600 mr-2" />
//                     <h5 className="text-sm sm:text-base font-semibold text-red-800">
//                       Unassociated SLA Rules
//                     </h5>
//                   </div>
//                   <p className="text-red-700 text-sm mb-3">
//                     These SLA rules are not linked to any service scope.
//                   </p>
//                   {contract.slaRules
//                     .filter((rule) => !rule.scopeId)
//                     .map((rule, ruleIndex) => (
//                       <div
//                         key={rule.ruleId || `unassociated-slaRule-${ruleIndex}`}
//                         className="bg-gray-50 p-3 rounded-lg border-l-4 border-red-400 mb-2 text-sm"
//                       >
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                           <div>
//                             <label className="block font-medium text-gray-600">
//                               SLA Type
//                             </label>
//                             <p className="mt-1 text-gray-800">
//                               {rule.slaTypeName}
//                             </p>
//                           </div>
//                           <div>
//                             <label className="block font-medium text-gray-600">
//                               Priority
//                             </label>
//                             <p className="mt-1 text-gray-800">
//                               {rule.priorityName}
//                             </p>
//                           </div>
//                           <div>
//                             <label className="block font-medium text-gray-600">
//                               Response Time (Hours)
//                             </label>
//                             <p className="mt-1 text-gray-800">
//                               {rule.responseTimeHours || "N/A"}
//                             </p>
//                           </div>
//                           <div>
//                             <label className="block font-medium text-gray-600">
//                               Resolution Time (Hours)
//                             </label>
//                             <p className="mt-1 text-gray-800">
//                               {rule.resolutionTimeHours || "N/A"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="text-center py-8 bg-gray-50 rounded-lg">
//               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
//                 <InformationCircleIcon className="h-6 w-6 text-gray-400" />
//               </div>
//               <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-2">
//                 No SLA Rules Available
//               </h4>
//               <p className="text-gray-500 text-sm">
//                 No SLA rules have been defined for this contract.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContractDetail;

"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contractService } from "../services/contractService";
import {
  ArrowLeftIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const ContractDetail = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [slaTypes, setSlaTypes] = useState([]);
  const [priorityLevels, setPriorityLevels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedScopes, setExpandedScopes] = useState({});

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        setError(null);

        const [contractRes, slaTypesRes] = await Promise.all([
          contractService.getContractById(contractId),
          contractService.getSlaTypes(),
        ]);

        console.log(
          "Raw Contract Response:",
          JSON.stringify(contractRes.data, null, 2)
        );

        const contractData = contractRes.data;
        const slaTypesData = Array.isArray(slaTypesRes.data)
          ? slaTypesRes.data
          : [];

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

        console.log(
          "Enhanced Contract Data:",
          JSON.stringify(enhancedContract, null, 2)
        );
        console.log("SLA Rules Count:", enhancedContract.slaRules?.length || 0);
        console.log("SLA Rules Details:", enhancedContract.slaRules);
        console.log(
          "Service Scopes:",
          enhancedContract.services?.flatMap((service) =>
            service.subServices.flatMap((subService) =>
              subService.serviceScopes.map((scope) => ({
                scopeId: scope.contractScopeId,
                scopeName: scope.scopeName,
              }))
            )
          )
        );
        console.log("SLA Types:", slaTypesData);
        console.log("Priority Levels Map:", priorityLevelsMap);

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

  // Toggle scope expansion
  const toggleScope = (scopeId) => {
    setExpandedScopes((prev) => ({
      ...prev,
      [scopeId]: !prev[scopeId],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 text-red-700 rounded-lg max-w-6xl mx-auto">
        {error}
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="text-center p-6 bg-yellow-50 text-yellow-700 rounded-lg max-w-6xl mx-auto">
        Contract not found.
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/contracts/list")}
              className="flex items-center bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              title="Return to contract list"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back
            </button>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {contract.contractName}
            </h2>
          </div>
        </div>

        {/* Contract Details */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            Contract Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { label: "Contract ID", value: contract.contractId },
              {
                label: "Company",
                value: contract.companyName || "Unknown Company",
              },
              {
                label: "Project Location",
                value: contract.projectLocation || "N/A",
              },
              { label: "Project Type", value: contract.projectType },
              {
                label: "Start Date",
                value: contract.startDate
                  ? new Date(contract.startDate).toLocaleDateString()
                  : "N/A",
              },
              {
                label: "End Date",
                value: contract.endDate
                  ? new Date(contract.endDate).toLocaleDateString()
                  : "N/A",
              },
              { label: "Status", value: contract.status || "N/A" },
              {
                label: "Created At",
                value: contract.createdAt
                  ? new Date(contract.createdAt).toLocaleString()
                  : "N/A",
              },
            ].map((item, index) => (
              <div key={index} className="text-sm">
                <label className="block font-medium text-gray-600">
                  {item.label}
                </label>
                <p className="mt-1 text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        {contract.services && contract.services.length > 0 && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
              Services
            </h3>
            <div className="space-y-4">
              {contract.services.map((service, serviceIndex) => (
                <div
                  key={
                    service.contractServiceId ||
                    `service-${service.serviceId}-${serviceIndex}`
                  }
                  className="bg-indigo-50 p-4 rounded-lg"
                >
                  <h4 className="text-base sm:text-lg font-semibold text-indigo-800 mb-2">
                    Service {serviceIndex + 1}: {service.serviceName || "N/A"}
                  </h4>
                  {service.subServices && service.subServices.length > 0 && (
                    <div className="ml-0 sm:ml-4 space-y-2">
                      <h5 className="text-sm sm:text-base font-medium text-gray-700">
                        Sub-Services
                      </h5>
                      {service.subServices.map(
                        (subService, subServiceIndex) => (
                          <div
                            key={
                              subService.contractSubServiceId ||
                              `subService-${subService.subServiceId}-${subServiceIndex}`
                            }
                            className="bg-gray-50 p-3 rounded-lg"
                          >
                            <h6 className="text-sm font-medium text-gray-700">
                              Sub-Service {subServiceIndex + 1}:{" "}
                              {subService.subServiceName || "N/A"}
                            </h6>
                            {subService.serviceScopes &&
                              subService.serviceScopes.length > 0 && (
                                <div className="ml-0 sm:ml-4 mt-2">
                                  <h6 className="text-xs sm:text-sm font-medium text-gray-600">
                                    Scopes
                                  </h6>
                                  {subService.serviceScopes.map(
                                    (scope, scopeIndex) => (
                                      <div
                                        key={
                                          scope.contractScopeId ||
                                          `scope-${scopeIndex}`
                                        }
                                        className="text-xs sm:text-sm text-gray-600 mt-1"
                                      >
                                        <p>
                                          Scope {scopeIndex + 1}:{" "}
                                          {scope.scopeName || "N/A"}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Employee Timings */}
        {contract.employeeTimings && contract.employeeTimings.length > 0 && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
              Employee Timings
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left text-xs sm:text-sm font-semibold text-gray-700">
                    <th className="p-3">Day</th>
                    <th className="p-3">Duty Start</th>
                    <th className="p-3">Duty End</th>
                  </tr>
                </thead>
                <tbody>
                  {contract.employeeTimings.map((timing, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3">{timing.dayOfWeek}</td>
                      <td className="p-3">{timing.dutyStartTime}</td>
                      <td className="p-3">{timing.dutyEndTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SLA Rules */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            SLA Rules
          </h3>
          {contract.slaRules && contract.slaRules.length > 0 ? (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {contract.services.flatMap((service, serviceIndex) =>
                service.subServices.flatMap((subService, subServiceIndex) =>
                  subService.serviceScopes.map((scope, scopeIndex) => {
                    const scopeRules = contract.slaRules.filter(
                      (rule) =>
                        rule.scopeId?.toString() ===
                        scope.contractScopeId?.toString()
                    );

                    console.log(
                      `Scope ID: ${scope.contractScopeId}, Scope Name: ${scope.scopeName}, Rules Found:`,
                      scopeRules,
                      `All SLA Rules:`,
                      contract.slaRules
                    );

                    return (
                      <div
                        key={`${serviceIndex}-${subServiceIndex}-${scopeIndex}`}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleScope(scope.contractScopeId)}
                          className="w-full bg-indigo-100 p-4 flex justify-between items-center hover:bg-indigo-200 transition"
                          title={`Toggle ${scope.scopeName} rules`}
                        >
                          <div className="flex items-center">
                            <span className="bg-indigo-200 p-2 rounded-lg mr-3 text-indigo-800">
                              🎯
                            </span>
                            <div className="text-left">
                              <h5 className="text-sm sm:text-base font-semibold text-indigo-800">
                                {scope.scopeName || "Unnamed Scope"} (
                                {scopeRules.length} rules)
                              </h5>
                              <p className="text-xs sm:text-sm text-indigo-600">
                                Service: {service.serviceName || "Unknown"} →
                                Sub-Service:{" "}
                                {subService.subServiceName || "Unknown"}
                              </p>
                            </div>
                          </div>
                          {expandedScopes[scope.contractScopeId] ? (
                            <ChevronUpIcon className="h-5 w-5 text-indigo-600" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5 text-indigo-600" />
                          )}
                        </button>

                        {expandedScopes[scope.contractScopeId] && (
                          <div className="p-4 space-y-3 transition-all duration-300">
                            {scopeRules.length > 0 ? (
                              scopeRules.map((rule, ruleIndex) => (
                                <div
                                  key={rule.ruleId || `slaRule-${ruleIndex}`}
                                  className="bg-gray-50 p-3 rounded-lg border-l-4 border-indigo-400 hover:bg-gray-100 transition-shadow"
                                >
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <div title="SLA Type">
                                      <label className="block font-medium text-gray-600">
                                        SLA Type
                                      </label>
                                      <p className="mt-1 text-gray-800">
                                        {rule.slaTypeName}
                                      </p>
                                    </div>
                                    <div title="Priority Level">
                                      <label className="block font-medium text-gray-600">
                                        Priority
                                      </label>
                                      <p className="mt-1 text-gray-800">
                                        {rule.priorityName}
                                      </p>
                                    </div>
                                    <div title="Response Time in Hours">
                                      <label className="block font-medium text-gray-600">
                                        Response Time (Hours)
                                      </label>
                                      <p className="mt-1 text-gray-800">
                                        {rule.responseTimeHours || "N/A"}
                                      </p>
                                    </div>
                                    <div title="Resolution Time in Hours">
                                      <label className="block font-medium text-gray-600">
                                        Resolution Time (Hours)
                                      </label>
                                      <p className="mt-1 text-gray-800">
                                        {rule.resolutionTimeHours || "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="bg-yellow-50 p-3 rounded-lg flex items-center text-sm">
                                <InformationCircleIcon className="h-5 w-5 text-yellow-600 mr-2" />
                                <p className="text-yellow-700">
                                  No SLA rules found for this scope.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )
              )}

              {contract.slaRules.some((rule) => !rule.scopeId) && (
                <div className="border border-red-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center mb-3">
                    <InformationCircleIcon className="h-5 w-5 text-red-600 mr-2" />
                    <h5 className="text-sm sm:text-base font-semibold text-red-800">
                      Unassociated SLA Rules
                    </h5>
                  </div>
                  <p className="text-red-700 text-sm mb-3">
                    These SLA rules are not linked to any service scope.
                  </p>
                  {contract.slaRules
                    .filter((rule) => !rule.scopeId)
                    .map((rule, ruleIndex) => (
                      <div
                        key={rule.ruleId || `unassociated-slaRule-${ruleIndex}`}
                        className="bg-gray-50 p-3 rounded-lg border-l-4 border-red-400 mb-2 text-sm"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-medium text-gray-600">
                              SLA Type
                            </label>
                            <p className="mt-1 text-gray-800">
                              {rule.slaTypeName}
                            </p>
                          </div>
                          <div>
                            <label className="block font-medium text-gray-600">
                              Priority
                            </label>
                            <p className="mt-1 text-gray-800">
                              {rule.priorityName}
                            </p>
                          </div>
                          <div>
                            <label className="block font-medium text-gray-600">
                              Response Time (Hours)
                            </label>
                            <p className="mt-1 text-gray-800">
                              {rule.responseTimeHours || "N/A"}
                            </p>
                          </div>
                          <div>
                            <label className="block font-medium text-gray-600">
                              Resolution Time (Hours)
                            </label>
                            <p className="mt-1 text-gray-800">
                              {rule.resolutionTimeHours || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <InformationCircleIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-2">
                No SLA Rules Available
              </h4>
              <p className="text-gray-500 text-sm">
                No SLA rules have been defined for this contract.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
