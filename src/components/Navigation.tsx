'use client';

// Components - Navigation component definition
import React from 'react';
// Routing - Next.js Link component for client-side navigation
import Link from 'next/link';
// Routing - Hook to get current pathname
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, BookOpen, Trophy, MessageCircle, Zap, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

// Component Collection - Array of navigation items
const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/calories', label: 'Calories', icon: Zap },
  { href: '/videos', label: 'Videos', icon: Video },
  { href: '/quiz', label: 'Quiz', icon: Trophy },
  { href: '/feedback', label: 'Feedback', icon: MessageCircle },
];

// Components - Functional component
// Stateless Component - Navigation is a stateless component
export const Navigation: React.FC = () => {
  // Routing - Getting current pathname for active state
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-lg border-b-4 border-blue-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          {/* Routing - Link component for navigation */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="text-3xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🍎
            </motion.div>
            <span className="text-xl font-bold text-gray-800">
              Fruit Learning
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            {/* Lists - Mapping over navigation items */}
            {navigationItems.map((item) => {
              const Icon = item.icon;
              // Conditional Rendering - Different styling for active link
              const isActive = pathname === item.href;
              
              return (
                // Routing - Link for each navigation item
                // Keys - Unique key for each navigation item
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                      // Conditional Rendering - Active state styling
                      isActive 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={cn(
                      'p-2 rounded-lg transition-all duration-200',
                      isActive 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
