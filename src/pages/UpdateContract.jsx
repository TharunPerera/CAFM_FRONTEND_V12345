// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { companyService } from "../services/companyService";
// import { contractService } from "../services/contractService";
// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const UpdateContract = () => {
//   const { contractId } = useParams();
//   const navigate = useNavigate();
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

//   // Reference data
//   const [companies, setCompanies] = useState([]);
//   const [services, setServices] = useState([]);
//   const [slaTypes, setSlaTypes] = useState([]);

//   // Dependent data
//   const [subServices, setSubServices] = useState({});
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [priorityLevels, setPriorityLevels] = useState({});

//   // UI state
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});
//   const [collapsedSections, setCollapsedSections] = useState({});
//   const [activeTab, setActiveTab] = useState("basic");
//   const [successMessage, setSuccessMessage] = useState(null);

//   // Original contract data for reference
//   const [originalContract, setOriginalContract] = useState(null);
//   const [originalSlaRulesMap, setOriginalSlaRulesMap] = useState(new Map());
//   const [originalServiceScopesSet, setOriginalServiceScopesSet] = useState(
//     new Set()
//   );

//   // Helper function to convert time format from HH:mm:ss to HH:mm
//   const convertTimeFromBackend = (timeString) => {
//     if (!timeString) return "";
//     // If it's already in HH:mm format, return as is
//     if (timeString.length === 5) return timeString;
//     // If it's in HH:mm:ss format, remove seconds
//     return timeString.substring(0, 5);
//   };

//   // Helper function to convert time format from HH:mm to HH:mm:ss
//   const convertTimeToBackend = (timeString) => {
//     if (!timeString) return "";
//     // If it's already in HH:mm:ss format, return as is
//     if (timeString.length === 8) return timeString;
//     // If it's in HH:mm format, add seconds
//     return `${timeString}:00`;
//   };

//   // Create a map of original SLA rules for quick lookup
//   const createOriginalSlaRulesMap = useCallback(
//     (originalSlaRules, originalContract) => {
//       const map = new Map();

//       console.log("Creating SLA rules map from:", originalSlaRules);
//       console.log("Original contract services:", originalContract?.services);

//       if (
//         originalSlaRules &&
//         Array.isArray(originalSlaRules) &&
//         originalContract?.services
//       ) {
//         // First, create a general mapping by SLA Type + Priority
//         originalSlaRules.forEach((rule) => {
//           const generalKey = `${rule.slaTypeId}-${rule.priorityId}`;
//           const ruleData = {
//             responseTimeHours: rule.responseTimeHours?.toString() || "",
//             resolutionTimeHours: rule.resolutionTimeHours?.toString() || "",
//             ruleId: rule.ruleId || null,
//             slaTypeId: rule.slaTypeId,
//             priorityId: rule.priorityId,
//           };

//           // Store with general SLA+Priority key
//           map.set(generalKey, ruleData);
//           console.log(`Mapped general SLA rule: ${generalKey}`, ruleData);
//         });

//         // Then, create specific scope mappings
//         originalContract.services.forEach((service) => {
//           if (service.subServices) {
//             service.subServices.forEach((subService) => {
//               if (subService.serviceScopes) {
//                 subService.serviceScopes.forEach((scope) => {
//                   // Find the corresponding SLA rule for this specific scope
//                   const matchingSlaRule = originalSlaRules.find(
//                     (rule) =>
//                       rule.slaTypeId.toString() ===
//                         scope.slaTypeId?.toString() &&
//                       rule.priorityId.toString() ===
//                         scope.priorityId?.toString()
//                   );

//                   if (matchingSlaRule) {
//                     // Create specific scope key
//                     const specificScopeKey = `${service.serviceName}-${subService.subServiceName}-${scope.scopeName}-${scope.slaTypeName}-${scope.priorityName}`;

//                     const ruleData = {
//                       responseTimeHours:
//                         matchingSlaRule.responseTimeHours?.toString() || "",
//                       resolutionTimeHours:
//                         matchingSlaRule.resolutionTimeHours?.toString() || "",
//                       ruleId: matchingSlaRule.ruleId || null,
//                       slaTypeId: matchingSlaRule.slaTypeId,
//                       priorityId: matchingSlaRule.priorityId,
//                     };

//                     // Store with specific scope key (preferred)
//                     map.set(specificScopeKey, ruleData);
//                     console.log(
//                       `Mapped specific SLA rule: ${specificScopeKey}`,
//                       ruleData
//                     );
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }

//       console.log("Final SLA rules map:", Array.from(map.entries()));
//       return map;
//     },
//     []
//   );

//   // Create a set of original service scope combinations for tracking what existed
//   const createOriginalServiceScopesSet = useCallback((originalContract) => {
//     const scopesSet = new Set();
//     if (originalContract?.services) {
//       originalContract.services.forEach((service) => {
//         if (service.subServices) {
//           service.subServices.forEach((subService) => {
//             if (subService.serviceScopes) {
//               subService.serviceScopes.forEach((scope) => {
//                 // Create a unique identifier for each service scope combination
//                 const scopeKey = `${service.serviceName}-${subService.subServiceName}-${scope.scopeName}-${scope.slaTypeName}-${scope.priorityName}`;
//                 scopesSet.add(scopeKey);
//               });
//             }
//           });
//         }
//       });
//     }
//     console.log("Original service scopes set:", Array.from(scopesSet));
//     return scopesSet;
//   }, []);

//   // Check if a service scope existed in the original contract
//   const wasServiceScopeInOriginalContract = useCallback(
//     (serviceName, subServiceName, scopeName, slaTypeName, priorityName) => {
//       const scopeKey = `${serviceName}-${subServiceName}-${scopeName}-${slaTypeName}-${priorityName}`;
//       const existed = originalServiceScopesSet.has(scopeKey);
//       console.log(`Checking scope: ${scopeKey} - Existed: ${existed}`);
//       return existed;
//     },
//     [originalServiceScopesSet]
//   );

//   // Generate SLA rules from service scopes with proper original value detection
//   const generateSlaRulesFromScopes = useCallback(() => {
//     const rules = [];
//     const ruleCounter = 0;

//     console.log("Generating SLA rules from services:", formData.services);

//     formData.services.forEach((service, serviceIndex) => {
//       service.subServices.forEach((subService, subServiceIndex) => {
//         subService.serviceScopes.forEach((scope, scopeIndex) => {
//           if (scope.scopeId && scope.slaTypeId && scope.priorityId) {
//             // Find scope name
//             const scopeData = serviceScopes[subService.subServiceId]?.find(
//               (s) => s.scopeId.toString() === scope.scopeId.toString()
//             );

//             // Find SLA type name
//             const slaTypeData = slaTypes.find(
//               (st) => st.slaTypeId.toString() === scope.slaTypeId.toString()
//             );

//             // Find priority name
//             const priorityData = priorityLevels[scope.slaTypeId]?.find(
//               (p) => p.priorityId.toString() === scope.priorityId.toString()
//             );

//             // Find service name
//             const serviceData = services.find(
//               (s) => s.serviceId.toString() === service.serviceId.toString()
//             );

//             // Find subservice name
//             const subServiceData = subServices[service.serviceId]?.find(
//               (ss) =>
//                 ss.subServiceId.toString() ===
//                 subService.subServiceId.toString()
//             );

//             const serviceName =
//               serviceData?.serviceName || `Service ${service.serviceId}`;
//             const subServiceName =
//               subServiceData?.subServiceName ||
//               `SubService ${subService.subServiceId}`;
//             const scopeName = scopeData?.scopeName || `Scope ${scope.scopeId}`;
//             const slaTypeName =
//               slaTypeData?.slaTypeName || `SLA Type ${scope.slaTypeId}`;
//             const priorityName =
//               priorityData?.priorityName || `Priority ${scope.priorityId}`;

//             // Check if this exact service scope combination existed in the original contract
//             const wasInOriginalContract = wasServiceScopeInOriginalContract(
//               serviceName,
//               subServiceName,
//               scopeName,
//               slaTypeName,
//               priorityName
//             );

//             // Get original SLA rule values - ONLY for service scopes that actually existed in original contract
//             let originalRule = null;
//             if (wasInOriginalContract) {
//               // Try specific scope key first for exact matches
//               const scopeKey = `${serviceName}-${subServiceName}-${scopeName}-${slaTypeName}-${priorityName}`;
//               originalRule = originalSlaRulesMap.get(scopeKey);

//               // If no specific scope match, try general SLA+Priority key ONLY for original scopes
//               if (!originalRule) {
//                 const generalKey = `${scope.slaTypeId}-${scope.priorityId}`;
//                 originalRule = originalSlaRulesMap.get(generalKey);
//               }
//             }

//             const scopeKey = `${serviceName}-${subServiceName}-${scopeName}-${slaTypeName}-${priorityName}`;
//             console.log(`Checking scope: ${scopeKey}`);
//             console.log(`Was in original contract: ${wasInOriginalContract}`);
//             console.log(`Original rule found:`, originalRule);

//             // Create unique key using service, subservice, and scope indices to ensure uniqueness
//             const uniqueKey = `${serviceIndex}-${subServiceIndex}-${scopeIndex}-${scope.slaTypeId}-${scope.priorityId}-${scope.scopeId}`;

//             const newRule = {
//               slaTypeId: scope.slaTypeId,
//               priorityId: scope.priorityId,
//               // Pre-fill with original values ONLY if this exact scope was in the original contract
//               responseTimeHours:
//                 wasInOriginalContract && originalRule
//                   ? originalRule.responseTimeHours
//                   : "",
//               resolutionTimeHours:
//                 wasInOriginalContract && originalRule
//                   ? originalRule.resolutionTimeHours
//                   : "",
//               scopeName: scopeName,
//               slaTypeName: slaTypeName,
//               priorityName: priorityName,
//               isFromServiceScope: true,
//               uniqueKey: uniqueKey,
//               ruleId:
//                 wasInOriginalContract && originalRule
//                   ? originalRule.ruleId
//                   : null, // Only use original ruleId if it existed
//               subServiceId: subService.subServiceId,
//               scopeId: scope.scopeId, // Add scopeId for backend reference
//               wasInOriginalContract: wasInOriginalContract,
//               originalValues:
//                 wasInOriginalContract && originalRule
//                   ? {
//                       responseTimeHours: originalRule.responseTimeHours,
//                       resolutionTimeHours: originalRule.resolutionTimeHours,
//                     }
//                   : null,
//               // Additional context for debugging
//               serviceName: serviceName,
//               subServiceName: subServiceName,
//               scopeKey: scopeKey,
//               hasOriginalRule: !!(wasInOriginalContract && originalRule),
//             };

