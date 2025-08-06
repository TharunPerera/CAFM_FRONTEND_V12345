// "use client";

// import { useState } from "react";
// import {
//   X,
//   Mail,
//   Key,
//   ArrowRight,
//   CheckCircle,
//   ChevronDown,
// } from "lucide-react";
// import { userService } from "../../services/userService";

// const ForgotPasswordModal = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState(1); // 1: Email, 2: Token & Password, 3: Success
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     token: "",
//     newPassword: "",
//     confirmPassword: "",
//     userType: "INTERNAL",
//   });
//   const [errors, setErrors] = useState({});

//   const resetForm = () => {
//     setStep(1);
//     setFormData({
//       email: "",
//       token: "",
//       newPassword: "",
//       confirmPassword: "",
//       userType: "INTERNAL",
//     });
//     setErrors({});
//   };

//   const handleClose = () => {
//     resetForm();
//     onClose();
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

//   const validateEmail = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validatePasswordReset = () => {
//     const newErrors = {};

//     if (!formData.token.trim()) {
//       newErrors.token = "Reset token is required";
//     }

//     if (!formData.newPassword) {
//       newErrors.newPassword = "New password is required";
//     } else if (formData.newPassword.length < 6) {
//       newErrors.newPassword = "Password must be at least 6 characters";
//     }

//     if (formData.newPassword !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     if (!formData.userType) {
//       newErrors.userType = "User type is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleRequestReset = async (e) => {
//     e.preventDefault();

//     if (!validateEmail()) return;

//     try {
//       setLoading(true);
//       await userService.requestPasswordReset(formData.email);
//       setStep(2);
//     } catch (error) {
//       console.error("Password reset request failed:", error);
//       setErrors({
//         email:
//           error.response?.data?.message ||
//           "Failed to send reset email. Please check your email address.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirmReset = async (e) => {
//     e.preventDefault();

//     if (!validatePasswordReset()) return;

//     try {
//       setLoading(true);
//       // Send the request with the correct DTO structure
//       await userService.confirmPasswordReset({
//         token: formData.token,
//         newPassword: formData.newPassword,
//         userType: formData.userType,
//       });
//       setStep(3);
//     } catch (error) {
//       console.error("Password reset confirmation failed:", error);
//       setErrors({
//         token:
//           error.response?.data?.message ||
//           "Invalid or expired reset token. Please request a new one.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-xl font-bold text-gray-900">
//             {step === 1 && "Reset Password"}
//             {step === 2 && "Enter Reset Code"}
//             {step === 3 && "Password Reset Successful"}
//           </h2>
//           <button
//             onClick={handleClose}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="p-6">
//           {/* Step 1: Email Input */}
//           {step === 1 && (
//             <form onSubmit={handleRequestReset} className="space-y-4">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Mail className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <p className="text-gray-600">
//                   Enter your email address and we'll send you a reset code.
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.email ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your email address"
//                   disabled={loading}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     Send Reset Code
//                     <ArrowRight className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             </form>
//           )}

//           {/* Step 2: Token, User Type and New Password */}
//           {step === 2 && (
//             <form onSubmit={handleConfirmReset} className="space-y-4">
//               <div className="text-center mb-6">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Key className="w-8 h-8 text-green-600" />
//                 </div>
//                 <p className="text-gray-600">
//                   Check your email for the reset code and enter your new
//                   password.
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Reset Code
//                 </label>
//                 <input
//                   type="text"
//                   name="token"
//                   value={formData.token}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.token ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter the reset code from your email"
//                   disabled={loading}
//                 />
//                 {errors.token && (
//                   <p className="text-red-500 text-sm mt-1">{errors.token}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   User Type
//                 </label>
//                 <div className="relative">
//                   <select
//                     name="userType"
//                     value={formData.userType}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white ${
//                       errors.userType ? "border-red-500" : "border-gray-300"
//                     }`}
//                     disabled={loading}
//                   >
//                     <option value="INTERNAL">Internal User</option>
//                     <option value="COMPANY">Company User</option>
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                 </div>
//                 {errors.userType && (
//                   <p className="text-red-500 text-sm mt-1">{errors.userType}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   name="newPassword"
//                   value={formData.newPassword}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.newPassword ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter your new password"
//                   disabled={loading}
//                 />
//                 {errors.newPassword && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.newPassword}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm New Password
//                 </label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                     errors.confirmPassword
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                   placeholder="Confirm your new password"
//                   disabled={loading}
//                 />
//                 {errors.confirmPassword && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.confirmPassword}
//                   </p>
//                 )}
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setStep(1)}
//                   className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
//                   disabled={loading}
//                 >
//                   Back
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                       Resetting...
//                     </>
//                   ) : (
//                     "Reset Password"
//                   )}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Step 3: Success */}
//           {step === 3 && (
//             <div className="text-center space-y-6">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
//                 <CheckCircle className="w-8 h-8 text-green-600" />
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   Password Reset Successful!
//                 </h3>
//                 <p className="text-gray-600">
//                   Your password has been successfully reset. You can now log in
//                   with your new password.
//                 </p>
//               </div>

//               <button
//                 onClick={handleClose}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//               >
//                 Continue to Login
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordModal;

"use client";

import { useState } from "react";
import {
  X,
  Mail,
  Key,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { userService } from "../../services/userService";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: Token & Password, 3: Success
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    newPassword: "",
    confirmPassword: "",
    userType: "INTERNAL",
  });
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setStep(1);
    setFormData({
      email: "",
      token: "",
      newPassword: "",
      confirmPassword: "",
      userType: "INTERNAL",
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
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

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordReset = () => {
    const newErrors = {};
    if (!formData.token.trim()) {
      newErrors.token = "Reset token is required";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.userType) {
      newErrors.userType = "User type is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    try {
      setLoading(true);
      await userService.requestPasswordReset(formData.email);
      setStep(2);
    } catch (error) {
      console.error("Password reset request failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to send reset email";

      // Handle specific error for temporary users
      if (errorMessage.includes("Temporary users cannot use password reset")) {
        setErrors({
          email:
            "Temporary users cannot use password reset. Please change your credentials first by logging in.",
        });
      } else {
        setErrors({
          email: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    if (!validatePasswordReset()) return;

    try {
      setLoading(true);
      await userService.confirmPasswordReset({
        token: formData.token,
        newPassword: formData.newPassword,
        userType: formData.userType,
      });
      setStep(3);
    } catch (error) {
      console.error("Password reset confirmation failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid or expired reset token";
      setErrors({
        token: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">
              {step === 1 && "Reset Password"}
              {step === 2 && "Enter Reset Code"}
              {step === 3 && "Password Reset Successful"}
            </h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-600">
                  Enter your email address and we'll send you a reset code.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Send Reset Code
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Token, User Type and New Password */}
          {step === 2 && (
            <form onSubmit={handleConfirmReset} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-gray-600">
                  Check your email for the reset code and enter your new
                  password.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reset Code
                </label>
                <input
                  type="text"
                  name="token"
                  value={formData.token}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter the code from your email"
                  required
                />
                {errors.token && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.token}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Type
                </label>
                <div className="relative">
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                    required
                  >
                    <option value="INTERNAL">Internal User</option>
                    <option value="COMPANY">Company User</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                {errors.userType && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.userType}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your new password"
                  required
                />
                {errors.newPassword && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.newPassword}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Confirm your new password"
                  required
                />
                {errors.confirmPassword && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Password Reset Successful!
              </h3>
              <p className="text-gray-600 mb-6">
                Your password has been successfully reset. You can now log in
                with your new password.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Continue to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
