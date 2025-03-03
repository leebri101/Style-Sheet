// to do 
import { useSelector, useDispatch } from "react-redux";
import { HeartOff } from "lucide-react";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../store/wishlistSlice.js";
import { addToCart} from "../../store/cartSlice.js";
import "../pages/WishlistPage.css";

const WishlistPage = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch()

    const handleRemoveFromWishlist = (id) => {
        dispatch(removeFromWishlist(id));
    }
    const handleAddToCart = (item) => {
        dispatch(addToCart({...item, size: "S" }));
        dispatch(removeFromWishlist(item.id));
    }

    return(
        <div className="wishlist-page">
            <h1 className="wishlist-title">Your Wishlist</h1>
            {wishlistItems.length === 0 ? (
                <p className="wishlist-empty">Your wishlist is empty.</p>
            ) : (
                <div className="wishlist-items">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="wishlist-item">
                            <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} 
                            className="wishlist-item-image"/>
                            <div className="wishlist-item-details">
                                <h2 className="wishlist-item-name"></h2>
                                <p className="wishlist-item-price">£{item.price.toFixed(2)}</p>
                                <div className="wishlist-item-actions">
                                    <button onClick={() => handleAddToCart(item)}
                                    className="add-to-cart-button">
                                        Add To Cart
                                    </button>
                                    <HeartOff onClick={() => handleRemoveFromWishlist(item.id)}
                                        className="remove-from-wishlist-button">
                                            Remove Item
                                    </HeartOff>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>  
            )}
            <Link to="/" className="wishlist-shopping-link">
                Continue Shopping
            </Link>
        </div>
    )
}

export default WishlistPage