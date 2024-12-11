
import PropTypes from 'prop-types';

const CategoryProductList = ({ products, title }) => {
  // Check if products is not null or undefined and is an array
  if (!products || !Array.isArray(products)) {
    return <div>No products available for {title}.</div>;
  }

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product.id}>
              {product.name ? product.name : 'Unnamed Product'} - {product.price ? product.price : 'No Price'}
            </li>
          ))
        ) : (
          <li>No products found.</li>
        )}
      </ul>
    </div>
  );
};

CategoryProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  title: PropTypes.string.isRequired
};

export default CategoryProductList;