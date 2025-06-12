// "use client";

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Plus,
//   Eye,
//   MapPin,
//   Layers,
//   Building,
//   Home,
//   DoorOpen,
// } from "lucide-react";
// import { usePropertyFlow } from "../context/PropertyFlowContext";

// const PropertyFlowManagement = () => {
//   const navigate = useNavigate();
//   const { selectedContract, setSelectedContract } = usePropertyFlow();
//   const [contracts, setContracts] = useState([]);

//   const propertyLevels = [
//     {
//       id: "zone",
//       name: "Zone",
//       description: "Top-level geographical areas",
//       icon: <MapPin className="w-8 h-8 text-blue-500" />,
//       createPath: "/property-flow/zones/create",
//       color: "bg-blue-50 border-blue-200",
//     },
//     {
//       id: "subzone",
//       name: "SubZone",
//       description: "Subdivisions within zones",
//       icon: <Layers className="w-8 h-8 text-green-500" />,
//       createPath: "/property-flow/sub-zones/create",
//       color: "bg-green-50 border-green-200",
//     },
//     {
//       id: "building",
//       name: "Building",
//       description: "Physical building structures",
//       icon: <Building className="w-8 h-8 text-purple-500" />,
//       createPath: "/property-flow/buildings/create",
//       color: "bg-purple-50 border-purple-200",
//     },
//     {
//       id: "villa-apartment",
//       name: "Villa/Apartment",
//       description: "Individual residential units",
//       icon: <Home className="w-8 h-8 text-orange-500" />,
//       createPath: "/property-flow/villa-apartments/create",
//       color: "bg-orange-50 border-orange-200",
//     },
//     {
//       id: "floor",
//       name: "Floor",
//       description: "Individual floors within units",
//       icon: <Layers className="w-8 h-8 text-indigo-500" />,
//       createPath: "/property-flow/floors/create",
//       color: "bg-indigo-50 border-indigo-200",
//     },
//     {
//       id: "room",
//       name: "Room",
//       description: "Individual rooms within floors",
//       icon: <DoorOpen className="w-8 h-8 text-red-500" />,
//       createPath: "/property-flow/rooms/create",
//       color: "bg-red-50 border-red-200",
//     },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Property Flow Management
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Create and manage your property hierarchy from zones down to
//             individual rooms
//           </p>
//         </div>
//         <button
//           onClick={() => navigate("/property-flow/visualization")}
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           <Eye className="w-4 h-4 mr-2" />
//           View Tree Structure
//         </button>
//       </div>

//       {/* Hierarchical Flow Diagram */}
//       <div className="bg-white shadow rounded-lg">
//         <div className="px-4 py-5 sm:p-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//             Property Hierarchy Flow
//           </h3>
//           <div className="flex flex-wrap items-center justify-center gap-4 p-4">
//             {propertyLevels.map((level, index) => (
//               <React.Fragment key={level.id}>
//                 <div className="flex flex-col items-center">
//                   <div
//                     className={`p-4 rounded-lg border-2 ${level.color} transition-all hover:shadow-md`}
//                   >
//                     {level.icon}
//                   </div>
//                   <span className="text-sm font-medium mt-2">{level.name}</span>
//                 </div>
//                 {index < propertyLevels.length - 1 && (
//                   <div className="text-2xl text-gray-400">→</div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Create Property Elements */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {propertyLevels.map((level) => (
//           <div
//             key={level.id}
//             className={`bg-white shadow rounded-lg ${level.color} hover:shadow-lg transition-shadow cursor-pointer`}
//           >
//             <div className="px-4 py-5 sm:p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 {level.icon}
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {level.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {level.description}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => navigate(level.createPath)}
//                 className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Create {level.name}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Instructions */}
//       <div className="bg-white shadow rounded-lg">
//         <div className="px-4 py-5 sm:p-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//             How to Use Property Flow
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h4 className="font-semibold text-lg mb-3">
//                 Step-by-Step Process:
//               </h4>
//               <ol className="space-y-2 text-sm">
//                 <li className="flex items-start gap-2">
//                   <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                     1
//                   </span>
//                   <span>
//                     Start by creating <strong>Zones</strong> - the largest
//                     geographical areas
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                     2
//                   </span>
//                   <span>
//                     Create <strong>SubZones</strong> within your zones for
//                     better organization
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                     3
//                   </span>
//                   <span>
//                     Add <strong>Buildings</strong> within your subzones
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                     4
//                   </span>
//                   <span>
//                     Create <strong>Villa/Apartments</strong> within buildings
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                     5
//                   </span>
//                   <span>
//                     Add <strong>Floors</strong> within villa/apartments
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                     6
//                   </span>
//                   <span>
//                     Finally, create <strong>Rooms</strong> within floors
//                   </span>
//                 </li>
//               </ol>
//             </div>
//             <div>
//               <h4 className="font-semibold text-lg mb-3">Features:</h4>
//               <ul className="space-y-2 text-sm">
//                 <li className="flex items-center gap-2">
//                   <MapPin className="w-4 h-4 text-blue-500" />
//                   <span>
//                     Google Maps integration for precise location selection
//                   </span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <Plus className="w-4 h-4 text-green-500" />
//                   <span>Image upload for visual identification</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <Eye className="w-4 h-4 text-purple-500" />
//                   <span>Tree visualization of complete hierarchy</span>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <Building className="w-4 h-4 text-orange-500" />
//                   <span>Hierarchical dropdown selection</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyFlowManagement;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Building,
//   Home,
//   MapPin,
//   Layers,
//   DoorOpen,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   ChevronRight,
//   ChevronDown,
//   Search,
//   Filter,
//   Grid,
//   List,
//   Zap,
//   Upload,
//   Save,
//   X,
//   Calendar,
//   User,
//   ImageIcon,
//   Navigation,
//   ArrowLeft,
// } from "lucide-react";
// import { usePropertyFlow } from "../context/PropertyFlowContext";
// import { contractService } from "../services/contractService";
// import { propertyFlowService } from "../services/propertyFlowService";

// const propertyTypeConfig = {
//   zone: {
//     icon: MapPin,
//     color: "bg-blue-500",
//     lightColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//     textColor: "text-blue-700",
//     name: "Zone",
//     plural: "Zones",
//   },
//   subZone: {
//     icon: Layers,
//     color: "bg-green-500",
//     lightColor: "bg-green-50",
//     borderColor: "border-green-200",
//     textColor: "text-green-700",
//     name: "SubZone",
//     plural: "SubZones",
//   },
//   building: {
//     icon: Building,
//     color: "bg-purple-500",
//     lightColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//     textColor: "text-purple-700",
//     name: "Building",
//     plural: "Buildings",
//   },
//   villaApartment: {
//     icon: Home,
//     color: "bg-orange-500",
//     lightColor: "bg-orange-50",
//     borderColor: "border-orange-200",
//     textColor: "text-orange-700",
//     name: "Villa/Apartment",
//     plural: "Villa/Apartments",
//   },
//   floor: {
//     icon: Layers,
//     color: "bg-indigo-500",
//     lightColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//     textColor: "text-indigo-700",
//     name: "Floor",
//     plural: "Floors",
//   },
//   room: {
//     icon: DoorOpen,
//     color: "bg-red-500",
//     lightColor: "bg-red-50",
//     borderColor: "border-red-200",
//     textColor: "text-red-700",
//     name: "Room",
//     plural: "Rooms",
//   },
// };

// // Property Form Modal Component
// const PropertyFormModal = ({
//   isOpen,
//   onClose,
//   type,
//   property,
//   onSuccess,
//   contracts,
//   zones,
//   subZones,
//   buildings,
//   villaApartments,
//   floors,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const isEdit = !!property;

//   useEffect(() => {
//     if (isOpen) {
//       resetForm();
//     }
//   }, [isOpen, type, property]);

//   const resetForm = () => {
//     if (property) {
//       setFormData({ ...property });
//       setImagePreview(property.imageUrl);
//     } else {
//       setFormData({
//         contractId: "",
//         description: "",
//         ...getDefaultFields(type),
//       });
//       setImagePreview(null);
//     }
//     setImageFile(null);
//     setErrors({});
//   };

//   const getDefaultFields = (type) => {
//     const fields = {
//       zone: { zoneName: "" },
//       subZone: { subZoneName: "", zoneId: "" },
//       building: { buildingName: "", subZoneId: "" },
//       villaApartment: { villaApartmentName: "", buildingId: "" },
//       floor: { floorName: "", villaApartmentId: "" },
//       room: { roomName: "", floorId: "" },
//     };
//     return fields[type] || {};
//   };

//   const getParentOptions = () => {
//     switch (type) {
//       case "subZone":
//         return zones.filter(
//           (z) => z.contractId.toString() === formData.contractId
//         );
//       case "building":
//         return subZones.filter(
//           (s) => s.contractId.toString() === formData.contractId
//         );
//       case "villaApartment":
//         return buildings.filter(
//           (b) => b.contractId.toString() === formData.contractId
//         );
//       case "floor":
//         return villaApartments.filter(
//           (v) => v.contractId.toString() === formData.contractId
//         );
//       case "room":
//         return floors.filter(
//           (f) => f.contractId.toString() === formData.contractId
//         );
//       default:
//         return [];
//     }
//   };

//   const getParentFieldName = () => {
//     const parentFields = {
//       subZone: "zoneId",
//       building: "subZoneId",
//       villaApartment: "buildingId",
//       floor: "villaApartmentId",
//       room: "floorId",
//     };
//     return parentFields[type];
//   };

//   const getParentDisplayName = () => {
//     const parentNames = {
//       subZone: "Zone",
//       building: "SubZone",
//       villaApartment: "Building",
//       floor: "Villa/Apartment",
//       room: "Floor",
//     };
//     return parentNames[type];
//   };

//   const getParentItemName = (item) => {
//     const nameFields = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//     };

//     const parentType = {
//       subZone: "zone",
//       building: "subZone",
//       villaApartment: "building",
//       floor: "villaApartment",
//       room: "floor",
//     }[type];

//     return item[nameFields[parentType]] || "Unknown";
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (field === "contractId") {
//       const parentField = getParentFieldName();
//       if (parentField) {
//         setFormData((prev) => ({
//           ...prev,
//           [parentField]: "",
//         }));
//       }
//     }

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: null,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameField = `${type}Name`;
//     if (!formData[nameField]?.trim()) {
//       newErrors[nameField] = "Name is required";
//     }

//     if (!formData.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     const parentField = getParentFieldName();
//     if (parentField && !formData[parentField]) {
//       newErrors[parentField] = `${getParentDisplayName()} is required`;
//     }

//     if (!isEdit && !imageFile) {
//       newErrors.image = "Image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const serviceMethod = isEdit
//         ? propertyFlowService[
//             `update${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ]
//         : propertyFlowService[
//             `create${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ];

//       if (isEdit) {
//         const idField = `${type}Id`;
//         await serviceMethod(property[idField], formData, imageFile);
//       } else {
//         await serviceMethod(formData, imageFile);
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("Error saving property:", error);
//       setErrors({ submit: "Failed to save property. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTitle = () => {
//     const typeNames = {
//       zone: "Zone",
//       subZone: "SubZone",
//       building: "Building",
//       villaApartment: "Villa/Apartment",
//       floor: "Floor",
//       room: "Room",
//     };

//     return `${isEdit ? "Edit" : "Create"} ${typeNames[type]}`;
//   };

//   const nameField = `${type}Name`;
//   const parentField = getParentFieldName();
//   const parentOptions = getParentOptions();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-500" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Contract Selection */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">
//               Contract *
//             </label>
//             <select
//               value={formData.contractId?.toString() || ""}
//               onChange={(e) => handleInputChange("contractId", e.target.value)}
//               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.contractId ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//             {errors.contractId && (
//               <p className="text-sm text-red-500">{errors.contractId}</p>
//             )}
//           </div>

//           {/* Parent Selection */}
//           {parentField && (
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 {getParentDisplayName()} *
//               </label>
//               <select
//                 value={formData[parentField]?.toString() || ""}
//                 onChange={(e) => handleInputChange(parentField, e.target.value)}
//                 disabled={!formData.contractId}
//                 className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 ${
//                   errors[parentField] ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">
//                   Select a {getParentDisplayName().toLowerCase()}
//                 </option>
//                 {parentOptions.map((option) => {
//                   const idField = `${
//                     type === "subZone"
//                       ? "zone"
//                       : type === "building"
//                       ? "subZone"
//                       : type === "villaApartment"
//                       ? "building"
//                       : type === "floor"
//                       ? "villaApartment"
//                       : "floor"
//                   }Id`;
//                   return (
//                     <option
//                       key={option[idField]}
//                       value={option[idField].toString()}
//                     >
//                       {getParentItemName(option)}
//                     </option>
//                   );
//                 })}
//               </select>
//               {errors[parentField] && (
//                 <p className="text-sm text-red-500">{errors[parentField]}</p>
//               )}
//             </div>
//           )}

//           {/* Name Field */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Name *</label>
//             <input
//               type="text"
//               value={formData[nameField] || ""}
//               onChange={(e) => handleInputChange(nameField, e.target.value)}
//               placeholder={`Enter ${type} name`}
//               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors[nameField] ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors[nameField] && (
//               <p className="text-sm text-red-500">{errors[nameField]}</p>
//             )}
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               value={formData.description || ""}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               placeholder={`Enter ${type} description`}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">
//               Image {!isEdit && "*"}
//             </label>
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center ${
//                 errors.image
//                   ? "border-red-500"
//                   : "border-gray-300 hover:border-gray-400"
//               } transition-colors`}
//             >
//               {imagePreview ? (
//                 <div className="space-y-4">
//                   <img
//                     src={imagePreview || "/placeholder.svg"}
//                     alt="Preview"
//                     className="w-32 h-32 object-cover rounded-lg mx-auto border"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       document.getElementById("image-upload").click()
//                     }
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     <Upload className="w-4 h-4 mr-2" />
//                     Change Image
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto" />
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         document.getElementById("image-upload").click()
//                       }
//                       className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Choose Image
//                     </button>
//                     <p className="text-sm text-gray-500 mt-2">
//                       Upload an image for this {type}
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             {errors.image && (
//               <p className="text-sm text-red-500">{errors.image}</p>
//             )}
//           </div>

//           {/* Submit Error */}
//           {errors.submit && (
//             <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-sm text-red-600">{errors.submit}</p>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Save className="w-4 h-4" />
//                   {isEdit ? "Update" : "Create"}{" "}
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </div>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Property Detail Modal Component
// const PropertyDetailModal = ({ isOpen, onClose, property }) => {
//   if (!property || !isOpen) return null;

//   const config = propertyTypeConfig[property.type];
//   const Icon = config.icon;

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyId = (property) => {
//     return property[`${property.type}Id`];
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <Icon className={`w-8 h-8 ${config.textColor}`} />
//             <h2 className="text-2xl font-bold text-gray-900">
//               {config.name} Details
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Basic Information */}
//           <div className="bg-white shadow rounded-lg border">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2 mb-4">
//                 <User className="w-5 h-5" />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <p className="text-lg font-semibold text-gray-900">
//                     {getPropertyName(property)}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Type
//                   </label>
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.lightColor} ${config.textColor}`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     ID
//                   </label>
//                   <p className="text-gray-900">{getPropertyId(property)}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Contract ID
//                   </label>
//                   <p className="text-gray-900">{property.contractId}</p>
//                 </div>
//               </div>

//               {property.description && (
//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Description
//                   </label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
//                     {property.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Image */}
//           <div className="bg-white shadow rounded-lg border">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2 mb-4">
//                 <ImageIcon className="w-5 h-5" />
//                 Image
//               </h3>
//               {property.imageUrl ? (
//                 <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
//                   <img
//                     src={property.imageUrl || "/placeholder.svg"}
//                     alt={getPropertyName(property)}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
//                   <div className="text-center">
//                     <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//                     <p className="text-gray-500">No image available</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Hierarchy Information */}
//           <div className="bg-white shadow rounded-lg border">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//                 Hierarchy Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {property.zoneId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Zone ID
//                     </label>
//                     <p className="text-gray-900">{property.zoneId}</p>
//                   </div>
//                 )}

//                 {property.subZoneId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       SubZone ID
//                     </label>
//                     <p className="text-gray-900">{property.subZoneId}</p>
//                   </div>
//                 )}

//                 {property.buildingId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Building ID
//                     </label>
//                     <p className="text-gray-900">{property.buildingId}</p>
//                   </div>
//                 )}

//                 {property.villaApartmentId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Villa/Apartment ID
//                     </label>
//                     <p className="text-gray-900">{property.villaApartmentId}</p>
//                   </div>
//                 )}

//                 {property.floorId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Floor ID
//                     </label>
//                     <p className="text-gray-900">{property.floorId}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end p-6 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Property Flow Management Component
// const PropertyFlowManagement = () => {
//   const {
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//     setSelectedContract,
//     loading,
//     refreshData,
//   } = usePropertyFlow();

//   const [contracts, setContracts] = useState([]);
//   const [viewMode, setViewMode] = useState("hierarchy"); // 'hierarchy' | 'grid' | 'list'
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [expandedNodes, setExpandedNodes] = useState(new Set());
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [formType, setFormType] = useState("zone");
//   const [editingProperty, setEditingProperty] = useState(null);

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//     }
//   };

//   const buildHierarchyData = () => {
//     return zones.map((zone) => ({
//       ...zone,
//       type: "zone",
//       children: subZones
//         .filter((subZone) => subZone.zoneId === zone.zoneId)
//         .map((subZone) => ({
//           ...subZone,
//           type: "subZone",
//           children: buildings
//             .filter((building) => building.subZoneId === subZone.subZoneId)
//             .map((building) => ({
//               ...building,
//               type: "building",
//               children: villaApartments
//                 .filter((va) => va.buildingId === building.buildingId)
//                 .map((va) => ({
//                   ...va,
//                   type: "villaApartment",
//                   children: floors
//                     .filter(
//                       (floor) => floor.villaApartmentId === va.villaApartmentId
//                     )
//                     .map((floor) => ({
//                       ...floor,
//                       type: "floor",
//                       children: rooms
//                         .filter((room) => room.floorId === floor.floorId)
//                         .map((room) => ({
//                           ...room,
//                           type: "room",
//                           children: [],
//                         })),
//                     })),
//                 })),
//             })),
//         })),
//     }));
//   };

//   const getAllProperties = () => {
//     const allProperties = [
//       ...zones.map((z) => ({ ...z, type: "zone" })),
//       ...subZones.map((s) => ({ ...s, type: "subZone" })),
//       ...buildings.map((b) => ({ ...b, type: "building" })),
//       ...villaApartments.map((v) => ({ ...v, type: "villaApartment" })),
//       ...floors.map((f) => ({ ...f, type: "floor" })),
//       ...rooms.map((r) => ({ ...r, type: "room" })),
//     ];

//     return allProperties.filter((property) => {
//       const matchesSearch = getPropertyName(property)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesFilter =
//         filterType === "all" || property.type === filterType;
//       return matchesSearch && matchesFilter;
//     });
//   };

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyStats = () => {
//     return {
//       zones: zones.length,
//       subZones: subZones.length,
//       buildings: buildings.length,
//       villaApartments: villaApartments.length,
//       floors: floors.length,
//       rooms: rooms.length,
//       total:
//         zones.length +
//         subZones.length +
//         buildings.length +
//         villaApartments.length +
//         floors.length +
//         rooms.length,
//     };
//   };

//   const handleCreateProperty = (type) => {
//     setFormType(type);
//     setEditingProperty(null);
//     setShowFormModal(true);
//   };

//   const handleEditProperty = (property) => {
//     setFormType(property.type);
//     setEditingProperty(property);
//     setShowFormModal(true);
//   };

//   const handleViewProperty = (property) => {
//     setSelectedProperty(property);
//     setShowDetailModal(true);
//   };

//   const toggleNode = (nodeId) => {
//     const newExpanded = new Set(expandedNodes);
//     if (newExpanded.has(nodeId)) {
//       newExpanded.delete(nodeId);
//     } else {
//       newExpanded.add(nodeId);
//     }
//     setExpandedNodes(newExpanded);
//   };

//   const stats = getPropertyStats();
//   const hierarchyData = buildHierarchyData();
//   const allProperties = getAllProperties();

//   // Hierarchy Node Component
//   const HierarchyNode = ({ node, level = 0 }) => {
//     const config = propertyTypeConfig[node.type];
//     const Icon = config.icon;
//     const nodeId = `${node.type}-${node[`${node.type}Id`]}`;
//     const isExpanded = expandedNodes.has(nodeId);
//     const hasChildren = node.children && node.children.length > 0;

//     return (
//       <div className="space-y-2">
//         <div
//           className={`${config.lightColor} ${config.borderColor} border-l-4 hover:shadow-md transition-all duration-200 rounded-lg shadow`}
//         >
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <div
//                 className="flex items-center gap-3 flex-1"
//                 style={{ marginLeft: `${level * 20}px` }}
//               >
//                 {hasChildren ? (
//                   <button
//                     onClick={() => toggleNode(nodeId)}
//                     className="p-1 hover:bg-white rounded transition-colors"
//                   >
//                     {isExpanded ? (
//                       <ChevronDown className="w-4 h-4" />
//                     ) : (
//                       <ChevronRight className="w-4 h-4" />
//                     )}
//                   </button>
//                 ) : (
//                   <div className="w-6" />
//                 )}

//                 <Icon className={`w-5 h-5 ${config.textColor}`} />

//                 <div className="flex-1">
//                   <h4 className="font-semibold text-gray-900">
//                     {getPropertyName(node)}
//                   </h4>
//                   {node.description && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       {node.description}
//                     </p>
//                   )}
//                 </div>

//                 <span
//                   className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.textColor} ${config.lightColor}`}
//                 >
//                   {config.name}
//                 </span>
//               </div>

//               <div className="flex items-center gap-2">
//                 {node.imageUrl && (
//                   <img
//                     src={node.imageUrl || "/placeholder.svg"}
//                     alt={getPropertyName(node)}
//                     className="w-12 h-12 rounded-lg object-cover border"
//                   />
//                 )}

//                 <button
//                   onClick={() => handleViewProperty(node)}
//                   className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
//                   title="View Details"
//                 >
//                   <Eye className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => handleEditProperty(node)}
//                   className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
//                   title="Edit"
//                 >
//                   <Edit className="w-4 h-4" />
//                 </button>
//                 <button
//                   className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
//                   title="Delete"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {hasChildren && isExpanded && (
//           <div className="space-y-2">
//             {node.children.map((child, index) => (
//               <HierarchyNode
//                 key={`${child.type}-${child[`${child.type}Id`]}`}
//                 node={child}
//                 level={level + 1}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Grid View Component
//   const GridView = ({ properties }) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {properties.map((property, index) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className={`${config.lightColor} ${config.borderColor} border-2 hover:shadow-lg transition-all duration-200 group rounded-lg shadow`}
//             >
//               <div className="p-4">
//                 <div className="flex items-start justify-between mb-3">
//                   <Icon className={`w-6 h-6 ${config.textColor}`} />
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.textColor} ${config.lightColor}`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 {property.imageUrl && (
//                   <div className="mb-3">
//                     <img
//                       src={property.imageUrl || "/placeholder.svg"}
//                       alt={getPropertyName(property)}
//                       className="w-full h-32 rounded-lg object-cover"
//                     />
//                   </div>
//                 )}

//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   {getPropertyName(property)}
//                 </h4>

//                 {property.description && (
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                     {property.description}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => handleViewProperty(property)}
//                     className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
//                   >
//                     <Eye className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => handleEditProperty(property)}
//                     className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
//                   >
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // List View Component
//   const ListView = ({ properties }) => {
//     return (
//       <div className="space-y-3">
//         {properties.map((property, index) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className="bg-white hover:shadow-md transition-all duration-200 rounded-lg shadow border"
//             >
//               <div className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4 flex-1">
//                     <Icon className={`w-6 h-6 ${config.textColor}`} />

//                     {property.imageUrl && (
//                       <img
//                         src={property.imageUrl || "/placeholder.svg"}
//                         alt={getPropertyName(property)}
//                         className="w-12 h-12 rounded-lg object-cover"
//                       />
//                     )}

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-1">
//                         <h4 className="font-semibold text-gray-900">
//                           {getPropertyName(property)}
//                         </h4>
//                         <span
//                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.textColor} ${config.lightColor}`}
//                         >
//                           {config.name}
//                         </span>
//                       </div>
//                       {property.description && (
//                         <p className="text-sm text-gray-600">
//                           {property.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => handleViewProperty(property)}
//                       className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleEditProperty(property)}
//                       className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Zap className="w-8 h-8 text-blue-600" />
//               Property Flow Manager
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Manage your property hierarchy with modern visualization
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <select
//               value={selectedContract?.toString() || ""}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         {selectedContract && (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
//             {Object.entries(propertyTypeConfig).map(([type, config]) => {
//               const Icon = config.icon;
//               const count = stats[type] || 0;

