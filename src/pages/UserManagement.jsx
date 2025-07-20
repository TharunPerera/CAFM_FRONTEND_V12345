// "use client";

// import { useState, useEffect } from "react";
// import {
//   Users,
//   Plus,
//   Search,
//   Filter,
//   Edit,
//   Trash2,
//   Shield,
//   Key,
//   ChevronDown,
//   RefreshCw,
//   UserCheck,
//   Building,
//   Mail,
// } from "lucide-react";
// import { userService } from "../services/userService";
// import UserForm from "../components/UserManagement/UserForm";
// import PermissionAssignment from "../components/UserManagement/PermissionAssignment";
// import PasswordResetForm from "../components/UserManagement/PasswordResetForm";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [showUserForm, setShowUserForm] = useState(false);
//   const [showPermissionModal, setShowPermissionModal] = useState(false);
//   const [showPasswordReset, setShowPasswordReset] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   useEffect(() => {
//     filterUsers();
//   }, [users, searchTerm, filterType]);

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await userService.getAllUsers();
//       setUsers(response.data || []);
//     } catch (error) {
//       console.error("Error loading users:", error);
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

//   const filterUsers = () => {
//     let filtered = users;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (user) =>
//           user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by user type
//     if (filterType !== "all") {
//       filtered = filtered.filter((user) => user.userType === filterType);
//     }

//     setFilteredUsers(filtered);
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

//   const handleAssignPermissions = (user) => {
//     setSelectedUser(user);
//     setShowPermissionModal(true);
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
//               <Users className="w-8 h-8 text-blue-600" />
//               User Management
//             </h1>
//             <p className="text-gray-600 text-base">
//               Manage users, roles, and permissions
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
//               onClick={() => setShowPasswordReset(true)}
//               className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
//             >
//               <Key className="w-4 h-4 mr-2" />
//               Password Reset
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

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
//                   className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="relative">
//                 <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
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
//               <UserCheck className="w-6 h-6 text-blue-600" />
//               Users ({filteredUsers.length})
//             </h3>
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
//                 {searchTerm || filterType !== "all"
//                   ? "No users match your current filters"
//                   : "Get started by creating your first user"}
//               </p>
//               {!searchTerm && filterType === "all" && (
//                 <button
//                   onClick={handleCreateUser}
//                   className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
//                 >
//                   <Plus className="w-5 h-5 mr-2" />
//                   Create First User
//                 </button>
//               )}
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
//                     <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
//                             <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
//                                 ID: {user.userId}
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
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex items-center justify-end gap-2">
//                             <button
//                               onClick={() => handleEditUser(user)}
//                               className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                               title="Edit User"
//                             >
//                               <Edit className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleAssignPermissions(user)}
//                               className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
//                               title="Assign Permissions"
//                             >
//                               <Shield className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => handleDeleteUser(user)}
//                               className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                               title="Delete User"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
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
//         <UserForm
//           isOpen={showUserForm}
//           onClose={() => setShowUserForm(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowUserForm(false);
//             loadUsers();
//           }}
//         />

//         <PermissionAssignment
//           isOpen={showPermissionModal}
//           onClose={() => setShowPermissionModal(false)}
//           user={selectedUser}
//           onSuccess={() => {
//             setShowPermissionModal(false);
//             loadUsers();
//           }}
//         />

//         <PasswordResetForm
//           isOpen={showPasswordReset}
//           onClose={() => setShowPasswordReset(false)}
//         />
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Shield,
  ChevronDown,
  RefreshCw,
  UserCheck,
  Building,
  Mail,
} from "lucide-react";
import { userService } from "../services/userService";
import UserForm from "../components/UserManagement/UserForm";
import PermissionAssignment from "../components/UserManagement/PermissionAssignment";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterType]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response.data || []);
    } catch (error) {
      console.error("Error loading users:", error);
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

  const filterUsers = () => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by user type
    if (filterType !== "all") {
      filtered = filtered.filter((user) => user.userType === filterType);
    }

    setFilteredUsers(filtered);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = async (user) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
      )
    ) {
      try {
        await userService.deleteUser(user.userId, user.userType);
        loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleAssignPermissions = (user) => {
    setSelectedUser(user);
    setShowPermissionModal(true);
  };

  const getUserTypeColor = (userType) => {
    return userType === "INTERNAL"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  const getUserTypeIcon = (userType) => {
    return userType === "INTERNAL" ? Shield : Building;
  };

  const getStats = () => {
    const internalUsers = users.filter((u) => u.userType === "INTERNAL").length;
    const companyUsers = users.filter((u) => u.userType === "COMPANY").length;
    return {
      total: users.length,
      internal: internalUsers,
      company: companyUsers,
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
              <Users className="w-8 h-8 text-blue-600" />
              User Management
            </h1>
            <p className="text-gray-600 text-base">
              Manage users, roles, and permissions
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
              onClick={handleCreateUser}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  Total Users
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  Internal Users
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.internal}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  Company Users
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.company}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-52 pl-12 pr-8 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                >
                  <option value="all">All Users</option>
                  <option value="INTERNAL">Internal Users</option>
                  <option value="COMPANY">Company Users</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-blue-600" />
              Users ({filteredUsers.length})
            </h3>
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
                {searchTerm || filterType !== "all"
                  ? "No users match your current filters"
                  : "Get started by creating your first user"}
              </p>
              {!searchTerm && filterType === "all" && (
                <button
                  onClick={handleCreateUser}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create First User
                </button>
              )}
            </div>
          ) : (
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
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => {
                    const TypeIcon = getUserTypeIcon(user.userType);
                    return (
                      <tr
                        key={`${user.userType}-${user.userId}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.firstName.charAt(0)}
                                {user.lastName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {user.userId}
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
                          <span className="text-sm text-gray-900">
                            {user.roleName || "No Role"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAssignPermissions(user)}
                              className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                              title="Assign Permissions"
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modals */}
        <UserForm
          isOpen={showUserForm}
          onClose={() => setShowUserForm(false)}
          user={selectedUser}
          onSuccess={() => {
            setShowUserForm(false);
            loadUsers();
          }}
        />
        <PermissionAssignment
          isOpen={showPermissionModal}
          onClose={() => setShowPermissionModal(false)}
          user={selectedUser}
          onSuccess={() => {
            setShowPermissionModal(false);
            loadUsers();
          }}
        />
      </div>
    </div>
  );
};

export default UserManagement;
