// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login", { replace: true });
//     }
//   }, [user, navigate]);

//   return user ? children : null;
// };

// export default ProtectedRoute;

// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute = ({ children, requiredPermission }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login", { replace: true });
//     } else if (
//       requiredPermission &&
//       !user.permissions.includes(requiredPermission)
//     ) {
//       navigate("/unauthorized", { replace: true });
//     }
//   }, [user, requiredPermission, navigate]);

//   return user ? children : null;
// };

// export default ProtectedRoute;

"use client";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-4"></div>
          <span className="text-lg font-medium text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For temporary users, only allow access to profile and logout
  if (user.isTemporary) {
    const allowedPaths = ["/profile", "/logout"];
    const currentPath = location.pathname;

    if (!allowedPaths.includes(currentPath)) {
      return <Navigate to="/profile" replace />;
    }
  }

  // Check permissions for non-temporary users
  if (requiredPermissions.length > 0 && !user.isTemporary) {
    const hasPermission = requiredPermissions.some((permission) =>
      user.permissions?.includes(permission)
    );

    if (!hasPermission) {
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
  }

  return children;
};

export default ProtectedRoute;
