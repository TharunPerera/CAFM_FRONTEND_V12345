// "use client";

// import { useState, useEffect } from "react";
// import {
//   X,
//   Shield,
//   Check,
//   Plus,
//   Trash2,
//   Search,
//   Filter,
//   CheckSquare,
//   Square,
//   Loader,
// } from "lucide-react";
// import { permissionService } from "../../services/permissionService";
// import { userService } from "../../services/userService";

// const UserPermissionAssignmentModal = ({
//   isOpen,
//   onClose,
//   user,
//   onSuccess,
// }) => {
//   const [assignedPermissions, setAssignedPermissions] = useState([]);
//   const [unassignedPermissions, setUnassignedPermissions] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [activeTab, setActiveTab] = useState("assign"); // 'assign' or 'remove'
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (isOpen && user) {
//       loadData();
//     }
//   }, [isOpen, user]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const [assignedRes, unassignedRes, rolesRes] = await Promise.all([
//         permissionService.getAssignedPermissions(user.userId, user.userType),
//         permissionService.getUnassignedPermissions(user.userId, user.userType),
//         userService.getAllRoles(),
//       ]);

//       setAssignedPermissions(assignedRes.data || []);
//       setUnassignedPermissions(unassignedRes.data || []);
//       setRoles(rolesRes.data || []);
//       setSelectedRole(user.roleId?.toString() || "");
//     } catch (error) {
//       console.error("Error loading permission data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAssignPermissions = async () => {
//     if (!selectedRole || selectedPermissions.length === 0) {
//       alert("Please select a role and at least one permission");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       for (const permissionId of selectedPermissions) {
//         await permissionService.assignPermissionToUser({
//           userId: user.userId,
//           permissionId: permissionId,
//           roleId: Number.parseInt(selectedRole),
//           userType: user.userType,
//         });
//       }

//       await loadData(); // Refresh data
//       setSelectedPermissions([]);
//       onSuccess();
//       alert("Permissions assigned successfully!");
//     } catch (error) {
//       console.error("Error assigning permissions:", error);
//       alert(error.response?.data?.message || "Failed to assign permissions");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleRemovePermission = async (permissionId) => {
//     if (!window.confirm("Are you sure you want to remove this permission?")) {
//       return;
//     }

//     try {
//       await permissionService.removePermissionFromUser({
//         userId: user.userId,
//         permissionId: permissionId,
//         userType: user.userType,
//       });

//       await loadData(); // Refresh data
//       alert("Permission removed successfully!");
//     } catch (error) {
//       console.error("Error removing permission:", error);
//       alert("Failed to remove permission");
//     }
//   };

//   const getPermissionCategories = (permissions) => {
//     const categories = [
//       ...new Set(permissions.map((p) => p.category || "General")),
//     ];
//     return categories.sort();
//   };

//   const filterPermissions = (permissions) => {
//     return permissions.filter((permission) => {
//       const matchesSearch =
//         permission.permissionName
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         (permission.description &&
//           permission.description
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase()));

//       const matchesCategory =
//         categoryFilter === "all" ||
//         (permission.category || "General") === categoryFilter;

//       return matchesSearch && matchesCategory;
//     });
//   };

//   const togglePermission = (permissionId) => {
//     setSelectedPermissions((prev) =>
//       prev.includes(permissionId)
//         ? prev.filter((id) => id !== permissionId)
//         : [...prev, permissionId]
//     );
//   };

//   const toggleAllPermissions = () => {
//     const filtered = filterPermissions(unassignedPermissions);
//     if (selectedPermissions.length === filtered.length) {
//       setSelectedPermissions([]);
//     } else {
//       setSelectedPermissions(filtered.map((p) => p.id || p.permissionId));
//     }
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       "User Management": "bg-blue-100 text-blue-800 border-blue-200",
//       "Company Management": "bg-green-100 text-green-800 border-green-200",
//       "Asset Management": "bg-purple-100 text-purple-800 border-purple-200",
//       "Work Order": "bg-orange-100 text-orange-800 border-orange-200",
//       "Report Management": "bg-red-100 text-red-800 border-red-200",
//       "Permission Management":
//         "bg-indigo-100 text-indigo-800 border-indigo-200",
//       General: "bg-gray-100 text-gray-800 border-gray-200",
//     };
//     return colors[category] || colors.General;
//   };

