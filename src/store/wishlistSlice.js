import { createSlice } from '@reduxjs/toolkit';

const loadWishlistItems = () => {
    try{
        const savedItems = localStorage.getItem("wishlistItems");
        return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
        console.error("Error to loading wishlist from localStorage:", error);
        return [];
    }
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: loadWishlistItems(),
    },
    reducers:{
        addToWishlist: (state, action) => {
            const newItem = action.payload
            if (!state.items.some((item) => item.id === newItem.id)) {
                state.items.push(newItem)
                // Save to localStorage
                localStorage.setItem("wishlistItems", JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload)
            // Update localStorage
            localStorage.setItem("wishlistItems", JSON.stringify(state.items));
        },
    },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;