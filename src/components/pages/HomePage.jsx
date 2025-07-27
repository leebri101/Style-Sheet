import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySection from "./CategorySection";
import ProductGrid from "../../components/products/ProductGrid";
import NewsletterSignup from "../pages/NewsletterSignup";
import { fetchProducts } from "../../store/productSlice";
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch()
  const { items: products, status, error } = useSelector((state) => state.products)
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoPlayRef = useRef(null)

  // Get limited offer products (first 5 products or fewer if not enough)
  const limitedOfferProducts = products.length > 0 ? products.slice(0, Math.min(5, products.length)) : []

  // Get remaining products for the grid (excluding limited offers)
  const gridProducts = products.length > 5 ? products.slice(5, 15) : []

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Auto-play functionality
  useEffect(() => {
    if (!limitedOfferProducts.length) return

    const play = () => {
      setCurrentSlide((prev) => (prev === limitedOfferProducts.length - 1 ? 0 : prev + 1))
    }

    autoPlayRef.current = setInterval(play, 3000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [limitedOfferProducts.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? limitedOfferProducts.length - 1 : prev - 1))
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === limitedOfferProducts.length - 1 ? 0 : prev + 1))
  }

  // GBP pricing structure for products
  const getDiscountedPrice = (productId) => {
    // Base GBP prices for different product categories
    const gbpPriceMap = {
      1: 85.00, // Jewelry
      2: 45.99, // Men's Clothing
      3: 35.99, // Women's Clothing
      4: 25.99, // Women's Clothing
      5: 75.00, // Electronics
    }

    // Consistent discount percentages based on product ID
    const discountMap = {
      1: 15, // 15% off
      2: 20, // 20% off
      3: 20, // 20% off
      4: 10, // 10% off
      5: 15, // 15% off
    }

    // Default pricing for products not in map
    const basePrice = gbpPriceMap[productId] || 49.99
    const discountPercentage = discountMap[productId] || 20
    const discountedPrice = (basePrice * (1 - discountPercentage / 100)).toFixed(2)

    return {
      originalPrice: `£${basePrice.toFixed(2)}`,
      discountedPrice: `£${discountedPrice}`,
      discountPercentage,
    }
  }
  return (
    <div className="home-page">
      <main className="home-page-main">
        {status === "loading" && <div className="loading-message">Loading products...</div>}
        {status === "failed" && <div className="error-message">Error: {error}</div>}
        {/* Limited Offer Carousel */}
        {limitedOfferProducts.length > 0 && (
          <section className="limited-offer-carousel">
            <div className="carousel-container">
              <h2 className="carousel-title">Limited Time Offers</h2>
              <div className="carousel-wrapper">
                <button
                  className="carousel-arrow carousel-arrow-prev"
                  onClick={goToPrevSlide}
                  aria-label="Previous slide"
                >
                  &lt;
                </button>
                <div className="carousel-content">
                  {limitedOfferProducts.map((product, index) => {
                    const { originalPrice, discountedPrice, discountPercentage } = getDiscountedPrice(product.id)
                    return (
                      <div key={product.id} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
                        <div className="carousel-slide-content">
                          <div className="carousel-image-container">
                            <div className="discount-badge">-{discountPercentage}%</div>
                            <img
                              src={product.imageUrl || "/placeholder.svg?height=100&width=100"}
                              alt={product.name}
                              className="carousel-image"
                            />
                          </div>
                          <div className="carousel-details">
                            <h3 className="carousel-product-title">{product.name}</h3>
                            <div className="carousel-price-container">
                              <span className="carousel-original-price">{originalPrice}</span>
                              <span className="carousel-discounted-price">{discountedPrice}</span>
                            </div>
                            <div className="carousel-offer-ends">
                              Offer ends in {Math.floor(Math.random() * 5) + 1} days
                            </div>
                            <div className="carousel-actions">
                              <button className="carousel-add-to-cart">Add to Cart</button>
                              <button className="carousel-add-to-wishlist">♡</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button className="carousel-arrow carousel-arrow-next" onClick={goToNextSlide} aria-label="Next slide">
                  &gt;
                </button>
              </div>
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
        <NewsletterSignup />
      </main>
    </div>
  )
}

export default HomePage