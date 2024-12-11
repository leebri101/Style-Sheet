import PropTypes from 'prop-types'; // Optional: Only if you want to use PropTypes

function Card({ children, className = '' }) {
  return (
    <div className={`border rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

// Optional: PropTypes for type checking
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Optional: Default props
Card.defaultProps = {
  className: '',
};

export default Card;