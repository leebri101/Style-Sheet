import { useState } from 'react'
import { ShoppingCart, Heart } from 'lucide-react'
import PropTypes from 'prop-types'
import '..css/Products.css';

const ProductDetails = ({ id, name, price, description, imageUrl, sizes }) => {
  const [selectedSize, setSelectedSize] = useState('')

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    // Here you would typically add the item to the cart
    console.log('Item added to cart:', { id, name, price, selectedSize })
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={imageUrl} alt={name} />
      </div>
      {/* Product Information */}
      <div className="product-info">
        <h1 className="product-title">{name}</h1>
        <p className="product-price">£{price.toFixed(2)}</p>
        <p className="product-description">{description}</p>
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
        {/* Button functionality */}
        <div className="product-actions">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            <ShoppingCart className="button-icon" />
            Add to cart
          </button>
          <button className="favorite-button">
            <Heart className="button-icon" />
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
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductDetails


