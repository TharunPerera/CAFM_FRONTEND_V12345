// import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import debounce from "lodash/debounce";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//                 dutyHours: "",
//                 offDutyHours: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   });
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});

//   const debouncedSetFormData = useCallback(
//     debounce((newFormData) => {
//       setFormData(newFormData);
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         setCompanies(Array.isArray(companiesRes.data) ? companiesRes.data : []);
//         setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
//         setSlaTypes(Array.isArray(slaTypesRes.data) ? slaTypesRes.data : []);

//         if (contractId) {
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;
//           setFormData({
//             contractName: contract.contractName || "",
//             companyId: contract.company?.companyId?.toString() || "",
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: contract.contractServices?.map((cs) => ({
//               serviceId: cs.service?.serviceId?.toString() || "",
//               subServices: cs.contractSubServices?.map((css) => ({
//                 subServiceId: css.subService?.subServiceId?.toString() || "",
//                 serviceScopes: css.contractServiceScopes?.map((scope) => ({
//                   scopeId: scope.scope?.scopeId?.toString() || "",
//                   slaTypeId: scope.slaType?.slaTypeId?.toString() || "",
//                   priorityId: scope.priority?.priorityId?.toString() || "",
//                   dutyHours: scope.dutyHours?.toString() || "",
//                   offDutyHours: scope.offDutyHours?.toString() || "",
//                 })) || [
//                   {
//                     scopeId: "",
//                     slaTypeId: "",
//                     priorityId: "",
//                     dutyHours: "",
//                     offDutyHours: "",
//                   },
//                 ],
//               })) || [
//                 {
//                   subServiceId: "",
//                   serviceScopes: [
//                     {
//                       scopeId: "",
//                       slaTypeId: "",
//                       priorityId: "",
//                       dutyHours: "",
//                       offDutyHours: "",
//                     },
//                   ],
//                 },
//               ],
//             })) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           });

//           // Fetch sub-services and scopes for pre-filled services
//           for (const service of contract.contractServices || []) {
//             if (service.service?.serviceId) {
//               const subServicesRes = await contractService.getSubServices(
//                 service.service.serviceId
//               );
//               setSubServices((prev) => ({
//                 ...prev,
//                 [service.service.serviceId]: Array.isArray(subServicesRes.data)
//                   ? subServicesRes.data
//                   : [],
//               }));
//             }
//             for (const subService of service.contractSubServices || []) {
//               if (subService.subService?.subServiceId) {
//                 const scopesRes = await contractService.getServiceScopes(
//                   subService.subService.subServiceId
//                 );
//                 setServiceScopes((prev) => ({
//                   ...prev,
//                   [subService.subService.subServiceId]: Array.isArray(
//                     scopesRes.data
//                   )
//                     ? scopesRes.data
//                     : [],
//                 }));
//               }
//               for (const scope of subService.contractServiceScopes || []) {
//                 if (scope.slaType?.slaTypeId) {
//                   const prioritiesRes = await contractService.getPriorityLevels(
//                     scope.slaType.slaTypeId
//                   );
//                   setPriorityLevels((prev) => ({
//                     ...prev,
//                     [scope.slaType.slaTypeId]: Array.isArray(prioritiesRes.data)
//                       ? prioritiesRes.data
//                       : [],
//                   }));
//                 }
//               }
//             }
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyHours" && (value === "" || value < 0))
//       errors[`dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Valid duty hours required.";
//     if (name === "offDutyHours" && (value === "" || value < 0))
//       errors[`offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Valid off-duty hours required.";
//     return errors;
//   };

//   const handleChange = (e, serviceIndex, subServiceIndex, scopeIndex) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (
//         serviceIndex !== undefined &&
//         subServiceIndex !== undefined &&
//         scopeIndex !== undefined
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex][name] = value;
//       } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//         newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//           value;
//         if (name === "subServiceId" && value) {
//           contractService
//             .getServiceScopes(value)
//             .then((res) => {
//               setServiceScopes((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               setError("Failed to load service scopes.");
//             });
//         }
//       } else if (serviceIndex !== undefined) {
//         newFormData.services[serviceIndex][name] = value;
//         if (name === "serviceId" && value) {
//           contractService
//             .getSubServices(value)
//             .then((res) => {
//               setSubServices((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               setError("Failed to load sub-services.");
//             });
//         }
//       } else {
//         newFormData[name] = value;
//       }
//       debouncedSetFormData(newFormData);
//       setValidationErrors((prev) => ({
//         ...prev,
//         ...validateField(
//           name,
//           value,
//           serviceIndex,
//           subServiceIndex,
//           scopeIndex
//         ),
//       }));
//       return newFormData;
//     });
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex
//   ) => {
//     const slaTypeId = e.target.value;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//       return newFormData;
//     });
//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex
//       ),
//     }));
//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => {
//           setError("Failed to load priority levels.");
//         });
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [
//                 {
//                   scopeId: "",
//                   slaTypeId: "",
//                   priorityId: "",
//                   dutyHours: "",
//                   offDutyHours: "",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [
//           {
//             scopeId: "",
//             slaTypeId: "",
//             priorityId: "",
//             dutyHours: "",
//             offDutyHours: "",
//           },
//         ],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//         dutyHours: "",
//         offDutyHours: "",
//       });
//       return newFormData;
//     });
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`service-${serviceIndex}`) ||
//           key.startsWith(`subService-${serviceIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//                 dutyHours: "",
//                 offDutyHours: "",
//               },
//             ],
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (key.startsWith(`subService-${serviceIndex}-${subServiceIndex}`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [
//           {
//             scopeId: "",
//             slaTypeId: "",
//             priorityId: "",
//             dutyHours: "",
//             offDutyHours: "",
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(
//             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//           )
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName)
//       errors.contractName = "Contract name is required.";
//     if (!formData.companyId) errors.companyId = "Company is required.";
//     if (!formData.projectType) errors.projectType = "Project type is required.";
//     if (!formData.startDate) errors.startDate = "Start date is required.";
//     if (!formData.endDate) errors.endDate = "End date is required.";
//     if (!formData.services.length)
//       errors.services = "At least one service is required.";
//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Service is required.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service is required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Sub-service is required.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope is required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Scope is required.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "SLA type is required.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Priority level is required.";
//           if (scope.dutyHours === "" || scope.dutyHours < 0)
//             errors[
//               `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Valid duty hours required.";
//           if (scope.offDutyHours === "" || scope.offDutyHours < 0)
//             errors[
//               `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Valid off-duty hours required.";
//         });
//       });
//     });
//     return errors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const cleanedFormData = {
//       ...formData,
//       companyId: parseInt(formData.companyId, 10),
//       services: formData.services.map((service) => ({
//         ...service,
//         serviceId: parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           ...subService,
//           subServiceId: parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             ...scope,
//             scopeId: parseInt(scope.scopeId, 10),
//             slaTypeId: parseInt(scope.slaTypeId, 10),
//             priorityId: parseInt(scope.priorityId, 10),
//             dutyHours: scope.dutyHours ? parseFloat(scope.dutyHours) : null,
//             offDutyHours: scope.offDutyHours
//               ? parseFloat(scope.offDutyHours)
//               : null,
//           })),
//         })),
//       })),
//     };
//     onSubmit(cleanedFormData, contractId);
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
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
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>
//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Contract Name
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Enter a unique name for the contract"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="text"
//               name="contractName"
//               value={formData.contractName}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.contractName
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.contractName && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.contractName}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Select the company associated with this contract"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <select
//               name="companyId"
//               value={formData.companyId}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.companyId
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             >
//               <option value="">Select Company</option>
//               {companies.map((company) => (
//                 <option key={company.companyId} value={company.companyId}>
//                   {company.companyName}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.companyId && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.companyId}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Location
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Optional: Specify the project location"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="text"
//               name="projectLocation"
//               value={formData.projectLocation}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Type
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Choose the contract duration type"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <select
//               name="projectType"
//               value={formData.projectType}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.projectType
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             >
//               <option value="">Select Project Type</option>
//               <option value="ANNUAL">Annual</option>
//               <option value="ONE_TIME">One Time</option>
//             </select>
//             {validationErrors.projectType && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.projectType}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Start Date
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Contract start date"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.startDate
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.startDate && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.startDate}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               End Date
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Contract end date"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.endDate ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.endDate && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.endDate}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Services */}
//         {formData.services.map((service, serviceIndex) => (
//           <div
//             key={serviceIndex}
//             className="bg-blue-50 p-4 rounded-lg shadow-sm mt-4"
//           >
//             <div
//               className="flex items-center justify-between bg-blue-100 p-3 rounded-lg cursor-pointer"
//               onClick={() => toggleCollapse("service", serviceIndex)}
//             >
//               <h4 className="text-lg font-semibold text-blue-800">
//                 Service {serviceIndex + 1}
//               </h4>
//               <div className="flex items-center space-x-3">
//                 <button
//                   type="button"
//                   className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeService(serviceIndex);
//                   }}
//                   disabled={formData.services.length === 1}
//                   title="Remove Service"
//                 >
//                   <TrashIcon className="h-5 w-5" />
//                 </button>
//                 {collapsedSections[`service-${serviceIndex}`] ? (
//                   <ChevronUpIcon className="h-5 w-5 text-blue-600" />
//                 ) : (
//                   <ChevronDownIcon className="h-5 w-5 text-blue-600" />
//                 )}
//               </div>
//             </div>
//             {!collapsedSections[`service-${serviceIndex}`] && (
//               <div className="mt-4 space-y-4">
//                 <div className="relative">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Service
//                     <span
//                       className="ml-1 text-gray-500 cursor-help"
//                       title="Select the main service category"
//                     >
//                       ⓘ
//                     </span>
//                   </label>
//                   <select
//                     name="serviceId"
//                     value={service.serviceId}
//                     onChange={(e) => handleChange(e, serviceIndex)}
//                     className={`w-full p-3 border ${
//                       validationErrors[`service-${serviceIndex}`]
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     required
//                   >
//                     <option value="">Select Service</option>
//                     {services.map((s) => (
//                       <option key={s.serviceId} value={s.serviceId}>
//                         {s.serviceName}
//                       </option>
//                     ))}
//                   </select>
//                   {validationErrors[`service-${serviceIndex}`] && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {validationErrors[`service-${serviceIndex}`]}
//                     </p>
//                   )}
//                 </div>

//                 {/* Sub-Services */}
//                 {service.subServices.map((subService, subServiceIndex) => (
//                   <div
//                     key={subServiceIndex}
//                     className="ml-4 mt-4 bg-gray-50 p-4 rounded-lg shadow-sm"
//                   >
//                     <div
//                       className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer"
//                       onClick={() =>
//                         toggleCollapse(
//                           "subService",
//                           serviceIndex,
//                           subServiceIndex
//                         )
//                       }
//                     >
//                       <h5 className="text-md font-medium text-gray-700">
//                         Sub-Service {subServiceIndex + 1}
//                       </h5>
//                       <div className="flex items-center space-x-3">
//                         <button
//                           type="button"
//                           className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeSubService(serviceIndex, subServiceIndex);
//                           }}
//                           disabled={service.subServices.length === 1}
//                           title="Remove Sub-Service"
//                         >
//                           <TrashIcon className="h-5 w-5" />
//                         </button>
//                         {collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] ? (
//                           <ChevronUpIcon className="h-5 w-5 text-gray-600" />
//                         ) : (
//                           <ChevronDownIcon className="h-5 w-5 text-gray-600" />
//                         )}
//                       </div>
//                     </div>
//                     {!collapsedSections[
//                       `subService-${serviceIndex}-${subServiceIndex}`
//                     ] && (
//                       <div className="mt-4 space-y-4">
//                         <div className="relative">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Sub-Service
//                             <span
//                               className="ml-1 text-gray-500 cursor-help"
//                               title="Select a sub-service under the main service"
//                             >
//                               ⓘ
//                             </span>
//                           </label>
//                           <select
//                             name="subServiceId"
//                             value={subService.subServiceId}
//                             onChange={(e) =>
//                               handleChange(e, serviceIndex, subServiceIndex)
//                             }
//                             className={`w-full p-3 border ${
//                               validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ]
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                             required
//                           >
//                             <option value="">Select Sub-Service</option>
//                             {(subServices[service.serviceId] || []).map(
//                               (ss) => (
//                                 <option
//                                   key={ss.subServiceId}
//                                   value={ss.subServiceId}
//                                 >
//                                   {ss.subServiceName}
//                                 </option>
//                               )
//                             )}
//                           </select>
//                           {validationErrors[
//                             `subService-${serviceIndex}-${subServiceIndex}`
//                           ] && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {
//                                 validationErrors[
//                                   `subService-${serviceIndex}-${subServiceIndex}`
//                                 ]
//                               }
//                             </p>
//                           )}
//                         </div>

//                         {/* Service Scopes */}
//                         {subService.serviceScopes.map((scope, scopeIndex) => (
//                           <div
//                             key={scopeIndex}
//                             className="ml-4 mt-4 bg-white p-4 rounded-lg shadow-sm"
//                           >
//                             <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                               <h6 className="text-sm font-medium text-gray-700">
//                                 Scope {scopeIndex + 1}
//                               </h6>
//                               <button
//                                 type="button"
//                                 className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                                 onClick={() =>
//                                   removeServiceScope(
//                                     serviceIndex,
//                                     subServiceIndex,
//                                     scopeIndex
//                                   )
//                                 }
//                                 disabled={subService.serviceScopes.length === 1}
//                                 title="Remove Scope"
//                               >
//                                 <TrashIcon className="h-5 w-5" />
//                               </button>
//                             </div>
//                             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Service Scope
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Define the specific scope of work"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="scopeId"
//                                   value={scope.scopeId}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select Scope</option>
//                                   {(
//                                     serviceScopes[subService.subServiceId] || []
//                                   ).map((sc) => (
//                                     <option key={sc.scopeId} value={sc.scopeId}>
//                                       {sc.scopeName}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 {validationErrors[
//                                   `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   SLA Type
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Select the Service Level Agreement type"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="slaTypeId"
//                                   value={scope.slaTypeId}
//                                   onChange={(e) =>
//                                     handleSlaTypeChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select SLA Type</option>
//                                   {slaTypes.map((sla) => (
//                                     <option
//                                       key={sla.slaTypeId}
//                                       value={sla.slaTypeId}
//                                     >
//                                       {sla.slaTypeName}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 {validationErrors[
//                                   `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Priority Level
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Set the priority for this scope"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="priorityId"
//                                   value={scope.priorityId}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select Priority</option>
//                                   {(priorityLevels[scope.slaTypeId] || []).map(
//                                     (pl) => (
//                                       <option
//                                         key={pl.priorityId}
//                                         value={pl.priorityId}
//                                       >
//                                         {pl.priorityName}
//                                       </option>
//                                     )
//                                   )}
//                                 </select>
//                                 {validationErrors[
//                                   `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Duty Hours
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Hours during active duty"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="dutyHours"
//                                   value={scope.dutyHours}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   step="0.1"
//                                   min="0"
//                                   required
//                                 />
//                                 {validationErrors[
//                                   `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Off-Duty Hours
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Hours outside active duty"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="offDutyHours"
//                                   value={scope.offDutyHours}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   step="0.1"
//                                   min="0"
//                                   required
//                                 />
//                                 {validationErrors[
//                                   `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() =>
//                             addServiceScope(serviceIndex, subServiceIndex)
//                           }
//                           className="mt-4 flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                           title="Add a new scope"
//                         >
//                           <PlusIcon className="h-5 w-5 mr-1" />
//                           Add Scope
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addSubService(serviceIndex)}
//                   className="mt-4 flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   title="Add a new sub-service"
//                 >
//                   <PlusIcon className="h-5 w-5 mr-1" />
//                   Add Sub-Service
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//         <div className="mt-6 flex space-x-4">
//           <button
//             type="button"
//             onClick={addService}
//             className="flex items-center bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//             title="Add a new service"
//           >
//             <PlusIcon className="h-5 w-5 mr-1" />
//             Add Service
//           </button>
//           <button
//             type="submit"
//             className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {contractId ? "Update Contract" : "Create Contract"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

// import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import debounce from "lodash/debounce";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//                 dutyHours: "",
//                 offDutyHours: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   });
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});

//   const debouncedSetFormData = useCallback(
//     debounce((newFormData) => {
//       setFormData(newFormData);
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         setCompanies(Array.isArray(companiesRes.data) ? companiesRes.data : []);
//         setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
//         setSlaTypes(Array.isArray(slaTypesRes.data) ? slaTypesRes.data : []);

//         if (contractId) {
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;
//           setFormData({
//             contractName: contract.contractName || "",
//             companyId: contract.company?.companyId?.toString() || "",
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: contract.contractServices?.map((cs) => ({
//               serviceId: cs.service?.serviceId?.toString() || "",
//               subServices: cs.contractSubServices?.map((css) => ({
//                 subServiceId: css.subService?.subServiceId?.toString() || "",
//                 serviceScopes: css.contractServiceScopes?.map((scope) => ({
//                   scopeId: scope.scope?.scopeId?.toString() || "",
//                   slaTypeId: scope.slaType?.slaTypeId?.toString() || "",
//                   priorityId: scope.priority?.priorityId?.toString() || "",
//                   dutyHours: scope.dutyHours?.toString() || "",
//                   offDutyHours: scope.offDutyHours?.toString() || "",
//                 })) || [
//                   {
//                     scopeId: "",
//                     slaTypeId: "",
//                     priorityId: "",
//                     dutyHours: "",
//                     offDutyHours: "",
//                   },
//                 ],
//               })) || [
//                 {
//                   subServiceId: "",
//                   serviceScopes: [
//                     {
//                       scopeId: "",
//                       slaTypeId: "",
//                       priorityId: "",
//                       dutyHours: "",
//                       offDutyHours: "",
//                     },
//                   ],
//                 },
//               ],
//             })) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           });

//           // Fetch sub-services and scopes for pre-filled services
//           for (const service of contract.contractServices || []) {
//             if (service.service?.serviceId) {
//               const subServicesRes = await contractService.getSubServices(
//                 service.service.serviceId
//               );
//               setSubServices((prev) => ({
//                 ...prev,
//                 [service.service.serviceId]: Array.isArray(subServicesRes.data)
//                   ? subServicesRes.data
//                   : [],
//               }));
//             }
//             for (const subService of service.contractSubServices || []) {
//               if (subService.subService?.subServiceId) {
//                 const scopesRes = await contractService.getServiceScopes(
//                   subService.subService.subServiceId
//                 );
//                 setServiceScopes((prev) => ({
//                   ...prev,
//                   [subService.subService.subServiceId]: Array.isArray(
//                     scopesRes.data
//                   )
//                     ? scopesRes.data
//                     : [],
//                 }));
//               }
//               for (const scope of subService.contractServiceScopes || []) {
//                 if (scope.slaType?.slaTypeId) {
//                   const prioritiesRes = await contractService.getPriorityLevels(
//                     scope.slaType.slaTypeId
//                   );
//                   setPriorityLevels((prev) => ({
//                     ...prev,
//                     [scope.slaType.slaTypeId]: Array.isArray(prioritiesRes.data)
//                       ? prioritiesRes.data
//                       : [],
//                   }));
//                 }
//               }
//             }
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyHours" && (value === "" || value < 0))
//       errors[`dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Valid duty hours required.";
//     if (name === "offDutyHours" && (value === "" || value < 0))
//       errors[`offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Valid off-duty hours required.";
//     return errors;
//   };

//   const handleChange = (e, serviceIndex, subServiceIndex, scopeIndex) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (
//         serviceIndex !== undefined &&
//         subServiceIndex !== undefined &&
//         scopeIndex !== undefined
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex][name] = value;
//       } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//         newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//           value;
//         if (name === "subServiceId" && value) {
//           contractService
//             .getServiceScopes(value)
//             .then((res) => {
//               setServiceScopes((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               setError("Failed to load service scopes.");
//             });
//         }
//       } else if (serviceIndex !== undefined) {
//         newFormData.services[serviceIndex][name] = value;
//         if (name === "serviceId" && value) {
//           contractService
//             .getSubServices(value)
//             .then((res) => {
//               setSubServices((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               setError("Failed to load sub-services.");
//             });
//         }
//       } else {
//         newFormData[name] = value;
//       }
//       debouncedSetFormData(newFormData);
//       setValidationErrors((prev) => ({
//         ...prev,
//         ...validateField(
//           name,
//           value,
//           serviceIndex,
//           subServiceIndex,
//           scopeIndex
//         ),
//       }));
//       return newFormData;
//     });
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex
//   ) => {
//     const slaTypeId = e.target.value;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//       return newFormData;
//     });
//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex
//       ),
//     }));
//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => {
//           setError("Failed to load priority levels.");
//         });
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [
//                 {
//                   scopeId: "",
//                   slaTypeId: "",
//                   priorityId: "",
//                   dutyHours: "",
//                   offDutyHours: "",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [
//           {
//             scopeId: "",
//             slaTypeId: "",
//             priorityId: "",
//             dutyHours: "",
//             offDutyHours: "",
//           },
//         ],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//         dutyHours: "",
//         offDutyHours: "",
//       });
//       return newFormData;
//     });
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`service-${serviceIndex}`) ||
//           key.startsWith(`subService-${serviceIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//                 dutyHours: "",
//                 offDutyHours: "",
//               },
//             ],
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (key.startsWith(`subService-${serviceIndex}-${subServiceIndex}`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [
//           {
//             scopeId: "",
//             slaTypeId: "",
//             priorityId: "",
//             dutyHours: "",
//             offDutyHours: "",
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(
//             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//           )
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName)
//       errors.contractName = "Contract name is required.";
//     if (!formData.companyId) errors.companyId = "Company is required.";
//     if (!formData.projectType) errors.projectType = "Project type is required.";
//     if (!formData.startDate) errors.startDate = "Start date is required.";
//     if (!formData.endDate) errors.endDate = "End date is required.";
//     if (!formData.services.length)
//       errors.services = "At least one service is required.";
//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Service is required.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service is required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Sub-service is required.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope is required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Scope is required.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "SLA type is required.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Priority level is required.";
//           if (scope.dutyHours === "" || scope.dutyHours < 0)
//             errors[
//               `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Valid duty hours required.";
//           if (scope.offDutyHours === "" || scope.offDutyHours < 0)
//             errors[
//               `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Valid off-duty hours required.";
//         });
//       });
//     });
//     return errors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const cleanedFormData = {
//       ...formData,
//       companyId: parseInt(formData.companyId, 10),
//       services: formData.services.map((service) => ({
//         ...service,
//         serviceId: parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           ...subService,
//           subServiceId: parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             ...scope,
//             scopeId: parseInt(scope.scopeId, 10),
//             slaTypeId: parseInt(scope.slaTypeId, 10),
//             priorityId: parseInt(scope.priorityId, 10),
//             dutyHours: scope.dutyHours ? parseFloat(scope.dutyHours) : null,
//             offDutyHours: scope.offDutyHours
//               ? parseFloat(scope.offDutyHours)
//               : null,
//           })),
//         })),
//       })),
//     };
//     onSubmit(cleanedFormData, contractId);
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
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
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>
//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Contract Name
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Enter a unique name for the contract"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="text"
//               name="contractName"
//               value={formData.contractName}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.contractName
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.contractName && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.contractName}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Select the company associated with this contract"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <select
//               name="companyId"
//               value={formData.companyId}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.companyId
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             >
//               <option value="">Select Company</option>
//               {companies.map((company) => (
//                 <option key={company.companyId} value={company.companyId}>
//                   {company.companyName}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.companyId && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.companyId}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Location
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Optional: Specify the project location"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="text"
//               name="projectLocation"
//               value={formData.projectLocation}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Type
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Choose the contract duration type"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <select
//               name="projectType"
//               value={formData.projectType}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.projectType
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             >
//               <option value="">Select Project Type</option>
//               <option value="ANNUAL">Annual</option>
//               <option value="ONE_TIME">One Time</option>
//             </select>
//             {validationErrors.projectType && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.projectType}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Start Date
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Contract start date"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.startDate
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.startDate && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.startDate}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               End Date
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Contract end date"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.endDate ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.endDate && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.endDate}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Services */}
//         {formData.services.map((service, serviceIndex) => (
//           <div
//             key={serviceIndex}
//             className="bg-blue-50 p-4 rounded-lg shadow-sm mt-4"
//           >
//             <div
//               className="flex items-center justify-between bg-blue-100 p-3 rounded-lg cursor-pointer"
//               onClick={() => toggleCollapse("service", serviceIndex)}
//             >
//               <h4 className="text-lg font-semibold text-blue-800">
//                 Service {serviceIndex + 1}
//               </h4>
//               <div className="flex items-center space-x-3">
//                 <button
//                   type="button"
//                   className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeService(serviceIndex);
//                   }}
//                   disabled={formData.services.length === 1}
//                   title="Remove Service"
//                 >
//                   <TrashIcon className="h-5 w-5" />
//                 </button>
//                 {collapsedSections[`service-${serviceIndex}`] ? (
//                   <ChevronUpIcon className="h-5 w-5 text-blue-600" />
//                 ) : (
//                   <ChevronDownIcon className="h-5 w-5 text-blue-600" />
//                 )}
//               </div>
//             </div>
//             {!collapsedSections[`service-${serviceIndex}`] && (
//               <div className="mt-4 space-y-4">
//                 <div className="relative">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Service
//                     <span
//                       className="ml-1 text-gray-500 cursor-help"
//                       title="Select the main service category"
//                     >
//                       ⓘ
//                     </span>
//                   </label>
//                   <select
//                     name="serviceId"
//                     value={service.serviceId}
//                     onChange={(e) => handleChange(e, serviceIndex)}
//                     className={`w-full p-3 border ${
//                       validationErrors[`service-${serviceIndex}`]
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     required
//                   >
//                     <option value="">Select Service</option>
//                     {services.map((s) => (
//                       <option key={s.serviceId} value={s.serviceId}>
//                         {s.serviceName}
//                       </option>
//                     ))}
//                   </select>
//                   {validationErrors[`service-${serviceIndex}`] && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {validationErrors[`service-${serviceIndex}`]}
//                     </p>
//                   )}
//                 </div>

//                 {/* Sub-Services */}
//                 {service.subServices.map((subService, subServiceIndex) => (
//                   <div
//                     key={subServiceIndex}
//                     className="ml-4 mt-4 bg-gray-50 p-4 rounded-lg shadow-sm"
//                   >
//                     <div
//                       className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer"
//                       onClick={() =>
//                         toggleCollapse(
//                           "subService",
//                           serviceIndex,
//                           subServiceIndex
//                         )
//                       }
//                     >
//                       <h5 className="text-md font-medium text-gray-700">
//                         Sub-Service {subServiceIndex + 1}
//                       </h5>
//                       <div className="flex items-center space-x-3">
//                         <button
//                           type="button"
//                           className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeSubService(serviceIndex, subServiceIndex);
//                           }}
//                           disabled={service.subServices.length === 1}
//                           title="Remove Sub-Service"
//                         >
//                           <TrashIcon className="h-5 w-5" />
//                         </button>
//                         {collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] ? (
//                           <ChevronUpIcon className="h-5 w-5 text-gray-600" />
//                         ) : (
//                           <ChevronDownIcon className="h-5 w-5 text-gray-600" />
//                         )}
//                       </div>
//                     </div>
//                     {!collapsedSections[
//                       `subService-${serviceIndex}-${subServiceIndex}`
//                     ] && (
//                       <div className="mt-4 space-y-4">
//                         <div className="relative">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Sub-Service
//                             <span
//                               className="ml-1 text-gray-500 cursor-help"
//                               title="Select a sub-service under the main service"
//                             >
//                               ⓘ
//                             </span>
//                           </label>
//                           <select
//                             name="subServiceId"
//                             value={subService.subServiceId}
//                             onChange={(e) =>
//                               handleChange(e, serviceIndex, subServiceIndex)
//                             }
//                             className={`w-full p-3 border ${
//                               validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ]
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                             required
//                           >
//                             <option value="">Select Sub-Service</option>
//                             {(subServices[service.serviceId] || []).map(
//                               (ss) => (
//                                 <option
//                                   key={ss.subServiceId}
//                                   value={ss.subServiceId}
//                                 >
//                                   {ss.subServiceName}
//                                 </option>
//                               )
//                             )}
//                           </select>
//                           {validationErrors[
//                             `subService-${serviceIndex}-${subServiceIndex}`
//                           ] && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {
//                                 validationErrors[
//                                   `subService-${serviceIndex}-${subServiceIndex}`
//                                 ]
//                               }
//                             </p>
//                           )}
//                         </div>

//                         {/* Service Scopes */}
//                         {subService.serviceScopes.map((scope, scopeIndex) => (
//                           <div
//                             key={scopeIndex}
//                             className="ml-4 mt-4 bg-white p-4 rounded-lg shadow-sm"
//                           >
//                             <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                               <h6 className="text-sm font-medium text-gray-700">
//                                 Scope {scopeIndex + 1}
//                               </h6>
//                               <button
//                                 type="button"
//                                 className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                                 onClick={() =>
//                                   removeServiceScope(
//                                     serviceIndex,
//                                     subServiceIndex,
//                                     scopeIndex
//                                   )
//                                 }
//                                 disabled={subService.serviceScopes.length === 1}
//                                 title="Remove Scope"
//                               >
//                                 <TrashIcon className="h-5 w-5" />
//                               </button>
//                             </div>
//                             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Service Scope
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Define the specific scope of work"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="scopeId"
//                                   value={scope.scopeId}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select Scope</option>
//                                   {(
//                                     serviceScopes[subService.subServiceId] || []
//                                   ).map((sc) => (
//                                     <option key={sc.scopeId} value={sc.scopeId}>
//                                       {sc.scopeName}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 {validationErrors[
//                                   `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   SLA Type
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Select the Service Level Agreement type"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="slaTypeId"
//                                   value={scope.slaTypeId}
//                                   onChange={(e) =>
//                                     handleSlaTypeChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select SLA Type</option>
//                                   {slaTypes.map((sla) => (
//                                     <option
//                                       key={sla.slaTypeId}
//                                       value={sla.slaTypeId}
//                                     >
//                                       {sla.slaTypeName}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 {validationErrors[
//                                   `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Priority Level
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Set the priority for this scope"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="priorityId"
//                                   value={scope.priorityId}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select Priority</option>
//                                   {(priorityLevels[scope.slaTypeId] || []).map(
//                                     (pl) => (
//                                       <option
//                                         key={pl.priorityId}
//                                         value={pl.priorityId}
//                                       >
//                                         {pl.priorityName}
//                                       </option>
//                                     )
//                                   )}
//                                 </select>
//                                 {validationErrors[
//                                   `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Duty Hours
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Hours during active duty"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="dutyHours"
//                                   value={scope.dutyHours}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   step="0.1"
//                                   min="0"
//                                   required
//                                 />
//                                 {validationErrors[
//                                   `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Off-Duty Hours
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Hours outside active duty"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="offDutyHours"
//                                   value={scope.offDutyHours}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   step="0.1"
//                                   min="0"
//                                   required
//                                 />
//                                 {validationErrors[
//                                   `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() =>
//                             addServiceScope(serviceIndex, subServiceIndex)
//                           }
//                           className="mt-4 flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                           title="Add a new scope"
//                         >
//                           <PlusIcon className="h-5 w-5 mr-1" />
//                           Add Scope
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addSubService(serviceIndex)}
//                   className="mt-4 flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   title="Add a new sub-service"
//                 >
//                   <PlusIcon className="h-5 w-5 mr-1" />
//                   Add Sub-Service
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//         <div className="mt-6 flex space-x-4">
//           <button
//             type="button"
//             onClick={addService}
//             className="flex items-center bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//             title="Add a new service"
//           >
//             <PlusIcon className="h-5 w-5 mr-1" />
//             Add Service
//           </button>
//           <button
//             type="submit"
//             className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {contractId ? "Update Contract" : "Create Contract"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

// import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import debounce from "lodash/debounce";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//                 dutyHours: "",
//                 offDutyHours: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   });
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});

//   const debouncedSetFormData = useCallback(
//     debounce((newFormData) => {
//       setFormData(newFormData);
//     }, 300),
//     []
//   );

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         setCompanies(Array.isArray(companiesRes.data) ? companiesRes.data : []);
//         setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
//         setSlaTypes(Array.isArray(slaTypesRes.data) ? slaTypesRes.data : []);

//         if (contractId) {
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;
//           setFormData({
//             contractName: contract.contractName || "",
//             companyId: contract.companyId?.toString() || "",
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: contract.services?.map((cs) => ({
//               serviceId: cs.serviceId?.toString() || "",
//               subServices: cs.subServices?.map((css) => ({
//                 subServiceId: css.subServiceId?.toString() || "",
//                 serviceScopes: css.serviceScopes?.map((scope) => ({
//                   scopeId: scope.scopeId?.toString() || "",
//                   slaTypeId: scope.slaTypeId?.toString() || "",
//                   priorityId: scope.priorityId?.toString() || "",
//                   dutyHours: scope.dutyHours?.toString() || "",
//                   offDutyHours: scope.offDutyHours?.toString() || "",
//                 })) || [
//                   {
//                     scopeId: "",
//                     slaTypeId: "",
//                     priorityId: "",
//                     dutyHours: "",
//                     offDutyHours: "",
//                   },
//                 ],
//               })) || [
//                 {
//                   subServiceId: "",
//                   serviceScopes: [
//                     {
//                       scopeId: "",
//                       slaTypeId: "",
//                       priorityId: "",
//                       dutyHours: "",
//                       offDutyHours: "",
//                     },
//                   ],
//                 },
//               ],
//             })) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           });

//           // Fetch sub-services and scopes for pre-filled services
//           for (const service of contract.services || []) {
//             if (service.serviceId) {
//               const subServicesRes = await contractService.getSubServices(
//                 service.serviceId
//               );
//               setSubServices((prev) => ({
//                 ...prev,
//                 [service.serviceId]: Array.isArray(subServicesRes.data)
//                   ? subServicesRes.data
//                   : [],
//               }));
//             }
//             for (const subService of service.subServices || []) {
//               if (subService.subServiceId) {
//                 const scopesRes = await contractService.getServiceScopes(
//                   subService.subServiceId
//                 );
//                 setServiceScopes((prev) => ({
//                   ...prev,
//                   [subService.subServiceId]: Array.isArray(scopesRes.data)
//                     ? scopesRes.data
//                     : [],
//                 }));
//               }
//               for (const scope of subService.serviceScopes || []) {
//                 if (scope.slaTypeId) {
//                   const prioritiesRes = await contractService.getPriorityLevels(
//                     scope.slaTypeId
//                   );
//                   setPriorityLevels((prev) => ({
//                     ...prev,
//                     [scope.slaTypeId]: Array.isArray(prioritiesRes.data)
//                       ? prioritiesRes.data
//                       : [],
//                   }));
//                 }
//               }
//             }
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyHours" && (value === "" || value < 0))
//       errors[`dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Valid duty hours required.";
//     if (name === "offDutyHours" && (value === "" || value < 0))
//       errors[`offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Valid off-duty hours required.";
//     return errors;
//   };

//   const handleChange = (e, serviceIndex, subServiceIndex, scopeIndex) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (
//         serviceIndex !== undefined &&
//         subServiceIndex !== undefined &&
//         scopeIndex !== undefined
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex][name] = value;
//       } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//         newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//           value;
//         if (name === "subServiceId" && value) {
//           contractService
//             .getServiceScopes(value)
//             .then((res) => {
//               setServiceScopes((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               setError("Failed to load service scopes.");
//             });
//         }
//       } else if (serviceIndex !== undefined) {
//         newFormData.services[serviceIndex][name] = value;
//         if (name === "serviceId" && value) {
//           contractService
//             .getSubServices(value)
//             .then((res) => {
//               setSubServices((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               setError("Failed to load sub-services.");
//             });
//         }
//       } else {
//         newFormData[name] = value;
//       }
//       debouncedSetFormData(newFormData);
//       setValidationErrors((prev) => ({
//         ...prev,
//         ...validateField(
//           name,
//           value,
//           serviceIndex,
//           subServiceIndex,
//           scopeIndex
//         ),
//       }));
//       return newFormData;
//     });
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex
//   ) => {
//     const slaTypeId = e.target.value;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//       return newFormData;
//     });
//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex
//       ),
//     }));
//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => {
//           setError("Failed to load priority levels.");
//         });
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [
//                 {
//                   scopeId: "",
//                   slaTypeId: "",
//                   priorityId: "",
//                   dutyHours: "",
//                   offDutyHours: "",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [
//           {
//             scopeId: "",
//             slaTypeId: "",
//             priorityId: "",
//             dutyHours: "",
//             offDutyHours: "",
//           },
//         ],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//         dutyHours: "",
//         offDutyHours: "",
//       });
//       return newFormData;
//     });
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`service-${serviceIndex}`) ||
//           key.startsWith(`subService-${serviceIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//                 dutyHours: "",
//                 offDutyHours: "",
//               },
//             ],
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (key.startsWith(`subService-${serviceIndex}-${subServiceIndex}`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [
//           {
//             scopeId: "",
//             slaTypeId: "",
//             priorityId: "",
//             dutyHours: "",
//             offDutyHours: "",
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(
//             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//           )
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName)
//       errors.contractName = "Contract name is required.";
//     if (!formData.companyId) errors.companyId = "Company is required.";
//     if (!formData.projectType) errors.projectType = "Project type is required.";
//     if (!formData.startDate) errors.startDate = "Start date is required.";
//     if (!formData.endDate) errors.endDate = "End date is required.";
//     if (!formData.services.length)
//       errors.services = "At least one service is required.";
//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Service is required.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service is required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Sub-service is required.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope is required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Scope is required.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "SLA type is required.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Priority level is required.";
//           if (scope.dutyHours === "" || scope.dutyHours < 0)
//             errors[
//               `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Valid duty hours required.";
//           if (scope.offDutyHours === "" || scope.offDutyHours < 0)
//             errors[
//               `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Valid off-duty hours required.";
//         });
//       });
//     });
//     return errors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const cleanedFormData = {
//       ...formData,
//       companyId: parseInt(formData.companyId, 10),
//       services: formData.services.map((service) => ({
//         ...service,
//         serviceId: parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           ...subService,
//           subServiceId: parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             ...scope,
//             scopeId: parseInt(scope.scopeId, 10),
//             slaTypeId: parseInt(scope.slaTypeId, 10),
//             priorityId: parseInt(scope.priorityId, 10),
//             dutyHours: scope.dutyHours ? parseFloat(scope.dutyHours) : null,
//             offDutyHours: scope.offDutyHours
//               ? parseFloat(scope.offDutyHours)
//               : null,
//           })),
//         })),
//       })),
//     };
//     onSubmit(cleanedFormData, contractId);
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
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
//     <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>
//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Contract Name
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Enter a unique name for the contract"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="text"
//               name="contractName"
//               value={formData.contractName}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.contractName
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.contractName && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.contractName}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Company
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Select the company associated with this contract"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <select
//               name="companyId"
//               value={formData.companyId}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.companyId
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             >
//               <option value="">Select Company</option>
//               {companies.map((company) => (
//                 <option key={company.companyId} value={company.companyId}>
//                   {company.companyName}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.companyId && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.companyId}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Location
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Optional: Specify the project location"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="text"
//               name="projectLocation"
//               value={formData.projectLocation}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Project Type
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Choose the contract duration type"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <select
//               name="projectType"
//               value={formData.projectType}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.projectType
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             >
//               <option value="">Select Project Type</option>
//               <option value="ANNUAL">Annual</option>
//               <option value="ONE_TIME">One Time</option>
//             </select>
//             {validationErrors.projectType && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.projectType}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Start Date
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Contract start date"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.startDate
//                   ? "border-red-500"
//                   : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.startDate && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.startDate}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               End Date
//               <span
//                 className="ml-1 text-gray-500 cursor-help"
//                 title="Contract end date"
//               >
//                 ⓘ
//               </span>
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.endDate ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//               required
//             />
//             {validationErrors.endDate && (
//               <p className="text-red-500 text-sm mt-1">
//                 {validationErrors.endDate}
//               </p>
//             )}
//           </div>
//         </div>

//         {formData.services.map((service, serviceIndex) => (
//           <div
//             key={serviceIndex}
//             className="bg-blue-50 p-4 rounded-lg shadow-sm mt-4"
//           >
//             <div
//               className="flex items-center justify-between bg-blue-100 p-3 rounded-lg cursor-pointer"
//               onClick={() => toggleCollapse("service", serviceIndex)}
//             >
//               <h4 className="text-lg font-semibold text-blue-800">
//                 Service {serviceIndex + 1}
//               </h4>
//               <div className="flex items-center space-x-3">
//                 <button
//                   type="button"
//                   className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeService(serviceIndex);
//                   }}
//                   disabled={formData.services.length === 1}
//                   title="Remove Service"
//                 >
//                   <TrashIcon className="h-5 w-5" />
//                 </button>
//                 {collapsedSections[`service-${serviceIndex}`] ? (
//                   <ChevronUpIcon className="h-5 w-5 text-blue-600" />
//                 ) : (
//                   <ChevronDownIcon className="h-5 w-5 text-blue-600" />
//                 )}
//               </div>
//             </div>
//             {!collapsedSections[`service-${serviceIndex}`] && (
//               <div className="mt-4 space-y-4">
//                 <div className="relative">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Service
//                     <span
//                       className="ml-1 text-gray-500 cursor-help"
//                       title="Select the main service category"
//                     >
//                       ⓘ
//                     </span>
//                   </label>
//                   <select
//                     name="serviceId"
//                     value={service.serviceId}
//                     onChange={(e) => handleChange(e, serviceIndex)}
//                     className={`w-full p-3 border ${
//                       validationErrors[`service-${serviceIndex}`]
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     required
//                   >
//                     <option value="">Select Service</option>
//                     {services.map((s) => (
//                       <option key={s.serviceId} value={s.serviceId}>
//                         {s.serviceName}
//                       </option>
//                     ))}
//                   </select>
//                   {validationErrors[`service-${serviceIndex}`] && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {validationErrors[`service-${serviceIndex}`]}
//                     </p>
//                   )}
//                 </div>

//                 {service.subServices.map((subService, subServiceIndex) => (
//                   <div
//                     key={subServiceIndex}
//                     className="ml-4 mt-4 bg-gray-50 p-4 rounded-lg shadow-sm"
//                   >
//                     <div
//                       className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer"
//                       onClick={() =>
//                         toggleCollapse(
//                           "subService",
//                           serviceIndex,
//                           subServiceIndex
//                         )
//                       }
//                     >
//                       <h5 className="text-md font-medium text-gray-700">
//                         Sub-Service {subServiceIndex + 1}
//                       </h5>
//                       <div className="flex items-center space-x-3">
//                         <button
//                           type="button"
//                           className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeSubService(serviceIndex, subServiceIndex);
//                           }}
//                           disabled={service.subServices.length === 1}
//                           title="Remove Sub-Service"
//                         >
//                           <TrashIcon className="h-5 w-5" />
//                         </button>
//                         {collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] ? (
//                           <ChevronUpIcon className="h-5 w-5 text-gray-600" />
//                         ) : (
//                           <ChevronDownIcon className="h-5 w-5 text-gray-600" />
//                         )}
//                       </div>
//                     </div>
//                     {!collapsedSections[
//                       `subService-${serviceIndex}-${subServiceIndex}`
//                     ] && (
//                       <div className="mt-4 space-y-4">
//                         <div className="relative">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Sub-Service
//                             <span
//                               className="ml-1 text-gray-500 cursor-help"
//                               title="Select a sub-service under the main service"
//                             >
//                               ⓘ
//                             </span>
//                           </label>
//                           <select
//                             name="subServiceId"
//                             value={subService.subServiceId}
//                             onChange={(e) =>
//                               handleChange(e, serviceIndex, subServiceIndex)
//                             }
//                             className={`w-full p-3 border ${
//                               validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ]
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                             required
//                           >
//                             <option value="">Select Sub-Service</option>
//                             {(subServices[service.serviceId] || []).map(
//                               (ss) => (
//                                 <option
//                                   key={ss.subServiceId}
//                                   value={ss.subServiceId}
//                                 >
//                                   {ss.subServiceName}
//                                 </option>
//                               )
//                             )}
//                           </select>
//                           {validationErrors[
//                             `subService-${serviceIndex}-${subServiceIndex}`
//                           ] && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {
//                                 validationErrors[
//                                   `subService-${serviceIndex}-${subServiceIndex}`
//                                 ]
//                               }
//                             </p>
//                           )}
//                         </div>

//                         {subService.serviceScopes.map((scope, scopeIndex) => (
//                           <div
//                             key={scopeIndex}
//                             className="ml-4 mt-4 bg-white p-4 rounded-lg shadow-sm"
//                           >
//                             <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                               <h6 className="text-sm font-medium text-gray-700">
//                                 Scope {scopeIndex + 1}
//                               </h6>
//                               <button
//                                 type="button"
//                                 className="text-red-600 hover:text-red-800 disabled:opacity-50"
//                                 onClick={() =>
//                                   removeServiceScope(
//                                     serviceIndex,
//                                     subServiceIndex,
//                                     scopeIndex
//                                   )
//                                 }
//                                 disabled={subService.serviceScopes.length === 1}
//                                 title="Remove Scope"
//                               >
//                                 <TrashIcon className="h-5 w-5" />
//                               </button>
//                             </div>
//                             <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Service Scope
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Define the specific scope of work"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="scopeId"
//                                   value={scope.scopeId}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select Scope</option>
//                                   {(
//                                     serviceScopes[subService.subServiceId] || []
//                                   ).map((sc) => (
//                                     <option key={sc.scopeId} value={sc.scopeId}>
//                                       {sc.scopeName}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 {validationErrors[
//                                   `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   SLA Type
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Select the Service Level Agreement type"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="slaTypeId"
//                                   value={scope.slaTypeId}
//                                   onChange={(e) =>
//                                     handleSlaTypeChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select SLA Type</option>
//                                   {slaTypes.map((sla) => (
//                                     <option
//                                       key={sla.slaTypeId}
//                                       value={sla.slaTypeId}
//                                     >
//                                       {sla.slaTypeName}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 {validationErrors[
//                                   `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Priority Level
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Set the priority for this scope"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <select
//                                   name="priorityId"
//                                   value={scope.priorityId}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   required
//                                 >
//                                   <option value="">Select Priority</option>
//                                   {(priorityLevels[scope.slaTypeId] || []).map(
//                                     (pl) => (
//                                       <option
//                                         key={pl.priorityId}
//                                         value={pl.priorityId}
//                                       >
//                                         {pl.priorityName}
//                                       </option>
//                                     )
//                                   )}
//                                 </select>
//                                 {validationErrors[
//                                   `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Duty Hours
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Hours during active duty"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="dutyHours"
//                                   value={scope.dutyHours}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   step="0.1"
//                                   min="0"
//                                   required
//                                 />
//                                 {validationErrors[
//                                   `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                   Off-Duty Hours
//                                   <span
//                                     className="ml-1 text-gray-500 cursor-help"
//                                     title="Hours outside active duty"
//                                   >
//                                     ⓘ
//                                   </span>
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="offDutyHours"
//                                   value={scope.offDutyHours}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-300"
//                                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                                   step="0.1"
//                                   min="0"
//                                   required
//                                 />
//                                 {validationErrors[
//                                   `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-sm mt-1">
//                                     {
//                                       validationErrors[
//                                         `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() =>
//                             addServiceScope(serviceIndex, subServiceIndex)
//                           }
//                           className="mt-4 flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                           title="Add a new scope"
//                         >
//                           <PlusIcon className="h-5 w-5 mr-1" />
//                           Add Scope
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addSubService(serviceIndex)}
//                   className="mt-4 flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   title="Add a new sub-service"
//                 >
//                   <PlusIcon className="h-5 w-5 mr-1" />
//                   Add Sub-Service
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//         <div className="mt-6 flex space-x-4">
//           <button
//             type="button"
//             onClick={addService}
//             className="flex items-center bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//             title="Add a new service"
//           >
//             <PlusIcon className="h-5 w-5 mr-1" />
//             Add Service
//           </button>
//           <button
//             type="submit"
//             className="flex items-center bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {contractId ? "Update Contract" : "Create Contract"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

///222222222222
// import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import debounce from "lodash/debounce";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//                 dutyHours: "",
//                 offDutyHours: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   });
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});

//   const debouncedSetFormData = useCallback(
//     debounce((newFormData) => {
//       setFormData(newFormData);
//     }, 300),
//     []
//   );

//   // Fetch initial data and contract details
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch base data
//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         const companiesData = Array.isArray(companiesRes.data)
//           ? companiesRes.data
//           : [];
//         const servicesData = Array.isArray(servicesRes.data)
//           ? servicesRes.data
//           : [];
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         console.log("Companies Data:", companiesData);
//         console.log("Services Data:", servicesData);
//         console.log("SLA Types Data:", slaTypesData);

//         setCompanies(companiesData);
//         setServices(servicesData);
//         setSlaTypes(slaTypesData);

//         if (contractId) {
//           // Fetch contract details
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;
//           console.log("Contract Data:", contract);

//           // Initialize maps for dependent data
//           const subServicesMap = {};
//           const serviceScopesMap = {};
//           const priorityLevelsMap = {};

//           // Fetch dependent data for services, sub-services, and scopes
//           await Promise.all(
//             (contract.services || []).map(async (service) => {
//               // Map contractServiceId to serviceId using serviceName
//               const serviceMatch = servicesData.find(
//                 (s) => s.serviceName === service.serviceName
//               );
//               const serviceId = serviceMatch
//                 ? serviceMatch.serviceId.toString()
//                 : service.contractServiceId.toString();
//               if (serviceId && !subServicesMap[serviceId]) {
//                 try {
//                   const subServicesRes = await contractService.getSubServices(
//                     serviceId
//                   );
//                   subServicesMap[serviceId] = Array.isArray(subServicesRes.data)
//                     ? subServicesRes.data
//                     : [];
//                   console.log(
//                     `SubServices for service ${serviceId}:`,
//                     subServicesMap[serviceId]
//                   );
//                 } catch (err) {
//                   console.error(
//                     `Failed to fetch sub-services for service ${serviceId}:`,
//                     err
//                   );
//                   // Fallback: Use contract subServiceName
//                   subServicesMap[serviceId] = service.subServices.map((ss) => ({
//                     subServiceId: ss.contractSubServiceId,
//                     subServiceName: ss.subServiceName,
//                   }));
//                 }
//               }
//               await Promise.all(
//                 (service.subServices || []).map(async (subService) => {
//                   // Map contractSubServiceId to subServiceId using subServiceName
//                   const subServiceMatch = subServicesMap[serviceId]?.find(
//                     (ss) => ss.subServiceName === subService.subServiceName
//                   );
//                   const subServiceId = subServiceMatch
//                     ? subServiceMatch.subServiceId.toString()
//                     : subService.contractSubServiceId.toString();
//                   if (subServiceId && !serviceScopesMap[subServiceId]) {
//                     try {
//                       const scopesRes = await contractService.getServiceScopes(
//                         subServiceId
//                       );
//                       serviceScopesMap[subServiceId] = Array.isArray(
//                         scopesRes.data
//                       )
//                         ? scopesRes.data
//                         : [];
//                       console.log(
//                         `Scopes for sub-service ${subServiceId}:`,
//                         serviceScopesMap[subServiceId]
//                       );
//                     } catch (err) {
//                       console.error(
//                         `Failed to fetch scopes for sub-service ${subServiceId}:`,
//                         err
//                       );
//                       // Fallback: Use contract scopeName
//                       serviceScopesMap[subServiceId] =
//                         subService.serviceScopes.map((sc) => ({
//                           scopeId: sc.contractScopeId,
//                           scopeName: sc.scopeName,
//                         }));
//                     }
//                   }
//                   await Promise.all(
//                     (subService.serviceScopes || []).map(async (scope) => {
//                       const slaTypeName = scope.slaTypeName;
//                       const slaType = slaTypesData.find(
//                         (sla) => sla.slaTypeName === slaTypeName
//                       );
//                       const slaTypeId = slaType
//                         ? slaType.slaTypeId.toString()
//                         : "";
//                       if (slaTypeId && !priorityLevelsMap[slaTypeId]) {
//                         try {
//                           const prioritiesRes =
//                             await contractService.getPriorityLevels(slaTypeId);
//                           priorityLevelsMap[slaTypeId] = Array.isArray(
//                             prioritiesRes.data
//                           )
//                             ? prioritiesRes.data
//                             : [];
//                           console.log(
//                             `Priorities for SLA ${slaTypeId}:`,
//                             priorityLevelsMap[slaTypeId]
//                           );
//                         } catch (err) {
//                           console.error(
//                             `Failed to fetch priorities for SLA ${slaTypeId}:`,
//                             err
//                           );
//                           // Fallback: Use contract priorityName
//                           priorityLevelsMap[slaTypeId] = [
//                             {
//                               priorityId: scope.priorityName,
//                               priorityName: scope.priorityName,
//                             },
//                           ];
//                         }
//                       }
//                     })
//                   );
//                 })
//               );
//             })
//           );

//           console.log("SubServices Map:", subServicesMap);
//           console.log("ServiceScopes Map:", serviceScopesMap);
//           console.log("PriorityLevels Map:", priorityLevelsMap);

//           // Update dependent state
//           setSubServices(subServicesMap);
//           setServiceScopes(serviceScopesMap);
//           setPriorityLevels(priorityLevelsMap);

//           // Map contract data to formData
//           const company = companiesData.find(
//             (c) => c.companyName === contract.companyName
//           );
//           const companyId = company ? company.companyId.toString() : "";

//           const newFormData = {
//             contractName: contract.contractName || "",
//             companyId: companyId,
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: contract.services?.map((cs) => {
//               const serviceMatch = servicesData.find(
//                 (s) => s.serviceName === cs.serviceName
//               );
//               const serviceId = serviceMatch
//                 ? serviceMatch.serviceId.toString()
//                 : cs.contractServiceId.toString();
//               return {
//                 serviceId,
//                 subServices: cs.subServices?.map((css) => {
//                   const subServiceMatch = subServicesMap[serviceId]?.find(
//                     (ss) => ss.subServiceName === css.subServiceName
//                   );
//                   const subServiceId = subServiceMatch
//                     ? subServiceMatch.subServiceId.toString()
//                     : css.contractSubServiceId.toString();
//                   return {
//                     subServiceId,
//                     serviceScopes: css.serviceScopes?.map((scope) => {
//                       const scopeMatch = serviceScopesMap[subServiceId]?.find(
//                         (sc) => sc.scopeName === scope.scopeName
//                       );
//                       const scopeId = scopeMatch
//                         ? scopeMatch.scopeId.toString()
//                         : scope.contractScopeId.toString();
//                       const slaType = slaTypesData.find(
//                         (sla) => sla.slaTypeName === scope.slaTypeName
//                       );
//                       const slaTypeId = slaType
//                         ? slaType.slaTypeId.toString()
//                         : "";
//                       const priority = priorityLevelsMap[slaTypeId]?.find(
//                         (p) => p.priorityName === scope.priorityName
//                       );
//                       const priorityId = priority
//                         ? priority.priorityId.toString()
//                         : scope.priorityName;
//                       return {
//                         scopeId,
//                         slaTypeId,
//                         priorityId,
//                         dutyHours:
//                           scope.dutyHours != null
//                             ? scope.dutyHours.toString()
//                             : "",
//                         offDutyHours:
//                           scope.offDutyHours != null
//                             ? scope.offDutyHours.toString()
//                             : "",
//                       };
//                     }) || [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   };
//                 }) || [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               };
//             }) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           };

//           console.log("Mapped FormData:", newFormData);
//           setFormData(newFormData);
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyHours" && (value === "" || value < 0))
//       errors[`dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Valid duty hours required.";
//     if (name === "offDutyHours" && (value === "" || value < 0))
//       errors[`offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Valid off-duty hours required.";
//     return errors;
//   };

//   const handleChange = (e, serviceIndex, subServiceIndex, scopeIndex) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (
//         serviceIndex !== undefined &&
//         subServiceIndex !== undefined &&
//         scopeIndex !== undefined
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex][name] = value;
//         // Reset dependent fields
//         if (name === "scopeId") {
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes[scopeIndex].slaTypeId = "";
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes[scopeIndex].priorityId = "";
//         }
//       } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//         newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//           value;
//         // Reset dependent fields and fetch scopes
//         if (name === "subServiceId") {
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes = [
//             {
//               scopeId: "",
//               slaTypeId: "",
//               priorityId: "",
//               dutyHours: "",
//               offDutyHours: "",
//             },
//           ];
//           if (value) {
//             contractService
//               .getServiceScopes(value)
//               .then((res) => {
//                 setServiceScopes((prev) => ({
//                   ...prev,
//                   [value]: Array.isArray(res.data) ? res.data : [],
//                 }));
//               })
//               .catch((err) => {
//                 setError("Failed to load service scopes.");
//               });
//           }
//         }
//       } else if (serviceIndex !== undefined) {
//         newFormData.services[serviceIndex][name] = value;
//         // Reset dependent fields and fetch sub-services
//         if (name === "serviceId") {
//           newFormData.services[serviceIndex].subServices = [
//             {
//               subServiceId: "",
//               serviceScopes: [
//                 {
//                   scopeId: "",
//                   slaTypeId: "",
//                   priorityId: "",
//                   dutyHours: "",
//                   offDutyHours: "",
//                 },
//               ],
//             },
//           ];
//           if (value) {
//             contractService
//               .getSubServices(value)
//               .then((res) => {
//                 setSubServices((prev) => ({
//                   ...prev,
//                   [value]: Array.isArray(res.data) ? res.data : [],
//                 }));
//               })
//               .catch((err) => {
//                 setError("Failed to load sub-services.");
//               });
//           }
//         }
//       } else {
//         newFormData[name] = value;
//       }
//       debouncedSetFormData(newFormData);
//       setValidationErrors((prev) => ({
//         ...prev,
//         ...validateField(
//           name,
//           value,
//           serviceIndex,
//           subServiceIndex,
//           scopeIndex
//         ),
//       }));
//       return newFormData;
//     });
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex
//   ) => {
//     const slaTypeId = e.target.value;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes[scopeIndex].priorityId = ""; // Reset priority when SLA changes
//       return newFormData;
//     });
//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex
//       ),
//     }));
//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => {
//           setError("Failed to load priority levels.");
//         });
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [
//                 {
//                   scopeId: "",
//                   slaTypeId: "",
//                   priorityId: "",
//                   dutyHours: "",
//                   offDutyHours: "",
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [
//           {
//             scopeId: "",
//             slaTypeId: "",
//             priorityId: "",
//             dutyHours: "",
//             offDutyHours: "",
//           },
//         ],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//         dutyHours: "",
//         offDutyHours: "",
//       });
//       return newFormData;
//     });
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       {
//                         scopeId: "",
//                         slaTypeId: "",
//                         priorityId: "",
//                         dutyHours: "",
//                         offDutyHours: "",
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`service-${serviceIndex}`) ||
//           key.startsWith(`subService-${serviceIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//                 dutyHours: "",
//                 offDutyHours: "",
//               },
//             ],
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (key.startsWith(`subService-${serviceIndex}-${subServiceIndex}`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [
//           {
//             scopeId: "",
//             slaTypeId: "",
//             priorityId: "",
//             dutyHours: "",
//             offDutyHours: "",
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(
//             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//           )
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName)
//       errors.contractName = "Contract name is required.";
//     if (!formData.companyId) errors.companyId = "Company is required.";
//     if (!formData.projectType) errors.projectType = "Project type is required.";
//     if (!formData.startDate) errors.startDate = "Start date is required.";
//     if (!formData.endDate) errors.endDate = "End date is required.";
//     if (!formData.services.length)
//       errors.services = "At least one service is required.";
//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Service is required.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service is required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Sub-service is required.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope is required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Scope is required.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "SLA type is required.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Priority level is required.";
//           if (scope.dutyHours === "" || scope.dutyHours < 0)
//             errors[
//               `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Valid duty hours required.";
//           if (scope.offDutyHours === "" || scope.offDutyHours < 0)
//             errors[
//               `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Valid off-duty hours required.";
//         });
//       });
//     });
//     return errors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const cleanedFormData = {
//       ...formData,
//       companyId: parseInt(formData.companyId, 10),
//       services: formData.services.map((service) => ({
//         ...service,
//         serviceId: parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           ...subService,
//           subServiceId: parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             ...scope,
//             scopeId: parseInt(scope.scopeId, 10),
//             slaTypeId: parseInt(scope.slaTypeId, 10),
//             priorityId: parseInt(scope.priorityId, 10),
//             dutyHours: scope.dutyHours ? parseFloat(scope.dutyHours) : null,
//             offDutyHours: scope.offDutyHours
//               ? parseFloat(scope.offDutyHours)
//               : null,
//           })),
//         })),
//       })),
//     };
//     onSubmit(cleanedFormData, contractId);
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-8 bg-red-50 text-red-700 rounded-2xl max-w-3xl mx-auto my-12 shadow-md">
//         <p className="text-lg font-medium">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl my-12">
//       <h3 className="text-3xl font-semibold text-gray-900 mb-8">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>
//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm flex items-center">
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
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               Contract Name
//               <InformationCircleIcon
//                 className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                 title="Enter a unique name for the contract"
//               />
//             </label>
//             <input
//               type="text"
//               name="contractName"
//               value={formData.contractName}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.contractName
//                   ? "border-red-500"
//                   : "border-gray-200"
//               } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
//               required
//             />
//             {validationErrors.contractName && (
//               <p className="text-red-500 text-xs mt-1">
//                 {validationErrors.contractName}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               Company
//               <InformationCircleIcon
//                 className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                 title="Select the company associated with this contract"
//               />
//             </label>
//             <select
//               name="companyId"
//               value={formData.companyId}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.companyId
//                   ? "border-red-500"
//                   : "border-gray-200"
//               } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               required
//             >
//               <option value="">Select Company</option>
//               {companies.map((company) => (
//                 <option
//                   key={company.companyId}
//                   value={company.companyId.toString()}
//                 >
//                   {company.companyName}
//                 </option>
//               ))}
//             </select>
//             {validationErrors.companyId && (
//               <p className="text-red-500 text-xs mt-1">
//                 {validationErrors.companyId}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               Project Location
//               <InformationCircleIcon
//                 className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                 title="Optional: Specify the project location"
//               />
//             </label>
//             <input
//               type="text"
//               name="projectLocation"
//               value={formData.projectLocation}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
//             />
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               Project Type
//               <InformationCircleIcon
//                 className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                 title="Choose the contract duration type"
//               />
//             </label>
//             <select
//               name="projectType"
//               value={formData.projectType}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.projectType
//                   ? "border-red-500"
//                   : "border-gray-200"
//               } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               required
//             >
//               <option value="">Select Project Type</option>
//               <option value="ANNUAL">Annual</option>
//               <option value="ONE_TIME">One Time</option>
//             </select>
//             {validationErrors.projectType && (
//               <p className="text-red-500 text-xs mt-1">
//                 {validationErrors.projectType}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               Start Date
//               <InformationCircleIcon
//                 className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                 title="Contract start date"
//               />
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.startDate
//                   ? "border-red-500"
//                   : "border-gray-200"
//               } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
//               required
//             />
//             {validationErrors.startDate && (
//               <p className="text-red-500 text-xs mt-1">
//                 {validationErrors.startDate}
//               </p>
//             )}
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               End Date
//               <InformationCircleIcon
//                 className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                 title="Contract end date"
//               />
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className={`w-full p-3 border ${
//                 validationErrors.endDate ? "border-red-500" : "border-gray-200"
//               } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
//               required
//             />
//             {validationErrors.endDate && (
//               <p className="text-red-500 text-xs mt-1">
//                 {validationErrors.endDate}
//               </p>
//             )}
//           </div>
//         </div>

//         {formData.services.map((service, serviceIndex) => (
//           <div
//             key={serviceIndex}
//             className="bg-indigo-50 p-6 rounded-xl shadow-sm mt-6 transition-all duration-300"
//           >
//             <div
//               className="flex items-center justify-between bg-indigo-100 p-4 rounded-lg cursor-pointer hover:bg-indigo-200 transition-colors"
//               onClick={() => toggleCollapse("service", serviceIndex)}
//             >
//               <h4 className="text-xl font-semibold text-indigo-900">
//                 Service {serviceIndex + 1}
//               </h4>
//               <div className="flex items-center space-x-4">
//                 <button
//                   type="button"
//                   className="text-red-600 hover:text-red-800 disabled:opacity-30 transition-colors"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeService(serviceIndex);
//                   }}
//                   disabled={formData.services.length === 1}
//                   title="Remove Service"
//                 >
//                   <TrashIcon className="h-5 w-5" />
//                 </button>
//                 {collapsedSections[`service-${serviceIndex}`] ? (
//                   <ChevronUpIcon className="h-6 w-6 text-indigo-600" />
//                 ) : (
//                   <ChevronDownIcon className="h-6 w-6 text-indigo-600" />
//                 )}
//               </div>
//             </div>
//             {!collapsedSections[`service-${serviceIndex}`] && (
//               <div className="mt-6 space-y-6">
//                 <div className="relative">
//                   <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                     Service
//                     <InformationCircleIcon
//                       className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                       title="Select the main service category"
//                     />
//                   </label>
//                   <select
//                     name="serviceId"
//                     value={service.serviceId}
//                     onChange={(e) => handleChange(e, serviceIndex)}
//                     className={`w-full p-3 border ${
//                       validationErrors[`service-${serviceIndex}`]
//                         ? "border-red-500"
//                         : "border-gray-200"
//                     } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                     required
//                     disabled={services.length === 0}
//                   >
//                     <option value="">Select Service</option>
//                     {services.map((s) => (
//                       <option key={s.serviceId} value={s.serviceId.toString()}>
//                         {s.serviceName}
//                       </option>
//                     ))}
//                     {/* Fallback option for contract-specific service */}
//                     {formData.services[serviceIndex].serviceId &&
//                       !services.find(
//                         (s) =>
//                           s.serviceId.toString() ===
//                           formData.services[serviceIndex].serviceId
//                       ) && (
//                         <option
//                           value={formData.services[serviceIndex].serviceId}
//                         >
//                           {formData.services[serviceIndex].serviceId}{" "}
//                           (Contract-specific)
//                         </option>
//                       )}
//                   </select>
//                   {validationErrors[`service-${serviceIndex}`] && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {validationErrors[`service-${serviceIndex}`]}
//                     </p>
//                   )}
//                   {services.length === 0 && (
//                     <p className="text-yellow-600 text-xs mt-1">
//                       Loading services...
//                     </p>
//                   )}
//                 </div>

//                 {service.subServices.map((subService, subServiceIndex) => (
//                   <div
//                     key={subServiceIndex}
//                     className="ml-4 mt-6 bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-300"
//                   >
//                     <div
//                       className="flex items-center justify-between bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
//                       onClick={() =>
//                         toggleCollapse(
//                           "subService",
//                           serviceIndex,
//                           subServiceIndex
//                         )
//                       }
//                     >
//                       <h5 className="text-lg font-medium text-gray-800">
//                         Sub-Service {subServiceIndex + 1}
//                       </h5>
//                       <div className="flex items-center space-x-4">
//                         <button
//                           type="button"
//                           className="text-red-600 hover:text-red-800 disabled:opacity-30 transition-colors"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             removeSubService(serviceIndex, subServiceIndex);
//                           }}
//                           disabled={service.subServices.length === 1}
//                           title="Remove Sub-Service"
//                         >
//                           <TrashIcon className="h-5 w-5" />
//                         </button>
//                         {collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] ? (
//                           <ChevronUpIcon className="h-6 w-6 text-gray-600" />
//                         ) : (
//                           <ChevronDownIcon className="h-6 w-6 text-gray-600" />
//                         )}
//                       </div>
//                     </div>
//                     {!collapsedSections[
//                       `subService-${serviceIndex}-${subServiceIndex}`
//                     ] && (
//                       <div className="mt-6 space-y-6">
//                         <div className="relative">
//                           <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                             Sub-Service
//                             <InformationCircleIcon
//                               className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                               title="Select a sub-service under the main service"
//                             />
//                           </label>
//                           <select
//                             name="subServiceId"
//                             value={subService.subServiceId}
//                             onChange={(e) =>
//                               handleChange(e, serviceIndex, subServiceIndex)
//                             }
//                             className={`w-full p-3 border ${
//                               validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ]
//                                 ? "border-red-500"
//                                 : "border-gray-200"
//                             } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                             required
//                             disabled={
//                               !service.serviceId ||
//                               !subServices[service.serviceId]?.length
//                             }
//                           >
//                             <option value="">Select Sub-Service</option>
//                             {(subServices[service.serviceId] || []).map(
//                               (ss) => (
//                                 <option
//                                   key={ss.subServiceId}
//                                   value={ss.subServiceId.toString()}
//                                 >
//                                   {ss.subServiceName}
//                                 </option>
//                               )
//                             )}
//                             {/* Fallback option for contract-specific sub-service */}
//                             {subService.subServiceId &&
//                               !(subServices[service.serviceId] || []).find(
//                                 (ss) =>
//                                   ss.subServiceId.toString() ===
//                                   subService.subServiceId
//                               ) && (
//                                 <option value={subService.subServiceId}>
//                                   {subService.subServiceId} (Contract-specific)
//                                 </option>
//                               )}
//                           </select>
//                           {validationErrors[
//                             `subService-${serviceIndex}-${subServiceIndex}`
//                           ] && (
//                             <p className="text-red-500 text-xs mt-1">
//                               {
//                                 validationErrors[
//                                   `subService-${serviceIndex}-${subServiceIndex}`
//                                 ]
//                               }
//                             </p>
//                           )}
//                           {service.serviceId &&
//                             !subServices[service.serviceId]?.length && (
//                               <p className="text-yellow-600 text-xs mt-1">
//                                 Loading sub-services...
//                               </p>
//                             )}
//                         </div>

//                         {subService.serviceScopes.map((scope, scopeIndex) => (
//                           <div
//                             key={scopeIndex}
//                             className="ml-4 mt-6 bg-white p-6 rounded-xl shadow-sm"
//                           >
//                             <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
//                               <h6 className="text-base font-medium text-gray-800">
//                                 Scope {scopeIndex + 1}
//                               </h6>
//                               <button
//                                 type="button"
//                                 className="text-red-600 hover:text-red-800 disabled:opacity-30 transition-colors"
//                                 onClick={() =>
//                                   removeServiceScope(
//                                     serviceIndex,
//                                     subServiceIndex,
//                                     scopeIndex
//                                   )
//                                 }
//                                 disabled={subService.serviceScopes.length === 1}
//                                 title="Remove Scope"
//                               >
//                                 <TrashIcon className="h-5 w-5" />
//                               </button>
//                             </div>
//                             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                                   Service Scope
//                                   <InformationCircleIcon
//                                     className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                     title="Define the specific scope of work"
//                                   />
//                                 </label>
//                                 <select
//                                   name="scopeId"
//                                   value={scope.scopeId}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-200"
//                                   } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                   required
//                                   disabled={
//                                     !subService.subServiceId ||
//                                     !serviceScopes[subService.subServiceId]
//                                       ?.length
//                                   }
//                                 >
//                                   <option value="">Select Scope</option>
//                                   {(
//                                     serviceScopes[subService.subServiceId] || []
//                                   ).map((sc) => (
//                                     <option
//                                       key={sc.scopeId}
//                                       value={sc.scopeId.toString()}
//                                     >
//                                       {sc.scopeName}
//                                     </option>
//                                   ))}
//                                   {/* Fallback option for contract-specific scope */}
//                                   {scope.scopeId &&
//                                     !(
//                                       serviceScopes[subService.subServiceId] ||
//                                       []
//                                     ).find(
//                                       (sc) =>
//                                         sc.scopeId.toString() === scope.scopeId
//                                     ) && (
//                                       <option value={scope.scopeId}>
//                                         {scope.scopeId} (Contract-specific)
//                                       </option>
//                                     )}
//                                 </select>
//                                 {validationErrors[
//                                   `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-xs mt-1">
//                                     {
//                                       validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                                 {subService.subServiceId &&
//                                   !serviceScopes[subService.subServiceId]
//                                     ?.length && (
//                                     <p className="text-yellow-600 text-xs mt-1">
//                                       Loading scopes...
//                                     </p>
//                                   )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                                   SLA Type
//                                   <InformationCircleIcon
//                                     className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                     title="Select the Service Level Agreement type"
//                                   />
//                                 </label>
//                                 <select
//                                   name="slaTypeId"
//                                   value={scope.slaTypeId}
//                                   onChange={(e) =>
//                                     handleSlaTypeChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-200"
//                                   } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                   required
//                                   disabled={slaTypes.length === 0}
//                                 >
//                                   <option value="">Select SLA Type</option>
//                                   {slaTypes.map((sla) => (
//                                     <option
//                                       key={sla.slaTypeId}
//                                       value={sla.slaTypeId.toString()}
//                                     >
//                                       {sla.slaTypeName}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 {validationErrors[
//                                   `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-xs mt-1">
//                                     {
//                                       validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                                 {slaTypes.length === 0 && (
//                                   <p className="text-yellow-600 text-xs mt-1">
//                                     Loading SLA types...
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                                   Priority Level
//                                   <InformationCircleIcon
//                                     className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                     title="Set the priority for this scope"
//                                   />
//                                 </label>
//                                 <select
//                                   name="priorityId"
//                                   value={scope.priorityId}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-200"
//                                   } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                   required
//                                   disabled={
//                                     !scope.slaTypeId ||
//                                     !priorityLevels[scope.slaTypeId]?.length
//                                   }
//                                 >
//                                   <option value="">Select Priority</option>
//                                   {(priorityLevels[scope.slaTypeId] || []).map(
//                                     (pl) => (
//                                       <option
//                                         key={pl.priorityId}
//                                         value={pl.priorityId.toString()}
//                                       >
//                                         {pl.priorityName}
//                                       </option>
//                                     )
//                                   )}
//                                 </select>
//                                 {validationErrors[
//                                   `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-xs mt-1">
//                                     {
//                                       validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                                 {scope.slaTypeId &&
//                                   !priorityLevels[scope.slaTypeId]?.length && (
//                                     <p className="text-yellow-600 text-xs mt-1">
//                                       Loading priorities...
//                                     </p>
//                                   )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                                   Duty Hours
//                                   <InformationCircleIcon
//                                     className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                     title="Hours during active duty"
//                                   />
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="dutyHours"
//                                   value={scope.dutyHours}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-200"
//                                   } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
//                                   step="0.1"
//                                   min="0"
//                                   required
//                                 />
//                                 {validationErrors[
//                                   `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-xs mt-1">
//                                     {
//                                       validationErrors[
//                                         `dutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                               <div className="relative">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                                   Off-Duty Hours
//                                   <InformationCircleIcon
//                                     className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                     title="Hours outside active duty"
//                                   />
//                                 </label>
//                                 <input
//                                   type="number"
//                                   name="offDutyHours"
//                                   value={scope.offDutyHours}
//                                   onChange={(e) =>
//                                     handleChange(
//                                       e,
//                                       serviceIndex,
//                                       subServiceIndex,
//                                       scopeIndex
//                                     )
//                                   }
//                                   className={`w-full p-3 border ${
//                                     validationErrors[
//                                       `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                     ]
//                                       ? "border-red-500"
//                                       : "border-gray-200"
//                                   } rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
//                                   step="0.1"
//                                   min="0"
//                                   required
//                                 />
//                                 {validationErrors[
//                                   `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                 ] && (
//                                   <p className="text-red-500 text-xs mt-1">
//                                     {
//                                       validationErrors[
//                                         `offDutyHours-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ]
//                                     }
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() =>
//                             addServiceScope(serviceIndex, subServiceIndex)
//                           }
//                           className="mt-6 flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
//                           title="Add a new scope"
//                         >
//                           <PlusIcon className="h-5 w-5 mr-2" />
//                           Add Scope
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addSubService(serviceIndex)}
//                   className="mt-6 flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
//                   title="Add a new sub-service"
//                 >
//                   <PlusIcon className="h-5 w-5 mr-2" />
//                   Add Sub-Service
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//         <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//           <button
//             type="button"
//             onClick={addService}
//             className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
//             title="Add a new service"
//           >
//             <PlusIcon className="h-5 w-5 mr-2" />
//             Add Service
//           </button>
//           <button
//             type="submit"
//             className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//           >
//             {contractId ? "Update Contract" : "Create Contract"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

//333333

// import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import debounce from "lodash/debounce";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     employeeTimings: [
//       {
//         dayOfWeek: "MONDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "TUESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "WEDNESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "THURSDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "FRIDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SATURDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SUNDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//     ],
//     slaRules: [
//       {
//         slaTypeId: "",
//         priorityId: "",
//         responseTimeHours: "",
//         resolutionTimeHours: "",
//       },
//     ],
//   });
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});
//   const [activeTab, setActiveTab] = useState("basic");

//   const debouncedSetFormData = useCallback(
//     debounce((newFormData) => setFormData(newFormData), 300),
//     []
//   );

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         const companiesData = Array.isArray(companiesRes.data)
//           ? companiesRes.data
//           : [];
//         const servicesData = Array.isArray(servicesRes.data)
//           ? servicesRes.data
//           : [];
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         setCompanies(companiesData);
//         setServices(servicesData);
//         setSlaTypes(slaTypesData);

//         if (contractId) {
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;

//           const subServicesMap = {};
//           const serviceScopesMap = {};
//           const priorityLevelsMap = {};

//           await Promise.all(
//             (contract.services || []).map(async (service) => {
//               const serviceId = service.serviceId.toString();
//               if (serviceId && !subServicesMap[serviceId]) {
//                 try {
//                   const subServicesRes = await contractService.getSubServices(
//                     serviceId
//                   );
//                   subServicesMap[serviceId] = Array.isArray(subServicesRes.data)
//                     ? subServicesRes.data
//                     : [];
//                 } catch (err) {
//                   subServicesMap[serviceId] = service.subServices.map((ss) => ({
//                     subServiceId: ss.subServiceId,
//                     subServiceName: ss.subServiceName,
//                   }));
//                 }
//               }
//               await Promise.all(
//                 (service.subServices || []).map(async (subService) => {
//                   const subServiceId = subService.subServiceId.toString();
//                   if (subServiceId && !serviceScopesMap[subServiceId]) {
//                     try {
//                       const scopesRes = await contractService.getServiceScopes(
//                         subServiceId
//                       );
//                       serviceScopesMap[subServiceId] = Array.isArray(
//                         scopesRes.data
//                       )
//                         ? scopesRes.data
//                         : [];
//                     } catch (err) {
//                       serviceScopesMap[subServiceId] =
//                         subService.serviceScopes.map((sc) => ({
//                           scopeId: sc.scopeId,
//                           scopeName: sc.scopeName,
//                         }));
//                     }
//                   }
//                   await Promise.all(
//                     (subService.serviceScopes || []).map(async (scope) => {
//                       const slaTypeId = scope.slaTypeId?.toString() || "";
//                       if (slaTypeId && !priorityLevelsMap[slaTypeId]) {
//                         try {
//                           const prioritiesRes =
//                             await contractService.getPriorityLevels(slaTypeId);
//                           priorityLevelsMap[slaTypeId] = Array.isArray(
//                             prioritiesRes.data
//                           )
//                             ? prioritiesRes.data
//                             : [];
//                         } catch (err) {
//                           priorityLevelsMap[slaTypeId] = [
//                             {
//                               priorityId: scope.priorityId,
//                               priorityName: scope.priorityName,
//                             },
//                           ];
//                         }
//                       }
//                     })
//                   );
//                 })
//               );
//             })
//           );

//           setSubServices(subServicesMap);
//           setServiceScopes(serviceScopesMap);
//           setPriorityLevels(priorityLevelsMap);

//           const newFormData = {
//             contractName: contract.contractName || "",
//             companyId: contract.companyId?.toString() || "",
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: contract.services?.map((cs) => ({
//               serviceId: cs.serviceId.toString(),
//               subServices: cs.subServices?.map((css) => ({
//                 subServiceId: css.subServiceId.toString(),
//                 serviceScopes: css.serviceScopes?.map((scope) => ({
//                   scopeId: scope.scopeId.toString(),
//                   slaTypeId: scope.slaTypeId?.toString() || "",
//                   priorityId: scope.priorityId?.toString() || "",
//                 })) || [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//               })) || [
//                 {
//                   subServiceId: "",
//                   serviceScopes: [
//                     { scopeId: "", slaTypeId: "", priorityId: "" },
//                   ],
//                 },
//               ],
//             })) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//             employeeTimings:
//               contract.employeeTimings?.map((et) => ({
//                 dayOfWeek: et.dayOfWeek,
//                 dutyStartTime: et.dutyStartTime,
//                 dutyEndTime: et.dutyEndTime,
//                 offDutyStartTime: et.offDutyStartTime,
//                 offDutyEndTime: et.offDutyEndTime,
//               })) || formData.employeeTimings,
//             slaRules: contract.slaRules?.map((sr) => ({
//               slaTypeId: sr.slaTypeId?.toString() || "",
//               priorityId: sr.priorityId?.toString() || "",
//               responseTimeHours: sr.responseTimeHours?.toString() || "",
//               resolutionTimeHours: sr.resolutionTimeHours?.toString() || "",
//             })) || [
//               {
//                 slaTypeId: "",
//                 priorityId: "",
//                 responseTimeHours: "",
//                 resolutionTimeHours: "",
//               },
//             ],
//           };

//           setFormData(newFormData);
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyStartTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "dutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "offDutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyStartTime-${timingIndex}`] =
//         "Valid time (HH:MM) required.";
//     if (name === "offDutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "slaRuleSlaTypeId" && !value)
//       errors[`slaRuleSlaType-${ruleIndex}`] = "SLA type is required.";
//     if (name === "slaRulePriorityId" && !value)
//       errors[`slaRulePriority-${ruleIndex}`] = "Priority level is required.";
//     if (name === "responseTimeHours" && (value === "" || value < 0))
//       errors[`responseTimeHours-${ruleIndex}`] =
//         "Valid response time required.";
//     if (name === "resolutionTimeHours" && (value === "" || value < 0))
//       errors[`resolutionTimeHours-${ruleIndex}`] =
//         "Valid resolution time required.";
//     return errors;
//   };

//   const handleChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (
//         serviceIndex !== undefined &&
//         subServiceIndex !== undefined &&
//         scopeIndex !== undefined
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex][name] = value;
//         if (name === "scopeId") {
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes[scopeIndex].slaTypeId = "";
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes[scopeIndex].priorityId = "";
//         }
//       } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//         newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//           value;
//         if (name === "subServiceId") {
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//           if (value) {
//             contractService
//               .getServiceScopes(value)
//               .then((res) => {
//                 setServiceScopes((prev) => ({
//                   ...prev,
//                   [value]: Array.isArray(res.data) ? res.data : [],
//                 }));
//               })
//               .catch((err) => setError("Failed to load service scopes."));
//           }
//         }
//       } else if (serviceIndex !== undefined) {
//         newFormData.services[serviceIndex][name] = value;
//         if (name === "serviceId") {
//           newFormData.services[serviceIndex].subServices = [
//             {
//               subServiceId: "",
//               serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//             },
//           ];
//           if (value) {
//             contractService
//               .getSubServices(value)
//               .then((res) => {
//                 setSubServices((prev) => ({
//                   ...prev,
//                   [value]: Array.isArray(res.data) ? res.data : [],
//                 }));
//               })
//               .catch((err) => setError("Failed to load sub-services."));
//           }
//         }
//       } else if (timingIndex !== undefined) {
//         newFormData.employeeTimings[timingIndex][name] = value;
//       } else if (ruleIndex !== undefined) {
//         const field =
//           name === "slaTypeId"
//             ? "slaTypeId"
//             : name === "priorityId"
//             ? "priorityId"
//             : name;
//         newFormData.slaRules[ruleIndex][field] = value;
//         if (name === "slaTypeId") {
//           newFormData.slaRules[ruleIndex].priorityId = "";
//         }
//       } else {
//         newFormData[name] = value;
//       }
//       debouncedSetFormData(newFormData);
//       setValidationErrors((prev) => ({
//         ...prev,
//         ...validateField(
//           name,
//           value,
//           serviceIndex,
//           subServiceIndex,
//           scopeIndex,
//           timingIndex,
//           ruleIndex
//         ),
//       }));
//       return newFormData;
//     });
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     ruleIndex
//   ) => {
//     const slaTypeId = e.target.value;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (ruleIndex !== undefined) {
//         newFormData.slaRules[ruleIndex].slaTypeId = slaTypeId;
//         newFormData.slaRules[ruleIndex].priorityId = "";
//       } else {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].priorityId = "";
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         ruleIndex !== undefined ? "slaRuleSlaTypeId" : "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex,
//         undefined,
//         ruleIndex
//       ),
//     }));
//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => setError("Failed to load priority levels."));
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//       });
//       return newFormData;
//     });
//   };

//   const addSlaRule = () => {
//     setFormData((prev) => ({
//       ...prev,
//       slaRules: [
//         ...prev.slaRules,
//         {
//           slaTypeId: "",
//           priorityId: "",
//           responseTimeHours: "",
//           resolutionTimeHours: "",
//         },
//       ],
//     }));
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`service-${serviceIndex}`) ||
//           key.startsWith(`subService-${serviceIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (key.startsWith(`subService-${serviceIndex}-${subServiceIndex}`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(
//             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//           )
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSlaRule = (ruleIndex) => {
//     setFormData((prev) => {
//       const newRules = prev.slaRules.filter((_, idx) => idx !== ruleIndex);
//       return {
//         ...prev,
//         slaRules: newRules.length
//           ? newRules
//           : [
//               {
//                 slaTypeId: "",
//                 priorityId: "",
//                 responseTimeHours: "",
//                 resolutionTimeHours: "",
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`slaRuleSlaType-${ruleIndex}`) ||
//           key.startsWith(`slaRulePriority-${ruleIndex}`) ||
//           key.startsWith(`responseTimeHours-${ruleIndex}`) ||
//           key.startsWith(`resolutionTimeHours-${ruleIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName) errors.contractName = "Required field.";
//     if (!formData.companyId) errors.companyId = "Required field.";
//     if (!formData.projectType) errors.projectType = "Required field.";
//     if (!formData.startDate) errors.startDate = "Required field.";
//     if (!formData.endDate) errors.endDate = "Required field.";
//     if (!formData.services.length) errors.services = "At least one required.";
//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Required field.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Required field.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Required field.";
//         });
//       });
//     });
//     formData.employeeTimings.forEach((timing, timingIndex) => {
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyStartTime))
//         errors[`dutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyEndTime))
//         errors[`dutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyStartTime))
//         errors[`offDutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyEndTime))
//         errors[`offDutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//     });
//     formData.slaRules.forEach((rule, ruleIndex) => {
//       if (!rule.slaTypeId)
//         errors[`slaRuleSlaType-${ruleIndex}`] = "Required field.";
//       if (!rule.priorityId)
//         errors[`slaRulePriority-${ruleIndex}`] = "Required field.";
//       if (rule.responseTimeHours === "" || rule.responseTimeHours < 0)
//         errors[`responseTimeHours-${ruleIndex}`] = "Valid time required.";
//       if (rule.resolutionTimeHours === "" || rule.resolutionTimeHours < 0)
//         errors[`resolutionTimeHours-${ruleIndex}`] = "Valid time required.";
//     });
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const cleanedFormData = {
//       contractName: formData.contractName,
//       companyId: parseInt(formData.companyId, 10),
//       projectLocation: formData.projectLocation,
//       projectType: formData.projectType,
//       startDate: formData.startDate,
//       endDate: formData.endDate,
//       services: formData.services.map((service) => ({
//         serviceId: parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           subServiceId: parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             scopeId: parseInt(scope.scopeId, 10),
//             slaTypeId: parseInt(scope.slaTypeId, 10),
//             priorityId: parseInt(scope.priorityId, 10),
//           })),
//         })),
//       })),
//       employeeTimings: formData.employeeTimings.map((timing) => ({
//         dayOfWeek: timing.dayOfWeek,
//         dutyStartTime: timing.dutyStartTime + ":00",
//         dutyEndTime: timing.dutyEndTime + ":00",
//         offDutyStartTime: timing.offDutyStartTime + ":00",
//         offDutyEndTime: timing.offDutyEndTime + ":00",
//       })),
//       slaRules: formData.slaRules.map((rule) => ({
//         slaTypeId: parseInt(rule.slaTypeId, 10),
//         priorityId: parseInt(rule.priorityId, 10),
//         responseTimeHours: parseFloat(rule.responseTimeHours),
//         resolutionTimeHours: parseFloat(rule.resolutionTimeHours),
//       })),
//     };
//     if (contractId) {
//       try {
//         await Promise.all([
//           contractService.updateContractDetails(contractId, {
//             contractName: cleanedFormData.contractName,
//             companyId: cleanedFormData.companyId,
//             projectLocation: cleanedFormData.projectLocation,
//             projectType: cleanedFormData.projectType,
//             startDate: cleanedFormData.startDate,
//             endDate: cleanedFormData.endDate,
//           }),
//           contractService.updateContractServices(
//             contractId,
//             cleanedFormData.services
//           ),
//           contractService.updateEmployeeTimings(
//             contractId,
//             cleanedFormData.employeeTimings
//           ),
//           contractService.updateSlaRules(contractId, cleanedFormData.slaRules),
//         ]);
//         onSubmit(cleanedFormData, contractId);
//       } catch (err) {
//         setError("Failed to update contract.");
//       }
//     } else {
//       onSubmit(cleanedFormData);
//     }
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 py-8 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-6">
//         <p className="text-lg font-medium">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 py-6 w-full bg-white rounded-lg shadow-lg mt-6">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>
//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
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
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 0 9 0 0118 0z"
//             />
//           </svg>
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}

//       <div className="mb-6 border-b border-gray-200">
//         <div className="flex flex-wrap">
//           {[
//             { id: "basic", label: "Basic Information" },
//             { id: "services", label: "Services" },
//             { id: "timings", label: "Employee Timings" },
//             { id: "sla", label: "SLA Rules" },
//           ].map((tab, index) => (
//             <button
//               key={tab.id}
//               className={`px-4 py-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? "border-b-2 border-blue-600 text-blue-600"
//                   : "text-gray-600 hover:text-blue-700"
//               }`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === "basic" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Contract Name
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Enter a unique name for the contract"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="contractName"
//                 value={formData.contractName}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.contractName
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.contractName && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.contractName}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Company
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Select the company associated with this contract"
//                 />
//               </label>
//               <select
//                 name="companyId"
//                 value={formData.companyId}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.companyId
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               >
//                 <option value="">Select Company</option>
//                 {companies.map((company) => (
//                   <option
//                     key={company.companyId}
//                     value={company.companyId.toString()}
//                   >
//                     {company.companyName} {/* Correct */}
//                   </option>
//                 ))}
//               </select>

//               {validationErrors.companyId && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.companyId}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Location
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Optional: Specify the project location"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="projectLocation"
//                 value={formData.projectLocation}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md border-gray-200 bg-white focus:ring-blue-500 focus:shadow-md transition-colors"
//               />
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Type
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Choose the contract duration type"
//                 />
//               </label>
//               <select
//                 name="projectType"
//                 value={formData.projectType}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.projectType
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               >
//                 <option value="">Select Project Type</option>
//                 <option value="ANNUAL">Annual</option>
//                 <option value="ONE_TIME">One Time</option>
//               </select>
//               {validationErrors.projectType && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.projectType}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Start Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract start date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.startDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.startDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.startDate}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 End Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract end date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.endDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.endDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.endDate}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "services" && (
//           <div className="space-y-4">
//             {formData.services.map((service, serviceIndex) => (
//               <div
//                 key={serviceIndex}
//                 className="bg-gray-50 p-6 rounded-lg shadow-sm"
//               >
//                 <div
//                   className="flex items-center justify-between bg-blue-100 p-4 rounded-md cursor-pointer hover:bg-blue-200"
//                   onClick={() => toggleCollapse("service", serviceIndex)}
//                 >
//                   <h4 className="text-lg font-semibold text-blue-700">
//                     Service {serviceIndex + 1}
//                   </h4>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         removeService(serviceIndex);
//                       }}
//                       disabled={formData.services.length === 1}
//                       title="Remove Service"
//                     >
//                       <TrashIcon className="h-4 w-4" />
//                     </button>
//                     {collapsedSections[`service-${serviceIndex}`] ? (
//                       <ChevronUpIcon className="h-4 w-4 text-blue-600" />
//                     ) : (
//                       <ChevronDownIcon className="h-4 w-4 text-blue-600" />
//                     )}
//                   </div>
//                 </div>
//                 {!collapsedSections[`service-${serviceIndex}`] && (
//                   <div className="mt-6 space-y-4">
//                     <div className="relative">
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                         Service
//                         <InformationCircleIcon
//                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                           title="Select the main service category"
//                         />
//                       </label>
//                       <select
//                         name="serviceId"
//                         value={service.serviceId}
//                         onChange={(e) => handleChange(e, serviceIndex)}
//                         className={`w-full p-3 border rounded-md ${
//                           validationErrors[`service-${serviceIndex}`]
//                             ? "border-red-500"
//                             : "border-gray-200"
//                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                         disabled={services.length === 0}
//                       >
//                         <option value="">Select Service</option>
//                         {services.map((s) => (
//                           <option
//                             key={s.serviceId}
//                             value={s.serviceId.toString()}
//                           >
//                             {s.serviceName}
//                           </option>
//                         ))}
//                         {service.serviceId &&
//                           !services.find(
//                             (s) => s.serviceId.toString() === service.serviceId
//                           ) && (
//                             <option value={service.serviceId}>
//                               {service.serviceName || service.serviceId}{" "}
//                               (Contract-specific)
//                             </option>
//                           )}
//                       </select>
//                       {validationErrors[`service-${serviceIndex}`] && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {validationErrors[`service-${serviceIndex}`]}
//                         </p>
//                       )}
//                       {services.length === 0 && (
//                         <p className="text-yellow-500 text-xs mt-1">
//                           Loading services...
//                         </p>
//                       )}
//                     </div>

//                     {service.subServices.map((subService, subServiceIndex) => (
//                       <div
//                         key={subServiceIndex}
//                         className="ml-6 p-4 bg-gray-100 rounded-lg shadow-sm"
//                       >
//                         <div
//                           className="flex items-center justify-between bg-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-300"
//                           onClick={() =>
//                             toggleCollapse(
//                               "subService",
//                               serviceIndex,
//                               subServiceIndex
//                             )
//                           }
//                         >
//                           <h5 className="text-md font-medium text-gray-600">
//                             Sub-Service {subServiceIndex + 1}
//                           </h5>
//                           <div className="flex items-center space-x-4">
//                             <button
//                               type="button"
//                               className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 removeSubService(serviceIndex, subServiceIndex);
//                               }}
//                               disabled={service.subServices.length === 1}
//                               title="Remove Sub-Service"
//                             >
//                               <TrashIcon className="h-4 w-4" />
//                             </button>
//                             {collapsedSections[
//                               `subService-${serviceIndex}-${subServiceIndex}`
//                             ] ? (
//                               <ChevronUpIcon className="h-4 w-4 text-gray-600" />
//                             ) : (
//                               <ChevronDownIcon className="h-4 w-4 text-gray-600" />
//                             )}
//                           </div>
//                         </div>
//                         {!collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] && (
//                           <div className="mt-4 space-y-4">
//                             <div className="relative">
//                               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                 Sub-Service
//                                 <InformationCircleIcon
//                                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                   title="Select a sub-service"
//                                 />
//                               </label>
//                               <select
//                                 name="subServiceId"
//                                 value={subService.subServiceId}
//                                 onChange={(e) =>
//                                   handleChange(e, serviceIndex, subServiceIndex)
//                                 }
//                                 className={`w-full p-3 border rounded-md ${
//                                   validationErrors[
//                                     `subService-${serviceIndex}-${subServiceIndex}`
//                                   ]
//                                     ? "border-red-500"
//                                     : "border-gray-200"
//                                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                 disabled={
//                                   !service.serviceId ||
//                                   !subServices[service.serviceId]?.length
//                                 }
//                               >
//                                 <option value="">Select Sub-Service</option>
//                                 {(subServices[service.serviceId] || []).map(
//                                   (ss) => (
//                                     <option
//                                       key={ss.subServiceId}
//                                       value={ss.subServiceId.toString()}
//                                     >
//                                       {ss.subServiceName}
//                                     </option>
//                                   )
//                                 )}
//                                 {subService.subServiceId &&
//                                   !(subServices[service.serviceId] || []).find(
//                                     (ss) =>
//                                       ss.subServiceId.toString() ===
//                                       subService.subServiceId
//                                   ) && (
//                                     <option value={subService.subServiceId}>
//                                       {subService.subServiceName ||
//                                         subService.subServiceId}{" "}
//                                       (Contract-specific)
//                                     </option>
//                                   )}
//                               </select>
//                               {validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ] && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                   {
//                                     validationErrors[
//                                       `subService-${serviceIndex}-${subServiceIndex}`
//                                     ]
//                                   }
//                                 </p>
//                               )}
//                               {service.serviceId &&
//                                 !subServices[service.serviceId]?.length && (
//                                   <p className="text-yellow-500 text-xs mt-1">
//                                     Loading sub-services...
//                                   </p>
//                                 )}
//                             </div>

//                             {subService.serviceScopes.map(
//                               (scope, scopeIndex) => (
//                                 <div
//                                   key={scopeIndex}
//                                   className="ml-4 p-4 bg-white rounded-md shadow-sm"
//                                 >
//                                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
//                                     <h6 className="text-sm font-medium text-gray-600">
//                                       Scope {scopeIndex + 1}
//                                     </h6>
//                                     <button
//                                       type="button"
//                                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                                       onClick={() =>
//                                         removeServiceScope(
//                                           serviceIndex,
//                                           subServiceIndex,
//                                           scopeIndex
//                                         )
//                                       }
//                                       disabled={
//                                         subService.serviceScopes.length === 1
//                                       }
//                                       title="Remove Scope"
//                                     >
//                                       <TrashIcon className="h-4 w-4" />
//                                     </button>
//                                   </div>
//                                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Service Scope
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Define the specific scope of work"
//                                         />
//                                       </label>
//                                       <select
//                                         name="scopeId"
//                                         value={scope.scopeId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={
//                                           !subService.subServiceId ||
//                                           !serviceScopes[
//                                             subService.subServiceId
//                                           ]?.length
//                                         }
//                                       >
//                                         <option value="">Select Scope</option>
//                                         {(
//                                           serviceScopes[
//                                             subService.subServiceId
//                                           ] || []
//                                         ).map((sc) => (
//                                           <option
//                                             key={sc.scopeId}
//                                             value={sc.scopeId.toString()}
//                                           >
//                                             {sc.scopeName}
//                                           </option>
//                                         ))}
//                                         {scope.scopeId &&
//                                           !(
//                                             serviceScopes[
//                                               subService.subServiceId
//                                             ] || []
//                                           ).find(
//                                             (sc) =>
//                                               sc.scopeId.toString() ===
//                                               scope.scopeId
//                                           ) && (
//                                             <option value={scope.scopeId}>
//                                               {scope.scopeName || scope.scopeId}{" "}
//                                               (Contract-specific)
//                                             </option>
//                                           )}
//                                       </select>
//                                       {validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {subService.subServiceId &&
//                                         !serviceScopes[subService.subServiceId]
//                                           ?.length && (
//                                           <p className="text-yellow-500 text-xs mt-1">
//                                             Loading scopes...
//                                           </p>
//                                         )}
//                                     </div>
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         SLA Type
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Select the Service Level Agreement type"
//                                         />
//                                       </label>
//                                       <select
//                                         name="slaTypeId"
//                                         value={scope.slaTypeId}
//                                         onChange={(e) =>
//                                           handleSlaTypeChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={slaTypes.length === 0}
//                                       >
//                                         <option value="">
//                                           Select SLA Type
//                                         </option>
//                                         {slaTypes.map((sla) => (
//                                           <option
//                                             key={sla.slaTypeId}
//                                             value={sla.slaTypeId.toString()}
//                                           >
//                                             {sla.slaTypeName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {slaTypes.length === 0 && (
//                                         <p className="text-yellow-500 text-xs mt-1">
//                                           Loading SLA types...
//                                         </p>
//                                       )}
//                                     </div>
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Priority Level
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Set the priority for this scope"
//                                         />
//                                       </label>
//                                       <select
//                                         name="priorityId"
//                                         value={scope.priorityId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={
//                                           !scope.slaTypeId ||
//                                           !priorityLevels[scope.slaTypeId]
//                                             ?.length
//                                         }
//                                       >
//                                         <option value="">
//                                           Select Priority
//                                         </option>
//                                         {(
//                                           priorityLevels[scope.slaTypeId] || []
//                                         ).map((pl) => (
//                                           <option
//                                             key={pl.priorityId}
//                                             value={pl.priorityId.toString()}
//                                           >
//                                             {pl.priorityName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {scope.slaTypeId &&
//                                         !priorityLevels[scope.slaTypeId]
//                                           ?.length && (
//                                           <p className="text-yellow-500 text-xs mt-1">
//                                             Loading priorities...
//                                           </p>
//                                         )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               )
//                             )}
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 addServiceScope(serviceIndex, subServiceIndex)
//                               }
//                               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                               title="Add a new scope"
//                             >
//                               <PlusIcon className="h-4 w-4 mr-2" />
//                               Add Scope
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addSubService(serviceIndex)}
//                       className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                       title="Add a new sub-service"
//                     >
//                       <PlusIcon className="h-4 w-4 mr-2" />
//                       Add Sub-Service
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addService}
//               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//               title="Add a new service"
//             >
//               <PlusIcon className="h-4 w-4 mr-2" />
//               Add Service
//             </button>
//           </div>
//         )}

//         {activeTab === "timings" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               Employee Timings
//             </h4>
//             <div className="space-y-4">
//               {formData.employeeTimings.map((timing, timingIndex) => (
//                 <div
//                   key={timingIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {timing.dayOfWeek}
//                     </label>
//                     <input
//                       type="text"
//                       name="dutyStartTime"
//                       value={timing.dutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duty End
//                     </label>
//                     <input
//                       type="text"
//                       name="dutyEndTime"
//                       value={timing.dutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty Start
//                     </label>
//                     <input
//                       type="text"
//                       name="offDutyStartTime"
//                       value={timing.offDutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty End
//                     </label>
//                     <input
//                       type="text"
//                       name="offDutyEndTime"
//                       value={timing.offDutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "sla" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               SLA Rules
//             </h4>
//             <div className="space-y-4">
//               {formData.slaRules.map((rule, ruleIndex) => (
//                 <div
//                   key={ruleIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       SLA Type
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Select the SLA type for the rule"
//                       />
//                     </label>
//                     <select
//                       name="slaTypeId"
//                       value={rule.slaTypeId}
//                       onChange={(e) =>
//                         handleSlaTypeChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`slaRuleSlaType-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                     >
//                       <option value="">Select SLA Type</option>
//                       {slaTypes.map((sla) => (
//                         <option
//                           key={sla.slaTypeId}
//                           value={sla.slaTypeId.toString()}
//                         >
//                           {sla.slaTypeName}
//                         </option>
//                       ))}
//                     </select>
//                     {validationErrors[`slaRuleSlaType-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`slaRuleSlaType-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Priority Level
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Select the priority level for the rule"
//                       />
//                     </label>
//                     <select
//                       name="priorityId"
//                       value={rule.priorityId}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`slaRulePriority-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                       disabled={
//                         !rule.slaTypeId ||
//                         !priorityLevels[rule.slaTypeId]?.length
//                       }
//                     >
//                       <option value="">Select Priority</option>
//                       {(priorityLevels[rule.slaTypeId] || []).map((pl) => (
//                         <option
//                           key={pl.priorityId}
//                           value={pl.priorityId.toString()}
//                         >
//                           {pl.priorityName}
//                         </option>
//                       ))}
//                     </select>
//                     {validationErrors[`slaRulePriority-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`slaRulePriority-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Response Time (Hours)
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Response time in hours"
//                       />
//                     </label>
//                     <input
//                       type="number"
//                       name="responseTimeHours"
//                       value={rule.responseTimeHours}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`responseTimeHours-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       step="0.1"
//                       min="0"
//                     />
//                     {validationErrors[`responseTimeHours-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`responseTimeHours-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Resolution Time (Hours)
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Resolution time in hours"
//                       />
//                     </label>
//                     <input
//                       type="number"
//                       name="resolutionTimeHours"
//                       value={rule.resolutionTimeHours}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`resolutionTimeHours-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       step="0.1"
//                       min="0"
//                     />
//                     {validationErrors[`resolutionTimeHours-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`resolutionTimeHours-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={() => removeSlaRule(ruleIndex)}
//                       disabled={formData.slaRules.length === 1}
//                       title="Remove SLA Rule"
//                     >
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addSlaRule}
//                 className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//                 title="Add a new SLA rule"
//               >
//                 <PlusIcon className="h-4 w-4 mr-2" />
//                 Add SLA Rule
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
//           <button
//             type="submit"
//             className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//           >
//             {contractId ? "Update Contract" : "Create Contract"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

// /33333333333
// import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import debounce from "lodash/debounce";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     employeeTimings: [
//       {
//         dayOfWeek: "MONDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "TUESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "WEDNESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "THURSDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "FRIDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SATURDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SUNDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//     ],
//     slaRules: [
//       {
//         slaTypeId: "",
//         priorityId: "",
//         responseTimeHours: "",
//         resolutionTimeHours: "",
//       },
//     ],
//   });
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});
//   const [activeTab, setActiveTab] = useState("basic");

//   const debouncedSetFormData = useCallback(
//     debounce((newFormData) => setFormData(newFormData), 300),
//     []
//   );

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         const companiesData = Array.isArray(companiesRes.data)
//           ? companiesRes.data
//           : [];
//         const servicesData = Array.isArray(servicesRes.data)
//           ? servicesRes.data
//           : [];
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         setCompanies(companiesData);
//         setServices(servicesData);
//         setSlaTypes(slaTypesData);

//         if (contractId) {
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;

//           const subServicesMap = {};
//           const serviceScopesMap = {};
//           const priorityLevelsMap = {};

//           await Promise.all(
//             (contract.services || []).map(async (service) => {
//               const serviceId = service.serviceId.toString();
//               if (serviceId && !subServicesMap[serviceId]) {
//                 try {
//                   const subServicesRes = await contractService.getSubServices(
//                     serviceId
//                   );
//                   subServicesMap[serviceId] = Array.isArray(subServicesRes.data)
//                     ? subServicesRes.data
//                     : [];
//                 } catch (err) {
//                   subServicesMap[serviceId] = service.subServices.map((ss) => ({
//                     subServiceId: ss.subServiceId,
//                     subServiceName: ss.subServiceName,
//                   }));
//                 }
//               }
//               await Promise.all(
//                 (service.subServices || []).map(async (subService) => {
//                   const subServiceId = subService.subServiceId.toString();
//                   if (subServiceId && !serviceScopesMap[subServiceId]) {
//                     try {
//                       const scopesRes = await contractService.getServiceScopes(
//                         subServiceId
//                       );
//                       serviceScopesMap[subServiceId] = Array.isArray(
//                         scopesRes.data
//                       )
//                         ? scopesRes.data
//                         : [];
//                     } catch (err) {
//                       serviceScopesMap[subServiceId] =
//                         subService.serviceScopes.map((sc) => ({
//                           scopeId: sc.scopeId,
//                           scopeName: sc.scopeName,
//                         }));
//                     }
//                   }
//                   await Promise.all(
//                     (subService.serviceScopes || []).map(async (scope) => {
//                       const slaTypeId = scope.slaTypeId?.toString() || "";
//                       if (slaTypeId && !priorityLevelsMap[slaTypeId]) {
//                         try {
//                           const prioritiesRes =
//                             await contractService.getPriorityLevels(slaTypeId);
//                           priorityLevelsMap[slaTypeId] = Array.isArray(
//                             prioritiesRes.data
//                           )
//                             ? prioritiesRes.data
//                             : [];
//                         } catch (err) {
//                           priorityLevelsMap[slaTypeId] = [
//                             {
//                               priorityId: scope.priorityId,
//                               priorityName: scope.priorityName,
//                             },
//                           ];
//                         }
//                       }
//                     })
//                   );
//                 })
//               );
//             })
//           );

//           setSubServices(subServicesMap);
//           setServiceScopes(serviceScopesMap);
//           setPriorityLevels(priorityLevelsMap);

//           const newFormData = {
//             contractName: contract.contractName || "",
//             companyId: contract.companyId?.toString() || "",
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: contract.services?.map((cs) => ({
//               serviceId: cs.serviceId.toString(),
//               subServices: cs.subServices?.map((css) => ({
//                 subServiceId: css.subServiceId.toString(),
//                 serviceScopes: css.serviceScopes?.map((scope) => ({
//                   scopeId: scope.scopeId.toString(),
//                   slaTypeId: scope.slaTypeId?.toString() || "",
//                   priorityId: scope.priorityId?.toString() || "",
//                 })) || [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//               })) || [
//                 {
//                   subServiceId: "",
//                   serviceScopes: [
//                     { scopeId: "", slaTypeId: "", priorityId: "" },
//                   ],
//                 },
//               ],
//             })) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//             employeeTimings:
//               contract.employeeTimings?.map((et) => ({
//                 dayOfWeek: et.dayOfWeek,
//                 dutyStartTime: et.dutyStartTime,
//                 dutyEndTime: et.dutyEndTime,
//                 offDutyStartTime: et.offDutyStartTime,
//                 offDutyEndTime: et.offDutyEndTime,
//               })) || formData.employeeTimings,
//             slaRules: contract.slaRules?.map((sr) => ({
//               slaTypeId: sr.slaTypeId?.toString() || "",
//               priorityId: sr.priorityId?.toString() || "",
//               responseTimeHours: sr.responseTimeHours?.toString() || "",
//               resolutionTimeHours: sr.resolutionTimeHours?.toString() || "",
//             })) || [
//               {
//                 slaTypeId: "",
//                 priorityId: "",
//                 responseTimeHours: "",
//                 resolutionTimeHours: "",
//               },
//             ],
//           };

//           setFormData(newFormData);
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyStartTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "dutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "offDutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyStartTime-${timingIndex}`] =
//         "Valid time (HH:MM) required.";
//     if (name === "offDutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "slaRuleSlaTypeId" && !value)
//       errors[`slaRuleSlaType-${ruleIndex}`] = "SLA type is required.";
//     if (name === "slaRulePriorityId" && !value)
//       errors[`slaRulePriority-${ruleIndex}`] = "Priority level is required.";
//     if (name === "responseTimeHours" && (value === "" || value < 0))
//       errors[`responseTimeHours-${ruleIndex}`] =
//         "Valid response time required.";
//     if (name === "resolutionTimeHours" && (value === "" || value < 0))
//       errors[`resolutionTimeHours-${ruleIndex}`] =
//         "Valid resolution time required.";
//     return errors;
//   };

//   const handleChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const { name, value } = e.target;
//     const newFormData = { ...formData };

//     // Update nested formData based on indices
//     if (
//       serviceIndex !== undefined &&
//       subServiceIndex !== undefined &&
//       scopeIndex !== undefined
//     ) {
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes[scopeIndex][name] = value;
//       if (name === "scopeId") {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].slaTypeId = "";
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].priorityId = "";
//       }
//     } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//       newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//         value;
//       if (name === "subServiceId") {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//         if (value) {
//           contractService
//             .getServiceScopes(value)
//             .then((res) => {
//               setServiceScopes((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => setError("Failed to load service scopes."));
//         }
//       }
//     } else if (serviceIndex !== undefined) {
//       newFormData.services[serviceIndex][name] = value;
//       if (name === "serviceId") {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           },
//         ];
//         if (value) {
//           contractService
//             .getSubServices(value)
//             .then((res) => {
//               setSubServices((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => setError("Failed to load sub-services."));
//         }
//       }
//     } else if (timingIndex !== undefined) {
//       newFormData.employeeTimings[timingIndex][name] = value;
//     } else if (ruleIndex !== undefined) {
//       const field =
//         name === "slaTypeId"
//           ? "slaTypeId"
//           : name === "priorityId"
//           ? "priorityId"
//           : name;
//       newFormData.slaRules[ruleIndex][field] = value;
//       if (name === "slaTypeId") {
//         newFormData.slaRules[ruleIndex].priorityId = "";
//       }
//     } else {
//       newFormData[name] = value;
//     }

//     // Update validation errors
//     const errors = validateField(
//       name,
//       value,
//       serviceIndex,
//       subServiceIndex,
//       scopeIndex,
//       timingIndex,
//       ruleIndex
//     );

//     // Apply debounced state update
//     debouncedSetFormData(newFormData);
//     setValidationErrors((prev) => ({ ...prev, ...errors }));
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     ruleIndex
//   ) => {
//     const slaTypeId = e.target.value;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (ruleIndex !== undefined) {
//         newFormData.slaRules[ruleIndex].slaTypeId = slaTypeId;
//         newFormData.slaRules[ruleIndex].priorityId = "";
//       } else {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].priorityId = "";
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         ruleIndex !== undefined ? "slaRuleSlaTypeId" : "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex,
//         undefined,
//         ruleIndex
//       ),
//     }));
//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => setError("Failed to load priority levels."));
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//       });
//       return newFormData;
//     });
//   };

//   const addSlaRule = () => {
//     setFormData((prev) => ({
//       ...prev,
//       slaRules: [
//         ...prev.slaRules,
//         {
//           slaTypeId: "",
//           priorityId: "",
//           responseTimeHours: "",
//           resolutionTimeHours: "",
//         },
//       ],
//     }));
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`service-${serviceIndex}`) ||
//           key.startsWith(`subService-${serviceIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (key.startsWith(`subService-${serviceIndex}-${subServiceIndex}`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(
//             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//           )
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSlaRule = (ruleIndex) => {
//     setFormData((prev) => {
//       const newRules = prev.slaRules.filter((_, idx) => idx !== ruleIndex);
//       return {
//         ...prev,
//         slaRules: newRules.length
//           ? newRules
//           : [
//               {
//                 slaTypeId: "",
//                 priorityId: "",
//                 responseTimeHours: "",
//                 resolutionTimeHours: "",
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`slaRuleSlaType-${ruleIndex}`) ||
//           key.startsWith(`slaRulePriority-${ruleIndex}`) ||
//           key.startsWith(`responseTimeHours-${ruleIndex}`) ||
//           key.startsWith(`resolutionTimeHours-${ruleIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName) errors.contractName = "Required field.";
//     if (!formData.companyId) errors.companyId = "Required field.";
//     if (!formData.projectType) errors.projectType = "Required field.";
//     if (!formData.startDate) errors.startDate = "Required field.";
//     if (!formData.endDate) errors.endDate = "Required field.";
//     if (!formData.services.length) errors.services = "At least one required.";
//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Required field.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Required field.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Required field.";
//         });
//       });
//     });
//     formData.employeeTimings.forEach((timing, timingIndex) => {
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyStartTime))
//         errors[`dutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyEndTime))
//         errors[`dutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyStartTime))
//         errors[`offDutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyEndTime))
//         errors[`offDutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//     });
//     formData.slaRules.forEach((rule, ruleIndex) => {
//       if (!rule.slaTypeId)
//         errors[`slaRuleSlaType-${ruleIndex}`] = "Required field.";
//       if (!rule.priorityId)
//         errors[`slaRulePriority-${ruleIndex}`] = "Required field.";
//       if (rule.responseTimeHours === "" || rule.responseTimeHours < 0)
//         errors[`responseTimeHours-${ruleIndex}`] = "Valid time required.";
//       if (rule.resolutionTimeHours === "" || rule.resolutionTimeHours < 0)
//         errors[`resolutionTimeHours-${ruleIndex}`] = "Valid time required.";
//     });
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const cleanedFormData = {
//       contractName: formData.contractName,
//       companyId: parseInt(formData.companyId, 10),
//       projectLocation: formData.projectLocation,
//       projectType: formData.projectType,
//       startDate: formData.startDate,
//       endDate: formData.endDate,
//       services: formData.services.map((service) => ({
//         serviceId: parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           subServiceId: parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             scopeId: parseInt(scope.scopeId, 10),
//             slaTypeId: parseInt(scope.slaTypeId, 10),
//             priorityId: parseInt(scope.priorityId, 10),
//           })),
//         })),
//       })),
//       employeeTimings: formData.employeeTimings.map((timing) => ({
//         dayOfWeek: timing.dayOfWeek,
//         dutyStartTime: timing.dutyStartTime + ":00",
//         dutyEndTime: timing.dutyEndTime + ":00",
//         offDutyStartTime: timing.offDutyStartTime + ":00",
//         offDutyEndTime: timing.offDutyEndTime + ":00",
//       })),
//       slaRules: formData.slaRules.map((rule) => ({
//         slaTypeId: parseInt(rule.slaTypeId, 10),
//         priorityId: parseInt(rule.priorityId, 10),
//         responseTimeHours: parseFloat(rule.responseTimeHours),
//         resolutionTimeHours: parseFloat(rule.resolutionTimeHours),
//       })),
//     };
//     if (contractId) {
//       try {
//         await Promise.all([
//           contractService.updateContractDetails(contractId, {
//             contractName: cleanedFormData.contractName,
//             companyId: cleanedFormData.companyId,
//             projectLocation: cleanedFormData.projectLocation,
//             projectType: cleanedFormData.projectType,
//             startDate: cleanedFormData.startDate,
//             endDate: cleanedFormData.endDate,
//           }),
//           contractService.updateContractServices(
//             contractId,
//             cleanedFormData.services
//           ),
//           contractService.updateEmployeeTimings(
//             contractId,
//             cleanedFormData.employeeTimings
//           ),
//           contractService.updateSlaRules(contractId, cleanedFormData.slaRules),
//         ]);
//         onSubmit(cleanedFormData, contractId);
//       } catch (err) {
//         setError("Failed to update contract.");
//       }
//     } else {
//       onSubmit(cleanedFormData);
//     }
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 py-8 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-6">
//         <p className="text-lg font-medium">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 py-6 w-full bg-white rounded-lg shadow-lg mt-6">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>
//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
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
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 0 9 0 0118 0z"
//             />
//           </svg>
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}

//       <div className="mb-6 border-b border-gray-200">
//         <div className="flex flex-wrap">
//           {[
//             { id: "basic", label: "Basic Information" },
//             { id: "services", label: "Services" },
//             { id: "timings", label: "Employee Timings" },
//             { id: "sla", label: "SLA Rules" },
//           ].map((tab, index) => (
//             <button
//               key={tab.id}
//               className={`px-4 py-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? "border-b-2 border-blue-600 text-blue-600"
//                   : "text-gray-600 hover:text-blue-700"
//               }`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === "basic" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Contract Name
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Enter a unique name for the contract"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="contractName"
//                 value={formData.contractName}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.contractName
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.contractName && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.contractName}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Company
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Select the company associated with this contract"
//                 />
//               </label>
//               <select
//                 name="companyId"
//                 value={formData.companyId}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.companyId
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               >
//                 <option value="">Select Company</option>
//                 {companies.map((company) => (
//                   <option
//                     key={company.companyId}
//                     value={company.companyId.toString()}
//                   >
//                     {company.companyName} {/* Correct */}
//                   </option>
//                 ))}
//               </select>

//               {validationErrors.companyId && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.companyId}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Location
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Optional: Specify the project location"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="projectLocation"
//                 value={formData.projectLocation}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md border-gray-200 bg-white focus:ring-blue-500 focus:shadow-md transition-colors"
//               />
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Type
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Choose the contract duration type"
//                 />
//               </label>
//               <select
//                 name="projectType"
//                 value={formData.projectType}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.projectType
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               >
//                 <option value="">Select Project Type</option>
//                 <option value="ANNUAL">Annual</option>
//                 <option value="ONE_TIME">One Time</option>
//               </select>
//               {validationErrors.projectType && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.projectType}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Start Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract start date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.startDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.startDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.startDate}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 End Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract end date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.endDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.endDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.endDate}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "services" && (
//           <div className="space-y-4">
//             {formData.services.map((service, serviceIndex) => (
//               <div
//                 key={serviceIndex}
//                 className="bg-gray-50 p-6 rounded-lg shadow-sm"
//               >
//                 <div
//                   className="flex items-center justify-between bg-blue-100 p-4 rounded-md cursor-pointer hover:bg-blue-200"
//                   onClick={() => toggleCollapse("service", serviceIndex)}
//                 >
//                   <h4 className="text-lg font-semibold text-blue-700">
//                     Service {serviceIndex + 1}
//                   </h4>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         removeService(serviceIndex);
//                       }}
//                       disabled={formData.services.length === 1}
//                       title="Remove Service"
//                     >
//                       <TrashIcon className="h-4 w-4" />
//                     </button>
//                     {collapsedSections[`service-${serviceIndex}`] ? (
//                       <ChevronUpIcon className="h-4 w-4 text-blue-600" />
//                     ) : (
//                       <ChevronDownIcon className="h-4 w-4 text-blue-600" />
//                     )}
//                   </div>
//                 </div>
//                 {!collapsedSections[`service-${serviceIndex}`] && (
//                   <div className="mt-6 space-y-4">
//                     <div className="relative">
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                         Service
//                         <InformationCircleIcon
//                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                           title="Select the main service category"
//                         />
//                       </label>
//                       <select
//                         name="serviceId"
//                         value={service.serviceId}
//                         onChange={(e) => handleChange(e, serviceIndex)}
//                         className={`w-full p-3 border rounded-md ${
//                           validationErrors[`service-${serviceIndex}`]
//                             ? "border-red-500"
//                             : "border-gray-200"
//                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                         disabled={services.length === 0}
//                       >
//                         <option value="">Select Service</option>
//                         {services.map((s) => (
//                           <option
//                             key={s.serviceId}
//                             value={s.serviceId.toString()}
//                           >
//                             {s.serviceName}
//                           </option>
//                         ))}
//                         {service.serviceId &&
//                           !services.find(
//                             (s) => s.serviceId.toString() === service.serviceId
//                           ) && (
//                             <option value={service.serviceId}>
//                               {service.serviceName || service.serviceId}{" "}
//                               (Contract-specific)
//                             </option>
//                           )}
//                       </select>
//                       {validationErrors[`service-${serviceIndex}`] && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {validationErrors[`service-${serviceIndex}`]}
//                         </p>
//                       )}
//                       {services.length === 0 && (
//                         <p className="text-yellow-500 text-xs mt-1">
//                           Loading services...
//                         </p>
//                       )}
//                     </div>

//                     {service.subServices.map((subService, subServiceIndex) => (
//                       <div
//                         key={subServiceIndex}
//                         className="ml-6 p-4 bg-gray-100 rounded-lg shadow-sm"
//                       >
//                         <div
//                           className="flex items-center justify-between bg-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-300"
//                           onClick={() =>
//                             toggleCollapse(
//                               "subService",
//                               serviceIndex,
//                               subServiceIndex
//                             )
//                           }
//                         >
//                           <h5 className="text-md font-medium text-gray-600">
//                             Sub-Service {subServiceIndex + 1}
//                           </h5>
//                           <div className="flex items-center space-x-4">
//                             <button
//                               type="button"
//                               className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 removeSubService(serviceIndex, subServiceIndex);
//                               }}
//                               disabled={service.subServices.length === 1}
//                               title="Remove Sub-Service"
//                             >
//                               <TrashIcon className="h-4 w-4" />
//                             </button>
//                             {collapsedSections[
//                               `subService-${serviceIndex}-${subServiceIndex}`
//                             ] ? (
//                               <ChevronUpIcon className="h-4 w-4 text-gray-600" />
//                             ) : (
//                               <ChevronDownIcon className="h-4 w-4 text-gray-600" />
//                             )}
//                           </div>
//                         </div>
//                         {!collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] && (
//                           <div className="mt-4 space-y-4">
//                             <div className="relative">
//                               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                 Sub-Service
//                                 <InformationCircleIcon
//                                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                   title="Select a sub-service"
//                                 />
//                               </label>
//                               <select
//                                 name="subServiceId"
//                                 value={subService.subServiceId}
//                                 onChange={(e) =>
//                                   handleChange(e, serviceIndex, subServiceIndex)
//                                 }
//                                 className={`w-full p-3 border rounded-md ${
//                                   validationErrors[
//                                     `subService-${serviceIndex}-${subServiceIndex}`
//                                   ]
//                                     ? "border-red-500"
//                                     : "border-gray-200"
//                                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                 disabled={
//                                   !service.serviceId ||
//                                   !subServices[service.serviceId]?.length
//                                 }
//                               >
//                                 <option value="">Select Sub-Service</option>
//                                 {(subServices[service.serviceId] || []).map(
//                                   (ss) => (
//                                     <option
//                                       key={ss.subServiceId}
//                                       value={ss.subServiceId.toString()}
//                                     >
//                                       {ss.subServiceName}
//                                     </option>
//                                   )
//                                 )}
//                                 {subService.subServiceId &&
//                                   !(subServices[service.serviceId] || []).find(
//                                     (ss) =>
//                                       ss.subServiceId.toString() ===
//                                       subService.subServiceId
//                                   ) && (
//                                     <option value={subService.subServiceId}>
//                                       {subService.subServiceName ||
//                                         subService.subServiceId}{" "}
//                                       (Contract-specific)
//                                     </option>
//                                   )}
//                               </select>
//                               {validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ] && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                   {
//                                     validationErrors[
//                                       `subService-${serviceIndex}-${subServiceIndex}`
//                                     ]
//                                   }
//                                 </p>
//                               )}
//                               {service.serviceId &&
//                                 !subServices[service.serviceId]?.length && (
//                                   <p className="text-yellow-500 text-xs mt-1">
//                                     Loading sub-services...
//                                   </p>
//                                 )}
//                             </div>

//                             {subService.serviceScopes.map(
//                               (scope, scopeIndex) => (
//                                 <div
//                                   key={scopeIndex}
//                                   className="ml-4 p-4 bg-white rounded-md shadow-sm"
//                                 >
//                                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
//                                     <h6 className="text-sm font-medium text-gray-600">
//                                       Scope {scopeIndex + 1}
//                                     </h6>
//                                     <button
//                                       type="button"
//                                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                                       onClick={() =>
//                                         removeServiceScope(
//                                           serviceIndex,
//                                           subServiceIndex,
//                                           scopeIndex
//                                         )
//                                       }
//                                       disabled={
//                                         subService.serviceScopes.length === 1
//                                       }
//                                       title="Remove Scope"
//                                     >
//                                       <TrashIcon className="h-4 w-4" />
//                                     </button>
//                                   </div>
//                                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Service Scope
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Define the specific scope of work"
//                                         />
//                                       </label>
//                                       <select
//                                         name="scopeId"
//                                         value={scope.scopeId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={
//                                           !subService.subServiceId ||
//                                           !serviceScopes[
//                                             subService.subServiceId
//                                           ]?.length
//                                         }
//                                       >
//                                         <option value="">Select Scope</option>
//                                         {(
//                                           serviceScopes[
//                                             subService.subServiceId
//                                           ] || []
//                                         ).map((sc) => (
//                                           <option
//                                             key={sc.scopeId}
//                                             value={sc.scopeId.toString()}
//                                           >
//                                             {sc.scopeName}
//                                           </option>
//                                         ))}
//                                         {scope.scopeId &&
//                                           !(
//                                             serviceScopes[
//                                               subService.subServiceId
//                                             ] || []
//                                           ).find(
//                                             (sc) =>
//                                               sc.scopeId.toString() ===
//                                               scope.scopeId
//                                           ) && (
//                                             <option value={scope.scopeId}>
//                                               {scope.scopeName || scope.scopeId}{" "}
//                                               (Contract-specific)
//                                             </option>
//                                           )}
//                                       </select>
//                                       {validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {subService.subServiceId &&
//                                         !serviceScopes[subService.subServiceId]
//                                           ?.length && (
//                                           <p className="text-yellow-500 text-xs mt-1">
//                                             Loading scopes...
//                                           </p>
//                                         )}
//                                     </div>
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         SLA Type
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Select the Service Level Agreement type"
//                                         />
//                                       </label>
//                                       <select
//                                         name="slaTypeId"
//                                         value={scope.slaTypeId}
//                                         onChange={(e) =>
//                                           handleSlaTypeChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={slaTypes.length === 0}
//                                       >
//                                         <option value="">
//                                           Select SLA Type
//                                         </option>
//                                         {slaTypes.map((sla) => (
//                                           <option
//                                             key={sla.slaTypeId}
//                                             value={sla.slaTypeId.toString()}
//                                           >
//                                             {sla.slaTypeName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {slaTypes.length === 0 && (
//                                         <p className="text-yellow-500 text-xs mt-1">
//                                           Loading SLA types...
//                                         </p>
//                                       )}
//                                     </div>
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Priority Level
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Set the priority for this scope"
//                                         />
//                                       </label>
//                                       <select
//                                         name="priorityId"
//                                         value={scope.priorityId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={
//                                           !scope.slaTypeId ||
//                                           !priorityLevels[scope.slaTypeId]
//                                             ?.length
//                                         }
//                                       >
//                                         <option value="">
//                                           Select Priority
//                                         </option>
//                                         {(
//                                           priorityLevels[scope.slaTypeId] || []
//                                         ).map((pl) => (
//                                           <option
//                                             key={pl.priorityId}
//                                             value={pl.priorityId.toString()}
//                                           >
//                                             {pl.priorityName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {scope.slaTypeId &&
//                                         !priorityLevels[scope.slaTypeId]
//                                           ?.length && (
//                                           <p className="text-yellow-500 text-xs mt-1">
//                                             Loading priorities...
//                                           </p>
//                                         )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               )
//                             )}
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 addServiceScope(serviceIndex, subServiceIndex)
//                               }
//                               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                               title="Add a new scope"
//                             >
//                               <PlusIcon className="h-4 w-4 mr-2" />
//                               Add Scope
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addSubService(serviceIndex)}
//                       className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                       title="Add a new sub-service"
//                     >
//                       <PlusIcon className="h-4 w-4 mr-2" />
//                       Add Sub-Service
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addService}
//               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//               title="Add a new service"
//             >
//               <PlusIcon className="h-4 w-4 mr-2" />
//               Add Service
//             </button>
//           </div>
//         )}

//         {activeTab === "timings" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               Employee Timings
//             </h4>
//             <div className="space-y-4">
//               {formData.employeeTimings.map((timing, timingIndex) => (
//                 <div
//                   key={timingIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {timing.dayOfWeek}
//                     </label>
//                     <input
//                       type="text"
//                       name="dutyStartTime"
//                       value={timing.dutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duty End
//                     </label>
//                     <input
//                       type="text"
//                       name="dutyEndTime"
//                       value={timing.dutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty Start
//                     </label>
//                     <input
//                       type="text"
//                       name="offDutyStartTime"
//                       value={timing.offDutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty End
//                     </label>
//                     <input
//                       type="text"
//                       name="offDutyEndTime"
//                       value={timing.offDutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "sla" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               SLA Rules
//             </h4>
//             <div className="space-y-4">
//               {formData.slaRules.map((rule, ruleIndex) => (
//                 <div
//                   key={ruleIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       SLA Type
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Select the SLA type for the rule"
//                       />
//                     </label>
//                     <select
//                       name="slaTypeId"
//                       value={rule.slaTypeId}
//                       onChange={(e) =>
//                         handleSlaTypeChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`slaRuleSlaType-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                     >
//                       <option value="">Select SLA Type</option>
//                       {slaTypes.map((sla) => (
//                         <option
//                           key={sla.slaTypeId}
//                           value={sla.slaTypeId.toString()}
//                         >
//                           {sla.slaTypeName}
//                         </option>
//                       ))}
//                     </select>
//                     {validationErrors[`slaRuleSlaType-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`slaRuleSlaType-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Priority Level
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Select the priority level for the rule"
//                       />
//                     </label>
//                     <select
//                       name="priorityId"
//                       value={rule.priorityId}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`slaRulePriority-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                       disabled={
//                         !rule.slaTypeId ||
//                         !priorityLevels[rule.slaTypeId]?.length
//                       }
//                     >
//                       <option value="">Select Priority</option>
//                       {(priorityLevels[rule.slaTypeId] || []).map((pl) => (
//                         <option
//                           key={pl.priorityId}
//                           value={pl.priorityId.toString()}
//                         >
//                           {pl.priorityName}
//                         </option>
//                       ))}
//                     </select>
//                     {validationErrors[`slaRulePriority-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`slaRulePriority-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Response Time (Hours)
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Response time in hours"
//                       />
//                     </label>
//                     <input
//                       type="number"
//                       name="responseTimeHours"
//                       value={rule.responseTimeHours}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`responseTimeHours-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       step="0.1"
//                       min="0"
//                     />
//                     {validationErrors[`responseTimeHours-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`responseTimeHours-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Resolution Time (Hours)
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Resolution time in hours"
//                       />
//                     </label>
//                     <input
//                       type="number"
//                       name="resolutionTimeHours"
//                       value={rule.resolutionTimeHours}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`resolutionTimeHours-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       step="0.1"
//                       min="0"
//                     />
//                     {validationErrors[`resolutionTimeHours-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`resolutionTimeHours-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={() => removeSlaRule(ruleIndex)}
//                       disabled={formData.slaRules.length === 1}
//                       title="Remove SLA Rule"
//                     >
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addSlaRule}
//                 className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//                 title="Add a new SLA rule"
//               >
//                 <PlusIcon className="h-4 w-4 mr-2" />
//                 Add SLA Rule
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
//           <button
//             type="submit"
//             className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//           >
//             {contractId ? "Update Contract" : "Create Contract"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

// //4444444

// import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import debounce from "lodash/debounce";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     employeeTimings: [
//       {
//         dayOfWeek: "MONDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "TUESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "WEDNESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "THURSDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "FRIDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SATURDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SUNDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//     ],
//     slaRules: [
//       {
//         slaTypeId: "",
//         priorityId: "",
//         responseTimeHours: "",
//         resolutionTimeHours: "",
//       },
//     ],
//   });
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});
//   const [activeTab, setActiveTab] = useState("basic");

//   const debouncedSetFormData = useCallback(
//     debounce((newFormData) => setFormData(newFormData), 300),
//     []
//   );

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         const companiesData = Array.isArray(companiesRes.data)
//           ? companiesRes.data
//           : [];
//         const servicesData = Array.isArray(servicesRes.data)
//           ? servicesRes.data
//           : [];
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         setCompanies(companiesData);
//         setServices(servicesData);
//         setSlaTypes(slaTypesData);

//         if (contractId) {
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;
//           console.log("Contract data:", contract); // Debug log

//           const subServicesMap = {};
//           const serviceScopesMap = {};
//           const priorityLevelsMap = {};

//           await Promise.all(
//             (contract.services || []).map(async (service) => {
//               const serviceId = service.serviceId
//                 ? service.serviceId.toString()
//                 : "";
//               if (serviceId && !subServicesMap[serviceId]) {
//                 try {
//                   const subServicesRes = await contractService.getSubServices(
//                     serviceId
//                   );
//                   subServicesMap[serviceId] = Array.isArray(subServicesRes.data)
//                     ? subServicesRes.data
//                     : [];
//                 } catch (err) {
//                   subServicesMap[serviceId] = (service.subServices || []).map(
//                     (ss) => ({
//                       subServiceId: ss.subServiceId
//                         ? ss.subServiceId.toString()
//                         : "",
//                       subServiceName: ss.subServiceName || "",
//                     })
//                   );
//                 }
//               }
//               await Promise.all(
//                 (service.subServices || []).map(async (subService) => {
//                   const subServiceId = subService.subServiceId
//                     ? subService.subServiceId.toString()
//                     : "";
//                   if (subServiceId && !serviceScopesMap[subServiceId]) {
//                     try {
//                       const scopesRes = await contractService.getServiceScopes(
//                         subServiceId
//                       );
//                       serviceScopesMap[subServiceId] = Array.isArray(
//                         scopesRes.data
//                       )
//                         ? scopesRes.data
//                         : [];
//                     } catch (err) {
//                       serviceScopesMap[subServiceId] = (
//                         subService.serviceScopes || []
//                       ).map((sc) => ({
//                         scopeId: sc.scopeId ? sc.scopeId.toString() : "",
//                         scopeName: sc.scopeName || "",
//                       }));
//                     }
//                   }
//                   await Promise.all(
//                     (subService.serviceScopes || []).map(async (scope) => {
//                       const slaTypeId = scope.slaTypeId
//                         ? scope.slaTypeId.toString()
//                         : "";
//                       if (slaTypeId && !priorityLevelsMap[slaTypeId]) {
//                         try {
//                           const prioritiesRes =
//                             await contractService.getPriorityLevels(slaTypeId);
//                           priorityLevelsMap[slaTypeId] = Array.isArray(
//                             prioritiesRes.data
//                           )
//                             ? prioritiesRes.data
//                             : [];
//                         } catch (err) {
//                           priorityLevelsMap[slaTypeId] = [
//                             {
//                               priorityId: scope.priorityId
//                                 ? scope.priorityId.toString()
//                                 : "",
//                               priorityName: scope.priorityName || "",
//                             },
//                           ];
//                         }
//                       }
//                     })
//                   );
//                 })
//               );
//             })
//           );

//           setSubServices(subServicesMap);
//           setServiceScopes(serviceScopesMap);
//           setPriorityLevels(priorityLevelsMap);

//           const newFormData = {
//             contractName: contract.contractName || "",
//             companyId: contract.companyId ? contract.companyId.toString() : "",
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: (contract.services || []).map((cs) => ({
//               serviceId: cs.serviceId ? cs.serviceId.toString() : "",
//               subServices: (cs.subServices || []).map((css) => ({
//                 subServiceId: css.subServiceId
//                   ? css.subServiceId.toString()
//                   : "",
//                 serviceScopes: (css.serviceScopes || []).map((scope) => ({
//                   scopeId: scope.scopeId ? scope.scopeId.toString() : "",
//                   slaTypeId: scope.slaTypeId ? scope.slaTypeId.toString() : "",
//                   priorityId: scope.priorityId
//                     ? scope.priorityId.toString()
//                     : "",
//                 })) || [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//               })) || [
//                 {
//                   subServiceId: "",
//                   serviceScopes: [
//                     { scopeId: "", slaTypeId: "", priorityId: "" },
//                   ],
//                 },
//               ],
//             })) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//             employeeTimings:
//               (contract.employeeTimings || []).map((et) => ({
//                 dayOfWeek: et.dayOfWeek || "",
//                 dutyStartTime: et.dutyStartTime || "09:00",
//                 dutyEndTime: et.dutyEndTime || "17:00",
//                 offDutyStartTime: et.offDutyStartTime || "17:00",
//                 offDutyEndTime: et.offDutyEndTime || "09:00",
//               })) || formData.employeeTimings,
//             slaRules: (contract.slaRules || []).map((sr) => ({
//               slaTypeId: sr.slaTypeId ? sr.slaTypeId.toString() : "",
//               priorityId: sr.priorityId ? sr.priorityId.toString() : "",
//               responseTimeHours: sr.responseTimeHours
//                 ? sr.responseTimeHours.toString()
//                 : "",
//               resolutionTimeHours: sr.resolutionTimeHours
//                 ? sr.resolutionTimeHours.toString()
//                 : "",
//             })) || [
//               {
//                 slaTypeId: "",
//                 priorityId: "",
//                 responseTimeHours: "",
//                 resolutionTimeHours: "",
//               },
//             ],
//           };

//           setFormData(newFormData);
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyStartTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "dutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "offDutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyStartTime-${timingIndex}`] =
//         "Valid time (HH:MM) required.";
//     if (name === "offDutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "slaRuleSlaTypeId" && !value)
//       errors[`slaRuleSlaType-${ruleIndex}`] = "SLA type is required.";
//     if (name === "slaRulePriorityId" && !value)
//       errors[`slaRulePriority-${ruleIndex}`] = "Priority level is required.";
//     if (name === "responseTimeHours" && (value === "" || value < 0))
//       errors[`responseTimeHours-${ruleIndex}`] =
//         "Valid response time required.";
//     if (name === "resolutionTimeHours" && (value === "" || value < 0))
//       errors[`resolutionTimeHours-${ruleIndex}`] =
//         "Valid resolution time required.";
//     return errors;
//   };

//   //   const handleChange = (
//   //     e,
//   //     serviceIndex,
//   //     subServiceIndex,
//   //     scopeIndex,
//   //     timingIndex,
//   //     ruleIndex
//   //   ) => {
//   //     const { name, value } = e.target;
//   //     const newFormData = { ...formData };

//   //     // Update nested formData based on indices
//   //     if (
//   //       serviceIndex !== undefined &&
//   //       subServiceIndex !== undefined &&
//   //       scopeIndex !== undefined
//   //     ) {
//   //       newFormData.services[serviceIndex].subServices[
//   //         subServiceIndex
//   //       ].serviceScopes[scopeIndex][name] = value;
//   //       if (name === "scopeId") {
//   //         newFormData.services[serviceIndex].subServices[
//   //           subServiceIndex
//   //         ].serviceScopes[scopeIndex].slaTypeId = "";
//   //         newFormData.services[serviceIndex].subServices[
//   //           subServiceIndex
//   //         ].serviceScopes[scopeIndex].priorityId = "";
//   //       }
//   //     } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//   //       newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//   //         value;
//   //       if (name === "subServiceId") {
//   //         newFormData.services[serviceIndex].subServices[
//   //           subServiceIndex
//   //         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//   //         if (value) {
//   //           contractService
//   //             .getServiceScopes(value)
//   //             .then((res) => {
//   //               setServiceScopes((prev) => ({
//   //                 ...prev,
//   //                 [value]: Array.isArray(res.data) ? res.data : [],
//   //               }));
//   //             })
//   //             .catch((err) => setError("Failed to load service scopes."));
//   //         }
//   //       }
//   //     } else if (serviceIndex !== undefined) {
//   //       newFormData.services[serviceIndex][name] = value;
//   //       if (name === "serviceId") {
//   //         newFormData.services[serviceIndex].subServices = [
//   //           {
//   //             subServiceId: "",
//   //             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//   //           },
//   //         ];
//   //         if (value) {
//   //           contractService
//   //             .getSubServices(value)
//   //             .then((res) => {
//   //               setSubServices((prev) => ({
//   //                 ...prev,
//   //                 [value]: Array.isArray(res.data) ? res.data : [],
//   //               }));
//   //             })
//   //             .catch((err) => setError("Failed to load sub-services."));
//   //         }
//   //       }
//   //     } else if (timingIndex !== undefined) {
//   //       newFormData.employeeTimings[timingIndex][name] = value;
//   //     } else if (ruleIndex !== undefined) {
//   //       const field =
//   //         name === "slaTypeId"
//   //           ? "slaTypeId"
//   //           : name === "priorityId"
//   //           ? "priorityId"
//   //           : name;
//   //       newFormData.slaRules[ruleIndex][field] = value;
//   //       if (name === "slaTypeId") {
//   //         newFormData.slaRules[ruleIndex].priorityId = "";
//   //       }
//   //     } else {
//   //       newFormData[name] = value;
//   //     }

//   //     // Update validation errors
//   //     const errors = validateField(
//   //       name,
//   //       value,
//   //       serviceIndex,
//   //       subServiceIndex,
//   //       scopeIndex,
//   //       timingIndex,
//   //       ruleIndex
//   //     );

//   //     // Apply debounced state update
//   //     debouncedSetFormData(newFormData);
//   //     setValidationErrors((prev) => ({ ...prev, ...errors }));
//   //   };

//   const handleChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const { name, value } = e.target;
//     const newFormData = { ...formData };

//     // Update nested formData based on indices
//     if (
//       serviceIndex !== undefined &&
//       subServiceIndex !== undefined &&
//       scopeIndex !== undefined
//     ) {
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes[scopeIndex][name] = value;
//       if (name === "scopeId") {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].slaTypeId = "";
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].priorityId = "";
//       }
//     } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//       newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//         value;
//       if (name === "subServiceId") {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//         if (value) {
//           // Fetch service scopes asynchronously without immediate state update
//           contractService
//             .getServiceScopes(value)
//             .then((res) => {
//               setServiceScopes((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               console.error("Failed to load service scopes:", err);
//               setError("Failed to load service scopes.");
//             });
//         }
//       }
//     } else if (serviceIndex !== undefined) {
//       newFormData.services[serviceIndex][name] = value;
//       if (name === "serviceId") {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           },
//         ];
//         if (value) {
//           // Fetch sub-services asynchronously without immediate state update
//           contractService
//             .getSubServices(value)
//             .then((res) => {
//               setSubServices((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               console.error("Failed to load sub-services:", err);
//               setError("Failed to load sub-services.");
//             });
//         }
//       }
//     } else if (timingIndex !== undefined) {
//       newFormData.employeeTimings[timingIndex][name] = value;
//     } else if (ruleIndex !== undefined) {
//       const field =
//         name === "slaTypeId"
//           ? "slaTypeId"
//           : name === "priorityId"
//           ? "priorityId"
//           : name;
//       newFormData.slaRules[ruleIndex][field] = value;
//       if (name === "slaTypeId") {
//         newFormData.slaRules[ruleIndex].priorityId = "";
//       }
//     } else {
//       newFormData[name] = value;
//     }

//     // Update validation errors
//     const errors = validateField(
//       name,
//       value,
//       serviceIndex,
//       subServiceIndex,
//       scopeIndex,
//       timingIndex,
//       ruleIndex
//     );

//     // Apply debounced state update
//     debouncedSetFormData(newFormData);
//     setValidationErrors((prev) => ({ ...prev, ...errors }));
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     ruleIndex
//   ) => {
//     const slaTypeId = e.target.value;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (ruleIndex !== undefined) {
//         newFormData.slaRules[ruleIndex].slaTypeId = slaTypeId;
//         newFormData.slaRules[ruleIndex].priorityId = "";
//       } else {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].priorityId = "";
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         ruleIndex !== undefined ? "slaRuleSlaTypeId" : "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex,
//         undefined,
//         ruleIndex
//       ),
//     }));
//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => {
//           console.error("Failed to load priority levels:", err);
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: [], // Fallback to empty array
//           }));
//           setError("Failed to load priority levels. Please try again.");
//         });
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   //   const addSubService = (serviceIndex) => {
//   //     setFormData((prev) => {
//   //       const newFormData = { ...prev };
//   //       newFormData.services[serviceIndex].subServices.push({
//   //         subServiceId: "",
//   //         serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//   //       });
//   //       return newFormData;
//   //     });
//   //   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//       });
//       return newFormData;
//     });
//   };

//   const addSlaRule = () => {
//     setFormData((prev) => ({
//       ...prev,
//       slaRules: [
//         ...prev.slaRules,
//         {
//           slaTypeId: "",
//           priorityId: "",
//           responseTimeHours: "",
//           resolutionTimeHours: "",
//         },
//       ],
//     }));
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`service-${serviceIndex}`) ||
//           key.startsWith(`subService-${serviceIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (key.startsWith(`subService-${serviceIndex}-${subServiceIndex}`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(
//             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//           )
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSlaRule = (ruleIndex) => {
//     setFormData((prev) => {
//       const newRules = prev.slaRules.filter((_, idx) => idx !== ruleIndex);
//       return {
//         ...prev,
//         slaRules: newRules.length
//           ? newRules
//           : [
//               {
//                 slaTypeId: "",
//                 priorityId: "",
//                 responseTimeHours: "",
//                 resolutionTimeHours: "",
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`slaRuleSlaType-${ruleIndex}`) ||
//           key.startsWith(`slaRulePriority-${ruleIndex}`) ||
//           key.startsWith(`responseTimeHours-${ruleIndex}`) ||
//           key.startsWith(`resolutionTimeHours-${ruleIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName) errors.contractName = "Required field.";
//     if (!formData.companyId) errors.companyId = "Required field.";
//     if (!formData.projectType) errors.projectType = "Required field.";
//     if (!formData.startDate) errors.startDate = "Required field.";
//     if (!formData.endDate) errors.endDate = "Required field.";
//     if (!formData.services.length) errors.services = "At least one required.";
//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Required field.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Required field.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Required field.";
//         });
//       });
//     });
//     formData.employeeTimings.forEach((timing, timingIndex) => {
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyStartTime))
//         errors[`dutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyEndTime))
//         errors[`dutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyStartTime))
//         errors[`offDutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyEndTime))
//         errors[`offDutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//     });
//     formData.slaRules.forEach((rule, ruleIndex) => {
//       if (!rule.slaTypeId)
//         errors[`slaRuleSlaType-${ruleIndex}`] = "Required field.";
//       if (!rule.priorityId)
//         errors[`slaRulePriority-${ruleIndex}`] = "Required field.";
//       if (rule.responseTimeHours === "" || rule.responseTimeHours < 0)
//         errors[`responseTimeHours-${ruleIndex}`] = "Valid time required.";
//       if (rule.resolutionTimeHours === "" || rule.resolutionTimeHours < 0)
//         errors[`resolutionTimeHours-${ruleIndex}`] = "Valid time required.";
//     });
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const cleanedFormData = {
//       contractName: formData.contractName,
//       companyId: parseInt(formData.companyId, 10),
//       projectLocation: formData.projectLocation,
//       projectType: formData.projectType,
//       startDate: formData.startDate,
//       endDate: formData.endDate,
//       services: formData.services.map((service) => ({
//         serviceId: parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           subServiceId: parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             scopeId: parseInt(scope.scopeId, 10),
//             slaTypeId: parseInt(scope.slaTypeId, 10),
//             priorityId: parseInt(scope.priorityId, 10),
//           })),
//         })),
//       })),
//       employeeTimings: formData.employeeTimings.map((timing) => ({
//         dayOfWeek: timing.dayOfWeek,
//         dutyStartTime: timing.dutyStartTime + ":00",
//         dutyEndTime: timing.dutyEndTime + ":00",
//         offDutyStartTime: timing.offDutyStartTime + ":00",
//         offDutyEndTime: timing.offDutyEndTime + ":00",
//       })),
//       slaRules: formData.slaRules.map((rule) => ({
//         slaTypeId: parseInt(rule.slaTypeId, 10),
//         priorityId: parseInt(rule.priorityId, 10),
//         responseTimeHours: parseFloat(rule.responseTimeHours),
//         resolutionTimeHours: parseFloat(rule.resolutionTimeHours),
//       })),
//     };
//     if (contractId) {
//       try {
//         await Promise.all([
//           contractService.updateContractDetails(contractId, {
//             contractName: cleanedFormData.contractName,
//             companyId: cleanedFormData.companyId,
//             projectLocation: cleanedFormData.projectLocation,
//             projectType: cleanedFormData.projectType,
//             startDate: cleanedFormData.startDate,
//             endDate: cleanedFormData.endDate,
//           }),
//           contractService.updateContractServices(
//             contractId,
//             cleanedFormData.services
//           ),
//           contractService.updateEmployeeTimings(
//             contractId,
//             cleanedFormData.employeeTimings
//           ),
//           contractService.updateSlaRules(contractId, cleanedFormData.slaRules),
//         ]);
//         onSubmit(cleanedFormData, contractId);
//       } catch (err) {
//         setError("Failed to update contract.");
//       }
//     } else {
//       onSubmit(cleanedFormData);
//     }
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 py-8 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-6">
//         <p className="text-lg font-medium">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 py-6 w-full bg-white rounded-lg shadow-lg mt-6">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>
//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
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
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 0 9 0 0118 0z"
//             />
//           </svg>
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}

//       <div className="mb-6 border-b border-gray-200">
//         <div className="flex flex-wrap">
//           {[
//             { id: "basic", label: "Basic Information" },
//             { id: "services", label: "Services" },
//             { id: "timings", label: "Employee Timings" },
//             { id: "sla", label: "SLA Rules" },
//           ].map((tab, index) => (
//             <button
//               key={tab.id}
//               className={`px-4 py-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? "border-b-2 border-blue-600 text-blue-600"
//                   : "text-gray-600 hover:text-blue-700"
//               }`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === "basic" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Contract Name
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Enter a unique name for the contract"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="contractName"
//                 value={formData.contractName}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.contractName
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.contractName && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.contractName}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Company
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Select the company associated with this contract"
//                 />
//               </label>
//               <select
//                 name="companyId"
//                 value={formData.companyId}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.companyId
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               >
//                 <option value="">Select Company</option>
//                 {companies.map((company) => (
//                   <option
//                     key={company.companyId}
//                     value={company.companyId.toString()}
//                   >
//                     {company.companyName} {/* Correct */}
//                   </option>
//                 ))}
//               </select>

//               {validationErrors.companyId && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.companyId}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Location
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Optional: Specify the project location"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="projectLocation"
//                 value={formData.projectLocation}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md border-gray-200 bg-white focus:ring-blue-500 focus:shadow-md transition-colors"
//               />
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Type
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Choose the contract duration type"
//                 />
//               </label>
//               <select
//                 name="projectType"
//                 value={formData.projectType}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.projectType
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               >
//                 <option value="">Select Project Type</option>
//                 <option value="ANNUAL">Annual</option>
//                 <option value="ONE_TIME">One Time</option>
//               </select>
//               {validationErrors.projectType && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.projectType}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Start Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract start date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.startDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.startDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.startDate}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 End Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract end date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.endDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.endDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.endDate}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "services" && (
//           <div className="space-y-4">
//             {formData.services.map((service, serviceIndex) => (
//               <div
//                 key={serviceIndex}
//                 className="bg-gray-50 p-6 rounded-lg shadow-sm"
//               >
//                 <div
//                   className="flex items-center justify-between bg-blue-100 p-4 rounded-md cursor-pointer hover:bg-blue-200"
//                   onClick={() => toggleCollapse("service", serviceIndex)}
//                 >
//                   <h4 className="text-lg font-semibold text-blue-700">
//                     Service {serviceIndex + 1}
//                   </h4>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         removeService(serviceIndex);
//                       }}
//                       disabled={formData.services.length === 1}
//                       title="Remove Service"
//                     >
//                       <TrashIcon className="h-4 w-4" />
//                     </button>
//                     {collapsedSections[`service-${serviceIndex}`] ? (
//                       <ChevronUpIcon className="h-4 w-4 text-blue-600" />
//                     ) : (
//                       <ChevronDownIcon className="h-4 w-4 text-blue-600" />
//                     )}
//                   </div>
//                 </div>
//                 {!collapsedSections[`service-${serviceIndex}`] && (
//                   <div className="mt-6 space-y-4">
//                     <div className="relative">
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                         Service
//                         <InformationCircleIcon
//                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                           title="Select the main service category"
//                         />
//                       </label>
//                       <select
//                         name="serviceId"
//                         value={service.serviceId}
//                         onChange={(e) => handleChange(e, serviceIndex)}
//                         className={`w-full p-3 border rounded-md ${
//                           validationErrors[`service-${serviceIndex}`]
//                             ? "border-red-500"
//                             : "border-gray-200"
//                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                         disabled={services.length === 0}
//                       >
//                         <option value="">Select Service</option>
//                         {services.map((s) => (
//                           <option
//                             key={s.serviceId}
//                             value={s.serviceId.toString()}
//                           >
//                             {s.serviceName}
//                           </option>
//                         ))}
//                         {service.serviceId &&
//                           !services.find(
//                             (s) => s.serviceId.toString() === service.serviceId
//                           ) && (
//                             <option value={service.serviceId}>
//                               {service.serviceName || service.serviceId}{" "}
//                               (Contract-specific)
//                             </option>
//                           )}
//                       </select>
//                       {validationErrors[`service-${serviceIndex}`] && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {validationErrors[`service-${serviceIndex}`]}
//                         </p>
//                       )}
//                       {services.length === 0 && (
//                         <p className="text-yellow-500 text-xs mt-1">
//                           Loading services...
//                         </p>
//                       )}
//                     </div>

//                     {service.subServices.map((subService, subServiceIndex) => (
//                       <div
//                         key={subServiceIndex}
//                         className="ml-6 p-4 bg-gray-100 rounded-lg shadow-sm"
//                       >
//                         <div
//                           className="flex items-center justify-between bg-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-300"
//                           onClick={() =>
//                             toggleCollapse(
//                               "subService",
//                               serviceIndex,
//                               subServiceIndex
//                             )
//                           }
//                         >
//                           <h5 className="text-md font-medium text-gray-600">
//                             Sub-Service {subServiceIndex + 1}
//                           </h5>
//                           <div className="flex items-center space-x-4">
//                             <button
//                               type="button"
//                               className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 removeSubService(serviceIndex, subServiceIndex);
//                               }}
//                               disabled={service.subServices.length === 1}
//                               title="Remove Sub-Service"
//                             >
//                               <TrashIcon className="h-4 w-4" />
//                             </button>
//                             {collapsedSections[
//                               `subService-${serviceIndex}-${subServiceIndex}`
//                             ] ? (
//                               <ChevronUpIcon className="h-4 w-4 text-gray-600" />
//                             ) : (
//                               <ChevronDownIcon className="h-4 w-4 text-gray-600" />
//                             )}
//                           </div>
//                         </div>
//                         {!collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] && (
//                           <div className="mt-4 space-y-4">
//                             <div className="relative">
//                               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                 Sub-Service
//                                 <InformationCircleIcon
//                                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                   title="Select a sub-service"
//                                 />
//                               </label>
//                               <select
//                                 name="subServiceId"
//                                 value={subService.subServiceId}
//                                 onChange={(e) =>
//                                   handleChange(e, serviceIndex, subServiceIndex)
//                                 }
//                                 className={`w-full p-3 border rounded-md ${
//                                   validationErrors[
//                                     `subService-${serviceIndex}-${subServiceIndex}`
//                                   ]
//                                     ? "border-red-500"
//                                     : "border-gray-200"
//                                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                 disabled={
//                                   !service.serviceId ||
//                                   !subServices[service.serviceId]?.length
//                                 }
//                               >
//                                 <option value="">Select Sub-Service</option>
//                                 {(subServices[service.serviceId] || []).map(
//                                   (ss) => (
//                                     <option
//                                       key={ss.subServiceId}
//                                       value={ss.subServiceId.toString()}
//                                     >
//                                       {ss.subServiceName}
//                                     </option>
//                                   )
//                                 )}
//                                 {subService.subServiceId &&
//                                   !(subServices[service.serviceId] || []).find(
//                                     (ss) =>
//                                       ss.subServiceId.toString() ===
//                                       subService.subServiceId
//                                   ) && (
//                                     <option value={subService.subServiceId}>
//                                       {subService.subServiceName ||
//                                         subService.subServiceId}{" "}
//                                       (Contract-specific)
//                                     </option>
//                                   )}
//                               </select>
//                               {validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ] && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                   {
//                                     validationErrors[
//                                       `subService-${serviceIndex}-${subServiceIndex}`
//                                     ]
//                                   }
//                                 </p>
//                               )}
//                               {service.serviceId &&
//                                 !subServices[service.serviceId]?.length && (
//                                   <p className="text-yellow-500 text-xs mt-1">
//                                     Loading sub-services...
//                                   </p>
//                                 )}
//                             </div>

//                             {subService.serviceScopes.map(
//                               (scope, scopeIndex) => (
//                                 <div
//                                   key={scopeIndex}
//                                   className="ml-4 p-4 bg-white rounded-md shadow-sm"
//                                 >
//                                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
//                                     <h6 className="text-sm font-medium text-gray-600">
//                                       Scope {scopeIndex + 1}
//                                     </h6>
//                                     <button
//                                       type="button"
//                                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                                       onClick={() =>
//                                         removeServiceScope(
//                                           serviceIndex,
//                                           subServiceIndex,
//                                           scopeIndex
//                                         )
//                                       }
//                                       disabled={
//                                         subService.serviceScopes.length === 1
//                                       }
//                                       title="Remove Scope"
//                                     >
//                                       <TrashIcon className="h-4 w-4" />
//                                     </button>
//                                   </div>
//                                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Service Scope
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Define the specific scope of work"
//                                         />
//                                       </label>
//                                       <select
//                                         name="scopeId"
//                                         value={scope.scopeId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={
//                                           !subService.subServiceId ||
//                                           !serviceScopes[
//                                             subService.subServiceId
//                                           ]?.length
//                                         }
//                                       >
//                                         <option value="">Select Scope</option>
//                                         {(
//                                           serviceScopes[
//                                             subService.subServiceId
//                                           ] || []
//                                         ).map((sc) => (
//                                           <option
//                                             key={sc.scopeId}
//                                             value={sc.scopeId.toString()}
//                                           >
//                                             {sc.scopeName}
//                                           </option>
//                                         ))}
//                                         {scope.scopeId &&
//                                           !(
//                                             serviceScopes[
//                                               subService.subServiceId
//                                             ] || []
//                                           ).find(
//                                             (sc) =>
//                                               sc.scopeId.toString() ===
//                                               scope.scopeId
//                                           ) && (
//                                             <option value={scope.scopeId}>
//                                               {scope.scopeName || scope.scopeId}{" "}
//                                               (Contract-specific)
//                                             </option>
//                                           )}
//                                       </select>
//                                       {validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {subService.subServiceId &&
//                                         !serviceScopes[subService.subServiceId]
//                                           ?.length && (
//                                           <p className="text-yellow-500 text-xs mt-1">
//                                             Loading scopes...
//                                           </p>
//                                         )}
//                                     </div>
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         SLA Type
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Select the Service Level Agreement type"
//                                         />
//                                       </label>
//                                       <select
//                                         name="slaTypeId"
//                                         value={scope.slaTypeId}
//                                         onChange={(e) =>
//                                           handleSlaTypeChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={slaTypes.length === 0}
//                                       >
//                                         <option value="">
//                                           Select SLA Type
//                                         </option>
//                                         {slaTypes.map((sla) => (
//                                           <option
//                                             key={sla.slaTypeId}
//                                             value={sla.slaTypeId.toString()}
//                                           >
//                                             {sla.slaTypeName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {slaTypes.length === 0 && (
//                                         <p className="text-yellow-500 text-xs mt-1">
//                                           Loading SLA types...
//                                         </p>
//                                       )}
//                                     </div>
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Priority Level
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Set the priority for this scope"
//                                         />
//                                       </label>
//                                       <select
//                                         name="priorityId"
//                                         value={scope.priorityId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={
//                                           !scope.slaTypeId ||
//                                           !priorityLevels[scope.slaTypeId]
//                                             ?.length
//                                         }
//                                       >
//                                         <option value="">
//                                           Select Priority
//                                         </option>
//                                         {(
//                                           priorityLevels[scope.slaTypeId] || []
//                                         ).map((pl) => (
//                                           <option
//                                             key={pl.priorityId}
//                                             value={pl.priorityId.toString()}
//                                           >
//                                             {pl.priorityName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {scope.slaTypeId &&
//                                         !priorityLevels[scope.slaTypeId]
//                                           ?.length && (
//                                           <p className="text-yellow-500 text-xs mt-1">
//                                             Loading priorities...
//                                           </p>
//                                         )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               )
//                             )}
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 addServiceScope(serviceIndex, subServiceIndex)
//                               }
//                               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                               title="Add a new scope"
//                             >
//                               <PlusIcon className="h-4 w-4 mr-2" />
//                               Add Scope
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addSubService(serviceIndex)}
//                       className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                       title="Add a new sub-service"
//                     >
//                       <PlusIcon className="h-4 w-4 mr-2" />
//                       Add Sub-Service
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addService}
//               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//               title="Add a new service"
//             >
//               <PlusIcon className="h-4 w-4 mr-2" />
//               Add Service
//             </button>
//           </div>
//         )}

//         {activeTab === "timings" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               Employee Timings
//             </h4>
//             <div className="space-y-4">
//               {formData.employeeTimings.map((timing, timingIndex) => (
//                 <div
//                   key={timingIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {timing.dayOfWeek}
//                     </label>
//                     <input
//                       type="text"
//                       name="dutyStartTime"
//                       value={timing.dutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duty End
//                     </label>
//                     <input
//                       type="text"
//                       name="dutyEndTime"
//                       value={timing.dutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty Start
//                     </label>
//                     <input
//                       type="text"
//                       name="offDutyStartTime"
//                       value={timing.offDutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty End
//                     </label>
//                     <input
//                       type="text"
//                       name="offDutyEndTime"
//                       value={timing.offDutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "sla" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               SLA Rules
//             </h4>
//             <div className="space-y-4">
//               {formData.slaRules.map((rule, ruleIndex) => (
//                 <div
//                   key={ruleIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       SLA Type
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Select the SLA type for the rule"
//                       />
//                     </label>
//                     <select
//                       name="slaTypeId"
//                       value={rule.slaTypeId}
//                       onChange={(e) =>
//                         handleSlaTypeChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`slaRuleSlaType-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                     >
//                       <option value="">Select SLA Type</option>
//                       {slaTypes.map((sla) => (
//                         <option
//                           key={sla.slaTypeId}
//                           value={sla.slaTypeId.toString()}
//                         >
//                           {sla.slaTypeName}
//                         </option>
//                       ))}
//                     </select>
//                     {validationErrors[`slaRuleSlaType-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`slaRuleSlaType-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Priority Level
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Select the priority level for the rule"
//                       />
//                     </label>
//                     <select
//                       name="priorityId"
//                       value={rule.priorityId}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`slaRulePriority-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                       disabled={
//                         !rule.slaTypeId ||
//                         !priorityLevels[rule.slaTypeId]?.length
//                       }
//                     >
//                       <option value="">Select Priority</option>
//                       {(priorityLevels[rule.slaTypeId] || []).map((pl) => (
//                         <option
//                           key={pl.priorityId}
//                           value={pl.priorityId.toString()}
//                         >
//                           {pl.priorityName}
//                         </option>
//                       ))}
//                     </select>
//                     {validationErrors[`slaRulePriority-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`slaRulePriority-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Response Time (Hours)
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Response time in hours"
//                       />
//                     </label>
//                     <input
//                       type="number"
//                       name="responseTimeHours"
//                       value={rule.responseTimeHours}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`responseTimeHours-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       step="0.1"
//                       min="0"
//                     />
//                     {validationErrors[`responseTimeHours-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`responseTimeHours-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Resolution Time (Hours)
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Resolution time in hours"
//                       />
//                     </label>
//                     <input
//                       type="number"
//                       name="resolutionTimeHours"
//                       value={rule.resolutionTimeHours}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`resolutionTimeHours-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       step="0.1"
//                       min="0"
//                     />
//                     {validationErrors[`resolutionTimeHours-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`resolutionTimeHours-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={() => removeSlaRule(ruleIndex)}
//                       disabled={formData.slaRules.length === 1}
//                       title="Remove SLA Rule"
//                     >
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addSlaRule}
//                 className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//                 title="Add a new SLA rule"
//               >
//                 <PlusIcon className="h-4 w-4 mr-2" />
//                 Add SLA Rule
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
//           <button
//             type="submit"
//             className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//           >
//             {contractId ? "Update Contract" : "Create Contract"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

// //////333333333333333

// import { useState, useEffect, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import debounce from "lodash/debounce";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     employeeTimings: [
//       {
//         dayOfWeek: "MONDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "TUESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "WEDNESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "THURSDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "FRIDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SATURDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SUNDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//     ],
//     slaRules: [
//       {
//         slaTypeId: "",
//         priorityId: "",
//         responseTimeHours: "",
//         resolutionTimeHours: "",
//       },
//     ],
//   });
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});
//   const [activeTab, setActiveTab] = useState("basic");

//   const debouncedSetFormData = useCallback(
//     debounce((newFormData) => setFormData(newFormData), 300),
//     []
//   );

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         const companiesData = Array.isArray(companiesRes.data)
//           ? companiesRes.data
//           : [];
//         const servicesData = Array.isArray(servicesRes.data)
//           ? servicesRes.data
//           : [];
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         setCompanies(companiesData);
//         setServices(servicesData);
//         setSlaTypes(slaTypesData);

//         if (contractId) {
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;
//           console.log("Contract data:", contract); // Debug log

//           const subServicesMap = {};
//           const serviceScopesMap = {};
//           const priorityLevelsMap = {};

//           await Promise.all(
//             (contract.services || []).map(async (service) => {
//               const serviceId = service.serviceId
//                 ? service.serviceId.toString()
//                 : "";
//               if (serviceId && !subServicesMap[serviceId]) {
//                 try {
//                   const subServicesRes = await contractService.getSubServices(
//                     serviceId
//                   );
//                   subServicesMap[serviceId] = Array.isArray(subServicesRes.data)
//                     ? subServicesRes.data
//                     : [];
//                 } catch (err) {
//                   subServicesMap[serviceId] = (service.subServices || []).map(
//                     (ss) => ({
//                       subServiceId: ss.subServiceId
//                         ? ss.subServiceId.toString()
//                         : "",
//                       subServiceName: ss.subServiceName || "",
//                     })
//                   );
//                 }
//               }
//               await Promise.all(
//                 (service.subServices || []).map(async (subService) => {
//                   const subServiceId = subService.subServiceId
//                     ? subService.subServiceId.toString()
//                     : "";
//                   if (subServiceId && !serviceScopesMap[subServiceId]) {
//                     try {
//                       const scopesRes = await contractService.getServiceScopes(
//                         subServiceId
//                       );
//                       serviceScopesMap[subServiceId] = Array.isArray(
//                         scopesRes.data
//                       )
//                         ? scopesRes.data
//                         : [];
//                     } catch (err) {
//                       serviceScopesMap[subServiceId] = (
//                         subService.serviceScopes || []
//                       ).map((sc) => ({
//                         scopeId: sc.scopeId ? sc.scopeId.toString() : "",
//                         scopeName: sc.scopeName || "",
//                       }));
//                     }
//                   }
//                   await Promise.all(
//                     (subService.serviceScopes || []).map(async (scope) => {
//                       const slaTypeId = scope.slaTypeId
//                         ? scope.slaTypeId.toString()
//                         : "";
//                       if (slaTypeId && !priorityLevelsMap[slaTypeId]) {
//                         try {
//                           const prioritiesRes =
//                             await contractService.getPriorityLevels(slaTypeId);
//                           priorityLevelsMap[slaTypeId] = Array.isArray(
//                             prioritiesRes.data
//                           )
//                             ? prioritiesRes.data
//                             : [];
//                         } catch (err) {
//                           priorityLevelsMap[slaTypeId] = [
//                             {
//                               priorityId: scope.priorityId
//                                 ? scope.priorityId.toString()
//                                 : "",
//                               priorityName: scope.priorityName || "",
//                             },
//                           ];
//                         }
//                       }
//                     })
//                   );
//                 })
//               );
//             })
//           );

//           setSubServices(subServicesMap);
//           setServiceScopes(serviceScopesMap);
//           setPriorityLevels(priorityLevelsMap);

//           const newFormData = {
//             contractName: contract.contractName || "",
//             companyId: contract.companyId ? contract.companyId.toString() : "",
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: (contract.services || []).map((cs) => ({
//               serviceId: cs.serviceId ? cs.serviceId.toString() : "",
//               subServices: (cs.subServices || []).map((css) => ({
//                 subServiceId: css.subServiceId
//                   ? css.subServiceId.toString()
//                   : "",
//                 serviceScopes: (css.serviceScopes || []).map((scope) => ({
//                   scopeId: scope.scopeId ? scope.scopeId.toString() : "",
//                   slaTypeId: scope.slaTypeId ? scope.slaTypeId.toString() : "",
//                   priorityId: scope.priorityId
//                     ? scope.priorityId.toString()
//                     : "",
//                 })) || [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//               })) || [
//                 {
//                   subServiceId: "",
//                   serviceScopes: [
//                     { scopeId: "", slaTypeId: "", priorityId: "" },
//                   ],
//                 },
//               ],
//             })) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//             employeeTimings:
//               (contract.employeeTimings || []).map((et) => ({
//                 dayOfWeek: et.dayOfWeek || "",
//                 dutyStartTime: et.dutyStartTime || "09:00",
//                 dutyEndTime: et.dutyEndTime || "17:00",
//                 offDutyStartTime: et.offDutyStartTime || "17:00",
//                 offDutyEndTime: et.offDutyEndTime || "09:00",
//               })) || formData.employeeTimings,
//             slaRules: (contract.slaRules || []).map((sr) => ({
//               slaTypeId: sr.slaTypeId ? sr.slaTypeId.toString() : "",
//               priorityId: sr.priorityId ? sr.priorityId.toString() : "",
//               responseTimeHours: sr.responseTimeHours
//                 ? sr.responseTimeHours.toString()
//                 : "",
//               resolutionTimeHours: sr.resolutionTimeHours
//                 ? sr.resolutionTimeHours.toString()
//                 : "",
//             })) || [
//               {
//                 slaTypeId: "",
//                 priorityId: "",
//                 responseTimeHours: "",
//                 resolutionTimeHours: "",
//               },
//             ],
//           };

//           setFormData(newFormData);
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyStartTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "dutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "offDutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyStartTime-${timingIndex}`] =
//         "Valid time (HH:MM) required.";
//     if (name === "offDutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "slaRuleSlaTypeId" && !value)
//       errors[`slaRuleSlaType-${ruleIndex}`] = "SLA type is required.";
//     if (name === "slaRulePriorityId" && !value)
//       errors[`slaRulePriority-${ruleIndex}`] = "Priority level is required.";
//     if (name === "responseTimeHours" && (value === "" || value < 0))
//       errors[`responseTimeHours-${ruleIndex}`] =
//         "Valid response time required.";
//     if (name === "resolutionTimeHours" && (value === "" || value < 0))
//       errors[`resolutionTimeHours-${ruleIndex}`] =
//         "Valid resolution time required.";
//     return errors;
//   };

//   //   const handleChange = (
//   //     e,
//   //     serviceIndex,
//   //     subServiceIndex,
//   //     scopeIndex,
//   //     timingIndex,
//   //     ruleIndex
//   //   ) => {
//   //     const { name, value } = e.target;
//   //     const newFormData = { ...formData };

//   //     // Update nested formData based on indices
//   //     if (
//   //       serviceIndex !== undefined &&
//   //       subServiceIndex !== undefined &&
//   //       scopeIndex !== undefined
//   //     ) {
//   //       newFormData.services[serviceIndex].subServices[
//   //         subServiceIndex
//   //       ].serviceScopes[scopeIndex][name] = value;
//   //       if (name === "scopeId") {
//   //         newFormData.services[serviceIndex].subServices[
//   //           subServiceIndex
//   //         ].serviceScopes[scopeIndex].slaTypeId = "";
//   //         newFormData.services[serviceIndex].subServices[
//   //           subServiceIndex
//   //         ].serviceScopes[scopeIndex].priorityId = "";
//   //       }
//   //     } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//   //       newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//   //         value;
//   //       if (name === "subServiceId") {
//   //         newFormData.services[serviceIndex].subServices[
//   //           subServiceIndex
//   //         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//   //         if (value) {
//   //           contractService
//   //             .getServiceScopes(value)
//   //             .then((res) => {
//   //               setServiceScopes((prev) => ({
//   //                 ...prev,
//   //                 [value]: Array.isArray(res.data) ? res.data : [],
//   //               }));
//   //             })
//   //             .catch((err) => setError("Failed to load service scopes."));
//   //         }
//   //       }
//   //     } else if (serviceIndex !== undefined) {
//   //       newFormData.services[serviceIndex][name] = value;
//   //       if (name === "serviceId") {
//   //         newFormData.services[serviceIndex].subServices = [
//   //           {
//   //             subServiceId: "",
//   //             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//   //           },
//   //         ];
//   //         if (value) {
//   //           contractService
//   //             .getSubServices(value)
//   //             .then((res) => {
//   //               setSubServices((prev) => ({
//   //                 ...prev,
//   //                 [value]: Array.isArray(res.data) ? res.data : [],
//   //               }));
//   //             })
//   //             .catch((err) => setError("Failed to load sub-services."));
//   //         }
//   //       }
//   //     } else if (timingIndex !== undefined) {
//   //       newFormData.employeeTimings[timingIndex][name] = value;
//   //     } else if (ruleIndex !== undefined) {
//   //       const field =
//   //         name === "slaTypeId"
//   //           ? "slaTypeId"
//   //           : name === "priorityId"
//   //           ? "priorityId"
//   //           : name;
//   //       newFormData.slaRules[ruleIndex][field] = value;
//   //       if (name === "slaTypeId") {
//   //         newFormData.slaRules[ruleIndex].priorityId = "";
//   //       }
//   //     } else {
//   //       newFormData[name] = value;
//   //     }

//   //     // Update validation errors
//   //     const errors = validateField(
//   //       name,
//   //       value,
//   //       serviceIndex,
//   //       subServiceIndex,
//   //       scopeIndex,
//   //       timingIndex,
//   //       ruleIndex
//   //     );

//   //     // Apply debounced state update
//   //     debouncedSetFormData(newFormData);
//   //     setValidationErrors((prev) => ({ ...prev, ...errors }));
//   //   };

//   const handleChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const { name, value } = e.target;
//     const newFormData = { ...formData };

//     // Update nested formData based on indices
//     if (
//       serviceIndex !== undefined &&
//       subServiceIndex !== undefined &&
//       scopeIndex !== undefined
//     ) {
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes[scopeIndex][name] = value;
//       if (name === "scopeId") {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].slaTypeId = "";
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].priorityId = "";
//       }
//     } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//       newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//         value;
//       if (name === "subServiceId") {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//         if (value) {
//           // Fetch service scopes asynchronously without immediate state update
//           contractService
//             .getServiceScopes(value)
//             .then((res) => {
//               setServiceScopes((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               console.error("Failed to load service scopes:", err);
//               setError("Failed to load service scopes.");
//             });
//         }
//       }
//     } else if (serviceIndex !== undefined) {
//       newFormData.services[serviceIndex][name] = value;
//       if (name === "serviceId") {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           },
//         ];
//         if (value) {
//           // Fetch sub-services asynchronously without immediate state update
//           contractService
//             .getSubServices(value)
//             .then((res) => {
//               setSubServices((prev) => ({
//                 ...prev,
//                 [value]: Array.isArray(res.data) ? res.data : [],
//               }));
//             })
//             .catch((err) => {
//               console.error("Failed to load sub-services:", err);
//               setError("Failed to load sub-services.");
//             });
//         }
//       }
//     } else if (timingIndex !== undefined) {
//       newFormData.employeeTimings[timingIndex][name] = value;
//     } else if (ruleIndex !== undefined) {
//       const field =
//         name === "slaTypeId"
//           ? "slaTypeId"
//           : name === "priorityId"
//           ? "priorityId"
//           : name;
//       newFormData.slaRules[ruleIndex][field] = value;
//       if (name === "slaTypeId") {
//         newFormData.slaRules[ruleIndex].priorityId = "";
//       }
//     } else {
//       newFormData[name] = value;
//     }

//     // Update validation errors
//     const errors = validateField(
//       name,
//       value,
//       serviceIndex,
//       subServiceIndex,
//       scopeIndex,
//       timingIndex,
//       ruleIndex
//     );

//     // Apply debounced state update
//     debouncedSetFormData(newFormData);
//     setValidationErrors((prev) => ({ ...prev, ...errors }));
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     ruleIndex
//   ) => {
//     const slaTypeId = e.target.value;
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (ruleIndex !== undefined) {
//         newFormData.slaRules[ruleIndex].slaTypeId = slaTypeId;
//         newFormData.slaRules[ruleIndex].priorityId = "";
//       } else {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].priorityId = "";
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         ruleIndex !== undefined ? "slaRuleSlaTypeId" : "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex,
//         undefined,
//         ruleIndex
//       ),
//     }));
//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => {
//           console.error("Failed to load priority levels:", err);
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: [], // Fallback to empty array
//           }));
//           setError("Failed to load priority levels. Please try again.");
//         });
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   //   const addSubService = (serviceIndex) => {
//   //     setFormData((prev) => {
//   //       const newFormData = { ...prev };
//   //       newFormData.services[serviceIndex].subServices.push({
//   //         subServiceId: "",
//   //         serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//   //       });
//   //       return newFormData;
//   //     });
//   //   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//       });
//       return newFormData;
//     });
//   };

//   const addSlaRule = () => {
//     setFormData((prev) => ({
//       ...prev,
//       slaRules: [
//         ...prev.slaRules,
//         {
//           slaTypeId: "",
//           priorityId: "",
//           responseTimeHours: "",
//           resolutionTimeHours: "",
//         },
//       ],
//     }));
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`service-${serviceIndex}`) ||
//           key.startsWith(`subService-${serviceIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           },
//         ];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (key.startsWith(`subService-${serviceIndex}-${subServiceIndex}`)) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//       }
//       return newFormData;
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(
//             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//           )
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const removeSlaRule = (ruleIndex) => {
//     setFormData((prev) => {
//       const newRules = prev.slaRules.filter((_, idx) => idx !== ruleIndex);
//       return {
//         ...prev,
//         slaRules: newRules.length
//           ? newRules
//           : [
//               {
//                 slaTypeId: "",
//                 priorityId: "",
//                 responseTimeHours: "",
//                 resolutionTimeHours: "",
//               },
//             ],
//       };
//     });
//     setValidationErrors((prev) => {
//       const newErrors = { ...prev };
//       Object.keys(newErrors).forEach((key) => {
//         if (
//           key.startsWith(`slaRuleSlaType-${ruleIndex}`) ||
//           key.startsWith(`slaRulePriority-${ruleIndex}`) ||
//           key.startsWith(`responseTimeHours-${ruleIndex}`) ||
//           key.startsWith(`resolutionTimeHours-${ruleIndex}`)
//         ) {
//           delete newErrors[key];
//         }
//       });
//       return newErrors;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName) errors.contractName = "Required field.";
//     if (!formData.companyId) errors.companyId = "Required field.";
//     if (!formData.projectType) errors.projectType = "Required field.";
//     if (!formData.startDate) errors.startDate = "Required field.";
//     if (!formData.endDate) errors.endDate = "Required field.";
//     if (!formData.services.length) errors.services = "At least one required.";
//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Required field.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Required field.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Required field.";
//         });
//       });
//     });
//     formData.employeeTimings.forEach((timing, timingIndex) => {
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyStartTime))
//         errors[`dutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyEndTime))
//         errors[`dutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyStartTime))
//         errors[`offDutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyEndTime))
//         errors[`offDutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//     });
//     formData.slaRules.forEach((rule, ruleIndex) => {
//       if (!rule.slaTypeId)
//         errors[`slaRuleSlaType-${ruleIndex}`] = "Required field.";
//       if (!rule.priorityId)
//         errors[`slaRulePriority-${ruleIndex}`] = "Required field.";
//       if (rule.responseTimeHours === "" || rule.responseTimeHours < 0)
//         errors[`responseTimeHours-${ruleIndex}`] = "Valid time required.";
//       if (rule.resolutionTimeHours === "" || rule.resolutionTimeHours < 0)
//         errors[`resolutionTimeHours-${ruleIndex}`] = "Valid time required.";
//     });
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});
//     const cleanedFormData = {
//       contractName: formData.contractName,
//       companyId: parseInt(formData.companyId, 10),
//       projectLocation: formData.projectLocation,
//       projectType: formData.projectType,
//       startDate: formData.startDate,
//       endDate: formData.endDate,
//       services: formData.services.map((service) => ({
//         serviceId: parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           subServiceId: parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             scopeId: parseInt(scope.scopeId, 10),
//             slaTypeId: parseInt(scope.slaTypeId, 10),
//             priorityId: parseInt(scope.priorityId, 10),
//           })),
//         })),
//       })),
//       employeeTimings: formData.employeeTimings.map((timing) => ({
//         dayOfWeek: timing.dayOfWeek,
//         dutyStartTime: timing.dutyStartTime + ":00",
//         dutyEndTime: timing.dutyEndTime + ":00",
//         offDutyStartTime: timing.offDutyStartTime + ":00",
//         offDutyEndTime: timing.offDutyEndTime + ":00",
//       })),
//       slaRules: formData.slaRules.map((rule) => ({
//         slaTypeId: parseInt(rule.slaTypeId, 10),
//         priorityId: parseInt(rule.priorityId, 10),
//         responseTimeHours: parseFloat(rule.responseTimeHours),
//         resolutionTimeHours: parseFloat(rule.resolutionTimeHours),
//       })),
//     };
//     if (contractId) {
//       try {
//         await Promise.all([
//           contractService.updateContractDetails(contractId, {
//             contractName: cleanedFormData.contractName,
//             companyId: cleanedFormData.companyId,
//             projectLocation: cleanedFormData.projectLocation,
//             projectType: cleanedFormData.projectType,
//             startDate: cleanedFormData.startDate,
//             endDate: cleanedFormData.endDate,
//           }),
//           contractService.updateContractServices(
//             contractId,
//             cleanedFormData.services
//           ),
//           contractService.updateEmployeeTimings(
//             contractId,
//             cleanedFormData.employeeTimings
//           ),
//           contractService.updateSlaRules(contractId, cleanedFormData.slaRules),
//         ]);
//         onSubmit(cleanedFormData, contractId);
//       } catch (err) {
//         setError("Failed to update contract.");
//       }
//     } else {
//       onSubmit(cleanedFormData);
//     }
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 py-8 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-6">
//         <p className="text-lg font-medium">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 py-6 w-full bg-white rounded-lg shadow-lg mt-6">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>
//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
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
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 0 9 0 0118 0z"
//             />
//           </svg>
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}

//       <div className="mb-6 border-b border-gray-200">
//         <div className="flex flex-wrap">
//           {[
//             { id: "basic", label: "Basic Information" },
//             { id: "services", label: "Services" },
//             { id: "timings", label: "Employee Timings" },
//             { id: "sla", label: "SLA Rules" },
//           ].map((tab, index) => (
//             <button
//               key={tab.id}
//               className={`px-4 py-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? "border-b-2 border-blue-600 text-blue-600"
//                   : "text-gray-600 hover:text-blue-700"
//               }`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === "basic" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Contract Name
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Enter a unique name for the contract"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="contractName"
//                 value={formData.contractName}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.contractName
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.contractName && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.contractName}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Company
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Select the company associated with this contract"
//                 />
//               </label>
//               <select
//                 name="companyId"
//                 value={formData.companyId}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.companyId
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               >
//                 <option value="">Select Company</option>
//                 {companies.map((company) => (
//                   <option
//                     key={company.companyId}
//                     value={company.companyId.toString()}
//                   >
//                     {company.companyName} {/* Correct */}
//                   </option>
//                 ))}
//               </select>

//               {validationErrors.companyId && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.companyId}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Location
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Optional: Specify the project location"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="projectLocation"
//                 value={formData.projectLocation}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md border-gray-200 bg-white focus:ring-blue-500 focus:shadow-md transition-colors"
//               />
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Type
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Choose the contract duration type"
//                 />
//               </label>
//               <select
//                 name="projectType"
//                 value={formData.projectType}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.projectType
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//               >
//                 <option value="">Select Project Type</option>
//                 <option value="ANNUAL">Annual</option>
//                 <option value="ONE_TIME">One Time</option>
//               </select>
//               {validationErrors.projectType && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.projectType}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Start Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract start date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.startDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.startDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.startDate}
//                 </p>
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 End Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract end date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.endDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.endDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.endDate}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "services" && (
//           <div className="space-y-4">
//             {formData.services.map((service, serviceIndex) => (
//               <div
//                 key={serviceIndex}
//                 className="bg-gray-50 p-6 rounded-lg shadow-sm"
//               >
//                 <div
//                   className="flex items-center justify-between bg-blue-100 p-4 rounded-md cursor-pointer hover:bg-blue-200"
//                   onClick={() => toggleCollapse("service", serviceIndex)}
//                 >
//                   <h4 className="text-lg font-semibold text-blue-700">
//                     Service {serviceIndex + 1}
//                   </h4>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={() => removeService(serviceIndex)} // Correct
//                       disabled={formData.services.length === 1}
//                       title="Remove Service"
//                     >
//                       <TrashIcon className="h-4 w-4" />
//                     </button>
//                     {collapsedSections[`service-${serviceIndex}`] ? (
//                       <ChevronUpIcon className="h-4 w-4 text-blue-600" />
//                     ) : (
//                       <ChevronDownIcon className="h-4 w-4 text-blue-600" />
//                     )}
//                   </div>
//                 </div>
//                 {!collapsedSections[`service-${serviceIndex}`] && (
//                   <div className="mt-6 space-y-4">
//                     <div className="relative">
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                         Service
//                         <InformationCircleIcon
//                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                           title="Select the main service category"
//                         />
//                       </label>
//                       <select
//                         name="serviceId"
//                         value={service.serviceId}
//                         onChange={(e) => handleChange(e, serviceIndex)}
//                         className={`w-full p-3 border rounded-md ${
//                           validationErrors[`service-${serviceIndex}`]
//                             ? "border-red-500"
//                             : "border-gray-200"
//                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                         disabled={services.length === 0}
//                       >
//                         <option value="">Select Service</option>
//                         {services.map((s) => (
//                           <option
//                             key={s.serviceId}
//                             value={s.serviceId.toString()}
//                           >
//                             {s.serviceName}
//                           </option>
//                         ))}
//                         {service.serviceId &&
//                           !services.find(
//                             (s) => s.serviceId.toString() === service.serviceId
//                           ) && (
//                             <option value={service.serviceId}>
//                               {service.serviceName || service.serviceId}{" "}
//                               (Contract-specific)
//                             </option>
//                           )}
//                       </select>
//                       {validationErrors[`service-${serviceIndex}`] && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {validationErrors[`service-${serviceIndex}`]}
//                         </p>
//                       )}
//                       {services.length === 0 && (
//                         <p className="text-yellow-500 text-xs mt-1">
//                           Loading services...
//                         </p>
//                       )}
//                     </div>

//                     {service.subServices.map((subService, subServiceIndex) => (
//                       <div
//                         key={subServiceIndex}
//                         className="ml-6 p-4 bg-gray-100 rounded-lg shadow-sm"
//                       >
//                         <div
//                           className="flex items-center justify-between bg-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-300"
//                           onClick={() =>
//                             toggleCollapse(
//                               "subService",
//                               serviceIndex,
//                               subServiceIndex
//                             )
//                           }
//                         >
//                           <h5 className="text-md font-medium text-gray-600">
//                             Sub-Service {subServiceIndex + 1}
//                           </h5>
//                           <div className="flex items-center space-x-4">
//                             <button
//                               type="button"
//                               className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 removeSubService(serviceIndex, subServiceIndex);
//                               }}
//                               disabled={service.subServices.length === 1}
//                               title="Remove Sub-Service"
//                             >
//                               <TrashIcon className="h-4 w-4" />
//                             </button>
//                             {collapsedSections[
//                               `subService-${serviceIndex}-${subServiceIndex}`
//                             ] ? (
//                               <ChevronUpIcon className="h-4 w-4 text-gray-600" />
//                             ) : (
//                               <ChevronDownIcon className="h-4 w-4 text-gray-600" />
//                             )}
//                           </div>
//                         </div>
//                         {!collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] && (
//                           <div className="mt-4 space-y-4">
//                             <div className="relative">
//                               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                 Sub-Service
//                                 <InformationCircleIcon
//                                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                   title="Select a sub-service"
//                                 />
//                               </label>
//                               <select
//                                 name="subServiceId"
//                                 value={subService.subServiceId}
//                                 onChange={(e) =>
//                                   handleChange(e, serviceIndex, subServiceIndex)
//                                 }
//                                 className={`w-full p-3 border rounded-md ${
//                                   validationErrors[
//                                     `subService-${serviceIndex}-${subServiceIndex}`
//                                   ]
//                                     ? "border-red-500"
//                                     : "border-gray-200"
//                                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                 disabled={
//                                   !service.serviceId ||
//                                   !subServices[service.serviceId]?.length
//                                 }
//                               >
//                                 <option value="">Select Sub-Service</option>
//                                 {(subServices[service.serviceId] || []).map(
//                                   (ss) => (
//                                     <option
//                                       key={ss.subServiceId}
//                                       value={ss.subServiceId.toString()}
//                                     >
//                                       {ss.subServiceName}
//                                     </option>
//                                   )
//                                 )}
//                                 {subService.subServiceId &&
//                                   !(subServices[service.serviceId] || []).find(
//                                     (ss) =>
//                                       ss.subServiceId.toString() ===
//                                       subService.subServiceId
//                                   ) && (
//                                     <option value={subService.subServiceId}>
//                                       {subService.subServiceName ||
//                                         subService.subServiceId}{" "}
//                                       (Contract-specific)
//                                     </option>
//                                   )}
//                               </select>
//                               {validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ] && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                   {
//                                     validationErrors[
//                                       `subService-${serviceIndex}-${subServiceIndex}`
//                                     ]
//                                   }
//                                 </p>
//                               )}
//                               {service.serviceId &&
//                                 !subServices[service.serviceId]?.length && (
//                                   <p className="text-yellow-500 text-xs mt-1">
//                                     Loading sub-services...
//                                   </p>
//                                 )}
//                             </div>

//                             {subService.serviceScopes.map(
//                               (scope, scopeIndex) => (
//                                 <div
//                                   key={scopeIndex}
//                                   className="ml-4 p-4 bg-white rounded-md shadow-sm"
//                                 >
//                                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
//                                     <h6 className="text-sm font-medium text-gray-600">
//                                       Scope {scopeIndex + 1}
//                                     </h6>
//                                     <button
//                                       type="button"
//                                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                                       onClick={() =>
//                                         removeServiceScope(
//                                           serviceIndex,
//                                           subServiceIndex,
//                                           scopeIndex
//                                         )
//                                       }
//                                       disabled={
//                                         subService.serviceScopes.length === 1
//                                       }
//                                       title="Remove Scope"
//                                     >
//                                       <TrashIcon className="h-4 w-4" />
//                                     </button>
//                                   </div>
//                                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Service Scope
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Define the specific scope of work"
//                                         />
//                                       </label>
//                                       <select
//                                         name="scopeId"
//                                         value={scope.scopeId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={
//                                           !subService.subServiceId ||
//                                           !serviceScopes[
//                                             subService.subServiceId
//                                           ]?.length
//                                         }
//                                       >
//                                         <option value="">Select Scope</option>
//                                         {(
//                                           serviceScopes[
//                                             subService.subServiceId
//                                           ] || []
//                                         ).map((sc) => (
//                                           <option
//                                             key={sc.scopeId}
//                                             value={sc.scopeId.toString()}
//                                           >
//                                             {sc.scopeName}
//                                           </option>
//                                         ))}
//                                         {scope.scopeId &&
//                                           !(
//                                             serviceScopes[
//                                               subService.subServiceId
//                                             ] || []
//                                           ).find(
//                                             (sc) =>
//                                               sc.scopeId.toString() ===
//                                               scope.scopeId
//                                           ) && (
//                                             <option value={scope.scopeId}>
//                                               {scope.scopeName || scope.scopeId}{" "}
//                                               (Contract-specific)
//                                             </option>
//                                           )}
//                                       </select>
//                                       {validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {subService.subServiceId &&
//                                         !serviceScopes[subService.subServiceId]
//                                           ?.length && (
//                                           <p className="text-yellow-500 text-xs mt-1">
//                                             Loading scopes...
//                                           </p>
//                                         )}
//                                     </div>
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         SLA Type
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Select the Service Level Agreement type"
//                                         />
//                                       </label>
//                                       <select
//                                         name="slaTypeId"
//                                         value={scope.slaTypeId}
//                                         onChange={(e) =>
//                                           handleSlaTypeChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={slaTypes.length === 0}
//                                       >
//                                         <option value="">
//                                           Select SLA Type
//                                         </option>
//                                         {slaTypes.map((sla) => (
//                                           <option
//                                             key={sla.slaTypeId}
//                                             value={sla.slaTypeId.toString()}
//                                           >
//                                             {sla.slaTypeName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {slaTypes.length === 0 && (
//                                         <p className="text-yellow-500 text-xs mt-1">
//                                           Loading SLA types...
//                                         </p>
//                                       )}
//                                     </div>
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Priority Level
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Set the priority for this scope"
//                                         />
//                                       </label>
//                                       <select
//                                         name="priorityId"
//                                         value={scope.priorityId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                                         disabled={
//                                           !scope.slaTypeId ||
//                                           !priorityLevels[scope.slaTypeId]
//                                             ?.length
//                                         }
//                                       >
//                                         <option value="">
//                                           Select Priority
//                                         </option>
//                                         {(
//                                           priorityLevels[scope.slaTypeId] || []
//                                         ).map((pl) => (
//                                           <option
//                                             key={pl.priorityId}
//                                             value={pl.priorityId.toString()}
//                                           >
//                                             {pl.priorityName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                       {scope.slaTypeId &&
//                                         !priorityLevels[scope.slaTypeId]
//                                           ?.length && (
//                                           <p className="text-yellow-500 text-xs mt-1">
//                                             Loading priorities...
//                                           </p>
//                                         )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               )
//                             )}
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 addServiceScope(serviceIndex, subServiceIndex)
//                               } // Correct
//                               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                               title="Add a new scope"
//                             >
//                               <PlusIcon className="h-4 w-4 mr-2" />
//                               Add Scope
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={() => addSubService(serviceIndex)}
//                       className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                       title="Add a new sub-service"
//                     >
//                       <PlusIcon className="h-4 w-4 mr-2" />
//                       Add Sub-Service
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addService()} // Correct
//               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//               title="Add a new service"
//             >
//               <PlusIcon className="h-4 w-4 mr-2" />
//               Add Service
//             </button>
//           </div>
//         )}

//         {activeTab === "timings" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               Employee Timings
//             </h4>
//             <div className="space-y-4">
//               {formData.employeeTimings.map((timing, timingIndex) => (
//                 <div
//                   key={timingIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {timing.dayOfWeek}
//                     </label>
//                     <input
//                       type="text"
//                       name="dutyStartTime"
//                       value={timing.dutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duty End
//                     </label>
//                     <input
//                       type="text"
//                       name="dutyEndTime"
//                       value={timing.dutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty Start
//                     </label>
//                     <input
//                       type="text"
//                       name="offDutyStartTime"
//                       value={timing.offDutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty End
//                     </label>
//                     <input
//                       type="text"
//                       name="offDutyEndTime"
//                       value={timing.offDutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       placeholder="HH:MM"
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "sla" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               SLA Rules
//             </h4>
//             <div className="space-y-4">
//               {formData.slaRules.map((rule, ruleIndex) => (
//                 <div
//                   key={ruleIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       SLA Type
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Select the SLA type for the rule"
//                       />
//                     </label>
//                     <select
//                       name="slaTypeId"
//                       value={rule.slaTypeId}
//                       onChange={(e) =>
//                         handleSlaTypeChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`slaRuleSlaType-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                     >
//                       <option value="">Select SLA Type</option>
//                       {slaTypes.map((sla) => (
//                         <option
//                           key={sla.slaTypeId}
//                           value={sla.slaTypeId.toString()}
//                         >
//                           {sla.slaTypeName}
//                         </option>
//                       ))}
//                     </select>
//                     {validationErrors[`slaRuleSlaType-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`slaRuleSlaType-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Priority Level
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Select the priority level for the rule"
//                       />
//                     </label>
//                     <select
//                       name="priorityId"
//                       value={rule.priorityId}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`slaRulePriority-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
//                       disabled={
//                         !rule.slaTypeId ||
//                         !priorityLevels[rule.slaTypeId]?.length
//                       }
//                     >
//                       <option value="">Select Priority</option>
//                       {(priorityLevels[rule.slaTypeId] || []).map((pl) => (
//                         <option
//                           key={pl.priorityId}
//                           value={pl.priorityId.toString()}
//                         >
//                           {pl.priorityName}
//                         </option>
//                       ))}
//                     </select>
//                     {validationErrors[`slaRulePriority-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`slaRulePriority-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Response Time (Hours)
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Response time in hours"
//                       />
//                     </label>
//                     <input
//                       type="number"
//                       name="responseTimeHours"
//                       value={rule.responseTimeHours}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`responseTimeHours-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       step="0.1"
//                       min="0"
//                     />
//                     {validationErrors[`responseTimeHours-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`responseTimeHours-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       Resolution Time (Hours)
//                       <InformationCircleIcon
//                         className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                         title="Resolution time in hours"
//                       />
//                     </label>
//                     <input
//                       type="number"
//                       name="resolutionTimeHours"
//                       value={rule.resolutionTimeHours}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           undefined,
//                           ruleIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`resolutionTimeHours-${ruleIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       step="0.1"
//                       min="0"
//                     />
//                     {validationErrors[`resolutionTimeHours-${ruleIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`resolutionTimeHours-${ruleIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="col-span-2 flex justify-end">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={() => removeSlaRule(ruleIndex)}
//                       disabled={formData.slaRules.length === 1}
//                       title="Remove SLA Rule"
//                     >
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addSlaRule}
//                 className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//                 title="Add a new SLA rule"
//               >
//                 <PlusIcon className="h-4 w-4 mr-2" />
//                 Add SLA Rule
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
//           <button
//             type="submit"
//             className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
//           >
//             {contractId ? "Update Contract" : "Create Contract"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

////44444
// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const ContractForm = ({ onSubmit }) => {
//   const location = useLocation();
//   const contractId = location.state?.contractId;
//   const updateTimeoutRef = useRef(null);

//   const [formData, setFormData] = useState({
//     contractName: "",
//     companyId: "",
//     projectLocation: "",
//     projectType: "",
//     startDate: "",
//     endDate: "",
//     services: [
//       {
//         serviceId: "",
//         subServices: [
//           {
//             subServiceId: "",
//             serviceScopes: [
//               {
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     employeeTimings: [
//       {
//         dayOfWeek: "MONDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "TUESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "WEDNESDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "THURSDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "FRIDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SATURDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//       {
//         dayOfWeek: "SUNDAY",
//         dutyStartTime: "09:00",
//         dutyEndTime: "17:00",
//         offDutyStartTime: "17:00",
//         offDutyEndTime: "09:00",
//       },
//     ],
//     slaRules: [],
//   });

//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [slaTypes, setSlaTypes] = useState([]);
//   const [priorityLevels, setPriorityLevels] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});
//   const [activeTab, setActiveTab] = useState("basic");

//   // Fixed: Generate SLA rules from service scopes
//   const generateSlaRulesFromScopes = useCallback(() => {
//     const rules = [];
//     let ruleCounter = 0;

//     formData.services.forEach((service, serviceIndex) => {
//       service.subServices.forEach((subService, subServiceIndex) => {
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (scope.scopeId && scope.slaTypeId && scope.priorityId) {
//             // Find scope name
//             const scopeData = serviceScopes[subService.subServiceId]?.find(
//               (s) => s.scopeId.toString() === scope.scopeId
//             );

//             // Create unique key using service, subservice, and scope indices to ensure uniqueness
//             const uniqueKey = `${serviceIndex}-${subServiceIndex}-${scopeIndex}-${scope.slaTypeId}-${scope.priorityId}-${scope.scopeId}`;

//             rules.push({
//               slaTypeId: scope.slaTypeId,
//               priorityId: scope.priorityId,
//               responseTimeHours: "",
//               resolutionTimeHours: "",
//               scopeName: scopeData?.scopeName || `Scope ${scope.scopeId}`,
//               isFromServiceScope: true,
//               uniqueKey: uniqueKey,
//               ruleId: ruleCounter++, // Add a sequential ID for easier tracking
//             });
//           }
//         });
//       });
//     });

//     console.log("Generated SLA rules:", rules); // Debug log
//     return rules;
//   }, [formData.services, serviceScopes]);

//   // Fixed: Update SLA rules when service scopes change
//   const updateSlaRules = useCallback(() => {
//     // Clear any existing timeout
//     if (updateTimeoutRef.current) {
//       clearTimeout(updateTimeoutRef.current);
//     }

//     // Debounce the update
//     updateTimeoutRef.current = setTimeout(() => {
//       const newGeneratedRules = generateSlaRulesFromScopes();

//       setFormData((prev) => {
//         // Get current manual rules (preserve user input)
//         const currentManualRules = prev.slaRules.filter(
//           (rule) => !rule.isFromServiceScope
//         );

//         // Create a map of existing auto rules by their unique key to preserve user input
//         const existingAutoRulesMap = new Map();
//         prev.slaRules
//           .filter((rule) => rule.isFromServiceScope)
//           .forEach((rule) => {
//             existingAutoRulesMap.set(rule.uniqueKey, rule);
//           });

//         // Merge new generated rules with existing ones, preserving user input
//         const updatedAutoRules = newGeneratedRules.map((newRule) => {
//           // Find existing rule with same unique key to preserve user input
//           const existingRule = existingAutoRulesMap.get(newRule.uniqueKey);

//           return {
//             ...newRule,
//             responseTimeHours: existingRule?.responseTimeHours || "",
//             resolutionTimeHours: existingRule?.resolutionTimeHours || "",
//           };
//         });

//         // Combine manual and auto rules
//         const allRules = [...currentManualRules, ...updatedAutoRules];

//         console.log(
//           "Previous auto rules count:",
//           prev.slaRules.filter((r) => r.isFromServiceScope).length
//         );
//         console.log("New auto rules count:", updatedAutoRules.length);
//         console.log("All rules count:", allRules.length);

//         // Always update to ensure the UI reflects the current state
//         return {
//           ...prev,
//           slaRules: allRules,
//         };
//       });
//     }, 300); // 300ms debounce
//   }, [generateSlaRulesFromScopes]);

//   // Effect to update SLA rules when services or scopes change
//   useEffect(() => {
//     // Only update if we have some service scopes configured
//     const hasConfiguredScopes = formData.services.some((service) =>
//       service.subServices.some((subService) =>
//         subService.serviceScopes.some(
//           (scope) => scope.scopeId && scope.slaTypeId && scope.priorityId
//         )
//       )
//     );

//     console.log("Has configured scopes:", hasConfiguredScopes); // Debug log

//     if (hasConfiguredScopes) {
//       updateSlaRules();
//     } else {
//       // Clear auto-generated rules if no scopes are configured
//       setFormData((prev) => ({
//         ...prev,
//         slaRules: prev.slaRules.filter((rule) => !rule.isFromServiceScope),
//       }));
//     }

//     return () => {
//       if (updateTimeoutRef.current) {
//         clearTimeout(updateTimeoutRef.current);
//       }
//     };
//   }, [formData.services, serviceScopes, updateSlaRules]);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
//           companyService.getAllCompanies(),
//           contractService.getServices(),
//           contractService.getSlaTypes(),
//         ]);

//         const companiesData = Array.isArray(companiesRes.data)
//           ? companiesRes.data
//           : [];
//         const servicesData = Array.isArray(servicesRes.data)
//           ? servicesRes.data
//           : [];
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];

//         setCompanies(companiesData);
//         setServices(servicesData);
//         setSlaTypes(slaTypesData);

//         if (contractId) {
//           const contractRes = await contractService.getContractById(contractId);
//           const contract = contractRes.data;

//           const subServicesMap = {};
//           const serviceScopesMap = {};
//           const priorityLevelsMap = {};

//           await Promise.all(
//             (contract.services || []).map(async (service) => {
//               const serviceId = service.serviceId
//                 ? service.serviceId.toString()
//                 : "";
//               if (serviceId && !subServicesMap[serviceId]) {
//                 try {
//                   const subServicesRes = await contractService.getSubServices(
//                     serviceId
//                   );
//                   subServicesMap[serviceId] = Array.isArray(subServicesRes.data)
//                     ? subServicesRes.data
//                     : [];
//                 } catch (err) {
//                   subServicesMap[serviceId] = (service.subServices || []).map(
//                     (ss) => ({
//                       subServiceId: ss.subServiceId
//                         ? ss.subServiceId.toString()
//                         : "",
//                       subServiceName: ss.subServiceName || "",
//                     })
//                   );
//                 }
//               }
//               await Promise.all(
//                 (service.subServices || []).map(async (subService) => {
//                   const subServiceId = subService.subServiceId
//                     ? subService.subServiceId.toString()
//                     : "";
//                   if (subServiceId && !serviceScopesMap[subServiceId]) {
//                     try {
//                       const scopesRes = await contractService.getServiceScopes(
//                         subServiceId
//                       );
//                       serviceScopesMap[subServiceId] = Array.isArray(
//                         scopesRes.data
//                       )
//                         ? scopesRes.data
//                         : [];
//                     } catch (err) {
//                       serviceScopesMap[subServiceId] = (
//                         subService.serviceScopes || []
//                       ).map((sc) => ({
//                         scopeId: sc.scopeId ? sc.scopeId.toString() : "",
//                         scopeName: sc.scopeName || "",
//                       }));
//                     }
//                   }
//                   await Promise.all(
//                     (subService.serviceScopes || []).map(async (scope) => {
//                       const slaTypeId = scope.slaTypeId
//                         ? scope.slaTypeId.toString()
//                         : "";
//                       if (slaTypeId && !priorityLevelsMap[slaTypeId]) {
//                         try {
//                           const prioritiesRes =
//                             await contractService.getPriorityLevels(slaTypeId);
//                           priorityLevelsMap[slaTypeId] = Array.isArray(
//                             prioritiesRes.data
//                           )
//                             ? prioritiesRes.data
//                             : [];
//                         } catch (err) {
//                           priorityLevelsMap[slaTypeId] = [
//                             {
//                               priorityId: scope.priorityId
//                                 ? scope.priorityId.toString()
//                                 : "",
//                               priorityName: scope.priorityName || "",
//                             },
//                           ];
//                         }
//                       }
//                     })
//                   );
//                 })
//               );
//             })
//           );

//           setSubServices(subServicesMap);
//           setServiceScopes(serviceScopesMap);
//           setPriorityLevels(priorityLevelsMap);

//           const newFormData = {
//             contractName: contract.contractName || "",
//             companyId: contract.companyId ? contract.companyId.toString() : "",
//             projectLocation: contract.projectLocation || "",
//             projectType: contract.projectType || "",
//             startDate: contract.startDate
//               ? contract.startDate.split("T")[0]
//               : "",
//             endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//             services: (contract.services || []).map((cs) => ({
//               serviceId: cs.serviceId ? cs.serviceId.toString() : "",
//               subServices: (cs.subServices || []).map((css) => ({
//                 subServiceId: css.subServiceId
//                   ? css.subServiceId.toString()
//                   : "",
//                 serviceScopes: (css.serviceScopes || []).map((scope) => ({
//                   scopeId: scope.scopeId ? scope.scopeId.toString() : "",
//                   slaTypeId: scope.slaTypeId ? scope.slaTypeId.toString() : "",
//                   priorityId: scope.priorityId
//                     ? scope.priorityId.toString()
//                     : "",
//                 })) || [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//               })) || [
//                 {
//                   subServiceId: "",
//                   serviceScopes: [
//                     { scopeId: "", slaTypeId: "", priorityId: "" },
//                   ],
//                 },
//               ],
//             })) || [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//             employeeTimings:
//               (contract.employeeTimings || []).map((et) => ({
//                 dayOfWeek: et.dayOfWeek || "",
//                 dutyStartTime: et.dutyStartTime || "09:00",
//                 dutyEndTime: et.dutyEndTime || "17:00",
//                 offDutyStartTime: et.offDutyStartTime || "17:00",
//                 offDutyEndTime: et.offDutyEndTime || "09:00",
//               })) || formData.employeeTimings,
//             slaRules:
//               (contract.slaRules || []).map((sr) => ({
//                 slaTypeId: sr.slaTypeId ? sr.slaTypeId.toString() : "",
//                 priorityId: sr.priorityId ? sr.priorityId.toString() : "",
//                 responseTimeHours: sr.responseTimeHours
//                   ? sr.responseTimeHours.toString()
//                   : "",
//                 resolutionTimeHours: sr.resolutionTimeHours
//                   ? sr.resolutionTimeHours.toString()
//                   : "",
//                 scopeName: sr.scopeName || "",
//                 isFromServiceScope: sr.isFromServiceScope || false,
//                 uniqueKey:
//                   sr.uniqueKey ||
//                   `${sr.slaTypeId}-${sr.priorityId}-${sr.scopeId || "manual"}`,
//               })) || [],
//           };

//           setFormData(newFormData);
//         }
//       } catch (err) {
//         console.error("Error fetching initial data:", err);
//         setError("Failed to load form data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId]);

//   const validateField = (
//     name,
//     value,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const errors = {};
//     if (name === "contractName" && !value)
//       errors.contractName = "Contract name is required.";
//     if (name === "companyId" && !value)
//       errors.companyId = "Company is required.";
//     if (name === "projectType" && !value)
//       errors.projectType = "Project type is required.";
//     if (name === "startDate" && !value)
//       errors.startDate = "Start date is required.";
//     if (name === "endDate" && !value) errors.endDate = "End date is required.";
//     if (name === "serviceId" && !value)
//       errors[`service-${serviceIndex}`] = "Service is required.";
//     if (name === "subServiceId" && !value)
//       errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//         "Sub-service is required.";
//     if (name === "scopeId" && !value)
//       errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Scope is required.";
//     if (name === "slaTypeId" && !value)
//       errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "SLA type is required.";
//     if (name === "priorityId" && !value)
//       errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//         "Priority level is required.";
//     if (name === "dutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyStartTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "dutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`dutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "offDutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyStartTime-${timingIndex}`] =
//         "Valid time (HH:MM) required.";
//     if (name === "offDutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
//       errors[`offDutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
//     if (name === "slaRuleSlaTypeId" && !value)
//       errors[`slaRuleSlaType-${ruleIndex}`] = "SLA type is required.";
//     if (name === "slaRulePriorityId" && !value)
//       errors[`slaRulePriority-${ruleIndex}`] = "Priority level is required.";
//     if (name === "responseTimeHours" && (value === "" || value < 0))
//       errors[`responseTimeHours-${ruleIndex}`] =
//         "Valid response time required.";
//     if (name === "resolutionTimeHours" && (value === "" || value < 0))
//       errors[`resolutionTimeHours-${ruleIndex}`] =
//         "Valid resolution time required.";
//     return errors;
//   };

//   const handleChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     timingIndex,
//     ruleIndex
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       const newFormData = { ...prev };

//       // Update nested formData based on indices
//       if (
//         serviceIndex !== undefined &&
//         subServiceIndex !== undefined &&
//         scopeIndex !== undefined
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex][name] = value;
//         if (name === "scopeId") {
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes[scopeIndex].slaTypeId = "";
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes[scopeIndex].priorityId = "";
//         }
//       } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
//         newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
//           value;
//         if (name === "subServiceId") {
//           newFormData.services[serviceIndex].subServices[
//             subServiceIndex
//           ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//           if (value) {
//             contractService
//               .getServiceScopes(value)
//               .then((res) => {
//                 setServiceScopes((prev) => ({
//                   ...prev,
//                   [value]: Array.isArray(res.data) ? res.data : [],
//                 }));
//               })
//               .catch((err) => {
//                 console.error("Failed to load service scopes:", err);
//                 setError("Failed to load service scopes.");
//               });
//           }
//         }
//       } else if (serviceIndex !== undefined) {
//         newFormData.services[serviceIndex][name] = value;
//         if (name === "serviceId") {
//           newFormData.services[serviceIndex].subServices = [
//             {
//               subServiceId: "",
//               serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//             },
//           ];
//           if (value) {
//             contractService
//               .getSubServices(value)
//               .then((res) => {
//                 setSubServices((prev) => ({
//                   ...prev,
//                   [value]: Array.isArray(res.data) ? res.data : [],
//                 }));
//               })
//               .catch((err) => {
//                 console.error("Failed to load sub-services:", err);
//                 setError("Failed to load sub-services.");
//               });
//           }
//         }
//       } else if (timingIndex !== undefined) {
//         newFormData.employeeTimings[timingIndex][name] = value;
//       } else if (ruleIndex !== undefined) {
//         const field =
//           name === "slaTypeId"
//             ? "slaTypeId"
//             : name === "priorityId"
//             ? "priorityId"
//             : name;
//         newFormData.slaRules[ruleIndex][field] = value;
//         if (name === "slaTypeId") {
//           newFormData.slaRules[ruleIndex].priorityId = "";
//         }
//       } else {
//         newFormData[name] = value;
//       }

//       return newFormData;
//     });

//     // Update validation errors
//     const errors = validateField(
//       name,
//       value,
//       serviceIndex,
//       subServiceIndex,
//       scopeIndex,
//       timingIndex,
//       ruleIndex
//     );
//     setValidationErrors((prev) => ({ ...prev, ...errors }));
//   };

//   const handleSlaTypeChange = (
//     e,
//     serviceIndex,
//     subServiceIndex,
//     scopeIndex,
//     ruleIndex
//   ) => {
//     const slaTypeId = e.target.value;

//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       if (ruleIndex !== undefined) {
//         newFormData.slaRules[ruleIndex].slaTypeId = slaTypeId;
//         newFormData.slaRules[ruleIndex].priorityId = "";
//       } else {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes[scopeIndex].priorityId = "";
//       }
//       return newFormData;
//     });

//     setValidationErrors((prev) => ({
//       ...prev,
//       ...validateField(
//         ruleIndex !== undefined ? "slaRuleSlaTypeId" : "slaTypeId",
//         slaTypeId,
//         serviceIndex,
//         subServiceIndex,
//         scopeIndex,
//         undefined,
//         ruleIndex
//       ),
//     }));

//     if (slaTypeId) {
//       contractService
//         .getPriorityLevels(slaTypeId)
//         .then((res) => {
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: Array.isArray(res.data) ? res.data : [],
//           }));
//         })
//         .catch((err) => {
//           console.error("Failed to load priority levels:", err);
//           setPriorityLevels((prev) => ({
//             ...prev,
//             [slaTypeId]: [],
//           }));
//           setError("Failed to load priority levels. Please try again.");
//         });
//     }
//   };

//   const addService = () => {
//     setFormData((prev) => ({
//       ...prev,
//       services: [
//         ...prev.services,
//         {
//           serviceId: "",
//           subServices: [
//             {
//               subServiceId: "",
//               serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//             },
//           ],
//         },
//       ],
//     }));
//   };

//   const addSubService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices.push({
//         subServiceId: "",
//         serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//       });
//       return newFormData;
//     });
//   };

//   const addServiceScope = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.push({
//         scopeId: "",
//         slaTypeId: "",
//         priorityId: "",
//       });
//       return newFormData;
//     });
//   };

//   const removeService = (serviceIndex) => {
//     setFormData((prev) => {
//       const newServices = prev.services.filter(
//         (_, idx) => idx !== serviceIndex
//       );
//       return {
//         ...prev,
//         services: newServices.length
//           ? newServices
//           : [
//               {
//                 serviceId: "",
//                 subServices: [
//                   {
//                     subServiceId: "",
//                     serviceScopes: [
//                       { scopeId: "", slaTypeId: "", priorityId: "" },
//                     ],
//                   },
//                 ],
//               },
//             ],
//       };
//     });
//   };

//   const removeSubService = (serviceIndex, subServiceIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices = newFormData.services[
//         serviceIndex
//       ].subServices.filter((_, idx) => idx !== subServiceIndex);
//       if (!newFormData.services[serviceIndex].subServices.length) {
//         newFormData.services[serviceIndex].subServices = [
//           {
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           },
//         ];
//       }
//       return newFormData;
//     });
//   };

