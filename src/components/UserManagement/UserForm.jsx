// // "use client";

// // import { useState, useEffect } from "react";
// // import {
// //   X,
// //   User,
// //   Mail,
// //   Building,
// //   Shield,
// //   Save,
// //   Eye,
// //   EyeOff,
// // } from "lucide-react";
// // import { userService } from "../../services/userService";
// // import { companyService } from "../../services/companyService";

// // const UserForm = ({ isOpen, onClose, user, onSuccess }) => {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     firstName: "",
// //     lastName: "",
// //     roleId: "",
// //     companyId: "",
// //     userType: "INTERNAL",
// //   });

// //   const [roles, setRoles] = useState([]);
// //   const [companies, setCompanies] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [generatedPassword, setGeneratedPassword] = useState("");

// //   const isEdit = !!user;

// //   useEffect(() => {
// //     if (isOpen) {
// //       loadRoles();
// //       loadCompanies();
// //       if (user) {
// //         setFormData({
// //           email: user.email || "",
// //           firstName: user.firstName || "",
// //           lastName: user.lastName || "",
// //           roleId: user.roleId || "",
// //           companyId: user.companyId || "",
// //           userType: user.userType || "INTERNAL",
// //         });
// //       } else {
// //         resetForm();
// //       }
// //     }
// //   }, [isOpen, user]);

// //   const loadRoles = async () => {
// //     try {
// //       const response = await userService.getAllRoles();
// //       setRoles(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading roles:", error);
// //     }
// //   };

// //   const loadCompanies = async () => {
// //     try {
// //       const response = await companyService.getAllCompanies();
// //       setCompanies(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading companies:", error);
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       email: "",
// //       firstName: "",
// //       lastName: "",
// //       roleId: "",
// //       companyId: "",
// //       userType: "INTERNAL",
// //     });
// //     setErrors({});
// //     setGeneratedPassword("");
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};

// //     if (!formData.email.trim()) {
// //       newErrors.email = "Email is required";
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = "Invalid email format";
// //     }

// //     if (!formData.firstName.trim()) {
// //       newErrors.firstName = "First name is required";
// //     }

// //     if (!formData.lastName.trim()) {
// //       newErrors.lastName = "Last name is required";
// //     }

// //     if (!formData.roleId) {
// //       newErrors.roleId = "Role is required";
// //     }

// //     if (formData.userType === "COMPANY" && !formData.companyId) {
// //       newErrors.companyId = "Company is required for company users";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     setLoading(true);
// //     try {
// //       let response;
// //       if (isEdit) {
// //         // Use the correct endpoint: PUT /api/users/{id}/{userType}
// //         const updateData = {
// //           email: formData.email,
// //           firstName: formData.firstName,
// //           lastName: formData.lastName,
// //           roleId: formData.roleId,
// //           companyId: formData.companyId,
// //           userType: formData.userType,
// //         };
// //         response = await userService.updateUser(
// //           user.userId,
// //           user.userType,
// //           updateData
// //         );
// //       } else {
// //         response = await userService.createUser(formData);
// //         if (response.data.generatedPassword) {
// //           setGeneratedPassword(response.data.generatedPassword);
// //         }
// //       }

// //       onSuccess();
// //       if (!isEdit) {
// //         // Show generated password for new users
// //         setShowPassword(true);
// //       } else {
// //         onClose();
// //       }
// //     } catch (error) {
// //       console.error("Error saving user:", error);
// //       setErrors({
// //         submit: error.response?.data?.message || "Failed to save user",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getFilteredRoles = () => {
// //     if (formData.userType === "INTERNAL") {
// //       return roles.filter((role) =>
// //         ["Super_Admin", "Supervisor", "Technician"].includes(role.roleName)
// //       );
// //     } else {
// //       return roles.filter((role) =>
// //         ["Client_Admin", "Tenant"].includes(role.roleName)
// //       );
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
// //                 <User className="w-6 h-6 text-white" />
// //               </div>
// //               <h2 className="text-2xl font-bold text-white">
// //                 {isEdit ? "Edit User" : "Create New User"}
// //               </h2>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
// //             >
// //               <X className="w-6 h-6 text-white" />
// //             </button>
// //           </div>
// //         </div>

