// API utility functions - FakeStore API focused
import productService from "../services/productService"

/**
 * Transform product data from FakeStore API format to app format
 * @param {Object} product - Product data from FakeStore API
 * @returns {Object} - Transformed product data
 */
export const transformProductData = (product) => {
  return {
    id: product.id,
    name: product.title || product.name,
    price: product.price,
    category: product.category,
    imageUrl: product.image || product.imageUrl,
    description: product.description,
    sizes: product.sizes || getDefaultSizes(product.category),
    colors: product.colors || getDefaultColors(product.category),
    inStock: product.inStock !== undefined ? product.inStock : true,
    rating: product.rating,
    brand: product.brand || "Generic Brand",
    stockQuantity: product.stockQuantity || Math.floor(Math.random() * 100) + 10,
    featured: product.featured || false,
    tags: product.tags || [product.category],
    modelImageUrl: getModelImage(product),
  }
}

// Function to get default sizes based on category
const getDefaultSizes = (category) => {
  if (category && category.includes("clothing")) {
    return ["XS", "S", "M", "L", "XL", "XXL"]
  }
  if (category === "electronics") {
    return ["Standard"]
  }
  return ["One Size"]
}

// Function to get default colors based on category
const getDefaultColors = (category) => {
  if (category && category.includes("clothing")) {
    return ["Black", "White", "Navy", "Gray", "Red"]
  }
  if (category === "electronics") {
    return ["Black", "Silver", "White"]
  }
  return ["Default"]
}

// Function to generate model images for clothing items
const getModelImage = (product) => {
  const clothingKeywords = ["shirt", "dress", "jacket", "pants", "top", "bottom", "clothing", "wear"]
  const isClothing = clothingKeywords.some(
    (keyword) =>
      (product.title || product.name || "").toLowerCase().includes(keyword) ||
      (product.category || "").toLowerCase().includes(keyword),
  )

  if (isClothing) {
    const modelVariations = [
      "model-wearing-1",
      "model-wearing-2",
      "model-wearing-3",
      "model-wearing-4",
      "model-wearing-5",
    ]
    const modelIndex = product.id % modelVariations.length
    return `/placeholder.svg?height=400&width=300&text=${modelVariations[modelIndex]}`
  }

  return product.image || product.imageUrl
}

/**
 * Format price for display
 * @param {number} price - Price value
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = "GBP") => {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: currency,
  }).format(price)
}

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} - Discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (originalPrice <= salePrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Generate product URL slug
 * @param {Object} product - Product object
 * @returns {string} - URL slug
 */
export const generateProductSlug = (product) => {
  const name = product.title || product.name || ""
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Filter products by various criteria
 * @param {Array} products - Array of products
 * @param {Object} filters - Filter criteria
 * @returns {Array} - Filtered products
 */
export const filterProducts = (products, filters) => {
  let filtered = [...products]

  // Filter by category
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((product) => product.category.toLowerCase() === filters.category.toLowerCase())
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((product) => product.price >= filters.minPrice)
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((product) => product.price <= filters.maxPrice)
  }

  // Filter by rating
  if (filters.minRating) {
    filtered = filtered.filter((product) => product.rating && product.rating.rate >= filters.minRating)
  }

  // Filter by availability
  if (filters.inStock) {
    filtered = filtered.filter((product) => product.inStock)
  }

  // Filter by brand
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter((product) => filters.brands.includes(product.brand))
  }

  // Filter by size
  if (filters.sizes && filters.sizes.length > 0) {
    filtered = filtered.filter((product) => product.sizes && product.sizes.some((size) => filters.sizes.includes(size)))
  }

  // Filter by color
  if (filters.colors && filters.colors.length > 0) {
    filtered = filtered.filter(
      (product) => product.colors && product.colors.some((color) => filters.colors.includes(color)),
    )
  }

  return filtered
}

/**
 * Sort products by various criteria
 * @param {Array} products - Array of products
 * @param {string} sortBy - Sort criteria
 * @param {string} order - Sort order (asc/desc)
 * @returns {Array} - Sorted products
 */
export const sortProducts = (products, sortBy, order = "asc") => {
  const sorted = [...products].sort((a, b) => {
    let aValue, bValue

    switch (sortBy) {
      case "price":
        aValue = a.price
        bValue = b.price
        break
      case "rating":
        aValue = a.rating?.rate || 0
        bValue = b.rating?.rate || 0
        break
      case "name":
        aValue = (a.title || a.name || "").toLowerCase()
        bValue = (b.title || b.name || "").toLowerCase()
        break
      case "newest":
        aValue = new Date(a.createdAt || 0)
        bValue = new Date(b.createdAt || 0)
        break
      case "popularity":
        aValue = a.rating?.count || 0
        bValue = b.rating?.count || 0
        break
      default:
        return 0
    }

    if (order === "desc") {
      return aValue < bValue ? 1 : -1
    }
    return aValue > bValue ? 1 : -1
  })

  return sorted
}

/**
 * Search products by term
 * @param {Array} products - Array of products
 * @param {string} searchTerm - Search term
 * @returns {Array} - Matching products
 */
export const searchProductsLocal = (products, searchTerm) => {
  if (!searchTerm.trim()) return products

  const term = searchTerm.toLowerCase()

  return products.filter((product) => {
    const searchableText = [
      product.title || product.name || "",
      product.description || "",
      product.category || "",
      product.brand || "",
      ...(product.tags || []),
    ]
      .join(" ")
      .toLowerCase()

    return searchableText.includes(term)
  })
}

/**
 * Get unique values from products for filters
 * @param {Array} products - Array of products
 * @returns {Object} - Unique filter values
 */
export const getFilterOptions = (products) => {
  const categories = [...new Set(products.map((p) => p.category))].filter(Boolean)
  const brands = [...new Set(products.map((p) => p.brand))].filter(Boolean)
  const sizes = [...new Set(products.flatMap((p) => p.sizes || []))].filter(Boolean)
  const colors = [...new Set(products.flatMap((p) => p.colors || []))].filter(Boolean)

  const prices = products.map((p) => p.price).filter(Boolean)
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }

  return {
    categories,
    brands,
    sizes,
    colors,
    priceRange,
  }
}

// Export product service methods for convenience
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
} = productService
