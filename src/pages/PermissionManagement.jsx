// "use client";

// import { useState, useEffect } from "react";
// import {
//   Shield,
//   Users,
//   Eye,
//   UserPlus,
//   Search,
//   Filter,
//   ChevronDown,
//   RefreshCw,
//   Building,
//   Mail,
//   Settings,
// } from "lucide-react";
// import { permissionService } from "../services/permissionService";
// import { userService } from "../services/userService";
// import PermissionValuesModal from "../components/PermissionManagement/PermissionValuesModal";
// import UserPermissionAssignmentModal from "../components/PermissionManagement/UserPermissionAssignmentModal";

// const PermissionManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [showPermissionValues, setShowPermissionValues] = useState(false);
//   const [showUserPermissionModal, setShowUserPermissionModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     filterUsers();
//   }, [users, searchTerm, filterType]);

//   const loadInitialData = async () => {
//     try {
//       setLoading(true);
//       const [usersResponse, permissionsResponse] = await Promise.all([
//         userService.getAllUsers(),
//         permissionService.getAllPermissions(),
//       ]);
//       setUsers(usersResponse.data || []);
//       setPermissions(permissionsResponse.data || []);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadInitialData();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   const filterUsers = () => {
//     let filtered = users;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (user) =>
//           user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.username.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by user type
//     if (filterType !== "all") {
//       filtered = filtered.filter((user) => user.userType === filterType);
//     }

//     setFilteredUsers(filtered);
//   };

//   const handleAssignPermissions = (user) => {
//     setSelectedUser(user);
//     setShowUserPermissionModal(true);
//   };

//   const getUserTypeColor = (userType) => {
//     return userType === "INTERNAL"
//       ? "bg-blue-100 text-blue-800 border-blue-200"
//       : "bg-green-100 text-green-800 border-green-200";
//   };

//   const getUserTypeIcon = (userType) => {
//     return userType === "INTERNAL" ? Shield : Building;
//   };

//   const getStats = () => {
//     const internalUsers = users.filter((u) => u.userType === "INTERNAL").length;
//     const companyUsers = users.filter((u) => u.userType === "COMPANY").length;
//     return {
//       total: users.length,
//       internal: internalUsers,
//       company: companyUsers,
//       totalPermissions: permissions.length,
//     };
//   };

//   const stats = getStats();

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Shield className="w-8 h-8 text-purple-600" />
//               Permission Management
//             </h1>
//             <p className="text-gray-600 text-base">
//               Manage user permissions and access control
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
//             <button
//               onClick={() => setShowPermissionValues(true)}
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               <Eye className="w-5 h-5 mr-2" />
//               See Permission Values
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <Users className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Total Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.total}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <Shield className="w-6 h-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Internal Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.internal}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-green-100 rounded-lg">
//                 <Building className="w-6 h-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Company Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.company}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-orange-100 rounded-lg">
//                 <Settings className="w-6 h-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Total Permissions
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.totalPermissions}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => setShowPermissionValues(true)}
//               className="flex-1 max-w-md inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               <Eye className="w-6 h-6 mr-3" />
//               <div className="text-left">
//                 <div className="text-lg">See Permission Values</div>
//                 <div className="text-sm opacity-90">
//                   View all available permissions
//                 </div>
//               </div>
//             </button>
//             <button
//               onClick={() => {
//                 /* This will be handled by the user table below */
//               }}
//               className="flex-1 max-w-md inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               <UserPlus className="w-6 h-6 mr-3" />
//               <div className="text-left">
//                 <div className="text-lg">Assign Permissions</div>
//                 <div className="text-sm opacity-90">
//                   Select users from the table below
//                 </div>
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
//                 >
//                   <option value="all">All Users</option>
//                   <option value="INTERNAL">Internal Users</option>
//                   <option value="COMPANY">Company Users</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <Users className="w-6 h-6 text-purple-600" />
//               Users for Permission Assignment ({filteredUsers.length})
//             </h3>
//             <p className="text-gray-600 mt-1">
//               Click "Assign Permission" to manage user permissions
//             </p>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading users...</p>
//               </div>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="text-center py-16">
//               <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 No Users Found
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {searchTerm || filterType !== "all"
//                   ? "No users match your current filters"
//                   : "No users available for permission assignment"}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.map((user) => {
//                     const TypeIcon = getUserTypeIcon(user.userType);
//                     return (
//                       <tr
//                         key={`${user.userType}-${user.userId}`}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                               <span className="text-white font-semibold text-sm">
//                                 {user.firstName.charAt(0)}
//                                 {user.lastName.charAt(0)}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">
//                                 {user.firstName} {user.lastName}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 @{user.username}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
//                               user.userType
//                             )}`}
//                           >
//                             <TypeIcon className="w-3 h-3 mr-1" />
//                             {user.userType}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-4 h-4 text-gray-400" />
//                             <span className="text-sm text-gray-900">
//                               {user.email}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-900">
//                             {user.roleName || "No Role"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-center">
//                           <button
//                             onClick={() => handleAssignPermissions(user)}
//                             className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
//                           >
//                             <Shield className="w-4 h-4 mr-2" />
//                             Assign Permission
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Modals */}
//         <PermissionValuesModal
//           isOpen={showPermissionValues}
//           onClose={() => setShowPermissionValues(false)}
//           permissions={permissions}
//         />

