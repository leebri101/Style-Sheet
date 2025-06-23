import { createSlice, createAsnycThunk } from "@reduxjs/toolkit"
import { processPayment } from "../services/paymentService"
import { createOrder, updateOrderStatus } from "../services/orderService"

export const processCheckout = createAsyncThunk(
    "checkout/processCheckout",
    async (checkoutData, { rejectWithValue, getState }) => {
        try {
            const { cart } = getState()

            // Create order first
            const orderData = {
                items: cart.items,
                total: cart.total,
                subtotal: cart.total,
                tax: cart.total * 0.2,
                shipping: cart > 50 ? 0 : 5.99, // Free shipping over £50
                shippingAddress: checkoutData.shippingAddress,
                billingAddress: checkoutData.billingAddress,
                userId: checkoutData.userId,
            }

            const order = await createOrder(orderData)

            //Process payment 
            const paymentData = {
                paymentMethod: checkoutData.paymentMethod,
                // Total + Tax + Shipping
                amount: cart.total * 1.2 + (cart.total > 50 ? 0 : 5.99),
                cardDetails: checkoutData.cardDetails,
                billingAddress: checkoutData.billingAddress,
                orderId: order.id,
            }

            const paymentResult = await processPayment(paymentData)

            //Update order with payment details
            const updatedOrder = await updateOrderStatus(order.id, "confirmed", paymentResult)

            return {
                order: updatedOrder,
                payment: paymentResult,
            }

        } catch (error){
            return rejectWithValue(error.message)
        }
    },
)

// Checkout State
const initialState = {
  currentStep: 1, // 1: Shipping, 2: Payment, 3: Review, 4: Confirmation
  shippingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United Kingdom",
  },
  billingAddress: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United Kingdom",
    sameAsShipping: true,
  },
  paymentMethod: "credit_card",
  cardDetails: {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  },
  isProcessing: false,
  error: null,
  completedOrder: null,
  paymentResult: null,
}

// NEW CODE: Checkout slice
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // NEW CODE: Set current step
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },

    // NEW CODE: Update shipping address
    updateShippingAddress: (state, action) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload }
    },

    // NEW CODE: Update billing address
    updateBillingAddress: (state, action) => {
      state.billingAddress = { ...state.billingAddress, ...action.payload }
    },

    // NEW CODE: Set payment method
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
    },

    // NEW CODE: Update card details
    updateCardDetails: (state, action) => {
      state.cardDetails = { ...state.cardDetails, ...action.payload }
    },

    // NEW CODE: Clear checkout state
    clearCheckout: (state) => {
      return { ...initialState }
    },

    // NEW CODE: Clear error
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // NEW CODE: Handle checkout processing
      .addCase(processCheckout.pending, (state) => {
        state.isProcessing = true
        state.error = null
      })
      .addCase(processCheckout.fulfilled, (state, action) => {
        state.isProcessing = false
        state.completedOrder = action.payload.order
        state.paymentResult = action.payload.payment
        state.currentStep = 4 // Confirmation step
      })
      .addCase(processCheckout.rejected, (state, action) => {
        state.isProcessing = false
        state.error = action.payload
      })
  },
})

// NEW CODE: Export actions
export const {
  setCurrentStep,
  updateShippingAddress,
  updateBillingAddress,
  setPaymentMethod,
  updateCardDetails,
  clearCheckout,
  clearError,
} = checkoutSlice.actions

// NEW CODE: Export selectors
export const selectCurrentStep = (state) => state.checkout.currentStep
export const selectShippingAddress = (state) => state.checkout.shippingAddress
export const selectBillingAddress = (state) => state.checkout.billingAddress
export const selectPaymentMethod = (state) => state.checkout.paymentMethod
export const selectCardDetails = (state) => state.checkout.cardDetails
export const selectIsProcessing = (state) => state.checkout.isProcessing
export const selectCheckoutError = (state) => state.checkout.error
export const selectCompletedOrder = (state) => state.checkout.completedOrder
export const selectPaymentResult = (state) => state.checkout.paymentResult

export default checkoutSlice.reducer
