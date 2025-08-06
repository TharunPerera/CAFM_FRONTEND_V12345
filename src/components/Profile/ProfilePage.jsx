// "use client";

// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import {
//   User,
//   Mail,
//   Building,
//   Shield,
//   X,
//   Eye,
//   EyeOff,
//   AlertCircle,
//   UserCheck,
//   Key,
// } from "lucide-react";
// import { userService } from "../../services/userService";

// const ProfilePage = () => {
//   const { user } = useContext(AuthContext);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("view"); // view, change-credentials
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     newUsername: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const loadProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await userService.getCurrentUserProfile();
//       setProfile(response.data);
//       setFormData({
//         newUsername: response.data.username || "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.error("Error loading profile:", error);
//       setErrors({ general: "Failed to load profile information" });
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
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const validateCredentials = () => {
//     const newErrors = {};
//     if (!formData.newUsername.trim()) {
//       newErrors.newUsername = "Username is required";
//     }
//     if (!formData.newPassword) {
//       newErrors.newPassword = "New password is required";
//     } else if (formData.newPassword.length < 6) {
//       newErrors.newPassword = "Password must be at least 6 characters";
//     }
//     if (formData.newPassword !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleUpdateCredentials = async () => {
//     if (!validateCredentials()) return;

//     try {
//       setLoading(true);
//       // Use the correct endpoint: PUT /api/users/{id}/credentials/{userType}
//       await userService.changeCredentials(profile.userId, profile.userType, {
//         newUsername: formData.newUsername,
//         newPassword: formData.newPassword,
//       });

//       setSuccess("Username and password updated successfully!");
//       setActiveTab("view");
//       setFormData((prev) => ({
//         ...prev,
//         newPassword: "",
//         confirmPassword: "",
//       }));
//       await loadProfile();
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (error) {
//       console.error("Error updating credentials:", error);
//       setErrors({
//         general:
//           error.response?.data?.message || "Failed to update credentials",
//       });
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
//     });
//     setErrors({});
//   };

//   if (loading && !profile) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center justify-center py-16">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading profile...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
//             <User className="w-10 h-10 text-blue-600" />
//             Profile Management
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Manage your account details and security settings
//           </p>
//         </div>

//         {/* Success Message */}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
//             <UserCheck className="w-5 h-5" />
//             {success}
//           </div>
//         )}

//         {/* Error Message */}
//         {errors.general && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
//             <AlertCircle className="w-5 h-5" />
//             {errors.general}
//           </div>
//         )}

//         {/* Temporary User Warning */}
//         {profile?.isTemporary && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
//             <AlertCircle className="w-5 h-5" />
//             <div>
//               <p className="font-medium">Temporary Account</p>
//               <p className="text-sm">
//                 Please update your username and password to secure your account.
//               </p>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Profile Overview Card */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
//                     <span className="text-white font-bold text-3xl">
//                       {profile?.firstName?.charAt(0)}
//                       {profile?.lastName?.charAt(0)}
//                     </span>
//                   </div>
//                   <h2 className="text-2xl font-bold">
//                     {profile?.firstName} {profile?.lastName}
//                   </h2>
//                   <p className="text-blue-100">@{profile?.username}</p>
//                   <div className="flex items-center gap-2 mt-3">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
//                       {profile?.userType === "INTERNAL" ? (
//                         <Shield className="w-3 h-3 mr-1" />
//                       ) : (
//                         <Building className="w-3 h-3 mr-1" />
//                       )}
//                       {profile?.userType} USER
//                     </span>
//                     {profile?.isTemporary && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
//                         TEMPORARY
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 text-gray-400" />
//                   <span className="text-gray-700">{profile?.email}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Shield className="w-5 h-5 text-gray-400" />
//                   <span className="text-gray-700">
//                     {profile?.roleName || "No Role Assigned"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//               {/* Tab Navigation */}
//               <div className="border-b border-gray-200">
//                 <nav className="flex">
//                   <button
//                     onClick={() => setActiveTab("view")}
//                     className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                       activeTab === "view"
//                         ? "border-blue-500 text-blue-600 bg-blue-50"
//                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                     }`}
//                   >
//                     <User className="w-4 h-4 inline mr-2" />
//                     View Profile
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("change-credentials")}
//                     className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                       activeTab === "change-credentials"
//                         ? "border-blue-500 text-blue-600 bg-blue-50"
//                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                     }`}
//                   >
//                     <Key className="w-4 h-4 inline mr-2" />
//                     Change Username & Password
//                   </button>
//                 </nav>
//               </div>

//               {/* Tab Content */}
//               <div className="p-8">
//                 {/* View Profile Tab */}
//                 {activeTab === "view" && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                       Profile Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             First Name
//                           </label>
//                           <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
//                             {profile?.firstName}
//                           </p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Last Name
//                           </label>
//                           <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
//                             {profile?.lastName}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Email Address
//                           </label>
//                           <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
//                             {profile?.email}
//                           </p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Username
//                           </label>
//                           <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
//                             {profile?.username}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Change Credentials Tab */}
//                 {activeTab === "change-credentials" && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                       Change Username & Password
//                     </h3>
//                     <div className="max-w-md space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           New Username
//                         </label>
//                         <input
//                           type="text"
//                           name="newUsername"
//                           value={formData.newUsername}
//                           onChange={handleInputChange}
//                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                             errors.newUsername
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                           placeholder="Enter new username"
//                         />
//                         {errors.newUsername && (
//                           <p className="text-red-500 text-sm mt-1">
//                             {errors.newUsername}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           New Password
//                         </label>
//                         <div className="relative">
//                           <input
//                             type={showNewPassword ? "text" : "password"}
//                             name="newPassword"
//                             value={formData.newPassword}
//                             onChange={handleInputChange}
//                             className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                               errors.newPassword
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             }`}
//                             placeholder="Enter new password"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                           >
//                             {showNewPassword ? (
//                               <EyeOff className="w-5 h-5" />
//                             ) : (
//                               <Eye className="w-5 h-5" />
//                             )}
//                           </button>
//                         </div>
//                         {errors.newPassword && (
//                           <p className="text-red-500 text-sm mt-1">
//                             {errors.newPassword}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Confirm New Password
//                         </label>
//                         <div className="relative">
//                           <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                               errors.confirmPassword
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             }`}
//                             placeholder="Confirm new password"
//                           />
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setShowConfirmPassword(!showConfirmPassword)
//                             }
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                           >
//                             {showConfirmPassword ? (
//                               <EyeOff className="w-5 h-5" />
//                             ) : (
//                               <Eye className="w-5 h-5" />
//                             )}
//                           </button>
//                         </div>
//                         {errors.confirmPassword && (
//                           <p className="text-red-500 text-sm mt-1">
//                             {errors.confirmPassword}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex gap-4 pt-6">
//                       <button
//                         onClick={handleCancel}
//                         className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                         disabled={loading}
//                       >
//                         <X className="w-4 h-4 inline mr-2" />
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleUpdateCredentials}
//                         className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                         disabled={loading}
//                       >
//                         <Key className="w-4 h-4 inline mr-2" />
//                         {loading ? "Updating..." : "Update Credentials"}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// "use client";

