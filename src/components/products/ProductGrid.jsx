// to do tomorrow 25/03/25
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { Heart } from "lucide-react"
import { fetchProducts } from "../../store/productSlice"
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice"
import "./Products.css"

const ProductGrid = ({ products: propProducts, loading: propLoading }) => {
  const dispatch = useDispatch()
  const { items: storeProducts, status, error } = useSelector((state) => state.products)
  const wishlistItems = useSelector((state) => state.wishlist.items)


  const products = propProducts || storeProducts
  const loading = propLoading || status === "loading"

  useEffect(() => {
    if (!propProducts && status === "idle") {
      dispatch(fetchProducts())
    }
  }, [dispatch, propProducts, status]) 

  const handleWishlist = (e, product) => {
    e.preventDefault()
    const isInWishlist = wishlistItems.some((item) => 
      item.id === product.id)

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }
  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="loading-spinner"></div>
        <p>Loading Products...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="product-grid-error">
        <p>Error loading products: {error}</p>
      </div>
    )
  }

  if (!products?.length) {
    return(
      <div className="product-grid-empty">No Products found.</div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => {
        const isInWishlist = wishlistItems.some((item) => 
          item.id === product.id)

        return (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} 
            className="product-link">
              <div className="product-image-container">
                <img 
                src={product.imageUrl || "/placeholder.svg?height=400&width=300"} 
                alt={product.name} 
                className="product-image"
                loading="lazy" 
                />
                <button
                  className={`wishlist-icon-button 
                    ${isInWishlist ? "in-wishlist" : ""}`}
                  onClick={(e) => handleWishlist(e, product)}
                  aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart className={`icon ${isInWishlist ? "filled" : ""}`} />
                </button>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">£{product.price.toFixed(2)}</p>
                <p className="product-category">{product.category}</p>
              </div>
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
    ),
    loading: PropTypes.bool,
};

export default ProductGrid