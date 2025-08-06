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

//   return (
//     <div
//       ref={diagramRef}
//       className="w-full h-[50rem] border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-inner gojs-diagram"
//       style={{ minHeight: "500px" }}
//     />
//   );
// };

// // PropertyFormModal Component - Updated to use selectedContract
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
//   const { selectedContract } = usePropertyFlow();
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
//   }, [isOpen, type, property, selectedContract]);

//   const resetForm = () => {
//     if (property) {
//       setFormData({ ...property });
//       setImagePreview(property.imageUrl);
//     } else {
//       setFormData({
//         contractId: selectedContract?.toString() || "",
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
//     // Image is now optional - no validation needed
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
//               disabled={!!selectedContract}
//               className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-100 disabled:text-gray-600 ${
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
//             {selectedContract && (
//               <p className="text-xs text-blue-600">
//                 Contract pre-selected from property flow management
//               </p>
//             )}
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
//               Image <span className="text-gray-500">(Optional)</span>
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
//                       Upload an image for this {type} (optional)
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

import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import * as d3 from "d3";
import {
  Plus,
  Building,
  MapPin,
  Home,
  Layers,
  DoorOpen,
  Edit,
  Trash2,
  X,
  Upload,
  Save,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  BarChart3,
  Eye,
  Info,
  Search,
  ArrowLeft,
} from "lucide-react";
import { contractService } from "../services/contractService";
import { propertyFlowService } from "../services/propertyFlowService";

