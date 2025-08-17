'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Zap, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Volume2,
  Target,
  Award,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { fruits, Fruit } from '@/data/fruits';
import { cn } from '@/lib/utils';

interface CalorieLearningGameProps {
  onComplete?: (score: number) => void;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface GameQuestion {
  type: 'guess' | 'compare' | 'category' | 'match';
  question: string;
  fruit?: Fruit;
  fruits?: Fruit[];
  correctAnswer: string | number;
  options?: (string | number)[];
  explanation: string;
}

export const CalorieLearningGame: React.FC<CalorieLearningGameProps> = ({
  onComplete,
  difficulty = 'easy'
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<GameQuestion[]>([]);
  const [celebrations, setCelebrations] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);

  // Generate questions based on difficulty
  const generateQuestions = (): GameQuestion[] => {
    const shuffledFruits = [...fruits].sort(() => Math.random() - 0.5);
    const gameQuestions: GameQuestion[] = [];

    // Question 1: Simple calorie guess (always start easy)
    const fruit1 = shuffledFruits[0];
    gameQuestions.push({
      type: 'guess',
      question: `How many calories does a ${fruit1.name.toLowerCase()} have?`,
      fruit: fruit1,
      correctAnswer: fruit1.calories,
      options: [
        fruit1.calories,
        fruit1.calories + 20,
        fruit1.calories - 15,
        fruit1.calories + 35
      ].sort(() => Math.random() - 0.5),
      explanation: `A ${fruit1.name.toLowerCase()} has ${fruit1.calories} calories! ${fruit1.funFact}`
    });

    // Question 2: Comparison
    const fruit2 = shuffledFruits[1];
    const fruit3 = shuffledFruits[2];
    const higherCalorieFruit = fruit2.calories > fruit3.calories ? fruit2 : fruit3;
    gameQuestions.push({
      type: 'compare',
      question: `Which fruit has more calories?`,
      fruits: [fruit2, fruit3],
      correctAnswer: higherCalorieFruit.name,
      options: [fruit2.name, fruit3.name],
      explanation: `${higherCalorieFruit.name} has ${higherCalorieFruit.calories} calories, while ${fruit2.name === higherCalorieFruit.name ? fruit3.name : fruit2.name} has ${fruit2.name === higherCalorieFruit.name ? fruit3.calories : fruit2.calories} calories!`
    });

    // Question 3: Energy category
    const fruit4 = shuffledFruits[3];
    const getEnergyLevel = (calories: number) => {
      if (calories <= 60) return 'Light Energy';
      if (calories <= 90) return 'Good Energy';
      return 'Lots of Energy';
    };
    gameQuestions.push({
      type: 'category',
      question: `What energy level does a ${fruit4.name.toLowerCase()} give you?`,
      fruit: fruit4,
      correctAnswer: getEnergyLevel(fruit4.calories),
      options: ['Light Energy', 'Good Energy', 'Lots of Energy'],
      explanation: `${fruit4.name} gives you "${getEnergyLevel(fruit4.calories)}" because it has ${fruit4.calories} calories!`
    });

    if (difficulty !== 'easy') {
      // Question 4: Multiple fruit matching (medium/hard)
      const fruit5 = shuffledFruits[4];
      const closeCalories = fruits.filter(f => 
        Math.abs(f.calories - fruit5.calories) <= 15 && f.id !== fruit5.id
      );
      if (closeCalories.length > 0) {
        gameQuestions.push({
          type: 'match',
          question: `Which fruit has similar calories to ${fruit5.name} (${fruit5.calories} calories)?`,
          fruit: fruit5,
          correctAnswer: closeCalories[0].name,
          options: [
            closeCalories[0].name,
            shuffledFruits[5]?.name || 'Apple',
            shuffledFruits[6]?.name || 'Banana'
          ],
          explanation: `${closeCalories[0].name} has ${closeCalories[0].calories} calories, which is very close to ${fruit5.name}'s ${fruit5.calories} calories!`
        });
      }
    }

    return gameQuestions;
  };

  useEffect(() => {
    if (gameStarted && questions.length === 0) {
      setQuestions(generateQuestions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, difficulty]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setGameComplete(false);
    setQuestions(generateQuestions());
    setCelebrations(['🎉', '⭐', '🌟', '✨', '🎊']);
  };

  const handleAnswer = (answer: string | number) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      // Add celebration emoji
      const newCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
      setCelebrations(prev => [...prev, newCelebration]);
    }

    // Auto-advance after showing result
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameComplete(true);
        onComplete?.(score + (isCorrect ? 1 : 0));
      }
    }, 3000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setQuestions([]);
  };

  const currentQ = questions[currentQuestion];

  if (!gameStarted) {
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardHeader className="text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-6xl mb-4"
          >
            🎯
          </motion.div>
          <CardTitle className="text-3xl text-blue-800 mb-2">
            Calorie Learning Game!
          </CardTitle>
          <p className="text-blue-600 text-lg">
            Learn about fruit calories in a fun, interactive way!
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Lightbulb className="text-yellow-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold text-blue-800 mb-1">Learn</h3>
              <p className="text-sm text-blue-600">
                Discover how many calories fruits have
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Target className="text-green-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold text-blue-800 mb-1">Play</h3>
              <p className="text-sm text-blue-600">
                Answer fun questions about energy
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <Award className="text-purple-500 mx-auto mb-2" size={32} />
              <h3 className="font-semibold text-blue-800 mb-1">Win</h3>
              <p className="text-sm text-blue-600">
                Earn stars for correct answers!
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-gray-700 font-medium">
              You&apos;ll answer {difficulty === 'easy' ? '3' : '4'} questions about fruit calories
            </p>
            <Button 
              onClick={startGame}
              size="lg"
              className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Star className="mr-2" size={24} />
              Start Learning!
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const performance = percentage >= 80 ? 'Amazing!' : percentage >= 60 ? 'Great job!' : 'Good try!';
    const emoji = percentage >= 80 ? '🌟' : percentage >= 60 ? '⭐' : '👍';

    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-green-200">
        <CardContent className="text-center py-8">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1, repeat: 3 }}
            className="text-8xl mb-4"
          >
            {emoji}
          </motion.div>
          
          <h2 className="text-4xl font-bold text-green-700 mb-4">
            {performance}
          </h2>
          
          <div className="bg-white rounded-xl p-6 mb-6 max-w-md mx-auto">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-green-700 font-medium">
              Questions Correct
            </p>
            <div className="mt-3">
              <div className="flex justify-center space-x-1">
                {Array.from({ length: questions.length }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    {i < score ? (
                      <Star className="text-yellow-400 fill-current" size={24} />
                    ) : (
                      <Star className="text-gray-300" size={24} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 text-lg max-w-md mx-auto">
              You learned about calories in different fruits! 
              {percentage >= 80 
                ? " You're becoming a fruit nutrition expert!" 
                : " Keep practicing to learn even more!"
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={resetGame}
                variant="primary"
                size="lg"
              >
                <RefreshCw className="mr-2" size={20} />
                Play Again
              </Button>
              <Button 
                onClick={() => window.location.href = '/learn'}
                variant="secondary"
                size="lg"
              >
                <Zap className="mr-2" size={20} />
                Explore More Fruits
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="flex items-center gap-1">
            <Trophy className="text-yellow-500" size={16} />
            <span className="font-bold text-gray-800">{score}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-800 mb-4">
                  {currentQ?.question}
                </CardTitle>

                {/* Fruit Display */}
                {currentQ?.fruit && (
                  <motion.div
                    className="text-8xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {currentQ.fruit.emoji}
                  </motion.div>
                )}

                {currentQ?.fruits && (
                  <div className="flex justify-center gap-8 mb-4">
                    {currentQ.fruits.map((fruit, index) => (
                      <motion.div
                        key={fruit.id}
                        className="text-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <div className="text-6xl mb-2">{fruit.emoji}</div>
                        <div className="font-medium text-gray-700">{fruit.name}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQ?.options?.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => handleAnswer(option)}
                        className="w-full p-6 text-lg bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 transition-all"
                      >
                        {option}
                        {typeof option === 'number' && ' calories'}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key={`result-${currentQuestion}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Card className={cn(
              "text-center",
              selectedAnswer === currentQ?.correctAnswer
                ? "bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300"
                : "bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300"
            )}>
              <CardContent className="py-8">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.8 }}
                  className="mb-4"
                >
                  {selectedAnswer === currentQ?.correctAnswer ? (
                    <CheckCircle size={80} className="text-green-500 mx-auto" />
                  ) : (
                    <XCircle size={80} className="text-red-500 mx-auto" />
                  )}
                </motion.div>

                <h3 className={cn(
                  "text-3xl font-bold mb-4",
                  selectedAnswer === currentQ?.correctAnswer ? "text-green-600" : "text-red-600"
                )}>
                  {selectedAnswer === currentQ?.correctAnswer ? "Correct! 🎉" : "Not quite! 🤔"}
                </h3>

                <div className="bg-white rounded-lg p-6 max-w-lg mx-auto">
                  <p className="text-lg text-gray-700 mb-3">
                    {currentQ?.explanation}
                  </p>
                  <div className="text-sm text-gray-600">
                    Your answer: <span className="font-medium">{selectedAnswer}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Correct answer: <span className="font-medium">{currentQ?.correctAnswer}</span>
                  </div>
                </div>

                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 text-gray-600"
                >
                  Next question coming up...
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Celebrations */}
      <AnimatePresence>
        {celebrations.length > 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {celebrations.slice(-3).map((emoji, index) => (
              <motion.div
                key={index}
                className="absolute text-4xl"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight,
                  scale: 0 
                }}
                animate={{ 
                  y: -100, 
                  scale: 1,
                  rotate: 360 
                }}
                transition={{ 
                  duration: 3, 
                  delay: index * 0.2 
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
