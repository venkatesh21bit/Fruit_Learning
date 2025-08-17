import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Local storage utilities for progress tracking
export const storage = {
  get: (key: string) => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
      }
    }
    return null;
  },

  set: (key: string, value: unknown) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error writing to localStorage:', error);
      }
    }
  },

  remove: (key: string) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
  }
};

// Progress tracking utilities
export const progressUtils = {
  getProgress: (childName: string) => {
    return storage.get(`progress_${childName}`) || {
      childName,
      completedQuizzes: 0,
      correctAnswers: 0,
      totalAttempts: 0,
      favoriteFruits: [],
      lastPlayed: new Date().toISOString()
    };
  },

  updateProgress: (childName: string, isCorrect: boolean, fruitId: string) => {
    const progress = progressUtils.getProgress(childName);
    progress.totalAttempts += 1;
    if (isCorrect) {
      progress.correctAnswers += 1;
      progress.completedQuizzes += 1;
    }
    if (!progress.favoriteFruits.includes(fruitId)) {
      progress.favoriteFruits.push(fruitId);
    }
    progress.lastPlayed = new Date().toISOString();
    storage.set(`progress_${childName}`, progress);
    return progress;
  },

  getAccuracy: (childName: string) => {
    const progress = progressUtils.getProgress(childName);
    if (progress.totalAttempts === 0) return 0;
    return Math.round((progress.correctAnswers / progress.totalAttempts) * 100);
  }
};

// Animation variants for Framer Motion
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },

  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.3 }
  },

  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { duration: 0.4 }
  },

  bounce: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.1, 1] },
    transition: { duration: 0.3 }
  }
};