// //         <form onSubmit={handleSubmit} className="p-6 space-y-6">
// //           {/* User Type Selection */}
// //           <div className="space-y-2">
// //             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //               <Shield className="w-4 h-4" />
// //               User Type *
// //             </label>
// //             <div className="grid grid-cols-2 gap-4">
// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setFormData((prev) => ({
// //                     ...prev,
// //                     userType: "INTERNAL",
// //                     companyId: "",
// //                   }))
// //                 }
// //                 className={`p-4 border-2 rounded-xl text-center transition-all ${
// //                   formData.userType === "INTERNAL"
// //                     ? "border-blue-500 bg-blue-50 text-blue-700"
// //                     : "border-gray-200 hover:border-gray-300"
// //                 }`}
// //               >
// //                 <User className="w-6 h-6 mx-auto mb-2" />
// //                 <div className="font-semibold">Internal User</div>
// //                 <div className="text-xs text-gray-500">
// //                   System administrators, supervisors, technicians
// //                 </div>
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setFormData((prev) => ({ ...prev, userType: "COMPANY" }))
// //                 }
// //                 className={`p-4 border-2 rounded-xl text-center transition-all ${
// //                   formData.userType === "COMPANY"
// //                     ? "border-blue-500 bg-blue-50 text-blue-700"
// //                     : "border-gray-200 hover:border-gray-300"
// //                 }`}
// //               >
// //                 <Building className="w-6 h-6 mx-auto mb-2" />
// //                 <div className="font-semibold">Company User</div>
// //                 <div className="text-xs text-gray-500">
// //                   Client admins, tenants
// //                 </div>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Email */}
// //           <div className="space-y-2">
// //             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //               <Mail className="w-4 h-4" />
// //               Email *
// //             </label>
// //             <input
// //               type="email"
// //               value={formData.email}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({ ...prev, email: e.target.value }))
// //               }
// //               className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                 errors.email ? "border-red-500" : "border-gray-200"
// //               }`}
// //               placeholder="user@example.com"
// //             />
// //             {errors.email && (
// //               <p className="text-sm text-red-500">{errors.email}</p>
// //             )}
// //           </div>

// //           {/* Name Fields */}
// //           <div className="grid grid-cols-2 gap-4">
// //             <div className="space-y-2">
// //               <label className="text-sm font-semibold text-gray-700">
// //                 First Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.firstName}
// //                 onChange={(e) =>
// //                   setFormData((prev) => ({
// //                     ...prev,
// //                     firstName: e.target.value,
// //                   }))
// //                 }
// //                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   errors.firstName ? "border-red-500" : "border-gray-200"
// //                 }`}
// //                 placeholder="John"
// //               />
// //               {errors.firstName && (
// //                 <p className="text-sm text-red-500">{errors.firstName}</p>
// //               )}
// //             </div>
// //             <div className="space-y-2">
// //               <label className="text-sm font-semibold text-gray-700">
// //                 Last Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.lastName}
// //                 onChange={(e) =>
// //                   setFormData((prev) => ({ ...prev, lastName: e.target.value }))
// //                 }
// //                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   errors.lastName ? "border-red-500" : "border-gray-200"
// //                 }`}
// //                 placeholder="Doe"
// //               />
// //               {errors.lastName && (
// //                 <p className="text-sm text-red-500">{errors.lastName}</p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Role Selection */}
// //           <div className="space-y-2">
// //             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //               <Shield className="w-4 h-4" />
// //               Role *
// //             </label>
// //             <select
// //               value={formData.roleId}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({ ...prev, roleId: e.target.value }))
// //               }
// //               className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                 errors.roleId ? "border-red-500" : "border-gray-200"
// //               }`}
// //             >
// //               <option value="">Select a role</option>
// //               {getFilteredRoles().map((role) => (
// //                 <option key={role.roleId} value={role.roleId}>
// //                   {role.roleName} - {role.description}
// //                 </option>
// //               ))}
// //             </select>
// //             {errors.roleId && (
// //               <p className="text-sm text-red-500">{errors.roleId}</p>
// //             )}
// //           </div>

// //           {/* Company Selection (for company users) */}
// //           {formData.userType === "COMPANY" && (
// //             <div className="space-y-2">
// //               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //                 <Building className="w-4 h-4" />
// //                 Company *
// //               </label>
// //               <select
// //                 value={formData.companyId}
// //                 onChange={(e) =>
// //                   setFormData((prev) => ({
// //                     ...prev,
// //                     companyId: e.target.value,
// //                   }))
// //                 }
// //                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   errors.companyId ? "border-red-500" : "border-gray-200"
// //                 }`}
// //               >
// //                 <option value="">Select a company</option>
// //                 {companies.map((company) => (
// //                   <option key={company.companyId} value={company.companyId}>
// //                     {company.companyName}
// //                   </option>
// //                 ))}
// //               </select>
// //               {errors.companyId && (
// //                 <p className="text-sm text-red-500">{errors.companyId}</p>
// //               )}
// //             </div>
// //           )}

// //           {/* Generated Password Display */}
// //           {generatedPassword && (
// //             <div className="space-y-2 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
// //               <label className="text-sm font-semibold text-green-700 flex items-center gap-2">
// //                 <Shield className="w-4 h-4" />
// //                 Generated Password
// //               </label>
// //               <div className="flex items-center gap-2">
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   value={generatedPassword}
// //                   readOnly
// //                   className="flex-1 px-4 py-3 border-2 border-green-300 rounded-xl bg-white"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
// //                 >
// //                   {showPassword ? (
// //                     <EyeOff className="w-5 h-5" />
// //                   ) : (
// //                     <Eye className="w-5 h-5" />
// //                   )}
// //                 </button>
// //               </div>
// //               <p className="text-sm text-green-600">
// //                 Please save this password and share it with the user. It will be
// //                 sent to their email as well.
// //               </p>
// //             </div>
// //           )}

// //           {errors.submit && (
// //             <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
// //               <p className="text-sm text-red-600">{errors.submit}</p>
// //             </div>
// //           )}

