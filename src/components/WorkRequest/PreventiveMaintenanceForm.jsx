// "use client";
// import { useState, useEffect } from "react";
// import { Save, Shield } from "lucide-react";
// import { workRequestService } from "../../services/workRequestService";
// import { assetService } from "../../services/assetService";
// import { contractService } from "../../services/contractService";
// import { checklistService } from "../../services/checklistService";
// import { toast } from "react-toastify";

// const PreventiveMaintenanceForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     assetSchedules: [],
//     frequency: "DAYS_30",
//     contractId: "",
//     reasonComment: "",
//     startDate: "",
//     endDate: "",
//     name: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [contracts, setContracts] = useState([]);
//   const [assets, setAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(false);
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [checklists, setChecklists] = useState({});
//   const [loadingServiceScopes, setLoadingServiceScopes] = useState({});
//   const [loadingChecklists, setLoadingChecklists] = useState({});

//   const frequencyOptions = [
//     { value: "DAYS_1", label: "Every 1 Days" },
//     { value: "DAYS_30", label: "Every 30 Days" },
//     { value: "DAYS_60", label: "Every 60 Days" },
//     { value: "DAYS_90", label: "Every 90 Days" },
//     { value: "DAYS_120", label: "Every 120 Days" },
//     { value: "DAYS_180", label: "Every 180 Days" },
//   ];

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   useEffect(() => {
//     if (formData.contractId) {
//       loadAssets();
//     } else {
//       setAssets([]);
//       setFormData((prev) => ({ ...prev, assetSchedules: [] }));
//       setServiceScopes({});
//       setChecklists({});
//     }
//   }, [formData.contractId]);

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
//     setLoadingAssets(true);
//     try {
//       const response = await assetService.getAssetsByContract(
//         formData.contractId
//       );
//       setAssets(response.data || []);
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoadingAssets(false);
//     }
//   };

//   const loadServiceScopes = async (assetId) => {
//     setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: true }));
//     try {
//       // Use getAssetById instead of getAssetServiceScopes
//       const response = await assetService.getAssetById(assetId);
//       const asset = response.data;

//       // Extract all service scopes from sub-services
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

//       setServiceScopes((prev) => ({ ...prev, [assetId]: allServiceScopes }));
//     } catch (error) {
//       console.error(
//         `Error loading service scopes for asset ${assetId}:`,
//         error
//       );
//       toast.error(`Failed to load service scopes for asset ${assetId}`);
//     } finally {
//       setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: false }));
//     }
//   };

//   const loadChecklists = async (assetId, serviceScopeId) => {
//     setLoadingChecklists((prev) => ({ ...prev, [assetId]: true }));
//     try {
//       const response = await checklistService.getChecklistsByServiceScope(
//         serviceScopeId
//       );
//       setChecklists((prev) => ({ ...prev, [assetId]: response.data || [] }));
//     } catch (error) {
//       console.error(
//         `Error loading checklists for service scope ${serviceScopeId}:`,
//         error
//       );
//       toast.error(`Failed to load checklists for asset ${assetId}`);
//     } finally {
//       setLoadingChecklists((prev) => ({ ...prev, [assetId]: false }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAssetSelection = (assetId) => {
//     setFormData((prev) => {
//       const assetSchedules = prev.assetSchedules;
//       if (assetSchedules.some((as) => as.assetId === assetId)) {
//         return {
//           ...prev,
//           assetSchedules: assetSchedules.filter((as) => as.assetId !== assetId),
//         };
//       } else {
//         loadServiceScopes(assetId); // Load service scopes when asset is selected
//         return {
//           ...prev,
//           assetSchedules: [
//             ...assetSchedules,
//             { assetId, serviceScopeId: "", checklistId: "" },
//           ],
//         };
//       }
//     });
//   };

//   const handleServiceScopeChange = (assetId, serviceScopeId) => {
//     setFormData((prev) => ({
//       ...prev,
//       assetSchedules: prev.assetSchedules.map((as) =>
//         as.assetId === assetId ? { ...as, serviceScopeId, checklistId: "" } : as
//       ),
//     }));
//     if (serviceScopeId) {
//       loadChecklists(assetId, serviceScopeId);
//     } else {
//       setChecklists((prev) => ({ ...prev, [assetId]: [] }));
//     }
//   };

//   const handleChecklistChange = (assetId, checklistId) => {
//     setFormData((prev) => ({
//       ...prev,
//       assetSchedules: prev.assetSchedules.map((as) =>
//         as.assetId === assetId ? { ...as, checklistId } : as
//       ),
//     }));
//   };

//   const selectAllAssets = () => {
//     const newAssetSchedules = assets.map((asset) => ({
//       assetId: asset.assetId,
//       serviceScopeId: "",
//       checklistId: "",
//     }));
//     setFormData((prev) => ({ ...prev, assetSchedules: newAssetSchedules }));
//     assets.forEach((asset) => loadServiceScopes(asset.assetId));
//   };

//   const clearAllAssets = () => {
//     setFormData((prev) => ({ ...prev, assetSchedules: [] }));
//     setServiceScopes({});
//     setChecklists({});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name) {
//       toast.error("Please enter a schedule name");
//       return;
//     }
//     if (!formData.contractId) {
//       toast.error("Please select a contract");
//       return;
//     }
//     if (formData.assetSchedules.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }
//     if (!formData.startDate || !formData.endDate) {
//       toast.error("Please select start and end dates");
//       return;
//     }
//     if (new Date(formData.startDate) >= new Date(formData.endDate)) {
//       toast.error("End date must be after start date");
//       return;
//     }
//     for (const assetSchedule of formData.assetSchedules) {
//       if (!assetSchedule.serviceScopeId) {
//         toast.error(
//           `Please select a service scope for asset ID ${assetSchedule.assetId}`
//         );
//         return;
//       }
//       if (!assetSchedule.checklistId) {
//         toast.error(
//           `Please select a checklist for asset ID ${assetSchedule.assetId}`
//         );
//         return;
//       }
//     }
//     setLoading(true);
//     try {
//       await workRequestService.createPmSchedule(formData);
//       toast.success("Preventive maintenance schedule created successfully");
//       setFormData({
//         assetSchedules: [],
//         frequency: "DAYS_30",
//         contractId: "",
//         reasonComment: "",
//         startDate: "",
//         endDate: "",
//         name: "",
//       });
//       setServiceScopes({});
//       setChecklists({});
//       onBack();
//     } catch (error) {
//       console.error("Error creating PM schedule:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create PM schedule"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-md mb-4">
//           <Shield className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Preventive Plan Maintenance Work Request
//         </h2>
//         <p className="text-gray-600">
//           Create a preventive maintenance schedule for multiple assets
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Schedule Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Schedule Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Enter schedule name"
//               required
//             />
//           </div>
//           {/* Contract Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Contract <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="contractId"
//               value={formData.contractId}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             >
//               <option value="">Select Contract</option>
//               {contracts.map((contract) => (
//                 <option key={contract.contractId} value={contract.contractId}>
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Frequency <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="frequency"
//               value={formData.frequency}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             >
//               {frequencyOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Start Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Start Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             />
//           </div>
//           {/* End Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               End Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             />
//           </div>
//         </div>
//         {/* Reason Comment */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Reason/Comment
//           </label>
//           <textarea
//             name="reasonComment"
//             value={formData.reasonComment}
//             onChange={handleInputChange}
//             rows={3}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Describe the preventive maintenance plan..."
//           />
//         </div>
//         {/* Asset Selection */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Select Assets <span className="text-red-500">*</span>
//             </label>
//             {assets.length > 0 && (
//               <div className="flex gap-2">
//                 <button
//                   type="button"
//                   onClick={selectAllAssets}
//                   className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
//                 >
//                   Select All
//                 </button>
//                 <button
//                   type="button"
//                   onClick={clearAllAssets}
//                   className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Clear All
//                 </button>
//               </div>
//             )}
//           </div>
//           {loadingAssets ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//               <p className="text-gray-600 mt-2">Loading assets...</p>
//             </div>
//           ) : assets.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               {formData.contractId
//                 ? "No assets found for selected contract"
//                 : "Please select a contract first"}
//             </div>
//           ) : (
//             <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
//               {assets.map((asset) => {
//                 const isSelected = formData.assetSchedules.some(
//                   (as) => as.assetId === asset.assetId
//                 );
//                 const assetSchedule =
//                   formData.assetSchedules.find(
//                     (as) => as.assetId === asset.assetId
//                   ) || {};
//                 return (
//                   <div
//                     key={asset.assetId}
//                     className="p-3 border-b border-gray-100 last:border-b-0"
//                   >
//                     <label className="flex items-center hover:bg-gray-50 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={() => handleAssetSelection(asset.assetId)}
//                         className="mr-3 w-4 h-4 text-green-600 rounded focus:ring-green-500"
//                       />
//                       <div className="flex-1">
//                         <div className="font-medium text-gray-900">
//                           {asset.assetTag} - {asset.assetName}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {asset.buildingName}, {asset.floorName},{" "}
//                           {asset.roomName}
//                         </div>
//                       </div>
//                     </label>
//                     {isSelected && (
//                       <div className="mt-2 ml-7 space-y-2">
//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">
//                             Service Scope{" "}
//                             <span className="text-red-500">*</span>
//                           </label>
//                           {loadingServiceScopes[asset.assetId] ? (
//                             <div className="text-xs text-gray-600">
//                               Loading service scopes...
//                             </div>
//                           ) : (serviceScopes[asset.assetId] || []).length ===
//                             0 ? (
//                             <div className="text-xs text-gray-600">
//                               No service scopes available
//                             </div>
//                           ) : (
//                             <select
//                               value={assetSchedule.serviceScopeId || ""}
//                               onChange={(e) =>
//                                 handleServiceScopeChange(
//                                   asset.assetId,
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                             >
//                               <option value="">Select Service Scope</option>
//                               {(serviceScopes[asset.assetId] || []).map(
//                                 (scope) => (
//                                   <option
//                                     key={scope.scopeId}
//                                     value={scope.scopeId}
//                                   >
//                                     {scope.scopeName} ({scope.subServiceName})
//                                   </option>
//                                 )
//                               )}
//                             </select>
//                           )}
//                         </div>
//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">
//                             Checklist <span className="text-red-500">*</span>
//                           </label>
//                           {loadingChecklists[asset.assetId] ? (
//                             <div className="text-xs text-gray-600">
//                               Loading checklists...
//                             </div>
//                           ) : (
//                             <select
//                               value={assetSchedule.checklistId || ""}
//                               onChange={(e) =>
//                                 handleChecklistChange(
//                                   asset.assetId,
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                               disabled={!assetSchedule.serviceScopeId}
//                             >
//                               <option value="">Select Checklist</option>
//                               {(checklists[asset.assetId] || []).map(
//                                 (checklist) => (
//                                   <option
//                                     key={checklist.checklistId}
//                                     value={checklist.checklistId}
//                                   >
//                                     {checklist.name}
//                                   </option>
//                                 )
//                               )}
//                             </select>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//           {formData.assetSchedules.length > 0 && (
//             <p className="text-sm text-green-600 mt-2">
//               {formData.assetSchedules.length} asset(s) selected
//             </p>
//           )}
//         </div>
//         {/* Submit Button */}
//         <div className="flex gap-4 pt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create PM Schedule
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PreventiveMaintenanceForm;

// "use client";
// import { useState, useEffect } from "react";
// import { Save, Shield, Search } from "lucide-react";
// import { workRequestService } from "../../services/workRequestService";
// import { assetService } from "../../services/assetService";
// import { contractService } from "../../services/contractService";
// import { checklistService } from "../../services/checklistService";
// import { assetCategoryService } from "../../services/assetCategoryService";
// import { toast } from "react-toastify";

// const PreventiveMaintenanceForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     assetSchedules: [],
//     frequency: "DAYS_30",
//     contractId: "",
//     reasonComment: "",
//     startDate: "",
//     endDate: "",
//     name: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [contracts, setContracts] = useState([]);
//   const [allAssets, setAllAssets] = useState([]); // Store all assets from API
//   const [filteredAssets, setFilteredAssets] = useState([]); // Filtered assets for display
//   const [loadingAssets, setLoadingAssets] = useState(false);
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [checklists, setChecklists] = useState({});
//   const [loadingServiceScopes, setLoadingServiceScopes] = useState({});
//   const [loadingChecklists, setLoadingChecklists] = useState({});
//   const [categorySearchTerm, setCategorySearchTerm] = useState("");
//   const [assetSearchTerm, setAssetSearchTerm] = useState("");
//   const [assetCategories, setAssetCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   const frequencyOptions = [
//     { value: "DAYS_1", label: "Every 1 Day" },
//     { value: "DAYS_30", label: "Every 30 Days" },
//     { value: "DAYS_60", label: "Every 60 Days" },
//     { value: "DAYS_90", label: "Every 90 Days" },
//     { value: "DAYS_120", label: "Every 120 Days" },
//     { value: "DAYS_180", label: "Every 180 Days" },
//   ];

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     if (formData.contractId) {
//       loadAssets();
//     } else {
//       setAllAssets([]);
//       setFilteredAssets([]);
//       setFormData((prev) => ({ ...prev, assetSchedules: [] }));
//       setServiceScopes({});
//       setChecklists({});
//       setCategorySearchTerm("");
//       setAssetSearchTerm("");
//       setSelectedCategory(null);
//     }
//   }, [formData.contractId]);

//   useEffect(() => {
//     // Apply client-side filtering whenever category or asset name changes
//     if (searchTimeout) {
//       clearTimeout(searchTimeout);
//     }
//     setSearchTimeout(
//       setTimeout(() => {
//         filterAssets();
//       }, 500)
//     );
//   }, [allAssets, selectedCategory, assetSearchTerm]);

//   const loadInitialData = async () => {
//     setLoading(true);
//     try {
//       const [contractsResponse, categoriesResponse] = await Promise.all([
//         contractService.getAllContracts(),
//         assetCategoryService.getAllCategories(),
//       ]);
//       setContracts(contractsResponse.data || []);
//       setAssetCategories(categoriesResponse.data || []);
//       setFilteredCategories(categoriesResponse.data || []);
//     } catch (error) {
//       console.error("Error loading initial data:", error);
//       toast.error("Failed to load contracts or categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadAssets = async () => {
//     setLoadingAssets(true);
//     try {
//       const response = await assetService.getAssetsByContract(
//         formData.contractId
//       );
//       setAllAssets(response.data || []);
//       filterAssets(response.data || []);
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoadingAssets(false);
//     }
//   };

//   const filterAssets = (assets = allAssets) => {
//     let filtered = [...assets];

//     // Filter by category
//     if (selectedCategory) {
//       filtered = filtered.filter(
//         (asset) => asset.categoryId === selectedCategory.categoryId
//       );
//     }

//     // Filter by asset name
//     if (assetSearchTerm.trim()) {
//       filtered = filtered.filter((asset) =>
//         asset.assetName.toLowerCase().includes(assetSearchTerm.toLowerCase())
//       );
//     }

//     setFilteredAssets(filtered);
//   };

//   const loadServiceScopes = async (assetId) => {
//     setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: true }));
//     try {
//       const response = await assetService.getAssetById(assetId);
//       const asset = response.data;
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
//       setServiceScopes((prev) => ({ ...prev, [assetId]: allServiceScopes }));
//     } catch (error) {
//       console.error(
//         `Error loading service scopes for asset ${assetId}:`,
//         error
//       );
//       toast.error(`Failed to load service scopes for asset ${assetId}`);
//     } finally {
//       setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: false }));
//     }
//   };

//   const loadChecklists = async (assetId, serviceScopeId) => {
//     setLoadingChecklists((prev) => ({ ...prev, [assetId]: true }));
//     try {
//       const response = await checklistService.getChecklistsByServiceScope(
//         serviceScopeId
//       );
//       setChecklists((prev) => ({ ...prev, [assetId]: response.data || [] }));
//     } catch (error) {
//       console.error(
//         `Error loading checklists for service scope ${serviceScopeId}:`,
//         error
//       );
//       toast.error(`Failed to load checklists for asset ${assetId}`);
//     } finally {
//       setLoadingChecklists((prev) => ({ ...prev, [assetId]: false }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAssetSelection = (assetId) => {
//     setFormData((prev) => {
//       const assetSchedules = prev.assetSchedules;
//       if (assetSchedules.some((as) => as.assetId === assetId)) {
//         return {
//           ...prev,
//           assetSchedules: assetSchedules.filter((as) => as.assetId !== assetId),
//         };
//       } else {
//         loadServiceScopes(assetId);
//         return {
//           ...prev,
//           assetSchedules: [
//             ...assetSchedules,
//             { assetId, serviceScopeId: "", checklistId: "" },
//           ],
//         };
//       }
//     });
//   };

//   const handleServiceScopeChange = (assetId, serviceScopeId) => {
//     setFormData((prev) => ({
//       ...prev,
//       assetSchedules: prev.assetSchedules.map((as) =>
//         as.assetId === assetId ? { ...as, serviceScopeId, checklistId: "" } : as
//       ),
//     }));
//     if (serviceScopeId) {
//       loadChecklists(assetId, serviceScopeId);
//     } else {
//       setChecklists((prev) => ({ ...prev, [assetId]: [] }));
//     }
//   };

//   const handleChecklistChange = (assetId, checklistId) => {
//     setFormData((prev) => ({
//       ...prev,
//       assetSchedules: prev.assetSchedules.map((as) =>
//         as.assetId === assetId ? { ...as, checklistId } : as
//       ),
//     }));
//   };

//   const selectAllAssets = () => {
//     const newAssetSchedules = filteredAssets.map((asset) => ({
//       assetId: asset.assetId,
//       serviceScopeId: "",
//       checklistId: "",
//     }));
//     setFormData((prev) => ({ ...prev, assetSchedules: newAssetSchedules }));
//     filteredAssets.forEach((asset) => loadServiceScopes(asset.assetId));
//   };

//   const clearAllAssets = () => {
//     setFormData((prev) => ({ ...prev, assetSchedules: [] }));
//     setServiceScopes({});
//     setChecklists({});
//   };

//   const handleCategorySearch = async (e) => {
//     const value = e.target.value;
//     setCategorySearchTerm(value);
//     setShowCategoryDropdown(true);
//     try {
//       if (value.trim()) {
//         const response = await assetCategoryService.searchCategoriesByName(
//           value
//         );
//         setFilteredCategories(response.data || []);
//       } else {
//         setFilteredCategories(assetCategories);
//       }
//     } catch (error) {
//       console.error("Error searching categories:", error);
//       toast.error("Failed to search categories");
//     }
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setCategorySearchTerm(category ? category.categoryName : "");
//     setShowCategoryDropdown(false);
//   };

//   const handleAssetSearch = (e) => {
//     setAssetSearchTerm(e.target.value);
//   };

//   const clearFilters = () => {
//     setSelectedCategory(null);
//     setCategorySearchTerm("");
//     setAssetSearchTerm("");
//     setShowCategoryDropdown(false);
//     setFilteredAssets(allAssets);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name) {
//       toast.error("Please enter a schedule name");
//       return;
//     }
//     if (!formData.contractId) {
//       toast.error("Please select a contract");
//       return;
//     }
//     if (formData.assetSchedules.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }
//     if (!formData.startDate || !formData.endDate) {
//       toast.error("Please select start and end dates");
//       return;
//     }
//     if (new Date(formData.startDate) >= new Date(formData.endDate)) {
//       toast.error("End date must be after start date");
//       return;
//     }
//     for (const assetSchedule of formData.assetSchedules) {
//       if (!assetSchedule.serviceScopeId) {
//         toast.error(
//           `Please select a service scope for asset ID ${assetSchedule.assetId}`
//         );
//         return;
//       }
//       if (!assetSchedule.checklistId) {
//         toast.error(
//           `Please select a checklist for asset ID ${assetSchedule.assetId}`
//         );
//         return;
//       }
//     }
//     setLoading(true);
//     try {
//       await workRequestService.createPmSchedule(formData);
//       toast.success("Preventive maintenance schedule created successfully");
//       setFormData({
//         assetSchedules: [],
//         frequency: "DAYS_30",
//         contractId: "",
//         reasonComment: "",
//         startDate: "",
//         endDate: "",
//         name: "",
//       });
//       setServiceScopes({});
//       setChecklists({});
//       setCategorySearchTerm("");
//       setAssetSearchTerm("");
//       setSelectedCategory(null);
//       setAllAssets([]);
//       setFilteredAssets([]);
//       onBack();
//     } catch (error) {
//       console.error("Error creating PM schedule:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create PM schedule"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
//         <div className="bg-white p-8 rounded-2xl shadow-xl">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
//           <span className="block mt-4 text-lg font-medium text-gray-700 text-center">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-md mb-4">
//           <Shield className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Preventive Maintenance Work Request
//         </h2>
//         <p className="text-gray-600">
//           Create a preventive maintenance schedule for multiple assets
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Schedule Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Schedule Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Enter schedule name"
//               required
//             />
//           </div>
//           {/* Contract Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Contract <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="contractId"
//               value={formData.contractId}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             >
//               <option value="">Select Contract</option>
//               {contracts.map((contract) => (
//                 <option key={contract.contractId} value={contract.contractId}>
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Frequency <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="frequency"
//               value={formData.frequency}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             >
//               {frequencyOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Start Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Start Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             />
//           </div>
//           {/* End Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               End Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             />
//           </div>
//         </div>
//         {/* Reason Comment */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Reason/Comment
//           </label>
//           <textarea
//             name="reasonComment"
//             value={formData.reasonComment}
//             onChange={handleInputChange}
//             rows={3}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Describe the preventive maintenance plan..."
//           />
//         </div>
//         {/* Asset Selection */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Select Assets <span className="text-red-500">*</span>
//             </label>
//             {filteredAssets.length > 0 && (
//               <div className="flex gap-2">
//                 <button
//                   type="button"
//                   onClick={selectAllAssets}
//                   className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
//                 >
//                   Select All
//                 </button>
//                 <button
//                   type="button"
//                   onClick={clearAllAssets}
//                   className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                 >
//                   Clear All
//                 </button>
//                 {(selectedCategory || assetSearchTerm) && (
//                   <button
//                     type="button"
//                     onClick={clearFilters}
//                     className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
//                   >
//                     Clear Filters
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//           {/* Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Filter by Asset Category
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   value={categorySearchTerm}
//                   onChange={handleCategorySearch}
//                   onFocus={() => setShowCategoryDropdown(true)}
//                   className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   placeholder="Search asset category..."
//                   onBlur={() =>
//                     setTimeout(() => setShowCategoryDropdown(false), 200)
//                   }
//                 />
//                 {selectedCategory && (
//                   <button
//                     type="button"
//                     onClick={() => handleCategorySelect(null)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//               {showCategoryDropdown && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                   {filteredCategories.length > 0 ? (
//                     <>
//                       <button
//                         type="button"
//                         onClick={() => handleCategorySelect(null)}
//                         className="w-full text-left px-4 py-3 hover:bg-green-50 border-b border-gray-100 transition-colors"
//                       >
//                         <div className="font-medium text-gray-900">
//                           All Categories
//                         </div>
//                       </button>
//                       {filteredCategories.map((category) => (
//                         <button
//                           key={category.categoryId}
//                           type="button"
//                           onClick={() => handleCategorySelect(category)}
//                           className="w-full text-left px-4 py-3 hover:bg-green-50 border-b border-gray-100 last:border-b-0 transition-colors"
//                         >
//                           <div className="font-medium text-gray-900">
//                             {category.categoryName}
//                           </div>
//                           {category.description && (
//                             <div className="text-sm text-gray-500 truncate">
//                               {category.description}
//                             </div>
//                           )}
//                         </button>
//                       ))}
//                     </>
//                   ) : (
//                     <div className="px-4 py-3 text-gray-500 text-center">
//                       No categories found
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Search by Asset Name
//               </label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   value={assetSearchTerm}
//                   onChange={handleAssetSearch}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                   placeholder="Search asset name..."
//                 />
//               </div>
//             </div>
//           </div>
//           {/* Asset List */}
//           {loadingAssets ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//               <p className="text-gray-600 mt-2">Loading assets...</p>
//             </div>
//           ) : filteredAssets.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               {formData.contractId
//                 ? "No assets found for selected filters"
//                 : "Please select a contract first"}
//             </div>
//           ) : (
//             <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
//               {filteredAssets.map((asset) => {
//                 const isSelected = formData.assetSchedules.some(
//                   (as) => as.assetId === asset.assetId
//                 );
//                 const assetSchedule =
//                   formData.assetSchedules.find(
//                     (as) => as.assetId === asset.assetId
//                   ) || {};
//                 return (
//                   <div
//                     key={asset.assetId}
//                     className="p-3 border-b border-gray-100 last:border-b-0"
//                   >
//                     <label className="flex items-center hover:bg-gray-50 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={() => handleAssetSelection(asset.assetId)}
//                         className="mr-3 w-4 h-4 text-green-600 rounded focus:ring-green-500"
//                       />
//                       <div className="flex-1">
//                         <div className="font-medium text-gray-900">
//                           {asset.assetTag} - {asset.assetName}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {asset.categoryName} | {asset.buildingName},{" "}
//                           {asset.floorName}, {asset.roomName}
//                         </div>
//                       </div>
//                     </label>
//                     {isSelected && (
//                       <div className="mt-2 ml-7 space-y-2">
//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">
//                             Service Scope{" "}
//                             <span className="text-red-500">*</span>
//                           </label>
//                           {loadingServiceScopes[asset.assetId] ? (
//                             <div className="text-xs text-gray-600">
//                               Loading service scopes...
//                             </div>
//                           ) : (serviceScopes[asset.assetId] || []).length ===
//                             0 ? (
//                             <div className="text-xs text-gray-600">
//                               No service scopes available
//                             </div>
//                           ) : (
//                             <select
//                               value={assetSchedule.serviceScopeId || ""}
//                               onChange={(e) =>
//                                 handleServiceScopeChange(
//                                   asset.assetId,
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                             >
//                               <option value="">Select Service Scope</option>
//                               {(serviceScopes[asset.assetId] || []).map(
//                                 (scope) => (
//                                   <option
//                                     key={scope.scopeId}
//                                     value={scope.scopeId}
//                                   >
//                                     {scope.scopeName} ({scope.subServiceName})
//                                   </option>
//                                 )
//                               )}
//                             </select>
//                           )}
//                         </div>
//                         <div>
//                           <label className="block text-xs font-medium text-gray-700 mb-1">
//                             Checklist <span className="text-red-500">*</span>
//                           </label>
//                           {loadingChecklists[asset.assetId] ? (
//                             <div className="text-xs text-gray-600">
//                               Loading checklists...
//                             </div>
//                           ) : (
//                             <select
//                               value={assetSchedule.checklistId || ""}
//                               onChange={(e) =>
//                                 handleChecklistChange(
//                                   asset.assetId,
//                                   e.target.value
//                                 )
//                               }
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                               disabled={!assetSchedule.serviceScopeId}
//                             >
//                               <option value="">Select Checklist</option>
//                               {(checklists[asset.assetId] || []).map(
//                                 (checklist) => (
//                                   <option
//                                     key={checklist.checklistId}
//                                     value={checklist.checklistId}
//                                   >
//                                     {checklist.name}
//                                   </option>
//                                 )
//                               )}
//                             </select>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//           {formData.assetSchedules.length > 0 && (
//             <p className="text-sm text-green-600 mt-2">
//               {formData.assetSchedules.length} asset(s) selected
//             </p>
//           )}
//         </div>
//         {/* Submit Button */}
//         <div className="flex gap-4 pt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create PM Schedule
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PreventiveMaintenanceForm;

// // Modified PreventiveMaintenanceForm component
// "use client";
// import { useState, useEffect } from "react";
// import { Save, Shield } from "lucide-react";
// import { workRequestService } from "../../services/workRequestService";
// import { assetService } from "../../services/assetService";
// import { contractService } from "../../services/contractService";
// import { checklistService } from "../../services/checklistService";
// import { toast } from "react-toastify";

// const PreventiveMaintenanceForm = ({
//   onBack,
//   initialAssetIds = [],
//   initialContractId,
// }) => {
//   const [formData, setFormData] = useState({
//     assetSchedules: [],
//     frequency: "DAYS_30",
//     contractId: initialContractId || "",
//     reasonComment: "",
//     startDate: "",
//     endDate: "",
//     name: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [contracts, setContracts] = useState([]);
//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(false);
//   const [serviceScopes, setServiceScopes] = useState({});
//   const [checklists, setChecklists] = useState({});
//   const [loadingServiceScopes, setLoadingServiceScopes] = useState({});
//   const [loadingChecklists, setLoadingChecklists] = useState({});

//   const frequencyOptions = [
//     { value: "DAYS_1", label: "Every 1 Day" },
//     { value: "DAYS_30", label: "Every 30 Days" },
//     { value: "DAYS_60", label: "Every 60 Days" },
//     { value: "DAYS_90", label: "Every 90 Days" },
//     { value: "DAYS_120", label: "Every 120 Days" },
//     { value: "DAYS_180", label: "Every 180 Days" },
//   ];

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   useEffect(() => {
//     if (initialAssetIds.length > 0 && formData.contractId) {
//       loadSelectedAssets();
//     }
//   }, [initialAssetIds, formData.contractId]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//       toast.error("Failed to load contracts");
//     }
//   };

//   const loadSelectedAssets = async () => {
//     setLoadingAssets(true);
//     try {
//       const responses = await Promise.all(
//         initialAssetIds.map((id) => assetService.getAssetById(id))
//       );
//       const assets = responses.map((res) => res.data);
//       setSelectedAssets(assets);
//       setFormData((prev) => ({
//         ...prev,
//         assetSchedules: initialAssetIds.map((assetId) => ({
//           assetId,
//           serviceScopeId: "",
//           checklistId: "",
//         })),
//       }));
//       initialAssetIds.forEach(loadServiceScopes);
//     } catch (error) {
//       console.error("Error loading selected assets:", error);
//       toast.error("Failed to load selected assets");
//     } finally {
//       setLoadingAssets(false);
//     }
//   };

//   const loadServiceScopes = async (assetId) => {
//     setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: true }));
//     try {
//       const response = await assetService.getAssetById(assetId);
//       const asset = response.data;
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
//       setServiceScopes((prev) => ({ ...prev, [assetId]: allServiceScopes }));
//     } catch (error) {
//       console.error(
//         `Error loading service scopes for asset ${assetId}:`,
//         error
//       );
//       toast.error(`Failed to load service scopes for asset ${assetId}`);
//     } finally {
//       setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: false }));
//     }
//   };

//   const loadChecklists = async (assetId, serviceScopeId) => {
//     setLoadingChecklists((prev) => ({ ...prev, [assetId]: true }));
//     try {
//       const response = await checklistService.getChecklistsByServiceScope(
//         serviceScopeId
//       );
//       setChecklists((prev) => ({ ...prev, [assetId]: response.data || [] }));
//     } catch (error) {
//       console.error(
//         `Error loading checklists for service scope ${serviceScopeId}:`,
//         error
//       );
//       toast.error(`Failed to load checklists for asset ${assetId}`);
//     } finally {
//       setLoadingChecklists((prev) => ({ ...prev, [assetId]: false }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleServiceScopeChange = (assetId, serviceScopeId) => {
//     setFormData((prev) => ({
//       ...prev,
//       assetSchedules: prev.assetSchedules.map((as) =>
//         as.assetId === assetId ? { ...as, serviceScopeId, checklistId: "" } : as
//       ),
//     }));
//     if (serviceScopeId) {
//       loadChecklists(assetId, serviceScopeId);
//     } else {
//       setChecklists((prev) => ({ ...prev, [assetId]: [] }));
//     }
//   };

//   const handleChecklistChange = (assetId, checklistId) => {
//     setFormData((prev) => ({
//       ...prev,
//       assetSchedules: prev.assetSchedules.map((as) =>
//         as.assetId === assetId ? { ...as, checklistId } : as
//       ),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name) {
//       toast.error("Please enter a schedule name");
//       return;
//     }
//     if (!formData.contractId) {
//       toast.error("Please select a contract");
//       return;
//     }
//     if (formData.assetSchedules.length === 0) {
//       toast.error("Please select at least one asset");
//       return;
//     }
//     if (!formData.startDate || !formData.endDate) {
//       toast.error("Please select start and end dates");
//       return;
//     }
//     if (new Date(formData.startDate) >= new Date(formData.endDate)) {
//       toast.error("End date must be after start date");
//       return;
//     }
//     for (const assetSchedule of formData.assetSchedules) {
//       if (!assetSchedule.serviceScopeId) {
//         toast.error(
//           `Please select a service scope for asset ID ${assetSchedule.assetId}`
//         );
//         return;
//       }
//       if (!assetSchedule.checklistId) {
//         toast.error(
//           `Please select a checklist for asset ID ${assetSchedule.assetId}`
//         );
//         return;
//       }
//     }
//     setLoading(true);
//     try {
//       await workRequestService.createPmSchedule(formData);
//       toast.success("Preventive maintenance schedule created successfully");
//       setFormData({
//         assetSchedules: [],
//         frequency: "DAYS_30",
//         contractId: "",
//         reasonComment: "",
//         startDate: "",
//         endDate: "",
//         name: "",
//       });
//       setServiceScopes({});
//       setChecklists({});
//       setSelectedAssets([]);
//       onBack();
//     } catch (error) {
//       console.error("Error creating PM schedule:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create PM schedule"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-md mb-4">
//           <Shield className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Preventive Maintenance Work Request
//         </h2>
//         <p className="text-gray-600">
//           Create a preventive maintenance schedule for multiple assets
//         </p>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Schedule Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Schedule Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               placeholder="Enter schedule name"
//               required
//             />
//           </div>
//           {/* Contract Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Contract <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="contractId"
//               value={formData.contractId}
//               onChange={handleInputChange}
//               disabled={!!initialContractId}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
//               required
//             >
//               <option value="">Select Contract</option>
//               {contracts.map((contract) => (
//                 <option key={contract.contractId} value={contract.contractId}>
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Frequency */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Frequency <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="frequency"
//               value={formData.frequency}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             >
//               {frequencyOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Start Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Start Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             />
//           </div>
//           {/* End Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               End Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//               required
//             />
//           </div>
//         </div>
//         {/* Reason Comment */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Reason/Comment
//           </label>
//           <textarea
//             name="reasonComment"
//             value={formData.reasonComment}
//             onChange={handleInputChange}
//             rows={3}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Describe the preventive maintenance plan..."
//           />
//         </div>
//         {/* Selected Assets List */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-4">
//             Selected Assets <span className="text-red-500">*</span>
//           </label>
//           {loadingAssets ? (
//             <div className="text-center py-8">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
//               <p className="text-gray-600 mt-2">Loading assets...</p>
//             </div>
//           ) : selectedAssets.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No assets selected
//             </div>
//           ) : (
//             <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
//               {selectedAssets.map((asset) => {
//                 const assetSchedule =
//                   formData.assetSchedules.find(
//                     (as) => as.assetId === asset.assetId
//                   ) || {};
//                 return (
//                   <div
//                     key={asset.assetId}
//                     className="p-3 border-b border-gray-100 last:border-b-0"
//                   >
//                     <div className="font-medium text-gray-900">
//                       {asset.assetTag} - {asset.assetName}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {asset.categoryName} | {asset.buildingName},{" "}
//                       {asset.floorName}, {asset.roomName}
//                     </div>
//                     <div className="mt-2 space-y-2">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Service Scope <span className="text-red-500">*</span>
//                         </label>
//                         {loadingServiceScopes[asset.assetId] ? (
//                           <div className="text-xs text-gray-600">
//                             Loading service scopes...
//                           </div>
//                         ) : (serviceScopes[asset.assetId] || []).length ===
//                           0 ? (
//                           <div className="text-xs text-gray-600">
//                             No service scopes available
//                           </div>
//                         ) : (
//                           <select
//                             value={assetSchedule.serviceScopeId || ""}
//                             onChange={(e) =>
//                               handleServiceScopeChange(
//                                 asset.assetId,
//                                 e.target.value
//                               )
//                             }
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                           >
//                             <option value="">Select Service Scope</option>
//                             {(serviceScopes[asset.assetId] || []).map(
//                               (scope) => (
//                                 <option
//                                   key={scope.scopeId}
//                                   value={scope.scopeId}
//                                 >
//                                   {scope.scopeName} ({scope.subServiceName})
//                                 </option>
//                               )
//                             )}
//                           </select>
//                         )}
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-700 mb-1">
//                           Checklist <span className="text-red-500">*</span>
//                         </label>
//                         {loadingChecklists[asset.assetId] ? (
//                           <div className="text-xs text-gray-600">
//                             Loading checklists...
//                           </div>
//                         ) : (
//                           <select
//                             value={assetSchedule.checklistId || ""}
//                             onChange={(e) =>
//                               handleChecklistChange(
//                                 asset.assetId,
//                                 e.target.value
//                               )
//                             }
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
//                             disabled={!assetSchedule.serviceScopeId}
//                           >
//                             <option value="">Select Checklist</option>
//                             {(checklists[asset.assetId] || []).map(
//                               (checklist) => (
//                                 <option
//                                   key={checklist.checklistId}
//                                   value={checklist.checklistId}
//                                 >
//                                   {checklist.name}
//                                 </option>
//                               )
//                             )}
//                           </select>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//           {formData.assetSchedules.length > 0 && (
//             <p className="text-sm text-green-600 mt-2">
//               {formData.assetSchedules.length} asset(s) selected
//             </p>
//           )}
//         </div>
//         {/* Submit Button */}
//         <div className="flex gap-4 pt-6">
//           <button
//             type="button"
//             onClick={onBack}
//             className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create PM Schedule
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PreventiveMaintenanceForm;

"use client";
import { useState, useEffect } from "react";
import { Save, Shield, Search, ChevronDown, ChevronUp } from "lucide-react";
import { workRequestService } from "../../services/workRequestService";
import { assetService } from "../../services/assetService";
import { contractService } from "../../services/contractService";
import { checklistService } from "../../services/checklistService";
import { toast } from "react-toastify";

const PreventiveMaintenanceForm = ({
  onBack,
  initialAssetIds = [],
  initialContractId,
}) => {
  const [formData, setFormData] = useState({
    assetSchedules: [],
    frequency: "DAYS_30",
    contractId: initialContractId || "",
    reasonComment: "",
    startDate: "",
    endDate: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [serviceScopes, setServiceScopes] = useState({});
  const [checklists, setChecklists] = useState({});
  const [loadingServiceScopes, setLoadingServiceScopes] = useState({});
  const [loadingChecklists, setLoadingChecklists] = useState({});
  const [expandedAssets, setExpandedAssets] = useState({});
  const [assetSearch, setAssetSearch] = useState("");

  const frequencyOptions = [
    { value: "DAYS_1", label: "Every 1 Day" },
    { value: "DAYS_30", label: "Every 30 Days" },
    { value: "DAYS_60", label: "Every 60 Days" },
    { value: "DAYS_90", label: "Every 90 Days" },
    { value: "DAYS_120", label: "Every 120 Days" },
    { value: "DAYS_180", label: "Every 180 Days" },
  ];

  useEffect(() => {
    loadContracts();
  }, []);

  useEffect(() => {
    if (initialAssetIds.length > 0 && formData.contractId) {
      loadSelectedAssets();
    }
  }, [initialAssetIds, formData.contractId]);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data || []);
    } catch (error) {
      console.error("Error loading contracts:", error);
      toast.error("Failed to load contracts");
    }
  };

  const loadSelectedAssets = async () => {
    setLoadingAssets(true);
    try {
      const responses = await Promise.all(
        initialAssetIds.map((id) => assetService.getAssetById(id))
      );
      const assets = responses.map((res) => res.data);
      setSelectedAssets(assets);
      setFormData((prev) => ({
        ...prev,
        assetSchedules: initialAssetIds.map((assetId) => ({
          assetId,
          serviceScopeId: "",
          checklistId: "",
        })),
      }));
      initialAssetIds.forEach(loadServiceScopes);
    } catch (error) {
      console.error("Error loading selected assets:", error);
      toast.error("Failed to load selected assets");
    } finally {
      setLoadingAssets(false);
    }
  };

  const loadServiceScopes = async (assetId) => {
    setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: true }));
    try {
      const response = await assetService.getAssetById(assetId);
      const asset = response.data;
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
      setServiceScopes((prev) => ({ ...prev, [assetId]: allServiceScopes }));
    } catch (error) {
      console.error(
        `Error loading service scopes for asset ${assetId}:`,
        error
      );
      toast.error(`Failed to load service scopes for asset ${assetId}`);
    } finally {
      setLoadingServiceScopes((prev) => ({ ...prev, [assetId]: false }));
    }
  };

  const loadChecklists = async (assetId, serviceScopeId) => {
    setLoadingChecklists((prev) => ({ ...prev, [assetId]: true }));
    try {
      const response = await checklistService.getChecklistsByServiceScope(
        serviceScopeId
      );
      setChecklists((prev) => ({ ...prev, [assetId]: response.data || [] }));
    } catch (error) {
      console.error(
        `Error loading checklists for service scope ${serviceScopeId}:`,
        error
      );
      toast.error(`Failed to load checklists for asset ${assetId}`);
    } finally {
      setLoadingChecklists((prev) => ({ ...prev, [assetId]: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceScopeChange = (assetId, serviceScopeId) => {
    setFormData((prev) => ({
      ...prev,
      assetSchedules: prev.assetSchedules.map((as) =>
        as.assetId === assetId ? { ...as, serviceScopeId, checklistId: "" } : as
      ),
    }));
    if (serviceScopeId) {
      loadChecklists(assetId, serviceScopeId);
    } else {
      setChecklists((prev) => ({ ...prev, [assetId]: [] }));
    }
  };

  const handleChecklistChange = (assetId, checklistId) => {
    setFormData((prev) => ({
      ...prev,
      assetSchedules: prev.assetSchedules.map((as) =>
        as.assetId === assetId ? { ...as, checklistId } : as
      ),
    }));
  };

  const handleBulkServiceScopeChange = (serviceScopeId) => {
    setFormData((prev) => ({
      ...prev,
      assetSchedules: prev.assetSchedules.map((as) => ({
        ...as,
        serviceScopeId,
        checklistId: "",
      })),
    }));
    selectedAssets.forEach((asset) => {
      if (serviceScopeId) {
        loadChecklists(asset.assetId, serviceScopeId);
      } else {
        setChecklists((prev) => ({ ...prev, [asset.assetId]: [] }));
      }
    });
  };

  const handleBulkChecklistChange = (checklistId) => {
    setFormData((prev) => ({
      ...prev,
      assetSchedules: prev.assetSchedules.map((as) => ({
        ...as,
        checklistId,
      })),
    }));
  };

  const toggleAssetExpansion = (assetId) => {
    setExpandedAssets((prev) => ({
      ...prev,
      [assetId]: !prev[assetId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please enter a schedule name");
      return;
    }
    if (!formData.contractId) {
      toast.error("Please select a contract");
      return;
    }
    if (formData.assetSchedules.length === 0) {
      toast.error("Please select at least one asset");
      return;
    }
    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error("End date must be after start date");
      return;
    }
    for (const assetSchedule of formData.assetSchedules) {
      if (!assetSchedule.serviceScopeId) {
        toast.error(
          `Please select a service scope for asset ID ${assetSchedule.assetId}`
        );
        return;
      }
      if (!assetSchedule.checklistId) {
        toast.error(
          `Please select a checklist for asset ID ${assetSchedule.assetId}`
        );
        return;
      }
    }
    setLoading(true);
    try {
      await workRequestService.createPmSchedule(formData);
      toast.success("Preventive maintenance schedule created successfully");
      setFormData({
        assetSchedules: [],
        frequency: "DAYS_30",
        contractId: "",
        reasonComment: "",
        startDate: "",
        endDate: "",
        name: "",
      });
      setServiceScopes({});
      setChecklists({});
      setSelectedAssets([]);
      onBack();
    } catch (error) {
      console.error("Error creating PM schedule:", error);
      toast.error(
        error.response?.data?.message || "Failed to create PM schedule"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredAssets = selectedAssets.filter(
    (asset) =>
      asset.assetTag.toLowerCase().includes(assetSearch.toLowerCase()) ||
      asset.assetName.toLowerCase().includes(assetSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 shadow-md mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Preventive Maintenance Work Request
        </h2>
        <p className="text-gray-600">
          Create a preventive maintenance schedule for multiple assets
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter schedule name"
              required
            />
          </div>
          {/* Contract Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contract <span className="text-red-500">*</span>
            </label>
            <select
              name="contractId"
              value={formData.contractId}
              onChange={handleInputChange}
              disabled={!!initialContractId}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
              required
            >
              <option value="">Select Contract</option>
              {contracts.map((contract) => (
                <option key={contract.contractId} value={contract.contractId}>
                  {contract.contractName}
                </option>
              ))}
            </select>
          </div>
          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency <span className="text-red-500">*</span>
            </label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              {frequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>
        {/* Reason Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason/Comment
          </label>
          <textarea
            name="reasonComment"
            value={formData.reasonComment}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Describe the preventive maintenance plan..."
          />
        </div>
        {/* Selected Assets List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Selected Assets <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={assetSearch}
                  onChange={(e) => setAssetSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
          <div className="sticky top-0 bg-white z-10 border-b border-gray-300 py-2 mb-2">
            <div className="flex gap-4">
              <select
                onChange={(e) => handleBulkServiceScopeChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Apply Service Scope to All</option>
                {Object.values(serviceScopes)
                  .flat()
                  .filter(
                    (scope, index, self) =>
                      self.findIndex((s) => s.scopeId === scope.scopeId) ===
                      index
                  )
                  .map((scope) => (
                    <option key={scope.scopeId} value={scope.scopeId}>
                      {scope.scopeName} ({scope.subServiceName})
                    </option>
                  ))}
              </select>
              <select
                onChange={(e) => handleBulkChecklistChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Apply Checklist to All</option>
                {Object.values(checklists)
                  .flat()
                  .filter(
                    (checklist, index, self) =>
                      self.findIndex(
                        (c) => c.checklistId === checklist.checklistId
                      ) === index
                  )
                  .map((checklist) => (
                    <option
                      key={checklist.checklistId}
                      value={checklist.checklistId}
                    >
                      {checklist.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {loadingAssets ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-3 border border-gray-200 rounded-lg animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex gap-4">
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {assetSearch
                ? "No assets match your search"
                : "No assets selected"}
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg max-h-96 overflow-y-auto">
              {filteredAssets.map((asset) => {
                const assetSchedule =
                  formData.assetSchedules.find(
                    (as) => as.assetId === asset.assetId
                  ) || {};
                const isExpanded = expandedAssets[asset.assetId];
                return (
                  <div
                    key={asset.assetId}
                    className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleAssetExpansion(asset.assetId)}
                    >
                      <div>
                        <div className="font-medium text-gray-900">
                          {asset.assetTag} - {asset.assetName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {asset.categoryName} | {asset.buildingName},{" "}
                          {asset.floorName}, {asset.roomName}
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    {isExpanded && (
                      <div className="mt-3 flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Service Scope{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          {loadingServiceScopes[asset.assetId] ? (
                            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                          ) : (serviceScopes[asset.assetId] || []).length ===
                            0 ? (
                            <div className="text-xs text-gray-600">
                              No service scopes available
                            </div>
                          ) : (
                            <select
                              value={assetSchedule.serviceScopeId || ""}
                              onChange={(e) =>
                                handleServiceScopeChange(
                                  asset.assetId,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >
                              <option value="">Select Service Scope</option>
                              {(serviceScopes[asset.assetId] || []).map(
                                (scope) => (
                                  <option
                                    key={scope.scopeId}
                                    value={scope.scopeId}
                                  >
                                    {scope.scopeName} ({scope.subServiceName})
                                  </option>
                                )
                              )}
                            </select>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Checklist <span className="text-red-500">*</span>
                          </label>
                          {loadingChecklists[asset.assetId] ? (
                            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                          ) : (
                            <select
                              value={assetSchedule.checklistId || ""}
                              onChange={(e) =>
                                handleChecklistChange(
                                  asset.assetId,
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                              disabled={!assetSchedule.serviceScopeId}
                            >
                              <option value="">Select Checklist</option>
                              {(checklists[asset.assetId] || []).map(
                                (checklist) => (
                                  <option
                                    key={checklist.checklistId}
                                    value={checklist.checklistId}
                                  >
                                    {checklist.name}
                                  </option>
                                )
                              )}
                            </select>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {formData.assetSchedules.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              {formData.assetSchedules.length} asset(s) selected
            </p>
          )}
        </div>
        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Create PM Schedule
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreventiveMaintenanceForm;
