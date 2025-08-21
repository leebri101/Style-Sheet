import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { addToCart } from "../../store/cartSlice";
import { addToWishlist,removeFromWishlist,selectWishlistItems } from "../../store/wishlistSlice";
import ProductGrid from "../products/ProductGrid";
import './KidsPage.css';

const KidsPage = () => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedSize, setSelectedSize] = useState({})
  const [selectedColor, setSelectedColor] = useState({})
  const autoPlayRef = useRef(null)

  // Kids clothing products with simplified format
  const kidsProducts = [
    {
      name: "Mickey Mouse T-shirt",
      price: 18.99,
      description: "Everyone's favorite cartoon mouse",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/mickey-mouse-tee.jpg",
      stockQuantity: 45,
      sizes: ["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      name: "Basic Grey Sweatshirt",
      price: 32.99,
      description: "Simple and stylish",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/basic-grey-sweatshirt.jpg",
      stockQuantity: 38,
      sizes:["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      name: "Denim Overalls",
      price: 28.99,
      description: "Dress like a minion",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/teens-denim-overalls.jpg",
      stockQuantity: 52,
      sizes: ["2", "3", "4", "5", "6", "7", "8", "10", "12"],
    },
    {
      name: "Yellow Jumper",
      price: 39.99,
      description: "Summer, cheerful and cute",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/kids-yellow-sweatshirt.jpg",
      stockQuantity: 29,
      sizes: ["10", "11", "12", "13", "1", "2", "3", "4", "5"],
    },
    {
      name: "Green Hoodie",
      price: 22.99,
      description: "Perfect for the colder weather",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/basic-green-hoodie.jpg",
      stockQuantity: 41,
      sizes: ["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      name: "Kids Outdoor Coat",
      price: 35.99,
      description: "For the great outdoors",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/fox-outdoor-coat.jpg",
      stockQuantity: 33,
      sizes: ["2T", "3T", "4T", "5T", "6", "7", "8", "10"],
    },
    {
      name: "Pink Dress",
      price: 26.99,
      description: "Pink and pretty",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/pink-dress.jpg",
      stockQuantity: 47,
      sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    },
    {
      name: "Kids quarter zip",
      price: 19.99,
      description: "The little gentleman",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/boys-quarter-button-jumper.jpg",
      stockQuantity: 56,
      sizes: ["2T", "3T", "4T", "5T", "6", "7", "8", "10", "12"],
    },
  ]

  // Get featured kids products for carousel (first 4 products)
  const featuredProducts = kidsProducts.slice(0, 4)
  // Get remaining products for the grid
  const gridProducts = kidsProducts.slice(4)

  // Auto-play functionality for carousel
  useEffect(() => {
    const play = () => {
      setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1))
    }

    autoPlayRef.current = setInterval(play, 6000)

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
    const size = selectedSize[product.name] || product.sizes[0]

    dispatch(
      addToCart({
        id: product.name,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        quantity: 1,
      }),
    )
  }

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.name === product.name)

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.name))
    } else {
      dispatch(
        addToWishlist({
          id: product.name,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        }),
      )
    }
  }

  const isInWishlist = (productName) => {
    return wishlistItems.some((item) => item.name === productName)
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
              <p className="carousel-subtitle">Special deals on our most popular kids' clothing</p>
            </div>

            <div className="carousel-wrapper">
              <button
                className="carousel-arrow carousel-arrow-prev"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="carousel-content">
                {featuredProducts.map((product, index) => (
                  <div key={product.name} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
                    <div className="carousel-slide-content">
                      <div className="carousel-image-container">
                        <button
                          className={`wishlist-button ${isInWishlist(product.name) ? "active" : ""}`}
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart size={20} fill={isInWishlist(product.name) ? "currentColor" : "none"} />
                        </button>
                        <img src={product.image || "/placeholder.svg"} alt={product.name} className="carousel-image" />
                      </div>

                      <div className="carousel-details">
                        <h3 className="carousel-product-title">{product.name}</h3>
                        <p className="carousel-product-description">{product.description}</p>

                        <div className="product-options">
                          <div className="size-selector">
                            <label>Size:</label>
                            <select
                              value={selectedSize[product.name] || product.sizes[0]}
                              onChange={(e) => setSelectedSize((prev) => ({ ...prev, [product.name]: e.target.value }))}
                            >
                              {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="carousel-price-container">
                          <span className="carousel-price">£{product.price}</span>
                          <span className="stock-info">{product.stockQuantity} in stock</span>
                        </div>
                        <div className="carousel-actions">
                          <button className="carousel-add-to-cart" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart size={25} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="carousel-arrow carousel-arrow-next" onClick={goToNextSlide} aria-label="Next slide">
                <ChevronRight size={20} />
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
            <h2 className="grid-title">More Kids Clothing</h2>
          </div>
          <ProductGrid products={gridProducts} />
        </div>
      </div>
    </div>
  )
}

export default KidsPage
