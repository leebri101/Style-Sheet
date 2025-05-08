
import { useState } from "react"
import { ShoppingCart, Heart } from "lucide-react"
import PropTypes from "prop-types"
import "./Products.css"

const ProductShowcase = ({ title, price, description, imageUrl, isLimitedOffer = false, offerEndDate }) => {
  const [selectedSize, setSelectedSize] = useState("")

  return (
    <div className="product-showcase">
      <div className="product-grid">
        <div className="product-image">
          {isLimitedOffer && (
            <div className="limited-offer">
              <span>LIMITED OFFER</span>
            </div>
          )}
          <img src={imageUrl || "/placeholder.svg"} alt={title} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{title}</h1>
          <div className="product-price-container">
            <p className="product-price">£{price.toFixed(2)}</p>
            {isLimitedOffer && offerEndDate && (
              <p className="offer-end-date">Limited-time offer available until {offerEndDate}.</p>
            )}
          </div>
          <div className="product-description">
            <p>{description}</p>
          </div>
          <div className="size-selector">
            <h2>Size</h2>
            <div className="size-grid">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-button ${selectedSize === size ? "selected" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="product-actions">
            <button type="button" className="add-to-cart">
              <ShoppingCart className="button-icon" />
              Add to Cart
            </button>
            <button type="button" className="favorite-button">
              <Heart className="button-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
ProductShowcase.propTypes ={
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isLimitedOffer: PropTypes.bool,
    offerEndDate: PropTypes.string,
}
export default ProductShowcase;