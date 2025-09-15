"use client";

import { useState, useEffect } from "react";
import {
  X,
  Shield,
  Check,
  Plus,
  Trash2,
  Search,
  Filter,
  CheckSquare,
  Square,
} from "lucide-react";
import { permissionService } from "../../services/permissionService";
import { userService } from "../../services/userService";

const PermissionAssignment = ({ isOpen, onClose, user, onSuccess }) => {
  const [permissions, setPermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      loadPermissions();
      loadRoles();
      loadUserPermissions();
    }
  }, [isOpen, user]);

  const loadPermissions = async () => {
    try {
      const response = await permissionService.getAllPermissions();
      setPermissions(response.data || []);
    } catch (error) {
      console.error("Error loading permissions:", error);
    }
  };

  const loadRoles = async () => {
    try {
      const response = await userService.getAllRoles();
      setRoles(response.data || []);
    } catch (error) {
      console.error("Error loading roles:", error);
    }
  };

  const loadUserPermissions = async () => {
    try {
      // This would need to be implemented in the backend
      // For now, we'll use an empty array
      setUserPermissions([]);
    } catch (error) {
      console.error("Error loading user permissions:", error);
    }
  };

  const handleAssignPermissions = async () => {
    if (!selectedRole || selectedPermissions.length === 0) {
      alert("Please select a role and at least one permission");
      return;
    }

    setLoading(true);
    try {
      await userService.assignPermissions(
        user.userId,
        user.userType,
        selectedPermissions
      );
      onSuccess();
      setSelectedPermissions([]);
      setSelectedRole("");
    } catch (error) {
      console.error("Error assigning permissions:", error);
      alert("Failed to assign permissions");
    } finally {
      setLoading(false);
    }
  };

  const getPermissionCategories = () => {
    const categories = [
      ...new Set(permissions.map((p) => p.category || "General")),
    ];
    return categories.sort();
  };

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.permissionName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || permission.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const toggleAllPermissions = () => {
    if (selectedPermissions.length === filteredPermissions.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(filteredPermissions.map((p) => p.permissionId));
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "User Management": "bg-blue-100 text-blue-800 border-blue-200",
      "Company Management": "bg-green-100 text-green-800 border-green-200",
      "Asset Management": "bg-purple-100 text-purple-800 border-purple-200",
      "Work Order": "bg-orange-100 text-orange-800 border-orange-200",
      "Report Management": "bg-red-100 text-red-800 border-red-200",
      General: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[category] || colors.General;
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Assign Permissions
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
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Select Role for Permission Assignment
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleName} - {role.description}
                </option>
              ))}
            </select>
          </div>

          {/* Search and Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="all">All Categories</option>
                {getPermissionCategories().map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleAllPermissions}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {selectedPermissions.length === filteredPermissions.length ? (
                <CheckSquare className="w-5 h-5 text-purple-600" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
              {selectedPermissions.length === filteredPermissions.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          {/* Permissions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">
                Available Permissions
              </h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {selectedPermissions.length} selected
                </span>
                <span className="text-sm text-gray-500">
                  {filteredPermissions.length} total
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {filteredPermissions.map((permission) => {
                const isSelected = selectedPermissions.includes(
                  permission.permissionId
                );
                return (
                  <div
                    key={permission.permissionId}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      isSelected
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => togglePermission(permission.permissionId)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {permission.permissionName}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {permission.description}
                    </p>

                    {permission.category && (
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                          permission.category
                        )}`}
                      >
                        {permission.category}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredPermissions.length === 0 && (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No permissions found matching your criteria
                </p>
              </div>
            )}
          </div>

          {/* Current User Permissions */}
          {userPermissions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">
                Current Permissions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPermissions.map((permission) => (
                  <div
                    key={permission.permissionId}
                    className="p-4 border-2 border-green-200 bg-green-50 rounded-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {permission.permissionName}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">
                          {permission.description}
                        </p>
                        {permission.category && (
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                              permission.category
                            )}`}
                          >
                            {permission.category}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          /* Handle remove permission */
                        }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAssignPermissions}
              disabled={
                loading || !selectedRole || selectedPermissions.length === 0
              }
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Assign Permissions ({selectedPermissions.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionAssignment;
