
import { get } from "./apiService"

// Fetch all products using Axios
export const fetchAllProducts = async () => {
  try {
    return await get("/products")
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

// Fetch product by ID using Axios
export const fetchProductById = async (productId) => {
  try {
    return await get(`/products/${productId}`)
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error)
    throw error
  }
}

// Fetch products by category using Axios
export const fetchProductsByCategory = async (category) => {
  try {
    return await get(`/products/category/${category}`)
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    throw error
  }
}

// Fetch all categories using Axios
export const fetchAllCategories = async () => {
  try {
    return await get("/products/categories")
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Search products (client-side filtering since API doesn't support search)
export const searchProducts = async (searchTerm) => {
  try {
    const products = await fetchAllProducts()
    const normalizedSearch = searchTerm.toLowerCase()

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch),
    )
  } catch (error) {
    console.error("Error searching products:", error)
    throw error
  }
}
