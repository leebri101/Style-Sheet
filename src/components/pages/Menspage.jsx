import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../products/ProductGrid";
import { fetchProductsByCategory } from "../../store/productSlice";
import './Pages.css';

const STATIC_MENS_PRODUCTS = [
  {
    id: 1,
    name: "Men's Basic Tee",
    price: 15,
    imageUrl: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 2,
    name: "Men's Wool Sweater",
    price: 89,
    imageUrl: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 3,
    name: "Men's Denim Jeans",
    price: 65,
    imageUrl: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 4,
    name: "Men's Cotton Shirt",
    price: 45,
    imageUrl: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 5,
    name: "Men's Leather Jacket",
    price: 199,
    imageUrl: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 6,
    name: "Men's Chino Pants",
    price: 55,
    imageUrl: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 7,
    name: "Men's Polo Shirt",
    price: 40,
    imageUrl: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 8,
    name: "Men's Hoodie",
    price: 70,
    imageUrl: '/placeholder.svg?height=300&width=300',
  },
];

const MensPage = () => {
  const dispatch = useDispatch();
  
  // Safer selector with default values
  const { 
    items: products = [], 
    status = 'idle', 
    error = null 
  } = useSelector((state) => state.products || {});

  useEffect(() => {
    try {
      dispatch(fetchProductsByCategory("men's clothing")); // Fixed category string
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
            <ProductGrid products={STATIC_MENS_PRODUCTS} />
          </>
        );
      
      case 'failed':
        return (
          <>
            <div className="error-message">
              {error || 'Error loading products'}. Showing sample products.
            </div>
            <ProductGrid products={STATIC_MENS_PRODUCTS} />
          </>
        );
      
      case 'succeeded':
        return products?.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <>
            <div className="empty-message">
              No products found. Showing sample products.
            </div>
            <ProductGrid products={STATIC_MENS_PRODUCTS} />
          </>
        );
      
      default: // 'idle' or other states
        return <ProductGrid products={STATIC_MENS_PRODUCTS} />;
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Mens Collection</h1> {/* Fixed apostrophe */}
        {renderContent()}
      </div>
    </div>
  );
};

export default MensPage;