//   const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
//     setFormData((prev) => {
//       const newFormData = { ...prev };
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
//       if (
//         !newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes.length
//       ) {
//         newFormData.services[serviceIndex].subServices[
//           subServiceIndex
//         ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
//       }
//       return newFormData;
//     });
//   };

//   const validateFormData = () => {
//     const errors = {};
//     if (!formData.contractName) errors.contractName = "Required field.";
//     if (!formData.companyId) errors.companyId = "Required field.";
//     if (!formData.projectType) errors.projectType = "Required field.";
//     if (!formData.startDate) errors.startDate = "Required field.";
//     if (!formData.endDate) errors.endDate = "Required field.";
//     if (!formData.services.length) errors.services = "At least one required.";

//     formData.services.forEach((service, serviceIndex) => {
//       if (!service.serviceId)
//         errors[`service-${serviceIndex}`] = "Required field.";
//       if (!service.subServices.length)
//         errors[`subServices-${serviceIndex}`] =
//           "At least one sub-service required.";
//       service.subServices.forEach((subService, subServiceIndex) => {
//         if (!subService.subServiceId)
//           errors[`subService-${serviceIndex}-${subServiceIndex}`] =
//             "Required field.";
//         if (!subService.serviceScopes.length)
//           errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
//             "At least one scope required.";
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (!scope.scopeId)
//             errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.slaTypeId)
//             errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
//               "Required field.";
//           if (!scope.priorityId)
//             errors[
//               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//             ] = "Required field.";
//         });
//       });
//     });

