import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import productService from "../services/productService"
// Async thunks for product operations
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (filters = {}, { rejectWithValue }) => {
  try {
    const products = await productService.getAllProducts(filters)
    return products
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id, { rejectWithValue }) => {
  try {
    const product = await productService.getProductById(id)
    return product
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const products = await productService.getProductsByCategory(category)
      return products
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async ({ searchTerm, filters = {} }, { rejectWithValue }) => {
    try {
      const products = await productService.searchProducts(searchTerm, filters)
      return { products, searchTerm }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchCategories = createAsyncThunk("products/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const categories = await productService.getCategories()
    return categories
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await productService.getFeaturedProducts()
      return products
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

// Initial state
const initialState = {
  // Products data
  products: [],
  featuredProducts: [],
  categories: [],
  currentProduct: null,

  // Search and filtering
  searchResults: [],
  searchTerm: "",
  currentCategory: null,
  filters: {
    priceRange: [0, 1000],
    brands: [],
    sizes: [],
    colors: [],
    rating: 0,
    inStock: false,
  },

  // UI state
  loading: false,
  searchLoading: false,
  error: null,

  // Pagination
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  },

  // Sorting
  sortBy: "name",
  sortOrder: "asc", // 'asc' or 'desc'
}

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Clear current product
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },

    // Clear search results
    clearSearchResults: (state) => {
      state.searchResults = []
      state.searchTerm = ""
    },

    // Set current category
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload
    },

    // Update filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = initialState.filters
    },

    // Update sorting
    updateSorting: (state, action) => {
      const { sortBy, sortOrder } = action.payload
      state.sortBy = sortBy
      state.sortOrder = sortOrder

      // Sort current products
      const sortProducts = (products) => {
        return [...products].sort((a, b) => {
          let aValue = a[sortBy]
          let bValue = b[sortBy]

          // Handle different data types
          if (typeof aValue === "string") {
            aValue = aValue.toLowerCase()
            bValue = bValue.toLowerCase()
          }

          if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1
          } else {
            return aValue < bValue ? 1 : -1
          }
        })
      }

      state.products = sortProducts(state.products)
      if (state.searchResults.length > 0) {
        state.searchResults = sortProducts(state.searchResults)
      }
    },

    // Update pagination
    updatePagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },

    // Clear error
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.pagination.totalItems = action.payload.length
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.products = []
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.currentProduct = null
      })

      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.pagination.totalItems = action.payload.length
        state.pagination.totalPages = Math.ceil(action.payload.length / state.pagination.itemsPerPage)
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.products = []
      })

      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload.products
        state.searchTerm = action.payload.searchTerm
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.payload
        state.searchResults = []
      })

      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.categories = []
      })

      // Fetch featured products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false
        state.featuredProducts = action.payload
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.featuredProducts = []
      })
  },
})

// Export actions
export const {
  clearCurrentProduct,
  clearSearchResults,
  setCurrentCategory,
  updateFilters,
  clearFilters,
  updateSorting,
  updatePagination,
  clearError,
} = productSlice.actions

// Selectors
export const selectProducts = (state) => state.products.products
export const selectFeaturedProducts = (state) => state.products.featuredProducts
export const selectCategories = (state) => state.products.categories
export const selectCurrentProduct = (state) => state.products.currentProduct
export const selectSearchResults = (state) => state.products.searchResults
export const selectSearchTerm = (state) => state.products.searchTerm
export const selectCurrentCategory = (state) => state.products.currentCategory
export const selectFilters = (state) => state.products.filters
export const selectLoading = (state) => state.products.loading
export const selectSearchLoading = (state) => state.products.searchLoading
export const selectError = (state) => state.products.error
export const selectPagination = (state) => state.products.pagination
export const selectSorting = (state) => ({
  sortBy: state.products.sortBy,
  sortOrder: state.products.sortOrder,
})

// Export reducer
export default productSlice.reducer
