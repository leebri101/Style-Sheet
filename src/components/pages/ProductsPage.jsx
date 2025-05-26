//to do tomorrow 25/03/25
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import ProductDetails from "../products/ProductDetails";
import ProductGrid from "../products/ProductGrid";
import { fetchProductById, fetchProductsByCategory } from "../../store/productSlice";
import './Pages.css';


const ProductsPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const {selectedProduct, items: relatedProducts, status, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [id, dispatch])

    useEffect(() => {
        if(selectedProduct?.category){
            dispatch(fetchProductsByCategory(selectedProduct.category))
        }
    }, [selectedProduct?.category,dispatch])

    if (status === "loading" && !selectedProduct) {
        return <div className="product-page-loading">Loading...
        </div>
    }
    if (status === "failed") {
        return <div className="product-page-error">Error: {error}
        </div>
    }
    if (!selectedProduct) {
        return <div className="product-page-not-found">Products not found...
        </div>
    }

    const filteredRelatedProducts = relatedProducts.filter(product => product.id !== selectedProduct.id)
    return (
        <div className="product-page">
            <ProductDetails product={selectedProduct} />
            {filteredRelatedProducts.length > 0 && (
                <div className="related-products">
                    <h2 className="related-products-title">Related Products</h2>
                    <ProductGrid products={filteredRelatedProducts} />
                </div>
            )}
        </div>
    );
}

export default ProductsPage;
// This code defines a ProductsPage component that fetches and displays product details and related products based on the selected product's category.