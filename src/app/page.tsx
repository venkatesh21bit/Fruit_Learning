'use client';

// Components - Home page component
import React from 'react';
// Routing - Next.js Link for navigation
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, MessageCircle, Star, Zap, Video } from 'lucide-react';

// Using Newly Created Components - Importing custom components
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FruitCard } from '@/components/FruitCard';
import { fruits } from '@/data/fruits';

// Components - Default export page component
export default function HomePage() {
  // Lists - Taking subset of fruits for featured section
  const featuredFruits = fruits.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-gray-800 mb-4"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🍎 Welcome to Fruit Learning! 🌟
        </motion.h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover the wonderful world of fruits! Learn about different fruits, 
          their nutritional values, understand calories with fun games, and test your knowledge. 
          Perfect for curious young minds! 🧠✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Routing - Navigation to learn page */}
          <Link href="/learn">
            {/* Using Newly Created Components - Custom Button component */}
            <Button size="lg" className="w-full sm:w-auto">
              <BookOpen className="mr-2" size={24} />
              Start Learning! 📚
            </Button>
          </Link>
          {/* Routing - Navigation to calories page */}
          <Link href="/calories">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <Zap className="mr-2" size={24} />
              Explore Energy! ⚡
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What You Can Do Here 🎈
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/learn">
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer bg-blue-50 border-blue-200">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">📖</div>
                  <CardTitle className="text-blue-700">Learn About Fruits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center">
                    Explore different fruits, learn about their colors, shapes, 
                    nutritional values, and fun facts!
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/calories">
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer bg-yellow-50 border-yellow-200">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">⚡</div>
                  <CardTitle className="text-yellow-700">Discover Energy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center">
                    Learn about calories in fruits with interactive games, 
                    visual energy displays, and fun comparisons!
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/videos">
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer bg-purple-50 border-purple-200">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">🎬</div>
                  <CardTitle className="text-purple-700">Watch Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center">
                    Enjoy fun educational videos about fruits, nutrition,
                    and healthy eating with songs and stories!
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/quiz">
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer bg-green-50 border-green-200">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <CardTitle className="text-green-700">Take Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center">
                    Test your knowledge with fun calorie guessing games and 
                    track your progress as you learn!
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/feedback">
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer bg-red-50 border-red-200">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <CardTitle className="text-red-700">Share Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center">
                    Tell us what you think! Your feedback helps us make 
                    the app even better for everyone.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Fruits Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Meet Some Delicious Fruits! 🍓
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Lists - Mapping over featured fruits array */}
          {featuredFruits.map((fruit, index) => (
            <motion.div
              key={fruit.id} // Keys - Unique key for each fruit
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {/* Using Newly Created Components - FruitCard with props */}
              <FruitCard fruit={fruit} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/learn">
            <Button size="lg">
              See All Fruits! 🌈
            </Button>
          </Link>
        </div>
      </motion.section>

      {/* New Calorie Learning Highlight */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
          <CardContent className="py-8">
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="text-6xl mb-4"
              >
                ⚡
              </motion.div>
              <h2 className="text-3xl font-bold text-orange-800 mb-4">
                NEW: Learn About Calories! 
              </h2>
              <p className="text-lg text-orange-700 mb-6 max-w-2xl mx-auto">
                Discover what calories are and how much energy different fruits give you! 
                Play interactive games, see visual energy levels, and compare fruits in a fun, autism-friendly way.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <div className="text-3xl mb-2">🎮</div>
                  <h3 className="font-semibold text-orange-800 mb-1">Interactive Games</h3>
                  <p className="text-sm text-orange-700">
                    Play calorie guessing games designed for easy understanding
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-semibold text-orange-800 mb-1">Visual Learning</h3>
                  <p className="text-sm text-orange-700">
                    See energy levels with colors, bars, and clear comparisons
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <div className="text-3xl mb-2">🌟</div>
                  <h3 className="font-semibold text-orange-800 mb-1">Simple & Fun</h3>
                  <p className="text-sm text-orange-700">
                    Designed specifically for children with clear, friendly language
                  </p>
                </div>
              </div>
              <Link href="/calories">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Zap className="mr-2" size={24} />
                  Explore Calories Now! ⚡
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-blue-100 to-green-100 border-blue-300">
          <CardContent className="py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Fruit Adventure? 🚀
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Join thousands of kids who are already learning about healthy fruits and energy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn">
                <Button size="lg" className="w-full sm:w-auto">
                  <BookOpen className="mr-2" size={24} />
                  Begin Learning Now! 🌟
                </Button>
              </Link>
              <Link href="/calories">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Zap className="mr-2" size={24} />
                  Discover Energy! ⚡
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