//     formData.employeeTimings.forEach((timing, timingIndex) => {
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyStartTime))
//         errors[`dutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.dutyEndTime))
//         errors[`dutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyStartTime))
//         errors[`offDutyStartTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//       if (!/^\d{2}:\d{2}$/.test(timing.offDutyEndTime))
//         errors[`offDutyEndTime-${timingIndex}`] =
//           "Valid time format (HH:MM) required.";
//     });

//     formData.slaRules.forEach((rule, ruleIndex) => {
//       if (!rule.slaTypeId)
//         errors[`slaRuleSlaType-${ruleIndex}`] = "Required field.";
//       if (!rule.priorityId)
//         errors[`slaRulePriority-${ruleIndex}`] = "Required field.";
//       if (rule.responseTimeHours === "" || rule.responseTimeHours < 0)
//         errors[`responseTimeHours-${ruleIndex}`] = "Valid time required.";
//       if (rule.resolutionTimeHours === "" || rule.resolutionTimeHours < 0)
//         errors[`resolutionTimeHours-${ruleIndex}`] = "Valid time required.";
//     });

//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateFormData();
//     if (Object.keys(errors).length) {
//       setValidationErrors(errors);
//       return;
//     }
//     setValidationErrors({});

//     try {
//       // Make sure all SLA rules have response and resolution times
//       const hasIncompleteSlaRules = formData.slaRules.some(
//         (rule) =>
//           rule.responseTimeHours === "" || rule.resolutionTimeHours === ""
//       );

