// Product Service - FakeStore API Only
const FAKESTORE_API_URL = "https://fakestoreapi.com"

// FakeStore API functions with error handling and logging
const fakeStoreFetch = async (endpoint) => {
  try {
    console.log(`🔄 Fetching from FakeStore API: ${endpoint}`)
    const response = await fetch(`${FAKESTORE_API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
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
    if (category.includes("clothing")) {
      return ["XS", "S", "M", "L", "XL", "XXL"]
    }
    if (category === "electronics") {
      return ["Standard"]
    }
    return ["One Size"]
  }

  const generateColors = (category) => {
    if (category.includes("clothing")) {
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
      const products = await fakeStoreFetch("/products")
      const transformedProducts = products.map(transformFakeStoreProduct)

      // Apply client-side filtering if needed
      let filteredProducts = transformedProducts

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

      console.log("✅ Products fetched and transformed from FakeStore API:", filteredProducts.length)
      return filteredProducts
    } catch (error) {
      console.error("❌ Failed to fetch products:", error)
      throw new Error("Unable to fetch products from FakeStore API")
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      const product = await fakeStoreFetch(`/products/${id}`)
      const transformedProduct = transformFakeStoreProduct(product)
      console.log("✅ Product fetched from FakeStore API:", transformedProduct.name)
      return transformedProduct
    } catch (error) {
      console.error(`❌ Failed to fetch product ${id}:`, error)
      throw new Error(`Unable to fetch product ${id} from FakeStore API`)
    }
  }

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const products = await fakeStoreFetch(`/products/category/${encodeURIComponent(category)}`)
      const transformedProducts = products.map(transformFakeStoreProduct)
      console.log(`✅ ${category} products fetched from FakeStore API:`, transformedProducts.length)
      return transformedProducts
    } catch (error) {
      console.error(`❌ Failed to fetch products for category ${category}:`, error)
      throw new Error(`Unable to fetch products for category ${category} from FakeStore API`)
    }
  }

  // Search products (client-side implementation)
  async searchProducts(searchTerm, filters = {}) {
    try {
      // Get all products and perform client-side search
      const allProducts = await fakeStoreFetch("/products")
      const transformedProducts = allProducts.map(transformFakeStoreProduct)

      // Perform search across multiple fields
      const searchResults = transformedProducts.filter((product) => {
        const searchFields = [product.name, product.description, product.category, product.brand, ...product.tags]
          .join(" ")
          .toLowerCase()

        return searchFields.includes(searchTerm.toLowerCase())
      })

      // Apply additional filters
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

      console.log(`✅ Found ${filteredResults.length} products for "${searchTerm}" in FakeStore API`)
      return filteredResults
    } catch (error) {
      console.error(`❌ Search failed for "${searchTerm}":`, error)
      throw new Error(`Unable to search for "${searchTerm}" in FakeStore API`)
    }
  }

  // Get all categories
  async getCategories() {
    try {
      const categories = await fakeStoreFetch("/products/categories")
      const transformedCategories = categories.map(transformFakeStoreCategory)

      // Get product counts for each category
      const allProducts = await fakeStoreFetch("/products")
      transformedCategories.forEach((category) => {
        const categoryProducts = allProducts.filter(
          (product) => product.category.toLowerCase() === category.name.toLowerCase().replace("'s", "'s"),
        )
        category.productCount = categoryProducts.length
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
      // Get all products and select featured ones
      const allProducts = await fakeStoreFetch("/products")
      const transformedProducts = allProducts.map(transformFakeStoreProduct)

      // Get products with high ratings as featured
      const featuredProducts = transformedProducts
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
} = productService
