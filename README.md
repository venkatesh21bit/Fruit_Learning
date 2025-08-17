# 🍎 Fruit Learning App

An interactive, autism-friendly educational web application designed specifically for children to learn about fruits and their nutritional values through engaging games, quizzes, and visual learning experiences with a special focus on understanding calories and energy.

## 🌟 Features

### Educational Components
- **Interactive Fruit Cards**: Visual cards displaying fruit information with emojis, descriptions, and nutritional data
- **🆕 Interactive Calorie Learning**: New autism-friendly calorie education with visual energy displays, interactive games, and simple comparisons
- **🆕 Calorie Learning Games**: Structured learning activities with different difficulty levels designed for children with autism
- **Enhanced Calorie Guessing Game**: Improved quiz with visual energy helpers and better feedback
- **Progress Tracking**: Local storage-based system to track learning progress and accuracy
- **Comprehensive Fruit Database**: 8 different fruits with detailed nutritional information

### 🆕 NEW: Autism-Friendly Calorie Learning
- **Visual Energy Levels**: Simple color-coded system (🟢 Light, 🟡 Good, 🟠 Lots of Energy)
- **Interactive Calorie Cards**: Touch-friendly cards with hide/show functionality and sound feedback
- **Energy Comparisons**: Visual bar charts and activity comparisons (e.g., "5 minutes of walking")
- **Structured Learning Games**: Multi-level games with clear explanations and immediate feedback
- **Simple Language**: Child-friendly explanations like "energy for your body" instead of complex terms

### Autism-Friendly Design
- **Clear Visual Hierarchy**: Simple, consistent layouts with high contrast
- **Large Touch Targets**: Big buttons and interactive elements for easy navigation
- **Consistent Navigation**: Predictable menu structure and interaction patterns
- **Calming Color Palette**: Soft, non-overwhelming colors throughout the interface
- **🆕 Reduced Cognitive Load**: Simplified calorie concepts with visual aids and familiar patterns
- **🆕 Predictable Interactions**: Consistent feedback and animation patterns
- **Simple Language**: Age-appropriate, clear descriptions and instructions

### Technical Features
- **Responsive Design**: Mobile-first approach that works on all devices
- **Form Validation**: Comprehensive validation using Zod schemas
- **Smooth Animations**: Framer Motion animations for engaging interactions
- **Accessibility**: WCAG-compliant design with proper focus management
- **Performance Optimized**: Fast loading times and efficient rendering

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks with local storage persistence

## 📱 Pages and Components

### Pages
1. **Homepage** (`/`) - Welcome page with feature overview and new calorie learning highlights
2. **Learn** (`/learn`) - Browse and explore all fruits with search functionality and calorie view toggle
3. **🆕 Calories** (`/calories`) - Dedicated calorie learning hub with four interactive modes:
   - **Explore Mode**: Interactive calorie cards with visual energy displays
   - **Game Mode**: Structured learning games with multiple difficulty levels
   - **Comparison Mode**: Visual energy level comparisons and sorting
   - **Educational Content**: What are calories and why they matter
4. **Quiz** (`/quiz`) - Enhanced calorie guessing game with energy helpers and visual feedback
5. **Feedback** (`/feedback`) - Form for user feedback and ratings

### Key Components
- **Navigation** - Enhanced navigation bar with calorie learning link
- **FruitCard** - Reusable component for displaying fruit information
- **🆕 InteractiveCalorieCard** - New autism-friendly calorie display with interactive features
- **🆕 CalorieLearningGame** - Structured educational game component with multiple question types
- **Quiz** - Enhanced interactive quiz component with visual energy helpers
- **FeedbackForm** - Comprehensive feedback form with validation
- **UI Components** - Button, Input, Card components with consistent styling

## 🎯 Educational Goals

### Primary Learning Objectives
- **Fruit Recognition**: Help children identify different fruits by appearance
- **🆕 Calorie Understanding**: Teach what calories are in simple, visual terms ("energy for your body")
- **🆕 Energy Awareness**: Help children understand different energy levels in fruits through color coding
- **Nutritional Awareness**: Teach basic concepts about calories and nutrients
- **Healthy Eating**: Promote understanding of fruit benefits and natural energy sources
- **Pattern Recognition**: Develop skills through consistent interface patterns

### 🆕 Calorie Learning Objectives
- **Visual Association**: Connect colors (🟢🟡🟠) with energy levels (Light/Good/Lots)
- **Comparison Skills**: Understanding relative energy content between different fruits
- **Activity Context**: Relating calorie content to familiar activities (walking, playing, running)
- **Number Recognition**: Learning to recognize and compare calorie numbers
- **Healthy Choices**: Understanding that fruit calories are natural and beneficial

### Skill Development
- **Motor Skills**: Large touch targets and interactive elements help develop coordination
- **Reading Comprehension**: Simple, clear text improves reading skills
- **Number Recognition**: Enhanced with calorie numbers, comparisons, and energy levels
- **Memory**: Remembering fruit characteristics, nutritional information, and energy levels
- **🆕 Categorization**: Sorting fruits by energy levels and understanding groupings
- **🆕 Cause and Effect**: Understanding how food provides energy for activities

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fruit-learning-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📊 Data Structure

