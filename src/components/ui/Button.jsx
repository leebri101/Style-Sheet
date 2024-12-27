import PropTypes from 'prop-types';

/**
 * Button Component
 * A customizable button component with different styles and sizes.
 */
export default function Button({ children, variant = 'solid', size = 'md', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    solid: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-300',
  };

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
  };

  // Combine all classes
  const buttonClasses = `${baseStyles} ${variants[variant] || variants.solid} ${sizes[size] || sizes.md} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

// PropTypes for type checking
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['solid', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon']),
  className: PropTypes.string,
};

// Default props
Button.defaultProps = {
  variant: 'solid',
  size: 'md',
  className: '',
};