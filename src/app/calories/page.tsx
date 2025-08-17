'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  BookOpen, 
  Gamepad2, 
  BarChart3, 
  ArrowLeft,
  Star,
  Target,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { InteractiveCalorieCard } from '@/components/InteractiveCalorieCard';
import { CalorieLearningGame } from '@/components/CalorieLearningGame';
import { fruits } from '@/data/fruits';
import { cn } from '@/lib/utils';

type ViewMode = 'menu' | 'explore' | 'game' | 'comparison';

export default function CaloriesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [selectedFruits, setSelectedFruits] = useState(fruits.slice(0, 4));
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [gameScore, setGameScore] = useState<number | null>(null);

  const handleGameComplete = (score: number) => {
    setGameScore(score);
  };

  const refreshFruits = () => {
    const shuffled = [...fruits].sort(() => Math.random() - 0.5);
    setSelectedFruits(shuffled.slice(0, 4));
  };

  const sortedFruits = [...fruits].sort((a, b) => a.calories - b.calories);
  const lowestCalorie = sortedFruits[0];
  const highestCalorie = sortedFruits[sortedFruits.length - 1];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ⚡ Learn About Calories! ⚡
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how much energy different fruits give you through fun activities and games!
          </p>
        </div>

        {/* Back Button */}
        <AnimatePresence>
          {viewMode !== 'menu' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mb-6"
            >
              <Button 
                variant="secondary" 
                onClick={() => setViewMode('menu')}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back to Menu
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* Main Menu */}
          {viewMode === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Explore Calories */}
              <Card 
                className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200"
                onClick={() => setViewMode('explore')}
              >
                <CardHeader className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="text-5xl mb-3"
                  >
                    🔍
                  </motion.div>
                  <CardTitle className="text-xl text-blue-800">
                    Explore Calories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 text-center mb-4">
                    See how much energy different fruits have with fun visuals!
                  </p>
                  <div className="flex justify-center">
                    <BookOpen className="text-blue-500" size={32} />
                  </div>
                </CardContent>
              </Card>

              {/* Play Learning Game */}
              <Card 
                className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200"
                onClick={() => setViewMode('game')}
              >
                <CardHeader className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-5xl mb-3"
                  >
                    🎯
                  </motion.div>
                  <CardTitle className="text-xl text-green-800">
                    Calorie Game
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 text-center mb-4">
                    Test your knowledge with fun questions about fruit energy!
                  </p>
                  <div className="flex justify-center">
                    <Gamepad2 className="text-green-500" size={32} />
                  </div>
                </CardContent>
              </Card>

              {/* Compare Fruits */}
              <Card 
                className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200"
                onClick={() => setViewMode('comparison')}
              >
                <CardHeader className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl mb-3"
                  >
                    ⚖️
                  </motion.div>
                  <CardTitle className="text-xl text-purple-800">
                    Compare Energy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700 text-center mb-4">
                    See which fruits give you more or less energy!
                  </p>
                  <div className="flex justify-center">
                    <BarChart3 className="text-purple-500" size={32} />
                  </div>
                </CardContent>
              </Card>

              {/* Fun Facts */}
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
                <CardHeader className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="text-5xl mb-3"
                  >
                    💡
                  </motion.div>
                  <CardTitle className="text-xl text-yellow-800">
                    Fun Facts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-yellow-800">
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium">🍓 Lowest Energy:</p>
                      <p>{lowestCalorie.name} - {lowestCalorie.calories} calories</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium">🍌 Highest Energy:</p>
                      <p>{highestCalorie.name} - {highestCalorie.calories} calories</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Explore Mode */}
          {viewMode === 'explore' && (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  🔍 Explore Fruit Calories
                </h2>
                <Button onClick={refreshFruits} variant="secondary">
                  <Star className="mr-2" size={16} />
                  Show Different Fruits
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {selectedFruits.map((fruit, index) => (
                  <motion.div
                    key={fruit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <InteractiveCalorieCard fruit={fruit} />
                  </motion.div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4 text-center flex items-center justify-center gap-2">
                  <Lightbulb className="text-yellow-500" />
                  What Are Calories?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl mb-2">⚡</div>
                    <h4 className="font-semibold text-blue-800 mb-2">Energy for Your Body</h4>
                    <p className="text-sm text-blue-700">
                      Calories are like fuel for your body - they give you energy to run, play, and think!
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl mb-2">🏃</div>
                    <h4 className="font-semibold text-blue-800 mb-2">Power for Activities</h4>
                    <p className="text-sm text-blue-700">
                      More calories = more energy for activities like running, jumping, and playing sports!
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-3xl mb-2">🍎</div>
                    <h4 className="font-semibold text-blue-800 mb-2">Natural & Healthy</h4>
                    <p className="text-sm text-blue-700">
                      Fruit calories are natural and come with vitamins that make you strong and healthy!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Game Mode */}
          {viewMode === 'game' && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  🎯 Calorie Learning Game
                </h2>
                <div className="flex justify-center gap-4 mb-4">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <Button
                      key={level}
                      variant={difficulty === level ? 'primary' : 'secondary'}
                      onClick={() => setDifficulty(level)}
                      className="capitalize"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
                <p className="text-gray-600 max-w-md mx-auto">
                  Choose your difficulty level and test your knowledge about fruit calories!
                </p>
              </div>

              <CalorieLearningGame 
                difficulty={difficulty} 
                onComplete={handleGameComplete}
              />

              {gameScore !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mt-6"
                >
                  <Card className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-2">🏆</div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        Latest Score
                      </h3>
                      <p className="text-2xl font-bold text-green-600">
                        {gameScore} / {difficulty === 'easy' ? '3' : '4'}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Comparison Mode */}
          {viewMode === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                ⚖️ Compare Fruit Energy Levels
              </h2>

              {/* Energy Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Light Energy */}
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">🟢</div>
                    <CardTitle className="text-green-800">Light Energy</CardTitle>
                    <p className="text-sm text-green-700">20-60 calories</p>
                  </CardHeader>
                  <CardContent>
                    {sortedFruits.filter(f => f.calories <= 60).map((fruit, index) => (
                      <motion.div
                        key={fruit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between bg-white rounded-lg p-3 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{fruit.emoji}</span>
                          <span className="font-medium text-gray-800">{fruit.name}</span>
                        </div>
                        <div className="text-sm font-bold text-green-600">
                          {fruit.calories} cal
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Good Energy */}
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">🟡</div>
                    <CardTitle className="text-yellow-800">Good Energy</CardTitle>
                    <p className="text-sm text-yellow-700">61-90 calories</p>
                  </CardHeader>
                  <CardContent>
                    {sortedFruits.filter(f => f.calories > 60 && f.calories <= 90).map((fruit, index) => (
                      <motion.div
                        key={fruit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between bg-white rounded-lg p-3 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{fruit.emoji}</span>
                          <span className="font-medium text-gray-800">{fruit.name}</span>
                        </div>
                        <div className="text-sm font-bold text-yellow-600">
                          {fruit.calories} cal
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Lots of Energy */}
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">🟠</div>
                    <CardTitle className="text-orange-800">Lots of Energy</CardTitle>
                    <p className="text-sm text-orange-700">90+ calories</p>
                  </CardHeader>
                  <CardContent>
                    {sortedFruits.filter(f => f.calories > 90).map((fruit, index) => (
                      <motion.div
                        key={fruit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between bg-white rounded-lg p-3 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{fruit.emoji}</span>
                          <span className="font-medium text-gray-800">{fruit.name}</span>
                        </div>
                        <div className="text-sm font-bold text-orange-600">
                          {fruit.calories} cal
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Visual Comparison Chart */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-center text-blue-800">
                    📊 Visual Energy Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sortedFruits.map((fruit, index) => (
                      <motion.div
                        key={fruit.id}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex items-center gap-4"
                      >
                        <div className="flex items-center gap-2 w-32">
                          <span className="text-xl">{fruit.emoji}</span>
                          <span className="text-sm font-medium truncate">{fruit.name}</span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                            <motion.div
                              className={cn(
                                "h-full rounded-full",
                                fruit.calories <= 60 ? "bg-green-400" :
                                fruit.calories <= 90 ? "bg-yellow-400" : "bg-orange-400"
                              )}
                              initial={{ width: 0 }}
                              animate={{ width: `${(fruit.calories / highestCalorie.calories) * 100}%` }}
                              transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-bold w-16 text-right">
                          {fruit.calories} cal
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
