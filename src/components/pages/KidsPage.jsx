import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../products/ProductGrid";
import { fetchProductsByCategory } from "../../store/productSlice";
import './Pages.css';


const STATIC_KIDS_PRODUCTS = [
    {
        id: 1,
        name: "Kids' Basic Tee",
        price: 25,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 2,
        name: "Kids' Hoodie",
        price: 49,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 3,
        name: "Kids' Jeans",
        price: 45,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 4,
        name: "Kids' Sneakers",
        price: 55,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 5,
        name: "Kids' Pajama Set",
        price: 35,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 6,
        name: "Kids' Backpack",
        price: 30,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 7,
        name: "Kids' Dress",
        price: 40,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 8,
        name: "Kids' Swim Shorts",
        price: 20,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
]

const KidsPage = () =>{
    const dispatch = useDispatch();
    const { 
        items: products = [], 
        status = "idle", 
        error = null 
    } = useSelector((state) => state.products || {});
    
    useEffect(() => {
        try{
            dispatch(fetchProductsByCategory("kids' clothing"));
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    }, [dispatch]);
        
        const renderContent = () => {
            switch (status) {
                case 'loading':
                    return (
                        <>
                        <div className="loading-message">Loading products...</div>
                        <ProductGrid products={STATIC_KIDS_PRODUCTS} />
                        </>
                    );
                case 'failed':
                    return(
                        <>
                            <div className="error-message">
                                {error || 'Error loading products. Please try again later.'}
                            </div>
                            <ProductGrid products={STATIC_KIDS_PRODUCTS}/>
                        </>
                    )
                case 'succeeded':
                    return products.length > 0 ? (
                        <ProductGrid products={products} />
                    ) : (
                        <>
                            <div className="empty-message">
                                No products found. Please try again later.
                            </div>
                            <ProductGrid products={STATIC_KIDS_PRODUCTS} />
                        </>
                    ); 
                default: // 'idle' or other states
                    return <ProductGrid products={STATIC_KIDS_PRODUCTS} />;
            }  
        };

        return(
        <div className="page">
            <div className="page-content">
                <h1 className="page-title">Kids Collection</h1>
                {renderContent()}
            </div>
        </div>
    )
}
export default KidsPage;