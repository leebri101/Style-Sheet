// MockAPI Service - API layer
import { MOCK_API_CONFIG, ENDPOINTS, createRequestConfig, retryRequest, handleApiError } from "../utils/mockApiConfig"

// Base API class
class BaseAPI {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.baseURL = MOCK_API_CONFIG.baseURL
  }

  async request(path = "", options = {}) {
    const url = `${this.baseURL}${this.endpoint}${path}`
    const config = {
      ...createRequestConfig(),
      ...options,
      signal: AbortSignal.timeout(MOCK_API_CONFIG.timeout),
    }

    try {
      const response = await retryRequest(async () => {
        const res = await fetch(url, config)
        if (!res.ok) {
          const error = new Error(`HTTP ${res.status}: ${res.statusText}`)
          error.status = res.status
          error.statusText = res.statusText
          throw error
        }
        return res
      })

      const data = await response.json()
      return { data, status: response.status }
    } catch (error) {
      handleApiError(error, `${this.endpoint}${path}`)
    }
  }

  async getAll(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const path = queryString ? `?${queryString}` : ""
    const response = await this.request(path)
    return response.data
  }

  async getById(id) {
    const response = await this.request(`/${id}`)
    return response.data
  }

  async create(data) {
    const response = await this.request("", {
      method: "POST",
      body: JSON.stringify(data),
    })
    return response.data
  }

  async update(id, data) {
    const response = await this.request(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
    return response.data
  }

  async delete(id) {
    const response = await this.request(`/${id}`, {
      method: "DELETE",
    })
    return response.data
  }
}

// Products API
class ProductsAPIClass extends BaseAPI {
  constructor() {
    super(ENDPOINTS.products)
  }

  async getByCategory(category) {
    const response = await this.request(`?category=${encodeURIComponent(category)}`)
    return response.data
  }

  async search(searchTerm, filters = {}) {
    const params = new URLSearchParams({
      search: searchTerm,
      ...filters,
    })
    const response = await this.request(`?${params.toString()}`)
    return response.data
  }

  async getFeatured() {
    const response = await this.request("?featured=true")
    return response.data
  }

  async updateStock(id, quantity) {
    const response = await this.request(`/${id}`, {
      method: "PUT",
      body: JSON.stringify({ stockQuantity: quantity }),
    })
    return response.data
  }
}

// Categories API
class CategoriesAPIClass extends BaseAPI {
  constructor() {
    super(ENDPOINTS.categories)
  }

  async getWithProductCount() {
    const response = await this.request("?includeProductCount=true")
    return response.data
  }
}

// Users API
class UsersAPIClass extends BaseAPI {
  constructor() {
    super(ENDPOINTS.users)
  }

  async getByEmail(email) {
    const response = await this.request(`?email=${encodeURIComponent(email)}`)
    return response.data[0] || null
  }

  async authenticate(email, password) {
    const response = await this.request("", {
      method: "POST",
      body: JSON.stringify({ email, password, action: "authenticate" }),
    })
    return response.data
  }

  async register(userData) {
    const response = await this.request("", {
      method: "POST",
      body: JSON.stringify({
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
    return response.data
  }
}

// Orders API
class OrdersAPIClass extends BaseAPI {
  constructor() {
    super(ENDPOINTS.orders)
  }

  async getByUserId(userId) {
    const response = await this.request(`?userId=${userId}`)
    return response.data
  }

  async updateStatus(id, status) {
    const response = await this.request(`/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status,
        updatedAt: new Date().toISOString(),
      }),
    })
    return response.data
  }

  async getByStatus(status) {
    const response = await this.request(`?status=${status}`)
    return response.data
  }
}

// Reviews API
class ReviewsAPIClass extends BaseAPI {
  constructor() {
    super(ENDPOINTS.reviews)
  }

  async getByProductId(productId) {
    const response = await this.request(`?productId=${productId}`)
    return response.data
  }

  async getByUserId(userId) {
    const response = await this.request(`?userId=${userId}`)
    return response.data
  }

  async createReview(reviewData) {
    const response = await this.request("", {
      method: "POST",
      body: JSON.stringify({
        ...reviewData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
    return response.data
  }
}

// Wishlist API
class WishlistAPIClass extends BaseAPI {
  constructor() {
    super(ENDPOINTS.wishlist)
  }

  async getByUserId(userId) {
    const response = await this.request(`?userId=${userId}`)
    return response.data
  }

  async addItem(userId, productId) {
    const response = await this.request("", {
      method: "POST",
      body: JSON.stringify({
        userId,
        productId,
        createdAt: new Date().toISOString(),
      }),
    })
    return response.data
  }

  async removeItem(userId, productId) {
    // First get the wishlist item
    const items = await this.getByUserId(userId)
    const item = items.find((i) => i.productId === productId)

    if (item) {
      const response = await this.request(`/${item.id}`, {
        method: "DELETE",
      })
      return response.data
    }

    return null
  }
}

// Cart API
class CartAPIClass extends BaseAPI {
  constructor() {
    super(ENDPOINTS.cart)
  }

  async getByUserId(userId) {
    const response = await this.request(`?userId=${userId}`)
    return response.data
  }

  async addItem(userId, productId, quantity = 1, size = null, color = null) {
    const response = await this.request("", {
      method: "POST",
      body: JSON.stringify({
        userId,
        productId,
        quantity,
        size,
        color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
    return response.data
  }

  async updateQuantity(cartItemId, quantity) {
    const response = await this.request(`/${cartItemId}`, {
      method: "PUT",
      body: JSON.stringify({
        quantity,
        updatedAt: new Date().toISOString(),
      }),
    })
    return response.data
  }

  async removeItem(cartItemId) {
    const response = await this.request(`/${cartItemId}`, {
      method: "DELETE",
    })
    return response.data
  }

  async clearCart(userId) {
    const items = await this.getByUserId(userId)
    const deletePromises = items.map((item) => this.removeItem(item.id))
    await Promise.all(deletePromises)
    return true
  }
}

// Export API instances
export const ProductsAPI = new ProductsAPIClass()
export const CategoriesAPI = new CategoriesAPIClass()
export const UsersAPI = new UsersAPIClass()
export const OrdersAPI = new OrdersAPIClass()
export const ReviewsAPI = new ReviewsAPIClass()
export const WishlistAPI = new WishlistAPIClass()
export const CartAPI = new CartAPIClass()

// Export for convenience
export default {
  Products: ProductsAPI,
  Categories: CategoriesAPI,
  Users: UsersAPI,
  Orders: OrdersAPI,
  Reviews: ReviewsAPI,
  Wishlist: WishlistAPI,
  Cart: CartAPI,
}
