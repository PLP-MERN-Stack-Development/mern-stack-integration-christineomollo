import axios from 'axios';

// Mock API baseURL - replace with your actual backend URL
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Removed mock data - using real API calls

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      return { data: response.data.data };
    } else {
      throw new Error(response.data.error || 'Login failed');
    }
  },

  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.success) {
      return { data: response.data.data };
    } else {
      throw new Error(response.data.error || 'Registration failed');
    }
  },
};

// Posts API
export const postsAPI = {
  getPosts: async (page = 1, limit = 10, search = '', category = '') => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    const response = await api.get(`/posts?${params}`);
    if (response.data.success) {
      return { data: { posts: response.data.data, pagination: response.data.pagination } };
    } else {
      throw new Error(response.data.error || 'Failed to fetch posts');
    }
  },

  getPost: async (id) => {
    const response = await api.get(`/posts/${id}`);
    if (response.data.success) {
      return { data: response.data.data };
    } else {
      throw new Error(response.data.error || 'Failed to fetch post');
    }
  },

  createPost: async (postData) => {
    const response = await api.post('/posts', postData);
    if (response.data.success) {
      return { data: response.data.data };
    } else {
      throw new Error(response.data.error || 'Failed to create post');
    }
  },

  updatePost: async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    if (response.data.success) {
      return { data: response.data.data };
    } else {
      throw new Error(response.data.error || 'Failed to update post');
    }
  },

  deletePost: async (id) => {
    const response = await api.delete(`/posts/${id}`);
    if (response.data.success) {
      return { data: { message: 'Post deleted successfully' } };
    } else {
      throw new Error(response.data.error || 'Failed to delete post');
    }
  },

  addComment: async (postId, content) => {
    const response = await api.post(`/posts/${postId}/comments`, { content });
    if (response.data.success) {
      return { data: response.data.data };
    } else {
      throw new Error(response.data.error || 'Failed to add comment');
    }
  },
};

// Categories API
export const categoriesAPI = {
  getCategories: async () => {
    const response = await api.get('/categories');
    if (response.data.success) {
      return { data: response.data.data };
    } else {
      throw new Error(response.data.error || 'Failed to fetch categories');
    }
  },

  createCategory: async (name, description) => {
    const response = await api.post('/categories', { name, description });
    if (response.data.success) {
      return { data: response.data.data };
    } else {
      throw new Error(response.data.error || 'Failed to create category');
    }
  },
};

export default api;