// import { useState, useEffect, useContext, useRef } from "react"; // Import useRef
// import { AuthContext } from "../../context/AuthContext";
// import {
//   User,
//   Mail,
//   Building,
//   Shield,
//   X,
//   Eye,
//   EyeOff,
//   AlertCircle,
//   UserCheck,
//   Key,
// } from "lucide-react";
// import { userService } from "../../services/userService";
// import { useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom

// const ProfilePage = () => {
//   const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
//   const navigate = useNavigate(); // For programmatic navigation

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("view");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     newUsername: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");

//   // Use a ref to prevent multiple redirects if logout is called multiple times
//   const isLoggingOutRef = useRef(false);

//   useEffect(() => {
//     // Check if user is null from AuthContext. If so, redirect to login.
//     // This handles cases where the token might have expired or been removed
//     // while the user was on another page and then navigated to profile.
//     if (!user) {
//       if (!isLoggingOutRef.current) {
//         isLoggingOutRef.current = true;
//         navigate("/login");
//       }
//       return; // Stop execution if no user
//     }
//     loadProfile();
//   }, [user, navigate]); // Depend on 'user' and 'navigate'

//   const loadProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await userService.getCurrentUserProfile();
//       setProfile(response.data);
//       // Initialize newUsername with current username when profile loads
//       setFormData({
//         newUsername: response.data.username || "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//       setErrors({}); // Clear any previous errors on successful load
//       setSuccess(""); // Clear any previous success messages
//     } catch (error) {
//       console.error("Error loading profile:", error);
//       // If 403 on profile load, it might mean the session is expired or invalid.
//       // Or the user doesn't have permission to /users/me
//       if (error.response?.status === 403 || error.response?.status === 401) {
//         setErrors({
//           general: "Session expired or unauthorized. Please log in again.",
//         });
//         if (!isLoggingOutRef.current) {
//           isLoggingOutRef.current = true;
//           console.warn(
//             "Unauthorized/Forbidden on /users/me. Forcing logout and redirect to login."
//           );
//           logout(); // This should handle clearing state and navigation to /login
//         }
//       } else {
//         setErrors({ general: "Failed to load profile information." });
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
//     // Clear specific field error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//     // Clear general success/error messages on any input change
//     setSuccess("");
//     setErrors((prev) => ({ ...prev, general: "" }));
//   };

