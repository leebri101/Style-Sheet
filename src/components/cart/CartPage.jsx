// CartPage.jsx
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { 
  selectCartItems, 
  selectCartTotalAmount, 
  updateQuantity, 
  removeFromCart
} from "../../store/cartSlice";
import { X, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart({
        id: item.id,
        size: item.size,
        color: item.color
      }));
    } else {
      dispatch(updateQuantity({
        id: item.id,
        size: item.size,
        color: item.color,
        quantity: newQuantity
      }));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      id: item.id,
      size: item.size,
      color: item.color
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="empty-cart">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  {/*main cart page*/}
  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <Link to="/" className="back-to-shopping">
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
        <h1>Shopping Cart</h1>
        <span className="cart-item-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.key} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              {/*Cart details*/}
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <div className="cart-item-variants">
                  {item.color && <span>Color: {item.color}</span>}
                  {item.size && <span>Size: {item.size}</span>}
                </div>
                <p className="cart-item-price">£{item.price.toFixed(2)}</p>
              </div>
              
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                <button 
                  onClick={() => handleRemoveItem(item)}
                  className="remove-item-btn"
                  aria-label="Remove item"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/*Cart summary*/}
        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>£{totalAmount.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax</span>
              <span>£{(totalAmount * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>£{(totalAmount * 1.08).toFixed(2)}</span>
            </div>
            
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
            {/*Link to go back to home-page*/}
            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;