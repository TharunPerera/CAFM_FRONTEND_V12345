// // "use client";
// // import { useState, useEffect, useContext } from "react";
// // import {
// //   Users,
// //   Plus,
// //   Search,
// //   Filter,
// //   Edit,
// //   Trash2,
// //   ChevronDown,
// //   RefreshCw,
// //   UserCheck,
// //   Building,
// //   Mail,
// //   ChevronLeft,
// //   ChevronRight,
// //   Shield,
// //   Settings,
// //   Home,
// // } from "lucide-react";
// // import { userService } from "../services/userService";
// // import { companyService } from "../services/companyService";
// // import UserForm from "../components/UserManagement/UserForm";
// // import { AuthContext } from "../context/AuthContext";
// // import toast from "react-hot-toast";

// // const UserManagement = () => {
// //   const { user } = useContext(AuthContext);
// //   const [users, setUsers] = useState([]);
// //   const [companies, setCompanies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [roleFilter, setRoleFilter] = useState("all");
// //   const [selectedCompany, setSelectedCompany] = useState("");
// //   const [showUserForm, setShowUserForm] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [pageSize, setPageSize] = useState(10);
// //   const [totalElements, setTotalElements] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);

// //   // Check if user has view_user permission
// //   if (!user?.permissions?.includes("view_user")) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">
// //             Access Denied
// //           </h2>
// //           <p className="text-gray-600 mb-6">
// //             You don't have permission to access this page.
// //           </p>
// //           <button
// //             onClick={() => window.history.back()}
// //             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   useEffect(() => {
// //     loadCompanies();
// //     loadUsers();
// //   }, []);

// //   useEffect(() => {
// //     loadUsers();
// //   }, [roleFilter, selectedCompany, currentPage, pageSize]);

// //   const loadCompanies = async () => {
// //     try {
// //       const response = await companyService.getAllCompanies();
// //       setCompanies(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading companies:", error);
// //     }
// //   };

// //   const loadUsers = async () => {
// //     try {
// //       setLoading(true);
// //       let response;

// //       switch (roleFilter) {
// //         case "internal":
// //           response = await userService.getInternalUsers(currentPage, pageSize);
// //           break;
// //         case "company":
// //           response = await userService.getCompanyUsers(currentPage, pageSize);
// //           break;
// //         case "technicians":
// //           response = await userService.getTechnicians(currentPage, pageSize);
// //           break;
// //         case "tenants":
// //           if (!selectedCompany) {
// //             setUsers([]);
// //             setTotalElements(0);
// //             setTotalPages(0);
// //             return;
// //           }
// //           response = await userService.getTenantsByCompany(
// //             selectedCompany,
// //             currentPage,
// //             pageSize
// //           );
// //           break;
// //         case "client-admins":
// //           if (!selectedCompany) {
// //             setUsers([]);
// //             setTotalElements(0);
// //             setTotalPages(0);
// //             return;
// //           }
// //           response = await userService.getClientAdminsByCompany(
// //             selectedCompany,
// //             currentPage,
// //             pageSize
// //           );
// //           break;
// //         case "super-admins":
// //           response = await userService.getSuperAdmins(currentPage, pageSize);
// //           break;
// //         case "supervisors":
// //           response = await userService.getSupervisors(currentPage, pageSize);
// //           break;
// //         default:
// //           response = await userService.getInternalUsers(currentPage, pageSize);
// //           break;
// //       }

// //       if (response.data) {
// //         setUsers(response.data.content || []);
// //         setTotalElements(response.data.totalElements || 0);
// //         setTotalPages(response.data.totalPages || 0);
// //       }
// //     } catch (error) {
// //       console.error("Error loading users:", error);
// //       setUsers([]);
// //       setTotalElements(0);
// //       setTotalPages(0);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await loadUsers();
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 1000);
// //     }
// //   };

// //   const handleRoleFilterChange = (newRole) => {
// //     setRoleFilter(newRole);
// //     setCurrentPage(0);
// //     setSelectedCompany("");
// //   };

// //   const handleCompanyChange = (companyId) => {
// //     setSelectedCompany(companyId);
// //     setCurrentPage(0);
// //   };

// //   const handlePageChange = (newPage) => {
// //     setCurrentPage(newPage);
// //   };

// //   const handlePageSizeChange = (newSize) => {
// //     setPageSize(newSize);
// //     setCurrentPage(0);
// //   };

// //   const handleCreateUser = () => {
// //     if (!user?.permissions?.includes("create_user")) {
// //       toast.error("You don't have permission to create users");
// //       return;
// //     }
// //     setSelectedUser(null);
// //     setShowUserForm(true);
// //   };

// //   const handleEditUser = (userData) => {
// //     if (!user?.permissions?.includes("update_user")) {
// //       toast.error("You don't have permission to update users");
// //       return;
// //     }
// //     setSelectedUser(userData);
// //     setShowUserForm(true);
// //   };

// //   const handleDeleteUser = async (userData) => {
// //     if (!user?.permissions?.includes("delete_user")) {
// //       toast.error("You don't have permission to delete users");
// //       return;
// //     }
// //     if (
// //       window.confirm(
// //         `Are you sure you want to delete ${userData.firstName} ${userData.lastName}?`
// //       )
// //     ) {
// //       try {
// //         await userService.deleteUser(userData.userId, userData.userType);
// //         loadUsers();
// //         toast.success("User deleted successfully");
// //       } catch (error) {
// //         console.error("Error deleting user:", error);
// //         toast.error("Failed to delete user");
// //       }
// //     }
// //   };

// //   const getUserTypeColor = (userType) => {
// //     return userType === "INTERNAL"
// //       ? "bg-blue-100 text-blue-800 border-blue-200"
// //       : "bg-green-100 text-green-800 border-green-200";
// //   };

// //   const getUserTypeIcon = (userType) => {
// //     return userType === "INTERNAL" ? Users : Building;
// //   };

// //   const getRoleIcon = (roleName) => {
// //     switch (roleName) {
// //       case "Super_Admin":
// //         return Shield;
// //       case "Supervisor":
// //         return Settings;
// //       case "Technician":
// //         return Users;
// //       case "Client_Admin":
// //         return Building;
// //       case "Tenant":
// //         return Home;
// //       default:
// //         return Users;
// //     }
// //   };

// //   const filteredUsers = users.filter((userData) => {
// //     if (!searchTerm) return true;
// //     return (
// //       userData.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.username.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //   });

// //   const requiresCompanySelection = ["tenants", "client-admins"].includes(
// //     roleFilter
// //   );

// //   const getRoleDisplayName = (role) => {
// //     const roleNames = {
// //       all: "All Users",
// //       internal: "Internal Users",
// //       company: "Company Users",
// //       technicians: "Technicians",
// //       tenants: "Tenants",
// //       "client-admins": "Client Admins",
// //       "super-admins": "Super Admins",
// //       supervisors: "Supervisors",
// //     };
// //     return roleNames[role] || role;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-7xl mx-auto space-y-8">
// //         {/* Header */}
// //         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
// //           <div className="space-y-2">
// //             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
// //               <Users className="w-8 h-8 text-blue-600" />
// //               User Management
// //             </h1>
// //             <p className="text-gray-600 text-base">
// //               Manage users with role-based filtering and pagination
// //             </p>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <button
// //               onClick={handleRefresh}
// //               disabled={isRefreshing}
// //               className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
// //               title="Refresh Data"
// //             >
// //               <RefreshCw
// //                 className={`w-5 h-5 text-gray-600 ${
// //                   isRefreshing ? "animate-spin" : ""
// //                 }`}
// //               />
// //             </button>
// //             <div className="relative group">
// //               <button
// //                 onClick={handleCreateUser}
// //                 className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 ${
// //                   user?.permissions?.includes("create_user")
// //                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl"
// //                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
// //                 }`}
// //                 disabled={!user?.permissions?.includes("create_user")}
// //               >
// //                 <Plus className="w-5 h-5 mr-2" />
// //                 Add User
// //               </button>
// //               {!user?.permissions?.includes("create_user") && (
// //                 <div className="absolute top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                   You don't have permission to create users
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Stats Card */}
// //         <div className="bg-white rounded-lg border border-gray-200 p-6">
// //           <div className="flex items-center gap-4">
// //             <div className="p-3 bg-blue-100 rounded-lg">
// //               <UserCheck className="w-6 h-6 text-blue-600" />
// //             </div>
// //             <div>
// //               <p className="text-sm font-medium text-gray-600 uppercase">
// //                 {getRoleDisplayName(roleFilter)}
// //               </p>
// //               <p className="text-2xl font-semibold text-gray-900">
// //                 {totalElements.toLocaleString()}
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filters */}
// //         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
// //           <div className="space-y-6">
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <div className="flex-1">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Filter by Role
// //                 </label>
// //                 <div className="relative">
// //                   <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                   <select
// //                     value={roleFilter}
// //                     onChange={(e) => handleRoleFilterChange(e.target.value)}
// //                     className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
// //                   >
// //                     <option value="all">All Users</option>
// //                     <option value="internal">Internal Users</option>
// //                     <option value="company">Company Users</option>
// //                     <option value="technicians">Technicians</option>
// //                     <option value="tenants">Tenants</option>
// //                     <option value="client-admins">Client Admins</option>
// //                     <option value="super-admins">Super Admins</option>
// //                     <option value="supervisors">Supervisors</option>
// //                   </select>
// //                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
// //                 </div>
// //               </div>

// //               {requiresCompanySelection && (
// //                 <div className="flex-1">
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Select Company *
// //                   </label>
// //                   <div className="relative">
// //                     <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                     <select
// //                       value={selectedCompany}
// //                       onChange={(e) => handleCompanyChange(e.target.value)}
// //                       className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
// //                     >
// //                       <option value="">Select a company</option>
// //                       {companies.map((company) => (
// //                         <option
// //                           key={company.companyId}
// //                           value={company.companyId}
// //                         >
// //                           {company.companyName}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
// //                   </div>
// //                 </div>
// //               )}

// //               <div className="w-32">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Page Size
// //                 </label>
// //                 <select
// //                   value={pageSize}
// //                   onChange={(e) => handlePageSizeChange(Number(e.target.value))}
// //                   className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
// //                 >
// //                   <option value={5}>5</option>
// //                   <option value={10}>10</option>
// //                   <option value={25}>25</option>
// //                   <option value={50}>50</option>
// //                 </select>
// //               </div>
// //             </div>

