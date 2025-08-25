// "use client";

// import { useState, useEffect } from "react";
// import { Save, Upload, X, Zap } from "lucide-react";
// import { workRequestService } from "../../services/WorkRequestService";
// import { assetService } from "../../services/assetService";
// import { contractService } from "../../services/contractService";
// import { toast } from "react-toastify";

// const ReactiveMaintenanceForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     workRequestType: "RM",
//     assetId: "",
//     reasonComment: "",
//     priority: "RM_P1",
//     images: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [assets, setAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(false);

//   const priorityOptions = [
//     { value: "RM_P1", label: "RM P1 - High Priority", color: "text-red-600" },
//     {
//       value: "RM_P2",
//       label: "RM P2 - Medium Priority",
//       color: "text-yellow-600",
//     },
//     { value: "RM_P3", label: "RM P3 - Low Priority", color: "text-green-600" },
//   ];

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   useEffect(() => {
//     if (selectedContract) {
//       loadAssets();
//     } else {
//       setAssets([]);
//       setFormData((prev) => ({ ...prev, assetId: "" }));
//     }
//   }, [selectedContract]);

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
//       const response = await assetService.getAssetsByContract(selectedContract);
//       setAssets(response.data || []);
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoadingAssets(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + formData.images.length > 2) {
//       toast.error("Maximum 2 images allowed");
//       return;
//     }
//     setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
//   };

//   const removeImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.assetId) {
//       toast.error("Please select an asset");
//       return;
//     }

//     setLoading(true);
//     try {
//       await workRequestService.createWorkRequest(formData);
//       toast.success("Reactive maintenance work request created successfully");

//       // Reset form
//       setFormData({
//         workRequestType: "RM",
//         assetId: "",
//         reasonComment: "",
//         priority: "RM_P1",
//         images: [],
//       });
//       setSelectedContract("");

//       // Go back to main view
//       onBack();
//     } catch (error) {
//       console.error("Error creating work request:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create work request"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-md mb-4">
//           <Zap className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Reactive Maintenance Work Request
//         </h2>
//         <p className="text-gray-600">
//           Create a work request for reactive maintenance tasks
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Contract Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Contract <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={selectedContract}
//             onChange={(e) => setSelectedContract(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             required
//           >
//             <option value="">Select Contract</option>
//             {contracts.map((contract) => (
//               <option key={contract.contractId} value={contract.contractId}>
//                 {contract.contractName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Asset Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Asset <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="assetId"
//             value={formData.assetId}
//             onChange={handleInputChange}
//             disabled={!selectedContract || loadingAssets}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
//             required
//           >
//             <option value="">
//               {loadingAssets ? "Loading assets..." : "Select Asset"}
//             </option>
//             {assets.map((asset) => (
//               <option key={asset.assetId} value={asset.assetId}>
//                 {asset.assetTag} - {asset.assetName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Priority */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Priority <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             required
//           >
//             {priorityOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
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
//             rows={4}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             placeholder="Describe the issue or reason for maintenance..."
//           />
//         </div>

//         {/* Images */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Images (Optional - Max 2)
//           </label>
//           <div className="space-y-4">
//             {formData.images.length < 2 && (
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   className="hidden"
//                   id="image-upload-rm"
//                 />
//                 <label htmlFor="image-upload-rm" className="cursor-pointer">
//                   <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                   <p className="text-sm text-gray-600">
//                     Click to upload images or drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     PNG, JPG up to 10MB each
//                   </p>
//                 </label>
//               </div>
//             )}

//             {/* Image Preview */}
//             {formData.images.length > 0 && (
//               <div className="grid grid-cols-2 gap-4">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={URL.createObjectURL(image) || "/placeholder.svg"}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
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
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create Work Request
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReactiveMaintenanceForm;

// "use client";

// import { useState, useEffect } from "react";
// import { Save, Upload, X, Zap } from "lucide-react";
// import { workRequestService } from "../../services/workRequestService";
// import { assetService } from "../../services/assetService";
// import { contractService } from "../../services/contractService";
// import { toast } from "react-toastify";

// const ReactiveMaintenanceForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     workRequestType: "RM",
//     assetId: "",
//     serviceScopeId: "", // New field for service scope
//     reasonComment: "",
//     priority: "RM_P1",
//     images: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [assets, setAssets] = useState([]);
//   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(false);
//   const [loadingServiceScopes, setLoadingServiceScopes] = useState(false);

//   const priorityOptions = [
//     { value: "RM_P1", label: "RM P1 - High Priority", color: "text-red-600" },
//     {
//       value: "RM_P2",
//       label: "RM P2 - Medium Priority",
//       color: "text-yellow-600",
//     },
//     { value: "RM_P3", label: "RM P3 - Low Priority", color: "text-green-600" },
//   ];

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   useEffect(() => {
//     if (selectedContract) {
//       loadAssets();
//     } else {
//       setAssets([]);
//       setFormData((prev) => ({ ...prev, assetId: "", serviceScopeId: "" }));
//     }
//   }, [selectedContract]);

//   useEffect(() => {
//     if (formData.assetId) {
//       loadAssetServiceScopes();
//     } else {
//       setAssetServiceScopes([]);
//       setFormData((prev) => ({ ...prev, serviceScopeId: "" }));
//     }
//   }, [formData.assetId]);

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
//       const response = await assetService.getAssetsByContract(selectedContract);
//       setAssets(response.data || []);
//     } catch (error) {
//       console.error("Error loading assets:", error);
//       toast.error("Failed to load assets");
//     } finally {
//       setLoadingAssets(false);
//     }
//   };

//   const loadAssetServiceScopes = async () => {
//     setLoadingServiceScopes(true);
//     try {
//       // Get asset details to extract service scopes
//       const assetResponse = await assetService.getAssetById(formData.assetId);
//       const asset = assetResponse.data;

//       // Extract all service scopes from all sub-services
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

//       setAssetServiceScopes(allServiceScopes);
//     } catch (error) {
//       console.error("Error loading asset service scopes:", error);
//       toast.error("Failed to load asset service scopes");
//       setAssetServiceScopes([]);
//     } finally {
//       setLoadingServiceScopes(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + formData.images.length > 2) {
//       toast.error("Maximum 2 images allowed");
//       return;
//     }
//     setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
//   };

//   const removeImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.assetId) {
//       toast.error("Please select an asset");
//       return;
//     }

//     if (!formData.serviceScopeId) {
//       toast.error("Please select a service scope");
//       return;
//     }

//     setLoading(true);
//     try {
//       await workRequestService.createWorkRequest(formData);
//       toast.success("Reactive maintenance work request created successfully");

//       // Reset form
//       setFormData({
//         workRequestType: "RM",
//         assetId: "",
//         serviceScopeId: "",
//         reasonComment: "",
//         priority: "RM_P1",
//         images: [],
//       });
//       setSelectedContract("");

//       // Go back to main view
//       onBack();
//     } catch (error) {
//       console.error("Error creating work request:", error);
//       toast.error(
//         error.response?.data?.message || "Failed to create work request"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-md mb-4">
//           <Zap className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Reactive Maintenance Work Request
//         </h2>
//         <p className="text-gray-600">
//           Create a work request for reactive maintenance tasks
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Contract Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Contract <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={selectedContract}
//             onChange={(e) => setSelectedContract(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             required
//           >
//             <option value="">Select Contract</option>
//             {contracts.map((contract) => (
//               <option key={contract.contractId} value={contract.contractId}>
//                 {contract.contractName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Asset Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Asset <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="assetId"
//             value={formData.assetId}
//             onChange={handleInputChange}
//             disabled={!selectedContract || loadingAssets}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
//             required
//           >
//             <option value="">
//               {loadingAssets ? "Loading assets..." : "Select Asset"}
//             </option>
//             {assets.map((asset) => (
//               <option key={asset.assetId} value={asset.assetId}>
//                 {asset.assetTag} - {asset.assetName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Asset Defined Services of Scope */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Asset Defined Services of Scope{" "}
//             <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="serviceScopeId"
//             value={formData.serviceScopeId}
//             onChange={handleInputChange}
//             disabled={!formData.assetId || loadingServiceScopes}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
//             required
//           >
//             <option value="">
//               {loadingServiceScopes
//                 ? "Loading service scopes..."
//                 : "Select Service Scope"}
//             </option>
//             {assetServiceScopes.map((scope) => (
//               <option key={scope.scopeId} value={scope.scopeId}>
//                 {scope.scopeName} ({scope.subServiceName})
//               </option>
//             ))}
//           </select>
//           {formData.assetId &&
//             assetServiceScopes.length === 0 &&
//             !loadingServiceScopes && (
//               <p className="text-sm text-gray-500 mt-1">
//                 No service scopes available for selected asset
//               </p>
//             )}
//         </div>

//         {/* Priority */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Priority <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             required
//           >
//             {priorityOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
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
//             rows={4}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             placeholder="Describe the issue or reason for maintenance..."
//           />
//         </div>

//         {/* Images */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Images (Optional - Max 2)
//           </label>
//           <div className="space-y-4">
//             {formData.images.length < 2 && (
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   className="hidden"
//                   id="image-upload-rm"
//                 />
//                 <label htmlFor="image-upload-rm" className="cursor-pointer">
//                   <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                   <p className="text-sm text-gray-600">
//                     Click to upload images or drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     PNG, JPG up to 10MB each
//                   </p>
//                 </label>
//               </div>
//             )}

//             {/* Image Preview */}
//             {formData.images.length > 0 && (
//               <div className="grid grid-cols-2 gap-4">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={URL.createObjectURL(image) || "/placeholder.svg"}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
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
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create Work Request
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReactiveMaintenanceForm;

// "use client";

// import { useState, useEffect } from "react";
// import { Save, Upload, X, Zap, Camera } from "lucide-react";
// import { toast } from "react-toastify";

// const ReactiveMaintenanceForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     workRequestType: "RM",
//     assetId: "",
//     serviceScopeId: "",
//     reasonComment: "",
//     priority: "RM_P1",
//     images: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [qrCodeFile, setQrCodeFile] = useState(null);
//   const [assetData, setAssetData] = useState(null);
//   const [assetServiceScopes, setAssetServiceScopes] = useState([]);
//   const [loadingAsset, setLoadingAsset] = useState(false);
//   const [loadingServiceScopes, setLoadingServiceScopes] = useState(false);

//   const priorityOptions = [
//     { value: "RM_P1", label: "RM P1 - High Priority", color: "text-red-600" },
//     {
//       value: "RM_P2",
//       label: "RM P2 - Medium Priority",
//       color: "text-yellow-600",
//     },
//     { value: "RM_P3", label: "RM P3 - Low Priority", color: "text-green-600" },
//   ];

//   const decodeQRCode = async (file) => {
//     return new Promise((resolve, reject) => {
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       const img = new Image();

//       img.onload = () => {
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);

//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//         setTimeout(() => {
//           // Simulate QR code decoding - in real implementation, use a QR code library
//           const qrCodeText = `Asset ID: 8
// Asset Tag: HETEFANX-00006
// Name: fan
// Category: HVAC
// Serial Number: aedeasw3
// Brand: wesaf
// Model: sde2dft
// Status: ACTIVE
// Condition: GOOD
// Observation: dswd
// Recommendation: sdd
// Purchase Cost: 3000.0
// Current Depreciated Value: 2970.0
// Company: Heles Pvt
// Contract: test contart
// Location: z, subzone, bulding, vila, florr, room1
// SubServices: Electrical Systems
// Service Scopes: Circuit Repair, Emergency Power Restoration, Electrical Inspection
// Purchase Date: 2024-01-01
// Warranty Expiry: 2032-04-18`;

//           // Parse the QR code text data
//           const lines = qrCodeText.split("\n");
//           const assetData = {};

//           lines.forEach((line) => {
//             const [key, ...valueParts] = line.split(": ");
//             const value = valueParts.join(": ");
//             assetData[key.trim()] = value;
//           });

//           // Extract service scopes from the parsed data
//           const serviceScopes = assetData["Service Scopes"]
//             ? assetData["Service Scopes"]
//                 .split(", ")
//                 .map((scope) => scope.trim())
//             : [];

//           const subServices = assetData["SubServices"]
//             ? assetData["SubServices"]
//                 .split(", ")
//                 .map((service) => service.trim())
//             : [];

//           const parsedAssetData = {
//             assetId: assetData["Asset ID"],
//             assetTag: assetData["Asset Tag"],
//             assetName: assetData["Name"],
//             category: assetData["Category"],
//             location: assetData["Location"],
//             subServices: subServices.map((subService, index) => ({
//               subServiceName: subService,
//               serviceScopeIds: serviceScopes.map(
//                 (scope, scopeIndex) =>
//                   `${subService.replace(/\s+/g, "_").toUpperCase()}_${
//                     scopeIndex + 1
//                   }`
//               ),
//               serviceScopeNames: serviceScopes,
//             })),
//           };

//           resolve(parsedAssetData);
//         }, 1000);
//       };

//       img.onerror = () => reject(new Error("Failed to load image"));
//       img.src = URL.createObjectURL(file);
//     });
//   };

//   useEffect(() => {
//     if (qrCodeFile) {
//       loadAssetFromQRFile();
//     } else {
//       setAssetData(null);
//       setFormData((prev) => ({ ...prev, assetId: "", serviceScopeId: "" }));
//     }
//   }, [qrCodeFile]);

//   useEffect(() => {
//     if (formData.assetId) {
//       loadAssetServiceScopes();
//     } else {
//       setAssetServiceScopes([]);
//       setFormData((prev) => ({ ...prev, serviceScopeId: "" }));
//     }
//   }, [formData.assetId]);

//   const loadAssetFromQRFile = async () => {
//     setLoadingAsset(true);
//     try {
//       const asset = await decodeQRCode(qrCodeFile);

//       setAssetData(asset);
//       setFormData((prev) => ({ ...prev, assetId: asset.assetId }));
//       toast.success(`Asset loaded: ${asset.assetTag} - ${asset.assetName}`);
//     } catch (error) {
//       console.error("Error decoding QR code:", error);
//       toast.error("Failed to decode QR code from image");
//       setAssetData(null);
//     } finally {
//       setLoadingAsset(false);
//     }
//   };

//   const loadAssetServiceScopes = async () => {
//     setLoadingServiceScopes(true);
//     try {
//       const allServiceScopes = [];
//       if (assetData?.subServices && assetData.subServices.length > 0) {
//         assetData.subServices.forEach((subService) => {
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

//       setAssetServiceScopes(allServiceScopes);
//     } catch (error) {
//       console.error("Error loading asset service scopes:", error);
//       toast.error("Failed to load asset service scopes");
//       setAssetServiceScopes([]);
//     } finally {
//       setLoadingServiceScopes(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleQrCodeFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         toast.error("Please upload an image file");
//         return;
//       }
//       setQrCodeFile(file);
//     }
//   };

//   const removeQrCodeFile = () => {
//     setQrCodeFile(null);
//     setAssetData(null);
//     setFormData((prev) => ({ ...prev, assetId: "", serviceScopeId: "" }));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + formData.images.length > 2) {
//       toast.error("Maximum 2 images allowed");
//       return;
//     }
//     setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
//   };

//   const removeImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.assetId) {
//       toast.error("Please upload a QR code image to select an asset");
//       return;
//     }

//     if (!formData.serviceScopeId) {
//       toast.error("Please select a service scope");
//       return;
//     }

//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       console.log("Work request data:", formData);
//       toast.success("Reactive maintenance work request created successfully");

//       setFormData({
//         workRequestType: "RM",
//         assetId: "",
//         serviceScopeId: "",
//         reasonComment: "",
//         priority: "RM_P1",
//         images: [],
//       });
//       setQrCodeFile(null);
//       setAssetData(null);

//       onBack();
//     } catch (error) {
//       console.error("Error creating work request:", error);
//       toast.error("Failed to create work request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-md mb-4">
//           <Zap className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Reactive Maintenance Work Request
//         </h2>
//         <p className="text-gray-600">
//           Create a work request for reactive maintenance tasks
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Upload Asset QR Code <span className="text-red-500">*</span>
//           </label>

//           {!qrCodeFile ? (
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleQrCodeFileChange}
//                 className="hidden"
//                 id="qr-code-upload"
//               />
//               <label htmlFor="qr-code-upload" className="cursor-pointer">
//                 <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                 <p className="text-sm text-gray-600">Upload QR Code Image</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   PNG, JPG files supported
//                 </p>
//               </label>
//             </div>
//           ) : (
//             <div className="relative">
//               <img
//                 src={URL.createObjectURL(qrCodeFile) || "/placeholder.svg"}
//                 alt="QR Code"
//                 className="w-full h-48 object-contain rounded-lg border border-gray-200 bg-gray-50"
//               />
//               <button
//                 type="button"
//                 onClick={removeQrCodeFile}
//                 className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}

//           {loadingAsset && (
//             <p className="text-sm text-blue-600 mt-2 flex items-center">
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
//               Decoding QR code...
//             </p>
//           )}
//         </div>

//         {assetData && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//             <h3 className="text-sm font-medium text-green-800 mb-2">
//               Selected Asset:
//             </h3>
//             <p className="text-sm text-green-700">
//               <span className="font-medium">{assetData.assetTag}</span> -{" "}
//               {assetData.assetName}
//             </p>
//             {assetData.location && (
//               <p className="text-xs text-green-600 mt-1">
//                 Location: {assetData.location}
//               </p>
//             )}
//           </div>
//         )}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Asset Defined Services of Scope{" "}
//             <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="serviceScopeId"
//             value={formData.serviceScopeId}
//             onChange={handleInputChange}
//             disabled={!formData.assetId || loadingServiceScopes}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
//             required
//           >
//             <option value="">
//               {loadingServiceScopes
//                 ? "Loading service scopes..."
//                 : "Select Service Scope"}
//             </option>
//             {assetServiceScopes.map((scope) => (
//               <option key={scope.scopeId} value={scope.scopeId}>
//                 {scope.scopeName} ({scope.subServiceName})
//               </option>
//             ))}
//           </select>
//           {formData.assetId &&
//             assetServiceScopes.length === 0 &&
//             !loadingServiceScopes && (
//               <p className="text-sm text-gray-500 mt-1">
//                 No service scopes available for selected asset
//               </p>
//             )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Priority <span className="text-red-500">*</span>
//           </label>
//           <select
//             name="priority"
//             value={formData.priority}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             required
//           >
//             {priorityOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Reason/Comment
//           </label>
//           <textarea
//             name="reasonComment"
//             value={formData.reasonComment}
//             onChange={handleInputChange}
//             rows={4}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//             placeholder="Describe the issue or reason for maintenance..."
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Images (Optional - Max 2)
//           </label>
//           <div className="space-y-4">
//             {formData.images.length < 2 && (
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   className="hidden"
//                   id="image-upload-rm"
//                 />
//                 <label htmlFor="image-upload-rm" className="cursor-pointer">
//                   <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                   <p className="text-sm text-gray-600">
//                     Click to upload images or drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     PNG, JPG up to 10MB each
//                   </p>
//                 </label>
//               </div>
//             )}

//             {formData.images.length > 0 && (
//               <div className="grid grid-cols-2 gap-4">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={URL.createObjectURL(image) || "/placeholder.svg"}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border border-gray-200"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

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
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Creating...
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5 mr-2" />
//                 Create Work Request
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReactiveMaintenanceForm;

"use client";

import { useState, useEffect, useRef } from "react";
import { Save, Upload, X, Zap, Camera } from "lucide-react";
import { toast } from "react-toastify";

const ReactiveMaintenanceForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    workRequestType: "RM",
    assetId: "",
    serviceScopeId: "",
    reasonComment: "",
    priority: "RM_P1",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [assetData, setAssetData] = useState(null);
  const [assetServiceScopes, setAssetServiceScopes] = useState([]);
  const [loadingAsset, setLoadingAsset] = useState(false);
  const [loadingServiceScopes, setLoadingServiceScopes] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const priorityOptions = [
    { value: "RM_P1", label: "RM P1 - High Priority", color: "text-red-600" },
    {
      value: "RM_P2",
      label: "RM P2 - Medium Priority",
      color: "text-yellow-600",
    },
    { value: "RM_P3", label: "RM P3 - Low Priority", color: "text-green-600" },
  ];

  const decodeQRCode = async (file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Import jsQR library for QR code decoding
        import("jsqr")
          .then((jsQR) => {
            const imageData = ctx.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const code = jsQR.default(
              imageData.data,
              imageData.width,
              imageData.height
            );

            if (code) {
              console.log("[v0] QR Code detected:", code.data);

              // Parse the QR code text data
              const lines = code.data.split("\n");
              const assetData = {};

              lines.forEach((line) => {
                const [key, ...valueParts] = line.split(": ");
                const value = valueParts.join(": ");
                if (key && value) {
                  assetData[key.trim()] = value.trim();
                }
              });

              // Extract service scopes from the parsed data
              const serviceScopes = assetData["Service Scopes"]
                ? assetData["Service Scopes"]
                    .split(", ")
                    .map((scope) => scope.trim())
                : [];

              const subServices = assetData["SubServices"]
                ? assetData["SubServices"]
                    .split(", ")
                    .map((service) => service.trim())
                : [];

              const parsedAssetData = {
                assetId: assetData["Asset ID"],
                assetTag: assetData["Asset Tag"],
                assetName: assetData["Name"],
                category: assetData["Category"],
                location: assetData["Location"],
                subServices: subServices.map((subService, index) => ({
                  subServiceName: subService,
                  serviceScopeIds: serviceScopes.map(
                    (scope, scopeIndex) =>
                      `${subService.replace(/\s+/g, "_").toUpperCase()}_${
                        scopeIndex + 1
                      }`
                  ),
                  serviceScopeNames: serviceScopes,
                })),
              };

              console.log("[v0] Parsed asset data:", parsedAssetData);
              resolve(parsedAssetData);
            } else {
              console.log("[v0] No QR code found in image");
              reject(new Error("No QR code found in the image"));
            }
          })
          .catch((error) => {
            console.error("[v0] Error importing jsQR:", error);
            // Fallback: try to decode as plain text if jsQR fails
            setTimeout(() => {
              try {
                // Try to extract text from image using OCR-like approach (simplified)
                const canvas2 = document.createElement("canvas");
                const ctx2 = canvas2.getContext("2d");
                canvas2.width = img.width;
                canvas2.height = img.height;
                ctx2.drawImage(img, 0, 0);

                // For now, show error message asking user to try again
                reject(
                  new Error(
                    "Could not decode QR code. Please ensure the image is clear and contains a valid QR code."
                  )
                );
              } catch (fallbackError) {
                reject(new Error("Failed to process QR code image"));
              }
            }, 500);
          });
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(file);
    });
  };

  useEffect(() => {
    if (qrCodeFile) {
      loadAssetFromQRFile();
    } else {
      setAssetData(null);
      setFormData((prev) => ({ ...prev, assetId: "", serviceScopeId: "" }));
    }
  }, [qrCodeFile]);

  useEffect(() => {
    if (formData.assetId) {
      loadAssetServiceScopes();
    } else {
      setAssetServiceScopes([]);
      setFormData((prev) => ({ ...prev, serviceScopeId: "" }));
    }
  }, [formData.assetId]);

  const loadAssetFromQRFile = async () => {
    setLoadingAsset(true);
    try {
      const asset = await decodeQRCode(qrCodeFile);

      setAssetData(asset);
      setFormData((prev) => ({ ...prev, assetId: asset.assetId }));
      toast.success(`Asset loaded: ${asset.assetTag} - ${asset.assetName}`);
    } catch (error) {
      console.error("Error decoding QR code:", error);
      toast.error("Failed to decode QR code from image");
      setAssetData(null);
    } finally {
      setLoadingAsset(false);
    }
  };

  const loadAssetServiceScopes = async () => {
    setLoadingServiceScopes(true);
    try {
      const allServiceScopes = [];
      if (assetData?.subServices && assetData.subServices.length > 0) {
        assetData.subServices.forEach((subService) => {
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

      setAssetServiceScopes(allServiceScopes);
    } catch (error) {
      console.error("Error loading asset service scopes:", error);
      toast.error("Failed to load asset service scopes");
      setAssetServiceScopes([]);
    } finally {
      setLoadingServiceScopes(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQrCodeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setAssetData(null);
      setFormData((prev) => ({ ...prev, assetId: "", serviceScopeId: "" }));
      setQrCodeFile(file);
    }
  };

  const removeQrCodeFile = () => {
    setQrCodeFile(null);
    setAssetData(null);
    setFormData((prev) => ({ ...prev, assetId: "", serviceScopeId: "" }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 2) {
      toast.error("Maximum 2 images allowed");
      return;
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.assetId) {
      toast.error("Please upload a QR code image to select an asset");
      return;
    }

    if (!formData.serviceScopeId) {
      toast.error("Please select a service scope");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Work request data:", formData);
      toast.success("Reactive maintenance work request created successfully");

      setFormData({
        workRequestType: "RM",
        assetId: "",
        serviceScopeId: "",
        reasonComment: "",
        priority: "RM_P1",
        images: [],
      });
      setQrCodeFile(null);
      setAssetData(null);

      onBack();
    } catch (error) {
      console.error("Error creating work request:", error);
      toast.error("Failed to create work request");
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setStream(mediaStream);
      setIsCameraActive(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Failed to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const captureQRCode = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Convert canvas to blob
    canvas.toBlob(
      async (blob) => {
        if (blob) {
          const file = new File([blob], "qr-capture.jpg", {
            type: "image/jpeg",
          });
          setQrCodeFile(file);
          stopCamera();
          toast.success("QR code captured! Processing...");
        }
      },
      "image/jpeg",
      0.8
    );
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 shadow-md mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Reactive Maintenance Work Request
        </h2>
        <p className="text-gray-600">
          Create a work request for reactive maintenance tasks
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Asset QR Code <span className="text-red-500">*</span>
          </label>

          {!qrCodeFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleQrCodeFileChange}
                className="hidden"
                id="qr-code-upload"
              />
              <label htmlFor="qr-code-upload" className="cursor-pointer">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload QR Code Image</p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG files supported
                </p>
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(qrCodeFile) || "/placeholder.svg"}
                alt="QR Code"
                className="w-full h-48 object-contain rounded-lg border border-gray-200 bg-gray-50"
              />
              <button
                type="button"
                onClick={removeQrCodeFile}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {loadingAsset && (
            <p className="text-sm text-blue-600 mt-2 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Decoding QR code...
            </p>
          )}
        </div>

        {assetData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800 mb-2">
              Selected Asset:
            </h3>
            <p className="text-sm text-green-700">
              <span className="font-medium">{assetData.assetTag}</span> -{" "}
              {assetData.assetName}
            </p>
            {assetData.location && (
              <p className="text-xs text-green-600 mt-1">
                Location: {assetData.location}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Asset Defined Services of Scope{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            name="serviceScopeId"
            value={formData.serviceScopeId}
            onChange={handleInputChange}
            disabled={!formData.assetId || loadingServiceScopes}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100"
            required
          >
            <option value="">
              {loadingServiceScopes
                ? "Loading service scopes..."
                : "Select Service Scope"}
            </option>
            {assetServiceScopes.map((scope) => (
              <option key={scope.scopeId} value={scope.scopeId}>
                {scope.scopeName} ({scope.subServiceName})
              </option>
            ))}
          </select>
          {formData.assetId &&
            assetServiceScopes.length === 0 &&
            !loadingServiceScopes && (
              <p className="text-sm text-gray-500 mt-1">
                No service scopes available for selected asset
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason/Comment
          </label>
          <textarea
            name="reasonComment"
            value={formData.reasonComment}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Describe the issue or reason for maintenance..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images (Optional - Max 2)
          </label>
          <div className="space-y-4">
            {formData.images.length < 2 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload-rm"
                />
                <label htmlFor="image-upload-rm" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload images or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB each
                  </p>
                </label>
              </div>
            )}

            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

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
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Create Work Request
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReactiveMaintenanceForm;
