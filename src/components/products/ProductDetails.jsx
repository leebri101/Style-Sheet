import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../store/cartSlice"
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice'
import PropTypes from 'prop-types'
import './Products.css';

const ProductDetails = ({ id, name, price, description, imageUrl, sizes=[], category, rating }) => {
  const [selectedSize, setSelectedSize] = useState('')
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist.items)
  const isInWishlist = wishlistItems.some((item) => item.id === id)
  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 0) {
      // If no size is selected and sizes are available, show an alert
      alert('Please select a size')
      return
    }
    dispatch(addToCart({ id, name, price, size: selectedSize || "One Size" }))
    console.log('Item added to cart:', { id, name, price, selectedSize })
  }

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(id))
    } else {
      dispatch(
        addToWishlist({
          id,
          name,
          price,
          imageUrl,
          category,
          description,
        }),
      )
    }
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={imageUrl || "/placeholder.svg"} alt={name} />
      </div>
      {/*Product Information*/}
      <div className="product-info">
        <h1 className="product-title">{name}</h1>
        <p className="product-price">£{price.toFixed(2)}</p>
        {rating && (
          <div className="product-rating">
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                key={i}
                className={`star-icon ${i < 
                  Math.round (rating.rate) ? "filled" : "" }`}
                fill={i < Math.round(rating.rate) ? "#FFD700" : "none"}
                stroke = {i < Math.round(rating.rate) ? "#FFD700" : "6B7200"}
                  />
              ))},
            </div>
            <span className="rating-count">{rating.count} reviews</span>
          </div>
        )}
        <p className="product-description">{description}</p>

        {sizes && sizes.length > 0 && (
          <div className="product-sizes">
            <h3 className="sizes-title">Size</h3>
            <div className="size-buttons">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Button functionality */}
        <div className="product-actions">
          <button className="add-to-cart-button" 
          onClick={handleAddToCart}>
            <ShoppingCart className="button-icon" />
            Add to cart
          </button>
          <button 
          className={`wishlist-button $
            {isInWishlist ? 'in-wishlist' : ""}`}
          onClick={handleWishlist}
          aria-label={isInWishlist ? "Remove from wishlist" : 
          "Add to wishlist"}
          >
            <Heart className= {`button-icon $ {isInWishList ? "filled" : ""}`} />
            {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          </button>
        </div>
      </div>
    </div>
  )
}

{/* PropType identifier, split into different categories */}
ProductDetails.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductDetails


