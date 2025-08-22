"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist, selectWishlistItems } from "../../store/wishlistSlice";
import "./MensPage.css";

const MenPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState({});
  const autoPlayRef = useRef(null);

  // Function to generate a unique ID based on product name
  const generateId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Men's clothing products with simplified format
  const mensProducts = [
    {
      id: generateId("Premium Graphic T-Shirt"),
      name: "Premium Graphic T-Shirt",
      price: 15.99,
      description: "Comfortable and stylish",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/black-hip-hop-tee.jpg",
      stockQuantity: 45,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      id: generateId("Cream Dress Suit"),
      name: "Cream Dress Suit",
      price: 110.00,
      description: "Crisp formal Suit perfect for business and special occasions",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/cream-dress-suit.jpg",
      stockQuantity: 29,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: generateId("Brown Overcoat"),
      name: "Brown Overcoat",
      price: 75.99,
      description: "Elegant and warm overcoat",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/brown-over-coat.jpg",
      stockQuantity: 67,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: generateId("Casual Button-Down Shirt"),
      name: "Casual Button-Down Shirt",
      price: 25.99,
      description: "Comfortable button-down shirt with a relaxed fit for everyday style",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/plain-white-shirt.jpg",
      stockQuantity: 34,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: generateId("Active Outdoor Jacket"),
      name: "Active Outdoor Jacket",
      price: 39.99,
      description: "Perfect for workouts and casual wear",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/active-outdoor-jacket.jpg",
      stockQuantity: 78,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: generateId("Graphic Gaming Hoodie"),
      name: "Graphic Gaming Hoodie",
      price: 50.00,
      description: "Comfy and Lazy",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/graphic-gaming-hoodie.jpg",
      stockQuantity: 29,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: generateId("Anime T-shirt"),
      name: "Anime T-Shirt",
      price: 15.00,
      description: "Ah a man of culture",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/anime-tshirt.jpg",
      stockQuantity: 29,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: generateId("Classic Denim Jacket"),
      name: "Classic Denim Jacket",
      price: 59.99,
      description: "Timeless denim jacket",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/dark-denim-jacket.jpg",
      stockQuantity: 23,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
  ];
  
  // Get featured men's products for carousel (first 4 products)
  const featuredProducts = mensProducts.slice(0, 4);
  // Get remaining products for the grid
  const gridProducts = mensProducts.slice(4);

  // Auto-play functionality for carousel
  useEffect(() => {
    const play = () => {
      setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
    };

    autoPlayRef.current = setInterval(play, 6000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [featuredProducts.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (product, size = null) => {
    const selectedSizeValue = size || selectedSize[product.id] || product.sizes[0];

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSizeValue,
        quantity: 1,
      }),
    );
  };

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        }),
      );
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

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
            onError={(e) => {
              e.target.src = "https://placehold.co/800x400/eee/aaa?text=Men's+Collection";
            }}
          />
        </div>
      </div>

      <div className="men-page-content">
        <div className="men-page-header">
          <h1 className="men-page-title">Best Sellers</h1>
        </div>

        {/* Men's Featured Carousel */}
        <section className="men-carousel">
          <div className="men-carousel-container">
            <div className="men-carousel-header">
              <h2 className="men-carousel-title">Featured Men's Items</h2>
              <p className="men-carousel-subtitle">Special deals on our most popular men's clothing</p>
            </div>

            <div className="men-carousel-wrapper">
              <button
                className="men-carousel-arrow men-carousel-arrow-prev"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="men-carousel-content">
                {featuredProducts.map((product, index) => (
                  <div key={product.id} className={`men-carousel-slide ${index === currentSlide ? "active" : ""}`}>
                    <div className="men-carousel-slide-content">
                      <div className="men-carousel-image-container">
                        <button
                          className={`men-carousel-wishlist-button ${isInWishlist(product.id) ? "active" : ""}`}
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        </button>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="men-carousel-image" 
                          onError={(e) => {
                            e.target.src = `https://placehold.co/500x500/eee/aaa?text=${encodeURIComponent(product.name)}`;
                          }}
                        />
                      </div>

                      <div className="men-carousel-details">
                        <h3 className="men-carousel-product-title">{product.name}</h3>
                        <p className="men-carousel-product-description">{product.description}</p>

                        <div className="men-product-options">
                          <div className="men-carousel-size-selector">
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
                        <div className="men-carousel-price-container">
                          <span className="men-carousel-price">£{product.price}</span>
                          <span className="men-carousel-stock-info">{product.stockQuantity} in stock</span>
                        </div>
                        <div className="men-carousel-actions">
                          <button className="men-carousel-add-to-cart" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart size={25} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="men-carousel-arrow men-carousel-arrow-next" onClick={goToNextSlide} aria-label="Next slide">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="men-carousel-controls">
              <div className="men-carousel-dots">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    className={`men-carousel-dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="men-products-grid">
          <div className="men-grid-header">
            <h2 className="men-grid-title">More Men's Clothing</h2>
          </div>
          {/* Product Grid */}
          <div className="men-product-grid">
            {gridProducts.map((product) => (
              <div key={product.id} className="men-product-card">
                <div className="men-product-image-container">
                  <button
                    className={`men-wishlist-button ${isInWishlist(product.id) ? "active" : ""}`}
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="men-product-image"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/300x400/eee/aaa?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                </div>
                
                <div className="men-product-details">
                  <h3 className="men-product-name">{product.name}</h3>
                  <p className="men-product-description">{product.description}</p>
                  
                  <div className="men-product-options">
                    <div className="men-size-selector">
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
                  </div>
                  
                  <div className="men-product-price-container">
                    <span className="men-product-price">£{product.price}</span>
                    <span className="men-stock-info">{product.stockQuantity} in stock</span>
                  </div>
                  
                  <div className="men-product-actions">
                    <button 
                      className="men-add-to-cart-btn"
                      onClick={() => handleAddToCart(product, selectedSize[product.id])}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenPage;