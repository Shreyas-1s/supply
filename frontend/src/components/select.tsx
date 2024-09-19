import React, { forwardRef } from 'react';

// Define the interface for the Select component's props
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]; // Array of options with value and label
}

// Create the Select component using forwardRef
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';

// Export the Select component for use in other parts of the application
export { Select };