//             rules.push(newRule);
//             console.log("Generated rule:", newRule);
//           }
//         });
//       });
//     });

//     console.log("Total generated SLA rules:", rules.length);
//     return rules;
//   }, [
//     formData.services,
//     serviceScopes,
//     slaTypes,
//     priorityLevels,
//     originalSlaRulesMap,
//     services,
//     subServices,
//     wasServiceScopeInOriginalContract,
//   ]);

//   // Update SLA rules when service scopes change
//   const updateSlaRules = useCallback(() => {
//     console.log("Updating SLA rules...");
//     console.log(
//       "Current form services:",
//       JSON.stringify(formData.services, null, 2)
//     );

//     const newGeneratedRules = generateSlaRulesFromScopes();

//     setFormData((prev) => {
//       // Get current manual rules (preserve user input)
//       const currentManualRules = prev.slaRules.filter(
//         (rule) => !rule.isFromServiceScope
//       );

//       // Preserve user-modified values for existing auto-generated rules
//       const preservedValues = new Map();
//       prev.slaRules.forEach((rule) => {
//         if (rule.isFromServiceScope) {
//           const key = `${rule.slaTypeId}-${rule.priorityId}-${rule.scopeName}`;
//           preservedValues.set(key, {
//             responseTimeHours: rule.responseTimeHours,
//             resolutionTimeHours: rule.resolutionTimeHours,
//           });
//         }
//       });

//       // Apply preserved values to new rules
//       const updatedGeneratedRules = newGeneratedRules.map((rule) => {
//         const key = `${rule.slaTypeId}-${rule.priorityId}-${rule.scopeName}`;
//         const preservedValue = preservedValues.get(key);
//         if (preservedValue) {
//           return {
//             ...rule,
//             responseTimeHours: preservedValue.responseTimeHours,
//             resolutionTimeHours: preservedValue.resolutionTimeHours,
//           };
//         }
//         return rule;
//       });

//       // Combine manual and auto rules
//       const allRules = [...currentManualRules, ...updatedGeneratedRules];

//       console.log(
//         "Previous auto rules count:",
//         prev.slaRules.filter((r) => r.isFromServiceScope).length
//       );
//       console.log("New auto rules count:", updatedGeneratedRules.length);
//       console.log("All rules count:", allRules.length);
//       console.log(
//         "Final SLA rules:",
//         allRules.map((r) => ({
//           scopeName: r.scopeName,
//           slaType: r.slaTypeName,
//           priority: r.priorityName,
//         }))
//       );

//       return {
//         ...prev,
//         slaRules: allRules,
//       };
//     });
//   }, [generateSlaRulesFromScopes]);

//   // Effect to update SLA rules when services or scopes change
//   useEffect(() => {
//     // Clear any existing timeout
//     if (updateTimeoutRef.current) {
//       clearTimeout(updateTimeoutRef.current);
//     }

//     // Only update if we have some service scopes configured
//     const hasConfiguredScopes = formData.services.some((service) =>
//       service.subServices.some((subService) =>
//         subService.serviceScopes.some(
//           (scope) => scope.scopeId && scope.slaTypeId && scope.priorityId
//         )
//       )
//     );

//     console.log("Has configured scopes:", hasConfiguredScopes);
//     console.log("Current services:", formData.services);

//     // Debounce the update to avoid too many calls
//     updateTimeoutRef.current = setTimeout(() => {
//       if (hasConfiguredScopes) {
//         console.log("Updating SLA rules due to service scope changes");
//         updateSlaRules();
//       } else {
//         // Clear auto-generated rules if no scopes are configured
//         console.log("Clearing auto-generated SLA rules");
//         setFormData((prev) => ({
//           ...prev,
//           slaRules: prev.slaRules.filter((rule) => !rule.isFromServiceScope),
//         }));
//       }
//     }, 500);

//     return () => {
//       if (updateTimeoutRef.current) {
//         clearTimeout(updateTimeoutRef.current);
//       }
//     };
//   }, [
//     formData.services,
//     serviceScopes,
//     slaTypes,
//     priorityLevels,
//     updateSlaRules,
//   ]);

//   // Effect to trigger SLA rules update when switching to SLA tab
//   useEffect(() => {
//     if (activeTab === "sla") {
//       console.log("Switched to SLA tab, forcing SLA rules update");
//       // Force update SLA rules when switching to SLA tab
//       setTimeout(() => {
//         updateSlaRules();
//       }, 100);
//     }
//   }, [activeTab, updateSlaRules]);