// //           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
// //             >
// //               {loading ? (
// //                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// //               ) : (
// //                 <Save className="w-4 h-4" />
// //               )}
// //               {isEdit ? "Update User" : "Create User"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserForm;

// // "use client";

// // import { useState, useEffect } from "react";
// // import {
// //   X,
// //   User,
// //   Mail,
// //   Building,
// //   Shield,
// //   Save,
// //   Eye,
// //   EyeOff,
// //   Image,
// // } from "lucide-react";
// // import { userService } from "../../services/userService";
// // import { companyService } from "../../services/companyService";

// // const UserForm = ({ isOpen, onClose, user, onSuccess }) => {
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     firstName: "",
// //     lastName: "",
// //     roleId: "",
// //     companyId: "",
// //     userType: "INTERNAL",
// //     profileImage: null, // New field for profile image
// //   });
// //   const [roles, setRoles] = useState([]);
// //   const [companies, setCompanies] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [generatedPassword, setGeneratedPassword] = useState("");
// //   const [employeeCodeId, setEmployeeCodeId] = useState(""); // New state for employeeCodeId
// //   const isEdit = !!user;

// //   useEffect(() => {
// //     if (isOpen) {
// //       loadRoles();
// //       loadCompanies();
// //       if (user) {
// //         setFormData({
// //           email: user.email || "",
// //           firstName: user.firstName || "",
// //           lastName: user.lastName || "",
// //           roleId: user.roleId || "",
// //           companyId: user.companyId || "",
// //           userType: user.userType || "INTERNAL",
// //           profileImage: null, // Reset for edit
// //         });
// //         setEmployeeCodeId(user.employeeCodeId || ""); // Set employeeCodeId for edit
// //       } else {
// //         resetForm();
// //       }
// //     }
// //   }, [isOpen, user]);

// //   const loadRoles = async () => {
// //     try {
// //       const response = await userService.getAllRoles();
// //       setRoles(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading roles:", error);
// //     }
// //   };

// //   const loadCompanies = async () => {
// //     try {
// //       const response = await companyService.getAllCompanies();
// //       setCompanies(response.data || []);
// //     } catch (error) {
// //       console.error("Error loading companies:", error);
// //     }
// //   };

