"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import PropTypes from 'prop-types';
import { fetchProducts } from "../../store/productSlice";
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice";
import "./ProductGrid.css";

const ProductGrid = ({ products: propProducts, loading: propLoading }) => {
  const dispatch = useDispatch();
  const { items: storeProducts, status, error } = useSelector((state) => state.products);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Use props products if provided, otherwise use store products
  const products = propProducts || storeProducts;
  const loading = propLoading !== undefined ? propLoading : status === "loading";

  useEffect(() => {
    // Only fetch products if we're using store products and they haven't been loaded
    if (!propProducts && status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, propProducts, status]);

  const handleWishlist = (e, product) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation(); // Prevent event bubbling

    // Does not add coming soon items to wishlist
    if (product.comingSoon || product.price === null) {
      return;
    }

    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      // Ensure we have the required fields for wishlist
      const wishlistItem = {
        id: product.id,
        name: product.name || product.title,
        price: product.price,
        image: product.image || product.imageUrl,
        category: product.category,
      };
      dispatch(addToWishlist(wishlistItem));
    }
  };

  const renderRatingStars = (rating) => {
    if (!rating || !rating.rate) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push("★");
      } else if (i === fullStars && hasHalfStar) {
        stars.push("☆");
      } else {
        stars.push("☆");
      }
    }
    return stars.join("");
  };

  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error && !products?.length) {
    return (
      <div className="product-grid-error">
        <h3>Error loading products</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="product-grid-empty">
        <h3>No products found</h3>
        <p>Try adjusting your search or check back later for new arrivals.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const isInWishlist = wishlistItems.some((item) => item.id === product.id);
        const isComingSoon = product.comingSoon || product.price === null;
        const productName = product.name || product.title;
        const productImage = product.image || product.imageUrl;

        return (
          <div key={product.id} className={`product-card ${isComingSoon ? "coming-soon-card" : ""}`}>
            {/* Coming Soon Badge */}
            {isComingSoon && <div className="coming-soon-badge">Coming Soon</div>}

            <Link
              to={isComingSoon ? "#" : `/product/${product.id}`}
              className={`product-link ${isComingSoon ? "disabled-link" : ""}`}
              onClick={isComingSoon ? (e) => e.preventDefault() : undefined}
            >
              <div className="product-image-container">
                
                {/* Coming Soon Overlay */}
                {isComingSoon && (
                  <div className="coming-soon-overlay">
                    <span>Coming Soon</span>
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  className={`wishlist-icon-button ${isInWishlist ? "in-wishlist" : ""} ${isComingSoon ? "disabled" : ""}`}
                  onClick={(e) => handleWishlist(e, product)}
                  aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  disabled={isComingSoon}
                >
                  <Heart className={`icon ${isInWishlist ? "filled" : ""}`} />
                </button>
              </div>

              <div className="product-details">
                <h3 className="product-name" title={productName}>
                  {productName}
                </h3>

                {/* Price Display */}
                {product.price !== null && !isComingSoon ? (
                  <p className="product-price">£{product.price?.toFixed(2)}</p>
                ) : (
                  <p className="product-price coming-soon-price">Price TBA</p>
                )}

                {/* Category */}
                {product.category && (
                  <div className="product-category">
                    <span className={`category-tag ${isComingSoon ? "coming-soon-tag" : ""}`}>
                      {product.category}
                    </span>
                  </div>
                )}

                {/* Rating */}
                {product.rating && product.rating.rate && !isComingSoon && (
                  <div className="product-rating">
                    <div className="rating-stars">
                      {renderRatingStars(product.rating)}
                    </div>
                    <span className="rating-count">({product.rating.count})</span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      image: PropTypes.string,
      imageUrl: PropTypes.string,
      comingSoon: PropTypes.bool,
      category: PropTypes.string,
      rating: PropTypes.shape({
        rate: PropTypes.number,
        count: PropTypes.number
      }),
      stockQuantity: PropTypes.number
    })
  ),
  loading: PropTypes.bool
};

export default ProductGrid;