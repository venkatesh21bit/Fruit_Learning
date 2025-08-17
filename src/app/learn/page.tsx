'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FruitCard } from '@/components/FruitCard';
import { InteractiveCalorieCard } from '@/components/InteractiveCalorieCard';
import { fruits } from '@/data/fruits';
import { cn } from '@/lib/utils';

export default function LearnPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cardType, setCardType] = useState<'normal' | 'calories'>('normal');
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);

  const filteredFruits = fruits.filter(fruit =>
    fruit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fruit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
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
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🍎 Learn About Fruits! 📚
          </motion.h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of delicious fruits and discover their amazing nutritional benefits!
          </p>
        </div>

        {/* Search and View Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for fruits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={cardType === 'normal' ? 'primary' : 'secondary'}
              onClick={() => setCardType('normal')}
              className="px-4 py-3"
            >
              <Grid size={20} />
              <span className="hidden sm:inline ml-2">Normal</span>
            </Button>
            <Button
              variant={cardType === 'calories' ? 'primary' : 'secondary'}
              onClick={() => setCardType('calories')}
              className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
            >
              <span className="text-lg">⚡</span>
              <span className="hidden sm:inline ml-2">Calories</span>
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'secondary'}
              onClick={() => setViewMode('grid')}
              className="px-4 py-3"
            >
              <Grid size={20} />
              <span className="hidden sm:inline ml-2">Grid</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'secondary'}
              onClick={() => setViewMode('list')}
              className="px-4 py-3"
            >
              <List size={20} />
              <span className="hidden sm:inline ml-2">List</span>
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{filteredFruits.length}</span> fruit{filteredFruits.length !== 1 ? 's' : ''}
            {searchTerm && (
              <span> matching &quot;<span className="font-semibold">{searchTerm}</span>&quot;</span>
            )}
          </p>
        </div>

        {/* Fruits Display */}
        <AnimatePresence mode="wait">
          {filteredFruits.length > 0 ? (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              )}
            >
              {filteredFruits.map((fruit, index) => (
                <motion.div
                  key={fruit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    viewMode === 'list' && 'max-w-2xl mx-auto'
                  )}
                >
                {cardType === 'normal' ? (
                  <FruitCard 
                    fruit={fruit}
                    onClick={() => setSelectedFruit(selectedFruit === fruit.id ? null : fruit.id)}
                    isSelected={selectedFruit === fruit.id}
                    className={cn(
                      'h-full transition-all duration-300',
                      viewMode === 'list' && 'md:flex md:flex-row md:items-center md:space-x-6'
                    )}
                  />
                ) : (
                  <InteractiveCalorieCard 
                    fruit={fruit}
                    className={cn(
                      'h-full transition-all duration-300',
                      viewMode === 'list' && 'max-w-2xl mx-auto'
                    )}
                  />
                )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No fruits found</h3>
              <p className="text-gray-600 mb-4">
                Try searching for something else or clear your search to see all fruits.
              </p>
              <Button onClick={() => setSearchTerm('')}>
                Show All Fruits 🍎
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun Facts Section */}
        {filteredFruits.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-blue-50 rounded-xl p-6 border-2 border-blue-200"
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
              🤓 Did You Know?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-blue-700 mb-2">🌈 Color Power</h3>
                <p className="text-sm text-gray-700">
                  Different colored fruits contain different vitamins! Red fruits often have vitamin C, 
                  orange fruits have vitamin A, and purple fruits have antioxidants.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-blue-700 mb-2">💪 Energy Boost</h3>
                <p className="text-sm text-gray-700">
                  Fruits contain natural sugars that give you energy to play and learn! 
                  They&apos;re much better than candy because they also have vitamins and fiber.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-blue-700 mb-2">🌱 Growing Facts</h3>
                <p className="text-sm text-gray-700">
                  Some fruits like strawberries and pineapples take a long time to grow, 
                  while others like grapes grow in big bunches on vines!
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
}
