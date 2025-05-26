import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Sample user data for development
const sampleUsers = [
  {
    id: 1,
    email: "test@example.com",
    password: "password", // In a real app, this would be hashed
    name: "Test User",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "customer",
    addresses: [
      {
        id: 1,
        type: "home",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        isDefault: true,
      },
    ],
    paymentMethods: [
      {
        id: 1,
        type: "credit_card",
        cardNumber: "**** **** **** 4242",
        expiryDate: "12/25",
        isDefault: true,
      },
    ],
    preferences: {
      marketingEmails: true,
      orderNotifications: true,
      darkMode: false,
    },
  },
  {
    id: 2,
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    name: "Admin User",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "admin",
    addresses: [],
    paymentMethods: [],
    preferences: {
      marketingEmails: false,
      orderNotifications: true,
      darkMode: true,
    },
  },
]

// Simulated API functions
// In a real app, these would be API calls to your backend

/**
 * Simulates authenticating a user with credentials
 */
const simulateLogin = async (credentials) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { email, password } = credentials
  const user = sampleUsers.find((u) => u.email === email)

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials")
  }

  // Create a user object without the password
  const { password: _, ...userWithoutPassword } = user

  // Generate a fake JWT token
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify({ userId: user.id, email: user.email, role: user.role }),
  )}.FAKE_SIGNATURE`

  return {
    user: userWithoutPassword,
    token,
  }
}

/**
 * Simulates registering a new user
 */
const simulateRegister = async (userData) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const { email, password, name } = userData

  // Check if user already exists
  if (sampleUsers.some((u) => u.email === email)) {
    throw new Error("User with this email already exists")
  }

  // Create new user
  const newUser = {
    id: sampleUsers.length + 1,
    email,
    password, // In a real app, this would be hashed
    name,
    avatar: "/placeholder.svg?height=100&width=100",
    role: "customer",
    addresses: [],
    paymentMethods: [],
    preferences: {
      marketingEmails: true,
      orderNotifications: true,
      darkMode: false,
    },
  }

  // Add to sample users (in a real app, this would be saved to a database)
  sampleUsers.push(newUser)

  // Create a user object without the password
  const { password: _, ...userWithoutPassword } = newUser

  // Generate a fake JWT token
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
    JSON.stringify({ userId: newUser.id, email: newUser.email, role: newUser.role }),
  )}.FAKE_SIGNATURE`

  return {
    user: userWithoutPassword,
    token,
  }
}

/**
 * Simulates requesting a password reset
 */
const simulateRequestPasswordReset = async (email) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = sampleUsers.find((u) => u.email === email)

  if (!user) {
    // For security reasons, don't reveal if the email exists or not
    return { success: true, message: "If an account with that email exists, a reset link has been sent." }
  }

  // In a real app, this would send an email with a reset link
  return { success: true, message: "If an account with that email exists, a reset link has been sent." }
}

/**
 * Simulates resetting a password with a token
 */
const simulateResetPassword = async ({ token, newPassword }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would validate the token and update the user's password
  return { success: true, message: "Password has been reset successfully." }
}

/**
 * Simulates updating a user's profile
 */
const simulateUpdateProfile = async (userData) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { id, ...updates } = userData

  // Find the user
  const userIndex = sampleUsers.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  // Update user data (excluding password)
  const { password, ...userDataWithoutPassword } = updates
  const updatedUser = {
    ...sampleUsers[userIndex],
    ...userDataWithoutPassword,
  }

  // Update in sample users
  sampleUsers[userIndex] = updatedUser

  // Return user without password
  const { password: _, ...userWithoutPassword } = updatedUser
  return { user: userWithoutPassword }
}

/**
 * Simulates adding a new address
 */
const simulateAddAddress = async ({ userId, address }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find the user
  const userIndex = sampleUsers.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  // Create new address
  const newAddress = {
    id: sampleUsers[userIndex].addresses.length + 1,
    ...address,
  }

  // If this is the default address, update other addresses
  if (newAddress.isDefault) {
    sampleUsers[userIndex].addresses = sampleUsers[userIndex].addresses.map((addr) => ({
      ...addr,
      isDefault: false,
    }))
  }

  // Add address to user
  sampleUsers[userIndex].addresses.push(newAddress)

  return { address: newAddress }
}

