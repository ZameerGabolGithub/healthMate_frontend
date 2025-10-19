import axios from 'axios';
import { getToken } from '../utils/helpers';

const axiosInstance = axios.create({
  // Keep baseURL free of the '/api' prefix because many modules already include it
  // (e.g. '/api/vitals'). This prevents double '/api/api/...' requests.
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