//   const validateCredentials = () => {
//     const newErrors = {};
//     const currentUsername = profile?.username;

//     // Determine if the user intends to change username or password
//     const isUsernameChanging =
//       formData.newUsername.trim() !== "" &&
//       formData.newUsername.trim() !== currentUsername;
//     const isPasswordChanging =
//       formData.newPassword.trim() !== "" ||
//       formData.confirmPassword.trim() !== "";

//     if (!isUsernameChanging && !isPasswordChanging) {
//       newErrors.general =
//         "No changes detected. Please update username or password.";
//     }

//     // Validate username if it's being changed or is explicitly provided
//     if (formData.newUsername.trim() === "") {
//       newErrors.newUsername = "Username cannot be empty.";
//     } else if (
//       isUsernameChanging &&
//       formData.newUsername.trim() === currentUsername
//     ) {
//       // This case should ideally be caught by isUsernameChanging, but as a double check
//       newErrors.newUsername =
//         "New username cannot be the same as the current username.";
//     }

//     // Validate password fields ONLY if the user has started to fill them
//     if (isPasswordChanging) {
//       if (!formData.newPassword) {
//         newErrors.newPassword =
//           "New password is required if you intend to change it.";
//       } else if (formData.newPassword.length < 6) {
//         newErrors.newPassword = "Password must be at least 6 characters.";
//       }

//       if (!formData.confirmPassword) {
//         newErrors.confirmPassword =
//           "Confirm password is required if you intend to change it.";
//       } else if (formData.newPassword !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match.";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleUpdateCredentials = async () => {
//     if (!validateCredentials()) return;

//     try {
//       setLoading(true);
//       setErrors({}); // Clear previous errors
//       setSuccess(""); // Clear previous success

//       const currentUsername = profile?.username;
//       const isUsernameChanged = formData.newUsername.trim() !== currentUsername;
//       const isPasswordProvided = formData.newPassword.trim() !== "";

//       // Construct payload based on what's actually changed
//       const updatePayload = {};
//       if (isUsernameChanged) {
//         updatePayload.newUsername = formData.newUsername;
//       }
//       if (isPasswordProvided) {
//         updatePayload.newPassword = formData.newPassword;
//       }

//       // If no changes were detected by the payload construction, but validation passed
//       // (e.g., if user types current username and clears password, but validation still flags it as no change)
//       // This is a safety check; validateCredentials should catch this mostly.
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

//       // IMPORTANT: Force re-login after credentials change
//       // This invalidates the old token and requires a fresh one.
//       setTimeout(() => {
//         if (!isLoggingOutRef.current) {
//           // Prevent multiple logout calls
//           isLoggingOutRef.current = true;
//           logout(); // This will clear AuthContext state and navigate to /login
//         }
//       }, 3000); // Give user 3 seconds to read the message
//     } catch (error) {
//       console.error("Error updating credentials:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "Failed to update credentials. Please try again.";

