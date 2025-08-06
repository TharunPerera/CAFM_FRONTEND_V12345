// "use client";

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Check for existing token on app load
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           // Validate token and get username
//           const response = await axios.get(
//             "http://localhost:9099/api/auth/validate-token",
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           setUser({
//             username: response.data.username,
//             // No longer need internalUserId
//           });
//         } catch (error) {
//           console.error("Token validation failed:", error);
//           localStorage.removeItem("token");
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:9099/api/auth/login",
//         {
//           username,
//           password,
//         }
//       );

//       const { token, refreshToken } = response.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("refreshToken", refreshToken);

//       // Set user with username
//       setUser({
//         username,
//         // No longer need internalUserId
//       });

//       navigate("/dashboard");
//       return true;
//     } catch (error) {
//       console.error("Login failed:", error);
//       return false;
//     }
//   };

//   const logout = async () => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         await axios.post("http://localhost:9099/api/auth/logout", {
//           refreshToken,
//         });
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//       setUser(null);
//       navigate("/login");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// "use client";
// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch user details and permissions
//   const fetchUserDetailsAndPermissions = async (token, username) => {
//     try {
//       // Fetch user details from /api/auth/me
//       const userResponse = await api.get("/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const { userId, userType } = userResponse.data;

//       // Fetch permissions
//       const permissionsResponse = await api.get(
//         `/permissions/assigned/${userId}/${userType}`
//       );
//       const permissions = permissionsResponse.data.map((p) => p.permissionName);

//       return {
//         username,
//         userId,
//         userType,
//         permissions,
//       };
//     } catch (error) {
//       console.error("Failed to fetch user details or permissions:", error);
//       return null;
//     }
//   };

//   // Check for existing token on app load
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           // Validate token
//           const response = await api.get("/auth/validate-token", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           const username = response.data.username;
//           // Fetch user details and permissions
//           const userData = await fetchUserDetailsAndPermissions(
//             token,
//             username
//           );
//           if (userData) {
//             setUser(userData);
//           } else {
//             throw new Error("Failed to fetch user data");
//           }
//         } catch (error) {
//           console.error("Token validation failed:", error);
//           localStorage.removeItem("token");
//           localStorage.removeItem("refreshToken");
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };
//     initializeAuth();
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:9099/api/auth/login",
//         {
//           username,
//           password,
//         }
//       );
//       const { token, refreshToken } = response.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("refreshToken", refreshToken);

//       // Fetch user details and permissions
//       const userData = await fetchUserDetailsAndPermissions(token, username);
//       if (userData) {
//         setUser(userData);
//         navigate("/dashboard");
//         return true;
//       } else {
//         throw new Error("Failed to fetch user data");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       return false;
//     }
//   };

//   const logout = async () => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         await api.post("/auth/logout", { refreshToken });
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//       setUser(null);
//       navigate("/login");
//     }
//   };

//   const refreshPermissions = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token available");
//       const userData = await fetchUserDetailsAndPermissions(
//         token,
//         user?.username
//       );
//       if (userData) {
//         setUser(userData);
//       } else {
//         throw new Error("Failed to refresh permissions");
//       }
//     } catch (error) {
//       console.error("Failed to refresh permissions:", error);
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//       setUser(null);
//       navigate("/login");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout, refreshPermissions }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

"use client";

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user details and permissions
  const fetchUserDetailsAndPermissions = async (token, username) => {
    try {
      // Fetch user details from /api/auth/me
      const userResponse = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { userId, userType, isTemporary } = userResponse.data;

      // Fetch permissions
      const permissionsResponse = await api.get(
        `/permissions/assigned/${userId}/${userType}`
      );
      const permissions = permissionsResponse.data.map((p) => p.permissionName);

      return {
        username,
        userId,
        userType,
        isTemporary,
        permissions,
        ...userResponse.data, // Include all other user data
      };
    } catch (error) {
      console.error("Failed to fetch user details or permissions:", error);
      return null;
    }
  };

  // Check for existing token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Validate token
          const response = await api.get("/auth/validate-token", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const username = response.data.username;

          // Fetch user details and permissions
          const userData = await fetchUserDetailsAndPermissions(
            token,
            username
          );
          if (userData) {
            setUser(userData);
          } else {
            throw new Error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:9099/api/auth/login",
        {
          username,
          password,
        }
      );

      const { token, refreshToken } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      // Fetch user details and permissions
      const userData = await fetchUserDetailsAndPermissions(token, username);
      if (userData) {
        setUser(userData);

        // Navigate based on user status
        if (userData.isTemporary) {
          // Temporary users should go to profile to update credentials
          navigate("/profile");
        } else {
          // Regular users go to dashboard
          navigate("/dashboard");
        }
        return true;
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setUser(null);
      navigate("/login");
    }
  };

  const refreshPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token available");

      const userData = await fetchUserDetailsAndPermissions(
        token,
        user?.username
      );
      if (userData) {
        setUser(userData);
      } else {
        throw new Error("Failed to refresh permissions");
      }
    } catch (error) {
      console.error("Failed to refresh permissions:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setUser(null);
      navigate("/login");
    }
  };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        refreshPermissions,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
