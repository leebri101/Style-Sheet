// Product Service - FakeStore API Only
const FAKESTORE_API_URL = "https://fakestoreapi.com"

// Improved FakeStore API fetch function with better error handling
const fakeStoreFetch = async (endpoint) => {
  try {
    console.log(`🔄 Fetching from FakeStore API: ${endpoint}`)
    const response = await fetch(`${FAKESTORE_API_URL}${endpoint}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    // Check if response is empty
    const text = await response.text()
    if (!text.trim()) {
      throw new Error('Empty response received from API')
    }
    
    const data = JSON.parse(text)
    console.log(`✅ FakeStore API response received:`, Array.isArray(data) ? `${data.length} items` : "single item")
    return data
  } catch (error) {
    console.error("❌ FakeStore API request failed:", error)
    throw new Error(`Failed to fetch from FakeStore API: ${error.message}`)
  }
}

// Transform FakeStore API data to match our application format
const transformFakeStoreProduct = (product) => {
  // Generate additional properties for enhanced functionality
  const generateSizes = (category) => {
    if (category && category.includes("clothing")) {
      return ["XS", "S", "M", "L", "XL", "XXL"]
    }
    if (category === "electronics") {
      return ["Standard"]
    }
    return ["One Size"]
  }

  const generateColors = (category) => {
    if (category && category.includes("clothing")) {
      return ["Black", "White", "Navy", "Gray", "Red"]
    }
    if (category === "electronics") {
      return ["Black", "Silver", "White"]
    }
    return ["Default"]
  }

  const generateBrand = (category) => {
    const brands = {
      "men's clothing": ["Nike", "Adidas", "H&M", "Zara", "Uniqlo"],
      "women's clothing": ["Zara", "H&M", "Forever 21", "ASOS", "Mango"],
      electronics: ["Samsung", "Apple", "Sony", "LG", "HP"],
      jewelery: ["Pandora", "Tiffany", "Cartier", "Swarovski", "Kay"],
    }
    const categoryBrands = brands[category] || ["Generic"]
    return categoryBrands[Math.floor(Math.random() * categoryBrands.length)]
  }

  return {
    id: product.id,
    name: product.title,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    images: [product.image, product.image, product.image], // Duplicate for gallery effect
    rating: {
      rate: product.rating?.rate || 0,
      count: product.rating?.count || 0,
    },
    stockQuantity: Math.floor(Math.random() * 100) + 10, // Random stock between 10-109
    inStock: true,
    brand: generateBrand(product.category),
    sizes: generateSizes(product.category),
    colors: generateColors(product.category),
    featured: Math.random() > 0.7, // 30% chance of being featured
    tags: [product.category, "popular", "trending"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

// Transform FakeStore category to match our format
const transformFakeStoreCategory = (category, index) => {
  const categoryImages = {
    "men's clothing": "/placeholder.svg?height=200&width=300&text=Men's+Clothing",
    "women's clothing": "/placeholder.svg?height=200&width=300&text=Women's+Clothing",
    electronics: "/placeholder.svg?height=200&width=300&text=Electronics",
    jewelery: "/placeholder.svg?height=200&width=300&text=Jewelry",
  }

  const categoryDescriptions = {
    "men's clothing": "Stylish and comfortable clothing for men",
    "women's clothing": "Fashion-forward clothing for women",
    electronics: "Latest gadgets and electronic devices",
    jewelery: "Beautiful jewelry and accessories",
  }

  return {
    id: index + 1,
    name: category.charAt(0).toUpperCase() + category.slice(1).replace("'s", "'s"),
    slug: category.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase(),
    description: categoryDescriptions[category] || `Browse our ${category} collection`,
    image: categoryImages[category] || "/placeholder.svg?height=200&width=300",
    productCount: 0, // Will be calculated separately
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

// Product Service Class - FakeStore API Only
class ProductService {
  // Get all products with optional filtering
  async getAllProducts(filters = {}) {
    try {
      const customProducts = this.getCustomProducts()
      const products = await fakeStoreFetch("/products")
      const transformedProducts = products.map(transformFakeStoreProduct)

      const allProducts = [...transformedProducts, ...customProducts]

      let filteredProducts = allProducts

      if (filters.category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category.toLowerCase() === filters.category.toLowerCase(),
        )
      }

      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice)
      }

      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice)
      }

      if (filters.inStock) {
        filteredProducts = filteredProducts.filter((product) => product.inStock)
      }

      console.log("✅ Products fetched and transformed (including custom):", filteredProducts.length)
      return filteredProducts
    } catch (error) {
      console.error("❌ Failed to fetch products:", error)
      throw new Error("Unable to fetch products")
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      // Handle custom products first
      if (id.toString().startsWith("custom_") || isNaN(id)) {
        const customProducts = this.getCustomProducts()
        const customProduct = customProducts.find((p) => p.id === id)
        if (customProduct) {
          console.log("✅ Custom product fetched:", customProduct.name)
          return customProduct
        }
        throw new Error(`Custom product with ID ${id} not found`)
      }

      // Handle numeric IDs for FakeStore API
      const product = await fakeStoreFetch(`/products/${id}`)
      const transformedProduct = transformFakeStoreProduct(product)
      console.log("✅ Product fetched from FakeStore API:", transformedProduct.name)
      return transformedProduct
    } catch (error) {
      console.error(`❌ Failed to fetch product ${id}:`, error)
      throw new Error(`Unable to fetch product ${id}`)
    }
  }

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const products = await fakeStoreFetch(`/products/category/${encodeURIComponent(category)}`)
      const transformedProducts = products.map(transformFakeStoreProduct)

      const customProducts = this.getCustomProducts()
      const customCategoryProducts = customProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())

      const filteredProducts = [...transformedProducts, ...customCategoryProducts]

      console.log(`✅ ${category} products fetched from FakeStore API:`, filteredProducts.length)
      return filteredProducts
    } catch (error) {
      console.error(`❌ Failed to fetch products for category ${category}:`, error)
      throw new Error(`Unable to fetch products for category ${category} from FakeStore API`)
    }
  }

  // Search products (client-side implementation)
  async searchProducts(searchTerm, filters = {}) {
    try {
      const customProducts = this.getCustomProducts()
      const allProducts = await fakeStoreFetch("/products")
      const transformedProducts = allProducts.map(transformFakeStoreProduct)

      const combinedProducts = [...transformedProducts, ...customProducts]

      const searchResults = combinedProducts.filter((product) => {
        const searchFields = [
          product.name,
          product.description,
          product.category,
          product.brand,
          ...(product.tags || []),
        ]
          .join(" ")
          .toLowerCase()

        return searchFields.includes(searchTerm.toLowerCase())
      })

      let filteredResults = searchResults

      if (filters.category) {
        filteredResults = filteredResults.filter(
          (product) => product.category.toLowerCase() === filters.category.toLowerCase(),
        )
      }

      if (filters.minPrice) {
        filteredResults = filteredResults.filter((product) => product.price >= filters.minPrice)
      }

      if (filters.maxPrice) {
        filteredResults = filteredResults.filter((product) => product.price <= filters.maxPrice)
      }

      console.log(`✅ Found ${filteredResults.length} products for "${searchTerm}" (including custom)`)
      return filteredResults
    } catch (error) {
      console.error(`❌ Search failed for "${searchTerm}":`, error)
      throw new Error(`Unable to search for "${searchTerm}"`)
    }
  }

  // Get all categories
  async getCategories() {
    try {
      const categories = await fakeStoreFetch("/products/categories")
      const transformedCategories = categories.map(transformFakeStoreCategory)

      const allProducts = await fakeStoreFetch("/products")
      const customProducts = this.getCustomProducts()
      transformedCategories.forEach((category) => {
        const categoryProducts = allProducts.filter(
          (product) => product.category.toLowerCase() === category.name.toLowerCase().replace("'s", "'s"),
        )
        const customCategoryProducts = customProducts.filter(
          (p) => p.category.toLowerCase() === category.name.toLowerCase(),
        )
        category.productCount = categoryProducts.length + customCategoryProducts.length
      })

      console.log("✅ Categories fetched from FakeStore API:", transformedCategories.length)
      return transformedCategories
    } catch (error) {
      console.error("❌ Failed to fetch categories:", error)
      throw new Error("Unable to fetch categories from FakeStore API")
    }
  }

  // Get featured products
  async getFeaturedProducts() {
    try {
      const allProducts = await fakeStoreFetch("/products")
      const transformedProducts = allProducts.map(transformFakeStoreProduct)

      const customProducts = this.getCustomProducts()
      const featuredProducts = [...transformedProducts, ...customProducts]
        .filter((product) => product.rating.rate >= 4.0)
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 6)
        .map((product) => ({ ...product, featured: true }))

      console.log("✅ Featured products selected from FakeStore API:", featuredProducts.length)
      return featuredProducts
    } catch (error) {
      console.error("❌ Failed to get featured products:", error)
      throw new Error("Unable to fetch featured products from FakeStore API")
    }
  }

  // Get products by price range
  async getProductsByPriceRange(minPrice, maxPrice) {
    try {
      const allProducts = await this.getAllProducts()
      const filteredProducts = allProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)

      console.log(`✅ Found ${filteredProducts.length} products in price range $${minPrice}-$${maxPrice}`)
      return filteredProducts
    } catch (error) {
      console.error(`❌ Failed to get products by price range:`, error)
      throw new Error("Unable to fetch products by price range")
    }
  }

  // Get products by rating
  async getProductsByRating(minRating) {
    try {
      const allProducts = await this.getAllProducts()
      const filteredProducts = allProducts.filter((product) => product.rating.rate >= minRating)

      console.log(`✅ Found ${filteredProducts.length} products with rating >= ${minRating}`)
      return filteredProducts
    } catch (error) {
      console.error(`❌ Failed to get products by rating:`, error)
      throw new Error("Unable to fetch products by rating")
    }
  }

  // Get random products (for recommendations)
  async getRandomProducts(count = 4) {
    try {
      const allProducts = await this.getAllProducts()
      const shuffled = allProducts.sort(() => 0.5 - Math.random())
      const randomProducts = shuffled.slice(0, count)

      console.log(`✅ Selected ${randomProducts.length} random products`)
      return randomProducts
    } catch (error) {
      console.error(`❌ Failed to get random products:`, error)
      throw new Error("Unable to fetch random products")
    }
  }

  // Note: Create, Update, Delete operations are not supported by FakeStore API
  // These methods will throw errors to maintain API consistency

  async createProduct(productData) {
    throw new Error("Product creation is not supported by FakeStore API")
  }

  async updateProduct(id, productData) {
    throw new Error("Product updates are not supported by FakeStore API")
  }

  async deleteProduct(id) {
    throw new Error("Product deletion is not supported by FakeStore API")
  }

  // **NEW CODE: Custom Product Management**
  // Local storage key for custom products
  static CUSTOM_PRODUCTS_KEY = "ecommerce_custom_products"

  // Get custom products from localStorage
  getCustomProducts() {
    try {
      const customProducts = localStorage.getItem(ProductService.CUSTOM_PRODUCTS_KEY)
      return customProducts ? JSON.parse(customProducts) : []
    } catch (error) {
      console.error("❌ Failed to get custom products:", error)
      return []
    }
  }

  // Save custom products to localStorage
  saveCustomProducts(products) {
    try {
      localStorage.setItem(ProductService.CUSTOM_PRODUCTS_KEY, JSON.stringify(products))
      console.log("✅ Custom products saved to localStorage")
    } catch (error) {
      console.error("❌ Failed to save custom products:", error)
      throw new Error("Unable to save custom products")
    }
  }

  // Add custom product
  async addCustomProduct(productData) {
    try {
      const customProducts = this.getCustomProducts()
      const newProduct = {
        id: `custom_${Date.now()}`,
        ...productData,
        isCustom: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      customProducts.push(newProduct)
      this.saveCustomProducts(customProducts)

      console.log("✅ Custom product added:", newProduct.name)
      return newProduct
    } catch (error) {
      console.error("❌ Failed to add custom product:", error)
      throw new Error("Unable to add custom product")
    }
  }

  // Update custom product
  async updateCustomProduct(id, productData) {
    try {
      const customProducts = this.getCustomProducts()
      const productIndex = customProducts.findIndex((p) => p.id === id)

      if (productIndex === -1) {
        throw new Error("Custom product not found")
      }

      customProducts[productIndex] = {
        ...customProducts[productIndex],
        ...productData,
        updatedAt: new Date().toISOString(),
      }

      this.saveCustomProducts(customProducts)
      console.log("✅ Custom product updated:", customProducts[productIndex].name)
      return customProducts[productIndex]
    } catch (error) {
      console.error("❌ Failed to update custom product:", error)
      throw new Error("Unable to update custom product")
    }
  }

  // Delete custom product
  async deleteCustomProduct(id) {
    try {
      const customProducts = this.getCustomProducts()
      const filteredProducts = customProducts.filter((p) => p.id !== id)

      if (filteredProducts.length === customProducts.length) {
        throw new Error("Custom product not found")
      }

      this.saveCustomProducts(filteredProducts)
      console.log("✅ Custom product deleted:", id)
      return true
    } catch (error) {
      console.error("❌ Failed to delete custom product:", error)
      throw new Error("Unable to delete custom product")
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
  getProductsByPriceRange,
  getProductsByRating,
  getRandomProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addCustomProduct,
  updateCustomProduct,
  deleteCustomProduct,
  getCustomProducts,
} = productService