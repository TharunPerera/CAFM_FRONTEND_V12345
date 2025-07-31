// "use client";

// import { useState, useEffect } from "react";
// import { Save, Upload, X, AlertCircle } from "lucide-react";
// import { workRequestService } from "../../services/WorkRequestService";
// import { assetService } from "../../services/assetService";
// import { contractService } from "../../services/contractService";
// import { toast } from "react-toastify";

// const CorrectiveMaintenanceForm = ({ onBack }) => {
//   const [formData, setFormData] = useState({
//     workRequestType: "CM",
//     assetId: "",
//     reasonComment: "",
//     priority: "CM_P1",
//     images: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [contracts, setContracts] = useState([]);
//   const [selectedContract, setSelectedContract] = useState("");
//   const [assets, setAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(false);

//   const priorityOptions = [
//     { value: "CM_P1", label: "CM P1 - High Priority", color: "text-red-600" },
//     {
//       value: "CM_P2",
//       label: "CM P2 - Medium Priority",
//       color: "text-yellow-600",
//     },
//     { value: "CM_P3", label: "CM P3 - Low Priority", color: "text-green-600" },
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
//       toast.success("Corrective maintenance work request created successfully");

//       // Reset form
//       setFormData({
//         workRequestType: "CM",
//         assetId: "",
//         reasonComment: "",
//         priority: "CM_P1",
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
//         <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-md mb-4">
//           <AlertCircle className="w-8 h-8 text-white" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Corrective Maintenance Work Request
//         </h2>
//         <p className="text-gray-600">
//           Create a work request for corrective maintenance tasks
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
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
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
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   className="hidden"
//                   id="image-upload"
//                 />
//                 <label htmlFor="image-upload" className="cursor-pointer">
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
//             className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
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

// export default CorrectiveMaintenanceForm;

"use client";

import { useState, useEffect } from "react";
import { Save, Upload, X, AlertCircle } from "lucide-react";
import { workRequestService } from "../../services/WorkRequestService";
import { assetService } from "../../services/assetService";
import { contractService } from "../../services/contractService";
import { toast } from "react-toastify";

const CorrectiveMaintenanceForm = ({ onBack }) => {
  const [formData, setFormData] = useState({
    workRequestType: "CM",
    assetId: "",
    serviceScopeId: "", // New field for service scope
    reasonComment: "",
    priority: "CM_P1",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");
  const [assets, setAssets] = useState([]);
  const [assetServiceScopes, setAssetServiceScopes] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [loadingServiceScopes, setLoadingServiceScopes] = useState(false);

  const priorityOptions = [
    { value: "CM_P1", label: "CM P1 - High Priority", color: "text-red-600" },
    {
      value: "CM_P2",
      label: "CM P2 - Medium Priority",
      color: "text-yellow-600",
    },
    { value: "CM_P3", label: "CM P3 - Low Priority", color: "text-green-600" },
  ];

  useEffect(() => {
    loadContracts();
  }, []);

  useEffect(() => {
    if (selectedContract) {
      loadAssets();
    } else {
      setAssets([]);
      setFormData((prev) => ({ ...prev, assetId: "", serviceScopeId: "" }));
    }
  }, [selectedContract]);

  useEffect(() => {
    if (formData.assetId) {
      loadAssetServiceScopes();
    } else {
      setAssetServiceScopes([]);
      setFormData((prev) => ({ ...prev, serviceScopeId: "" }));
    }
  }, [formData.assetId]);

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
    setLoadingAssets(true);
    try {
      const response = await assetService.getAssetsByContract(selectedContract);
      setAssets(response.data || []);
    } catch (error) {
      console.error("Error loading assets:", error);
      toast.error("Failed to load assets");
    } finally {
      setLoadingAssets(false);
    }
  };

  const loadAssetServiceScopes = async () => {
    setLoadingServiceScopes(true);
    try {
      // Get asset details to extract service scopes
      const assetResponse = await assetService.getAssetById(formData.assetId);
      const asset = assetResponse.data;

      // Extract all service scopes from all sub-services
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
      toast.error("Please select an asset");
      return;
    }

    if (!formData.serviceScopeId) {
      toast.error("Please select a service scope");
      return;
    }

    setLoading(true);
    try {
      await workRequestService.createWorkRequest(formData);
      toast.success("Corrective maintenance work request created successfully");

      // Reset form
      setFormData({
        workRequestType: "CM",
        assetId: "",
        serviceScopeId: "",
        reasonComment: "",
        priority: "CM_P1",
        images: [],
      });
      setSelectedContract("");

      // Go back to main view
      onBack();
    } catch (error) {
      console.error("Error creating work request:", error);
      toast.error(
        error.response?.data?.message || "Failed to create work request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-md mb-4">
          <AlertCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Corrective Maintenance Work Request
        </h2>
        <p className="text-gray-600">
          Create a work request for corrective maintenance tasks
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contract Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contract <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedContract}
            onChange={(e) => setSelectedContract(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

        {/* Asset Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Asset <span className="text-red-500">*</span>
          </label>
          <select
            name="assetId"
            value={formData.assetId}
            onChange={handleInputChange}
            disabled={!selectedContract || loadingAssets}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
            required
          >
            <option value="">
              {loadingAssets ? "Loading assets..." : "Select Asset"}
            </option>
            {assets.map((asset) => (
              <option key={asset.assetId} value={asset.assetId}>
                {asset.assetTag} - {asset.assetName}
              </option>
            ))}
          </select>
        </div>

        {/* Asset Defined Services of Scope */}
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
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

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Describe the issue or reason for maintenance..."
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images (Optional - Max 2)
          </label>
          <div className="space-y-4">
            {formData.images.length < 2 && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
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

            {/* Image Preview */}
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
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
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

export default CorrectiveMaintenanceForm;
