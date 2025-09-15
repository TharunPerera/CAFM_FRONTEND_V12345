<<<<<<< HEAD
=======
// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://localhost:9099/api",
// //   headers: { "Content-Type": "application/json" },
// // });

// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // export default api;

>>>>>>> 91cdf345ebe4ed77614350a6cc180cc5879c0650
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:9099/api",
<<<<<<< HEAD
//   headers: { "Content-Type": "application/json" },
=======
//   headers: {
//     "Content-Type": "application/json",
//   },
>>>>>>> 91cdf345ebe4ed77614350a6cc180cc5879c0650
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

<<<<<<< HEAD
=======
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         const response = await axios.post(
//           "http://localhost:9099/api/auth/refresh-token",
//           {
//             refreshToken,
//           }
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

>>>>>>> 91cdf345ebe4ed77614350a6cc180cc5879c0650
// export default api;

import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:9099/api", // Vite exposes env vars starting with VITE_
=======
  baseURL: "http://localhost:9099/api",
>>>>>>> 91cdf345ebe4ed77614350a6cc180cc5879c0650
  headers: {
    "Content-Type": "application/json",
  },
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
<<<<<<< HEAD
        // Use the same baseURL for refresh
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:9099"
          }/api/auth/refresh-token`,
          { refreshToken }
=======
        const response = await axios.post(
          "http://localhost:9099/api/auth/refresh-token",
          {
            refreshToken,
          }
>>>>>>> 91cdf345ebe4ed77614350a6cc180cc5879c0650
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