// //   const resetForm = () => {
// //     setFormData({
// //       email: "",
// //       firstName: "",
// //       lastName: "",
// //       roleId: "",
// //       companyId: "",
// //       userType: "INTERNAL",
// //       profileImage: null,
// //     });
// //     setErrors({});
// //     setGeneratedPassword("");
// //     setEmployeeCodeId("");
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.email.trim()) {
// //       newErrors.email = "Email is required";
// //     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //       newErrors.email = "Invalid email format";
// //     }
// //     if (!formData.firstName.trim()) {
// //       newErrors.firstName = "First name is required";
// //     }
// //     if (!formData.lastName.trim()) {
// //       newErrors.lastName = "Last name is required";
// //     }
// //     if (!formData.roleId) {
// //       newErrors.roleId = "Role is required";
// //     }
// //     if (formData.userType === "COMPANY" && !formData.companyId) {
// //       newErrors.companyId = "Company is required for company users";
// //     }
// //     if (
// //       formData.profileImage &&
// //       !["image/jpeg", "image/png"].includes(formData.profileImage.type)
// //     ) {
// //       newErrors.profileImage = "Only JPEG or PNG images are allowed";
// //     }
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;
// //     setLoading(true);
// //     try {
// //       const submitData = new FormData();
// //       submitData.append("email", formData.email);
// //       submitData.append("firstName", formData.firstName);
// //       submitData.append("lastName", formData.lastName);
// //       submitData.append("roleId", formData.roleId);
// //       submitData.append("userType", formData.userType);
// //       if (formData.companyId) {
// //         submitData.append("companyId", formData.companyId);
// //       }
// //       if (formData.profileImage) {
// //         submitData.append("profileImage", formData.profileImage);
// //       }

// //       let response;
// //       if (isEdit) {
// //         response = await userService.updateUser(
// //           user.userId,
// //           user.userType,
// //           submitData
// //         );
// //       } else {
// //         response = await userService.createUser(submitData);
// //         if (response.data.employeeCodeId) {
// //           setEmployeeCodeId(response.data.employeeCodeId);
// //         }
// //         if (response.data.generatedPassword) {
// //           setGeneratedPassword(response.data.generatedPassword);
// //         }
// //       }
// //       onSuccess();
// //       if (!isEdit) {
// //         setShowPassword(true);
// //       } else {
// //         onClose();
// //       }
// //     } catch (error) {
// //       console.error("Error saving user:", error);
// //       setErrors({
// //         submit: error.response?.data?.message || "Failed to save user",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getFilteredRoles = () => {
// //     if (formData.userType === "INTERNAL") {
// //       return roles.filter((role) =>
// //         ["Super_Admin", "Supervisor", "Technician"].includes(role.roleName)
// //       );
// //     } else {
// //       return roles.filter((role) =>
// //         ["Client_Admin", "Tenant"].includes(role.roleName)
// //       );
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
// //                 <User className="w-6 h-6 text-white" />
// //               </div>
// //               <h2 className="text-2xl font-bold text-white">
// //                 {isEdit ? "Edit User" : "Create New User"}
// //               </h2>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
// //             >
// //               <X className="w-6 h-6 text-white" />
// //             </button>
// //           </div>
// //         </div>
// //         <form onSubmit={handleSubmit} className="p-6 space-y-6">
// //           {/* User Type Selection */}
// //           <div className="space-y-2">
// //             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //               <Shield className="w-4 h-4" /> User Type *
// //             </label>
// //             <div className="grid grid-cols-2 gap-4">
// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setFormData((prev) => ({
// //                     ...prev,
// //                     userType: "INTERNAL",
// //                     companyId: "",
// //                   }))
// //                 }
// //                 className={`p-4 border-2 rounded-xl text-center transition-all ${
// //                   formData.userType === "INTERNAL"
// //                     ? "border-blue-500 bg-blue-50 text-blue-700"
// //                     : "border-gray-200 hover:border-gray-300"
// //                 }`}
// //               >
// //                 <User className="w-6 h-6 mx-auto mb-2" />
// //                 <div className="font-semibold">Internal User</div>
// //                 <div className="text-xs text-gray-500">
// //                   System administrators, supervisors, technicians
// //                 </div>
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setFormData((prev) => ({ ...prev, userType: "COMPANY" }))
// //                 }
// //                 className={`p-4 border-2 rounded-xl text-center transition-all ${
// //                   formData.userType === "COMPANY"
// //                     ? "border-blue-500 bg-blue-50 text-blue-700"
// //                     : "border-gray-200 hover:border-gray-300"
// //                 }`}
// //               >
// //                 <Building className="w-6 h-6 mx-auto mb-2" />
// //                 <div className="font-semibold">Company User</div>
// //                 <div className="text-xs text-gray-500">
// //                   Client admins, tenants
// //                 </div>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Email */}
// //           <div className="space-y-2">
// //             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //               <Mail className="w-4 h-4" /> Email *
// //             </label>
// //             <input
// //               type="email"
// //               value={formData.email}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({ ...prev, email: e.target.value }))
// //               }
// //               className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                 errors.email ? "border-red-500" : "border-gray-200"
// //               }`}
// //               placeholder="user@example.com"
// //             />
// //             {errors.email && (
// //               <p className="text-sm text-red-500">{errors.email}</p>
// //             )}
// //           </div>

// //           {/* Name Fields */}
// //           <div className="grid grid-cols-2 gap-4">
// //             <div className="space-y-2">
// //               <label className="text-sm font-semibold text-gray-700">
// //                 First Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.firstName}
// //                 onChange={(e) =>
// //                   setFormData((prev) => ({
// //                     ...prev,
// //                     firstName: e.target.value,
// //                   }))
// //                 }
// //                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   errors.firstName ? "border-red-500" : "border-gray-200"
// //                 }`}
// //                 placeholder="John"
// //               />
// //               {errors.firstName && (
// //                 <p className="text-sm text-red-500">{errors.firstName}</p>
// //               )}
// //             </div>
// //             <div className="space-y-2">
// //               <label className="text-sm font-semibold text-gray-700">
// //                 Last Name *
// //               </label>
// //               <input
// //                 type="text"
// //                 value={formData.lastName}
// //                 onChange={(e) =>
// //                   setFormData((prev) => ({ ...prev, lastName: e.target.value }))
// //                 }
// //                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   errors.lastName ? "border-red-500" : "border-gray-200"
// //                 }`}
// //                 placeholder="Doe"
// //               />
// //               {errors.lastName && (
// //                 <p className="text-sm text-red-500">{errors.lastName}</p>
// //               )}
// //             </div>
// //           </div>

// //           {/* Profile Image Upload */}
// //           <div className="space-y-2">
// //             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //               <Image className="w-4 h-4" /> Profile Image
// //             </label>
// //             <input
// //               type="file"
// //               accept="image/jpeg,image/png"
// //               onChange={(e) =>
// //                 setFormData((prev) => ({
// //                   ...prev,
// //                   profileImage: e.target.files[0],
// //                 }))
// //               }
// //               className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                 errors.profileImage ? "border-red-500" : "border-gray-200"
// //               }`}
// //             />
// //             {errors.profileImage && (
// //               <p className="text-sm text-red-500">{errors.profileImage}</p>
// //             )}
// //             {isEdit && user.profileImageUrl && (
// //               <div className="mt-2">
// //                 <p className="text-sm text-gray-600">Current Profile Image:</p>
// //                 <img
// //                   src={user.profileImageUrl}
// //                   alt="Current Profile"
// //                   className="w-20 h-20 object-cover rounded-full"
// //                 />
// //               </div>
// //             )}
// //           </div>

// //           {/* Role Selection */}
// //           <div className="space-y-2">
// //             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //               <Shield className="w-4 h-4" /> Role *
// //             </label>
// //             <select
// //               value={formData.roleId}
// //               onChange={(e) =>
// //                 setFormData((prev) => ({ ...prev, roleId: e.target.value }))
// //               }
// //               className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                 errors.roleId ? "border-red-500" : "border-gray-200"
// //               }`}
// //             >
// //               <option value="">Select a role</option>
// //               {getFilteredRoles().map((role) => (
// //                 <option key={role.roleId} value={role.roleId}>
// //                   {role.roleName} - {role.description}
// //                 </option>
// //               ))}
// //             </select>
// //             {errors.roleId && (
// //               <p className="text-sm text-red-500">{errors.roleId}</p>
// //             )}
// //           </div>

// //           {/* Company Selection (for company users) */}
// //           {formData.userType === "COMPANY" && (
// //             <div className="space-y-2">
// //               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
// //                 <Building className="w-4 h-4" /> Company *
// //               </label>
// //               <select
// //                 value={formData.companyId}
// //                 onChange={(e) =>
// //                   setFormData((prev) => ({
// //                     ...prev,
// //                     companyId: e.target.value,
// //                   }))
// //                 }
// //                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   errors.companyId ? "border-red-500" : "border-gray-200"
// //                 }`}
// //               >
// //                 <option value="">Select a company</option>
// //                 {companies.map((company) => (
// //                   <option key={company.companyId} value={company.companyId}>
// //                     {company.companyName}
// //                   </option>
// //                 ))}
// //               </select>
// //               {errors.companyId && (
// //                 <p className="text-sm text-red-500">{errors.companyId}</p>
// //               )}
// //             </div>
// //           )}

// //           {/* Employee Code ID Display (for edit mode or after creation) */}
// //           {employeeCodeId && (
// //             <div className="space-y-2 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
// //               <label className="text-sm font-semibold text-blue-700 flex items-center gap-2">
// //                 <Shield className="w-4 h-4" /> Employee Code ID
// //               </label>
// //               <input
// //                 type="text"
// //                 value={employeeCodeId}
// //                 readOnly
// //                 className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl bg-white"
// //               />
// //               <p className="text-sm text-blue-600">
// //                 This is the unique employee code for the user.
// //               </p>
// //             </div>
// //           )}

// //           {/* Generated Password Display */}
// //           {generatedPassword && (
// //             <div className="space-y-2 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
// //               <label className="text-sm font-semibold text-green-700 flex items-center gap-2">
// //                 <Shield className="w-4 h-4" /> Generated Password
// //               </label>
// //               <div className="flex items-center gap-2">
// //                 <input
// //                   type={showPassword ? "text" : "password"}
// //                   value={generatedPassword}
// //                   readOnly
// //                   className="flex-1 px-4 py-3 border-2 border-green-300 rounded-xl bg-white"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
// //                 >
// //                   {showPassword ? (
// //                     <EyeOff className="w-5 h-5" />
// //                   ) : (
// //                     <Eye className="w-5 h-5" />
// //                   )}
// //                 </button>
// //               </div>
// //               <p className="text-sm text-green-600">
// //                 Please save this password and share it with the user. It will be
// //                 sent to their email as well.
// //               </p>
// //             </div>
// //           )}

// //           {errors.submit && (
// //             <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
// //               <p className="text-sm text-red-600">{errors.submit}</p>
// //             </div>
// //           )}

// //           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
// //             >
// //               {loading ? (
// //                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// //               ) : (
// //                 <Save className="w-4 h-4" />
// //               )}
// //               {isEdit ? "Update User" : "Create User"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserForm;

// "use client";

// import { useState, useEffect } from "react";
// import {
//   X,
//   User,
//   Mail,
//   Building,
//   Shield,
//   Save,
//   Eye,
//   EyeOff,
//   Image,
// } from "lucide-react";
// import { userService } from "../../services/userService";
// import { companyService } from "../../services/companyService";
// import toast from "react-hot-toast";

// const UserForm = ({ isOpen, onClose, user, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     roleId: "",
//     companyId: "",
//     userType: "INTERNAL",
//     profileImage: null, // New field for profile image
//   });
//   const [roles, setRoles] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [generatedPassword, setGeneratedPassword] = useState("");
//   const [employeeCodeId, setEmployeeCodeId] = useState(""); // New state for employeeCodeId
//   const isEdit = !!user;

//   useEffect(() => {
//     if (isOpen) {
//       loadRoles();
//       loadCompanies();
//       if (user) {
//         setFormData({
//           email: user.email || "",
//           firstName: user.firstName || "",
//           lastName: user.lastName || "",
//           roleId: user.roleId || "",
//           companyId: user.companyId || "",
//           userType: user.userType || "INTERNAL",
//           profileImage: null, // Reset for edit
//         });
//         setEmployeeCodeId(user.employeeCodeId || ""); // Set employeeCodeId for edit
//       } else {
//         resetForm();
//       }
//     }
//   }, [isOpen, user]);

//   const loadRoles = async () => {
//     try {
//       const response = await userService.getAllRoles();
//       setRoles(response.data || []);
//     } catch (error) {
//       console.error("Error loading roles:", error);
//     }
//   };

//   const loadCompanies = async () => {
//     try {
//       const response = await companyService.getAllCompanies();
//       setCompanies(response.data || []);
//     } catch (error) {
//       console.error("Error loading companies:", error);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       email: "",
//       firstName: "",
//       lastName: "",
//       roleId: "",
//       companyId: "",
//       userType: "INTERNAL",
//       profileImage: null,
//     });
//     setErrors({});
//     setGeneratedPassword("");
//     setEmployeeCodeId("");
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     }
//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     }
//     if (!formData.roleId) {
//       newErrors.roleId = "Role is required";
//     }
//     if (formData.userType === "COMPANY" && !formData.companyId) {
//       newErrors.companyId = "Company is required for company users";
//     }
//     if (
//       formData.profileImage &&
//       !["image/jpeg", "image/png"].includes(formData.profileImage.type)
//     ) {
//       newErrors.profileImage = "Only JPEG or PNG images are allowed";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 1048576) {
//         // 1MB limit
//         toast.error("Image size must be less than 1MB");
//         e.target.value = ""; // Clear the input
//         setFormData((prev) => ({ ...prev, profileImage: null }));
//       } else {
//         setFormData((prev) => ({ ...prev, profileImage: file }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("email", formData.email);
//       submitData.append("firstName", formData.firstName);
//       submitData.append("lastName", formData.lastName);
//       submitData.append("roleId", formData.roleId);
//       submitData.append("userType", formData.userType);
//       if (formData.companyId) {
//         submitData.append("companyId", formData.companyId);
//       }
//       if (formData.profileImage) {
//         submitData.append("profileImage", formData.profileImage);
//       }

