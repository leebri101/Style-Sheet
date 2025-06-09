import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../products/ProductGrid";
import { fetchProductsByCategory } from "../../store/productSlice";
import './Pages.css';

const STATIC_WOMEN_PRODUCTS = [
  {
    id: 1,
    name: "Women's Basic Tee",
    price: 35,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 2,
    name: "Women's Wool Sweater",
    price: 89,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 3,
    name: "Women's Denim Jeans",
    price: 65,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 4,
    name: "Women's Cotton Blouse",
    price: 45,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 5,
    name: "Women's Leather Jacket",
    price: 189,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 6,
    name: "Women's Maxi Dress",
    price: 79,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 7,
    name: "Women's Yoga Pants",
    price: 55,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 8,
    name: "Women's Cardigan",
    price: 60,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
]

const WomenPage = () => {
  const dispatch = useDispatch();

  const { 
    items: products = [],
    status= 'idle',
    error= null
   } = useSelector((state) => state.products || {});

  useEffect(() => {
    try {
      dispatch(fetchProductsByCategory("women's clothing")) // Fetch products
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }, [dispatch]);
  
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return(
          <>
          <div className="loading-message">Loading Products...</div>
          <ProductGrid products={STATIC_WOMEN_PRODUCTS} />
          </>
        );
      case 'failed':
        return(
          <>
            <div className="error-message">
              {error || 'Error loading products. Please try again later.'}
            </div>
            <ProductGrid products={STATIC_WOMEN_PRODUCTS} />
          </>
        );

        case 'succeeded':
          return products?.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <>
              <div className="empty-message">
                No products found. Showing static version instead.
              </div>
              <ProductGrid products={STATIC_WOMEN_PRODUCTS} />
            </>
          );
        
        default: // 'idle' or other states
          return <ProductGrid products={STATIC_WOMEN_PRODUCTS} />;
    }
  };

  return (
    <div className="womens-page">
      <div className="womens-page-content">
        <h1 className="womens-page-title">Womens Collection</h1>
        {renderContent()}
      </div>
   </div>
  );
};

export default WomenPage