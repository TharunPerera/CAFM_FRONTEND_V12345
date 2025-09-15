// // src/components/LoginForm.jsx
// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//       const success = await login(username, password);
//       if (!success) {
//         setError("Invalid username or password");
//       }
//     } catch (err) {
//       setError("Failed to connect to the server. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-3xl font-bold text-center text-gray-800">
//         CAFM Login
//       </h2>
//       {error && (
//         <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
//           {error}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Username
//           </label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//             required
//             placeholder="Enter your username"
//             disabled={loading}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//             required
//             placeholder="Enter your password"
//             disabled={loading}
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:bg-blue-400"
//           disabled={loading}
//         >
//           {loading ? "Signing In..." : "Sign In"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

// "use client";

// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const success = await login(username, password);
//       if (!success) {
//         setError("Invalid username or password");
//       }
//     } catch (err) {
//       setError("Failed to connect to the server. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="space-y-6">
//         <h2 className="text-3xl font-bold text-center text-gray-800">
//           CAFM Login
//         </h2>

//         {error && (
//           <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               required
//               placeholder="Enter your username"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               required
//               placeholder="Enter your password"
//               disabled={loading}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:bg-blue-400"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         {/* Forgot Password Link */}
//         <div className="text-center">
//           <button
//             type="button"
//             onClick={() => setShowForgotPassword(true)}
//             className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//           >
//             Forgot your password?
//           </button>
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       <ForgotPasswordModal
//         isOpen={showForgotPassword}
//         onClose={() => setShowForgotPassword(false)}
//       />
//     </>
//   );
// };

// export default LoginForm;

// "use client";

// import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { AlertCircle } from "lucide-react";
// import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const { login, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Check if user is temporary after login
//   useEffect(() => {
//     if (user && user.isTemporary) {
//       // Show temporary user message and redirect to profile
//       setTimeout(() => {
//         navigate("/profile");
//       }, 2000);
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const success = await login(username, password);
//       if (!success) {
//         setError("Invalid username or password");
//       }
//     } catch (err) {
//       setError("Failed to connect to the server. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="space-y-6">
//         <h2 className="text-3xl font-bold text-center text-gray-800">
//           CAFM Login
//         </h2>

//         {/* Temporary User Message */}
//         {user && user.isTemporary && (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
//             <AlertCircle className="w-5 h-5" />
//             <div>
//               <p className="font-medium">
//                 Welcome! Please update your credentials
//               </p>
//               <p className="text-sm">
//                 You will be redirected to your profile to change your username
//                 and password.
//               </p>
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               required
//               placeholder="Enter your username"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               required
//               placeholder="Enter your password"
//               disabled={loading}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:bg-blue-400"
//             disabled={loading}
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         {/* Forgot Password Link */}
//         <div className="text-center">
//           <button
//             type="button"
//             onClick={() => setShowForgotPassword(true)}
//             className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//           >
//             Forgot your password?
//           </button>
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       <ForgotPasswordModal
//         isOpen={showForgotPassword}
//         onClose={() => setShowForgotPassword(false)}
//       />
//     </>
//   );
// };

// export default LoginForm;

// "use client";

// import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { AlertCircle, Eye, EyeOff } from "lucide-react";
// import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";
// import { userService } from "../services/userService";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [isTemporaryUser, setIsTemporaryUser] = useState(false);
//   const { login, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Check if user is temporary after login
//   useEffect(() => {
//     const checkTemporaryStatus = async () => {
//       if (user) {
//         try {
//           const response = await userService.isTemporaryUser();
//           setIsTemporaryUser(response.data);

//           if (response.data) {
//             // Show temporary user message and redirect to profile
//             setTimeout(() => {
//               navigate("/profile");
//             }, 2000);
//           }
//         } catch (error) {
//           console.error("Error checking temporary status:", error);
//         }
//       }
//     };

//     checkTemporaryStatus();
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const success = await login(username, password);
//       if (!success) {
//         setError("Invalid username or password");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Failed to connect to the server. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">CAFM Login</h2>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>

//         {/* Temporary User Message */}
//         {user && isTemporaryUser && (
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-yellow-400" />
//               <div className="ml-3">
//                 <p className="text-sm text-yellow-700 font-medium">
//                   Welcome! Please update your credentials
//                 </p>
//                 <p className="text-sm text-yellow-700">
//                   You will be redirected to your profile to change your username
//                   and password.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-6">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-red-400" />
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//               required
//               placeholder="Enter your username"
//               disabled={loading}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//                 required
//                 placeholder="Enter your password"
//                 disabled={loading}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 disabled={loading}
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-5 h-5" />
//                 ) : (
//                   <Eye className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition duration-200 font-medium"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>

//           {/* Forgot Password Link - Only show for non-temporary users */}
//           {!user && (
//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={() => setShowForgotPassword(true)}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//                 disabled={loading}
//               >
//                 Forgot your password?
//               </button>
//             </div>
//           )}
//         </form>
//       </div>

//       {/* Forgot Password Modal */}
//       <ForgotPasswordModal
//         isOpen={showForgotPassword}
//         onClose={() => setShowForgotPassword(false)}
//       />
//     </>
//   );
// };

// export default LoginForm;

// src/components/LoginForm.jsx
"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";
import { userService } from "../services/userService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isTemporaryUser, setIsTemporaryUser] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTemporaryStatus = async () => {
      if (user) {
        try {
          const response = await userService.isTemporaryUser();
          setIsTemporaryUser(response.data);

          if (response.data) {
            setTimeout(() => {
              navigate("/profile");
            }, 2000);
          }
        } catch (error) {
          console.error("Error checking temporary status:", error);
        }
      }
    };
    checkTemporaryStatus();
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
          <p className="text-sm text-gray-500">Access your CAFM account</p>
        </div>

        {user && isTemporaryUser && (
          <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded-md mb-4 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Please update your credentials</p>
              <p>You’ll be redirected to your profile shortly.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {!user && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline"
                disabled={loading}
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
};

export default LoginForm;
