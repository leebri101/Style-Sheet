// Checkout Slice - Uses MockAPI for order management
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { OrdersAPI } from "../services/mockApiService"

// Async thunks
export const createOrder = createAsyncThunk("checkout/createOrder", async (orderData, { rejectWithValue }) => {
  try {
    const order = await OrdersAPI.create({
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    return order
  } catch (error) {
    return rejectWithValue(error.message || "Failed to create order")
  }
})

export const fetchUserOrders = createAsyncThunk("checkout/fetchUserOrders", async (userId, { rejectWithValue }) => {
  try {
    const orders = await OrdersAPI.getByUserId(userId)
    return orders
  } catch (error) {
    return rejectWithValue(error.message || "Failed to fetch orders")
  }
})

export const updateOrderStatus = createAsyncThunk(
  "checkout/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const updatedOrder = await OrdersAPI.update(orderId, {
        status,
        updatedAt: new Date().toISOString(),
      })
      return updatedOrder
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update order")
    }
  },
)

// Initial state
const initialState = {
  // Checkout process
  currentStep: 1,
  totalSteps: 4,

  // Order data
  shippingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },

  billingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    sameAsShipping: true,
  },

  paymentMethod: {
    type: "card", // 'card', 'paypal', 'apple_pay', etc.
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  },

  // Order summary
  orderSummary: {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0,
  },

  // Orders
  orders: [],
  currentOrder: null,

  // UI state
  loading: false,
  error: null,

  // Payment processing
  paymentProcessing: false,
  paymentError: null,

  // Order completion
  orderCompleted: false,
  orderConfirmation: null,
}

// Checkout slice
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Navigation
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },

    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1
      }
    },

    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1
      }
    },

    // Address management
    updateShippingAddress: (state, action) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload }
    },

    updateBillingAddress: (state, action) => {
      state.billingAddress = { ...state.billingAddress, ...action.payload }

      // If same as shipping is checked, copy shipping address
      if (state.billingAddress.sameAsShipping) {
        state.billingAddress = {
          ...state.shippingAddress,
          sameAsShipping: true,
        }
      }
    },

    toggleSameAsShipping: (state) => {
      state.billingAddress.sameAsShipping = !state.billingAddress.sameAsShipping

      if (state.billingAddress.sameAsShipping) {
        state.billingAddress = {
          ...state.shippingAddress,
          sameAsShipping: true,
        }
      }
    },

    // Payment method
    updatePaymentMethod: (state, action) => {
      state.paymentMethod = { ...state.paymentMethod, ...action.payload }
    },

    // Order summary
    updateOrderSummary: (state, action) => {
      state.orderSummary = { ...state.orderSummary, ...action.payload }
    },

    calculateOrderSummary: (state, action) => {
      const { items } = action.payload

      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const shipping = subtotal > 100 ? 0 : 10 // Free shipping over $100
      const tax = subtotal * 0.08 // 8% tax
      const discount = state.orderSummary.discount || 0
      const total = subtotal + shipping + tax - discount

      state.orderSummary = {
        subtotal: Number.parseFloat(subtotal.toFixed(2)),
        shipping: Number.parseFloat(shipping.toFixed(2)),
        tax: Number.parseFloat(tax.toFixed(2)),
        discount: Number.parseFloat(discount.toFixed(2)),
        total: Number.parseFloat(total.toFixed(2)),
      }
    },

    // Reset checkout
    resetCheckout: (state) => {
      return {
        ...initialState,
        orders: state.orders, // Keep order history
      }
    },

    // Clear errors
    clearError: (state) => {
      state.error = null
      state.paymentError = null
    },

    // Set payment processing
    setPaymentProcessing: (state, action) => {
      state.paymentProcessing = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.paymentProcessing = true
        state.error = null
        state.paymentError = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.paymentProcessing = false
        state.currentOrder = action.payload
        state.orderCompleted = true
        state.orderConfirmation = {
          orderId: action.payload.id,
          orderNumber: action.payload.orderNumber || `ORD-${action.payload.id}`,
          total: action.payload.total,
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        }

        // Add to orders list
        state.orders.unshift(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.paymentProcessing = false
        state.error = action.payload
        state.paymentError = action.payload
      })

      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false

        // Update order in the list
        const orderIndex = state.orders.findIndex((order) => order.id === action.payload.id)
        if (orderIndex !== -1) {
          state.orders[orderIndex] = action.payload
        }

        // Update current order if it matches
        if (state.currentOrder && state.currentOrder.id === action.payload.id) {
          state.currentOrder = action.payload
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// Export actions
export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateShippingAddress,
  updateBillingAddress,
  toggleSameAsShipping,
  updatePaymentMethod,
  updateOrderSummary,
  calculateOrderSummary,
  resetCheckout,
  clearError,
  setPaymentProcessing,
} = checkoutSlice.actions

// Selectors
export const selectCurrentStep = (state) => state.checkout.currentStep
export const selectTotalSteps = (state) => state.checkout.totalSteps
export const selectShippingAddress = (state) => state.checkout.shippingAddress
export const selectBillingAddress = (state) => state.checkout.billingAddress
export const selectPaymentMethod = (state) => state.checkout.paymentMethod
export const selectOrderSummary = (state) => state.checkout.orderSummary
export const selectOrders = (state) => state.checkout.orders
export const selectCurrentOrder = (state) => state.checkout.currentOrder
export const selectCheckoutLoading = (state) => state.checkout.loading
export const selectCheckoutError = (state) => state.checkout.error
export const selectPaymentProcessing = (state) => state.checkout.paymentProcessing
export const selectPaymentError = (state) => state.checkout.paymentError
export const selectOrderCompleted = (state) => state.checkout.orderCompleted
export const selectOrderConfirmation = (state) => state.checkout.orderConfirmation

// Export reducer
export default checkoutSlice.reducer
