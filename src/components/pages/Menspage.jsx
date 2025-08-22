import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { addToCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist, selectWishlistItems } from "../../store/wishlistSlice";
import './MensPage.css';

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

  // Simple Product Grid component for MenPage
  const MenProductGrid = ({ products }) => {
    const [sizeSelections, setSizeSelections] = useState({});

    const handleSizeChange = (productId, size) => {
      setSizeSelections(prev => ({
        ...prev,
        [productId]: size
      }));
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
}
export default MenPage