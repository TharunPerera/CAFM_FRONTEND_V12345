// "use client";

// import { useState } from "react";
// import {
//   X,
//   Shield,
//   Search,
//   Filter,
//   Eye,
//   Lock,
//   Unlock,
//   Tag,
// } from "lucide-react";

// const PermissionValuesModal = ({ isOpen, onClose, permissions }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");

//   if (!isOpen) return null;

//   const getPermissionCategories = () => {
//     const categories = [
//       ...new Set(permissions.map((p) => p.category || "General")),
//     ];
//     return categories.sort();
//   };

//   const filteredPermissions = permissions.filter((permission) => {
//     const matchesSearch =
//       permission.permissionName
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       (permission.description &&
//         permission.description
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()));

//     const matchesCategory =
//       categoryFilter === "all" ||
//       (permission.category || "General") === categoryFilter;

//     return matchesSearch && matchesCategory;
//   });

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

//   const getPermissionIcon = (permissionName) => {
//     if (permissionName.includes("view") || permissionName.includes("read")) {
//       return <Eye className="w-4 h-4" />;
//     } else if (
//       permissionName.includes("create") ||
//       permissionName.includes("add")
//     ) {
//       return <Lock className="w-4 h-4" />;
//     } else if (
//       permissionName.includes("update") ||
//       permissionName.includes("edit")
//     ) {
//       return <Unlock className="w-4 h-4" />;
//     } else if (
//       permissionName.includes("delete") ||
//       permissionName.includes("remove")
//     ) {
//       return <X className="w-4 h-4" />;
//     }
//     return <Shield className="w-4 h-4" />;
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Permission Values
//                 </h2>
//                 <p className="text-purple-100">
//                   View all available permissions in the system
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
//           {/* Search and Filter Controls */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search permissions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//               />
//             </div>
//             <div className="relative">
//               <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <select
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//               >
//                 <option value="all">All Categories</option>
//                 {getPermissionCategories().map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
//               <div className="flex items-center gap-3">
//                 <Shield className="w-8 h-8 text-purple-600" />
//                 <div>
//                   <p className="text-sm font-medium text-purple-600">
//                     Total Permissions
//                   </p>
//                   <p className="text-2xl font-bold text-purple-900">
//                     {permissions.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <div className="flex items-center gap-3">
//                 <Tag className="w-8 h-8 text-blue-600" />
//                 <div>
//                   <p className="text-sm font-medium text-blue-600">
//                     Categories
//                   </p>
//                   <p className="text-2xl font-bold text-blue-900">
//                     {getPermissionCategories().length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//               <div className="flex items-center gap-3">
//                 <Search className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-sm font-medium text-green-600">
//                     Filtered Results
//                   </p>
//                   <p className="text-2xl font-bold text-green-900">
//                     {filteredPermissions.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Permissions Grid */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-gray-900">
//               Available Permissions
//             </h3>
//             {filteredPermissions.length === 0 ? (
//               <div className="text-center py-8">
//                 <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500">
//                   No permissions found matching your criteria
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//                 {filteredPermissions.map((permission) => (
//                   <div
//                     key={permission.id || permission.permissionId}
//                     className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all"
//                   >
//                     <div className="flex items-start gap-3 mb-3">
//                       <div className="p-2 bg-purple-100 rounded-lg">
//                         {getPermissionIcon(permission.permissionName)}
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-gray-900 text-sm mb-1">
//                           {permission.permissionName}
//                         </h4>
//                         <p className="text-xs text-gray-600 line-clamp-2">
//                           {permission.description || "No description available"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span
//                         className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
//                           permission.category || "General"
//                         )}`}
//                       >
//                         {permission.category || "General"}
//                       </span>
//                       <span className="text-xs text-gray-500">
//                         ID: {permission.id || permission.permissionId}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="flex justify-end pt-6 border-t border-gray-200">
//             <button
//               onClick={onClose}
//               className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PermissionValuesModal;

// "use client";

// import { useState } from "react";
// import { X, Shield, Search, Eye, Lock, Unlock } from "lucide-react";

// const PermissionValuesModal = ({ isOpen, onClose, permissions }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   if (!isOpen) return null;

//   const filteredPermissions = permissions.filter((permission) => {
//     const matchesSearch =
//       permission.permissionName
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase()) ||
//       (permission.description &&
//         permission.description
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()));

//     return matchesSearch;
//   });

