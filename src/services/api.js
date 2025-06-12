
import axios from 'axios';

// Configure axios defaults
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

axios.defaults.baseURL = API_BASE_URL;

// Add request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const authAPI = {
  login: (credentials) => axios.post('/auth/login', credentials),
  register: (userData) => axios.post('/auth/register', userData),
  getProfile: () => axios.get('/auth/profile')
};

export const dashboardAPI = {
  getMetrics: (params) => axios.get('/dashboard/metrics', { params }),
  getNetMovementDetails: (params) => axios.get('/dashboard/net-movement', { params })
};

export const assetsAPI = {
  getAll: (params) => axios.get('/assets', { params }),
  getById: (id) => axios.get(`/assets/${id}`),
  create: (data) => axios.post('/assets', data),
  update: (id, data) => axios.put(`/assets/${id}`, data),
  delete: (id) => axios.delete(`/assets/${id}`)
};

export const purchasesAPI = {
  getAll: (params) => axios.get('/purchases', { params }),
  create: (data) => axios.post('/purchases', data)
};

export const transfersAPI = {
  getAll: (params) => axios.get('/transfers', { params }),
  create: (data) => axios.post('/transfers', data),
  update: (id, data) => axios.put(`/transfers/${id}`, data)
};

export const assignmentsAPI = {
  getAll: (params) => axios.get('/assignments', { params }),
  create: (data) => axios.post('/assignments', data),
  update: (id, data) => axios.put(`/assignments/${id}`, data)
};

export const expendituresAPI = {
  getAll: (params) => axios.get('/expenditures', { params }),
  create: (data) => axios.post('/expenditures', data)
};

export const usersAPI = {
  getAll: (params) => axios.get('/users', { params }),
  create: (data) => axios.post('/users', data),
  update: (id, data) => axios.put(`/users/${id}`, data),
  delete: (id) => axios.delete(`/users/${id}`)
};

export default axios;
