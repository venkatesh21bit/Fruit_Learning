'use client';

// Components - Videos page component
import React, { useState } from 'react';
// Routing - Next.js Link for navigation
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

// Using Newly Created Components - Importing custom UI components
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Component Collection - Video data structure
interface Video {
  id: string;
  title: string;
  filename: string;
  description: string;
  duration: string;
  category: 'fruits' | 'nutrition' | 'songs';
  emoji: string;
}

// Lists - Array of educational videos for kids
const videos: Video[] = [
  {
    id: 'fruits-song-healthy-eating',
    title: 'Fruits Song - Healthy Eating + More Learning Videos for Kids',
    filename: 'Fruits Song - Healthy Eating + More Learning Videos for Kids.mp4',
    description: 'A fun and educational song about healthy eating with fruits! Perfect for learning about different fruits and their benefits.',
    duration: 'Educational Video',
    category: 'fruits',
    emoji: '🍎'
  },
  {
    id: 'healthy-eating-nutrients',
    title: 'Healthy Eating for Kids - Learn About Carbohydrates, Fats, Proteins, Vitamins and Mineral Salts',
    filename: 'Healthy Eating for Kids - Learn About Carbohydrates, Fats, Proteins, Vitamins and Mineral Salts.mp4',
    description: 'Learn about important nutrients like carbohydrates, fats, proteins, vitamins, and minerals in a kid-friendly way!',
    duration: 'Educational Video',
    category: 'nutrition',
    emoji: '🥗'
  },
  {
    id: 'calories-song',
    title: 'Kids Learning CALORIES Song',
    filename: 'Kids Learning CALORIES Song.mp4',
    description: 'A catchy song to help kids understand what calories are and why they are important for our bodies!',
    duration: 'Educational Song',
    category: 'nutrition',
    emoji: '⚡'
  },
  {
    id: 'learning-fruits-vocabulary',
    title: 'Learning Fruits - Fun Way to Build Your Child&apos;s Vocabulary',
    filename: 'Learning Fruits - Fun Way to Build Your Child\'s Vocabulary.mp4',
    description: 'Build vocabulary and learn fruit names in an engaging and interactive way perfect for young learners!',
    duration: 'Learning Video',
    category: 'fruits',
    emoji: '🍓'
  },
  {
    id: 'ten-little-fruits',
    title: 'Ten Little Fruits Jumping on the Bed - Fruits Song - Learn Fruits - Nursery Rhymes',
    filename: 'Ten Little Fruits Jumping on the Bed _ Fruits Song _ Learn Fruits_ Nursery Rhymes_  ten in the bed.mp4',
    description: 'A delightful nursery rhyme featuring ten little fruits! Count along and learn fruit names with this fun song.',
    duration: 'Nursery Rhyme',
    category: 'songs',
    emoji: '🎵'
  }
];

// Component Collection - Category filter options
const categories = [
  { key: 'all', label: 'All Videos', emoji: '🎬' },
  { key: 'fruits', label: 'Fruits', emoji: '🍎' },
  { key: 'nutrition', label: 'Nutrition', emoji: '🥗' },
  { key: 'songs', label: 'Songs', emoji: '🎵' }
];

// Components - Video player component
// Creating Components using Properties - VideoPlayer with props
interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  // State Management Using React Hooks - Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);

  // Event Management - Play/pause handler
  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play().catch(() => {
          console.error('Failed to play video');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Event Management - Mute/unmute handler
  const toggleMute = () => {
    if (videoRef) {
      videoRef.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Event Management - Video event handlers
  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const handleVideoEnded = () => setIsPlaying(false);
  const handleVideoError = () => {
    setHasError(true);
    console.error(`Failed to load video: ${video.filename}`);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative bg-gray-900 aspect-video">
        {/* Conditional Rendering - Show error message if video fails to load */}
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-lg font-semibold mb-2">Video Not Available</h3>
              <p className="text-sm text-gray-300">
                This video is currently not available for playback.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Video element - Using video files from public folder */}
            <video
              ref={setVideoRef}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              onError={handleVideoError}
              crossOrigin="anonymous"
            >
              <source src={`/${encodeURIComponent(video.filename)}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Video overlay with custom controls */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-80 hover:opacity-100 transition-opacity">
              {/* Event-Aware Component - Play button with animation */}
              <motion.button
                onClick={togglePlay}
                className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={isPlaying ? "Pause" : "Play"}
              >
                {/* Conditional Rendering - Play or pause icon */}
                {isPlaying ? (
                  <Pause size={20} className="text-gray-800" />
                ) : (
                  <Play size={20} className="text-gray-800 ml-0.5" />
                )}
              </motion.button>
              
              <motion.button
                onClick={toggleMute}
                className="bg-white bg-opacity-90 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {/* Conditional Rendering - Volume icon based on mute state */}
                {isMuted ? (
                  <VolumeX size={20} className="text-gray-800" />
                ) : (
                  <Volume2 size={20} className="text-gray-800" />
                )}
              </motion.button>
            </div>
          </>
        )}
      </div>

      {/* Nested Components - Card header and content */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {/* props - Using video emoji and title */}
          <span className="text-2xl">{video.emoji}</span>
          {video.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* props - Displaying video description */}
        <p className="text-gray-700 mb-3">{video.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {video.duration}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full capitalize">
            {video.category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// Components - Main videos page component
export default function VideosPage() {
  // State Management Using React Hooks - Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lists - Filtering videos based on selected category
  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  // Event Management - Category filter handler
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

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
          🎬 Fun Learning Videos! 🌟
        </motion.h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Watch exciting educational videos about fruits, nutrition, and healthy eating! 
          Perfect for young learners who love songs and visual learning. 🎵📚
        </p>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Choose Your Favorite Category 🎯
        </h2>
        
        {/* Lists - Mapping over category options */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category.key} // Keys - Unique key for each category button
              onClick={() => handleCategoryChange(category.key)} // Event Management
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.key
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{category.emoji}</span>
              {category.label}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Videos Grid */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {/* Conditional Rendering - Dynamic title based on category */}
          {selectedCategory === 'all' ? 'All Educational Videos' : 
           `${categories.find(c => c.key === selectedCategory)?.label} Videos`} 
          🎥
        </h2>
        
        {/* Conditional Rendering - Show message if no videos */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😅</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No videos found!</h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        ) : (
          /* Lists - Mapping over filtered videos */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id} // Keys - Unique key for each video
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {/* Using Newly Created Components - VideoPlayer with props */}
                <VideoPlayer video={video} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300">
          <CardContent className="py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Keep Learning and Having Fun! 🚀
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Don&apos;t forget to explore our other learning activities and games!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Routing - Navigation to other pages */}
              <Link href="/learn">
                <Button size="lg" className="w-full sm:w-auto">
                  🍎 Learn About Fruits
                </Button>
              </Link>
              <Link href="/quiz">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  🎯 Take a Quiz
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
