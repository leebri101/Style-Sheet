import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import PropTypes from 'prop-types'

const ProductShowcase = ({
    title,
    price,
    description,
    imageUrl,
    isLimitedOffer = false,
    offerEndDate,
}) => {
    const [selectedSize, setSelectedSize]= useState('')

    return(
        <div className="product-showcase">
            <div className="product-grid">
                <div className="product-image">
                    {isLimitedOffer && (
                        <div className="limited-offer">
                            <span className="inline-flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white">
                                LIMITED OFFER
                            </span>
                        </div>
                    )}
                    <img
                    src={imageUrl}
                    alt={title}
                    className="w-full object-cover object-center" />
                </div>
                <div className="product-info">
                    <h1 className="product-title">{title}</h1>
                    <div className="mt-4">
                        <p className="product-price">£{price.toFixed(2)}</p>
                            {isLimitedOffer && offerEndDate (
                                <p className="offer-end-date">
                                    LIMITED TIME OFFER ONLY UNTIL{offerEndDate}
                                </p>
                            )}
                    </div>
                    <div className="mt-4">
                        <p className="product-description">{description}</p>
                    </div>
                    <div className="size-selector mt-8">
                        <h2 className="text-sm font-medium text-gray-900">Sizes</h2>
                        <div className="size-grid mt-4 grid grid-cols-5 gap-4">
                            {['XS', 'S', 'M', 'L', 'XL'].map((size) =>(
                                <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`size-button ${selectedSize === size ? 'selected' : ''}`}>
                                {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="product-actions mt-8 flex gap-4">
                        <button
                        type="button"
                        className="add-to-cart">
                            <ShoppingCart className="mr-3 h-5 w-5" />
                            Add to Cart
                        </button>
                        <button
                        type="button"
                        className="favorite-button">
                            <Heart className="h-5 w-5"/>
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
export default ProductShowcase