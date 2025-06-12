// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Save,
//   X,
//   Upload,
//   Calendar,
//   Clock,
//   Tag,
//   Barcode,
//   Box,
//   Cpu,
//   Info,
//   Building,
//   MapPin,
//   Layers,
//   Home,
//   DoorOpen,
//   Wrench,
//   User,
//   AlertTriangle,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { companyService } from "../services/companyService";
// import { serviceManagementService } from "../services/serviceManagementService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const AssetForm = ({ isEdit = false }) => {
//   const navigate = useNavigate();
//   const { assetId } = useParams();
//   const { user } = useContext(AuthContext);

//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [asset, setAsset] = useState({
//     assetName: "",
//     serialNumber: "",
//     brandName: "",
//     modelNumber: "",
//     assetStatus: "ACTIVE",
//     companyId: "",
//     contractId: "",
//     zoneId: "",
//     subZoneId: "",
//     buildingId: "",
//     villaApartmentId: "",
//     floorId: "",
//     roomId: "",
//     serviceId: "",
//     subServiceId: "",
//     serviceScopeId: "",
//     internalUserId: user?.internalUserId || "",
//     purchaseDate: "",
//     installationDate: "",
//     warrantyPeriodDays: "",
//     ownerType: "KANVEL",
//     lastAuditDate: "",
//     expectedUsefulLifeDays: "",
//     images: [],
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreview, setImagePreview] = useState([]);
//   const [errors, setErrors] = useState({});

//   // Options for dropdowns
//   const [companies, setCompanies] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [subZones, setSubZones] = useState([]);
//   const [buildings, setBuildings] = useState([]);
//   const [villaApartments, setVillaApartments] = useState([]);
//   const [floors, setFloors] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState([]);
//   const [serviceScopes, setServiceScopes] = useState([]);

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       try {
//         // Load companies
//         const companiesResponse = await companyService.getAllCompanies();
//         setCompanies(companiesResponse.data || []);

//         // Load contracts
//         const contractsResponse = await contractService.getAllContracts();
//         setContracts(contractsResponse.data || []);

//         // Load services
//         const servicesResponse = await serviceManagementService.getServices();
//         setServices(servicesResponse.data || []);

//         if (isEdit && assetId) {
//           const assetResponse = await assetService.getAssetById(assetId);
//           const assetData = assetResponse.data;

//           setAsset({
//             ...assetData,
//             companyId: assetData.companyId.toString(),
//             contractId: assetData.contractId.toString(),
//             zoneId: assetData.zoneId.toString(),
//             subZoneId: assetData.subZoneId.toString(),
//             buildingId: assetData.buildingId.toString(),
//             villaApartmentId: assetData.villaApartmentId.toString(),
//             floorId: assetData.floorId.toString(),
//             roomId: assetData.roomId.toString(),
//             serviceId: assetData.serviceId.toString(),
//             subServiceId: assetData.subServiceId.toString(),
//             serviceScopeId: assetData.serviceScopeId.toString(),
//             internalUserId: assetData.internalUserId.toString(),
//           });

//           if (assetData.imageUrls && assetData.imageUrls.length > 0) {
//             setImagePreview(assetData.imageUrls);
//           }

//           // Load dependent data based on selected values
//           await loadZones(assetData.contractId);
//           await loadSubZones(assetData.contractId, assetData.zoneId);
//           await loadBuildings(assetData.contractId, assetData.subZoneId);
//           await loadVillaApartments(assetData.contractId, assetData.buildingId);
//           await loadFloors(assetData.contractId, assetData.villaApartmentId);
//           await loadRooms(assetData.contractId, assetData.floorId);
//           await loadSubServices(assetData.serviceId);
//           await loadServiceScopes(assetData.subServiceId);
//         }
//       } catch (error) {
//         console.error("Error loading initial data:", error);
//         toast.error("Failed to load form data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInitialData();
//   }, [isEdit, assetId, user]);

//   const loadZones = async (contractId) => {
//     if (!contractId) return;
//     try {
//       const response = await propertyFlowService.getAllZonesByContract(
//         contractId
//       );
//       setZones(response.data || []);
//     } catch (error) {
//       console.error("Error loading zones:", error);
//     }
//   };

//   const loadSubZones = async (contractId, zoneId) => {
//     if (!contractId || !zoneId) return;
//     try {
//       const response = await propertyFlowService.getAllSubZonesByContract(
//         contractId
//       );
//       setSubZones(
//         (response.data || []).filter(
//           (sz) => sz.zoneId.toString() === zoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading sub zones:", error);
//     }
//   };

//   const loadBuildings = async (contractId, subZoneId) => {
//     if (!contractId || !subZoneId) return;
//     try {
//       const response = await propertyFlowService.getAllBuildingsByContract(
//         contractId
//       );
//       setBuildings(
//         (response.data || []).filter(
//           (b) => b.subZoneId.toString() === subZoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading buildings:", error);
//     }
//   };

//   const loadVillaApartments = async (contractId, buildingId) => {
//     if (!contractId || !buildingId) return;
//     try {
//       const response =
//         await propertyFlowService.getAllVillaApartmentsByContract(contractId);
//       setVillaApartments(
//         (response.data || []).filter(
//           (va) => va.buildingId.toString() === buildingId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading villa apartments:", error);
//     }
//   };

//   const loadFloors = async (contractId, villaApartmentId) => {
//     if (!contractId || !villaApartmentId) return;
//     try {
//       const response = await propertyFlowService.getAllFloorsByContract(
//         contractId
//       );
//       setFloors(
//         (response.data || []).filter(
//           (f) => f.villaApartmentId.toString() === villaApartmentId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading floors:", error);
//     }
//   };

//   const loadRooms = async (contractId, floorId) => {
//     if (!contractId || !floorId) return;
//     try {
//       const response = await propertyFlowService.getAllRoomsByContract(
//         contractId
//       );
//       setRooms(
//         (response.data || []).filter(
//           (r) => r.floorId.toString() === floorId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading rooms:", error);
//     }
//   };
//   const loadSubServices = async (serviceId) => {
//     if (!serviceId) {
//       setSubServices([]);
//       return;
//     }
//     try {
//       const response = await contractService.getSubServices(serviceId);
//       console.log("SubServices response:", response.data); // Debug the response
//       setSubServices(response.data || []);
//     } catch (error) {
//       console.error("Error loading sub services:", error);
//       setSubServices([]);
//       toast.error("Failed to load sub-services");
//     }
//   };

//   const loadServiceScopes = async (subServiceId) => {
//     if (!subServiceId) {
//       setServiceScopes([]);
//       return;
//     }
//     try {
//       const response = await contractService.getServiceScopes(subServiceId);
//       console.log("ServiceScopes response:", response.data); // Debug the response
//       setServiceScopes(response.data || []);
//     } catch (error) {
//       console.error("Error loading service scopes:", error);
//       setServiceScopes([]);
//       toast.error("Failed to load service scopes");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAsset((prev) => ({ ...prev, [name]: value }));

//     // Clear errors
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     }

//     // Handle dependent dropdowns
//     if (name === "contractId") {
//       loadZones(value);
//       setAsset((prev) => ({
//         ...prev,
//         zoneId: "",
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "zoneId") {
//       loadSubZones(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "subZoneId") {
//       loadBuildings(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "buildingId") {
//       loadVillaApartments(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "villaApartmentId") {
//       loadFloors(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "floorId") {
//       loadRooms(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         roomId: "",
//       }));
//     } else if (name === "serviceId") {
//       loadSubServices(value);
//       setAsset((prev) => ({
//         ...prev,
//         subServiceId: "",
//         serviceScopeId: "",
//       }));
//     } else if (name === "subServiceId") {
//       loadServiceScopes(value);
//       setAsset((prev) => ({
//         ...prev,
//         serviceScopeId: "",
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const currentImageCount = imageFiles.length + imagePreview.length;
//     const availableSlots = 3 - currentImageCount;

//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum 3 images allowed.`
//       );
//       return;
//     }

//     setImageFiles((prev) => [...prev, ...files]);

//     // Create preview URLs
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setImagePreview((prev) => [...prev, ...newPreviews]);

//     // Clear image error if exists
//     if (errors.images) {
//       setErrors((prev) => ({ ...prev, images: null }));
//     }
//   };

//   const removeImage = (index) => {
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));
//     setImagePreview((prev) => prev.filter((_, i) => i !== index));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!asset.assetName.trim()) {
//       newErrors.assetName = "Asset name is required";
//     }

//     if (!asset.companyId) {
//       newErrors.companyId = "Company is required";
//     }

//     if (!asset.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     if (!asset.zoneId) {
//       newErrors.zoneId = "Zone is required";
//     }

//     if (!asset.subZoneId) {
//       newErrors.subZoneId = "Sub Zone is required";
//     }

//     if (!asset.buildingId) {
//       newErrors.buildingId = "Building is required";
//     }

//     if (!asset.villaApartmentId) {
//       newErrors.villaApartmentId = "Villa/Apartment is required";
//     }

//     if (!asset.floorId) {
//       newErrors.floorId = "Floor is required";
//     }

//     if (!asset.roomId) {
//       newErrors.roomId = "Room is required";
//     }

//     if (!asset.serviceId) {
//       newErrors.serviceId = "Service is required";
//     }

//     if (!asset.subServiceId) {
//       newErrors.subServiceId = "Sub Service is required";
//     }

//     if (!asset.serviceScopeId) {
//       newErrors.serviceScopeId = "Service Scope is required";
//     }

//     if (!asset.assetStatus) {
//       newErrors.assetStatus = "Asset Status is required";
//     }

//     if (!isEdit && imageFiles.length === 0) {
//       newErrors.images = "At least one image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const assetData = {
//         ...asset,
//         images: imageFiles,
//       };

//       if (isEdit) {
//         await assetService.updateAsset(assetId, assetData);
//         toast.success("Asset updated successfully");
//       } else {
//         await assetService.createAsset(assetData);
//         toast.success("Asset created successfully");
//       }

