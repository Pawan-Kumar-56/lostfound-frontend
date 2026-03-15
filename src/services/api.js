// API Service for Backend Integration

const API_BASE_URL = "https://lostfound-backend-2ugd.onrender.com";


// =========================
// Test Backend Connection
// =========================

export const testBackendConnection = async () => {

  try {

    const response = await fetch(`${API_BASE_URL}/api/auth/test`);

    console.log("Backend test response:", response.status);

    return response.ok;

  } catch (error) {

    console.error("Backend connection failed:", error);

    return false;

  }

};


// =========================
// Generic API Request
// =========================

const apiRequest = async (endpoint, options = {}) => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {

      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },

      ...options

    });

    if (!response.ok) {

      const errorData = await response.json().catch(() => ({}));

      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );

    }

    // handle empty response
    const text = await response.text();

    return text ? JSON.parse(text) : {};

  } catch (error) {

    console.error("API Error:", error);

    throw error;

  }

};



// =========================
// AUTH API
// =========================

export const authAPI = {

  register: async (userData) => {

    return await apiRequest("/api/auth/register", {

      method: "POST",
      body: JSON.stringify(userData)

    });

  },

  login: async (credentials) => {

    return await apiRequest("/api/auth/login", {

      method: "POST",
      body: JSON.stringify(credentials)

    });

  }

};


// =========================
// ITEMS API
// =========================

export const itemsAPI = {

  getAll: async (page = 0, size = 10) => {
    return await apiRequest(`/api/items?page=${page}&size=${size}`);
  },

  search: async (searchTerm, page = 0, size = 10) => {
    return await apiRequest(
      `/api/items/search?search=${encodeURIComponent(searchTerm)}&page=${page}&size=${size}`
    );
  },

  getItemsByUser: async (userEmail, page = 0, size = 10) => {
    return await apiRequest(
      `/api/items/my?userEmail=${encodeURIComponent(userEmail)}&page=${page}&size=${size}`
    );
  },

  create: async (itemData) => {

    return await apiRequest("/api/items", {

      method: "POST",
      body: JSON.stringify(itemData)

    });

  },

  getById: async (id) => {

    return await apiRequest(`/api/items/${id}`);

  },

  delete: async (id) => {

    return await apiRequest(`/api/items/${id}`, {

      method: "DELETE"

    });

  }

};



// =========================
// REVIEWS API
// =========================

export const reviewsAPI = {

  getAll: async () => {

    return await apiRequest("/api/reviews");

  },

  create: async (reviewData) => {

    return await apiRequest("/api/reviews", {

      method: "POST",
      body: JSON.stringify(reviewData)

    });

  },

  getById: async (id) => {

    return await apiRequest(`/api/reviews/${id}`);

  }

};



// =========================
// LOCAL STORAGE
// =========================

export const storage = {

  saveUser: (userData) => {

    localStorage.setItem("user", JSON.stringify(userData));

  },

  getUser: () => {

    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;

  },

  removeUser: () => {

    localStorage.removeItem("user");

  },

  saveToken: (token) => {

    localStorage.setItem("token", token);

  },

  getToken: () => {

    return localStorage.getItem("token");

  },

  removeToken: () => {

    localStorage.removeItem("token");

  }

};


export default apiRequest;