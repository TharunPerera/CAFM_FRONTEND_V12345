// "use client";

// import { useState, useEffect, useContext, useRef } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import {
//   User,
//   Mail,
//   Building,
//   Shield,
//   Eye,
//   EyeOff,
//   AlertCircle,
//   UserCheck,
//   Key,
//   CheckCircle,
//   Info,
//   AlertTriangle,
// } from "lucide-react";
// import { userService } from "../../services/userService";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("view");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     newUsername: "",
//     newPassword: "",
//     confirmPassword: "",
//     oldPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");
//   const isLoggingOutRef = useRef(false);

//   useEffect(() => {
//     if (!user) {
//       if (!isLoggingOutRef.current) {
//         isLoggingOutRef.current = true;
//         navigate("/login");
//       }
//       return;
//     }
//     loadProfile();
//   }, [user, navigate]);

//   const loadProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await userService.getCurrentUserProfile();
//       setProfile(response.data);
//       setFormData({
//         newUsername: response.data.username || "",
//         newPassword: "",
//         confirmPassword: "",
//         oldPassword: "",
//       });
//       setErrors({});
//       setSuccess("");
//     } catch (error) {
//       console.error("Error loading profile:", error);
//       if (error.response?.status === 403 || error.response?.status === 401) {
//         setErrors({
//           general: "Session expired or unauthorized. Please log in again.",
//         });
//         if (!isLoggingOutRef.current) {
//           isLoggingOutRef.current = true;
//           logout();
//         }
//       } else {
//         setErrors({
//           general: "Failed to load profile information.",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }

//     setSuccess("");
//     setErrors((prev) => ({
//       ...prev,
//       general: "",
//     }));
//   };

//   const validateCredentials = () => {
//     const newErrors = {};
//     const currentUsername = profile?.username;
//     const isTemporary = profile?.isTemporary;

//     const isUsernameChanging =
//       formData.newUsername.trim() !== "" &&
//       formData.newUsername.trim() !== currentUsername;
//     const isPasswordChanging =
//       formData.newPassword.trim() !== "" ||
//       formData.confirmPassword.trim() !== "";

//     if (isTemporary) {
//       if (!formData.newUsername.trim()) {
//         newErrors.newUsername = "Username is required for temporary users";
//       } else if (formData.newUsername.trim() === currentUsername) {
//         newErrors.newUsername =
//           "New username must be different from current username";
//       }

//       if (!formData.newPassword.trim()) {
//         newErrors.newPassword = "Password is required for temporary users";
//       } else if (formData.newPassword.length < 6) {
//         newErrors.newPassword = "Password must be at least 6 characters";
//       }

//       if (!formData.confirmPassword.trim()) {
//         newErrors.confirmPassword = "Confirm password is required";
//       } else if (formData.newPassword !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//     } else {
//       if (!isUsernameChanging && !isPasswordChanging) {
//         newErrors.general =
//           "No changes detected. Please update username or password.";
//       }

//       if (isUsernameChanging) {
//         if (!formData.newUsername.trim()) {
//           newErrors.newUsername = "Username cannot be empty";
//         } else if (!/^[A-Za-z0-9.]+$/.test(formData.newUsername)) {
//           newErrors.newUsername =
//             "Username can only contain letters, numbers, and dots";
//         }
//       }

//       if (isPasswordChanging) {
//         if (!formData.oldPassword.trim()) {
//           newErrors.oldPassword =
//             "Current password is required to change password";
//         }

//         if (!formData.newPassword.trim()) {
//           newErrors.newPassword = "New password is required";
//         } else if (formData.newPassword.length < 6) {
//           newErrors.newPassword = "Password must be at least 6 characters";
//         }

//         if (!formData.confirmPassword.trim()) {
//           newErrors.confirmPassword = "Confirm password is required";
//         } else if (formData.newPassword !== formData.confirmPassword) {
//           newErrors.confirmPassword = "Passwords do not match";
//         }
//       }
//     }

//     if (
//       formData.newUsername.trim() &&
//       !/^[A-Za-z0-9.]+$/.test(formData.newUsername)
//     ) {
//       newErrors.newUsername =
//         "Username can only contain letters, numbers, and dots";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleUpdateCredentials = async () => {
//     if (!validateCredentials()) return;

//     try {
//       setLoading(true);
//       setErrors({});
//       setSuccess("");

