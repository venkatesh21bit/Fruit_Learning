// Fruit data with nutritional information
// Properties (props) - Interface defining fruit data structure
// props Validation - TypeScript interface for type checking
export interface Fruit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  calories: number;
  description: string;
  nutrients: {
    vitamin: string;
    fiber: number;
    sugar: number;
  };
  funFact: string;
}

// Component Collection - Array of fruit data objects
// Lists - Fruit data that will be mapped to create components
export const fruits: Fruit[] = [
  {
    id: "apple",
    name: "Apple",
    emoji: "🍎",
    color: "bg-red-100 border-red-300",
    calories: 95,
    description: "Crunchy and sweet fruit that keeps you healthy!",
    nutrients: {
      vitamin: "Vitamin C",
      fiber: 4.4,
      sugar: 19
    },
    funFact: "An apple a day keeps the doctor away!"
  },
  {
    id: "banana",
    name: "Banana",
    emoji: "🍌",
    color: "bg-yellow-100 border-yellow-300",
    calories: 105,
    description: "Sweet and creamy fruit that gives you energy!",
    nutrients: {
      vitamin: "Vitamin B6",
      fiber: 3.1,
      sugar: 14
    },
    funFact: "Bananas are berries, but strawberries aren't!"
  },
  {
    id: "orange",
    name: "Orange",
    emoji: "🍊",
    color: "bg-orange-100 border-orange-300",
    calories: 62,
    description: "Juicy citrus fruit packed with vitamins!",
    nutrients: {
      vitamin: "Vitamin C",
      fiber: 3.1,
      sugar: 12
    },
    funFact: "Oranges can help you stay healthy and strong!"
  },
  {
    id: "grape",
    name: "Grapes",
    emoji: "🍇",
    color: "bg-purple-100 border-purple-300",
    calories: 62,
    description: "Small, sweet fruits that come in bunches!",
    nutrients: {
      vitamin: "Vitamin K",
      fiber: 0.9,
      sugar: 16
    },
    funFact: "Grapes come in over 8,000 different varieties!"
  },
  {
    id: "strawberry",
    name: "Strawberry",
    emoji: "🍓",
    color: "bg-red-100 border-red-300",
    calories: 49,
    description: "Sweet, red fruit with tiny seeds on the outside!",
    nutrients: {
      vitamin: "Vitamin C",
      fiber: 3,
      sugar: 7
    },
    funFact: "Strawberries are the only fruit with seeds on the outside!"
  },
  {
    id: "pineapple",
    name: "Pineapple",
    emoji: "🍍",
    color: "bg-yellow-100 border-yellow-300",
    calories: 82,
    description: "Tropical fruit with a spiky outside and sweet inside!",
    nutrients: {
      vitamin: "Vitamin C",
      fiber: 2.3,
      sugar: 16
    },
    funFact: "Pineapples take about 2 years to grow!"
  },
  {
    id: "watermelon",
    name: "Watermelon",
    emoji: "🍉",
    color: "bg-green-100 border-green-300",
    calories: 46,
    description: "Juicy fruit that's mostly water - perfect for hot days!",
    nutrients: {
      vitamin: "Vitamin A",
      fiber: 0.6,
      sugar: 9
    },
    funFact: "Watermelons are 92% water!"
  },
  {
    id: "peach",
    name: "Peach",
    emoji: "🍑",
    color: "bg-orange-100 border-orange-300",
    calories: 58,
    description: "Soft, fuzzy fruit with a sweet taste!",
    nutrients: {
      vitamin: "Vitamin A",
      fiber: 2.3,
      sugar: 13
    },
    funFact: "Peaches are related to roses!"
  }
];

// State Management API - Utility function for random selection
export const getRandomFruit = (): Fruit => {
  // Lists - Selecting random item from fruits array
  return fruits[Math.floor(Math.random() * fruits.length)];
};

// State Management API - Utility function for finding by ID
export const getFruitById = (id: string): Fruit | undefined => {
  // Lists - Finding specific item in fruits array
  return fruits.find(fruit => fruit.id === id);
};
