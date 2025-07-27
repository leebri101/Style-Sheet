

import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../store/cartSlice"
import { 
  addToWishlist, 
  removeFromWishlist, 
  selectWishlistItems 
} from "../store/wishlistSlice"
import "./ProductShowcase.css"
import Image from "next/image" // Better image handling
import PropTypes from 'prop-types'

const ProductShowcase = ({ products = [] }) => { // Added default empty array
  const dispatch = useDispatch()
  const wishlistItems = useSelector(selectWishlistItems)

  // Handles adding product to cart with default values
  const handleAddToCart = (product) => {
    if (!product) return // Safety check
    
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        size: product.size || "M", // Default size with fallback
        color: product.color || "Default", // Default color with fallback
        quantity: 1,
      })
    )
  }

  // Toggles product in wishlist
  const handleWishlistToggle = (product) => {
    if (!product?.id) return // Safety check
    
    const isInWishlist = wishlistItems.some((item) => item.id === product.id)
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl
      }))
    }
  }

  // Checks if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  // Early return if no products
  if (!products.length) {
    return (
      <section className="product-showcase">
        <div className="showcase-container">
          <h2 className="showcase-title">Featured Products</h2>
          <p>No products available</p>
        </div>
      </section>
    )
  }

  return (
    <section className="product-showcase">
      <div className="showcase-container">
        <h2 className="showcase-title">Featured Products</h2>
        <div className="showcase-grid">
          {products.map((product) => (
            <div key={product.id} className="showcase-card">
              <div className="showcase-image-container">
                <Image
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name || "Product image"}
                  className="showcase-image"
                  width={300}
                  height={300}
                  priority={false}
                />
                <button
                  aria-label={isInWishlist(product.id) ? 
                    "Remove from wishlist" : "Add to wishlist"}
                  className={`wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
                  onClick={() => handleWishlistToggle(product)}
                >
                  {isInWishlist(product.id) ? "❤️" : "♡"}
                </button>
              </div>
              <div className="showcase-info">
                <h3 className="showcase-product-name">{product.name}</h3>
                <p className="showcase-product-price">
                  £{product.price?.toFixed(2) || "0.00"}
                </p>
                <p className="showcase-product-description">
                  {product.description || "No description available"}
                </p>
                <button 
                  className="showcase-add-to-cart" 
                  onClick={() => handleAddToCart(product)}
                  aria-label={`Add ${product.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
ProductShowcase.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string,
      description: PropTypes.string,
      size: PropTypes.string,
      color: PropTypes.string
    })
  )
}

export default ProductShowcase