//       // Handle specific backend errors (e.g., 409 Conflict for duplicate username)
//       if (error.response?.status === 409) {
//         setErrors({ newUsername: errorMessage }); // Assume backend sends "Username already exists"
//       } else {
//         setErrors({ general: errorMessage });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setActiveTab("view");
//     // Reset formData to current profile's username and empty passwords
//     setFormData({
//       newUsername: profile?.username || "",
//       newPassword: "",
//       confirmPassword: "",
//     });
//     setErrors({});
//     setSuccess("");
//   };

//   if (loading && !profile) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex items-center justify-center py-16">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading profile...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Handle case where profile loading failed and there's a general error
//   if (!profile && errors.general && !loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="max-w-6xl mx-auto space-y-8">
//           <div className="text-center space-y-4">
//             <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
//               <User className="w-10 h-10 text-blue-600" />
//               Profile Management
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Manage your account details and security settings
//             </p>
//           </div>
//           <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
//             <AlertCircle className="w-5 h-5" />
//             {errors.general}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If user context is null but not loading, and profile is null,
//   // it implies the user is not authenticated. Redirect to login.
//   // This is a last resort, as the useEffect should catch it.
//   if (!user && !loading) {
//     if (!isLoggingOutRef.current) {
//       isLoggingOutRef.current = true;
//       console.warn("User context is null. Forcing logout and redirect.");
//       logout(); // This handles navigation
//     }
//     return null; // Or a simple "Redirecting..." message
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
//             <User className="w-10 h-10 text-blue-600" />
//             Profile Management
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Manage your account details and security settings
//           </p>
//         </div>

//         {/* Success Message */}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
//             <UserCheck className="w-5 h-5" />
//             {success}
//           </div>
//         )}

//         {/* Error Message */}
//         {errors.general && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
//             <AlertCircle className="w-5 h-5" />
//             {errors.general}
//           </div>
//         )}

//         {/* Temporary User Warning */}
//         {profile?.isTemporary && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
//             <AlertCircle className="w-5 h-5" />
//             <div>
//               <p className="font-medium">Temporary Account</p>
//               <p className="text-sm">
//                 Please update your username and password to secure your account.
//               </p>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Profile Overview Card */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
//                     <span className="text-white font-bold text-3xl">
//                       {profile?.firstName?.charAt(0)}
//                       {profile?.lastName?.charAt(0)}
//                     </span>
//                   </div>
//                   <h2 className="text-2xl font-bold">
//                     {profile?.firstName} {profile?.lastName}
//                   </h2>
//                   <p className="text-blue-100">@{profile?.username}</p>
//                   <div className="flex items-center gap-2 mt-3">
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
//                       {profile?.userType === "INTERNAL" ? (
//                         <Shield className="w-3 h-3 mr-1" />
//                       ) : (
//                         <Building className="w-3 h-3 mr-1" />
//                       )}
//                       {profile?.userType} USER
//                     </span>
//                     {profile?.isTemporary && (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
//                         TEMPORARY
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6 space-y-4">
//                 <div className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 text-gray-400" />
//                   <span className="text-gray-700">{profile?.email}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Shield className="w-5 h-5 text-gray-400" />
//                   <span className="text-gray-700">
//                     {profile?.roleName || "No Role Assigned"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//               {/* Tab Navigation */}
//               <div className="border-b border-gray-200">
//                 <nav className="flex">
//                   <button
//                     onClick={() => setActiveTab("view")}
//                     className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                       activeTab === "view"
//                         ? "border-blue-500 text-blue-600 bg-blue-50"
//                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                     }`}
//                   >
//                     <User className="w-4 h-4 inline mr-2" />
//                     View Profile
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("change-credentials")}
//                     className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                       activeTab === "change-credentials"
//                         ? "border-blue-500 text-blue-600 bg-blue-50"
//                         : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                     }`}
//                   >
//                     <Key className="w-4 h-4 inline mr-2" />
//                     Change Username & Password
//                   </button>
//                 </nav>
//               </div>