//       navigate("/assets/list");
//     } catch (error) {
//       console.error("Error saving asset:", error);
//       toast.error(error.response?.data?.message || "Failed to save asset");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-lg font-medium text-gray-700">
//           Loading...
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {isEdit ? "Edit Asset" : "Create New Asset"}
//           </h1>
//           <p className="text-gray-600">
//             {isEdit
//               ? "Update asset information"
//               : "Add a new asset to your inventory"}
//           </p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Info className="w-5 h-5 mr-2 text-blue-600" />
//             Basic Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Tag className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Name *
//               </label>
//               <input
//                 type="text"
//                 name="assetName"
//                 value={asset.assetName}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.assetName ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter asset name"
//               />
//               {errors.assetName && (
//                 <p className="text-red-500 text-sm">{errors.assetName}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Barcode className="w-4 h-4 mr-1 text-gray-500" />
//                 Serial Number
//               </label>
//               <input
//                 type="text"
//                 name="serialNumber"
//                 value={asset.serialNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter serial number"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Box className="w-4 h-4 mr-1 text-gray-500" />
//                 Brand Name
//               </label>
//               <input
//                 type="text"
//                 name="brandName"
//                 value={asset.brandName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter brand name"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Cpu className="w-4 h-4 mr-1 text-gray-500" />
//                 Model Number
//               </label>
//               <input
//                 type="text"
//                 name="modelNumber"
//                 value={asset.modelNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter model number"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Status *
//               </label>
//               <select
//                 name="assetStatus"
//                 value={asset.assetStatus}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.assetStatus ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="ACTIVE">Active</option>
//                 <option value="UNDER_MAINTENANCE">Under Maintenance</option>
//                 <option value="DECOMMISSIONED">Decommissioned</option>
//               </select>
//               {errors.assetStatus && (
//                 <p className="text-red-500 text-sm">{errors.assetStatus}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <User className="w-4 h-4 mr-1 text-gray-500" />
//                 Owner Type
//               </label>
//               <select
//                 name="ownerType"
//                 value={asset.ownerType}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="KANVEL">Kanvel</option>
//                 <option value="TENANT">Tenant</option>
//                 <option value="PROPERTY_OWNER">Property Owner</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Organization Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Building className="w-5 h-5 mr-2 text-blue-600" />
//             Organization Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Company *
//               </label>
//               <select
//                 name="companyId"
//                 value={asset.companyId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.companyId ? "border-red-500" : "border-gray-300"
//                 }`}
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
//               {errors.companyId && (
//                 <p className="text-red-500 text-sm">{errors.companyId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Contract *
//               </label>
//               <select
//                 name="contractId"
//                 value={asset.contractId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.contractId ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">Select Contract</option>
//                 {contracts.map((contract) => (
//                   <option
//                     key={contract.contractId}
//                     value={contract.contractId.toString()}
//                   >
//                     {contract.contractName}
//                   </option>
//                 ))}
//               </select>
//               {errors.contractId && (
//                 <p className="text-red-500 text-sm">{errors.contractId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Location Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <MapPin className="w-5 h-5 mr-2 text-blue-600" />
//             Location Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <MapPin className="w-4 h-4 mr-1 text-gray-500" />
//                 Zone *
//               </label>
//               <select
//                 name="zoneId"
//                 value={asset.zoneId}
//                 onChange={handleChange}
//                 disabled={!asset.contractId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.zoneId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.contractId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Zone</option>
//                 {zones.map((zone) => (
//                   <option key={zone.zoneId} value={zone.zoneId.toString()}>
//                     {zone.zoneName}
//                   </option>
//                 ))}
//               </select>
//               {errors.zoneId && (
//                 <p className="text-red-500 text-sm">{errors.zoneId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                 Sub Zone *
//               </label>
//               <select
//                 name="subZoneId"
//                 value={asset.subZoneId}
//                 onChange={handleChange}
//                 disabled={!asset.zoneId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.subZoneId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.zoneId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Sub Zone</option>
//                 {subZones.map((subZone) => (
//                   <option
//                     key={subZone.subZoneId}
//                     value={subZone.subZoneId.toString()}
//                   >
//                     {subZone.subZoneName}
//                   </option>
//                 ))}
//               </select>
//               {errors.subZoneId && (
//                 <p className="text-red-500 text-sm">{errors.subZoneId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Building className="w-4 h-4 mr-1 text-gray-500" />
//                 Building *
//               </label>
//               <select
//                 name="buildingId"
//                 value={asset.buildingId}
//                 onChange={handleChange}
//                 disabled={!asset.subZoneId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.buildingId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subZoneId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Building</option>
//                 {buildings.map((building) => (
//                   <option
//                     key={building.buildingId}
//                     value={building.buildingId.toString()}
//                   >
//                     {building.buildingName}
//                   </option>
//                 ))}
//               </select>
//               {errors.buildingId && (
//                 <p className="text-red-500 text-sm">{errors.buildingId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Home className="w-4 h-4 mr-1 text-gray-500" />
//                 Villa/Apartment *
//               </label>
//               <select
//                 name="villaApartmentId"
//                 value={asset.villaApartmentId}
//                 onChange={handleChange}
//                 disabled={!asset.buildingId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.villaApartmentId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.buildingId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Villa/Apartment</option>
//                 {villaApartments.map((va) => (
//                   <option
//                     key={va.villaApartmentId}
//                     value={va.villaApartmentId.toString()}
//                   >
//                     {va.villaApartmentName}
//                   </option>
//                 ))}
//               </select>
//               {errors.villaApartmentId && (
//                 <p className="text-red-500 text-sm">
//                   {errors.villaApartmentId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                 Floor *
//               </label>
//               <select
//                 name="floorId"
//                 value={asset.floorId}
//                 onChange={handleChange}
//                 disabled={!asset.villaApartmentId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.floorId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.villaApartmentId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Floor</option>
//                 {floors.map((floor) => (
//                   <option key={floor.floorId} value={floor.floorId.toString()}>
//                     {floor.floorName}
//                   </option>
//                 ))}
//               </select>
//               {errors.floorId && (
//                 <p className="text-red-500 text-sm">{errors.floorId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
//                 Room *
//               </label>
//               <select
//                 name="roomId"
//                 value={asset.roomId}
//                 onChange={handleChange}
//                 disabled={!asset.floorId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.roomId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.floorId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Room</option>
//                 {rooms.map((room) => (
//                   <option key={room.roomId} value={room.roomId.toString()}>
//                     {room.roomName}
//                   </option>
//                 ))}
//               </select>
//               {errors.roomId && (
//                 <p className="text-red-500 text-sm">{errors.roomId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Service Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Wrench className="w-5 h-5 mr-2 text-blue-600" />
//             Service Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Service *
//               </label>
//               <select
//                 name="serviceId"
//                 value={asset.serviceId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceId ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">Select Service</option>
//                 {services.map((service) => (
//                   <option
//                     key={service.serviceId}
//                     value={service.serviceId.toString()}
//                   >
//                     {service.serviceName}
//                   </option>
//                 ))}
//               </select>
//               {errors.serviceId && (
//                 <p className="text-red-500 text-sm">{errors.serviceId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Sub Service *
//               </label>
//               <select
//                 name="subServiceId"
//                 value={asset.subServiceId}
//                 onChange={handleChange}
//                 disabled={!asset.serviceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.subServiceId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.serviceId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Sub Service</option>
//                 {subServices.map((subService) => (
//                   <option
//                     key={subService.subServiceId}
//                     value={subService.subServiceId.toString()}
//                   >
//                     {subService.subServiceName}
//                   </option>
//                 ))}
//               </select>
//               {errors.subServiceId && (
//                 <p className="text-red-500 text-sm">{errors.subServiceId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Service Scope *
//               </label>
//               <select
//                 name="serviceScopeId"
//                 value={asset.serviceScopeId}
//                 onChange={handleChange}
//                 disabled={!asset.subServiceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceScopeId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subServiceId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Service Scope</option>
//                 {serviceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId.toString()}>
//                     {scope.scopeName}
//                   </option>
//                 ))}
//               </select>
//               {errors.serviceScopeId && (
//                 <p className="text-red-500 text-sm">{errors.serviceScopeId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Lifecycle Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Clock className="w-5 h-5 mr-2 text-blue-600" />
//             Lifecycle Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Purchase Date
//               </label>
//               <input
//                 type="date"
//                 name="purchaseDate"
//                 value={asset.purchaseDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Installation Date
//               </label>
//               <input
//                 type="date"
//                 name="installationDate"
//                 value={asset.installationDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Warranty Period (Days)
//               </label>
//               <input
//                 type="number"
//                 name="warrantyPeriodDays"
//                 value={asset.warrantyPeriodDays}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter warranty period in days"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Expected Useful Life (Days)
//               </label>
//               <input
//                 type="number"
//                 name="expectedUsefulLifeDays"
//                 value={asset.expectedUsefulLifeDays}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter expected useful life in days"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Last Audit Date
//               </label>
//               <input
//                 type="date"
//                 name="lastAuditDate"
//                 value={asset.lastAuditDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Images */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Upload className="w-5 h-5 mr-2 text-blue-600" />
//             Asset Images {!isEdit && "*"}
//           </h2>

