import { Heart } from 'lucide-react';
import PropTypes from 'prop-types'
import './Products.css';

const ProductGrid = ({ products }) => {
    return(
        <div className="product-grid-container">
            <div className="product-grid-content">
                <h2 className="product-grid-title">People have also bought</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 " >
                    {products.map((product) => (
                        <div key={product.id} className="product-item">
                            <div className="product-image">
                                <img 
                                src={product.imageUrl}
                                alt={product.name}
                                />
                            </div>
                            <div className="product-info">
                                    <h3>
                                        <a href="#">
                                            <span aria-hidden="true" className='product-name'/>
                                            {product.name}
                                        </a>
                                    </h3>
                                <p className="product-price">£{product.price.toFixed(2)}</p>
                            </div>
                            <button className="favorite-button">
                                <Heart className="favorite-icon" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
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