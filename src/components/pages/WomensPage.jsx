"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist, selectWishlistItems } from "../../store/wishlistSlice";
import "./WomensPage.css";

const WomenPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState({});
  const autoPlayRef = useRef(null);

  // Function to generate a unique ID based on product name
  const generateId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Women's clothing products
  const womensProducts = [
    {
      id: generateId("Floral Summer Dress"),
      name: "Floral Summer Dress",
      price: 45.99,
      description: "Light and breezy floral print dress",
      category: "women's clothing",
      image: "src/assets/docs/images/product-images/womens-clothing/floral-summer-dress.jpg",
      stockQuantity: 32,
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: generateId("Classic White Blouse"),
      name: "Classic White Blouse",
      price: 35.50,
      description: "Elegant white blouse for office or casual wear",
      category: "women's clothing",
      image: "src/assets/docs/images/product-images/womens-clothing/white-blouse.jpg",
      stockQuantity: 45,
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: generateId("Denim Jacket"),
      name: "Denim Jacket",
      price: 65.99,
      description: "Classic denim jacket for all seasons",
      category: "women's clothing",
      image: "src/assets/docs/images/product-images/womens-clothing/denim-jacket.jpg",
      stockQuantity: 28,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: generateId("Black Evening Gown"),
      name: "Black Evening Gown",
      price: 89.99,
      description: "Elegant black gown for special occasions",
      category: "women's clothing",
      image: "src/assets/docs/images/product-images/womens-clothing/black-gown.jpg",
      stockQuantity: 18,
      sizes: ["XS", "S", "M", "L"],
    },
    {
      id: generateId("Casual Summer Top"),
      name: "Casual Summer Top",
      price: 25.99,
      description: "Comfortable and stylish summer top",
      category: "women's clothing",
      image: "src/assets/docs/images/product-images/womens-clothing/summer-top.jpg",
      stockQuantity: 56,
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: generateId("Professional Blazer"),
      name: "Professional Blazer",
      price: 75.00,
      description: "Sharp blazer for professional settings",
      category: "women's clothing",
      image: "src/assets/docs/images/product-images/womens-clothing/professional-blazer.jpg",
      stockQuantity: 22,
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: generateId("Knit Sweater"),
      name: "Knit Sweater",
      price: 42.99,
      description: "Cozy knit sweater for colder days",
      category: "women's clothing",
      image: "src/assets/docs/images/product-images/womens-clothing/knit-sweater.jpg",
      stockQuantity: 38,
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: generateId("Maxi Skirt"),
      name: "Maxi Skirt",
      price: 38.50,
      description: "Flowy maxi skirt for a bohemian look",
      category: "women's clothing",
      image: "src/assets/docs/images/product-images/womens-clothing/maxi-skirt.jpg",
      stockQuantity: 41,
      sizes: ["XS", "S", "M", "L"],
    },
  ];

  // Get featured women's products for carousel (first 4 products)
  const featuredProducts = womensProducts.slice(0, 4);
  // Get remaining products for the grid
  const gridProducts = womensProducts.slice(4);

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
    <div className="women-page">
      {/* Hero Section */}
      <div className="women-hero">
        <div className="women-hero-content">
          <h1 className="women-hero-title">Women's Collection</h1>
          <p className="women-hero-subtitle">Discover our elegant selection of clothing for every occasion</p>
        </div>
        <div className="women-hero-image">
          <img
            src="src/assets/docs/images/product-images/womens-clothing/womens-group-photo.jpg"
            alt="Women's Fashion Collection"
            className="hero-image"
            onError={(e) => {
              e.target.src = "https://placehold.co/800x400/eee/aaa?text=Women's+Collection";
            }}
          />
        </div>
      </div>

      <div className="women-page-content">
        <div className="women-page-header">
          <h1 className="women-page-title">Women's Collection</h1>
          <p className="women-page-subtitle">Stylish, comfortable, and elegant clothing for the modern woman</p>
        </div>

        {/* Women's Featured Carousel */}
        <section className="women-carousel">
          <div className="women-carousel-container">
            <div className="women-carousel-header">
              <h2 className="women-carousel-title">Featured Women's Items</h2>
              <p className="women-carousel-subtitle">Special deals on our most popular women's clothing</p>
            </div>

            <div className="women-carousel-wrapper">
              <button
                className="women-carousel-arrow women-carousel-arrow-prev"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="women-carousel-content">
                {featuredProducts.map((product, index) => (
                  <div key={product.id} className={`women-carousel-slide ${index === currentSlide ? "active" : ""}`}>
                    <div className="women-carousel-slide-content">
                      <div className="women-carousel-image-container">
                        <button
                          className={`women-carousel-wishlist-button ${isInWishlist(product.id) ? "active" : ""}`}
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        </button>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="women-carousel-image" 
                          onError={(e) => {
                            e.target.src = `https://placehold.co/300x400/eee/aaa?text=${encodeURIComponent(product.name)}`;
                          }}
                        />
                      </div>

                      <div className="women-carousel-details">
                        <h3 className="women-carousel-product-title">{product.name}</h3>
                        <p className="women-carousel-product-description">{product.description}</p>

                        <div className="women-product-options">
                          <div className="women-carousel-size-selector">
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
                        <div className="women-carousel-price-container">
                          <span className="women-carousel-price">£{product.price}</span>
                          <span className="women-carousel-stock-info">{product.stockQuantity} in stock</span>
                        </div>
                        <div className="women-carousel-actions">
                          <button className="women-carousel-add-to-cart" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart size={25} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="women-carousel-arrow women-carousel-arrow-next" onClick={goToNextSlide} aria-label="Next slide">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="women-carousel-controls">
              <div className="women-carousel-dots">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    className={`women-carousel-dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="women-products-grid">
          <div className="women-grid-header">
            <h2 className="women-grid-title">More Women's Clothing</h2>
          </div>
          {/* Product Grid */}
          <div className="women-product-grid">
            {gridProducts.map((product) => (
              <div key={product.id} className="women-product-card">
                <div className="women-product-image-container">
                  <button
                    className={`women-wishlist-button ${isInWishlist(product.id) ? "active" : ""}`}
                    onClick={() => handleWishlistToggle(product)}
                  >
                    <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="women-product-image"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/300x400/eee/aaa?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                </div>
                
                <div className="women-product-details">
                  <h3 className="women-product-name">{product.name}</h3>
                  <p className="women-product-description">{product.description}</p>
                  
                  <div className="women-product-options">
                    <div className="women-size-selector">
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
                  
                  <div className="women-product-price-container">
                    <span className="women-product-price">£{product.price}</span>
                    <span className="women-stock-info">{product.stockQuantity} in stock</span>
                  </div>
                  
                  <div className="women-product-actions">
                    <button 
                      className="women-add-to-cart-btn"
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

export default WomenPage;