//       const currentUsername = profile?.username;
//       const isUsernameChanged = formData.newUsername.trim() !== currentUsername;
//       const isPasswordProvided = formData.newPassword.trim() !== "";

//       const updatePayload = {};

//       if (isUsernameChanged) {
//         updatePayload.newUsername = formData.newUsername;
//       }

//       if (isPasswordProvided) {
//         updatePayload.newPassword = formData.newPassword;
//         if (!profile?.isTemporary) {
//           updatePayload.oldPassword = formData.oldPassword;
//         }
//       }

//       if (Object.keys(updatePayload).length === 0) {
//         setErrors({ general: "No changes detected to update." });
//         setLoading(false);
//         return;
//       }

//       await userService.changeCredentials(
//         profile.userId,
//         profile.userType,
//         updatePayload
//       );

//       setSuccess(
//         "Your credentials have been updated successfully! For security reasons, you will be logged out. Please log in again with your new details."
//       );

//       setTimeout(() => {
//         if (!isLoggingOutRef.current) {
//           isLoggingOutRef.current = true;
//           logout();
//         }
//       }, 3000);
//     } catch (error) {
//       console.error("Error updating credentials:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data ||
//         "Failed to update credentials. Please try again.";

//       if (error.response?.status === 409) {
//         setErrors({ newUsername: errorMessage });
//       } else if (errorMessage.includes("Invalid old password")) {
//         setErrors({ oldPassword: errorMessage });
//       } else {
//         setErrors({ general: errorMessage });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setActiveTab("view");
//     setFormData({
//       newUsername: profile?.username || "",
//       newPassword: "",
//       confirmPassword: "",
//       oldPassword: "",
//     });
//     setErrors({});
//     setSuccess("");
//   };

//   if (loading && !profile) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow-md p-8 flex items-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-4"></div>
//           <span className="text-lg font-medium text-gray-700">
//             Loading profile...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   if (!profile && errors.general && !loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">
//               Profile Management
//             </h1>
//             <p className="text-gray-600">
//               Manage your account details and security settings
//             </p>
//           </div>
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-red-400" />
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{errors.general}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!user && !loading) {
//     if (!isLoggingOutRef.current) {
//       isLoggingOutRef.current = true;
//       logout();
//     }
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-100">
//           <div className="flex items-start justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
//                 <User className="w-6 h-6 mr-2 text-blue-600" />
//                 Profile Management
//               </h1>
//               <p className="text-gray-600">
//                 Manage your account details and security settings
//               </p>
//             </div>
//             {profile?.isTemporary ? (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
//                 <AlertTriangle className="w-4 h-4 mr-1" />
//                 TEMPORARY ACCOUNT
//               </span>
//             ) : (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                 <Shield className="w-4 h-4 mr-1" />
//                 PERMANENT ACCOUNT
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Success Message */}
//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
//             <div className="flex items-center">
//               <CheckCircle className="h-5 w-5 text-green-400" />
//               <div className="ml-3">
//                 <p className="text-sm text-green-700">{success}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Error Message */}
//         {errors.general && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-red-400" />
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{errors.general}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Profile Overview Card */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
//           <div className="flex items-center space-x-6">
//             <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
//               {profile?.firstName?.charAt(0)}
//               {profile?.lastName?.charAt(0)}
//             </div>
//             <div className="flex-1">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {profile?.firstName} {profile?.lastName}
//               </h2>
//               <p className="text-gray-600 mb-2 flex items-center">
//                 <User className="w-4 h-4 mr-1 text-gray-400" />@
//                 {profile?.username}
//                 {profile?.isTemporary && (
//                   <span className="ml-2 text-xs text-gray-500">
//                     (Temporary)
//                   </span>
//                 )}
//               </p>
//               <div className="flex flex-wrap items-center gap-2">
//                 <div className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
//                   {profile?.userType === "INTERNAL" ? (
//                     <Shield className="w-4 h-4 text-blue-600 mr-1" />
//                   ) : (
//                     <Building className="w-4 h-4 text-green-600 mr-1" />
//                   )}
//                   <span className="text-xs font-medium text-gray-700">
//                     {profile?.userType} USER
//                   </span>
//                 </div>
//                 <div className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
//                   <Mail className="w-4 h-4 text-purple-600 mr-1" />
//                   <span className="text-xs font-medium text-gray-700">
//                     {profile?.email}
//                   </span>
//                 </div>
//                 <div className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
//                   <UserCheck className="w-4 h-4 text-amber-600 mr-1" />
//                   <span className="text-xs font-medium text-gray-700">
//                     {profile?.roleName || "No Role Assigned"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
//           {/* Tab Navigation */}
//           <div className="border-b border-gray-200 bg-gray-50">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveTab("view")}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center ${
//                   activeTab === "view"
//                     ? "border-blue-500 text-blue-600 bg-white"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <User className="w-4 h-4 mr-2" />
//                 View Profile
//               </button>
//               <button
//                 onClick={() => setActiveTab("change-credentials")}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center ${
//                   activeTab === "change-credentials"
//                     ? "border-blue-500 text-blue-600 bg-white"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <Key className="w-4 h-4 mr-2" />
//                 Change Credentials
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {/* View Profile Tab */}
//             {activeTab === "view" && (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                   Profile Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name
//                     </label>
//                     <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
//                       {profile?.firstName}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name
//                     </label>
//                     <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
//                       {profile?.lastName}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email Address
//                     </label>
//                     <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
//                       {profile?.email}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Username
//                     </label>
//                     <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
//                       {profile?.username}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Change Credentials Tab */}
//             {activeTab === "change-credentials" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//                     <Key className="w-5 h-5 mr-2 text-blue-600" />
//                     Change Credentials
//                   </h3>
//                 </div>

