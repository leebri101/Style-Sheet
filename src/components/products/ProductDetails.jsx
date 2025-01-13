
import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import PropTypes from 'prop-types'
import './Products.css';

const ProductDetails = ({ id, name, price, description, imageUrl, sizes }) => {
  const[ selectedSize , setSelectedSize ] = useState('')
  const handleAddToCart = () => {
    if (!selectedSize) {
      {/* User Prompt to tell them to select the size of their picking */}
      alert('Please select a size')
      return
    }
    {/* User message to display confirmation of added item into cart */}
    console.log('Item added to cart:', { id, name, price, selectedSize })
  }
  return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col-reverse">
              <div className="w-full aspect-w-1 aspect-h-1">
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                />
              </div>
            </div>
            {/* Product info */}
            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{name}</h1>
              <div className="mt-3">
                <h2 className="sr-only">Product Info</h2>
                <p className="text-3xl text-gray-900">£{price.toFixed(2)}</p>
              </div>
              {/* Description of product */}
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="text-base text-gray-700" dangerouslySetInnerHTML={{ __html: description }} />
              </div>
              {/* Size choices */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                </div>
                <div className="mt-4">
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 ${
                          selectedSize === size
                            ? 'bg-gray-50 text-gray-900 shadow-sm'
                            : 'bg-white text-gray-900 shadow-sm'
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        <span>{size}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
  
              <div className="mt-10 flex sm:flex-col1">
                <button
                  type="button"
                  className="max-w-xs flex-1 bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 sm:w-full"
                  onClick={handleAddToCart}>
                  {/* Option to add straight to cart */}
                  <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                  Add to cart
                </button>
  
                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  {/* Option to add to wishlist */}
                  <Heart className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                  <span className="sr-only">Add to Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

{/* Prop type identifier, split into different categories */}
ProductDetails.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductDetails


