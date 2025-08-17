'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Heart, Play, Pause, Volume2, Star, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Fruit } from '@/data/fruits';
import { cn } from '@/lib/utils';

interface InteractiveCalorieCardProps {
  fruit: Fruit;
  className?: string;
}

export const InteractiveCalorieCard: React.FC<InteractiveCalorieCardProps> = ({
  fruit,
  className
}) => {
  const [showCalories, setShowCalories] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentSound, setCurrentSound] = useState<'high' | 'medium' | 'low'>('medium');

  // Categorize calories for autism-friendly understanding
  const getCalorieCategory = (calories: number) => {
    if (calories <= 60) return { level: 'low', color: 'green', icon: '🟢', text: 'Light Energy' };
    if (calories <= 90) return { level: 'medium', color: 'yellow', icon: '🟡', text: 'Good Energy' };
    return { level: 'high', color: 'orange', icon: '🟠', text: 'Lots of Energy' };
  };

  const calorieInfo = getCalorieCategory(fruit.calories);

  // Visual energy representation
  const energyBars = Math.ceil(fruit.calories / 20);
  const maxBars = 8;

  // Sound feedback for calories (visual representation)
  const playCalorieSound = () => {
    if (fruit.calories <= 60) setCurrentSound('low');
    else if (fruit.calories <= 90) setCurrentSound('medium');
    else setCurrentSound('high');
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Simple activity comparisons for context
  const getActivityComparison = (calories: number) => {
    if (calories <= 50) return { activity: '5 minutes of walking', icon: '🚶' };
    if (calories <= 80) return { activity: '10 minutes of playing', icon: '🏃' };
    if (calories <= 100) return { activity: '15 minutes of running', icon: '🏃‍♂️' };
    return { activity: '20 minutes of active play', icon: '⚽' };
  };

  const activityInfo = getActivityComparison(fruit.calories);

  return (
    <Card className={cn(
      fruit.color,
      "transition-all duration-300 hover:scale-105 hover:shadow-lg",
      className
    )}>
      <CardContent className="p-6">
        {/* Fruit Display */}
        <div className="text-center mb-6">
          <motion.div
            className="text-6xl mb-3"
            animate={isAnimating ? { 
              scale: [1, 1.3, 1], 
              rotate: [0, 10, -10, 0] 
            } : {}}
            transition={{ duration: 1 }}
          >
            {fruit.emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{fruit.name}</h3>
          <p className="text-sm text-gray-600">{fruit.description}</p>
        </div>

        {/* Interactive Calorie Display */}
        <div className="bg-white/80 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Zap className="text-yellow-500" size={20} />
              Energy Inside
            </h4>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowCalories(!showCalories)}
              className="px-2 py-1"
            >
              {showCalories ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {showCalories ? (
              <motion.div
                key="calories"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-3"
              >
                {/* Main Calorie Number */}
                <div className="text-center">
                  <motion.div
                    className={`text-4xl font-bold text-${calorieInfo.color}-600 mb-1`}
                    animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
                  >
                    {fruit.calories}
                  </motion.div>
                  <p className="text-sm text-gray-600">calories</p>
                </div>

                {/* Energy Level Indicator */}
                <div className="text-center mb-3">
                  <div className="text-2xl mb-1">{calorieInfo.icon}</div>
                  <div className={`text-sm font-medium text-${calorieInfo.color}-700`}>
                    {calorieInfo.text}
                  </div>
                </div>

                {/* Visual Energy Bars */}
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: maxBars }, (_, i) => (
                    <motion.div
                      key={i}
                      className={`w-3 h-6 rounded-sm ${
                        i < energyBars 
                          ? `bg-${calorieInfo.color}-400` 
                          : 'bg-gray-200'
                      }`}
                      initial={{ height: 0 }}
                      animate={{ height: i < energyBars ? 24 : 24 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    />
                  ))}
                </div>

                {/* Interactive Sound Button */}
                <div className="text-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={playCalorieSound}
                    className="px-3 py-2"
                  >
                    <Volume2 size={16} className="mr-1" />
                    Energy Sound
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="text-4xl mb-2">❓</div>
                <p className="text-gray-600">Calories are hidden!</p>
                <p className="text-sm text-gray-500">Click the eye to see them</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Activity Comparison */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-red-500" size={18} />
            <h5 className="font-semibold text-blue-800">What This Means</h5>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl">{activityInfo.icon}</div>
            <div>
              <p className="text-sm text-blue-700">
                This fruit gives you energy for
              </p>
              <p className="font-medium text-blue-800">
                {activityInfo.activity}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Toggle */}
        <div className="text-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
            className="text-xs px-3 py-2"
          >
            <Star size={14} className="mr-1" />
            {showComparison ? 'Hide' : 'Show'} Size Comparison
          </Button>
        </div>

        {/* Size Comparison */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 bg-purple-50 rounded-lg p-4"
            >
              <h5 className="font-semibold text-purple-800 mb-3 text-center">
                Compare with other foods
              </h5>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded p-2">
                  <div className="text-lg">🍪</div>
                  <div className="text-xs">Cookie</div>
                  <div className="text-xs font-medium">~150 cal</div>
                </div>
                <div className="bg-white rounded p-2 border-2 border-purple-300">
                  <div className="text-lg">{fruit.emoji}</div>
                  <div className="text-xs">{fruit.name}</div>
                  <div className="text-xs font-medium">{fruit.calories} cal</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-lg">🥕</div>
                  <div className="text-xs">Carrot</div>
                  <div className="text-xs font-medium">~25 cal</div>
                </div>
              </div>
              <p className="text-xs text-purple-700 mt-2 text-center">
                {fruit.calories < 100 ? 'Great healthy choice!' : 'Natural energy booster!'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound Feedback Visual */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            >
              <div className="bg-black/50 text-white px-6 py-4 rounded-lg text-center">
                <div className="text-3xl mb-2">
                  {currentSound === 'low' && '🔊'}
                  {currentSound === 'medium' && '🔊🔊'}
                  {currentSound === 'high' && '🔊🔊🔊'}
                </div>
                <p className="text-lg font-bold">
                  {currentSound === 'low' && 'Quiet Energy!'}
                  {currentSound === 'medium' && 'Medium Energy!'}
                  {currentSound === 'high' && 'Big Energy!'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
