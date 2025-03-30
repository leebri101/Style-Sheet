//to do tomorrow 25/03/25
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import ProductDetails from "../components/products/ProductDetails";
import ProductGrid from "../components/products/ProductGrid";
import { fetchProducts } from "../store/productSlice";
import './Pages.css';
import { use } from "react";

const ProductsPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const { items: products, status, error} = useSelector
    ((state) => state.products)

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchProducts())
        }
    }, [status, dispatch])

    if(status === 'loading') {
        return <div className="product-page-loading">Loading...</div>
    }
    
    if(status === 'failed') {
        return <div className="product-page-error">Error: {error}</div>
    }

    const product = products.find((p)) => p.id === Number(id));

    if(!product) {
        return <div className="product-page-not-found">
            Product not found</div>
    }

    const relatedProducts = products.filter((p) => p.category 
    === product.category && p.id !== product.id).slice(0, 4)

    return (
        <div className="product-page">
            <ProductDetails {...product} />
            <div className="related-products">
                <h2 className="related-products-title">Similar Products</h2>
                <ProductGrid products={relatedProducts} />
            </div>
        </div>
    )
    
export default ProductsPage;