//       let response;
//       if (isEdit) {
//         response = await userService.updateUser(
//           user.userId,
//           user.userType,
//           submitData
//         );
//       } else {
//         response = await userService.createUser(submitData);
//         if (response.data.employeeCodeId) {
//           setEmployeeCodeId(response.data.employeeCodeId);
//         }
//         if (response.data.generatedPassword) {
//           setGeneratedPassword(response.data.generatedPassword);
//         }
//       }
//       onSuccess();
//       if (!isEdit) {
//         setShowPassword(true);
//       } else {
//         onClose();
//       }
//     } catch (error) {
//       console.error("Error saving user:", error);
//       setErrors({
//         submit: error.response?.data?.message || "Failed to save user",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRoles = () => {
//     if (formData.userType === "INTERNAL") {
//       return roles.filter((role) =>
//         ["Super_Admin", "Supervisor", "Technician"].includes(role.roleName)
//       );
//     } else {
//       return roles.filter((role) =>
//         ["Client_Admin", "Tenant"].includes(role.roleName)
//       );
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-white bg-opacity-20 rounded-lg">
//                 <User className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">
//                 {isEdit ? "Edit User" : "Create New User"}
//               </h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//             >
//               <X className="w-6 h-6 text-white" />
//             </button>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* User Type Selection */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Shield className="w-4 h-4" /> User Type *
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 type="button"
//                 onClick={() =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     userType: "INTERNAL",
//                     companyId: "",
//                   }))
//                 }
//                 className={`p-4 border-2 rounded-xl text-center transition-all ${
//                   formData.userType === "INTERNAL"
//                     ? "border-blue-500 bg-blue-50 text-blue-700"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <User className="w-6 h-6 mx-auto mb-2" />
//                 <div className="font-semibold">Internal User</div>
//                 <div className="text-xs text-gray-500">
//                   System administrators, supervisors, technicians
//                 </div>
//               </button>
//               <button
//                 type="button"
//                 onClick={() =>
//                   setFormData((prev) => ({ ...prev, userType: "COMPANY" }))
//                 }
//                 className={`p-4 border-2 rounded-xl text-center transition-all ${
//                   formData.userType === "COMPANY"
//                     ? "border-blue-500 bg-blue-50 text-blue-700"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//               >
//                 <Building className="w-6 h-6 mx-auto mb-2" />
//                 <div className="font-semibold">Company User</div>
//                 <div className="text-xs text-gray-500">
//                   Client admins, tenants
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Mail className="w-4 h-4" /> Email *
//             </label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, email: e.target.value }))
//               }
//               className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.email ? "border-red-500" : "border-gray-200"
//               }`}
//               placeholder="user@example.com"
//             />
//             {errors.email && (
//               <p className="text-sm text-red-500">{errors.email}</p>
//             )}
//           </div>

