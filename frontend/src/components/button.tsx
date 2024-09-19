import React, { forwardRef } from 'react';

// Define the button properties interface, extending the default button attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'; // Define the custom variants
}

// Create the Button component using forwardRef
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', children, ...props }, ref) => {
    // Base styles for the button
    const baseStyles = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

    // Styles for each variant
    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
    };

    // Combine the base styles, variant styles, and any additional class names
    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

    // Return the button element with the combined styles and props
    return (
      <button className={combinedStyles} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

// Assign a display name to the Button component for better debugging
Button.displayName = 'Button';

// Export the Button component for use in other parts of the application
export { Button };
