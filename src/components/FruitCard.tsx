'use client';

// Components - This file defines a reusable functional component
import React from 'react';
import { motion } from 'framer-motion';
// Nested Components - Importing UI components that will be nested inside FruitCard
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Fruit } from '@/data/fruits';
import { cn } from '@/lib/utils';

// Properties (props) - Interface defining the props this component accepts
interface FruitCardProps {
  fruit: Fruit;
  onClick?: () => void;
  isSelected?: boolean;
  showCalories?: boolean;
  className?: string;
}

// Creating Components using Properties - Functional component using props
// Stateless Component - This is a stateless functional component
export const FruitCard: React.FC<FruitCardProps> = ({
  // props - Destructuring props for easier use
  fruit,
  onClick,
  isSelected = false,
  showCalories = true,
  className
}) => {
  return (
    // Using Newly Created Components - Using the Card component we imported
    <Card
      // Styling - Dynamic styling based on props
      className={cn(fruit.color, className)}
      // Event Management - Handling click events
      onClick={onClick}
      isSelected={isSelected}
    >
      {/* Nested Components - CardHeader nested inside Card */}
      <CardHeader className="text-center">
        <motion.div
          className="text-6xl mb-2"
          // Conditional Rendering - Animation only when selected
          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* props - Using fruit data from props */}
          {fruit.emoji}
        </motion.div>
        {/* Nested Components - CardTitle nested inside CardHeader */}
        <CardTitle className="text-2xl">{fruit.name}</CardTitle>
      </CardHeader>
      
      {/* Nested Components - CardContent nested inside Card */}
      <CardContent>
        <p className="text-gray-700 text-center mb-4 text-sm">
          {/* props - Displaying fruit description from props */}
          {fruit.description}
        </p>
        
        {/* Conditional Rendering - Only show calories if showCalories prop is true */}
        {showCalories && (
          <div className="bg-white/70 rounded-lg p-3 mb-3">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-800">
                {/* props - Using fruit calories from props */}
                {fruit.calories}
              </span>
              <span className="text-sm text-gray-600 ml-1">calories</span>
            </div>
          </div>
        )}

        <div className="bg-white/70 rounded-lg p-3 mb-3">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Nutrients:</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Main Vitamin:</span>
              {/* props - Accessing nested object properties from props */}
              <span className="font-medium">{fruit.nutrients.vitamin}</span>
            </div>
            <div className="flex justify-between">
              <span>Fiber:</span>
              <span className="font-medium">{fruit.nutrients.fiber}g</span>
            </div>
            <div className="flex justify-between">
              <span>Sugar:</span>
              <span className="font-medium">{fruit.nutrients.sugar}g</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="font-semibold text-blue-800 mb-1 text-sm">Fun Fact:</h4>
          {/* props - Using fun fact from props */}
          <p className="text-blue-700 text-xs">{fruit.funFact}</p>
        </div>
      </CardContent>
    </Card>
  );
};