//               {/* Tab Content */}
//               <div className="p-8">
//                 {/* View Profile Tab */}
//                 {activeTab === "view" && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                       Profile Information
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             First Name
//                           </label>
//                           <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
//                             {profile?.firstName}
//                           </p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Last Name
//                           </label>
//                           <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
//                             {profile?.lastName}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Email Address
//                           </label>
//                           <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
//                             {profile?.email}
//                           </p>
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Username
//                           </label>
//                           <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border">
//                             {profile?.username}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Change Credentials Tab */}
//                 {activeTab === "change-credentials" && (
//                   <div className="space-y-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-6">
//                       Change Username & Password
//                     </h3>
//                     <div className="max-w-md space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           New Username
//                         </label>
//                         <input
//                           type="text"
//                           name="newUsername"
//                           value={formData.newUsername}
//                           onChange={handleInputChange}
//                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                             errors.newUsername
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                           placeholder="Enter new username"
//                         />
//                         {errors.newUsername && (
//                           <p className="text-red-500 text-sm mt-1">
//                             {errors.newUsername}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           New Password
//                         </label>
//                         <div className="relative">
//                           <input
//                             type={showNewPassword ? "text" : "password"}
//                             name="newPassword"
//                             value={formData.newPassword}
//                             onChange={handleInputChange}
//                             className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                               errors.newPassword
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             }`}
//                             placeholder="New password"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                           >
//                             {showNewPassword ? (
//                               <EyeOff className="w-5 h-5" />
//                             ) : (
//                               <Eye className="w-5 h-5" />
//                             )}
//                           </button>
//                         </div>
//                         {errors.newPassword && (
//                           <p className="text-red-500 text-sm mt-1">
//                             {errors.newPassword}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Confirm New Password
//                         </label>
//                         <div className="relative">
//                           <input
//                             type={showConfirmPassword ? "text" : "password"}
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleInputChange}
//                             className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                               errors.confirmPassword
//                                 ? "border-red-500"
//                                 : "border-gray-300"
//                             }`}
//                             placeholder="Confirm new password"
//                           />
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setShowConfirmPassword(!showConfirmPassword)
//                             }
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                           >
//                             {showConfirmPassword ? (
//                               <EyeOff className="w-5 h-5" />
//                             ) : (
//                               <Eye className="w-5 h-5" />
//                             )}
//                           </button>
//                         </div>
//                         {errors.confirmPassword && (
//                           <p className="text-red-500 text-sm mt-1">
//                             {errors.confirmPassword}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     <div className="flex gap-4 pt-6">
//                       <button
//                         onClick={handleCancel}
//                         className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                         disabled={loading}
//                       >
//                         <X className="w-4 h-4 inline mr-2" />
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleUpdateCredentials}
//                         className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                         disabled={loading}
//                       >
//                         <Key className="w-4 h-4 inline mr-2" />
//                         {loading ? "Updating..." : "Update Credentials"}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

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

//     // For temporary users, both username and password are required
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
//       // For permanent users
//       if (!isUsernameChanging && !isPasswordChanging) {
//         newErrors.general =
//           "No changes detected. Please update username or password.";
//       }

//       // Validate username if changing
//       if (isUsernameChanging) {
//         if (!formData.newUsername.trim()) {
//           newErrors.newUsername = "Username cannot be empty";
//         } else if (!/^[A-Za-z0-9.]+$/.test(formData.newUsername)) {
//           newErrors.newUsername =
//             "Username can only contain letters, numbers, and dots";
//         }
//       }

//       // Validate password if changing
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

//     // Username format validation
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
//         // Only include old password for permanent users
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
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center">
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
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Profile Management
//             </h1>
//             <p className="text-gray-600">
//               Manage your account details and security settings
//             </p>
//           </div>
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
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
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Profile Management
//           </h1>
//           <p className="text-gray-600">
//             Manage your account details and security settings
//           </p>
//         </div>