//           {/* Name Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700">
//                 First Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.firstName}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     firstName: e.target.value,
//                   }))
//                 }
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.firstName ? "border-red-500" : "border-gray-200"
//                 }`}
//                 placeholder="John"
//               />
//               {errors.firstName && (
//                 <p className="text-sm text-red-500">{errors.firstName}</p>
//               )}
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700">
//                 Last Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.lastName}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, lastName: e.target.value }))
//                 }
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.lastName ? "border-red-500" : "border-gray-200"
//                 }`}
//                 placeholder="Doe"
//               />
//               {errors.lastName && (
//                 <p className="text-sm text-red-500">{errors.lastName}</p>
//               )}
//             </div>
//           </div>

//           {/* Profile Image Upload */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Image className="w-4 h-4" /> Profile Image
//             </label>
//             <input
//               type="file"
//               accept="image/jpeg,image/png"
//               onChange={handleImageChange}
//               className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.profileImage ? "border-red-500" : "border-gray-200"
//               }`}
//             />
//             {errors.profileImage && (
//               <p className="text-sm text-red-500">{errors.profileImage}</p>
//             )}
//             {isEdit && user.profileImageUrl && (
//               <div className="mt-2">
//                 <p className="text-sm text-gray-600">Current Profile Image:</p>
//                 <img
//                   src={user.profileImageUrl}
//                   alt="Current Profile"
//                   className="w-20 h-20 object-cover rounded-full"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Role Selection */}
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//               <Shield className="w-4 h-4" /> Role *
//             </label>
//             <select
//               value={formData.roleId}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, roleId: e.target.value }))
//               }
//               className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.roleId ? "border-red-500" : "border-gray-200"
//               }`}
//             >
//               <option value="">Select a role</option>
//               {getFilteredRoles().map((role) => (
//                 <option key={role.roleId} value={role.roleId}>
//                   {role.roleName} - {role.description}
//                 </option>
//               ))}
//             </select>
//             {errors.roleId && (
//               <p className="text-sm text-red-500">{errors.roleId}</p>
//             )}
//           </div>

