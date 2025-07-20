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

//chnage now

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

//     // Calculate how many slots are available for new images
//     const totalCurrentImages = imageFiles.length + existingImageUrls.length;
//     const availableSlots = MAX_IMAGES - totalCurrentImages;

//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
//       );
//       return;
//     }

//     setImageFiles((prev) => [...prev, ...files]);

//     // Create preview URLs for new images
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setImagePreview((prev) => [...prev, ...newPreviews]);

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

//         // Also update the preview array
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

//         // Also update the preview array
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
//     imagesToRemove: [],
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
//             imagesToRemove: [],
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

//     // Calculate how many slots are available for new images
//     const totalCurrentImages = imageFiles.length + existingImageUrls.length;
//     const availableSlots = MAX_IMAGES - totalCurrentImages;

//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
//       );
//       return;
//     }

//     setImageFiles((prev) => [...prev, ...files]);

//     // Create preview URLs for new images
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setImagePreview((prev) => [...prev, ...newPreviews]);

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
//         // Removing an existing image - store the URL to be removed on the server
//         const imageToRemove = existingImageUrls[index];
//         setAsset((prev) => ({
//           ...prev,
//           imagesToRemove: [...(prev.imagesToRemove || []), imageToRemove],
//         }));

//         // Update the UI
//         const updatedExistingUrls = [...existingImageUrls];
//         updatedExistingUrls.splice(index, 1);
//         setExistingImageUrls(updatedExistingUrls);

//         // Also update the preview array
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

//         // Also update the preview array
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
//         appendImages: true, // Always append images in this UI
//         imagesToRemove: asset.imagesToRemove || [], // Include images to remove
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
//upde 7/1

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
//     serviceScopeIds: [], // Changed from serviceScopeId to serviceScopeIds (array)
//     purchaseDate: "",
//     installationDate: "",
//     warrantyPeriodDays: "",
//     ownerType: "KANVEL",
//     lastAuditDate: "",
//     expectedUsefulLifeDays: "",
//     images: [],
//     imagesToRemove: [],
//   });
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreview, setImagePreview] = useState([]);
//   const [existingImageUrls, setExistingImageUrls] = useState([]);
//   const [errors, setErrors] = useState({});
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
//             serviceScopeIds: assetData.serviceScopeIds.map(String), // Convert to array of strings
//             imagesToRemove: [],
//           });
//           if (assetData.imageUrls && assetData.imageUrls.length > 0) {
//             setExistingImageUrls(assetData.imageUrls);
//             setImagePreview(assetData.imageUrls);
//           }
//           await Promise.all([
//             loadZones(assetData.contractId),
//             loadSubServices(assetData.contractId), // Use contract-specific sub-services
//           ]);
//           await Promise.all([
//             loadSubZones(assetData.contractId, assetData.zoneId),
//             loadServiceScopes(assetData.contractId, assetData.subServiceId), // Use contract-specific service scopes
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

//   const loadSubServices = async (contractId) => {
//     if (!contractId) {
//       setSubServices([]);
//       return;
//     }
//     try {
//       const response = await assetService.getSubServicesByContract(contractId);
//       setSubServices(response.data || []);
//     } catch (error) {
//       console.error("Error loading sub services:", error);
//       setSubServices([]);
//       toast.error("Failed to load sub-services");
//     }
//   };

//   const loadServiceScopes = async (contractId, subServiceId) => {
//     if (!contractId || !subServiceId) {
//       setServiceScopes([]);
//       return;
//     }
//     try {
//       const response =
//         await assetService.getServiceScopesByContractAndSubService(
//           contractId,
//           subServiceId
//         );
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
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     }

//     if (name === "contractId") {
//       loadZones(value);
//       loadSubServices(value);
//       setAsset((prev) => ({
//         ...prev,
//         zoneId: "",
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//         serviceId: "",
//         subServiceId: "",
//         serviceScopeIds: [],
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
//       setAsset((prev) => ({ ...prev, floorId: "", roomId: "" }));
//     } else if (name === "floorId") {
//       loadRooms(asset.contractId, value);
//       setAsset((prev) => ({ ...prev, roomId: "" }));
//     } else if (name === "serviceId") {
//       loadSubServices(asset.contractId);
//       setAsset((prev) => ({ ...prev, subServiceId: "", serviceScopeIds: [] }));
//     } else if (name === "subServiceId") {
//       loadServiceScopes(asset.contractId, value);
//       setAsset((prev) => ({ ...prev, serviceScopeIds: [] }));
//     }
//   };

//   const handleServiceScopeChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions).map(
//       (option) => option.value
//     );
//     setAsset((prev) => ({ ...prev, serviceScopeIds: selectedOptions }));
//     if (errors.serviceScopeIds) {
//       setErrors((prev) => ({ ...prev, serviceScopeIds: null }));
//     }
//   };

//   const validateImageFile = (file) => {
//     if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
//       toast.error(
//         `File type not supported. Please upload JPEG, PNG, or WebP images.`
//       );
//       return false;
//     }
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

//     const totalCurrentImages = imageFiles.length + existingImageUrls.length;
//     const availableSlots = MAX_IMAGES - totalCurrentImages;
//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
//       );
//       return;
//     }

//     setImageFiles((prev) => [...prev, ...files]);
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setImagePreview((prev) => [...prev, ...newPreviews]);

//     if (errors.images) {
//       setErrors((prev) => ({ ...prev, images: null }));
//     }
//   };

//   const removeImage = (index) => {
//     if (isEdit) {
//       const totalPreviews = imagePreview.length;
//       const existingCount = existingImageUrls.length;
//       if (index < existingCount) {
//         const imageToRemove = existingImageUrls[index];
//         setAsset((prev) => ({
//           ...prev,
//           imagesToRemove: [...(prev.imagesToRemove || []), imageToRemove],
//         }));
//         const updatedExistingUrls = [...existingImageUrls];
//         updatedExistingUrls.splice(index, 1);
//         setExistingImageUrls(updatedExistingUrls);
//         setImagePreview((prev) => {
//           const updated = [...prev];
//           updated.splice(index, 1);
//           return updated;
//         });
//       } else {
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
//     if (!asset.serviceScopeIds || asset.serviceScopeIds.length === 0) {
//       newErrors.serviceScopeIds = "At least one Service Scope is required";
//     }
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
//         appendImages: true,
//         imagesToRemove: asset.imagesToRemove || [],
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
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Wrench
//               className="w

