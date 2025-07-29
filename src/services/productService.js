// Product Service - FakeStore API Primary with MockAPI fallback
import { ProductsAPI, CategoriesAPI } from "./mockApiService"

// Configuration - FakeStore API is now primary
const USE_FAKESTORE_PRIMARY = true
const FAKESTORE_API_URL = "https://fakestoreapi.com"
const MOCKAPI_FALLBACK = false

// FakeStore API functions
const fakeStoreFetch = async (endpoint) => {
  try {
    console.log(`🔄 Fetching from FakeStore API: ${endpoint}`)
    const response = await fetch(`${FAKESTORE_API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(`✅ FakeStore API response received:`, data.length || "single item")
    return data
  } catch (error) {
    console.error("❌ FakeStore API request failed:", error)
    throw error
  }
}

// Transform FakeStore API data to match our application format
const transformFakeStoreProduct = (product) => ({
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
  stockQuantity: Math.floor(Math.random() * 100) + 10, // Random stock for demo
  inStock: true,
  brand: "Generic Brand",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Black", "White", "Gray"],
  featured: Math.random() > 0.7, // Random featured status
  tags: [product.category],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

// Transform FakeStore category to match our format
const transformFakeStoreCategory = (category, index) => ({
  id: index + 1,
  name: category.charAt(0).toUpperCase() + category.slice(1),
  slug: category.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
  description: `Browse our ${category} collection`,
  image: "/placeholder.svg?height=200&width=300",
  productCount: 0,
  featured: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

// Product Service Class
class ProductService {
  // Get all products with optional filtering
  async getAllProducts(filters = {}) {
    if (USE_FAKESTORE_PRIMARY) {
      try {
        const products = await fakeStoreFetch("/products")
        const transformedProducts = products.map(transformFakeStoreProduct)
        console.log("✅ Products fetched from FakeStore API:", transformedProducts.length)
        return transformedProducts
      } catch (error) {
        console.warn("⚠️ FakeStore API failed, trying MockAPI fallback:", error.message)

        if (MOCKAPI_FALLBACK) {
          try {
            const products = await ProductsAPI.getAll(filters)
            console.log("✅ Products fetched from MockAPI fallback:", products.length)
            return products
          } catch (fallbackError) {
            console.error("❌ Both APIs failed:", fallbackError)
            throw new Error("Unable to fetch products from any API")
          }
        } else {
          throw new Error("FakeStore API failed and fallback is disabled")
        }
      }
    }

    // Legacy MockAPI path (if USE_FAKESTORE_PRIMARY is false)
    try {
      const products = await ProductsAPI.getAll(filters)
      console.log("✅ Products fetched from MockAPI:", products.length)
      return products
    } catch (error) {
      console.error("❌ MockAPI failed:", error)
      throw new Error("Unable to fetch products")
    }
  }

  // Get product by ID
  async getProductById(id) {
    if (USE_FAKESTORE_PRIMARY) {
      try {
        const product = await fakeStoreFetch(`/products/${id}`)
        const transformedProduct = transformFakeStoreProduct(product)
        console.log("✅ Product fetched from FakeStore API:", transformedProduct.name)
        return transformedProduct
      } catch (error) {
        console.warn(`⚠️ FakeStore API failed for product ${id}, trying MockAPI:`, error.message)

        if (MOCKAPI_FALLBACK) {
          try {
            const product = await ProductsAPI.getById(id)
            console.log("✅ Product fetched from MockAPI fallback:", product.name)
            return product
          } catch (fallbackError) {
            console.error(`❌ Both APIs failed for product ${id}:`, fallbackError)
            throw new Error(`Unable to fetch product ${id}`)
          }
        } else {
          throw new Error(`FakeStore API failed for product ${id} and fallback is disabled`)
        }
      }
    }

    // Legacy MockAPI path
    try {
      const product = await ProductsAPI.getById(id)
      console.log("✅ Product fetched from MockAPI:", product.name)
      return product
    } catch (error) {
      console.error(`❌ MockAPI failed for product ${id}:`, error)
      throw new Error(`Unable to fetch product ${id}`)
    }
  }

  // Get products by category
  async getProductsByCategory(category) {
    if (USE_FAKESTORE_PRIMARY) {
      try {
        const products = await fakeStoreFetch(`/products/category/${category}`)
        const transformedProducts = products.map(transformFakeStoreProduct)
        console.log(`✅ ${category} products fetched from FakeStore API:`, transformedProducts.length)
        return transformedProducts
      } catch (error) {
        console.warn(`⚠️ FakeStore API failed for category ${category}:`, error.message)

        if (MOCKAPI_FALLBACK) {
          try {
            const products = await ProductsAPI.getByCategory(category)
            console.log(`✅ ${category} products fetched from MockAPI fallback:`, products.length)
            return products
          } catch (fallbackError) {
            console.error(`❌ Both APIs failed for category ${category}:`, fallbackError)
            throw new Error(`Unable to fetch products for category ${category}`)
          }
        } else {
          throw new Error(`FakeStore API failed for category ${category} and fallback is disabled`)
        }
      }
    }

    // Legacy MockAPI path
    try {
      const products = await ProductsAPI.getByCategory(category)
      console.log(`✅ ${category} products fetched from MockAPI:`, products.length)
      return products
    } catch (error) {
      console.error(`❌ MockAPI failed for category ${category}:`, error)
      throw new Error(`Unable to fetch products for category ${category}`)
    }
  }

  // Search products
  async searchProducts(searchTerm, filters = {}) {
    if (USE_FAKESTORE_PRIMARY) {
      try {
        // FakeStore API doesn't have search, so we get all products and filter
        const allProducts = await fakeStoreFetch("/products")
        const transformedProducts = allProducts.map(transformFakeStoreProduct)

        // Client-side search implementation
        const searchResults = transformedProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        console.log(`✅ Found ${searchResults.length} products for "${searchTerm}" in FakeStore API`)
        return searchResults
      } catch (error) {
        console.warn(`⚠️ FakeStore API search failed:`, error.message)

        if (MOCKAPI_FALLBACK) {
          try {
            const products = await ProductsAPI.search(searchTerm, filters)
            console.log(`✅ Found ${products.length} products for "${searchTerm}" in MockAPI`)
            return products
          } catch (fallbackError) {
            console.error(`❌ Both APIs failed for search "${searchTerm}":`, fallbackError)
            throw new Error(`Unable to search for "${searchTerm}"`)
          }
        } else {
          throw new Error(`FakeStore API search failed and fallback is disabled`)
        }
      }
    }

    // Legacy MockAPI path
    try {
      const products = await ProductsAPI.search(searchTerm, filters)
      console.log(`✅ Found ${products.length} products for "${searchTerm}" in MockAPI`)
      return products
    } catch (error) {
      console.error(`❌ MockAPI search failed:`, error)
      throw new Error(`Unable to search for "${searchTerm}"`)
    }
  }

  // Get all categories
  async getCategories() {
    if (USE_FAKESTORE_PRIMARY) {
      try {
        const categories = await fakeStoreFetch("/products/categories")
        const transformedCategories = categories.map(transformFakeStoreCategory)
        console.log("✅ Categories fetched from FakeStore API:", transformedCategories.length)
        return transformedCategories
      } catch (error) {
        console.warn("⚠️ FakeStore API categories failed:", error.message)

        if (MOCKAPI_FALLBACK) {
          try {
            const categories = await CategoriesAPI.getAll()
            console.log("✅ Categories fetched from MockAPI fallback:", categories.length)
            return categories
          } catch (fallbackError) {
            console.error("❌ Both APIs failed for categories:", fallbackError)
            throw new Error("Unable to fetch categories")
          }
        } else {
          throw new Error("FakeStore API categories failed and fallback is disabled")
        }
      }
    }

    // Legacy MockAPI path
    try {
      const categories = await CategoriesAPI.getAll()
      console.log("✅ Categories fetched from MockAPI:", categories.length)
      return categories
    } catch (error) {
      console.error("❌ MockAPI categories failed:", error)
      throw new Error("Unable to fetch categories")
    }
  }

  // Get featured products
  async getFeaturedProducts() {
    if (USE_FAKESTORE_PRIMARY) {
      try {
        // Get all products and filter for featured ones
        const allProducts = await fakeStoreFetch("/products")
        const transformedProducts = allProducts.map(transformFakeStoreProduct)

        // Get random 6 products as featured
        const shuffled = transformedProducts.sort(() => 0.5 - Math.random())
        const featured = shuffled.slice(0, 6).map((product) => ({ ...product, featured: true }))

        console.log("✅ Featured products created from FakeStore API:", featured.length)
        return featured
      } catch (error) {
        console.warn("⚠️ FakeStore API featured products failed:", error.message)

        if (MOCKAPI_FALLBACK) {
          try {
            const products = await ProductsAPI.getFeatured()
            console.log("✅ Featured products fetched from MockAPI fallback:", products.length)
            return products
          } catch (fallbackError) {
            console.error("❌ Both APIs failed for featured products:", fallbackError)
            throw new Error("Unable to fetch featured products")
          }
        } else {
          throw new Error("FakeStore API featured products failed and fallback is disabled")
        }
      }
    }

    // Legacy MockAPI path
    try {
      const products = await ProductsAPI.getFeatured()
      console.log("✅ Featured products fetched from MockAPI:", products.length)
      return products
    } catch (error) {
      console.error("❌ MockAPI featured products failed:", error)
      throw new Error("Unable to fetch featured products")
    }
  }

  // Create new product (MockAPI only - FakeStore API doesn't support this)
  async createProduct(productData) {
    if (USE_FAKESTORE_PRIMARY) {
      console.warn("⚠️ Product creation not supported with FakeStore API")
      throw new Error("Product creation is not supported with FakeStore API")
    }

    try {
      console.log("🔄 Creating new product in MockAPI...")
      const newProduct = await ProductsAPI.create(productData)
      console.log("✅ Product created successfully:", newProduct.name)
      return newProduct
    } catch (error) {
      console.error("❌ Failed to create product:", error)
      throw new Error("Unable to create product")
    }
  }

  // Update product (MockAPI only - FakeStore API doesn't support this)
  async updateProduct(id, productData) {
    if (USE_FAKESTORE_PRIMARY) {
      console.warn("⚠️ Product updates not supported with FakeStore API")
      throw new Error("Product updates are not supported with FakeStore API")
    }

    try {
      console.log(`🔄 Updating product ${id} in MockAPI...`)
      const updatedProduct = await ProductsAPI.update(id, productData)
      console.log("✅ Product updated successfully:", updatedProduct.name)
      return updatedProduct
    } catch (error) {
      console.error(`❌ Failed to update product ${id}:`, error)
      throw new Error(`Unable to update product ${id}`)
    }
  }

  // Delete product (MockAPI only - FakeStore API doesn't support this)
  async deleteProduct(id) {
    if (USE_FAKESTORE_PRIMARY) {
      console.warn("⚠️ Product deletion not supported with FakeStore API")
      throw new Error("Product deletion is not supported with FakeStore API")
    }

    try {
      console.log(`🔄 Deleting product ${id} from MockAPI...`)
      await ProductsAPI.delete(id)
      console.log("✅ Product deleted successfully")
      return true
    } catch (error) {
      console.error(`❌ Failed to delete product ${id}:`, error)
      throw new Error(`Unable to delete product ${id}`)
    }
  }
}

// Export singleton instance
const productService = new ProductService()
export default productService

// Export individual methods for convenience
export const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getCategories,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = productService
