import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../products/ProductGrid";
import { selectProducts, selectLoading, selectError} from "../../store/productSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./MensPage.css";

const MenPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const [allClothingProducts, setAllClothingProducts] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(false) // Added this line

  useEffect(() => {
    const loadManualProducts = async () => {
      setIsLoading(true)

      // Manual clothing products with simplified format
      const clothingProducts = [
        {
          id: 1,
          name: "Premium Cotton T-Shirt",
          price: 29.99,
          description: "Comfortable and stylish cotton t-shirt perfect for everyday wear",
          category: "men's clothing",
          image: "",
          stockQuantity: 45,
          sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        },
        {
          id: 2,
          name: "Classic Denim Jacket",
          price: 89.99,
          description: "Timeless denim jacket with a modern fit and premium quality",
          category: "men's clothing",
          image: "",
          stockQuantity: 23,
          sizes: ["S", "M", "L", "XL", "XXL"],
        },
        {
          id: 3,
          name: "Slim Fit Chinos",
          price: 59.99,
          description: "Versatile slim-fit chinos perfect for both casual and semi-formal occasions",
          category: "men's clothing",
          image: "",
          stockQuantity: 67,
          sizes: ["28", "30", "32", "34", "36", "38"],
        },
        {
          id: 4,
          name: "Casual Button-Down Shirt",
          price: 45.99,
          description: "Comfortable button-down shirt with a relaxed fit for everyday style",
          category: "men's clothing",
          image: "",
          stockQuantity: 34,
          sizes: ["S", "M", "L", "XL", "XXL"],
        },
        {
          id: 5,
          name: "Athletic Joggers",
          price: 39.99,
          description: "Comfortable athletic joggers perfect for workouts and casual wear",
          category: "men's clothing",
          image: "",
          stockQuantity: 78,
          sizes: ["S", "M", "L", "XL", "XXL"],
        },
        {
          id: 6,
          name: "Formal Dress Shirt",
          price: 55.99,
          description: "Crisp formal dress shirt perfect for business and special occasions",
          category: "men's clothing",
          image: "",
          stockQuantity: 29,
          sizes: ["14.5", "15", "15.5", "16", "16.5", "17"],
        },
      ]

      setAllClothingProducts(clothingProducts)
      setIsLoading(false)
    }

    loadManualProducts()
  }, [])

  // Carousel functionality
  const featuredProducts = allClothingProducts.slice(0, 4)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  useEffect(() => {
    if (featuredProducts.length > 0) {
      const interval = setInterval(nextSlide, 6000)
      return () => clearInterval(interval)
    }
  }, [featuredProducts.length])

  if (isLoading) {
    return (
      <div className="men-page">
        <div className="men-loading">
          <div className="loading-spinner"></div>
          <p>Loading men's products...</p>
        </div>
      </div>
    )
  }

  if (error && allClothingProducts.length === 0) {
    return (
      <div className="men-page">
        <div className="men-error">
          <h2>Error loading men's products</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="men-page">
      {/* Hero Section */}
      <div className="men-hero">
        <div className="men-hero-content">
          <h1 className="men-hero-title">Men's Collection</h1>
          <p className="men-hero-subtitle">Discover our premium selection of clothing for every occasion</p>
        </div>
        <div className="men-hero-image">
          <img
            src="src/assets/docs/images/product-images/mens-clothing/mens-group-photo.jpg"
            alt="Men's Fashion Collection"
            className="hero-image"
          />
        </div>
      </div>

      {/* Featured Products Carousel */}
      {featuredProducts.length > 0 && (
        <div className="featured-carousel">
          <div className="container">
            <h2 className="section-title">Featured Products</h2>
            <div className="carousel-container">
              <button className="carousel-btn prev-btn" onClick={prevSlide}>
                <ChevronLeft size={24} />
              </button>

              <div className="carousel-content">
                <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="carousel-slide">
                      <div className="carousel-product">
                        <div className="carousel-image">
                          <img src={product.image || "/placeholder.svg"} alt={product.name} />
                        </div>
                        <div className="carousel-info">
                          <h3>{product.name}</h3>
                          <p className="carousel-price">£{product.price}</p>
                          <p className="carousel-description">{product.description}</p>
                          <div className="carousel-sizes">
                            <span>Sizes: {product.sizes.join(", ")}</span>
                          </div>
                          <div className="carousel-stock">
                            <span>Stock: {product.stockQuantity} items</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="carousel-btn next-btn" onClick={nextSlide}>
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Products Section */}
      <div className="men-products">
        <div className="container">
          <h2 className="section-title">All Clothing Items</h2>
          {allClothingProducts.length > 0 ? (
            <ProductGrid products={allClothingProducts} loading={false} />
          ) : (
            <div className="no-products">
              <h3>No clothing items found</h3>
              <p>Check back later for new arrivals.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenPage