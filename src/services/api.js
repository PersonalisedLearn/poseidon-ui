import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        // Handle unauthorized
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export const userService = {
  // Check if username is available
  // 404 means username is available (not found), 200 means username exists
  checkUsername: async (username) => {
    try {
      // If we get a 200, username exists
      await api.get(`/users/username/${username}`);
      return { available: false };
    } catch (error) {
      // 404 means username is available
      if (error.response?.status === 404) {
        return { available: true };
      }
      // For any other error, rethrow
      throw error;
    }
  },

  // Get user by username
  getUserByUsername: async (username) => {
    try {
      const response = await api.get(`/users/username/${username}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('User not found');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch user');
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error(error.response.data.detail || 'Invalid user data');
      } else if (error.response?.status === 409) {
        throw new Error('Username or email already exists');
      }
      throw new Error(error.response?.data?.message || 'Failed to create user');
    }
  },
};

export default api;