// -5 h-5 mr-2 text-blue-600"
//             />
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
//                 Contract-Defined Service Scopes *
//               </label>
//               <select
//                 name="serviceScopeIds"
//                 multiple
//                 value={asset.serviceScopeIds}
//                 onChange={handleServiceScopeChange}
//                 disabled={!asset.subServiceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceScopeIds ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subServiceId ? "bg-gray-100" : ""}`}
//                 size={Math.min(serviceScopes.length, 5)}
//               >
//                 {serviceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId.toString()}>
//                     {scope.scopeName}
//                   </option>
//                 ))}
//               </select>
//               {errors.serviceScopeIds && (
//                 <p className="text-red-500 text-sm">{errors.serviceScopeIds}</p>
//               )}
//             </div>
//           </div>
//         </div>
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
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Upload className="w-5 h-5 mr-2 text-blue-600" />
//             Asset Images {!isEdit && "*"}
//           </h2>
//           <div className="space-y-4">
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
//   DollarSign,
//   TrendingDown,
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
//     assetCondition: "GOOD",
//     observation: "",
//     recommendation: "",
//     purchaseCost: "",
//     depreciationValue: "",
//     depreciationType: "PERCENTAGE",
//     timeFrameYears: "",
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
//     serviceScopeIds: [],
//     purchaseDate: "",
//     installationDate: "",
//     warrantyPeriodDays: "",
//     ownerType: "KANVEL",
//     lastAuditDate: "",
//     images: [],
//     imagesToRemove: [],
//   });

//   const [imageFiles, setImageFiles] = useState([]);
//   const [imagePreview, setImagePreview] = useState([]);
//   const [existingImageUrls, setExistingImageUrls] = useState([]);
//   const [errors, setErrors] = useState({});
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
//             serviceScopeIds: assetData.serviceScopeIds.map(String),
//             purchaseCost: assetData.purchaseCost?.toString() || "",
//             depreciationValue: assetData.depreciationValue?.toString() || "",
//             timeFrameYears: assetData.timeFrameYears?.toString() || "",
//             warrantyPeriodDays: assetData.warrantyPeriodDays?.toString() || "",
//             imagesToRemove: [],
//           });

//           if (assetData.imageUrls && assetData.imageUrls.length > 0) {
//             setExistingImageUrls(assetData.imageUrls);
//             setImagePreview(assetData.imageUrls);
//           }

//           await Promise.all([
//             loadZones(assetData.contractId),
//             loadSubServices(assetData.contractId),
//           ]);

//           await Promise.all([
//             loadSubZones(assetData.contractId, assetData.zoneId),
//             loadServiceScopes(assetData.contractId, assetData.subServiceId),
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

//   const loadSubServices = async (contractId) => {
//     if (!contractId) {
//       setSubServices([]);
//       return;
//     }
//     try {
//       const response = await assetService.getSubServicesByContract(contractId);
//       setSubServices(response.data || []);
//     } catch (error) {
//       console.error("Error loading sub services:", error);
//       setSubServices([]);
//       toast.error("Failed to load sub-services");
//     }
//   };

//   const loadServiceScopes = async (contractId, subServiceId) => {
//     if (!contractId || !subServiceId) {
//       setServiceScopes([]);
//       return;
//     }
//     try {
//       const response =
//         await assetService.getServiceScopesByContractAndSubService(
//           contractId,
//           subServiceId
//         );
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

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: null }));
//     }

//     if (name === "contractId") {
//       loadZones(value);
//       loadSubServices(value);
//       setAsset((prev) => ({
//         ...prev,
//         zoneId: "",
//         subZoneId: "",
//         buildingId: "",
//         villaApartmentId: "",
//         floorId: "",
//         roomId: "",
//         serviceId: "",
//         subServiceId: "",
//         serviceScopeIds: [],
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
//       setAsset((prev) => ({ ...prev, floorId: "", roomId: "" }));
//     } else if (name === "floorId") {
//       loadRooms(asset.contractId, value);
//       setAsset((prev) => ({ ...prev, roomId: "" }));
//     } else if (name === "serviceId") {
//       loadSubServices(asset.contractId);
//       setAsset((prev) => ({ ...prev, subServiceId: "", serviceScopeIds: [] }));
//     } else if (name === "subServiceId") {
//       loadServiceScopes(asset.contractId, value);
//       setAsset((prev) => ({ ...prev, serviceScopeIds: [] }));
//     }
//   };

//   const handleServiceScopeChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions).map(
//       (option) => option.value
//     );
//     setAsset((prev) => ({ ...prev, serviceScopeIds: selectedOptions }));
//     if (errors.serviceScopeIds) {
//       setErrors((prev) => ({ ...prev, serviceScopeIds: null }));
//     }
//   };

//   const validateImageFile = (file) => {
//     if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
//       toast.error(
//         `File type not supported. Please upload JPEG, PNG, or WebP images.`
//       );
//       return false;
//     }
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

//     const totalCurrentImages = imageFiles.length + existingImageUrls.length;
//     const availableSlots = MAX_IMAGES - totalCurrentImages;

//     if (files.length > availableSlots) {
//       toast.error(
//         `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
//       );
//       return;
//     }

//     setImageFiles((prev) => [...prev, ...files]);
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setImagePreview((prev) => [...prev, ...newPreviews]);

//     if (errors.images) {
//       setErrors((prev) => ({ ...prev, images: null }));
//     }
//   };

//   const removeImage = (index) => {
//     if (isEdit) {
//       const totalPreviews = imagePreview.length;
//       const existingCount = existingImageUrls.length;

//       if (index < existingCount) {
//         const imageToRemove = existingImageUrls[index];
//         setAsset((prev) => ({
//           ...prev,
//           imagesToRemove: [...(prev.imagesToRemove || []), imageToRemove],
//         }));

//         const updatedExistingUrls = [...existingImageUrls];
//         updatedExistingUrls.splice(index, 1);
//         setExistingImageUrls(updatedExistingUrls);

//         setImagePreview((prev) => {
//           const updated = [...prev];
//           updated.splice(index, 1);
//           return updated;
//         });
//       } else {
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

//     if (!asset.serviceScopeIds || asset.serviceScopeIds.length === 0) {
//       newErrors.serviceScopeIds = "At least one Service Scope is required";
//     }

//     // Validate financial fields
//     if (asset.purchaseCost && isNaN(Number.parseFloat(asset.purchaseCost))) {
//       newErrors.purchaseCost = "Purchase cost must be a valid number";
//     }

//     if (
//       asset.depreciationValue &&
//       isNaN(Number.parseFloat(asset.depreciationValue))
//     ) {
//       newErrors.depreciationValue = "Depreciation value must be a valid number";
//     }

//     if (
//       asset.depreciationType === "PERCENTAGE" &&
//       asset.depreciationValue &&
//       (Number.parseFloat(asset.depreciationValue) < 0 ||
//         Number.parseFloat(asset.depreciationValue) > 100)
//     ) {
//       newErrors.depreciationValue =
//         "Depreciation percentage must be between 0 and 100";
//     }

//     if (
//       asset.timeFrameYears &&
//       (isNaN(Number.parseInt(asset.timeFrameYears)) ||
//         Number.parseInt(asset.timeFrameYears) < 1 ||
//         Number.parseInt(asset.timeFrameYears) > 50)
//     ) {
//       newErrors.timeFrameYears = "Time frame must be between 1 and 50 years";
//     }

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

