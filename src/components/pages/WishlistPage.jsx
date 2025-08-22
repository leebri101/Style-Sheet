import { useSelector, useDispatch } from "react-redux";
import { HeartCrack, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../store/wishlistSlice.js";
import { addToCart, openCart } from "../../store/cartSlice.js";
import "./WishlistPage.css";

const WishlistPage = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const handleAddToCart = (item) => {
        // Add default size and color if not available
        const cartItem = {
            ...item,
            size: item.size || "M",
            color: item.color || "Black",
            quantity: 1,
        };
        
        dispatch(addToCart(cartItem));
        dispatch(openCart());
        // Optionally remove from wishlist after adding to cart
        // dispatch(removeFromWishlist(item.id));
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="wishlist-page">
                <div className="wishlist-header">
                    <h1 className="wishlist-title">Your Wishlist</h1>
                    <p className="wishlist-count">0 items</p>
                </div>
                
                <div className="wishlist-empty">
                    <div className="empty-wishlist-container">
                        <HeartCrack className="empty-wishlist-icon" size={64} />
                        <h2>Your wishlist is empty</h2>
                        <p>Save items you love by clicking the heart icon on any product.</p>
                        <Link to="/" className="continue-shopping-link">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-header">
                <h1 className="wishlist-title">Your Wishlist</h1>
                <p className="wishlist-count">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
            </div>
            
            <div className="wishlist-items">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="wishlist-item">
                        <div className="wishlist-item-image-container">
                            <Link to={`/product/${item.id}`}>
                                <img 
                                    src={item.image || item.imageUrl || "/placeholder.svg"} 
                                    alt={item.name || item.title} 
                                    className="wishlist-item-image"
                                    onError={(e) => {
                                        e.target.src = "/placeholder.svg";
                                    }}
                                />
                            </Link>
                            <button
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="remove-wishlist-btn"
                                aria-label="Remove from wishlist"
                            >
                                <Heart size={20} fill="currentColor" />
                            </button>
                        </div>
                        
                        <div className="wishlist-item-details">
                            <Link to={`/product/${item.id}`} className="wishlist-item-link">
                                <h2 className="wishlist-item-name">{item.name || item.title}</h2>
                            </Link>
                            
                            {item.category && (
                                <p className="wishlist-item-category">{item.category}</p>
                            )}
                            
                            <p className="wishlist-item-price">
                                {item.price ? `£${item.price.toFixed(2)}` : 'Price TBA'}
                            </p>
                            
                            <div className="wishlist-item-actions">
                                <button 
                                    onClick={() => handleAddToCart(item)}
                                    className="add-to-cart-button"
                                    disabled={!item.price}
                                >
                                    <ShoppingCart size={16} />
                                    Add To Cart
                                </button>
                                <button 
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                    className="remove-from-wishlist-button"
                                >
                                    <Heart size={16} />
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="wishlist-footer">
                <Link to="/" className="continue-shopping-link">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default WishlistPage;