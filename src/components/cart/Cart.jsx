// to do 
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../store/cartSlice.js";
import "./Cart.css";

const Cart = () => {
    const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    const handleRemoveFromCart = (id, size) => {
        dispatch(removeFromCart({ id, size}));
    }

    const handleUpdateQuantity = (id, size, quantity) => {
        if (quantity < 1) return;
        dispatch(updateQuantity({ id, size, quantity }));
    }

    if(items.length === 0) {
        return(
            <div className="cart-empty-container">
                <div className="cart-empty-content">
                    <ShoppingCart className="cart-empty-icon"/>
                    <h2 className="cart-title">Your Cart is Empty</h2>
                    <p className="cart-empty-message">
                        Looks like there are not items at the Moment</p>
                    <Link to="/" className="cart-shopping-button">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        ) 
    }
}


