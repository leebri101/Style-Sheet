import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchFromAPI, transformProductData, fetchFromAPIWithAxios } from "../utils/api"
// Import Axios services
import { searchProducts as searchProductsService } from "../services/productService"

// Async thunk for fetching all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    // Try Axios first, fallback to original fetch
    let data
    try {
      data = await fetchFromAPIWithAxios("/products")
      console.log("✅ Using Axios for fetchProducts")
    } catch (axiosError) {
      console.warn("⚠️ Axios failed, falling back to fetch:", axiosError.message)
      data = await fetchFromAPI("/products")
    }
    return data.map(transformProductData)
  } catch (error) {
    return rejectWithValue(error.message || "Failed to fetch products. Please try again later.")
  }
})

// Async thunk for searching products
export const searchProducts = createAsyncThunk("products/searchProducts", async (searchTerm, { rejectWithValue }) => {
  try {
    //Try Axios search service first, fallback to original method
    let filteredProducts
    try {
      filteredProducts = await searchProductsService(searchTerm)
      console.log("✅ Using Axios for searchProducts")
    } catch (axiosError) {
      console.warn("⚠️ Axios search failed, falling back to fetch:", axiosError.message)
      // Fetch all products first (Fake Store API doesn't have a search endpoint)
      const data = await fetchFromAPI("/products")

      // Filter products based on search term
      const normalizedSearch = searchTerm.toLowerCase()
      filteredProducts = data.filter(
        (product) =>
          product.title.toLowerCase().includes(normalizedSearch) ||
          product.description.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch),
      )
    }

    return filteredProducts.map(transformProductData)
  } catch (error) {
    return rejectWithValue(error.message || "Failed to search products. Please try again later.")
  }
})

// Async thunk for fetching product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      // Try Axios first, fallback to original fetch
      let product
      try {
        product = await fetchFromAPIWithAxios(`/products/${productId}`)
        console.log("✅ Using Axios for fetchProductById")
      } catch (axiosError) {
        console.warn("⚠️ Axios failed, falling back to fetch:", axiosError.message)
        product = await fetchFromAPI(`/products/${productId}`)
      }
      return transformProductData(product)
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch product. Please try again later.")
    }
  },
)

// Async thunk for fetching products by category
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      // Try Axios first, fallback to original fetch
      let data
      try {
        data = await fetchFromAPIWithAxios(`/products/category/${category}`)
        console.log("✅ Using Axios for fetchProductsByCategory")
      } catch (axiosError) {
        console.warn("⚠️ Axios failed, falling back to fetch:", axiosError.message)
        data = await fetchFromAPI(`/products/category/${category}`)
      }
      return data.map(transformProductData)
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch products by category. Please try again later.")
    }
  },
)

// Async thunk for fetching all categories
export const fetchCategories = createAsyncThunk("products/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    // NEW CODE: Try Axios first, fallback to original fetch
    let categories
    try {
      categories = await fetchFromAPIWithAxios("/products/categories")
      console.log("✅ Using Axios for fetchCategories")
    } catch (axiosError) {
      console.warn("⚠️ Axios failed, falling back to fetch:", axiosError.message)
      categories = await fetchFromAPI("/products/categories")
    }
    return categories
  } catch (error) {
    return rejectWithValue(error.message || "Failed to fetch categories. Please try again later.")
  }
})

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    searchResults: [],
    selectedProduct: null,
    categories: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filters: {
      category: null,
      priceRange: { min: 0, max: Number.POSITIVE_INFINITY },
      sizes: [],
      colors: [],
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: { min: 0, max: Number.POSITIVE_INFINITY },
        sizes: [],
        colors: [],
      }
    },
    sortProducts: (state, action) => {
      const { sortBy } = action.payload
      switch (sortBy) {
        case "price-low-high":
          state.items.sort((a, b) => a.price - b.price)
          break
        case "price-high-low":
          state.items.sort((a, b) => b.price - a.price)
          break
        case "name-a-z":
          state.items.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "name-z-a":
          state.items.sort((a, b) => b.name.localeCompare(a.name))
          break
        case "rating-high-low":
          state.items.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
          break
        default:
          break
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Handle searchProducts
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.searchResults = action.payload
        state.error = null
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.selectedProduct = action.payload
        state.error = null
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Handle fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // Handle fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.error = null
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

// Export actions
export const { setFilters, clearFilters, sortProducts } = productSlice.actions

// Export selectors
export const selectAllProducts = (state) => state.products.items
export const selectSearchResults = (state) => state.products.searchResults
export const selectSelectedProduct = (state) => state.products.selectedProduct
export const selectProductStatus = (state) => state.products.status
export const selectProductError = (state) => state.products.error
export const selectProductFilters = (state) => state.products.filters
export const selectCategories = (state) => state.products.categories

// Export reducer
export default productSlice.reducer