//   const calculateDepreciatedValue = () => {
//     if (
//       !asset.purchaseCost ||
//       !asset.depreciationValue ||
//       !asset.depreciationType ||
//       !asset.timeFrameYears
//     )
//       return "-";
//     const cost = Number.parseFloat(asset.purchaseCost);
//     const value = Number.parseFloat(asset.depreciationValue);
//     const years = Number.parseInt(asset.timeFrameYears);
//     if (asset.depreciationType === "NUMBER") {
//       const result = Math.max(cost - value * years, 0);
//       return result.toLocaleString(undefined, {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       });
//     }
//     // Linear depreciation: A = P - (P * (r/100) * t)
//     const annualDepreciation = cost * (value / 100);
//     const result = Math.max(cost - annualDepreciation * years, 0);
//     return result.toLocaleString(undefined, {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
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
//         appendImages: true,
//         imagesToRemove: asset.imagesToRemove || [],
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
//               <label
//                 htmlFor="assetName"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Tag className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Name *
//               </label>
//               <input
//                 id="assetName"
//                 type="text"
//                 name="assetName"
//                 value={asset.assetName}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.assetName ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter asset name"
//                 aria-describedby={
//                   errors.assetName ? "assetName-error" : undefined
//                 }
//               />
//               {errors.assetName && (
//                 <p id="assetName-error" className="text-red-500 text-sm">
//                   {errors.assetName}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="serialNumber"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Barcode className="w-4 h-4 mr-1 text-gray-500" />
//                 Serial Number
//               </label>
//               <input
//                 id="serialNumber"
//                 type="text"
//                 name="serialNumber"
//                 value={asset.serialNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter serial number"
//                 aria-describedby="serialNumber-help"
//               />
//               <p id="serialNumber-help" className="text-sm text-gray-500">
//                 Enter the asset's serial number, if available.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="brandName"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Box className="w-4 h-4 mr-1 text-gray-500" />
//                 Brand Name
//               </label>
//               <input
//                 id="brandName"
//                 type="text"
//                 name="brandName"
//                 value={asset.brandName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter brand name"
//                 aria-describedby="brandName-help"
//               />
//               <p id="brandName-help" className="text-sm text-gray-500">
//                 Enter the brand or manufacturer of the asset.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="modelNumber"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Cpu className="w-4 h-4 mr-1 text-gray-500" />
//                 Model Number
//               </label>
//               <input
//                 id="modelNumber"
//                 type="text"
//                 name="modelNumber"
//                 value={asset.modelNumber}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter model number"
//                 aria-describedby="modelNumber-help"
//               />
//               <p id="modelNumber-help" className="text-sm text-gray-500">
//                 Enter the model number of the asset.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="assetStatus"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Status *
//               </label>
//               <select
//                 id="assetStatus"
//                 name="assetStatus"
//                 value={asset.assetStatus}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.assetStatus ? "border-red-500" : "border-gray-300"
//                 }`}
//                 aria-describedby={
//                   errors.assetStatus ? "assetStatus-error" : undefined
//                 }
//               >
//                 <option value="ACTIVE">Active</option>
//                 <option value="UNDER_MAINTENANCE">Under Maintenance</option>
//                 <option value="DECOMMISSIONED">Decommissioned</option>
//               </select>
//               {errors.assetStatus && (
//                 <p id="assetStatus-error" className="text-red-500 text-sm">
//                   {errors.assetStatus}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="assetCondition"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
//                 Asset Condition *
//               </label>
//               <select
//                 id="assetCondition"
//                 name="assetCondition"
//                 value={asset.assetCondition}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-describedby="assetCondition-help"
//               >
//                 <option value="EXCELLENT">Excellent</option>
//                 <option value="GOOD">Good</option>
//                 <option value="AVERAGE">Average</option>
//                 <option value="POOR">Poor</option>
//               </select>
//               <p id="assetCondition-help" className="text-sm text-gray-500">
//                 Select the current condition of the asset.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="ownerType"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <User className="w-4 h-4 mr-1 text-gray-500" />
//                 Owner Type
//               </label>
//               <select
//                 id="ownerType"
//                 name="ownerType"
//                 value={asset.ownerType}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-describedby="ownerType-help"
//               >
//                 <option value="KANVEL">Kanvel</option>
//                 <option value="TENANT">Tenant</option>
//                 <option value="PROPERTY_OWNER">Property Owner</option>
//               </select>
//               <p id="ownerType-help" className="text-sm text-gray-500">
//                 Select who owns the asset.
//               </p>
//             </div>
//           </div>