//           <div className="space-y-4">
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center ${
//                 errors.images ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             >
//               <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 mb-2">
//                 Click to upload or drag and drop asset images
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 {imagePreview.length}/3 images uploaded (Maximum 3 images
//                 allowed)
//               </p>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//                 id="image-upload"
//                 disabled={imagePreview.length >= 3}
//               />
//               <label
//                 htmlFor="image-upload"
//                 className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer ${
//                   imagePreview.length >= 3
//                     ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 <Upload className="w-4 h-4 mr-2" />
//                 {imagePreview.length >= 3
//                   ? "Maximum Images Reached"
//                   : "Choose Images"}
//               </label>
//               {errors.images && (
//                 <p className="text-red-500 text-sm mt-2">{errors.images}</p>
//               )}
//             </div>

//             {imagePreview.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {imagePreview.map((preview, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={preview || "/placeholder.svg"}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={() => navigate("/assets/list")}
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={submitting}
//             className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//           >
//             {submitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 {isEdit ? "Updating..." : "Creating..."}
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 {isEdit ? "Update Asset" : "Create Asset"}
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AssetForm;

///22222222223333333333

// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Save,
//   X,
//   Upload,
//   Calendar,
//   Clock,
//   Tag,
//   Barcode,
//   Box,
//   Cpu,
//   Info,
//   Building,
//   MapPin,
//   Layers,
//   Home,
//   DoorOpen,
//   Wrench,
//   User,
//   AlertTriangle,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { companyService } from "../services/companyService";
// import { serviceManagementService } from "../services/serviceManagementService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const AssetForm = ({ isEdit = false }) => {
//   const navigate = useNavigate();
//   const { assetId } = useParams();
//   const { user } = useContext(AuthContext);

//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [asset, setAsset] = useState({
//     assetName: "",
//     serialNumber: "",
//     brandName: "",
//     modelNumber: "",
//     assetStatus: "ACTIVE",
//     companyId: "",
//     contractId: "",
//     zoneId: "",
//     subZoneId: "",
//     buildingId: "",
//     villaApartmentId: "",
//     floorId: "",
//     roomId: "",
//     serviceId: "",
//     subServiceId: "",
//     serviceScopeId: "",
//     // Removed internalUserId
//     purchaseDate: "",
//     installationDate: "",
//     warrantyPeriodDays: "",
//     ownerType: "KANVEL",
//     lastAuditDate: "",
//     expectedUsefulLifeDays: "",
//     images: [],
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreview, setImagePreview] = useState([]);
//   const [errors, setErrors] = useState({});

//   // Options for dropdowns
//   const [companies, setCompanies] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [subZones, setSubZones] = useState([]);
//   const [buildings, setBuildings] = useState([]);
//   const [villaApartments, setVillaApartments] = useState([]);
//   const [floors, setFloors] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState([]);
//   const [serviceScopes, setServiceScopes] = useState([]);

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       try {
//         // Load companies
//         const companiesResponse = await companyService.getAllCompanies();
//         setCompanies(companiesResponse.data || []);

//         // Load contracts
//         const contractsResponse = await contractService.getAllContracts();
//         setContracts(contractsResponse.data || []);

//         // Load services
//         const servicesResponse = await serviceManagementService.getServices();
//         setServices(servicesResponse.data || []);

//         if (isEdit && assetId) {
//           const assetResponse = await assetService.getAssetById(assetId);
//           const assetData = assetResponse.data;

//           setAsset({
//             ...assetData,
//             companyId: assetData.companyId.toString(),
//             contractId: assetData.contractId.toString(),
//             zoneId: assetData.zoneId.toString(),
//             subZoneId: assetData.subZoneId.toString(),
//             buildingId: assetData.buildingId.toString(),
//             villaApartmentId: assetData.villaApartmentId.toString(),
//             floorId: assetData.floorId.toString(),
//             roomId: assetData.roomId.toString(),
//             serviceId: assetData.serviceId.toString(),
//             subServiceId: assetData.subServiceId.toString(),
//             serviceScopeId: assetData.serviceScopeId.toString(),
//             // Removed internalUserId
//           });

//           if (assetData.imageUrls && assetData.imageUrls.length > 0) {
//             setImagePreview(assetData.imageUrls);
//           }

//           // Load dependent data based on selected values
//           await loadZones(assetData.contractId);
//           await loadSubZones(assetData.contractId, assetData.zoneId);
//           await loadBuildings(assetData.contractId, assetData.subZoneId);
//           await loadVillaApartments(assetData.contractId, assetData.buildingId);
//           await loadFloors(assetData.contractId, assetData.villaApartmentId);
//           await loadRooms(assetData.contractId, assetData.floorId);
//           await loadSubServices(assetData.serviceId);
//           await loadServiceScopes(assetData.subServiceId);
//         }
//       } catch (error) {
//         console.error("Error loading initial data:", error);
//         toast.error("Failed to load form data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInitialData();
//   }, [isEdit, assetId]);

//   const loadZones = async (contractId) => {
//     if (!contractId) return;
//     try {
//       const response = await propertyFlowService.getAllZonesByContract(
//         contractId
//       );
//       setZones(response.data || []);
//     } catch (error) {
//       console.error("Error loading zones:", error);
//     }
//   };

//   const loadSubZones = async (contractId, zoneId) => {
//     if (!contractId || !zoneId) return;
//     try {
//       const response = await propertyFlowService.getAllSubZonesByContract(
//         contractId
//       );
//       setSubZones(
//         (response.data || []).filter(
//           (sz) => sz.zoneId.toString() === zoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading sub zones:", error);
//     }
//   };

//   const loadBuildings = async (contractId, subZoneId) => {
//     if (!contractId || !subZoneId) return;
//     try {
//       const response = await propertyFlowService.getAllBuildingsByContract(
//         contractId
//       );
//       setBuildings(
//         (response.data || []).filter(
//           (b) => b.subZoneId.toString() === subZoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading buildings:", error);
//     }
//   };

//   const loadVillaApartments = async (contractId, buildingId) => {
//     if (!contractId || !buildingId) return;
//     try {
//       const response =
//         await propertyFlowService.getAllVillaApartmentsByContract(contractId);
//       setVillaApartments(
//         (response.data || []).filter(
//           (va) => va.buildingId.toString() === buildingId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading villa apartments:", error);
//     }
//   };

//   const loadFloors = async (contractId, villaApartmentId) => {
//     if (!contractId || !villaApartmentId) return;
//     try {
//       const response = await propertyFlowService.getAllFloorsByContract(
//         contractId
//       );
//       setFloors(
//         (response.data || []).filter(
//           (f) => f.villaApartmentId.toString() === villaApartmentId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading floors:", error);
//     }
//   };

//   const loadRooms = async (contractId, floorId) => {
//     if (!contractId || !floorId) return;
//     try {
//       const response = await propertyFlowService.getAllRoomsByContract(
//         contractId
//       );
//       setRooms(
//         (response.data || []).filter(
//           (r) => r.floorId.toString() === floorId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading rooms:", error);
//     }
//   };
//   const loadSubServices = async (serviceId) => {
//     if (!serviceId) {
//       setSubServices([]);
//       return;
//     }
//     try {
//       const response = await contractService.getSubServices(serviceId);
//       console.log("SubServices response:", response.data); // Debug the response
//       setSubServices(response.data || []);
//     } catch (error) {
//       console.error("Error loading sub services:", error);
//       setSubServices([]);
//       toast.error("Failed to load sub-services");
//     }
//   };

//   const loadServiceScopes = async (subServiceId) => {
//     if (!subServiceId) {
//       setServiceScopes([]);
//       return;
//     }
//     try {
//       const response = await contractService.getServiceScopes(subServiceId);
//       console.log("ServiceScopes response:", response.data); // Debug the response
//       setServiceScopes(response.data || []);
//     } catch (error) {
//       console.error("Error loading service scopes:", error);
//       setServiceScopes([]);
//       toast.error("Failed to load service scopes");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAsset((prev) => ({ ...prev, [name]: value }));

//     // Clear errors
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     }

//     // Handle dependent dropdowns
//     if (name === "contractId") {
//       loadZones(value);
//       setAsset((prev) => ({
//         ...prev,
//         zoneId: "",
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "zoneId") {
//       loadSubZones(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "subZoneId") {
//       loadBuildings(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "buildingId") {
//       loadVillaApartments(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "villaApartmentId") {
//       loadFloors(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "floorId") {
//       loadRooms(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         roomId: "",
//       }));
//     } else if (name === "serviceId") {
//       loadSubServices(value);
//       setAsset((prev) => ({
//         ...prev,
//         subServiceId: "",
//         serviceScopeId: "",
//       }));
//     } else if (name === "subServiceId") {
//       loadServiceScopes(value);
//       setAsset((prev) => ({
//         ...prev,
//         serviceScopeId: "",
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const currentImageCount = imageFiles.length + imagePreview.length;
//     const availableSlots = 3 - currentImageCount;

//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum 3 images allowed.`
//       );
//       return;
//     }

//     setImageFiles((prev) => [...prev, ...files]);

//     // Create preview URLs
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setImagePreview((prev) => [...prev, ...newPreviews]);

//     // Clear image error if exists
//     if (errors.images) {
//       setErrors((prev) => ({ ...prev, images: null }));
//     }
//   };

//   const removeImage = (index) => {
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));
//     setImagePreview((prev) => prev.filter((_, i) => i !== index));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!asset.assetName.trim()) {
//       newErrors.assetName = "Asset name is required";
//     }

//     if (!user || !user.username) {
//       newErrors.username = "User information is required. Please log in again.";
//     }

//     if (!asset.companyId) {
//       newErrors.companyId = "Company is required";
//     }

//     if (!asset.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     if (!asset.zoneId) {
//       newErrors.zoneId = "Zone is required";
//     }

//     if (!asset.subZoneId) {
//       newErrors.subZoneId = "Sub Zone is required";
//     }

//     if (!asset.buildingId) {
//       newErrors.buildingId = "Building is required";
//     }

//     if (!asset.villaApartmentId) {
//       newErrors.villaApartmentId = "Villa/Apartment is required";
//     }

//     if (!asset.floorId) {
//       newErrors.floorId = "Floor is required";
//     }

//     if (!asset.roomId) {
//       newErrors.roomId = "Room is required";
//     }

//     if (!asset.serviceId) {
//       newErrors.serviceId = "Service is required";
//     }

//     if (!asset.subServiceId) {
//       newErrors.subServiceId = "Sub Service is required";
//     }

//     if (!asset.serviceScopeId) {
//       newErrors.serviceScopeId = "Service Scope is required";
//     }

//     if (!asset.assetStatus) {
//       newErrors.assetStatus = "Asset Status is required";
//     }

//     if (!isEdit && imageFiles.length === 0) {
//       newErrors.images = "At least one image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     if (!user || !user.username) {
//       toast.error("User information is missing. Please log in again.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const assetData = {
//         ...asset,
//         images: imageFiles,
//         // The backend will use the authenticated user's username
//       };

//       if (isEdit) {
//         await assetService.updateAsset(assetId, assetData);
//         toast.success("Asset updated successfully");
//       } else {
//         await assetService.createAsset(assetData);
//         toast.success("Asset created successfully");
//       }

//       navigate("/assets/list");
//     } catch (error) {
//       console.error("Error saving asset:", error);
//       toast.error(error.response?.data?.message || "Failed to save asset");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-lg font-medium text-gray-700">
//           Loading...
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {isEdit ? "Edit Asset" : "Create New Asset"}
//           </h1>
//           <p className="text-gray-600">
//             {isEdit
//               ? "Update asset information"
//               : "Add a new asset to your inventory"}
//           </p>
//         </div>
//       </div>

