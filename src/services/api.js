import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/techno',
  timeout: 10000,
});

// Interceptor untuk menyisipkan token JWT otomatis
API.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage ATAU sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Tambahkan di api.js kamu
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika backend kirim 401 (Unauthorized/Token Expired)
      localStorage.clear();
      sessionStorage.clear();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth & Profile API Services
export const getProfileAPI = () => API.get('/auth/me');
export const updateProfileAPI = (data) => API.put('/auth/profile', data);
export const changePasswordAPI = (data) => API.put('/auth/change-password', data);

export default API;