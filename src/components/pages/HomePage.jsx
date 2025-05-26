import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySection from "./CategorySection";
import { ProductShowcase } from "../../components/products/ProductShowcase";
import { ProductGrid } from "../../components/products/ProductGrid";
import { fetchProducts } from "../../store/productSlice";
import './Pages.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const { items: products, status, error } = 
    useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    const featuredProduct = products.length > 0 ? products[0] : null;
    const gridProducts = products.length > 1 ? products.slice(1, 5) : [];

    return (
        <div className = "home-page">
            <main className="home-page-main">
                {status === "loading" && <div className="loading-message">
                    Loading products...
                    </div>}
                {status === "failed" && <div className="error-message">
                    Error: {error}
                    </div>}
                
                {featuredProduct && (
                    <ProductShowcase
                    title={featuredProduct.name}
                    price={featuredProduct.price}
                    description={featuredProduct.description}
                    imageUrl={featuredProduct.imageUrl}
                    isLimitedOffer={true}
                    offerEndDate = "December 11th"
                    />
                )}

                <CategorySection />
                
                {gridProducts.length > 0 && (
                    <div className="featured-products">
                        <h2 className="featured-products-title">
                            Featured Products
                        </h2>
                        <ProductGrid products={gridProducts} />
                    </div>
                )}
            </main>
        </div>
    )
}

export default HomePage;