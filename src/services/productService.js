// Product Service - Unified API layer with MockAPI primary and FakeStore fallback
import { ProductsAPI, CategoriesAPI } from "./mockApiService"

// Configuration
const USE_MOCK_API = true
const FALLBACK_API_URL = "https://fakestoreapi.com"

// Fallback API functions
const fallbackFetch = async (endpoint) => {
  try {
    const response = await fetch(`${FALLBACK_API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Fallback API request failed:", error)
    throw error
  }
}

// Transform FakeStore API data to match our format
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
  stockQuantity: Math.floor(Math.random() * 100) + 10,
  inStock: true,
  brand: "Generic Brand",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Black", "White", "Gray"],
  featured: Math.random() > 0.7,
  tags: [product.category],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

// Product Service Class
class ProductService {
  // Get all products with optional filtering
  async getAllProducts(filters = {}) {
    try {
      if (USE_MOCK_API) {
        console.log("🔄 Fetching products from MockAPI...")
        const products = await ProductsAPI.getAll(filters)
        console.log("✅ Products fetched from MockAPI:", products.length)
        return products
      }
    } catch (error) {
      console.warn("⚠️ MockAPI failed, falling back to FakeStore API:", error.message)
    }

    // Fallback to FakeStore API
    try {
      console.log("🔄 Fetching products from FakeStore API...")
      const products = await fallbackFetch("/products")
      const transformedProducts = products.map(transformFakeStoreProduct)
      console.log("✅ Products fetched from FakeStore API:", transformedProducts.length)
      return transformedProducts
    } catch (error) {
      console.error("❌ Both APIs failed:", error)
      throw new Error("Unable to fetch products from any API")
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      if (USE_MOCK_API) {
        console.log(`🔄 Fetching product ${id} from MockAPI...`)
        const product = await ProductsAPI.getById(id)
        console.log("✅ Product fetched from MockAPI:", product.name)
        return product
      }
    } catch (error) {
      console.warn(`⚠️ MockAPI failed for product ${id}, falling back:`, error.message)
    }

    // Fallback to FakeStore API
    try {
      console.log(`🔄 Fetching product ${id} from FakeStore API...`)
      const product = await fallbackFetch(`/products/${id}`)
      const transformedProduct = transformFakeStoreProduct(product)
      console.log("✅ Product fetched from FakeStore API:", transformedProduct.name)
      return transformedProduct
    } catch (error) {
      console.error(`❌ Failed to fetch product ${id} from both APIs:`, error)
      throw new Error(`Unable to fetch product ${id}`)
    }
  }

  // Get products by category
  async getProductsByCategory(category) {
    try {
      if (USE_MOCK_API) {
        console.log(`🔄 Fetching ${category} products from MockAPI...`)
        const products = await ProductsAPI.getByCategory(category)
        console.log(`✅ ${category} products fetched from MockAPI:`, products.length)
        return products
      }
    } catch (error) {
      console.warn(`⚠️ MockAPI failed for category ${category}, falling back:`, error.message)
    }

    // Fallback to FakeStore API
    try {
      console.log(`🔄 Fetching ${category} products from FakeStore API...`)
      const products = await fallbackFetch(`/products/category/${category}`)
      const transformedProducts = products.map(transformFakeStoreProduct)
      console.log(`✅ ${category} products fetched from FakeStore API:`, transformedProducts.length)
      return transformedProducts
    } catch (error) {
      console.error(`❌ Failed to fetch ${category} products from both APIs:`, error)
      throw new Error(`Unable to fetch products for category ${category}`)
    }
  }

  // Search products
  async searchProducts(searchTerm, filters = {}) {
    try {
      if (USE_MOCK_API) {
        console.log(`🔍 Searching products for "${searchTerm}" in MockAPI...`)
        const products = await ProductsAPI.search(searchTerm, filters)
        console.log(`✅ Found ${products.length} products in MockAPI`)
        return products
      }
    } catch (error) {
      console.warn(`⚠️ MockAPI search failed, falling back:`, error.message)
    }

    // Fallback search using FakeStore API
    try {
      console.log(`🔍 Searching products for "${searchTerm}" in FakeStore API...`)
      const allProducts = await fallbackFetch("/products")
      const transformedProducts = allProducts.map(transformFakeStoreProduct)

      // Simple search implementation
      const searchResults = transformedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      console.log(`✅ Found ${searchResults.length} products in FakeStore API`)
      return searchResults
    } catch (error) {
      console.error(`❌ Search failed in both APIs:`, error)
      throw new Error(`Unable to search for "${searchTerm}"`)
    }
  }

  // Get all categories
  async getCategories() {
    try {
      if (USE_MOCK_API) {
        console.log("🔄 Fetching categories from MockAPI...")
        const categories = await CategoriesAPI.getAll()
        console.log("✅ Categories fetched from MockAPI:", categories.length)
        return categories
      }
    } catch (error) {
      console.warn("⚠️ MockAPI categories failed, falling back:", error.message)
    }

    // Fallback to FakeStore API
    try {
      console.log("🔄 Fetching categories from FakeStore API...")
      const categories = await fallbackFetch("/products/categories")

      // Transform to match our format
      const transformedCategories = categories.map((category, index) => ({
        id: index + 1,
        name: category,
        slug: category.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
        description: `Browse our ${category} collection`,
        image: "/placeholder.svg?height=200&width=300",
        productCount: 0,
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))

      console.log("✅ Categories fetched from FakeStore API:", transformedCategories.length)
      return transformedCategories
    } catch (error) {
      console.error("❌ Failed to fetch categories from both APIs:", error)
      throw new Error("Unable to fetch categories")
    }
  }

  // Get featured products
  async getFeaturedProducts() {
    try {
      if (USE_MOCK_API) {
        console.log("🔄 Fetching featured products from MockAPI...")
        const products = await ProductsAPI.getFeatured()
        console.log("✅ Featured products fetched from MockAPI:", products.length)
        return products
      }
    } catch (error) {
      console.warn("⚠️ MockAPI featured products failed, falling back:", error.message)
    }

    // Fallback - get random products from FakeStore API
    try {
      console.log("🔄 Getting random products as featured from FakeStore API...")
      const allProducts = await fallbackFetch("/products")
      const transformedProducts = allProducts.map(transformFakeStoreProduct)

      // Get random 6 products as featured
      const shuffled = transformedProducts.sort(() => 0.5 - Math.random())
      const featured = shuffled.slice(0, 6).map((product) => ({ ...product, featured: true }))

      console.log("✅ Featured products created from FakeStore API:", featured.length)
      return featured
    } catch (error) {
      console.error("❌ Failed to get featured products from both APIs:", error)
      throw new Error("Unable to fetch featured products")
    }
  }

  // Create new product (MockAPI only)
  async createProduct(productData) {
    if (!USE_MOCK_API) {
      throw new Error("Product creation is only available with MockAPI")
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

  // Update product (MockAPI only)
  async updateProduct(id, productData) {
    if (!USE_MOCK_API) {
      throw new Error("Product updates are only available with MockAPI")
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

  // Delete product (MockAPI only)
  async deleteProduct(id) {
    if (!USE_MOCK_API) {
      throw new Error("Product deletion is only available with MockAPI")
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
