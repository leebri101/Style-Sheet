"use client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import { toggleWishlistItem } from "../../store/wishlistSlice";
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();

    // Don't add coming soon items to cart
    if (product.comingSoon || product.price === null) {
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "/placeholder.svg?height=250&width=280",
        size: "M",
        color: "Default",
        quantity: 1,
        totalPrice: product.price
      })
    );
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();

    // Don't add coming soon items to wishlist
    if (product.comingSoon || product.price === null) {
      return;
    }

    dispatch(toggleWishlistItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "/placeholder.svg?height=250&width=280",
      category: product.category
    }));
  };

  const handleCardClick = () => {
    // Don't navigate to product page for coming soon items
    if (product.comingSoon || product.price === null) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg?height=250&width=280";
  };

  return (
    <div 
      className={`product-card ${product.comingSoon ? "coming-soon-card" : ""}`} 
      onClick={handleCardClick}
      aria-label={product.comingSoon ? `${product.name} - Coming Soon` : product.name}
    >
      {/* Coming Soon Badge */}
      {product.comingSoon && (
        <div className="coming-soon-badge" aria-hidden="true">
          Coming Soon
        </div>
      )}

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.image || "/placeholder.svg?height=250&width=280"}
          alt={product.name}
          className="product-image"
          onError={handleImageError}
          loading="lazy"
        />
        {product.comingSoon && (
          <div className="coming-soon-overlay">
            <span>Stay Tuned</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {/* Price Display */}
        {product.price !== null && !product.comingSoon ? (
          <p className="product-price">£{product.price.toFixed(2)}</p>
        ) : (
          <p className="product-price coming-soon-price">Price TBA</p>
        )}

        {/* Description */}
        <p className="product-description">
          {product.comingSoon 
            ? "This exciting product will be available soon!" 
            : product.description || "No description available"}
        </p>

        {/* Action Buttons */}
        <div className="product-actions">
          {!product.comingSoon && product.price !== null ? (
            <>
              <button 
                className="btn btn-primary" 
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              <button 
                className="btn btn-outline" 
                onClick={handleWishlistToggle}
                aria-label={product.inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              >
                {product.inWishlist ? "❤️" : "♡"}
              </button>
            </>
          ) : (
            <button className="btn btn-disabled" disabled>
              Coming Soon
            </button>
          )}
        </div>

        {/* Category Tag */}
        {product.category && (
          <div className="product-category">
            <span className={`category-tag ${product.comingSoon ? "coming-soon-tag" : ""}`}>
              {product.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    image: PropTypes.string,
    comingSoon: PropTypes.bool,
    description: PropTypes.string,
    category: PropTypes.string,
    inWishlist: PropTypes.bool,
  }).isRequired
};

export default ProductCard;