//   if (!isOpen || !user) return null;

//   const filteredUnassigned = filterPermissions(unassignedPermissions);
//   const filteredAssigned = filterPermissions(assignedPermissions);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Manage User Permissions
//                 </h2>
//                 <p className="text-purple-100">
//                   {user.firstName} {user.lastName} ({user.email})
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
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="text-center">
//                 <Loader className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-spin" />
//                 <p className="text-gray-600">Loading permission data...</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* User Info */}
//               <div className="bg-gray-50 rounded-xl p-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                     <span className="text-white font-semibold">
//                       {user.firstName.charAt(0)}
//                       {user.lastName.charAt(0)}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">
//                       {user.firstName} {user.lastName}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       {user.userType} User • Role: {user.roleName || "No Role"}
//                     </p>
//                   </div>
//                   <div className="ml-auto text-right">
//                     <p className="text-sm font-medium text-green-600">
//                       {assignedPermissions.length} Assigned Permissions
//                     </p>
//                     <p className="text-sm font-medium text-blue-600">
//                       {unassignedPermissions.length} Available Permissions
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Tabs */}
//               <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
//                 <button
//                   onClick={() => setActiveTab("assign")}
//                   className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                     activeTab === "assign"
//                       ? "bg-white text-purple-600 shadow-sm"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   Assign Permissions ({unassignedPermissions.length})
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("remove")}
//                   className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                     activeTab === "remove"
//                       ? "bg-white text-purple-600 shadow-sm"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   Current Permissions ({assignedPermissions.length})
//                 </button>
//               </div>

//               {/* Search and Filter Controls */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder="Search permissions..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>
//                 <div className="relative">
//                   <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <select
//                     value={categoryFilter}
//                     onChange={(e) => setCategoryFilter(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//                   >
//                     <option value="all">All Categories</option>
//                     {getPermissionCategories(
//                       activeTab === "assign"
//                         ? unassignedPermissions
//                         : assignedPermissions
//                     ).map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {activeTab === "assign" && (
//                   <button
//                     onClick={toggleAllPermissions}
//                     className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//                   >
//                     {selectedPermissions.length ===
//                     filteredUnassigned.length ? (
//                       <CheckSquare className="w-5 h-5 text-purple-600" />
//                     ) : (
//                       <Square className="w-5 h-5 text-gray-400" />
//                     )}
//                     {selectedPermissions.length === filteredUnassigned.length
//                       ? "Deselect All"
//                       : "Select All"}
//                   </button>
//                 )}
//               </div>

//               {activeTab === "assign" && (
//                 <>
//                   {/* Role Selection */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                       <Shield className="w-4 h-4" />
//                       Select Role for Permission Assignment
//                     </label>
//                     <select
//                       value={selectedRole}
//                       onChange={(e) => setSelectedRole(e.target.value)}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     >
//                       <option value="">Select a role</option>
//                       {roles.map((role) => (
//                         <option key={role.roleId} value={role.roleId}>
//                           {role.roleName} - {role.description}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Available Permissions */}
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg font-bold text-gray-900">
//                         Available Permissions
//                       </h3>
//                       <span className="text-sm text-gray-500">
//                         {selectedPermissions.length} selected
//                       </span>
//                     </div>