//         {/* Success Message */}
//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-6">
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
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-6">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-red-400" />
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{errors.general}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Temporary User Warning */}
//         {profile?.isTemporary && (
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-yellow-400" />
//               <div className="ml-3">
//                 <p className="text-sm text-yellow-700 font-medium">
//                   Temporary Account
//                 </p>
//                 <p className="text-sm text-yellow-700">
//                   Please update your username and password to secure your
//                   account.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Profile Overview Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
//           <div className="flex items-center space-x-6">
//             <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
//               {profile?.firstName?.charAt(0)}
//               {profile?.lastName?.charAt(0)}
//             </div>
//             <div className="flex-1">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {profile?.firstName} {profile?.lastName}
//               </h2>
//               <p className="text-gray-600 mb-2">@{profile?.username}</p>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   {profile?.userType === "INTERNAL" ? (
//                     <Shield className="w-4 h-4 text-blue-600 mr-1" />
//                   ) : (
//                     <Building className="w-4 h-4 text-green-600 mr-1" />
//                   )}
//                   <span className="text-sm font-medium text-gray-700">
//                     {profile?.userType} USER
//                   </span>
//                 </div>
//                 {profile?.isTemporary && (
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                     TEMPORARY
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex items-center">
//               <Mail className="w-5 h-5 text-gray-400 mr-3" />
//               <span className="text-gray-700">{profile?.email}</span>
//             </div>
//             <div className="flex items-center">
//               <UserCheck className="w-5 h-5 text-gray-400 mr-3" />
//               <span className="text-gray-700">
//                 {profile?.roleName || "No Role Assigned"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           {/* Tab Navigation */}
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveTab("view")}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                   activeTab === "view"
//                     ? "border-blue-500 text-blue-600 bg-blue-50"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <User className="w-4 h-4 mr-2 inline" />
//                 View Profile
//               </button>
//               <button
//                 onClick={() => setActiveTab("change-credentials")}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                   activeTab === "change-credentials"
//                     ? "border-blue-500 text-blue-600 bg-blue-50"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <Key className="w-4 h-4 mr-2 inline" />
//                 Change Username & Password
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {/* View Profile Tab */}
//             {activeTab === "view" && (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Profile Information
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name
//                     </label>
//                     <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
//                       {profile?.firstName}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name
//                     </label>
//                     <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
//                       {profile?.lastName}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email Address
//                     </label>
//                     <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
//                       {profile?.email}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Username
//                     </label>
//                     <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
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
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Change Username & Password
//                   </h3>
//                   {profile?.isTemporary && (
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                       REQUIRED FOR TEMPORARY USERS
//                     </span>
//                   )}
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Username
//                     </label>
//                     <input
//                       type="text"
//                       name="newUsername"
//                       value={formData.newUsername}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                       placeholder="Enter new username"
//                     />
//                     {errors.newUsername && (
//                       <div className="flex items-center mt-2 text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.newUsername}
//                       </div>
//                     )}
//                   </div>

//                   {/* Show old password field only for permanent users when changing password */}
//                   {!profile?.isTemporary && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Current Password
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showOldPassword ? "text" : "password"}
//                           name="oldPassword"
//                           value={formData.oldPassword}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
//                         <div className="flex items-center mt-2 text-red-600 text-sm">
//                           <AlertCircle className="w-4 h-4 mr-1" />
//                           {errors.oldPassword}
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showNewPassword ? "text" : "password"}
//                         name="newPassword"
//                         value={formData.newPassword}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                         placeholder="Enter new password"
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
//                     </div>
//                     {errors.newPassword && (
//                       <div className="flex items-center mt-2 text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.newPassword}
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
//                       <div className="flex items-center mt-2 text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.confirmPassword}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-4 pt-6">
//                   <button
//                     onClick={handleCancel}
//                     className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateCredentials}
//                     disabled={loading}
//                     className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all"
//                   >
//                     {loading ? "Updating..." : "Update Credentials"}
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
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">
//             Profile Management
//           </h1>
//           <p className="text-gray-600">
//             Manage your account details and security settings
//           </p>
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

