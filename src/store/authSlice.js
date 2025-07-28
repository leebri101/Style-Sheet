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
  getByEmail: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]')
    return users.find(u => u.email === email);
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
  },
  update: async (userId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error("User not found");
    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    localStorage.setItem('mockUsers', JSON.stringify(users));
    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
};

// Helper functions
const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

const getTokenFromStorage = () => {
  return localStorage.getItem("userToken") || null;
};

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || null,
  isAuthenticated: !!localStorage.getItem("userToken"),
  loading: false,
  error: null,
  status: 'idle',
  loginAttempts: 0,
  lastLoginAttempt: null,
  sessionExpiry: null,
  passwordResetSuccess: false,
  passwordResetLoading: false,
  passwordResetError: null
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
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
  async ({ userId, updates }, { rejectWithValue }) => {
    try {
      const user = await UsersAPI.update(userId, updates);
      localStorage.setItem("userData", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, verify token and update password
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    dispatch(authSlice.actions.clearAuthState());
    return { success: true };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.passwordResetError = null;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.passwordResetSuccess = false;
      state.passwordResetLoading = false;
      state.passwordResetError = null;
    },
    setSessionExpiry: (state, action) => {
      state.sessionExpiry = action.payload;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("userData", JSON.stringify(state.user));
      }
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
        state.sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.loginAttempts += 1;
        state.lastLoginAttempt = new Date().toISOString();
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
        state.sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
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

      // Password Reset
      .addCase(resetPassword.pending, (state) => {
        state.passwordResetLoading = true;
        state.passwordResetError = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordResetLoading = false;
        state.passwordResetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordResetLoading = false;
        state.passwordResetError = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.sessionExpiry = null;
      });
  }
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectPasswordResetStatus = (state) => ({
  success: state.auth.passwordResetSuccess,
  loading: state.auth.passwordResetLoading,
  error: state.auth.passwordResetError
});
export const selectSessionExpiry = (state) => state.auth.sessionExpiry;

export const {
  clearError,
  clearAuthState,
  setSessionExpiry,
  updateUser,
  logout
} = authSlice.actions;

export default authSlice.reducer;