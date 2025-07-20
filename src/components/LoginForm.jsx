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

"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import ForgotPasswordModal from "./ForgotPassword/ForgotPasswordModal";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if user is temporary after login
  useEffect(() => {
    if (user && user.isTemporary) {
      // Show temporary user message and redirect to profile
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
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
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          CAFM Login
        </h2>

        {/* Temporary User Message */}
        {user && user.isTemporary && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5" />
            <div>
              <p className="font-medium">
                Welcome! Please update your credentials
              </p>
              <p className="text-sm">
                You will be redirected to your profile to change your username
                and password.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {error}
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Forgot your password?
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
};

export default LoginForm;