//       if (hasIncompleteSlaRules) {
//         setError(
//           "Please fill in response and resolution times for all SLA rules."
//         );
//         return;
//       }

//       const cleanedFormData = {
//         contractName: formData.contractName,
//         companyId: Number.parseInt(formData.companyId, 10),
//         projectLocation: formData.projectLocation,
//         projectType: formData.projectType,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         services: formData.services.map((service) => ({
//           serviceId: Number.parseInt(service.serviceId, 10),
//           subServices: service.subServices.map((subService) => ({
//             subServiceId: Number.parseInt(subService.subServiceId, 10),
//             serviceScopes: subService.serviceScopes.map((scope) => ({
//               scopeId: Number.parseInt(scope.scopeId, 10),
//               slaTypeId: Number.parseInt(scope.slaTypeId, 10),
//               priorityId: Number.parseInt(scope.priorityId, 10),
//             })),
//           })),
//         })),
//         employeeTimings: formData.employeeTimings.map((timing) => ({
//           dayOfWeek: timing.dayOfWeek,
//           dutyStartTime: timing.dutyStartTime + ":00",
//           dutyEndTime: timing.dutyEndTime + ":00",
//           offDutyStartTime: timing.offDutyStartTime + ":00",
//           offDutyEndTime: timing.offDutyEndTime + ":00",
//         })),
//         slaRules: formData.slaRules.map((rule) => ({
//           slaTypeId: Number.parseInt(rule.slaTypeId, 10),
//           priorityId: Number.parseInt(rule.priorityId, 10),
//           responseTimeHours: Number.parseFloat(rule.responseTimeHours),
//           resolutionTimeHours: Number.parseFloat(rule.resolutionTimeHours),
//           isFromServiceScope: rule.isFromServiceScope || true,
//         })),
//       };

