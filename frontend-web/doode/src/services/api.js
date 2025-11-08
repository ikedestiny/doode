// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/doode';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }).then(res => res.data),
  
  register: (userData) => 
    api.post('/auth/register', userData).then(res => res.data),
  
  getProfile: () => 
    api.get('/auth/profile').then(res => res.data),
};

export const restaurantService = {
  getAll: () => api.get('/restaurants').then(res => res.data),
  getById: (id) => api.get(`/restaurants/${id}`).then(res => res.data),
  create: (data) => api.post('/restaurants', data).then(res => res.data),
};

export const dishService = {
  getAll: () => api.get('/dishes').then(res => res.data),
  getById: (id) => api.get(`/dishes/${id}`).then(res => res.data),
  getByVendor: (vendorId) => api.get(`/dishes/vendor/${vendorId}`).then(res => res.data),
  create: (data) => api.post('/dishes', data).then(res => res.data),
};

export default api;