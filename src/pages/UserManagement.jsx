// "use client";
// import { useState, useEffect } from "react";
// import {
//   Users,
//   Plus,
//   Search,
//   Filter,
//   Edit,
//   Trash2,
//   ChevronDown,
//   RefreshCw,
//   UserCheck,
//   Building,
//   Mail,
//   ChevronLeft,
//   ChevronRight,
//   Shield,
//   Settings,
//   Home,
// } from "lucide-react";
// import { userService } from "../services/userService";
// import { companyService } from "../services/companyService";
// import UserForm from "../components/UserManagement/UserForm";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     loadCompanies();
//     loadUsers();
//   }, []);

//   useEffect(() => {
//     loadUsers();
//   }, [roleFilter, selectedCompany, currentPage, pageSize]);

//   const loadCompanies = async () => {
//     try {
//       const response = await companyService.getAllCompanies();
//       setCompanies(response.data || []);
//     } catch (error) {
//       console.error("Error loading companies:", error);
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

//   const handleCreateUser = () => {
//     setSelectedUser(null);
//     setShowUserForm(true);
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     setShowUserForm(true);
//   };

//   const handleDeleteUser = async (user) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
//       )
//     ) {
//       try {
//         await userService.deleteUser(user.userId, user.userType);
//         loadUsers();
//       } catch (error) {
//         console.error("Error deleting user:", error);
//         alert("Failed to delete user");
//       }
//     }
//   };

//   const getUserTypeColor = (userType) => {
//     return userType === "INTERNAL"
//       ? "bg-blue-100 text-blue-800 border-blue-200"
//       : "bg-green-100 text-green-800 border-green-200";
//   };

//   const getUserTypeIcon = (userType) => {
//     return userType === "INTERNAL" ? Users : Building;
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

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//           <div className="space-y-2">
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <Users className="w-8 h-8 text-blue-600" />
//               User Management
//             </h1>
//             <p className="text-gray-600 text-base">
//               Manage users with role-based filtering and pagination
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
//               onClick={handleCreateUser}
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
//             >
//               <Plus className="w-5 h-5 mr-2" />
//               Add User
//             </button>
//           </div>
//         </div>

//         {/* Stats Card */}
//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-blue-100 rounded-lg">
//               <UserCheck className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-600 uppercase">
//                 {getRoleDisplayName(roleFilter)}
//               </p>
//               <p className="text-2xl font-semibold text-gray-900">
//                 {totalElements.toLocaleString()}
//               </p>
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
//                     className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
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

//               {/* Company Filter - Only show for roles that require it */}
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
//                       className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
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
//                   className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
//                 className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
//                   {getRoleDisplayName(roleFilter).toLowerCase()}.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Users Table */}
//         <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                 <UserCheck className="w-6 h-6 text-blue-600" />
//                 {getRoleDisplayName(roleFilter)} ({filteredUsers.length})
//               </h3>
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
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
//                   : `No ${getRoleDisplayName(roleFilter).toLowerCase()} found`}
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
//                       <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
//                               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
//                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                             <div className="flex items-center justify-end gap-2">
//                               <button
//                                 onClick={() => handleEditUser(user)}
//                                 className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                                 title="Edit User"
//                               >
//                                 <Edit className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteUser(user)}
//                                 className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                                 title="Delete User"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
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
//                                   ? "bg-blue-600 text-white border-blue-600"
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

//         {/* User Form Modal */}
//         <UserForm
//           isOpen={showUserForm}
//           onClose={() => setShowUserForm(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowUserForm(false);
//             loadUsers();
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