//                     {filteredUnassigned.length === 0 ? (
//                       <div className="text-center py-8">
//                         <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-500">
//                           No unassigned permissions found
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//                         {filteredUnassigned.map((permission) => {
//                           const permissionId =
//                             permission.id || permission.permissionId;
//                           const isSelected =
//                             selectedPermissions.includes(permissionId);
//                           return (
//                             <div
//                               key={permissionId}
//                               className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
//                                 isSelected
//                                   ? "border-purple-500 bg-purple-50"
//                                   : "border-gray-200 hover:border-gray-300"
//                               }`}
//                               onClick={() => togglePermission(permissionId)}
//                             >
//                               <div className="flex items-start justify-between mb-2">
//                                 <div className="flex items-center gap-2">
//                                   {isSelected ? (
//                                     <CheckSquare className="w-5 h-5 text-purple-600 flex-shrink-0" />
//                                   ) : (
//                                     <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
//                                   )}
//                                   <h4 className="font-semibold text-gray-900 text-sm">
//                                     {permission.permissionName}
//                                   </h4>
//                                 </div>
//                               </div>
//                               <p className="text-xs text-gray-600 mb-3 line-clamp-2">
//                                 {permission.description ||
//                                   "No description available"}
//                               </p>
//                               {permission.category && (
//                                 <span
//                                   className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
//                                     permission.category
//                                   )}`}
//                                 >
//                                   {permission.category}
//                                 </span>
//                               )}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {activeTab === "remove" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-bold text-gray-900">
//                     Current Permissions
//                   </h3>

//                   {filteredAssigned.length === 0 ? (
//                     <div className="text-center py-8">
//                       <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500">
//                         No assigned permissions found
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//                       {filteredAssigned.map((permission) => {
//                         const permissionId =
//                           permission.id || permission.permissionId;
//                         return (
//                           <div
//                             key={permissionId}
//                             className="p-4 border-2 border-green-200 bg-green-50 rounded-xl"
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-2 mb-2">
//                                   <Check className="w-5 h-5 text-green-600" />
//                                   <h4 className="font-semibold text-gray-900 text-sm">
//                                     {permission.permissionName}
//                                   </h4>
//                                 </div>
//                                 <p className="text-xs text-gray-600 mb-3">
//                                   {permission.description ||
//                                     "No description available"}
//                                 </p>
//                                 {permission.category && (
//                                   <span
//                                     className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
//                                       permission.category
//                                     )}`}
//                                   >
//                                     {permission.category}
//                                   </span>
//                                 )}
//                               </div>
//                               <button
//                                 onClick={() =>
//                                   handleRemovePermission(permissionId)
//                                 }
//                                 className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors ml-2"
//                                 title="Remove Permission"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Footer */}
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={onClose}
//                   className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 {activeTab === "assign" && (
//                   <button
//                     onClick={handleAssignPermissions}
//                     disabled={
//                       submitting ||
//                       !selectedRole ||
//                       selectedPermissions.length === 0
//                     }
//                     className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
//                   >
//                     {submitting ? (
//                       <Loader className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Plus className="w-4 h-4" />
//                     )}
//                     Assign Permissions ({selectedPermissions.length})
//                   </button>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPermissionAssignmentModal;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   X,
//   Shield,
//   Check,
//   Plus,
//   Trash2,
//   Search,
//   CheckSquare,
//   Square,
//   Loader,
// } from "lucide-react";
// import { permissionService } from "../../services/permissionService";
// import { toast } from "react-hot-toast";

// const UserPermissionAssignmentModal = ({
//   isOpen,
//   onClose,
//   user,
//   onSuccess,
// }) => {
//   const [assignedPermissions, setAssignedPermissions] = useState([]);
//   const [unassignedPermissions, setUnassignedPermissions] = useState([]);
//   const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("assign"); // 'assign' or 'remove'
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (isOpen && user) {
//       loadData();
//     }
//   }, [isOpen, user]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const [assignedRes, unassignedRes] = await Promise.all([
//         permissionService.getAssignedPermissions(user.userId, user.userType),
//         permissionService.getUnassignedPermissions(user.userId, user.userType),
//       ]);

//       setAssignedPermissions(assignedRes.data || []);
//       setUnassignedPermissions(unassignedRes.data || []);
//     } catch (error) {
//       console.error("Error loading permission data:", error);
//       toast.error("Failed to load permission data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAssignPermissions = async () => {
//     if (selectedPermissions.length === 0) {
//       toast.error("Please select at least one permission");
//       return;
//     }

//     if (!user.roleId) {
//       toast.error("User must have a role assigned");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       for (const permissionId of selectedPermissions) {
//         await permissionService.assignPermissionToUser({
//           userId: user.userId,
//           permissionId: permissionId,
//           roleId: user.roleId,
//           userType: user.userType,
//         });
//       }

//       await loadData(); // Refresh data
//       setSelectedPermissions([]);
//       toast.success(
//         `Successfully assigned ${selectedPermissions.length} permission(s)!`
//       );
//       onSuccess();
//     } catch (error) {
//       console.error("Error assigning permissions:", error);
//       const errorMessage =
//         error.response?.data?.message || "Failed to assign permissions";
//       toast.error(errorMessage);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleRemovePermission = async (permissionId) => {
//     if (!window.confirm("Are you sure you want to remove this permission?")) {
//       return;
//     }

//     try {
//       await permissionService.removePermissionFromUser({
//         userId: user.userId,
//         permissionId: permissionId,
//         userType: user.userType,
//       });

//       await loadData(); // Refresh data
//       toast.success("Permission removed successfully!");
//     } catch (error) {
//       console.error("Error removing permission:", error);
//       const errorMessage =
//         error.response?.data?.message || "Failed to remove permission";
//       toast.error(errorMessage);
//     }
//   };

//   const filterPermissions = (permissions) => {
//     return permissions.filter((permission) => {
//       const matchesSearch =
//         permission.permissionName
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         (permission.description &&
//           permission.description
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase()));

