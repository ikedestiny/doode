// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/doode';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor - Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('🔐 Adding token to request:', token ? 'Yes' : 'No');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response success:', response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data
    });
    
    if (error.response?.status === 401) {
      console.log('🛑 401 Unauthorized - Clearing token');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optional: redirect to login
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }).then(res => res.data),
  
  register: (userData) => 
    api.post('/auth/register', userData).then(res => res.data),
  
  getProfile: () => 
    api.get('/auth/profile').then(res => res.data),
};

export const restaurantService = {
  getAll: () => api.get('/vendors').then(res => res.data),
  getById: (id) => api.get(`/vendors/${id}`).then(res => res.data),
  create: (data) => api.post('/vendors', data).then(res => res.data),
};

export const dishService = {
  getAll: () => api.get('/dishes').then(res => res.data),
  getById: (id) => api.get(`/dishes/${id}`).then(res => res.data),
  getByVendor: (vendorId) => api.get(`${vendorId}/dishes`).then(res => res.data),
  create: (data) => api.post(`${vendorId}/dishes`, data).then(res => res.data),
};


export const vendorService = {
  getVendorById: (id) => api.get(`/vendors/${id}`).then(res => res.data),
  
  addDishToVendor: (vendorId, dishData) => 
    api.post(`/vendors/${vendorId}/dishes`, dishData).then(res => res.data),
  
  updateDish: (vendorId, dishId, dishData) =>
    api.put(`/vendors/${vendorId}/dishes/${dishId}`, dishData).then(res => res.data),
  
  deleteDish: (vendorId, dishId) =>
    api.delete(`/vendors/${vendorId}/dishes/${dishId}`),
  
  updateVendor: (vendorId, vendorData) =>
    api.put(`/vendors/${vendorId}`, vendorData).then(res => res.data),
};

export default api;