//               return (
//                 <div
//                   key={type}
//                   className={`${config.lightColor} ${config.borderColor} border-2 hover:shadow-lg transition-all duration-200 rounded-lg shadow`}
//                 >
//                   <div className="p-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p
//                           className={`text-sm font-medium ${config.textColor}`}
//                         >
//                           {config.plural}
//                         </p>
//                         <p className="text-2xl font-bold text-gray-900">
//                           {count}
//                         </p>
//                       </div>
//                       <Icon className={`w-8 h-8 ${config.textColor}`} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 rounded-lg shadow">
//               <div className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-blue-100">Total</p>
//                     <p className="text-2xl font-bold">{stats.total}</p>
//                   </div>
//                   <Building className="w-8 h-8 text-blue-100" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {!selectedContract ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="bg-white rounded-lg shadow w-full max-w-md">
//               <div className="p-8 text-center">
//                 <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Select a Contract
//                 </h3>
//                 <p className="text-gray-600">
//                   Choose a contract from the dropdown above to start managing
//                   your property flow
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : loading ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading property data...</p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Controls */}
//             <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//               <div className="flex flex-col sm:flex-row gap-3 flex-1">
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search properties..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="all">All Types</option>
//                   {Object.entries(propertyTypeConfig).map(([type, config]) => (
//                     <option key={type} value={type}>
//                       {config.plural}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setViewMode("hierarchy")}
//                   className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     viewMode === "hierarchy"
//                       ? "border-transparent text-white bg-blue-600 hover:bg-blue-700"
//                       : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                   }`}
//                 >
//                   <Layers className="w-4 h-4 mr-2" />
//                   Hierarchy
//                 </button>
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     viewMode === "grid"
//                       ? "border-transparent text-white bg-blue-600 hover:bg-blue-700"
//                       : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                   }`}
//                 >
//                   <Grid className="w-4 h-4 mr-2" />
//                   Grid
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     viewMode === "list"
//                       ? "border-transparent text-white bg-blue-600 hover:bg-blue-700"
//                       : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                   }`}
//                 >
//                   <List className="w-4 h-4 mr-2" />
//                   List
//                 </button>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="flex flex-wrap gap-2">
//               {Object.entries(propertyTypeConfig).map(([type, config]) => {
//                 const Icon = config.icon;
//                 return (
//                   <button
//                     key={type}
//                     onClick={() => handleCreateProperty(type)}
//                     className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md ${config.lightColor} ${config.borderColor} ${config.textColor} hover:${config.color} hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add {config.name}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Content based on view mode */}
//             {viewMode === "hierarchy" && (
//               <div className="space-y-4">
//                 {hierarchyData.length === 0 ? (
//                   <div className="bg-white rounded-lg shadow">
//                     <div className="p-8 text-center">
//                       <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         No Properties Found
//                       </h3>
//                       <p className="text-gray-600">
//                         Start by creating zones for this contract
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   hierarchyData.map((zone) => (
//                     <HierarchyNode
//                       key={`zone-${zone.zoneId}`}
//                       node={zone}
//                       level={0}
//                     />
//                   ))
//                 )}
//               </div>
//             )}

//             {viewMode === "grid" && <GridView properties={allProperties} />}

//             {viewMode === "list" && <ListView properties={allProperties} />}
//           </>
//         )}

//         {/* Modals */}
//         <PropertyFormModal
//           isOpen={showFormModal}
//           onClose={() => setShowFormModal(false)}
//           type={formType}
//           property={editingProperty}
//           onSuccess={() => {
//             setShowFormModal(false);
//             refreshData();
//           }}
//           contracts={contracts}
//           zones={zones}
//           subZones={subZones}
//           buildings={buildings}
//           villaApartments={villaApartments}
//           floors={floors}
//         />

//         <PropertyDetailModal
//           isOpen={showDetailModal}
//           onClose={() => setShowDetailModal(false)}
//           property={selectedProperty}
//         />
//       </div>
//     </div>
//   );
// };

// export default PropertyFlowManagement;
// ///444444444444444444444444
// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Building,
//   Home,
//   MapPin,
//   Layers,
//   DoorOpen,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Grid,
//   List,
//   Zap,
//   Upload,
//   Save,
//   X,
//   User,
//   ImageIcon,
//   TreePine,
// } from "lucide-react";
// import { usePropertyFlow } from "../context/PropertyFlowContext";
// import { contractService } from "../services/contractService";
// import { propertyFlowService } from "../services/propertyFlowService";

// // GoJS import (you'll need to install: npm install gojs)
// import * as go from "gojs";

// const propertyTypeConfig = {
//   zone: {
//     icon: MapPin,
//     color: "#3B82F6",
//     lightColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//     textColor: "text-blue-700",
//     name: "Zone",
//     plural: "Zones",
//   },
//   subZone: {
//     icon: Layers,
//     color: "#10B981",
//     lightColor: "bg-green-50",
//     borderColor: "border-green-200",
//     textColor: "text-green-700",
//     name: "SubZone",
//     plural: "SubZones",
//   },
//   building: {
//     icon: Building,
//     color: "#8B5CF6",
//     lightColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//     textColor: "text-purple-700",
//     name: "Building",
//     plural: "Buildings",
//   },
//   villaApartment: {
//     icon: Home,
//     color: "#F59E0B",
//     lightColor: "bg-orange-50",
//     borderColor: "border-orange-200",
//     textColor: "text-orange-700",
//     name: "Villa/Apartment",
//     plural: "Villa/Apartments",
//   },
//   floor: {
//     icon: Layers,
//     color: "#6366F1",
//     lightColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//     textColor: "text-indigo-700",
//     name: "Floor",
//     plural: "Floors",
//   },
//   room: {
//     icon: DoorOpen,
//     color: "#EF4444",
//     lightColor: "bg-red-50",
//     borderColor: "border-red-200",
//     textColor: "text-red-700",
//     name: "Room",
//     plural: "Rooms",
//   },
// };

// // GoJS Family Tree Component
// const PropertyFamilyTree = ({
//   data,
//   onNodeClick,
//   onNodeEdit,
//   onNodeDelete,
// }) => {
//   const diagramRef = useRef(null);
//   const diagramInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!diagramRef.current) return;

//     const $ = go.GraphObject.make;

//     // Create the diagram
//     const diagram = $(go.Diagram, diagramRef.current, {
//       "toolManager.hoverDelay": 100,
//       "toolManager.toolTipDuration": 10000,
//       layout: $(go.TreeLayout, {
//         treeStyle: go.TreeLayout.StyleLastParents,
//         arrangement: go.TreeLayout.ArrangementHorizontal,
//         angle: 90,
//         layerSpacing: 35,
//         alternateAngle: 90,
//         alternateLayerSpacing: 35,
//         alternateAlignment: go.TreeLayout.AlignmentBus,
//         alternateNodeSpacing: 20,
//       }),
//       "undoManager.isEnabled": true,
//       "animationManager.isEnabled": true,
//       "animationManager.duration": 800,
//       "animationManager.isInitial": false,
//     });

//     // Define the node template
//     diagram.nodeTemplate = $(
//       go.Node,
//       "Auto",
//       {
//         locationSpot: go.Spot.Center,
//         isShadowed: true,
//         shadowBlur: 1,
//         shadowOffset: new go.Point(0, 1),
//         shadowColor: "rgba(0, 0, 0, .14)",
//         selectionAdornmentTemplate: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, "RoundedRectangle", {
//             fill: null,
//             stroke: "#7986CB",
//             strokeWidth: 3,
//           }),
//           $(go.Placeholder)
//         ),
//       },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
//         go.Point.stringify
//       ),

//       // Main shape
//       $(
//         go.Shape,
//         "RoundedRectangle",
//         {
//           name: "SHAPE",
//           fill: "white",
//           stroke: null,
//           strokeWidth: 0,
//           minSize: new go.Size(120, 60),
//         },
//         new go.Binding(
//           "fill",
//           "type",
//           (type) => propertyTypeConfig[type]?.color || "#6B7280"
//         )
//       ),

//       // Content panel
//       $(
//         go.Panel,
//         "Vertical",
//         { margin: 8 },

//         // Icon and type
//         $(
//           go.Panel,
//           "Horizontal",
//           { alignment: go.Spot.Center, margin: new go.Margin(0, 0, 4, 0) },
//           $(
//             go.TextBlock,
//             {
//               font: "bold 10px sans-serif",
//               stroke: "white",
//               margin: new go.Margin(0, 4, 0, 0),
//             },
//             new go.Binding("text", "type", (type) => {
//               const icons = {
//                 zone: "🌍",
//                 subZone: "📍",
//                 building: "🏢",
//                 villaApartment: "🏠",
//                 floor: "🏗️",
//                 room: "🚪",
//               };
//               return icons[type] || "📦";
//             })
//           ),
//           $(
//             go.TextBlock,
//             {
//               font: "bold 9px sans-serif",
//               stroke: "rgba(255,255,255,0.8)",
//               textAlign: "center",
//             },
//             new go.Binding(
//               "text",
//               "type",
//               (type) => propertyTypeConfig[type]?.name || "Unknown"
//             )
//           )
//         ),

//         // Name
//         $(
//           go.TextBlock,
//           {
//             font: "bold 12px sans-serif",
//             stroke: "white",
//             maxSize: new go.Size(100, Number.NaN),
//             wrap: go.TextBlock.WrapFit,
//             textAlign: "center",
//           },
//           new go.Binding("text", "name")
//         ),

//         // Description (if exists)
//         $(
//           go.TextBlock,
//           {
//             font: "9px sans-serif",
//             stroke: "rgba(255,255,255,0.7)",
//             maxSize: new go.Size(100, 30),
//             wrap: go.TextBlock.WrapFit,
//             textAlign: "center",
//             visible: false,
//           },
//           new go.Binding("text", "description"),
//           new go.Binding(
//             "visible",
//             "description",
//             (desc) => !!desc && desc.length > 0
//           )
//         )
//       ),

//       // Tooltip
//       {
//         toolTip: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, { fill: "#FFFFCC" }),
//           $(
//             go.Panel,
//             "Vertical",
//             { margin: 6 },
//             $(
//               go.TextBlock,
//               { font: "bold 12px sans-serif" },
//               new go.Binding("text", "name")
//             ),
//             $(
//               go.TextBlock,
//               new go.Binding(
//                 "text",
//                 "type",
//                 (type) => `Type: ${propertyTypeConfig[type]?.name || "Unknown"}`
//               )
//             ),
//             $(go.TextBlock, new go.Binding("text", "id", (id) => `ID: ${id}`)),
//             $(
//               go.TextBlock,
//               new go.Binding("text", "description", (desc) =>
//                 desc ? `Description: ${desc}` : ""
//               ),
//               new go.Binding("visible", "description", (desc) => !!desc)
//             )
//           )
//         ),
//       },

//       // Click events
//       {
//         click: (e, node) => {
//           const data = node.data;
//           if (onNodeClick) onNodeClick(data);
//         },
//         doubleClick: (e, node) => {
//           const data = node.data;
//           if (onNodeEdit) onNodeEdit(data);
//         },
//       }
//     );

//     // Define the link template
//     diagram.linkTemplate = $(
//       go.Link,
//       {
//         routing: go.Link.Orthogonal,
//         corner: 5,
//         selectable: false,
//       },
//       $(go.Shape, { strokeWidth: 2, stroke: "#CCCCCC" })
//     );

//     // Context menu for nodes
//     diagram.nodeTemplate.contextMenu = $(
//       go.Adornment,
//       "Vertical",
//       $("ContextMenuButton", $(go.TextBlock, "View Details"), {
//         click: (e, button) => {
//           const data = button.part.adornedPart.data;
//           if (onNodeClick) onNodeClick(data);
//         },
//       }),
//       $("ContextMenuButton", $(go.TextBlock, "Edit"), {
//         click: (e, button) => {
//           const data = button.part.adornedPart.data;
//           if (onNodeEdit) onNodeEdit(data);
//         },
//       }),
//       $("ContextMenuButton", $(go.TextBlock, "Delete"), {
//         click: (e, button) => {
//           const data = button.part.adornedPart.data;
//           if (onNodeDelete) onNodeDelete(data);
//         },
//       })
//     );

//     diagramInstanceRef.current = diagram;

//     return () => {
//       if (diagramInstanceRef.current) {
//         diagramInstanceRef.current.div = null;
//       }
//     };
//   }, [onNodeClick, onNodeEdit, onNodeDelete]);

//   useEffect(() => {
//     if (diagramInstanceRef.current && data) {
//       const diagram = diagramInstanceRef.current;
//       diagram.model = new go.TreeModel(data);
//     }
//   }, [data]);

//   return (
//     <div
//       ref={diagramRef}
//       className="w-full h-96 border border-gray-300 rounded-lg bg-white shadow-sm"
//       style={{ minHeight: "400px" }}
//     />
//   );
// };

// // Property Form Modal Component
// const PropertyFormModal = ({
//   isOpen,
//   onClose,
//   type,
//   property,
//   onSuccess,
//   contracts,
//   zones,
//   subZones,
//   buildings,
//   villaApartments,
//   floors,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const isEdit = !!property;

//   useEffect(() => {
//     if (isOpen) {
//       resetForm();
//     }
//   }, [isOpen, type, property]);

//   const resetForm = () => {
//     if (property) {
//       setFormData({ ...property });
//       setImagePreview(property.imageUrl);
//     } else {
//       setFormData({
//         contractId: "",
//         description: "",
//         ...getDefaultFields(type),
//       });
//       setImagePreview(null);
//     }
//     setImageFile(null);
//     setErrors({});
//   };

//   const getDefaultFields = (type) => {
//     const fields = {
//       zone: { zoneName: "" },
//       subZone: { subZoneName: "", zoneId: "" },
//       building: { buildingName: "", subZoneId: "" },
//       villaApartment: { villaApartmentName: "", buildingId: "" },
//       floor: { floorName: "", villaApartmentId: "" },
//       room: { roomName: "", floorId: "" },
//     };
//     return fields[type] || {};
//   };

//   const getParentOptions = () => {
//     switch (type) {
//       case "subZone":
//         return zones.filter(
//           (z) => z.contractId.toString() === formData.contractId
//         );
//       case "building":
//         return subZones.filter(
//           (s) => s.contractId.toString() === formData.contractId
//         );
//       case "villaApartment":
//         return buildings.filter(
//           (b) => b.contractId.toString() === formData.contractId
//         );
//       case "floor":
//         return villaApartments.filter(
//           (v) => v.contractId.toString() === formData.contractId
//         );
//       case "room":
//         return floors.filter(
//           (f) => f.contractId.toString() === formData.contractId
//         );
//       default:
//         return [];
//     }
//   };

//   const getParentFieldName = () => {
//     const parentFields = {
//       subZone: "zoneId",
//       building: "subZoneId",
//       villaApartment: "buildingId",
//       floor: "villaApartmentId",
//       room: "floorId",
//     };
//     return parentFields[type];
//   };

//   const getParentDisplayName = () => {
//     const parentNames = {
//       subZone: "Zone",
//       building: "SubZone",
//       villaApartment: "Building",
//       floor: "Villa/Apartment",
//       room: "Floor",
//     };
//     return parentNames[type];
//   };

//   const getParentItemName = (item) => {
//     const nameFields = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//     };

//     const parentType = {
//       subZone: "zone",
//       building: "subZone",
//       villaApartment: "building",
//       floor: "villaApartment",
//       room: "floor",
//     }[type];

//     return item[nameFields[parentType]] || "Unknown";
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (field === "contractId") {
//       const parentField = getParentFieldName();
//       if (parentField) {
//         setFormData((prev) => ({
//           ...prev,
//           [parentField]: "",
//         }));
//       }
//     }

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: null,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameField = `${type}Name`;
//     if (!formData[nameField]?.trim()) {
//       newErrors[nameField] = "Name is required";
//     }

//     if (!formData.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     const parentField = getParentFieldName();
//     if (parentField && !formData[parentField]) {
//       newErrors[parentField] = `${getParentDisplayName()} is required`;
//     }

//     if (!isEdit && !imageFile) {
//       newErrors.image = "Image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const serviceMethod = isEdit
//         ? propertyFlowService[
//             `update${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ]
//         : propertyFlowService[
//             `create${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ];

//       if (isEdit) {
//         const idField = `${type}Id`;
//         await serviceMethod(property[idField], formData, imageFile);
//       } else {
//         await serviceMethod(formData, imageFile);
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("Error saving property:", error);
//       setErrors({ submit: "Failed to save property. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTitle = () => {
//     const typeNames = {
//       zone: "Zone",
//       subZone: "SubZone",
//       building: "Building",
//       villaApartment: "Villa/Apartment",
//       floor: "Floor",
//       room: "Room",
//     };

//     return `${isEdit ? "Edit" : "Create"} ${typeNames[type]}`;
//   };

//   const nameField = `${type}Name`;
//   const parentField = getParentFieldName();
//   const parentOptions = getParentOptions();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-500" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Contract Selection */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">
//               Contract *
//             </label>
//             <select
//               value={formData.contractId?.toString() || ""}
//               onChange={(e) => handleInputChange("contractId", e.target.value)}
//               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors.contractId ? "border-red-500" : "border-gray-300"
//               }`}
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//             {errors.contractId && (
//               <p className="text-sm text-red-500">{errors.contractId}</p>
//             )}
//           </div>

//           {/* Parent Selection */}
//           {parentField && (
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 {getParentDisplayName()} *
//               </label>
//               <select
//                 value={formData[parentField]?.toString() || ""}
//                 onChange={(e) => handleInputChange(parentField, e.target.value)}
//                 disabled={!formData.contractId}
//                 className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 ${
//                   errors[parentField] ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">
//                   Select a {getParentDisplayName().toLowerCase()}
//                 </option>
//                 {parentOptions.map((option) => {
//                   const idField = `${
//                     type === "subZone"
//                       ? "zone"
//                       : type === "building"
//                       ? "subZone"
//                       : type === "villaApartment"
//                       ? "building"
//                       : type === "floor"
//                       ? "villaApartment"
//                       : "floor"
//                   }Id`;
//                   return (
//                     <option
//                       key={option[idField]}
//                       value={option[idField].toString()}
//                     >
//                       {getParentItemName(option)}
//                     </option>
//                   );
//                 })}
//               </select>
//               {errors[parentField] && (
//                 <p className="text-sm text-red-500">{errors[parentField]}</p>
//               )}
//             </div>
//           )}

//           {/* Name Field */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Name *</label>
//             <input
//               type="text"
//               value={formData[nameField] || ""}
//               onChange={(e) => handleInputChange(nameField, e.target.value)}
//               placeholder={`Enter ${type} name`}
//               className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                 errors[nameField] ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors[nameField] && (
//               <p className="text-sm text-red-500">{errors[nameField]}</p>
//             )}
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               value={formData.description || ""}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               placeholder={`Enter ${type} description`}
//               rows={3}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">
//               Image {!isEdit && "*"}
//             </label>
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center ${
//                 errors.image
//                   ? "border-red-500"
//                   : "border-gray-300 hover:border-gray-400"
//               } transition-colors`}
//             >
//               {imagePreview ? (
//                 <div className="space-y-4">
//                   <img
//                     src={imagePreview || "/placeholder.svg"}
//                     alt="Preview"
//                     className="w-32 h-32 object-cover rounded-lg mx-auto border"
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       document.getElementById("image-upload").click()
//                     }
//                     className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     <Upload className="w-4 h-4 mr-2" />
//                     Change Image
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <Upload className="w-12 h-12 text-gray-400 mx-auto" />
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         document.getElementById("image-upload").click()
//                       }
//                       className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Choose Image
//                     </button>
//                     <p className="text-sm text-gray-500 mt-2">
//                       Upload an image for this {type}
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             {errors.image && (
//               <p className="text-sm text-red-500">{errors.image}</p>
//             )}
//           </div>

//           {/* Submit Error */}
//           {errors.submit && (
//             <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-sm text-red-600">{errors.submit}</p>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Save className="w-4 h-4" />
//                   {isEdit ? "Update" : "Create"}{" "}
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </div>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Property Detail Modal Component
// const PropertyDetailModal = ({ isOpen, onClose, property }) => {
//   if (!property || !isOpen) return null;

//   const config = propertyTypeConfig[property.type];
//   const Icon = config.icon;

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyId = (property) => {
//     return property[`${property.type}Id`];
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <Icon className={`w-8 h-8 ${config.textColor}`} />
//             <h2 className="text-2xl font-bold text-gray-900">
//               {config.name} Details
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-6 h-6 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Basic Information */}
//           <div className="bg-white shadow rounded-lg border">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2 mb-4">
//                 <User className="w-5 h-5" />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Name
//                   </label>
//                   <p className="text-lg font-semibold text-gray-900">
//                     {getPropertyName(property)}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Type
//                   </label>
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.lightColor} ${config.textColor}`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     ID
//                   </label>
//                   <p className="text-gray-900">{getPropertyId(property)}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Contract ID
//                   </label>
//                   <p className="text-gray-900">{property.contractId}</p>
//                 </div>
//               </div>

//               {property.description && (
//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Description
//                   </label>
//                   <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
//                     {property.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Image */}
//           <div className="bg-white shadow rounded-lg border">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2 mb-4">
//                 <ImageIcon className="w-5 h-5" />
//                 Image
//               </h3>
//               {property.imageUrl ? (
//                 <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
//                   <img
//                     src={property.imageUrl || "/placeholder.svg"}
//                     alt={getPropertyName(property)}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
//                   <div className="text-center">
//                     <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//                     <p className="text-gray-500">No image available</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Hierarchy Information */}
//           <div className="bg-white shadow rounded-lg border">
//             <div className="px-4 py-5 sm:p-6">
//               <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//                 Hierarchy Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {property.zoneId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Zone ID
//                     </label>
//                     <p className="text-gray-900">{property.zoneId}</p>
//                   </div>
//                 )}

//                 {property.subZoneId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       SubZone ID
//                     </label>
//                     <p className="text-gray-900">{property.subZoneId}</p>
//                   </div>
//                 )}

//                 {property.buildingId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Building ID
//                     </label>
//                     <p className="text-gray-900">{property.buildingId}</p>
//                   </div>
//                 )}

//                 {property.villaApartmentId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Villa/Apartment ID
//                     </label>
//                     <p className="text-gray-900">{property.villaApartmentId}</p>
//                   </div>
//                 )}

//                 {property.floorId && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Floor ID
//                     </label>
//                     <p className="text-gray-900">{property.floorId}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end p-6 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Property Flow Management Component
// const PropertyFlowManagement = () => {
//   const {
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//     setSelectedContract,
//     loading,
//     refreshData,
//   } = usePropertyFlow();

//   const [contracts, setContracts] = useState([]);
//   const [viewMode, setViewMode] = useState("tree"); // 'tree' | 'grid' | 'list'
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [formType, setFormType] = useState("zone");
//   const [editingProperty, setEditingProperty] = useState(null);

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//     }
//   };

//   const buildTreeData = () => {
//     const treeData = [];

//     // Build the tree structure for GoJS
//     zones.forEach((zone) => {
//       const zoneNode = {
//         key: `zone-${zone.zoneId}`,
//         name: zone.zoneName,
//         type: "zone",
//         id: zone.zoneId,
//         description: zone.description,
//         imageUrl: zone.imageUrl,
//         contractId: zone.contractId,
//         ...zone,
//       };
//       treeData.push(zoneNode);

//       // Add subzones
//       subZones
//         .filter((sz) => sz.zoneId === zone.zoneId)
//         .forEach((subZone) => {
//           const subZoneNode = {
//             key: `subZone-${subZone.subZoneId}`,
//             parent: `zone-${zone.zoneId}`,
//             name: subZone.subZoneName,
//             type: "subZone",
//             id: subZone.subZoneId,
//             description: subZone.description,
//             imageUrl: subZone.imageUrl,
//             contractId: subZone.contractId,
//             ...subZone,
//           };
//           treeData.push(subZoneNode);

//           // Add buildings
//           buildings
//             .filter((b) => b.subZoneId === subZone.subZoneId)
//             .forEach((building) => {
//               const buildingNode = {
//                 key: `building-${building.buildingId}`,
//                 parent: `subZone-${subZone.subZoneId}`,
//                 name: building.buildingName,
//                 type: "building",
//                 id: building.buildingId,
//                 description: building.description,
//                 imageUrl: building.imageUrl,
//                 contractId: building.contractId,
//                 ...building,
//               };
//               treeData.push(buildingNode);

//               // Add villa/apartments
//               villaApartments
//                 .filter((va) => va.buildingId === building.buildingId)
//                 .forEach((villaApartment) => {
//                   const vaNode = {
//                     key: `villaApartment-${villaApartment.villaApartmentId}`,
//                     parent: `building-${building.buildingId}`,
//                     name: villaApartment.villaApartmentName,
//                     type: "villaApartment",
//                     id: villaApartment.villaApartmentId,
//                     description: villaApartment.description,
//                     imageUrl: villaApartment.imageUrl,
//                     contractId: villaApartment.contractId,
//                     ...villaApartment,
//                   };
//                   treeData.push(vaNode);

//                   // Add floors
//                   floors
//                     .filter(
//                       (f) =>
//                         f.villaApartmentId === villaApartment.villaApartmentId
//                     )
//                     .forEach((floor) => {
//                       const floorNode = {
//                         key: `floor-${floor.floorId}`,
//                         parent: `villaApartment-${villaApartment.villaApartmentId}`,
//                         name: floor.floorName,
//                         type: "floor",
//                         id: floor.floorId,
//                         description: floor.description,
//                         imageUrl: floor.imageUrl,
//                         contractId: floor.contractId,
//                         ...floor,
//                       };
//                       treeData.push(floorNode);

//                       // Add rooms
//                       rooms
//                         .filter((r) => r.floorId === floor.floorId)
//                         .forEach((room) => {
//                           const roomNode = {
//                             key: `room-${room.roomId}`,
//                             parent: `floor-${floor.floorId}`,
//                             name: room.roomName,
//                             type: "room",
//                             id: room.roomId,
//                             description: room.description,
//                             imageUrl: room.imageUrl,
//                             contractId: room.contractId,
//                             ...room,
//                           };
//                           treeData.push(roomNode);
//                         });
//                     });
//                 });
//             });
//         });
//     });

//     return treeData;
//   };

//   const getAllProperties = () => {
//     const allProperties = [
//       ...zones.map((z) => ({ ...z, type: "zone" })),
//       ...subZones.map((s) => ({ ...s, type: "subZone" })),
//       ...buildings.map((b) => ({ ...b, type: "building" })),
//       ...villaApartments.map((v) => ({ ...v, type: "villaApartment" })),
//       ...floors.map((f) => ({ ...f, type: "floor" })),
//       ...rooms.map((r) => ({ ...r, type: "room" })),
//     ];

//     return allProperties.filter((property) => {
//       const matchesSearch = getPropertyName(property)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesFilter =
//         filterType === "all" || property.type === filterType;
//       return matchesSearch && matchesFilter;
//     });
//   };

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyStats = () => {
//     return {
//       zones: zones.length,
//       subZones: subZones.length,
//       buildings: buildings.length,
//       villaApartments: villaApartments.length,
//       floors: floors.length,
//       rooms: rooms.length,
//       total:
//         zones.length +
//         subZones.length +
//         buildings.length +
//         villaApartments.length +
//         floors.length +
//         rooms.length,
//     };
//   };

//   const handleCreateProperty = (type) => {
//     setFormType(type);
//     setEditingProperty(null);
//     setShowFormModal(true);
//   };

//   const handleEditProperty = (property) => {
//     setFormType(property.type);
//     setEditingProperty(property);
//     setShowFormModal(true);
//   };

//   const handleViewProperty = (property) => {
//     setSelectedProperty(property);
//     setShowDetailModal(true);
//   };

//   const handleNodeClick = (nodeData) => {
//     handleViewProperty(nodeData);
//   };

//   const handleNodeEdit = (nodeData) => {
//     handleEditProperty(nodeData);
//   };

//   const handleNodeDelete = (nodeData) => {
//     // Implement delete functionality
//     console.log("Delete node:", nodeData);
//   };

//   const stats = getPropertyStats();
//   const treeData = buildTreeData();
//   const allProperties = getAllProperties();

//   // Grid View Component
//   const GridView = ({ properties }) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {properties.map((property, index) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className={`${config.lightColor} ${config.borderColor} border-2 hover:shadow-lg transition-all duration-200 group rounded-lg shadow`}
//             >
//               <div className="p-4">
//                 <div className="flex items-start justify-between mb-3">
//                   <Icon className={`w-6 h-6 ${config.textColor}`} />
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.textColor} ${config.lightColor}`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 {property.imageUrl && (
//                   <div className="mb-3">
//                     <img
//                       src={property.imageUrl || "/placeholder.svg"}
//                       alt={getPropertyName(property)}
//                       className="w-full h-32 rounded-lg object-cover"
//                     />
//                   </div>
//                 )}

//                 <h4 className="font-semibold text-gray-900 mb-2">
//                   {getPropertyName(property)}
//                 </h4>

//                 {property.description && (
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                     {property.description}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => handleViewProperty(property)}
//                     className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
//                   >
//                     <Eye className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => handleEditProperty(property)}
//                     className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
//                   >
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors">
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // List View Component
//   const ListView = ({ properties }) => {
//     return (
//       <div className="space-y-3">
//         {properties.map((property, index) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className="bg-white hover:shadow-md transition-all duration-200 rounded-lg shadow border"
//             >
//               <div className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4 flex-1">
//                     <Icon className={`w-6 h-6 ${config.textColor}`} />

//                     {property.imageUrl && (
//                       <img
//                         src={property.imageUrl || "/placeholder.svg"}
//                         alt={getPropertyName(property)}
//                         className="w-12 h-12 rounded-lg object-cover"
//                       />
//                     )}

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-1">
//                         <h4 className="font-semibold text-gray-900">
//                           {getPropertyName(property)}
//                         </h4>
//                         <span
//                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.textColor} ${config.lightColor}`}
//                         >
//                           {config.name}
//                         </span>
//                       </div>
//                       {property.description && (
//                         <p className="text-sm text-gray-600">
//                           {property.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => handleViewProperty(property)}
//                       className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={() => handleEditProperty(property)}
//                       className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
//                     >
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Zap className="w-8 h-8 text-blue-600" />
//               Property Flow Manager
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Manage your property hierarchy with modern visualization
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <select
//               value={selectedContract?.toString() || ""}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         {selectedContract && (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
//             {Object.entries(propertyTypeConfig).map(([type, config]) => {
//               const Icon = config.icon;
//               const count = stats[type] || 0;

//               return (
//                 <div
//                   key={type}
//                   className={`${config.lightColor} ${config.borderColor} border-2 hover:shadow-lg transition-all duration-200 rounded-lg shadow`}
//                 >
//                   <div className="p-4">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p
//                           className={`text-sm font-medium ${config.textColor}`}
//                         >
//                           {config.plural}
//                         </p>
//                         <p className="text-2xl font-bold text-gray-900">
//                           {count}
//                         </p>
//                       </div>
//                       <Icon className={`w-8 h-8 ${config.textColor}`} />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 rounded-lg shadow">
//               <div className="p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-blue-100">Total</p>
//                     <p className="text-2xl font-bold">{stats.total}</p>
//                   </div>
//                   <Building className="w-8 h-8 text-blue-100" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {!selectedContract ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="bg-white rounded-lg shadow w-full max-w-md">
//               <div className="p-8 text-center">
//                 <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   Select a Contract
//                 </h3>
//                 <p className="text-gray-600">
//                   Choose a contract from the dropdown above to start managing
//                   your property flow
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : loading ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading property data...</p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Controls */}
//             <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//               <div className="flex flex-col sm:flex-row gap-3 flex-1">
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <input
//                     type="text"
//                     placeholder="Search properties..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="all">All Types</option>
//                   {Object.entries(propertyTypeConfig).map(([type, config]) => (
//                     <option key={type} value={type}>
//                       {config.plural}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setViewMode("tree")}
//                   className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     viewMode === "tree"
//                       ? "border-transparent text-white bg-blue-600 hover:bg-blue-700"
//                       : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                   }`}
//                 >
//                   <TreePine className="w-4 h-4 mr-2" />
//                   Tree
//                 </button>
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     viewMode === "grid"
//                       ? "border-transparent text-white bg-blue-600 hover:bg-blue-700"
//                       : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                   }`}
//                 >
//                   <Grid className="w-4 h-4 mr-2" />
//                   Grid
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     viewMode === "list"
//                       ? "border-transparent text-white bg-blue-600 hover:bg-blue-700"
//                       : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                   }`}
//                 >
//                   <List className="w-4 h-4 mr-2" />
//                   List
//                 </button>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="flex flex-wrap gap-2">
//               {Object.entries(propertyTypeConfig).map(([type, config]) => {
//                 const Icon = config.icon;
//                 return (
//                   <button
//                     key={type}
//                     onClick={() => handleCreateProperty(type)}
//                     className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md ${config.lightColor} ${config.borderColor} ${config.textColor} hover:${config.color} hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
//                   >
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add {config.name}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Content based on view mode */}
//             {viewMode === "tree" && (
//               <div className="bg-white rounded-lg shadow p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <TreePine className="w-5 h-5" />
//                   Property Hierarchy Tree
//                 </h3>
//                 {treeData.length === 0 ? (
//                   <div className="text-center py-12">
//                     <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       No Properties Found
//                     </h3>
//                     <p className="text-gray-600">
//                       Start by creating zones for this contract
//                     </p>
//                   </div>
//                 ) : (
//                   <PropertyFamilyTree
//                     data={treeData}
//                     onNodeClick={handleNodeClick}
//                     onNodeEdit={handleNodeEdit}
//                     onNodeDelete={handleNodeDelete}
//                   />
//                 )}
//               </div>
//             )}

//             {viewMode === "grid" && <GridView properties={allProperties} />}

//             {viewMode === "list" && <ListView properties={allProperties} />}
//           </>
//         )}

//         {/* Modals */}
//         <PropertyFormModal
//           isOpen={showFormModal}
//           onClose={() => setShowFormModal(false)}
//           type={formType}
//           property={editingProperty}
//           onSuccess={() => {
//             setShowFormModal(false);
//             refreshData();
//           }}
//           contracts={contracts}
//           zones={zones}
//           subZones={subZones}
//           buildings={buildings}
//           villaApartments={villaApartments}
//           floors={floors}
//         />

//         <PropertyDetailModal
//           isOpen={showDetailModal}
//           onClose={() => setShowDetailModal(false)}
//           property={selectedProperty}
//         />
//       </div>
//     </div>
//   );
// };

// export default PropertyFlowManagement;
///////888888888888888888888
// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Building,
//   Home,
//   MapPin,
//   Layers,
//   DoorOpen,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Grid,
//   List,
//   Zap,
//   Upload,
//   Save,
//   X,
//   User,
//   ImageIcon,
//   TreePine,
//   BarChart3,
//   TrendingUp,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   Calendar,
//   Clock,
//   Users,
//   Activity,
// } from "lucide-react";
// import { usePropertyFlow } from "../context/PropertyFlowContext";
// import { contractService } from "../services/contractService";
// import { propertyFlowService } from "../services/propertyFlowService";

// // GoJS import (you'll need to install: npm install gojs)
// import * as go from "gojs";

// const propertyTypeConfig = {
//   zone: {
//     icon: MapPin,
//     color: "#3B82F6",
//     lightColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//     textColor: "text-blue-700",
//     bgGradient: "from-blue-500 to-blue-600",
//     name: "Zone",
//     plural: "Zones",
//   },
//   subZone: {
//     icon: Layers,
//     color: "#10B981",
//     lightColor: "bg-emerald-50",
//     borderColor: "border-emerald-200",
//     textColor: "text-emerald-700",
//     bgGradient: "from-emerald-500 to-emerald-600",
//     name: "SubZone",
//     plural: "SubZones",
//   },
//   building: {
//     icon: Building,
//     color: "#8B5CF6",
//     lightColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//     textColor: "text-purple-700",
//     bgGradient: "from-purple-500 to-purple-600",
//     name: "Building",
//     plural: "Buildings",
//   },
//   villaApartment: {
//     icon: Home,
//     color: "#F59E0B",
//     lightColor: "bg-amber-50",
//     borderColor: "border-amber-200",
//     textColor: "text-amber-700",
//     bgGradient: "from-amber-500 to-amber-600",
//     name: "Villa/Apartment",
//     plural: "Villa/Apartments",
//   },
//   floor: {
//     icon: Layers,
//     color: "#6366F1",
//     lightColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//     textColor: "text-indigo-700",
//     bgGradient: "from-indigo-500 to-indigo-600",
//     name: "Floor",
//     plural: "Floors",
//   },
//   room: {
//     icon: DoorOpen,
//     color: "#EF4444",
//     lightColor: "bg-red-50",
//     borderColor: "border-red-200",
//     textColor: "text-red-700",
//     bgGradient: "from-red-500 to-red-600",
//     name: "Room",
//     plural: "Rooms",
//   },
// };

// // Enhanced Stats Card Component
// const StatsCard = ({ type, count, config, isLoading }) => {
//   const Icon = config.icon;

//   return (
//     <div
//       className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${config.lightColor} border-2 ${config.borderColor}`}
//     >
//       <div className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <p
//               className={`text-sm font-semibold ${config.textColor} uppercase tracking-wide`}
//             >
//               {config.plural}
//             </p>
//             <div className="mt-2">
//               {isLoading ? (
//                 <div className="animate-pulse">
//                   <div className="h-8 bg-gray-200 rounded w-16"></div>
//                 </div>
//               ) : (
//                 <p className="text-3xl font-bold text-gray-900 animate-pulse">
//                   {count.toLocaleString()}
//                 </p>
//               )}
//             </div>
//             <div className="mt-2 flex items-center">
//               <TrendingUp className={`w-4 h-4 ${config.textColor} mr-1`} />
//               <span className={`text-xs ${config.textColor} font-medium`}>
//                 Active
//               </span>
//             </div>
//           </div>
//           <div
//             className={`p-3 rounded-full bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//           >
//             <Icon className="w-8 h-8 text-white" />
//           </div>
//         </div>
//       </div>
//       <div
//         className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
//       ></div>
//     </div>
//   );
// };

// // Enhanced Total Stats Card
// const TotalStatsCard = ({ total, isLoading }) => {
//   return (
//     <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
//       <div className="relative p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide">
//               Total Properties
//             </p>
//             <div className="mt-2">
//               {isLoading ? (
//                 <div className="animate-pulse">
//                   <div className="h-8 bg-gray-200 rounded w-20"></div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-bold text-white">
//                   {total.toLocaleString()}
//                 </p>
//               )}
//             </div>
//             <div className="mt-2 flex items-center">
//               <Activity className="w-4 h-4 text-blue-300 mr-1" />
//               <span className="text-xs text-blue-300 font-medium">
//                 All Types
//               </span>
//             </div>
//           </div>
//           <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
//             <BarChart3 className="w-8 h-8 text-white" />
//           </div>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
//     </div>
//   );
// };

// // GoJS Family Tree Component (Fixed)
// const PropertyFamilyTree = ({
//   data,
//   onNodeClick,
//   onNodeEdit,
//   onNodeDelete,
// }) => {
//   const diagramRef = useRef(null);
//   const diagramInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!diagramRef.current) return;

//     const $ = go.GraphObject.make;

//     // Clean up existing diagram first
//     if (diagramInstanceRef.current) {
//       diagramInstanceRef.current.div = null;
//       diagramInstanceRef.current = null;
//     }

//     // Create the diagram with enhanced styling
//     const diagram = $(go.Diagram, diagramRef.current, {
//       "toolManager.hoverDelay": 100,
//       "toolManager.toolTipDuration": 10000,
//       layout: $(go.TreeLayout, {
//         treeStyle: go.TreeLayout.StyleLastParents,
//         arrangement: go.TreeLayout.ArrangementHorizontal,
//         angle: 90,
//         layerSpacing: 50,
//         alternateAngle: 90,
//         alternateLayerSpacing: 50,
//         alternateAlignment: go.TreeLayout.AlignmentBus,
//         alternateNodeSpacing: 30,
//       }),
//       "undoManager.isEnabled": true,
//       "animationManager.isEnabled": true,
//       "animationManager.duration": 1000,
//       "animationManager.isInitial": false,
//       initialContentAlignment: go.Spot.Center,
//       "grid.visible": true,
//       "grid.gridCellSize": new go.Size(20, 20),
//     });

//     // Enhanced node template with better styling
//     diagram.nodeTemplate = $(
//       go.Node,
//       "Auto",
//       {
//         locationSpot: go.Spot.Center,
//         isShadowed: true,
//         shadowBlur: 3,
//         shadowOffset: new go.Point(2, 2),
//         shadowColor: "rgba(0, 0, 0, .2)",
//         selectionAdornmentTemplate: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, "RoundedRectangle", {
//             fill: null,
//             stroke: "#4F46E5",
//             strokeWidth: 3,
//             strokeDashArray: [5, 5],
//           }),
//           $(go.Placeholder)
//         ),
//       },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
//         go.Point.stringify
//       ),

//       // Enhanced main shape
//       $(
//         go.Shape,
//         "RoundedRectangle",
//         {
//           name: "SHAPE",
//           fill: "white",
//           stroke: "#E5E7EB",
//           strokeWidth: 2,
//           minSize: new go.Size(140, 80),
//         },
//         new go.Binding("fill", "type", (type) => {
//           const config = propertyTypeConfig[type];
//           return config ? config.color + "15" : "#F9FAFB";
//         }),
//         new go.Binding(
//           "stroke",
//           "type",
//           (type) => propertyTypeConfig[type]?.color || "#6B7280"
//         )
//       ),

//       // Enhanced content panel
//       $(
//         go.Panel,
//         "Vertical",
//         { margin: 12 },

//         // Icon and type header
//         $(
//           go.Panel,
//           "Horizontal",
//           {
//             alignment: go.Spot.Center,
//             margin: new go.Margin(0, 0, 8, 0),
//             background: "rgba(255,255,255,0.8)",
//             padding: 4,
//           },
//           $(
//             go.TextBlock,
//             {
//               font: "bold 14px sans-serif",
//               margin: new go.Margin(0, 6, 0, 0),
//             },
//             new go.Binding("text", "type", (type) => {
//               const icons = {
//                 zone: "🌍",
//                 subZone: "📍",
//                 building: "🏢",
//                 villaApartment: "🏠",
//                 floor: "🏗️",
//                 room: "🚪",
//               };
//               return icons[type] || "📦";
//             })
//           ),
//           $(
//             go.TextBlock,
//             {
//               font: "bold 10px sans-serif",
//               textAlign: "center",
//             },
//             new go.Binding(
//               "text",
//               "type",
//               (type) => propertyTypeConfig[type]?.name || "Unknown"
//             ),
//             new go.Binding(
//               "stroke",
//               "type",
//               (type) => propertyTypeConfig[type]?.color || "#6B7280"
//             )
//           )
//         ),

//         // Property name with better styling
//         $(
//           go.TextBlock,
//           {
//             font: "bold 14px sans-serif",
//             stroke: "#1F2937",
//             maxSize: new go.Size(120, Number.NaN),
//             wrap: go.TextBlock.WrapFit,
//             textAlign: "center",
//             margin: new go.Margin(0, 0, 4, 0),
//           },
//           new go.Binding("text", "name")
//         ),

//         // ID display
//         $(
//           go.TextBlock,
//           {
//             font: "10px sans-serif",
//             stroke: "#6B7280",
//             textAlign: "center",
//           },
//           new go.Binding("text", "id", (id) => `ID: ${id}`)
//         )
//       ),

//       // Enhanced tooltip
//       {
//         toolTip: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, {
//             fill: "#1F2937",
//             stroke: "#374151",
//           }),
//           $(
//             go.Panel,
//             "Vertical",
//             { margin: 12 },
//             $(
//               go.TextBlock,
//               {
//                 font: "bold 14px sans-serif",
//                 stroke: "white",
//                 margin: new go.Margin(0, 0, 4, 0),
//               },
//               new go.Binding("text", "name")
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding(
//                 "text",
//                 "type",
//                 (type) => `Type: ${propertyTypeConfig[type]?.name || "Unknown"}`
//               )
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding("text", "id", (id) => `ID: ${id}`)
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//                 maxSize: new go.Size(200, Number.NaN),
//                 wrap: go.TextBlock.WrapFit,
//               },
//               new go.Binding("text", "description", (desc) =>
//                 desc ? `Description: ${desc}` : ""
//               ),
//               new go.Binding("visible", "description", (desc) => !!desc)
//             )
//           )
//         ),
//       },

//       // Click events
//       {
//         click: (e, node) => {
//           const data = node.data;
//           if (onNodeClick) onNodeClick(data);
//         },
//         doubleClick: (e, node) => {
//           const data = node.data;
//           if (onNodeEdit) onNodeEdit(data);
//         },
//       }
//     );

//     // Enhanced link template
//     diagram.linkTemplate = $(
//       go.Link,
//       {
//         routing: go.Link.Orthogonal,
//         corner: 8,
//         selectable: false,
//       },
//       $(go.Shape, {
//         strokeWidth: 3,
//         stroke: "#D1D5DB",
//         strokeDashArray: [8, 4],
//       }),
//       $(go.Shape, {
//         toArrow: "Standard",
//         fill: "#9CA3AF",
//         stroke: "#9CA3AF",
//         scale: 1.2,
//       })
//     );

//     // Enhanced context menu
//     diagram.nodeTemplate.contextMenu = $(
//       go.Adornment,
//       "Vertical",
//       { background: "white", shadowBlur: 8 },
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "👁️ View Details", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeClick) onNodeClick(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "✏️ Edit", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeEdit) onNodeEdit(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "🗑️ Delete", {
//           font: "12px sans-serif",
//           margin: 8,
//           stroke: "#EF4444",
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeDelete) onNodeDelete(data);
//           },
//         }
//       )
//     );

//     diagramInstanceRef.current = diagram;

//     return () => {
//       if (diagramInstanceRef.current) {
//         diagramInstanceRef.current.div = null;
//         diagramInstanceRef.current = null;
//       }
//     };
//   }, [onNodeClick, onNodeEdit, onNodeDelete]);

//   useEffect(() => {
//     if (diagramInstanceRef.current && data && data.length > 0) {
//       try {
//         const diagram = diagramInstanceRef.current;
//         diagram.model = new go.TreeModel(data);
//       } catch (error) {
//         console.error("Error setting GoJS model:", error);
//       }
//     }
//   }, [data]);

//   return (
//     <div
//       ref={diagramRef}
//       className="w-full h-96 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner"
//       style={{ minHeight: "500px" }}
//     />
//   );
// };

// // Property Form Modal Component (Enhanced)
// const PropertyFormModal = ({
//   isOpen,
//   onClose,
//   type,
//   property,
//   onSuccess,
//   contracts,
//   zones,
//   subZones,
//   buildings,
//   villaApartments,
//   floors,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const isEdit = !!property;
//   const config = propertyTypeConfig[type] || propertyTypeConfig.zone;

//   useEffect(() => {
//     if (isOpen) {
//       resetForm();
//     }
//   }, [isOpen, type, property]);

//   const resetForm = () => {
//     if (property) {
//       setFormData({ ...property });
//       setImagePreview(property.imageUrl);
//     } else {
//       setFormData({
//         contractId: "",
//         description: "",
//         ...getDefaultFields(type),
//       });
//       setImagePreview(null);
//     }
//     setImageFile(null);
//     setErrors({});
//   };

//   const getDefaultFields = (type) => {
//     const fields = {
//       zone: { zoneName: "" },
//       subZone: { subZoneName: "", zoneId: "" },
//       building: { buildingName: "", subZoneId: "" },
//       villaApartment: { villaApartmentName: "", buildingId: "" },
//       floor: { floorName: "", villaApartmentId: "" },
//       room: { roomName: "", floorId: "" },
//     };
//     return fields[type] || {};
//   };

//   const getParentOptions = () => {
//     switch (type) {
//       case "subZone":
//         return zones.filter(
//           (z) => z.contractId.toString() === formData.contractId
//         );
//       case "building":
//         return subZones.filter(
//           (s) => s.contractId.toString() === formData.contractId
//         );
//       case "villaApartment":
//         return buildings.filter(
//           (b) => b.contractId.toString() === formData.contractId
//         );
//       case "floor":
//         return villaApartments.filter(
//           (v) => v.contractId.toString() === formData.contractId
//         );
//       case "room":
//         return floors.filter(
//           (f) => f.contractId.toString() === formData.contractId
//         );
//       default:
//         return [];
//     }
//   };

//   const getParentFieldName = () => {
//     const parentFields = {
//       subZone: "zoneId",
//       building: "subZoneId",
//       villaApartment: "buildingId",
//       floor: "villaApartmentId",
//       room: "floorId",
//     };
//     return parentFields[type];
//   };

//   const getParentDisplayName = () => {
//     const parentNames = {
//       subZone: "Zone",
//       building: "SubZone",
//       villaApartment: "Building",
//       floor: "Villa/Apartment",
//       room: "Floor",
//     };
//     return parentNames[type];
//   };

//   const getParentItemName = (item) => {
//     const nameFields = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//     };

//     const parentType = {
//       subZone: "zone",
//       building: "subZone",
//       villaApartment: "building",
//       floor: "villaApartment",
//       room: "floor",
//     }[type];

//     return item[nameFields[parentType]] || "Unknown";
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (field === "contractId") {
//       const parentField = getParentFieldName();
//       if (parentField) {
//         setFormData((prev) => ({
//           ...prev,
//           [parentField]: "",
//         }));
//       }
//     }

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: null,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameField = `${type}Name`;
//     if (!formData[nameField]?.trim()) {
//       newErrors[nameField] = "Name is required";
//     }

//     if (!formData.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     const parentField = getParentFieldName();
//     if (parentField && !formData[parentField]) {
//       newErrors[parentField] = `${getParentDisplayName()} is required`;
//     }

//     if (!isEdit && !imageFile) {
//       newErrors.image = "Image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const serviceMethod = isEdit
//         ? propertyFlowService[
//             `update${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ]
//         : propertyFlowService[
//             `create${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ];

//       if (isEdit) {
//         const idField = `${type}Id`;
//         await serviceMethod(property[idField], formData, imageFile);
//       } else {
//         await serviceMethod(formData, imageFile);
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("Error saving property:", error);
//       setErrors({ submit: "Failed to save property. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTitle = () => {
//     const typeNames = {
//       zone: "Zone",
//       subZone: "SubZone",
//       building: "Building",
//       villaApartment: "Villa/Apartment",
//       floor: "Floor",
//       room: "Room",
//     };

//     return `${isEdit ? "Edit" : "Create"} ${typeNames[type]}`;
//   };

//   const nameField = `${type}Name`;
//   const parentField = getParentFieldName();
//   const parentOptions = getParentOptions();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Enhanced Header */}
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <config.icon className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Contract Selection */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Building className="w-4 h-4" />
//               Contract *
//             </label>
//             <select
//               value={formData.contractId?.toString() || ""}
//               onChange={(e) => handleInputChange("contractId", e.target.value)}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors.contractId ? "border-red-500" : "border-gray-200"
//               }`}
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//             {errors.contractId && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.contractId}
//               </p>
//             )}
//           </div>

//           {/* Parent Selection */}
//           {parentField && (
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                 <Layers className="w-4 h-4" />
//                 {getParentDisplayName()} *
//               </label>
//               <select
//                 value={formData[parentField]?.toString() || ""}
//                 onChange={(e) => handleInputChange(parentField, e.target.value)}
//                 disabled={!formData.contractId}
//                 className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all ${
//                   errors[parentField] ? "border-red-500" : "border-gray-200"
//                 }`}
//               >
//                 <option value="">
//                   Select a {getParentDisplayName().toLowerCase()}
//                 </option>
//                 {parentOptions.map((option) => {
//                   const idField = `${
//                     type === "subZone"
//                       ? "zone"
//                       : type === "building"
//                       ? "subZone"
//                       : type === "villaApartment"
//                       ? "building"
//                       : type === "floor"
//                       ? "villaApartment"
//                       : "floor"
//                   }Id`;
//                   return (
//                     <option
//                       key={option[idField]}
//                       value={option[idField].toString()}
//                     >
//                       {getParentItemName(option)}
//                     </option>
//                   );
//                 })}
//               </select>
//               {errors[parentField] && (
//                 <p className="text-sm text-red-500 flex items-center gap-1">
//                   <X className="w-4 h-4" />
//                   {errors[parentField]}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Name Field */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Name *
//             </label>
//             <input
//               type="text"
//               value={formData[nameField] || ""}
//               onChange={(e) => handleInputChange(nameField, e.target.value)}
//               placeholder={`Enter ${type} name`}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors[nameField] ? "border-red-500" : "border-gray-200"
//               }`}
//             />
//             {errors[nameField] && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors[nameField]}
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Description
//             </label>
//             <textarea
//               value={formData.description || ""}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               placeholder={`Enter ${type} description`}
//               rows={3}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
//             />
//           </div>

//           {/* Enhanced Image Upload */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <ImageIcon className="w-4 h-4" />
//               Image {!isEdit && "*"}
//             </label>
//             <div
//               className={`border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50 ${
//                 errors.image ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             >
//               {imagePreview ? (
//                 <div className="space-y-4">
//                   <div className="relative inline-block">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                       <Edit className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       document.getElementById("image-upload").click()
//                     }
//                     className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                   >
//                     <Upload className="w-4 h-4 mr-2" />
//                     Change Image
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                     <Upload className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         document.getElementById("image-upload").click()
//                       }
//                       className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Choose Image
//                     </button>
//                     <p className="text-sm text-gray-500 mt-3">
//                       Upload an image for this {type}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       PNG, JPG up to 10MB
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             {errors.image && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.image}
//               </p>
//             )}
//           </div>

//           {/* Submit Error */}
//           {errors.submit && (
//             <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <X className="w-4 h-4" />
//                 {errors.submit}
//               </p>
//             </div>
//           )}

//           {/* Enhanced Actions */}
//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r ${config.bgGradient} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105`}
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Save className="w-4 h-4" />
//                   {isEdit ? "Update" : "Create"}{" "}
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </div>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Enhanced Property Detail Modal Component
// const PropertyDetailModal = ({ isOpen, onClose, property }) => {
//   if (!property || !isOpen) return null;

//   const config = propertyTypeConfig[property.type];
//   const Icon = config.icon;

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyId = (property) => {
//     return property[`${property.type}Id`];
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Enhanced Header */}
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-white bg-opacity-20 rounded-xl">
//                 <Icon className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   {config.name} Details
//                 </h2>
//                 <p className="text-blue-100 text-sm">
//                   {getPropertyName(property)}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Enhanced Basic Information */}
//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <User className="w-5 h-5 text-blue-600" />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Name
//                   </label>
//                   <p className="text-xl font-bold text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyName(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Type
//                   </label>
//                   <div className="bg-white p-3 rounded-lg border">
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.lightColor} ${config.textColor} border ${config.borderColor}`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       {config.name}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyId(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Contract ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {property.contractId}
//                   </p>
//                 </div>
//               </div>

//               {property.description && (
//                 <div className="mt-6 space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Description
//                   </label>
//                   <p className="text-gray-900 bg-white p-4 rounded-lg border-2 border-gray-100 leading-relaxed">
//                     {property.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Enhanced Image Section */}
//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <ImageIcon className="w-5 h-5 text-blue-600" />
//                 Image
//               </h3>
//               {property.imageUrl ? (
//                 <div className="relative group">
//                   <img
//                     src={property.imageUrl || "/placeholder.svg"}
//                     alt={getPropertyName(property)}
//                     className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                     <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
//                   <div className="text-center">
//                     <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500 font-medium">
//                       No image available
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Enhanced Hierarchy Information */}
//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <Layers className="w-5 h-5 text-blue-600" />
//                 Hierarchy Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {property.zoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <MapPin className="w-4 h-4" />
//                       Zone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.zoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.subZoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       SubZone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.subZoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.buildingId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Building className="w-4 h-4" />
//                       Building ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.buildingId}
//                     </p>
//                   </div>
//                 )}

//                 {property.villaApartmentId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Home className="w-4 h-4" />
//                       Villa/Apartment ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.villaApartmentId}
//                     </p>
//                   </div>
//                 )}

//                 {property.floorId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       Floor ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.floorId}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Metadata Section */}
//           {(property.createdAt || property.updatedAt) && (
//             <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   Metadata
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {property.createdAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Calendar className="w-4 h-4" />
//                         Created Date
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}

//                   {property.updatedAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         Last Updated
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.updatedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Enhanced Footer */}
//         <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Property Flow Management Component (Enhanced)
// const PropertyFlowManagement = () => {
//   const {
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//     setSelectedContract,
//     loading,
//     refreshData,
//   } = usePropertyFlow();

//   const [contracts, setContracts] = useState([]);
//   const [viewMode, setViewMode] = useState("tree"); // 'tree' | 'grid' | 'list'
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [formType, setFormType] = useState("zone");
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await refreshData();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000); // Add a small delay for better UX
//     }
//   };

//   const buildTreeData = () => {
//     const treeData = [];

//     // Build the tree structure for GoJS
//     zones.forEach((zone) => {
//       const zoneNode = {
//         key: `zone-${zone.zoneId}`,
//         name: zone.zoneName,
//         type: "zone",
//         id: zone.zoneId,
//         description: zone.description,
//         imageUrl: zone.imageUrl,
//         contractId: zone.contractId,
//         ...zone,
//       };
//       treeData.push(zoneNode);

//       // Add subzones
//       subZones
//         .filter((sz) => sz.zoneId === zone.zoneId)
//         .forEach((subZone) => {
//           const subZoneNode = {
//             key: `subZone-${subZone.subZoneId}`,
//             parent: `zone-${zone.zoneId}`,
//             name: subZone.subZoneName,
//             type: "subZone",
//             id: subZone.subZoneId,
//             description: subZone.description,
//             imageUrl: subZone.imageUrl,
//             contractId: subZone.contractId,
//             ...subZone,
//           };
//           treeData.push(subZoneNode);

//           // Add buildings
//           buildings
//             .filter((b) => b.subZoneId === subZone.subZoneId)
//             .forEach((building) => {
//               const buildingNode = {
//                 key: `building-${building.buildingId}`,
//                 parent: `subZone-${subZone.subZoneId}`,
//                 name: building.buildingName,
//                 type: "building",
//                 id: building.buildingId,
//                 description: building.description,
//                 imageUrl: building.imageUrl,
//                 contractId: building.contractId,
//                 ...building,
//               };
//               treeData.push(buildingNode);

//               // Add villa/apartments
//               villaApartments
//                 .filter((va) => va.buildingId === building.buildingId)
//                 .forEach((villaApartment) => {
//                   const vaNode = {
//                     key: `villaApartment-${villaApartment.villaApartmentId}`,
//                     parent: `building-${building.buildingId}`,
//                     name: villaApartment.villaApartmentName,
//                     type: "villaApartment",
//                     id: villaApartment.villaApartmentId,
//                     description: villaApartment.description,
//                     imageUrl: villaApartment.imageUrl,
//                     contractId: villaApartment.contractId,
//                     ...villaApartment,
//                   };
//                   treeData.push(vaNode);

//                   // Add floors
//                   floors
//                     .filter(
//                       (f) =>
//                         f.villaApartmentId === villaApartment.villaApartmentId
//                     )
//                     .forEach((floor) => {
//                       const floorNode = {
//                         key: `floor-${floor.floorId}`,
//                         parent: `villaApartment-${villaApartment.villaApartmentId}`,
//                         name: floor.floorName,
//                         type: "floor",
//                         id: floor.floorId,
//                         description: floor.description,
//                         imageUrl: floor.imageUrl,
//                         contractId: floor.contractId,
//                         ...floor,
//                       };
//                       treeData.push(floorNode);

//                       // Add rooms
//                       rooms
//                         .filter((r) => r.floorId === floor.floorId)
//                         .forEach((room) => {
//                           const roomNode = {
//                             key: `room-${room.roomId}`,
//                             parent: `floor-${floor.floorId}`,
//                             name: room.roomName,
//                             type: "room",
//                             id: room.roomId,
//                             description: room.description,
//                             imageUrl: room.imageUrl,
//                             contractId: room.contractId,
//                             ...room,
//                           };
//                           treeData.push(roomNode);
//                         });
//                     });
//                 });
//             });
//         });
//     });

//     return treeData;
//   };

//   const getAllProperties = () => {
//     const allProperties = [
//       ...zones.map((z) => ({ ...z, type: "zone" })),
//       ...subZones.map((s) => ({ ...s, type: "subZone" })),
//       ...buildings.map((b) => ({ ...b, type: "building" })),
//       ...villaApartments.map((v) => ({ ...v, type: "villaApartment" })),
//       ...floors.map((f) => ({ ...f, type: "floor" })),
//       ...rooms.map((r) => ({ ...r, type: "room" })),
//     ];

//     return allProperties.filter((property) => {
//       const matchesSearch = getPropertyName(property)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesFilter =
//         filterType === "all" || property.type === filterType;
//       return matchesSearch && matchesFilter;
//     });
//   };

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyStats = () => {
//     return {
//       zones: zones.length,
//       subZones: subZones.length,
//       buildings: buildings.length,
//       villaApartments: villaApartments.length,
//       floors: floors.length,
//       rooms: rooms.length,
//       total:
//         zones.length +
//         subZones.length +
//         buildings.length +
//         villaApartments.length +
//         floors.length +
//         rooms.length,
//     };
//   };

//   const handleCreateProperty = (type) => {
//     setFormType(type);
//     setEditingProperty(null);
//     setShowFormModal(true);
//   };

//   const handleEditProperty = (property) => {
//     setFormType(property.type);
//     setEditingProperty(property);
//     setShowFormModal(true);
//   };

//   const handleViewProperty = (property) => {
//     setSelectedProperty(property);
//     setShowDetailModal(true);
//   };

//   const handleNodeClick = (nodeData) => {
//     handleViewProperty(nodeData);
//   };

//   const handleNodeEdit = (nodeData) => {
//     handleEditProperty(nodeData);
//   };

//   const handleNodeDelete = (nodeData) => {
//     // Implement delete functionality
//     console.log("Delete node:", nodeData);
//   };

//   const stats = getPropertyStats();
//   const treeData = buildTreeData();
//   const allProperties = getAllProperties();

//   // Enhanced Grid View Component
//   const GridView = ({ properties }) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {properties.map((property, index) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${config.lightColor} border-2 ${config.borderColor} group`}
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div
//                     className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                   >
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <span
//                     className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} bg-white border ${config.borderColor} shadow-sm`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 {property.imageUrl && (
//                   <div className="mb-4 relative overflow-hidden rounded-lg">
//                     <img
//                       src={property.imageUrl || "/placeholder.svg"}
//                       alt={getPropertyName(property)}
//                       className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
//                   </div>
//                 )}

//                 <h4 className="font-bold text-gray-900 mb-2 text-lg">
//                   {getPropertyName(property)}
//                 </h4>

//                 {property.description && (
//                   <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
//                     {property.description}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <button
//                     onClick={() => handleViewProperty(property)}
//                     className="flex-1 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="View Details"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span className="text-xs font-medium">View</span>
//                   </button>
//                   <button
//                     onClick={() => handleEditProperty(property)}
//                     className="flex-1 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Edit"
//                   >
//                     <Edit className="w-4 h-4" />
//                     <span className="text-xs font-medium">Edit</span>
//                   </button>
//                   <button
//                     className="flex-1 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     <span className="text-xs font-medium">Delete</span>
//                   </button>
//                 </div>
//               </div>
//               <div
//                 className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
//               ></div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // Enhanced List View Component
//   const ListView = ({ properties }) => {
//     return (
//       <div className="space-y-4">
//         {properties.map((property, index) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl shadow-md border-2 border-gray-100 group"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-6 flex-1">
//                     <div
//                       className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                     >
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>

//                     {property.imageUrl && (
//                       <div className="relative overflow-hidden rounded-lg">
//                         <img
//                           src={property.imageUrl || "/placeholder.svg"}
//                           alt={getPropertyName(property)}
//                           className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
//                         />
//                       </div>
//                     )}

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h4 className="font-bold text-gray-900 text-lg">
//                           {getPropertyName(property)}
//                         </h4>
//                         <span
//                           className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} ${config.lightColor} border ${config.borderColor}`}
//                         >
//                           {config.name}
//                         </span>
//                       </div>
//                       {property.description && (
//                         <p className="text-sm text-gray-600 leading-relaxed">
//                           {property.description}
//                         </p>
//                       )}
//                       <p className="text-xs text-gray-400 mt-1">
//                         ID: {property[`${property.type}Id`]}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleViewProperty(property)}
//                       className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
//                       title="View Details"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleEditProperty(property)}
//                       className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="w-5 h-5" />
//                     </button>
//                     <button
//                       className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Enhanced Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-5xl font-bold text-gray-900 flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
//                 <Zap className="w-10 h-10 text-white" />
//               </div>
//               Property Flow Manager
//             </h1>
//             <p className="text-gray-600 text-lg ml-16">
//               Manage your property hierarchy with modern visualization and
//               analytics
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
//               title="Refresh Data"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>

//             <select
//               value={selectedContract?.toString() || ""}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-72 px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
//             >
//               <option value="">🏢 Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Enhanced Stats Cards */}
//         {selectedContract && (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
//             {Object.entries(propertyTypeConfig).map(([type, config]) => (
//               <StatsCard
//                 key={type}
//                 type={type}
//                 count={stats[type] || 0}
//                 config={config}
//                 isLoading={loading}
//               />
//             ))}
//             <TotalStatsCard total={stats.total} isLoading={loading} />
//           </div>
//         )}

//         {!selectedContract ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border-2 border-gray-100">
//               <div className="p-12 text-center">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <Building className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   Select a Contract
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Choose a contract from the dropdown above to start managing
//                   your property flow and view detailed analytics
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : loading ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//               </div>
//               <p className="text-gray-600 text-lg font-medium">
//                 Loading property data...
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Please wait while we fetch your properties
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Enhanced Controls */}
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                 <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                   <div className="relative flex-1 max-w-md">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder="Search properties..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
//                     />
//                   </div>

//                   <div className="relative">
//                     <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <select
//                       value={filterType}
//                       onChange={(e) => setFilterType(e.target.value)}
//                       className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium appearance-none"
//                     >
//                       <option value="all">All Types</option>
//                       {Object.entries(propertyTypeConfig).map(
//                         ([type, config]) => (
//                           <option key={type} value={type}>
//                             {config.plural}
//                           </option>
//                         )
//                       )}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setViewMode("tree")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "tree"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <TreePine className="w-4 h-4 mr-2" />
//                     Tree
//                   </button>
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "grid"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <Grid className="w-4 h-4 mr-2" />
//                     Grid
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "list"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <List className="w-4 h-4 mr-2" />
//                     List
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Quick Actions */}
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <Plus className="w-5 h-5 text-blue-600" />
//                 Quick Actions
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {Object.entries(propertyTypeConfig).map(([type, config]) => {
//                   const Icon = config.icon;
//                   return (
//                     <button
//                       key={type}
//                       onClick={() => handleCreateProperty(type)}
//                       className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl ${config.lightColor} ${config.borderColor} ${config.textColor} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       Add {config.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Enhanced Content based on view mode */}
//             {viewMode === "tree" && (
//               <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <TreePine className="w-6 h-6 text-blue-600" />
//                     Property Hierarchy Tree
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Users className="w-4 h-4" />
//                     {treeData.length} nodes
//                   </div>
//                 </div>
//                 {treeData.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                       <MapPin className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">
//                       No Properties Found
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       Start by creating zones for this contract to build your
//                       property hierarchy
//                     </p>
//                     <button
//                       onClick={() => handleCreateProperty("zone")}
//                       className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Create First Zone
//                     </button>
//                   </div>
//                 ) : (
//                   <PropertyFamilyTree
//                     key={`tree-${selectedContract || "no-contract"}`}
//                     data={treeData}
//                     onNodeClick={handleNodeClick}
//                     onNodeEdit={handleNodeEdit}
//                     onNodeDelete={handleNodeDelete}
//                   />
//                 )}
//               </div>
//             )}

//             {viewMode === "grid" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <Grid className="w-6 h-6 text-blue-600" />
//                     Grid View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <BarChart3 className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <GridView properties={allProperties} />
//               </div>
//             )}

//             {viewMode === "list" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <List className="w-6 h-6 text-blue-600" />
//                     List View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Activity className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <ListView properties={allProperties} />
//               </div>
//             )}
//           </>
//         )}

//         {/* Enhanced Modals */}
//         <PropertyFormModal
//           isOpen={showFormModal}
//           onClose={() => setShowFormModal(false)}
//           type={formType}
//           property={editingProperty}
//           onSuccess={() => {
//             setShowFormModal(false);
//             refreshData();
//           }}
//           contracts={contracts}
//           zones={zones}
//           subZones={subZones}
//           buildings={buildings}
//           villaApartments={villaApartments}
//           floors={floors}
//         />

//         <PropertyDetailModal
//           isOpen={showDetailModal}
//           onClose={() => setShowDetailModal(false)}
//           property={selectedProperty}
//         />
//       </div>
//     </div>
//   );
// };

// export default PropertyFlowManagement;
// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Building,
//   Home,
//   MapPin,
//   Layers,
//   DoorOpen,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Grid,
//   List,
//   Zap,
//   Upload,
//   Save,
//   X,
//   User,
//   ImageIcon,
//   TreePine,
//   BarChart3,
//   TrendingUp,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   Calendar,
//   Clock,
//   Users,
//   Activity,
// } from "lucide-react";
// import { usePropertyFlow } from "../context/PropertyFlowContext";
// import { contractService } from "../services/contractService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import * as go from "gojs";

// const propertyTypeConfig = {
//   zone: {
//     icon: MapPin,
//     color: "#3B82F6",
//     lightColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//     textColor: "text-blue-700",
//     bgGradient: "from-blue-500 to-blue-600",
//     name: "Zone",
//     plural: "Zones",
//   },
//   subZone: {
//     icon: Layers,
//     color: "#10B981",
//     lightColor: "bg-emerald-50",
//     borderColor: "border-emerald-200",
//     textColor: "text-emerald-700",
//     bgGradient: "from-emerald-500 to-emerald-600",
//     name: "SubZone",
//     plural: "SubZones",
//   },
//   building: {
//     icon: Building,
//     color: "#8B5CF6",
//     lightColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//     textColor: "text-purple-700",
//     bgGradient: "from-purple-500 to-purple-600",
//     name: "Building",
//     plural: "Buildings",
//   },
//   villaApartment: {
//     icon: Home,
//     color: "#F59E0B",
//     lightColor: "bg-amber-50",
//     borderColor: "border-amber-200",
//     textColor: "text-amber-700",
//     bgGradient: "from-amber-500 to-amber-600",
//     name: "Villa/Apartment",
//     plural: "Villa/Apartments",
//   },
//   floor: {
//     icon: Layers,
//     color: "#6366F1",
//     lightColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//     textColor: "text-indigo-700",
//     bgGradient: "from-indigo-500 to-indigo-600",
//     name: "Floor",
//     plural: "Floors",
//   },
//   room: {
//     icon: DoorOpen,
//     color: "#EF4444",
//     lightColor: "bg-red-50",
//     borderColor: "border-red-200",
//     textColor: "text-red-700",
//     bgGradient: "from-red-500 to-red-600",
//     name: "Room",
//     plural: "Rooms",
//   },
// };

// // StatsCard Component
// const StatsCard = ({ type, count, config, isLoading }) => {
//   const Icon = config.icon;

//   return (
//     <div
//       className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${config.lightColor} border-2 ${config.borderColor}`}
//     >
//       <div className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <p
//               className={`text-sm font-semibold ${config.textColor} uppercase tracking-wide`}
//             >
//               {config.plural}
//             </p>
//             <div className="mt-2">
//               {isLoading ? (
//                 <div className="animate-pulse">
//                   <div className="h-8 bg-gray-200 rounded w-16"></div>
//                 </div>
//               ) : (
//                 <p className="text-3xl font-bold text-gray-900">
//                   {count.toLocaleString()}
//                 </p>
//               )}
//             </div>
//             <div className="mt-2 flex items-center">
//               <TrendingUp className={`w-4 h-4 ${config.textColor} mr-1`} />
//               <span className={`text-xs ${config.textColor} font-medium`}>
//                 Active
//               </span>
//             </div>
//           </div>
//           <div
//             className={`p-3 rounded-full bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//           >
//             <Icon className="w-8 h-8 text-white" />
//           </div>
//         </div>
//       </div>
//       <div
//         className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
//       ></div>
//     </div>
//   );
// };

// // TotalStatsCard Component
// const TotalStatsCard = ({ total, isLoading }) => {
//   return (
//     <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
//       <div className="relative p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide">
//               Total Properties
//             </p>
//             <div className="mt-2">
//               {isLoading ? (
//                 <div className="animate-pulse">
//                   <div className="h-8 bg-gray-200 rounded w-20"></div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-bold text-white">
//                   {total.toLocaleString()}
//                 </p>
//               )}
//             </div>
//             <div className="mt-2 flex items-center">
//               <Activity className="w-4 h-4 text-blue-300 mr-1" />
//               <span className="text-xs text-blue-300 font-medium">
//                 All Types
//               </span>
//             </div>
//           </div>
//           <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
//             <BarChart3 className="w-8 h-8 text-white" />
//           </div>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
//     </div>
//   );
// };

// // PropertyFamilyTree Component
// const PropertyFamilyTree = ({
//   data,
//   onNodeClick,
//   onNodeEdit,
//   onNodeDelete,
// }) => {
//   const diagramRef = useRef(null);
//   const diagramInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!diagramRef.current) return;

//     const $ = go.GraphObject.make;

//     if (diagramInstanceRef.current) {
//       diagramInstanceRef.current.div = null;
//       diagramInstanceRef.current = null;
//     }

//     const diagram = $(go.Diagram, diagramRef.current, {
//       "toolManager.hoverDelay": 100,
//       "toolManager.toolTipDuration": 10000,
//       layout: $(go.TreeLayout, {
//         treeStyle: go.TreeLayout.StyleLastParents,
//         arrangement: go.TreeLayout.ArrangementHorizontal,
//         angle: 90,
//         layerSpacing: 50,
//         alternateAngle: 90,
//         alternateLayerSpacing: 50,
//         alternateAlignment: go.TreeLayout.AlignmentBus,
//         alternateNodeSpacing: 30,
//       }),
//       "undoManager.isEnabled": true,
//       "animationManager.isEnabled": true,
//       "animationManager.duration": 1000,
//       "animationManager.isInitial": false,
//       initialContentAlignment: go.Spot.Center,
//       "grid.visible": true,
//       "grid.gridCellSize": new go.Size(20, 20),
//     });

//     diagram.nodeTemplate = $(
//       go.Node,
//       "Auto",
//       {
//         locationSpot: go.Spot.Center,
//         isShadowed: true,
//         shadowBlur: 3,
//         shadowOffset: new go.Point(2, 2),
//         shadowColor: "rgba(0, 0, 0, .2)",
//         selectionAdornmentTemplate: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, "RoundedRectangle", {
//             fill: null,
//             stroke: "#4F46E5",
//             strokeWidth: 3,
//             strokeDashArray: [5, 5],
//           }),
//           $(go.Placeholder)
//         ),
//       },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
//         go.Point.stringify
//       ),
//       $(
//         go.Shape,
//         "RoundedRectangle",
//         {
//           name: "SHAPE",
//           fill: "white",
//           stroke: "#E5E7EB",
//           strokeWidth: 2,
//           minSize: new go.Size(140, 80),
//         },
//         new go.Binding("fill", "type", (type) => {
//           const config = propertyTypeConfig[type];
//           return config ? config.color + "15" : "#F9FAFB";
//         }),
//         new go.Binding(
//           "stroke",
//           "type",
//           (type) => propertyTypeConfig[type]?.color || "#6B7280"
//         )
//       ),
//       $(
//         go.Panel,
//         "Vertical",
//         { margin: 12 },
//         $(
//           go.Panel,
//           "Horizontal",
//           {
//             alignment: go.Spot.Center,
//             margin: new go.Margin(0, 0, 8, 0),
//             background: "rgba(255,255,255,0.8)",
//             padding: 4,
//           },
//           $(
//             go.TextBlock,
//             {
//               font: "bold 14px sans-serif",
//               margin: new go.Margin(0, 6, 0, 0),
//             },
//             new go.Binding("text", "type", (type) => {
//               const icons = {
//                 zone: "🌍",
//                 subZone: "📍",
//                 building: "🏢",
//                 villaApartment: "🏠",
//                 floor: "🏗️",
//                 room: "🚪",
//               };
//               return icons[type] || "📦";
//             })
//           ),
//           $(
//             go.TextBlock,
//             {
//               font: "bold 10px sans-serif",
//               textAlign: "center",
//             },
//             new go.Binding(
//               "text",
//               "type",
//               (type) => propertyTypeConfig[type]?.name || "Unknown"
//             ),
//             new go.Binding(
//               "stroke",
//               "type",
//               (type) => propertyTypeConfig[type]?.color || "#6B7280"
//             )
//           )
//         ),
//         $(
//           go.TextBlock,
//           {
//             font: "bold 14px sans-serif",
//             stroke: "#1F2937",
//             maxSize: new go.Size(120, Number.NaN),
//             wrap: go.TextBlock.WrapFit,
//             textAlign: "center",
//             margin: new go.Margin(0, 0, 4, 0),
//           },
//           new go.Binding("text", "name")
//         ),
//         $(
//           go.TextBlock,
//           {
//             font: "10px sans-serif",
//             stroke: "#6B7280",
//             textAlign: "center",
//           },
//           new go.Binding("text", "id", (id) => `ID: ${id}`)
//         )
//       ),
//       {
//         toolTip: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, {
//             fill: "#1F2937",
//             stroke: "#374151",
//           }),
//           $(
//             go.Panel,
//             "Vertical",
//             { margin: 12 },
//             $(
//               go.TextBlock,
//               {
//                 font: "bold 14px sans-serif",
//                 stroke: "white",
//                 margin: new go.Margin(0, 0, 4, 0),
//               },
//               new go.Binding("text", "name")
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding(
//                 "text",
//                 "type",
//                 (type) => `Type: ${propertyTypeConfig[type]?.name || "Unknown"}`
//               )
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding("text", "id", (id) => `ID: ${id}`)
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//                 maxSize: new go.Size(200, Number.NaN),
//                 wrap: go.TextBlock.WrapFit,
//               },
//               new go.Binding("text", "description", (desc) =>
//                 desc ? `Description: ${desc}` : ""
//               ),
//               new go.Binding("visible", "description", (desc) => !!desc)
//             )
//           )
//         ),
//       },
//       {
//         click: (e, node) => {
//           const data = node.data;
//           if (onNodeClick) onNodeClick(data);
//         },
//         doubleClick: (e, node) => {
//           const data = node.data;
//           if (onNodeEdit) onNodeEdit(data);
//         },
//       }
//     );

//     diagram.linkTemplate = $(
//       go.Link,
//       {
//         routing: go.Link.Orthogonal,
//         corner: 8,
//         selectable: false,
//       },
//       $(go.Shape, {
//         strokeWidth: 3,
//         stroke: "#D1D5DB",
//         strokeDashArray: [8, 4],
//       }),
//       $(go.Shape, {
//         toArrow: "Standard",
//         fill: "#9CA3AF",
//         stroke: "#9CA3AF",
//         scale: 1.2,
//       })
//     );

//     diagram.nodeTemplate.contextMenu = $(
//       go.Adornment,
//       "Vertical",
//       { background: "white", shadowBlur: 8 },
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "👁️ View Details", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeClick) onNodeClick(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "✏️ Edit", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeEdit) onNodeEdit(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "🗑️ Delete", {
//           font: "12px sans-serif",
//           margin: 8,
//           stroke: "#EF4444",
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeDelete) onNodeDelete(data);
//           },
//         }
//       )
//     );

//     diagramInstanceRef.current = diagram;

//     return () => {
//       if (diagramInstanceRef.current) {
//         diagramInstanceRef.current.div = null;
//         diagramInstanceRef.current = null;
//       }
//     };
//   }, [onNodeClick, onNodeEdit, onNodeDelete]);

//   useEffect(() => {
//     if (diagramInstanceRef.current && data && data.length > 0) {
//       try {
//         const diagram = diagramInstanceRef.current;
//         diagram.model = new go.TreeModel(data);
//       } catch (error) {
//         console.error("Error setting GoJS model:", error);
//       }
//     }
//   }, [data]);

//   return (
//     <div
//       ref={diagramRef}
//       className="w-full h-96 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner"
//       style={{ minHeight: "500px" }}
//     />
//   );
// };

// // PropertyFormModal Component
// const PropertyFormModal = ({
//   isOpen,
//   onClose,
//   type,
//   property,
//   onSuccess,
//   contracts,
//   zones,
//   subZones,
//   buildings,
//   villaApartments,
//   floors,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const isEdit = !!property;
//   const config = propertyTypeConfig[type] || propertyTypeConfig.zone;

//   useEffect(() => {
//     if (isOpen) {
//       resetForm();
//     }
//   }, [isOpen, type, property]);

//   const resetForm = () => {
//     if (property) {
//       setFormData({ ...property });
//       setImagePreview(property.imageUrl);
//     } else {
//       setFormData({
//         contractId: "",
//         description: "",
//         ...getDefaultFields(type),
//       });
//       setImagePreview(null);
//     }
//     setImageFile(null);
//     setErrors({});
//   };

//   const getDefaultFields = (type) => {
//     const fields = {
//       zone: { zoneName: "" },
//       subZone: { subZoneName: "", zoneId: "" },
//       building: { buildingName: "", subZoneId: "" },
//       villaApartment: { villaApartmentName: "", buildingId: "" },
//       floor: { floorName: "", villaApartmentId: "" },
//       room: { roomName: "", floorId: "" },
//     };
//     return fields[type] || {};
//   };

//   const getParentOptions = () => {
//     switch (type) {
//       case "subZone":
//         return zones.filter(
//           (z) => z.contractId.toString() === formData.contractId
//         );
//       case "building":
//         return subZones.filter(
//           (s) => s.contractId.toString() === formData.contractId
//         );
//       case "villaApartment":
//         return buildings.filter(
//           (b) => b.contractId.toString() === formData.contractId
//         );
//       case "floor":
//         return villaApartments.filter(
//           (v) => v.contractId.toString() === formData.contractId
//         );
//       case "room":
//         return floors.filter(
//           (f) => f.contractId.toString() === formData.contractId
//         );
//       default:
//         return [];
//     }
//   };

//   const getParentFieldName = () => {
//     const parentFields = {
//       subZone: "zoneId",
//       building: "subZoneId",
//       villaApartment: "buildingId",
//       floor: "villaApartmentId",
//       room: "floorId",
//     };
//     return parentFields[type];
//   };

//   const getParentDisplayName = () => {
//     const parentNames = {
//       subZone: "Zone",
//       building: "SubZone",
//       villaApartment: "Building",
//       floor: "Villa/Apartment",
//       room: "Floor",
//     };
//     return parentNames[type];
//   };

//   const getParentItemName = (item) => {
//     const nameFields = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//     };

//     const parentType = {
//       subZone: "zone",
//       building: "subZone",
//       villaApartment: "building",
//       floor: "villaApartment",
//       room: "floor",
//     }[type];

//     return item[nameFields[parentType]] || "Unknown";
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (field === "contractId") {
//       const parentField = getParentFieldName();
//       if (parentField) {
//         setFormData((prev) => ({
//           ...prev,
//           [parentField]: "",
//         }));
//       }
//     }

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: null,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameField = `${type}Name`;
//     if (!formData[nameField]?.trim()) {
//       newErrors[nameField] = "Name is required";
//     }

//     if (!formData.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     const parentField = getParentFieldName();
//     if (parentField && !formData[parentField]) {
//       newErrors[parentField] = `${getParentDisplayName()} is required`;
//     }

//     if (!isEdit && !imageFile) {
//       newErrors.image = "Image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const serviceMethod = isEdit
//         ? propertyFlowService[
//             `update${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ]
//         : propertyFlowService[
//             `create${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ];

//       if (isEdit) {
//         const idField = `${type}Id`;
//         await serviceMethod(property[idField], formData, imageFile);
//       } else {
//         await serviceMethod(formData, imageFile);
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("Error saving property:", error);
//       setErrors({ submit: "Failed to save property. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTitle = () => {
//     const typeNames = {
//       zone: "Zone",
//       subZone: "SubZone",
//       building: "Building",
//       villaApartment: "Villa/Apartment",
//       floor: "Floor",
//       room: "Room",
//     };

//     return `${isEdit ? "Edit" : "Create"} ${typeNames[type]}`;
//   };

//   const nameField = `${type}Name`;
//   const parentField = getParentFieldName();
//   const parentOptions = getParentOptions();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <config.icon className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Building className="w-4 h-4" />
//               Contract *
//             </label>
//             <select
//               value={formData.contractId?.toString() || ""}
//               onChange={(e) => handleInputChange("contractId", e.target.value)}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors.contractId ? "border-red-500" : "border-gray-200"
//               }`}
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//             {errors.contractId && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.contractId}
//               </p>
//             )}
//           </div>

//           {parentField && (
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                 <Layers className="w-4 h-4" />
//                 {getParentDisplayName()} *
//               </label>
//               <select
//                 value={formData[parentField]?.toString() || ""}
//                 onChange={(e) => handleInputChange(parentField, e.target.value)}
//                 disabled={!formData.contractId}
//                 className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all ${
//                   errors[parentField] ? "border-red-500" : "border-gray-200"
//                 }`}
//               >
//                 <option value="">
//                   Select a {getParentDisplayName().toLowerCase()}
//                 </option>
//                 {parentOptions.map((option) => {
//                   const idField = `${
//                     type === "subZone"
//                       ? "zone"
//                       : type === "building"
//                       ? "subZone"
//                       : type === "villaApartment"
//                       ? "building"
//                       : type === "floor"
//                       ? "villaApartment"
//                       : "floor"
//                   }Id`;
//                   return (
//                     <option
//                       key={option[idField]}
//                       value={option[idField].toString()}
//                     >
//                       {getParentItemName(option)}
//                     </option>
//                   );
//                 })}
//               </select>
//               {errors[parentField] && (
//                 <p className="text-sm text-red-500 flex items-center gap-1">
//                   <X className="w-4 h-4" />
//                   {errors[parentField]}
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Name *
//             </label>
//             <input
//               type="text"
//               value={formData[nameField] || ""}
//               onChange={(e) => handleInputChange(nameField, e.target.value)}
//               placeholder={`Enter ${type} name`}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors[nameField] ? "border-red-500" : "border-gray-200"
//               }`}
//             />
//             {errors[nameField] && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors[nameField]}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Description
//             </label>
//             <textarea
//               value={formData.description || ""}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               placeholder={`Enter ${type} description`}
//               rows={3}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <ImageIcon className="w-4 h-4" />
//               Image {!isEdit && "*"}
//             </label>
//             <div
//               className={`border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50 ${
//                 errors.image ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             >
//               {imagePreview ? (
//                 <div className="space-y-4">
//                   <div className="relative inline-block">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                       <Edit className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       document.getElementById("image-upload").click()
//                     }
//                     className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                   >
//                     <Upload className="w-4 h-4 mr-2" />
//                     Change Image
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                     <Upload className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         document.getElementById("image-upload").click()
//                       }
//                       className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Choose Image
//                     </button>
//                     <p className="text-sm text-gray-500 mt-3">
//                       Upload an image for this {type}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       PNG, JPG up to 10MB
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             {errors.image && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.image}
//               </p>
//             )}
//           </div>

//           {errors.submit && (
//             <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <X className="w-4 h-4" />
//                 {errors.submit}
//               </p>
//             </div>
//           )}

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r ${config.bgGradient} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105`}
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Save className="w-4 h-4" />
//                   {isEdit ? "Update" : "Create"}{" "}
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </div>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // PropertyDetailModal Component
// const PropertyDetailModal = ({ isOpen, onClose, property }) => {
//   if (!property || !isOpen) return null;

//   const config = propertyTypeConfig[property.type];
//   const Icon = config.icon;

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyId = (property) => {
//     return property[`${property.type}Id`];
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-white bg-opacity-20 rounded-xl">
//                 <Icon className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   {config.name} Details
//                 </h2>
//                 <p className="text-blue-100 text-sm">
//                   {getPropertyName(property)}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <User className="w-5 h-5 text-blue-600" />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Name
//                   </label>
//                   <p className="text-xl font-bold text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyName(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Type
//                   </label>
//                   <div className="bg-white p-3 rounded-lg border">
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.lightColor} ${config.textColor} border ${config.borderColor}`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       {config.name}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyId(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Contract ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {property.contractId}
//                   </p>
//                 </div>
//               </div>

//               {property.description && (
//                 <div className="mt-6 space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Description
//                   </label>
//                   <p className="text-gray-900 bg-white p-4 rounded-lg border-2 border-gray-100 leading-relaxed">
//                     {property.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <ImageIcon className="w-5 h-5 text-blue-600" />
//                 Image
//               </h3>
//               {property.imageUrl ? (
//                 <div className="relative group">
//                   <img
//                     src={property.imageUrl || "/placeholder.svg"}
//                     alt={getPropertyName(property)}
//                     className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                     <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
//                   <div className="text-center">
//                     <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500 font-medium">
//                       No image available
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <Layers className="w-5 h-5 text-blue-600" />
//                 Hierarchy Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {property.zoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <MapPin className="w-4 h-4" />
//                       Zone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.zoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.subZoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       SubZone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.subZoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.buildingId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Building className="w-4 h-4" />
//                       Building ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.buildingId}
//                     </p>
//                   </div>
//                 )}

//                 {property.villaApartmentId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Home className="w-4 h-4" />
//                       Villa/Apartment ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.villaApartmentId}
//                     </p>
//                   </div>
//                 )}

//                 {property.floorId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       Floor ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.floorId}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {(property.createdAt || property.updatedAt) && (
//             <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   Metadata
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {property.createdAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Calendar className="w-4 h-4" />
//                         Created Date
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}

//                   {property.updatedAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         Last Updated
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.updatedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main PropertyFlowManagement Component
// const PropertyFlowManagement = () => {
//   const {
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//     setSelectedContract,
//     loading,
//     refreshData,
//   } = usePropertyFlow();

//   const [contracts, setContracts] = useState([]);
//   const [viewMode, setViewMode] = useState("tree");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [formType, setFormType] = useState("zone");
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   useEffect(() => {
//     console.log("PropertyFlow Context Data:", {
//       zones,
//       subZones,
//       buildings,
//       villaApartments,
//       floors,
//       rooms,
//       selectedContract,
//     });
//   }, [
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//   ]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await refreshData();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   const buildTreeData = () => {
//     const treeData = [];
//     if (!selectedContract) return treeData;

//     zones
//       .filter((z) => z.contractId?.toString() === selectedContract?.toString())
//       .forEach((zone) => {
//         const zoneNode = {
//           key: `zone-${zone.zoneId}`,
//           name: zone.zoneName || "Unnamed Zone",
//           type: "zone",
//           id: zone.zoneId,
//           description: zone.description,
//           imageUrl: zone.imageUrl,
//           contractId: zone.contractId,
//           ...zone,
//         };
//         treeData.push(zoneNode);

//         subZones
//           .filter(
//             (sz) =>
//               sz.zoneId === zone.zoneId &&
//               sz.contractId?.toString() === selectedContract?.toString()
//           )
//           .forEach((subZone) => {
//             const subZoneNode = {
//               key: `subZone-${subZone.subZoneId}`,
//               parent: `zone-${zone.zoneId}`,
//               name: subZone.subZoneName || "Unnamed SubZone",
//               type: "subZone",
//               id: subZone.subZoneId,
//               description: subZone.description,
//               imageUrl: subZone.imageUrl,
//               contractId: subZone.contractId,
//               ...subZone,
//             };
//             treeData.push(subZoneNode);

//             buildings
//               .filter(
//                 (b) =>
//                   b.subZoneId === subZone.subZoneId &&
//                   b.contractId?.toString() === selectedContract?.toString()
//               )
//               .forEach((building) => {
//                 const buildingNode = {
//                   key: `building-${building.buildingId}`,
//                   parent: `subZone-${subZone.subZoneId}`,
//                   name: building.buildingName || "Unnamed Building",
//                   type: "building",
//                   id: building.buildingId,
//                   description: building.description,
//                   imageUrl: building.imageUrl,
//                   contractId: building.contractId,
//                   ...building,
//                 };
//                 treeData.push(buildingNode);

//                 villaApartments
//                   .filter(
//                     (va) =>
//                       va.buildingId === building.buildingId &&
//                       va.contractId?.toString() === selectedContract?.toString()
//                   )
//                   .forEach((villaApartment) => {
//                     const vaNode = {
//                       key: `villaApartment-${villaApartment.villaApartmentId}`,
//                       parent: `building-${building.buildingId}`,
//                       name:
//                         villaApartment.villaApartmentName ||
//                         "Unnamed Villa/Apartment",
//                       type: "villaApartment",
//                       id: villaApartment.villaApartmentId,
//                       description: villaApartment.description,
//                       imageUrl: villaApartment.imageUrl,
//                       contractId: villaApartment.contractId,
//                       ...villaApartment,
//                     };
//                     treeData.push(vaNode);

//                     floors
//                       .filter(
//                         (f) =>
//                           f.villaApartmentId ===
//                             villaApartment.villaApartmentId &&
//                           f.contractId?.toString() ===
//                             selectedContract?.toString()
//                       )
//                       .forEach((floor) => {
//                         const floorNode = {
//                           key: `floor-${floor.floorId}`,
//                           parent: `villaApartment-${villaApartment.villaApartmentId}`,
//                           name: floor.floorName || "Unnamed Floor",
//                           type: "floor",
//                           id: floor.floorId,
//                           description: floor.description,
//                           imageUrl: floor.imageUrl,
//                           contractId: floor.contractId,
//                           ...floor,
//                         };
//                         treeData.push(floorNode);

//                         rooms
//                           .filter(
//                             (r) =>
//                               r.floorId === floor.floorId &&
//                               r.contractId?.toString() ===
//                                 selectedContract?.toString()
//                           )
//                           .forEach((room) => {
//                             const roomNode = {
//                               key: `room-${room.roomId}`,
//                               parent: `floor-${floor.floorId}`,
//                               name: room.roomName || "Unnamed Room",
//                               type: "room",
//                               id: room.roomId,
//                               description: room.description,
//                               imageUrl: room.imageUrl,
//                               contractId: room.contractId,
//                               ...room,
//                             };
//                             treeData.push(roomNode);
//                           });
//                       });
//                   });
//               });
//           });
//       });
//     return treeData;
//   };

//   const getAllProperties = () => {
//     if (!selectedContract) return [];

//     const allProperties = [
//       ...zones.map((z) => ({ ...z, type: "zone" })),
//       ...subZones.map((s) => ({ ...s, type: "subZone" })),
//       ...buildings.map((b) => ({ ...b, type: "building" })),
//       ...villaApartments.map((v) => ({ ...v, type: "villaApartment" })),
//       ...floors.map((f) => ({ ...f, type: "floor" })),
//       ...rooms.map((r) => ({ ...r, type: "room" })),
//     ].filter(
//       (property) =>
//         property.contractId?.toString() === selectedContract?.toString()
//     );

//     return allProperties.filter((property) => {
//       const matchesSearch = getPropertyName(property)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesFilter =
//         filterType === "all" || property.type === filterType;
//       return matchesSearch && matchesFilter;
//     });
//   };

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyStats = () => {
//     const filteredZones = zones.filter(
//       (z) => z.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredSubZones = subZones.filter(
//       (s) => s.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredBuildings = buildings.filter(
//       (b) => b.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredVillaApartments = villaApartments.filter(
//       (v) => v.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredFloors = floors.filter(
//       (f) => f.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredRooms = rooms.filter(
//       (r) => r.contractId?.toString() === selectedContract?.toString()
//     );

//     const stats = {
//       zones: filteredZones.length,
//       subZones: filteredSubZones.length,
//       buildings: filteredBuildings.length,
//       villaApartments: filteredVillaApartments.length,
//       floors: filteredFloors.length,
//       rooms: filteredRooms.length,
//       total:
//         filteredZones.length +
//         filteredSubZones.length +
//         filteredBuildings.length +
//         filteredVillaApartments.length +
//         filteredFloors.length +
//         filteredRooms.length,
//     };
//     console.log("Filtered Property Stats:", stats);
//     return stats;
//   };

//   const handleCreateProperty = (type) => {
//     setFormType(type);
//     setEditingProperty(null);
//     setShowFormModal(true);
//   };

//   const handleEditProperty = (property) => {
//     setFormType(property.type);
//     setEditingProperty(property);
//     setShowFormModal(true);
//   };

//   const handleViewProperty = (property) => {
//     setSelectedProperty(property);
//     setShowDetailModal(true);
//   };

//   const handleNodeClick = (nodeData) => {
//     handleViewProperty(nodeData);
//   };

//   const handleNodeEdit = (nodeData) => {
//     handleEditProperty(nodeData);
//   };

//   const handleNodeDelete = (nodeData) => {
//     console.log("Delete node:", nodeData);
//   };

//   const stats = getPropertyStats();
//   const treeData = buildTreeData();
//   const allProperties = getAllProperties();

//   // GridView Component
//   const GridView = ({ properties }) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {properties.map((property) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${config.lightColor} border-2 ${config.borderColor} group`}
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div
//                     className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                   >
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <span
//                     className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} bg-white border ${config.borderColor} shadow-sm`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 {property.imageUrl && (
//                   <div className="mb-4 relative overflow-hidden rounded-lg">
//                     <img
//                       src={property.imageUrl || "/placeholder.svg"}
//                       alt={getPropertyName(property)}
//                       className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
//                   </div>
//                 )}

//                 <h4 className="font-bold text-gray-900 mb-2 text-lg">
//                   {getPropertyName(property)}
//                 </h4>

//                 {property.description && (
//                   <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
//                     {property.description}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <button
//                     onClick={() => handleViewProperty(property)}
//                     className="flex-1 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="View Details"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span className="text-xs font-medium">View</span>
//                   </button>
//                   <button
//                     onClick={() => handleEditProperty(property)}
//                     className="flex-1 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Edit"
//                   >
//                     <Edit className="w-4 h-4" />
//                     <span className="text-xs font-medium">Edit</span>
//                   </button>
//                   <button
//                     className="flex-1 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     <span className="text-xs font-medium">Delete</span>
//                   </button>
//                 </div>
//               </div>
//               <div
//                 className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
//               ></div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ListView Component
//   const ListView = ({ properties }) => {
//     return (
//       <div className="space-y-4">
//         {properties.map((property) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl shadow-md border-2 border-gray-100 group"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-6 flex-1">
//                     <div
//                       className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                     >
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>

//                     {property.imageUrl && (
//                       <div className="relative overflow-hidden rounded-lg">
//                         <img
//                           src={property.imageUrl || "/placeholder.svg"}
//                           alt={getPropertyName(property)}
//                           className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
//                         />
//                       </div>
//                     )}

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h4 className="font-bold text-gray-900 text-lg">
//                           {getPropertyName(property)}
//                         </h4>
//                         <span
//                           className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} ${config.lightColor} border ${config.borderColor}`}
//                         >
//                           {config.name}
//                         </span>
//                       </div>
//                       {property.description && (
//                         <p className="text-sm text-gray-600 leading-relaxed">
//                           {property.description}
//                         </p>
//                       )}
//                       <p className="text-xs text-gray-400 mt-1">
//                         ID: {property[`${property.type}Id`]}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleViewProperty(property)}
//                       className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
//                       title="View Details"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleEditProperty(property)}
//                       className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="w-5 h-5" />
//                     </button>
//                     <button
//                       className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-5xl font-bold text-gray-900 flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
//                 <Zap className="w-10 h-10 text-white" />
//               </div>
//               Property Flow Manager
//             </h1>
//             <p className="text-gray-600 text-lg ml-16">
//               Manage your property hierarchy with modern visualization and
//               analytics
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
//               title="Refresh Data"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>

//             <select
//               value={selectedContract?.toString() || ""}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-72 px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
//             >
//               <option value="">🏢 Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {selectedContract && (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
//             {Object.entries(propertyTypeConfig).map(([type, config]) => (
//               <StatsCard
//                 key={type}
//                 type={type}
//                 count={stats[type] || 0}
//                 config={config}
//                 isLoading={loading}
//               />
//             ))}
//             <TotalStatsCard total={stats.total} isLoading={loading} />
//           </div>
//         )}

//         {!selectedContract ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border-2 border-gray-100">
//               <div className="p-12 text-center">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <Building className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   Select a Contract
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Choose a contract from the dropdown above to start managing
//                   your property flow and view detailed analytics
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : loading ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//               </div>
//               <p className="text-gray-600 text-lg font-medium">
//                 Loading property data...
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Please wait while we fetch your properties
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                 <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                   <div className="relative flex-1 max-w-md">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder="Search properties..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
//                     />
//                   </div>

//                   <div className="relative">
//                     <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <select
//                       value={filterType}
//                       onChange={(e) => setFilterType(e.target.value)}
//                       className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium appearance-none"
//                     >
//                       <option value="all">All Types</option>
//                       {Object.entries(propertyTypeConfig).map(
//                         ([type, config]) => (
//                           <option key={type} value={type}>
//                             {config.plural}
//                           </option>
//                         )
//                       )}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setViewMode("tree")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "tree"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <TreePine className="w-4 h-4 mr-2" />
//                     Tree
//                   </button>
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "grid"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <Grid className="w-4 h-4 mr-2" />
//                     Grid
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "list"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <List className="w-4 h-4 mr-2" />
//                     List
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <Plus className="w-5 h-5 text-blue-600" />
//                 Quick Actions
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {Object.entries(propertyTypeConfig).map(([type, config]) => {
//                   const Icon = config.icon;
//                   return (
//                     <button
//                       key={type}
//                       onClick={() => handleCreateProperty(type)}
//                       className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl ${config.lightColor} ${config.borderColor} ${config.textColor} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       Add {config.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {viewMode === "tree" && (
//               <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <TreePine className="w-6 h-6 text-blue-600" />
//                     Property Hierarchy Tree
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Users className="w-4 h-4" />
//                     {treeData.length} nodes
//                   </div>
//                 </div>
//                 {treeData.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                       <MapPin className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">
//                       No Properties Found
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       Start by creating zones for this contract to build your
//                       property hierarchy
//                     </p>
//                     <button
//                       onClick={() => handleCreateProperty("zone")}
//                       className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Create First Zone
//                     </button>
//                   </div>
//                 ) : (
//                   <PropertyFamilyTree
//                     key={`tree-${selectedContract || "no-contract"}`}
//                     data={treeData}
//                     onNodeClick={handleNodeClick}
//                     onNodeEdit={handleNodeEdit}
//                     onNodeDelete={handleNodeDelete}
//                   />
//                 )}
//               </div>
//             )}

//             {viewMode === "grid" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <Grid className="w-6 h-6 text-blue-600" />
//                     Grid View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <BarChart3 className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <GridView properties={allProperties} />
//               </div>
//             )}

//             {viewMode === "list" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <List className="w-6 h-6 text-blue-600" />
//                     List View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Activity className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <ListView properties={allProperties} />
//               </div>
//             )}
//           </>
//         )}

//         <PropertyFormModal
//           isOpen={showFormModal}
//           onClose={() => setShowFormModal(false)}
//           type={formType}
//           property={editingProperty}
//           onSuccess={() => {
//             setShowFormModal(false);
//             refreshData();
//           }}
//           contracts={contracts}
//           zones={zones}
//           subZones={subZones}
//           buildings={buildings}
//           villaApartments={villaApartments}
//           floors={floors}
//         />

//         <PropertyDetailModal
//           isOpen={showDetailModal}
//           onClose={() => setShowDetailModal(false)}
//           property={selectedProperty}
//         />
//       </div>
//     </div>
//   );
// };

// export default PropertyFlowManagement;

// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Building,
//   Home,
//   MapPin,
//   Layers,
//   DoorOpen,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Grid,
//   List,
//   Zap,
//   Upload,
//   Save,
//   X,
//   User,
//   ImageIcon,
//   TreePine,
//   BarChart3,
//   TrendingUp,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   Calendar,
//   Clock,
//   Users,
//   Activity,
// } from "lucide-react";
// import { usePropertyFlow } from "../context/PropertyFlowContext";
// import { contractService } from "../services/contractService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import * as go from "gojs";

// const propertyTypeConfig = {
//   zone: {
//     icon: MapPin,
//     color: "#3B82F6",
//     lightColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//     textColor: "text-blue-700",
//     bgGradient: "from-blue-500 to-blue-600",
//     name: "Zone",
//     plural: "Zones",
//   },
//   subZone: {
//     icon: Layers,
//     color: "#10B981",
//     lightColor: "bg-emerald-50",
//     borderColor: "border-emerald-200",
//     textColor: "text-emerald-700",
//     bgGradient: "from-emerald-500 to-emerald-600",
//     name: "SubZone",
//     plural: "SubZones",
//   },
//   building: {
//     icon: Building,
//     color: "#8B5CF6",
//     lightColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//     textColor: "text-purple-700",
//     bgGradient: "from-purple-500 to-purple-600",
//     name: "Building",
//     plural: "Buildings",
//   },
//   villaApartment: {
//     icon: Home,
//     color: "#F59E0B",
//     lightColor: "bg-amber-50",
//     borderColor: "border-amber-200",
//     textColor: "text-amber-700",
//     bgGradient: "from-amber-500 to-amber-600",
//     name: "Villa/Apartment",
//     plural: "Villa/Apartments",
//   },
//   floor: {
//     icon: Layers,
//     color: "#6366F1",
//     lightColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//     textColor: "text-indigo-700",
//     bgGradient: "from-indigo-500 to-indigo-600",
//     name: "Floor",
//     plural: "Floors",
//   },
//   room: {
//     icon: DoorOpen,
//     color: "#EF4444",
//     lightColor: "bg-red-50",
//     borderColor: "border-red-200",
//     textColor: "text-red-700",
//     bgGradient: "from-red-500 to-red-600",
//     name: "Room",
//     plural: "Rooms",
//   },
// };

// // StatsCard Component
// const StatsCard = ({ type, count, config, isLoading }) => {
//   const Icon = config.icon;

//   return (
//     <div
//       className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${config.lightColor} border-2 ${config.borderColor}`}
//     >
//       <div className="p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <p
//               className={`text-sm font-semibold ${config.textColor} uppercase tracking-wide`}
//             >
//               {config.plural}
//             </p>
//             <div className="mt-2">
//               {isLoading ? (
//                 <div className="animate-pulse">
//                   <div className="h-8 bg-gray-200 rounded w-16"></div>
//                 </div>
//               ) : (
//                 <p className="text-3xl font-bold text-gray-900">
//                   {count.toLocaleString()}
//                 </p>
//               )}
//             </div>
//             <div className="mt-2 flex items-center">
//               <TrendingUp className={`w-4 h-4 ${config.textColor} mr-1`} />
//               <span className={`text-xs ${config.textColor} font-medium`}>
//                 Active
//               </span>
//             </div>
//           </div>
//           <div
//             className={`p-3 rounded-full bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//           >
//             <Icon className="w-8 h-8 text-white" />
//           </div>
//         </div>
//       </div>
//       <div
//         className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
//       ></div>
//     </div>
//   );
// };

// // TotalStatsCard Component
// const TotalStatsCard = ({ total, isLoading }) => {
//   return (
//     <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
//       <div className="relative p-6">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide">
//               Total Properties
//             </p>
//             <div className="mt-2">
//               {isLoading ? (
//                 <div className="animate-pulse">
//                   <div className="h-8 bg-gray-200 rounded w-20"></div>
//                 </div>
//               ) : (
//                 <p className="text-4xl font-bold text-white">
//                   {total.toLocaleString()}
//                 </p>
//               )}
//             </div>
//             <div className="mt-2 flex items-center">
//               <Activity className="w-4 h-4 text-blue-300 mr-1" />
//               <span className="text-xs text-blue-300 font-medium">
//                 All Types
//               </span>
//             </div>
//           </div>
//           <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
//             <BarChart3 className="w-8 h-8 text-white" />
//           </div>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
//     </div>
//   );
// };

// // PropertyFamilyTree Component
// const PropertyFamilyTree = ({
//   data,
//   onNodeClick,
//   onNodeEdit,
//   onNodeDelete,
// }) => {
//   const diagramRef = useRef(null);
//   const diagramInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!diagramRef.current) return;

//     const $ = go.GraphObject.make;

//     if (diagramInstanceRef.current) {
//       diagramInstanceRef.current.div = null;
//       diagramInstanceRef.current = null;
//     }

//     const diagram = $(go.Diagram, diagramRef.current, {
//       "toolManager.hoverDelay": 100,
//       "toolManager.toolTipDuration": 10000,
//       layout: $(go.TreeLayout, {
//         treeStyle: go.TreeLayout.StyleLastParents,
//         arrangement: go.TreeLayout.ArrangementHorizontal,
//         angle: 90,
//         layerSpacing: 50,
//         alternateAngle: 90,
//         alternateLayerSpacing: 50,
//         alternateAlignment: go.TreeLayout.AlignmentBus,
//         alternateNodeSpacing: 30,
//       }),
//       "undoManager.isEnabled": true,
//       "animationManager.isEnabled": true,
//       "animationManager.duration": 1000,
//       "animationManager.isInitial": false,
//       initialContentAlignment: go.Spot.Center,
//       "grid.visible": true,
//       "grid.gridCellSize": new go.Size(20, 20),
//     });

//     diagram.nodeTemplate = $(
//       go.Node,
//       "Auto",
//       {
//         locationSpot: go.Spot.Center,
//         isShadowed: true,
//         shadowBlur: 3,
//         shadowOffset: new go.Point(2, 2),
//         shadowColor: "rgba(0, 0, 0, .2)",
//         selectionAdornmentTemplate: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, "RoundedRectangle", {
//             fill: null,
//             stroke: "#4F46E5",
//             strokeWidth: 3,
//             strokeDashArray: [5, 5],
//           }),
//           $(go.Placeholder)
//         ),
//       },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
//         go.Point.stringify
//       ),
//       $(
//         go.Shape,
//         "RoundedRectangle",
//         {
//           name: "SHAPE",
//           fill: "white",
//           stroke: "#E5E7EB",
//           strokeWidth: 2,
//           minSize: new go.Size(140, 80),
//         },
//         new go.Binding("fill", "type", (type) => {
//           const config = propertyTypeConfig[type];
//           return config ? config.color + "15" : "#F9FAFB";
//         }),
//         new go.Binding(
//           "stroke",
//           "type",
//           (type) => propertyTypeConfig[type]?.color || "#6B7280"
//         )
//       ),
//       $(
//         go.Panel,
//         "Vertical",
//         { margin: 12 },
//         $(
//           go.Panel,
//           "Horizontal",
//           {
//             alignment: go.Spot.Center,
//             margin: new go.Margin(0, 0, 8, 0),
//             background: "rgba(255,255,255,0.8)",
//             padding: 4,
//           },
//           $(
//             go.TextBlock,
//             {
//               font: "bold 14px sans-serif",
//               margin: new go.Margin(0, 6, 0, 0),
//             },
//             new go.Binding("text", "type", (type) => {
//               const icons = {
//                 zone: "🌍",
//                 subZone: "📍",
//                 building: "🏢",
//                 villaApartment: "🏠",
//                 floor: "🏗️",
//                 room: "🚪",
//               };
//               return icons[type] || "📦";
//             })
//           ),
//           $(
//             go.TextBlock,
//             {
//               font: "bold 10px sans-serif",
//               textAlign: "center",
//             },
//             new go.Binding(
//               "text",
//               "type",
//               (type) => propertyTypeConfig[type]?.name || "Unknown"
//             ),
//             new go.Binding(
//               "stroke",
//               "type",
//               (type) => propertyTypeConfig[type]?.color || "#6B7280"
//             )
//           )
//         ),
//         $(
//           go.TextBlock,
//           {
//             font: "bold 14px sans-serif",
//             stroke: "#1F2937",
//             maxSize: new go.Size(120, Number.NaN),
//             wrap: go.TextBlock.WrapFit,
//             textAlign: "center",
//             margin: new go.Margin(0, 0, 4, 0),
//           },
//           new go.Binding("text", "name")
//         ),
//         $(
//           go.TextBlock,
//           {
//             font: "10px sans-serif",
//             stroke: "#6B7280",
//             textAlign: "center",
//           },
//           new go.Binding("text", "id", (id) => `ID: ${id}`)
//         )
//       ),
//       {
//         toolTip: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, {
//             fill: "#1F2937",
//             stroke: "#374151",
//           }),
//           $(
//             go.Panel,
//             "Vertical",
//             { margin: 12 },
//             $(
//               go.TextBlock,
//               {
//                 font: "bold 14px sans-serif",
//                 stroke: "white",
//                 margin: new go.Margin(0, 0, 4, 0),
//               },
//               new go.Binding("text", "name")
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding(
//                 "text",
//                 "type",
//                 (type) => `Type: ${propertyTypeConfig[type]?.name || "Unknown"}`
//               )
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding("text", "id", (id) => `ID: ${id}`)
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//                 maxSize: new go.Size(200, Number.NaN),
//                 wrap: go.TextBlock.WrapFit,
//               },
//               new go.Binding("text", "description", (desc) =>
//                 desc ? `Description: ${desc}` : ""
//               ),
//               new go.Binding("visible", "description", (desc) => !!desc)
//             )
//           )
//         ),
//       },
//       {
//         click: (e, node) => {
//           const data = node.data;
//           if (onNodeClick) onNodeClick(data);
//         },
//         doubleClick: (e, node) => {
//           const data = node.data;
//           if (onNodeEdit) onNodeEdit(data);
//         },
//       }
//     );

//     diagram.linkTemplate = $(
//       go.Link,
//       {
//         routing: go.Link.Orthogonal,
//         corner: 8,
//         selectable: false,
//       },
//       $(go.Shape, {
//         strokeWidth: 3,
//         stroke: "#D1D5DB",
//         strokeDashArray: [8, 4],
//       }),
//       $(go.Shape, {
//         toArrow: "Standard",
//         fill: "#9CA3AF",
//         stroke: "#9CA3AF",
//         scale: 1.2,
//       })
//     );

//     diagram.nodeTemplate.contextMenu = $(
//       go.Adornment,
//       "Vertical",
//       { background: "white", shadowBlur: 8 },
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "👁️ View Details", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeClick) onNodeClick(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "✏️ Edit", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeEdit) onNodeEdit(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "🗑️ Delete", {
//           font: "12px sans-serif",
//           margin: 8,
//           stroke: "#EF4444",
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeDelete) onNodeDelete(data);
//           },
//         }
//       )
//     );

//     diagramInstanceRef.current = diagram;

//     return () => {
//       if (diagramInstanceRef.current) {
//         diagramInstanceRef.current.div = null;
//         diagramInstanceRef.current = null;
//       }
//     };
//   }, [onNodeClick, onNodeEdit, onNodeDelete]);

//   useEffect(() => {
//     if (diagramInstanceRef.current && data && data.length > 0) {
//       try {
//         const diagram = diagramInstanceRef.current;
//         diagram.model = new go.TreeModel(data);
//       } catch (error) {
//         console.error("Error setting GoJS model:", error);
//       }
//     }
//   }, [data]);

//   return (
//     <div
//       ref={diagramRef}
//       className="w-full h-96 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner"
//       style={{ minHeight: "500px" }}
//     />
//   );
// };

// // PropertyFormModal Component
// const PropertyFormModal = ({
//   isOpen,
//   onClose,
//   type,
//   property,
//   onSuccess,
//   contracts,
//   zones,
//   subZones,
//   buildings,
//   villaApartments,
//   floors,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const isEdit = !!property;
//   const config = propertyTypeConfig[type] || propertyTypeConfig.zone;

//   useEffect(() => {
//     if (isOpen) {
//       resetForm();
//     }
//   }, [isOpen, type, property]);

//   const resetForm = () => {
//     if (property) {
//       setFormData({ ...property });
//       setImagePreview(property.imageUrl);
//     } else {
//       setFormData({
//         contractId: "",
//         description: "",
//         ...getDefaultFields(type),
//       });
//       setImagePreview(null);
//     }
//     setImageFile(null);
//     setErrors({});
//   };

//   const getDefaultFields = (type) => {
//     const fields = {
//       zone: { zoneName: "" },
//       subZone: { subZoneName: "", zoneId: "" },
//       building: { buildingName: "", subZoneId: "" },
//       villaApartment: { villaApartmentName: "", buildingId: "" },
//       floor: { floorName: "", villaApartmentId: "" },
//       room: { roomName: "", floorId: "" },
//     };
//     return fields[type] || {};
//   };

//   const getParentOptions = () => {
//     switch (type) {
//       case "subZone":
//         return zones.filter(
//           (z) => z.contractId.toString() === formData.contractId
//         );
//       case "building":
//         return subZones.filter(
//           (s) => s.contractId.toString() === formData.contractId
//         );
//       case "villaApartment":
//         return buildings.filter(
//           (b) => b.contractId.toString() === formData.contractId
//         );
//       case "floor":
//         return villaApartments.filter(
//           (v) => v.contractId.toString() === formData.contractId
//         );
//       case "room":
//         return floors.filter(
//           (f) => f.contractId.toString() === formData.contractId
//         );
//       default:
//         return [];
//     }
//   };

//   const getParentFieldName = () => {
//     const parentFields = {
//       subZone: "zoneId",
//       building: "subZoneId",
//       villaApartment: "buildingId",
//       floor: "villaApartmentId",
//       room: "floorId",
//     };
//     return parentFields[type];
//   };

//   const getParentDisplayName = () => {
//     const parentNames = {
//       subZone: "Zone",
//       building: "SubZone",
//       villaApartment: "Building",
//       floor: "Villa/Apartment",
//       room: "Floor",
//     };
//     return parentNames[type];
//   };

//   const getParentItemName = (item) => {
//     const nameFields = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//     };

//     const parentType = {
//       subZone: "zone",
//       building: "subZone",
//       villaApartment: "building",
//       floor: "villaApartment",
//       room: "floor",
//     }[type];

//     return item[nameFields[parentType]] || "Unknown";
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (field === "contractId") {
//       const parentField = getParentFieldName();
//       if (parentField) {
//         setFormData((prev) => ({
//           ...prev,
//           [parentField]: "",
//         }));
//       }
//     }

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: null,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameField = `${type}Name`;
//     if (!formData[nameField]?.trim()) {
//       newErrors[nameField] = "Name is required";
//     }

//     if (!formData.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     const parentField = getParentFieldName();
//     if (parentField && !formData[parentField]) {
//       newErrors[parentField] = `${getParentDisplayName()} is required`;
//     }

//     if (!isEdit && !imageFile) {
//       newErrors.image = "Image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const serviceMethod = isEdit
//         ? propertyFlowService[
//             `update${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ]
//         : propertyFlowService[
//             `create${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ];

//       if (isEdit) {
//         const idField = `${type}Id`;
//         await serviceMethod(property[idField], formData, imageFile);
//       } else {
//         await serviceMethod(formData, imageFile);
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("Error saving property:", error);
//       setErrors({ submit: "Failed to save property. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTitle = () => {
//     const typeNames = {
//       zone: "Zone",
//       subZone: "SubZone",
//       building: "Building",
//       villaApartment: "Villa/Apartment",
//       floor: "Floor",
//       room: "Room",
//     };

//     return `${isEdit ? "Edit" : "Create"} ${typeNames[type]}`;
//   };

//   const nameField = `${type}Name`;
//   const parentField = getParentFieldName();
//   const parentOptions = getParentOptions();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <config.icon className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Building className="w-4 h-4" />
//               Contract *
//             </label>
//             <select
//               value={formData.contractId?.toString() || ""}
//               onChange={(e) => handleInputChange("contractId", e.target.value)}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors.contractId ? "border-red-500" : "border-gray-200"
//               }`}
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//             {errors.contractId && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.contractId}
//               </p>
//             )}
//           </div>

//           {parentField && (
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                 <Layers className="w-4 h-4" />
//                 {getParentDisplayName()} *
//               </label>
//               <select
//                 value={formData[parentField]?.toString() || ""}
//                 onChange={(e) => handleInputChange(parentField, e.target.value)}
//                 disabled={!formData.contractId}
//                 className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all ${
//                   errors[parentField] ? "border-red-500" : "border-gray-200"
//                 }`}
//               >
//                 <option value="">
//                   Select a {getParentDisplayName().toLowerCase()}
//                 </option>
//                 {parentOptions.map((option) => {
//                   const idField = `${
//                     type === "subZone"
//                       ? "zone"
//                       : type === "building"
//                       ? "subZone"
//                       : type === "villaApartment"
//                       ? "building"
//                       : type === "floor"
//                       ? "villaApartment"
//                       : "floor"
//                   }Id`;
//                   return (
//                     <option
//                       key={option[idField]}
//                       value={option[idField].toString()}
//                     >
//                       {getParentItemName(option)}
//                     </option>
//                   );
//                 })}
//               </select>
//               {errors[parentField] && (
//                 <p className="text-sm text-red-500 flex items-center gap-1">
//                   <X className="w-4 h-4" />
//                   {errors[parentField]}
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Name *
//             </label>
//             <input
//               type="text"
//               value={formData[nameField] || ""}
//               onChange={(e) => handleInputChange(nameField, e.target.value)}
//               placeholder={`Enter ${type} name`}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors[nameField] ? "border-red-500" : "border-gray-200"
//               }`}
//             />
//             {errors[nameField] && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors[nameField]}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Description
//             </label>
//             <textarea
//               value={formData.description || ""}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               placeholder={`Enter ${type} description`}
//               rows={3}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <ImageIcon className="w-4 h-4" />
//               Image {!isEdit && "*"}
//             </label>
//             <div
//               className={`border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50 ${
//                 errors.image ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             >
//               {imagePreview ? (
//                 <div className="space-y-4">
//                   <div className="relative inline-block">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                       <Edit className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       document.getElementById("image-upload").click()
//                     }
//                     className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                   >
//                     <Upload className="w-4 h-4 mr-2" />
//                     Change Image
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                     <Upload className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         document.getElementById("image-upload").click()
//                       }
//                       className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Choose Image
//                     </button>
//                     <p className="text-sm text-gray-500 mt-3">
//                       Upload an image for this {type}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       PNG, JPG up to 10MB
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             {errors.image && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.image}
//               </p>
//             )}
//           </div>

//           {errors.submit && (
//             <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <X className="w-4 h-4" />
//                 {errors.submit}
//               </p>
//             </div>
//           )}

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r ${config.bgGradient} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105`}
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Save className="w-4 h-4" />
//                   {isEdit ? "Update" : "Create"}{" "}
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </div>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // PropertyDetailModal Component
// const PropertyDetailModal = ({ isOpen, onClose, property }) => {
//   if (!property || !isOpen) return null;

//   const config = propertyTypeConfig[property.type];
//   const Icon = config.icon;

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyId = (property) => {
//     return property[`${property.type}Id`];
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-white bg-opacity-20 rounded-xl">
//                 <Icon className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   {config.name} Details
//                 </h2>
//                 <p className="text-blue-100 text-sm">
//                   {getPropertyName(property)}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <User className="w-5 h-5 text-blue-600" />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Name
//                   </label>
//                   <p className="text-xl font-bold text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyName(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Type
//                   </label>
//                   <div className="bg-white p-3 rounded-lg border">
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.lightColor} ${config.textColor} border ${config.borderColor}`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       {config.name}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyId(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Contract ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {property.contractId}
//                   </p>
//                 </div>
//               </div>

//               {property.description && (
//                 <div className="mt-6 space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Description
//                   </label>
//                   <p className="text-gray-900 bg-white p-4 rounded-lg border-2 border-gray-100 leading-relaxed">
//                     {property.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <ImageIcon className="w-5 h-5 text-blue-600" />
//                 Image
//               </h3>
//               {property.imageUrl ? (
//                 <div className="relative group">
//                   <img
//                     src={property.imageUrl || "/placeholder.svg"}
//                     alt={getPropertyName(property)}
//                     className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                     <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
//                   <div className="text-center">
//                     <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500 font-medium">
//                       No image available
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <Layers className="w-5 h-5 text-blue-600" />
//                 Hierarchy Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {property.zoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <MapPin className="w-4 h-4" />
//                       Zone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.zoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.subZoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       SubZone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.subZoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.buildingId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Building className="w-4 h-4" />
//                       Building ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.buildingId}
//                     </p>
//                   </div>
//                 )}

//                 {property.villaApartmentId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Home className="w-4 h-4" />
//                       Villa/Apartment ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.villaApartmentId}
//                     </p>
//                   </div>
//                 )}

//                 {property.floorId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       Floor ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.floorId}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {(property.createdAt || property.updatedAt) && (
//             <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   Metadata
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {property.createdAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Calendar className="w-4 h-4" />
//                         Created Date
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}

//                   {property.updatedAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         Last Updated
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.updatedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main PropertyFlowManagement Component
// const PropertyFlowManagement = () => {
//   const {
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//     setSelectedContract,
//     loading,
//     refreshData,
//   } = usePropertyFlow();

//   const [contracts, setContracts] = useState([]);
//   const [viewMode, setViewMode] = useState("tree");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [formType, setFormType] = useState("zone");
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   useEffect(() => {
//     console.log("PropertyFlow Context Data:", {
//       zones,
//       subZones,
//       buildings,
//       villaApartments,
//       floors,
//       rooms,
//       selectedContract,
//     });
//   }, [
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//   ]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await refreshData();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   const buildTreeData = () => {
//     const treeData = [];
//     if (!selectedContract) return treeData;

//     zones
//       .filter((z) => z.contractId?.toString() === selectedContract?.toString())
//       .forEach((zone) => {
//         const zoneNode = {
//           key: `zone-${zone.zoneId}`,
//           name: zone.zoneName || "Unnamed Zone",
//           type: "zone",
//           id: zone.zoneId,
//           description: zone.description,
//           imageUrl: zone.imageUrl,
//           contractId: zone.contractId,
//           ...zone,
//         };
//         treeData.push(zoneNode);

//         subZones
//           .filter(
//             (sz) =>
//               sz.zoneId === zone.zoneId &&
//               sz.contractId?.toString() === selectedContract?.toString()
//           )
//           .forEach((subZone) => {
//             const subZoneNode = {
//               key: `subZone-${subZone.subZoneId}`,
//               parent: `zone-${zone.zoneId}`,
//               name: subZone.subZoneName || "Unnamed SubZone",
//               type: "subZone",
//               id: subZone.subZoneId,
//               description: subZone.description,
//               imageUrl: subZone.imageUrl,
//               contractId: subZone.contractId,
//               ...subZone,
//             };
//             treeData.push(subZoneNode);

//             buildings
//               .filter(
//                 (b) =>
//                   b.subZoneId === subZone.subZoneId &&
//                   b.contractId?.toString() === selectedContract?.toString()
//               )
//               .forEach((building) => {
//                 const buildingNode = {
//                   key: `building-${building.buildingId}`,
//                   parent: `subZone-${subZone.subZoneId}`,
//                   name: building.buildingName || "Unnamed Building",
//                   type: "building",
//                   id: building.buildingId,
//                   description: building.description,
//                   imageUrl: building.imageUrl,
//                   contractId: building.contractId,
//                   ...building,
//                 };
//                 treeData.push(buildingNode);

//                 villaApartments
//                   .filter(
//                     (va) =>
//                       va.buildingId === building.buildingId &&
//                       va.contractId?.toString() === selectedContract?.toString()
//                   )
//                   .forEach((villaApartment) => {
//                     const vaNode = {
//                       key: `villaApartment-${villaApartment.villaApartmentId}`,
//                       parent: `building-${building.buildingId}`,
//                       name:
//                         villaApartment.villaApartmentName ||
//                         "Unnamed Villa/Apartment",
//                       type: "villaApartment",
//                       id: villaApartment.villaApartmentId,
//                       description: villaApartment.description,
//                       imageUrl: villaApartment.imageUrl,
//                       contractId: villaApartment.contractId,
//                       ...villaApartment,
//                     };
//                     treeData.push(vaNode);

//                     floors
//                       .filter(
//                         (f) =>
//                           f.villaApartmentId ===
//                             villaApartment.villaApartmentId &&
//                           f.contractId?.toString() ===
//                             selectedContract?.toString()
//                       )
//                       .forEach((floor) => {
//                         const floorNode = {
//                           key: `floor-${floor.floorId}`,
//                           parent: `villaApartment-${villaApartment.villaApartmentId}`,
//                           name: floor.floorName || "Unnamed Floor",
//                           type: "floor",
//                           id: floor.floorId,
//                           description: floor.description,
//                           imageUrl: floor.imageUrl,
//                           contractId: floor.contractId,
//                           ...floor,
//                         };
//                         treeData.push(floorNode);

//                         rooms
//                           .filter(
//                             (r) =>
//                               r.floorId === floor.floorId &&
//                               r.contractId?.toString() ===
//                                 selectedContract?.toString()
//                           )
//                           .forEach((room) => {
//                             const roomNode = {
//                               key: `room-${room.roomId}`,
//                               parent: `floor-${floor.floorId}`,
//                               name: room.roomName || "Unnamed Room",
//                               type: "room",
//                               id: room.roomId,
//                               description: room.description,
//                               imageUrl: room.imageUrl,
//                               contractId: room.contractId,
//                               ...room,
//                             };
//                             treeData.push(roomNode);
//                           });
//                       });
//                   });
//               });
//           });
//       });
//     return treeData;
//   };

//   const getAllProperties = () => {
//     if (!selectedContract) return [];

//     const allProperties = [
//       ...zones.map((z) => ({ ...z, type: "zone" })),
//       ...subZones.map((s) => ({ ...s, type: "subZone" })),
//       ...buildings.map((b) => ({ ...b, type: "building" })),
//       ...villaApartments.map((v) => ({ ...v, type: "villaApartment" })),
//       ...floors.map((f) => ({ ...f, type: "floor" })),
//       ...rooms.map((r) => ({ ...r, type: "room" })),
//     ].filter(
//       (property) =>
//         property.contractId?.toString() === selectedContract?.toString()
//     );

//     return allProperties.filter((property) => {
//       const matchesSearch = getPropertyName(property)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesFilter =
//         filterType === "all" || property.type === filterType;
//       return matchesSearch && matchesFilter;
//     });
//   };

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyStats = () => {
//     const filteredZones = zones.filter(
//       (z) => z.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredSubZones = subZones.filter(
//       (s) => s.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredBuildings = buildings.filter(
//       (b) => b.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredVillaApartments = villaApartments.filter(
//       (v) => v.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredFloors = floors.filter(
//       (f) => f.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredRooms = rooms.filter(
//       (r) => r.contractId?.toString() === selectedContract?.toString()
//     );

//     const stats = {
//       zones: filteredZones.length,
//       subZones: filteredSubZones.length,
//       buildings: filteredBuildings.length,
//       villaApartments: filteredVillaApartments.length,
//       floors: filteredFloors.length,
//       rooms: filteredRooms.length,
//       total:
//         filteredZones.length +
//         filteredSubZones.length +
//         filteredBuildings.length +
//         filteredVillaApartments.length +
//         filteredFloors.length +
//         filteredRooms.length,
//     };
//     console.log("Filtered Property Stats:", stats);
//     return stats;
//   };

//   const handleCreateProperty = (type) => {
//     setFormType(type);
//     setEditingProperty(null);
//     setShowFormModal(true);
//   };

//   const handleEditProperty = (property) => {
//     setFormType(property.type);
//     setEditingProperty(property);
//     setShowFormModal(true);
//   };

//   const handleViewProperty = (property) => {
//     setSelectedProperty(property);
//     setShowDetailModal(true);
//   };

//   const handleNodeClick = (nodeData) => {
//     handleViewProperty(nodeData);
//   };

//   const handleNodeEdit = (nodeData) => {
//     handleEditProperty(nodeData);
//   };

//   const handleNodeDelete = (nodeData) => {
//     console.log("Delete node:", nodeData);
//   };

//   const stats = getPropertyStats();
//   const treeData = buildTreeData();
//   const allProperties = getAllProperties();

//   // GridView Component
//   const GridView = ({ properties }) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {properties.map((property) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${config.lightColor} border-2 ${config.borderColor} group`}
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div
//                     className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                   >
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <span
//                     className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} bg-white border ${config.borderColor} shadow-sm`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 {property.imageUrl && (
//                   <div className="mb-4 relative overflow-hidden rounded-lg">
//                     <img
//                       src={property.imageUrl || "/placeholder.svg"}
//                       alt={getPropertyName(property)}
//                       className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
//                   </div>
//                 )}

//                 <h4 className="font-bold text-gray-900 mb-2 text-lg">
//                   {getPropertyName(property)}
//                 </h4>

//                 {property.description && (
//                   <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
//                     {property.description}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <button
//                     onClick={() => handleViewProperty(property)}
//                     className="flex-1 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="View Details"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span className="text-xs font-medium">View</span>
//                   </button>
//                   <button
//                     onClick={() => handleEditProperty(property)}
//                     className="flex-1 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Edit"
//                   >
//                     <Edit className="w-4 h-4" />
//                     <span className="text-xs font-medium">Edit</span>
//                   </button>
//                   <button
//                     className="flex-1 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     <span className="text-xs font-medium">Delete</span>
//                   </button>
//                 </div>
//               </div>
//               <div
//                 className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
//               ></div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ListView Component
//   const ListView = ({ properties }) => {
//     return (
//       <div className="space-y-4">
//         {properties.map((property) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl shadow-md border-2 border-gray-100 group"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-6 flex-1">
//                     <div
//                       className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                     >
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>

//                     {property.imageUrl && (
//                       <div className="relative overflow-hidden rounded-lg">
//                         <img
//                           src={property.imageUrl || "/placeholder.svg"}
//                           alt={getPropertyName(property)}
//                           className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
//                         />
//                       </div>
//                     )}

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h4 className="font-bold text-gray-900 text-lg">
//                           {getPropertyName(property)}
//                         </h4>
//                         <span
//                           className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} ${config.lightColor} border ${config.borderColor}`}
//                         >
//                           {config.name}
//                         </span>
//                       </div>
//                       {property.description && (
//                         <p className="text-sm text-gray-600 leading-relaxed">
//                           {property.description}
//                         </p>
//                       )}
//                       <p className="text-xs text-gray-400 mt-1">
//                         ID: {property[`${property.type}Id`]}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleViewProperty(property)}
//                       className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
//                       title="View Details"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleEditProperty(property)}
//                       className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="w-5 h-5" />
//                     </button>
//                     <button
//                       className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-5xl font-bold text-gray-900 flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
//                 <Zap className="w-10 h-10 text-white" />
//               </div>
//               Property Flow Manager
//             </h1>
//             <p className="text-gray-600 text-lg ml-16">
//               Manage your property hierarchy with modern visualization and
//               analytics
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all disabled:opacity-50"
//               title="Refresh Data"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>

//             <select
//               value={selectedContract?.toString() || ""}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-72 px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium"
//             >
//               <option value="">🏢 Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {selectedContract && (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
//             {Object.entries(propertyTypeConfig).map(([type, config]) => (
//               <StatsCard
//                 key={type}
//                 type={type}
//                 count={stats[type] || 0}
//                 config={config}
//                 isLoading={loading}
//               />
//             ))}
//             <TotalStatsCard total={stats.total} isLoading={loading} />
//           </div>
//         )}

//         {!selectedContract ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border-2 border-gray-100">
//               <div className="p-12 text-center">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <Building className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   Select a Contract
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Choose a contract from the dropdown above to start managing
//                   your property flow and view detailed analytics
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : loading ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//               </div>
//               <p className="text-gray-600 text-lg font-medium">
//                 Loading property data...
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Please wait while we fetch your properties
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                 <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                   <div className="relative flex-1 max-w-md">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder="Search properties..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
//                     />
//                   </div>

//                   <div className="relative">
//                     <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <select
//                       value={filterType}
//                       onChange={(e) => setFilterType(e.target.value)}
//                       className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium appearance-none"
//                     >
//                       <option value="all">All Types</option>
//                       {Object.entries(propertyTypeConfig).map(
//                         ([type, config]) => (
//                           <option key={type} value={type}>
//                             {config.plural}
//                           </option>
//                         )
//                       )}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setViewMode("tree")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "tree"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <TreePine className="w-4 h-4 mr-2" />
//                     Tree
//                   </button>
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "grid"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <Grid className="w-4 h-4 mr-2" />
//                     Grid
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "list"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <List className="w-4 h-4 mr-2" />
//                     List
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <Plus className="w-5 h-5 text-blue-600" />
//                 Quick Actions
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {Object.entries(propertyTypeConfig).map(([type, config]) => {
//                   const Icon = config.icon;
//                   return (
//                     <button
//                       key={type}
//                       onClick={() => handleCreateProperty(type)}
//                       className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl ${config.lightColor} ${config.borderColor} ${config.textColor} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       Add {config.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {viewMode === "tree" && (
//               <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <TreePine className="w-6 h-6 text-blue-600" />
//                     Property Hierarchy Tree
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Users className="w-4 h-4" />
//                     {treeData.length} nodes
//                   </div>
//                 </div>
//                 {treeData.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                       <MapPin className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">
//                       No Properties Found
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       Start by creating zones for this contract to build your
//                       property hierarchy
//                     </p>
//                     <button
//                       onClick={() => handleCreateProperty("zone")}
//                       className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Create First Zone
//                     </button>
//                   </div>
//                 ) : (
//                   <PropertyFamilyTree
//                     key={`tree-${selectedContract || "no-contract"}`}
//                     data={treeData}
//                     onNodeClick={handleNodeClick}
//                     onNodeEdit={handleNodeEdit}
//                     onNodeDelete={handleNodeDelete}
//                   />
//                 )}
//               </div>
//             )}

//             {viewMode === "grid" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <Grid className="w-6 h-6 text-blue-600" />
//                     Grid View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <BarChart3 className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <GridView properties={allProperties} />
//               </div>
//             )}

//             {viewMode === "list" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <List className="w-6 h-6 text-blue-600" />
//                     List View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Activity className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <ListView properties={allProperties} />
//               </div>
//             )}
//           </>
//         )}

//         <PropertyFormModal
//           isOpen={showFormModal}
//           onClose={() => setShowFormModal(false)}
//           type={formType}
//           property={editingProperty}
//           onSuccess={() => {
//             setShowFormModal(false);
//             refreshData();
//           }}
//           contracts={contracts}
//           zones={zones}
//           subZones={subZones}
//           buildings={buildings}
//           villaApartments={villaApartments}
//           floors={floors}
//         />

//         <PropertyDetailModal
//           isOpen={showDetailModal}
//           onClose={() => setShowDetailModal(false)}
//           property={selectedProperty}
//         />
//       </div>
//     </div>
//   );
// };

// export default PropertyFlowManagement;
// //9999999999999
// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Building,
//   Home,
//   MapPin,
//   Layers,
//   DoorOpen,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Grid,
//   List,
//   Zap,
//   Upload,
//   Save,
//   X,
//   User,
//   ImageIcon,
//   TreePine,
//   BarChart3,
//   TrendingUp,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   Calendar,
//   Clock,
//   Users,
//   Activity,
// } from "lucide-react";
// import { usePropertyFlow } from "../context/PropertyFlowContext";
// import { contractService } from "../services/contractService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import * as go from "gojs";

// const propertyTypeConfig = {
//   zone: {
//     icon: MapPin,
//     color: "#3B82F6",
//     lightColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//     textColor: "text-blue-700",
//     bgGradient: "from-blue-500 to-blue-600",
//     name: "Zone",
//     plural: "Zones",
//   },
//   subZone: {
//     icon: Layers,
//     color: "#10B981",
//     lightColor: "bg-emerald-50",
//     borderColor: "border-emerald-200",
//     textColor: "text-emerald-700",
//     bgGradient: "from-emerald-500 to-emerald-600",
//     name: "SubZone",
//     plural: "SubZones",
//   },
//   building: {
//     icon: Building,
//     color: "#8B5CF6",
//     lightColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//     textColor: "text-purple-700",
//     bgGradient: "from-purple-500 to-purple-600",
//     name: "Building",
//     plural: "Buildings",
//   },
//   villaApartment: {
//     icon: Home,
//     color: "#F59E0B",
//     lightColor: "bg-amber-50",
//     borderColor: "border-amber-200",
//     textColor: "text-amber-700",
//     bgGradient: "from-amber-500 to-amber-600",
//     name: "Villa/Apartment",
//     plural: "Villa/Apartments",
//   },
//   floor: {
//     icon: Layers,
//     color: "#6366F1",
//     lightColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//     textColor: "text-indigo-700",
//     bgGradient: "from-indigo-500 to-indigo-600",
//     name: "Floor",
//     plural: "Floors",
//   },
//   room: {
//     icon: DoorOpen,
//     color: "#EF4444",
//     lightColor: "bg-red-50",
//     borderColor: "border-red-200",
//     textColor: "text-red-700",
//     bgGradient: "from-red-500 to-red-600",
//     name: "Room",
//     plural: "Rooms",
//   },
// };
// // StatsCard Component
// const StatsCard = ({ type, count, config, isLoading }) => {
//   const Icon = config.icon;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
//       <div className="p-2 bg-gray-100 rounded-md">
//         <Icon className={`w-6 h-6 ${config.textColor}`} />
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-600 uppercase">
//           {config.plural}
//         </p>
//         {isLoading ? (
//           <div className="animate-pulse">
//             <div className="h-6 w-12 bg-gray-200 rounded"></div>
//           </div>
//         ) : (
//           <p className="text-2xl font-semibold text-gray-900">
//             {count.toLocaleString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// // TotalStatsCard Component
// const TotalStatsCard = ({ total, isLoading }) => {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors col-span-2">
//       <div className="p-2 bg-gray-100 rounded-md">
//         <BarChart3 className="w-6 h-6 text-blue-600" />
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-600 uppercase">
//           Total Properties
//         </p>
//         {isLoading ? (
//           <div className="animate-pulse">
//             <div className="h-6 w-16 bg-gray-200 rounded"></div>
//           </div>
//         ) : (
//           <p className="text-2xl font-semibold text-gray-900">
//             {total.toLocaleString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// // PropertyFamilyTree Component
// const PropertyFamilyTree = ({
//   data,
//   onNodeClick,
//   onNodeEdit,
//   onNodeDelete,
// }) => {
//   const diagramRef = useRef(null);
//   const diagramInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!diagramRef.current) return;

//     const $ = go.GraphObject.make;

//     if (diagramInstanceRef.current) {
//       diagramInstanceRef.current.div = null;
//       diagramInstanceRef.current = null;
//     }

//     const diagram = $(go.Diagram, diagramRef.current, {
//       "toolManager.hoverDelay": 100,
//       "toolManager.toolTipDuration": 10000,
//       layout: $(go.TreeLayout, {
//         treeStyle: go.TreeLayout.StyleLastParents,
//         arrangement: go.TreeLayout.ArrangementHorizontal,
//         angle: 90,
//         layerSpacing: 50,
//         alternateAngle: 90,
//         alternateLayerSpacing: 50,
//         alternateAlignment: go.TreeLayout.AlignmentBus,
//         alternateNodeSpacing: 30,
//       }),
//       "undoManager.isEnabled": true,
//       "animationManager.isEnabled": true,
//       "animationManager.duration": 1000,
//       "animationManager.isInitial": false,
//       initialContentAlignment: go.Spot.Center,
//       "grid.visible": true,
//       "grid.gridCellSize": new go.Size(20, 20),
//     });

//     diagram.nodeTemplate = $(
//       go.Node,
//       "Auto",
//       {
//         locationSpot: go.Spot.Center,
//         isShadowed: true,
//         shadowBlur: 3,
//         shadowOffset: new go.Point(2, 2),
//         shadowColor: "rgba(0, 0, 0, .2)",
//         selectionAdornmentTemplate: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, "RoundedRectangle", {
//             fill: null,
//             stroke: "#4F46E5",
//             strokeWidth: 3,
//             strokeDashArray: [5, 5],
//           }),
//           $(go.Placeholder)
//         ),
//       },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
//         go.Point.stringify
//       ),
//       $(
//         go.Shape,
//         "RoundedRectangle",
//         {
//           name: "SHAPE",
//           fill: "white",
//           stroke: "#E5E7EB",
//           strokeWidth: 2,
//           minSize: new go.Size(140, 80),
//         },
//         new go.Binding("fill", "type", (type) => {
//           const config = propertyTypeConfig[type];
//           return config ? config.color + "15" : "#F9FAFB";
//         }),
//         new go.Binding(
//           "stroke",
//           "type",
//           (type) => propertyTypeConfig[type]?.color || "#6B7280"
//         )
//       ),
//       $(
//         go.Panel,
//         "Vertical",
//         { margin: 12 },
//         $(
//           go.Panel,
//           "Horizontal",
//           {
//             alignment: go.Spot.Center,
//             margin: new go.Margin(0, 0, 8, 0),
//             background: "rgba(255,255,255,0.8)",
//             padding: 4,
//           },
//           $(
//             go.TextBlock,
//             {
//               font: "bold 14px sans-serif",
//               margin: new go.Margin(0, 6, 0, 0),
//             },
//             new go.Binding("text", "type", (type) => {
//               const icons = {
//                 zone: "🌍",
//                 subZone: "📍",
//                 building: "🏢",
//                 villaApartment: "🏠",
//                 floor: "🏗️",
//                 room: "🚪",
//               };
//               return icons[type] || "📦";
//             })
//           ),
//           $(
//             go.TextBlock,
//             {
//               font: "bold 10px sans-serif",
//               textAlign: "center",
//             },
//             new go.Binding(
//               "text",
//               "type",
//               (type) => propertyTypeConfig[type]?.name || "Unknown"
//             ),
//             new go.Binding(
//               "stroke",
//               "type",
//               (type) => propertyTypeConfig[type]?.color || "#6B7280"
//             )
//           )
//         ),
//         $(
//           go.TextBlock,
//           {
//             font: "bold 14px sans-serif",
//             stroke: "#1F2937",
//             maxSize: new go.Size(120, Number.NaN),
//             wrap: go.TextBlock.WrapFit,
//             textAlign: "center",
//             margin: new go.Margin(0, 0, 4, 0),
//           },
//           new go.Binding("text", "name")
//         ),
//         $(
//           go.TextBlock,
//           {
//             font: "10px sans-serif",
//             stroke: "#6B7280",
//             textAlign: "center",
//           },
//           new go.Binding("text", "id", (id) => `ID: ${id}`)
//         )
//       ),
//       {
//         toolTip: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, {
//             fill: "#1F2937",
//             stroke: "#374151",
//           }),
//           $(
//             go.Panel,
//             "Vertical",
//             { margin: 12 },
//             $(
//               go.TextBlock,
//               {
//                 font: "bold 14px sans-serif",
//                 stroke: "white",
//                 margin: new go.Margin(0, 0, 4, 0),
//               },
//               new go.Binding("text", "name")
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding(
//                 "text",
//                 "type",
//                 (type) => `Type: ${propertyTypeConfig[type]?.name || "Unknown"}`
//               )
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding("text", "id", (id) => `ID: ${id}`)
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//                 maxSize: new go.Size(200, Number.NaN),
//                 wrap: go.TextBlock.WrapFit,
//               },
//               new go.Binding("text", "description", (desc) =>
//                 desc ? `Description: ${desc}` : ""
//               ),
//               new go.Binding("visible", "description", (desc) => !!desc)
//             )
//           )
//         ),
//       },
//       {
//         click: (e, node) => {
//           const data = node.data;
//           if (onNodeClick) onNodeClick(data);
//         },
//         doubleClick: (e, node) => {
//           const data = node.data;
//           if (onNodeEdit) onNodeEdit(data);
//         },
//       }
//     );

//     diagram.linkTemplate = $(
//       go.Link,
//       {
//         routing: go.Link.Orthogonal,
//         corner: 8,
//         selectable: false,
//       },
//       $(go.Shape, {
//         strokeWidth: 3,
//         stroke: "#D1D5DB",
//         strokeDashArray: [8, 4],
//       }),
//       $(go.Shape, {
//         toArrow: "Standard",
//         fill: "#9CA3AF",
//         stroke: "#9CA3AF",
//         scale: 1.2,
//       })
//     );

//     diagram.nodeTemplate.contextMenu = $(
//       go.Adornment,
//       "Vertical",
//       { background: "white", shadowBlur: 8 },
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "👁️ View Details", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeClick) onNodeClick(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "✏️ Edit", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeEdit) onNodeEdit(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "🗑️ Delete", {
//           font: "12px sans-serif",
//           margin: 8,
//           stroke: "#EF4444",
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeDelete) onNodeDelete(data);
//           },
//         }
//       )
//     );

//     diagramInstanceRef.current = diagram;

//     return () => {
//       if (diagramInstanceRef.current) {
//         diagramInstanceRef.current.div = null;
//         diagramInstanceRef.current = null;
//       }
//     };
//   }, [onNodeClick, onNodeEdit, onNodeDelete]);

//   useEffect(() => {
//     if (diagramInstanceRef.current && data && data.length > 0) {
//       try {
//         const diagram = diagramInstanceRef.current;
//         diagram.model = new go.TreeModel(data);
//       } catch (error) {
//         console.error("Error setting GoJS model:", error);
//       }
//     }
//   }, [data]);

//   return (
//     <div
//       ref={diagramRef}
//       className="w-full h-96 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner"
//       style={{ minHeight: "500px" }}
//     />
//   );
// };

// // PropertyFormModal Component
// const PropertyFormModal = ({
//   isOpen,
//   onClose,
//   type,
//   property,
//   onSuccess,
//   contracts,
//   zones,
//   subZones,
//   buildings,
//   villaApartments,
//   floors,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const isEdit = !!property;
//   const config = propertyTypeConfig[type] || propertyTypeConfig.zone;

//   useEffect(() => {
//     if (isOpen) {
//       resetForm();
//     }
//   }, [isOpen, type, property]);

//   const resetForm = () => {
//     if (property) {
//       setFormData({ ...property });
//       setImagePreview(property.imageUrl);
//     } else {
//       setFormData({
//         contractId: "",
//         description: "",
//         ...getDefaultFields(type),
//       });
//       setImagePreview(null);
//     }
//     setImageFile(null);
//     setErrors({});
//   };

//   const getDefaultFields = (type) => {
//     const fields = {
//       zone: { zoneName: "" },
//       subZone: { subZoneName: "", zoneId: "" },
//       building: { buildingName: "", subZoneId: "" },
//       villaApartment: { villaApartmentName: "", buildingId: "" },
//       floor: { floorName: "", villaApartmentId: "" },
//       room: { roomName: "", floorId: "" },
//     };
//     return fields[type] || {};
//   };

//   const getParentOptions = () => {
//     switch (type) {
//       case "subZone":
//         return zones.filter(
//           (z) => z.contractId.toString() === formData.contractId
//         );
//       case "building":
//         return subZones.filter(
//           (s) => s.contractId.toString() === formData.contractId
//         );
//       case "villaApartment":
//         return buildings.filter(
//           (b) => b.contractId.toString() === formData.contractId
//         );
//       case "floor":
//         return villaApartments.filter(
//           (v) => v.contractId.toString() === formData.contractId
//         );
//       case "room":
//         return floors.filter(
//           (f) => f.contractId.toString() === formData.contractId
//         );
//       default:
//         return [];
//     }
//   };

//   const getParentFieldName = () => {
//     const parentFields = {
//       subZone: "zoneId",
//       building: "subZoneId",
//       villaApartment: "buildingId",
//       floor: "villaApartmentId",
//       room: "floorId",
//     };
//     return parentFields[type];
//   };

//   const getParentDisplayName = () => {
//     const parentNames = {
//       subZone: "Zone",
//       building: "SubZone",
//       villaApartment: "Building",
//       floor: "Villa/Apartment",
//       room: "Floor",
//     };
//     return parentNames[type];
//   };

//   const getParentItemName = (item) => {
//     const nameFields = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//     };

//     const parentType = {
//       subZone: "zone",
//       building: "subZone",
//       villaApartment: "building",
//       floor: "villaApartment",
//       room: "floor",
//     }[type];

//     return item[nameFields[parentType]] || "Unknown";
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (field === "contractId") {
//       const parentField = getParentFieldName();
//       if (parentField) {
//         setFormData((prev) => ({
//           ...prev,
//           [parentField]: "",
//         }));
//       }
//     }

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: null,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameField = `${type}Name`;
//     if (!formData[nameField]?.trim()) {
//       newErrors[nameField] = "Name is required";
//     }

//     if (!formData.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     const parentField = getParentFieldName();
//     if (parentField && !formData[parentField]) {
//       newErrors[parentField] = `${getParentDisplayName()} is required`;
//     }

//     if (!isEdit && !imageFile) {
//       newErrors.image = "Image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const serviceMethod = isEdit
//         ? propertyFlowService[
//             `update${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ]
//         : propertyFlowService[
//             `create${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ];

//       if (isEdit) {
//         const idField = `${type}Id`;
//         await serviceMethod(property[idField], formData, imageFile);
//       } else {
//         await serviceMethod(formData, imageFile);
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("Error saving property:", error);
//       setErrors({ submit: "Failed to save property. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTitle = () => {
//     const typeNames = {
//       zone: "Zone",
//       subZone: "SubZone",
//       building: "Building",
//       villaApartment: "Villa/Apartment",
//       floor: "Floor",
//       room: "Room",
//     };

//     return `${isEdit ? "Edit" : "Create"} ${typeNames[type]}`;
//   };

//   const nameField = `${type}Name`;
//   const parentField = getParentFieldName();
//   const parentOptions = getParentOptions();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <config.icon className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Building className="w-4 h-4" />
//               Contract *
//             </label>
//             <select
//               value={formData.contractId?.toString() || ""}
//               onChange={(e) => handleInputChange("contractId", e.target.value)}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors.contractId ? "border-red-500" : "border-gray-200"
//               }`}
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//             {errors.contractId && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.contractId}
//               </p>
//             )}
//           </div>

//           {parentField && (
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                 <Layers className="w-4 h-4" />
//                 {getParentDisplayName()} *
//               </label>
//               <select
//                 value={formData[parentField]?.toString() || ""}
//                 onChange={(e) => handleInputChange(parentField, e.target.value)}
//                 disabled={!formData.contractId}
//                 className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all ${
//                   errors[parentField] ? "border-red-500" : "border-gray-200"
//                 }`}
//               >
//                 <option value="">
//                   Select a {getParentDisplayName().toLowerCase()}
//                 </option>
//                 {parentOptions.map((option) => {
//                   const idField = `${
//                     type === "subZone"
//                       ? "zone"
//                       : type === "building"
//                       ? "subZone"
//                       : type === "villaApartment"
//                       ? "building"
//                       : type === "floor"
//                       ? "villaApartment"
//                       : "floor"
//                   }Id`;
//                   return (
//                     <option
//                       key={option[idField]}
//                       value={option[idField].toString()}
//                     >
//                       {getParentItemName(option)}
//                     </option>
//                   );
//                 })}
//               </select>
//               {errors[parentField] && (
//                 <p className="text-sm text-red-500 flex items-center gap-1">
//                   <X className="w-4 h-4" />
//                   {errors[parentField]}
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Name *
//             </label>
//             <input
//               type="text"
//               value={formData[nameField] || ""}
//               onChange={(e) => handleInputChange(nameField, e.target.value)}
//               placeholder={`Enter ${type} name`}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors[nameField] ? "border-red-500" : "border-gray-200"
//               }`}
//             />
//             {errors[nameField] && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors[nameField]}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Description
//             </label>
//             <textarea
//               value={formData.description || ""}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               placeholder={`Enter ${type} description`}
//               rows={3}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <ImageIcon className="w-4 h-4" />
//               Image {!isEdit && "*"}
//             </label>
//             <div
//               className={`border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50 ${
//                 errors.image ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             >
//               {imagePreview ? (
//                 <div className="space-y-4">
//                   <div className="relative inline-block">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                       <Edit className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       document.getElementById("image-upload").click()
//                     }
//                     className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                   >
//                     <Upload className="w-4 h-4 mr-2" />
//                     Change Image
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                     <Upload className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         document.getElementById("image-upload").click()
//                       }
//                       className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Choose Image
//                     </button>
//                     <p className="text-sm text-gray-500 mt-3">
//                       Upload an image for this {type}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       PNG, JPG up to 10MB
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             {errors.image && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.image}
//               </p>
//             )}
//           </div>

//           {errors.submit && (
//             <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <X className="w-4 h-4" />
//                 {errors.submit}
//               </p>
//             </div>
//           )}

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r ${config.bgGradient} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105`}
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Save className="w-4 h-4" />
//                   {isEdit ? "Update" : "Create"}{" "}
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </div>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // PropertyDetailModal Component
// const PropertyDetailModal = ({ isOpen, onClose, property }) => {
//   if (!property || !isOpen) return null;

//   const config = propertyTypeConfig[property.type];
//   const Icon = config.icon;

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyId = (property) => {
//     return property[`${property.type}Id`];
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-white bg-opacity-20 rounded-xl">
//                 <Icon className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   {config.name} Details
//                 </h2>
//                 <p className="text-blue-100 text-sm">
//                   {getPropertyName(property)}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <User className="w-5 h-5 text-blue-600" />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Name
//                   </label>
//                   <p className="text-xl font-bold text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyName(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Type
//                   </label>
//                   <div className="bg-white p-3 rounded-lg border">
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.lightColor} ${config.textColor} border ${config.borderColor}`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       {config.name}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyId(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Contract ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {property.contractId}
//                   </p>
//                 </div>
//               </div>

//               {property.description && (
//                 <div className="mt-6 space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Description
//                   </label>
//                   <p className="text-gray-900 bg-white p-4 rounded-lg border-2 border-gray-100 leading-relaxed">
//                     {property.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <ImageIcon className="w-5 h-5 text-blue-600" />
//                 Image
//               </h3>
//               {property.imageUrl ? (
//                 <div className="relative group">
//                   <img
//                     src={property.imageUrl || "/placeholder.svg"}
//                     alt={getPropertyName(property)}
//                     className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                     <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
//                   <div className="text-center">
//                     <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500 font-medium">
//                       No image available
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <Layers className="w-5 h-5 text-blue-600" />
//                 Hierarchy Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {property.zoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <MapPin className="w-4 h-4" />
//                       Zone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.zoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.subZoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       SubZone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.subZoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.buildingId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Building className="w-4 h-4" />
//                       Building ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.buildingId}
//                     </p>
//                   </div>
//                 )}

//                 {property.villaApartmentId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Home className="w-4 h-4" />
//                       Villa/Apartment ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.villaApartmentId}
//                     </p>
//                   </div>
//                 )}

//                 {property.floorId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       Floor ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.floorId}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {(property.createdAt || property.updatedAt) && (
//             <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   Metadata
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {property.createdAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Calendar className="w-4 h-4" />
//                         Created Date
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}

//                   {property.updatedAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         Last Updated
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.updatedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main PropertyFlowManagement Component
// const PropertyFlowManagement = () => {
//   const {
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//     setSelectedContract,
//     loading,
//     refreshData,
//   } = usePropertyFlow();

//   const [contracts, setContracts] = useState([]);
//   const [viewMode, setViewMode] = useState("tree");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [formType, setFormType] = useState("zone");
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   useEffect(() => {
//     console.log("PropertyFlow Context Data:", {
//       zones,
//       subZones,
//       buildings,
//       villaApartments,
//       floors,
//       rooms,
//       selectedContract,
//     });
//   }, [
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//   ]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await refreshData();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   const buildTreeData = () => {
//     const treeData = [];
//     if (!selectedContract) return treeData;

//     zones
//       .filter((z) => z.contractId?.toString() === selectedContract?.toString())
//       .forEach((zone) => {
//         const zoneNode = {
//           key: `zone-${zone.zoneId}`,
//           name: zone.zoneName || "Unnamed Zone",
//           type: "zone",
//           id: zone.zoneId,
//           description: zone.description,
//           imageUrl: zone.imageUrl,
//           contractId: zone.contractId,
//           ...zone,
//         };
//         treeData.push(zoneNode);

//         subZones
//           .filter(
//             (sz) =>
//               sz.zoneId === zone.zoneId &&
//               sz.contractId?.toString() === selectedContract?.toString()
//           )
//           .forEach((subZone) => {
//             const subZoneNode = {
//               key: `subZone-${subZone.subZoneId}`,
//               parent: `zone-${zone.zoneId}`,
//               name: subZone.subZoneName || "Unnamed SubZone",
//               type: "subZone",
//               id: subZone.subZoneId,
//               description: subZone.description,
//               imageUrl: subZone.imageUrl,
//               contractId: subZone.contractId,
//               ...subZone,
//             };
//             treeData.push(subZoneNode);

//             buildings
//               .filter(
//                 (b) =>
//                   b.subZoneId === subZone.subZoneId &&
//                   b.contractId?.toString() === selectedContract?.toString()
//               )
//               .forEach((building) => {
//                 const buildingNode = {
//                   key: `building-${building.buildingId}`,
//                   parent: `subZone-${subZone.subZoneId}`,
//                   name: building.buildingName || "Unnamed Building",
//                   type: "building",
//                   id: building.buildingId,
//                   description: building.description,
//                   imageUrl: building.imageUrl,
//                   contractId: building.contractId,
//                   ...building,
//                 };
//                 treeData.push(buildingNode);

//                 villaApartments
//                   .filter(
//                     (va) =>
//                       va.buildingId === building.buildingId &&
//                       va.contractId?.toString() === selectedContract?.toString()
//                   )
//                   .forEach((villaApartment) => {
//                     const vaNode = {
//                       key: `villaApartment-${villaApartment.villaApartmentId}`,
//                       parent: `building-${building.buildingId}`,
//                       name:
//                         villaApartment.villaApartmentName ||
//                         "Unnamed Villa/Apartment",
//                       type: "villaApartment",
//                       id: villaApartment.villaApartmentId,
//                       description: villaApartment.description,
//                       imageUrl: villaApartment.imageUrl,
//                       contractId: villaApartment.contractId,
//                       ...villaApartment,
//                     };
//                     treeData.push(vaNode);

//                     floors
//                       .filter(
//                         (f) =>
//                           f.villaApartmentId ===
//                             villaApartment.villaApartmentId &&
//                           f.contractId?.toString() ===
//                             selectedContract?.toString()
//                       )
//                       .forEach((floor) => {
//                         const floorNode = {
//                           key: `floor-${floor.floorId}`,
//                           parent: `villaApartment-${villaApartment.villaApartmentId}`,
//                           name: floor.floorName || "Unnamed Floor",
//                           type: "floor",
//                           id: floor.floorId,
//                           description: floor.description,
//                           imageUrl: floor.imageUrl,
//                           contractId: floor.contractId,
//                           ...floor,
//                         };
//                         treeData.push(floorNode);

//                         rooms
//                           .filter(
//                             (r) =>
//                               r.floorId === floor.floorId &&
//                               r.contractId?.toString() ===
//                                 selectedContract?.toString()
//                           )
//                           .forEach((room) => {
//                             const roomNode = {
//                               key: `room-${room.roomId}`,
//                               parent: `floor-${floor.floorId}`,
//                               name: room.roomName || "Unnamed Room",
//                               type: "room",
//                               id: room.roomId,
//                               description: room.description,
//                               imageUrl: room.imageUrl,
//                               contractId: room.contractId,
//                               ...room,
//                             };
//                             treeData.push(roomNode);
//                           });
//                       });
//                   });
//               });
//           });
//       });
//     return treeData;
//   };

//   const getAllProperties = () => {
//     if (!selectedContract) return [];

//     const allProperties = [
//       ...zones.map((z) => ({ ...z, type: "zone" })),
//       ...subZones.map((s) => ({ ...s, type: "subZone" })),
//       ...buildings.map((b) => ({ ...b, type: "building" })),
//       ...villaApartments.map((v) => ({ ...v, type: "villaApartment" })),
//       ...floors.map((f) => ({ ...f, type: "floor" })),
//       ...rooms.map((r) => ({ ...r, type: "room" })),
//     ].filter(
//       (property) =>
//         property.contractId?.toString() === selectedContract?.toString()
//     );

//     return allProperties.filter((property) => {
//       const matchesSearch = getPropertyName(property)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesFilter =
//         filterType === "all" || property.type === filterType;
//       return matchesSearch && matchesFilter;
//     });
//   };

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyStats = () => {
//     const filteredZones = zones.filter(
//       (z) => z.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredSubZones = subZones.filter(
//       (s) => s.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredBuildings = buildings.filter(
//       (b) => b.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredVillaApartments = villaApartments.filter(
//       (v) => v.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredFloors = floors.filter(
//       (f) => f.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredRooms = rooms.filter(
//       (r) => r.contractId?.toString() === selectedContract?.toString()
//     );

//     const stats = {
//       zones: filteredZones.length,
//       subZones: filteredSubZones.length,
//       buildings: filteredBuildings.length,
//       villaApartments: filteredVillaApartments.length,
//       floors: filteredFloors.length,
//       rooms: filteredRooms.length,
//       total:
//         filteredZones.length +
//         filteredSubZones.length +
//         filteredBuildings.length +
//         filteredVillaApartments.length +
//         filteredFloors.length +
//         filteredRooms.length,
//     };
//     console.log("Filtered Property Stats:", stats);
//     return stats;
//   };

//   const handleCreateProperty = (type) => {
//     setFormType(type);
//     setEditingProperty(null);
//     setShowFormModal(true);
//   };

//   const handleEditProperty = (property) => {
//     setFormType(property.type);
//     setEditingProperty(property);
//     setShowFormModal(true);
//   };

//   const handleViewProperty = (property) => {
//     setSelectedProperty(property);
//     setShowDetailModal(true);
//   };

//   const handleNodeClick = (nodeData) => {
//     handleViewProperty(nodeData);
//   };

//   const handleNodeEdit = (nodeData) => {
//     handleEditProperty(nodeData);
//   };

//   const handleNodeDelete = (nodeData) => {
//     console.log("Delete node:", nodeData);
//   };

//   const stats = getPropertyStats();
//   const treeData = buildTreeData();
//   const allProperties = getAllProperties();

//   // GridView Component
//   const GridView = ({ properties }) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {properties.map((property) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${config.lightColor} border-2 ${config.borderColor} group`}
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div
//                     className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                   >
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <span
//                     className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} bg-white border ${config.borderColor} shadow-sm`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 {property.imageUrl && (
//                   <div className="mb-4 relative overflow-hidden rounded-lg">
//                     <img
//                       src={property.imageUrl || "/placeholder.svg"}
//                       alt={getPropertyName(property)}
//                       className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
//                   </div>
//                 )}

//                 <h4 className="font-bold text-gray-900 mb-2 text-lg">
//                   {getPropertyName(property)}
//                 </h4>

//                 {property.description && (
//                   <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
//                     {property.description}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <button
//                     onClick={() => handleViewProperty(property)}
//                     className="flex-1 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="View Details"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span className="text-xs font-medium">View</span>
//                   </button>
//                   <button
//                     onClick={() => handleEditProperty(property)}
//                     className="flex-1 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Edit"
//                   >
//                     <Edit className="w-4 h-4" />
//                     <span className="text-xs font-medium">Edit</span>
//                   </button>
//                   <button
//                     className="flex-1 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     <span className="text-xs font-medium">Delete</span>
//                   </button>
//                 </div>
//               </div>
//               <div
//                 className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
//               ></div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ListView Component
//   const ListView = ({ properties }) => {
//     return (
//       <div className="space-y-4">
//         {properties.map((property) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl shadow-md border-2 border-gray-100 group"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-6 flex-1">
//                     <div
//                       className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                     >
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>

//                     {property.imageUrl && (
//                       <div className="relative overflow-hidden rounded-lg">
//                         <img
//                           src={property.imageUrl || "/placeholder.svg"}
//                           alt={getPropertyName(property)}
//                           className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
//                         />
//                       </div>
//                     )}

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h4 className="font-bold text-gray-900 text-lg">
//                           {getPropertyName(property)}
//                         </h4>
//                         <span
//                           className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} ${config.lightColor} border ${config.borderColor}`}
//                         >
//                           {config.name}
//                         </span>
//                       </div>
//                       {property.description && (
//                         <p className="text-sm text-gray-600 leading-relaxed">
//                           {property.description}
//                         </p>
//                       )}
//                       <p className="text-xs text-gray-400 mt-1">
//                         ID: {property[`${property.type}Id`]}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleViewProperty(property)}
//                       className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
//                       title="View Details"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleEditProperty(property)}
//                       className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="w-5 h-5" />
//                     </button>
//                     <button
//                       className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Zap className="w-8 h-8 text-blue-600" />
//               Property Flow Manager
//             </h1>
//             <p className="text-gray-600 text-base">
//               Manage your property hierarchy with ease
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
//               title="Refresh Data"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>

//             <select
//               value={selectedContract?.toString() || ""}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-64 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {selectedContract && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {Object.entries(propertyTypeConfig).map(([type, config]) => {
//               // Map singular type to plural stats key
//               const statsKey =
//                 {
//                   zone: "zones",
//                   subZone: "subZones",
//                   building: "buildings",
//                   villaApartment: "villaApartments",
//                   floor: "floors",
//                   room: "rooms",
//                 }[type] || type;

//               return (
//                 <StatsCard
//                   key={type}
//                   type={type}
//                   count={stats[statsKey] || 0}
//                   config={config}
//                   isLoading={loading}
//                 />
//               );
//             })}
//             <TotalStatsCard total={stats.total || 0} isLoading={loading} />
//           </div>
//         )}

//         {!selectedContract ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border-2 border-gray-100">
//               <div className="p-12 text-center">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <Building className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   Select a Contract
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Choose a contract from the dropdown above to start managing
//                   your property flow and view detailed analytics
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : loading ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//               </div>
//               <p className="text-gray-600 text-lg font-medium">
//                 Loading property data...
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Please wait while we fetch your properties
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                 <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                   <div className="relative flex-1 max-w-md">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder="Search properties..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
//                     />
//                   </div>

//                   <div className="relative">
//                     <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <select
//                       value={filterType}
//                       onChange={(e) => setFilterType(e.target.value)}
//                       className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium appearance-none"
//                     >
//                       <option value="all">All Types</option>
//                       {Object.entries(propertyTypeConfig).map(
//                         ([type, config]) => (
//                           <option key={type} value={type}>
//                             {config.plural}
//                           </option>
//                         )
//                       )}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setViewMode("tree")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "tree"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <TreePine className="w-4 h-4 mr-2" />
//                     Tree
//                   </button>
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "grid"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <Grid className="w-4 h-4 mr-2" />
//                     Grid
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "list"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <List className="w-4 h-4 mr-2" />
//                     List
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <Plus className="w-5 h-5 text-blue-600" />
//                 Quick Actions
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {Object.entries(propertyTypeConfig).map(([type, config]) => {
//                   const Icon = config.icon;
//                   return (
//                     <button
//                       key={type}
//                       onClick={() => handleCreateProperty(type)}
//                       className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl ${config.lightColor} ${config.borderColor} ${config.textColor} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       Add {config.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {viewMode === "tree" && (
//               <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <TreePine className="w-6 h-6 text-blue-600" />
//                     Property Hierarchy Tree
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Users className="w-4 h-4" />
//                     {treeData.length} nodes
//                   </div>
//                 </div>
//                 {treeData.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                       <MapPin className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">
//                       No Properties Found
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       Start by creating zones for this contract to build your
//                       property hierarchy
//                     </p>
//                     <button
//                       onClick={() => handleCreateProperty("zone")}
//                       className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Create First Zone
//                     </button>
//                   </div>
//                 ) : (
//                   <PropertyFamilyTree
//                     key={`tree-${selectedContract || "no-contract"}`}
//                     data={treeData}
//                     onNodeClick={handleNodeClick}
//                     onNodeEdit={handleNodeEdit}
//                     onNodeDelete={handleNodeDelete}
//                   />
//                 )}
//               </div>
//             )}

//             {viewMode === "grid" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <Grid className="w-6 h-6 text-blue-600" />
//                     Grid View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <BarChart3 className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <GridView properties={allProperties} />
//               </div>
//             )}

//             {viewMode === "list" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <List className="w-6 h-6 text-blue-600" />
//                     List View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Activity className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <ListView properties={allProperties} />
//               </div>
//             )}
//           </>
//         )}

//         <PropertyFormModal
//           isOpen={showFormModal}
//           onClose={() => setShowFormModal(false)}
//           type={formType}
//           property={editingProperty}
//           onSuccess={() => {
//             setShowFormModal(false);
//             refreshData();
//           }}
//           contracts={contracts}
//           zones={zones}
//           subZones={subZones}
//           buildings={buildings}
//           villaApartments={villaApartments}
//           floors={floors}
//         />

//         <PropertyDetailModal
//           isOpen={showDetailModal}
//           onClose={() => setShowDetailModal(false)}
//           property={selectedProperty}
//         />
//       </div>
//     </div>
//   );
// };

// export default PropertyFlowManagement;

// "use client";
// import PropertyFlowPDFGenerator from "../components/PropertyFlow/PropertyFlowPDFGenerator";
// import { useState, useEffect, useRef } from "react";
// import {
//   Building,
//   Home,
//   MapPin,
//   Layers,
//   DoorOpen,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Search,
//   Grid,
//   List,
//   Zap,
//   Upload,
//   Save,
//   X,
//   User,
//   ImageIcon,
//   TreePine,
//   BarChart3,
//   TrendingUp,
//   Filter,
//   RefreshCw,
//   ChevronDown,
//   Calendar,
//   Clock,
//   Users,
//   Activity,
// } from "lucide-react";
// import { usePropertyFlow } from "../context/PropertyFlowContext";
// import { contractService } from "../services/contractService";
// import { propertyFlowService } from "../services/propertyFlowService";
// import * as go from "gojs";

// export const propertyTypeConfig = {
//   zone: {
//     icon: MapPin,
//     color: "#3B82F6",
//     lightColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//     textColor: "text-blue-700",
//     bgGradient: "from-blue-500 to-blue-600",
//     name: "Zone",
//     plural: "Zones",
//   },
//   subZone: {
//     icon: Layers,
//     color: "#10B981",
//     lightColor: "bg-emerald-50",
//     borderColor: "border-emerald-200",
//     textColor: "text-emerald-700",
//     bgGradient: "from-emerald-500 to-emerald-600",
//     name: "SubZone",
//     plural: "SubZones",
//   },
//   building: {
//     icon: Building,
//     color: "#8B5CF6",
//     lightColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//     textColor: "text-purple-700",
//     bgGradient: "from-purple-500 to-purple-600",
//     name: "Building",
//     plural: "Buildings",
//   },
//   villaApartment: {
//     icon: Home,
//     color: "#F59E0B",
//     lightColor: "bg-amber-50",
//     borderColor: "border-amber-200",
//     textColor: "text-amber-700",
//     bgGradient: "from-amber-500 to-amber-600",
//     name: "Villa/Apartment",
//     plural: "Villa/Apartments",
//   },
//   floor: {
//     icon: Layers,
//     color: "#6366F1",
//     lightColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//     textColor: "text-indigo-700",
//     bgGradient: "from-indigo-500 to-indigo-600",
//     name: "Floor",
//     plural: "Floors",
//   },
//   room: {
//     icon: DoorOpen,
//     color: "#EF4444",
//     lightColor: "bg-red-50",
//     borderColor: "border-red-200",
//     textColor: "text-red-700",
//     bgGradient: "from-red-500 to-red-600",
//     name: "Room",
//     plural: "Rooms",
//   },
// };
// // StatsCard Component
// const StatsCard = ({ type, count, config, isLoading }) => {
//   const Icon = config.icon;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
//       <div className="p-2 bg-gray-100 rounded-md">
//         <Icon className={`w-6 h-6 ${config.textColor}`} />
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-600 uppercase">
//           {config.plural}
//         </p>
//         {isLoading ? (
//           <div className="animate-pulse">
//             <div className="h-6 w-12 bg-gray-200 rounded"></div>
//           </div>
//         ) : (
//           <p className="text-2xl font-semibold text-gray-900">
//             {count.toLocaleString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// // TotalStatsCard Component
// const TotalStatsCard = ({ total, isLoading }) => {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors col-span-2">
//       <div className="p-2 bg-gray-100 rounded-md">
//         <BarChart3 className="w-6 h-6 text-blue-600" />
//       </div>
//       <div>
//         <p className="text-sm font-medium text-gray-600 uppercase">
//           Total Properties
//         </p>
//         {isLoading ? (
//           <div className="animate-pulse">
//             <div className="h-6 w-16 bg-gray-200 rounded"></div>
//           </div>
//         ) : (
//           <p className="text-2xl font-semibold text-gray-900">
//             {total.toLocaleString()}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// // PropertyFamilyTree Component
// const PropertyFamilyTree = ({
//   data,
//   onNodeClick,
//   onNodeEdit,
//   onNodeDelete,
// }) => {
//   const diagramRef = useRef(null);
//   const diagramInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!diagramRef.current) return;

//     const $ = go.GraphObject.make;

//     if (diagramInstanceRef.current) {
//       diagramInstanceRef.current.div = null;
//       diagramInstanceRef.current = null;
//     }

//     const diagram = $(go.Diagram, diagramRef.current, {
//       "toolManager.hoverDelay": 100,
//       "toolManager.toolTipDuration": 10000,
//       layout: $(go.TreeLayout, {
//         treeStyle: go.TreeLayout.StyleLastParents,
//         arrangement: go.TreeLayout.ArrangementHorizontal,
//         angle: 90,
//         layerSpacing: 50,
//         alternateAngle: 90,
//         alternateLayerSpacing: 50,
//         alternateAlignment: go.TreeLayout.AlignmentBus,
//         alternateNodeSpacing: 30,
//       }),
//       "undoManager.isEnabled": true,
//       "animationManager.isEnabled": true,
//       "animationManager.duration": 1000,
//       "animationManager.isInitial": false,
//       initialContentAlignment: go.Spot.Center,
//       "grid.visible": true,
//       "grid.gridCellSize": new go.Size(20, 20),
//     });

//     diagram.nodeTemplate = $(
//       go.Node,
//       "Auto",
//       {
//         locationSpot: go.Spot.Center,
//         isShadowed: true,
//         shadowBlur: 3,
//         shadowOffset: new go.Point(2, 2),
//         shadowColor: "rgba(0, 0, 0, .2)",
//         selectionAdornmentTemplate: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, "RoundedRectangle", {
//             fill: null,
//             stroke: "#4F46E5",
//             strokeWidth: 3,
//             strokeDashArray: [5, 5],
//           }),
//           $(go.Placeholder)
//         ),
//       },
//       new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
//         go.Point.stringify
//       ),
//       $(
//         go.Shape,
//         "RoundedRectangle",
//         {
//           name: "SHAPE",
//           fill: "white",
//           stroke: "#E5E7EB",
//           strokeWidth: 2,
//           minSize: new go.Size(140, 80),
//         },
//         new go.Binding("fill", "type", (type) => {
//           const config = propertyTypeConfig[type];
//           return config ? config.color + "15" : "#F9FAFB";
//         }),
//         new go.Binding(
//           "stroke",
//           "type",
//           (type) => propertyTypeConfig[type]?.color || "#6B7280"
//         )
//       ),
//       $(
//         go.Panel,
//         "Vertical",
//         { margin: 12 },
//         $(
//           go.Panel,
//           "Horizontal",
//           {
//             alignment: go.Spot.Center,
//             margin: new go.Margin(0, 0, 8, 0),
//             background: "rgba(255,255,255,0.8)",
//             padding: 4,
//           },
//           $(
//             go.TextBlock,
//             {
//               font: "bold 14px sans-serif",
//               margin: new go.Margin(0, 6, 0, 0),
//             },
//             new go.Binding("text", "type", (type) => {
//               const icons = {
//                 zone: "🌍",
//                 subZone: "📍",
//                 building: "🏢",
//                 villaApartment: "🏠",
//                 floor: "🏗️",
//                 room: "🚪",
//               };
//               return icons[type] || "📦";
//             })
//           ),
//           $(
//             go.TextBlock,
//             {
//               font: "bold 10px sans-serif",
//               textAlign: "center",
//             },
//             new go.Binding(
//               "text",
//               "type",
//               (type) => propertyTypeConfig[type]?.name || "Unknown"
//             ),
//             new go.Binding(
//               "stroke",
//               "type",
//               (type) => propertyTypeConfig[type]?.color || "#6B7280"
//             )
//           )
//         ),
//         $(
//           go.TextBlock,
//           {
//             font: "bold 14px sans-serif",
//             stroke: "#1F2937",
//             maxSize: new go.Size(120, Number.NaN),
//             wrap: go.TextBlock.WrapFit,
//             textAlign: "center",
//             margin: new go.Margin(0, 0, 4, 0),
//           },
//           new go.Binding("text", "name")
//         ),
//         $(
//           go.TextBlock,
//           {
//             font: "10px sans-serif",
//             stroke: "#6B7280",
//             textAlign: "center",
//           },
//           new go.Binding("text", "id", (id) => `ID: ${id}`)
//         )
//       ),
//       {
//         toolTip: $(
//           go.Adornment,
//           "Auto",
//           $(go.Shape, {
//             fill: "#1F2937",
//             stroke: "#374151",
//           }),
//           $(
//             go.Panel,
//             "Vertical",
//             { margin: 12 },
//             $(
//               go.TextBlock,
//               {
//                 font: "bold 14px sans-serif",
//                 stroke: "white",
//                 margin: new go.Margin(0, 0, 4, 0),
//               },
//               new go.Binding("text", "name")
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding(
//                 "text",
//                 "type",
//                 (type) => `Type: ${propertyTypeConfig[type]?.name || "Unknown"}`
//               )
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//               },
//               new go.Binding("text", "id", (id) => `ID: ${id}`)
//             ),
//             $(
//               go.TextBlock,
//               {
//                 font: "12px sans-serif",
//                 stroke: "#D1D5DB",
//                 maxSize: new go.Size(200, Number.NaN),
//                 wrap: go.TextBlock.WrapFit,
//               },
//               new go.Binding("text", "description", (desc) =>
//                 desc ? `Description: ${desc}` : ""
//               ),
//               new go.Binding("visible", "description", (desc) => !!desc)
//             )
//           )
//         ),
//       },
//       {
//         click: (e, node) => {
//           const data = node.data;
//           if (onNodeClick) onNodeClick(data);
//         },
//         doubleClick: (e, node) => {
//           const data = node.data;
//           if (onNodeEdit) onNodeEdit(data);
//         },
//       }
//     );

//     diagram.linkTemplate = $(
//       go.Link,
//       {
//         routing: go.Link.Orthogonal,
//         corner: 8,
//         selectable: false,
//       },
//       $(go.Shape, {
//         strokeWidth: 3,
//         stroke: "#D1D5DB",
//         strokeDashArray: [8, 4],
//       }),
//       $(go.Shape, {
//         toArrow: "Standard",
//         fill: "#9CA3AF",
//         stroke: "#9CA3AF",
//         scale: 1.2,
//       })
//     );

//     diagram.nodeTemplate.contextMenu = $(
//       go.Adornment,
//       "Vertical",
//       { background: "white", shadowBlur: 8 },
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "👁️ View Details", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeClick) onNodeClick(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "✏️ Edit", {
//           font: "12px sans-serif",
//           margin: 8,
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeEdit) onNodeEdit(data);
//           },
//         }
//       ),
//       $(
//         "ContextMenuButton",
//         $(go.TextBlock, "🗑️ Delete", {
//           font: "12px sans-serif",
//           margin: 8,
//           stroke: "#EF4444",
//         }),
//         {
//           click: (e, button) => {
//             const data = button.part.adornedPart.data;
//             if (onNodeDelete) onNodeDelete(data);
//           },
//         }
//       )
//     );

//     diagramInstanceRef.current = diagram;

//     return () => {
//       if (diagramInstanceRef.current) {
//         diagramInstanceRef.current.div = null;
//         diagramInstanceRef.current = null;
//       }
//     };
//   }, [onNodeClick, onNodeEdit, onNodeDelete]);

//   useEffect(() => {
//     if (diagramInstanceRef.current && data && data.length > 0) {
//       try {
//         const diagram = diagramInstanceRef.current;
//         diagram.model = new go.TreeModel(data);
//       } catch (error) {
//         console.error("Error setting GoJS model:", error);
//       }
//     }
//   }, [data]);

//   // In PropertyFamilyTree component
//   return (
//     // <div
//     //   ref={diagramRef}
//     //   className="w-full h-96 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner gojs-diagram"
//     //   style={{ minHeight: "500px" }}
//     // />
//     <div
//       ref={diagramRef}
//       className="w-full h-[50rem] border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner gojs-diagram"
//       style={{ minHeight: "500px" }}
//     />
//   );
// };

// // PropertyFormModal Component
// const PropertyFormModal = ({
//   isOpen,
//   onClose,
//   type,
//   property,
//   onSuccess,
//   contracts,
//   zones,
//   subZones,
//   buildings,
//   villaApartments,
//   floors,
// }) => {
//   const [formData, setFormData] = useState({});
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const isEdit = !!property;
//   const config = propertyTypeConfig[type] || propertyTypeConfig.zone;

//   useEffect(() => {
//     if (isOpen) {
//       resetForm();
//     }
//   }, [isOpen, type, property]);

//   const resetForm = () => {
//     if (property) {
//       setFormData({ ...property });
//       setImagePreview(property.imageUrl);
//     } else {
//       setFormData({
//         contractId: "",
//         description: "",
//         ...getDefaultFields(type),
//       });
//       setImagePreview(null);
//     }
//     setImageFile(null);
//     setErrors({});
//   };

//   const getDefaultFields = (type) => {
//     const fields = {
//       zone: { zoneName: "" },
//       subZone: { subZoneName: "", zoneId: "" },
//       building: { buildingName: "", subZoneId: "" },
//       villaApartment: { villaApartmentName: "", buildingId: "" },
//       floor: { floorName: "", villaApartmentId: "" },
//       room: { roomName: "", floorId: "" },
//     };
//     return fields[type] || {};
//   };

//   const getParentOptions = () => {
//     switch (type) {
//       case "subZone":
//         return zones.filter(
//           (z) => z.contractId.toString() === formData.contractId
//         );
//       case "building":
//         return subZones.filter(
//           (s) => s.contractId.toString() === formData.contractId
//         );
//       case "villaApartment":
//         return buildings.filter(
//           (b) => b.contractId.toString() === formData.contractId
//         );
//       case "floor":
//         return villaApartments.filter(
//           (v) => v.contractId.toString() === formData.contractId
//         );
//       case "room":
//         return floors.filter(
//           (f) => f.contractId.toString() === formData.contractId
//         );
//       default:
//         return [];
//     }
//   };

//   const getParentFieldName = () => {
//     const parentFields = {
//       subZone: "zoneId",
//       building: "subZoneId",
//       villaApartment: "buildingId",
//       floor: "villaApartmentId",
//       room: "floorId",
//     };
//     return parentFields[type];
//   };

//   const getParentDisplayName = () => {
//     const parentNames = {
//       subZone: "Zone",
//       building: "SubZone",
//       villaApartment: "Building",
//       floor: "Villa/Apartment",
//       room: "Floor",
//     };
//     return parentNames[type];
//   };

//   const getParentItemName = (item) => {
//     const nameFields = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//     };

//     const parentType = {
//       subZone: "zone",
//       building: "subZone",
//       villaApartment: "building",
//       floor: "villaApartment",
//       room: "floor",
//     }[type];

//     return item[nameFields[parentType]] || "Unknown";
//   };

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     if (field === "contractId") {
//       const parentField = getParentFieldName();
//       if (parentField) {
//         setFormData((prev) => ({
//           ...prev,
//           [parentField]: "",
//         }));
//       }
//     }

//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: null,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     const nameField = `${type}Name`;
//     if (!formData[nameField]?.trim()) {
//       newErrors[nameField] = "Name is required";
//     }

//     if (!formData.contractId) {
//       newErrors.contractId = "Contract is required";
//     }

//     const parentField = getParentFieldName();
//     if (parentField && !formData[parentField]) {
//       newErrors[parentField] = `${getParentDisplayName()} is required`;
//     }

//     if (!isEdit && !imageFile) {
//       newErrors.image = "Image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const serviceMethod = isEdit
//         ? propertyFlowService[
//             `update${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ]
//         : propertyFlowService[
//             `create${type.charAt(0).toUpperCase() + type.slice(1)}`
//           ];

//       if (isEdit) {
//         const idField = `${type}Id`;
//         await serviceMethod(property[idField], formData, imageFile);
//       } else {
//         await serviceMethod(formData, imageFile);
//       }

//       onSuccess();
//     } catch (error) {
//       console.error("Error saving property:", error);
//       setErrors({ submit: "Failed to save property. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTitle = () => {
//     const typeNames = {
//       zone: "Zone",
//       subZone: "SubZone",
//       building: "Building",
//       villaApartment: "Villa/Apartment",
//       floor: "Floor",
//       room: "Room",
//     };

//     return `${isEdit ? "Edit" : "Create"} ${typeNames[type]}`;
//   };

//   const nameField = `${type}Name`;
//   const parentField = getParentFieldName();
//   const parentOptions = getParentOptions();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <config.icon className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Building className="w-4 h-4" />
//               Contract *
//             </label>
//             <select
//               value={formData.contractId?.toString() || ""}
//               onChange={(e) => handleInputChange("contractId", e.target.value)}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors.contractId ? "border-red-500" : "border-gray-200"
//               }`}
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//             {errors.contractId && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.contractId}
//               </p>
//             )}
//           </div>

//           {parentField && (
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                 <Layers className="w-4 h-4" />
//                 {getParentDisplayName()} *
//               </label>
//               <select
//                 value={formData[parentField]?.toString() || ""}
//                 onChange={(e) => handleInputChange(parentField, e.target.value)}
//                 disabled={!formData.contractId}
//                 className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all ${
//                   errors[parentField] ? "border-red-500" : "border-gray-200"
//                 }`}
//               >
//                 <option value="">
//                   Select a {getParentDisplayName().toLowerCase()}
//                 </option>
//                 {parentOptions.map((option) => {
//                   const idField = `${
//                     type === "subZone"
//                       ? "zone"
//                       : type === "building"
//                       ? "subZone"
//                       : type === "villaApartment"
//                       ? "building"
//                       : type === "floor"
//                       ? "villaApartment"
//                       : "floor"
//                   }Id`;
//                   return (
//                     <option
//                       key={option[idField]}
//                       value={option[idField].toString()}
//                     >
//                       {getParentItemName(option)}
//                     </option>
//                   );
//                 })}
//               </select>
//               {errors[parentField] && (
//                 <p className="text-sm text-red-500 flex items-center gap-1">
//                   <X className="w-4 h-4" />
//                   {errors[parentField]}
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Name *
//             </label>
//             <input
//               type="text"
//               value={formData[nameField] || ""}
//               onChange={(e) => handleInputChange(nameField, e.target.value)}
//               placeholder={`Enter ${type} name`}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
//                 errors[nameField] ? "border-red-500" : "border-gray-200"
//               }`}
//             />
//             {errors[nameField] && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors[nameField]}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Description
//             </label>
//             <textarea
//               value={formData.description || ""}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               placeholder={`Enter ${type} description`}
//               rows={3}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <ImageIcon className="w-4 h-4" />
//               Image {!isEdit && "*"}
//             </label>
//             <div
//               className={`border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50 ${
//                 errors.image ? "border-red-500 bg-red-50" : "border-gray-300"
//               }`}
//             >
//               {imagePreview ? (
//                 <div className="space-y-4">
//                   <div className="relative inline-block">
//                     <img
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                       <Edit className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       document.getElementById("image-upload").click()
//                     }
//                     className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                   >
//                     <Upload className="w-4 h-4 mr-2" />
//                     Change Image
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//                     <Upload className="w-8 h-8 text-gray-400" />
//                   </div>
//                   <div>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         document.getElementById("image-upload").click()
//                       }
//                       className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
//                     >
//                       <Upload className="w-4 h-4 mr-2" />
//                       Choose Image
//                     </button>
//                     <p className="text-sm text-gray-500 mt-3">
//                       Upload an image for this {type}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       PNG, JPG up to 10MB
//                     </p>
//                   </div>
//                 </div>
//               )}
//               <input
//                 id="image-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             {errors.image && (
//               <p className="text-sm text-red-500 flex items-center gap-1">
//                 <X className="w-4 h-4" />
//                 {errors.image}
//               </p>
//             )}
//           </div>

//           {errors.submit && (
//             <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
//               <p className="text-sm text-red-600 flex items-center gap-2">
//                 <X className="w-4 h-4" />
//                 {errors.submit}
//               </p>
//             </div>
//           )}

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r ${config.bgGradient} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105`}
//             >
//               {loading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Saving...
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <Save className="w-4 h-4" />
//                   {isEdit ? "Update" : "Create"}{" "}
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </div>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // PropertyDetailModal Component
// const PropertyDetailModal = ({ isOpen, onClose, property }) => {
//   if (!property || !isOpen) return null;

//   const config = propertyTypeConfig[property.type];
//   const Icon = config.icon;

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyId = (property) => {
//     return property[`${property.type}Id`];
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div
//           className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-white bg-opacity-20 rounded-xl">
//                 <Icon className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   {config.name} Details
//                 </h2>
//                 <p className="text-blue-100 text-sm">
//                   {getPropertyName(property)}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <User className="w-5 h-5 text-blue-600" />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Name
//                   </label>
//                   <p className="text-xl font-bold text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyName(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Type
//                   </label>
//                   <div className="bg-white p-3 rounded-lg border">
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.lightColor} ${config.textColor} border ${config.borderColor}`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       {config.name}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {getPropertyId(property)}
//                   </p>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Contract ID
//                   </label>
//                   <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                     {property.contractId}
//                   </p>
//                 </div>
//               </div>

//               {property.description && (
//                 <div className="mt-6 space-y-2">
//                   <label className="block text-sm font-semibold text-gray-600">
//                     Description
//                   </label>
//                   <p className="text-gray-900 bg-white p-4 rounded-lg border-2 border-gray-100 leading-relaxed">
//                     {property.description}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
//                 <ImageIcon className="w-5 h-5 text-blue-600" />
//                 Image
//               </h3>
//               {property.imageUrl ? (
//                 <div className="relative group">
//                   <img
//                     src={property.imageUrl || "/placeholder.svg"}
//                     alt={getPropertyName(property)}
//                     className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
//                     <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
//                   <div className="text-center">
//                     <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                     <p className="text-gray-500 font-medium">
//                       No image available
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//             <div className="p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <Layers className="w-5 h-5 text-blue-600" />
//                 Hierarchy Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {property.zoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <MapPin className="w-4 h-4" />
//                       Zone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.zoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.subZoneId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       SubZone ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.subZoneId}
//                     </p>
//                   </div>
//                 )}

//                 {property.buildingId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Building className="w-4 h-4" />
//                       Building ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.buildingId}
//                     </p>
//                   </div>
//                 )}

//                 {property.villaApartmentId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Home className="w-4 h-4" />
//                       Villa/Apartment ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.villaApartmentId}
//                     </p>
//                   </div>
//                 )}

//                 {property.floorId && (
//                   <div className="space-y-2">
//                     <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                       <Layers className="w-4 h-4" />
//                       Floor ID
//                     </label>
//                     <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
//                       {property.floorId}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {(property.createdAt || property.updatedAt) && (
//             <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <Clock className="w-5 h-5 text-blue-600" />
//                   Metadata
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {property.createdAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Calendar className="w-4 h-4" />
//                         Created Date
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}

//                   {property.updatedAt && (
//                     <div className="space-y-2">
//                       <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         Last Updated
//                       </label>
//                       <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
//                         {new Date(property.updatedAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main PropertyFlowManagement Component
// const PropertyFlowManagement = () => {
//   const {
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//     setSelectedContract,
//     loading,
//     refreshData,
//   } = usePropertyFlow();

//   const [contracts, setContracts] = useState([]);
//   const [viewMode, setViewMode] = useState("tree");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [formType, setFormType] = useState("zone");
//   const [editingProperty, setEditingProperty] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadContracts();
//   }, []);

//   useEffect(() => {
//     console.log("PropertyFlow Context Data:", {
//       zones,
//       subZones,
//       buildings,
//       villaApartments,
//       floors,
//       rooms,
//       selectedContract,
//     });
//   }, [
//     zones,
//     subZones,
//     buildings,
//     villaApartments,
//     floors,
//     rooms,
//     selectedContract,
//   ]);

//   const loadContracts = async () => {
//     try {
//       const response = await contractService.getAllContracts();
//       setContracts(response.data || []);
//     } catch (error) {
//       console.error("Error loading contracts:", error);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await refreshData();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   const buildTreeData = () => {
//     const treeData = [];
//     if (!selectedContract) return treeData;

//     zones
//       .filter((z) => z.contractId?.toString() === selectedContract?.toString())
//       .forEach((zone) => {
//         const zoneNode = {
//           key: `zone-${zone.zoneId}`,
//           name: zone.zoneName || "Unnamed Zone",
//           type: "zone",
//           id: zone.zoneId,
//           description: zone.description,
//           imageUrl: zone.imageUrl,
//           contractId: zone.contractId,
//           ...zone,
//         };
//         treeData.push(zoneNode);

//         subZones
//           .filter(
//             (sz) =>
//               sz.zoneId === zone.zoneId &&
//               sz.contractId?.toString() === selectedContract?.toString()
//           )
//           .forEach((subZone) => {
//             const subZoneNode = {
//               key: `subZone-${subZone.subZoneId}`,
//               parent: `zone-${zone.zoneId}`,
//               name: subZone.subZoneName || "Unnamed SubZone",
//               type: "subZone",
//               id: subZone.subZoneId,
//               description: subZone.description,
//               imageUrl: subZone.imageUrl,
//               contractId: subZone.contractId,
//               ...subZone,
//             };
//             treeData.push(subZoneNode);

//             buildings
//               .filter(
//                 (b) =>
//                   b.subZoneId === subZone.subZoneId &&
//                   b.contractId?.toString() === selectedContract?.toString()
//               )
//               .forEach((building) => {
//                 const buildingNode = {
//                   key: `building-${building.buildingId}`,
//                   parent: `subZone-${subZone.subZoneId}`,
//                   name: building.buildingName || "Unnamed Building",
//                   type: "building",
//                   id: building.buildingId,
//                   description: building.description,
//                   imageUrl: building.imageUrl,
//                   contractId: building.contractId,
//                   ...building,
//                 };
//                 treeData.push(buildingNode);

//                 villaApartments
//                   .filter(
//                     (va) =>
//                       va.buildingId === building.buildingId &&
//                       va.contractId?.toString() === selectedContract?.toString()
//                   )
//                   .forEach((villaApartment) => {
//                     const vaNode = {
//                       key: `villaApartment-${villaApartment.villaApartmentId}`,
//                       parent: `building-${building.buildingId}`,
//                       name:
//                         villaApartment.villaApartmentName ||
//                         "Unnamed Villa/Apartment",
//                       type: "villaApartment",
//                       id: villaApartment.villaApartmentId,
//                       description: villaApartment.description,
//                       imageUrl: villaApartment.imageUrl,
//                       contractId: villaApartment.contractId,
//                       ...villaApartment,
//                     };
//                     treeData.push(vaNode);

//                     floors
//                       .filter(
//                         (f) =>
//                           f.villaApartmentId ===
//                             villaApartment.villaApartmentId &&
//                           f.contractId?.toString() ===
//                             selectedContract?.toString()
//                       )
//                       .forEach((floor) => {
//                         const floorNode = {
//                           key: `floor-${floor.floorId}`,
//                           parent: `villaApartment-${villaApartment.villaApartmentId}`,
//                           name: floor.floorName || "Unnamed Floor",
//                           type: "floor",
//                           id: floor.floorId,
//                           description: floor.description,
//                           imageUrl: floor.imageUrl,
//                           contractId: floor.contractId,
//                           ...floor,
//                         };
//                         treeData.push(floorNode);

//                         rooms
//                           .filter(
//                             (r) =>
//                               r.floorId === floor.floorId &&
//                               r.contractId?.toString() ===
//                                 selectedContract?.toString()
//                           )
//                           .forEach((room) => {
//                             const roomNode = {
//                               key: `room-${room.roomId}`,
//                               parent: `floor-${floor.floorId}`,
//                               name: room.roomName || "Unnamed Room",
//                               type: "room",
//                               id: room.roomId,
//                               description: room.description,
//                               imageUrl: room.imageUrl,
//                               contractId: room.contractId,
//                               ...room,
//                             };
//                             treeData.push(roomNode);
//                           });
//                       });
//                   });
//               });
//           });
//       });
//     return treeData;
//   };

//   const getAllProperties = () => {
//     if (!selectedContract) return [];

//     const allProperties = [
//       ...zones.map((z) => ({ ...z, type: "zone" })),
//       ...subZones.map((s) => ({ ...s, type: "subZone" })),
//       ...buildings.map((b) => ({ ...b, type: "building" })),
//       ...villaApartments.map((v) => ({ ...v, type: "villaApartment" })),
//       ...floors.map((f) => ({ ...f, type: "floor" })),
//       ...rooms.map((r) => ({ ...r, type: "room" })),
//     ].filter(
//       (property) =>
//         property.contractId?.toString() === selectedContract?.toString()
//     );

//     return allProperties.filter((property) => {
//       const matchesSearch = getPropertyName(property)
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//       const matchesFilter =
//         filterType === "all" || property.type === filterType;
//       return matchesSearch && matchesFilter;
//     });
//   };

//   const getPropertyName = (property) => {
//     const nameMap = {
//       zone: "zoneName",
//       subZone: "subZoneName",
//       building: "buildingName",
//       villaApartment: "villaApartmentName",
//       floor: "floorName",
//       room: "roomName",
//     };
//     return property[nameMap[property.type]] || "Unknown";
//   };

//   const getPropertyStats = () => {
//     const filteredZones = zones.filter(
//       (z) => z.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredSubZones = subZones.filter(
//       (s) => s.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredBuildings = buildings.filter(
//       (b) => b.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredVillaApartments = villaApartments.filter(
//       (v) => v.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredFloors = floors.filter(
//       (f) => f.contractId?.toString() === selectedContract?.toString()
//     );
//     const filteredRooms = rooms.filter(
//       (r) => r.contractId?.toString() === selectedContract?.toString()
//     );

//     const stats = {
//       zones: filteredZones.length,
//       subZones: filteredSubZones.length,
//       buildings: filteredBuildings.length,
//       villaApartments: filteredVillaApartments.length,
//       floors: filteredFloors.length,
//       rooms: filteredRooms.length,
//       total:
//         filteredZones.length +
//         filteredSubZones.length +
//         filteredBuildings.length +
//         filteredVillaApartments.length +
//         filteredFloors.length +
//         filteredRooms.length,
//     };
//     console.log("Filtered Property Stats:", stats);
//     return stats;
//   };

//   const handleCreateProperty = (type) => {
//     setFormType(type);
//     setEditingProperty(null);
//     setShowFormModal(true);
//   };

//   const handleEditProperty = (property) => {
//     setFormType(property.type);
//     setEditingProperty(property);
//     setShowFormModal(true);
//   };

//   const handleViewProperty = (property) => {
//     setSelectedProperty(property);
//     setShowDetailModal(true);
//   };

//   const handleNodeClick = (nodeData) => {
//     handleViewProperty(nodeData);
//   };

//   const handleNodeEdit = (nodeData) => {
//     handleEditProperty(nodeData);
//   };

//   const handleNodeDelete = (nodeData) => {
//     console.log("Delete node:", nodeData);
//   };

//   const stats = getPropertyStats();
//   const treeData = buildTreeData();
//   const allProperties = getAllProperties();

//   // GridView Component
//   const GridView = ({ properties }) => {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {properties.map((property) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${config.lightColor} border-2 ${config.borderColor} group`}
//             >
//               <div className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div
//                     className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                   >
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <span
//                     className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} bg-white border ${config.borderColor} shadow-sm`}
//                   >
//                     {config.name}
//                   </span>
//                 </div>

//                 {property.imageUrl && (
//                   <div className="mb-4 relative overflow-hidden rounded-lg">
//                     <img
//                       src={property.imageUrl || "/placeholder.svg"}
//                       alt={getPropertyName(property)}
//                       className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
//                   </div>
//                 )}

//                 <h4 className="font-bold text-gray-900 mb-2 text-lg">
//                   {getPropertyName(property)}
//                 </h4>

//                 {property.description && (
//                   <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
//                     {property.description}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                   <button
//                     onClick={() => handleViewProperty(property)}
//                     className="flex-1 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="View Details"
//                   >
//                     <Eye className="w-4 h-4" />
//                     <span className="text-xs font-medium">View</span>
//                   </button>
//                   <button
//                     onClick={() => handleEditProperty(property)}
//                     className="flex-1 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Edit"
//                   >
//                     <Edit className="w-4 h-4" />
//                     <span className="text-xs font-medium">Edit</span>
//                   </button>
//                   <button
//                     className="flex-1 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     <span className="text-xs font-medium">Delete</span>
//                   </button>
//                 </div>
//               </div>
//               <div
//                 className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
//               ></div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ListView Component
//   const ListView = ({ properties }) => {
//     return (
//       <div className="space-y-4">
//         {properties.map((property) => {
//           const config = propertyTypeConfig[property.type];
//           const Icon = config.icon;

//           return (
//             <div
//               key={`${property.type}-${property[`${property.type}Id`]}`}
//               className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl shadow-md border-2 border-gray-100 group"
//             >
//               <div className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-6 flex-1">
//                     <div
//                       className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
//                     >
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>

//                     {property.imageUrl && (
//                       <div className="relative overflow-hidden rounded-lg">
//                         <img
//                           src={property.imageUrl || "/placeholder.svg"}
//                           alt={getPropertyName(property)}
//                           className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
//                         />
//                       </div>
//                     )}

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h4 className="font-bold text-gray-900 text-lg">
//                           {getPropertyName(property)}
//                         </h4>
//                         <span
//                           className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} ${config.lightColor} border ${config.borderColor}`}
//                         >
//                           {config.name}
//                         </span>
//                       </div>
//                       {property.description && (
//                         <p className="text-sm text-gray-600 leading-relaxed">
//                           {property.description}
//                         </p>
//                       )}
//                       <p className="text-xs text-gray-400 mt-1">
//                         ID: {property[`${property.type}Id`]}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleViewProperty(property)}
//                       className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
//                       title="View Details"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleEditProperty(property)}
//                       className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
//                       title="Edit"
//                     >
//                       <Edit className="w-5 h-5" />
//                     </button>
//                     <button
//                       className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Zap className="w-8 h-8 text-blue-600" />
//               Property Flow Manager
//             </h1>
//             <p className="text-gray-600 text-base">
//               Manage your property hierarchy with ease
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleRefresh}
//               disabled={isRefreshing}
//               className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
//               title="Refresh Data"
//             >
//               <RefreshCw
//                 className={`w-5 h-5 text-gray-600 ${
//                   isRefreshing ? "animate-spin" : ""
//                 }`}
//               />
//             </button>

//             <select
//               value={selectedContract?.toString() || ""}
//               onChange={(e) => setSelectedContract(e.target.value)}
//               className="w-64 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
//             >
//               <option value="">Select a contract</option>
//               {contracts.map((contract) => (
//                 <option
//                   key={contract.contractId}
//                   value={contract.contractId.toString()}
//                 >
//                   {contract.contractName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {selectedContract && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {Object.entries(propertyTypeConfig).map(([type, config]) => {
//               // Map singular type to plural stats key
//               const statsKey =
//                 {
//                   zone: "zones",
//                   subZone: "subZones",
//                   building: "buildings",
//                   villaApartment: "villaApartments",
//                   floor: "floors",
//                   room: "rooms",
//                 }[type] || type;

//               return (
//                 <StatsCard
//                   key={type}
//                   type={type}
//                   count={stats[statsKey] || 0}
//                   config={config}
//                   isLoading={loading}
//                 />
//               );
//             })}
//             <TotalStatsCard total={stats.total || 0} isLoading={loading} />
//           </div>
//         )}

//         {!selectedContract ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border-2 border-gray-100">
//               <div className="p-12 text-center">
//                 <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                   <Building className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   Select a Contract
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   Choose a contract from the dropdown above to start managing
//                   your property flow and view detailed analytics
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : loading ? (
//           <div className="flex items-center justify-center h-96">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
//               </div>
//               <p className="text-gray-600 text-lg font-medium">
//                 Loading property data...
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Please wait while we fetch your properties
//               </p>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                 <div className="flex flex-col sm:flex-row gap-4 flex-1">
//                   <div className="relative flex-1 max-w-md">
//                     <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       placeholder="Search properties..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
//                     />
//                   </div>

//                   <div className="relative">
//                     <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <select
//                       value={filterType}
//                       onChange={(e) => setFilterType(e.target.value)}
//                       className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium appearance-none"
//                     >
//                       <option value="all">All Types</option>
//                       {Object.entries(propertyTypeConfig).map(
//                         ([type, config]) => (
//                           <option key={type} value={type}>
//                             {config.plural}
//                           </option>
//                         )
//                       )}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setViewMode("tree")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "tree"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <TreePine className="w-4 h-4 mr-2" />
//                     Tree
//                   </button>
//                   <button
//                     onClick={() => setViewMode("grid")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "grid"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <Grid className="w-4 h-4 mr-2" />
//                     Grid
//                   </button>
//                   <button
//                     onClick={() => setViewMode("list")}
//                     className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
//                       viewMode === "list"
//                         ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
//                         : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
//                     }`}
//                   >
//                     <List className="w-4 h-4 mr-2" />
//                     List
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <Plus className="w-5 h-5 text-blue-600" />
//                 Quick Actions
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 {Object.entries(propertyTypeConfig).map(([type, config]) => {
//                   const Icon = config.icon;
//                   return (
//                     <button
//                       key={type}
//                       onClick={() => handleCreateProperty(type)}
//                       className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl ${config.lightColor} ${config.borderColor} ${config.textColor} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105`}
//                     >
//                       <Icon className="w-4 h-4 mr-2" />
//                       Add {config.name}
//                     </button>
//                   );
//                 })}
//                 <PropertyFlowPDFGenerator
//                   treeData={treeData}
//                   selectedContract={selectedContract}
//                   contracts={contracts}
//                 />
//               </div>
//             </div>

//             {viewMode === "tree" && (
//               <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <TreePine className="w-6 h-6 text-blue-600" />
//                     Property Hierarchy Tree
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Users className="w-4 h-4" />
//                     {treeData.length} nodes
//                   </div>
//                 </div>
//                 {treeData.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
//                       <MapPin className="w-10 h-10 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">
//                       No Properties Found
//                     </h3>
//                     <p className="text-gray-600 mb-6">
//                       Start by creating zones for this contract to build your
//                       property hierarchy
//                     </p>
//                     <button
//                       onClick={() => handleCreateProperty("zone")}
//                       className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//                     >
//                       <Plus className="w-5 h-5 mr-2" />
//                       Create First Zone
//                     </button>
//                   </div>
//                 ) : (
//                   <PropertyFamilyTree
//                     key={`tree-${selectedContract || "no-contract"}`}
//                     data={treeData}
//                     onNodeClick={handleNodeClick}
//                     onNodeEdit={handleNodeEdit}
//                     onNodeDelete={handleNodeDelete}
//                   />
//                 )}
//               </div>
//             )}

//             {viewMode === "grid" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <Grid className="w-6 h-6 text-blue-600" />
//                     Grid View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <BarChart3 className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <GridView properties={allProperties} />
//               </div>
//             )}

//             {viewMode === "list" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//                     <List className="w-6 h-6 text-blue-600" />
//                     List View
//                   </h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <Activity className="w-4 h-4" />
//                     {allProperties.length} properties
//                   </div>
//                 </div>
//                 <ListView properties={allProperties} />
//               </div>
//             )}
//           </>
//         )}

//         <PropertyFormModal
//           isOpen={showFormModal}
//           onClose={() => setShowFormModal(false)}
//           type={formType}
//           property={editingProperty}
//           onSuccess={() => {
//             setShowFormModal(false);
//             refreshData();
//           }}
//           contracts={contracts}
//           zones={zones}
//           subZones={subZones}
//           buildings={buildings}
//           villaApartments={villaApartments}
//           floors={floors}
//         />

//         <PropertyDetailModal
//           isOpen={showDetailModal}
//           onClose={() => setShowDetailModal(false)}
//           property={selectedProperty}
//         />
//       </div>
//     </div>
//   );
// };

// export default PropertyFlowManagement;

"use client";
import PropertyFlowPDFGenerator from "../components/PropertyFlow/PropertyFlowPDFGenerator";
import { useState, useEffect, useRef } from "react";
import {
  Building,
  Home,
  MapPin,
  Layers,
  DoorOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Grid,
  List,
  Zap,
  Upload,
  Save,
  X,
  User,
  ImageIcon,
  TreePine,
  BarChart3,
  TrendingUp,
  Filter,
  RefreshCw,
  ChevronDown,
  Calendar,
  Clock,
  Users,
  Activity,
} from "lucide-react";
import { usePropertyFlow } from "../context/PropertyFlowContext";
import { contractService } from "../services/contractService";
import { propertyFlowService } from "../services/propertyFlowService";
import * as go from "gojs";

export const propertyTypeConfig = {
  zone: {
    icon: MapPin,
    color: "#3B82F6",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    bgGradient: "from-blue-500 to-blue-600",
    name: "Zone",
    plural: "Zones",
  },
  subZone: {
    icon: Layers,
    color: "#10B981",
    lightColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    bgGradient: "from-emerald-500 to-emerald-600",
    name: "SubZone",
    plural: "SubZones",
  },
  building: {
    icon: Building,
    color: "#8B5CF6",
    lightColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    bgGradient: "from-purple-500 to-purple-600",
    name: "Building",
    plural: "Buildings",
  },
  villaApartment: {
    icon: Home,
    color: "#F59E0B",
    lightColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    bgGradient: "from-amber-500 to-amber-600",
    name: "Villa/Apartment",
    plural: "Villa/Apartments",
  },
  floor: {
    icon: Layers,
    color: "#6366F1",
    lightColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-700",
    bgGradient: "from-indigo-500 to-indigo-600",
    name: "Floor",
    plural: "Floors",
  },
  room: {
    icon: DoorOpen,
    color: "#EF4444",
    lightColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    bgGradient: "from-red-500 to-red-600",
    name: "Room",
    plural: "Rooms",
  },
};
// StatsCard Component
const StatsCard = ({ type, count, config, isLoading }) => {
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      <div className="p-2 bg-gray-100 rounded-md">
        <Icon className={`w-6 h-6 ${config.textColor}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 uppercase">
          {config.plural}
        </p>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 w-12 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <p className="text-2xl font-semibold text-gray-900">
            {count.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

// TotalStatsCard Component
const TotalStatsCard = ({ total, isLoading }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors col-span-2">
      <div className="p-2 bg-gray-100 rounded-md">
        <BarChart3 className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 uppercase">
          Total Properties
        </p>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <p className="text-2xl font-semibold text-gray-900">
            {total.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

// PropertyFamilyTree Component
const PropertyFamilyTree = ({
  data,
  onNodeClick,
  onNodeEdit,
  onNodeDelete,
}) => {
  const diagramRef = useRef(null);
  const diagramInstanceRef = useRef(null);

  useEffect(() => {
    if (!diagramRef.current) return;

    const $ = go.GraphObject.make;

    if (diagramInstanceRef.current) {
      diagramInstanceRef.current.div = null;
      diagramInstanceRef.current = null;
    }

    const diagram = $(go.Diagram, diagramRef.current, {
      "toolManager.hoverDelay": 100,
      "toolManager.toolTipDuration": 10000,
      layout: $(go.TreeLayout, {
        treeStyle: go.TreeLayout.StyleLastParents,
        arrangement: go.TreeLayout.ArrangementHorizontal,
        angle: 90,
        layerSpacing: 50,
        alternateAngle: 90,
        alternateLayerSpacing: 50,
        alternateAlignment: go.TreeLayout.AlignmentBus,
        alternateNodeSpacing: 30,
      }),
      "undoManager.isEnabled": true,
      "animationManager.isEnabled": true,
      "animationManager.duration": 1000,
      "animationManager.isInitial": false,
      initialContentAlignment: go.Spot.Center,
      "grid.visible": true,
      "grid.gridCellSize": new go.Size(20, 20),
    });

    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      {
        locationSpot: go.Spot.Center,
        isShadowed: true,
        shadowBlur: 3,
        shadowOffset: new go.Point(2, 2),
        shadowColor: "rgba(0, 0, 0, .2)",
        selectionAdornmentTemplate: $(
          go.Adornment,
          "Auto",
          $(go.Shape, "RoundedRectangle", {
            fill: null,
            stroke: "#4F46E5",
            strokeWidth: 3,
            strokeDashArray: [5, 5],
          }),
          $(go.Placeholder)
        ),
      },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      $(
        go.Shape,
        "RoundedRectangle",
        {
          name: "SHAPE",
          fill: "white",
          stroke: "#E5E7EB",
          strokeWidth: 2,
          minSize: new go.Size(140, 80),
        },
        new go.Binding("fill", "type", (type) => {
          const config = propertyTypeConfig[type];
          return config ? config.color + "15" : "#F9FAFB";
        }),
        new go.Binding(
          "stroke",
          "type",
          (type) => propertyTypeConfig[type]?.color || "#6B7280"
        )
      ),
      $(
        go.Panel,
        "Vertical",
        { margin: 12 },
        $(
          go.Panel,
          "Horizontal",
          {
            alignment: go.Spot.Center,
            margin: new go.Margin(0, 0, 8, 0),
            background: "rgba(255,255,255,0.8)",
            padding: 4,
          },
          $(
            go.TextBlock,
            {
              font: "bold 14px sans-serif",
              margin: new go.Margin(0, 6, 0, 0),
            },
            new go.Binding("text", "type", (type) => {
              const icons = {
                zone: "🌍",
                subZone: "📍",
                building: "🏢",
                villaApartment: "🏠",
                floor: "🏗️",
                room: "🚪",
              };
              return icons[type] || "📦";
            })
          ),
          $(
            go.TextBlock,
            {
              font: "bold 10px sans-serif",
              textAlign: "center",
            },
            new go.Binding(
              "text",
              "type",
              (type) => propertyTypeConfig[type]?.name || "Unknown"
            ),
            new go.Binding(
              "stroke",
              "type",
              (type) => propertyTypeConfig[type]?.color || "#6B7280"
            )
          )
        ),
        $(
          go.TextBlock,
          {
            font: "bold 14px sans-serif",
            stroke: "#1F2937",
            maxSize: new go.Size(120, Number.NaN),
            wrap: go.TextBlock.WrapFit,
            textAlign: "center",
            margin: new go.Margin(0, 0, 4, 0),
          },
          new go.Binding("text", "name")
        ),
        $(
          go.TextBlock,
          {
            font: "10px sans-serif",
            stroke: "#6B7280",
            textAlign: "center",
          },
          new go.Binding("text", "id", (id) => `ID: ${id}`)
        )
      ),
      {
        toolTip: $(
          go.Adornment,
          "Auto",
          $(go.Shape, {
            fill: "#1F2937",
            stroke: "#374151",
          }),
          $(
            go.Panel,
            "Vertical",
            { margin: 12 },
            $(
              go.TextBlock,
              {
                font: "bold 14px sans-serif",
                stroke: "white",
                margin: new go.Margin(0, 0, 4, 0),
              },
              new go.Binding("text", "name")
            ),
            $(
              go.TextBlock,
              {
                font: "12px sans-serif",
                stroke: "#D1D5DB",
              },
              new go.Binding(
                "text",
                "type",
                (type) => `Type: ${propertyTypeConfig[type]?.name || "Unknown"}`
              )
            ),
            $(
              go.TextBlock,
              {
                font: "12px sans-serif",
                stroke: "#D1D5DB",
              },
              new go.Binding("text", "id", (id) => `ID: ${id}`)
            ),
            $(
              go.TextBlock,
              {
                font: "12px sans-serif",
                stroke: "#D1D5DB",
                maxSize: new go.Size(200, Number.NaN),
                wrap: go.TextBlock.WrapFit,
              },
              new go.Binding("text", "description", (desc) =>
                desc ? `Description: ${desc}` : ""
              ),
              new go.Binding("visible", "description", (desc) => !!desc)
            )
          )
        ),
      },
      {
        click: (e, node) => {
          const data = node.data;
          if (onNodeClick) onNodeClick(data);
        },
        doubleClick: (e, node) => {
          const data = node.data;
          if (onNodeEdit) onNodeEdit(data);
        },
      }
    );

    diagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Link.Orthogonal,
        corner: 8,
        selectable: false,
      },
      $(go.Shape, {
        strokeWidth: 3,
        stroke: "#D1D5DB",
        strokeDashArray: [8, 4],
      }),
      $(go.Shape, {
        toArrow: "Standard",
        fill: "#9CA3AF",
        stroke: "#9CA3AF",
        scale: 1.2,
      })
    );

    diagram.nodeTemplate.contextMenu = $(
      go.Adornment,
      "Vertical",
      { background: "white", shadowBlur: 8 },
      $(
        "ContextMenuButton",
        $(go.TextBlock, "👁️ View Details", {
          font: "12px sans-serif",
          margin: 8,
        }),
        {
          click: (e, button) => {
            const data = button.part.adornedPart.data;
            if (onNodeClick) onNodeClick(data);
          },
        }
      ),
      $(
        "ContextMenuButton",
        $(go.TextBlock, "✏️ Edit", {
          font: "12px sans-serif",
          margin: 8,
        }),
        {
          click: (e, button) => {
            const data = button.part.adornedPart.data;
            if (onNodeEdit) onNodeEdit(data);
          },
        }
      ),
      $(
        "ContextMenuButton",
        $(go.TextBlock, "🗑️ Delete", {
          font: "12px sans-serif",
          margin: 8,
          stroke: "#EF4444",
        }),
        {
          click: (e, button) => {
            const data = button.part.adornedPart.data;
            if (onNodeDelete) onNodeDelete(data);
          },
        }
      )
    );

    diagramInstanceRef.current = diagram;

    return () => {
      if (diagramInstanceRef.current) {
        diagramInstanceRef.current.div = null;
        diagramInstanceRef.current = null;
      }
    };
  }, [onNodeClick, onNodeEdit, onNodeDelete]);

  useEffect(() => {
    if (diagramInstanceRef.current && data && data.length > 0) {
      try {
        const diagram = diagramInstanceRef.current;
        diagram.model = new go.TreeModel(data);
      } catch (error) {
        console.error("Error setting GoJS model:", error);
      }
    }
  }, [data]);

  // In PropertyFamilyTree component
  return (
    // <div
    //   ref={diagramRef}
    //   className="w-full h-96 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner gojs-diagram"
    //   style={{ minHeight: "500px" }}
    // />
    <div
      ref={diagramRef}
      className="w-full h-[50rem] border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner gojs-diagram"
      style={{ minHeight: "500px" }}
    />
  );
};

// PropertyFormModal Component
const PropertyFormModal = ({
  isOpen,
  onClose,
  type,
  property,
  onSuccess,
  contracts,
  zones,
  subZones,
  buildings,
  villaApartments,
  floors,
}) => {
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isEdit = !!property;
  const config = propertyTypeConfig[type] || propertyTypeConfig.zone;

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, type, property]);

  const resetForm = () => {
    if (property) {
      setFormData({ ...property });
      setImagePreview(property.imageUrl);
    } else {
      setFormData({
        contractId: "",
        description: "",
        ...getDefaultFields(type),
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setErrors({});
  };

  const getDefaultFields = (type) => {
    const fields = {
      zone: { zoneName: "" },
      subZone: { subZoneName: "", zoneId: "" },
      building: { buildingName: "", subZoneId: "" },
      villaApartment: { villaApartmentName: "", buildingId: "" },
      floor: { floorName: "", villaApartmentId: "" },
      room: { roomName: "", floorId: "" },
    };
    return fields[type] || {};
  };

  const getParentOptions = () => {
    switch (type) {
      case "subZone":
        return zones.filter(
          (z) => z.contractId.toString() === formData.contractId
        );
      case "building":
        return subZones.filter(
          (s) => s.contractId.toString() === formData.contractId
        );
      case "villaApartment":
        return buildings.filter(
          (b) => b.contractId.toString() === formData.contractId
        );
      case "floor":
        return villaApartments.filter(
          (v) => v.contractId.toString() === formData.contractId
        );
      case "room":
        return floors.filter(
          (f) => f.contractId.toString() === formData.contractId
        );
      default:
        return [];
    }
  };

  const getParentFieldName = () => {
    const parentFields = {
      subZone: "zoneId",
      building: "subZoneId",
      villaApartment: "buildingId",
      floor: "villaApartmentId",
      room: "floorId",
    };
    return parentFields[type];
  };

  const getParentDisplayName = () => {
    const parentNames = {
      subZone: "Zone",
      building: "SubZone",
      villaApartment: "Building",
      floor: "Villa/Apartment",
      room: "Floor",
    };
    return parentNames[type];
  };

  const getParentItemName = (item) => {
    const nameFields = {
      zone: "zoneName",
      subZone: "subZoneName",
      building: "buildingName",
      villaApartment: "villaApartmentName",
      floor: "floorName",
    };

    const parentType = {
      subZone: "zone",
      building: "subZone",
      villaApartment: "building",
      floor: "villaApartment",
      room: "floor",
    }[type];

    return item[nameFields[parentType]] || "Unknown";
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "contractId") {
      const parentField = getParentFieldName();
      if (parentField) {
        setFormData((prev) => ({
          ...prev,
          [parentField]: "",
        }));
      }
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const nameField = `${type}Name`;
    if (!formData[nameField]?.trim()) {
      newErrors[nameField] = "Name is required";
    }

    if (!formData.contractId) {
      newErrors.contractId = "Contract is required";
    }

    const parentField = getParentFieldName();
    if (parentField && !formData[parentField]) {
      newErrors[parentField] = `${getParentDisplayName()} is required`;
    }

    if (!isEdit && !imageFile) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const serviceMethod = isEdit
        ? propertyFlowService[
            `update${type.charAt(0).toUpperCase() + type.slice(1)}`
          ]
        : propertyFlowService[
            `create${type.charAt(0).toUpperCase() + type.slice(1)}`
          ];

      if (isEdit) {
        const idField = `${type}Id`;
        await serviceMethod(property[idField], formData, imageFile);
      } else {
        await serviceMethod(formData, imageFile);
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving property:", error);
      setErrors({ submit: "Failed to save property. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    const typeNames = {
      zone: "Zone",
      subZone: "SubZone",
      building: "Building",
      villaApartment: "Villa/Apartment",
      floor: "Floor",
      room: "Room",
    };

    return `${isEdit ? "Edit" : "Create"} ${typeNames[type]}`;
  };

  const nameField = `${type}Name`;
  const parentField = getParentFieldName();
  const parentOptions = getParentOptions();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div
          className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <config.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Contract *
            </label>
            <select
              value={formData.contractId?.toString() || ""}
              onChange={(e) => handleInputChange("contractId", e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors.contractId ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select a contract</option>
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
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X className="w-4 h-4" />
                {errors.contractId}
              </p>
            )}
          </div>

          {parentField && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                {getParentDisplayName()} *
              </label>
              <select
                value={formData[parentField]?.toString() || ""}
                onChange={(e) => handleInputChange(parentField, e.target.value)}
                disabled={!formData.contractId}
                className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-all ${
                  errors[parentField] ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="">
                  Select a {getParentDisplayName().toLowerCase()}
                </option>
                {parentOptions.map((option) => {
                  const idField = `${
                    type === "subZone"
                      ? "zone"
                      : type === "building"
                      ? "subZone"
                      : type === "villaApartment"
                      ? "building"
                      : type === "floor"
                      ? "villaApartment"
                      : "floor"
                  }Id`;
                  return (
                    <option
                      key={option[idField]}
                      value={option[idField].toString()}
                    >
                      {getParentItemName(option)}
                    </option>
                  );
                })}
              </select>
              {errors[parentField] && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {errors[parentField]}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Name *
            </label>
            <input
              type="text"
              value={formData[nameField] || ""}
              onChange={(e) => handleInputChange(nameField, e.target.value)}
              placeholder={`Enter ${type} name`}
              className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                errors[nameField] ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors[nameField] && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X className="w-4 h-4" />
                {errors[nameField]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Description
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={`Enter ${type} description`}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Image {!isEdit && "*"}
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-blue-400 hover:bg-blue-50 ${
                errors.image ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-xl border-4 border-white shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
                      <Edit className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                    className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("image-upload").click()
                      }
                      className="inline-flex items-center px-6 py-3 border-2 border-blue-300 shadow-sm text-sm font-semibold rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Image
                    </button>
                    <p className="text-sm text-gray-500 mt-3">
                      Upload an image for this {type}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {errors.image && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X className="w-4 h-4" />
                {errors.image}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <X className="w-4 h-4" />
                {errors.submit}
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border-2 border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r ${config.bgGradient} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  {isEdit ? "Update" : "Create"}{" "}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// PropertyDetailModal Component
const PropertyDetailModal = ({ isOpen, onClose, property }) => {
  if (!property || !isOpen) return null;

  const config = propertyTypeConfig[property.type];
  const Icon = config.icon;

  const getPropertyName = (property) => {
    const nameMap = {
      zone: "zoneName",
      subZone: "subZoneName",
      building: "buildingName",
      villaApartment: "villaApartmentName",
      floor: "floorName",
      room: "roomName",
    };
    return property[nameMap[property.type]] || "Unknown";
  };

  const getPropertyId = (property) => {
    return property[`${property.type}Id`];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div
          className={`bg-gradient-to-r ${config.bgGradient} p-6 rounded-t-2xl`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {config.name} Details
                </h2>
                <p className="text-blue-100 text-sm">
                  {getPropertyName(property)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-blue-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Name
                  </label>
                  <p className="text-xl font-bold text-gray-900 bg-white p-3 rounded-lg border">
                    {getPropertyName(property)}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Type
                  </label>
                  <div className="bg-white p-3 rounded-lg border">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.lightColor} ${config.textColor} border ${config.borderColor}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {config.name}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    ID
                  </label>
                  <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
                    {getPropertyId(property)}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Contract ID
                  </label>
                  <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
                    {property.contractId}
                  </p>
                </div>
              </div>

              {property.description && (
                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Description
                  </label>
                  <p className="text-gray-900 bg-white p-4 rounded-lg border-2 border-gray-100 leading-relaxed">
                    {property.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Image
              </h3>
              {property.imageUrl ? (
                <div className="relative group">
                  <img
                    src={property.imageUrl || "/placeholder.svg"}
                    alt={getPropertyName(property)}
                    className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 shadow-lg group-hover:shadow-xl transition-all"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ) : (
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      No image available
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                Hierarchy Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.zoneId && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Zone ID
                    </label>
                    <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
                      {property.zoneId}
                    </p>
                  </div>
                )}

                {property.subZoneId && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      SubZone ID
                    </label>
                    <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
                      {property.subZoneId}
                    </p>
                  </div>
                )}

                {property.buildingId && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Building ID
                    </label>
                    <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
                      {property.buildingId}
                    </p>
                  </div>
                )}

                {property.villaApartmentId && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Villa/Apartment ID
                    </label>
                    <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
                      {property.villaApartmentId}
                    </p>
                  </div>
                )}

                {property.floorId && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Floor ID
                    </label>
                    <p className="text-lg font-mono text-gray-900 bg-white p-3 rounded-lg border">
                      {property.floorId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {(property.createdAt || property.updatedAt) && (
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Metadata
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {property.createdAt && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Created Date
                      </label>
                      <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {property.updatedAt && (
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Last Updated
                      </label>
                      <p className="text-lg text-gray-900 bg-white p-3 rounded-lg border">
                        {new Date(property.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Main PropertyFlowManagement Component
const PropertyFlowManagement = () => {
  const {
    zones,
    subZones,
    buildings,
    villaApartments,
    floors,
    rooms,
    selectedContract,
    setSelectedContract,
    loading,
    refreshData,
  } = usePropertyFlow();

  const [contracts, setContracts] = useState([]);
  const [viewMode, setViewMode] = useState("tree");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [formType, setFormType] = useState("zone");
  const [editingProperty, setEditingProperty] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadContracts();
  }, []);

  useEffect(() => {
    console.log("PropertyFlow Context Data:", {
      zones,
      subZones,
      buildings,
      villaApartments,
      floors,
      rooms,
      selectedContract,
    });
  }, [
    zones,
    subZones,
    buildings,
    villaApartments,
    floors,
    rooms,
    selectedContract,
  ]);

  const loadContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data || []);
    } catch (error) {
      console.error("Error loading contracts:", error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const buildTreeData = () => {
    const treeData = [];
    if (!selectedContract) return treeData;

    zones
      .filter((z) => z.contractId?.toString() === selectedContract?.toString())
      .forEach((zone) => {
        const zoneNode = {
          key: `zone-${zone.zoneId}`,
          name: zone.zoneName || "Unnamed Zone",
          type: "zone",
          id: zone.zoneId,
          description: zone.description,
          imageUrl: zone.imageUrl,
          contractId: zone.contractId,
          ...zone,
        };
        treeData.push(zoneNode);

        subZones
          .filter(
            (sz) =>
              sz.zoneId === zone.zoneId &&
              sz.contractId?.toString() === selectedContract?.toString()
          )
          .forEach((subZone) => {
            const subZoneNode = {
              key: `subZone-${subZone.subZoneId}`,
              parent: `zone-${zone.zoneId}`,
              name: subZone.subZoneName || "Unnamed SubZone",
              type: "subZone",
              id: subZone.subZoneId,
              description: subZone.description,
              imageUrl: subZone.imageUrl,
              contractId: subZone.contractId,
              ...subZone,
            };
            treeData.push(subZoneNode);

            buildings
              .filter(
                (b) =>
                  b.subZoneId === subZone.subZoneId &&
                  b.contractId?.toString() === selectedContract?.toString()
              )
              .forEach((building) => {
                const buildingNode = {
                  key: `building-${building.buildingId}`,
                  parent: `subZone-${subZone.subZoneId}`,
                  name: building.buildingName || "Unnamed Building",
                  type: "building",
                  id: building.buildingId,
                  description: building.description,
                  imageUrl: building.imageUrl,
                  contractId: building.contractId,
                  ...building,
                };
                treeData.push(buildingNode);

                villaApartments
                  .filter(
                    (va) =>
                      va.buildingId === building.buildingId &&
                      va.contractId?.toString() === selectedContract?.toString()
                  )
                  .forEach((villaApartment) => {
                    const vaNode = {
                      key: `villaApartment-${villaApartment.villaApartmentId}`,
                      parent: `building-${building.buildingId}`,
                      name:
                        villaApartment.villaApartmentName ||
                        "Unnamed Villa/Apartment",
                      type: "villaApartment",
                      id: villaApartment.villaApartmentId,
                      description: villaApartment.description,
                      imageUrl: villaApartment.imageUrl,
                      contractId: villaApartment.contractId,
                      ...villaApartment,
                    };
                    treeData.push(vaNode);

                    floors
                      .filter(
                        (f) =>
                          f.villaApartmentId ===
                            villaApartment.villaApartmentId &&
                          f.contractId?.toString() ===
                            selectedContract?.toString()
                      )
                      .forEach((floor) => {
                        const floorNode = {
                          key: `floor-${floor.floorId}`,
                          parent: `villaApartment-${villaApartment.villaApartmentId}`,
                          name: floor.floorName || "Unnamed Floor",
                          type: "floor",
                          id: floor.floorId,
                          description: floor.description,
                          imageUrl: floor.imageUrl,
                          contractId: floor.contractId,
                          ...floor,
                        };
                        treeData.push(floorNode);

                        rooms
                          .filter(
                            (r) =>
                              r.floorId === floor.floorId &&
                              r.contractId?.toString() ===
                                selectedContract?.toString()
                          )
                          .forEach((room) => {
                            const roomNode = {
                              key: `room-${room.roomId}`,
                              parent: `floor-${floor.floorId}`,
                              name: room.roomName || "Unnamed Room",
                              type: "room",
                              id: room.roomId,
                              description: room.description,
                              imageUrl: room.imageUrl,
                              contractId: room.contractId,
                              ...room,
                            };
                            treeData.push(roomNode);
                          });
                      });
                  });
              });
          });
      });
    return treeData;
  };

  const getAllProperties = () => {
    if (!selectedContract) return [];

    const allProperties = [
      ...zones.map((z) => ({ ...z, type: "zone" })),
      ...subZones.map((s) => ({ ...s, type: "subZone" })),
      ...buildings.map((b) => ({ ...b, type: "building" })),
      ...villaApartments.map((v) => ({ ...v, type: "villaApartment" })),
      ...floors.map((f) => ({ ...f, type: "floor" })),
      ...rooms.map((r) => ({ ...r, type: "room" })),
    ].filter(
      (property) =>
        property.contractId?.toString() === selectedContract?.toString()
    );

    return allProperties.filter((property) => {
      const matchesSearch = getPropertyName(property)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === "all" || property.type === filterType;
      return matchesSearch && matchesFilter;
    });
  };

  const getPropertyName = (property) => {
    const nameMap = {
      zone: "zoneName",
      subZone: "subZoneName",
      building: "buildingName",
      villaApartment: "villaApartmentName",
      floor: "floorName",
      room: "roomName",
    };
    return property[nameMap[property.type]] || "Unknown";
  };

  const getPropertyStats = () => {
    const filteredZones = zones.filter(
      (z) => z.contractId?.toString() === selectedContract?.toString()
    );
    const filteredSubZones = subZones.filter(
      (s) => s.contractId?.toString() === selectedContract?.toString()
    );
    const filteredBuildings = buildings.filter(
      (b) => b.contractId?.toString() === selectedContract?.toString()
    );
    const filteredVillaApartments = villaApartments.filter(
      (v) => v.contractId?.toString() === selectedContract?.toString()
    );
    const filteredFloors = floors.filter(
      (f) => f.contractId?.toString() === selectedContract?.toString()
    );
    const filteredRooms = rooms.filter(
      (r) => r.contractId?.toString() === selectedContract?.toString()
    );

    const stats = {
      zones: filteredZones.length,
      subZones: filteredSubZones.length,
      buildings: filteredBuildings.length,
      villaApartments: filteredVillaApartments.length,
      floors: filteredFloors.length,
      rooms: filteredRooms.length,
      total:
        filteredZones.length +
        filteredSubZones.length +
        filteredBuildings.length +
        filteredVillaApartments.length +
        filteredFloors.length +
        filteredRooms.length,
    };
    console.log("Filtered Property Stats:", stats);
    return stats;
  };

  const handleCreateProperty = (type) => {
    setFormType(type);
    setEditingProperty(null);
    setShowFormModal(true);
  };

  const handleEditProperty = (property) => {
    setFormType(property.type);
    setEditingProperty(property);
    setShowFormModal(true);
  };

  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setShowDetailModal(true);
  };

  const handleNodeClick = (nodeData) => {
    handleViewProperty(nodeData);
  };

  const handleNodeEdit = (nodeData) => {
    handleEditProperty(nodeData);
  };

  const handleNodeDelete = (nodeData) => {
    console.log("Delete node:", nodeData);
  };

  const stats = getPropertyStats();
  const treeData = buildTreeData();
  const allProperties = getAllProperties();

  // GridView Component
  const GridView = ({ properties }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((property) => {
          const config = propertyTypeConfig[property.type];
          const Icon = config.icon;

          return (
            <div
              key={`${property.type}-${property[`${property.type}Id`]}`}
              className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${config.lightColor} border-2 ${config.borderColor} group`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} bg-white border ${config.borderColor} shadow-sm`}
                  >
                    {config.name}
                  </span>
                </div>

                {property.imageUrl && (
                  <div className="mb-4 relative overflow-hidden rounded-lg">
                    <img
                      src={property.imageUrl || "/placeholder.svg"}
                      alt={getPropertyName(property)}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
                  </div>
                )}

                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {getPropertyName(property)}
                </h4>

                {property.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>
                )}

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleViewProperty(property)}
                    className="flex-1 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-xs font-medium">View</span>
                  </button>
                  <button
                    onClick={() => handleEditProperty(property)}
                    className="flex-1 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-xs font-medium">Edit</span>
                  </button>
                  <button
                    className="flex-1 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-xs font-medium">Delete</span>
                  </button>
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.bgGradient}`}
              ></div>
            </div>
          );
        })}
      </div>
    );
  };

  // ListView Component
  const ListView = ({ properties }) => {
    return (
      <div className="space-y-4">
        {properties.map((property) => {
          const config = propertyTypeConfig[property.type];
          const Icon = config.icon;

          return (
            <div
              key={`${property.type}-${property[`${property.type}Id`]}`}
              className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl shadow-md border-2 border-gray-100 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${config.bgGradient} shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {property.imageUrl && (
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={property.imageUrl || "/placeholder.svg"}
                          alt={getPropertyName(property)}
                          className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">
                          {getPropertyName(property)}
                        </h4>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.textColor} ${config.lightColor} border ${config.borderColor}`}
                        >
                          {config.name}
                        </span>
                      </div>
                      {property.description && (
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {property.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        ID: {property[`${property.type}Id`]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleViewProperty(property)}
                      className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEditProperty(property)}
                      className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              Property Flow Manager
            </h1>
            <p className="text-gray-600 text-base">
              Manage your property hierarchy with ease
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw
                className={`w-5 h-5 text-gray-600 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>

            <select
              value={selectedContract?.toString() || ""}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="">Select a contract</option>
              {contracts.map((contract) => (
                <option
                  key={contract.contractId}
                  value={contract.contractId.toString()}
                >
                  {contract.contractName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedContract && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(propertyTypeConfig).map(([type, config]) => {
              // Map singular type to plural stats key
              const statsKey =
                {
                  zone: "zones",
                  subZone: "subZones",
                  building: "buildings",
                  villaApartment: "villaApartments",
                  floor: "floors",
                  room: "rooms",
                }[type] || type;

              return (
                <StatsCard
                  key={type}
                  type={type}
                  count={stats[statsKey] || 0}
                  config={config}
                  isLoading={loading}
                />
              );
            })}
            <TotalStatsCard total={stats.total || 0} isLoading={loading} />
          </div>
        )}

        {!selectedContract ? (
          <div className="flex items-center justify-center h-96">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border-2 border-gray-100">
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Building className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Select a Contract
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose a contract from the dropdown above to start managing
                  your property flow and view detailed analytics
                </p>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">
                Loading property data...
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Please wait while we fetch your properties
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-medium appearance-none"
                    >
                      <option value="all">All Types</option>
                      {Object.entries(propertyTypeConfig).map(
                        ([type, config]) => (
                          <option key={type} value={type}>
                            {config.plural}
                          </option>
                        )
                      )}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewMode("tree")}
                    className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                      viewMode === "tree"
                        ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <TreePine className="w-4 h-4 mr-2" />
                    Tree
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                      viewMode === "grid"
                        ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="w-4 h-4 mr-2" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                      viewMode === "list"
                        ? "border-transparent text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                        : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-4 h-4 mr-2" />
                    List
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(propertyTypeConfig).map(([type, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={type}
                      onClick={() => handleCreateProperty(type)}
                      className={`inline-flex items-center px-4 py-3 border-2 text-sm font-semibold rounded-xl ${config.lightColor} ${config.borderColor} ${config.textColor} hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      Add {config.name}
                    </button>
                  );
                })}
                <PropertyFlowPDFGenerator
                  treeData={treeData}
                  selectedContract={selectedContract}
                  contracts={contracts}
                />
              </div>
            </div>

            {viewMode === "tree" && (
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <TreePine className="w-6 h-6 text-blue-600" />
                    Property Hierarchy Tree
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    {treeData.length} nodes
                  </div>
                </div>
                {treeData.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      No Properties Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start by creating zones for this contract to build your
                      property hierarchy
                    </p>
                    <button
                      onClick={() => handleCreateProperty("zone")}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Create First Zone
                    </button>
                  </div>
                ) : (
                  <PropertyFamilyTree
                    key={`tree-${selectedContract || "no-contract"}`}
                    data={treeData}
                    onNodeClick={handleNodeClick}
                    onNodeEdit={handleNodeEdit}
                    onNodeDelete={handleNodeDelete}
                  />
                )}
              </div>
            )}

            {viewMode === "grid" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <Grid className="w-6 h-6 text-blue-600" />
                    Grid View
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BarChart3 className="w-4 h-4" />
                    {allProperties.length} properties
                  </div>
                </div>
                <GridView properties={allProperties} />
              </div>
            )}

            {viewMode === "list" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                    <List className="w-6 h-6 text-blue-600" />
                    List View
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Activity className="w-4 h-4" />
                    {allProperties.length} properties
                  </div>
                </div>
                <ListView properties={allProperties} />
              </div>
            )}
          </>
        )}

        <PropertyFormModal
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          type={formType}
          property={editingProperty}
          onSuccess={() => {
            setShowFormModal(false);
            refreshData();
          }}
          contracts={contracts}
          zones={zones}
          subZones={subZones}
          buildings={buildings}
          villaApartments={villaApartments}
          floors={floors}
        />

        <PropertyDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          property={selectedProperty}
        />
      </div>
    </div>
  );
};

export default PropertyFlowManagement;