//       return matchesSearch;
//     });
//   };

//   const togglePermission = (permissionId) => {
//     setSelectedPermissions((prev) =>
//       prev.includes(permissionId)
//         ? prev.filter((id) => id !== permissionId)
//         : [...prev, permissionId]
//     );
//   };

//   const toggleAllPermissions = () => {
//     const filtered = filterPermissions(unassignedPermissions);
//     if (selectedPermissions.length === filtered.length) {
//       setSelectedPermissions([]);
//     } else {
//       setSelectedPermissions(filtered.map((p) => p.id || p.permissionId));
//     }
//   };

//   if (!isOpen || !user) return null;

//   const filteredUnassigned = filterPermissions(unassignedPermissions);
//   const filteredAssigned = filterPermissions(assignedPermissions);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Manage User Permissions
//                 </h2>
//                 <p className="text-purple-100">
//                   {user.firstName} {user.lastName} ({user.email})
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
//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="text-center">
//                 <Loader className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-spin" />
//                 <p className="text-gray-600">Loading permission data...</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* User Info */}
//               <div className="bg-gray-50 rounded-xl p-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                     <span className="text-white font-semibold">
//                       {user.firstName.charAt(0)}
//                       {user.lastName.charAt(0)}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">
//                       {user.firstName} {user.lastName}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       {user.userType} User • Role: {user.roleName || "No Role"}
//                     </p>
//                   </div>
//                   <div className="ml-auto text-right">
//                     <p className="text-sm font-medium text-green-600">
//                       {assignedPermissions.length} Assigned Permissions
//                     </p>
//                     <p className="text-sm font-medium text-blue-600">
//                       {unassignedPermissions.length} Available Permissions
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Tabs */}
//               <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
//                 <button
//                   onClick={() => setActiveTab("assign")}
//                   className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                     activeTab === "assign"
//                       ? "bg-white text-purple-600 shadow-sm"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   Assign Permissions ({unassignedPermissions.length})
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("remove")}
//                   className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                     activeTab === "remove"
//                       ? "bg-white text-purple-600 shadow-sm"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   Current Permissions ({assignedPermissions.length})
//                 </button>
//               </div>

//               {/* Search Control */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder="Search permissions..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   />
//                 </div>
//                 {activeTab === "assign" && (
//                   <button
//                     onClick={toggleAllPermissions}
//                     className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
//                   >
//                     {selectedPermissions.length ===
//                     filteredUnassigned.length ? (
//                       <CheckSquare className="w-5 h-5 text-purple-600" />
//                     ) : (
//                       <Square className="w-5 h-5 text-gray-400" />
//                     )}
//                     {selectedPermissions.length === filteredUnassigned.length
//                       ? "Deselect All"
//                       : "Select All"}
//                   </button>
//                 )}
//               </div>

//               {activeTab === "assign" && (
//                 <>
//                   {/* Available Permissions */}
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-lg font-bold text-gray-900">
//                         Available Permissions
//                       </h3>
//                       <span className="text-sm text-gray-500">
//                         {selectedPermissions.length} selected
//                       </span>
//                     </div>