"use client";
import { useState, useEffect, useContext } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ChevronDown,
  RefreshCw,
  UserCheck,
  Building,
  Mail,
  ChevronLeft,
  ChevronRight,
  Shield,
  Settings,
  Home,
} from "lucide-react";
import { userService } from "../services/userService";
import { companyService } from "../services/companyService";
import UserForm from "../components/UserManagement/UserForm";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const UserManagement = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Check if user has view_user permission
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
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadCompanies();
    loadUsers();
  }, []);

  useEffect(() => {
    loadUsers();
  }, [roleFilter, selectedCompany, currentPage, pageSize]);

  const loadCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      setCompanies(response.data || []);
    } catch (error) {
      console.error("Error loading companies:", error);
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

  const getUserTypeColor = (userType) => {
    return userType === "INTERNAL"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  const getUserTypeIcon = (userType) => {
    return userType === "INTERNAL" ? Users : Building;
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

  const filteredUsers = users.filter((userData) => {
    if (!searchTerm) return true;
    return (
      userData.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.username.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              User Management
            </h1>
            <p className="text-gray-600 text-base">
              Manage users with role-based filtering and pagination
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
            <div className="relative group">
              <button
                onClick={handleCreateUser}
                className={`inline-flex items-center px-6 py-3 font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 ${
                  user?.permissions?.includes("create_user")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!user?.permissions?.includes("create_user")}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add User
              </button>
              {!user?.permissions?.includes("create_user") && (
                <div className="absolute top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  You don't have permission to create users
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 uppercase">
                {getRoleDisplayName(roleFilter)}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalElements.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="space-y-6">
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
                    className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
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
                      className="w-full pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
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

              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

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
                  {getRoleDisplayName(roleFilter).toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-blue-600" />
                {getRoleDisplayName(roleFilter)} ({filteredUsers.length})
              </h3>
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
                  : `No ${getRoleDisplayName(roleFilter).toLowerCase()} found`}
              </p>
            </div>
          ) : (
            <>
              <div className="w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">
                        Role
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((userData) => {
                      const TypeIcon = getUserTypeIcon(userData.userType);
                      const RoleIcon = getRoleIcon(userData.roleName);
                      const canEdit =
                        user?.permissions?.includes("update_user");
                      const canDelete =
                        user?.permissions?.includes("delete_user");

                      return (
                        <tr
                          key={`${userData.userType}-${userData.userId}`}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-sm">
                                  {userData.firstName.charAt(0)}
                                  {userData.lastName.charAt(0)}
                                </span>
                              </div>
                              <div className="truncate">
                                <div className="text-sm font-medium text-gray-900">
                                  {userData.firstName} {userData.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  @{userData.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUserTypeColor(
                                userData.userType
                              )}`}
                            >
                              <TypeIcon className="w-3 h-3 mr-1" />
                              {userData.userType}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 truncate">
                              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-900">
                                {userData.email}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 truncate">
                              <RoleIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                              <span className="text-sm text-gray-900">
                                {userData.roleName || "No Role"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <div className="relative group">
                                <button
                                  onClick={() => handleEditUser(userData)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    canEdit
                                      ? "text-blue-600 hover:bg-blue-100"
                                      : "text-gray-400 cursor-not-allowed"
                                  }`}
                                  title={
                                    canEdit
                                      ? "Edit User"
                                      : "No permission to edit"
                                  }
                                  disabled={!canEdit}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                {!canEdit && (
                                  <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                                    You don't have permission to edit users
                                  </div>
                                )}
                              </div>
                              <div className="relative group">
                                <button
                                  onClick={() => handleDeleteUser(userData)}
                                  className={`p-2 rounded-lg transition-colors ${
                                    canDelete
                                      ? "text-red-600 hover:bg-red-100"
                                      : "text-gray-400 cursor-not-allowed"
                                  }`}
                                  title={
                                    canDelete
                                      ? "Delete User"
                                      : "No permission to delete"
                                  }
                                  disabled={!canDelete}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                {!canDelete && (
                                  <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                                    You don't have permission to delete users
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

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
                                  ? "bg-blue-600 text-white border-blue-600"
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

        <UserForm
          isOpen={showUserForm}
          onClose={() => setShowUserForm(false)}
          user={selectedUser}
          onSuccess={() => {
            setShowUserForm(false);
            loadUsers();
          }}
        />
      </div>
    </div>
  );
};

export default UserManagement;
