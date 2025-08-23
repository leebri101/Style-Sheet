"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react"
import "./LimitedOfferCarousel.css"

const LimitedOfferCarousel = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSizes, setSelectedSizes] = useState({})
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  {/*limited offer items*/}
  const limitedOffers =
    products.length > 0
      ? products.slice(0, 5).map((product, index) => ({
          ...product,
          isLimitedOffer: true,
          offerEndDate: `December ${15 + index}th`,
          originalPrice: product.price * 1.3,
          discount: Math.floor(Math.random() * 30) + 20,
        }))
      : [
          {
            id: 1,
            name: "Premium Winter Jacket",
            price: 89.99,
            originalPrice: 129.99,
            description: "Stay warm and stylish with our premium winter collection",
            imageUrl: "/placeholder.svg?height=400&width=400",
            isLimitedOffer: true,
            offerEndDate: "December 15th",
            discount: 30,
          },
          {
            id: 2,
            name: "Designer Sneakers",
            price: 79.99,
            originalPrice: 119.99,
            description: "Limited edition designer sneakers with premium comfort",
            imageUrl: "/placeholder.svg?height=400&width=400",
            isLimitedOffer: true,
            offerEndDate: "December 16th",
            discount: 33,
          },
          {
            id: 3,
            name: "Luxury Watch",
            price: 199.99,
            originalPrice: 299.99,
            description: "Elegant timepiece with Swiss movement technology",
            imageUrl: "/placeholder.svg?height=400&width=400",
            isLimitedOffer: true,
            offerEndDate: "December 17th",
            discount: 33,
          },
        ]

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoPlaying || limitedOffers.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === limitedOffers.length - 1 ? 0 : prevIndex + 1))
    }, 3000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, limitedOffers.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? limitedOffers.length - 1 : currentIndex - 1)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === limitedOffers.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }))
  }

  if (limitedOffers.length === 0) return null

  const currentProduct = limitedOffers[currentIndex]

  return (
    <div className="limited-offer-carousel">
      <div className="carousel-header">
        <h2 className="carousel-title">⚡ Limited Time Offers</h2>
        <p className="carousel-subtitle">Don`t miss out on these exclusive deals!</p>
      </div>

      <div className="carousel-container">
        {/* Navigation Arrows */}
        <button className="carousel-nav carousel-nav-left" onClick={goToPrevious} aria-label="Previous offer">
          <ChevronLeft size={24} />
        </button>

        <button className="carousel-nav carousel-nav-right" onClick={goToNext} aria-label="Next offer">
          <ChevronRight size={24} />
        </button>

        {/* Main Carousel Content */}
        <div className="carousel-content">
          <div className="carousel-slide">
            <div className="product-showcase-carousel">
              <div className="product-image-carousel">
                <div className="limited-offer-badge">
                  <span className="discount-percentage">{currentProduct.discount}% OFF</span>
                  <span className="limited-text">LIMITED OFFER</span>
                </div>
                <img
                  src={currentProduct.imageUrl || "/placeholder.svg?height=500&width=500"}
                  alt={currentProduct.name}
                />
              </div>

              <div className="product-info-carousel">
                <h1 className="product-title-carousel">{currentProduct.name}</h1>

                <div className="product-price-container-carousel">
                  <div className="price-group">
                    <span className="current-price">£{currentProduct.price.toFixed(2)}</span>
                    {currentProduct.originalPrice && (
                      <span className="original-price">£{currentProduct.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <p className="offer-end-date-carousel">Offer ends {currentProduct.offerEndDate}</p>
                </div>

                <div className="product-description-carousel">
                  <p>{currentProduct.description}</p>
                </div>

                <div className="size-selector-carousel">
                  <h3>Size</h3>
                  <div className="size-grid-carousel">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(currentProduct.id, size)}
                        className={`size-button-carousel ${
                          selectedSizes[currentProduct.id] === size ? "selected" : ""
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="product-actions-carousel">
                  <button type="button" className="add-to-cart-carousel">
                    <ShoppingCart className="button-icon" />
                    Add to Cart
                  </button>
                  <button type="button" className="favorite-button-carousel">
                    <Heart className="button-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {limitedOffers.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to offer ${index + 1}`}
            />
          ))}
        </div>

        {/* Product Thumbnails */}
        <div className="carousel-thumbnails">
          {limitedOffers.map((product, index) => (
            <div
              key={product.id}
              className={`thumbnail ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            >
              <img src={product.imageUrl || "/placeholder.svg?height=80&width=80"} alt={product.name} />
              <div className="thumbnail-info">
                <span className="thumbnail-name">{product.name}</span>
                <span className="thumbnail-price">£{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto-play Control */}
      <div className="carousel-controls">
        <button
          className={`autoplay-toggle ${isAutoPlaying ? "active" : ""}`}
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>
      </div>
    </div>
  )
}
LimitedOfferCarousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      price: PropTypes.number,
      originalPrice: PropTypes.number,
      description: PropTypes.string,
      imageUrl: PropTypes.string,
      isLimitedOffer: PropTypes.bool,
      offerEndDate: PropTypes.string,
      discount: PropTypes.number,
    })
  ),
}

export default LimitedOfferCarousel