//       console.log("Submitting contract data:", cleanedFormData);

//       if (contractId) {
//         try {
//           await Promise.all([
//             contractService.updateContractDetails(contractId, {
//               contractName: cleanedFormData.contractName,
//               companyId: cleanedFormData.companyId,
//               projectLocation: cleanedFormData.projectLocation,
//               projectType: cleanedFormData.projectType,
//               startDate: cleanedFormData.startDate,
//               endDate: cleanedFormData.endDate,
//             }),
//             contractService.updateContractServices(
//               contractId,
//               cleanedFormData.services
//             ),
//             contractService.updateEmployeeTimings(
//               contractId,
//               cleanedFormData.employeeTimings
//             ),
//             contractService.updateSlaRules(
//               contractId,
//               cleanedFormData.slaRules
//             ),
//           ]);
//           onSubmit(cleanedFormData, contractId);
//         } catch (err) {
//           console.error("Error updating contract:", err);
//           setError(
//             "Failed to update contract: " +
//               (err.response?.data?.message || err.message)
//           );
//         }
//       } else {
//         try {
//           onSubmit(cleanedFormData);
//         } catch (err) {
//           console.error("Error creating contract:", err);
//           setError(
//             "Failed to create contract: " +
//               (err.response?.data?.message || err.message)
//           );
//         }
//       }
//     } catch (err) {
//       console.error("Error processing form data:", err);
//       setError(
//         "An error occurred while processing your form data. Please check all fields and try again."
//       );
//     }
//   };

