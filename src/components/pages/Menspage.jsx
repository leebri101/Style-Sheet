import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import ProductGrid from "../products/ProductGrid";
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
      id: generateId("Classic Denim Jacket"),
      name: "Classic Denim Jacket",
      price: 59.99,
      description: "Timeless denim jacket",
      category: "men's clothing",
      image: "src/assets/docs/images/product-images/mens-clothing/dark-denim-jacket.jpg",
      stockQuantity: 23,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: generateId("Brown Overcoat"),
      name: "Brown Overcoat",
      price: 75.00,
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

  const handleAddToCart = (product) => {
    const size = selectedSize[product.name] || product.sizes[0];

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
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
      {/* Hero Section - Keeping the existing hero image */}
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
        {/* Men's Featured Carousel */}
        <section className="men-carousel">
          <div className="carousel-container">
            <div className="carousel-header">
              <h2 className="carousel-title">Featured Men's Items</h2>
              <p className="carousel-subtitle">Special deals on our most popular men's clothing</p>
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
                  <div key={product.id} className={`carousel-slide ${index === currentSlide ? "active" : ""}`}>
                    <div className="carousel-slide-content">
                      <div className="carousel-image-container">
                        <button
                          className={`wishlist-button ${isInWishlist(product.id) ? "active" : ""}`}
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        </button>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="carousel-image" 
                          onError={(e) => {
                            e.target.src = `https://placehold.co/300x400/eee/aaa?text=${encodeURIComponent(product.name)}`;
                          }}
                        />
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

        <div className="men-products-grid">
          <div className="grid-header">
            <h2 className="grid-title">More Men's Clothing</h2>
          </div>
          <ProductGrid products={gridProducts} />
        </div>
      </div>
    </div>
  );
};

export default MenPage;