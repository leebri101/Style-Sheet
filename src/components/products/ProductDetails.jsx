import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Star, Plus, Minus } from "lucide-react";
import { addToCart, openCart } from "../../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice";
import "./ProductDetails.css";

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "Black");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="product-details-error">
        <p>Product not found</p>
      </div>
    );
  }

  {/*Wishlist functionality*/}
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const isComingSoon = product.comingSoon || product.price === null;

  const handleAddToCart = () => {
    if (isComingSoon) return;
    
    dispatch(
      addToCart({
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        image: product.image || product.imageUrl,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      })
    );
    dispatch(openCart());
  };

  const handleWishlistToggle = () => {
    if (isComingSoon) return;
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        image: product.image || product.imageUrl,
        category: product.category,
      }));
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  {/*product rating*/}
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="star filled" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="star half-filled" />);
      } else {
        stars.push(<Star key={i} className="star empty" />);
      }
    }
    return stars;
  };

  const productImages = product.images || [product.image || product.imageUrl].filter(Boolean);

  return (
    <div className="product-details">
      <div className="product-details-container">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image-container">
            <img
              src={productImages[activeImageIndex] || "/placeholder.svg"}
              alt={product.name || product.title}
              className="main-image"
            />
            {isComingSoon && (
              <div className="coming-soon-overlay">
                <span>Coming Soon</span>
              </div>
            )}
          </div>
          
          {productImages.length > 1 && (
            <div className="thumbnail-images">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === activeImageIndex ? "active" : ""}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name || product.title}</h1>
            <button
              className={`wishlist-btn ${isInWishlist ? "active" : ""} ${isComingSoon ? "disabled" : ""}`}
              onClick={handleWishlistToggle}
              disabled={isComingSoon}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`heart-icon ${isInWishlist ? "filled" : ""}`} />
            </button>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating.rate)}
              </div>
              <span className="rating-text">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="product-price">
            {!isComingSoon ? (
              <span className="current-price">£{product.price?.toFixed(2)}</span>
            ) : (
              <span className="coming-soon-price">Price TBA</span>
            )}
          </div>

          {/* Category */}
          {product.category && (
            <div className="product-category">
              <span className="category-badge">{product.category}</span>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {/* Options */}
          {!isComingSoon && (
            <>
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="product-option">
                  <label>Size:</label>
                  <div className="size-options">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-btn ${selectedSize === size ? "active" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="product-option">
                  <label>Color:</label>
                  <div className="color-options">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`color-btn ${selectedColor === color ? "active" : ""}`}
                        onClick={() => setSelectedColor(color)}
                        title={color}
                      >
                        <span className="color-swatch" style={{ backgroundColor: color.toLowerCase() }}></span>
                        <span className="color-name">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="product-option">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Stock Information */}
              {product.stockQuantity && (
                <div className="stock-info">
                  <span className={`stock-status ${product.stockQuantity > 0 ? "in-stock" : "out-of-stock"}`}>
                    {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="product-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </>
          )}

          {isComingSoon && (
            <div className="coming-soon-info">
              <h3>Coming Soon</h3>
              <p>This product will be available soon. Add it to your wishlist to be notified when it's ready!</p>
              <button
                className={`wishlist-btn-large ${isInWishlist ? "active" : ""}`}
                onClick={handleWishlistToggle}
              >
                <Heart className={`heart-icon ${isInWishlist ? "filled" : ""}`} />
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;