// //             <div className="relative max-w-md">
// //               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Search users..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {requiresCompanySelection && !selectedCompany && (
// //           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
// //             <div className="flex items-center gap-3">
// //               <Building className="w-6 h-6 text-yellow-600" />
// //               <div>
// //                 <h3 className="text-lg font-semibold text-yellow-800">
// //                   Company Selection Required
// //                 </h3>
// //                 <p className="text-yellow-700">
// //                   Please select a company to view{" "}
// //                   {getRoleDisplayName(roleFilter).toLowerCase()}.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
// //           <div className="p-6 border-b border-gray-200">
// //             <div className="flex items-center justify-between">
// //               <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// //                 <UserCheck className="w-6 h-6 text-blue-600" />
// //                 {getRoleDisplayName(roleFilter)} ({filteredUsers.length})
// //               </h3>
// //               {totalElements > 0 && (
// //                 <p className="text-sm text-gray-500">
// //                   Showing {currentPage * pageSize + 1} to{" "}
// //                   {Math.min((currentPage + 1) * pageSize, totalElements)} of{" "}
// //                   {totalElements} users
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {loading ? (
// //             <div className="flex items-center justify-center py-16">
// //               <div className="text-center">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //                 <p className="text-gray-600">Loading users...</p>
// //               </div>
// //             </div>
// //           ) : filteredUsers.length === 0 ? (
// //             <div className="text-center py-16">
// //               <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                 No Users Found
// //               </h3>
// //               <p className="text-gray-600 mb-6">
// //                 {requiresCompanySelection && !selectedCompany
// //                   ? "Please select a company to view users"
// //                   : searchTerm
// //                   ? "No users match your search criteria"
// //                   : `No ${getRoleDisplayName(roleFilter).toLowerCase()} found`}
// //               </p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="w-full overflow-x-auto">
// //                 <table className="w-full table-auto">
// //                   <thead className="bg-gray-50">
// //                     <tr>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
// //                         User
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
// //                         Type
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
// //                         Email
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
// //                         Role
// //                       </th>
// //                       <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
// //                         Actions
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-200">
// //                     {filteredUsers.map((userData) => {
// //                       const TypeIcon = getUserTypeIcon(userData.userType);
// //                       const RoleIcon = getRoleIcon(userData.roleName);
// //                       const canEdit =
// //                         user?.permissions?.includes("update_user");
// //                       const canDelete =
// //                         user?.permissions?.includes("delete_user");

// //                       return (
// //                         <tr
// //                           key={`${userData.userType}-${userData.userId}`}
// //                           className="hover:bg-gray-50 transition-colors"
// //                         >
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-3">
// //                               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
// //                                 <span className="text-white font-semibold text-sm">
// //                                   {userData.firstName.charAt(0)}
// //                                   {userData.lastName.charAt(0)}
// //                                 </span>
// //                               </div>
// //                               <div className="truncate">
// //                                 <div className="text-sm font-medium text-gray-900">
// //                                   {userData.firstName} {userData.lastName}
// //                                 </div>
// //                                 <div className="text-sm text-gray-500">
// //                                   @{userData.username}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <span
// //                               className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
// //                                 userData.userType
// //                               )}`}
// //                             >
// //                               <TypeIcon className="w-3 h-3 mr-1" />
// //                               {userData.userType}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-2 truncate">
// //                               <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
// //                               <span className="text-sm text-gray-900">
// //                                 {userData.email}
// //                               </span>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-2 truncate">
// //                               <RoleIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
// //                               <span className="text-sm text-gray-900">
// //                                 {userData.roleName || "No Role"}
// //                               </span>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                             <div className="flex items-center justify-end gap-2">
// //                               <div className="relative group">
// //                                 <button
// //                                   onClick={() => handleEditUser(userData)}
// //                                   className={`p-2 rounded-lg transition-colors ${
// //                                     canEdit
// //                                       ? "text-blue-600 hover:bg-blue-100"
// //                                       : "text-gray-400 cursor-not-allowed"
// //                                   }`}
// //                                   title={
// //                                     canEdit
// //                                       ? "Edit User"
// //                                       : "No permission to edit"
// //                                   }
// //                                   disabled={!canEdit}
// //                                 >
// //                                   <Edit className="w-4 h-4" />
// //                                 </button>
// //                                 {!canEdit && (
// //                                   <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                                     You don't have permission to edit users
// //                                   </div>
// //                                 )}
// //                               </div>
// //                               <div className="relative group">
// //                                 <button
// //                                   onClick={() => handleDeleteUser(userData)}
// //                                   className={`p-2 rounded-lg transition-colors ${
// //                                     canDelete
// //                                       ? "text-red-600 hover:bg-red-100"
// //                                       : "text-gray-400 cursor-not-allowed"
// //                                   }`}
// //                                   title={
// //                                     canDelete
// //                                       ? "Delete User"
// //                                       : "No permission to delete"
// //                                   }
// //                                   disabled={!canDelete}
// //                                 >
// //                                   <Trash2 className="w-4 h-4" />
// //                                 </button>
// //                                 {!canDelete && (
// //                                   <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                                     You don't have permission to delete users
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {totalPages > 1 && (
// //                 <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
// //                   <div className="flex items-center justify-between">
// //                     <div className="text-sm text-gray-700">
// //                       Page {currentPage + 1} of {totalPages}
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <button
// //                         onClick={() => handlePageChange(currentPage - 1)}
// //                         disabled={currentPage === 0}
// //                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         <ChevronLeft className="w-4 h-4" />
// //                       </button>
// //                       {Array.from(
// //                         { length: Math.min(5, totalPages) },
// //                         (_, i) => {
// //                           let pageNum;
// //                           if (totalPages <= 5) {
// //                             pageNum = i;
// //                           } else if (currentPage < 3) {
// //                             pageNum = i;
// //                           } else if (currentPage > totalPages - 4) {
// //                             pageNum = totalPages - 5 + i;
// //                           } else {
// //                             pageNum = currentPage - 2 + i;
// //                           }

// //                           return (
// //                             <button
// //                               key={pageNum}
// //                               onClick={() => handlePageChange(pageNum)}
// //                               className={`px-3 py-2 border rounded-lg text-sm ${
// //                                 currentPage === pageNum
// //                                   ? "bg-blue-600 text-white border-blue-600"
// //                                   : "border-gray-300 hover:bg-gray-100"
// //                               }`}
// //                             >
// //                               {pageNum + 1}
// //                             </button>
// //                           );
// //                         }
// //                       )}
// //                       <button
// //                         onClick={() => handlePageChange(currentPage + 1)}
// //                         disabled={currentPage >= totalPages - 1}
// //                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         <ChevronRight className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>

// //         <UserForm
// //           isOpen={showUserForm}
// //           onClose={() => setShowUserForm(false)}
// //           user={selectedUser}
// //           onSuccess={() => {
// //             setShowUserForm(false);
// //             loadUsers();
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // // export default UserManagement;

// // "use client";

// // import { useState, useEffect, useContext } from "react";
// // import {
// //   Users,
// //   Plus,
// //   Search,
// //   Filter,
// //   Edit,
// //   Trash2,
// //   ChevronDown,
// //   RefreshCw,
// //   UserCheck,
// //   Building,
// //   Mail,
// //   ChevronLeft,
// //   ChevronRight,
// //   Shield,
// //   Settings,
// //   Home,
// // } from "lucide-react";
// // import { userService } from "../services/userService";
// // import { companyService } from "../services/companyService";
// // import UserForm from "../components/UserManagement/UserForm";
// // import { AuthContext } from "../context/AuthContext";
// // import toast from "react-hot-toast";

// // const UserManagement = () => {
// //   const { user } = useContext(AuthContext);
// //   const [users, setUsers] = useState([]);
// //   const [companies, setCompanies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [roleFilter, setRoleFilter] = useState("all");
// //   const [selectedCompany, setSelectedCompany] = useState("");
// //   const [showUserForm, setShowUserForm] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [pageSize, setPageSize] = useState(10);
// //   const [totalElements, setTotalElements] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);

// //   // Check if user has view_user permission
// //   if (!user?.permissions?.includes("view_user")) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">
// //             Access Denied
// //           </h2>
// //           <p className="text-gray-600 mb-6">
// //             You don't have permission to access this page.
// //           </p>
// //           <button
// //             onClick={() => window.history.back()}
// //             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   useEffect(() => {
// //     loadCompanies();
// //     loadUsers();
// //   }, []);

// //   useEffect(() => {
// //     loadUsers();
// //   }, [roleFilter, selectedCompany, currentPage, pageSize]);

// //   const loadCompanies = async () => {
// //     try {
// //       const response = await companyService.getAllCompanies();
// //       setCompanies(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading companies:", error);
// //     }
// //   };

// //   const loadUsers = async () => {
// //     try {
// //       setLoading(true);
// //       let response;
// //       switch (roleFilter) {
// //         case "internal":
// //           response = await userService.getInternalUsers(currentPage, pageSize);
// //           break;
// //         case "company":
// //           response = await userService.getCompanyUsers(currentPage, pageSize);
// //           break;
// //         case "technicians":
// //           response = await userService.getTechnicians(currentPage, pageSize);
// //           break;
// //         case "tenants":
// //           if (!selectedCompany) {
// //             setUsers([]);
// //             setTotalElements(0);
// //             setTotalPages(0);
// //             return;
// //           }
// //           response = await userService.getTenantsByCompany(
// //             selectedCompany,
// //             currentPage,
// //             pageSize
// //           );
// //           break;
// //         case "client-admins":
// //           if (!selectedCompany) {
// //             setUsers([]);
// //             setTotalElements(0);
// //             setTotalPages(0);
// //             return;
// //           }
// //           response = await userService.getClientAdminsByCompany(
// //             selectedCompany,
// //             currentPage,
// //             pageSize
// //           );
// //           break;
// //         case "super-admins":
// //           response = await userService.getSuperAdmins(currentPage, pageSize);
// //           break;
// //         case "supervisors":
// //           response = await userService.getSupervisors(currentPage, pageSize);
// //           break;
// //         default:
// //           response = await userService.getInternalUsers(currentPage, pageSize);
// //           break;
// //       }
// //       if (response.data) {
// //         setUsers(response.data.content || []);
// //         setTotalElements(response.data.totalElements || 0);
// //         setTotalPages(response.data.totalPages || 0);
// //       }
// //     } catch (error) {
// //       console.error("Error loading users:", error);
// //       setUsers([]);
// //       setTotalElements(0);
// //       setTotalPages(0);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await loadUsers();
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 1000);
// //     }
// //   };

// //   const handleRoleFilterChange = (newRole) => {
// //     setRoleFilter(newRole);
// //     setCurrentPage(0);
// //     setSelectedCompany("");
// //   };

// //   const handleCompanyChange = (companyId) => {
// //     setSelectedCompany(companyId);
// //     setCurrentPage(0);
// //   };

// //   const handlePageChange = (newPage) => {
// //     setCurrentPage(newPage);
// //   };

// //   const handlePageSizeChange = (newSize) => {
// //     setPageSize(newSize);
// //     setCurrentPage(0);
// //   };

// //   const handleCreateUser = () => {
// //     if (!user?.permissions?.includes("create_user")) {
// //       toast.error("You don't have permission to create users");
// //       return;
// //     }
// //     setSelectedUser(null);
// //     setShowUserForm(true);
// //   };

// //   const handleEditUser = (userData) => {
// //     if (!user?.permissions?.includes("update_user")) {
// //       toast.error("You don't have permission to update users");
// //       return;
// //     }
// //     setSelectedUser(userData);
// //     setShowUserForm(true);
// //   };

// //   const handleDeleteUser = async (userData) => {
// //     if (!user?.permissions?.includes("delete_user")) {
// //       toast.error("You don't have permission to delete users");
// //       return;
// //     }
// //     if (
// //       window.confirm(
// //         `Are you sure you want to delete ${userData.firstName} ${userData.lastName}?`
// //       )
// //     ) {
// //       try {
// //         await userService.deleteUser(userData.userId, userData.userType);
// //         loadUsers();
// //         toast.success("User deleted successfully");
// //       } catch (error) {
// //         console.error("Error deleting user:", error);
// //         toast.error("Failed to delete user");
// //       }
// //     }
// //   };

// //   const getUserTypeColor = (userType) => {
// //     return userType === "INTERNAL"
// //       ? "bg-blue-100 text-blue-800 border-blue-200"
// //       : "bg-green-100 text-green-800 border-green-200";
// //   };

// //   const getUserTypeIcon = (userType) => {
// //     return userType === "INTERNAL" ? Users : Building;
// //   };

// //   const getRoleIcon = (roleName) => {
// //     switch (roleName) {
// //       case "Super_Admin":
// //         return Shield;
// //       case "Supervisor":
// //         return Settings;
// //       case "Technician":
// //         return Users;
// //       case "Client_Admin":
// //         return Building;
// //       case "Tenant":
// //         return Home;
// //       default:
// //         return Users;
// //     }
// //   };

// //   const filteredUsers = users.filter((userData) => {
// //     if (!searchTerm) return true;
// //     return (
// //       userData.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.employeeCodeId?.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //   });

// //   const requiresCompanySelection = ["tenants", "client-admins"].includes(
// //     roleFilter
// //   );

// //   const getRoleDisplayName = (role) => {
// //     const roleNames = {
// //       all: "All Users",
// //       internal: "Internal Users",
// //       company: "Company Users",
// //       technicians: "Technicians",
// //       tenants: "Tenants",
// //       "client-admins": "Client Admins",
// //       "super-admins": "Super Admins",
// //       supervisors: "Supervisors",
// //     };
// //     return roleNames[role] || role;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-7xl mx-auto space-y-8">
// //         {/* Header */}
// //         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
// //           <div className="space-y-2">
// //             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
// //               <Users className="w-8 h-8 text-blue-600" />
// //               User Management
// //             </h1>
// //             <p className="text-gray-600 text-base">
// //               Manage users with role-based filtering and pagination
// //             </p>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <button
// //               onClick={handleRefresh}
// //               disabled={isRefreshing}
// //               className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
// //               title="Refresh Data"
// //             >
// //               <RefreshCw
// //                 className={`w-5 h-5 text-gray-600 ${
// //                   isRefreshing ? "animate-spin" : ""
// //                 }`}
// //               />
// //             </button>
// //             <div className="relative group">
// //               <button
// //                 onClick={handleCreateUser}
// //                 className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 ${
// //                   user?.permissions?.includes("create_user")
// //                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl"
// //                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
// //                 }`}
// //                 disabled={!user?.permissions?.includes("create_user")}
// //               >
// //                 <Plus className="w-5 h-5 mr-2" />
// //                 Add User
// //               </button>
// //               {!user?.permissions?.includes("create_user") && (
// //                 <div className="absolute top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                   You don't have permission to create users
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Stats Card */}
// //         <div className="bg-white rounded-lg border border-gray-200 p-6">
// //           <div className="flex items-center gap-4">
// //             <div className="p-3 bg-blue-100 rounded-lg">
// //               <UserCheck className="w-6 h-6 text-blue-600" />
// //             </div>
// //             <div>
// //               <p className="text-sm font-medium text-gray-600 uppercase">
// //                 {getRoleDisplayName(roleFilter)}
// //               </p>
// //               <p className="text-2xl font-semibold text-gray-900">
// //                 {totalElements.toLocaleString()}
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filters */}
// //         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
// //           <div className="space-y-6">
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <div className="flex-1">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Filter by Role
// //                 </label>
// //                 <div className="relative">
// //                   <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                   <select
// //                     value={roleFilter}
// //                     onChange={(e) => handleRoleFilterChange(e.target.value)}
// //                     className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
// //                   >
// //                     <option value="all">All Users</option>
// //                     <option value="internal">Internal Users</option>
// //                     <option value="company">Company Users</option>
// //                     <option value="technicians">Technicians</option>
// //                     <option value="tenants">Tenants</option>
// //                     <option value="client-admins">Client Admins</option>
// //                     <option value="super-admins">Super Admins</option>
// //                     <option value="supervisors">Supervisors</option>
// //                   </select>
// //                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
// //                 </div>
// //               </div>
// //               {requiresCompanySelection && (
// //                 <div className="flex-1">
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Select Company *
// //                   </label>
// //                   <div className="relative">
// //                     <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                     <select
// //                       value={selectedCompany}
// //                       onChange={(e) => handleCompanyChange(e.target.value)}
// //                       className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
// //                     >
// //                       <option value="">Select a company</option>
// //                       {companies.map((company) => (
// //                         <option
// //                           key={company.companyId}
// //                           value={company.companyId}
// //                         >
// //                           {company.companyName}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
// //                   </div>
// //                 </div>
// //               )}
// //               <div className="w-32">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Page Size
// //                 </label>
// //                 <select
// //                   value={pageSize}
// //                   onChange={(e) => handlePageSizeChange(Number(e.target.value))}
// //                   className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
// //                 >
// //                   <option value={5}>5</option>
// //                   <option value={10}>10</option>
// //                   <option value={25}>25</option>
// //                   <option value={50}>50</option>
// //                 </select>
// //               </div>
// //             </div>
// //             <div className="relative max-w-md">
// //               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Search users..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {requiresCompanySelection && !selectedCompany && (
// //           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
// //             <div className="flex items-center gap-3">
// //               <Building className="w-6 h-6 text-yellow-600" />
// //               <div>
// //                 <h3 className="text-lg font-semibold text-yellow-800">
// //                   Company Selection Required
// //                 </h3>
// //                 <p className="text-yellow-700">
// //                   Please select a company to view{" "}
// //                   {getRoleDisplayName(roleFilter).toLowerCase()}.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
// //           <div className="p-6 border-b border-gray-200">
// //             <div className="flex items-center justify-between">
// //               <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// //                 <UserCheck className="w-6 h-6 text-blue-600" />
// //                 {getRoleDisplayName(roleFilter)} ({filteredUsers.length})
// //               </h3>
// //               {totalElements > 0 && (
// //                 <p className="text-sm text-gray-500">
// //                   Showing {currentPage * pageSize + 1} to{" "}
// //                   {Math.min((currentPage + 1) * pageSize, totalElements)} of{" "}
// //                   {totalElements} users
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {loading ? (
// //             <div className="flex items-center justify-center py-16">
// //               <div className="text-center">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //                 <p className="text-gray-600">Loading users...</p>
// //               </div>
// //             </div>
// //           ) : filteredUsers.length === 0 ? (
// //             <div className="text-center py-16">
// //               <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                 No Users Found
// //               </h3>
// //               <p className="text-gray-600 mb-6">
// //                 {requiresCompanySelection && !selectedCompany
// //                   ? "Please select a company to view users"
// //                   : searchTerm
// //                   ? "No users match your search criteria"
// //                   : `No ${getRoleDisplayName(roleFilter).toLowerCase()} found`}
// //               </p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="w-full overflow-x-auto">
// //                 <table className="w-full table-auto">
// //                   <thead className="bg-gray-50">
// //                     <tr>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
// //                         User
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
// //                         Type
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
// //                         Email
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
// //                         Role
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
// //                         Employee Code
// //                       </th>
// //                       <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
// //                         Actions
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-200">
// //                     {filteredUsers.map((userData) => {
// //                       const TypeIcon = getUserTypeIcon(userData.userType);
// //                       const RoleIcon = getRoleIcon(userData.roleName);
// //                       const canEdit =
// //                         user?.permissions?.includes("update_user");
// //                       const canDelete =
// //                         user?.permissions?.includes("delete_user");
// //                       return (
// //                         <tr
// //                           key={`${userData.userType}-${userData.userId}`}
// //                           className="hover:bg-gray-50 transition-colors"
// //                         >
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-3">
// //                               {userData.profileImageUrl ? (
// //                                 <img
// //                                   src={userData.profileImageUrl}
// //                                   alt={`${userData.firstName} ${userData.lastName}`}
// //                                   className="w-10 h-10 rounded-full object-cover flex-shrink-0"
// //                                 />
// //                               ) : (
// //                                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
// //                                   <span className="text-white font-semibold text-sm">
// //                                     {userData.firstName.charAt(0)}
// //                                     {userData.lastName.charAt(0)}
// //                                   </span>
// //                                 </div>
// //                               )}
// //                               <div className="truncate">
// //                                 <div className="text-sm font-medium text-gray-900">
// //                                   {userData.firstName} {userData.lastName}
// //                                 </div>
// //                                 <div className="text-sm text-gray-500">
// //                                   @{userData.username}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <span
// //                               className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
// //                                 userData.userType
// //                               )}`}
// //                             >
// //                               <TypeIcon className="w-3 h-3 mr-1" />
// //                               {userData.userType}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-2 truncate">
// //                               <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
// //                               <span className="text-sm text-gray-900">
// //                                 {userData.email}
// //                               </span>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-2 truncate">
// //                               <RoleIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
// //                               <span className="text-sm text-gray-900">
// //                                 {userData.roleName || "No Role"}
// //                               </span>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <span className="text-sm text-gray-900">
// //                               {userData.employeeCodeId || "N/A"}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                             <div className="flex items-center justify-end gap-2">
// //                               <div className="relative group">
// //                                 <button
// //                                   onClick={() => handleEditUser(userData)}
// //                                   className={`p-2 rounded-lg transition-colors ${
// //                                     canEdit
// //                                       ? "text-blue-600 hover:bg-blue-100"
// //                                       : "text-gray-400 cursor-not-allowed"
// //                                   }`}
// //                                   title={
// //                                     canEdit
// //                                       ? "Edit User"
// //                                       : "No permission to edit"
// //                                   }
// //                                   disabled={!canEdit}
// //                                 >
// //                                   <Edit className="w-4 h-4" />
// //                                 </button>
// //                                 {!canEdit && (
// //                                   <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                                     You don't have permission to edit users
// //                                   </div>
// //                                 )}
// //                               </div>
// //                               <div className="relative group">
// //                                 <button
// //                                   onClick={() => handleDeleteUser(userData)}
// //                                   className={`p-2 rounded-lg transition-colors ${
// //                                     canDelete
// //                                       ? "text-red-600 hover:bg-red-100"
// //                                       : "text-gray-400 cursor-not-allowed"
// //                                   }`}
// //                                   title={
// //                                     canDelete
// //                                       ? "Delete User"
// //                                       : "No permission to delete"
// //                                   }
// //                                   disabled={!canDelete}
// //                                 >
// //                                   <Trash2 className="w-4 h-4" />
// //                                 </button>
// //                                 {!canDelete && (
// //                                   <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                                     You don't have permission to delete users
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //               {totalPages > 1 && (
// //                 <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
// //                   <div className="flex items-center justify-between">
// //                     <div className="text-sm text-gray-700">
// //                       Page {currentPage + 1} of {totalPages}
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <button
// //                         onClick={() => handlePageChange(currentPage - 1)}
// //                         disabled={currentPage === 0}
// //                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         <ChevronLeft className="w-4 h-4" />
// //                       </button>
// //                       {Array.from(
// //                         { length: Math.min(5, totalPages) },
// //                         (_, i) => {
// //                           let pageNum;
// //                           if (totalPages <= 5) {
// //                             pageNum = i;
// //                           } else if (currentPage < 3) {
// //                             pageNum = i;
// //                           } else if (currentPage > totalPages - 4) {
// //                             pageNum = totalPages - 5 + i;
// //                           } else {
// //                             pageNum = currentPage - 2 + i;
// //                           }
// //                           return (
// //                             <button
// //                               key={pageNum}
// //                               onClick={() => handlePageChange(pageNum)}
// //                               className={`px-3 py-2 border rounded-lg text-sm ${
// //                                 currentPage === pageNum
// //                                   ? "bg-blue-600 text-white border-blue-600"
// //                                   : "border-gray-300 hover:bg-gray-100"
// //                               }`}
// //                             >
// //                               {pageNum + 1}
// //                             </button>
// //                           );
// //                         }
// //                       )}
// //                       <button
// //                         onClick={() => handlePageChange(currentPage + 1)}
// //                         disabled={currentPage >= totalPages - 1}
// //                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         <ChevronRight className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>

// //         <UserForm
// //           isOpen={showUserForm}
// //           onClose={() => setShowUserForm(false)}
// //           user={selectedUser}
// //           onSuccess={() => {
// //             setShowUserForm(false);
// //             loadUsers();
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserManagement;

// // "use client";

// // import { useState, useEffect, useContext } from "react";
// // import {
// //   Users,
// //   Plus,
// //   Search,
// //   Filter,
// //   Edit,
// //   Trash2,
// //   ChevronDown,
// //   RefreshCw,
// //   UserCheck,
// //   Building,
// //   Mail,
// //   ChevronLeft,
// //   ChevronRight,
// //   Shield,
// //   Settings,
// //   Home,
// //   X,
// // } from "lucide-react";
// // import { userService } from "../services/userService";
// // import { companyService } from "../services/companyService";
// // import UserForm from "../components/UserManagement/UserForm";
// // import { AuthContext } from "../context/AuthContext";
// // import toast from "react-hot-toast";

// // const UserManagement = () => {
// //   const { user } = useContext(AuthContext);
// //   const [users, setUsers] = useState([]);
// //   const [companies, setCompanies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [roleFilter, setRoleFilter] = useState("all");
// //   const [selectedCompany, setSelectedCompany] = useState("");
// //   const [showUserForm, setShowUserForm] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [pageSize, setPageSize] = useState(10);
// //   const [totalElements, setTotalElements] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [showImageModal, setShowImageModal] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState("");

// //   // Check if user has view_user permission
// //   if (!user?.permissions?.includes("view_user")) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">
// //             Access Denied
// //           </h2>
// //           <p className="text-gray-600 mb-6">
// //             You don't have permission to access this page.
// //           </p>
// //           <button
// //             onClick={() => window.history.back()}
// //             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   useEffect(() => {
// //     loadCompanies();
// //     loadUsers();
// //   }, []);

// //   useEffect(() => {
// //     loadUsers();
// //   }, [roleFilter, selectedCompany, currentPage, pageSize]);

// //   const loadCompanies = async () => {
// //     try {
// //       const response = await companyService.getAllCompanies();
// //       setCompanies(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading companies:", error);
// //     }
// //   };

// //   const loadUsers = async () => {
// //     try {
// //       setLoading(true);
// //       let response;
// //       switch (roleFilter) {
// //         case "internal":
// //           response = await userService.getInternalUsers(currentPage, pageSize);
// //           break;
// //         case "company":
// //           response = await userService.getCompanyUsers(currentPage, pageSize);
// //           break;
// //         case "technicians":
// //           response = await userService.getTechnicians(currentPage, pageSize);
// //           break;
// //         case "tenants":
// //           if (!selectedCompany) {
// //             setUsers([]);
// //             setTotalElements(0);
// //             setTotalPages(0);
// //             return;
// //           }
// //           response = await userService.getTenantsByCompany(
// //             selectedCompany,
// //             currentPage,
// //             pageSize
// //           );
// //           break;
// //         case "client-admins":
// //           if (!selectedCompany) {
// //             setUsers([]);
// //             setTotalElements(0);
// //             setTotalPages(0);
// //             return;
// //           }
// //           response = await userService.getClientAdminsByCompany(
// //             selectedCompany,
// //             currentPage,
// //             pageSize
// //           );
// //           break;
// //         case "super-admins":
// //           response = await userService.getSuperAdmins(currentPage, pageSize);
// //           break;
// //         case "supervisors":
// //           response = await userService.getSupervisors(currentPage, pageSize);
// //           break;
// //         default:
// //           response = await userService.getInternalUsers(currentPage, pageSize);
// //           break;
// //       }
// //       if (response.data) {
// //         setUsers(response.data.content || []);
// //         setTotalElements(response.data.totalElements || 0);
// //         setTotalPages(response.data.totalPages || 0);
// //       }
// //     } catch (error) {
// //       console.error("Error loading users:", error);
// //       setUsers([]);
// //       setTotalElements(0);
// //       setTotalPages(0);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     try {
// //       await loadUsers();
// //     } finally {
// //       setTimeout(() => setIsRefreshing(false), 1000);
// //     }
// //   };

// //   const handleRoleFilterChange = (newRole) => {
// //     setRoleFilter(newRole);
// //     setCurrentPage(0);
// //     setSelectedCompany("");
// //   };

// //   const handleCompanyChange = (companyId) => {
// //     setSelectedCompany(companyId);
// //     setCurrentPage(0);
// //   };

// //   const handlePageChange = (newPage) => {
// //     setCurrentPage(newPage);
// //   };

// //   const handlePageSizeChange = (newSize) => {
// //     setPageSize(newSize);
// //     setCurrentPage(0);
// //   };

// //   const handleCreateUser = () => {
// //     if (!user?.permissions?.includes("create_user")) {
// //       toast.error("You don't have permission to create users");
// //       return;
// //     }
// //     setSelectedUser(null);
// //     setShowUserForm(true);
// //   };

// //   const handleEditUser = (userData) => {
// //     if (!user?.permissions?.includes("update_user")) {
// //       toast.error("You don't have permission to update users");
// //       return;
// //     }
// //     setSelectedUser(userData);
// //     setShowUserForm(true);
// //   };

// //   const handleDeleteUser = async (userData) => {
// //     if (!user?.permissions?.includes("delete_user")) {
// //       toast.error("You don't have permission to delete users");
// //       return;
// //     }
// //     if (
// //       window.confirm(
// //         `Are you sure you want to delete ${userData.firstName} ${userData.lastName}?`
// //       )
// //     ) {
// //       try {
// //         await userService.deleteUser(userData.userId, userData.userType);
// //         loadUsers();
// //         toast.success("User deleted successfully");
// //       } catch (error) {
// //         console.error("Error deleting user:", error);
// //         toast.error("Failed to delete user");
// //       }
// //     }
// //   };

// //   const handleImageClick = (imageUrl) => {
// //     if (imageUrl) {
// //       setSelectedImage(imageUrl);
// //       setShowImageModal(true);
// //     }
// //   };

// //   const getUserTypeColor = (userType) => {
// //     return userType === "INTERNAL"
// //       ? "bg-blue-100 text-blue-800 border-blue-200"
// //       : "bg-green-100 text-green-800 border-green-200";
// //   };

// //   const getUserTypeIcon = (userType) => {
// //     return userType === "INTERNAL" ? Users : Building;
// //   };

// //   const getRoleIcon = (roleName) => {
// //     switch (roleName) {
// //       case "Super_Admin":
// //         return Shield;
// //       case "Supervisor":
// //         return Settings;
// //       case "Technician":
// //         return Users;
// //       case "Client_Admin":
// //         return Building;
// //       case "Tenant":
// //         return Home;
// //       default:
// //         return Users;
// //     }
// //   };

// //   const filteredUsers = users.filter((userData) => {
// //     if (!searchTerm) return true;
// //     return (
// //       userData.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       userData.employeeCodeId?.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //   });

// //   const requiresCompanySelection = ["tenants", "client-admins"].includes(
// //     roleFilter
// //   );

// //   const getRoleDisplayName = (role) => {
// //     const roleNames = {
// //       all: "All Users",
// //       internal: "Internal Users",
// //       company: "Company Users",
// //       technicians: "Technicians",
// //       tenants: "Tenants",
// //       "client-admins": "Client Admins",
// //       "super-admins": "Super Admins",
// //       supervisors: "Supervisors",
// //     };
// //     return roleNames[role] || role;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-7xl mx-auto space-y-8">
// //         {/* Header */}
// //         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
// //           <div className="space-y-2">
// //             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
// //               <Users className="w-8 h-8 text-blue-600" />
// //               User Management
// //             </h1>
// //             <p className="text-gray-600 text-base">
// //               Manage users with role-based filtering and pagination
// //             </p>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             <button
// //               onClick={handleRefresh}
// //               disabled={isRefreshing}
// //               className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
// //               title="Refresh Data"
// //             >
// //               <RefreshCw
// //                 className={`w-5 h-5 text-gray-600 ${
// //                   isRefreshing ? "animate-spin" : ""
// //                 }`}
// //               />
// //             </button>
// //             <div className="relative group">
// //               <button
// //                 onClick={handleCreateUser}
// //                 className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 ${
// //                   user?.permissions?.includes("create_user")
// //                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl"
// //                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
// //                 }`}
// //                 disabled={!user?.permissions?.includes("create_user")}
// //               >
// //                 <Plus className="w-5 h-5 mr-2" />
// //                 Add User
// //               </button>
// //               {!user?.permissions?.includes("create_user") && (
// //                 <div className="absolute top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                   You don't have permission to create users
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Stats Card */}
// //         <div className="bg-white rounded-lg border border-gray-200 p-6">
// //           <div className="flex items-center gap-4">
// //             <div className="p-3 bg-blue-100 rounded-lg">
// //               <UserCheck className="w-6 h-6 text-blue-600" />
// //             </div>
// //             <div>
// //               <p className="text-sm font-medium text-gray-600 uppercase">
// //                 {getRoleDisplayName(roleFilter)}
// //               </p>
// //               <p className="text-2xl font-semibold text-gray-900">
// //                 {totalElements.toLocaleString()}
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filters */}
// //         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
// //           <div className="space-y-6">
// //             <div className="flex flex-col sm:flex-row gap-4">
// //               <div className="flex-1">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Filter by Role
// //                 </label>
// //                 <div className="relative">
// //                   <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                   <select
// //                     value={roleFilter}
// //                     onChange={(e) => handleRoleFilterChange(e.target.value)}
// //                     className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
// //                   >
// //                     <option value="all">All Users</option>
// //                     <option value="internal">Internal Users</option>
// //                     <option value="company">Company Users</option>
// //                     <option value="technicians">Technicians</option>
// //                     <option value="tenants">Tenants</option>
// //                     <option value="client-admins">Client Admins</option>
// //                     <option value="super-admins">Super Admins</option>
// //                     <option value="supervisors">Supervisors</option>
// //                   </select>
// //                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
// //                 </div>
// //               </div>
// //               {requiresCompanySelection && (
// //                 <div className="flex-1">
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">
// //                     Select Company *
// //                   </label>
// //                   <div className="relative">
// //                     <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                     <select
// //                       value={selectedCompany}
// //                       onChange={(e) => handleCompanyChange(e.target.value)}
// //                       className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
// //                     >
// //                       <option value="">Select a company</option>
// //                       {companies.map((company) => (
// //                         <option
// //                           key={company.companyId}
// //                           value={company.companyId}
// //                         >
// //                           {company.companyName}
// //                         </option>
// //                       ))}
// //                     </select>
// //                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
// //                   </div>
// //                 </div>
// //               )}
// //               <div className="w-32">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Page Size
// //                 </label>
// //                 <select
// //                   value={pageSize}
// //                   onChange={(e) => handlePageSizeChange(Number(e.target.value))}
// //                   className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
// //                 >
// //                   <option value={5}>5</option>
// //                   <option value={10}>10</option>
// //                   <option value={25}>25</option>
// //                   <option value={50}>50</option>
// //                 </select>
// //               </div>
// //             </div>
// //             <div className="relative max-w-md">
// //               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //               <input
// //                 type="text"
// //                 placeholder="Search users..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {requiresCompanySelection && !selectedCompany && (
// //           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
// //             <div className="flex items-center gap-3">
// //               <Building className="w-6 h-6 text-yellow-600" />
// //               <div>
// //                 <h3 className="text-lg font-semibold text-yellow-800">
// //                   Company Selection Required
// //                 </h3>
// //                 <p className="text-yellow-700">
// //                   Please select a company to view{" "}
// //                   {getRoleDisplayName(roleFilter).toLowerCase()}.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
// //           <div className="p-6 border-b border-gray-200">
// //             <div className="flex items-center justify-between">
// //               <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
// //                 <UserCheck className="w-6 h-6 text-blue-600" />
// //                 {getRoleDisplayName(roleFilter)} ({filteredUsers.length})
// //               </h3>
// //               {totalElements > 0 && (
// //                 <p className="text-sm text-gray-500">
// //                   Showing {currentPage * pageSize + 1} to{" "}
// //                   {Math.min((currentPage + 1) * pageSize, totalElements)} of{" "}
// //                   {totalElements} users
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {loading ? (
// //             <div className="flex items-center justify-center py-16">
// //               <div className="text-center">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
// //                 <p className="text-gray-600">Loading users...</p>
// //               </div>
// //             </div>
// //           ) : filteredUsers.length === 0 ? (
// //             <div className="text-center py-16">
// //               <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                 No Users Found
// //               </h3>
// //               <p className="text-gray-600 mb-6">
// //                 {requiresCompanySelection && !selectedCompany
// //                   ? "Please select a company to view users"
// //                   : searchTerm
// //                   ? "No users match your search criteria"
// //                   : `No ${getRoleDisplayName(roleFilter).toLowerCase()} found`}
// //               </p>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="w-full overflow-x-auto">
// //                 <table className="w-full table-auto">
// //                   <thead className="bg-gray-50">
// //                     <tr>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
// //                         User
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
// //                         Type
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
// //                         Email
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
// //                         Role
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
// //                         Employee Code
// //                       </th>
// //                       <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
// //                         Actions
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-200">
// //                     {filteredUsers.map((userData) => {
// //                       const TypeIcon = getUserTypeIcon(userData.userType);
// //                       const RoleIcon = getRoleIcon(userData.roleName);
// //                       const canEdit =
// //                         user?.permissions?.includes("update_user");
// //                       const canDelete =
// //                         user?.permissions?.includes("delete_user");
// //                       return (
// //                         <tr
// //                           key={`${userData.userType}-${userData.userId}`}
// //                           className="hover:bg-gray-50 transition-colors"
// //                         >
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-3">
// //                               {userData.profileImageUrl ? (
// //                                 <button
// //                                   onClick={() =>
// //                                     handleImageClick(userData.profileImageUrl)
// //                                   }
// //                                 >
// //                                   <img
// //                                     src={userData.profileImageUrl}
// //                                     alt={`${userData.firstName} ${userData.lastName}`}
// //                                     className="w-10 h-10 rounded-full object-cover flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
// //                                   />
// //                                 </button>
// //                               ) : (
// //                                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
// //                                   <span className="text-white font-semibold text-sm">
// //                                     {userData.firstName.charAt(0)}
// //                                     {userData.lastName.charAt(0)}
// //                                   </span>
// //                                 </div>
// //                               )}
// //                               <div className="truncate">
// //                                 <div className="text-sm font-medium text-gray-900">
// //                                   {userData.firstName} {userData.lastName}
// //                                 </div>
// //                                 <div className="text-sm text-gray-500">
// //                                   @{userData.username}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <span
// //                               className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
// //                                 userData.userType
// //                               )}`}
// //                             >
// //                               <TypeIcon className="w-3 h-3 mr-1" />
// //                               {userData.userType}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-2 truncate">
// //                               <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
// //                               <span className="text-sm text-gray-900">
// //                                 {userData.email}
// //                               </span>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <div className="flex items-center gap-2 truncate">
// //                               <RoleIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
// //                               <span className="text-sm text-gray-900">
// //                                 {userData.roleName || "No Role"}
// //                               </span>
// //                             </div>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <span className="text-sm text-gray-900">
// //                               {userData.employeeCodeId || "N/A"}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                             <div className="flex items-center justify-end gap-2">
// //                               <div className="relative group">
// //                                 <button
// //                                   onClick={() => handleEditUser(userData)}
// //                                   className={`p-2 rounded-lg transition-colors ${
// //                                     canEdit
// //                                       ? "text-blue-600 hover:bg-blue-100"
// //                                       : "text-gray-400 cursor-not-allowed"
// //                                   }`}
// //                                   title={
// //                                     canEdit
// //                                       ? "Edit User"
// //                                       : "No permission to edit"
// //                                   }
// //                                   disabled={!canEdit}
// //                                 >
// //                                   <Edit className="w-4 h-4" />
// //                                 </button>
// //                                 {!canEdit && (
// //                                   <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                                     You don't have permission to edit users
// //                                   </div>
// //                                 )}
// //                               </div>
// //                               <div className="relative group">
// //                                 <button
// //                                   onClick={() => handleDeleteUser(userData)}
// //                                   className={`p-2 rounded-lg transition-colors ${
// //                                     canDelete
// //                                       ? "text-red-600 hover:bg-red-100"
// //                                       : "text-gray-400 cursor-not-allowed"
// //                                   }`}
// //                                   title={
// //                                     canDelete
// //                                       ? "Delete User"
// //                                       : "No permission to delete"
// //                                   }
// //                                   disabled={!canDelete}
// //                                 >
// //                                   <Trash2 className="w-4 h-4" />
// //                                 </button>
// //                                 {!canDelete && (
// //                                   <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
// //                                     You don't have permission to delete users
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>
// //               {totalPages > 1 && (
// //                 <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
// //                   <div className="flex items-center justify-between">
// //                     <div className="text-sm text-gray-700">
// //                       Page {currentPage + 1} of {totalPages}
// //                     </div>
// //                     <div className="flex items-center gap-2">
// //                       <button
// //                         onClick={() => handlePageChange(currentPage - 1)}
// //                         disabled={currentPage === 0}
// //                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         <ChevronLeft className="w-4 h-4" />
// //                       </button>
// //                       {Array.from(
// //                         { length: Math.min(5, totalPages) },
// //                         (_, i) => {
// //                           let pageNum;
// //                           if (totalPages <= 5) {
// //                             pageNum = i;
// //                           } else if (currentPage < 3) {
// //                             pageNum = i;
// //                           } else if (currentPage > totalPages - 4) {
// //                             pageNum = totalPages - 5 + i;
// //                           } else {
// //                             pageNum = currentPage - 2 + i;
// //                           }
// //                           return (
// //                             <button
// //                               key={pageNum}
// //                               onClick={() => handlePageChange(pageNum)}
// //                               className={`px-3 py-2 border rounded-lg text-sm ${
// //                                 currentPage === pageNum
// //                                   ? "bg-blue-600 text-white border-blue-600"
// //                                   : "border-gray-300 hover:bg-gray-100"
// //                               }`}
// //                             >
// //                               {pageNum + 1}
// //                             </button>
// //                           );
// //                         }
// //                       )}
// //                       <button
// //                         onClick={() => handlePageChange(currentPage + 1)}
// //                         disabled={currentPage >= totalPages - 1}
// //                         className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
// //                       >
// //                         <ChevronRight className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </div>

// //         <UserForm
// //           isOpen={showUserForm}
// //           onClose={() => setShowUserForm(false)}
// //           user={selectedUser}
// //           onSuccess={() => {
// //             setShowUserForm(false);
// //             loadUsers();
// //           }}
// //         />

// //         {showImageModal && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
// //             onClick={() => setShowImageModal(false)}
// //           >
// //             <div className="relative bg-white rounded-xl shadow-xl p-4">
// //               <button
// //                 onClick={() => setShowImageModal(false)}
// //                 className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-600 hover:text-gray-900"
// //               >
// //                 <X className="w-6 h-6" />
// //               </button>
// //               <img
// //                 src={selectedImage}
// //                 alt="Enlarged Profile"
// //                 className="max-w-[80vw] max-h-[80vh] object-contain"
// //               />
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserManagement;
// "use client";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Users,
//   Plus,
//   ArrowLeft,
//   RefreshCw,
//   Filter,
//   Settings,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUp,
//   ArrowDown,
//   Mail,
//   Shield,
//   Home,
//   Building,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import { userService } from "../services/userService";
// import { companyService } from "../services/companyService";
// import UserForm from "../components/UserManagement/UserForm";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const UserManagement = ({ onBack }) => {
//   const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [filters, setFilters] = useState({
//     employeeCodeId: "",
//     roleName: "",
//     userType: "",
//     companyId: "",
//     email: "",
//     username: "",
//   });
//   const [activeFilters, setActiveFilters] = useState({});
//   const [showColumnChooser, setShowColumnChooser] = useState(false);
//   const [visibleColumns, setVisibleColumns] = useState({
//     profileImage: true,
//     fullName: true,
//     username: true,
//     email: true,
//     roleName: true,
//     employeeCodeId: true,
//     userType: true,
//   });

//   const navigate = useNavigate();

//   const columnDefinitions = [
//     { key: "profileImage", label: "Profile Image", required: false },
//     { key: "fullName", label: "Full Name", required: true },
//     { key: "username", label: "Username", required: true },
//     { key: "email", label: "Email", required: true },
//     { key: "roleName", label: "Role", required: true },
//     { key: "employeeCodeId", label: "Employee Code", required: false },
//     { key: "userType", label: "User Type", required: true },
//   ];

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const applyFilters = () => {
//     const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
//       if (value && value.trim() !== "") {
//         acc[key] = value;
//       }
//       return acc;
//     }, {});
//     setActiveFilters(cleanFilters);
//     setCurrentPage(0);
//     setShowFilters(false);
//   };

//   const clearFilters = () => {
//     setFilters({
//       employeeCodeId: "",
//       roleName: "",
//       userType: "",
//       companyId: "",
//       email: "",
//       username: "",
//     });
//     setActiveFilters({});
//     setCurrentPage(0);
//     setShowFilters(false);
//   };

//   const toggleColumnVisibility = (columnKey) => {
//     if (columnDefinitions.find((col) => col.key === columnKey)?.required)
//       return;
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [columnKey]: !prev[columnKey],
//     }));
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const toggleSortOrder = () => {
//     setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
//     setCurrentPage(0);
//   };

//   useEffect(() => {
//     loadCompanies();
//   }, []);

//   useEffect(() => {
//     loadUsers();
//   }, [currentPage, pageSize, activeFilters, sortOrder]);

//   const loadCompanies = async () => {
//     try {
//       const response = await companyService.getAllCompanies();
//       setCompanies(response.data || []);
//     } catch (error) {
//       console.error("Error loading companies:", error);
//       toast.error("Failed to load companies");
//     }
//   };

//   const loadUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await userService.getFilteredUsers(
//         activeFilters,
//         currentPage,
//         pageSize,
//         sortOrder
//       );
//       setUsers(response.data.content || []);
//       setTotalElements(response.data.totalElements || 0);
//       setTotalPages(response.data.totalPages || 0);
//     } catch (error) {
//       console.error("Error loading users:", error);
//       toast.error("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     try {
//       await loadUsers();
//       toast.success("Users refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleCreateUser = () => {
//     if (!user?.permissions?.includes("create_user")) {
//       toast.error("You don't have permission to create users");
//       return;
//     }
//     setSelectedUser(null);
//     setShowUserForm(true);
//   };

//   const handleEditUser = (userData) => {
//     if (!user?.permissions?.includes("update_user")) {
//       toast.error("You don't have permission to update users");
//       return;
//     }
//     setSelectedUser(userData);
//     setShowUserForm(true);
//   };

//   const handleDeleteUser = async (userData) => {
//     if (!user?.permissions?.includes("delete_user")) {
//       toast.error("You don't have permission to delete users");
//       return;
//     }
//     if (
//       window.confirm(
//         `Are you sure you want to delete ${userData.firstName} ${userData.lastName}?`
//       )
//     ) {
//       try {
//         await userService.deleteUser(userData.userId, userData.userType);
//         loadUsers();
//         toast.success("User deleted successfully");
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         toast.error("Failed to delete user");
//       }
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     if (imageUrl) {
//       setSelectedImage(imageUrl);
//       setShowImageModal(true);
//     }
//   };

//   const getUserTypeBadge = (userType) => {
//     const typeConfig = {
//       INTERNAL: {
//         bg: "bg-blue-50",
//         text: "text-blue-700",
//         border: "border-blue-200",
//         label: "Internal",
//       },
//       COMPANY: {
//         bg: "bg-green-50",
//         text: "text-green-700",
//         border: "border-green-200",
//         label: "Company",
//       },
//     };
//     const config = typeConfig[userType] || {
//       bg: "bg-slate-50",
//       text: "text-slate-700",
//       border: "border-slate-200",
//       label: userType || "N/A",
//     };
//     return (
//       <span
//         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
//       >
//         {config.label}
//       </span>
//     );
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

//   if (!user?.permissions?.includes("view_user")) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Access Denied
//           </h2>
//           <p className="text-gray-600 mb-6">
//             You don't have permission to access this page.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-[1600px] mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
//           <div className="flex justify-between items-start">
//             <div className="flex items-start space-x-4">
//               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
//                   User Management
//                 </h1>
//                 <p className="text-slate-600 text-sm">
//                   View and manage all users in the system
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={onBack}
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back
//               </button>
//               <button
//                 onClick={handleCreateUser}
//                 className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
//                   user?.permissions?.includes("create_user")
//                     ? "text-white bg-slate-800 border border-transparent hover:bg-slate-900"
//                     : "text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed"
//                 }`}
//                 disabled={!user?.permissions?.includes("create_user")}
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add User
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Filters, Column Chooser, and Sort */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
//           <div className="flex flex-col gap-4">
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
//                   Object.keys(activeFilters).length > 0
//                     ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//                     : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
//                 }`}
//               >
//                 <Filter className="w-4 h-4 mr-2 inline" />
//                 Filters{" "}
//                 {Object.keys(activeFilters).length > 0 &&
//                   `(${Object.keys(activeFilters).length})`}
//               </button>
//               <button
//                 onClick={() => setShowColumnChooser(!showColumnChooser)}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <Settings className="w-4 h-4 mr-2 inline" />
//                 Columns
//               </button>
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//               >
//                 <RefreshCw
//                   className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
//                 />
//               </button>
//               <button
//                 onClick={toggleSortOrder}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 {sortOrder === "desc" ? (
//                   <>
//                     <ArrowDown className="w-4 h-4 mr-2 inline" />
//                     Latest First
//                   </>
//                 ) : (
//                   <>
//                     <ArrowUp className="w-4 h-4 mr-2 inline" />
//                     Oldest First
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Filter Panel */}
//             {showFilters && (
//               <div className="border-t border-slate-200 pt-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Employee Code
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.employeeCodeId}
//                       onChange={(e) =>
//                         handleFilterChange("employeeCodeId", e.target.value)
//                       }
//                       placeholder="Enter Employee Code (e.g., SPA-1234)"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Role
//                     </label>
//                     <select
//                       value={filters.roleName}
//                       onChange={(e) =>
//                         handleFilterChange("roleName", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">All Roles</option>
//                       <option value="Super_Admin">Super Admin</option>
//                       <option value="Supervisor">Supervisor</option>
//                       <option value="Technician">Technician</option>
//                       <option value="Client_Admin">Client Admin</option>
//                       <option value="Tenant">Tenant</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       User Type
//                     </label>
//                     <select
//                       value={filters.userType}
//                       onChange={(e) =>
//                         handleFilterChange("userType", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">All Types</option>
//                       <option value="INTERNAL">Internal</option>
//                       <option value="COMPANY">Company</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Company
//                     </label>
//                     <select
//                       value={filters.companyId}
//                       onChange={(e) =>
//                         handleFilterChange("companyId", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">All Companies</option>
//                       {companies.map((company) => (
//                         <option
//                           key={company.companyId}
//                           value={company.companyId}
//                         >
//                           {company.companyName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={filters.email}
//                       onChange={(e) =>
//                         handleFilterChange("email", e.target.value)
//                       }
//                       placeholder="Enter Email"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.username}
//                       onChange={(e) =>
//                         handleFilterChange("username", e.target.value)
//                       }
//                       placeholder="Enter Username"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={applyFilters}
//                     className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Apply Filters
//                   </button>
//                   <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Column Chooser */}
//             {showColumnChooser && (
//               <div className="border-t border-slate-200 pt-4">
//                 <h3 className="text-sm font-medium text-slate-700 mb-3">
//                   Choose Columns to Display
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                   {columnDefinitions.map((column) => (
//                     <label
//                       key={column.key}
//                       className="flex items-center space-x-2"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={visibleColumns[column.key]}
//                         onChange={() => toggleColumnVisibility(column.key)}
//                         disabled={column.required}
//                         className="rounded border-slate-300 text-slate-600 focus:ring-slate-500 disabled:opacity-50"
//                       />
//                       <span
//                         className={`text-sm ${
//                           column.required ? "text-slate-500" : "text-slate-700"
//                         }`}
//                       >
//                         {column.label}
//                         {column.required && (
//                           <span className="text-xs ml-1">(Required)</span>
//                         )}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {visibleColumns.profileImage && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Profile Image
//                     </th>
//                   )}
//                   {visibleColumns.fullName && (
//                     <th
//                       className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
//                       onClick={toggleSortOrder}
//                     >
//                       <div className="flex items-center">
//                         Full Name
//                         {sortOrder === "desc" ? (
//                           <ArrowDown className="w-4 h-4 ml-1" />
//                         ) : (
//                           <ArrowUp className="w-4 h-4 ml-1" />
//                         )}
//                       </div>
//                     </th>
//                   )}
//                   {visibleColumns.username && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Username
//                     </th>
//                   )}
//                   {visibleColumns.email && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Email
//                     </th>
//                   )}
//                   {visibleColumns.roleName && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Role
//                     </th>
//                   )}
//                   {visibleColumns.employeeCodeId && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Employee Code
//                     </th>
//                   )}
//                   {visibleColumns.userType && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       User Type
//                     </th>
//                   )}
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={columnDefinitions.length + 1}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
//                         <span className="ml-3 text-sm font-medium text-slate-600">
//                           Loading users...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : users.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={columnDefinitions.length + 1}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="text-slate-500">
//                         <Users className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                         <p className="text-sm font-medium">No users found</p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           {Object.keys(activeFilters).length > 0
//                             ? "Try adjusting your filters"
//                             : "No users have been created yet"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   users.map((userData) => {
//                     const RoleIcon = getRoleIcon(userData.roleName);
//                     const canEdit = user?.permissions?.includes("update_user");
//                     const canDelete =
//                       user?.permissions?.includes("delete_user");
//                     return (
//                       <tr
//                         key={`${userData.userType}-${userData.userId}`}
//                         className="hover:bg-slate-50 transition-colors"
//                       >
//                         {visibleColumns.profileImage && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             {userData.profileImageUrl ? (
//                               <button
//                                 onClick={() =>
//                                   handleImageClick(userData.profileImageUrl)
//                                 }
//                               >
//                                 <img
//                                   src={userData.profileImageUrl}
//                                   alt={`${userData.firstName} ${userData.lastName}`}
//                                   className="w-8 h-8 rounded-full object-cover cursor-pointer hover:shadow-md transition-shadow"
//                                 />
//                               </button>
//                             ) : (
//                               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                                 <span className="text-white font-semibold text-xs">
//                                   {userData.firstName.charAt(0)}
//                                   {userData.lastName.charAt(0)}
//                                 </span>
//                               </div>
//                             )}
//                           </td>
//                         )}
//                         {visibleColumns.fullName && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-slate-900">
//                               {userData.firstName} {userData.lastName}
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.username && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-slate-600">
//                               @{userData.username}
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.email && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <Mail className="w-4 h-4 text-slate-400" />
//                               <span className="text-sm text-slate-600">
//                                 {userData.email}
//                               </span>
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.roleName && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <RoleIcon className="w-4 h-4 text-slate-400" />
//                               <span className="text-sm text-slate-600">
//                                 {userData.roleName || "N/A"}
//                               </span>
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.employeeCodeId && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-slate-600">
//                               {userData.employeeCodeId || "N/A"}
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.userType && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             {getUserTypeBadge(userData.userType)}
//                           </td>
//                         )}
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => handleEditUser(userData)}
//                               className={`p-2 rounded-md ${
//                                 canEdit
//                                   ? "text-blue-600 hover:bg-blue-50"
//                                   : "text-slate-400 cursor-not-allowed"
//                               }`}
//                               disabled={!canEdit}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteUser(userData)}
//                               className={`p-2 rounded-md ${
//                                 canDelete
//                                   ? "text-red-600 hover:bg-red-50"
//                                   : "text-slate-400 cursor-not-allowed"
//                               }`}
//                               disabled={!canDelete}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {!loading && users.length > 0 && (
//             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-xs text-slate-600">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {currentPage * pageSize + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min((currentPage + 1) * pageSize, totalElements)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalElements}</span>{" "}
//                     users
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-600">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                       <option value={100}>100</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeft className="w-3 h-3" />
//                     Previous
//                   </button>
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i;
//                       } else if (currentPage < 3) {
//                         pageNum = i;
//                       } else if (currentPage > totalPages - 4) {
//                         pageNum = totalPages - 5 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
//                             currentPage === pageNum
//                               ? "bg-slate-800 text-white"
//                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
//                           }`}
//                         >
//                           {pageNum + 1}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <UserForm
//           isOpen={showUserForm}
//           onClose={() => setShowUserForm(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowUserForm(false);
//             loadUsers();
//           }}
//         />

//         {showImageModal && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//             onClick={() => setShowImageModal(false)}
//           >
//             <div className="relative bg-white rounded-xl shadow-xl p-4">
//               <button
//                 onClick={() => setShowImageModal(false)}
//                 className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-600 hover:text-gray-900"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//               <img
//                 src={selectedImage}
//                 alt="Enlarged Profile"
//                 className="max-w-[80vw] max-h-[80vh] object-contain"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

// "use client";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Users,
//   Plus,
//   ArrowLeft,
//   RefreshCw,
//   Filter,
//   Settings,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUp,
//   ArrowDown,
//   Mail,
//   Shield,
//   Home,
//   Building,
//   Edit,
//   Trash2,
// } from "lucide-react";
// import { userService } from "../services/userService";
// import { companyService } from "../services/companyService";
// import UserForm from "../components/UserManagement/UserForm";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const UserManagement = ({ onBack }) => {
//   const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [sortField] = useState("firstName"); // Fixed to sort by firstName
//   const [filters, setFilters] = useState({
//     employeeCodeId: "",
//     roleName: "",
//     userType: "",
//     companyId: "",
//     email: "",
//     username: "",
//   });
//   const [activeFilters, setActiveFilters] = useState({});
//   const [showColumnChooser, setShowColumnChooser] = useState(false);
//   const [visibleColumns, setVisibleColumns] = useState({
//     profileImage: true,
//     fullName: true,
//     username: true,
//     email: true,
//     roleName: true,
//     employeeCodeId: true,
//     userType: true,
//   });
//   const navigate = useNavigate();
//   const columnDefinitions = [
//     { key: "profileImage", label: "Profile Image", required: false },
//     { key: "fullName", label: "Full Name", required: true },
//     { key: "username", label: "Username", required: true },
//     { key: "email", label: "Email", required: true },
//     { key: "roleName", label: "Role", required: true },
//     { key: "employeeCodeId", label: "Employee Code", required: false },
//     { key: "userType", label: "User Type", required: true },
//   ];

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const applyFilters = () => {
//     const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
//       if (value && value.trim() !== "") {
//         acc[key] = value;
//       }
//       return acc;
//     }, {});
//     setActiveFilters(cleanFilters);
//     setCurrentPage(0);
//     setShowFilters(false);
//   };

//   const clearFilters = () => {
//     setFilters({
//       employeeCodeId: "",
//       roleName: "",
//       userType: "",
//       companyId: "",
//       email: "",
//       username: "",
//     });
//     setActiveFilters({});
//     setCurrentPage(0);
//     setShowFilters(false);
//   };

//   const toggleColumnVisibility = (columnKey) => {
//     if (columnDefinitions.find((col) => col.key === columnKey)?.required)
//       return;
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [columnKey]: !prev[columnKey],
//     }));
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (newSize) => {
//     setPageSize(newSize);
//     setCurrentPage(0);
//   };

//   const toggleSortOrder = () => {
//     setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
//     setCurrentPage(0);
//   };

//   useEffect(() => {
//     loadCompanies();
//   }, []);

//   useEffect(() => {
//     loadUsers();
//   }, [currentPage, pageSize, activeFilters, sortOrder]);

//   const loadCompanies = async () => {
//     try {
//       const response = await companyService.getAllCompanies();
//       setCompanies(response.data || []);
//     } catch (error) {
//       console.error("Error loading companies:", error);
//       toast.error("Failed to load companies");
//     }
//   };

//   const loadUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await userService.getFilteredUsers(
//         activeFilters,
//         currentPage,
//         pageSize,
//         sortOrder,
//         sortField
//       );
//       setUsers(response.data.content || []);
//       setTotalElements(response.data.totalElements || 0);
//       setTotalPages(response.data.totalPages || 0);
//     } catch (error) {
//       console.error("Error loading users:", error);
//       toast.error("Failed to load users");
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
//       toast.success("Users refreshed successfully");
//     } finally {
//       setTimeout(() => setIsRefreshing(false), 500);
//     }
//   };

//   const handleCreateUser = () => {
//     if (!user?.permissions?.includes("create_user")) {
//       toast.error("You don't have permission to create users");
//       return;
//     }
//     setSelectedUser(null);
//     setShowUserForm(true);
//   };

//   const handleEditUser = (userData) => {
//     if (!user?.permissions?.includes("update_user")) {
//       toast.error("You don't have permission to update users");
//       return;
//     }
//     setSelectedUser(userData);
//     setShowUserForm(true);
//   };

//   const handleDeleteUser = async (userData) => {
//     if (!user?.permissions?.includes("delete_user")) {
//       toast.error("You don't have permission to delete users");
//       return;
//     }
//     if (
//       window.confirm(
//         `Are you sure you want to delete ${userData.firstName} ${userData.lastName}?`
//       )
//     ) {
//       try {
//         await userService.deleteUser(userData.userId, userData.userType);
//         loadUsers();
//         toast.success("User deleted successfully");
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         toast.error("Failed to delete user");
//       }
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     if (imageUrl) {
//       setSelectedImage(imageUrl);
//       setShowImageModal(true);
//     }
//   };

//   const getUserTypeBadge = (userType) => {
//     const typeConfig = {
//       INTERNAL: {
//         bg: "bg-blue-50",
//         text: "text-blue-700",
//         border: "border-blue-200",
//         label: "Internal",
//       },
//       COMPANY: {
//         bg: "bg-green-50",
//         text: "text-green-700",
//         border: "border-green-200",
//         label: "Company",
//       },
//     };
//     const config = typeConfig[userType] || {
//       bg: "bg-slate-50",
//       text: "text-slate-700",
//       border: "border-slate-200",
//       label: userType || "N/A",
//     };
//     return (
//       <span
//         className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
//       >
//         {config.label}
//       </span>
//     );
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

//   if (!user?.permissions?.includes("view_user")) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Access Denied
//           </h2>
//           <p className="text-gray-600 mb-6">
//             You don't have permission to access this page.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-[1600px] mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
//           <div className="flex justify-between items-start">
//             <div className="flex items-start space-x-4">
//               <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
//                 <Users className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900 mb-1">
//                   User Management
//                 </h1>
//                 <p className="text-slate-600 text-sm">
//                   View and manage all users in the system
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={onBack}
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back
//               </button>
//               <button
//                 onClick={handleCreateUser}
//                 className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
//                   user?.permissions?.includes("create_user")
//                     ? "text-white bg-slate-800 border border-transparent hover:bg-slate-900"
//                     : "text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed"
//                 }`}
//                 disabled={!user?.permissions?.includes("create_user")}
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add User
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* Filters, Column Chooser, and Sort */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
//           <div className="flex flex-col gap-4">
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
//                   Object.keys(activeFilters).length > 0
//                     ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//                     : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
//                 }`}
//               >
//                 <Filter className="w-4 h-4 mr-2 inline" />
//                 Filters{" "}
//                 {Object.keys(activeFilters).length > 0 &&
//                   `(${Object.keys(activeFilters).length})`}
//               </button>
//               <button
//                 onClick={() => setShowColumnChooser(!showColumnChooser)}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 <Settings className="w-4 h-4 mr-2 inline" />
//                 Columns
//               </button>
//               <button
//                 onClick={handleRefresh}
//                 disabled={isRefreshing}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
//               >
//                 <RefreshCw
//                   className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
//                 />
//               </button>
//               <button
//                 onClick={toggleSortOrder}
//                 className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//               >
//                 {sortOrder === "desc" ? (
//                   <>
//                     <ArrowDown className="w-4 h-4 mr-2 inline" />
//                     Sort by Name (Desc)
//                   </>
//                 ) : (
//                   <>
//                     <ArrowUp className="w-4 h-4 mr-2 inline" />
//                     Sort by Name (Asc)
//                   </>
//                 )}
//               </button>
//             </div>
//             {/* Filter Panel */}
//             {showFilters && (
//               <div className="border-t border-slate-200 pt-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Employee Code
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.employeeCodeId}
//                       onChange={(e) =>
//                         handleFilterChange("employeeCodeId", e.target.value)
//                       }
//                       placeholder="Enter Employee Code (e.g., SPA-1234)"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Role
//                     </label>
//                     <select
//                       value={filters.roleName}
//                       onChange={(e) =>
//                         handleFilterChange("roleName", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">All Roles</option>
//                       <option value="Super_Admin">Super Admin</option>
//                       <option value="Supervisor">Supervisor</option>
//                       <option value="Technician">Technician</option>
//                       <option value="Client_Admin">Client Admin</option>
//                       <option value="Tenant">Tenant</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       User Type
//                     </label>
//                     <select
//                       value={filters.userType}
//                       onChange={(e) =>
//                         handleFilterChange("userType", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">All Types</option>
//                       <option value="INTERNAL">Internal</option>
//                       <option value="COMPANY">Company</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Company
//                     </label>
//                     <select
//                       value={filters.companyId}
//                       onChange={(e) =>
//                         handleFilterChange("companyId", e.target.value)
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value="">All Companies</option>
//                       {companies.map((company) => (
//                         <option
//                           key={company.companyId}
//                           value={company.companyId}
//                         >
//                           {company.companyName}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={filters.email}
//                       onChange={(e) =>
//                         handleFilterChange("email", e.target.value)
//                       }
//                       placeholder="Enter Email"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       value={filters.username}
//                       onChange={(e) =>
//                         handleFilterChange("username", e.target.value)
//                       }
//                       placeholder="Enter Username"
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={applyFilters}
//                     className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Apply Filters
//                   </button>
//                   <button
//                     onClick={clearFilters}
//                     className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//             )}
//             {/* Column Chooser */}
//             {showColumnChooser && (
//               <div className="border-t border-slate-200 pt-4">
//                 <h3 className="text-sm font-medium text-slate-700 mb-3">
//                   Choose Columns to Display
//                 </h3>
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                   {columnDefinitions.map((column) => (
//                     <label
//                       key={column.key}
//                       className="flex items-center space-x-2"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={visibleColumns[column.key]}
//                         onChange={() => toggleColumnVisibility(column.key)}
//                         disabled={column.required}
//                         className="rounded border-slate-300 text-slate-600 focus:ring-slate-500 disabled:opacity-50"
//                       />
//                       <span
//                         className={`text-sm ${
//                           column.required ? "text-slate-500" : "text-slate-700"
//                         }`}
//                       >
//                         {column.label}
//                         {column.required && (
//                           <span className="text-xs ml-1">(Required)</span>
//                         )}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {visibleColumns.profileImage && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Profile Image
//                     </th>
//                   )}
//                   {visibleColumns.fullName && (
//                     <th
//                       className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
//                       onClick={toggleSortOrder}
//                     >
//                       <div className="flex items-center">
//                         Full Name
//                         {sortOrder === "desc" ? (
//                           <ArrowDown className="w-4 h-4 ml-1" />
//                         ) : (
//                           <ArrowUp className="w-4 h-4 ml-1" />
//                         )}
//                       </div>
//                     </th>
//                   )}
//                   {visibleColumns.username && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Username
//                     </th>
//                   )}
//                   {visibleColumns.email && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Email
//                     </th>
//                   )}
//                   {visibleColumns.roleName && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Role
//                     </th>
//                   )}
//                   {visibleColumns.employeeCodeId && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       Employee Code
//                     </th>
//                   )}
//                   {visibleColumns.userType && (
//                     <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                       User Type
//                     </th>
//                   )}
//                   <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={columnDefinitions.length + 1}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="flex justify-center items-center">
//                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
//                         <span className="ml-3 text-sm font-medium text-slate-600">
//                           Loading users...
//                         </span>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : users.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={columnDefinitions.length + 1}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="text-slate-500">
//                         <Users className="w-8 h-8 mx-auto mb-3 text-slate-300" />
//                         <p className="text-sm font-medium">No users found</p>
//                         <p className="text-xs text-slate-400 mt-1">
//                           {Object.keys(activeFilters).length > 0
//                             ? "Try adjusting your filters"
//                             : "No users have been created yet"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   users.map((userData) => {
//                     const RoleIcon = getRoleIcon(userData.roleName);
//                     const canEdit = user?.permissions?.includes("update_user");
//                     const canDelete =
//                       user?.permissions?.includes("delete_user");
//                     return (
//                       <tr
//                         key={`${userData.userType}-${userData.userId}`}
//                         className="hover:bg-slate-50 transition-colors"
//                       >
//                         {visibleColumns.profileImage && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             {userData.profileImageUrl ? (
//                               <button
//                                 onClick={() =>
//                                   handleImageClick(userData.profileImageUrl)
//                                 }
//                               >
//                                 <img
//                                   src={userData.profileImageUrl}
//                                   alt={`${userData.firstName} ${userData.lastName}`}
//                                   className="w-8 h-8 rounded-full object-cover cursor-pointer hover:shadow-md transition-shadow"
//                                 />
//                               </button>
//                             ) : (
//                               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                                 <span className="text-white font-semibold text-xs">
//                                   {userData.firstName.charAt(0)}
//                                   {userData.lastName.charAt(0)}
//                                 </span>
//                               </div>
//                             )}
//                           </td>
//                         )}
//                         {visibleColumns.fullName && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-slate-900">
//                               {userData.firstName} {userData.lastName}
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.username && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-slate-600">
//                               @{userData.username}
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.email && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <Mail className="w-4 h-4 text-slate-400" />
//                               <span className="text-sm text-slate-600">
//                                 {userData.email}
//                               </span>
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.roleName && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="flex items-center gap-2">
//                               <RoleIcon className="w-4 h-4 text-slate-400" />
//                               <span className="text-sm text-slate-600">
//                                 {userData.roleName || "N/A"}
//                               </span>
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.employeeCodeId && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             <div className="text-sm text-slate-600">
//                               {userData.employeeCodeId || "N/A"}
//                             </div>
//                           </td>
//                         )}
//                         {visibleColumns.userType && (
//                           <td className="px-4 py-4 whitespace-nowrap">
//                             {getUserTypeBadge(userData.userType)}
//                           </td>
//                         )}
//                         <td className="px-4 py-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => handleEditUser(userData)}
//                               className={`p-2 rounded-md ${
//                                 canEdit
//                                   ? "text-blue-600 hover:bg-blue-50"
//                                   : "text-slate-400 cursor-not-allowed"
//                               }`}
//                               disabled={!canEdit}
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteUser(userData)}
//                               className={`p-2 rounded-md ${
//                                 canDelete
//                                   ? "text-red-600 hover:bg-red-50"
//                                   : "text-slate-400 cursor-not-allowed"
//                               }`}
//                               disabled={!canDelete}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {!loading && users.length > 0 && (
//             <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="text-xs text-slate-600">
//                     Showing{" "}
//                     <span className="font-medium">
//                       {currentPage * pageSize + 1}
//                     </span>{" "}
//                     to{" "}
//                     <span className="font-medium">
//                       {Math.min((currentPage + 1) * pageSize, totalElements)}
//                     </span>{" "}
//                     of <span className="font-medium">{totalElements}</span>{" "}
//                     users
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <label className="text-xs text-slate-600">Show:</label>
//                     <select
//                       value={pageSize}
//                       onChange={(e) =>
//                         handlePageSizeChange(Number(e.target.value))
//                       }
//                       className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
//                     >
//                       <option value={5}>5</option>
//                       <option value={10}>10</option>
//                       <option value={25}>25</option>
//                       <option value={50}>50</option>
//                       <option value={100}>100</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     <ChevronLeft className="w-3 h-3" />
//                     Previous
//                   </button>
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i;
//                       } else if (currentPage < 3) {
//                         pageNum = i;
//                       } else if (currentPage > totalPages - 4) {
//                         pageNum = totalPages - 5 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
//                             currentPage === pageNum
//                               ? "bg-slate-800 text-white"
//                               : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
//                           }`}
//                         >
//                           {pageNum + 1}
//                         </button>
//                       );
//                     })}
//                   </div>
//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                     className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <UserForm
//           isOpen={showUserForm}
//           onClose={() => setShowUserForm(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowUserForm(false);
//             loadUsers();
//           }}
//         />
//         {showImageModal && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
//             onClick={() => setShowImageModal(false)}
//           >
//             <div className="relative bg-white rounded-xl shadow-xl p-4">
//               <button
//                 onClick={() => setShowImageModal(false)}
//                 className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-600 hover:text-gray-900"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//               <img
//                 src={selectedImage}
//                 alt="Enlarged Profile"
//                 className="max-w-[80vw] max-h-[80vh] object-contain"
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

"use client";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  ArrowLeft,
  RefreshCw,
  Filter,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Mail,
  Shield,
  Home,
  Building,
  Edit,
  Trash2,
} from "lucide-react";
import { userService } from "../services/userService";
import { companyService } from "../services/companyService";
import UserForm from "../components/UserManagement/UserForm";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const UserManagement = ({ onBack }) => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortField] = useState("firstName"); // Fixed to sort by firstName
  const [filters, setFilters] = useState({
    employeeCodeId: "",
    roleName: "",
    userType: "",
    companyId: "",
    email: "",
    username: "",
  });
  const [activeFilters, setActiveFilters] = useState({});
  const [showColumnChooser, setShowColumnChooser] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    profileImage: true,
    fullName: true,
    username: true,
    email: true,
    roleName: true,
    employeeCodeId: true,
    userType: true,
  });
  const navigate = useNavigate();
  const columnDefinitions = [
    { key: "profileImage", label: "Profile Image", required: false },
    { key: "fullName", label: "Full Name", required: true },
    { key: "username", label: "Username", required: true },
    { key: "email", label: "Email", required: true },
    { key: "roleName", label: "Role", required: true },
    { key: "employeeCodeId", label: "Employee Code", required: false },
    { key: "userType", label: "User Type", required: true },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
    setActiveFilters(cleanFilters);
    setCurrentPage(0);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      employeeCodeId: "",
      roleName: "",
      userType: "",
      companyId: "",
      email: "",
      username: "",
    });
    setActiveFilters({});
    setCurrentPage(0);
    setShowFilters(false);
  };

  const toggleColumnVisibility = (columnKey) => {
    if (columnDefinitions.find((col) => col.key === columnKey)?.required)
      return;
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setCurrentPage(0);
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [currentPage, pageSize, activeFilters, sortOrder]);

  const loadCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      setCompanies(response.data || []);
    } catch (error) {
      console.error("Error loading companies:", error);
      toast.error("Failed to load companies");
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await userService.getFilteredUsers(
        activeFilters,
        currentPage,
        pageSize,
        sortOrder,
        sortField
      );
      setUsers(response.data.content || []);
      setTotalElements(response.data.totalElements || 0);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
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
      toast.success("Users refreshed successfully");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleCreateUser = () => {
    if (!user?.permissions?.includes("create_user")) {
      toast.error("You don't have permission to create users");
      return;
    }
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (userData) => {
    if (!user?.permissions?.includes("update_user")) {
      toast.error("You don't have permission to update users");
      return;
    }
    setSelectedUser(userData);
    setShowUserForm(true);
  };

  const handleDeleteUser = async (userData) => {
    if (!user?.permissions?.includes("delete_user")) {
      toast.error("You don't have permission to delete users");
      return;
    }
    if (
      window.confirm(
        `Are you sure you want to delete ${userData.firstName} ${userData.lastName}?`
      )
    ) {
      try {
        await userService.deleteUser(userData.userId, userData.userType);
        loadUsers();
        toast.success("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    }
  };

  const handleImageClick = (imageUrl) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setShowImageModal(true);
    }
  };

  const getUserTypeBadge = (userType) => {
    const typeConfig = {
      INTERNAL: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        label: "Internal",
      },
      COMPANY: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        label: "Company",
      },
    };
    const config = typeConfig[userType] || {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      label: userType || "N/A",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md border ${config.bg} ${config.text} ${config.border}`}
      >
        {config.label}
      </span>
    );
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

  if (!user?.permissions?.includes("view_user")) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-slate-800 rounded-lg shadow-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">
                  User Management
                </h1>
                <p className="text-slate-600 text-sm">
                  View and manage all users in the system
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={handleCreateUser}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
                  user?.permissions?.includes("create_user")
                    ? "text-white bg-slate-800 border border-transparent hover:bg-slate-900"
                    : "text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed"
                }`}
                disabled={!user?.permissions?.includes("create_user")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </button>
            </div>
          </div>
        </div>
        {/* Filters, Column Chooser, and Sort */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 text-sm font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors ${
                  Object.keys(activeFilters).length > 0
                    ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    : "text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Filter className="w-4 h-4 mr-2 inline" />
                Filters{" "}
                {Object.keys(activeFilters).length > 0 &&
                  `(${Object.keys(activeFilters).length})`}
              </button>
              <button
                onClick={() => setShowColumnChooser(!showColumnChooser)}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                <Settings className="w-4 h-4 mr-2 inline" />
                Columns
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={toggleSortOrder}
                className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
              >
                {sortOrder === "desc" ? (
                  <>
                    <ArrowDown className="w-4 h-4 mr-2 inline" />
                    Sort by Name (Desc)
                  </>
                ) : (
                  <>
                    <ArrowUp className="w-4 h-4 mr-2 inline" />
                    Sort by Name (Asc)
                  </>
                )}
              </button>
            </div>
            {/* Filter Panel */}
            {showFilters && (
              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Employee Code
                    </label>
                    <input
                      type="text"
                      value={filters.employeeCodeId}
                      onChange={(e) =>
                        handleFilterChange("employeeCodeId", e.target.value)
                      }
                      placeholder="Enter Employee Code (e.g., SPA-1234)"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Role
                    </label>
                    <select
                      value={filters.roleName}
                      onChange={(e) =>
                        handleFilterChange("roleName", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value="">All Roles</option>
                      <option value="Super_Admin">Super Admin</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Technician">Technician</option>
                      <option value="Client_Admin">Client Admin</option>
                      <option value="Tenant">Tenant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      User Type
                    </label>
                    <select
                      value={filters.userType}
                      onChange={(e) =>
                        handleFilterChange("userType", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      {/* <option value="">All Types</option> */}
                      <option value="INTERNAL">Internal</option>
                      <option value="COMPANY">Company</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Company
                    </label>
                    <select
                      value={filters.companyId}
                      onChange={(e) =>
                        handleFilterChange("companyId", e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value="">All Companies</option>
                      {companies.map((company) => (
                        <option
                          key={company.companyId}
                          value={company.companyId}
                        >
                          {company.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={filters.email}
                      onChange={(e) =>
                        handleFilterChange("email", e.target.value)
                      }
                      placeholder="Enter Email"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={filters.username}
                      onChange={(e) =>
                        handleFilterChange("username", e.target.value)
                      }
                      placeholder="Enter Username"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800 border border-transparent rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
            {/* Column Chooser */}
            {showColumnChooser && (
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-sm font-medium text-slate-700 mb-3">
                  Choose Columns to Display
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {columnDefinitions.map((column) => (
                    <label
                      key={column.key}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[column.key]}
                        onChange={() => toggleColumnVisibility(column.key)}
                        disabled={column.required}
                        className="rounded border-slate-300 text-slate-600 focus:ring-slate-500 disabled:opacity-50"
                      />
                      <span
                        className={`text-sm ${
                          column.required ? "text-slate-500" : "text-slate-700"
                        }`}
                      >
                        {column.label}
                        {column.required && (
                          <span className="text-xs ml-1">(Required)</span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {visibleColumns.profileImage && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Profile Image
                    </th>
                  )}
                  {visibleColumns.fullName && (
                    <th
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer"
                      onClick={toggleSortOrder}
                    >
                      <div className="flex items-center">
                        Full Name
                        {sortOrder === "desc" ? (
                          <ArrowDown className="w-4 h-4 ml-1" />
                        ) : (
                          <ArrowUp className="w-4 h-4 ml-1" />
                        )}
                      </div>
                    </th>
                  )}
                  {visibleColumns.username && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Username
                    </th>
                  )}
                  {visibleColumns.email && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Email
                    </th>
                  )}
                  {visibleColumns.roleName && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Role
                    </th>
                  )}
                  {visibleColumns.employeeCodeId && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Employee Code
                    </th>
                  )}
                  {visibleColumns.userType && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      User Type
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={columnDefinitions.length + 1}
                      className="px-4 py-12 text-center"
                    >
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-600"></div>
                        <span className="ml-3 text-sm font-medium text-slate-600">
                          Loading users...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columnDefinitions.length + 1}
                      className="px-4 py-12 text-center"
                    >
                      <div className="text-slate-500">
                        <Users className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                        <p className="text-sm font-medium">No users found</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {Object.keys(activeFilters).length > 0
                            ? "Try adjusting your filters"
                            : "No users have been created yet"}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((userData) => {
                    const RoleIcon = getRoleIcon(userData.roleName);
                    const canEdit = user?.permissions?.includes("update_user");
                    const canDelete =
                      user?.permissions?.includes("delete_user");
                    return (
                      <tr
                        key={`${userData.userType}-${userData.userId}`}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        {visibleColumns.profileImage && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            {userData.profileImageUrl ? (
                              <button
                                onClick={() =>
                                  handleImageClick(userData.profileImageUrl)
                                }
                              >
                                <img
                                  src={userData.profileImageUrl}
                                  alt={`${userData.firstName} ${userData.lastName}`}
                                  className="w-8 h-8 rounded-full object-cover cursor-pointer hover:shadow-md transition-shadow"
                                />
                              </button>
                            ) : (
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-xs">
                                  {userData.firstName.charAt(0)}
                                  {userData.lastName.charAt(0)}
                                </span>
                              </div>
                            )}
                          </td>
                        )}
                        {visibleColumns.fullName && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-slate-900">
                              {userData.firstName} {userData.lastName}
                            </div>
                          </td>
                        )}
                        {visibleColumns.username && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-600">
                              @{userData.username}
                            </div>
                          </td>
                        )}
                        {visibleColumns.email && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {userData.email}
                              </span>
                            </div>
                          </td>
                        )}
                        {visibleColumns.roleName && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <RoleIcon className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {userData.roleName || "N/A"}
                              </span>
                            </div>
                          </td>
                        )}
                        {visibleColumns.employeeCodeId && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-600">
                              {userData.employeeCodeId || "N/A"}
                            </div>
                          </td>
                        )}
                        {visibleColumns.userType && (
                          <td className="px-4 py-4 whitespace-nowrap">
                            {getUserTypeBadge(userData.userType)}
                          </td>
                        )}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditUser(userData)}
                              className={`p-2 rounded-md ${
                                canEdit
                                  ? "text-blue-600 hover:bg-blue-50"
                                  : "text-slate-400 cursor-not-allowed"
                              }`}
                              disabled={!canEdit}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(userData)}
                              className={`p-2 rounded-md ${
                                canDelete
                                  ? "text-red-600 hover:bg-red-50"
                                  : "text-slate-400 cursor-not-allowed"
                              }`}
                              disabled={!canDelete}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          {!loading && users.length > 0 && (
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xs text-slate-600">
                    Showing{" "}
                    <span className="font-medium">
                      {currentPage * pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min((currentPage + 1) * pageSize, totalElements)}
                    </span>{" "}
                    of <span className="font-medium">{totalElements}</span>{" "}
                    users
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-600">Show:</label>
                    <select
                      value={pageSize}
                      onChange={(e) =>
                        handlePageSizeChange(Number(e.target.value))
                      }
                      className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                            currentPage === pageNum
                              ? "bg-slate-800 text-white"
                              : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum + 1}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <UserForm
          isOpen={showUserForm}
          onClose={() => setShowUserForm(false)}
          user={selectedUser}
          onSuccess={() => {
            setShowUserForm(false);
            loadUsers();
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

export default UserManagement;
