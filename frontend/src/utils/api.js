import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// User APIs
export const userAPI = {
  getAllUsers: (params) => api.get('/users', { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile/update', data),
  addSkill: (data) => api.post('/users/skills/add', data),
  deleteSkill: (skillId) => api.delete(`/users/skills/${skillId}`),
  searchUsersBySkill: (params) => api.get('/users/search', { params }),
  getSuggestedUsers: (params) => api.get('/users/suggested', { params }),
  deleteAccount: (data) => api.delete('/users/account', { data }),
};

// Request APIs
export const requestAPI = {
  sendRequest: (data) => api.post('/requests/send', data),
  getRequests: (params) => api.get('/requests', { params }),
  getSentRequests: () => api.get('/requests/sent'),
  acceptRequest: (requestId) => api.put(`/requests/${requestId}/accept`),
  rejectRequest: (requestId) => api.put(`/requests/${requestId}/reject`),
  deleteRequest: (requestId) => api.delete(`/requests/${requestId}`),
};

// Message APIs
export const messageAPI = {
  sendMessage: (data) => api.post('/messages/send', data),
  getMessages: (userId) => api.get(`/messages/${userId}`),
  getConversations: () => api.get('/messages'),
};

export default api;