//           {/* Observation and Recommendation */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div className="space-y-2">
//               <label
//                 htmlFor="observation"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Observation
//               </label>
//               <textarea
//                 id="observation"
//                 name="observation"
//                 value={asset.observation}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter observations about the asset"
//                 aria-describedby="observation-help"
//               />
//               <p id="observation-help" className="text-sm text-gray-500">
//                 Describe any observations about the asset's condition or usage.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="recommendation"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Recommendation
//               </label>
//               <textarea
//                 id="recommendation"
//                 name="recommendation"
//                 value={asset.recommendation}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter recommendations for the asset"
//                 aria-describedby="recommendation-help"
//               />
//               <p id="recommendation-help" className="text-sm text-gray-500">
//                 Provide any recommendations for maintenance or replacement.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Financial Information */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
//             Financial Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label
//                 htmlFor="purchaseCost"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
//                 Purchase Cost
//               </label>
//               <p id="purchaseCost-help" className="text-sm text-gray-500 mb-1">
//                 Enter the initial cost of the asset in USD (e.g., 5000.00).
//               </p>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                   $
//                 </span>
//                 <input
//                   id="purchaseCost"
//                   type="number"
//                   name="purchaseCost"
//                   value={asset.purchaseCost}
//                   onChange={handleChange}
//                   step="100"
//                   min="0"
//                   inputMode="decimal"
//                   placeholder="e.g., 5000.00"
//                   aria-label="Enter asset purchase cost in USD"
//                   aria-describedby={
//                     errors.purchaseCost
//                       ? "purchaseCost-help purchaseCost-error"
//                       : "purchaseCost-help"
//                   }
//                   className={`w-full pl-8 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.purchaseCost ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//               </div>
//               {errors.purchaseCost && (
//                 <p id="purchaseCost-error" className="text-red-500 text-sm">
//                   {errors.purchaseCost}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="depreciationType"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
//                 Depreciation Type
//                 <span
//                   className="ml-1 text-gray-500 cursor-help"
//                   title="Percentage: Reduces value by a percentage each year; Fixed Amount: Deducts a fixed amount each year"
//                 >
//                   ?
//                 </span>
//               </label>
//               <p
//                 id="depreciationType-help"
//                 className="text-sm text-gray-500 mb-1"
//               >
//                 Select how the asset's value decreases over time.
//               </p>
//               <select
//                 id="depreciationType"
//                 name="depreciationType"
//                 value={asset.depreciationType}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Select depreciation type"
//                 aria-describedby="depreciationType-help"
//               >
//                 <option value="PERCENTAGE">Percentage</option>
//                 <option value="NUMBER">Fixed Amount</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="depreciationValue"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
//                 Depreciation Value
//               </label>
//               <p
//                 id="depreciationValue-help"
//                 className="text-sm text-gray-500 mb-1"
//               >
//                 {asset.depreciationType === "PERCENTAGE"
//                   ? "Enter annual depreciation percentage (e.g., 10 for 10%)."
//                   : "Enter fixed annual depreciation amount in USD (e.g., 500)."}
//               </p>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
//                   {asset.depreciationType === "PERCENTAGE" ? "%" : "$"}
//                 </span>
//                 <input
//                   id="depreciationValue"
//                   type="number"
//                   name="depreciationValue"
//                   value={asset.depreciationValue}
//                   onChange={handleChange}
//                   step={asset.depreciationType === "PERCENTAGE" ? "1" : "100"}
//                   min="0"
//                   max={
//                     asset.depreciationType === "PERCENTAGE" ? "100" : undefined
//                   }
//                   inputMode="decimal"
//                   placeholder={
//                     asset.depreciationType === "PERCENTAGE"
//                       ? "e.g., 10"
//                       : "e.g., 500"
//                   }
//                   aria-label={`Enter ${
//                     asset.depreciationType === "PERCENTAGE"
//                       ? "depreciation percentage"
//                       : "fixed depreciation amount"
//                   }`}
//                   aria-describedby={
//                     errors.depreciationValue
//                       ? "depreciationValue-help depreciationValue-error"
//                       : "depreciationValue-help"
//                   }
//                   className={`w-full pl-8 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.depreciationValue
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                 />
//               </div>
//               {errors.depreciationValue && (
//                 <p
//                   id="depreciationValue-error"
//                   className="text-red-500 text-sm"
//                 >
//                   {errors.depreciationValue}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="timeFrameYears"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Clock className="w-4 h-4 mr-1 text-gray-500" />
//                 Time Frame (Years)
//               </label>
//               <p
//                 id="timeFrameYears-help"
//                 className="text-sm text-gray-500 mb-1"
//               >
//                 Enter the number of years for depreciation (e.g., 5).
//               </p>
//               <input
//                 id="timeFrameYears"
//                 type="number"
//                 name="timeFrameYears"
//                 value={asset.timeFrameYears}
//                 onChange={handleChange}
//                 step="1"
//                 min="1"
//                 max="50"
//                 placeholder="e.g., 5"
//                 aria-label="Enter depreciation time frame in years"
//                 aria-describedby={
//                   errors.timeFrameYears
//                     ? "timeFrameYears-help timeFrameYears-error"
//                     : "timeFrameYears-help"
//                 }
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.timeFrameYears ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {errors.timeFrameYears && (
//                 <p id="timeFrameYears-error" className="text-red-500 text-sm">
//                   {errors.timeFrameYears}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700 flex items-center">
//                 <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
//                 Estimated Current Value
//               </label>
//               <p
//                 className="text-lg font-semibold text-green-600"
//                 aria-label="Estimated current depreciated value"
//               >
//                 {calculateDepreciatedValue() === "-"
//                   ? "-"
//                   : `$${calculateDepreciatedValue()}`}
//               </p>
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
//               <label
//                 htmlFor="companyId"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Company *
//               </label>
//               <select
//                 id="companyId"
//                 name="companyId"
//                 value={asset.companyId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.companyId ? "border-red-500" : "border-gray-300"
//                 }`}
//                 aria-describedby={
//                   errors.companyId ? "companyId-error" : undefined
//                 }
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
//                 <p id="companyId-error" className="text-red-500 text-sm">
//                   {errors.companyId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="contractId"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Contract *
//               </label>
//               <select
//                 id="contractId"
//                 name="contractId"
//                 value={asset.contractId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.contractId ? "border-red-500" : "border-gray-300"
//                 }`}
//                 aria-describedby={
//                   errors.contractId ? "contractId-error" : undefined
//                 }
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
//                 <p id="contractId-error" className="text-red-500 text-sm">
//                   {errors.contractId}
//                 </p>
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
//               <label
//                 htmlFor="zoneId"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <MapPin className="w-4 h-4 mr-1 text-gray-500" />
//                 Zone *
//               </label>
//               <select
//                 id="zoneId"
//                 name="zoneId"
//                 value={asset.zoneId}
//                 onChange={handleChange}
//                 disabled={!asset.contractId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.zoneId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.contractId ? "bg-gray-100" : ""}`}
//                 aria-describedby={errors.zoneId ? "zoneId-error" : undefined}
//               >
//                 <option value="">Select Zone</option>
//                 {zones.map((zone) => (
//                   <option key={zone.zoneId} value={zone.zoneId.toString()}>
//                     {zone.zoneName}
//                   </option>
//                 ))}
//               </select>
//               {errors.zoneId && (
//                 <p id="zoneId-error" className="text-red-500 text-sm">
//                   {errors.zoneId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="subZoneId"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                 Sub Zone *
//               </label>
//               <select
//                 id="subZoneId"
//                 name="subZoneId"
//                 value={asset.subZoneId}
//                 onChange={handleChange}
//                 disabled={!asset.zoneId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.subZoneId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.zoneId ? "bg-gray-100" : ""}`}
//                 aria-describedby={
//                   errors.subZoneId ? "subZoneId-error" : undefined
//                 }
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
//                 <p id="subZoneId-error" className="text-red-500 text-sm">
//                   {errors.subZoneId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="buildingId"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Building className="w-4 h-4 mr-1 text-gray-500" />
//                 Building *
//               </label>
//               <select
//                 id="buildingId"
//                 name="buildingId"
//                 value={asset.buildingId}
//                 onChange={handleChange}
//                 disabled={!asset.subZoneId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.buildingId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subZoneId ? "bg-gray-100" : ""}`}
//                 aria-describedby={
//                   errors.buildingId ? "buildingId-error" : undefined
//                 }
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
//                 <p id="buildingId-error" className="text-red-500 text-sm">
//                   {errors.buildingId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="villaApartmentId"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Home className="w-4 h-4 mr-1 text-gray-500" />
//                 Villa/Apartment *
//               </label>
//               <select
//                 id="villaApartmentId"
//                 name="villaApartmentId"
//                 value={asset.villaApartmentId}
//                 onChange={handleChange}
//                 disabled={!asset.buildingId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.villaApartmentId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.buildingId ? "bg-gray-100" : ""}`}
//                 aria-describedby={
//                   errors.villaApartmentId ? "villaApartmentId-error" : undefined
//                 }
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
//                 <p id="villaApartmentId-error" className="text-red-500 text-sm">
//                   {errors.villaApartmentId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="floorId"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Layers className="w-4 h-4 mr-1 text-gray-500" />
//                 Floor *
//               </label>
//               <select
//                 id="floorId"
//                 name="floorId"
//                 value={asset.floorId}
//                 onChange={handleChange}
//                 disabled={!asset.villaApartmentId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.floorId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.villaApartmentId ? "bg-gray-100" : ""}`}
//                 aria-describedby={errors.floorId ? "floorId-error" : undefined}
//               >
//                 <option value="">Select Floor</option>
//                 {floors.map((floor) => (
//                   <option key={floor.floorId} value={floor.floorId.toString()}>
//                     {floor.floorName}
//                   </option>
//                 ))}
//               </select>
//               {errors.floorId && (
//                 <p id="floorId-error" className="text-red-500 text-sm">
//                   {errors.floorId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="roomId"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
//                 Room *
//               </label>
//               <select
//                 id="roomId"
//                 name="roomId"
//                 value={asset.roomId}
//                 onChange={handleChange}
//                 disabled={!asset.floorId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.roomId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.floorId ? "bg-gray-100" : ""}`}
//                 aria-describedby={errors.roomId ? "roomId-error" : undefined}
//               >
//                 <option value="">Select Room</option>
//                 {rooms.map((room) => (
//                   <option key={room.roomId} value={room.roomId.toString()}>
//                     {room.roomName}
//                   </option>
//                 ))}
//               </select>
//               {errors.roomId && (
//                 <p id="roomId-error" className="text-red-500 text-sm">
//                   {errors.roomId}
//                 </p>
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
//               <label
//                 htmlFor="serviceId"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Service *
//               </label>
//               <select
//                 id="serviceId"
//                 name="serviceId"
//                 value={asset.serviceId}
//                 onChange={handleChange}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceId ? "border-red-500" : "border-gray-300"
//                 }`}
//                 aria-describedby={
//                   errors.serviceId ? "serviceId-error" : undefined
//                 }
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
//                 <p id="serviceId-error" className="text-red-500 text-sm">
//                   {errors.serviceId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="subServiceId"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Sub Service *
//               </label>
//               <select
//                 id="subServiceId"
//                 name="subServiceId"
//                 value={asset.subServiceId}
//                 onChange={handleChange}
//                 disabled={!asset.serviceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.subServiceId ? "border-red-500" : "border-gray-300"
//                 } ${!asset.serviceId ? "bg-gray-100" : ""}`}
//                 aria-describedby={
//                   errors.subServiceId ? "subServiceId-error" : undefined
//                 }
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
//                 <p id="subServiceId-error" className="text-red-500 text-sm">
//                   {errors.subServiceId}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="serviceScopeIds"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Contract-Defined Service Scopes *
//               </label>
//               <select
//                 id="serviceScopeIds"
//                 name="serviceScopeIds"
//                 multiple
//                 value={asset.serviceScopeIds}
//                 onChange={handleServiceScopeChange}
//                 disabled={!asset.subServiceId}
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.serviceScopeIds ? "border-red-500" : "border-gray-300"
//                 } ${!asset.subServiceId ? "bg-gray-100" : ""}`}
//                 size={Math.min(serviceScopes.length, 5)}
//                 aria-describedby={
//                   errors.serviceScopeIds ? "serviceScopeIds-error" : undefined
//                 }
//               >
//                 {serviceScopes.map((scope) => (
//                   <option key={scope.scopeId} value={scope.scopeId.toString()}>
//                     {scope.scopeName}
//                   </option>
//                 ))}
//               </select>
//               {errors.serviceScopeIds && (
//                 <p id="serviceScopeIds-error" className="text-red-500 text-sm">
//                   {errors.serviceScopeIds}
//                 </p>
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
//               <label
//                 htmlFor="purchaseDate"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Purchase Date
//               </label>
//               <input
//                 id="purchaseDate"
//                 type="date"
//                 name="purchaseDate"
//                 value={asset.purchaseDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-describedby="purchaseDate-help"
//               />
//               <p id="purchaseDate-help" className="text-sm text-gray-500">
//                 Select the date the asset was purchased.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="installationDate"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Installation Date
//               </label>
//               <input
//                 id="installationDate"
//                 type="date"
//                 name="installationDate"
//                 value={asset.installationDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-describedby="installationDate-help"
//               />
//               <p id="installationDate-help" className="text-sm text-gray-500">
//                 Select the date the asset was installed.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="warrantyPeriodDays"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Warranty Period (Days)
//               </label>
//               <input
//                 id="warrantyPeriodDays"
//                 type="number"
//                 name="warrantyPeriodDays"
//                 value={asset.warrantyPeriodDays}
//                 onChange={handleChange}
//                 min="0"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter warranty period in days"
//                 aria-describedby="warrantyPeriodDays-help"
//               />
//               <p id="warrantyPeriodDays-help" className="text-sm text-gray-500">
//                 Enter the warranty period in days, if applicable.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label
//                 htmlFor="lastAuditDate"
//                 className="block text-sm font-medium text-gray-700 flex items-center"
//               >
//                 <Calendar className="w-4 h-4 mr-1 text-gray-500" />
//                 Last Audit Date
//               </label>
//               <input
//                 id="lastAuditDate"
//                 type="date"
//                 name="lastAuditDate"
//                 value={asset.lastAuditDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-describedby="lastAuditDate-help"
//               />
//               <p id="lastAuditDate-help" className="text-sm text-gray-500">
//                 Select the date of the last asset audit.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Asset Images */}
//         <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <Upload className="w-5 h-5 mr-2 text-blue-600" />
//             Asset Images {!isEdit && "*"}
//           </h2>
//           <div className="space-y-4">
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
//                 <p id="images-error" className="text-red-500 text-sm mt-2">
//                   {errors.images}
//                 </p>
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
  DollarSign,
  TrendingDown,
  ArrowLeft,
  BookmarkPlus,
  CheckCircle,
  XCircle,
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
  const [savingDraft, setSavingDraft] = useState(false);

  const [asset, setAsset] = useState({
    assetName: "",
    serialNumber: "",
    brandName: "",
    modelNumber: "",
    assetStatus: "ACTIVE",
    assetCondition: "GOOD",
    observation: "",
    recommendation: "",
    purchaseCost: "",
    depreciationValue: "",
    depreciationType: "PERCENTAGE",
    timeFrameYears: "",
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
    serviceScopeIds: [],
    purchaseDate: "",
    installationDate: "",
    warrantyPeriodDays: "",
    ownerType: "KANVEL",
    lastAuditDate: "",
    images: [],
    imagesToRemove: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [errors, setErrors] = useState({});
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

  const MAX_IMAGES = 3;
  const MAX_IMAGE_SIZE_MB = 5;
  const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  // Draft functionality
  const DRAFT_KEY = `asset_draft_${isEdit ? assetId : "new"}`;

  const saveDraft = () => {
    setSavingDraft(true);
    try {
      const draftData = {
        ...asset,
        imageFiles: [], // Don't save files in localStorage
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
      toast.success("Draft saved successfully!");
    } catch (error) {
      toast.error("Failed to save draft");
    } finally {
      setSavingDraft(false);
    }
  };

  const loadDraft = () => {
    try {
      const draftData = localStorage.getItem(DRAFT_KEY);
      if (draftData) {
        const parsed = JSON.parse(draftData);
        setAsset((prev) => ({ ...prev, ...parsed }));
        toast.info("Draft loaded successfully!");
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
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
            serviceScopeIds: assetData.serviceScopeIds.map(String),
            purchaseCost: assetData.purchaseCost?.toString() || "",
            depreciationValue: assetData.depreciationValue?.toString() || "",
            timeFrameYears: assetData.timeFrameYears?.toString() || "",
            warrantyPeriodDays: assetData.warrantyPeriodDays?.toString() || "",
            imagesToRemove: [],
          });

          if (assetData.imageUrls && assetData.imageUrls.length > 0) {
            setExistingImageUrls(assetData.imageUrls);
            setImagePreview(assetData.imageUrls);
          }

          await Promise.all([
            loadZones(assetData.contractId),
            loadSubServices(assetData.contractId),
          ]);

          await Promise.all([
            loadSubZones(assetData.contractId, assetData.zoneId),
            loadServiceScopes(assetData.contractId, assetData.subServiceId),
          ]);

          await loadBuildings(assetData.contractId, assetData.subZoneId);
          await loadVillaApartments(assetData.contractId, assetData.buildingId);
          await loadFloors(assetData.contractId, assetData.villaApartmentId);
          await loadRooms(assetData.contractId, assetData.floorId);
        } else {
          // Load draft for new assets
          loadDraft();
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

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!isEdit) {
      const interval = setInterval(() => {
        if (asset.assetName || asset.companyId || asset.contractId) {
          saveDraft();
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [asset, isEdit]);

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

  const loadSubServices = async (contractId) => {
    if (!contractId) {
      setSubServices([]);
      return;
    }
    try {
      const response = await assetService.getSubServicesByContract(contractId);
      setSubServices(response.data || []);
    } catch (error) {
      console.error("Error loading sub services:", error);
      setSubServices([]);
      toast.error("Failed to load sub-services");
    }
  };

  const loadServiceScopes = async (contractId, subServiceId) => {
    if (!contractId || !subServiceId) {
      setServiceScopes([]);
      return;
    }
    try {
      const response =
        await assetService.getServiceScopesByContractAndSubService(
          contractId,
          subServiceId
        );
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

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (name === "contractId") {
      loadZones(value);
      loadSubServices(value);
      setAsset((prev) => ({
        ...prev,
        zoneId: "",
        subZoneId: "",
        buildingId: "",
        villaApartmentId: "",
        floorId: "",
        roomId: "",
        serviceId: "",
        subServiceId: "",
        serviceScopeIds: [],
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
      setAsset((prev) => ({ ...prev, floorId: "", roomId: "" }));
    } else if (name === "floorId") {
      loadRooms(asset.contractId, value);
      setAsset((prev) => ({ ...prev, roomId: "" }));
    } else if (name === "serviceId") {
      loadSubServices(asset.contractId);
      setAsset((prev) => ({ ...prev, subServiceId: "", serviceScopeIds: [] }));
    } else if (name === "subServiceId") {
      loadServiceScopes(asset.contractId, value);
      setAsset((prev) => ({ ...prev, serviceScopeIds: [] }));
    }
  };

  const handleServiceScopeToggle = (scopeId) => {
    setAsset((prev) => {
      const currentScopes = prev.serviceScopeIds;
      const isSelected = currentScopes.includes(scopeId);

      if (isSelected) {
        return {
          ...prev,
          serviceScopeIds: currentScopes.filter((id) => id !== scopeId),
        };
      } else {
        return {
          ...prev,
          serviceScopeIds: [...currentScopes, scopeId],
        };
      }
    });

    if (errors.serviceScopeIds) {
      setErrors((prev) => ({ ...prev, serviceScopeIds: null }));
    }
  };

  const validateImageFile = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error(
        `File type not supported. Please upload JPEG, PNG, or WebP images.`
      );
      return false;
    }

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

    const totalCurrentImages = imageFiles.length + existingImageUrls.length;
    const availableSlots = MAX_IMAGES - totalCurrentImages;

    if (files.length > availableSlots) {
      toast.error(
        `You can only upload ${availableSlots} more image(s). Maximum ${MAX_IMAGES} images allowed.`
      );
      return;
    }

    setImageFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreviews]);

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: null }));
    }
  };

  const removeImage = (index) => {
    if (isEdit) {
      const totalPreviews = imagePreview.length;
      const existingCount = existingImageUrls.length;

      if (index < existingCount) {
        const imageToRemove = existingImageUrls[index];
        setAsset((prev) => ({
          ...prev,
          imagesToRemove: [...(prev.imagesToRemove || []), imageToRemove],
        }));

        const updatedExistingUrls = [...existingImageUrls];
        updatedExistingUrls.splice(index, 1);
        setExistingImageUrls(updatedExistingUrls);

        setImagePreview((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });
      } else {
        const newImageIndex = index - existingCount;
        setImageFiles((prev) => {
          const updated = [...prev];
          updated.splice(newImageIndex, 1);
          return updated;
        });

        setImagePreview((prev) => {
          const updated = [...prev];
          updated.splice(index, 1);
          return updated;
        });
      }
    } else {
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

    if (!asset.serviceScopeIds || asset.serviceScopeIds.length === 0) {
      newErrors.serviceScopeIds = "At least one Service Scope is required";
    }

    // Validate financial fields
    if (asset.purchaseCost && isNaN(Number.parseFloat(asset.purchaseCost))) {
      newErrors.purchaseCost = "Purchase cost must be a valid number";
    }

    if (
      asset.depreciationValue &&
      isNaN(Number.parseFloat(asset.depreciationValue))
    ) {
      newErrors.depreciationValue = "Depreciation value must be a valid number";
    }

    if (
      asset.depreciationType === "PERCENTAGE" &&
      asset.depreciationValue &&
      (Number.parseFloat(asset.depreciationValue) < 0 ||
        Number.parseFloat(asset.depreciationValue) > 100)
    ) {
      newErrors.depreciationValue =
        "Depreciation percentage must be between 0 and 100";
    }

    if (
      asset.timeFrameYears &&
      (isNaN(Number.parseInt(asset.timeFrameYears)) ||
        Number.parseInt(asset.timeFrameYears) < 1 ||
        Number.parseInt(asset.timeFrameYears) > 50)
    ) {
      newErrors.timeFrameYears = "Time frame must be between 1 and 50 years";
    }

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

  const calculateDepreciatedValue = () => {
    if (
      !asset.purchaseCost ||
      !asset.depreciationValue ||
      !asset.depreciationType ||
      !asset.timeFrameYears
    )
      return "-";

    const cost = Number.parseFloat(asset.purchaseCost);
    const value = Number.parseFloat(asset.depreciationValue);
    const years = Number.parseInt(asset.timeFrameYears);

    if (asset.depreciationType === "NUMBER") {
      const result = Math.max(cost - value * years, 0);
      return result.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    // Linear depreciation: A = P - (P * (r/100) * t)
    const annualDepreciation = cost * (value / 100);
    const result = Math.max(cost - annualDepreciation * years, 0);
    return result.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
        appendImages: true,
        imagesToRemove: asset.imagesToRemove || [],
      };

      if (isEdit) {
        await assetService.updateAsset(assetId, assetData);
        toast.success("Asset updated successfully");
      } else {
        await assetService.createAsset(assetData);
        toast.success("Asset created successfully");
        clearDraft(); // Clear draft after successful creation
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <span className="block mt-4 text-lg font-medium text-gray-700 text-center">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/assets/list")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEdit ? "Edit Asset" : "Create New Asset"}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isEdit
                    ? "Update asset information"
                    : "Add a new asset to your inventory"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEdit && (
                <button
                  type="button"
                  onClick={saveDraft}
                  disabled={savingDraft}
                  className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                >
                  {savingDraft ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      Save Draft
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {(!user || !user.username) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  User information is missing. Please log out and log in again
                  to fix this issue.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Organization Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Organization Information
                </h2>
                <p className="text-gray-600">
                  Select company and contract details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label
                  htmlFor="companyId"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Company *
                </label>
                <select
                  id="companyId"
                  name="companyId"
                  value={asset.companyId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.companyId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
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
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.companyId}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contractId"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Contract *
                </label>
                <select
                  id="contractId"
                  name="contractId"
                  value={asset.contractId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.contractId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
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
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.contractId}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Location Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Location Information
                </h2>
                <p className="text-gray-600">
                  Specify the exact location of the asset
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="zoneId"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                  Zone *
                </label>
                <select
                  id="zoneId"
                  name="zoneId"
                  value={asset.zoneId}
                  onChange={handleChange}
                  disabled={!asset.contractId}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.zoneId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${
                    !asset.contractId ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">Select Zone</option>
                  {zones.map((zone) => (
                    <option key={zone.zoneId} value={zone.zoneId.toString()}>
                      {zone.zoneName}
                    </option>
                  ))}
                </select>
                {errors.zoneId && (
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.zoneId}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subZoneId"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
                >
                  <Layers className="w-4 h-4 mr-1 text-gray-500" />
                  Sub Zone *
                </label>
                <select
                  id="subZoneId"
                  name="subZoneId"
                  value={asset.subZoneId}
                  onChange={handleChange}
                  disabled={!asset.zoneId}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.subZoneId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${!asset.zoneId ? "bg-gray-100 cursor-not-allowed" : ""}`}
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
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.subZoneId}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="buildingId"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
                >
                  <Building className="w-4 h-4 mr-1 text-gray-500" />
                  Building *
                </label>
                <select
                  id="buildingId"
                  name="buildingId"
                  value={asset.buildingId}
                  onChange={handleChange}
                  disabled={!asset.subZoneId}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.buildingId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${
                    !asset.subZoneId ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
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
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.buildingId}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="villaApartmentId"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
                >
                  <Home className="w-4 h-4 mr-1 text-gray-500" />
                  Villa/Apartment *
                </label>
                <select
                  id="villaApartmentId"
                  name="villaApartmentId"
                  value={asset.villaApartmentId}
                  onChange={handleChange}
                  disabled={!asset.buildingId}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.villaApartmentId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${
                    !asset.buildingId ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
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
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.villaApartmentId}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="floorId"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
                >
                  <Layers className="w-4 h-4 mr-1 text-gray-500" />
                  Floor *
                </label>
                <select
                  id="floorId"
                  name="floorId"
                  value={asset.floorId}
                  onChange={handleChange}
                  disabled={!asset.villaApartmentId}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.floorId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${
                    !asset.villaApartmentId
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <option value="">Select Floor</option>
                  {floors.map((floor) => (
                    <option
                      key={floor.floorId}
                      value={floor.floorId.toString()}
                    >
                      {floor.floorName}
                    </option>
                  ))}
                </select>
                {errors.floorId && (
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.floorId}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="roomId"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
                >
                  <DoorOpen className="w-4 h-4 mr-1 text-gray-500" />
                  Room *
                </label>
                <select
                  id="roomId"
                  name="roomId"
                  value={asset.roomId}
                  onChange={handleChange}
                  disabled={!asset.floorId}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.roomId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${!asset.floorId ? "bg-gray-100 cursor-not-allowed" : ""}`}
                >
                  <option value="">Select Room</option>
                  {rooms.map((room) => (
                    <option key={room.roomId} value={room.roomId.toString()}>
                      {room.roomName}
                    </option>
                  ))}
                </select>
                {errors.roomId && (
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.roomId}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 3. Service Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-purple-100 rounded-xl mr-4">
                <Wrench className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Service Information
                </h2>
                <p className="text-gray-600">
                  Define service categories and scopes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label
                  htmlFor="serviceId"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Service *
                </label>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={asset.serviceId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.serviceId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
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
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.serviceId}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subServiceId"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Sub Service *
                </label>
                <select
                  id="subServiceId"
                  name="subServiceId"
                  value={asset.subServiceId}
                  onChange={handleChange}
                  disabled={!asset.serviceId}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    errors.subServiceId
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${
                    !asset.serviceId ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
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
                  <p className="text-red-500 text-sm flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.subServiceId}
                  </p>
                )}
              </div>
            </div>

            {/* Service Scopes with improved UX */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Contract-Defined Service Scopes *
              </label>
              {serviceScopes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {serviceScopes.map((scope) => (
                    <div
                      key={scope.scopeId}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                        asset.serviceScopeIds.includes(scope.scopeId.toString())
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        handleServiceScopeToggle(scope.scopeId.toString())
                      }
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            asset.serviceScopeIds.includes(
                              scope.scopeId.toString()
                            )
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          {asset.serviceScopeIds.includes(
                            scope.scopeId.toString()
                          ) && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {scope.scopeName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {!asset.subServiceId
                    ? "Please select a sub-service first"
                    : "No service scopes available"}
                </div>
              )}
              {errors.serviceScopeIds && (
                <p className="text-red-500 text-sm flex items-center mt-2">
                  <XCircle className="w-4 h-4 mr-1" />
                  {errors.serviceScopeIds}
                </p>
              )}
            </div>
          </div>

          {/* 4. Basic Asset Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-orange-100 rounded-xl mr-4">
                <Info className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Basic Asset Information
                </h2>
                <p className="text-gray-600">Enter fundamental asset details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="assetName"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Tag className="w-4 h-4 mr-1 text-gray-500" />
                    Asset Name *
                  </label>
                  <input
                    id="assetName"
                    type="text"
                    name="assetName"
                    value={asset.assetName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.assetName
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Enter asset name"
                  />
                  {errors.assetName && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.assetName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="serialNumber"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Barcode className="w-4 h-4 mr-1 text-gray-500" />
                    Serial Number
                  </label>
                  <input
                    id="serialNumber"
                    type="text"
                    name="serialNumber"
                    value={asset.serialNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    placeholder="Enter serial number"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="brandName"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Box className="w-4 h-4 mr-1 text-gray-500" />
                    Brand Name
                  </label>
                  <input
                    id="brandName"
                    type="text"
                    name="brandName"
                    value={asset.brandName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    placeholder="Enter brand name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="modelNumber"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Cpu className="w-4 h-4 mr-1 text-gray-500" />
                    Model Number
                  </label>
                  <input
                    id="modelNumber"
                    type="text"
                    name="modelNumber"
                    value={asset.modelNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    placeholder="Enter model number"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="assetStatus"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
                    Asset Status *
                  </label>
                  <select
                    id="assetStatus"
                    name="assetStatus"
                    value={asset.assetStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                    <option value="DECOMMISSIONED">Decommissioned</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="assetCondition"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <AlertTriangle className="w-4 h-4 mr-1 text-gray-500" />
                    Asset Condition *
                  </label>
                  <select
                    id="assetCondition"
                    name="assetCondition"
                    value={asset.assetCondition}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                  >
                    <option value="EXCELLENT">Excellent</option>
                    <option value="GOOD">Good</option>
                    <option value="AVERAGE">Average</option>
                    <option value="POOR">Poor</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="ownerType"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <User className="w-4 h-4 mr-1 text-gray-500" />
                    Owner Type
                  </label>
                  <select
                    id="ownerType"
                    name="ownerType"
                    value={asset.ownerType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                  >
                    <option value="KANVEL">Kanvel</option>
                    <option value="TENANT">Tenant</option>
                    <option value="PROPERTY_OWNER">Property Owner</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Observation and Recommendation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-2">
                <label
                  htmlFor="observation"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Observation
                </label>
                <textarea
                  id="observation"
                  name="observation"
                  value={asset.observation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
                  placeholder="Enter observations about the asset"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="recommendation"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Recommendation
                </label>
                <textarea
                  id="recommendation"
                  name="recommendation"
                  value={asset.recommendation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all resize-none"
                  placeholder="Enter recommendations for the asset"
                />
              </div>
            </div>
          </div>

          {/* 5. Lifecycle Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-xl mr-4">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Lifecycle Information
                </h2>
                <p className="text-gray-600">
                  Track important dates and milestones
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="purchaseDate"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                    Purchase Date
                  </label>
                  <input
                    id="purchaseDate"
                    type="date"
                    name="purchaseDate"
                    value={asset.purchaseDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="installationDate"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                    Installation Date
                  </label>
                  <input
                    id="installationDate"
                    type="date"
                    name="installationDate"
                    value={asset.installationDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="warrantyPeriodDays"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Warranty Period (Days)
                  </label>
                  <input
                    id="warrantyPeriodDays"
                    type="number"
                    name="warrantyPeriodDays"
                    value={asset.warrantyPeriodDays}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                    placeholder="Enter warranty period in days"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastAuditDate"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                    Last Audit Date
                  </label>
                  <input
                    id="lastAuditDate"
                    type="date"
                    name="lastAuditDate"
                    value={asset.lastAuditDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 6. Financial Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-emerald-100 rounded-xl mr-4">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Financial Information
                </h2>
                <p className="text-gray-600">
                  Manage cost and depreciation details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="purchaseCost"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
                    Purchase Cost (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      id="purchaseCost"
                      type="number"
                      name="purchaseCost"
                      value={asset.purchaseCost}
                      onChange={handleChange}
                      step="100"
                      min="0"
                      className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.purchaseCost
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="5000.00"
                    />
                  </div>
                  {errors.purchaseCost && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.purchaseCost}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="depreciationType"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
                    Depreciation Type
                  </label>
                  <select
                    id="depreciationType"
                    name="depreciationType"
                    value={asset.depreciationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all"
                  >
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="NUMBER">Fixed Amount</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="depreciationValue"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <TrendingDown className="w-4 h-4 mr-1 text-gray-500" />
                    Depreciation Value
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      {asset.depreciationType === "PERCENTAGE" ? "%" : "$"}
                    </span>
                    <input
                      id="depreciationValue"
                      type="number"
                      name="depreciationValue"
                      value={asset.depreciationValue}
                      onChange={handleChange}
                      step={
                        asset.depreciationType === "PERCENTAGE" ? "1" : "100"
                      }
                      min="0"
                      max={
                        asset.depreciationType === "PERCENTAGE"
                          ? "100"
                          : undefined
                      }
                      className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.depreciationValue
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder={
                        asset.depreciationType === "PERCENTAGE" ? "10" : "500"
                      }
                    />
                  </div>
                  {errors.depreciationValue && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.depreciationValue}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="timeFrameYears"
                    className="block text-sm font-semibold text-gray-700 flex items-center"
                  >
                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                    Time Frame (Years)
                  </label>
                  <input
                    id="timeFrameYears"
                    type="number"
                    name="timeFrameYears"
                    value={asset.timeFrameYears}
                    onChange={handleChange}
                    step="1"
                    min="1"
                    max="50"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.timeFrameYears
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="5"
                  />
                  {errors.timeFrameYears && (
                    <p className="text-red-500 text-sm flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      {errors.timeFrameYears}
                    </p>
                  )}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center mb-2">
                    <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                    Estimated Current Value
                  </label>
                  <p className="text-3xl font-bold text-green-600">
                    {calculateDepreciatedValue() === "-"
                      ? "-"
                      : `$${calculateDepreciatedValue()}`}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on depreciation calculation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Asset Images */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-pink-100 rounded-xl mr-4">
                <ImageIcon className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Asset Images
                </h2>
                <p className="text-gray-600">
                  Upload visual documentation of the asset
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="flex">
                  <ImageIcon className="h-5 w-5 text-blue-400" />
                  <div className="ml-3">
                    <p className="text-sm text-blue-700 font-medium">
                      Image Upload Requirements:
                    </p>
                    <ul className="list-disc pl-5 mt-1 text-sm text-blue-700">
                      <li>Maximum 3 images allowed</li>
                      <li>Accepted formats: JPEG, PNG, WebP</li>
                      <li>
                        Maximum file size: {MAX_IMAGE_SIZE_MB}MB per image
                      </li>
                      <li>At least one image is required</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  errors.images
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2 text-lg">
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
                  className={`inline-flex items-center px-6 py-3 rounded-xl cursor-pointer transition-all ${
                    imagePreview.length >= MAX_IMAGES
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {imagePreview.length >= MAX_IMAGES
                    ? "Maximum Images Reached"
                    : "Choose Images"}
                </label>
                {errors.images && (
                  <p className="text-red-500 text-sm mt-3 flex items-center justify-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {errors.images}
                  </p>
                )}
              </div>

              {imagePreview.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 group-hover:border-gray-300 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => navigate("/assets/list")}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Cancel
              </button>

              <div className="flex items-center space-x-4">
                {!isEdit && (
                  <button
                    type="button"
                    onClick={saveDraft}
                    disabled={savingDraft}
                    className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                  >
                    {savingDraft ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving Draft...
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-5 h-5 mr-2" />
                        Save Draft
                      </>
                    )}
                  </button>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isEdit ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      {isEdit ? "Update Asset" : "Create Asset"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;
