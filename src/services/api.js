// API Service for Backend Integration

const API_BASE_URL = 'https://lostfound-backend-2ugd.onrender.com';

// Test function to check if backend is accessible
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Backend test response:', response.status);
    return response.ok;
  } catch (error) {
    console.error('Backend connection test failed:', error);
    return false;
  }
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Items API
export const itemsAPI = {
  // Get all items with pagination
  getAll: async (page = 0, size = 10) => {
    return await apiRequest(`/items?page=${page}&size=${size}`);
  },

  // Search items
  search: async (searchTerm, page = 0, size = 10) => {
    return await apiRequest(`/items/search?search=${encodeURIComponent(searchTerm)}&page=${page}&size=${size}`);
  },

  // Get items by user email
  getItemsByUser: async (userEmail, page = 0, size = 10) => {
    return await apiRequest(`/items/my?userEmail=${encodeURIComponent(userEmail)}&page=${page}&size=${size}`);
  },

  // Create new item
  create: async (itemData) => {
    return await apiRequest('/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  // Get item by ID
  getById: async (id) => {
    return await apiRequest(`/items/${id}`);
  },

  // Delete item
  delete: async (id) => {
    return await apiRequest(`/items/${id}`, {
      method: 'DELETE',
    });
  },
};

// Local Storage helpers for user session
export const storage = {
  // Save user data
  saveUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  },

  // Get user data
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Remove user data
  removeUser: () => {
    localStorage.removeItem('user');
  },

  // Save token
  saveToken: (token) => {
    localStorage.setItem('token', token);
  },

  // Get token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Remove token
  removeToken: () => {
    localStorage.removeItem('token');
  },
};

export default apiRequest;
