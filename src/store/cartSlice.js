// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return {
        items: [],
        isOpen: false,
        totalAmount: 0
      };
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return {
      items: [],
      isOpen: false,
      totalAmount: 0
    };
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image, size, color, quantity = 1 } = action.payload;
      
      // Generate a unique key for this item variant
      const itemKey = `${id}-${size || 'default'}-${color || 'default'}`;
      
      const existingItemIndex = state.items.findIndex(
        item => item.key === itemKey
      );
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          key: itemKey,
          id,
          name,
          price,
          image,
          size,
          color,
          quantity
        });
      }
      
      // Update total amount
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Save to localStorage
      saveCartToStorage(state);
    },
    
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      
      // Generate the key to identify the exact item
      const itemKey = `${id}-${size || 'default'}-${color || 'default'}`;
      
      state.items = state.items.filter(item => item.key !== itemKey);
      
      // Update total amount
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Save to localStorage
      saveCartToStorage(state);
    },
    
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload;
      
      // Generate the key to identify the exact item
      const itemKey = `${id}-${size || 'default'}-${color || 'default'}`;
      
      const itemIndex = state.items.findIndex(item => item.key === itemKey);
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
        } else {
          // Update quantity
          state.items[itemIndex].quantity = quantity;
        }
        
        // Update total amount
        state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Save to localStorage
        saveCartToStorage(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      
      // Save to localStorage
      saveCartToStorage(state);
    },
    
    openCart: (state) => {
      state.isOpen = true;
    },
    
    closeCart: (state) => {
      state.isOpen = false;
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartItemsCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;