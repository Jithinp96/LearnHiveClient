import axios from 'axios';
import { refreshTokenAPI } from './adminAPI/adminAPI';

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await refreshTokenAPI();
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return axios(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);