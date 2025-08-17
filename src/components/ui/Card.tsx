'use client';

// Components - Card component system definition
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Properties (props) - Interface for Card props
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

// Components - Main Card component
// Creating Components using Properties - Card component with props
export const Card: React.FC<CardProps> = ({ 
  // props - Destructuring props
  children, 
  className, 
  onClick, 
  isSelected = false 
}) => {
  return (
    // Event-Aware Component - Card with motion and click handling
    <motion.div
      className={cn(
        'bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg transition-all duration-300 cursor-pointer',
        // Conditional Rendering - Styling based on selection state
        isSelected && 'border-blue-500 bg-blue-50 scale-105',
        onClick && 'hover:shadow-xl hover:scale-102',
        // Styling - Dynamic class application
        className
      )}
      // Event Management - Click handler
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* props - Rendering children */}
      {children}
    </motion.div>
  );
};

// Properties (props) - Interface for CardHeader props
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

// Components - CardHeader component
export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('mb-4', className)}>
      {/* props - Rendering children */}
      {children}
    </div>
  );
};

// Properties (props) - Interface for CardTitle props
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

// Components - CardTitle component
export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={cn('text-xl font-bold text-gray-800', className)}>
      {/* props - Rendering children */}
      {children}
    </h3>
  );
};

// Properties (props) - Interface for CardContent props
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

// Components - CardContent component
export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={cn('', className)}>
      {/* props - Rendering children */}
      {children}
    </div>
  );
};
