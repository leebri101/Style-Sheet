//upadate code
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { Heart } from "lucide-react"
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice"
import "./Products.css"

const ProductGrid = ({ products }) => {
  const dispatch = useDispatch()
  const wishlistItems = useSelector((state) => state.wishlist.items)

  const handleWishlist = (e, product) => {
    e.preventDefault()
    const isInWishlist = wishlistItems.some((item) => item.id === product.id)

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const isInWishlist = wishlistItems.some((item) => item.id === product.id)

        return (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-image-container">
                <img src={product.imageUrl || "/placeholder.svg"} alt={product.name} className="product-image" />
                <button
                  className={`wishlist-icon-button ${isInWishlist ? "in-wishlist" : ""}`}
                  onClick={(e) => handleWishlist(e, product)}
                  aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart className={`icon ${isInWishlist ? "filled" : ""}`} />
                </button>
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">£{product.price.toFixed(2)}</p>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            imageUrl: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ProductGrid