/**
 * Simulates updating an address
 */
const simulateUpdateAddress = async ({ userId, addressId, updates }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find the user
  const userIndex = sampleUsers.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  // Find the address
  const addressIndex = sampleUsers[userIndex].addresses.findIndex((a) => a.id === addressId)

  if (addressIndex === -1) {
    throw new Error("Address not found")
  }

  // If this is being set as default, update other addresses
  if (updates.isDefault) {
    sampleUsers[userIndex].addresses = sampleUsers[userIndex].addresses.map((addr) => ({
      ...addr,
      isDefault: false,
    }))
  }

  // Update the address
  const updatedAddress = {
    ...sampleUsers[userIndex].addresses[addressIndex],
    ...updates,
  }

  sampleUsers[userIndex].addresses[addressIndex] = updatedAddress

  return { address: updatedAddress }
}

/**
 * Simulates deleting an address
 */
const simulateDeleteAddress = async ({ userId, addressId }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find the user
  const userIndex = sampleUsers.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  // Remove the address
  sampleUsers[userIndex].addresses = sampleUsers[userIndex].addresses.filter((a) => a.id !== addressId)

  return { success: true }
}

/**
 * Simulates adding a payment method
 */
const simulateAddPaymentMethod = async ({ userId, paymentMethod }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find the user
  const userIndex = sampleUsers.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  // Create new payment method
  const newPaymentMethod = {
    id: sampleUsers[userIndex].paymentMethods.length + 1,
    ...paymentMethod,
  }

  // If this is the default payment method, update other payment methods
  if (newPaymentMethod.isDefault) {
    sampleUsers[userIndex].paymentMethods = sampleUsers[userIndex].paymentMethods.map((pm) => ({
      ...pm,
      isDefault: false,
    }))
  }

  // Add payment method to user
  sampleUsers[userIndex].paymentMethods.push(newPaymentMethod)

  return { paymentMethod: newPaymentMethod }
}

/**
 * Simulates updating user preferences
 */
const simulateUpdatePreferences = async ({ userId, preferences }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Find the user
  const userIndex = sampleUsers.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    throw new Error("User not found")
  }

  // Update preferences
  sampleUsers[userIndex].preferences = {
    ...sampleUsers[userIndex].preferences,
    ...preferences,
  }

  return { preferences: sampleUsers[userIndex].preferences }
}

/**
 * Simulates verifying a user's email
 */
const simulateVerifyEmail = async (token) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, you would validate the token and update the user's email verification status
  return { success: true, message: "Email verified successfully." }
}

// Async thunks for Redux

/**
 * Login thunk
 */
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await simulateLogin(credentials)

    // Store the token in localStorage
    localStorage.setItem("userToken", response.token)
    localStorage.setItem("userData", JSON.stringify(response.user))

    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

/**
 * Register thunk
 */
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await simulateRegister(userData)

    // Store the token in localStorage
    localStorage.setItem("userToken", response.token)
    localStorage.setItem("userData", JSON.stringify(response.user))

    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

/**
 * Request password reset thunk
 */
export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const response = await simulateRequestPasswordReset(email)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

/**
 * Reset password thunk
 */
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await simulateResetPassword({ token, newPassword })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

/**
 * Update profile thunk
 */
