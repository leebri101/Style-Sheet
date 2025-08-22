import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist, selectWishlistItems } from "../../store/wishlistSlice";
import './KidsPage.css';

const KidsPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSize, setSelectedSize] = useState({});
  const autoPlayRef = useRef(null);

  // Function to generate a unique ID based on product name
  const generateId = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Kids clothing products with simplified format
  const kidsProducts = [
    {
      id: generateId("Mickey Mouse T-shirt"),
      name: "Mickey Mouse T-shirt",
      price: 18.99,
      description: "Everyone's favorite cartoon mouse",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/mickey-mouse-tee.jpg",
      stockQuantity: 45,
      sizes: ["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      id: generateId("Basic Grey Sweatshirt"),
      name: "Basic Grey Sweatshirt",
      price: 32.99,
      description: "Simple and stylish",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/basic-grey-sweatshirt.jpg",
      stockQuantity: 38,
      sizes:["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      id: generateId("Denim Overalls"),
      name: "Denim Overalls",
      price: 28.99,
      description: "Dress like a minion",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/teens-denim-overalls.jpg",
      stockQuantity: 52,
      sizes: ["2", "3", "4", "5", "6", "7", "8", "10", "12"],
    },
    {
      id: generateId("Yellow Jumper"),
      name: "Yellow Jumper",
      price: 39.99,
      description: "Summer, cheerful and cute",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/kids-yellow-sweatshirt.jpg",
      stockQuantity: 29,
      sizes: ["10", "11", "12", "13", "1", "2", "3", "4", "5"],
    },
    {
      id: generateId("Green Hoodie"),
      name: "Green Hoodie",
      price: 22.99,
      description: "Perfect for the colder weather",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/basic-green-hoodie.jpg",
      stockQuantity: 41,
      sizes: ["2", "3", "4", "5", "6", "7", "8"],
    },
    {
      id: generateId("Kids Outdoor Coat"),
      name: "Kids Outdoor Coat",
      price: 35.99,
      description: "For the great outdoors",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/fox-outdoor-coat.jpg",
      stockQuantity: 33,
      sizes: ["2T", "3T", "4T", "5T", "6", "7", "8", "10"],
    },
    {
      id: generateId("Pink Dress"),
      name: "Pink Dress",
      price: 26.99,
      description: "Pink and pretty",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/pink-dress.jpg",
      stockQuantity: 47,
      sizes: ["2T", "3T", "4T", "5T", "6", "7", "8"],
    },
    {
      id: generateId("Kids quarter zip"),
      name: "Kids quarter zip",
      price: 19.99,
      description: "The little gentleman",
      category: "kids",
      image: "src/assets/docs/images/product-images/kids-clothing/boys-quarter-button-jumper.jpg",
      stockQuantity: 56,
      sizes: ["2T", "3T", "4T", "5T", "6", "7", "8", "10", "12"],
    },
  ];

  // Get featured kids products for carousel (first 4 products)
  const featuredProducts = kidsProducts.slice(0, 4);
  // Get remaining products for the grid
  const gridProducts = kidsProducts.slice(4);

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
    const selectedSizeValue = size || selectedSize[product.name] || product.sizes[0];

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

  // Simple Product Grid component for KidsPage
  const KidsProductGrid = ({ products }) => {
    const [sizeSelections, setSizeSelections] = useState({});

    const handleSizeChange = (productId, size) => {
      setSizeSelections(prev => ({
        ...prev,
        [productId]: size
      }));
    };

    return (
      <div className="kids-product-grid">
        {products.map((product) => (
          <div key={product.id} className="kids-product-card">
            <div className="kids-product-image-container">
              <button
                className={`kids-wishlist-button ${isInWishlist(product.id) ? "active" : ""}`}
                onClick={() => handleWishlistToggle(product)}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
              <img 
                src={product.image} 
                alt={product.name}
                className="kids-product-image"
                onError={(e) => {
                  e.target.src = `https://placehold.co/300x400/eee/aaa?text=${encodeURIComponent(product.name)}`;
                }}
              />
            </div>
            
            <div className="kids-product-details">
              <h3 className="kids-product-name">{product.name}</h3>
              <p className="kids-product-description">{product.description}</p>
              
              <div className="kids-product-options">
                <div className="kids-size-selector">
                  <label>Size:</label>
                  <select
                    value={sizeSelections[product.id] || product.sizes[0]}
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                  >
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="kids-product-price-container">
                <span className="kids-product-price">£{product.price}</span>
                <span className="kids-stock-info">{product.stockQuantity} in stock</span>
              </div>
              
              <div className="kids-product-actions">
                <button 
                  className="kids-add-to-cart-btn"
                  onClick={() => handleAddToCart(product, sizeSelections[product.id])}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="kids-page">
      <div className="kids-page-content">
        <div className="kids-page-header">
          <h1 className="kids-page-title">Kids' Collection</h1>
          <p className="kids-page-subtitle">Fun, comfortable, and durable clothing for active kids</p>
        </div>

        {/* Kids Featured Carousel */}
        <section className="kids-carousel">
          <div className="kids-carousel-container">
            <div className="kids-carousel-header">
              <h2 className="kids-carousel-title">Featured Kids' Items</h2>
              <p className="kids-carousel-subtitle">Special deals on our most popular kids' clothing</p>
            </div>

            <div className="kids-carousel-wrapper">
              <button
                className="kids-carousel-arrow kids-carousel-arrow-prev"
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="kids-carousel-content">
                {featuredProducts.map((product, index) => (
                  <div key={product.id} className={`kids-carousel-slide ${index === currentSlide ? "active" : ""}`}>
                    <div className="kids-carousel-slide-content">
                      <div className="kids-carousel-image-container">
                        <button
                          className={`kids-carousel-wishlist-button ${isInWishlist(product.id) ? "active" : ""}`}
                          onClick={() => handleWishlistToggle(product)}
                        >
                          <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        </button>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="kids-carousel-image" 
                          onError={(e) => {
                            e.target.src = `https://placehold.co/300x400/eee/aaa?text=${encodeURIComponent(product.name)}`;
                          }}
                        />
                      </div>

                      <div className="kids-carousel-details">
                        <h3 className="kids-carousel-product-title">{product.name}</h3>
                        <p className="kids-carousel-product-description">{product.description}</p>

                        <div className="kids-product-options">
                          <div className="kids-carousel-size-selector">
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
                        <div className="kids-carousel-price-container">
                          <span className="kids-carousel-price">£{product.price}</span>
                          <span className="kids-carousel-stock-info">{product.stockQuantity} in stock</span>
                        </div>
                        <div className="kids-carousel-actions">
                          <button className="kids-carousel-add-to-cart" onClick={() => handleAddToCart(product)}>
                            <ShoppingCart size={25} />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="kids-carousel-arrow kids-carousel-arrow-next" onClick={goToNextSlide} aria-label="Next slide">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="kids-carousel-controls">
              <div className="kids-carousel-dots">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    className={`kids-carousel-dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="kids-products-grid">
          <div className="kids-grid-header">
            <h2 className="kids-grid-title">More Kids Clothing</h2>
          </div>
          <KidsProductGrid products={gridProducts} />
        </div>
      </div>
    </div>
  );
};

export default KidsPage;