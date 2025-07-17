// API utility functions
import productService from "../services/productService"

/**
 * Transform product data from API format to app format
 * @param {Object} product - Product data from API
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
    sizes: product.sizes || ["XS", "S", "M", "L", "XL"],
    inStock: product.inStock !== undefined ? product.inStock : true,
    rating: product.rating,
    modelImageUrl: getModelImage(product),
  }
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

// Export product service methods for convenience
export const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getCategories,
  getFeaturedProducts,
} = productService
