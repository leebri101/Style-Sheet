import PropTypes from 'prop-types';

function Badge({ children, className = '', variant = 'default' }) {
  // Define variant styles
  const variantStyles = {
    default: 'bg-gray-200 text-gray-800',
    success: 'bg-green-200 text-green-800',
    error: 'bg-red-200 text-red-800',
    warning: 'bg-yellow-200 text-yellow-800',
    info: 'bg-blue-200 text-blue-800',
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-sm font-semibold rounded ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Optional: PropTypes for type checking
Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'success', 'error', 'warning', 'info']),
};

// Optional: Default props
Badge.defaultProps = {
  className: '',
  variant: 'default',
};

export default Badge;