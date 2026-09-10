import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/techno',
  timeout: 10000,
});

// Interceptor untuk menyisipkan token JWT otomatis
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;