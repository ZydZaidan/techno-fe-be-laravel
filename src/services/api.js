import axios from 'axios';
import { getStoredToken, clearAuthStorage } from '../utils/authStorage';
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

// Helper Function Universal untuk Gambar & File Asset
export const getImageUrl = (path) => {
  if (!path) return '';
  
  // Jika path sudah berupa URL lengkap dari luar
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Gabungkan langsung dengan VITE_FILE_BASE_URL (yang berakhiran /api)
  const baseURL = import.meta.env.VITE_FILE_BASE_URL || import.meta.env.VITE_API_BASE_URL || BASE_URL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseURL}${cleanPath}`;
};

// Samakan saja fungsinya agar 1 pintu
export const getFileUrl = getImageUrl;

// Interceptor Request
API.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor Response
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearAuthStorage();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const getProfileAPI = () => API.get('/auth/me');
export const updateProfileAPI = (data) => API.put('/auth/profile', data);
export const changePasswordAPI = (data) => API.put('/auth/change-password', data);


// --- INOVASI ---
export const getInovasiAPI = () => API.get('/inovasi');
export const createInovasiAPI = (formData) => API.post('/inovasi', formData);
export const updateInovasiAPI = (id, formData) => {
  formData.append('_method', 'PUT');
  return API.post(`/inovasi/${id}`, formData);
};
export const deleteInovasiAPI = (id) => API.delete(`/inovasi/${id}`);

// --- ENDPOINT TENANT / USER ---
export const getUserDashboardAPI = () => API.get('/techno/inkubasi/dashboard');
export const getMyPengajuanAPI = () => API.get('/techno/inkubasi/my');
export const createPengajuanAPI = (data) => API.post('/techno/inkubasi', data);
export const updatePengajuanAPI = (id, data) => API.put(`/techno/inkubasi/${id}`, data);
export const getFormStatusAPI = () => API.get('/techno/inkubasi/form-status');

// --- LOGBOOK TENANT ---
export const getMyLogbookAPI = () => API.get('/techno/inkubasi/logbook/my');
export const createLogbookAPI = (data) => API.post('/techno/inkubasi/logbook', data);

// --- MASTER DATA ---
// --- ADMIN ENDPOINTS ---
export const getAdminStatsAPI = () => API.get('/techno/admin/stats');
export const getMasterInkubasiAPI = () => API.get('/techno/admin/master-inkubasi');

export const getAllUsersAdminAPI = () => API.get('/techno/admin/users');
export const createUserAdminAPI = (data) => API.post('/techno/admin/users', data);
export const updateUserRoleAdminAPI = (id, roleData) => API.put(`/techno/admin/users/${id}/role`, roleData);
export const deleteUserAdminAPI = (id) => API.delete(`/techno/admin/users/${id}`);

export const updateInkubasiStatusAdminAPI = (id, statusData) => API.put(`/techno/admin/inkubasi/${id}/status`, statusData);
export const bulkCompleteInkubasiAdminAPI = (data) => API.put('/techno/admin/inkubasi/bulk-selesai', data);
export const deleteInkubasiAdminAPI = (id) => API.delete(`/techno/admin/inkubasi/${id}`);

export const getInkubasiSettingAPI = () => API.get('/techno/admin/inkubasi-setting');
export const toggleInkubasiSettingAPI = (data) => API.put('/techno/admin/inkubasi-setting', data);


// --- VERIFIKATOR ENDPOINTS ---
export const getVerifikatorPengajuanAPI = () => API.get('/techno/verifikator/pengajuan');
export const updateVerifikatorPengajuanAPI = (id, data) => API.put(`/techno/verifikator/pengajuan/${id}`, data);
export const getVerifikatorReviewersAPI = () => API.get('/techno/verifikator/reviewers');


// --- REVIEWER ENDPOINTS ---
export const getReviewerDashboardAPI = () => API.get('/techno/reviewer/dashboard');
export const getReviewerProposalsAPI = () => API.get('/techno/reviewer/proposals');
export const sendReviewerEvaluasiAPI = (idPengajuan, data) => {
  const url = idPengajuan 
    ? `/techno/reviewer/evaluasi/${idPengajuan}` 
    : '/techno/reviewer/evaluasi';
  return API.post(url, data);
};
export const getReviewerLogbookAPI = () => API.get('/techno/reviewer/logbook');
export const updateReviewerLogbookAPI = (id, data) => API.put(`/techno/reviewer/logbook/${id}`, data);

export default API;