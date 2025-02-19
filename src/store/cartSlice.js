// Cart slice for Redux store.
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id && item.size === newItem.size
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.total += newItem.price;
        },
        removeFromCart: (state, action) => {
            const { id, size } = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === id && item.size === size
            );
            if (existingItem) {
                state.total -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(
                    (item) => !(item.id === id && item.size === size)
                );
            }
        },
        updateQuantity: (state, action) => {
            const { id, size, quantity } = action.payload;
            const item = state.items.find(
                (item) => item.id === id && item.size === size
            );
            if (item) {
                const quantityDifference = quantity - item.quantity;
                state.total += item.price * quantityDifference;
                item.quantity = quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;