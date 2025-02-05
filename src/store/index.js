import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import productReducer from "./productSlice"
import wishlistReducer from "./wishlistSlice"
import authReducer from "./authSlice"

export const store = configureStore({
    reducer:{
        cart: cartReducer,
        products: productReducer,
        wishlist: wishlistReducer,
        auth: authReducer,
    },
})