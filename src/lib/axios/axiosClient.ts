// import axios from 'axios';
// import { getCookie } from "cookies-next";

// // Create axios instance
// const axiosClient = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1` || 'http://localhost:8000/api/v1',
//   timeout: 30000, // 30 seconds for file uploads
// });

// // Request interceptor to add auth token if available
// axiosClient.interceptors.request.use(
//   (config) => {
//     // Add auth token if you have one
//     const cookieToken = getCookie("access");
//     const cookieLogin = getCookie("logged_in") === "true";
//     const token = getCookie("access") || getCookie("refresh");
//     console.log('cookieToken-->',getCookie("access"))
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;