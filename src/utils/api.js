// Import Axios services
import {
  fetchAllProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchAllCategories,
} from "../services/productService"

/**
 * Utility function to make API requests
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} - Promise with response data
 */
export const fetchFromAPI = async (endpoint, options = {}) => {
  const API_BASE_URL = "https://fakestoreapi.com"
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API Error (${url}):`, error)
    throw error
  }
}

// Enhanced API function using Axios
export const fetchFromAPIWithAxios = async (endpoint) => {
  try {
    // Route to appropriate Axios service based on endpoint
    switch (endpoint) {
      case "/products":
        return await fetchAllProducts()
      case "/products/categories":
        return await fetchAllCategories()
      default:
        if (endpoint.startsWith("/products/category/")) {
          const category = endpoint.replace("/products/category/", "")
          return await fetchProductsByCategory(category)
        } else if (endpoint.startsWith("/products/")) {
          const productId = endpoint.replace("/products/", "")
          return await fetchProductById(productId)
        }
        throw new Error(`Unsupported endpoint: ${endpoint}`)
    }
  } catch (error) {
    console.error(`Axios API Error (${endpoint}):`, error)
    throw error
  }
}

/**
 * Transform product data from API format to app format
 * @param {Object} product - Product data from API
 * @returns {Object} - Transformed product data
 */
export const transformProductData = (product) => {
  return {
    id: product.id,
    name: product.title,
    price: product.price,
    category: product.category,
    imageUrl: product.image,
    description: product.description,
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    rating: product.rating,
    // Model image for clothing hover effect
    modelImageUrl: getModelImage(product),
  }
}

// Function to generate model images for clothing items
const getModelImage = (product) => {
  const clothingKeywords = ["shirt", "dress", "jacket", "pants", "top", "bottom", "clothing", "wear"]
  const isClothing = clothingKeywords.some(
    (keyword) => product.title.toLowerCase().includes(keyword) || product.category.toLowerCase().includes(keyword),
  )

  if (isClothing) {
    // Generate model image URL based on product ID
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

  return product.image // Fallback to original image for non-clothing items
}