//           {/* Company Selection (for company users) */}
//           {formData.userType === "COMPANY" && (
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                 <Building className="w-4 h-4" /> Company *
//               </label>
//               <select
//                 value={formData.companyId}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     companyId: e.target.value,
//                   }))
//                 }
//                 className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   errors.companyId ? "border-red-500" : "border-gray-200"
//                 }`}
//               >
//                 <option value="">Select a company</option>
//                 {companies.map((company) => (
//                   <option key={company.companyId} value={company.companyId}>
//                     {company.companyName}
//                   </option>
//                 ))}
//               </select>
//               {errors.companyId && (
//                 <p className="text-sm text-red-500">{errors.companyId}</p>
//               )}
//             </div>
//           )}

//           {/* Employee Code ID Display (for edit mode or after creation) */}
//           {employeeCodeId && (
//             <div className="space-y-2 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
//               <label className="text-sm font-semibold text-blue-700 flex items-center gap-2">
//                 <Shield className="w-4 h-4" /> Employee Code ID
//               </label>
//               <input
//                 type="text"
//                 value={employeeCodeId}
//                 readOnly
//                 className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl bg-white"
//               />
//               <p className="text-sm text-blue-600">
//                 This is the unique employee code for the user.
//               </p>
//             </div>
//           )}

//           {/* Generated Password Display */}
//           {generatedPassword && (
//             <div className="space-y-2 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
//               <label className="text-sm font-semibold text-green-700 flex items-center gap-2">
//                 <Shield className="w-4 h-4" /> Generated Password
//               </label>
//               <div className="flex items-center gap-2">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={generatedPassword}
//                   readOnly
//                   className="flex-1 px-4 py-3 border-2 border-green-300 rounded-xl bg-white"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//               <p className="text-sm text-green-600">
//                 Please save this password and share it with the user. It will be
//                 sent to their email as well.
//               </p>
//             </div>
//           )}

//           {errors.submit && (
//             <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
//               <p className="text-sm text-red-600">{errors.submit}</p>
//             </div>
//           )}

//           <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
//             >
//               {loading ? (
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//               ) : (
//                 <Save className="w-4 h-4" />
//               )}
//               {isEdit ? "Update User" : "Create User"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserForm;

"use client";

import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Building,
  Shield,
  Save,
  Eye,
  EyeOff,
  Image,
} from "lucide-react";
import { userService } from "../../services/userService";
import { companyService } from "../../services/companyService";
import toast from "react-hot-toast";

