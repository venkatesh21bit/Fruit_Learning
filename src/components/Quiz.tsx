'use client';

// Components - This file defines a complex functional component
import React, { useState } from 'react';
// Form Programming - Using react-hook-form for form management
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

// Using Newly Created Components - Importing custom UI components
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { FruitCard } from '@/components/FruitCard';

// props Validation - Importing validation schemas
import { QuizFormData, quizFormSchema } from '@/lib/validations';
import { fruits, getRandomFruit, Fruit } from '@/data/fruits';
import { progressUtils } from '@/lib/utils';

// State Management - Interface for component state
interface QuizState {
  currentFruit: Fruit;
  showResult: boolean;
  isCorrect: boolean;
  userGuess: number;
  actualCalories: number;
}

// Components - Functional component definition
// State Management Using React Hooks - Using React hooks for state
export const Quiz: React.FC = () => {
  // State Management Using React Hooks - useState hook for managing quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    currentFruit: getRandomFruit(),
    showResult: false,
    isCorrect: false,
    userGuess: 0,
    actualCalories: 0,
  });

  // Form Programming - useForm hook for form state management
  // Controlled Component - Form inputs controlled by react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<QuizFormData>({
    // props Validation - Using Zod resolver for validation
    resolver: zodResolver(quizFormSchema),
  });

  // Controlled Component - Watching form values
  const childName = watch('childName');

  // Event Management - Form submission handler
  const onSubmit = (data: QuizFormData) => {
    const actualCalories = quizState.currentFruit.calories;
    const userGuess = data.guessedCalories;
    const difference = Math.abs(actualCalories - userGuess);
    const isCorrect = difference <= 20; // Allow 20 calorie tolerance

    // State Management - Updating state with new quiz results
    setQuizState({
      ...quizState,
      showResult: true,
      isCorrect,
      userGuess,
      actualCalories,
    });

    // Update progress
    if (data.childName) {
      progressUtils.updateProgress(data.childName, isCorrect, quizState.currentFruit.id);
    }
  };

  // Event Management - Handler for starting new quiz
  const startNewQuiz = () => {
    const newFruit = getRandomFruit();
    // State Management - Resetting state for new quiz
    setQuizState({
      currentFruit: newFruit,
      showResult: false,
      isCorrect: false,
      userGuess: 0,
      actualCalories: 0,
    });
    setValue('guessedCalories', 0);
    setValue('selectedFruit', newFruit.id);
  };

  // Event Management - Handler for fruit selection
  const selectFruit = (fruit: Fruit) => {
    // State Management - Updating selected fruit
    setQuizState({ ...quizState, currentFruit: fruit });
    setValue('selectedFruit', fruit.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-gray-800 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🧠 Calorie Guessing Game 🎯
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Can you guess how many calories are in this fruit?
          </p>
        </div>

        {/* Conditional Rendering - Show different content based on quiz state */}
        <AnimatePresence mode="wait">
          {!quizState.showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Fruit Display */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  Guess the calories in this fruit:
                </h2>
                {/* Using Newly Created Components - FruitCard component with props */}
                <FruitCard 
                  fruit={quizState.currentFruit} 
                  showCalories={false}
                  className="mb-4"
                />
                
                {/* Fruit Selection */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Or choose a different fruit:
                  </h3>
                  {/* Lists - Mapping over fruits array */}
                  <div className="grid grid-cols-4 gap-2">
                    {fruits.slice(0, 8).map((fruit) => (
                      <motion.button
                        key={fruit.id} // Keys - Unique key for each list item
                        onClick={() => selectFruit(fruit)} // Event Management - Click handler for fruit selection
                        className={`p-2 rounded-lg border-2 transition-all ${
                          fruit.id === quizState.currentFruit.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl">{fruit.emoji}</div>
                        <div className="text-xs font-medium">{fruit.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quiz Form */}
              {/* Nested Components - Card component containing form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" />
                    Make Your Guess!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Form Programming - Form with validation */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Controlled Component - Input controlled by react-hook-form */}
                    <Input
                      label="Your Name"
                      placeholder="Enter your name"
                      {...register('childName')}
                      error={errors.childName?.message}
                    />

                    <input
                      type="hidden"
                      {...register('selectedFruit')}
                      value={quizState.currentFruit.id}
                    />

                    {/* Controlled Component - Number input with validation */}
                    <Input
                      label="How many calories do you think this fruit has?"
                      type="number"
                      placeholder="Enter number of calories"
                      {...register('guessedCalories', { valueAsNumber: true })}
                      error={errors.guessedCalories?.message}
                      helperText="Hint: Most fruits have between 20-150 calories"
                    />

                    {/* Using Newly Created Components - Custom Button component */}
                    <Button type="submit" className="w-full" size="lg">
                      Submit My Guess! 🎯
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <Card className="max-w-2xl mx-auto">
                <CardContent className="py-8">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    {quizState.isCorrect ? (
                      <CheckCircle size={80} className="text-green-500 mx-auto" />
                    ) : (
                      <XCircle size={80} className="text-red-500 mx-auto" />
                    )}
                  </motion.div>

                  <h2 className={`text-3xl font-bold mb-4 ${
                    quizState.isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {quizState.isCorrect ? 'Great Job! 🎉' : 'Good Try! 💪'}
                  </h2>

                  <div className="space-y-4 text-lg">
                    <p>
                      You guessed: <span className="font-bold">{quizState.userGuess} calories</span>
                    </p>
                    <p>
                      Actual calories: <span className="font-bold">{quizState.actualCalories} calories</span>
                    </p>
                    <p>
                      Difference: <span className="font-bold">
                        {Math.abs(quizState.actualCalories - quizState.userGuess)} calories
                      </span>
                    </p>
                  </div>

                  {quizState.isCorrect ? (
                    <p className="text-green-600 font-medium mt-4">
                      Amazing! You were within 20 calories! 🌟
                    </p>
                  ) : (
                    <p className="text-blue-600 font-medium mt-4">
                      Keep practicing! You&apos;re learning about healthy foods! 📚
                    </p>
                  )}

                  {childName && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Your Progress:</h3>
                      <p className="text-blue-700">
                        Accuracy: {progressUtils.getAccuracy(childName)}%
                      </p>
                    </div>
                  )}

                  <Button 
                    onClick={startNewQuiz}
                    className="mt-6"
                    size="lg"
                  >
                    <RefreshCw className="mr-2" size={20} />
                    Try Another Fruit!
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