//         {/* Temporary User Warning */}
//         {profile?.isTemporary && (
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-yellow-400" />
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-yellow-700">
//                   Temporary Account - Action Required
//                 </p>
//                 <p className="text-sm text-yellow-700">
//                   You must set a permanent username and password to continue
//                   using the system.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Profile Overview Card */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <div className="flex items-center space-x-6">
//             <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
//               {profile?.firstName?.charAt(0)}
//               {profile?.lastName?.charAt(0)}
//             </div>
//             <div className="flex-1">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {profile?.firstName} {profile?.lastName}
//               </h2>
//               <p className="text-gray-600 mb-2">@{profile?.username}</p>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   {profile?.userType === "INTERNAL" ? (
//                     <Shield className="w-4 h-4 text-blue-600 mr-1" />
//                   ) : (
//                     <Building className="w-4 h-4 text-green-600 mr-1" />
//                   )}
//                   <span className="text-sm font-medium text-gray-700">
//                     {profile?.userType} USER
//                   </span>
//                 </div>
//                 {profile?.isTemporary && (
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                     TEMPORARY
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex items-center">
//               <Mail className="w-5 h-5 text-gray-400 mr-3" />
//               <span className="text-gray-700">{profile?.email}</span>
//             </div>
//             <div className="flex items-center">
//               <UserCheck className="w-5 h-5 text-gray-400 mr-3" />
//               <span className="text-gray-700">
//                 {profile?.roleName || "No Role Assigned"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {/* Tab Navigation */}
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveTab("view")}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                   activeTab === "view"
//                     ? "border-blue-500 text-blue-600 bg-blue-50"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <User className="w-4 h-4 mr-2 inline" />
//                 View Profile
//               </button>
//               <button
//                 onClick={() => setActiveTab("change-credentials")}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
//                   activeTab === "change-credentials"
//                     ? "border-blue-500 text-blue-600 bg-blue-50"
//                     : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//                 }`}
//               >
//                 <Key className="w-4 h-4 mr-2 inline" />
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
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Change Credentials
//                   </h3>
//                   {profile?.isTemporary && (
//                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                       REQUIRED ACTION
//                     </span>
//                   )}
//                 </div>

//                 {/* User Guidance */}
//                 {!profile?.isTemporary && (
//                   <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
//                     <div className="flex items-start">
//                       <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
//                       <div className="ml-3">
//                         <h4 className="text-sm font-medium text-blue-800 mb-1">
//                           Update Instructions
//                         </h4>
//                         <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
//                           <li>
//                             To change only your username: Enter a new username
//                             and click update (password fields can be left blank)
//                           </li>
//                           <li>
//                             To change only your password: Enter your current
//                             password and new password (username can be left as
//                             is)
//                           </li>
//                           <li>
//                             To change both: Enter new username, current
//                             password, and new password
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Username
//                     </label>
//                     <input
//                       type="text"
//                       name="newUsername"
//                       value={formData.newUsername}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter new username"
//                     />
//                     {errors.newUsername && (
//                       <div className="flex items-center mt-1 text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.newUsername}
//                       </div>
//                     )}
//                   </div>

//                   {/* Show old password field only for permanent users when changing password */}
//                   {!profile?.isTemporary && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Current Password
//                       </label>
//                       <div className="relative">
//                         <input
//                           type={showOldPassword ? "text" : "password"}
//                           name="oldPassword"
//                           value={formData.oldPassword}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showNewPassword ? "text" : "password"}
//                         name="newPassword"
//                         value={formData.newPassword}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Enter new password"
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
//                     </div>
//                     {errors.newPassword && (
//                       <div className="flex items-center mt-1 text-red-600 text-sm">
//                         <AlertCircle className="w-4 h-4 mr-1" />
//                         {errors.newPassword}
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Confirm New Password
//                     </label>
//                     <div className="relative">
//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

//                 <div className="flex gap-4 pt-6">
//                   <button
//                     onClick={handleCancel}
//                     className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleUpdateCredentials}
//                     disabled={loading}
//                     className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                   >
//                     {loading ? "Updating..." : "Update Credentials"}
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
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
