'use client';

// Components - Input component definition
import React from 'react';
import { cn } from '@/lib/utils';

// Properties (props) - Interface extending HTML input props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

// Creating Components using Properties - forwardRef for input
// Controlled Component - Input component for forms
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // props - Destructuring props
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Conditional Rendering - Show label if provided */}
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {/* props - Displaying label prop */}
            {label}
          </label>
        )}
        <input
          className={cn(
            'flex h-12 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-base placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50',
            // Conditional Rendering - Error styling
            error && 'border-red-500 focus:border-red-500 focus:ring-red-200',
            // Styling - Dynamic class application
            className
          )}
          ref={ref}
          {...props}
        />
        {/* Conditional Rendering - Show error message if present */}
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            {/* props - Displaying error prop */}
            {error}
          </p>
        )}
        {/* Conditional Rendering - Show helper text if no error */}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-600">
            {/* props - Displaying helper text prop */}
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
