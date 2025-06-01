import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySection from "./CategorySection";
import ProductGrid from "../../components/products/ProductGrid";
import { fetchProducts } from "../../store/productSlice";
import './Pages.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const { items: products, status, error } = 
    useSelector((state) => state.products)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const autoPlayRef = useRef(null);


    // Auto-play functionality for the product showcase
    const limitedOfferProducts = products.length > 0 ? products.slice(0, 
        Math.min(5, products.length)) : []

    const gridProducts = products.length > 5 ? products.slice(5,9) : [];

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    useEffect(() => {
        if(!limitedOfferProducts.length) return

        const play = () => {
            if (isPlaying) {
                setCurrentSlide((prev) => (prev === limitedOfferProducts.length - 1 ? 0 : prev + 1));
            }
        }

        autoPlayRef.current = setInterval(play, 5000);

        return() => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        }
    }, [isPlaying, limitedOfferProducts.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    }

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? limitedOfferProducts.length - 1 : prev - 1));
    }
    
    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === limitedOfferProducts.length - 1 ? 0 : prev + 1));
    }

    const toggleAutoPlay = () => {
        setIsPlaying((prev) => !prev);
    }

    const getDiscountedPrice = (originalPrice) => {
        const discount = Math.floor(Math.random() * 30) + 10 // 10-40% discount
        const discountedPrice = originalPrice * (1 - discount / 100)
        return {
            originalPrice,
            discountedPrice: discountedPrice.toFixed(2),
            discountPercentage: discount,
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
                    const { originalPrice, discountedPrice, discountPercentage } = getDiscountedPrice(product.price)

                    return (
                      <div key={product.id} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
                        <div className="carousel-slide-content">
                          <div className="carousel-image-container">
                            <div className="discount-badge">-{discountPercentage}%</div>
                            <img
                              src={product.imageUrl || "/placeholder.svg?height=400&width=400"}
                              alt={product.name}
                              className="carousel-image"
                            />
                          </div>

                          <div className="carousel-details">
                            <h3 className="carousel-product-title">{product.name}</h3>
                            <p className="carousel-product-description">
                              {product.description || "Limited time offer! Get this amazing product before it's gone."}
                            </p>

                            <div className="carousel-price-container">
                              <span className="carousel-original-price">${originalPrice}</span>
                              <span className="carousel-discounted-price">${discountedPrice}</span>
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

                <button
                  className="carousel-autoplay-toggle"
                  onClick={toggleAutoPlay}
                  aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                >
                  {isPlaying ? "❚❚" : "▶"}
                </button>
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
      </main>
    </div>
  )
}

export default HomePage
