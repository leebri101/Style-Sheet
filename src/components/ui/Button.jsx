

/**
 * Button Component
 * Renders a button with optional variant, size, and className.
 */
export function Button({ children, variant = 'solid', size = 'md', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const variants = {
    solid: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'hover:bg-gray-100 text-gray-700',
  };
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