//                     {filteredUnassigned.length === 0 ? (
//                       <div className="text-center py-8">
//                         <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-500">
//                           No unassigned permissions found
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//                         {filteredUnassigned.map((permission) => {
//                           const permissionId =
//                             permission.id || permission.permissionId;
//                           const isSelected =
//                             selectedPermissions.includes(permissionId);
//                           return (
//                             <div
//                               key={permissionId}
//                               className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
//                                 isSelected
//                                   ? "border-purple-500 bg-purple-50"
//                                   : "border-gray-200 hover:border-gray-300"
//                               }`}
//                               onClick={() => togglePermission(permissionId)}
//                             >
//                               <div className="flex items-start justify-between mb-2">
//                                 <div className="flex items-center gap-2">
//                                   {isSelected ? (
//                                     <CheckSquare className="w-5 h-5 text-purple-600 flex-shrink-0" />
//                                   ) : (
//                                     <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
//                                   )}
//                                   <h4 className="font-semibold text-gray-900 text-sm">
//                                     {permission.permissionName}
//                                   </h4>
//                                 </div>
//                               </div>
//                               <p className="text-xs text-gray-600 line-clamp-2">
//                                 {permission.description ||
//                                   "No description available"}
//                               </p>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}

//               {activeTab === "remove" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-bold text-gray-900">
//                     Current Permissions
//                   </h3>

//                   {filteredAssigned.length === 0 ? (
//                     <div className="text-center py-8">
//                       <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500">
//                         No assigned permissions found
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//                       {filteredAssigned.map((permission) => {
//                         const permissionId =
//                           permission.id || permission.permissionId;
//                         return (
//                           <div
//                             key={permissionId}
//                             className="p-4 border-2 border-green-200 bg-green-50 rounded-xl"
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-2 mb-2">
//                                   <Check className="w-5 h-5 text-green-600" />
//                                   <h4 className="font-semibold text-gray-900 text-sm">
//                                     {permission.permissionName}
//                                   </h4>
//                                 </div>
//                                 <p className="text-xs text-gray-600 mb-3">
//                                   {permission.description ||
//                                     "No description available"}
//                                 </p>
//                               </div>
//                               <button
//                                 onClick={() =>
//                                   handleRemovePermission(permissionId)
//                                 }
//                                 className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors ml-2"
//                                 title="Remove Permission"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Footer */}
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={onClose}
//                   className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 {activeTab === "assign" && (
//                   <button
//                     onClick={handleAssignPermissions}
//                     disabled={submitting || selectedPermissions.length === 0}
//                     className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
//                   >
//                     {submitting ? (
//                       <Loader className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <Plus className="w-4 h-4" />
//                     )}
//                     Assign Permissions ({selectedPermissions.length})
//                   </button>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPermissionAssignmentModal;
"use client";

import { useState, useEffect } from "react";
import {
  X,
  Shield,
  Check,
  Plus,
  Trash2,
  Search,
  CheckSquare,
  Square,
  Loader,
  Filter,
  Users,
  Building,
  FileText,
  Settings,
  Wrench,
  ClipboardList,
  Package,
  BarChart3,
} from "lucide-react";
import { permissionService } from "../../services/permissionService";
import toast from "react-hot-toast";