//         <UserPermissionAssignmentModal
//           isOpen={showUserPermissionModal}
//           onClose={() => setShowUserPermissionModal(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowUserPermissionModal(false);
//             // Optionally refresh data
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default PermissionManagement;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Shield,
//   Users,
//   Eye,
//   Search,
//   Filter,
//   ChevronDown,
//   RefreshCw,
//   Building,
//   Mail,
//   Settings,
// } from "lucide-react";
// import { permissionService } from "../services/permissionService";
// import { userService } from "../services/userService";
// import PermissionValuesModal from "../components/PermissionManagement/PermissionValuesModal";
// import UserPermissionAssignmentModal from "../components/PermissionManagement/UserPermissionAssignmentModal";

// const PermissionManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [showPermissionValues, setShowPermissionValues] = useState(false);
//   const [showUserPermissionModal, setShowUserPermissionModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     filterUsers();
//   }, [users, searchTerm, filterType]);

//   const loadInitialData = async () => {
//     try {
//       setLoading(true);
//       const [usersResponse, permissionsResponse] = await Promise.all([
//         userService.getAllUsers(),
//         permissionService.getAllPermissions(),
//       ]);
//       setUsers(usersResponse.data || []);
//       setPermissions(permissionsResponse.data || []);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadInitialData();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   const filterUsers = () => {
//     let filtered = users;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (user) =>
//           user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.username.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by user type
//     if (filterType !== "all") {
//       filtered = filtered.filter((user) => user.userType === filterType);
//     }

//     setFilteredUsers(filtered);
//   };

//   const handleAssignPermissions = (user) => {
//     setSelectedUser(user);
//     setShowUserPermissionModal(true);
//   };

//   const getUserTypeColor = (userType) => {
//     return userType === "INTERNAL"
//       ? "bg-blue-100 text-blue-800 border-blue-200"
//       : "bg-green-100 text-green-800 border-green-200";
//   };

//   const getUserTypeIcon = (userType) => {
//     return userType === "INTERNAL" ? Shield : Building;
//   };

//   const getStats = () => {
//     const internalUsers = users.filter((u) => u.userType === "INTERNAL").length;
//     const companyUsers = users.filter((u) => u.userType === "COMPANY").length;
//     return {
//       total: users.length,
//       internal: internalUsers,
//       company: companyUsers,
//       totalPermissions: permissions.length,
//     };
//   };

