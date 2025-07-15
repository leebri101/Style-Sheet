import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isOpen: false,
  lastUpdated: null,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const { id, name, price, size, color, quantity = 1 } = action.payload
      const existingItem = state.items.find((item) => item.id === id && item.size === size && item.color === color)

      if (existingItem) {
        existingItem.quantity += quantity
        existingItem.totalPrice = existingItem.quantity * existingItem.price
      } else {
        state.items.push({
          id,
          name,
          price,
          size: size || "One Size",
          color: color || "Default",
          quantity,
          totalPrice: price * quantity,
          addedAt: new Date().toISOString(),
        })
      }

      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
      state.lastUpdated = new Date().toISOString()
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload
      state.items = state.items.filter((item) => !(item.id === id && item.size === size && item.color === color))

      // Recalculate totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
      state.lastUpdated = new Date().toISOString()
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload
      const item = state.items.find((item) => item.id === id && item.size === size && item.color === color)

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter((item) => !(item.id === id && item.size === size && item.color === color))
        } else {
          item.quantity = quantity
          item.totalPrice = item.price * quantity
        }

        // Recalculate totals
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0)
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0)
        state.lastUpdated = new Date().toISOString()
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalAmount = 0
      state.lastUpdated = new Date().toISOString()
    },

    // Toggle cart visibility
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },

    // Open cart
    openCart: (state) => {
      state.isOpen = true
    },

    // Close cart
    closeCart: (state) => {
      state.isOpen = false
    },

    // Apply discount
    applyDiscount: (state, action) => {
      const { discountAmount, discountPercentage } = action.payload

      if (discountAmount) {
        state.totalAmount = Math.max(0, state.totalAmount - discountAmount)
      } else if (discountPercentage) {
        state.totalAmount = state.totalAmount * (1 - discountPercentage / 100)
      }

      state.lastUpdated = new Date().toISOString()
    },

    // Calculate shipping
    calculateShipping: (state, action) => {
      const { shippingCost } = action.payload
      state.shippingCost = shippingCost
      state.lastUpdated = new Date().toISOString()
    },

    // Calculate tax
    calculateTax: (state, action) => {
      const { taxRate } = action.payload
      state.taxAmount = state.totalAmount * (taxRate / 100)
      state.lastUpdated = new Date().toISOString()
    },
  },
})

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  applyDiscount,
  calculateShipping,
  calculateTax,
} = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
export const selectCartTotalAmount = (state) => state.cart.totalAmount
export const selectCartIsOpen = (state) => state.cart.isOpen
export const selectCartLastUpdated = (state) => state.cart.lastUpdated
export const selectCartShippingCost = (state) => state.cart.shippingCost || 0
export const selectCartTaxAmount = (state) => state.cart.taxAmount || 0
export const selectCartGrandTotal = (state) =>
  state.cart.totalAmount + (state.cart.shippingCost || 0) + (state.cart.taxAmount || 0)

// Export reducer
export default cartSlice.reducer
