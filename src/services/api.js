// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:9099/api", // Vite exposes env vars starting with VITE_
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         // Use the same baseURL for refresh
//         const response = await axios.post(
//           `${
//             import.meta.env.VITE_API_URL || "http://localhost:9099"
//           }/api/auth/refresh-token`,
//           { refreshToken }
//         );
//         const { token, refreshToken: newRefreshToken } = response.data;
//         localStorage.setItem("token", token);
//         localStorage.setItem("refreshToken", newRefreshToken);
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // No fallback in production
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Block all calls if no token (user not logged in)
  if (!token) {
    console.warn("[BLOCKED API CALL]", config.method.toUpperCase(), config.url);
    return Promise.reject({ message: "Blocked API call - no token", config });
  }

  // If token exists, add Authorization
  config.headers.Authorization = `Bearer ${token}`;
  console.log("[API CALL]", config.method.toUpperCase(), config.url);
  console.trace(); // shows where call was triggered
  return config;
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        // Use the same baseURL for refresh
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refreshToken }
        );
        const { token, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