//   const stats = getStats();

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Shield className="w-8 h-8 text-purple-600" />
//               Permission Management
//             </h1>
//             <p className="text-gray-600 text-base">
//               Manage user permissions and access control
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
//             <button
//               onClick={() => setShowPermissionValues(true)}
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               <Eye className="w-5 h-5 mr-2" />
//               See Permission Values
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <Users className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Total Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.total}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <Shield className="w-6 h-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Internal Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.internal}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-green-100 rounded-lg">
//                 <Building className="w-6 h-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Company Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.company}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-orange-100 rounded-lg">
//                 <Settings className="w-6 h-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Total Permissions
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.totalPermissions}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
//                 >
//                   <option value="all">All Users</option>
//                   <option value="INTERNAL">Internal Users</option>
//                   <option value="COMPANY">Company Users</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <Users className="w-6 h-6 text-purple-600" />
//               Users for Permission Assignment ({filteredUsers.length})
//             </h3>
//             <p className="text-gray-600 mt-1">
//               Click "Assign Permission" to manage user permissions
//             </p>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading users...</p>
//               </div>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="text-center py-16">
//               <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 No Users Found
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {searchTerm || filterType !== "all"
//                   ? "No users match your current filters"
//                   : "No users available for permission assignment"}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.map((user) => {
//                     const TypeIcon = getUserTypeIcon(user.userType);
//                     return (
//                       <tr
//                         key={`${user.userType}-${user.userId}`}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                               <span className="text-white font-semibold text-sm">
//                                 {user.firstName.charAt(0)}
//                                 {user.lastName.charAt(0)}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">
//                                 {user.firstName} {user.lastName}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 @{user.username}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
//                               user.userType
//                             )}`}
//                           >
//                             <TypeIcon className="w-3 h-3 mr-1" />
//                             {user.userType}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-4 h-4 text-gray-400" />
//                             <span className="text-sm text-gray-900">
//                               {user.email}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-900">
//                             {user.roleName || "No Role"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-center">
//                           <button
//                             onClick={() => handleAssignPermissions(user)}
//                             className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
//                           >
//                             <Shield className="w-4 h-4 mr-2" />
//                             Assign Permission
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Modals */}
//         <PermissionValuesModal
//           isOpen={showPermissionValues}
//           onClose={() => setShowPermissionValues(false)}
//           permissions={permissions}
//         />

//         <UserPermissionAssignmentModal
//           isOpen={showUserPermissionModal}
//           onClose={() => setShowUserPermissionModal(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowUserPermissionModal(false);
//             // Optionally refresh data
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default PermissionManagement;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Shield,
//   Users,
//   Eye,
//   Search,
//   Filter,
//   ChevronDown,
//   RefreshCw,
//   Building,
//   Mail,
//   Settings,
// } from "lucide-react";
// import { permissionService } from "../services/permissionService";
// import { userService } from "../services/userService";
// import PermissionValuesModal from "../components/PermissionManagement/PermissionValuesModal";
// import UserPermissionAssignmentModal from "../components/PermissionManagement/UserPermissionAssignmentModal";

// const PermissionManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [showPermissionValues, setShowPermissionValues] = useState(false);
//   const [showUserPermissionModal, setShowUserPermissionModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     filterUsers();
//   }, [users, searchTerm, filterType]);

//   const loadInitialData = async () => {
//     try {
//       setLoading(true);
//       const [usersResponse, permissionsResponse] = await Promise.all([
//         userService.getAllUsers(),
//         permissionService.getAllPermissions(),
//       ]);
//       setUsers(usersResponse.data || []);
//       setPermissions(permissionsResponse.data || []);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadInitialData();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   const filterUsers = () => {
//     let filtered = users;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (user) =>
//           user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.username.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by user type
//     if (filterType !== "all") {
//       filtered = filtered.filter((user) => user.userType === filterType);
//     }

//     setFilteredUsers(filtered);
//   };

//   const handleAssignPermissions = (user) => {
//     setSelectedUser(user);
//     setShowUserPermissionModal(true);
//   };

//   const getUserTypeColor = (userType) => {
//     return userType === "INTERNAL"
//       ? "bg-blue-100 text-blue-800 border-blue-200"
//       : "bg-green-100 text-green-800 border-green-200";
//   };

//   const getUserTypeIcon = (userType) => {
//     return userType === "INTERNAL" ? Shield : Building;
//   };

//   const getStats = () => {
//     const internalUsers = users.filter((u) => u.userType === "INTERNAL").length;
//     const companyUsers = users.filter((u) => u.userType === "COMPANY").length;
//     return {
//       total: users.length,
//       internal: internalUsers,
//       company: companyUsers,
//       totalPermissions: permissions.length,
//     };
//   };