const UserForm = ({ isOpen, onClose, user, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    roleId: "",
    companyId: "",
    userType: "INTERNAL",
    profileImage: null,
  });
  const [employeeCodeId, setEmployeeCodeId] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const isEdit = !!user;

  useEffect(() => {
    if (isOpen) {
      loadRoles();
      loadCompanies();
      if (user) {
        setFormData({
          email: user.email || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          roleId: user.roleId || "",
          companyId: user.companyId || "",
          userType: user.userType || "INTERNAL",
          profileImage: null,
        });
        setEmployeeCodeId(user.employeeCodeId || "");
      } else {
        resetForm();
      }
    }
  }, [isOpen, user]);

  const loadRoles = async () => {
    try {
      const response = await userService.getAllRoles();
      setRoles(response.data || []);
    } catch (error) {
      console.error("Error loading roles:", error);
      toast.error("Failed to load roles");
    }
  };

  const loadCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      setCompanies(response.data || []);
    } catch (error) {
      console.error("Error loading companies:", error);
      toast.error("Failed to load companies");
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      roleId: "",
      companyId: "",
      userType: "INTERNAL",
      profileImage: null,
    });
    setEmployeeCodeId("");
    setErrors({});
    setGeneratedPassword("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.roleId) {
      newErrors.roleId = "Role is required";
    }
    if (formData.userType === "COMPANY" && !formData.companyId) {
      newErrors.companyId = "Company is required for company users";
    }
    if (
      formData.profileImage &&
      !["image/jpeg", "image/png"].includes(formData.profileImage.type)
    ) {
      newErrors.profileImage = "Only JPEG or PNG images are allowed";
    }
    if (isEdit && !employeeCodeId.trim()) {
      newErrors.employeeCodeId = "Employee code ID is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1048576) {
        toast.error("Image size must be less than 1MB");
        e.target.value = "";
        setFormData((prev) => ({ ...prev, profileImage: null }));
      } else {
        setFormData((prev) => ({ ...prev, profileImage: file }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("email", formData.email);
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("roleId", formData.roleId);
      submitData.append("userType", formData.userType);
      if (formData.companyId) {
        submitData.append("companyId", formData.companyId);
      }
      if (formData.profileImage) {
        submitData.append("profileImage", formData.profileImage);
      }
      if (isEdit && employeeCodeId) {
        submitData.append("employeeCodeId", employeeCodeId);
      }

      let response;
      if (isEdit) {
        response = await userService.updateUser(
          user.userId,
          user.userType,
          submitData
        );
      } else {
        response = await userService.createUser(submitData);
        if (response.data.employeeCodeId) {
          setEmployeeCodeId(response.data.employeeCodeId);
        }
        if (response.data.generatedPassword) {
          setGeneratedPassword(response.data.generatedPassword);
        }
      }
      toast.success(
        isEdit ? "User updated successfully" : "User created successfully"
      );
      onSuccess();
      if (!isEdit) {
        setShowPassword(true);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Error saving user:", error);
      // Handle plain string or JSON response from backend
      let errorMessage = "Failed to save user";
      if (error.response?.data) {
        errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || errorMessage;
      }
      setErrors((prev) => ({ ...prev, submit: errorMessage }));
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredRoles = () => {
    if (formData.userType === "INTERNAL") {
      return roles.filter((role) =>
        ["Super_Admin", "Supervisor", "Technician"].includes(role.roleName)
      );
    } else {
      return roles.filter((role) =>
        ["Client_Admin", "Tenant"].includes(role.roleName)
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {isEdit ? "Edit User" : "Create New User"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* User Type Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Shield className="w-4 h-4" /> User Type *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    userType: "INTERNAL",
                    companyId: "",
                  }))
                }
                className={`p-4 border-2 rounded-xl text-center transition-all ${
                  formData.userType === "INTERNAL"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                } ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isEdit}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Internal User</div>
                <div className="text-xs text-gray-500">
                  System administrators, supervisors, technicians
                </div>
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, userType: "COMPANY" }))
                }
                className={`p-4 border-2 rounded-xl text-center transition-all ${
                  formData.userType === "COMPANY"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                } ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isEdit}
              >
                <Building className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Company User</div>
                <div className="text-xs text-gray-500">
                  Client admins, tenants
                </div>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstName ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="John"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.lastName ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Doe"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Employee Code ID (Edit Mode Only) */}
          {isEdit && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Employee Code ID *
              </label>
              <input
                type="text"
                value={employeeCodeId}
                onChange={(e) => setEmployeeCodeId(e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.employeeCodeId ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="e.g., SPA-1234"
              />
              {errors.employeeCodeId && (
                <p className="text-sm text-red-500">{errors.employeeCodeId}</p>
              )}
            </div>
          )}

          {/* Profile Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Image className="w-4 h-4" /> Profile Image
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.profileImage ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.profileImage && (
              <p className="text-sm text-red-500">{errors.profileImage}</p>
            )}
            {isEdit && user.profileImageUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current Profile Image:</p>
                <img
                  src={user.profileImageUrl}
                  alt="Current Profile"
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Role *
            </label>
            <select
              value={formData.roleId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, roleId: e.target.value }))
              }
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.roleId ? "border-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select a role</option>
              {getFilteredRoles().map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleName} - {role.description}
                </option>
              ))}
            </select>
            {errors.roleId && (
              <p className="text-sm text-red-500">{errors.roleId}</p>
            )}
          </div>

          {/* Company Selection (for company users) */}
          {formData.userType === "COMPANY" && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building className="w-4 h-4" /> Company *
              </label>
              <select
                value={formData.companyId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyId: e.target.value,
                  }))
                }
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyId ? "border-red-500" : "border-gray-200"
                }`}
              >
                <option value="">Select a company</option>
                {companies.map((company) => (
                  <option key={company.companyId} value={company.companyId}>
                    {company.companyName}
                  </option>
                ))}
              </select>
              {errors.companyId && (
                <p className="text-sm text-red-500">{errors.companyId}</p>
              )}
            </div>
          )}

          {/* Generated Password Display (Create Mode Only) */}
          {generatedPassword && (
            <div className="space-y-2 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
              <label className="text-sm font-semibold text-green-700 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Generated Password
              </label>
              <div className="flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={generatedPassword}
                  readOnly
                  className="flex-1 px-4 py-3 border-2 border-green-300 rounded-xl bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-3 text-green-600 hover:bg-green-100 rounded-xl transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-sm text-green-600">
                Please save this password and share it with the user. It will be
                sent to their email as well.
              </p>
            </div>
          )}

          {/* Employee Code ID Display (Create Mode Success) */}
          {employeeCodeId && !isEdit && (
            <div className="space-y-2 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <label className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Employee Code ID
              </label>
              <input
                type="text"
                value={employeeCodeId}
                readOnly
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl bg-white"
              />
              <p className="text-sm text-blue-600">
                This is the unique employee code for the user.
              </p>
            </div>
          )}

          {errors.submit && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isEdit ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
