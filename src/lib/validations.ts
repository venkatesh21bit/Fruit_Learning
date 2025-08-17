// props Validation - Zod schemas for form validation
import { z } from 'zod';

// props Validation - Quiz form validation schema
export const quizFormSchema = z.object({
  childName: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  selectedFruit: z
    .string()
    .min(1, 'Please select a fruit'),
  
  guessedCalories: z
    .number()
    .min(1, 'Calories must be at least 1')
    .max(1000, 'Calories must be less than 1000'),
});

// props Validation - Feedback form validation schema
export const feedbackFormSchema = z.object({
  childName: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  favoriteFruit: z
    .string()
    .min(1, 'Please select your favorite fruit'),
  
  difficultyLevel: z
    .enum(['easy', 'medium', 'hard'], {
      message: 'Please select a difficulty level'
    }),
  
  enjoymentRating: z
    .number()
    .min(1, 'Please rate from 1 to 5')
    .max(5, 'Please rate from 1 to 5'),
  
  comments: z
    .string()
    .max(200, 'Comments must be less than 200 characters')
    .optional(),
});

// props Validation - Progress tracking schema
export const progressSchema = z.object({
  childName: z.string(),
  completedQuizzes: z.number(),
  correctAnswers: z.number(),
  totalAttempts: z.number(),
  favoriteFruits: z.array(z.string()),
  lastPlayed: z.date(),
});

// Properties (props) - TypeScript type inference from schemas
export type QuizFormData = z.infer<typeof quizFormSchema>;
export type FeedbackFormData = z.infer<typeof feedbackFormSchema>;
export type ProgressData = z.infer<typeof progressSchema>;
