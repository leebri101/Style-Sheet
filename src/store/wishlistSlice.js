import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
    },
    reducers: {
        addToWishList: (state, action) => {
            const newItem = action.payload;
            if (!state.items.find((item) => item.id === newItem.id)) {
                state.items.push(newItem);
            }
        },
        removeFromWishList: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload); 
        },
    },
})

export const { addToWishList, removeFromWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;