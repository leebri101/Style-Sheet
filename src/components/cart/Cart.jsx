// to do 
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { removeFromCart, updateQuantity } from "../../store/cartSlice.js";
import "./Cart.css";

const Cart = () => {
    const { items, total } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
  
    const handleRemoveItem = (id, size) => {
      dispatch(removeFromCart({ id, size }))
    }
  
    const handleUpdateQuantity = (id, size, quantity) => {
      if (quantity < 1) return
      dispatch(updateQuantity({ id, size, quantity }))
    }
  
    if (items.length === 0) {
      return (
        <div className="cart-empty-container">
          <div className="cart-empty-content">
            <ShoppingCart size={64} className="cart-empty-icon" />
            <h2 className="cart-title">Your Cart is Empty</h2>
            <p className="cart-empty-message">Looks like you have not added any items to your cart yet.</p>
            <Link to="/" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      )
    }
  
    return (
      <div className="cart">
        <h2 className="cart-title">Your Cart</h2>
        <div className="cart-content">
          <div className="cart-items-container">
            <ul className="cart-items">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.imageUrl || "/placeholder.svg?height=100&width=100"} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-size">Size: {item.size}</p>
                    <p className="cart-item-price">£{item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-button"
                        onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, item.size, Number.parseInt(e.target.value) || 1)}
                        className="cart-item-quantity"
                        aria-label="Item quantity"
                      />
                      <button
                        className="quantity-button"
                        onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.size)}
                      className="cart-item-remove"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    <span>Subtotal:</span>
                    <span>£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>£0.00</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>£{(total * 0.2).toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>£{(total * 1.2).toFixed(2)}</span>
            </div>
            <button className="cart-checkout">Proceed to Checkout</button>
            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  export default Cart
  