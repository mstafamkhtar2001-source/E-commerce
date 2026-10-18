import axios from 'axios';

// 1. هنا بنعرف العنوان الأساسي للسيرفر بتاعك
const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'https://backend-ecommerce-production-0cc8.up.railway.app',
});

// 2. ده الـ Interceptor اللي بيضيف الـ Token أوتوماتيكياً لأي طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;