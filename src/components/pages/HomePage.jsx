import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import CategorySection from "./CategorySection";
import ProductGrid from "../../components/products/ProductGrid";
import ComingSoonPage from "./ComingSoonPage";
import { fetchProducts } from "../../store/productSlice";
import { addToCart, openCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice";
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: products = [], status, error } = useSelector((state) => state.products);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef(null);

  // Limited offer products with default empty array
  const limitedOfferProducts = products?.length > 0 ? products.slice(0, Math.min(5, products.length)) : [];
  
  // Remaining products for the grid
  const gridProducts = products?.length > 5 ? products.slice(5, 15) : [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Auto-play functionality (only if we have limited offer products)
  useEffect(() => {
    if (limitedOfferProducts.length <= 1) return;

    const play = () => {
      setCurrentSlide((prev) => 
        prev === limitedOfferProducts.length - 1 ? 0 : prev + 1
      );
    };

    autoPlayRef.current = setInterval(play, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [limitedOfferProducts.length]);

  // Navigation functions with safety checks
  const goToSlide = (index) => {
    if (limitedOfferProducts.length === 0) return;
    setCurrentSlide(index);
    // Restart auto-play timer
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => 
          prev === limitedOfferProducts.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
  };

  const goToPrevSlide = () => {
    if (limitedOfferProducts.length === 0) return;
    setCurrentSlide((prev) => 
      prev === 0 ? limitedOfferProducts.length - 1 : prev - 1
    );
  };

  const goToNextSlide = () => {
    if (limitedOfferProducts.length === 0) return;
    setCurrentSlide((prev) => 
      prev === limitedOfferProducts.length - 1 ? 0 : prev + 1
    );
  };

  // GBP pricing structure for products
  const getDiscountedPrice = (productId) => {
    const gbpPriceMap = {
      1: 85.00, // Jewelry (not available)
      2: 45.99, // Men's Clothing
      3: 35.99, // Women's Clothing
      4: 25.99, // Kids's Clothing
      5: 75.00, // Electronics
    };

    const discountMap = {
      1: 15, // 15% off
      2: 20, // 20% off
      3: 25, // 25% off
      4: 30, // 30% off
      5: 15, // 15% off
    };

    const basePrice = gbpPriceMap[productId] || 49.99;
    const discountPercentage = discountMap[productId] || 20;
    const discountedPrice = (basePrice * (1 - discountPercentage / 100));

    return {
      originalPrice: basePrice,
      discountedPrice: discountedPrice,
      discountPercentage,
    };
  };

  const handleAddToCart = (product) => {
    const { discountedPrice } = getDiscountedPrice(product.id);
    
    dispatch(addToCart({
      id: product.id,
      name: product.name || product.title,
      price: discountedPrice,
      image: product.image || product.imageUrl,
      size: "M", // Default size
      color: "Black", // Default color
      quantity: 1,
    }));
    dispatch(openCart());
  };

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        image: product.image || product.imageUrl,
        category: product.category,
      }));
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <div className="home-page">
      <main className="home-page-main">
        {status === "loading" && <div className="loading-message">Loading products...</div>}
        {status === "failed" && <div className="error-message">Error: {error}</div>}
        
        {/* Limited Offer Carousel - only render if we have products */}
        {limitedOfferProducts.length > 0 && (
          <section className="limited-offer-carousel">
            <div className="carousel-container">
              <h2 className="carousel-title">Limited Time Offers</h2>
              <div className="carousel-wrapper">
                {limitedOfferProducts.length > 1 && (
                  <button
                    className="carousel-arrow carousel-arrow-prev"
                    onClick={goToPrevSlide}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                
                {/*Carousel*/}
                <div className="carousel-content">
                  {limitedOfferProducts.map((product, index) => {
                    const { originalPrice, discountedPrice, discountPercentage } = getDiscountedPrice(product.id);
                    return (
                      <div 
                        key={product.id} 
                        className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                      >
                        <div className="carousel-slide-content">
                          <div className="carousel-image-container">
                            <div className="discount-badge">-{discountPercentage}%</div>
                            <img
                              src={product.image || product.imageUrl || "/placeholder.svg"}
                              alt={product.name || product.title}
                              className="carousel-image"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg";
                              }}
                            />
                          </div>
                          <div className="carousel-details">
                            <h3 className="carousel-product-title">{product.name || product.title}</h3>
                            <p className="carousel-product-description">
                              {product.description ? 
                                product.description.substring(0, 100) + "..." : 
                                "Limited time special offer on this amazing product!"
                              }
                            </p>
                            <div className="carousel-price-container">
                              <span className="carousel-original-price">£{originalPrice.toFixed(2)}</span>
                              <span className="carousel-discounted-price">£{discountedPrice.toFixed(2)}</span>
                            </div>
                            <div className="carousel-offer-ends">
                              Offer ends in {Math.floor(Math.random() * 5) + 1} days
                            </div>
                            <div className="carousel-actions">
                              <button 
                                className="carousel-add-to-cart"
                                onClick={() => handleAddToCart(product)}
                              >
                                <ShoppingCart size={16} />
                                Add to Cart
                              </button>
                              <button 
                                className={`carousel-add-to-wishlist ${isInWishlist(product.id) ? "active" : ""}`}
                                onClick={() => handleWishlistToggle(product)}
                                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                              >
                                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {limitedOfferProducts.length > 1 && (
                  <button 
                    className="carousel-arrow carousel-arrow-next" 
                    onClick={goToNextSlide} 
                    aria-label="Next slide"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
              
              {limitedOfferProducts.length > 1 && (
                <div className="carousel-controls">
                  <div className="carousel-dots">
                    {limitedOfferProducts.map((_, index) => (
                      <button
                        key={index}
                        className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
        
        <CategorySection />
        
        {gridProducts.length > 0 && (
          <div className="featured-products">
            <h2 className="featured-products-title">Featured Products</h2>
            <ProductGrid products={gridProducts} />
          </div>
        )}
        
        <ComingSoonPage />
      </main>
    </div>
  );
};

export default HomePage;