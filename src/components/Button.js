import React from 'react';

export function Button({ children, variant = 'default', className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    default: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-teal-500',
    primary: 'bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-500',
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
}
