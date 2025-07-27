// src/services/mockApiService.js
import {
  MOCK_API_CONFIG,
  buildApiUrl,
  handleApiError,
  retryRequest,
  CONSTANTS
} from '../utils/mockApiConfig';

// Product Services
export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.products}?${query}`);
    const response = await fetch(url, {
      timeout: MOCK_API_CONFIG.timeout
    });
    return await response.json();
  } catch (error) {
    return handleApiError(error, "fetching products");
  }
};

// Cart Services
export const addToCart = async (productData) => {
  const requestFn = async () => {
    const response = await fetch(buildApiUrl(MOCK_API_CONFIG.endpoints.cart), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...productData,
        date: new Date().toISOString()
      }),
      timeout: MOCK_API_CONFIG.timeout
    });
    return await response.json();
  };
  return retryRequest(requestFn);
};

export const getCartItems = async (userId) => {
  try {
    const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.cart}?userId=${userId}`);
    const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
    return await response.json();
  } catch (error) {
    return handleApiError(error, "fetching cart items");
  }
};

// Wishlist Services
export const getWishlist = async (userId) => {
  try {
    const url = buildApiUrl(`${MOCK_API_CONFIG.endpoints.wishlist}?userId=${userId}`);
    const response = await fetch(url, { timeout: MOCK_API_CONFIG.timeout });
    return await response.json();
  } catch (error) {
    return handleApiError(error, "fetching wishlist");
  }
};

export const addToWishlist = async (productData) => {
  const requestFn = async () => {
    const response = await fetch(buildApiUrl(MOCK_API_CONFIG.endpoints.wishlist), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
      timeout: MOCK_API_CONFIG.timeout
    });
    return await response.json();
  };
  return retryRequest(requestFn);
};

export const removeFromWishlist = async (itemId) => {
  const requestFn = async () => {
    const response = await fetch(
      buildApiUrl(`${MOCK_API_CONFIG.endpoints.wishlist}/${itemId}`), 
      {
        method: 'DELETE',
        timeout: MOCK_API_CONFIG.timeout
      }
    );
    return await response.json();
  };
  return retryRequest(requestFn);
};

// Export constants if needed
export const {
  CATEGORY_MAPPING,
  PRODUCT_STATUS,
  ORDER_STATUS,
  USER_ROLES,
  PAGINATION
} = CONSTANTS;