//       {/* Display warning if username is missing */}
//       {(!user || !user.username) && (
//         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
//           <div className="flex">
//             <AlertTriangle className="h-5 w-5 text-yellow-400" />
//             <div className="ml-3">
//               <p className="text-sm text-yellow-700">
//                 User information is missing. Please log out and log in again to
//                 fix this issue.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Info className="w-5 h-5 mr-2 text-blue-600" />
//             Basic Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Tag className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Name *
//               </label>
//               <input
//                 type="text"
//                 name="assetName"
//                 value={asset.assetName}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.assetName ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter asset name"
//               />
//               {errors.assetName && (
//                 <p className="text-red-500 text-sm">{errors.assetName}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Barcode className="w-4 h-4 mr-1 text-gray-500" />
//                 Serial Number
//               </label>
//               <input
//                 type="text"
//                 name="serialNumber"
//                 value={asset.serialNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter serial number"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Box className="w-4 h-4 mr-1 text-gray-500" />
//                 Brand Name
//               </label>
//               <input
//                 type="text"
//                 name="brandName"
//                 value={asset.brandName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter brand name"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Cpu className="w-4 h-4 mr-1 text-gray-500" />
//                 Model Number
//               </label>
//               <input
//                 type="text"
//                 name="modelNumber"
//                 value={asset.modelNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter model number"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Status *
//               </label>
//               <select
//                 name="assetStatus"
//                 value={asset.assetStatus}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.assetStatus ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="ACTIVE">Active</option>
//                 <option value="UNDER_MAINTENANCE">Under Maintenance</option>
//                 <option value="DECOMMISSIONED">Decommissioned</option>
//               </select>
//               {errors.assetStatus && (
//                 <p className="text-red-500 text-sm">{errors.assetStatus}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <User className="w-4 h-4 mr-1 text-gray-500" />
//                 Owner Type
//               </label>
//               <select
//                 name="ownerType"
//                 value={asset.ownerType}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="KANVEL">Kanvel</option>
//                 <option value="TENANT">Tenant</option>
//                 <option value="PROPERTY_OWNER">Property Owner</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Rest of the form remains the same */}
//         {/* Organization Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Building className="w-5 h-5 mr-2 text-blue-600" />
//             Organization Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Company *
//               </label>
//               <select
//                 name="companyId"
//                 value={asset.companyId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.companyId ? "border-red-500" : "border-gray-300"
//                 }`}
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
//               {errors.companyId && (
//                 <p className="text-red-500 text-sm">{errors.companyId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Contract *
//               </label>
//               <select
//                 name="contractId"
//                 value={asset.contractId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.contractId ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">Select Contract</option>
//                 {contracts.map((contract) => (
//                   <option
//                     key={contract.contractId}
//                     value={contract.contractId.toString()}
//                   >
//                     {contract.contractName}
//                   </option>
//                 ))}
//               </select>
//               {errors.contractId && (
//                 <p className="text-red-500 text-sm">{errors.contractId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Location Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <MapPin className="w-5 h-5 mr-2 text-blue-600" />
//             Location Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <MapPin className="w-4 h-4 mr-1 text-gray-500" />
//                 Zone *
//               </label>
//               <select
//                 name="zoneId"
//                 value={asset.zoneId}
//                 onChange={handleChange}
//                 disabled={!asset.contractId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.zoneId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.contractId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Zone</option>
//                 {zones.map((zone) => (
//                   <option key={zone.zoneId} value={zone.zoneId.toString()}>
//                     {zone.zoneName}
//                   </option>
//                 ))}
//               </select>
//               {errors.zoneId && (
//                 <p className="text-red-500 text-sm">{errors.zoneId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                 Sub Zone *
//               </label>
//               <select
//                 name="subZoneId"
//                 value={asset.subZoneId}
//                 onChange={handleChange}
//                 disabled={!asset.zoneId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.subZoneId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.zoneId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Sub Zone</option>
//                 {subZones.map((subZone) => (
//                   <option
//                     key={subZone.subZoneId}
//                     value={subZone.subZoneId.toString()}
//                   >
//                     {subZone.subZoneName}
//                   </option>
//                 ))}
//               </select>
//               {errors.subZoneId && (
//                 <p className="text-red-500 text-sm">{errors.subZoneId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Building className="w-4 h-4 mr-1 text-gray-500" />
//                 Building *
//               </label>
//               <select
//                 name="buildingId"
//                 value={asset.buildingId}
//                 onChange={handleChange}
//                 disabled={!asset.subZoneId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.buildingId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subZoneId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Building</option>
//                 {buildings.map((building) => (
//                   <option
//                     key={building.buildingId}
//                     value={building.buildingId.toString()}
//                   >
//                     {building.buildingName}
//                   </option>
//                 ))}
//               </select>
//               {errors.buildingId && (
//                 <p className="text-red-500 text-sm">{errors.buildingId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Home className="w-4 h-4 mr-1 text-gray-500" />
//                 Villa/Apartment *
//               </label>
//               <select
//                 name="villaApartmentId"
//                 value={asset.villaApartmentId}
//                 onChange={handleChange}
//                 disabled={!asset.buildingId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.villaApartmentId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.buildingId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Villa/Apartment</option>
//                 {villaApartments.map((va) => (
//                   <option
//                     key={va.villaApartmentId}
//                     value={va.villaApartmentId.toString()}
//                   >
//                     {va.villaApartmentName}
//                   </option>
//                 ))}
//               </select>
//               {errors.villaApartmentId && (
//                 <p className="text-red-500 text-sm">
//                   {errors.villaApartmentId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                 Floor *
//               </label>
//               <select
//                 name="floorId"
//                 value={asset.floorId}
//                 onChange={handleChange}
//                 disabled={!asset.villaApartmentId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.floorId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.villaApartmentId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Floor</option>
//                 {floors.map((floor) => (
//                   <option key={floor.floorId} value={floor.floorId.toString()}>
//                     {floor.floorName}
//                   </option>
//                 ))}
//               </select>
//               {errors.floorId && (
//                 <p className="text-red-500 text-sm">{errors.floorId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
//                 Room *
//               </label>
//               <select
//                 name="roomId"
//                 value={asset.roomId}
//                 onChange={handleChange}
//                 disabled={!asset.floorId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.roomId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.floorId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Room</option>
//                 {rooms.map((room) => (
//                   <option key={room.roomId} value={room.roomId.toString()}>
//                     {room.roomName}
//                   </option>
//                 ))}
//               </select>
//               {errors.roomId && (
//                 <p className="text-red-500 text-sm">{errors.roomId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Service Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Wrench className="w-5 h-5 mr-2 text-blue-600" />
//             Service Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Service *
//               </label>
//               <select
//                 name="serviceId"
//                 value={asset.serviceId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceId ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">Select Service</option>
//                 {services.map((service) => (
//                   <option
//                     key={service.serviceId}
//                     value={service.serviceId.toString()}
//                   >
//                     {service.serviceName}
//                   </option>
//                 ))}
//               </select>
//               {errors.serviceId && (
//                 <p className="text-red-500 text-sm">{errors.serviceId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Sub Service *
//               </label>
//               <select
//                 name="subServiceId"
//                 value={asset.subServiceId}
//                 onChange={handleChange}
//                 disabled={!asset.serviceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.subServiceId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.serviceId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Sub Service</option>
//                 {subServices.map((subService) => (
//                   <option
//                     key={subService.subServiceId}
//                     value={subService.subServiceId.toString()}
//                   >
//                     {subService.subServiceName}
//                   </option>
//                 ))}
//               </select>
//               {errors.subServiceId && (
//                 <p className="text-red-500 text-sm">{errors.subServiceId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Service Scope *
//               </label>
//               <select
//                 name="serviceScopeId"
//                 value={asset.serviceScopeId}
//                 onChange={handleChange}
//                 disabled={!asset.subServiceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceScopeId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subServiceId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Service Scope</option>
//                 {serviceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId.toString()}>
//                     {scope.scopeName}
//                   </option>
//                 ))}
//               </select>
//               {errors.serviceScopeId && (
//                 <p className="text-red-500 text-sm">{errors.serviceScopeId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Lifecycle Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Clock className="w-5 h-5 mr-2 text-blue-600" />
//             Lifecycle Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Purchase Date
//               </label>
//               <input
//                 type="date"
//                 name="purchaseDate"
//                 value={asset.purchaseDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Installation Date
//               </label>
//               <input
//                 type="date"
//                 name="installationDate"
//                 value={asset.installationDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Warranty Period (Days)
//               </label>
//               <input
//                 type="number"
//                 name="warrantyPeriodDays"
//                 value={asset.warrantyPeriodDays}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter warranty period in days"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Expected Useful Life (Days)
//               </label>
//               <input
//                 type="number"
//                 name="expectedUsefulLifeDays"
//                 value={asset.expectedUsefulLifeDays}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter expected useful life in days"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Last Audit Date
//               </label>
//               <input
//                 type="date"
//                 name="lastAuditDate"
//                 value={asset.lastAuditDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Images */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Upload className="w-5 h-5 mr-2 text-blue-600" />
//             Asset Images {!isEdit && "*"}
//           </h2>

