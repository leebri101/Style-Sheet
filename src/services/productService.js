// src/services/productService.js
import { ProductsAPI, CategoriesAPI } from "./mockApiService";

// Configuration
const API_CONFIG = {
  useMockAPI: true,
  fallbackAPI: {
    baseURL: "https://fakestoreapi.com",
    endpoints: {
      products: "/products",
      categories: "/products/categories",
      product: "/products/{id}",
      category: "/products/category/{category}",
    },
  },
  logLevel: "debug",
};

// Logger utility
const logger = {
  debug: (...args) => API_CONFIG.logLevel === "debug" && console.debug("🔍", ...args),
  info: (...args) => ["debug", "info"].includes(API_CONFIG.logLevel) && console.log("ℹ️", ...args),
  warn: (...args) => ["debug", "info", "warn"].includes(API_CONFIG.logLevel) && console.warn("⚠️", ...args),
  error: (...args) => console.error("❌", ...args),
};

// Fallback API Service
class FallbackAPIService {
  constructor() {
    this.baseURL = API_CONFIG.fallbackAPI.baseURL;
  }

  async request(endpoint) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      logger.error("Fallback API request failed:", error.message);
      throw error;
    }
  }

  async getProducts() {
    return this.request(API_CONFIG.fallbackAPI.endpoints.products);
  }

  async getProduct(id) {
    return this.request(
      API_CONFIG.fallbackAPI.endpoints.product.replace("{id}", id)
    );
  }

  async getProductsByCategory(category) {
    return this.request(
      API_CONFIG.fallbackAPI.endpoints.category.replace("{category}", category)
    );
  }

  async getCategories() {
    return this.request(API_CONFIG.fallbackAPI.endpoints.categories);
  }
}

const fallbackAPI = new FallbackAPIService();

// Data Transformer
class DataTransformer {
  static transformProduct(product) {
    return {
      id: product.id,
      name: product.title,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      images: [product.image],
      rating: {
        rate: product.rating?.rate || 0,
        count: product.rating?.count || 0,
      },
      stockQuantity: Math.floor(Math.random() * 100) + 10,
      inStock: true,
      brand: "Generic Brand",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Gray"],
      featured: Math.random() > 0.7,
      tags: [product.category],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  static transformCategory(category, index) {
    return {
      id: index + 1,
      name: category,
      slug: category.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
      description: `Browse our ${category} collection`,
      image: "/placeholder.svg?height=200&width=300",
      productCount: 0,
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

// Main Product Service
class ProductService {
  constructor() {
    this.fallbackEnabled = !API_CONFIG.useMockAPI;
  }

  async #tryMockAPICall(operation, callback) {
    if (!API_CONFIG.useMockAPI) {
      throw new Error(`Operation ${operation} requires MockAPI`);
    }

    try {
      logger.debug(`Attempting ${operation} with MockAPI...`);
      const result = await callback();
      logger.info(`Successfully completed ${operation} with MockAPI`);
      return result;
    } catch (error) {
      logger.warn(`MockAPI failed for ${operation}:`, error.message);
      this.fallbackEnabled = true;
      throw error;
    }
  }

  async #withFallback(operation, primaryCallback, fallbackCallback) {
    try {
      return await primaryCallback();
    } catch (error) {
      if (!this.fallbackEnabled) {
        throw error;
      }

      logger.warn(`Primary API failed for ${operation}, attempting fallback...`);
      try {
        const result = await fallbackCallback();
        logger.info(`Fallback succeeded for ${operation}`);
        return result;
      } catch (fallbackError) {
        logger.error(`Both APIs failed for ${operation}:`, fallbackError.message);
        throw new Error(`Unable to complete ${operation}`);
      }
    }
  }

  // Product methods
  async getAllProducts(filters = {}) {
    return this.#withFallback(
      "getAllProducts",
      () => this.#tryMockAPICall("getAllProducts", () => ProductsAPI.getAll(filters)),
      async () => {
        const products = await fallbackAPI.getProducts();
        return products.map(DataTransformer.transformProduct);
      }
    );
  }

  async getProductById(id) {
    return this.#withFallback(
      "getProductById",
      () => this.#tryMockAPICall("getProductById", () => ProductsAPI.getById(id)),
      async () => {
        const product = await fallbackAPI.getProduct(id);
        return DataTransformer.transformProduct(product);
      }
    );
  }

  async getProductsByCategory(category) {
    return this.#withFallback(
      "getProductsByCategory",
      () => this.#tryMockAPICall("getProductsByCategory", () => 
        ProductsAPI.getByCategory(category)
      ),
      async () => {
        const products = await fallbackAPI.getProductsByCategory(category);
        return products.map(DataTransformer.transformProduct);
      }
    );
  }

  async searchProducts(searchTerm, filters = {}) {
    return this.#withFallback(
      "searchProducts",
      () => this.#tryMockAPICall("searchProducts", () => 
        ProductsAPI.search(searchTerm, filters)
      ),
      async () => {
        const allProducts = await fallbackAPI.getProducts();
        const transformedProducts = allProducts.map(DataTransformer.transformProduct);
        return transformedProducts.filter(
          product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    );
  }

  // Category methods
  async getCategories() {
    return this.#withFallback(
      "getCategories",
      () => this.#tryMockAPICall("getCategories", () => CategoriesAPI.getAll()),
      async () => {
        const categories = await fallbackAPI.getCategories();
        return categories.map(DataTransformer.transformCategory);
      }
    );
  }

  async getCategoryById(id) {
    return this.#tryMockAPICall(
      "getCategoryById",
      () => CategoriesAPI.getById(id)
    );
  }

  // Featured products
  async getFeaturedProducts() {
    return this.#withFallback(
      "getFeaturedProducts",
      () => this.#tryMockAPICall("getFeaturedProducts", () => ProductsAPI.getFeatured()),
      async () => {
        const allProducts = await fallbackAPI.getProducts();
        const transformedProducts = allProducts.map(DataTransformer.transformProduct);
        const shuffled = transformedProducts.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6).map(product => ({ 
          ...product, 
          featured: true 
        }));
      }
    );
  }

  // Write operations (MockAPI only)
  async createProduct(productData) {
    return this.#tryMockAPICall(
      "createProduct",
      () => ProductsAPI.create(productData)
    );
  }

  async updateProduct(id, productData) {
    return this.#tryMockAPICall(
      "updateProduct",
      () => ProductsAPI.update(id, productData)
    );
  }

  async deleteProduct(id) {
    return this.#tryMockAPICall(
      "deleteProduct",
      () => ProductsAPI.delete(id)
    );
  }

  async createCategory(categoryData) {
    return this.#tryMockAPICall(
      "createCategory",
      () => CategoriesAPI.create(categoryData)
    );
  }

  async updateCategory(id, categoryData) {
    return this.#tryMockAPICall(
      "updateCategory",
      () => CategoriesAPI.update(id, categoryData)
    );
  }

  async deleteCategory(id) {
    return this.#tryMockAPICall(
      "deleteCategory",
      () => CategoriesAPI.delete(id)
    );
  }
}

// Export singleton instance
const productService = new ProductService();
export default productService;

// Export individual methods for convenience
export const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getCategories,
  getCategoryById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createCategory,
  updateCategory,
  deleteCategory
} = productService;