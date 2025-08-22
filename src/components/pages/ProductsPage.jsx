import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";
import ProductDetails from "../products/ProductDetails";
import ProductGrid from "../products/ProductGrid";
import { fetchProductById, fetchProductsByCategory } from "../../store/productSlice";
import './ProductsPage.css';

const ProductsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProduct, items: relatedProducts, status, error } = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            setIsLoading(true);
            try {
                // Check if we have a valid product ID
                if (!id) {
                    navigate('/');
                    return;
                }

                // Check if this is a custom product ID
                if (id.toString().startsWith("custom_") || isNaN(id)) {
                    // Handle custom products directly from localStorage
                    const customProducts = JSON.parse(localStorage.getItem("ecommerce_custom_products") || "[]");
                    const customProduct = customProducts.find(p => p.id === id);
                    
                    if (customProduct) {
                        dispatch({
                            type: 'products/setSelectedProduct',
                            payload: customProduct
                        });
                        
                        // Fetch related products based on category
                        if (customProduct.category) {
                            dispatch(fetchProductsByCategory(customProduct.category));
                        }
                    } else {
                        throw new Error("Custom product not found");
                    }
                } else {
                    // Try to fetch product from API for numeric IDs
                    try {
                        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                        if (response.ok) {
                            const productData = await response.json();
                            
                            // Transform API data to match our format
                            const transformedProduct = {
                                id: productData.id,
                                name: productData.title,
                                title: productData.title,
                                price: productData.price,
                                description: productData.description,
                                category: productData.category,
                                image: productData.image,
                                imageUrl: productData.image,
                                images: [productData.image],
                                rating: productData.rating || { rate: 0, count: 0 },
                                stockQuantity: Math.floor(Math.random() * 100) + 10,
                                inStock: true,
                                sizes: ["XS", "S", "M", "L", "XL", "XXL"],
                                colors: ["Black", "White", "Navy", "Gray", "Red"],
                                brand: "Fashion Brand",
                                tags: [productData.category],
                            };

                            // Dispatch the product to store
                            dispatch({
                                type: 'products/setSelectedProduct',
                                payload: transformedProduct
                            });

                            // Fetch related products
                            dispatch(fetchProductsByCategory(productData.category));
                        } else {
                            // Fallback to Redux action
                            await dispatch(fetchProductById(id)).unwrap();
                        }
                    } catch (apiError) {
                        console.log('API fetch failed, trying Redux action:', apiError);
                        // Fallback to Redux action
                        await dispatch(fetchProductById(id)).unwrap();
                    }
                }
            } catch (err) {
                console.error('Error loading product:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadProduct();
    }, [id, dispatch, navigate]);

    useEffect(() => {
        if (selectedProduct?.category) {
            dispatch(fetchProductsByCategory(selectedProduct.category));
        }
    }, [selectedProduct?.category, dispatch]);

    const handleBackClick = () => {
        navigate(-1); // Go back to previous page
    };

    if (isLoading || (status === "loading" && !selectedProduct)) {
        return (
            <div className="product-page">
                <div className="product-page-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading product...</p>
                </div>
            </div>
        );
    }

    if (status === "failed" && !selectedProduct) {
        return (
            <div className="product-page">
                <div className="product-page-error">
                    <h2>Error loading product</h2>
                    <p>{error}</p>
                    <div className="error-actions">
                        <button onClick={handleBackClick} className="back-btn">
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                        <button onClick={() => window.location.reload()} className="retry-btn">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!selectedProduct) {
        return (
            <div className="product-page">
                <div className="product-page-not-found">
                    <h2>Product not found</h2>
                    <p>The product you're looking for doesn't exist or has been removed.</p>
                    <button onClick={handleBackClick} className="back-btn">
                        <ArrowLeft size={20} />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const filteredRelatedProducts = relatedProducts.filter(product => product.id !== selectedProduct.id);

    return (
        <div className="product-page">
            {/* Back Navigation */}
            <div className="product-page-header">
                <button onClick={handleBackClick} className="back-btn">
                    <ArrowLeft size={20} />
                    Back
                </button>
                <nav className="breadcrumb">
                    <span>Home</span>
                    {selectedProduct.category && (
                        <>
                            <span> / </span>
                            <span className="category-crumb">{selectedProduct.category}</span>
                        </>
                    )}
                    <span> / </span>
                    <span className="current-crumb">{selectedProduct.name || selectedProduct.title}</span>
                </nav>
            </div>

            {/* Product Details */}
            <ProductDetails product={selectedProduct} />

            {/* Related Products */}
            {filteredRelatedProducts.length > 0 && (
                <div className="related-products">
                    <h2 className="related-products-title">
                        Related Products
                        <span className="related-count">({filteredRelatedProducts.length})</span>
                    </h2>
                    <ProductGrid products={filteredRelatedProducts.slice(0, 8)} loading={false} />
                </div>
            )}
        </div>
    );
};

export default ProductsPage;