//           <div className="space-y-4">
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center ${
//                 errors.images ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             >
//               <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 mb-2">
//                 Click to upload or drag and drop asset images
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 {imagePreview.length}/3 images uploaded (Maximum 3 images
//                 allowed)
//               </p>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//                 id="image-upload"
//                 disabled={imagePreview.length >= 3}
//               />
//               <label
//                 htmlFor="image-upload"
//                 className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer ${
//                   imagePreview.length >= 3
//                     ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 <Upload className="w-4 h-4 mr-2" />
//                 {imagePreview.length >= 3
//                   ? "Maximum Images Reached"
//                   : "Choose Images"}
//               </label>
//               {errors.images && (
//                 <p className="text-red-500 text-sm mt-2">{errors.images}</p>
//               )}
//             </div>

//             {imagePreview.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {imagePreview.map((preview, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={preview || "/placeholder.svg"}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={() => navigate("/assets/list")}
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={submitting}
//             className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//           >
//             {submitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 {isEdit ? "Updating..." : "Creating..."}
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 {isEdit ? "Update Asset" : "Create Asset"}
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AssetForm;

// ///233455
// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Save,
//   X,
//   Upload,
//   Calendar,
//   Clock,
//   Tag,
//   Barcode,
//   Box,
//   Cpu,
//   Info,
//   Building,
//   MapPin,
//   Layers,
//   Home,
//   DoorOpen,
//   Wrench,
//   User,
//   AlertTriangle,
//   ImageIcon,
// } from "lucide-react";
// import { assetService } from "../services/assetService";
// import { contractService } from "../services/contractService";
// import { companyService } from "../services/companyService";
// import { serviceManagementService } from "../services/serviceManagementService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// const AssetForm = ({ isEdit = false }) => {
//   const navigate = useNavigate();
//   const { assetId } = useParams();
//   const { user } = useContext(AuthContext);

//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [asset, setAsset] = useState({
//     assetName: "",
//     serialNumber: "",
//     brandName: "",
//     modelNumber: "",
//     assetStatus: "ACTIVE",
//     companyId: "",
//     contractId: "",
//     zoneId: "",
//     subZoneId: "",
//     buildingId: "",
//     villaApartmentId: "",
//     floorId: "",
//     roomId: "",
//     serviceId: "",
//     subServiceId: "",
//     serviceScopeId: "",
//     purchaseDate: "",
//     installationDate: "",
//     warrantyPeriodDays: "",
//     ownerType: "KANVEL",
//     lastAuditDate: "",
//     expectedUsefulLifeDays: "",
//     images: [],
//   });

//   // Track new image files separately from existing images
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreview, setImagePreview] = useState([]);
//   // Track existing image URLs for edit mode
//   const [existingImageUrls, setExistingImageUrls] = useState([]);
//   const [errors, setErrors] = useState({});

//   // Options for dropdowns
//   const [companies, setCompanies] = useState([]);
//   const [contracts, setContracts] = useState([]);
//   const [zones, setZones] = useState([]);
//   const [subZones, setSubZones] = useState([]);
//   const [buildings, setBuildings] = useState([]);
//   const [villaApartments, setVillaApartments] = useState([]);
//   const [floors, setFloors] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [services, setServices] = useState([]);
//   const [subServices, setSubServices] = useState([]);
//   const [serviceScopes, setServiceScopes] = useState([]);

//   // Image upload constraints
//   const MAX_IMAGES = 3;
//   const MAX_IMAGE_SIZE_MB = 5;
//   const ALLOWED_IMAGE_TYPES = [
//     "image/jpeg",
//     "image/png",
//     "image/jpg",
//     "image/webp",
//   ];

//   useEffect(() => {
//     const loadInitialData = async () => {
//       setLoading(true);
//       try {
//         // Load data in parallel to improve performance
//         const [companiesResponse, contractsResponse, servicesResponse] =
//           await Promise.all([
//             companyService.getAllCompanies(),
//             contractService.getAllContracts(),
//             serviceManagementService.getServices(),
//           ]);

//         setCompanies(companiesResponse.data || []);
//         setContracts(contractsResponse.data || []);
//         setServices(servicesResponse.data || []);

//         if (isEdit && assetId) {
//           const assetResponse = await assetService.getAssetById(assetId);
//           const assetData = assetResponse.data;

//           setAsset({
//             ...assetData,
//             companyId: assetData.companyId.toString(),
//             contractId: assetData.contractId.toString(),
//             zoneId: assetData.zoneId.toString(),
//             subZoneId: assetData.subZoneId.toString(),
//             buildingId: assetData.buildingId.toString(),
//             villaApartmentId: assetData.villaApartmentId.toString(),
//             floorId: assetData.floorId.toString(),
//             roomId: assetData.roomId.toString(),
//             serviceId: assetData.serviceId.toString(),
//             subServiceId: assetData.subServiceId.toString(),
//             serviceScopeId: assetData.serviceScopeId.toString(),
//           });

//           if (assetData.imageUrls && assetData.imageUrls.length > 0) {
//             setExistingImageUrls(assetData.imageUrls);
//             setImagePreview(assetData.imageUrls);
//           }

//           // Load dependent data based on selected values in parallel
//           await Promise.all([
//             loadZones(assetData.contractId),
//             loadSubServices(assetData.serviceId),
//           ]);

//           await Promise.all([
//             loadSubZones(assetData.contractId, assetData.zoneId),
//             loadServiceScopes(assetData.subServiceId),
//           ]);

//           await loadBuildings(assetData.contractId, assetData.subZoneId);
//           await loadVillaApartments(assetData.contractId, assetData.buildingId);
//           await loadFloors(assetData.contractId, assetData.villaApartmentId);
//           await loadRooms(assetData.contractId, assetData.floorId);
//         }
//       } catch (error) {
//         console.error("Error loading initial data:", error);
//         toast.error("Failed to load form data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadInitialData();
//   }, [isEdit, assetId]);

//   const loadZones = async (contractId) => {
//     if (!contractId) return;
//     try {
//       const response = await propertyFlowService.getAllZonesByContract(
//         contractId
//       );
//       setZones(response.data || []);
//     } catch (error) {
//       console.error("Error loading zones:", error);
//     }
//   };

//   const loadSubZones = async (contractId, zoneId) => {
//     if (!contractId || !zoneId) return;
//     try {
//       const response = await propertyFlowService.getAllSubZonesByContract(
//         contractId
//       );
//       setSubZones(
//         (response.data || []).filter(
//           (sz) => sz.zoneId.toString() === zoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading sub zones:", error);
//     }
//   };

//   const loadBuildings = async (contractId, subZoneId) => {
//     if (!contractId || !subZoneId) return;
//     try {
//       const response = await propertyFlowService.getAllBuildingsByContract(
//         contractId
//       );
//       setBuildings(
//         (response.data || []).filter(
//           (b) => b.subZoneId.toString() === subZoneId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading buildings:", error);
//     }
//   };

//   const loadVillaApartments = async (contractId, buildingId) => {
//     if (!contractId || !buildingId) return;
//     try {
//       const response =
//         await propertyFlowService.getAllVillaApartmentsByContract(contractId);
//       setVillaApartments(
//         (response.data || []).filter(
//           (va) => va.buildingId.toString() === buildingId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading villa apartments:", error);
//     }
//   };

//   const loadFloors = async (contractId, villaApartmentId) => {
//     if (!contractId || !villaApartmentId) return;
//     try {
//       const response = await propertyFlowService.getAllFloorsByContract(
//         contractId
//       );
//       setFloors(
//         (response.data || []).filter(
//           (f) => f.villaApartmentId.toString() === villaApartmentId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading floors:", error);
//     }
//   };

//   const loadRooms = async (contractId, floorId) => {
//     if (!contractId || !floorId) return;
//     try {
//       const response = await propertyFlowService.getAllRoomsByContract(
//         contractId
//       );
//       setRooms(
//         (response.data || []).filter(
//           (r) => r.floorId.toString() === floorId.toString()
//         )
//       );
//     } catch (error) {
//       console.error("Error loading rooms:", error);
//     }
//   };

//   const loadSubServices = async (serviceId) => {
//     if (!serviceId) {
//       setSubServices([]);
//       return;
//     }
//     try {
//       const response = await contractService.getSubServices(serviceId);
//       console.log("SubServices response:", response.data); // Debug the response
//       setSubServices(response.data || []);
//     } catch (error) {
//       console.error("Error loading sub services:", error);
//       setSubServices([]);
//       toast.error("Failed to load sub-services");
//     }
//   };

//   const loadServiceScopes = async (subServiceId) => {
//     if (!subServiceId) {
//       setServiceScopes([]);
//       return;
//     }
//     try {
//       const response = await contractService.getServiceScopes(subServiceId);
//       console.log("ServiceScopes response:", response.data); // Debug the response
//       setServiceScopes(response.data || []);
//     } catch (error) {
//       console.error("Error loading service scopes:", error);
//       setServiceScopes([]);
//       toast.error("Failed to load service scopes");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAsset((prev) => ({ ...prev, [name]: value }));

//     // Clear errors
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     }

//     // Handle dependent dropdowns
//     if (name === "contractId") {
//       loadZones(value);
//       setAsset((prev) => ({
//         ...prev,
//         zoneId: "",
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "zoneId") {
//       loadSubZones(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "subZoneId") {
//       loadBuildings(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "buildingId") {
//       loadVillaApartments(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "villaApartmentId") {
//       loadFloors(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         floorId: "",
//         roomId: "",
//       }));
//     } else if (name === "floorId") {
//       loadRooms(asset.contractId, value);
//       setAsset((prev) => ({
//         ...prev,
//         roomId: "",
//       }));
//     } else if (name === "serviceId") {
//       loadSubServices(value);
//       setAsset((prev) => ({
//         ...prev,
//         subServiceId: "",
//         serviceScopeId: "",
//       }));
//     } else if (name === "subServiceId") {
//       loadServiceScopes(value);
//       setAsset((prev) => ({
//         ...prev,
//         serviceScopeId: "",
//       }));
//     }
//   };

//   const validateImageFile = (file) => {
//     // Check file type
//     if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
//       toast.error(
//         `File type not supported. Please upload JPEG, PNG, or WebP images.`
//       );
//       return false;
//     }

//     // Check file size
//     const fileSizeMB = file.size / (1024 * 1024);
//     if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
//       toast.error(
//         `File size exceeds ${MAX_IMAGE_SIZE_MB}MB limit. Please upload a smaller image.`
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files).filter(validateImageFile);
//     if (files.length === 0) return;

//     const currentImageCount =
//       imageFiles.length + (isEdit ? existingImageUrls.length : 0);
//     const availableSlots = MAX_IMAGES - currentImageCount;

//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
//       );
//       return;
//     }

//     setImageFiles((prev) => [...prev, ...files]);

//     // Create preview URLs
//     const newPreviews = files.map((file) => URL.createObjectURL(file));

//     // In edit mode, add new previews to existing ones
//     if (isEdit) {
//       setImagePreview((prev) => [...prev, ...newPreviews]);
//     } else {
//       setImagePreview((prev) => [...prev, ...newPreviews]);
//     }

//     // Clear image error if exists
//     if (errors.images) {
//       setErrors((prev) => ({ ...prev, images: null }));
//     }
//   };

//   const removeImage = (index) => {
//     // For edit mode, we need to handle existing images differently
//     if (isEdit) {
//       const totalPreviews = imagePreview.length;
//       const existingCount = existingImageUrls.length;

//       if (index < existingCount) {
//         // Removing an existing image
//         const updatedExistingUrls = [...existingImageUrls];
//         updatedExistingUrls.splice(index, 1);
//         setExistingImageUrls(updatedExistingUrls);
//         setImagePreview((prev) => {
//           const updated = [...prev];
//           updated.splice(index, 1);
//           return updated;
//         });
//       } else {
//         // Removing a new image
//         const newImageIndex = index - existingCount;
//         setImageFiles((prev) => {
//           const updated = [...prev];
//           updated.splice(newImageIndex, 1);
//           return updated;
//         });
//         setImagePreview((prev) => {
//           const updated = [...prev];
//           updated.splice(index, 1);
//           return updated;
//         });
//       }
//     } else {
//       // For create mode, simply remove from both arrays
//       setImageFiles((prev) => prev.filter((_, i) => i !== index));
//       setImagePreview((prev) => prev.filter((_, i) => i !== index));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!asset.assetName.trim()) {
//       newErrors.assetName = "Asset name is required";
//     }

//     if (!user || !user.username) {
//       newErrors.username = "User information is required. Please log in again.";
//     }

//     if (!asset.companyId) {
//       newErrors.companyId = "Company is required";
//     }

//     if (!asset.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     if (!asset.zoneId) {
//       newErrors.zoneId = "Zone is required";
//     }

//     if (!asset.subZoneId) {
//       newErrors.subZoneId = "Sub Zone is required";
//     }

//     if (!asset.buildingId) {
//       newErrors.buildingId = "Building is required";
//     }

//     if (!asset.villaApartmentId) {
//       newErrors.villaApartmentId = "Villa/Apartment is required";
//     }

//     if (!asset.floorId) {
//       newErrors.floorId = "Floor is required";
//     }

//     if (!asset.roomId) {
//       newErrors.roomId = "Room is required";
//     }

//     if (!asset.serviceId) {
//       newErrors.serviceId = "Service is required";
//     }

//     if (!asset.subServiceId) {
//       newErrors.subServiceId = "Sub Service is required";
//     }

//     if (!asset.serviceScopeId) {
//       newErrors.serviceScopeId = "Service Scope is required";
//     }

//     if (!asset.assetStatus) {
//       newErrors.assetStatus = "Asset Status is required";
//     }

//     // Check if at least one image is present (either new or existing)
//     if (!isEdit && imageFiles.length === 0) {
//       newErrors.images = "At least one image is required";
//     } else if (
//       isEdit &&
//       imageFiles.length === 0 &&
//       existingImageUrls.length === 0
//     ) {
//       newErrors.images = "At least one image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     if (!user || !user.username) {
//       toast.error("User information is missing. Please log in again.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const assetData = {
//         ...asset,
//         images: imageFiles,
//         existingImageUrls: isEdit ? existingImageUrls : [], // Only send in edit mode
//       };

//       if (isEdit) {
//         await assetService.updateAsset(assetId, assetData);
//         toast.success("Asset updated successfully");
//       } else {
//         await assetService.createAsset(assetData);
//         toast.success("Asset created successfully");
//       }

//       navigate("/assets/list");
//     } catch (error) {
//       console.error("Error saving asset:", error);
//       toast.error(error.response?.data?.message || "Failed to save asset");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-lg font-medium text-gray-700">
//           Loading...
//         </span>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {isEdit ? "Edit Asset" : "Create New Asset"}
//           </h1>
//           <p className="text-gray-600">
//             {isEdit
//               ? "Update asset information"
//               : "Add a new asset to your inventory"}
//           </p>
//         </div>
//       </div>

