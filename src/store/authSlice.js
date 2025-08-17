import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock API service simulation
const UsersAPI = {
  authenticate: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  requestPasswordReset: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error("No user found with that email");
    }
    
    // Generate and store a reset token (in real app this would be sent via email)
    user.resetToken = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('mockUsers', JSON.stringify(users));
    
    return { success: true };
  },

  confirmPasswordReset: async (token, newPassword) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const userIndex = users.findIndex(u => u.resetToken === token);

    if (userIndex === -1) {
      throw new Error("Invalid or expired token");
    }

    users[userIndex].password = newPassword;
    delete users[userIndex].resetToken;
    localStorage.setItem('mockUsers', JSON.stringify(users));

    return { success: true };
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    if (users.some(u => u.email === userData.email)) {
      throw new Error("User already exists");
    }
    const newUser = {
      ...userData,
      id: users.length + 1,
      role: 'customer',
      addresses: [],
      paymentMethods: [],
      preferences: {
        marketingEmails: true,
        orderNotifications: true,
        darkMode: false
      }
    };
    localStorage.setItem('mockUsers', JSON.stringify([...users, newUser]));
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
};

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || null,
  isAuthenticated: !!localStorage.getItem("userToken"),
  loading: false,
  error: null,
  passwordReset: {
    loading: false,
    success: false,
    error: null,
    emailSent: false
  }
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await UsersAPI.authenticate(email, password);
      const token = "mock-token";
      localStorage.setItem("userToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await UsersAPI.register(userData);
      const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
      localStorage.setItem("userToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const currentUser = auth.user;
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...currentUser, ...updatedData };
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const response = await UsersAPI.requestPasswordReset(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await UsersAPI.confirmPasswordReset(token, newPassword);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("userData", JSON.stringify(state.user));
    },
    clearAuthState: (state) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.passwordReset = initialState.passwordReset;
    },
    resetPasswordState: (state) => {
      state.passwordReset = initialState.passwordReset;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Password Reset Request
      .addCase(requestPasswordReset.pending, (state) => {
        state.passwordReset.loading = true;
        state.passwordReset.error = null;
        state.passwordReset.emailSent = false;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.passwordReset.loading = false;
        state.passwordReset.success = true;
        state.passwordReset.emailSent = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.passwordReset.loading = false;
        state.passwordReset.error = action.payload;
      })
      
      // Password Reset Confirmation
      .addCase(resetPassword.pending, (state) => {
        state.passwordReset.loading = true;
        state.passwordReset.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordReset.loading = false;
        state.passwordReset.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordReset.loading = false;
        state.passwordReset.error = action.payload;
      });
  }
});

// Selectors
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectPasswordResetState = (state) => state.auth.passwordReset;
export const selectUser = (state) => state.auth.user;

// Action aliases
export const login = loginUser;
export const register = registerUser;

// Actions
export const { 
  logout, 
  clearError, 
  clearAuthState, 
  updateUser,
  resetPasswordState 
} = authSlice.actions;

export default authSlice.reducer;