//                 {/* Temporary User Specific Instructions */}
//                 {profile?.isTemporary ? (
//                   <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
//                     <div className="flex items-start">
//                       <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
//                       <div className="ml-3">
//                         <h4 className="text-sm font-medium text-amber-800 mb-1">
//                           Temporary Account Requirements
//                         </h4>
//                         <ul className="text-sm text-amber-700 space-y-1 list-disc pl-4">
//                           <li>
//                             <strong>You must set permanent credentials</strong>{" "}
//                             to continue using the system
//                           </li>
//                           <li>
//                             <strong>New username must be different</strong> from
//                             the system-generated one
//                           </li>
//                           <li>
//                             <strong>
//                               Password must be at least 6 characters
//                             </strong>{" "}
//                             long
//                           </li>
//                           <li>
//                             After updating, you'll be logged out automatically
//                             to apply changes
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   /* Permanent User Instructions */
//                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
//                     <div className="flex items-start">
//                       <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
//                       <div className="ml-3">
//                         <h4 className="text-sm font-medium text-blue-800 mb-1">
//                           Update Instructions
//                         </h4>
//                         <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
//                           <li>
//                             <strong>Change username only:</strong> Enter new
//                             username (leave password fields blank)
//                           </li>
//                           <li>
//                             <strong>Change password only:</strong> Enter current
//                             password and new password (keep username as is)
//                           </li>
//                           <li>
//                             <strong>Change both:</strong> Enter new username,
//                             current password, and new password
//                           </li>
//                           <li>
//                             After updating credentials, you'll be logged out
//                             automatically
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Form Fields */}
//                 <div className="space-y-4 mt-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Username
//                       {profile?.isTemporary && (
//                         <span className="text-red-500 ml-1">*</span>
//                       )}
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         name="newUsername"
//                         value={formData.newUsername}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-2 border ${
//                           errors.newUsername
//                             ? "border-red-300"
//                             : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                         placeholder={
//                           profile?.isTemporary
//                             ? "Choose a permanent username"
//                             : "Enter new username"
//                         }
//                       />
//                       {profile?.isTemporary && (
//                         <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                             Required
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     {errors.newUsername && (
//                       <div className="flex items-center mt-1 text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.newUsername}
//                       </div>
//                     )}
//                   </div>

//                   {/* Old Password Field (only for permanent users) */}
//                   {!profile?.isTemporary && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Current Password
//                         {formData.newPassword && (
//                           <span className="text-red-500 ml-1">*</span>
//                         )}
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showOldPassword ? "text" : "password"}
//                           name="oldPassword"
//                           value={formData.oldPassword}
//                           onChange={handleInputChange}
//                           className={`w-full px-4 py-2 border ${
//                             errors.oldPassword
//                               ? "border-red-300"
//                               : "border-gray-300"
//                           } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                           placeholder="Enter current password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowOldPassword(!showOldPassword)}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showOldPassword ? (
//                             <EyeOff className="w-5 h-5" />
//                           ) : (
//                             <Eye className="w-5 h-5" />
//                           )}
//                         </button>
//                       </div>
//                       {errors.oldPassword && (
//                         <div className="flex items-center mt-1 text-red-600 text-sm">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.oldPassword}
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* New Password Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Password
//                       {profile?.isTemporary && (
//                         <span className="text-red-500 ml-1">*</span>
//                       )}
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showNewPassword ? "text" : "password"}
//                         name="newPassword"
//                         value={formData.newPassword}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-2 border ${
//                           errors.newPassword
//                             ? "border-red-300"
//                             : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                         placeholder={
//                           profile?.isTemporary
//                             ? "Choose a permanent password"
//                             : "Enter new password"
//                         }
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowNewPassword(!showNewPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showNewPassword ? (
//                           <EyeOff className="w-5 h-5" />
//                         ) : (
//                           <Eye className="w-5 h-5" />
//                         )}
//                       </button>
//                       {profile?.isTemporary && (
//                         <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
//                           <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
//                             Required
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                     {errors.newPassword && (
//                       <div className="flex items-center mt-1 text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.newPassword}
//                       </div>
//                     )}
//                   </div>

//                   {/* Confirm Password Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm New Password
//                       {profile?.isTemporary && (
//                         <span className="text-red-500 ml-1">*</span>
//                       )}
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-2 border ${
//                           errors.confirmPassword
//                             ? "border-red-300"
//                             : "border-gray-300"
//                         } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                         placeholder="Confirm new password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setShowConfirmPassword(!showConfirmPassword)
//                         }
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showConfirmPassword ? (
//                           <EyeOff className="w-5 h-5" />
//                         ) : (
//                           <Eye className="w-5 h-5" />
//                         )}
//                       </button>
//                     </div>
//                     {errors.confirmPassword && (
//                       <div className="flex items-center mt-1 text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.confirmPassword}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 pt-6">
//                   <button
//                     onClick={handleCancel}
//                     disabled={loading || profile?.isTemporary}
//                     className={`flex-1 border ${
//                       profile?.isTemporary
//                         ? "border-gray-300 text-gray-500 cursor-not-allowed"
//                         : "border-gray-300 text-gray-700 hover:bg-gray-50"
//                     } py-2 rounded-md transition-colors`}
//                   >
//                     {profile?.isTemporary ? "Not Allowed" : "Cancel"}
//                   </button>
//                   <button
//                     onClick={handleUpdateCredentials}
//                     disabled={loading}
//                     className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-md hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all shadow-md"
//                   >
//                     {loading
//                       ? "Updating..."
//                       : profile?.isTemporary
//                       ? "Set Permanent Credentials"
//                       : "Update Credentials"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  User,
  Mail,
  Building,
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  UserCheck,
  Key,
  CheckCircle,
  Info,
  AlertTriangle,
} from "lucide-react";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("view");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [formData, setFormData] = useState({
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const isLoggingOutRef = useRef(false);

  useEffect(() => {
    if (!user) {
      if (!isLoggingOutRef.current) {
        isLoggingOutRef.current = true;
        navigate("/login");
      }
      return;
    }
    loadProfile();
  }, [user, navigate]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getCurrentUserProfile();
      setProfile(response.data);
      setFormData({
        newUsername: response.data.username || "",
        newPassword: "",
        confirmPassword: "",
        oldPassword: "",
      });
      setErrors({});
      setSuccess("");
    } catch (error) {
      console.error("Error loading profile:", error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        setErrors({
          general: "Session expired or unauthorized. Please log in again.",
        });
        if (!isLoggingOutRef.current) {
          isLoggingOutRef.current = true;
          logout();
        }
      } else {
        setErrors({
          general: "Failed to load profile information.",
        });
      }
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

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setSuccess("");
    setErrors((prev) => ({
      ...prev,
      general: "",
    }));
  };

  const validateCredentials = () => {
    const newErrors = {};
    const currentUsername = profile?.username;
    const isTemporary = profile?.isTemporary;

    const isUsernameChanging =
      formData.newUsername.trim() !== "" &&
      formData.newUsername.trim() !== currentUsername;
    const isPasswordChanging =
      formData.newPassword.trim() !== "" ||
      formData.confirmPassword.trim() !== "";

    if (isTemporary) {
      if (!formData.newUsername.trim()) {
        newErrors.newUsername = "Username is required for temporary users";
      } else if (formData.newUsername.trim() === currentUsername) {
        newErrors.newUsername =
          "New username must be different from current username";
      }

      if (!formData.newPassword.trim()) {
        newErrors.newPassword = "Password is required for temporary users";
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = "Password must be at least 6 characters";
      }

      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else {
      if (!isUsernameChanging && !isPasswordChanging) {
        newErrors.general =
          "No changes detected. Please update username or password.";
      }

      if (isUsernameChanging) {
        if (!formData.newUsername.trim()) {
          newErrors.newUsername = "Username cannot be empty";
        } else if (!/^[A-Za-z0-9.]+$/.test(formData.newUsername)) {
          newErrors.newUsername =
            "Username can only contain letters, numbers, and dots";
        }
      }

      if (isPasswordChanging) {
        if (!formData.oldPassword.trim()) {
          newErrors.oldPassword =
            "Current password is required to change password";
        }

        if (!formData.newPassword.trim()) {
          newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 6) {
          newErrors.newPassword = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword.trim()) {
          newErrors.confirmPassword = "Confirm password is required";
        } else if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
      }
    }

    if (
      formData.newUsername.trim() &&
      !/^[A-Za-z0-9.]+$/.test(formData.newUsername)
    ) {
      newErrors.newUsername =
        "Username can only contain letters, numbers, and dots";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateCredentials = async () => {
    if (!validateCredentials()) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      const currentUsername = profile?.username;
      const isUsernameChanged = formData.newUsername.trim() !== currentUsername;
      const isPasswordProvided = formData.newPassword.trim() !== "";

      const updatePayload = {};

      if (isUsernameChanged) {
        updatePayload.newUsername = formData.newUsername;
      }

      if (isPasswordProvided) {
        updatePayload.newPassword = formData.newPassword;
        if (!profile?.isTemporary) {
          updatePayload.oldPassword = formData.oldPassword;
        }
      }

      if (Object.keys(updatePayload).length === 0) {
        setErrors({ general: "No changes detected to update." });
        setLoading(false);
        return;
      }

      await userService.changeCredentials(
        profile.userId,
        profile.userType,
        updatePayload
      );

      setSuccess(
        "Your credentials have been updated successfully! For security reasons, you will be logged out. Please log in again with your new details."
      );

      setTimeout(() => {
        if (!isLoggingOutRef.current) {
          isLoggingOutRef.current = true;
          logout();
        }
      }, 3000);
    } catch (error) {
      console.error("Error updating credentials:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to update credentials. Please try again.";

      if (error.response?.status === 409) {
        setErrors({ newUsername: errorMessage });
      } else if (errorMessage.includes("Invalid old password")) {
        setErrors({ oldPassword: errorMessage });
      } else {
        setErrors({ general: errorMessage });
      }
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
      oldPassword: "",
    });
    setErrors({});
    setSuccess("");
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-4"></div>
          <span className="text-lg font-medium text-gray-700">
            Loading profile...
          </span>
        </div>
      </div>
    );
  }

  if (!profile && errors.general && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Profile Management
            </h1>
            <p className="text-gray-600">
              Manage your account details and security settings
            </p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    if (!isLoggingOutRef.current) {
      isLoggingOutRef.current = true;
      logout();
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-100">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                Profile Management
              </h1>
              <p className="text-gray-600">
                Manage your account details and security settings
              </p>
            </div>
            {profile?.isTemporary ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <AlertTriangle className="w-4 h-4 mr-1" />
                TEMPORARY ACCOUNT
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Shield className="w-4 h-4 mr-1" />
                PERMANENT ACCOUNT
              </span>
            )}
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Overview Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center space-x-6">
            {profile?.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-20 h-20 rounded-full object-cover shadow-md"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className={`w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md ${
                profile?.profileImageUrl ? "hidden" : "flex"
              }`}
            >
              {profile?.firstName?.charAt(0)}
              {profile?.lastName?.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <p className="text-gray-600 mb-2 flex items-center">
                <User className="w-4 h-4 mr-1 text-gray-400" />@
                {profile?.username}
                {profile?.isTemporary && (
                  <span className="ml-2 text-xs text-gray-500">
                    (Temporary)
                  </span>
                )}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
                  {profile?.userType === "INTERNAL" ? (
                    <Shield className="w-4 h-4 text-blue-600 mr-1" />
                  ) : (
                    <Building className="w-4 h-4 text-green-600 mr-1" />
                  )}
                  <span className="text-xs font-medium text-gray-700">
                    {profile?.userType} USER
                  </span>
                </div>
                <div className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
                  <Mail className="w-4 h-4 text-purple-600 mr-1" />
                  <span className="text-xs font-medium text-gray-700">
                    {profile?.email}
                  </span>
                </div>
                <div className="flex items-center px-2 py-1 bg-gray-100 rounded-md">
                  <UserCheck className="w-4 h-4 text-amber-600 mr-1" />
                  <span className="text-xs font-medium text-gray-700">
                    {profile?.roleName || "No Role Assigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("view")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === "view"
                    ? "border-blue-500 text-blue-600 bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                View Profile
              </button>
              <button
                onClick={() => setActiveTab("change-credentials")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === "change-credentials"
                    ? "border-blue-500 text-blue-600 bg-white"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Key className="w-4 h-4 mr-2" />
                Change Credentials
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* View Profile Tab */}
            {activeTab === "view" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Profile Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                      {profile?.firstName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                      {profile?.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                      {profile?.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-md">
                      {profile?.username}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Change Credentials Tab */}
            {activeTab === "change-credentials" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Key className="w-5 h-5 mr-2 text-blue-600" />
                    Change Credentials
                  </h3>
                </div>

                {/* Temporary User Specific Instructions */}
                {profile?.isTemporary ? (
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-800 mb-1">
                          Temporary Account Requirements
                        </h4>
                        <ul className="text-sm text-amber-700 space-y-1 list-disc pl-4">
                          <li>
                            <strong>You must set permanent credentials</strong>{" "}
                            to continue using the system
                          </li>
                          <li>
                            <strong>New username must be different</strong> from
                            the system-generated one
                          </li>
                          <li>
                            <strong>
                              Password must be at least 6 characters
                            </strong>{" "}
                            long
                          </li>
                          <li>
                            After updating, you'll be logged out automatically
                            to apply changes
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Permanent User Instructions */
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-blue-800 mb-1">
                          Update Instructions
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
                          <li>
                            <strong>Change username only:</strong> Enter new
                            username (leave password fields blank)
                          </li>
                          <li>
                            <strong>Change password only:</strong> Enter current
                            password and new password (keep username as is)
                          </li>
                          <li>
                            <strong>Change both:</strong> Enter new username,
                            current password, and new password
                          </li>
                          <li>
                            After updating credentials, you'll be logged out
                            automatically
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Username
                      {profile?.isTemporary && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="newUsername"
                        value={formData.newUsername}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          errors.newUsername
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder={
                          profile?.isTemporary
                            ? "Choose a permanent username"
                            : "Enter new username"
                        }
                      />
                      {profile?.isTemporary && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Required
                          </span>
                        </div>
                      )}
                    </div>
                    {errors.newUsername && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.newUsername}
                      </div>
                    )}
                  </div>

                  {/* Old Password Field (only for permanent users) */}
                  {!profile?.isTemporary && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                        {formData.newPassword && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type={showOldPassword ? "text" : "password"}
                          name="oldPassword"
                          value={formData.oldPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border ${
                            errors.oldPassword
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showOldPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {errors.oldPassword && (
                        <div className="flex items-center mt-1 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.oldPassword}
                        </div>
                      )}
                    </div>
                  )}

                  {/* New Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                      {profile?.isTemporary && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          errors.newPassword
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder={
                          profile?.isTemporary
                            ? "Choose a permanent password"
                            : "Enter new password"
                        }
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
                      {profile?.isTemporary && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Required
                          </span>
                        </div>
                      )}
                    </div>
                    {errors.newPassword && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.newPassword}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                      {profile?.isTemporary && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          errors.confirmPassword
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
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
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleCancel}
                    disabled={loading || profile?.isTemporary}
                    className={`flex-1 border ${
                      profile?.isTemporary
                        ? "border-gray-300 text-gray-500 cursor-not-allowed"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    } py-2 rounded-md transition-colors`}
                  >
                    {profile?.isTemporary ? "Not Allowed" : "Cancel"}
                  </button>
                  <button
                    onClick={handleUpdateCredentials}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-md hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all shadow-md"
                  >
                    {loading
                      ? "Updating..."
                      : profile?.isTemporary
                      ? "Set Permanent Credentials"
                      : "Update Credentials"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