//   const getPermissionIcon = (permissionName) => {
//     if (permissionName.includes("view") || permissionName.includes("read")) {
//       return <Eye className="w-4 h-4" />;
//     } else if (
//       permissionName.includes("create") ||
//       permissionName.includes("add")
//     ) {
//       return <Lock className="w-4 h-4" />;
//     } else if (
//       permissionName.includes("update") ||
//       permissionName.includes("edit")
//     ) {
//       return <Unlock className="w-4 h-4" />;
//     } else if (
//       permissionName.includes("delete") ||
//       permissionName.includes("remove")
//     ) {
//       return <X className="w-4 h-4" />;
//     }
//     return <Shield className="w-4 h-4" />;
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Permission Values
//                 </h2>
//                 <p className="text-purple-100">
//                   View all available permissions in the system
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
//           {/* Search Control */}
//           <div className="relative max-w-md">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search permissions..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
//               <div className="flex items-center gap-3">
//                 <Shield className="w-8 h-8 text-purple-600" />
//                 <div>
//                   <p className="text-sm font-medium text-purple-600">
//                     Total Permissions
//                   </p>
//                   <p className="text-2xl font-bold text-purple-900">
//                     {permissions.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//               <div className="flex items-center gap-3">
//                 <Search className="w-8 h-8 text-green-600" />
//                 <div>
//                   <p className="text-sm font-medium text-green-600">
//                     Filtered Results
//                   </p>
//                   <p className="text-2xl font-bold text-green-900">
//                     {filteredPermissions.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Permissions Grid */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold text-gray-900">
//               Available Permissions
//             </h3>
//             {filteredPermissions.length === 0 ? (
//               <div className="text-center py-8">
//                 <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500">
//                   No permissions found matching your criteria
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
//                 {filteredPermissions.map((permission) => (
//                   <div
//                     key={permission.id || permission.permissionId}
//                     className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all"
//                   >
//                     <div className="flex items-start gap-3 mb-3">
//                       <div className="p-2 bg-purple-100 rounded-lg">
//                         {getPermissionIcon(permission.permissionName)}
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="font-semibold text-gray-900 text-sm mb-1">
//                           {permission.permissionName}
//                         </h4>
//                         <p className="text-xs text-gray-600 line-clamp-2">
//                           {permission.description || "No description available"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-xs text-gray-500">
//                         ID: {permission.id || permission.permissionId}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="flex justify-end pt-6 border-t border-gray-200">
//             <button
//               onClick={onClose}
//               className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PermissionValuesModal;

"use client";

import { useState, useEffect } from "react";
import {
  X,
  Shield,
  Search,
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
import toast from "react-hot-toast";
import { permissionService } from "../../services/permissionService";

const PermissionValuesModal = ({ isOpen, onClose }) => {
  const [permissions, setPermissions] = useState([]);
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

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
    if (isOpen) {
      fetchPermissions();
    }
  }, [isOpen]);

  useEffect(() => {
    filterPermissions();
  }, [permissions, searchTerm, selectedCategory]);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const response = await permissionService.getAllPermissions();
      setPermissions(response.data || []);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      toast.error("Failed to load permissions");
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
    return "system"; // Default category
  };

  const filterPermissions = () => {
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

    setFilteredPermissions(filtered);
  };

  const getPermissionsByCategory = () => {
    const categorized = {};

    // Initialize categories
    Object.keys(permissionCategories).forEach((key) => {
      categorized[key] = [];
    });

    // Categorize permissions
    filteredPermissions.forEach((permission) => {
      const category = categorizePermission(permission.permissionName);
      categorized[category].push(permission);
    });

    return categorized;
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
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
      teal: "bg-teal-100 text-teal-800 border-teal-200",
      red: "bg-red-100 text-red-800 border-red-200",
      pink: "bg-pink-100 text-pink-800 border-pink-200",
      cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[permissionCategories[categoryKey]?.color] || colors.gray;
  };

  if (!isOpen) return null;

  const categorizedPermissions = getPermissionsByCategory();
  const totalPermissions = filteredPermissions.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Permission Values
                </h2>
                <p className="text-purple-100">
                  View all available permissions organized by category
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
          {/* Search and Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                {Object.entries(permissionCategories).map(([key, category]) => (
                  <option key={key} value={key}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-600">
                    Total Permissions
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {permissions.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Filter className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {Object.keys(permissionCategories).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Search className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Filtered Results
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {totalPermissions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions by Category */}
          <div className="space-y-6 max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading permissions...</p>
              </div>
            ) : totalPermissions === 0 ? (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No permissions found matching your criteria
                </p>
              </div>
            ) : (
              Object.entries(categorizedPermissions).map(
                ([categoryKey, categoryPermissions]) => {
                  if (categoryPermissions.length === 0) return null;

                  const category = permissionCategories[categoryKey];
                  const IconComponent = category.icon;

                  return (
                    <div
                      key={categoryKey}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <div
                        className={`p-4 ${getCategoryColor(
                          categoryKey
                        )} border-b`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-6 h-6" />
                          <h3 className="text-lg font-semibold">
                            {category.name}
                          </h3>
                          <span className="ml-auto bg-white bg-opacity-50 px-3 py-1 rounded-full text-sm font-medium">
                            {categoryPermissions.length} permissions
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {categoryPermissions.map((permission) => (
                            <div
                              key={permission.id || permission.permissionId}
                              className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-lg flex-shrink-0 mt-0.5">
                                  {getPermissionIcon(permission.permissionName)}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 text-sm truncate">
                                    {permission.permissionName}
                                  </h4>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                    {permission.description ||
                                      "No description available"}
                                  </p>
                                  <div className="mt-2">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                      ID:{" "}
                                      {permission.id || permission.permissionId}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionValuesModal;
