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
  const loading = propLoading || status === "loading";

  useEffect(() => {
    // Only fetch products if we're using store products and they haven't been loaded
    if (!propProducts && status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, propProducts, status]);

  const handleWishlist = (e, product) => {
    e.preventDefault(); // Prevent navigation to product detail

    // Don't add coming soon items to wishlist
    if (product.comingSoon || product.price === null) {
      return;
    }

    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="product-grid-error">Error loading products: {error}</div>;
  }

  if (!products?.length) {
    return <div className="product-grid-empty">No products found.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const isInWishlist = wishlistItems.some((item) => item.id === product.id);
        const isComingSoon = product.comingSoon || product.price === null;

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
                <h3 className="product-name">{product.name}</h3>

                {/* Price Display */}
                {product.price !== null && !isComingSoon ? (
                  <p className="product-price">£{product.price?.toFixed(2)}</p>
                ) : (
                  <p className="product-price coming-soon-price">Price TBA</p>
                )}

                {/* Category */}
                {product.category && (
                  <p className="product-category">
                    <span className={`category-tag ${isComingSoon ? "coming-soon-tag" : ""}`}>{product.category}</span>
                  </p>
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
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      image: PropTypes.string,
      imageUrl: PropTypes.string,
      comingSoon: PropTypes.bool,
      category: PropTypes.string,
      rating: PropTypes.shape({
        rate: PropTypes.number,
        count: PropTypes.number
      })
    })
  ),
  loading: PropTypes.bool
};

export default ProductGrid;