//   const stats = getStats();

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Shield className="w-8 h-8 text-purple-600" />
//               Permission Management
//             </h1>
//             <p className="text-gray-600 text-base">
//               Manage user permissions and access control
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
//             <button
//               onClick={() => setShowPermissionValues(true)}
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               <Eye className="w-5 h-5 mr-2" />
//               See Permission Values
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-100 rounded-lg">
//                 <Users className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Total Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.total}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <Shield className="w-6 h-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Internal Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.internal}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-green-100 rounded-lg">
//                 <Building className="w-6 h-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Company Users
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.company}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-orange-100 rounded-lg">
//                 <Settings className="w-6 h-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Total Permissions
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.totalPermissions}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
//                 >
//                   <option value="all">All Users</option>
//                   <option value="INTERNAL">Internal Users</option>
//                   <option value="COMPANY">Company Users</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               <Users className="w-6 h-6 text-purple-600" />
//               Users for Permission Assignment ({filteredUsers.length})
//             </h3>
//             <p className="text-gray-600 mt-1">
//               Click "Assign Permission" to manage user permissions
//             </p>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading users...</p>
//               </div>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="text-center py-16">
//               <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 No Users Found
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {searchTerm || filterType !== "all"
//                   ? "No users match your current filters"
//                   : "No users available for permission assignment"}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       User
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Role
//                     </th>
//                     <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredUsers.map((user) => {
//                     const TypeIcon = getUserTypeIcon(user.userType);
//                     return (
//                       <tr
//                         key={`${user.userType}-${user.userId}`}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                               <span className="text-white font-semibold text-sm">
//                                 {user.firstName.charAt(0)}
//                                 {user.lastName.charAt(0)}
//                               </span>
//                             </div>
//                             <div>
//                               <div className="text-sm font-medium text-gray-900">
//                                 {user.firstName} {user.lastName}
//                               </div>
//                               <div className="text-sm text-gray-500">
//                                 @{user.username}
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
//                               user.userType
//                             )}`}
//                           >
//                             <TypeIcon className="w-3 h-3 mr-1" />
//                             {user.userType}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <Mail className="w-4 h-4 text-gray-400" />
//                             <span className="text-sm text-gray-900">
//                               {user.email}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className="text-sm text-gray-900">
//                             {user.roleName || "No Role"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-center">
//                           <button
//                             onClick={() => handleAssignPermissions(user)}
//                             className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
//                           >
//                             <Shield className="w-4 h-4 mr-2" />
//                             Assign Permission
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Modals */}
//         <PermissionValuesModal
//           isOpen={showPermissionValues}
//           onClose={() => setShowPermissionValues(false)}
//         />

//         <UserPermissionAssignmentModal
//           isOpen={showUserPermissionModal}
//           onClose={() => setShowUserPermissionModal(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowUserPermissionModal(false);
//             // Optionally refresh data
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// // export default PermissionManagement;

// "use client";
// import { useState, useEffect } from "react";
// import {
//   Shield,
//   Users,
//   Eye,
//   Search,
//   Filter,
//   ChevronDown,
//   RefreshCw,
//   Building,
//   Mail,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   Home,
// } from "lucide-react";
// import { permissionService } from "../services/permissionService";
// import { userService } from "../services/userService";
// import { companyService } from "../services/companyService";
// import PermissionValuesModal from "../components/PermissionManagement/PermissionValuesModal";
// import UserPermissionAssignmentModal from "../components/PermissionManagement/UserPermissionAssignmentModal";

// const PermissionManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [showPermissionValues, setShowPermissionValues] = useState(false);
//   const [showUserPermissionModal, setShowUserPermissionModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   useEffect(() => {
//     loadUsers();
//   }, [roleFilter, selectedCompany, currentPage, pageSize]);

//   const loadInitialData = async () => {
//     try {
//       const [permissionsResponse, companiesResponse] = await Promise.all([
//         permissionService.getAllPermissions(),
//         companyService.getAllCompanies(),
//       ]);
//       setPermissions(permissionsResponse.data || []);
//       setCompanies(companiesResponse.data || []);
//     } catch (error) {
//       console.error("Error loading initial data:", error);
//     }
//   };

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       let response;

//       switch (roleFilter) {
//         case "internal":
//           response = await userService.getInternalUsers(currentPage, pageSize);
//           break;
//         case "company":
//           response = await userService.getCompanyUsers(currentPage, pageSize);
//           break;
//         case "technicians":
//           response = await userService.getTechnicians(currentPage, pageSize);
//           break;
//         case "tenants":
//           if (!selectedCompany) {
//             setUsers([]);
//             setTotalElements(0);
//             setTotalPages(0);
//             return;
//           }
//           response = await userService.getTenantsByCompany(
//             selectedCompany,
//             currentPage,
//             pageSize
//           );
//           break;
//         case "client-admins":
//           if (!selectedCompany) {
//             setUsers([]);
//             setTotalElements(0);
//             setTotalPages(0);
//             return;
//           }
//           response = await userService.getClientAdminsByCompany(
//             selectedCompany,
//             currentPage,
//             pageSize
//           );
//           break;
//         case "super-admins":
//           response = await userService.getSuperAdmins(currentPage, pageSize);
//           break;
//         case "supervisors":
//           response = await userService.getSupervisors(currentPage, pageSize);
//           break;
//         default:
//           response = await userService.getInternalUsers(currentPage, pageSize);
//           break;
//       }

