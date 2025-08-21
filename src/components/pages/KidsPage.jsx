import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { addToCart } from "../../store/cartSlice";
import { addToWishlist,removeFromWishlist,selectWishlistItems } from "../../store/wishlistSlice";
import ProductGrid from "../products/ProductGrid";
import './KidsPage.css';

const kidsProducts = [
  {
    id: "kids-1",
    name: "Kids' Adventure Tee",
    price: 18.99,
    originalPrice: 24.99,
    discount: 24,
    imageUrl: "/placeholder.svg?height=300&width=300&text=Kids+Adventure+Tee",
    description: "Comfortable cotton t-shirt perfect for playground adventures",
    category: "kids",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue", "Red", "Green"],
    rating: 4.5,
    reviews: 128
  },
  {
    id: "kids-2",
    name: "Cozy Kids Hoodie",
    price: 32.99,
    originalPrice: 39.99,
    discount: 18,
    imageUrl: "/placeholder.svg?height=300&width=300&text=Cozy+Kids+Hoodie",
    description: "Super soft hoodie to keep little ones warm and stylish",
    category: "kids",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "Gray", "Navy"],
    rating: 4.2,
    reviews: 87
  },
  {
    id: "kids-3",
    name: "Durable Play Jeans",
    price: 28.99,
    originalPrice: 34.99,
    discount: 17,
    imageUrl: "/placeholder.svg?height=300&width=300&text=Durable+Play+Jeans",
    description: "Reinforced denim jeans built for active kids",
    category: "kids",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue", "Black", "Light Blue"],
    rating: 4.3,
    reviews: 64
  },
  {
    id: "kids-4",
    name: "Sport Sneakers",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    imageUrl: "/placeholder.svg?height=300&width=300&text=Sport+Sneakers",
    description: "Lightweight sneakers perfect for running and playing",
    category: "kids",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Black", "White", "Red"],
    rating: 4.7,
    reviews: 142
  },
  {
    id: "kids-5",
    name: "Dreamy Pajama Set",
    price: 22.99,
    originalPrice: 27.99,
    discount: 18,
    imageUrl: "/placeholder.svg?height=300&width=300&text=Dreamy+Pajama+Set",
    description: "Ultra-soft pajama set for the sweetest dreams",
    category: "kids",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "Blue", "Purple"],
    rating: 4.8,
    reviews: 93
  },
  {
    id: "kids-6",
    name: "School Backpack",
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    imageUrl: "/placeholder.svg?height=300&width=300&text=School+Backpack",
    description: "Spacious and durable backpack for school and adventures",
    category: "kids",
    sizes: ["One Size"],
    colors: ["Black", "Blue", "Red"],
    rating: 4.6,
    reviews: 116
  },
]

const KidsPage = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedSize, setSelectedSize] = useState({})
  const [selectedColor, setSelectedColor] = useState({})
  const autoPlayRef = useRef(null)

  // Get featured kids products for carousel (first 4 products)
  const featuredProducts = kidsProducts.slice(0, 4)
  // Get remaining products for the grid
  const gridProducts = kidsProducts.slice(4)

  // Auto-play functionality for carousel
  useEffect(() => {
    const play = () => {
      setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1))
    }

    autoPlayRef.current = setInterval(play, 5000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [featuredProducts.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1))
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1))
  }

  const handleAddToCart = (product) => {
    const size = selectedSize[product.id] || product.sizes[0]
    const color = selectedColor[product.id] || (product.colors ? product.colors[0] : "Default")

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        size,
        color,
        quantity: 1,
      }),
    )
  }

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id)

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.imageUrl,
          category: product.category,
        }),
      )
    }
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  return (
    <div className="kids-page">
      <div className="kids-page-content">
        <div className="kids-page-header">
          <h1 className="kids-page-title">Kids' Collection</h1>
          <p className="kids-page-subtitle">Fun, comfortable, and durable clothing for active kids</p>
        </div>

        {/* Kids Featured Carousel */}
        <section className="kids-carousel">
          <div className="carousel-container">
            <div className="carousel-header">
              <h2 className="carousel-title">Featured Kids' Items</h2>
              <p className="carousel-subtitle">Special deals on our most popular kids' products</p>
            </div>

            <div className="carousel-wrapper">
              <button
                className="carousel-arrow carousel-arrow-prev"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="carousel-content">
                {featuredProducts.map((product, index) => (
                  <div key={product.id} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
                    <div className="carousel-slide-content">
                      <div className="carousel-image-container">
                        {product.discount && (
                          <div className="discount-badge">-{product.discount}%</div>
                        )}
                        <button
                          className={`wishlist-button ${isInWishlist(product.id) ? "active" : ""}`}
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        </button>
                        <img
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          className="carousel-image"
                        />
                      </div>

                      <div className="carousel-details">
                        <div className="product-rating">
                          <div className="stars">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill={i < Math.floor(product.rating || 0) ? "#fbbf24" : "none"}
                                color="#fbbf24"
                              />
                            ))}
                          </div>
                          <span className="rating-text">({product.reviews || 0} reviews)</span>
                        </div>

                        <h3 className="carousel-product-title">{product.name}</h3>
                        <p className="carousel-product-description">{product.description}</p>

                        <div className="product-options">
                          <div className="size-selector">
                            <label>Size:</label>
                            <select
                              value={selectedSize[product.id] || product.sizes[0]}
                              onChange={(e) => setSelectedSize((prev) => ({ ...prev, [product.id]: e.target.value }))}
                            >
                              {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>

                          {product.colors && (
                            <div className="color-selector">
                              <label>Color:</label>
                              <select
                                value={selectedColor[product.id] || product.colors[0]}
                                onChange={(e) => setSelectedColor((prev) => ({ ...prev, [product.id]: e.target.value }))}
                              >
                                {product.colors.map((color) => (
                                  <option key={color} value={color}>
                                    {color}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>

                        <div className="carousel-price-container">
                          {product.originalPrice && (
                            <span className="carousel-original-price">£{product.originalPrice}</span>
                          )}
                          <span className="carousel-discounted-price">£{product.price}</span>
                        </div>

                        <div className="carousel-actions">
                          <button className="carousel-add-to-cart" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart size={18} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="carousel-arrow carousel-arrow-next" onClick={goToNextSlide} aria-label="Next slide">
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="carousel-controls">
              <div className="carousel-dots">
                {featuredProducts.map((_, index) => (
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

        <div className="kids-products-grid">
          <div className="grid-header">
            <h2 className="grid-title">More Kids' Products</h2>
            <p className="grid-subtitle">Discover our complete collection of kids' clothing and accessories</p>
          </div>
          <ProductGrid products={gridProducts} />
        </div>
      </div>
    </div>
  )
}

export default KidsPage