### Fruit Interface
```typescript
interface Fruit {
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
```

### Validation Schemas
- **Quiz Form**: Child name, fruit selection, calorie guess validation
- **Feedback Form**: Name, favorite fruit, difficulty rating, enjoyment rating
- **Progress Tracking**: Local storage-based progress with accuracy calculation

## 🎨 Design Principles

### Autism-Friendly Features
1. **Predictable Layouts**: Consistent placement of elements across all pages
2. **Clear Visual Hierarchy**: Important elements are visually prominent with consistent styling
3. **Reduced Cognitive Load**: Simple navigation with clear labeling and minimal distractions
4. **🆕 Consistent Color Coding**: Energy levels use the same colors (🟢🟡🟠) throughout the app
5. **🆕 Visual Learning Support**: Complex concepts broken down into simple visual elements
6. **Sensory Considerations**: Avoid flashing or rapidly changing elements
7. **Familiar Patterns**: Consistent interaction patterns throughout the app
8. **🆕 Immediate Feedback**: Clear, positive reinforcement for all interactions
9. **🆕 Simple Language**: Child-friendly terminology like "energy" instead of "calories"

### 🆕 Calorie Learning Design
- **Color Association**: Consistent use of green (light), yellow (good), orange (lots) for energy levels
- **Visual Metaphors**: Energy bars, activity comparisons, and familiar concepts
- **Progressive Disclosure**: Information revealed gradually to avoid overwhelming
- **Interactive Elements**: Touch to reveal, hide/show functionality, and engaging animations
- **Context-Relevant**: Connecting abstract numbers to concrete activities children understand

### Responsive Design
- **Mobile-first approach**: Optimized for touch devices
- **Flexible grid systems**: Adapts to various screen sizes
- **Touch-friendly interactions**: Large buttons and touch targets
- **Accessible navigation**: Easy-to-use menu on all devices

## 🔧 Customization

### Adding New Fruits
1. Update the `fruits` array in `src/data/fruits.ts`
2. Follow the existing `Fruit` interface structure
3. Include appropriate emoji, colors, and nutritional data
4. 🆕 Consider calorie range for proper energy level categorization

### 🆕 Customizing Calorie Learning
1. **Energy Level Thresholds**: Modify the energy categorization in `InteractiveCalorieCard.tsx`
   - Light Energy: 20-60 calories (green)
   - Good Energy: 61-90 calories (yellow) 
   - Lots of Energy: 90+ calories (orange)
2. **Activity Comparisons**: Update activity mappings in the calorie components
3. **Game Difficulty**: Adjust question types and tolerances in `CalorieLearningGame.tsx`
4. **Visual Elements**: Customize colors, animations, and feedback messages

### Modifying Validation Rules
1. Update schemas in `src/lib/validations.ts`
2. Adjust form components to match new validation rules
3. Update error messages for child-friendly language

### 🆕 Accessibility Improvements
1. **High Contrast Design**: Forced light theme with high contrast text for better visibility
2. **Dark Mode Override**: Disabled dark mode to maintain consistent, autism-friendly visual experience
3. **Color Blindness**: Energy level colors chosen for accessibility with additional text labels
4. **Font Sizes**: Large, readable fonts optimized for children with learning differences
5. **Animation Control**: Smooth, predictable animations that don't overwhelm sensory processing
6. **Audio Feedback**: Optional sound feedback with visual alternatives

### Styling Changes
1. Modify Tailwind classes in components
2. Update color schemes in `tailwind.config.js`
3. Adjust animation settings in `src/lib/utils.ts`

## 📈 Progress Tracking

The app includes enhanced local storage-based progress tracking that records:
- Number of completed quizzes and calorie learning games
- Correct answers vs. total attempts with improved accuracy calculation
- Accuracy percentage across different learning modes
- 🆕 Energy level mastery tracking (how well children understand each energy category)
- Favorite fruits based on selections and interaction patterns
- 🆕 Learning preferences (which learning modes are used most)
- Last played date and session duration
- 🆕 Calorie learning milestones and achievements

### 🆕 New Tracking Features
- **Energy Level Understanding**: Track how well children categorize fruits by energy levels
- **Game Performance**: Monitor progress across different difficulty levels
- **Interaction Patterns**: Understanding which learning methods work best for each child
- **Visual Learning Progress**: Track preference for visual vs. text-based learning

## 🤝 Contributing

Contributions are welcome! Please consider the following:
- Maintain autism-friendly design principles
- Follow existing code patterns and styling
- Test on multiple devices and screen sizes
- Ensure accessibility standards are met
- Use clear, simple language in all text

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Designed with input from autism education specialists
- Nutritional data sourced from reliable health databases
- Icons and emojis chosen for universal recognition
- Color schemes tested for accessibility compliance

## 📞 Support

For questions, suggestions, or support, please open an issue in the repository or contact the development team.

---

**Made with ❤️ for children's education and inclusive learning**
