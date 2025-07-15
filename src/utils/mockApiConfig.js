// MockAPI Configuration
export const MOCK_API_CONFIG = {
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
  // Request timeout in milliseconds
  timeout: 10000,
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000, // milliseconds
  },
}

// Helper function to build full URL
export const buildApiUrl = (endpoint) => {
  return `${MOCK_API_CONFIG.baseURL}${endpoint}`
}

// Helper function to handle API errors
export const handleApiError = (error, context = "") => {
  console.error(`MockAPI Error ${context}:`, error)

  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || "Server error occurred",
      status: error.response.status,
      data: error.response.data,
    }
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: "Network error - please check your connection",
      status: 0,
      data: null,
    }
  } else {
    // Something else happened
    return {
      message: error.message || "An unexpected error occurred",
      status: -1,
      data: null,
    }
  }
}

// Helper function for retry logic
export const retryRequest = async (requestFn, maxAttempts = MOCK_API_CONFIG.retry.attempts) => {
  let lastError

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error

      if (attempt < maxAttempts) {
        console.warn(`MockAPI request failed (attempt ${attempt}/${maxAttempts}), retrying...`)
        await new Promise((resolve) => setTimeout(resolve, MOCK_API_CONFIG.retry.delay * attempt))
      }
    }
  }

  throw lastError
}

// Categories mapping for consistency
export const CATEGORY_MAPPING = {
  "men's clothing": "men's clothing",
  "women's clothing": "women's clothing",
  "kids clothing": "kids clothing",
  // Legacy mappings for backward compatibility
  "mens-clothing": "men's clothing",
  "womens-clothing": "women's clothing",
  "kids-clothing": "kids clothing",
}

// Product status constants
export const PRODUCT_STATUS = {
  IN_STOCK: "in_stock",
  OUT_OF_STOCK: "out_of_stock",
  LOW_STOCK: "low_stock",
  DISCONTINUED: "discontinued",
}

// Order status constants
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
}

// User roles
export const USER_ROLES = {
  CUSTOMER: "customer",
  ADMIN: "admin",
  MODERATOR: "moderator",
}

// Default pagination settings
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  sortBy: "createdAt",
  sortOrder: "desc",
}