//   // Load initial data
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (!contractId) {
//           setError("Contract ID is required for updating.");
//           return;
//         }

//         console.log("Loading contract data for ID:", contractId);

//         // Step 1: Load reference data and contract
//         const [companiesRes, servicesRes, slaTypesRes, contractRes] =
//           await Promise.all([
//             companyService.getAllCompanies(),
//             contractService.getServices(),
//             contractService.getSlaTypes(),
//             contractService.getContractById(contractId),
//           ]);

//         const companiesData = Array.isArray(companiesRes.data)
//           ? companiesRes.data
//           : [];
//         const servicesData = Array.isArray(servicesRes.data)
//           ? servicesRes.data
//           : [];
//         const slaTypesData = Array.isArray(slaTypesRes.data)
//           ? slaTypesRes.data
//           : [];
//         const contract = contractRes.data;

//         console.log("Contract loaded:", contract);
//         console.log("Companies:", companiesData);
//         console.log("Services:", servicesData);
//         console.log("SLA Types:", slaTypesData);

//         // Save reference data
//         setCompanies(companiesData);
//         setServices(servicesData);
//         setSlaTypes(slaTypesData);
//         setOriginalContract(contract);

//         // Create original SLA rules map for quick lookup
//         const originalSlaMap = createOriginalSlaRulesMap(
//           contract.slaRules,
//           contract
//         );
//         setOriginalSlaRulesMap(originalSlaMap);

//         // Create original service scopes set for tracking what existed
//         const originalScopesSet = createOriginalServiceScopesSet(contract);
//         setOriginalServiceScopesSet(originalScopesSet);

//         // Step 2: Find company ID by name if needed
//         let companyId = contract.companyId ? contract.companyId.toString() : "";
//         if (!companyId && contract.companyName) {
//           const company = companiesData.find(
//             (c) => c.companyName === contract.companyName
//           );
//           if (company) {
//             companyId = company.companyId.toString();
//             console.log(
//               "Found company by name:",
//               company.companyName,
//               "ID:",
//               companyId
//             );
//           }
//         }

//         // Step 3: Prepare basic form data
//         const basicFormData = {
//           contractName: contract.contractName || "",
//           companyId: companyId,
//           projectLocation: contract.projectLocation || "",
//           projectType: contract.projectType || "",
//           startDate: contract.startDate ? contract.startDate.split("T")[0] : "",
//           endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
//           employeeTimings:
//             contract.employeeTimings && contract.employeeTimings.length > 0
//               ? contract.employeeTimings.map((timing) => ({
//                   dayOfWeek: timing.dayOfWeek || "",
//                   dutyStartTime:
//                     convertTimeFromBackend(timing.dutyStartTime) || "09:00",
//                   dutyEndTime:
//                     convertTimeFromBackend(timing.dutyEndTime) || "17:00",
//                   offDutyStartTime:
//                     convertTimeFromBackend(timing.offDutyStartTime) || "17:00",
//                   offDutyEndTime:
//                     convertTimeFromBackend(timing.offDutyEndTime) || "09:00",
//                 }))
//               : formData.employeeTimings,
//           services: [],
//           slaRules: [], // Start with empty, will be populated by auto-generation
//         };

//         // Step 4: Set initial form data
//         setFormData(basicFormData);

//         // Step 5: Process services sequentially
//         if (contract.services && contract.services.length > 0) {
//           await processServices(contract.services, servicesData, slaTypesData);
//         }
//       } catch (err) {
//         console.error("Error fetching contract data:", err);
//         setError("Failed to load contract data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [contractId, createOriginalSlaRulesMap, createOriginalServiceScopesSet]);

//   // Process services sequentially to avoid race conditions
//   const processServices = async (
//     contractServices,
//     servicesData,
//     slaTypesData
//   ) => {
//     try {
//       const processedServices = [];

//       for (const serviceFromContract of contractServices) {
//         // Find service by name
//         const serviceMatch = servicesData.find(
//           (s) => s.serviceName === serviceFromContract.serviceName
//         );
//         if (!serviceMatch) continue;

//         const serviceId = serviceMatch.serviceId.toString();
//         console.log(
//           `Processing service: ${serviceFromContract.serviceName} (ID: ${serviceId})`
//         );

//         // Load subservices for this service
//         let subServicesList = [];
//         try {
//           const subServicesRes = await contractService.getSubServices(
//             serviceId
//           );
//           subServicesList = Array.isArray(subServicesRes.data)
//             ? subServicesRes.data
//             : [];
//           setSubServices((prev) => ({ ...prev, [serviceId]: subServicesList }));
//           console.log(
//             `Loaded ${subServicesList.length} subservices for service ${serviceId}`
//           );
//         } catch (err) {
//           console.error(
//             `Failed to load subservices for service ${serviceId}:`,
//             err
//           );
//         }

//         const processedSubServices = [];

//         // Process each subservice
//         if (
//           serviceFromContract.subServices &&
//           serviceFromContract.subServices.length > 0
//         ) {
//           for (const subServiceFromContract of serviceFromContract.subServices) {
//             // Find subservice by name
//             const subServiceMatch = subServicesList.find(
//               (ss) =>
//                 ss.subServiceName === subServiceFromContract.subServiceName
//             );
//             if (!subServiceMatch) {
//               processedSubServices.push({
//                 subServiceId: "",
//                 serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//               });
//               continue;
//             }

//             const subServiceId = subServiceMatch.subServiceId.toString();
//             console.log(
//               `Processing subservice: ${subServiceFromContract.subServiceName} (ID: ${subServiceId})`
//             );

//             // Load service scopes for this subservice
//             let scopesList = [];
//             try {
//               const scopesRes = await contractService.getServiceScopes(
//                 subServiceId
//               );
//               scopesList = Array.isArray(scopesRes.data) ? scopesRes.data : [];
//               setServiceScopes((prev) => ({
//                 ...prev,
//                 [subServiceId]: scopesList,
//               }));
//               console.log(
//                 `Loaded ${scopesList.length} scopes for subservice ${subServiceId}`
//               );
//             } catch (err) {
//               console.error(
//                 `Failed to load scopes for subservice ${subServiceId}:`,
//                 err
//               );
//             }

//             const processedScopes = [];

//             // Process each scope
//             if (
//               subServiceFromContract.serviceScopes &&
//               subServiceFromContract.serviceScopes.length > 0
//             ) {
//               for (const scopeFromContract of subServiceFromContract.serviceScopes) {
//                 // Find scope by name
//                 const scopeMatch = scopesList.find(
//                   (sc) => sc.scopeName === scopeFromContract.scopeName
//                 );
//                 if (!scopeMatch) {
//                   processedScopes.push({
//                     scopeId: "",
//                     slaTypeId: "",
//                     priorityId: "",
//                   });
//                   continue;
//                 }

//                 const scopeId = scopeMatch.scopeId.toString();
//                 console.log(
//                   `Processing scope: ${scopeFromContract.scopeName} (ID: ${scopeId})`
//                 );

//                 // Find SLA type by name
//                 const slaTypeMatch = slaTypesData.find(
//                   (st) => st.slaTypeName === scopeFromContract.slaTypeName
//                 );
//                 if (!slaTypeMatch) {
//                   processedScopes.push({
//                     scopeId,
//                     slaTypeId: "",
//                     priorityId: "",
//                   });
//                   continue;
//                 }

//                 const slaTypeId = slaTypeMatch.slaTypeId.toString();

//                 // Load priority levels for this SLA type
//                 let prioritiesList = [];
//                 try {
//                   const prioritiesRes = await contractService.getPriorityLevels(
//                     slaTypeId
//                   );
//                   prioritiesList = Array.isArray(prioritiesRes.data)
//                     ? prioritiesRes.data
//                     : [];
//                   setPriorityLevels((prev) => ({
//                     ...prev,
//                     [slaTypeId]: prioritiesList,
//                   }));
//                   console.log(
//                     `Loaded ${prioritiesList.length} priorities for SLA type ${slaTypeId}`
//                   );
//                 } catch (err) {
//                   console.error(
//                     `Failed to load priorities for SLA type ${slaTypeId}:`,
//                     err
//                   );
//                 }

//                 // Find priority by name
//                 const priorityMatch = prioritiesList.find(
//                   (p) => p.priorityName === scopeFromContract.priorityName
//                 );
//                 const priorityId = priorityMatch
//                   ? priorityMatch.priorityId.toString()
//                   : "";

//                 processedScopes.push({
//                   scopeId,
//                   slaTypeId,
//                   priorityId,
//                 });

//                 console.log(
//                   `Mapped scope: ${scopeFromContract.scopeName} -> ${scopeId}, SLA: ${scopeFromContract.slaTypeName} -> ${slaTypeId}, Priority: ${scopeFromContract.priorityName} -> ${priorityId}`
//                 );
//               }
//             }

//             if (processedScopes.length === 0) {
//               processedScopes.push({
//                 scopeId: "",
//                 slaTypeId: "",
//                 priorityId: "",
//               });
//             }

//             processedSubServices.push({
//               subServiceId,
//               serviceScopes: processedScopes,
//             });
//           }
//         }

//         if (processedSubServices.length === 0) {
//           processedSubServices.push({
//             subServiceId: "",
//             serviceScopes: [{ scopeId: "", slaTypeId: "", priorityId: "" }],
//           });
//         }

//         processedServices.push({
//           serviceId,
//           subServices: processedSubServices,
//         });
//       }

//       // Update form data with processed services
//       setFormData((prev) => ({
//         ...prev,
//         services:
//           processedServices.length > 0
//             ? processedServices
//             : [
//                 {
//                   serviceId: "",
//                   subServices: [
//                     {
//                       subServiceId: "",
//                       serviceScopes: [
//                         { scopeId: "", slaTypeId: "", priorityId: "" },
//                       ],
//                     },
//                   ],
//                 },
//               ],
//       }));

//       console.log("Finished processing services:", processedServices);
//     } catch (err) {
//       console.error("Error processing services:", err);
//     }
//   };

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

//       // Create a new array without the specific scope at scopeIndex
//       const currentScopes =
//         newFormData.services[serviceIndex].subServices[subServiceIndex]
//           .serviceScopes;
//       const updatedScopes = currentScopes.filter(
//         (_, idx) => idx !== scopeIndex
//       );

//       // If no scopes left, add a default empty scope
//       if (updatedScopes.length === 0) {
//         updatedScopes.push({ scopeId: "", slaTypeId: "", priorityId: "" });
//       }

//       // Update the serviceScopes array
//       newFormData.services[serviceIndex].subServices[
//         subServiceIndex
//       ].serviceScopes = updatedScopes;

//       console.log(
//         `Removed scope at index ${scopeIndex} from service ${serviceIndex}, subService ${subServiceIndex}`
//       );
//       console.log("Updated scopes:", updatedScopes);

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
//         errors[`resolutionTimeHours-${ruleIndex}`] =
//           "Valid resolution time required.";
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

//       console.log("Starting contract update process...");

//       // Prepare data for each endpoint according to backend expectations

//       // 1. Contract Details Update (matches ContractDetailsUpdateDTO)
//       const contractDetailsData = {
//         contractName: formData.contractName,
//         companyId: Number.parseInt(formData.companyId, 10),
//         projectLocation: formData.projectLocation,
//         projectType: formData.projectType,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//       };

//       // 2. Services Data (matches List<ContractRequestDTO.ContractServiceDTO>)
//       const servicesData = formData.services.map((service) => ({
//         serviceId: Number.parseInt(service.serviceId, 10),
//         subServices: service.subServices.map((subService) => ({
//           subServiceId: Number.parseInt(subService.subServiceId, 10),
//           serviceScopes: subService.serviceScopes.map((scope) => ({
//             scopeId: Number.parseInt(scope.scopeId, 10),
//             slaTypeId: Number.parseInt(scope.slaTypeId, 10),
//             priorityId: Number.parseInt(scope.priorityId, 10),
//           })),
//         })),
//       }));

//       // 3. Employee Timings Data (matches List<EmployeeTimingDTO>) - Convert to HH:mm:ss format
//       const timingsData = formData.employeeTimings.map((timing) => ({
//         dayOfWeek: timing.dayOfWeek,
//         dutyStartTime: convertTimeToBackend(timing.dutyStartTime),
//         dutyEndTime: convertTimeToBackend(timing.dutyEndTime),
//         offDutyStartTime: convertTimeToBackend(timing.offDutyStartTime),
//         offDutyEndTime: convertTimeToBackend(timing.offDutyEndTime),
//       }));

//       // 4. SLA Rules Data (matches List<SlaRuleDTO>)
//       const slaRulesData = formData.slaRules.map((rule, index) => ({
//         ruleId: rule.wasInOriginalContract && rule.ruleId ? rule.ruleId : null, // Only include ruleId for existing rules
//         slaTypeId: Number.parseInt(rule.slaTypeId, 10),
//         priorityId: Number.parseInt(rule.priorityId, 10),
//         responseTimeHours: Number.parseFloat(rule.responseTimeHours),
//         resolutionTimeHours: Number.parseFloat(rule.resolutionTimeHours),
//         scopeId: rule.scopeId ? Number.parseInt(rule.scopeId, 10) : null, // Include scopeId for backend reference
//         subServiceId: rule.subServiceId
//           ? Number.parseInt(rule.subServiceId, 10)
//           : null, // Include subServiceId for backend reference
//         uniqueKey: rule.uniqueKey || `rule-${index}`, // Include unique identifier
//       }));

//       console.log("Contract Details Data:", contractDetailsData);
//       console.log("Services Data:", servicesData);
//       console.log("Timings Data:", timingsData);
//       console.log("SLA Rules Data:", slaRulesData);

//       // Update each section sequentially with proper error handling
//       try {
//         console.log("Updating contract details...");
//         await contractService.updateContractDetails(
//           contractId,
//           contractDetailsData
//         );
//         console.log("Contract details updated successfully");
//       } catch (detailsError) {
//         console.error("Failed to update contract details:", detailsError);
//         throw new Error(
//           `Failed to update contract details: ${
//             detailsError.response?.data?.message || detailsError.message
//           }`
//         );
//       }

//       try {
//         console.log("Updating contract services...");
//         await contractService.updateContractServices(contractId, servicesData);
//         console.log("Contract services updated successfully");
//       } catch (servicesError) {
//         console.error("Failed to update contract services:", servicesError);
//         throw new Error(
//           `Failed to update contract services: ${
//             servicesError.response?.data?.message || servicesError.message
//           }`
//         );
//       }

//       try {
//         console.log("Updating employee timings...");
//         await contractService.updateEmployeeTimings(contractId, timingsData);
//         console.log("Employee timings updated successfully");
//       } catch (timingsError) {
//         console.error("Failed to update employee timings:", timingsError);
//         throw new Error(
//           `Failed to update employee timings: ${
//             timingsError.response?.data?.message || timingsError.message
//           }`
//         );
//       }

//       try {
//         console.log("Updating SLA rules...");
//         await contractService.updateSlaRules(contractId, slaRulesData);
//         console.log("SLA rules updated successfully");
//       } catch (slaError) {
//         console.error("Failed to update SLA rules:", slaError);
//         throw new Error(
//           `Failed to update SLA rules: ${
//             slaError.response?.data?.message || slaError.message
//           }`
//         );
//       }

//       console.log("All updates completed successfully");
//       setSuccessMessage("Contract updated successfully!");
//       setTimeout(() => {
//         navigate("/contracts/list", {
//           state: { success: "Contract updated successfully!" },
//         });
//       }, 2000);
//     } catch (updateError) {
//       console.error("Update error details:", updateError);
//       console.error("Error response:", updateError.response);

//       if (updateError.response?.status === 403) {
//         setError(
//           `Access denied when updating contract.

//           This might be due to:
//           1. Insufficient permissions for contract ID ${contractId}
//           2. Contract ownership restrictions
//           3. Backend authorization configuration

//           Please contact your administrator with this information:
//           - User: superadmin
//           - Contract ID: ${contractId}
//           - Error: ${updateError.message}
//           - Required permission: update_contract`
//         );
//       } else if (updateError.response?.status === 401) {
//         setError(
//           "Authentication failed. Please log in again and try updating the contract."
//         );
//       } else if (updateError.response?.status === 404) {
//         setError(
//           "Contract not found. It may have been deleted or moved. Please refresh and try again."
//         );
//       } else {
//         setError(
//           "Failed to update contract: " +
//             (updateError.response?.data?.message ||
//               updateError.message ||
//               "Unknown error occurred")
//         );
//       }
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

//   // Helper functions to get display names
//   const getServiceName = (serviceId) => {
//     const service = services.find(
//       (s) => s.serviceId.toString() === serviceId.toString()
//     );
//     return service ? service.serviceName : `Service ${serviceId}`;
//   };

//   const getSubServiceName = (serviceId, subServiceId) => {
//     const subServiceList = subServices[serviceId] || [];
//     const subService = subServiceList.find(
//       (ss) => ss.subServiceId.toString() === subServiceId.toString()
//     );
//     return subService
//       ? subService.subServiceName
//       : `SubService ${subServiceId}`;
//   };

//   const getScopeName = (subServiceId, scopeId) => {
//     const scopeList = serviceScopes[subServiceId] || [];
//     const scope = scopeList.find(
//       (sc) => sc.scopeId.toString() === scopeId.toString()
//     );
//     return scope ? scope.scopeName : `Scope ${scopeId}`;
//   };

//   const getSlaTypeName = (slaTypeId) => {
//     const slaType = slaTypes.find(
//       (st) => st.slaTypeId.toString() === slaTypeId.toString()
//     );
//     return slaType ? slaType.slaTypeName : `SLA Type ${slaTypeId}`;
//   };

//   const getPriorityName = (slaTypeId, priorityId) => {
//     const priorityList = priorityLevels[slaTypeId] || [];
//     const priority = priorityList.find(
//       (p) => p.priorityId.toString() === priorityId.toString()
//     );
//     return priority ? priority.priorityName : `Priority ${priorityId}`;
//   };

//   const getCompanyName = (companyId) => {
//     const company = companies.find(
//       (c) => c.companyId.toString() === companyId.toString()
//     );
//     return company ? company.companyName : `Company ${companyId}`;
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
//         <p className="text-lg font-medium whitespace-pre-line">{error}</p>
//         <div className="mt-4 space-x-2">
//           <button
//             onClick={() => navigate("/contracts/list")}
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//           >
//             Back to Contracts
//           </button>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4 py-6 w-full bg-white rounded-lg shadow-lg mt-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-2xl font-bold text-gray-800">Update Contract</h3>
//         <button
//           onClick={() => navigate("/contracts/list")}
//           className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
//         >
//           Back to Contracts
//         </button>
//       </div>

//       {successMessage && (
//         <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
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
//                     {service.serviceId && (
//                       <span className="ml-2 text-sm font-normal text-blue-600">
//                         ({getServiceName(service.serviceId)})
//                       </span>
//                     )}
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
//                             {subService.subServiceId && (
//                               <span className="ml-2 text-sm font-normal text-gray-500">
//                                 (
//                                 {getSubServiceName(
//                                   service.serviceId,
//                                   subService.subServiceId
//                                 )}
//                                 )
//                               </span>
//                             )}
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
//                                       {scope.scopeId && (
//                                         <span className="ml-2 text-xs font-normal text-gray-500">
//                                           (
//                                           {getScopeName(
//                                             subService.subServiceId,
//                                             scope.scopeId
//                                           )}
//                                           )
//                                         </span>
//                                       )}
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
//                         {/* Original Values Reference - Show only for rules that actually existed in original contract */}
//                         {rule.originalValues && rule.wasInOriginalContract && (
//                           <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
//                             <div className="flex items-center mb-2">
//                               <InformationCircleIcon className="h-4 w-4 text-yellow-600 mr-2" />
//                               <span className="text-sm font-medium text-yellow-800">
//                                 Original Contract Values (Reference)
//                               </span>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4 text-sm">
//                               <div>
//                                 <span className="text-yellow-700 font-medium">
//                                   Original Response Time:{" "}
//                                 </span>
//                                 <span className="text-yellow-900">
//                                   {rule.originalValues.responseTimeHours ||
//                                     "Not set"}{" "}
//                                   hours
//                                 </span>
//                               </div>
//                               <div>
//                                 <span className="text-yellow-700 font-medium">
//                                   Original Resolution Time:{" "}
//                                 </span>
//                                 <span className="text-yellow-900">
//                                   {rule.originalValues.resolutionTimeHours ||
//                                     "Not set"}{" "}
//                                   hours
//                                 </span>
//                               </div>
//                             </div>
//                             <p className="text-xs text-yellow-600 mt-2">
//                               These are the original values from your contract.
//                               The fields below are pre-filled with these values
//                               for easy editing.
//                             </p>
//                           </div>
//                         )}

//                         {/* Show indicator for newly added rules */}
//                         {!rule.wasInOriginalContract && (
//                           <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
//                             <div className="flex items-center mb-2">
//                               <InformationCircleIcon className="h-4 w-4 text-green-600 mr-2" />
//                               <span className="text-sm font-medium text-green-800">
//                                 New SLA Rule
//                               </span>
//                             </div>
//                             <p className="text-xs text-green-600">
//                               This is a newly added service scope. Please enter
//                               the response and resolution times.
//                             </p>
//                           </div>
//                         )}

//                         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                           <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Service Scope
//                             </label>
//                             <div className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 text-sm min-h-[40px] flex items-center">
//                               <span className="break-words">
//                                 {rule.scopeName ||
//                                   getScopeName(rule.subServiceId, rule.scopeId)}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               SLA Type
//                             </label>
//                             <div className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 text-sm min-h-[40px] flex items-center">
//                               <span className="break-words">
//                                 {rule.slaTypeName ||
//                                   getSlaTypeName(rule.slaTypeId)}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Priority Level
//                             </label>
//                             <div className="w-full p-2 border rounded-md border-gray-200 bg-gray-100 text-gray-600 text-sm min-h-[40px] flex items-center">
//                               <span className="break-words">
//                                 {rule.priorityName ||
//                                   getPriorityName(
//                                     rule.slaTypeId,
//                                     rule.priorityId
//                                   )}
//                               </span>
//                             </div>
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
//                     service scopes. Original values from your contract are shown
//                     for reference and pre-filled in the input fields for
//                     existing scopes. New scopes will require you to enter
//                     response and resolution times. Rules update automatically
//                     when you modify service scopes.
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
//                   Ready to Update Contract?
//                 </h6>
//                 <p className="text-xs text-gray-600">
//                   Review all the information above and click the button below to
//                   update your contract.
//                 </p>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 font-medium text-lg shadow-lg transition-all duration-200"
//               >
//                 Update Contract
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default UpdateContract;

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { companyService } from "../services/companyService";
import { contractService } from "../services/contractService";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
  InformationCircleIcon,
  BookmarkIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  CogIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const UpdateContract = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();
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
            serviceScopes: [{ scopeId: "" }],
          },
        ],
      },
    ],
    employeeTimings: [
      { dayOfWeek: "MONDAY", dutyStartTime: "09:00", dutyEndTime: "17:00" },
      { dayOfWeek: "TUESDAY", dutyStartTime: "09:00", dutyEndTime: "17:00" },
      { dayOfWeek: "WEDNESDAY", dutyStartTime: "09:00", dutyEndTime: "17:00" },
      { dayOfWeek: "THURSDAY", dutyStartTime: "09:00", dutyEndTime: "17:00" },
      { dayOfWeek: "FRIDAY", dutyStartTime: "09:00", dutyEndTime: "17:00" },
      { dayOfWeek: "SATURDAY", dutyStartTime: "09:00", dutyEndTime: "17:00" },
      { dayOfWeek: "SUNDAY", dutyStartTime: "09:00", dutyEndTime: "17:00" },
    ],
    slaRules: [],
  });

  // Reference data
  const [companies, setCompanies] = useState([]);
  const [services, setServices] = useState([]);
  const [slaTypes, setSlaTypes] = useState([]);

  // Dependent data
  const [subServices, setSubServices] = useState({});
  const [serviceScopes, setServiceScopes] = useState({});
  const [priorityLevels, setPriorityLevels] = useState({});

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [collapsedSections, setCollapsedSections] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  const [successMessage, setSuccessMessage] = useState(null);
  const [draftSaved, setDraftSaved] = useState(false);

  // Original contract data for reference
  const [originalContract, setOriginalContract] = useState(null);
  const [originalSlaRulesMap, setOriginalSlaRulesMap] = useState(new Map());

  // Draft functionality
  const DRAFT_KEY = `contract_update_draft_${contractId}`;

  const saveDraft = useCallback(() => {
    try {
      const draftData = {
        formData,
        timestamp: new Date().toISOString(),
        activeTab,
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
      setDraftSaved(true);

      // Clear the saved indicator after 3 seconds
      setTimeout(() => setDraftSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  }, [formData, activeTab, DRAFT_KEY]);

  // Helper function to convert time format from HH:mm:ss to HH:mm
  const convertTimeFromBackend = (timeString) => {
    if (!timeString) return "";
    // If it's already in HH:mm format, return as is
    if (timeString.length === 5) return timeString;
    // If it's in HH:mm:ss format, remove seconds
    return timeString.substring(0, 5);
  };

  // Helper function to convert time format from HH:mm to HH:mm:ss
  const convertTimeToBackend = (timeString) => {
    if (!timeString) return "";
    // If it's already in HH:mm:ss format, return as is
    if (timeString.length === 8) return timeString;
    // If it's in HH:mm format, add seconds
    return `${timeString}:00`;
  };

  // Create a map of original SLA rules for quick lookup by scope and SLA type/priority
  const createOriginalSlaRulesMap = useCallback((originalSlaRules) => {
    const map = new Map();

    if (originalSlaRules && Array.isArray(originalSlaRules)) {
      originalSlaRules.forEach((rule) => {
        // Create key using scopeId, slaTypeId, and priorityId
        const key = `${rule.scopeId}-${rule.slaTypeId}-${rule.priorityId}`;
        map.set(key, {
          responseTimeHours: rule.responseTimeHours?.toString() || "",
          resolutionTimeHours: rule.resolutionTimeHours?.toString() || "",
          ruleId: rule.ruleId || null,
        });
      });
    }

    return map;
  }, []);

  // Predefined SLA rules configuration
  const slaRulesConfig = [
    { slaTypeId: "1", priorityIds: ["1", "2", "3"] }, // CM: CM_P1, CM_P2, CM_P3
    { slaTypeId: "2", priorityIds: ["4"] }, // PM: PM_P4
    { slaTypeId: "3", priorityIds: ["5", "6", "7"] }, // RM: RM_P1, RM_P2, RM_P3
  ];

  // Generate SLA rules from service scopes with original values
  const generateSlaRulesFromScopes = useCallback(() => {
    const rules = [];
    const ruleCounter = 0;

    formData.services.forEach((service, serviceIndex) => {
      service.subServices.forEach((subService, subServiceIndex) => {
        subService.serviceScopes.forEach((scope, scopeIndex) => {
          if (scope.scopeId) {
            const scopeData = serviceScopes[subService.subServiceId]?.find(
              (s) => s.scopeId.toString() === scope.scopeId
            );

            // Generate rules for each SLA type and its priorities
            slaRulesConfig.forEach(
              ({ slaTypeId, priorityIds }, configIndex) => {
                priorityIds.forEach((priorityId) => {
                  const uniqueKey = `${serviceIndex}-${subServiceIndex}-${scopeIndex}-${slaTypeId}-${priorityId}-${scope.scopeId}`;

                  // Check if this rule existed in original contract
                  const originalRuleKey = `${scope.scopeId}-${slaTypeId}-${priorityId}`;

                  // Inside generateSlaRulesFromScopes, after:
                  const originalRule = originalSlaRulesMap.get(originalRuleKey);

                  // Add this debug log:
                  console.log("DEBUG SLA RULE ORIGINAL:", {
                    scopeId: scope.scopeId,
                    slaTypeId,
                    priorityId,
                    originalRule,
                    responseTime: originalRule?.responseTimeHours,
                    resolutionTime: originalRule?.resolutionTimeHours,
                  });

                  rules.push({
                    slaTypeId,
                    priorityId,
                    responseTimeHours: originalRule?.responseTimeHours || "",
                    resolutionTimeHours:
                      originalRule?.resolutionTimeHours || "",
                    scopeName: scopeData?.scopeName || `Scope ${scope.scopeId}`,
                    scopeId: scope.scopeId,
                    isFromServiceScope: true,
                    uniqueKey,
                    ruleId: originalRule?.ruleId || null,
                    hasOriginalValue: !!originalRule,
                    originalValues: originalRule
                      ? {
                          responseTimeHours: originalRule.responseTimeHours,
                          resolutionTimeHours: originalRule.resolutionTimeHours,
                        }
                      : null,
                  });
                });
              }
            );
          }
        });
      });
    });

    return rules;
  }, [formData.services, serviceScopes, originalSlaRulesMap]);

  // Update SLA rules when service scopes change
  const updateSlaRules = useCallback(() => {
    const newGeneratedRules = generateSlaRulesFromScopes();

    setFormData((prev) => {
      const existingAutoRulesMap = new Map();
      prev.slaRules
        .filter((rule) => rule.isFromServiceScope)
        .forEach((rule) => {
          existingAutoRulesMap.set(rule.uniqueKey, rule);
        });

      const updatedAutoRules = newGeneratedRules.map((newRule) => {
        const existingRule = existingAutoRulesMap.get(newRule.uniqueKey);
        return {
          ...newRule,
          responseTimeHours:
            existingRule?.responseTimeHours || newRule.responseTimeHours,
          resolutionTimeHours:
            existingRule?.resolutionTimeHours || newRule.resolutionTimeHours,
        };
      });

      return {
        ...prev,
        slaRules: updatedAutoRules,
      };
    });
  }, [generateSlaRulesFromScopes]);

  // Effect to update SLA rules when services or scopes change
  useEffect(() => {
    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Only update if we have some service scopes configured
    const hasConfiguredScopes = formData.services.some((service) =>
      service.subServices.some((subService) =>
        subService.serviceScopes.some((scope) => scope.scopeId)
      )
    );

    // Debounce the update to avoid too many calls
    updateTimeoutRef.current = setTimeout(() => {
      if (hasConfiguredScopes) {
        updateSlaRules();
      } else {
        // Clear auto-generated rules if no scopes are configured
        setFormData((prev) => ({
          ...prev,
          slaRules: prev.slaRules.filter((rule) => !rule.isFromServiceScope),
        }));
      }
    }, 500);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [
    formData.services,
    serviceScopes,
    slaTypes,
    priorityLevels,
    updateSlaRules,
  ]);

  // Effect to trigger SLA rules update when switching to SLA tab
  useEffect(() => {
    if (activeTab === "sla") {
      // Force update SLA rules when switching to SLA tab
      setTimeout(() => {
        updateSlaRules();
      }, 100);
    }
  }, [activeTab, updateSlaRules]);

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!contractId) {
          setError("Contract ID is required for updating.");
          return;
        }

        // Step 1: Load reference data and contract
        const [companiesRes, servicesRes, slaTypesRes, contractRes] =
          await Promise.all([
            companyService.getAllCompanies(),
            contractService.getServices(),
            contractService.getSlaTypes(),
            contractService.getContractById(contractId),
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
        const contract = contractRes.data;

        // Save reference data
        setCompanies(companiesData);
        setServices(servicesData);
        setSlaTypes(slaTypesData);
        setOriginalContract(contract);

        // Create original SLA rules map for quick lookup
        const originalSlaMap = createOriginalSlaRulesMap(contract.slaRules);
        setOriginalSlaRulesMap(originalSlaMap);

        // Fetch priority levels for all SLA types
        const priorityPromises = slaTypesData.map((slaType) =>
          contractService.getPriorityLevels(slaType.slaTypeId)
        );
        const priorityResponses = await Promise.all(priorityPromises);
        const priorityMap = {};
        slaTypesData.forEach((slaType, index) => {
          priorityMap[slaType.slaTypeId] = Array.isArray(
            priorityResponses[index].data
          )
            ? priorityResponses[index].data
            : [];
        });
        setPriorityLevels(priorityMap);

        // Step 2: Find company ID by name if needed
        let companyId = contract.companyId ? contract.companyId.toString() : "";
        if (!companyId && contract.companyName) {
          const company = companiesData.find(
            (c) => c.companyName === contract.companyName
          );
          if (company) {
            companyId = company.companyId.toString();
          }
        }

        // Step 3: Prepare basic form data
        const basicFormData = {
          contractName: contract.contractName || "",
          companyId: companyId,
          projectLocation: contract.projectLocation || "",
          projectType: contract.projectType || "",
          startDate: contract.startDate ? contract.startDate.split("T")[0] : "",
          endDate: contract.endDate ? contract.endDate.split("T")[0] : "",
          employeeTimings:
            contract.employeeTimings && contract.employeeTimings.length > 0
              ? contract.employeeTimings.map((timing) => ({
                  dayOfWeek: timing.dayOfWeek || "",
                  dutyStartTime:
                    convertTimeFromBackend(timing.dutyStartTime) || "09:00",
                  dutyEndTime:
                    convertTimeFromBackend(timing.dutyEndTime) || "17:00",
                }))
              : formData.employeeTimings,
          services: [],
          slaRules: [], // Start with empty, will be populated by auto-generation
        };

        // Step 4: Set initial form data
        setFormData(basicFormData);

        // Step 5: Process services sequentially
        if (contract.services && contract.services.length > 0) {
          await processServices(contract.services, servicesData, slaTypesData);
        }
      } catch (err) {
        console.error("Error fetching contract data:", err);
        setError("Failed to load contract data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [contractId, createOriginalSlaRulesMap]);

  // Process services sequentially to avoid race conditions
  const processServices = async (
    contractServices,
    servicesData,
    slaTypesData
  ) => {
    try {
      const processedServices = [];

      for (const serviceFromContract of contractServices) {
        // Find service by name
        const serviceMatch = servicesData.find(
          (s) => s.serviceName === serviceFromContract.serviceName
        );
        if (!serviceMatch) continue;

        const serviceId = serviceMatch.serviceId.toString();

        // Load subservices for this service
        let subServicesList = [];
        try {
          const subServicesRes = await contractService.getSubServices(
            serviceId
          );
          subServicesList = Array.isArray(subServicesRes.data)
            ? subServicesRes.data
            : [];
          setSubServices((prev) => ({ ...prev, [serviceId]: subServicesList }));
        } catch (err) {
          console.error(
            `Failed to load subservices for service ${serviceId}:`,
            err
          );
        }

        const processedSubServices = [];

        // Process each subservice
        if (
          serviceFromContract.subServices &&
          serviceFromContract.subServices.length > 0
        ) {
          for (const subServiceFromContract of serviceFromContract.subServices) {
            // Find subservice by name
            const subServiceMatch = subServicesList.find(
              (ss) =>
                ss.subServiceName === subServiceFromContract.subServiceName
            );
            if (!subServiceMatch) {
              processedSubServices.push({
                subServiceId: "",
                serviceScopes: [{ scopeId: "" }],
              });
              continue;
            }

            const subServiceId = subServiceMatch.subServiceId.toString();

            // Load service scopes for this subservice
            let scopesList = [];
            try {
              const scopesRes = await contractService.getServiceScopes(
                subServiceId
              );
              scopesList = Array.isArray(scopesRes.data) ? scopesRes.data : [];
              setServiceScopes((prev) => ({
                ...prev,
                [subServiceId]: scopesList,
              }));
            } catch (err) {
              console.error(
                `Failed to load scopes for subservice ${subServiceId}:`,
                err
              );
            }

            const processedScopes = [];

            // Process each scope
            if (
              subServiceFromContract.serviceScopes &&
              subServiceFromContract.serviceScopes.length > 0
            ) {
              for (const scopeFromContract of subServiceFromContract.serviceScopes) {
                // Find scope by name
                const scopeMatch = scopesList.find(
                  (sc) => sc.scopeName === scopeFromContract.scopeName
                );
                if (!scopeMatch) {
                  processedScopes.push({ scopeId: "" });
                  continue;
                }

                const scopeId = scopeMatch.scopeId.toString();

                processedScopes.push({ scopeId });
              }
            }

            if (processedScopes.length === 0) {
              processedScopes.push({ scopeId: "" });
            }

            processedSubServices.push({
              subServiceId,
              serviceScopes: processedScopes,
            });
          }
        }

        if (processedSubServices.length === 0) {
          processedSubServices.push({
            subServiceId: "",
            serviceScopes: [{ scopeId: "" }],
          });
        }

        processedServices.push({
          serviceId,
          subServices: processedSubServices,
        });
      }

      // Update form data with processed services
      setFormData((prev) => ({
        ...prev,
        services:
          processedServices.length > 0
            ? processedServices
            : [
                {
                  serviceId: "",
                  subServices: [
                    { subServiceId: "", serviceScopes: [{ scopeId: "" }] },
                  ],
                },
              ],
      }));
    } catch (err) {
      console.error("Error processing services:", err);
    }
  };

  // Improved validation - only show errors when needed
  const validateField = (name, value) => {
    const errors = {};

    // Only validate required fields if they are empty
    if (name === "contractName" && !value.trim())
      errors.contractName = "Contract name is required.";
    if (name === "companyId" && !value)
      errors.companyId = "Company is required.";
    if (name === "projectType" && !value)
      errors.projectType = "Project type is required.";
    if (name === "startDate" && !value)
      errors.startDate = "Start date is required.";
    if (name === "endDate" && !value) errors.endDate = "End date is required.";

    // Time validation
    if (
      (name === "dutyStartTime" || name === "dutyEndTime") &&
      value &&
      !/^\d{2}:\d{2}$/.test(value)
    ) {
      errors[name] = "Valid time (HH:MM) required.";
    }

    // Number validation
    if (
      (name === "responseTimeHours" || name === "resolutionTimeHours") &&
      value !== "" &&
      (isNaN(value) || value < 0)
    ) {
      errors[name] = "Valid positive number required.";
    }

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
      } else if (serviceIndex !== undefined && subServiceIndex !== undefined) {
        newFormData.services[serviceIndex].subServices[subServiceIndex][name] =
          value;
        if (name === "subServiceId") {
          newFormData.services[serviceIndex].subServices[
            subServiceIndex
          ].serviceScopes = [{ scopeId: "" }];
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
            { subServiceId: "", serviceScopes: [{ scopeId: "" }] },
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
        newFormData.slaRules[ruleIndex][name] = value;
      } else {
        newFormData[name] = value;
      }

      return newFormData;
    });

    // Clear validation errors when user corrects the field
    const errors = validateField(name, value);
    if (Object.keys(errors).length === 0) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
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
          subServices: [{ subServiceId: "", serviceScopes: [{ scopeId: "" }] }],
        },
      ],
    }));
  };

  const addSubService = (serviceIndex) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      newFormData.services[serviceIndex].subServices.push({
        subServiceId: "",
        serviceScopes: [{ scopeId: "" }],
      });
      return newFormData;
    });
  };

  const addServiceScope = (serviceIndex, subServiceIndex) => {
    setFormData((prev) => {
      const newFormData = { ...prev };
      newFormData.services[serviceIndex].subServices[
        subServiceIndex
      ].serviceScopes.push({ scopeId: "" });
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
                  { subServiceId: "", serviceScopes: [{ scopeId: "" }] },
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
          { subServiceId: "", serviceScopes: [{ scopeId: "" }] },
        ];
      }
      return newFormData;
    });
  };

  const removeServiceScope = (serviceIndex, subServiceIndex, scopeIndex) => {
    setFormData((prev) => {
      const newFormData = { ...prev };

      // Create a new array without the specific scope at scopeIndex
      const currentScopes =
        newFormData.services[serviceIndex].subServices[subServiceIndex]
          .serviceScopes;
      const updatedScopes = currentScopes.filter(
        (_, idx) => idx !== scopeIndex
      );

      // If no scopes left, add a default empty scope
      if (updatedScopes.length === 0) {
        updatedScopes.push({ scopeId: "" });
      }

      // Update the serviceScopes array
      newFormData.services[serviceIndex].subServices[
        subServiceIndex
      ].serviceScopes = updatedScopes;

      return newFormData;
    });
  };

  // Validate entire form before submission
  const validateFormData = () => {
    const errors = {};

    // Basic validation
    if (!formData.contractName.trim())
      errors.contractName = "Contract name is required.";
    if (!formData.companyId) errors.companyId = "Company is required.";
    if (!formData.projectType) errors.projectType = "Project type is required.";
    if (!formData.startDate) errors.startDate = "Start date is required.";
    if (!formData.endDate) errors.endDate = "End date is required.";

    // Services validation
    formData.services.forEach((service, serviceIndex) => {
      if (!service.serviceId)
        errors[`service-${serviceIndex}`] = "Service is required.";

      service.subServices.forEach((subService, subServiceIndex) => {
        if (!subService.subServiceId)
          errors[`subService-${serviceIndex}-${subServiceIndex}`] =
            "Sub-service is required.";

        subService.serviceScopes.forEach((scope, scopeIndex) => {
          if (!scope.scopeId)
            errors[`scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`] =
              "Scope is required.";
        });
      });
    });

    // Employee timings validation
    formData.employeeTimings.forEach((timing, timingIndex) => {
      if (!/^\d{2}:\d{2}$/.test(timing.dutyStartTime))
        errors[`dutyStartTime-${timingIndex}`] =
          "Valid time format (HH:MM) required.";
      if (!/^\d{2}:\d{2}$/.test(timing.dutyEndTime))
        errors[`dutyEndTime-${timingIndex}`] =
          "Valid time format (HH:MM) required.";
    });

    // SLA rules validation
    formData.slaRules.forEach((rule, ruleIndex) => {
      if (rule.responseTimeHours === "" || rule.responseTimeHours < 0)
        errors[`responseTimeHours-${ruleIndex}`] =
          "Valid response time required.";
      if (rule.resolutionTimeHours === "" || rule.resolutionTimeHours < 0)
        errors[`resolutionTimeHours-${ruleIndex}`] =
          "Valid resolution time required.";
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

      // Prepare data for each endpoint according to backend expectations

      // 1. Contract Details Update (matches ContractDetailsUpdateDTO)
      const contractDetailsData = {
        contractName: formData.contractName,
        companyId: Number.parseInt(formData.companyId, 10),
        projectLocation: formData.projectLocation,
        projectType: formData.projectType,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      // 2. Services Data (matches List<ContractRequestDTO.ContractServiceDTO>)
      const servicesData = formData.services.map((service) => ({
        serviceId: Number.parseInt(service.serviceId, 10),
        subServices: service.subServices.map((subService) => ({
          subServiceId: Number.parseInt(subService.subServiceId, 10),
          serviceScopes: subService.serviceScopes.map((scope) => ({
            scopeId: Number.parseInt(scope.scopeId, 10),
          })),
        })),
      }));

      // 3. Employee Timings Data (matches List<EmployeeTimingDTO>) - Convert to HH:mm:ss format
      const timingsData = formData.employeeTimings.map((timing) => ({
        dayOfWeek: timing.dayOfWeek,
        dutyStartTime: convertTimeToBackend(timing.dutyStartTime),
        dutyEndTime: convertTimeToBackend(timing.dutyEndTime),
      }));

      // 4. SLA Rules Data (matches List<SlaRuleDTO>)
      const slaRulesData = formData.slaRules.map((rule, index) => ({
        ruleId: rule.hasOriginalValue && rule.ruleId ? rule.ruleId : null, // Only include ruleId for existing rules
        responseTimeHours: Number.parseFloat(rule.responseTimeHours),
        resolutionTimeHours: Number.parseFloat(rule.resolutionTimeHours),
        scopeId: rule.scopeId ? Number.parseInt(rule.scopeId, 10) : null, // Include scopeId for backend reference
        slaTypeId: Number.parseInt(rule.slaTypeId, 10),
        priorityId: Number.parseInt(rule.priorityId, 10),
        uniqueKey: rule.uniqueKey || `rule-${index}`, // Include unique identifier
      }));

      // Update each section sequentially with proper error handling
      try {
        await contractService.updateContractDetails(
          contractId,
          contractDetailsData
        );
      } catch (detailsError) {
        throw new Error(
          `Failed to update contract details: ${
            detailsError.response?.data?.message || detailsError.message
          }`
        );
      }

      try {
        await contractService.updateContractServices(contractId, servicesData);
      } catch (servicesError) {
        throw new Error(
          `Failed to update contract services: ${
            servicesError.response?.data?.message || servicesError.message
          }`
        );
      }

      try {
        await contractService.updateEmployeeTimings(contractId, timingsData);
      } catch (timingsError) {
        throw new Error(
          `Failed to update employee timings: ${
            timingsError.response?.data?.message || timingsError.message
          }`
        );
      }

      try {
        await contractService.updateSlaRules(contractId, slaRulesData);
      } catch (slaError) {
        throw new Error(
          `Failed to update SLA rules: ${
            slaError.response?.data?.message || slaError.message
          }`
        );
      }

      setSuccessMessage("Contract updated successfully!");
      setTimeout(() => {
        navigate("/contracts/list", {
          state: { success: "Contract updated successfully!" },
        });
      }, 2000);
    } catch (updateError) {
      console.error("Update error details:", updateError);

      if (updateError.response?.status === 403) {
        setError(
          `Access denied when updating contract. Please contact your administrator with this information: Contract ID: ${contractId}, Error: ${updateError.message}`
        );
      } else if (updateError.response?.status === 401) {
        setError(
          "Authentication failed. Please log in again and try updating the contract."
        );
      } else if (updateError.response?.status === 404) {
        setError(
          "Contract not found. It may have been deleted or moved. Please refresh and try again."
        );
      } else {
        setError(
          "Failed to update contract: " +
            (updateError.response?.data?.message ||
              updateError.message ||
              "Unknown error occurred")
        );
      }
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

  // Helper functions to get display names
  const getServiceName = (serviceId) => {
    const service = services.find(
      (s) => s.serviceId.toString() === serviceId.toString()
    );
    return service ? service.serviceName : `Service ${serviceId}`;
  };

  const getSubServiceName = (serviceId, subServiceId) => {
    const subServiceList = subServices[serviceId] || [];
    const subService = subServiceList.find(
      (ss) => ss.subServiceId.toString() === subServiceId.toString()
    );
    return subService
      ? subService.subServiceName
      : `SubService ${subServiceId}`;
  };

  const getScopeName = (subServiceId, scopeId) => {
    const scopeList = serviceScopes[subServiceId] || [];
    const scope = scopeList.find(
      (sc) => sc.scopeId.toString() === scopeId.toString()
    );
    return scope ? scope.scopeName : `Scope ${scopeId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Contract for Update
          </h3>
          <p className="text-gray-600">
            Please wait while we prepare the contract data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Contract
          </h3>
          <p className="text-gray-600 mb-6 whitespace-pre-line">{error}</p>
          <div className="space-x-2">
            <button
              onClick={() => navigate("/contracts/list")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Back to Contracts
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header with Save Draft Button */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Update Contract
              </h1>
              <p className="text-gray-600 mt-2">
                Modify contract details, services, timings, and SLA rules
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {draftSaved && (
                <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg animate-fade-in">
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  <span className="font-medium">Draft Saved</span>
                </div>
              )}
              <button
                onClick={saveDraft}
                className="flex items-center bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <BookmarkIcon className="w-5 h-5 mr-2" />
                Save Draft
              </button>
              <button
                onClick={() => navigate("/contracts/list")}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Back to Contracts
              </button>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 rounded-r-xl shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">
                  {successMessage}
                </h3>
                <p className="text-green-700 text-sm">
                  Redirecting to contracts list...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Validation Errors */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-r-xl shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Please fix the following errors:
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <ul className="space-y-1">
                    {Object.values(validationErrors)
                      .slice(0, 3)
                      .map((error, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                          {error}
                        </li>
                      ))}
                    {Object.values(validationErrors).length > 3 && (
                      <li className="flex items-center text-red-600">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                        And {Object.values(validationErrors).length - 3} more
                        errors...
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                {
                  id: "basic",
                  label: "Basic Information",
                  icon: DocumentTextIcon,
                  color: "blue",
                },
                {
                  id: "services",
                  label: "Services",
                  icon: CogIcon,
                  color: "green",
                },
                {
                  id: "timings",
                  label: "Employee Timings",
                  icon: ClockIcon,
                  color: "purple",
                },
                {
                  id: "sla",
                  label: "SLA Rules",
                  icon: ChartBarIcon,
                  color: "orange",
                },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 flex items-center ${
                      activeTab === tab.id
                        ? `border-${tab.color}-500 text-${tab.color}-600 bg-${tab.color}-50`
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                    {tab.id === "sla" && autoGeneratedRules.length > 0 && (
                      <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {autoGeneratedRules.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            {activeTab === "basic" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <BuildingOfficeIcon className="w-6 h-6 mr-3 text-blue-600" />
                    Contract Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                        Contract Name *
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
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                          validationErrors.contractName
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-200"
                        } focus:ring-4 focus:outline-none`}
                        placeholder="Enter contract name"
                      />
                      {validationErrors.contractName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {validationErrors.contractName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                        Company *
                        <InformationCircleIcon
                          className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                          title="Select the company associated with this contract"
                        />
                      </label>
                      <select
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                          validationErrors.companyId
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-200"
                        } focus:ring-4 focus:outline-none`}
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
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {validationErrors.companyId}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
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
                        className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                        placeholder="Enter project location"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                        Project Type *
                        <InformationCircleIcon
                          className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                          title="Choose the contract duration type"
                        />
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                          validationErrors.projectType
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-200"
                        } focus:ring-4 focus:outline-none`}
                      >
                        <option value="">Select Project Type</option>
                        <option value="ANNUAL">Annual</option>
                        <option value="ONE_TIME">One Time</option>
                      </select>
                      {validationErrors.projectType && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {validationErrors.projectType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                        Start Date *
                        <CalendarIcon className="ml-2 h-4 w-4 text-gray-400" />
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                          validationErrors.startDate
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-200"
                        } focus:ring-4 focus:outline-none`}
                      />
                      {validationErrors.startDate && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {validationErrors.startDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                        End Date *
                        <CalendarIcon className="ml-2 h-4 w-4 text-gray-400" />
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                          validationErrors.endDate
                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-200"
                        } focus:ring-4 focus:outline-none`}
                      />
                      {validationErrors.endDate && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {validationErrors.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                    <CogIcon className="w-6 h-6 mr-3 text-green-600" />
                    Service Configuration
                  </h3>
                  <button
                    type="button"
                    onClick={addService}
                    className="flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Service
                  </button>
                </div>

                {formData.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100 overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between bg-gradient-to-r from-green-100 to-emerald-100 p-6 cursor-pointer hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
                      onClick={() => toggleCollapse("service", serviceIndex)}
                    >
                      <h4 className="text-lg font-semibold text-green-800 flex items-center">
                        <CogIcon className="w-5 h-5 mr-3" />
                        Service {serviceIndex + 1}
                        {service.serviceId && (
                          <span className="ml-3 text-sm bg-green-600 text-white px-3 py-1 rounded-full">
                            {getServiceName(service.serviceId)}
                          </span>
                        )}
                      </h4>
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 p-2 rounded-lg hover:bg-red-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeService(serviceIndex);
                          }}
                          disabled={formData.services.length === 1}
                          title="Remove Service"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        {collapsedSections[`service-${serviceIndex}`] ? (
                          <ChevronUpIcon className="h-5 w-5 text-green-600" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </div>

                    {!collapsedSections[`service-${serviceIndex}`] && (
                      <div className="p-6 space-y-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700 flex items-center">
                            Service *
                            <InformationCircleIcon
                              className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                              title="Select the main service category"
                            />
                          </label>
                          <select
                            name="serviceId"
                            value={service.serviceId}
                            onChange={(e) => handleChange(e, serviceIndex)}
                            className={`w-full p-4 border-2 rounded-xl transition-all duration-200 ${
                              validationErrors[`service-${serviceIndex}`]
                                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-200 bg-white focus:border-green-500 focus:ring-green-200"
                            } focus:ring-4 focus:outline-none`}
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
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                              {validationErrors[`service-${serviceIndex}`]}
                            </p>
                          )}
                        </div>

                        {/* Sub-services */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="text-md font-semibold text-gray-700">
                              Sub-Services
                            </h5>
                            <button
                              type="button"
                              onClick={() => addSubService(serviceIndex)}
                              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                            >
                              <PlusIcon className="h-4 w-4 mr-1" />
                              Add Sub-Service
                            </button>
                          </div>

                          {service.subServices.map(
                            (subService, subServiceIndex) => (
                              <div
                                key={subServiceIndex}
                                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                              >
                                <div
                                  className="flex items-center justify-between bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                  onClick={() =>
                                    toggleCollapse(
                                      "subService",
                                      serviceIndex,
                                      subServiceIndex
                                    )
                                  }
                                >
                                  <h6 className="text-md font-medium text-gray-700 flex items-center">
                                    <span className="bg-gray-200 p-1 rounded mr-2">
                                      🔹
                                    </span>
                                    Sub-Service {subServiceIndex + 1}
                                    {subService.subServiceId && (
                                      <span className="ml-2 text-xs bg-gray-600 text-white px-2 py-1 rounded-full">
                                        {getSubServiceName(
                                          service.serviceId,
                                          subService.subServiceId
                                        )}
                                      </span>
                                    )}
                                  </h6>
                                  <div className="flex items-center space-x-2">
                                    <button
                                      type="button"
                                      className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 p-1 rounded hover:bg-red-100 transition-colors"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        removeSubService(
                                          serviceIndex,
                                          subServiceIndex
                                        );
                                      }}
                                      disabled={
                                        service.subServices.length === 1
                                      }
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
                                  <div className="p-4 space-y-4">
                                    <div className="space-y-2">
                                      <label className="block text-sm font-semibold text-gray-700 flex items-center">
                                        Sub-Service *
                                        <InformationCircleIcon
                                          className="ml-2 h-4 w-4 text-gray-400 cursor-help"
                                          title="Select a sub-service"
                                        />
                                      </label>
                                      <select
                                        name="subServiceId"
                                        value={subService.subServiceId}
                                        onChange={(e) =>
                                          handleChange(
                                            e,
                                            serviceIndex,
                                            subServiceIndex
                                          )
                                        }
                                        className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                                          validationErrors[
                                            `subService-${serviceIndex}-${subServiceIndex}`
                                          ]
                                            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                                            : "border-gray-200 bg-white focus:border-green-500 focus:ring-green-200"
                                        } focus:ring-4 focus:outline-none`}
                                        disabled={
                                          !service.serviceId ||
                                          !subServices[service.serviceId]
                                            ?.length
                                        }
                                      >
                                        <option value="">
                                          Select Sub-Service
                                        </option>
                                        {(
                                          subServices[service.serviceId] || []
                                        ).map((ss) => (
                                          <option
                                            key={ss.subServiceId}
                                            value={ss.subServiceId.toString()}
                                          >
                                            {ss.subServiceName}
                                          </option>
                                        ))}
                                      </select>
                                      {validationErrors[
                                        `subService-${serviceIndex}-${subServiceIndex}`
                                      ] && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center">
                                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                          {
                                            validationErrors[
                                              `subService-${serviceIndex}-${subServiceIndex}`
                                            ]
                                          }
                                        </p>
                                      )}
                                    </div>

                                    {/* Service Scopes */}
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <h6 className="text-sm font-semibold text-gray-700">
                                          Service Scopes
                                        </h6>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            addServiceScope(
                                              serviceIndex,
                                              subServiceIndex
                                            )
                                          }
                                          className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-xs"
                                        >
                                          <PlusIcon className="h-3 w-3 mr-1" />
                                          Add Scope
                                        </button>
                                      </div>

                                      {subService.serviceScopes.map(
                                        (scope, scopeIndex) => (
                                          <div
                                            key={scopeIndex}
                                            className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                                          >
                                            <div className="flex items-center justify-between mb-3">
                                              <h6 className="text-sm font-medium text-blue-800 flex items-center">
                                                <span className="bg-blue-200 p-1 rounded mr-2">
                                                  🎯
                                                </span>
                                                Scope {scopeIndex + 1}
                                                {scope.scopeId && (
                                                  <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                                                    {getScopeName(
                                                      subService.subServiceId,
                                                      scope.scopeId
                                                    )}
                                                  </span>
                                                )}
                                              </h6>
                                              <button
                                                type="button"
                                                className="text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 p-1 rounded hover:bg-red-100 transition-colors"
                                                onClick={() =>
                                                  removeServiceScope(
                                                    serviceIndex,
                                                    subServiceIndex,
                                                    scopeIndex
                                                  )
                                                }
                                                disabled={
                                                  subService.serviceScopes
                                                    .length === 1
                                                }
                                                title="Remove Scope"
                                              >
                                                <TrashIcon className="h-4 w-4" />
                                              </button>
                                            </div>

                                            <div className="space-y-2">
                                              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                                                Service Scope *
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
                                                className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                                                  validationErrors[
                                                    `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                                  ]
                                                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                                                    : "border-blue-300 bg-white focus:border-blue-500 focus:ring-blue-200"
                                                } focus:ring-4 focus:outline-none`}
                                                disabled={
                                                  !subService.subServiceId ||
                                                  !serviceScopes[
                                                    subService.subServiceId
                                                  ]?.length
                                                }
                                              >
                                                <option value="">
                                                  Select Scope
                                                </option>
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
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                                  {
                                                    validationErrors[
                                                      `scope-${serviceIndex}-${subServiceIndex}-${scopeIndex}`
                                                    ]
                                                  }
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "timings" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <ClockIcon className="w-6 h-6 mr-3 text-purple-600" />
                    Employee Working Hours
                  </h3>

                  <div className="grid gap-4">
                    {formData.employeeTimings.map((timing, timingIndex) => (
                      <div
                        key={timingIndex}
                        className="bg-white p-6 rounded-xl shadow-md border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center">
                          <div className="bg-purple-100 p-3 rounded-lg mr-4">
                            <span className="text-purple-600 font-semibold">
                              {timing.dayOfWeek.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {timing.dayOfWeek}
                            </h4>
                            <p className="text-sm text-gray-500">Working Day</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Duty Start Time
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
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                              validationErrors[`dutyStartTime-${timingIndex}`]
                                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-200 bg-white focus:border-purple-500 focus:ring-purple-200"
                            } focus:ring-4 focus:outline-none`}
                          />
                          {validationErrors[`dutyStartTime-${timingIndex}`] && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                              {validationErrors[`dutyStartTime-${timingIndex}`]}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Duty End Time
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
                            className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                              validationErrors[`dutyEndTime-${timingIndex}`]
                                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                                : "border-gray-200 bg-white focus:border-purple-500 focus:ring-purple-200"
                            } focus:ring-4 focus:outline-none`}
                          />
                          {validationErrors[`dutyEndTime-${timingIndex}`] && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                              {validationErrors[`dutyEndTime-${timingIndex}`]}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "sla" && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <ChartBarIcon className="w-6 h-6 mr-3 text-orange-600" />
                      Service Level Agreement Rules
                    </h3>
                    <div className="flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-lg">
                      <span className="bg-orange-200 text-orange-900 text-sm px-3 py-1 rounded-full mr-2 font-semibold">
                        {autoGeneratedRules.length}
                      </span>
                      <span className="text-sm font-medium">
                        Auto-generated rules
                      </span>
                    </div>
                  </div>

                  {autoGeneratedRules.length > 0 ? (
                    <div className="space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <InformationCircleIcon className="h-6 w-6 text-blue-600 mr-3" />
                          <h4 className="text-lg font-semibold text-blue-800">
                            SLA Rules Update Information
                          </h4>
                        </div>
                        <p className="text-blue-700 mb-4">
                          These SLA rules are automatically generated based on
                          your service scopes. Original values from your
                          contract are pre-filled where available. You can
                          modify response and resolution times as needed.
                        </p>
                      </div>

                      {/* Group rules by scope - Same as ContractForm */}
                      {formData.services.map((service, serviceIndex) =>
                        service.subServices.map((subService, subServiceIndex) =>
                          subService.serviceScopes.map((scope, scopeIndex) => {
                            const scopeRules = autoGeneratedRules.filter(
                              (rule) => rule.scopeId === scope.scopeId
                            );
                            if (!scopeRules.length) return null;

                            return (
                              <div
                                key={`${serviceIndex}-${subServiceIndex}-${scopeIndex}`}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                              >
                                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 border-b border-gray-200">
                                  <h5 className="text-lg font-semibold text-indigo-800 flex items-center">
                                    <span className="bg-indigo-200 p-2 rounded-lg mr-3">
                                      🎯
                                    </span>
                                    {scopeRules[0].scopeName}
                                  </h5>
                                  <p className="text-indigo-600 text-sm mt-2">
                                    Service:{" "}
                                    {services.find(
                                      (s) =>
                                        s.serviceId.toString() ===
                                        service.serviceId
                                    )?.serviceName || "Unknown"}{" "}
                                    → Sub-Service:{" "}
                                    {subServices[service.serviceId]?.find(
                                      (ss) =>
                                        ss.subServiceId.toString() ===
                                        subService.subServiceId
                                    )?.subServiceName || "Unknown"}
                                  </p>
                                </div>

                                <div className="p-6">
                                  <div className="grid gap-4">
                                    {scopeRules.map((rule, ruleIndex) => {
                                      const actualIndex =
                                        formData.slaRules.findIndex(
                                          (r) => r === rule
                                        );
                                      const slaType = slaTypes.find(
                                        (sla) =>
                                          sla.slaTypeId.toString() ===
                                          rule.slaTypeId
                                      );
                                      const priority = priorityLevels[
                                        rule.slaTypeId
                                      ]?.find(
                                        (pl) =>
                                          pl.priorityId.toString() ===
                                          rule.priorityId
                                      );

                                      return (
                                        <div
                                          key={actualIndex}
                                          className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border-l-4 border-blue-400 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                          {/* Show original values if they exist */}
                                          {rule.hasOriginalValue &&
                                            rule.originalValues && (
                                              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                                <div className="flex items-center mb-2">
                                                  <InformationCircleIcon className="h-4 w-4 text-yellow-600 mr-2" />
                                                  <span className="text-sm font-medium text-yellow-800">
                                                    Original Values
                                                  </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                  <div>
                                                    <span className="text-yellow-700 font-medium">
                                                      Response:{" "}
                                                    </span>
                                                    <span className="text-yellow-900">
                                                      {rule.originalValues
                                                        .responseTimeHours ||
                                                        "Not set"}{" "}
                                                      hours
                                                    </span>
                                                  </div>
                                                  <div>
                                                    <span className="text-yellow-700 font-medium">
                                                      Resolution:{" "}
                                                    </span>
                                                    <span className="text-yellow-900">
                                                      {rule.originalValues
                                                        .resolutionTimeHours ||
                                                        "Not set"}{" "}
                                                      hours
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            )}

                                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                            <div className="space-y-2">
                                              <label className="block text-sm font-semibold text-gray-700">
                                                SLA Type
                                              </label>
                                              <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-lg font-medium text-center">
                                                {slaType?.slaTypeName ||
                                                  "Unknown"}
                                              </div>
                                            </div>

                                            <div className="space-y-2">
                                              <label className="block text-sm font-semibold text-gray-700">
                                                Priority Level
                                              </label>
                                              <div className="bg-purple-100 text-purple-800 px-4 py-3 rounded-lg font-medium text-center">
                                                {priority?.priorityName ||
                                                  "Unknown"}
                                              </div>
                                            </div>

                                            <div className="space-y-2">
                                              <label className="block text-sm font-semibold text-gray-700">
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
                                                className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                                                  validationErrors[
                                                    `responseTimeHours-${actualIndex}`
                                                  ]
                                                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                                                    : "border-blue-300 bg-white focus:border-blue-500 focus:ring-blue-200"
                                                } focus:ring-4 focus:outline-none`}
                                                step="0.1"
                                                min="0"
                                                placeholder="Enter hours"
                                              />
                                              {validationErrors[
                                                `responseTimeHours-${actualIndex}`
                                              ] && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                                  {
                                                    validationErrors[
                                                      `responseTimeHours-${actualIndex}`
                                                    ]
                                                  }
                                                </p>
                                              )}
                                            </div>

                                            <div className="space-y-2">
                                              <label className="block text-sm font-semibold text-gray-700">
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
                                                className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${
                                                  validationErrors[
                                                    `resolutionTimeHours-${actualIndex}`
                                                  ]
                                                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200"
                                                    : "border-blue-300 bg-white focus:border-blue-500 focus:ring-blue-200"
                                                } focus:ring-4 focus:outline-none`}
                                                step="0.1"
                                                min="0"
                                                placeholder="Enter hours"
                                              />
                                              {validationErrors[
                                                `resolutionTimeHours-${actualIndex}`
                                              ] && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
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
                                </div>
                              </div>
                            );
                          })
                        )
                      )}

                      {/* Submit Button - Only in SLA Rules Tab */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6">
                          <h6 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                            <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                            Ready to Update Your Contract?
                          </h6>
                          <p className="text-gray-600">
                            Review all the changes above and click the button
                            below to update your contract.
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <CheckCircleIcon className="w-6 h-6 mr-3" />
                          Update Contract
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="bg-gray-100 rounded-2xl p-8 max-w-md mx-auto">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <InformationCircleIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                          No SLA Rules Generated Yet
                        </h4>
                        <p className="text-gray-500 mb-4">
                          SLA rules will be automatically generated based on
                          your service scopes. Please configure service scopes
                          in the Services tab first.
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveTab("services")}
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Configure Services
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateContract;