const UserPermissionAssignmentModal = ({
  isOpen,
  onClose,
  user,
  onSuccess,
}) => {
  const [assignedPermissions, setAssignedPermissions] = useState([]);
  const [unassignedPermissions, setUnassignedPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("assign");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Permission categories mapping
  const permissionCategories = {
    user: {
      name: "User Management",
      icon: Users,
      color: "blue",
      keywords: ["user", "permission"],
    },
    company: {
      name: "Company Management",
      icon: Building,
      color: "green",
      keywords: ["company"],
    },
    contract: {
      name: "Contract Management",
      icon: FileText,
      color: "purple",
      keywords: ["contract"],
    },
    service: {
      name: "Service Management",
      icon: Settings,
      color: "orange",
      keywords: ["service", "sub_service", "service_scope"],
    },
    property: {
      name: "Property Management",
      icon: Building,
      color: "indigo",
      keywords: ["property_flow"],
    },
    asset: {
      name: "Asset Management",
      icon: Package,
      color: "teal",
      keywords: ["asset"],
    },
    work: {
      name: "Work Management",
      icon: Wrench,
      color: "red",
      keywords: ["work_request", "work_order"],
    },
    checklist: {
      name: "Checklist Management",
      icon: ClipboardList,
      color: "pink",
      keywords: ["checklist"],
    },
    inventory: {
      name: "Inventory Management",
      icon: Package,
      color: "cyan",
      keywords: ["inventory", "spare_parts"],
    },
    kpi: {
      name: "KPI & Reports",
      icon: BarChart3,
      color: "yellow",
      keywords: ["kpi", "technician_availability"],
    },
    system: {
      name: "System Settings",
      icon: Settings,
      color: "gray",
      keywords: ["password", "username", "generate"],
    },
  };

  useEffect(() => {
    if (isOpen && user) {
      loadData();
    }
  }, [isOpen, user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [assignedRes, unassignedRes] = await Promise.all([
        permissionService.getAssignedPermissions(user.userId, user.userType),
        permissionService.getUnassignedPermissions(user.userId, user.userType),
      ]);

      setAssignedPermissions(assignedRes.data || []);
      setUnassignedPermissions(unassignedRes.data || []);
    } catch (error) {
      console.error("Error loading permission data:", error);
      toast.error("Failed to load permission data");
    } finally {
      setLoading(false);
    }
  };

  const categorizePermission = (permissionName) => {
    const lowerName = permissionName.toLowerCase();

    for (const [categoryKey, category] of Object.entries(
      permissionCategories
    )) {
      if (category.keywords.some((keyword) => lowerName.includes(keyword))) {
        return categoryKey;
      }
    }
    return "system";
  };

  const filterPermissions = (permissions) => {
    let filtered = permissions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((permission) => {
        const matchesName = permission.permissionName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesDescription = permission.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const category =
          permissionCategories[categorizePermission(permission.permissionName)];
        const matchesCategory = category?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        return matchesName || matchesDescription || matchesCategory;
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (permission) =>
          categorizePermission(permission.permissionName) === selectedCategory
      );
    }

    return filtered;
  };

  const getPermissionsByCategory = (permissions) => {
    const categorized = {};

    // Initialize categories
    Object.keys(permissionCategories).forEach((key) => {
      categorized[key] = [];
    });

    // Categorize permissions
    permissions.forEach((permission) => {
      const category = categorizePermission(permission.permissionName);
      categorized[category].push(permission);
    });

    return categorized;
  };

  const handleAssignPermissions = async () => {
    if (selectedPermissions.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }

    if (!user.roleId) {
      toast.error("User must have a role assigned");
      return;
    }

    setSubmitting(true);
    try {
      for (const permissionId of selectedPermissions) {
        await permissionService.assignPermissionToUser({
          userId: user.userId,
          permissionId: permissionId,
          roleId: user.roleId,
          userType: user.userType,
        });
      }

      await loadData();
      setSelectedPermissions([]);
      toast.success(
        `Successfully assigned ${selectedPermissions.length} permission(s)!`
      );
      onSuccess();
    } catch (error) {
      console.error("Error assigning permissions:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to assign permissions";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemovePermission = async (permissionId) => {
    if (!window.confirm("Are you sure you want to remove this permission?")) {
      return;
    }

    try {
      await permissionService.removePermissionFromUser({
        userId: user.userId,
        permissionId: permissionId,
        userType: user.userType,
      });

      await loadData();
      toast.success("Permission removed successfully!");
    } catch (error) {
      console.error("Error removing permission:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to remove permission";
      toast.error(errorMessage);
    }
  };

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const toggleCategoryPermissions = (categoryPermissions) => {
    const categoryIds = categoryPermissions.map((p) => p.id || p.permissionId);
    const allSelected = categoryIds.every((id) =>
      selectedPermissions.includes(id)
    );

    if (allSelected) {
      setSelectedPermissions((prev) =>
        prev.filter((id) => !categoryIds.includes(id))
      );
    } else {
      setSelectedPermissions((prev) => [...new Set([...prev, ...categoryIds])]);
    }
  };

  const toggleAllPermissions = () => {
    const filtered = filterPermissions(unassignedPermissions);
    const filteredIds = filtered.map((p) => p.id || p.permissionId);

    if (selectedPermissions.length === filteredIds.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(filteredIds);
    }
  };

  const getPermissionIcon = (permissionName) => {
    const lowerName = permissionName.toLowerCase();
    if (lowerName.includes("view") || lowerName.includes("read")) {
      return "👁️";
    } else if (lowerName.includes("create") || lowerName.includes("add")) {
      return "➕";
    } else if (lowerName.includes("update") || lowerName.includes("edit")) {
      return "✏️";
    } else if (lowerName.includes("delete") || lowerName.includes("remove")) {
      return "🗑️";
    } else if (lowerName.includes("assign")) {
      return "🔗";
    } else if (lowerName.includes("review")) {
      return "🔍";
    }
    return "🔒";
  };

  const getCategoryColor = (categoryKey) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200",
      green: "bg-green-50 border-green-200",
      purple: "bg-purple-50 border-purple-200",
      orange: "bg-orange-50 border-orange-200",
      indigo: "bg-indigo-50 border-indigo-200",
      teal: "bg-teal-50 border-teal-200",
      red: "bg-red-50 border-red-200",
      pink: "bg-pink-50 border-pink-200",
      cyan: "bg-cyan-50 border-cyan-200",
      yellow: "bg-yellow-50 border-yellow-200",
      gray: "bg-gray-50 border-gray-200",
    };
    return colors[permissionCategories[categoryKey]?.color] || colors.gray;
  };

  if (!isOpen || !user) return null;

  const filteredUnassigned = filterPermissions(unassignedPermissions);
  const filteredAssigned = filterPermissions(assignedPermissions);
  const categorizedUnassigned = getPermissionsByCategory(filteredUnassigned);
  const categorizedAssigned = getPermissionsByCategory(filteredAssigned);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Manage User Permissions
                </h2>
                <p className="text-purple-100">
                  {user.firstName} {user.lastName} ({user.email})
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
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Loading permission data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* User Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {user.userType} User • Role: {user.roleName || "No Role"}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm font-medium text-green-600">
                      {assignedPermissions.length} Assigned Permissions
                    </p>
                    <p className="text-sm font-medium text-blue-600">
                      {unassignedPermissions.length} Available Permissions
                    </p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("assign")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "assign"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Assign Permissions ({unassignedPermissions.length})
                </button>
                <button
                  onClick={() => setActiveTab("remove")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "remove"
                      ? "bg-white text-purple-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Current Permissions ({assignedPermissions.length})
                </button>
              </div>

              {/* Search and Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search permissions or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  >
                    <option value="all">All Categories</option>
                    {Object.entries(permissionCategories).map(
                      ([key, category]) => (
                        <option key={key} value={key}>
                          {category.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                {activeTab === "assign" && (
                  <button
                    onClick={toggleAllPermissions}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    {selectedPermissions.length ===
                    filteredUnassigned.length ? (
                      <CheckSquare className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400" />
                    )}
                    {selectedPermissions.length === filteredUnassigned.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                )}
              </div>

              {activeTab === "assign" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                      Available Permissions by Category
                    </h3>
                    <span className="text-sm text-gray-500">
                      {selectedPermissions.length} selected
                    </span>
                  </div>

                  {filteredUnassigned.length === 0 ? (
                    <div className="text-center py-8">
                      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No unassigned permissions found
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {Object.entries(categorizedUnassigned).map(
                        ([categoryKey, categoryPermissions]) => {
                          if (categoryPermissions.length === 0) return null;

                          const category = permissionCategories[categoryKey];
                          const IconComponent = category.icon;
                          const categoryIds = categoryPermissions.map(
                            (p) => p.id || p.permissionId
                          );
                          const allSelected = categoryIds.every((id) =>
                            selectedPermissions.includes(id)
                          );
                          const someSelected = categoryIds.some((id) =>
                            selectedPermissions.includes(id)
                          );

                          return (
                            <div
                              key={categoryKey}
                              className={`border-2 rounded-xl overflow-hidden ${getCategoryColor(
                                categoryKey
                              )}`}
                            >
                              <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <IconComponent className="w-5 h-5" />
                                    <h4 className="font-semibold text-gray-800">
                                      {category.name}
                                    </h4>
                                    <span className="bg-white bg-opacity-70 px-2 py-1 rounded-full text-xs font-medium">
                                      {categoryPermissions.length} permissions
                                    </span>
                                  </div>
                                  <button
                                    onClick={() =>
                                      toggleCategoryPermissions(
                                        categoryPermissions
                                      )
                                    }
                                    className="flex items-center gap-2 px-3 py-1 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-90 transition-colors"
                                  >
                                    {allSelected ? (
                                      <CheckSquare className="w-4 h-4 text-purple-600" />
                                    ) : someSelected ? (
                                      <Square className="w-4 h-4 text-purple-400" />
                                    ) : (
                                      <Square className="w-4 h-4 text-gray-400" />
                                    )}
                                    <span className="text-sm font-medium">
                                      {allSelected
                                        ? "Deselect All"
                                        : "Select All"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {categoryPermissions.map((permission) => {
                                    const permissionId =
                                      permission.id || permission.permissionId;
                                    const isSelected =
                                      selectedPermissions.includes(
                                        permissionId
                                      );

                                    return (
                                      <div
                                        key={permissionId}
                                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                                          isSelected
                                            ? "border-purple-500 bg-purple-50"
                                            : "border-gray-200 bg-white hover:border-gray-300"
                                        }`}
                                        onClick={() =>
                                          togglePermission(permissionId)
                                        }
                                      >
                                        <div className="flex items-start gap-3">
                                          {isSelected ? (
                                            <CheckSquare className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                          ) : (
                                            <Square className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                          )}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="text-sm">
                                                {getPermissionIcon(
                                                  permission.permissionName
                                                )}
                                              </span>
                                              <h5 className="font-medium text-gray-900 text-sm truncate">
                                                {permission.permissionName}
                                              </h5>
                                            </div>
                                            <p className="text-xs text-gray-600 line-clamp-2">
                                              {permission.description ||
                                                "No description available"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "remove" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Current Permissions by Category
                  </h3>

                  {filteredAssigned.length === 0 ? (
                    <div className="text-center py-8">
                      <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No assigned permissions found
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {Object.entries(categorizedAssigned).map(
                        ([categoryKey, categoryPermissions]) => {
                          if (categoryPermissions.length === 0) return null;

                          const category = permissionCategories[categoryKey];
                          const IconComponent = category.icon;

                          return (
                            <div
                              key={categoryKey}
                              className="border-2 border-green-200 bg-green-50 rounded-xl overflow-hidden"
                            >
                              <div className="p-4 border-b border-green-200">
                                <div className="flex items-center gap-3">
                                  <IconComponent className="w-5 h-5 text-green-700" />
                                  <h4 className="font-semibold text-green-800">
                                    {category.name}
                                  </h4>
                                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {categoryPermissions.length} permissions
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {categoryPermissions.map((permission) => {
                                    const permissionId =
                                      permission.id || permission.permissionId;

                                    return (
                                      <div
                                        key={permissionId}
                                        className="p-3 bg-white border border-green-200 rounded-lg"
                                      >
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                              <Check className="w-4 h-4 text-green-600" />
                                              <span className="text-sm">
                                                {getPermissionIcon(
                                                  permission.permissionName
                                                )}
                                              </span>
                                              <h5 className="font-medium text-gray-900 text-sm">
                                                {permission.permissionName}
                                              </h5>
                                            </div>
                                            <p className="text-xs text-gray-600">
                                              {permission.description ||
                                                "No description available"}
                                            </p>
                                          </div>
                                          <button
                                            onClick={() =>
                                              handleRemovePermission(
                                                permissionId
                                              )
                                            }
                                            className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors ml-2"
                                            title="Remove Permission"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                {activeTab === "assign" && (
                  <button
                    onClick={handleAssignPermissions}
                    disabled={submitting || selectedPermissions.length === 0}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {submitting ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Assign Permissions ({selectedPermissions.length})
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPermissionAssignmentModal;
