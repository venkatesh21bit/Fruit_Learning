'use client';

// Components - Button component definition
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Properties (props) - Interface defining button props
interface ButtonProps extends React.ComponentPropsWithoutRef<typeof motion.button> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Creating Components using Properties - forwardRef for ref forwarding
// props Validation - TypeScript interface for type checking
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // props - Destructuring props with default values
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    // Styling - Base CSS classes
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';
    
    // Component Collection - Variant styles collection
    const variants = {
      primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-200',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-200',
      success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-200',
      danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-200'
    };

    // Component Collection - Size styles collection
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    return (
      // Event-Aware Component - Button with motion animations
      <motion.button
        ref={ref}
        // Styling - Dynamic styling based on props
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        // Event Management - Hover and tap animations
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* props - Rendering children prop */}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