export const updateProfile = createAsyncThunk("auth/updateProfile", async (userData, { rejectWithValue }) => {
  try {
    const response = await simulateUpdateProfile(userData)

    // Update user data in localStorage
    localStorage.setItem("userData", JSON.stringify(response.user))

    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

/**
 * Add address thunk
 */
export const addAddress = createAsyncThunk("auth/addAddress", async ({ userId, address }, { rejectWithValue }) => {
  try {
    const response = await simulateAddAddress({ userId, address })
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

/**
 * Update address thunk
 */
export const updateAddress = createAsyncThunk(
  "auth/updateAddress",
  async ({ userId, addressId, updates }, { rejectWithValue }) => {
    try {
      const response = await simulateUpdateAddress({ userId, addressId, updates })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

/**
 * Delete address thunk
 */
export const deleteAddress = createAsyncThunk(
  "auth/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await simulateDeleteAddress({ userId, addressId })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

/**
 * Add payment method thunk
 */
export const addPaymentMethod = createAsyncThunk(
  "auth/addPaymentMethod",
  async ({ userId, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await simulateAddPaymentMethod({ userId, paymentMethod })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

/**
 * Update preferences thunk
 */
export const updatePreferences = createAsyncThunk(
  "auth/updatePreferences",
  async ({ userId, preferences }, { rejectWithValue }) => {
    try {
      const response = await simulateUpdatePreferences({ userId, preferences })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

/**
 * Verify email thunk
 */
export const verifyEmail = createAsyncThunk("auth/verifyEmail", async (token, { rejectWithValue }) => {
  try {
    const response = await simulateVerifyEmail(token)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

/**
 * Logout thunk
 */
export const logoutStart = createAsyncThunk("auth/logoutStart", async (_, { dispatch }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return { success: true }
})

export const logoutSuccess = createAsyncThunk("auth/logoutSuccess", async (_, { dispatch }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return { success: true }
})

// Initialize state from localStorage if available
const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("userData")
    return userData ? JSON.parse(userData) : null
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error)
    return null
  }
}

const getTokenFromStorage = () => {
  return localStorage.getItem("userToken") || null
}

const initialState = {
  isAuthenticated: !!getTokenFromStorage(),
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
  isLoading: false,
  isLoggingOut: false,
  error: null,
  passwordResetRequested: false,
  passwordResetSuccess: false,
  emailVerificationSuccess: false,
  registrationSuccess: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearAuthState: (state) => {
      state.passwordResetRequested = false
      state.passwordResetSuccess = false
      state.emailVerificationSuccess = false
      state.registrationSuccess = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.registrationSuccess = true
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Logout cases
      .addCase(logoutStart.pending, (state) => {
        state.isLoggingOut = true
      })
      .addCase(logoutStart.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.isLoggingOut = false
        state.error = null
      })
      .addCase(logoutStart.rejected, (state) => {
        state.isLoggingOut = false
      })

      .addCase(logoutSuccess.pending, (state) => {
        state.isLoggingOut = true
      })
      .addCase(logoutSuccess.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.isLoggingOut = false
        state.error = null
      })
      .addCase(logoutSuccess.rejected, (state) => {
        state.isLoggingOut = false
      })

      // Password reset request cases
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.isLoading = false
        state.passwordResetRequested = true
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Password reset cases
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false
        state.passwordResetSuccess = true
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Add address cases
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.user) {
          state.user.addresses = [...(state.user.addresses || []), action.payload.address]
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Update address cases
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.user && state.user.addresses) {
          state.user.addresses = state.user.addresses.map((addr) =>
            addr.id === action.payload.address.id ? action.payload.address : addr,
          )
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Delete address cases
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.user && state.user.addresses) {
          state.user.addresses = state.user.addresses.filter((addr) => addr.id !== action.meta.arg.addressId)
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Add payment method cases
      .addCase(addPaymentMethod.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.user) {
          state.user.paymentMethods = [...(state.user.paymentMethods || []), action.payload.paymentMethod]
        }
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Update preferences cases
      .addCase(updatePreferences.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.user) {
          state.user.preferences = action.payload.preferences
        }
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Verify email cases
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false
        state.emailVerificationSuccess = true
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Export actions
export const { clearError, clearAuthState } = authSlice.actions

// Export selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token
export const selectIsLoading = (state) => state.auth.isLoading
export const selectIsLoggingOut = (state) => state.auth.isLoggingOut
export const selectAuthError = (state) => state.auth.error
export const selectPasswordResetRequested = (state) => state.auth.passwordResetRequested
export const selectPasswordResetSuccess = (state) => state.auth.passwordResetSuccess
export const selectEmailVerificationSuccess = (state) => state.auth.emailVerificationSuccess
export const selectRegistrationSuccess = (state) => state.auth.registrationSuccess

export default authSlice.reducer
