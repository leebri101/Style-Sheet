import { createSlice } from "@reduxjs/toolkit"

// Load wishlist items from localStorage
const loadWishlistItems = () => {
  try {
    const savedItems = localStorage.getItem("wishlistItems")
    return savedItems ? JSON.parse(savedItems) : []
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error)
    return []
  }
}

const initialState = {
  items: loadWishlistItems(),
  totalItems: loadWishlistItems().length,
  lastUpdated: null,
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Add item to wishlist
    addToWishlist: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (!existingItem) {
        state.items.push({
          ...product,
          addedAt: new Date().toISOString(),
        })
        state.totalItems = state.items.length
        state.lastUpdated = new Date().toISOString()
      }
    },

    // Remove item from wishlist
    removeFromWishlist: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.id !== productId)
      state.totalItems = state.items.length
      state.lastUpdated = new Date().toISOString()
    },

    // Clear entire wishlist
    clearWishlist: (state) => {
      state.items = []
      state.totalItems = 0
      state.lastUpdated = new Date().toISOString()
    },

    // Move item from wishlist to cart
    moveToCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter((item) => item.id !== productId)
      state.totalItems = state.items.length
      state.lastUpdated = new Date().toISOString()
    },

    // Toggle item in wishlist (add if not present, remove if present)
    toggleWishlistItem: (state, action) => {
      const product = action.payload
      const existingItemIndex = state.items.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Remove if exists
        state.items.splice(existingItemIndex, 1)
      } else {
        // Add if doesn't exist
        state.items.push({
          ...product,
          addedAt: new Date().toISOString(),
        })
      }

      state.totalItems = state.items.length
      state.lastUpdated = new Date().toISOString()
    },

    // Update wishlist item (for any additional data)
    updateWishlistItem: (state, action) => {
      const { id, updates } = action.payload
      const item = state.items.find((item) => item.id === id)

      if (item) {
        Object.assign(item, updates)
        state.lastUpdated = new Date().toISOString()
      }
    },
  },
})

// Export actions
export const { addToWishlist, removeFromWishlist, clearWishlist, moveToCart, toggleWishlistItem, updateWishlistItem } =
  wishlistSlice.actions

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistTotalItems = (state) => state.wishlist.totalItems
export const selectWishlistLastUpdated = (state) => state.wishlist.lastUpdated
export const selectIsInWishlist = (state, productId) => state.wishlist.items.some((item) => item.id === productId)

// Export reducer
export default wishlistSlice.reducer
