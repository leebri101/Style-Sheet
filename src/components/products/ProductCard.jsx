"use client";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import PropTypes from 'prop-types';
import { addToCart } from "../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  const isComingSoon = product.comingSoon || product.price === null;

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (isComingSoon) {
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.imageUrl || "/placeholder.svg?height=300&width=300",
        size: "M",
        color: "Default",
        quantity: 1,
        totalPrice: product.price
      }),
    );
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();

    if (isComingSoon) {
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.imageUrl || "/placeholder.svg?height=300&width=300",
        category: product.category
      }));
    }
  };

  const handleCardClick = () => {
    if (isComingSoon) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className={`product-card ${isComingSoon ? "coming-soon-card" : ""}`} 
      onClick={handleCardClick}
      aria-label={isComingSoon ? `${product.name} - Coming Soon` : product.name}
    >
      {/* Coming Soon Badge */}
      {isComingSoon && <div className="coming-soon-badge">Coming Soon</div>}

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.image || product.imageUrl || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="product-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=300&width=300&text=Image+Not+Found";
          }}
        />

        {/* Coming Soon Overlay */}
        {isComingSoon && (
          <div className="coming-soon-overlay">
            <span>Stay Tuned</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className={`wishlist-icon-button ${isInWishlist ? "in-wishlist" : ""} ${isComingSoon ? "disabled" : ""}`}
          onClick={handleWishlistToggle}
          aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          disabled={isComingSoon}
        >
          <Heart className={`icon ${isInWishlist ? "filled" : ""}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        {/* Price Display */}
        {product.price !== null && !isComingSoon ? (
          <p className="product-price">£{product.price.toFixed(2)}</p>
        ) : (
          <p className="product-price coming-soon-price">Price TBA</p>
        )}

        {/* Description */}
        <p className="product-description">
          {isComingSoon ? "This exciting product will be available soon!" : product.description || "No description available"}
        </p>

        {/* Rating Display */}
        {product.rating && product.rating.rate > 0 && !isComingSoon && (
          <div className="product-rating">
            <span className="rating-stars" aria-label={`Rating: ${product.rating.rate} out of 5`}>
              {"★".repeat(Math.floor(product.rating.rate))}
              {"☆".repeat(5 - Math.floor(product.rating.rate))}
            </span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          {!isComingSoon && product.price !== null ? (
            <>
              <button 
                className="btn btn-primary" 
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              <button 
                className={`btn btn-outline ${isInWishlist ? "in-wishlist" : ""}`} 
                onClick={handleWishlistToggle}
                aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              >
                <Heart className={`heart-icon ${isInWishlist ? "filled" : ""}`} />
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
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
            <span className={`category-tag ${isComingSoon ? "coming-soon-tag" : ""}`}>
              {product.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/*Prop types*/
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    comingSoon: PropTypes.bool,
    description: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number
    })
  }).isRequired
};

export default ProductCard;