import React, { forwardRef } from 'react';

// Define the interface for the Input component's props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Create the Input component using forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

// Export the Input component for use in other parts of the application
export { Input };
