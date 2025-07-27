// src/services/mockApiService.js
import {
  MOCK_API_CONFIG,
  buildApiUrl,
  handleApiError,
  retryRequest
} from '../utils/mockApiConfig';

// Products API Service
const ProductsAPI = {
  getAll: async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.products}?${query}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, "fetching products");
    }
  },

  getById: async (id) => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.products}/${id}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, `fetching product ${id}`);
    }
  },

  getByCategory: async (category) => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.products}?category=${category}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, `fetching ${category} products`);
    }
  },

  search: async (searchTerm, filters = {}) => {
    try {
      const query = new URLSearchParams({ ...filters, q: searchTerm }).toString();
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.products}?${query}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, `searching for ${searchTerm}`);
    }
  },

  getFeatured: async () => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.products}?featured=true`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, "fetching featured products");
    }
  },

  create: async (productData) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(MOCK_API_CONFIG.endpoints.products), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  },

  update: async (id, productData) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(`${MOCK_API_CONFIG.endpoints.products}/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  },

  delete: async (id) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(`${MOCK_API_CONFIG.endpoints.products}/${id}`), {
        method: 'DELETE',
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  }
};

// Categories API Service
const CategoriesAPI = {
  getAll: async () => {
    try {
      const url = buildApiUrl(MOCK_API_CONFIG.endpoints.categories);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, "fetching categories");
    }
  },

  getById: async (id) => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.categories}/${id}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, `fetching category ${id}`);
    }
  },

  create: async (categoryData) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(MOCK_API_CONFIG.endpoints.categories), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  },

  update: async (id, categoryData) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(`${MOCK_API_CONFIG.endpoints.categories}/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  },

  delete: async (id) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(`${MOCK_API_CONFIG.endpoints.categories}/${id}`), {
        method: 'DELETE',
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  }
};
// Users API Service
const UsersAPI = {
  authenticate: async (email, password) => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.users}?email=${email}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error("Invalid credentials");
      
      // Remove password before returning
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return handleApiError(error, "authenticating user");
    }
  },

  getByEmail: async (email) => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.users}?email=${email}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const users = await response.json();
      return users[0] || null;
    } catch (error) {
      return handleApiError(error, "fetching user by email");
    }
  },

  register: async (userData) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(MOCK_API_CONFIG.endpoints.users), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  },

  getById: async (id) => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.users}/${id}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const user = await response.json();
      // Remove password before returning
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      return handleApiError(error, `fetching user ${id}`);
    }
  },

  update: async (id, updates) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(`${MOCK_API_CONFIG.endpoints.users}/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  },

  delete: async (id) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(`${MOCK_API_CONFIG.endpoints.users}/${id}`), {
        method: 'DELETE',
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  }
};

// Orders API Service
const OrdersAPI = {
  create: async (orderData) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(MOCK_API_CONFIG.endpoints.orders), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  },

  getById: async (orderId) => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.orders}/${orderId}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, `fetching order ${orderId}`);
    }
  },

  getByUser: async (userId) => {
    try {
      const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.orders}?userId=${userId}`);
      const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      return handleApiError(error, `fetching orders for user ${userId}`);
    }
  },

  update: async (orderId, updates) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(`${MOCK_API_CONFIG.endpoints.orders}/${orderId}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  },

  cancel: async (orderId) => {
    const requestFn = async () => {
      const response = await fetch(buildApiUrl(`${MOCK_API_CONFIG.endpoints.orders}/${orderId}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
        timeout: MOCK_API_CONFIG.timeout
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    };
    return retryRequest(requestFn);
  }
};

export { ProductsAPI, CategoriesAPI, UsersAPI, OrdersAPI };