//to do tomorrow 25/03/25
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        updateProductStock:(state, action) => {
            const { id, quantity } = action.payload;
            const product = state.items.find(product => product.id === id);
            if (product) {
                product.stock = (product.stock || 0 ) - quantity;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
    
})

export const { updateProductStock } = productSlice.actions; 
export default productSlice.reducer;