//       {/* Display warning if username is missing */}
//       {(!user || !user.username) && (
//         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
//           <div className="flex">
//             <AlertTriangle className="h-5 w-5 text-yellow-400" />
//             <div className="ml-3">
//               <p className="text-sm text-yellow-700">
//                 User information is missing. Please log out and log in again to
//                 fix this issue.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Basic Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Info className="w-5 h-5 mr-2 text-blue-600" />
//             Basic Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Tag className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Name *
//               </label>
//               <input
//                 type="text"
//                 name="assetName"
//                 value={asset.assetName}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.assetName ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter asset name"
//               />
//               {errors.assetName && (
//                 <p className="text-red-500 text-sm">{errors.assetName}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Barcode className="w-4 h-4 mr-1 text-gray-500" />
//                 Serial Number
//               </label>
//               <input
//                 type="text"
//                 name="serialNumber"
//                 value={asset.serialNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter serial number"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Box className="w-4 h-4 mr-1 text-gray-500" />
//                 Brand Name
//               </label>
//               <input
//                 type="text"
//                 name="brandName"
//                 value={asset.brandName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter brand name"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Cpu className="w-4 h-4 mr-1 text-gray-500" />
//                 Model Number
//               </label>
//               <input
//                 type="text"
//                 name="modelNumber"
//                 value={asset.modelNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter model number"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Status *
//               </label>
//               <select
//                 name="assetStatus"
//                 value={asset.assetStatus}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.assetStatus ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="ACTIVE">Active</option>
//                 <option value="UNDER_MAINTENANCE">Under Maintenance</option>
//                 <option value="DECOMMISSIONED">Decommissioned</option>
//               </select>
//               {errors.assetStatus && (
//                 <p className="text-red-500 text-sm">{errors.assetStatus}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <User className="w-4 h-4 mr-1 text-gray-500" />
//                 Owner Type
//               </label>
//               <select
//                 name="ownerType"
//                 value={asset.ownerType}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="KANVEL">Kanvel</option>
//                 <option value="TENANT">Tenant</option>
//                 <option value="PROPERTY_OWNER">Property Owner</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Organization Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Building className="w-5 h-5 mr-2 text-blue-600" />
//             Organization Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Company *
//               </label>
//               <select
//                 name="companyId"
//                 value={asset.companyId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.companyId ? "border-red-500" : "border-gray-300"
//                 }`}
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
//               {errors.companyId && (
//                 <p className="text-red-500 text-sm">{errors.companyId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Contract *
//               </label>
//               <select
//                 name="contractId"
//                 value={asset.contractId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.contractId ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">Select Contract</option>
//                 {contracts.map((contract) => (
//                   <option
//                     key={contract.contractId}
//                     value={contract.contractId.toString()}
//                   >
//                     {contract.contractName}
//                   </option>
//                 ))}
//               </select>
//               {errors.contractId && (
//                 <p className="text-red-500 text-sm">{errors.contractId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Location Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <MapPin className="w-5 h-5 mr-2 text-blue-600" />
//             Location Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <MapPin className="w-4 h-4 mr-1 text-gray-500" />
//                 Zone *
//               </label>
//               <select
//                 name="zoneId"
//                 value={asset.zoneId}
//                 onChange={handleChange}
//                 disabled={!asset.contractId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.zoneId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.contractId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Zone</option>
//                 {zones.map((zone) => (
//                   <option key={zone.zoneId} value={zone.zoneId.toString()}>
//                     {zone.zoneName}
//                   </option>
//                 ))}
//               </select>
//               {errors.zoneId && (
//                 <p className="text-red-500 text-sm">{errors.zoneId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                 Sub Zone *
//               </label>
//               <select
//                 name="subZoneId"
//                 value={asset.subZoneId}
//                 onChange={handleChange}
//                 disabled={!asset.zoneId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.subZoneId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.zoneId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Sub Zone</option>
//                 {subZones.map((subZone) => (
//                   <option
//                     key={subZone.subZoneId}
//                     value={subZone.subZoneId.toString()}
//                   >
//                     {subZone.subZoneName}
//                   </option>
//                 ))}
//               </select>
//               {errors.subZoneId && (
//                 <p className="text-red-500 text-sm">{errors.subZoneId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Building className="w-4 h-4 mr-1 text-gray-500" />
//                 Building *
//               </label>
//               <select
//                 name="buildingId"
//                 value={asset.buildingId}
//                 onChange={handleChange}
//                 disabled={!asset.subZoneId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.buildingId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subZoneId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Building</option>
//                 {buildings.map((building) => (
//                   <option
//                     key={building.buildingId}
//                     value={building.buildingId.toString()}
//                   >
//                     {building.buildingName}
//                   </option>
//                 ))}
//               </select>
//               {errors.buildingId && (
//                 <p className="text-red-500 text-sm">{errors.buildingId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Home className="w-4 h-4 mr-1 text-gray-500" />
//                 Villa/Apartment *
//               </label>
//               <select
//                 name="villaApartmentId"
//                 value={asset.villaApartmentId}
//                 onChange={handleChange}
//                 disabled={!asset.buildingId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.villaApartmentId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.buildingId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Villa/Apartment</option>
//                 {villaApartments.map((va) => (
//                   <option
//                     key={va.villaApartmentId}
//                     value={va.villaApartmentId.toString()}
//                   >
//                     {va.villaApartmentName}
//                   </option>
//                 ))}
//               </select>
//               {errors.villaApartmentId && (
//                 <p className="text-red-500 text-sm">
//                   {errors.villaApartmentId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                 Floor *
//               </label>
//               <select
//                 name="floorId"
//                 value={asset.floorId}
//                 onChange={handleChange}
//                 disabled={!asset.villaApartmentId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.floorId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.villaApartmentId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Floor</option>
//                 {floors.map((floor) => (
//                   <option key={floor.floorId} value={floor.floorId.toString()}>
//                     {floor.floorName}
//                   </option>
//                 ))}
//               </select>
//               {errors.floorId && (
//                 <p className="text-red-500 text-sm">{errors.floorId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
//                 Room *
//               </label>
//               <select
//                 name="roomId"
//                 value={asset.roomId}
//                 onChange={handleChange}
//                 disabled={!asset.floorId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.roomId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.floorId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Room</option>
//                 {rooms.map((room) => (
//                   <option key={room.roomId} value={room.roomId.toString()}>
//                     {room.roomName}
//                   </option>
//                 ))}
//               </select>
//               {errors.roomId && (
//                 <p className="text-red-500 text-sm">{errors.roomId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Service Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Wrench className="w-5 h-5 mr-2 text-blue-600" />
//             Service Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Service *
//               </label>
//               <select
//                 name="serviceId"
//                 value={asset.serviceId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceId ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">Select Service</option>
//                 {services.map((service) => (
//                   <option
//                     key={service.serviceId}
//                     value={service.serviceId.toString()}
//                   >
//                     {service.serviceName}
//                   </option>
//                 ))}
//               </select>
//               {errors.serviceId && (
//                 <p className="text-red-500 text-sm">{errors.serviceId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Sub Service *
//               </label>
//               <select
//                 name="subServiceId"
//                 value={asset.subServiceId}
//                 onChange={handleChange}
//                 disabled={!asset.serviceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.subServiceId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.serviceId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Sub Service</option>
//                 {subServices.map((subService) => (
//                   <option
//                     key={subService.subServiceId}
//                     value={subService.subServiceId.toString()}
//                   >
//                     {subService.subServiceName}
//                   </option>
//                 ))}
//               </select>
//               {errors.subServiceId && (
//                 <p className="text-red-500 text-sm">{errors.subServiceId}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Service Scope *
//               </label>
//               <select
//                 name="serviceScopeId"
//                 value={asset.serviceScopeId}
//                 onChange={handleChange}
//                 disabled={!asset.subServiceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceScopeId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subServiceId ? "bg-gray-100" : ""}`}
//               >
//                 <option value="">Select Service Scope</option>
//                 {serviceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId.toString()}>
//                     {scope.scopeName}
//                   </option>
//                 ))}
//               </select>
//               {errors.serviceScopeId && (
//                 <p className="text-red-500 text-sm">{errors.serviceScopeId}</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Lifecycle Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Clock className="w-5 h-5 mr-2 text-blue-600" />
//             Lifecycle Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Purchase Date
//               </label>
//               <input
//                 type="date"
//                 name="purchaseDate"
//                 value={asset.purchaseDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Installation Date
//               </label>
//               <input
//                 type="date"
//                 name="installationDate"
//                 value={asset.installationDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Warranty Period (Days)
//               </label>
//               <input
//                 type="number"
//                 name="warrantyPeriodDays"
//                 value={asset.warrantyPeriodDays}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter warranty period in days"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Expected Useful Life (Days)
//               </label>
//               <input
//                 type="number"
//                 name="expectedUsefulLifeDays"
//                 value={asset.expectedUsefulLifeDays}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter expected useful life in days"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Last Audit Date
//               </label>
//               <input
//                 type="date"
//                 name="lastAuditDate"
//                 value={asset.lastAuditDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Images */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Upload className="w-5 h-5 mr-2 text-blue-600" />
//             Asset Images {!isEdit && "*"}
//           </h2>

//           <div className="space-y-4">
//             {/* Image upload instructions */}
//             <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
//               <div className="flex">
//                 <ImageIcon className="h-5 w-5 text-blue-400" />
//                 <div className="ml-3">
//                   <p className="text-sm text-blue-700 font-medium">
//                     Image Upload Requirements:
//                   </p>
//                   <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
//                     <li>Maximum 3 images allowed</li>
//                     <li>Accepted formats: JPEG, PNG, WebP</li>
//                     <li>Maximum file size: {MAX_IMAGE_SIZE_MB}MB per image</li>
//                     <li>At least one image is required</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center ${
//                 errors.images ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             >
//               <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 mb-2">
//                 Click to upload or drag and drop asset images
//               </p>
//               <p className="text-sm text-gray-500 mb-4">
//                 {imagePreview.length}/{MAX_IMAGES} images uploaded (Maximum{" "}
//                 {MAX_IMAGES} images allowed)
//               </p>
//               <input
//                 type="file"
//                 multiple
//                 accept={ALLOWED_IMAGE_TYPES.join(",")}
//                 onChange={handleImageChange}
//                 className="hidden"
//                 id="image-upload"
//                 disabled={imagePreview.length >= MAX_IMAGES}
//               />
//               <label
//                 htmlFor="image-upload"
//                 className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer ${
//                   imagePreview.length >= MAX_IMAGES
//                     ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 <Upload className="w-4 h-4 mr-2" />
//                 {imagePreview.length >= MAX_IMAGES
//                   ? "Maximum Images Reached"
//                   : "Choose Images"}
//               </label>
//               {errors.images && (
//                 <p className="text-red-500 text-sm mt-2">{errors.images}</p>
//               )}
//             </div>

//             {imagePreview.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {imagePreview.map((preview, index) => (
//                   <div key={index} className="relative">
//                     <img
//                       src={preview || "/placeholder.svg"}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-32 object-cover rounded-lg border"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(index)}
//                       className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end gap-4">
//           <button
//             type="button"
//             onClick={() => navigate("/assets/list")}
//             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={submitting}
//             className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
//           >
//             {submitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 {isEdit ? "Updating..." : "Creating..."}
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 {isEdit ? "Update Asset" : "Create Asset"}
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AssetForm;

