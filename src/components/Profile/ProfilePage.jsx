"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  Mail,
  Building,
  Shield,
  X,
  Eye,
  EyeOff,
  AlertCircle,
  UserCheck,
  Key,
} from "lucide-react";
import { userService } from "../../services/userService";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view"); // view, change-credentials
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getCurrentUserProfile();
      setProfile(response.data);
      setFormData({
        newUsername: response.data.username || "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error loading profile:", error);
      setErrors({ general: "Failed to load profile information" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateCredentials = () => {
    const newErrors = {};
    if (!formData.newUsername.trim()) {
      newErrors.newUsername = "Username is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateCredentials = async () => {
    if (!validateCredentials()) return;

    try {
      setLoading(true);
      // Use the correct endpoint: PUT /api/users/{id}/credentials/{userType}
      await userService.changeCredentials(profile.userId, profile.userType, {
        newUsername: formData.newUsername,
        newPassword: formData.newPassword,
      });

      setSuccess("Username and password updated successfully!");
      setActiveTab("view");
      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
      await loadProfile();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error updating credentials:", error);
      setErrors({
        general:
          error.response?.data?.message || "Failed to update credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setActiveTab("view");
    setFormData({
      newUsername: profile?.username || "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <User className="w-10 h-10 text-blue-600" />
            Profile Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account details and security settings
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
            <UserCheck className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5" />
            {errors.general}
          </div>
        )}

        {/* Temporary User Warning */}
        {profile?.isTemporary && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">Temporary Account</p>
              <p className="text-sm">
                Please update your username and password to secure your account.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-3xl">
                      {profile?.firstName?.charAt(0)}
                      {profile?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">
                    {profile?.firstName} {profile?.lastName}
                  </h2>
                  <p className="text-blue-100">@{profile?.username}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                      {profile?.userType === "INTERNAL" ? (
                        <Shield className="w-3 h-3 mr-1" />
                      ) : (
                        <Building className="w-3 h-3 mr-1" />
                      )}
                      {profile?.userType} USER
                    </span>
                    {profile?.isTemporary && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                        TEMPORARY
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{profile?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    {profile?.roleName || "No Role Assigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab("view")}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "view"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    View Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("change-credentials")}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "change-credentials"
                        ? "border-blue-500 text-blue-600 bg-blue-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Key className="w-4 h-4 inline mr-2" />
                    Change Username & Password
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* View Profile Tab */}
                {activeTab === "view" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Profile Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
                            {profile?.firstName}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
                            {profile?.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
                            {profile?.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                          </label>
                          <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
                            {profile?.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Change Credentials Tab */}
                {activeTab === "change-credentials" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      Change Username & Password
                    </h3>
                    <div className="max-w-md space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Username
                        </label>
                        <input
                          type="text"
                          name="newUsername"
                          value={formData.newUsername}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.newUsername
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter new username"
                        />
                        {errors.newUsername && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.newUsername}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.newPassword
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.newPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.newPassword}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 pt-6">
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={loading}
                      >
                        <X className="w-4 h-4 inline mr-2" />
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateCredentials}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        disabled={loading}
                      >
                        <Key className="w-4 h-4 inline mr-2" />
                        {loading ? "Updating..." : "Update Credentials"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