const PropertyFlowManagement = () => {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [propertyData, setPropertyData] = useState({
    zones: [],
    subZones: [],
    buildings: [],
    villaApartments: [],
    floors: [],
    rooms: [],
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [statistics, setStatistics] = useState({});

  // New states for features
  const [showDiagram, setShowDiagram] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showMiniMap, setShowMiniMap] = useState(true);

  const svgRef = useRef();
  const miniMapRef = useRef();
  const zoomRef = useRef();
  const searchInputRef = useRef();

  const propertyTypes = [
    { key: "zone", label: "Add Zone", icon: MapPin, color: "bg-blue-600" },
    {
      key: "subZone",
      label: "Add SubZone",
      icon: Building,
      color: "bg-green-600",
    },
    {
      key: "building",
      label: "Add Building",
      icon: Building,
      color: "bg-purple-600",
    },
    {
      key: "villaApartment",
      label: "Add Villa/Apartment",
      icon: Home,
      color: "bg-orange-600",
    },
    { key: "floor", label: "Add Floor", icon: Layers, color: "bg-indigo-600" },
    { key: "room", label: "Add Room", icon: DoorOpen, color: "bg-pink-600" },
  ];

  useEffect(() => {
    fetchContracts();
  }, []);

  useEffect(() => {
    if (selectedContract) {
      fetchPropertyData();
    }
  }, [selectedContract]);

  useEffect(() => {
    if (selectedContract && propertyData.zones.length >= 0) {
      calculateStatistics();
      if (showDiagram) {
        renderTree();
      }
    }
  }, [propertyData, selectedContract, showDiagram]);

  // Search functionality
  useEffect(() => {
    if (searchTerm && selectedContract) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, selectedContract]);

  // Keyboard shortcuts
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if ((e.ctrlKey || e.metaKey) && e.key === "f") {
  //       e.preventDefault();
  //       searchInputRef.current?.focus();
  //     }
  //     if (e.key === "Escape") {
  //       setSearchTerm("");
  //       setShowDetailModal(false);
  //       setShowForm(false);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, []);

  // Update your useEffect for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+F or Cmd+F to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select(); // Also select text for quick replacement
      }
      // Escape to clear search
      if (e.key === "Escape") {
        if (searchTerm) {
          setSearchTerm("");
          setSearchResults([]);
        } else {
          setShowDetailModal(false);
          setShowForm(false);
        }
      }
      // Enter to confirm search when input is focused
      if (
        e.key === "Enter" &&
        document.activeElement === searchInputRef.current
      ) {
        if (searchResults.length > 0) {
          focusOnSearchResult(searchResults[0]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchTerm, searchResults]);

  const fetchContracts = async () => {
    try {
      const response = await contractService.getAllContracts();
      setContracts(response.data);
    } catch (error) {
      toast.error("Failed to fetch contracts");
    }
  };

  const fetchPropertyData = async () => {
    if (!selectedContract) return;

    setLoading(true);
    try {
      const [zones, subZones, buildings, villaApartments, floors, rooms] =
        await Promise.all([
          propertyFlowService.getAllZonesByContract(selectedContract),
          propertyFlowService.getAllSubZonesByContract(selectedContract),
          propertyFlowService.getAllBuildingsByContract(selectedContract),
          propertyFlowService.getAllVillaApartmentsByContract(selectedContract),
          propertyFlowService.getAllFloorsByContract(selectedContract),
          propertyFlowService.getAllRoomsByContract(selectedContract),
        ]);

      setPropertyData({
        zones: zones.data,
        subZones: subZones.data,
        buildings: buildings.data,
        villaApartments: villaApartments.data,
        floors: floors.data,
        rooms: rooms.data,
      });
    } catch (error) {
      toast.error("Failed to fetch property data");
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = () => {
    setStatistics({
      zones: propertyData.zones.length,
      subZones: propertyData.subZones.length,
      buildings: propertyData.buildings.length,
      villaApartments: propertyData.villaApartments.length,
      floors: propertyData.floors.length,
      rooms: propertyData.rooms.length,
      total:
        propertyData.zones.length +
        propertyData.subZones.length +
        propertyData.buildings.length +
        propertyData.villaApartments.length +
        propertyData.floors.length +
        propertyData.rooms.length,
    });
  };

  // Advanced search using the new endpoint
  const performSearch = async () => {
    if (!searchTerm.trim() || !selectedContract) return;

    try {
      const response = await propertyFlowService.searchLocations({
        contractId: parseInt(selectedContract),
        query: searchTerm.trim(),
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    }
  };

  // const focusOnSearchResult = (result) => {
  //   // Find and focus on the node in the diagram
  //   setTimeout(() => {
  //     const nodeElement = d3.select(
  //       `[data-node-id="${result.entityType.toLowerCase()}-${result.entityId}"]`
  //     );
  //     if (!nodeElement.empty()) {
  //       const svg = d3.select(svgRef.current);
  //       const zoom = zoomRef.current;

  //       // Get node position and center it
  //       const nodeData = nodeElement.datum();
  //       if (nodeData) {
  //         const transform = d3.zoomIdentity
  //           .translate(400 - nodeData.y, 300 - nodeData.x)
  //           .scale(1.5);

  //         svg.transition().duration(750).call(zoom.transform, transform);

  //         // Highlight the node temporarily
  //         nodeElement
  //           .select("circle")
  //           .transition()
  //           .duration(200)
  //           .attr("r", 15)
  //           .style("stroke", "#ef4444")
  //           .style("stroke-width", "4px")
  //           .transition()
  //           .delay(1000)
  //           .duration(500)
  //           .attr("r", 10)
  //           .style("stroke", "#fff")
  //           .style("stroke-width", "3px");
  //       }
  //     }
  //   }, 100);

  //   setSearchTerm("");
  //   toast.success(`Found and focused on ${result.name}`);
  // };

  // // Enhanced focusOnSearchResult function
  // const focusOnSearchResult = (result) => {
  //   if (!result) return;

  //   setTimeout(() => {
  //     const nodeElement = d3.select(
  //       `[data-node-id="${result.entityType.toLowerCase()}-${result.entityId}"]`
  //     );

  //     if (!nodeElement.empty()) {
  //       const svg = d3.select(svgRef.current);
  //       const zoom = zoomRef.current;
  //       const nodeData = nodeElement.datum();

  //       if (nodeData) {
  //         // Calculate the center position with some padding
  //         const width = 1400;
  //         const height = 900;
  //         const margin = 100;

  //         // Calculate the transform needed to center the node
  //         const scale = 1.5;
  //         const translateX = width / 2 - nodeData.y * scale;
  //         const translateY = height / 2 - nodeData.x * scale;

  //         const transform = d3.zoomIdentity
  //           .translate(translateX, translateY)
  //           .scale(scale);

  //         // Smooth transition to the node
  //         svg.transition().duration(750).call(zoom.transform, transform);

  //         // Highlight the node with animation
  //         nodeElement
  //           .select("circle")
  //           .transition()
  //           .duration(200)
  //           .attr("r", 15)
  //           .style("stroke", "#ef4444")
  //           .style("stroke-width", "4px")
  //           .transition()
  //           .delay(1000)
  //           .duration(500)
  //           .attr("r", 10)
  //           .style("stroke", "#fff")
  //           .style("stroke-width", "3px");

  //         // Also highlight the node's path to root
  //         highlightPathToRoot(nodeData);
  //       }
  //     } else {
  //       toast.error("Could not find the selected item in the diagram");
  //     }
  //   }, 100);

  //   setSearchTerm("");
  //   setSearchResults([]);
  // // };
  // const focusOnSearchResult = (result) => {
  //   if (!result) return;

  //   setTimeout(() => {
  //     // Normalize the entityType to match how nodes are stored in the tree
  //     const normalizedEntityType = result.entityType.toLowerCase();

  //     // Special case for "VillaApartment" which might be "villaApartment" in the tree
  //     const nodeType =
  //       normalizedEntityType === "villaapartment"
  //         ? "villaApartment"
  //         : normalizedEntityType;

  //     const nodeSelector = `[data-node-id="${nodeType}-${result.entityId}"]`;
  //     console.log("Searching for node with selector:", nodeSelector);

  //     const nodeElement = d3.select(nodeSelector);

  //     if (!nodeElement.empty()) {
  //       console.log("Node found:", nodeElement.datum());
  //       const svg = d3.select(svgRef.current);
  //       const zoom = zoomRef.current;
  //       const nodeData = nodeElement.datum();

  //       if (nodeData) {
  //         // Calculate the center position with some padding
  //         const width = 1400;
  //         const height = 900;
  //         const margin = 100;

  //         // Calculate the transform needed to center the node
  //         const scale = 1.5;
  //         const translateX = width / 2 - nodeData.y * scale;
  //         const translateY = height / 2 - nodeData.x * scale;

  //         const transform = d3.zoomIdentity
  //           .translate(translateX, translateY)
  //           .scale(scale);

  //         // Smooth transition to the node
  //         svg.transition().duration(750).call(zoom.transform, transform);

  //         // Highlight the node with animation
  //         nodeElement
  //           .select("circle")
  //           .transition()
  //           .duration(200)
  //           .attr("r", 15)
  //           .style("stroke", "#ef4444")
  //           .style("stroke-width", "4px")
  //           .transition()
  //           .delay(1000)
  //           .duration(500)
  //           .attr("r", 10)
  //           .style("stroke", "#fff")
  //           .style("stroke-width", "3px");

  //         // Also highlight the node's path to root
  //         highlightPathToRoot(nodeData);
  //       }
  //     } else {
  //       console.log("Node not found with selector:", nodeSelector);
  //       console.log("All nodes:", d3.selectAll(".node").nodes());
  //       toast.error("Could not find the selected item in the diagram");
  //     }
  //   }, 100);

  //   setSearchTerm("");
  //   setSearchResults([]);
  // };

  const focusOnSearchResult = (result) => {
    if (!result) return;

    setTimeout(() => {
      // Normalize the entityType to match how nodes are stored in the tree
      const normalizedEntityType = result.entityType.toLowerCase();

      // Handle specific case mismatches
      let nodeType = normalizedEntityType;
      if (normalizedEntityType === "villaapartment") {
        nodeType = "villaApartment";
      } else if (normalizedEntityType === "subzone") {
        nodeType = "subZone"; // Normalize SubZone to subZone
      }

      const nodeSelector = `[data-node-id="${nodeType}-${result.entityId}"]`;
      console.log("Searching for node with selector:", nodeSelector);

      const nodeElement = d3.select(nodeSelector);

      if (!nodeElement.empty()) {
        console.log("Node found:", nodeElement.datum());
        const svg = d3.select(svgRef.current);
        const zoom = zoomRef.current;
        const nodeData = nodeElement.datum();

        if (nodeData) {
          // Calculate the center position with some padding
          const width = 1400;
          const height = 900;
          const margin = 100;

          // Calculate the transform needed to center the node
          const scale = 1.5;
          const translateX = width / 2 - nodeData.y * scale;
          const translateY = height / 2 - nodeData.x * scale;

          const transform = d3.zoomIdentity
            .translate(translateX, translateY)
            .scale(scale);

          // Smooth transition to the node
          svg.transition().duration(750).call(zoom.transform, transform);

          // Highlight the node with animation
          nodeElement
            .select("circle")
            .transition()
            .duration(200)
            .attr("r", 15)
            .style("stroke", "#ef4444")
            .style("stroke-width", "4px")
            .transition()
            .delay(1000)
            .duration(500)
            .attr("r", 10)
            .style("stroke", "#fff")
            .style("stroke-width", "3px");

          // Also highlight the node's path to root
          highlightPathToRoot(nodeData);

          toast.success(`Focused on ${result.name}`);
        }
      } else {
        console.log("Node not found with selector:", nodeSelector);
        console.log(
          "All nodes:",
          d3
            .selectAll(".node")
            .nodes()
            .map((node) => node.getAttribute("data-node-id"))
        );
        toast.error("Could not find the selected item in the diagram");
      }
    }, 100);

    setSearchTerm("");
    setSearchResults([]);
  };
  // Helper function to highlight path to root
  const highlightPathToRoot = (nodeData) => {
    if (!nodeData.parent) return;

    const svg = d3.select(svgRef.current);

    // Highlight all parent links
    let current = nodeData;
    while (current.parent) {
      svg
        .selectAll(`.link`)
        .filter((d) => d.parent === current.parent && d === current)
        .transition()
        .duration(200)
        .style("stroke", "#ef4444")
        .style("stroke-width", "3px")
        .transition()
        .delay(1000)
        .duration(500)
        .style("stroke", "#94a3b8")
        .style("stroke-width", "2px");

      current = current.parent;
    }
  };

  const handleNodeClick = (nodeData) => {
    if (nodeData.type === "contract") return;
    setSelectedNode(nodeData);
    setShowDetailModal(true);
  };

  const handleFormOpen = (type, item = null) => {
    setFormType(type);
    setEditMode(!!item);
    setEditId(item?.id || null);

    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        parentId: item.parentId || "",
      });
      setImagePreview(item.imageUrl || "");
    } else {
      setFormData({ name: "", description: "", parentId: "" });
      setImagePreview("");
    }

    setImageFile(null);
    setShowForm(true);
    setShowDetailModal(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setFormType("");
    setFormData({});
    setImageFile(null);
    setImagePreview("");
    setEditMode(false);
    setEditId(null);
  };

  const handleDetailModalClose = () => {
    setShowDetailModal(false);
    setSelectedNode(null);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Validate file size (1MB = 1,048,576 bytes)
    if (file.size > 1048576) {
      toast.error("Image size must be less than 1MB");
      e.target.value = ""; // Clear the file input
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, or GIF images are allowed");
      e.target.value = ""; // Clear the file input
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedContract) {
      toast.error("Please select a contract first");
      return;
    }

    if (!imageFile && !editMode) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        contractId: parseInt(selectedContract),
        ...getTypeSpecificPayload(),
      };

      let response;
      if (editMode) {
        response = await getUpdateService()(editId, payload, imageFile);
      } else {
        response = await getCreateService()(payload, imageFile);
      }

      toast.success(
        `${formType} ${editMode ? "updated" : "created"} successfully`
      );
      handleFormClose();
      fetchPropertyData();
    } catch (error) {
      toast.error(`Failed to ${editMode ? "update" : "create"} ${formType}`);
    } finally {
      setLoading(false);
    }
  };

  const getTypeSpecificPayload = () => {
    const base = {
      [`${formType}Name`]: formData.name,
      description: formData.description,
    };

    switch (formType) {
      case "zone":
        return base;
      case "subZone":
        return { ...base, zoneId: parseInt(formData.parentId) };
      case "building":
        return { ...base, subZoneId: parseInt(formData.parentId) };
      case "villaApartment":
        return { ...base, buildingId: parseInt(formData.parentId) };
      case "floor":
        return { ...base, villaApartmentId: parseInt(formData.parentId) };
      case "room":
        return { ...base, floorId: parseInt(formData.parentId) };
      default:
        return base;
    }
  };

  const getCreateService = () => {
    const services = {
      zone: propertyFlowService.createZone,
      subZone: propertyFlowService.createSubZone,
      building: propertyFlowService.createBuilding,
      villaApartment: propertyFlowService.createVillaApartment,
      floor: propertyFlowService.createFloor,
      room: propertyFlowService.createRoom,
    };
    return services[formType];
  };

  const getUpdateService = () => {
    const services = {
      zone: propertyFlowService.updateZone,
      subZone: propertyFlowService.updateSubZone,
      building: propertyFlowService.updateBuilding,
      villaApartment: propertyFlowService.updateVillaApartment,
      floor: propertyFlowService.updateFloor,
      room: propertyFlowService.updateRoom,
    };
    return services[formType];
  };

  const getDeleteService = () => {
    const services = {
      zone: propertyFlowService.deleteZone,
      subZone: propertyFlowService.deleteSubZone,
      building: propertyFlowService.deleteBuilding,
      villaApartment: propertyFlowService.deleteVillaApartment,
      floor: propertyFlowService.deleteFloor,
      room: propertyFlowService.deleteRoom,
    };
    return services;
  };

  const handleDelete = async (type, id) => {
    if (
      !window.confirm(
        `Are you sure you want to delete this ${type}? This action cannot be undone.`
      )
    )
      return;

    setLoading(true);
    try {
      const deleteServices = getDeleteService();
      await deleteServices[type](id);
      toast.success(`${type} deleted successfully`);
      setShowDetailModal(false);
      fetchPropertyData();
    } catch (error) {
      toast.error(`Failed to delete ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const getParentOptions = () => {
    switch (formType) {
      case "zone":
        return [];
      case "subZone":
        return propertyData.zones.map((zone) => ({
          id: zone.zoneId,
          name: zone.zoneName,
        }));
      case "building":
        return propertyData.subZones.map((subZone) => ({
          id: subZone.subZoneId,
          name: subZone.subZoneName,
        }));
      case "villaApartment":
        return propertyData.buildings.map((building) => ({
          id: building.buildingId,
          name: building.buildingName,
        }));
      case "floor":
        return propertyData.villaApartments.map((va) => ({
          id: va.villaApartmentId,
          name: va.villaApartmentName,
        }));
      case "room":
        return propertyData.floors.map((floor) => ({
          id: floor.floorId,
          name: floor.floorName,
        }));
      default:
        return [];
    }
  };

  // const transformDataForTree = () => {
  //   const root = {
  //     name:
  //       contracts.find((c) => c.contractId == selectedContract)?.contractName ||
  //       "Contract",
  //     type: "contract",
  //     children: [],
  //   };

  //   propertyData.zones.forEach((zone) => {
  //     const zoneNode = {
  //       name: zone.zoneName,
  //       type: "zone",
  //       id: zone.zoneId,
  //       data: zone,
  //       children: [],
  //     };

  //     propertyData.subZones
  //       .filter((subZone) => subZone.zoneId === zone.zoneId)
  //       .forEach((subZone) => {
  //         const subZoneNode = {
  //           name: subZone.subZoneName,
  //           type: "subZone",
  //           id: subZone.subZoneId,
  //           data: subZone,
  //           children: [],
  //         };

  //         propertyData.buildings
  //           .filter((building) => building.subZoneId === subZone.subZoneId)
  //           .forEach((building) => {
  //             const buildingNode = {
  //               name: building.buildingName,
  //               type: "building",
  //               id: building.buildingId,
  //               data: building,
  //               children: [],
  //             };

  //             propertyData.villaApartments
  //               .filter((va) => va.buildingId === building.buildingId)
  //               .forEach((va) => {
  //                 const vaNode = {
  //                   name: va.villaApartmentName,
  //                   type: "villaApartment",
  //                   id: va.villaApartmentId,
  //                   data: va,
  //                   children: [],
  //                 };

  //                 propertyData.floors
  //                   .filter(
  //                     (floor) => floor.villaApartmentId === va.villaApartmentId
  //                   )
  //                   .forEach((floor) => {
  //                     const floorNode = {
  //                       name: floor.floorName,
  //                       type: "floor",
  //                       id: floor.floorId,
  //                       data: floor,
  //                       children: [],
  //                     };

  //                     propertyData.rooms
  //                       .filter((room) => room.floorId === floor.floorId)
  //                       .forEach((room) => {
  //                         floorNode.children.push({
  //                           name: room.roomName,
  //                           type: "room",
  //                           id: room.roomId,
  //                           data: room,
  //                           children: [],
  //                         });
  //                       });

  //                     vaNode.children.push(floorNode);
  //                   });

  //                 buildingNode.children.push(vaNode);
  //               });

  //             subZoneNode.children.push(buildingNode);
  //           });

  //         zoneNode.children.push(subZoneNode);
  //       });

  //     root.children.push(zoneNode);
  //   });

  //   return root;
  // };

  const transformDataForTree = () => {
    const root = {
      name:
        contracts.find((c) => c.contractId == selectedContract)?.contractName ||
        "Contract",
      type: "contract",
      id: selectedContract,
      children: [],
    };

    propertyData.zones.forEach((zone) => {
      const zoneNode = {
        name: zone.zoneName,
        type: "zone",
        id: zone.zoneId,
        data: zone,
        children: [],
      };

      propertyData.subZones
        .filter((subZone) => subZone.zoneId === zone.zoneId)
        .forEach((subZone) => {
          const subZoneNode = {
            name: subZone.subZoneName,
            type: "subZone",
            id: subZone.subZoneId,
            data: subZone,
            children: [],
          };

          propertyData.buildings
            .filter((building) => building.subZoneId === subZone.subZoneId)
            .forEach((building) => {
              const buildingNode = {
                name: building.buildingName,
                type: "building",
                id: building.buildingId,
                data: building,
                children: [],
              };

              propertyData.villaApartments
                .filter((va) => va.buildingId === building.buildingId)
                .forEach((va) => {
                  const vaNode = {
                    name: va.villaApartmentName,
                    type: "villaApartment", // Note: This must match exactly with the entityType from the API
                    id: va.villaApartmentId,
                    data: va,
                    children: [],
                  };

                  propertyData.floors
                    .filter(
                      (floor) => floor.villaApartmentId === va.villaApartmentId
                    )
                    .forEach((floor) => {
                      const floorNode = {
                        name: floor.floorName,
                        type: "floor",
                        id: floor.floorId,
                        data: floor,
                        children: [],
                      };

                      propertyData.rooms
                        .filter((room) => room.floorId === floor.floorId)
                        .forEach((room) => {
                          floorNode.children.push({
                            name: room.roomName,
                            type: "room",
                            id: room.roomId,
                            data: room,
                            children: [],
                          });
                        });

                      vaNode.children.push(floorNode);
                    });

                  buildingNode.children.push(vaNode);
                });

              subZoneNode.children.push(buildingNode);
            });

          zoneNode.children.push(subZoneNode);
        });

      root.children.push(zoneNode);
    });

    return root;
  };

  const handleZoomIn = () => {
    const svg = d3.select(svgRef.current);
    const zoom = zoomRef.current;
    svg.transition().duration(300).call(zoom.scaleBy, 1.5);
  };

  const handleZoomOut = () => {
    const svg = d3.select(svgRef.current);
    const zoom = zoomRef.current;
    svg
      .transition()
      .duration(300)
      .call(zoom.scaleBy, 1 / 1.5);
  };

  const handleResetZoom = () => {
    const svg = d3.select(svgRef.current);
    const zoom = zoomRef.current;
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
  };

  const downloadDiagram = () => {
    if (!selectedContract) {
      toast.error("Please select a contract first");
      return;
    }

    // Create a temporary SVG with the full tree layout
    const tempSvg = d3.create("svg");
    const width = 3508; // A3 width in pixels at 300dpi
    const height = 2480; // A3 height in pixels at 300dpi
    const margin = { top: 100, right: 100, bottom: 100, left: 100 };

    tempSvg
      .attr("width", width)
      .attr("height", height)
      .attr("xmlns", "http://www.w3.org/2000/svg");

    const data = transformDataForTree();
    if (!data.children || data.children.length === 0) {
      toast.error("No data to export");
      return;
    }

    const g = tempSvg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Calculate the tree layout with the new dimensions
    const tree = d3
      .tree()
      .size([
        height - margin.top - margin.bottom,
        width - margin.left - margin.right,
      ]);
    const root = d3.hierarchy(data);
    tree(root);

    // Add white background
    tempSvg
      .insert("rect", ":first-child")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "white");

    // Add title
    tempSvg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "36px")
      .attr("font-weight", "bold")
      .text(`Property Flow Diagram - Contract ${selectedContract}`);

    // Links
    g.selectAll(".link")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        return `M${d.y},${d.x}C${(d.y + d.parent.y) / 2},${d.x} ${
          (d.y + d.parent.y) / 2
        },${d.parent.x} ${d.parent.y},${d.parent.x}`;
      })
      .style("fill", "none")
      .style("stroke", "#94a3b8")
      .style("stroke-width", "4px")
      .style("opacity", 0.7);

    // Nodes
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    // Node circles
    node
      .append("circle")
      .attr("r", (d) => (d.data.type === "contract" ? 20 : 15))
      .style("fill", (d) => {
        const colors = {
          contract: "#1f2937",
          zone: "#3b82f6",
          subZone: "#10b981",
          building: "#8b5cf6",
          villaApartment: "#f59e0b",
          floor: "#6366f1",
          room: "#ec4899",
        };
        return colors[d.data.type] || "#6b7280";
      })
      .style("stroke", "#fff")
      .style("stroke-width", "4px");

    // Node labels
    node
      .append("text")
      .attr("dy", ".35em")
      .attr("x", (d) => (d.children ? -25 : 25))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .style("font-size", (d) => (d.data.type === "contract" ? "24px" : "18px"))
      .style("font-weight", (d) =>
        d.data.type === "contract" ? "bold" : "500"
      )
      .style("fill", "#374151")
      .text((d) => d.data.name);

    // Legend
    const legend = tempSvg
      .append("g")
      .attr("transform", `translate(${width - 300}, ${height - 200})`);

    const legendItems = [
      { type: "zone", color: "#3b82f6", label: "Zone" },
      { type: "subZone", color: "#10b981", label: "SubZone" },
      { type: "building", color: "#8b5cf6", label: "Building" },
      { type: "villaApartment", color: "#f59e0b", label: "Villa/Apartment" },
      { type: "floor", color: "#6366f1", label: "Floor" },
      { type: "room", color: "#ec4899", label: "Room" },
    ];

    legendItems.forEach((item, i) => {
      const itemGroup = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 30})`);

      itemGroup
        .append("circle")
        .attr("r", 10)
        .attr("cx", 10)
        .attr("cy", 10)
        .style("fill", item.color)
        .style("stroke", "#fff")
        .style("stroke-width", "2px");

      itemGroup
        .append("text")
        .attr("x", 30)
        .attr("y", 15)
        .style("font-size", "16px")
        .text(item.label);
    });

    // Convert SVG to data URL
    const svgString = new XMLSerializer().serializeToString(tempSvg.node());
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Create canvas for final image
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Create download link
      const link = document.createElement("a");
      link.download = `property-flow-${selectedContract}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Diagram downloaded successfully");

      // Clean up
      URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
  };
  const renderMiniMap = () => {
    if (!showMiniMap) return;

    const miniMapSvg = d3.select(miniMapRef.current);
    miniMapSvg.selectAll("*").remove();

    const miniWidth = 200;
    const miniHeight = 150;

    miniMapSvg.attr("width", miniWidth).attr("height", miniHeight);

    const data = transformDataForTree();
    if (!data.children || data.children.length === 0) return;

    const miniTree = d3.tree().size([miniHeight - 20, miniWidth - 20]);
    const miniRoot = d3.hierarchy(data);
    miniTree(miniRoot);

    const miniG = miniMapSvg.append("g").attr("transform", "translate(10,10)");

    // Mini links
    miniG
      .selectAll(".mini-link")
      .data(miniRoot.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "mini-link")
      .attr("d", (d) => {
        return `M${d.y},${d.x}L${d.parent.y},${d.parent.x}`;
      })
      .style("fill", "none")
      .style("stroke", "#ccc")
      .style("stroke-width", "1px");

    // Mini nodes - make them clickable
    miniG
      .selectAll(".mini-node")
      .data(miniRoot.descendants())
      .enter()
      .append("circle")
      .attr("class", "mini-node")
      .attr("cx", (d) => d.y)
      .attr("cy", (d) => d.x)
      .attr("r", 2)
      .style("fill", "#3b82f6")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        // Focus main diagram on clicked node
        const svg = d3.select(svgRef.current);
        const zoom = zoomRef.current;

        // Calculate transform to center the clicked node
        const mainWidth = 1400;
        const mainHeight = 900;
        const scale = 1.5; // Zoom level when focusing
        const translateX = mainWidth / 2 - d.y * scale;
        const translateY = mainHeight / 2 - d.x * scale;

        svg
          .transition()
          .duration(750)
          .call(
            zoom.transform,
            d3.zoomIdentity.translate(translateX, translateY).scale(scale)
          );

        toast.success(`Focused on ${d.data.name}`);
      });

    // Viewport indicator
    const viewportIndicator = miniMapSvg
      .append("rect")
      .attr("class", "viewport-indicator")
      .attr("width", 40)
      .attr("height", 30)
      .attr("x", 10)
      .attr("y", 10)
      .style("fill", "none")
      .style("stroke", "#ef4444")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Update viewport indicator based on main diagram's zoom
    const updateViewportIndicator = () => {
      const mainSvg = d3.select(svgRef.current);
      const transform = d3.zoomTransform(mainSvg.node());

      // Calculate the visible area in the main diagram
      const mainWidth = 1400;
      const mainHeight = 900;
      const scale = transform.k;
      const viewWidth = mainWidth / scale;
      const viewHeight = mainHeight / scale;
      const viewX = -transform.x / scale;
      const viewY = -transform.y / scale;

      // Map the main diagram's view to the mini-map's scale
      const miniScaleX = (miniWidth - 20) / (mainWidth - 300); // Adjust for margins
      const miniScaleY = (miniHeight - 20) / (mainHeight - 80);
      const miniViewWidth = viewWidth * miniScaleX;
      const miniViewHeight = viewHeight * miniScaleY;
      const miniViewX = viewX * miniScaleX + 10;
      const miniViewY = viewY * miniScaleY + 10;

      viewportIndicator
        .attr("x", miniViewX)
        .attr("y", miniViewY)
        .attr("width", Math.min(miniViewWidth, miniWidth - 20))
        .attr("height", Math.min(miniViewHeight, miniHeight - 20));
    };

    // Update viewport indicator on zoom/pan of main diagram
    d3.select(svgRef.current).on("zoom", updateViewportIndicator);

    // Initial update of viewport indicator
    updateViewportIndicator();

    // Handle click on mini-map background to pan
    miniMapSvg.on("click", (event) => {
      const [mouseX, mouseY] = d3.pointer(event);
      const mainSvg = d3.select(svgRef.current);
      const zoom = zoomRef.current;

      // Convert mini-map coordinates to main diagram coordinates
      const mainWidth = 1400;
      const mainHeight = 900;
      const miniScaleX = (mainWidth - 300) / (miniWidth - 20);
      const miniScaleY = (mainHeight - 80) / (miniHeight - 20);
      const mainX = (mouseX - 10) * miniScaleX;
      const mainY = (mouseY - 10) * miniScaleY;

      // Center the main diagram on the clicked point
      const scale = d3.zoomTransform(mainSvg.node()).k;
      const translateX = mainWidth / 2 - mainX * scale;
      const translateY = mainHeight / 2 - mainY * scale;

      mainSvg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(translateX, translateY).scale(scale)
        );
    });
  };
  const renderTree = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const data = transformDataForTree();
    if (!data.children || data.children.length === 0) return;

    const width = 1400;
    const height = 900;
    const margin = { top: 40, right: 150, bottom: 40, left: 150 };

    svg.attr("width", width).attr("height", height);

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const tree = d3
      .tree()
      .size([
        height - margin.top - margin.bottom,
        width - margin.left - margin.right,
      ]);

    const root = d3.hierarchy(data);
    tree(root);

    // Links
    g.selectAll(".link")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        return `M${d.y},${d.x}C${(d.y + d.parent.y) / 2},${d.x} ${
          (d.y + d.parent.y) / 2
        },${d.parent.x} ${d.parent.y},${d.parent.x}`;
      })
      .style("fill", "none")
      .style("stroke", "#94a3b8")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Nodes
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("data-node-id", (d) => `${d.data.type}-${d.data.id}`)
      .attr("transform", (d) => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer");

    // Node circles
    node
      .append("circle")
      .attr("r", (d) => (d.data.type === "contract" ? 12 : 10))
      .style("fill", (d) => {
        const colors = {
          contract: "#1f2937",
          zone: "#3b82f6",
          subZone: "#10b981",
          building: "#8b5cf6",
          villaApartment: "#f59e0b",
          floor: "#6366f1",
          room: "#ec4899",
        };
        return colors[d.data.type] || "#6b7280";
      })
      .style("stroke", "#fff")
      .style("stroke-width", "3px")
      .style("filter", "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))")
      .on("click", (event, d) => {
        event.stopPropagation();
        handleNodeClick(d.data);
      })
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d.data.type === "contract" ? 15 : 13)
          .style("filter", "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))");
      })
      .on("mouseleave", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d.data.type === "contract" ? 12 : 10)
          .style("filter", "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))");
      });

    // Node labels - Only show the name, no type labels
    node
      .append("text")
      .attr("dy", ".35em")
      .attr("x", (d) => (d.children ? -20 : 20))
      .style("text-anchor", (d) => (d.children ? "end" : "start"))
      .style("font-size", (d) => (d.data.type === "contract" ? "14px" : "12px"))
      .style("font-weight", (d) =>
        d.data.type === "contract" ? "bold" : "500"
      )
      .style("fill", "#374151")
      .style("pointer-events", "none")
      .text((d) => d.data.name);

    // Render mini-map
    renderMiniMap();
  };

  const getParentId = (nodeData) => {
    switch (nodeData.type) {
      case "subZone":
        return nodeData.data.zoneId;
      case "building":
        return nodeData.data.subZoneId;
      case "villaApartment":
        return nodeData.data.buildingId;
      case "floor":
        return nodeData.data.villaApartmentId;
      case "room":
        return nodeData.data.floorId;
      default:
        return "";
    }
  };

  const statisticsCards = [
    {
      label: "Zones",
      value: statistics.zones,
      color: "bg-blue-500",
      icon: MapPin,
    },
    {
      label: "SubZones",
      value: statistics.subZones,
      color: "bg-green-500",
      icon: Building,
    },
    {
      label: "Buildings",
      value: statistics.buildings,
      color: "bg-purple-500",
      icon: Building,
    },
    {
      label: "Villa/Apartments",
      value: statistics.villaApartments,
      color: "bg-orange-500",
      icon: Home,
    },
    {
      label: "Floors",
      value: statistics.floors,
      color: "bg-indigo-500",
      icon: Layers,
    },
    {
      label: "Rooms",
      value: statistics.rooms,
      color: "bg-pink-500",
      icon: DoorOpen,
    },
  ];

  // Dashboard View
  if (!showDiagram) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Property Flow Management
            </h1>
            <p className="text-gray-600 text-lg">
              Visualize and manage your property hierarchy structure
            </p>
          </div>

          {/* Contract Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Contract
            </label>
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="">Choose a contract...</option>
              {contracts.map((contract) => (
                <option key={contract.contractId} value={contract.contractId}>
                  {contract.contractName}
                </option>
              ))}
            </select>
          </div>

          {/* Statistics Dashboard */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                Property Statistics
              </h2>
              <div className="text-sm text-gray-500">
                Total Properties:{" "}
                <span className="font-semibold text-gray-900">
                  {statistics.total || 0}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statisticsCards.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${stat.color} p-2 rounded-lg`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-gray-900">
                        {stat.value || 0}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual Diagram Button */}
          {selectedContract && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ready to visualize your property hierarchy?
                </h3>
                <button
                  onClick={() => setShowDiagram(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors text-lg font-semibold flex items-center mx-auto"
                >
                  <Eye className="w-6 h-6 mr-2" />
                  View Visual Diagram of Property
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Diagram View
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Full Screen Diagram Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowDiagram(false)}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Property Visual Diagram
            </h1>
          </div>
          {/* Search Bar
          <div className="relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search locations... (Ctrl+F)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => focusOnSearchResult(result)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">
                      {result.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {result.hierarchy}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div> */}
          <div className="relative flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search locations... (Ctrl+F)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // Clear results when search term is empty
                  if (!e.target.value.trim()) {
                    setSearchResults([]);
                  }
                }}
                onKeyDown={(e) => {
                  // Allow pressing Enter to select first result
                  if (e.key === "Enter" && searchResults.length > 0) {
                    focusOnSearchResult(searchResults[0]);
                  }
                  // Allow arrow key navigation through results
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    // Implement arrow key navigation if needed
                  }
                }}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSearchResults([]);
                    searchInputRef.current.focus();
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-10">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => focusOnSearchResult(result)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                      index === 0 ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="font-medium text-gray-900 flex items-center">
                      {result.name}
                      <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                        {result.entityType}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {result.hierarchy}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={downloadDiagram}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              title="Download Diagram"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center space-x-3">
          {propertyTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.key}
                onClick={() => handleFormOpen(type.key)}
                className={`${type.color} hover:opacity-90 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm font-semibold`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagram Content */}
      <div className="relative h-[calc(100vh-140px)]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 relative">
            <svg ref={svgRef} className="w-full h-full cursor-move"></svg>

            {/* Mini-map */}
            {showMiniMap && (
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                <div className="text-xs font-medium text-gray-600 mb-2">
                  Overview
                </div>
                <svg
                  ref={miniMapRef}
                  className="border border-gray-200 rounded"
                ></svg>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Info className="w-6 h-6 mr-2 text-blue-600" />
                  {selectedNode.type.charAt(0).toUpperCase() +
                    selectedNode.type.slice(1)}{" "}
                  Details
                </h3>
                <button
                  onClick={handleDetailModalClose}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedNode.data[`${selectedNode.type}Name`]}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg min-h-[60px]">
                    {selectedNode.data.description ||
                      "No description available"}
                  </p>
                </div>
                {selectedNode.data.imageUrl && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Image
                    </label>
                    <img
                      src={selectedNode.data.imageUrl || "/placeholder.svg"}
                      alt={selectedNode.data[`${selectedNode.type}Name`]}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                <div className="flex space-x-3 pt-6">
                  <button
                    onClick={() =>
                      handleFormOpen(selectedNode.type, {
                        id: selectedNode.id,
                        name: selectedNode.data[`${selectedNode.type}Name`],
                        description: selectedNode.data.description,
                        imageUrl: selectedNode.data.imageUrl,
                        parentId: getParentId(selectedNode),
                      })
                    }
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-500 flex items-center justify-center font-semibold"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Update
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(selectedNode.type, selectedNode.id)
                    }
                    disabled={loading}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-3 focus:ring-red-500 disabled:opacity-50 flex items-center justify-center font-semibold"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editMode ? "Edit" : "Add"}{" "}
                  {formType.charAt(0).toUpperCase() + formType.slice(1)}
                </h3>
                <button
                  onClick={handleFormClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    required
                  />
                </div>

                {getParentOptions().length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Parent{" "}
                      {formType === "subZone"
                        ? "Zone"
                        : formType === "building"
                        ? "SubZone"
                        : formType === "villaApartment"
                        ? "Building"
                        : formType === "floor"
                        ? "Villa/Apartment"
                        : "Floor"}
                    </label>
                    <select
                      value={formData.parentId || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, parentId: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select parent...</option>
                      {getParentOptions().map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image (Max 1MB)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="mb-4">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="mx-auto h-32 w-32 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      ) : (
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-semibold text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/jpeg, image/png, image/gif"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 1MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center font-semibold"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editMode ? "Update" : "Create"}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleFormClose}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-3 focus:ring-gray-500 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFlowManagement;
