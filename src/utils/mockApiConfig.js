// src/utils/mockApiConfig.js

// Base configuration
const API_CONFIG = {
  baseURL: "https://686c180714219674dcc739e3.mockapi.io",
  endpoints: {
    products: "/products",
    categories: "/categories",
    users: "/users",
    orders: "/orders",
    reviews: "/reviews",
    wishlist: "/wishlist",
    cart: "/cart",
  },
  timeout: 10000,
  retry: {
    attempts: 3,
    delay: 1000,
  },
};

// Helper functions
const buildApiUrl = (endpoint) => `${API_CONFIG.baseURL}${endpoint}`;

const handleApiError = (error, context = "") => {
  console.error(`API Error ${context}:`, error);
  
  const errorResponse = {
    message: error.message || "An unexpected error occurred",
    status: -1,
    data: null,
  };

  if (error.response) {
    errorResponse.message = error.response.data?.message || "Server error occurred";
    errorResponse.status = error.response.status;
    errorResponse.data = error.response.data;
  } else if (error.request) {
    errorResponse.message = "Network error - please check your connection";
    errorResponse.status = 0;
  }

  return errorResponse;
};

const retryRequest = async (requestFn, maxAttempts = API_CONFIG.retry.attempts) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.retry.delay * attempt)
        );
      }
    }
  }
  throw lastError;
};

// Constants
const CONSTANTS = {
  CATEGORY_MAPPING: {
    "men's clothing": "men's clothing",
    "women's clothing": "women's clothing",
    "kids clothing": "kids clothing",
    "mens-clothing": "men's clothing",
    "womens-clothing": "women's clothing",
    "kids-clothing": "kids clothing",
  },
  PRODUCT_STATUS: {
    IN_STOCK: "in_stock",
    OUT_OF_STOCK: "out_of_stock",
    LOW_STOCK: "low_stock",
    DISCONTINUED: "discontinued",
  },
  ORDER_STATUS: {
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    REFUNDED: "refunded",
  },
  USER_ROLES: {
    CUSTOMER: "customer",
    ADMIN: "admin",
    MODERATOR: "moderator",
  },
  PAGINATION: {
    page: 1,
    limit: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  }
};

// Export everything
export {
  API_CONFIG as MOCK_API_CONFIG,
  buildApiUrl,
  handleApiError,
  retryRequest,
  CONSTANTS
};