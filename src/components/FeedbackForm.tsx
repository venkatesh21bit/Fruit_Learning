'use client';

// Components - FeedbackForm component definition
import React, { useState } from 'react';
// Form Programming - React Hook Form for form management
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { MessageCircle, Star, Send, CheckCircle } from 'lucide-react';

// Using Newly Created Components - Importing custom UI components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// props Validation - Importing validation schemas
import { FeedbackFormData, feedbackFormSchema } from '@/lib/validations';
import { fruits } from '@/data/fruits';
import { cn } from '@/lib/utils';

// Components - Functional component with state
export const FeedbackForm: React.FC = () => {
  // State Management Using React Hooks - Local state for form submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  // Form Programming - useForm hook for form state management
  // Controlled Component - Form managed by react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset
  } = useForm<FeedbackFormData>({
    // props Validation - Zod resolver for form validation
    resolver: zodResolver(feedbackFormSchema),
  });

  // Controlled Component - Watching form values
  const watchedRating = watch('enjoymentRating');

  // Event Management - Form submission handler
  const onSubmit = async (data: FeedbackFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Feedback submitted:', data);
    // State Management - Update submission state
    setIsSubmitted(true);
    
    // Component Life Cycle Using React Hooks - Effect-like behavior with timeout
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      setSelectedRating(0);
    }, 3000);
  };

  // Event Management - Rating click handler
  const handleRatingClick = (rating: number) => {
    // State Management - Update rating state
    setSelectedRating(rating);
    setValue('enjoymentRating', rating);
  };

  // Conditional Rendering - Show success message if submitted
  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card>
            <CardContent className="py-12">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <CheckCircle size={80} className="text-green-500 mx-auto" />
              </motion.div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Thank You! 🎉
              </h2>
              <p className="text-lg text-gray-700">
                Your feedback helps us make learning more fun for everyone!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            📝 Tell Us What You Think! 💭
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Your feedback helps us make the app even better!
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="text-blue-500" />
              Feedback Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Child Name */}
              <Input
                label="Your Name"
                placeholder="Enter your name"
                {...register('childName')}
                error={errors.childName?.message}
              />

              {/* Favorite Fruit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What&apos;s your favorite fruit? 🍎
                </label>
                {/* Lists - Mapping over fruits array */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {fruits.map((fruit) => (
                    <motion.label
                      key={fruit.id} // Keys - Unique key for each fruit option
                      className={cn(
                        'cursor-pointer p-3 rounded-lg border-2 transition-all text-center',
                        'hover:border-blue-300 hover:bg-blue-50',
                        // Styling - Dynamic styling based on fruit color
                        fruit.color
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Uncontrolled Component - Radio input for fruit selection */}
                      <input
                        type="radio"
                        value={fruit.id}
                        {...register('favoriteFruit')}
                        className="sr-only"
                      />
                      <div className="text-3xl mb-1">{fruit.emoji}</div>
                      <div className="text-sm font-medium">{fruit.name}</div>
                    </motion.label>
                  ))}
                </div>
                {/* Conditional Rendering - Show error if validation fails */}
                {errors.favoriteFruit && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.favoriteFruit.message}
                  </p>
                )}
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How hard was the quiz? 🤔
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'easy', label: '😊 Easy', color: 'bg-green-100 border-green-300' },
                    { value: 'medium', label: '🙂 Just Right', color: 'bg-yellow-100 border-yellow-300' },
                    { value: 'hard', label: '😅 Hard', color: 'bg-red-100 border-red-300' }
                  ].map((option) => (
                    <motion.label
                      key={option.value}
                      className={cn(
                        'cursor-pointer p-4 rounded-lg border-2 transition-all text-center font-medium',
                        'hover:scale-105',
                        option.color
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register('difficultyLevel')}
                        className="sr-only"
                      />
                      {option.label}
                    </motion.label>
                  ))}
                </div>
                {errors.difficultyLevel && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.difficultyLevel.message}
                  </p>
                )}
              </div>

              {/* Enjoyment Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How much did you enjoy the app? ⭐
                </label>
                {/* Lists - Star rating list */}
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star} // Keys - Unique key for each star
                      type="button"
                      // Event Management - Click handler for star rating
                      onClick={() => handleRatingClick(star)}
                      className="p-2"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star
                        size={40}
                        className={cn(
                          'transition-colors',
                          // Conditional Rendering - Star styling based on rating
                          star <= (watchedRating || selectedRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        )}
                      />
                    </motion.button>
                  ))}
                </div>
                {/* Conditional Rendering - Show error if validation fails */}
                {errors.enjoymentRating && (
                  <p className="mt-2 text-sm text-red-600 flex items-center justify-center">
                    <span className="mr-1">⚠️</span>
                    {errors.enjoymentRating.message}
                  </p>
                )}
              </div>

              {/* Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any other thoughts? (Optional) 💬
                </label>
                <textarea
                  {...register('comments')}
                  className={cn(
                    'flex min-h-[100px] w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-base placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
                    errors.comments && 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  )}
                  placeholder="Tell us what you liked most or what we could improve..."
                />
                {errors.comments && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.comments.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    ⏳
                  </motion.div>
                ) : (
                  <Send className="mr-2" size={20} />
                )}
                {isSubmitting ? 'Sending...' : 'Send Feedback! 🚀'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