//       if (response.data) {
//         setUsers(response.data.content || []);
//         setTotalElements(response.data.totalElements || 0);
//         setTotalPages(response.data.totalPages || 0);
//       }
//     } catch (error) {
//       console.error("Error loading users:", error);
//       setUsers([]);
//       setTotalElements(0);
//       setTotalPages(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadUsers();
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   const handleRoleFilterChange = (newRole) => {
//     setRoleFilter(newRole);
//     setCurrentPage(0);
//     setSelectedCompany("");
//   };

//   const handleCompanyChange = (companyId) => {
//     setSelectedCompany(companyId);
//     setCurrentPage(0);
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const handleAssignPermissions = (user) => {
//     setSelectedUser(user);
//     setShowUserPermissionModal(true);
//   };

//   const getUserTypeColor = (userType) => {
//     return userType === "INTERNAL"
//       ? "bg-blue-100 text-blue-800 border-blue-200"
//       : "bg-green-100 text-green-800 border-green-200";
//   };

//   const getUserTypeIcon = (userType) => {
//     return userType === "INTERNAL" ? Shield : Building;
//   };

//   const getRoleIcon = (roleName) => {
//     switch (roleName) {
//       case "Super_Admin":
//         return Shield;
//       case "Supervisor":
//         return Settings;
//       case "Technician":
//         return Users;
//       case "Client_Admin":
//         return Building;
//       case "Tenant":
//         return Home;
//       default:
//         return Users;
//     }
//   };

//   const filteredUsers = users.filter((user) => {
//     if (!searchTerm) return true;
//     return (
//       user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.username.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const requiresCompanySelection = ["tenants", "client-admins"].includes(
//     roleFilter
//   );

//   const getRoleDisplayName = (role) => {
//     const roleNames = {
//       all: "All Users",
//       internal: "Internal Users",
//       company: "Company Users",
//       technicians: "Technicians",
//       tenants: "Tenants",
//       "client-admins": "Client Admins",
//       "super-admins": "Super Admins",
//       supervisors: "Supervisors",
//     };
//     return roleNames[role] || role;
//   };

//   const getStats = () => {
//     return {
//       totalUsers: totalElements,
//       totalPermissions: permissions.length,
//     };
//   };

//   const stats = getStats();

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Shield className="w-8 h-8 text-purple-600" />
//               Permission Management
//             </h1>
//             <p className="text-gray-600 text-base">
//               Manage user permissions with role-based filtering
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
//             <button
//               onClick={() => setShowPermissionValues(true)}
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               <Eye className="w-5 h-5 mr-2" />
//               See Permission Values
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-purple-100 rounded-lg">
//                 <Users className="w-6 h-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   {getRoleDisplayName(roleFilter)}
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.totalUsers.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-orange-100 rounded-lg">
//                 <Settings className="w-6 h-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600 uppercase">
//                   Total Permissions
//                 </p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {stats.totalPermissions}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
//           <div className="space-y-6">
//             {/* Role Filter */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Filter by Role
//                 </label>
//                 <div className="relative">
//                   <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <select
//                     value={roleFilter}
//                     onChange={(e) => handleRoleFilterChange(e.target.value)}
//                     className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
//                   >
//                     <option value="all">All Users</option>
//                     <option value="internal">Internal Users</option>
//                     <option value="company">Company Users</option>
//                     <option value="technicians">Technicians</option>
//                     <option value="tenants">Tenants</option>
//                     <option value="client-admins">Client Admins</option>
//                     <option value="super-admins">Super Admins</option>
//                     <option value="supervisors">Supervisors</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                 </div>
//               </div>

//               {/* Company Filter */}
//               {requiresCompanySelection && (
//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Select Company *
//                   </label>
//                   <div className="relative">
//                     <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <select
//                       value={selectedCompany}
//                       onChange={(e) => handleCompanyChange(e.target.value)}
//                       className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
//                     >
//                       <option value="">Select a company</option>
//                       {companies.map((company) => (
//                         <option
//                           key={company.companyId}
//                           value={company.companyId}
//                         >
//                           {company.companyName}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                   </div>
//                 </div>
//               )}

//               {/* Page Size */}
//               <div className="w-32">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Page Size
//                 </label>
//                 <select
//                   value={pageSize}
//                   onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//                   className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
//                 >
//                   <option value={5}>5</option>
//                   <option value={10}>10</option>
//                   <option value={25}>25</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>
//             </div>

//             {/* Search */}
//             <div className="relative max-w-md">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search users..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Company Selection Warning */}
//         {requiresCompanySelection && !selectedCompany && (
//           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
//             <div className="flex items-center gap-3">
//               <Building className="w-6 h-6 text-yellow-600" />
//               <div>
//                 <h3 className="text-lg font-semibold text-yellow-800">
//                   Company Selection Required
//                 </h3>
//                 <p className="text-yellow-700">
//                   Please select a company to view{" "}
//                   {getRoleDisplayName(roleFilter).toLowerCase()} for permission
//                   assignment.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Users Table */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                   <Users className="w-6 h-6 text-purple-600" />
//                   Users for Permission Assignment ({filteredUsers.length})
//                 </h3>
//                 <p className="text-gray-600 mt-1">
//                   Click "Assign Permission" to manage user permissions
//                 </p>
//               </div>
//               {totalElements > 0 && (
//                 <p className="text-sm text-gray-500">
//                   Showing {currentPage * pageSize + 1} to{" "}
//                   {Math.min((currentPage + 1) * pageSize, totalElements)} of{" "}
//                   {totalElements} users
//                 </p>
//               )}
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-16">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading users...</p>
//               </div>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="text-center py-16">
//               <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 No Users Found
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 {requiresCompanySelection && !selectedCompany
//                   ? "Please select a company to view users"
//                   : searchTerm
//                   ? "No users match your search criteria"
//                   : `No ${getRoleDisplayName(
//                       roleFilter
//                     ).toLowerCase()} available for permission assignment`}
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         User
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Type
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Email
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Role
//                       </th>
//                       <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredUsers.map((user) => {
//                       const TypeIcon = getUserTypeIcon(user.userType);
//                       const RoleIcon = getRoleIcon(user.roleName);
//                       return (
//                         <tr
//                           key={`${user.userType}-${user.userId}`}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
//                                 <span className="text-white font-semibold text-sm">
//                                   {user.firstName.charAt(0)}
//                                   {user.lastName.charAt(0)}
//                                 </span>
//                               </div>
//                               <div>
//                                 <div className="text-sm font-medium text-gray-900">
//                                   {user.firstName} {user.lastName}
//                                 </div>
//                                 <div className="text-sm text-gray-500">
//                                   @{user.username}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span
//                               className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
//                                 user.userType
//                               )}`}
//                             >
//                               <TypeIcon className="w-3 h-3 mr-1" />
//                               {user.userType}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <Mail className="w-4 h-4 text-gray-400" />
//                               <span className="text-sm text-gray-900">
//                                 {user.email}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <RoleIcon className="w-4 h-4 text-gray-500" />
//                               <span className="text-sm text-gray-900">
//                                 {user.roleName || "No Role"}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-center">
//                             <button
//                               onClick={() => handleAssignPermissions(user)}
//                               className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
//                             >
//                               <Shield className="w-4 h-4 mr-2" />
//                               Assign Permission
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//                   <div className="flex items-center justify-between">
//                     <div className="text-sm text-gray-700">
//                       Page {currentPage + 1} of {totalPages}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         disabled={currentPage === 0}
//                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                       </button>

//                       {/* Page numbers */}
//                       {Array.from(
//                         { length: Math.min(5, totalPages) },
//                         (_, i) => {
//                           let pageNum;
//                           if (totalPages <= 5) {
//                             pageNum = i;
//                           } else if (currentPage < 3) {
//                             pageNum = i;
//                           } else if (currentPage > totalPages - 4) {
//                             pageNum = totalPages - 5 + i;
//                           } else {
//                             pageNum = currentPage - 2 + i;
//                           }

//                           return (
//                             <button
//                               key={pageNum}
//                               onClick={() => handlePageChange(pageNum)}
//                               className={`px-3 py-2 border rounded-lg text-sm ${
//                                 currentPage === pageNum
//                                   ? "bg-purple-600 text-white border-purple-600"
//                                   : "border-gray-300 hover:bg-gray-100"
//                               }`}
//                             >
//                               {pageNum + 1}
//                             </button>
//                           );
//                         }
//                       )}

//                       <button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         disabled={currentPage >= totalPages - 1}
//                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Modals */}
//         <PermissionValuesModal
//           isOpen={showPermissionValues}
//           onClose={() => setShowPermissionValues(false)}
//         />
//         <UserPermissionAssignmentModal
//           isOpen={showUserPermissionModal}
//           onClose={() => setShowUserPermissionModal(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowUserPermissionModal(false);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default PermissionManagement;

"use client";
import { useState, useEffect } from "react";
import {
  Shield,
  Users,
  Eye,
  Search,
  Filter,
  ChevronDown,
  RefreshCw,
  Building,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  X,
} from "lucide-react";
import { permissionService } from "../services/permissionService";
import { userService } from "../services/userService";
import { companyService } from "../services/companyService";
import PermissionValuesModal from "../components/PermissionManagement/PermissionValuesModal";
import UserPermissionAssignmentModal from "../components/PermissionManagement/UserPermissionAssignmentModal";

const PermissionManagement = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showPermissionValues, setShowPermissionValues] = useState(false);
  const [showUserPermissionModal, setShowUserPermissionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [roleFilter, selectedCompany, currentPage, pageSize]);

  const loadInitialData = async () => {
    try {
      const [permissionsResponse, companiesResponse] = await Promise.all([
        permissionService.getAllPermissions(),
        companyService.getAllCompanies(),
      ]);
      setPermissions(permissionsResponse.data || []);
      setCompanies(companiesResponse.data || []);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      let response;

      switch (roleFilter) {
        case "internal":
          response = await userService.getInternalUsers(currentPage, pageSize);
          break;
        case "company":
          response = await userService.getCompanyUsers(currentPage, pageSize);
          break;
        case "technicians":
          response = await userService.getTechnicians(currentPage, pageSize);
          break;
        case "tenants":
          if (!selectedCompany) {
            setUsers([]);
            setTotalElements(0);
            setTotalPages(0);
            return;
          }
          response = await userService.getTenantsByCompany(
            selectedCompany,
            currentPage,
            pageSize
          );
          break;
        case "client-admins":
          if (!selectedCompany) {
            setUsers([]);
            setTotalElements(0);
            setTotalPages(0);
            return;
          }
          response = await userService.getClientAdminsByCompany(
            selectedCompany,
            currentPage,
            pageSize
          );
          break;
        case "super-admins":
          response = await userService.getSuperAdmins(currentPage, pageSize);
          break;
        case "supervisors":
          response = await userService.getSupervisors(currentPage, pageSize);
          break;
        default:
          response = await userService.getInternalUsers(currentPage, pageSize);
          break;
      }

      if (response.data) {
        setUsers(response.data.content || []);
        setTotalElements(response.data.totalElements || 0);
        setTotalPages(response.data.totalPages || 0);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]);
      setTotalElements(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadUsers();
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const handleRoleFilterChange = (newRole) => {
    setRoleFilter(newRole);
    setCurrentPage(0);
    setSelectedCompany("");
  };

  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const handleAssignPermissions = (user) => {
    setSelectedUser(user);
    setShowUserPermissionModal(true);
  };

  const handleImageClick = (imageUrl) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setShowImageModal(true);
    }
  };

  const getUserTypeColor = (userType) => {
    return userType === "INTERNAL"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  const getUserTypeIcon = (userType) => {
    return userType === "INTERNAL" ? Shield : Building;
  };

  const getRoleIcon = (roleName) => {
    switch (roleName) {
      case "Super_Admin":
        return Shield;
      case "Supervisor":
        return Settings;
      case "Technician":
        return Users;
      case "Client_Admin":
        return Building;
      case "Tenant":
        return Home;
      default:
        return Users;
    }
  };

  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    return (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const requiresCompanySelection = ["tenants", "client-admins"].includes(
    roleFilter
  );

  const getRoleDisplayName = (role) => {
    const roleNames = {
      all: "All Users",
      internal: "Internal Users",
      company: "Company Users",
      technicians: "Technicians",
      tenants: "Tenants",
      "client-admins": "Client Admins",
      "super-admins": "Super Admins",
      supervisors: "Supervisors",
    };
    return roleNames[role] || role;
  };

  const getStats = () => {
    return {
      totalUsers: totalElements,
      totalPermissions: permissions.length,
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-600" />
              Permission Management
            </h1>
            <p className="text-gray-600 text-base">
              Manage user permissions with role-based filtering
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
            <button
              onClick={() => setShowPermissionValues(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Eye className="w-5 h-5 mr-2" />
              See Permission Values
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  {getRoleDisplayName(roleFilter)}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  Total Permissions
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalPermissions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="space-y-6">
            {/* Role Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Role
                </label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={roleFilter}
                    onChange={(e) => handleRoleFilterChange(e.target.value)}
                    className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
                  >
                    <option value="all">All Users</option>
                    <option value="internal">Internal Users</option>
                    <option value="company">Company Users</option>
                    <option value="technicians">Technicians</option>
                    <option value="tenants">Tenants</option>
                    <option value="client-admins">Client Admins</option>
                    <option value="super-admins">Super Admins</option>
                    <option value="supervisors">Supervisors</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              {/* Company Filter */}
              {requiresCompanySelection && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Company *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedCompany}
                      onChange={(e) => handleCompanyChange(e.target.value)}
                      className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white appearance-none"
                    >
                      <option value="">Select a company</option>
                      {companies.map((company) => (
                        <option
                          key={company.companyId}
                          value={company.companyId}
                        >
                          {company.companyName}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Page Size */}
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Company Selection Warning */}
        {requiresCompanySelection && !selectedCompany && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">
                  Company Selection Required
                </h3>
                <p className="text-yellow-700">
                  Please select a company to view{" "}
                  {getRoleDisplayName(roleFilter).toLowerCase()} for permission
                  assignment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-600" />
                  Users for Permission Assignment ({filteredUsers.length})
                </h3>
                <p className="text-gray-600 mt-1">
                  Click "Assign Permission" to manage user permissions
                </p>
              </div>
              {totalElements > 0 && (
                <p className="text-sm text-gray-500">
                  Showing {currentPage * pageSize + 1} to{" "}
                  {Math.min((currentPage + 1) * pageSize, totalElements)} of{" "}
                  {totalElements} users
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading users...</p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Users Found
              </h3>
              <p className="text-gray-600 mb-6">
                {requiresCompanySelection && !selectedCompany
                  ? "Please select a company to view users"
                  : searchTerm
                  ? "No users match your search criteria"
                  : `No ${getRoleDisplayName(
                      roleFilter
                    ).toLowerCase()} available for permission assignment`}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => {
                      const TypeIcon = getUserTypeIcon(user.userType);
                      const RoleIcon = getRoleIcon(user.roleName);
                      return (
                        <tr
                          key={`${user.userType}-${user.userId}`}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              {user.profileImageUrl ? (
                                <button
                                  onClick={() =>
                                    handleImageClick(user.profileImageUrl)
                                  }
                                >
                                  <img
                                    src={user.profileImageUrl}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
                                  />
                                </button>
                              ) : (
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {user.firstName.charAt(0)}
                                    {user.lastName.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  @{user.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
                                user.userType
                              )}`}
                            >
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {user.userType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900">
                                {user.email}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <RoleIcon className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-900">
                                {user.roleName || "No Role"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <button
                              onClick={() => handleAssignPermissions(user)}
                              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              Assign Permission
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Page {currentPage + 1} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Page numbers */}
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i;
                          } else if (currentPage < 3) {
                            pageNum = i;
                          } else if (currentPage > totalPages - 4) {
                            pageNum = totalPages - 5 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-2 border rounded-lg text-sm ${
                                currentPage === pageNum
                                  ? "bg-purple-600 text-white border-purple-600"
                                  : "border-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {pageNum + 1}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modals */}
        <PermissionValuesModal
          isOpen={showPermissionValues}
          onClose={() => setShowPermissionValues(false)}
        />
        <UserPermissionAssignmentModal
          isOpen={showUserPermissionModal}
          onClose={() => setShowUserPermissionModal(false)}
          user={selectedUser}
          onSuccess={() => {
            setShowUserPermissionModal(false);
          }}
        />
        {showImageModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative bg-white rounded-xl shadow-xl p-4">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged Profile"
                className="max-w-[80vw] max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionManagement;
