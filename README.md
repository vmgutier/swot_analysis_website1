# SWOT Analysis Educational Web App - Part 1

A modern, interactive educational webpage for learning and understanding SWOT analysis. This is **Part 1 of a 3-part application** that teaches users what SWOT analysis is and prepares them to complete their own analysis.

## 🎯 Objective

Create a visually engaging, beginner-friendly page that teaches users what SWOT analysis is with interactive examples and hands-on learning activities.

## ✨ Features

### 1. **Hero Section**
- Eye-catching title and subtitle
- Input field for users to enter their organizational challenge
- "Start Learning" button to unlock main content
- Beautiful gradient background with animations

### 2. **What is SWOT Cards**
- 4 beautifully designed cards explaining each SWOT element:
  - **Strengths** (Green) - Internal advantages
  - **Weaknesses** (Red) - Internal limitations
  - **Opportunities** (Blue) - External growth chances
  - **Threats** (Orange) - External risks
- Hover animations and interactive transitions
- Color-coded for easy distinction

### 3. **Interactive Drag-and-Drop Section**
- Learn to categorize factors as Internal or External
- Drag items from the source list to appropriate drop zones
- Instant visual feedback (green for correct, red for incorrect)
- Progress tracking bar
- Reset functionality

### 4. **Real-World Example**
- 2x2 SWOT grid showing a practical example: "Adopting AI in a Company"
- Interactive tooltips on hover for detailed explanations
- Strategic analysis framework
- Decision-making insights

### 5. **Call-to-Action Section**
- Preview of Part 2 features
- Key takeaways from the learning
- Encouraging users to proceed to their own analysis

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation & Running

```bash
# Clone or navigate to the project directory
cd swot_analysis_website1

# Install dependencies
npm install

# Start the development server
npm run dev

# The app will open at http://localhost:3000
```

### Available Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm start        # Alias for npm run dev
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2+
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.3+
- **PostCSS**: For CSS processing
- **Fonts**: Inter & Poppins (Google Fonts)

## 📁 Project Structure

```
swot_analysis_website1/
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx          # Hero section with challenge input
│   │   ├── SWOTCards.jsx            # 4 SWOT definition cards
│   │   ├── DragDropSection.jsx      # Interactive categorization
│   │   ├── ExampleSection.jsx       # Real-world SWOT example
│   │   └── CTASection.jsx           # Call-to-action for next steps
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS config
└── README.md                        # This file
```

## 🎨 Design Features

### Color Scheme
- **Strengths**: Green (#10b981)
- **Weaknesses**: Red (#ef4444)
- **Opportunities**: Blue (#3b82f6)
- **Threats**: Orange (#f97316)

### Responsive Design
- Mobile-first approach
- Fully responsive across all screen sizes
- Touch-friendly interactive elements
- Flexbox and CSS Grid layouts

### Animations & Transitions
- Fade-in animations on scroll
- Slide-up animations for sections
- Smooth hover effects on cards
- Shake animation for incorrect items in drag-and-drop
- Smooth transitions throughout

## 💡 Learning Outcomes

By completing Part 1, users will understand:

1. ✓ What SWOT analysis is and why it matters
2. ✓ The difference between internal and external factors
3. ✓ How to categorize factors correctly
4. ✓ How to apply SWOT to real-world scenarios
5. ✓ How to use SWOT for strategic decision-making

## 🔄 User Journey

1. **Enter Challenge** → User inputs their organizational challenge
2. **Learn SWOT** → Understand each element through cards
3. **Practice Categorization** → Interactive drag-and-drop activity
4. **See Example** → Real-world SWOT analysis example
5. **Proceed to Part 2** → Ready to create their own analysis

## 📦 State Management

The app uses React's `useState` hook for:
- Storing user's challenge input
- Tracking main content visibility
- Managing drag-and-drop state
- Handling UI animations and feedback

### Data Persistence (Future Enhancement)
- localStorage support ready for saving user challenges
- Can be extended in Part 2

## 🌐 Deployment Options

### Option 1: Deploy to Vercel (Recommended)
```bash
npm run build
vercel
```

### Option 2: Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: Deploy to GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🔧 Development Tips

### Adding New Components
1. Create new component file in `src/components/`
2. Import in `App.jsx`
3. Add styling using Tailwind classes
4. Use animations defined in `tailwind.config.js`

### Modifying Colors
Edit `tailwind.config.js` under `theme.extend.colors.swot`:
```javascript
swot: {
  strength: '#10b981',
  weakness: '#ef4444',
  opportunity: '#3b82f6',
  threat: '#f97316',
}
```

### Adding Custom Fonts
Update the font import in `index.html` and `tailwind.config.js`

## 📝 Notes

- Part 1 focuses on education and learning
- Part 2 will include interactive analysis creation
- Part 3 will focus on action planning based on SWOT
- Data from Part 1 will inform Parts 2 & 3

## 🤝 Contributing

To contribute improvements:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Built with ❤️ for SWOT Analysis Education**

Part 1 of 3 | Learn → Analyze → Act