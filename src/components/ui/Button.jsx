
function Button({ children, className, variant = 'default', size = 'default' }) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium';
  const variantStyles = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    ghost: 'bg-transparent hover:bg-gray-200',
  };
  const sizeStyles = {
    default: 'px-4 py-2',
    icon: 'p-2',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