//   const toggleCollapse = (type, index, subIndex) => {
//     const key = `${type}-${index}${
//       subIndex !== undefined ? `-${subIndex}` : ""
//     }`;
//     setCollapsedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   // Get auto-generated and manual rules separately
//   const autoGeneratedRules = formData.slaRules.filter(
//     (rule) => rule.isFromServiceScope
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="relative">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
//           <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center p-4 py-8 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-6">
//         <p className="text-lg font-medium">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 py-6 w-full bg-white rounded-lg shadow-lg mt-6">
//       <h3 className="text-2xl font-bold text-gray-800 mb-6">
//         {contractId ? "Update Contract" : "Create Contract"}
//       </h3>

//       {Object.keys(validationErrors).length > 0 && (
//         <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
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
//               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 0 9 0 0118 0z"
//             />
//           </svg>
//           {Object.values(validationErrors)[0]}
//         </div>
//       )}

//       <div className="mb-6 border-b border-gray-200">
//         <div className="flex flex-wrap">
//           {[
//             { id: "basic", label: "Basic Information" },
//             { id: "services", label: "Services" },
//             { id: "timings", label: "Employee Timings" },
//             { id: "sla", label: "SLA Rules" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               className={`px-4 py-2 font-medium text-sm ${
//                 activeTab === tab.id
//                   ? "border-b-2 border-blue-600 text-blue-600"
//                   : "text-gray-600 hover:text-blue-700"
//               }`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//               {tab.id === "sla" && autoGeneratedRules.length > 0 && (
//                 <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                   {autoGeneratedRules.length}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {activeTab === "basic" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Contract Name
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Enter a unique name for the contract"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="contractName"
//                 value={formData.contractName}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.contractName
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.contractName && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.contractName}
//                 </p>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Company
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Select the company associated with this contract"
//                 />
//               </label>
//               <select
//                 name="companyId"
//                 value={formData.companyId}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.companyId
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               >
//                 <option value="">Select Company</option>
//                 {companies.map((company) => (
//                   <option
//                     key={company.companyId}
//                     value={company.companyId.toString()}
//                   >
//                     {company.companyName}
//                   </option>
//                 ))}
//               </select>
//               {validationErrors.companyId && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.companyId}
//                 </p>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Location
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Optional: Specify the project location"
//                 />
//               </label>
//               <input
//                 type="text"
//                 name="projectLocation"
//                 value={formData.projectLocation}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md border-gray-200 bg-white focus:ring-blue-500 focus:shadow-md transition-colors"
//               />
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Project Type
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Choose the contract duration type"
//                 />
//               </label>
//               <select
//                 name="projectType"
//                 value={formData.projectType}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.projectType
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               >
//                 <option value="">Select Project Type</option>
//                 <option value="ANNUAL">Annual</option>
//                 <option value="ONE_TIME">One Time</option>
//               </select>
//               {validationErrors.projectType && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.projectType}
//                 </p>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 Start Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract start date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.startDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.startDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.startDate}
//                 </p>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//                 End Date
//                 <InformationCircleIcon
//                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                   title="Contract end date"
//                 />
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className={`w-full p-3 border rounded-md ${
//                   validationErrors.endDate
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//               />
//               {validationErrors.endDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {validationErrors.endDate}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {activeTab === "services" && (
//           <div className="space-y-4">
//             {formData.services.map((service, serviceIndex) => (
//               <div
//                 key={serviceIndex}
//                 className="bg-gray-50 p-6 rounded-lg shadow-sm"
//               >
//                 <div
//                   className="flex items-center justify-between bg-blue-100 p-4 rounded-md cursor-pointer hover:bg-blue-200"
//                   onClick={() => toggleCollapse("service", serviceIndex)}
//                 >
//                   <h4 className="text-lg font-semibold text-blue-700">
//                     Service {serviceIndex + 1}
//                   </h4>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       type="button"
//                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         removeService(serviceIndex);
//                       }}
//                       disabled={formData.services.length === 1}
//                       title="Remove Service"
//                     >
//                       <TrashIcon className="h-4 w-4" />
//                     </button>
//                     {collapsedSections[`service-${serviceIndex}`] ? (
//                       <ChevronUpIcon className="h-4 w-4 text-blue-600" />
//                     ) : (
//                       <ChevronDownIcon className="h-4 w-4 text-blue-600" />
//                     )}
//                   </div>
//                 </div>

//                 {!collapsedSections[`service-${serviceIndex}`] && (
//                   <div className="mt-6 space-y-4">
//                     <div className="relative">
//                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                         Service
//                         <InformationCircleIcon
//                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                           title="Select the main service category"
//                         />
//                       </label>
//                       <select
//                         name="serviceId"
//                         value={service.serviceId}
//                         onChange={(e) => handleChange(e, serviceIndex)}
//                         className={`w-full p-3 border rounded-md ${
//                           validationErrors[`service-${serviceIndex}`]
//                             ? "border-red-500"
//                             : "border-gray-200"
//                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                       >
//                         <option value="">Select Service</option>
//                         {services.map((s) => (
//                           <option
//                             key={s.serviceId}
//                             value={s.serviceId.toString()}
//                           >
//                             {s.serviceName}
//                           </option>
//                         ))}
//                       </select>
//                       {validationErrors[`service-${serviceIndex}`] && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {validationErrors[`service-${serviceIndex}`]}
//                         </p>
//                       )}
//                     </div>

//                     {service.subServices.map((subService, subServiceIndex) => (
//                       <div
//                         key={subServiceIndex}
//                         className="ml-6 p-4 bg-gray-100 rounded-lg shadow-sm"
//                       >
//                         <div
//                           className="flex items-center justify-between bg-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-300"
//                           onClick={() =>
//                             toggleCollapse(
//                               "subService",
//                               serviceIndex,
//                               subServiceIndex
//                             )
//                           }
//                         >
//                           <h5 className="text-md font-medium text-gray-600">
//                             Sub-Service {subServiceIndex + 1}
//                           </h5>
//                           <div className="flex items-center space-x-4">
//                             <button
//                               type="button"
//                               className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 removeSubService(serviceIndex, subServiceIndex);
//                               }}
//                               disabled={service.subServices.length === 1}
//                               title="Remove Sub-Service"
//                             >
//                               <TrashIcon className="h-4 w-4" />
//                             </button>
//                             {collapsedSections[
//                               `subService-${serviceIndex}-${subServiceIndex}`
//                             ] ? (
//                               <ChevronUpIcon className="h-4 w-4 text-gray-600" />
//                             ) : (
//                               <ChevronDownIcon className="h-4 w-4 text-gray-600" />
//                             )}
//                           </div>
//                         </div>

//                         {!collapsedSections[
//                           `subService-${serviceIndex}-${subServiceIndex}`
//                         ] && (
//                           <div className="mt-4 space-y-4">
//                             <div className="relative">
//                               <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                 Sub-Service
//                                 <InformationCircleIcon
//                                   className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                   title="Select a sub-service"
//                                 />
//                               </label>
//                               <select
//                                 name="subServiceId"
//                                 value={subService.subServiceId}
//                                 onChange={(e) =>
//                                   handleChange(e, serviceIndex, subServiceIndex)
//                                 }
//                                 className={`w-full p-3 border rounded-md ${
//                                   validationErrors[
//                                     `subService-${serviceIndex}-${subServiceIndex}`
//                                   ]
//                                     ? "border-red-500"
//                                     : "border-gray-200"
//                                 } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                                 disabled={
//                                   !service.serviceId ||
//                                   !subServices[service.serviceId]?.length
//                                 }
//                               >
//                                 <option value="">Select Sub-Service</option>
//                                 {(subServices[service.serviceId] || []).map(
//                                   (ss) => (
//                                     <option
//                                       key={ss.subServiceId}
//                                       value={ss.subServiceId.toString()}
//                                     >
//                                       {ss.subServiceName}
//                                     </option>
//                                   )
//                                 )}
//                               </select>
//                               {validationErrors[
//                                 `subService-${serviceIndex}-${subServiceIndex}`
//                               ] && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                   {
//                                     validationErrors[
//                                       `subService-${serviceIndex}-${subServiceIndex}`
//                                     ]
//                                   }
//                                 </p>
//                               )}
//                             </div>

//                             {subService.serviceScopes.map(
//                               (scope, scopeIndex) => (
//                                 <div
//                                   key={scopeIndex}
//                                   className="ml-4 p-4 bg-white rounded-md shadow-sm"
//                                 >
//                                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
//                                     <h6 className="text-sm font-medium text-gray-600">
//                                       Scope {scopeIndex + 1}
//                                     </h6>
//                                     <button
//                                       type="button"
//                                       className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
//                                       onClick={() =>
//                                         removeServiceScope(
//                                           serviceIndex,
//                                           subServiceIndex,
//                                           scopeIndex
//                                         )
//                                       }
//                                       disabled={
//                                         subService.serviceScopes.length === 1
//                                       }
//                                       title="Remove Scope"
//                                     >
//                                       <TrashIcon className="h-4 w-4" />
//                                     </button>
//                                   </div>

//                                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Service Scope
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Define the specific scope of work"
//                                         />
//                                       </label>
//                                       <select
//                                         name="scopeId"
//                                         value={scope.scopeId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                                         disabled={
//                                           !subService.subServiceId ||
//                                           !serviceScopes[
//                                             subService.subServiceId
//                                           ]?.length
//                                         }
//                                       >
//                                         <option value="">Select Scope</option>
//                                         {(
//                                           serviceScopes[
//                                             subService.subServiceId
//                                           ] || []
//                                         ).map((sc) => (
//                                           <option
//                                             key={sc.scopeId}
//                                             value={sc.scopeId.toString()}
//                                           >
//                                             {sc.scopeName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                     </div>

//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         SLA Type
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Select the Service Level Agreement type"
//                                         />
//                                       </label>
//                                       <select
//                                         name="slaTypeId"
//                                         value={scope.slaTypeId}
//                                         onChange={(e) =>
//                                           handleSlaTypeChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                                       >
//                                         <option value="">
//                                           Select SLA Type
//                                         </option>
//                                         {slaTypes.map((sla) => (
//                                           <option
//                                             key={sla.slaTypeId}
//                                             value={sla.slaTypeId.toString()}
//                                           >
//                                             {sla.slaTypeName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                     </div>

//                                     <div className="relative">
//                                       <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                                         Priority Level
//                                         <InformationCircleIcon
//                                           className="ml-2 h-4 w-4 text-gray-400 cursor-help"
//                                           title="Set the priority for this scope"
//                                         />
//                                       </label>
//                                       <select
//                                         name="priorityId"
//                                         value={scope.priorityId}
//                                         onChange={(e) =>
//                                           handleChange(
//                                             e,
//                                             serviceIndex,
//                                             subServiceIndex,
//                                             scopeIndex
//                                           )
//                                         }
//                                         className={`w-full p-3 border rounded-md ${
//                                           validationErrors[
//                                             `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                           ]
//                                             ? "border-red-500"
//                                             : "border-gray-200"
//                                         } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                                         disabled={
//                                           !scope.slaTypeId ||
//                                           !priorityLevels[scope.slaTypeId]
//                                             ?.length
//                                         }
//                                       >
//                                         <option value="">
//                                           Select Priority
//                                         </option>
//                                         {(
//                                           priorityLevels[scope.slaTypeId] || []
//                                         ).map((pl) => (
//                                           <option
//                                             key={pl.priorityId}
//                                             value={pl.priorityId.toString()}
//                                           >
//                                             {pl.priorityName}
//                                           </option>
//                                         ))}
//                                       </select>
//                                       {validationErrors[
//                                         `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                       ] && (
//                                         <p className="text-red-500 text-xs mt-1">
//                                           {
//                                             validationErrors[
//                                               `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
//                                             ]
//                                           }
//                                         </p>
//                                       )}
//                                     </div>
//                                   </div>
//                                 </div>
//                               )
//                             )}

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 addServiceScope(serviceIndex, subServiceIndex)
//                               }
//                               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                               title="Add a new scope"
//                             >
//                               <PlusIcon className="h-4 w-4 mr-2" />
//                               Add Scope
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}

//                     <button
//                       type="button"
//                       onClick={() => addSubService(serviceIndex)}
//                       className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//                       title="Add a new sub-service"
//                     >
//                       <PlusIcon className="h-4 w-4 mr-2" />
//                       Add Sub-Service
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={addService}
//               className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
//               title="Add a new service"
//             >
//               <PlusIcon className="h-4 w-4 mr-2" />
//               Add Service
//             </button>
//           </div>
//         )}

//         {activeTab === "timings" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               Employee Timings
//             </h4>
//             <div className="space-y-4">
//               {formData.employeeTimings.map((timing, timingIndex) => (
//                 <div
//                   key={timingIndex}
//                   className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4"
//                 >
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {timing.dayOfWeek}
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duty Start
//                     </label>
//                     <input
//                       type="time"
//                       name="dutyStartTime"
//                       value={timing.dutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Duty End
//                     </label>
//                     <input
//                       type="time"
//                       name="dutyEndTime"
//                       value={timing.dutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`dutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`dutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`dutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty Start
//                     </label>
//                     <input
//                       type="time"
//                       name="offDutyStartTime"
//                       value={timing.offDutyStartTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyStartTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyStartTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyStartTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Off-Duty End
//                     </label>
//                     <input
//                       type="time"
//                       name="offDutyEndTime"
//                       value={timing.offDutyEndTime}
//                       onChange={(e) =>
//                         handleChange(
//                           e,
//                           undefined,
//                           undefined,
//                           undefined,
//                           timingIndex
//                         )
//                       }
//                       className={`w-full p-2 border rounded-md ${
//                         validationErrors[`offDutyEndTime-${timingIndex}`]
//                           ? "border-red-500"
//                           : "border-gray-200"
//                       } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
//                     />
//                     {validationErrors[`offDutyEndTime-${timingIndex}`] && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {validationErrors[`offDutyEndTime-${timingIndex}`]}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "sla" && (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <h4 className="text-lg font-semibold text-gray-700">SLA Rules</h4>
//               <div className="text-sm text-gray-500">
//                 <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
//                   {autoGeneratedRules.length}
//                 </span>
//                 Auto-generated from service scopes
//               </div>
//             </div>

//             {/* Service Scope Based Rules */}
//             {autoGeneratedRules.length > 0 ? (
//               <div className="mb-6">
//                 <h5 className="text-md font-medium text-gray-600 mb-3 bg-blue-50 p-3 rounded flex items-center">
//                   <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
//                     {autoGeneratedRules.length}
//                   </span>
//                   Service Scope Based SLA Rules
//                 </h5>
//                 <div className="space-y-3">
//                   {autoGeneratedRules.map((rule, index) => {
//                     const actualIndex = formData.slaRules.findIndex(
//                       (r) => r === rule
//                     );
//                     return (
//                       <div
//                         key={actualIndex}
//                         className="p-4 bg-blue-50 rounded-md shadow-sm border-l-4 border-blue-400"
//                       >
//                         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                           <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Service Scope
//                             </label>
//                             <input
//                               type="text"
//                               value={rule.scopeName}
//                               disabled
//                               className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
//                             />
//                           </div>
//                           <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               SLA Type
//                             </label>
//                             <select
//                               value={rule.slaTypeId}
//                               disabled
//                               className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
//                             >
//                               <option value="">Select SLA Type</option>
//                               {slaTypes.map((sla) => (
//                                 <option
//                                   key={sla.slaTypeId}
//                                   value={sla.slaTypeId.toString()}
//                                 >
//                                   {sla.slaTypeName}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                           <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Priority Level
//                             </label>
//                             <select
//                               value={rule.priorityId}
//                               disabled
//                               className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
//                             >
//                               <option value="">Select Priority</option>
//                               {(priorityLevels[rule.slaTypeId] || []).map(
//                                 (pl) => (
//                                   <option
//                                     key={pl.priorityId}
//                                     value={pl.priorityId.toString()}
//                                   >
//                                     {pl.priorityName}
//                                   </option>
//                                 )
//                               )}
//                             </select>
//                           </div>
//                           <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Response Time (Hours) *
//                             </label>
//                             <input
//                               type="number"
//                               name="responseTimeHours"
//                               value={rule.responseTimeHours}
//                               onChange={(e) =>
//                                 handleChange(
//                                   e,
//                                   undefined,
//                                   undefined,
//                                   undefined,
//                                   undefined,
//                                   actualIndex
//                                 )
//                               }
//                               className={`w-full p-2 border rounded-md ${
//                                 validationErrors[
//                                   `responseTimeHours-${actualIndex}`
//                                 ]
//                                   ? "border-red-500"
//                                   : "border-blue-300"
//                               } bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors`}
//                               step="0.1"
//                               min="0"
//                               placeholder="Enter hours"
//                             />
//                             {validationErrors[
//                               `responseTimeHours-${actualIndex}`
//                             ] && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {
//                                   validationErrors[
//                                     `responseTimeHours-${actualIndex}`
//                                   ]
//                                 }
//                               </p>
//                             )}
//                           </div>
//                           <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Resolution Time (Hours) *
//                             </label>
//                             <input
//                               type="number"
//                               name="resolutionTimeHours"
//                               value={rule.resolutionTimeHours}
//                               onChange={(e) =>
//                                 handleChange(
//                                   e,
//                                   undefined,
//                                   undefined,
//                                   undefined,
//                                   undefined,
//                                   actualIndex
//                                 )
//                               }
//                               className={`w-full p-2 border rounded-md ${
//                                 validationErrors[
//                                   `resolutionTimeHours-${actualIndex}`
//                                 ]
//                                   ? "border-red-500"
//                                   : "border-blue-300"
//                               } bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors`}
//                               step="0.1"
//                               min="0"
//                               placeholder="Enter hours"
//                             />
//                             {validationErrors[
//                               `resolutionTimeHours-${actualIndex}`
//                             ] && (
//                               <p className="text-red-500 text-xs mt-1">
//                                 {
//                                   validationErrors[
//                                     `resolutionTimeHours-${actualIndex}`
//                                   ]
//                                 }
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="mt-3 p-3 bg-blue-100 rounded-md">
//                   <p className="text-sm text-blue-700">
//                     <InformationCircleIcon className="inline h-4 w-4 mr-1" />
//                     These SLA rules are automatically generated from your
//                     service scopes. You only need to fill in the response and
//                     resolution times. Rules update automatically when you modify
//                     service scopes.
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="bg-gray-100 rounded-lg p-6">
//                   <InformationCircleIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
//                   <h5 className="text-lg font-medium text-gray-600 mb-2">
//                     No SLA Rules Found
//                   </h5>
//                   <p className="text-sm text-gray-500 mb-4">
//                     SLA rules will be automatically generated based on your
//                     service scopes. Please add service scopes in the Services
//                     tab first.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Submit Button - Only in SLA Rules Tab */}
//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
//                 <h6 className="text-sm font-medium text-gray-700 mb-2">
//                   Ready to Create Contract?
//                 </h6>
//                 <p className="text-xs text-gray-600">
//                   Review all the information above and click the button below to
//                   create your contract.
//                 </p>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 font-medium text-lg shadow-lg transition-all duration-200"
//               >
//                 {contractId ? "Update Contract" : "Create Contract"}
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default ContractForm;

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { companyService } from "../services/companyService";
import { contractService } from "../services/contractService";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const ContractForm = ({ onSubmit }) => {
  const updateTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    contractName: "",
    companyId: "",
    projectLocation: "",
    projectType: "",
    startDate: "",
    endDate: "",
    services: [
      {
        serviceId: "",
        subServices: [
          {
            subServiceId: "",
            serviceScopes: [
              {
                scopeId: "",
                slaTypeId: "",
                priorityId: "",
              },
            ],
          },
        ],
      },
    ],
    employeeTimings: [
      {
        dayOfWeek: "MONDAY",
        dutyStartTime: "09:00",
        dutyEndTime: "17:00",
        offDutyStartTime: "17:00",
        offDutyEndTime: "09:00",
      },
      {
        dayOfWeek: "TUESDAY",
        dutyStartTime: "09:00",
        dutyEndTime: "17:00",
        offDutyStartTime: "17:00",
        offDutyEndTime: "09:00",
      },
      {
        dayOfWeek: "WEDNESDAY",
        dutyStartTime: "09:00",
        dutyEndTime: "17:00",
        offDutyStartTime: "17:00",
        offDutyEndTime: "09:00",
      },
      {
        dayOfWeek: "THURSDAY",
        dutyStartTime: "09:00",
        dutyEndTime: "17:00",
        offDutyStartTime: "17:00",
        offDutyEndTime: "09:00",
      },
      {
        dayOfWeek: "FRIDAY",
        dutyStartTime: "09:00",
        dutyEndTime: "17:00",
        offDutyStartTime: "17:00",
        offDutyEndTime: "09:00",
      },
      {
        dayOfWeek: "SATURDAY",
        dutyStartTime: "09:00",
        dutyEndTime: "17:00",
        offDutyStartTime: "17:00",
        offDutyEndTime: "09:00",
      },
      {
        dayOfWeek: "SUNDAY",
        dutyStartTime: "09:00",
        dutyEndTime: "17:00",
        offDutyStartTime: "17:00",
        offDutyEndTime: "09:00",
      },
    ],
    slaRules: [],
  });

  const [companies, setCompanies] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState({});
  const [serviceScopes, setServiceScopes] = useState({});
  const [slaTypes, setSlaTypes] = useState([]);
  const [priorityLevels, setPriorityLevels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [collapsedSections, setCollapsedSections] = useState({});
  const [activeTab, setActiveTab] = useState("basic");

  // Generate SLA rules from service scopes
  const generateSlaRulesFromScopes = useCallback(() => {
    const rules = [];
    let ruleCounter = 0;

    formData.services.forEach((service, serviceIndex) => {
      service.subServices.forEach((subService, subServiceIndex) => {
        subService.serviceScopes.forEach((scope, scopeIndex) => {
          if (scope.scopeId && scope.slaTypeId && scope.priorityId) {
            // Find scope name
            const scopeData = serviceScopes[subService.subServiceId]?.find(
              (s) => s.scopeId.toString() === scope.scopeId
            );

            // Create unique key using service, subservice, and scope indices to ensure uniqueness
            const uniqueKey = `${serviceIndex}-${subServiceIndex}-${scopeIndex}-${scope.slaTypeId}-${scope.priorityId}-${scope.scopeId}`;

            rules.push({
              slaTypeId: scope.slaTypeId,
              priorityId: scope.priorityId,
              responseTimeHours: "",
              resolutionTimeHours: "",
              scopeName: scopeData?.scopeName || `Scope ${scope.scopeId}`,
              isFromServiceScope: true,
              uniqueKey: uniqueKey,
              ruleId: ruleCounter++,
            });
          }
        });
      });
    });

    console.log("Generated SLA rules:", rules);
    return rules;
  }, [formData.services, serviceScopes]);

  // Update SLA rules when service scopes change - Fixed with immediate update
  const updateSlaRules = useCallback(() => {
    const newGeneratedRules = generateSlaRulesFromScopes();

    setFormData((prev) => {
      // Get current manual rules (preserve user input)
      const currentManualRules = prev.slaRules.filter(
        (rule) => !rule.isFromServiceScope
      );

      // Create a map of existing auto rules by their unique key to preserve user input
      const existingAutoRulesMap = new Map();
      prev.slaRules
        .filter((rule) => rule.isFromServiceScope)
        .forEach((rule) => {
          existingAutoRulesMap.set(rule.uniqueKey, rule);
        });

      // Merge new generated rules with existing ones, preserving user input
      const updatedAutoRules = newGeneratedRules.map((newRule) => {
        // Find existing rule with same unique key to preserve user input
        const existingRule = existingAutoRulesMap.get(newRule.uniqueKey);

        return {
          ...newRule,
          responseTimeHours: existingRule?.responseTimeHours || "",
          resolutionTimeHours: existingRule?.resolutionTimeHours || "",
        };
      });

      // Combine manual and auto rules
      const allRules = [...currentManualRules, ...updatedAutoRules];

      console.log(
        "Previous auto rules count:",
        prev.slaRules.filter((r) => r.isFromServiceScope).length
      );
      console.log("New auto rules count:", updatedAutoRules.length);
      console.log("All rules count:", allRules.length);

      return {
        ...prev,
        slaRules: allRules,
      };
    });
  }, [generateSlaRulesFromScopes]);

  // Effect to update SLA rules when services or scopes change - Immediate update without debounce
  useEffect(() => {
    // Only update if we have some service scopes configured
    const hasConfiguredScopes = formData.services.some((service) =>
      service.subServices.some((subService) =>
        subService.serviceScopes.some(
          (scope) => scope.scopeId && scope.slaTypeId && scope.priorityId
        )
      )
    );

    console.log("Has configured scopes:", hasConfiguredScopes);

    if (hasConfiguredScopes) {
      updateSlaRules();
    } else {
      // Clear auto-generated rules if no scopes are configured
      setFormData((prev) => ({
        ...prev,
        slaRules: prev.slaRules.filter((rule) => !rule.isFromServiceScope),
      }));
    }
  }, [formData.services, serviceScopes, updateSlaRules]);

  // Effect to trigger SLA rules update when switching to SLA tab
  useEffect(() => {
    if (activeTab === "sla") {
      // Force update SLA rules when switching to SLA tab
      updateSlaRules();
    }
  }, [activeTab, updateSlaRules]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [companiesRes, servicesRes, slaTypesRes] = await Promise.all([
          companyService.getAllCompanies(),
          contractService.getServices(),
          contractService.getSlaTypes(),
        ]);

        const companiesData = Array.isArray(companiesRes.data)
          ? companiesRes.data
          : [];
        const servicesData = Array.isArray(servicesRes.data)
          ? servicesRes.data
          : [];
        const slaTypesData = Array.isArray(slaTypesRes.data)
          ? slaTypesRes.data
          : [];

        setCompanies(companiesData);
        setServices(servicesData);
        setSlaTypes(slaTypesData);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load form data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const validateField = (
    name,
    value,
    serviceIndex,
    subServiceIndex,
    scopeIndex,
    timingIndex,
    ruleIndex
  ) => {
    const errors = {};
    if (name === "contractName" && !value)
      errors.contractName = "Contract name is required.";
    if (name === "companyId" && !value)
      errors.companyId = "Company is required.";
    if (name === "projectType" && !value)
      errors.projectType = "Project type is required.";
    if (name === "startDate" && !value)
      errors.startDate = "Start date is required.";
    if (name === "endDate" && !value) errors.endDate = "End date is required.";
    if (name === "serviceId" && !value)
      errors[`service-${serviceIndex}`] = "Service is required.";
    if (name === "subServiceId" && !value)
      errors[`subService-${serviceIndex}-${subServiceIndex}`] =
        "Sub-service is required.";
    if (name === "scopeId" && !value)
      errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
        "Scope is required.";
    if (name === "slaTypeId" && !value)
      errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
        "SLA type is required.";
    if (name === "priorityId" && !value)
      errors[`priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
        "Priority level is required.";
    if (name === "dutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
      errors[`dutyStartTime-${timingIndex}`] = "Valid time (HH:MM) required.";
    if (name === "dutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
      errors[`dutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
    if (name === "offDutyStartTime" && !/^\d{2}:\d{2}$/.test(value))
      errors[`offDutyStartTime-${timingIndex}`] =
        "Valid time (HH:MM) required.";
    if (name === "offDutyEndTime" && !/^\d{2}:\d{2}$/.test(value))
      errors[`offDutyEndTime-${timingIndex}`] = "Valid time (HH:MM) required.";
    if (name === "slaRuleSlaTypeId" && !value)
      errors[`slaRuleSlaType-${ruleIndex}`] = "SLA type is required.";
    if (name === "slaRulePriorityId" && !value)
      errors[`slaRulePriority-${ruleIndex}`] = "Priority level is required.";
    if (name === "responseTimeHours" && (value === "" || value < 0))
      errors[`responseTimeHours-${ruleIndex}`] =
        "Valid response time required.";
    if (name === "resolutionTimeHours" && (value === "" || value < 0))
      errors[`resolutionTimeHours-${ruleIndex}`] =
        "Valid resolution time required.";
    return errors;
  };

  const handleChange = (
    e,
    serviceIndex,
    subServiceIndex,
    scopeIndex,
    timingIndex,
    ruleIndex
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const newFormData = { ...prev };

      // Update nested formData based on indices
      if (
        serviceIndex !== undefined &&
        subServiceIndex !== undefined &&
        scopeIndex !== undefined
      ) {
        newFormData.services[serviceIndex].subServices[
          subServiceIndex
        ].serviceScopes[scopeIndex][name] = value;
        if (name === "scopeId") {
          newFormData.services[serviceIndex].subServices[
            subServiceIndex
          ].serviceScopes[scopeIndex].slaTypeId = "";
          newFormData.services[serviceIndex].subServices[
            subServiceIndex
          ].serviceScopes[scopeIndex].priorityId = "";
        }
      } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
        newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
          value;
        if (name === "subServiceId") {
          newFormData.services[serviceIndex].subServices[
            subServiceIndex
          ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
          if (value) {
            contractService
              .getServiceScopes(value)
              .then((res) => {
                setServiceScopes((prev) => ({
                  ...prev,
                  [value]: Array.isArray(res.data) ? res.data : [],
                }));
              })
              .catch((err) => {
                console.error("Failed to load service scopes:", err);
                setError("Failed to load service scopes.");
              });
          }
        }
      } else if (serviceIndex !== undefined) {
        newFormData.services[serviceIndex][name] = value;
        if (name === "serviceId") {
          newFormData.services[serviceIndex].subServices = [
            {
              subServiceId: "",
              serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
            },
          ];
          if (value) {
            contractService
              .getSubServices(value)
              .then((res) => {
                setSubServices((prev) => ({
                  ...prev,
                  [value]: Array.isArray(res.data) ? res.data : [],
                }));
              })
              .catch((err) => {
                console.error("Failed to load sub-services:", err);
                setError("Failed to load sub-services.");
              });
          }
        }
      } else if (timingIndex !== undefined) {
        newFormData.employeeTimings[timingIndex][name] = value;
      } else if (ruleIndex !== undefined) {
        const field =
          name === "slaTypeId"
            ? "slaTypeId"
            : name === "priorityId"
            ? "priorityId"
            : name;
        newFormData.slaRules[ruleIndex][field] = value;
        if (name === "slaTypeId") {
          newFormData.slaRules[ruleIndex].priorityId = "";
        }
      } else {
        newFormData[name] = value;
      }

      return newFormData;
    });

    // Update validation errors
    const errors = validateField(
      name,
      value,
      serviceIndex,
      subServiceIndex,
      scopeIndex,
      timingIndex,
      ruleIndex
    );
    setValidationErrors((prev) => ({ ...prev, ...errors }));
  };

  const handleSlaTypeChange = (
    e,
    serviceIndex,
    subServiceIndex,
    scopeIndex,
    ruleIndex
  ) => {
    const slaTypeId = e.target.value;

    setFormData((prev) => {
      const newFormData = { ...prev };
      if (ruleIndex !== undefined) {
        newFormData.slaRules[ruleIndex].slaTypeId = slaTypeId;
        newFormData.slaRules[ruleIndex].priorityId = "";
      } else {
        newFormData.services[serviceIndex].subServices[
          subServiceIndex
        ].serviceScopes[scopeIndex].slaTypeId = slaTypeId;
        newFormData.services[serviceIndex].subServices[
          subServiceIndex
        ].serviceScopes[scopeIndex].priorityId = "";
      }
      return newFormData;
    });

    setValidationErrors((prev) => ({
      ...prev,
      ...validateField(
        ruleIndex !== undefined ? "slaRuleSlaTypeId" : "slaTypeId",
        slaTypeId,
        serviceIndex,
        subServiceIndex,
        scopeIndex,
        undefined,
        ruleIndex
      ),
    }));

    if (slaTypeId) {
      contractService
        .getPriorityLevels(slaTypeId)
        .then((res) => {
          setPriorityLevels((prev) => ({
            ...prev,
            [slaTypeId]: Array.isArray(res.data) ? res.data : [],
          }));
        })
        .catch((err) => {
          console.error("Failed to load priority levels:", err);
          setPriorityLevels((prev) => ({
            ...prev,
            [slaTypeId]: [],
          }));
          setError("Failed to load priority levels. Please try again.");
        });
    }
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          serviceId: "",
          subServices: [
            {
              subServiceId: "",
              serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
            },
          ],
        },
      ],
    }));
  };

  const addSubService = (serviceIndex) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      newFormData.services[serviceIndex].subServices.push({
        subServiceId: "",
        serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
      });
      return newFormData;
    });
  };

  const addServiceScope = (serviceIndex, subServiceIndex) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      newFormData.services[serviceIndex].subServices[
        subServiceIndex
      ].serviceScopes.push({
        scopeId: "",
        slaTypeId: "",
        priorityId: "",
      });
      return newFormData;
    });
  };

  const removeService = (serviceIndex) => {
    setFormData((prev) => {
      const newServices = prev.services.filter(
        (_, idx) => idx !== serviceIndex
      );
      return {
        ...prev,
        services: newServices.length
          ? newServices
          : [
              {
                serviceId: "",
                subServices: [
                  {
                    subServiceId: "",
                    serviceScopes: [
                      { scopeId: "", slaTypeId: "", priorityId: "" },
                    ],
                  },
                ],
              },
            ],
      };
    });
  };

  const removeSubService = (serviceIndex, subServiceIndex) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      newFormData.services[serviceIndex].subServices = newFormData.services[
        serviceIndex
      ].subServices.filter((_, idx) => idx !== subServiceIndex);
      if (!newFormData.services[serviceIndex].subServices.length) {
        newFormData.services[serviceIndex].subServices = [
          {
            subServiceId: "",
            serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
          },
        ];
      }
      return newFormData;
    });
  };

  const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      newFormData.services[serviceIndex].subServices[
        subServiceIndex
      ].serviceScopes = newFormData.services[serviceIndex].subServices[
        subServiceIndex
      ].serviceScopes.filter((_, idx) => idx !== scopeIndex);
      if (
        !newFormData.services[serviceIndex].subServices[subServiceIndex]
          .serviceScopes.length
      ) {
        newFormData.services[serviceIndex].subServices[
          subServiceIndex
        ].serviceScopes = [{ scopeId: "", slaTypeId: "", priorityId: "" }];
      }
      return newFormData;
    });
  };

  const validateFormData = () => {
    const errors = {};
    if (!formData.contractName) errors.contractName = "Required field.";
    if (!formData.companyId) errors.companyId = "Required field.";
    if (!formData.projectType) errors.projectType = "Required field.";
    if (!formData.startDate) errors.startDate = "Required field.";
    if (!formData.endDate) errors.endDate = "Required field.";
    if (!formData.services.length) errors.services = "At least one required.";

    formData.services.forEach((service, serviceIndex) => {
      if (!service.serviceId)
        errors[`service-${serviceIndex}`] = "Required field.";
      if (!service.subServices.length)
        errors[`subServices-${serviceIndex}`] =
          "At least one sub-service required.";
      service.subServices.forEach((subService, subServiceIndex) => {
        if (!subService.subServiceId)
          errors[`subService-${serviceIndex}-${subServiceIndex}`] =
            "Required field.";
        if (!subService.serviceScopes.length)
          errors[`scopes-${serviceIndex}-${subServiceIndex}`] =
            "At least one scope required.";
        subService.serviceScopes.forEach((scope, scopeIndex) => {
          if (!scope.scopeId)
            errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
              "Required field.";
          if (!scope.slaTypeId)
            errors[`slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
              "Required field.";
          if (!scope.priorityId)
            errors[
              `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
            ] = "Required field.";
        });
      });
    });

    formData.employeeTimings.forEach((timing, timingIndex) => {
      if (!/^\d{2}:\d{2}$/.test(timing.dutyStartTime))
        errors[`dutyStartTime-${timingIndex}`] =
          "Valid time format (HH:MM) required.";
      if (!/^\d{2}:\d{2}$/.test(timing.dutyEndTime))
        errors[`dutyEndTime-${timingIndex}`] =
          "Valid time format (HH:MM) required.";
      if (!/^\d{2}:\d{2}$/.test(timing.offDutyStartTime))
        errors[`offDutyStartTime-${timingIndex}`] =
          "Valid time format (HH:MM) required.";
      if (!/^\d{2}:\d{2}$/.test(timing.offDutyEndTime))
        errors[`offDutyEndTime-${timingIndex}`] =
          "Valid time format (HH:MM) required.";
    });

    formData.slaRules.forEach((rule, ruleIndex) => {
      if (!rule.slaTypeId)
        errors[`slaRuleSlaType-${ruleIndex}`] = "Required field.";
      if (!rule.priorityId)
        errors[`slaRulePriority-${ruleIndex}`] = "Required field.";
      if (rule.responseTimeHours === "" || rule.responseTimeHours < 0)
        errors[`responseTimeHours-${ruleIndex}`] = "Valid time required.";
      if (rule.resolutionTimeHours === "" || rule.resolutionTimeHours < 0)
        errors[`resolutionTimeHours-${ruleIndex}`] = "Valid time required.";
    });

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFormData();
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    try {
      // Make sure all SLA rules have response and resolution times
      const hasIncompleteSlaRules = formData.slaRules.some(
        (rule) =>
          rule.responseTimeHours === "" || rule.resolutionTimeHours === ""
      );

      if (hasIncompleteSlaRules) {
        setError(
          "Please fill in response and resolution times for all SLA rules."
        );
        return;
      }

      const cleanedFormData = {
        contractName: formData.contractName,
        companyId: Number.parseInt(formData.companyId, 10),
        projectLocation: formData.projectLocation,
        projectType: formData.projectType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        services: formData.services.map((service) => ({
          serviceId: Number.parseInt(service.serviceId, 10),
          subServices: service.subServices.map((subService) => ({
            subServiceId: Number.parseInt(subService.subServiceId, 10),
            serviceScopes: subService.serviceScopes.map((scope) => ({
              scopeId: Number.parseInt(scope.scopeId, 10),
              slaTypeId: Number.parseInt(scope.slaTypeId, 10),
              priorityId: Number.parseInt(scope.priorityId, 10),
            })),
          })),
        })),
        employeeTimings: formData.employeeTimings.map((timing) => ({
          dayOfWeek: timing.dayOfWeek,
          dutyStartTime: timing.dutyStartTime + ":00",
          dutyEndTime: timing.dutyEndTime + ":00",
          offDutyStartTime: timing.offDutyStartTime + ":00",
          offDutyEndTime: timing.offDutyEndTime + ":00",
        })),
        slaRules: formData.slaRules.map((rule) => ({
          slaTypeId: Number.parseInt(rule.slaTypeId, 10),
          priorityId: Number.parseInt(rule.priorityId, 10),
          responseTimeHours: Number.parseFloat(rule.responseTimeHours),
          resolutionTimeHours: Number.parseFloat(rule.resolutionTimeHours),
          isFromServiceScope: rule.isFromServiceScope || true,
        })),
      };

      console.log("Submitting contract data:", cleanedFormData);
      onSubmit(cleanedFormData);
    } catch (err) {
      console.error("Error processing form data:", err);
      setError(
        "An error occurred while processing your form data. Please check all fields and try again."
      );
    }
  };

  const toggleCollapse = (type, index, subIndex) => {
    const key = `${type}-${index}${
      subIndex !== undefined ? `-${subIndex}` : ""
    }`;
    setCollapsedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Get auto-generated and manual rules separately
  const autoGeneratedRules = formData.slaRules.filter(
    (rule) => rule.isFromServiceScope
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-600">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 py-8 bg-red-50 text-red-700 rounded-lg max-w-md mx-auto mt-6">
        <p className="text-lg font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-6 w-full bg-white rounded-lg shadow-lg mt-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Create Contract</h3>

      {Object.keys(validationErrors).length > 0 && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 0 9 0 0118 0z"
            />
          </svg>
          {Object.values(validationErrors)[0]}
        </div>
      )}

      <div className="mb-6 border-b border-gray-200">
        <div className="flex flex-wrap">
          {[
            { id: "basic", label: "Basic Information" },
            { id: "services", label: "Services" },
            { id: "timings", label: "Employee Timings" },
            { id: "sla", label: "SLA Rules" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {tab.id === "sla" && autoGeneratedRules.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {autoGeneratedRules.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeTab === "basic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Contract Name
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Enter a unique name for the contract"
                />
              </label>
              <input
                type="text"
                name="contractName"
                value={formData.contractName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  validationErrors.contractName
                    ? "border-red-500"
                    : "border-gray-200"
                } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
              />
              {validationErrors.contractName && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.contractName}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Company
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Select the company associated with this contract"
                />
              </label>
              <select
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  validationErrors.companyId
                    ? "border-red-500"
                    : "border-gray-200"
                } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option
                    key={company.companyId}
                    value={company.companyId.toString()}
                  >
                    {company.companyName}
                  </option>
                ))}
              </select>
              {validationErrors.companyId && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.companyId}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Project Location
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Optional: Specify the project location"
                />
              </label>
              <input
                type="text"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={handleChange}
                className="w-full p-3 border rounded-md border-gray-200 bg-white focus:ring-blue-500 focus:shadow-md transition-colors"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Project Type
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Choose the contract duration type"
                />
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  validationErrors.projectType
                    ? "border-red-500"
                    : "border-gray-200"
                } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
              >
                <option value="">Select Project Type</option>
                <option value="ANNUAL">Annual</option>
                <option value="ONE_TIME">One Time</option>
              </select>
              {validationErrors.projectType && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.projectType}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Start Date
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Contract start date"
                />
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  validationErrors.startDate
                    ? "border-red-500"
                    : "border-gray-200"
                } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
              />
              {validationErrors.startDate && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.startDate}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                End Date
                <InformationCircleIcon
                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                  title="Contract end date"
                />
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  validationErrors.endDate
                    ? "border-red-500"
                    : "border-gray-200"
                } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
              />
              {validationErrors.endDate && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.endDate}
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-4">
            {formData.services.map((service, serviceIndex) => (
              <div
                key={serviceIndex}
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
              >
                <div
                  className="flex items-center justify-between bg-blue-100 p-4 rounded-md cursor-pointer hover:bg-blue-200"
                  onClick={() => toggleCollapse("service", serviceIndex)}
                >
                  <h4 className="text-lg font-semibold text-blue-700">
                    Service {serviceIndex + 1}
                  </h4>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeService(serviceIndex);
                      }}
                      disabled={formData.services.length === 1}
                      title="Remove Service"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                    {collapsedSections[`service-${serviceIndex}`] ? (
                      <ChevronUpIcon className="h-4 w-4 text-blue-600" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </div>

                {!collapsedSections[`service-${serviceIndex}`] && (
                  <div className="mt-6 space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        Service
                        <InformationCircleIcon
                          className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                          title="Select the main service category"
                        />
                      </label>
                      <select
                        name="serviceId"
                        value={service.serviceId}
                        onChange={(e) => handleChange(e, serviceIndex)}
                        className={`w-full p-3 border rounded-md ${
                          validationErrors[`service-${serviceIndex}`]
                            ? "border-red-500"
                            : "border-gray-200"
                        } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                      >
                        <option value="">Select Service</option>
                        {services.map((s) => (
                          <option
                            key={s.serviceId}
                            value={s.serviceId.toString()}
                          >
                            {s.serviceName}
                          </option>
                        ))}
                      </select>
                      {validationErrors[`service-${serviceIndex}`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {validationErrors[`service-${serviceIndex}`]}
                        </p>
                      )}
                    </div>

                    {service.subServices.map((subService, subServiceIndex) => (
                      <div
                        key={subServiceIndex}
                        className="ml-6 p-4 bg-gray-100 rounded-lg shadow-sm"
                      >
                        <div
                          className="flex items-center justify-between bg-gray-200 p-4 rounded-md cursor-pointer hover:bg-gray-300"
                          onClick={() =>
                            toggleCollapse(
                              "subService",
                              serviceIndex,
                              subServiceIndex
                            )
                          }
                        >
                          <h5 className="text-md font-medium text-gray-600">
                            Sub-Service {subServiceIndex + 1}
                          </h5>
                          <div className="flex items-center space-x-4">
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                removeSubService(serviceIndex, subServiceIndex);
                              }}
                              disabled={service.subServices.length === 1}
                              title="Remove Sub-Service"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                            {collapsedSections[
                              `subService-${serviceIndex}-${subServiceIndex}`
                            ] ? (
                              <ChevronUpIcon className="h-4 w-4 text-gray-600" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                        </div>

                        {!collapsedSections[
                          `subService-${serviceIndex}-${subServiceIndex}`
                        ] && (
                          <div className="mt-4 space-y-4">
                            <div className="relative">
                              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                Sub-Service
                                <InformationCircleIcon
                                  className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                                  title="Select a sub-service"
                                />
                              </label>
                              <select
                                name="subServiceId"
                                value={subService.subServiceId}
                                onChange={(e) =>
                                  handleChange(e, serviceIndex, subServiceIndex)
                                }
                                className={`w-full p-3 border rounded-md ${
                                  validationErrors[
                                    `subService-${serviceIndex}-${subServiceIndex}`
                                  ]
                                    ? "border-red-500"
                                    : "border-gray-200"
                                } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                                disabled={
                                  !service.serviceId ||
                                  !subServices[service.serviceId]?.length
                                }
                              >
                                <option value="">Select Sub-Service</option>
                                {(subServices[service.serviceId] || []).map(
                                  (ss) => (
                                    <option
                                      key={ss.subServiceId}
                                      value={ss.subServiceId.toString()}
                                    >
                                      {ss.subServiceName}
                                    </option>
                                  )
                                )}
                              </select>
                              {validationErrors[
                                `subService-${serviceIndex}-${subServiceIndex}`
                              ] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {
                                    validationErrors[
                                      `subService-${serviceIndex}-${subServiceIndex}`
                                    ]
                                  }
                                </p>
                              )}
                            </div>

                            {subService.serviceScopes.map(
                              (scope, scopeIndex) => (
                                <div
                                  key={scopeIndex}
                                  className="ml-4 p-4 bg-white rounded-md shadow-sm"
                                >
                                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                    <h6 className="text-sm font-medium text-gray-600">
                                      Scope {scopeIndex + 1}
                                    </h6>
                                    <button
                                      type="button"
                                      className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                      onClick={() =>
                                        removeServiceScope(
                                          serviceIndex,
                                          subServiceIndex,
                                          scopeIndex
                                        )
                                      }
                                      disabled={
                                        subService.serviceScopes.length === 1
                                      }
                                      title="Remove Scope"
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </button>
                                  </div>

                                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        Service Scope
                                        <InformationCircleIcon
                                          className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                                          title="Define the specific scope of work"
                                        />
                                      </label>
                                      <select
                                        name="scopeId"
                                        value={scope.scopeId}
                                        onChange={(e) =>
                                          handleChange(
                                            e,
                                            serviceIndex,
                                            subServiceIndex,
                                            scopeIndex
                                          )
                                        }
                                        className={`w-full p-3 border rounded-md ${
                                          validationErrors[
                                            `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                          ]
                                            ? "border-red-500"
                                            : "border-gray-200"
                                        } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                                        disabled={
                                          !subService.subServiceId ||
                                          !serviceScopes[
                                            subService.subServiceId
                                          ]?.length
                                        }
                                      >
                                        <option value="">Select Scope</option>
                                        {(
                                          serviceScopes[
                                            subService.subServiceId
                                          ] || []
                                        ).map((sc) => (
                                          <option
                                            key={sc.scopeId}
                                            value={sc.scopeId.toString()}
                                          >
                                            {sc.scopeName}
                                          </option>
                                        ))}
                                      </select>
                                      {validationErrors[
                                        `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                      ] && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {
                                            validationErrors[
                                              `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>

                                    <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        SLA Type
                                        <InformationCircleIcon
                                          className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                                          title="Select the Service Level Agreement type"
                                        />
                                      </label>
                                      <select
                                        name="slaTypeId"
                                        value={scope.slaTypeId}
                                        onChange={(e) =>
                                          handleSlaTypeChange(
                                            e,
                                            serviceIndex,
                                            subServiceIndex,
                                            scopeIndex
                                          )
                                        }
                                        className={`w-full p-3 border rounded-md ${
                                          validationErrors[
                                            `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                          ]
                                            ? "border-red-500"
                                            : "border-gray-200"
                                        } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                                      >
                                        <option value="">
                                          Select SLA Type
                                        </option>
                                        {slaTypes.map((sla) => (
                                          <option
                                            key={sla.slaTypeId}
                                            value={sla.slaTypeId.toString()}
                                          >
                                            {sla.slaTypeName}
                                          </option>
                                        ))}
                                      </select>
                                      {validationErrors[
                                        `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                      ] && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {
                                            validationErrors[
                                              `slaType-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>

                                    <div className="relative">
                                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        Priority Level
                                        <InformationCircleIcon
                                          className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                                          title="Set the priority for this scope"
                                        />
                                      </label>
                                      <select
                                        name="priorityId"
                                        value={scope.priorityId}
                                        onChange={(e) =>
                                          handleChange(
                                            e,
                                            serviceIndex,
                                            subServiceIndex,
                                            scopeIndex
                                          )
                                        }
                                        className={`w-full p-3 border rounded-md ${
                                          validationErrors[
                                            `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                          ]
                                            ? "border-red-500"
                                            : "border-gray-200"
                                        } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                                        disabled={
                                          !scope.slaTypeId ||
                                          !priorityLevels[scope.slaTypeId]
                                            ?.length
                                        }
                                      >
                                        <option value="">
                                          Select Priority
                                        </option>
                                        {(
                                          priorityLevels[scope.slaTypeId] || []
                                        ).map((pl) => (
                                          <option
                                            key={pl.priorityId}
                                            value={pl.priorityId.toString()}
                                          >
                                            {pl.priorityName}
                                          </option>
                                        ))}
                                      </select>
                                      {validationErrors[
                                        `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                      ] && (
                                        <p className="text-red-500 text-xs mt-1">
                                          {
                                            validationErrors[
                                              `priority-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                addServiceScope(serviceIndex, subServiceIndex)
                              }
                              className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                              title="Add a new scope"
                            >
                              <PlusIcon className="h-4 w-4 mr-2" />
                              Add Scope
                            </button>
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addSubService(serviceIndex)}
                      className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                      title="Add a new sub-service"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Sub-Service
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addService}
              className="mt-4 flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
              title="Add a new service"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Service
            </button>
          </div>
        )}

        {activeTab === "timings" && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Employee Timings
            </h4>
            <div className="space-y-4">
              {formData.employeeTimings.map((timing, timingIndex) => (
                <div
                  key={timingIndex}
                  className="p-4 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4"
                >
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {timing.dayOfWeek}
                    </label>
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duty Start
                    </label>
                    <input
                      type="time"
                      name="dutyStartTime"
                      value={timing.dutyStartTime}
                      onChange={(e) =>
                        handleChange(
                          e,
                          undefined,
                          undefined,
                          undefined,
                          timingIndex
                        )
                      }
                      className={`w-full p-2 border rounded-md ${
                        validationErrors[`dutyStartTime-${timingIndex}`]
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                    />
                    {validationErrors[`dutyStartTime-${timingIndex}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {validationErrors[`dutyStartTime-${timingIndex}`]}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duty End
                    </label>
                    <input
                      type="time"
                      name="dutyEndTime"
                      value={timing.dutyEndTime}
                      onChange={(e) =>
                        handleChange(
                          e,
                          undefined,
                          undefined,
                          undefined,
                          timingIndex
                        )
                      }
                      className={`w-full p-2 border rounded-md ${
                        validationErrors[`dutyEndTime-${timingIndex}`]
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                    />
                    {validationErrors[`dutyEndTime-${timingIndex}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {validationErrors[`dutyEndTime-${timingIndex}`]}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Off-Duty Start
                    </label>
                    <input
                      type="time"
                      name="offDutyStartTime"
                      value={timing.offDutyStartTime}
                      onChange={(e) =>
                        handleChange(
                          e,
                          undefined,
                          undefined,
                          undefined,
                          timingIndex
                        )
                      }
                      className={`w-full p-2 border rounded-md ${
                        validationErrors[`offDutyStartTime-${timingIndex}`]
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                    />
                    {validationErrors[`offDutyStartTime-${timingIndex}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {validationErrors[`offDutyStartTime-${timingIndex}`]}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Off-Duty End
                    </label>
                    <input
                      type="time"
                      name="offDutyEndTime"
                      value={timing.offDutyEndTime}
                      onChange={(e) =>
                        handleChange(
                          e,
                          undefined,
                          undefined,
                          undefined,
                          timingIndex
                        )
                      }
                      className={`w-full p-2 border rounded-md ${
                        validationErrors[`offDutyEndTime-${timingIndex}`]
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-white focus:ring-blue-500 focus:shadow-md transition-colors`}
                    />
                    {validationErrors[`offDutyEndTime-${timingIndex}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {validationErrors[`offDutyEndTime-${timingIndex}`]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "sla" && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-700">SLA Rules</h4>
              <div className="text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                  {autoGeneratedRules.length}
                </span>
                Auto-generated from service scopes
              </div>
            </div>

            {/* Service Scope Based Rules */}
            {autoGeneratedRules.length > 0 ? (
              <div className="mb-6">
                <h5 className="text-md font-medium text-gray-600 mb-3 bg-blue-50 p-3 rounded flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
                    {autoGeneratedRules.length}
                  </span>
                  Service Scope Based SLA Rules
                </h5>
                <div className="space-y-3">
                  {autoGeneratedRules.map((rule, index) => {
                    const actualIndex = formData.slaRules.findIndex(
                      (r) => r === rule
                    );
                    return (
                      <div
                        key={actualIndex}
                        className="p-4 bg-blue-50 rounded-md shadow-sm border-l-4 border-blue-400"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Service Scope
                            </label>
                            <input
                              type="text"
                              value={rule.scopeName}
                              disabled
                              className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              SLA Type
                            </label>
                            <select
                              value={rule.slaTypeId}
                              disabled
                              className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                            >
                              <option value="">Select SLA Type</option>
                              {slaTypes.map((sla) => (
                                <option
                                  key={sla.slaTypeId}
                                  value={sla.slaTypeId.toString()}
                                >
                                  {sla.slaTypeName}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Priority Level
                            </label>
                            <select
                              value={rule.priorityId}
                              disabled
                              className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 cursor-not-allowed"
                            >
                              <option value="">Select Priority</option>
                              {(priorityLevels[rule.slaTypeId] || []).map(
                                (pl) => (
                                  <option
                                    key={pl.priorityId}
                                    value={pl.priorityId.toString()}
                                  >
                                    {pl.priorityName}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Response Time (Hours) *
                            </label>
                            <input
                              type="number"
                              name="responseTimeHours"
                              value={rule.responseTimeHours}
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  actualIndex
                                )
                              }
                              className={`w-full p-2 border rounded-md ${
                                validationErrors[
                                  `responseTimeHours-${actualIndex}`
                                ]
                                  ? "border-red-500"
                                  : "border-blue-300"
                              } bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                              step="0.1"
                              min="0"
                              placeholder="Enter hours"
                            />
                            {validationErrors[
                              `responseTimeHours-${actualIndex}`
                            ] && (
                              <p className="text-red-500 text-xs mt-1">
                                {
                                  validationErrors[
                                    `responseTimeHours-${actualIndex}`
                                  ]
                                }
                              </p>
                            )}
                          </div>
                          <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Resolution Time (Hours) *
                            </label>
                            <input
                              type="number"
                              name="resolutionTimeHours"
                              value={rule.resolutionTimeHours}
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  undefined,
                                  undefined,
                                  undefined,
                                  undefined,
                                  actualIndex
                                )
                              }
                              className={`w-full p-2 border rounded-md ${
                                validationErrors[
                                  `resolutionTimeHours-${actualIndex}`
                                ]
                                  ? "border-red-500"
                                  : "border-blue-300"
                              } bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                              step="0.1"
                              min="0"
                              placeholder="Enter hours"
                            />
                            {validationErrors[
                              `resolutionTimeHours-${actualIndex}`
                            ] && (
                              <p className="text-red-500 text-xs mt-1">
                                {
                                  validationErrors[
                                    `resolutionTimeHours-${actualIndex}`
                                  ]
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 p-3 bg-blue-100 rounded-md">
                  <p className="text-sm text-blue-700">
                    <InformationCircleIcon className="inline h-4 w-4 mr-1" />
                    These SLA rules are automatically generated from your
                    service scopes. You only need to fill in the response and
                    resolution times. Rules update automatically when you modify
                    service scopes.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-100 rounded-lg p-6">
                  <InformationCircleIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h5 className="text-lg font-medium text-gray-600 mb-2">
                    No SLA Rules Found
                  </h5>
                  <p className="text-sm text-gray-500 mb-4">
                    SLA rules will be automatically generated based on your
                    service scopes. Please add service scopes in the Services
                    tab first.
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button - Only in SLA Rules Tab */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
                <h6 className="text-sm font-medium text-gray-700 mb-2">
                  Ready to Create Contract?
                </h6>
                <p className="text-xs text-gray-600">
                  Review all the information above and click the button below to
                  create your contract.
                </p>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 font-medium text-lg shadow-lg transition-all duration-200"
              >
                Create Contract
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContractForm;