"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  X,
  Upload,
  Calendar,
  Clock,
  Tag,
  Barcode,
  Box,
  Cpu,
  Info,
  Building,
  MapPin,
  Layers,
  Home,
  DoorOpen,
  Wrench,
  User,
  AlertTriangle,
  ImageIcon,
} from "lucide-react";
import { assetService } from "../services/assetService";
import { contractService } from "../services/contractService";
import { companyService } from "../services/companyService";
import { serviceManagementService } from "../services/serviceManagementService";
import { propertyFlowService } from "../services/propertyFlowService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AssetForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { assetId } = useParams();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [asset, setAsset] = useState({
    assetName: "",
    serialNumber: "",
    brandName: "",
    modelNumber: "",
    assetStatus: "ACTIVE",
    companyId: "",
    contractId: "",
    zoneId: "",
    subZoneId: "",
    buildingId: "",
    villaApartmentId: "",
    floorId: "",
    roomId: "",
    serviceId: "",
    subServiceId: "",
    serviceScopeId: "",
    purchaseDate: "",
    installationDate: "",
    warrantyPeriodDays: "",
    ownerType: "KANVEL",
    lastAuditDate: "",
    expectedUsefulLifeDays: "",
    images: [],
  });

  // Track new image files separately from existing images
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  // Track existing image URLs for edit mode
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [errors, setErrors] = useState({});

  // Options for dropdowns
  const [companies, setCompanies] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [zones, setZones] = useState([]);
  const [subZones, setSubZones] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [villaApartments, setVillaApartments] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [serviceScopes, setServiceScopes] = useState([]);

  // Image upload constraints
  const MAX_IMAGES = 3;
  const MAX_IMAGE_SIZE_MB = 5;
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Load data in parallel to improve performance
        const [companiesResponse, contractsResponse, servicesResponse] =
          await Promise.all([
            companyService.getAllCompanies(),
            contractService.getAllContracts(),
            serviceManagementService.getServices(),
          ]);

        setCompanies(companiesResponse.data || []);
        setContracts(contractsResponse.data || []);
        setServices(servicesResponse.data || []);

        if (isEdit && assetId) {
          const assetResponse = await assetService.getAssetById(assetId);
          const assetData = assetResponse.data;

          setAsset({
            ...assetData,
            companyId: assetData.companyId.toString(),
            contractId: assetData.contractId.toString(),
            zoneId: assetData.zoneId.toString(),
            subZoneId: assetData.subZoneId.toString(),
            buildingId: assetData.buildingId.toString(),
            villaApartmentId: assetData.villaApartmentId.toString(),
            floorId: assetData.floorId.toString(),
            roomId: assetData.roomId.toString(),
            serviceId: assetData.serviceId.toString(),
            subServiceId: assetData.subServiceId.toString(),
            serviceScopeId: assetData.serviceScopeId.toString(),
          });

          if (assetData.imageUrls && assetData.imageUrls.length > 0) {
            setExistingImageUrls(assetData.imageUrls);
            setImagePreview(assetData.imageUrls);
          }

          // Load dependent data based on selected values in parallel
          await Promise.all([
            loadZones(assetData.contractId),
            loadSubServices(assetData.serviceId),
          ]);

          await Promise.all([
            loadSubZones(assetData.contractId, assetData.zoneId),
            loadServiceScopes(assetData.subServiceId),
          ]);

          await loadBuildings(assetData.contractId, assetData.subZoneId);
          await loadVillaApartments(assetData.contractId, assetData.buildingId);
          await loadFloors(assetData.contractId, assetData.villaApartmentId);
          await loadRooms(assetData.contractId, assetData.floorId);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
        toast.error("Failed to load form data");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [isEdit, assetId]);

  const loadZones = async (contractId) => {
    if (!contractId) return;
    try {
      const response = await propertyFlowService.getAllZonesByContract(
        contractId
      );
      setZones(response.data || []);
    } catch (error) {
      console.error("Error loading zones:", error);
    }
  };

  const loadSubZones = async (contractId, zoneId) => {
    if (!contractId || !zoneId) return;
    try {
      const response = await propertyFlowService.getAllSubZonesByContract(
        contractId
      );
      setSubZones(
        (response.data || []).filter(
          (sz) => sz.zoneId.toString() === zoneId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading sub zones:", error);
    }
  };

  const loadBuildings = async (contractId, subZoneId) => {
    if (!contractId || !subZoneId) return;
    try {
      const response = await propertyFlowService.getAllBuildingsByContract(
        contractId
      );
      setBuildings(
        (response.data || []).filter(
          (b) => b.subZoneId.toString() === subZoneId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading buildings:", error);
    }
  };

  const loadVillaApartments = async (contractId, buildingId) => {
    if (!contractId || !buildingId) return;
    try {
      const response =
        await propertyFlowService.getAllVillaApartmentsByContract(contractId);
      setVillaApartments(
        (response.data || []).filter(
          (va) => va.buildingId.toString() === buildingId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading villa apartments:", error);
    }
  };

  const loadFloors = async (contractId, villaApartmentId) => {
    if (!contractId || !villaApartmentId) return;
    try {
      const response = await propertyFlowService.getAllFloorsByContract(
        contractId
      );
      setFloors(
        (response.data || []).filter(
          (f) => f.villaApartmentId.toString() === villaApartmentId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading floors:", error);
    }
  };

  const loadRooms = async (contractId, floorId) => {
    if (!contractId || !floorId) return;
    try {
      const response = await propertyFlowService.getAllRoomsByContract(
        contractId
      );
      setRooms(
        (response.data || []).filter(
          (r) => r.floorId.toString() === floorId.toString()
        )
      );
    } catch (error) {
      console.error("Error loading rooms:", error);
    }
  };

  const loadSubServices = async (serviceId) => {
    if (!serviceId) {
      setSubServices([]);
      return;
    }
    try {
      const response = await contractService.getSubServices(serviceId);
      console.log("SubServices response:", response.data); // Debug the response
      setSubServices(response.data || []);
    } catch (error) {
      console.error("Error loading sub services:", error);
      setSubServices([]);
      toast.error("Failed to load sub-services");
    }
  };

  const loadServiceScopes = async (subServiceId) => {
    if (!subServiceId) {
      setServiceScopes([]);
      return;
    }
    try {
      const response = await contractService.getServiceScopes(subServiceId);
      console.log("ServiceScopes response:", response.data); // Debug the response
      setServiceScopes(response.data || []);
    } catch (error) {
      console.error("Error loading service scopes:", error);
      setServiceScopes([]);
      toast.error("Failed to load service scopes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prev) => ({ ...prev, [name]: value }));

    // Clear errors
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    // Handle dependent dropdowns
    if (name === "contractId") {
      loadZones(value);
      setAsset((prev) => ({
        ...prev,
        zoneId: "",
        subZoneId: "",
        buildingId: "",
        villaApartmentId: "",
        floorId: "",
        roomId: "",
      }));
    } else if (name === "zoneId") {
      loadSubZones(asset.contractId, value);
      setAsset((prev) => ({
        ...prev,
        subZoneId: "",
        buildingId: "",
        villaApartmentId: "",
        floorId: "",
        roomId: "",
      }));
    } else if (name === "subZoneId") {
      loadBuildings(asset.contractId, value);
      setAsset((prev) => ({
        ...prev,
        buildingId: "",
        villaApartmentId: "",
        floorId: "",
        roomId: "",
      }));
    } else if (name === "buildingId") {
      loadVillaApartments(asset.contractId, value);
      setAsset((prev) => ({
        ...prev,
        villaApartmentId: "",
        floorId: "",
        roomId: "",
      }));
    } else if (name === "villaApartmentId") {
      loadFloors(asset.contractId, value);
      setAsset((prev) => ({
        ...prev,
        floorId: "",
        roomId: "",
      }));
    } else if (name === "floorId") {
      loadRooms(asset.contractId, value);
      setAsset((prev) => ({
        ...prev,
        roomId: "",
      }));
    } else if (name === "serviceId") {
      loadSubServices(value);
      setAsset((prev) => ({
        ...prev,
        subServiceId: "",
        serviceScopeId: "",
      }));
    } else if (name === "subServiceId") {
      loadServiceScopes(value);
      setAsset((prev) => ({
        ...prev,
        serviceScopeId: "",
      }));
    }
  };

  const validateImageFile = (file) => {
    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error(
        `File type not supported. Please upload JPEG, PNG, or WebP images.`
      );
      return false;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
      toast.error(
        `File size exceeds ${MAX_IMAGE_SIZE_MB}MB limit. Please upload a smaller image.`
      );
      return false;
    }

    return true;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter(validateImageFile);
    if (files.length === 0) return;

    // Calculate how many slots are available for new images
    const totalCurrentImages = imageFiles.length + existingImageUrls.length;
    const availableSlots = MAX_IMAGES - totalCurrentImages;

    if (files.length > availableSlots) {
      toast.error(
        `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
      );
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);

    // Create preview URLs for new images
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreviews]);

    // Clear image error if exists
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: null }));
    }
  };

  const removeImage = (index) => {
    // For edit mode, we need to handle existing images differently
    if (isEdit) {
      const totalPreviews = imagePreview.length;
      const existingCount = existingImageUrls.length;

      if (index < existingCount) {
        // Removing an existing image
        const updatedExistingUrls = [...existingImageUrls];
        updatedExistingUrls.splice(index, 1);
        setExistingImageUrls(updatedExistingUrls);

        // Also update the preview array
        setImagePreview((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });
      } else {
        // Removing a new image
        const newImageIndex = index - existingCount;
        setImageFiles((prev) => {
          const updated = [...prev];
          updated.splice(newImageIndex, 1);
          return updated;
        });

        // Also update the preview array
        setImagePreview((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });
      }
    } else {
      // For create mode, simply remove from both arrays
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
      setImagePreview((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!asset.assetName.trim()) {
      newErrors.assetName = "Asset name is required";
    }

    if (!user || !user.username) {
      newErrors.username = "User information is required. Please log in again.";
    }

    if (!asset.companyId) {
      newErrors.companyId = "Company is required";
    }

    if (!asset.contractId) {
      newErrors.contractId = "Contract is required";
    }

    if (!asset.zoneId) {
      newErrors.zoneId = "Zone is required";
    }

    if (!asset.subZoneId) {
      newErrors.subZoneId = "Sub Zone is required";
    }

    if (!asset.buildingId) {
      newErrors.buildingId = "Building is required";
    }

    if (!asset.villaApartmentId) {
      newErrors.villaApartmentId = "Villa/Apartment is required";
    }

    if (!asset.floorId) {
      newErrors.floorId = "Floor is required";
    }

    if (!asset.roomId) {
      newErrors.roomId = "Room is required";
    }

    if (!asset.serviceId) {
      newErrors.serviceId = "Service is required";
    }

    if (!asset.subServiceId) {
      newErrors.subServiceId = "Sub Service is required";
    }

    if (!asset.serviceScopeId) {
      newErrors.serviceScopeId = "Service Scope is required";
    }

    if (!asset.assetStatus) {
      newErrors.assetStatus = "Asset Status is required";
    }

    // Check if at least one image is present (either new or existing)
    if (!isEdit && imageFiles.length === 0) {
      newErrors.images = "At least one image is required";
    } else if (
      isEdit &&
      imageFiles.length === 0 &&
      existingImageUrls.length === 0
    ) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!user || !user.username) {
      toast.error("User information is missing. Please log in again.");
      return;
    }

    setSubmitting(true);
    try {
      const assetData = {
        ...asset,
        images: imageFiles,
        existingImageUrls: isEdit ? existingImageUrls : [], // Only send in edit mode
      };

      if (isEdit) {
        await assetService.updateAsset(assetId, assetData);
        toast.success("Asset updated successfully");
      } else {
        await assetService.createAsset(assetData);
        toast.success("Asset created successfully");
      }

      navigate("/assets/list");
    } catch (error) {
      console.error("Error saving asset:", error);
      toast.error(error.response?.data?.message || "Failed to save asset");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg font-medium text-gray-700">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Asset" : "Create New Asset"}
          </h1>
          <p className="text-gray-600">
            {isEdit
              ? "Update asset information"
              : "Add a new asset to your inventory"}
          </p>
        </div>
      </div>

      {/* Display warning if username is missing */}
      {(!user || !user.username) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                User information is missing. Please log out and log in again to
                fix this issue.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Tag className="w-4 h-4 mr-1 text-gray-500" />
                Asset Name *
              </label>
              <input
                type="text"
                name="assetName"
                value={asset.assetName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.assetName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter asset name"
              />
              {errors.assetName && (
                <p className="text-red-500 text-sm">{errors.assetName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Barcode className="w-4 h-4 mr-1 text-gray-500" />
                Serial Number
              </label>
              <input
                type="text"
                name="serialNumber"
                value={asset.serialNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter serial number"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Box className="w-4 h-4 mr-1 text-gray-500" />
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                value={asset.brandName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Cpu className="w-4 h-4 mr-1 text-gray-500" />
                Model Number
              </label>
              <input
                type="text"
                name="modelNumber"
                value={asset.modelNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter model number"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
                Asset Status *
              </label>
              <select
                name="assetStatus"
                value={asset.assetStatus}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.assetStatus ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="ACTIVE">Active</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                <option value="DECOMMISSIONED">Decommissioned</option>
              </select>
              {errors.assetStatus && (
                <p className="text-red-500 text-sm">{errors.assetStatus}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-1 text-gray-500" />
                Owner Type
              </label>
              <select
                name="ownerType"
                value={asset.ownerType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="KANVEL">Kanvel</option>
                <option value="TENANT">Tenant</option>
                <option value="PROPERTY_OWNER">Property Owner</option>
              </select>
            </div>
          </div>
        </div>

        {/* Organization Information */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2 text-blue-600" />
            Organization Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Company *
              </label>
              <select
                name="companyId"
                value={asset.companyId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyId ? "border-red-500" : "border-gray-300"
                }`}
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
              {errors.companyId && (
                <p className="text-red-500 text-sm">{errors.companyId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Contract *
              </label>
              <select
                name="contractId"
                value={asset.contractId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.contractId ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Contract</option>
                {contracts.map((contract) => (
                  <option
                    key={contract.contractId}
                    value={contract.contractId.toString()}
                  >
                    {contract.contractName}
                  </option>
                ))}
              </select>
              {errors.contractId && (
                <p className="text-red-500 text-sm">{errors.contractId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Location Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                Zone *
              </label>
              <select
                name="zoneId"
                value={asset.zoneId}
                onChange={handleChange}
                disabled={!asset.contractId}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.zoneId ? "border-red-500" : "border-gray-300"
                } ${!asset.contractId ? "bg-gray-100" : ""}`}
              >
                <option value="">Select Zone</option>
                {zones.map((zone) => (
                  <option key={zone.zoneId} value={zone.zoneId.toString()}>
                    {zone.zoneName}
                  </option>
                ))}
              </select>
              {errors.zoneId && (
                <p className="text-red-500 text-sm">{errors.zoneId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Layers className="w-4 h-4 mr-1 text-gray-500" />
                Sub Zone *
              </label>
              <select
                name="subZoneId"
                value={asset.subZoneId}
                onChange={handleChange}
                disabled={!asset.zoneId}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.subZoneId ? "border-red-500" : "border-gray-300"
                } ${!asset.zoneId ? "bg-gray-100" : ""}`}
              >
                <option value="">Select Sub Zone</option>
                {subZones.map((subZone) => (
                  <option
                    key={subZone.subZoneId}
                    value={subZone.subZoneId.toString()}
                  >
                    {subZone.subZoneName}
                  </option>
                ))}
              </select>
              {errors.subZoneId && (
                <p className="text-red-500 text-sm">{errors.subZoneId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Building className="w-4 h-4 mr-1 text-gray-500" />
                Building *
              </label>
              <select
                name="buildingId"
                value={asset.buildingId}
                onChange={handleChange}
                disabled={!asset.subZoneId}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.buildingId ? "border-red-500" : "border-gray-300"
                } ${!asset.subZoneId ? "bg-gray-100" : ""}`}
              >
                <option value="">Select Building</option>
                {buildings.map((building) => (
                  <option
                    key={building.buildingId}
                    value={building.buildingId.toString()}
                  >
                    {building.buildingName}
                  </option>
                ))}
              </select>
              {errors.buildingId && (
                <p className="text-red-500 text-sm">{errors.buildingId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Home className="w-4 h-4 mr-1 text-gray-500" />
                Villa/Apartment *
              </label>
              <select
                name="villaApartmentId"
                value={asset.villaApartmentId}
                onChange={handleChange}
                disabled={!asset.buildingId}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.villaApartmentId ? "border-red-500" : "border-gray-300"
                } ${!asset.buildingId ? "bg-gray-100" : ""}`}
              >
                <option value="">Select Villa/Apartment</option>
                {villaApartments.map((va) => (
                  <option
                    key={va.villaApartmentId}
                    value={va.villaApartmentId.toString()}
                  >
                    {va.villaApartmentName}
                  </option>
                ))}
              </select>
              {errors.villaApartmentId && (
                <p className="text-red-500 text-sm">
                  {errors.villaApartmentId}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Layers className="w-4 h-4 mr-1 text-gray-500" />
                Floor *
              </label>
              <select
                name="floorId"
                value={asset.floorId}
                onChange={handleChange}
                disabled={!asset.villaApartmentId}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.floorId ? "border-red-500" : "border-gray-300"
                } ${!asset.villaApartmentId ? "bg-gray-100" : ""}`}
              >
                <option value="">Select Floor</option>
                {floors.map((floor) => (
                  <option key={floor.floorId} value={floor.floorId.toString()}>
                    {floor.floorName}
                  </option>
                ))}
              </select>
              {errors.floorId && (
                <p className="text-red-500 text-sm">{errors.floorId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
                Room *
              </label>
              <select
                name="roomId"
                value={asset.roomId}
                onChange={handleChange}
                disabled={!asset.floorId}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.roomId ? "border-red-500" : "border-gray-300"
                } ${!asset.floorId ? "bg-gray-100" : ""}`}
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room.roomId} value={room.roomId.toString()}>
                    {room.roomName}
                  </option>
                ))}
              </select>
              {errors.roomId && (
                <p className="text-red-500 text-sm">{errors.roomId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2 text-blue-600" />
            Service Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Service *
              </label>
              <select
                name="serviceId"
                value={asset.serviceId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.serviceId ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Service</option>
                {services.map((service) => (
                  <option
                    key={service.serviceId}
                    value={service.serviceId.toString()}
                  >
                    {service.serviceName}
                  </option>
                ))}
              </select>
              {errors.serviceId && (
                <p className="text-red-500 text-sm">{errors.serviceId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Sub Service *
              </label>
              <select
                name="subServiceId"
                value={asset.subServiceId}
                onChange={handleChange}
                disabled={!asset.serviceId}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.subServiceId ? "border-red-500" : "border-gray-300"
                } ${!asset.serviceId ? "bg-gray-100" : ""}`}
              >
                <option value="">Select Sub Service</option>
                {subServices.map((subService) => (
                  <option
                    key={subService.subServiceId}
                    value={subService.subServiceId.toString()}
                  >
                    {subService.subServiceName}
                  </option>
                ))}
              </select>
              {errors.subServiceId && (
                <p className="text-red-500 text-sm">{errors.subServiceId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Service Scope *
              </label>
              <select
                name="serviceScopeId"
                value={asset.serviceScopeId}
                onChange={handleChange}
                disabled={!asset.subServiceId}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.serviceScopeId ? "border-red-500" : "border-gray-300"
                } ${!asset.subServiceId ? "bg-gray-100" : ""}`}
              >
                <option value="">Select Service Scope</option>
                {serviceScopes.map((scope) => (
                  <option key={scope.scopeId} value={scope.scopeId.toString()}>
                    {scope.scopeName}
                  </option>
                ))}
              </select>
              {errors.serviceScopeId && (
                <p className="text-red-500 text-sm">{errors.serviceScopeId}</p>
              )}
            </div>
          </div>
        </div>

        {/* Lifecycle Information */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Lifecycle Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                Purchase Date
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={asset.purchaseDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                Installation Date
              </label>
              <input
                type="date"
                name="installationDate"
                value={asset.installationDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Warranty Period (Days)
              </label>
              <input
                type="number"
                name="warrantyPeriodDays"
                value={asset.warrantyPeriodDays}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter warranty period in days"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Expected Useful Life (Days)
              </label>
              <input
                type="number"
                name="expectedUsefulLifeDays"
                value={asset.expectedUsefulLifeDays}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter expected useful life in days"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                Last Audit Date
              </label>
              <input
                type="date"
                name="lastAuditDate"
                value={asset.lastAuditDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-blue-600" />
            Asset Images {!isEdit && "*"}
          </h2>

          <div className="space-y-4">
            {/* Image upload instructions */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <div className="flex">
                <ImageIcon className="h-5 w-5 text-blue-400" />
                <div className="ml-3">
                  <p className="text-sm text-blue-700 font-medium">
                    Image Upload Requirements:
                  </p>
                  <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
                    <li>Maximum 3 images allowed</li>
                    <li>Accepted formats: JPEG, PNG, WebP</li>
                    <li>Maximum file size: {MAX_IMAGE_SIZE_MB}MB per image</li>
                    <li>At least one image is required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.images ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Click to upload or drag and drop asset images
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {imagePreview.length}/{MAX_IMAGES} images uploaded (Maximum{" "}
                {MAX_IMAGES} images allowed)
              </p>
              <input
                type="file"
                multiple
                accept={ALLOWED_IMAGE_TYPES.join(",")}
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                disabled={imagePreview.length >= MAX_IMAGES}
              />
              <label
                htmlFor="image-upload"
                className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer ${
                  imagePreview.length >= MAX_IMAGES
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Upload className="w-4 h-4 mr-2" />
                {imagePreview.length >= MAX_IMAGES
                  ? "Maximum Images Reached"
                  : "Choose Images"}
              </label>
              {errors.images && (
                <p className="text-red-500 text-sm mt-2">{errors.images}</p>
              )}
            </div>

            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/assets/list")}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? "Update Asset" : "Create Asset"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;
