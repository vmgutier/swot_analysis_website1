# Phase 2: Interactive SWOT Analysis Input

## Overview

Phase 2 of the SWOT Analysis App provides an interactive, step-based interface for users to define their organizational challenge and systematically input their Strengths, Weaknesses, Opportunities, and Threats (SWOT).

## Architecture

### Components Structure

```
src/components/
├── Phase2.jsx                  # Main Phase 2 container
└── phase2/
    ├── ProgressBar.jsx         # Step progress visualization
    ├── ProblemStatement.jsx     # Step 1: Problem definition
    └── SWOTInputGrid.jsx        # Step 2: SWOT matrix input
```

### State Management

Phase 2 uses React `useState` hooks to manage:

- **currentStep**: Tracks which step the user is on (1 or 2)
- **problemStatement**: Stores the problem statement from Phase 1 or newly entered text
- **swotData**: Object containing arrays for each SWOT category
  ```javascript
  {
    strengths: ['item1', 'item2', ...],
    weaknesses: ['item1', 'item2', ...],
    opportunities: ['item1', 'item2', ...],
    threats: ['item1', 'item2', ...]
  }
  ```

## User Flow

### Step 1: Define Problem
- User enters or edits their organizational challenge
- Large, spacious text area for detailed input
- Character count displayed
- Validation: text cannot be empty before proceeding
- Keyboard shortcut: Ctrl+Enter or Cmd+Enter to submit
- Tips displayed below for guidance

### Step 2: Analyze SWOT
- Current problem statement displayed at top as reference
- 2×2 grid layout with four SWOT quadrants
- For each quadrant:
  - **Input field**: Type new SWOT item
  - **Add button**: Click or press Enter to add
  - **Items list**: Display added items with delete button (×)
  - **Count badge**: Shows number of items in category

- **Progress tracking**:
  - Individual category progress bars
  - Checkmark (✓) when item added, circle (○) when empty
  - Overall completion status

- **CTA button**: "Generate Action Plan" button
  - Enabled only when all 4 categories have at least 1 item
  - Disabled state shows visual feedback

## Features

### Interactive Elements

1. **Dynamic Input Fields**
   - Real-time input tracking
   - Press Enter to add item (or click Add button)
   - Auto-clear after adding
   - Keyboard accessible

2. **Item Management**
   - Add items to any category
   - Delete items with × button
   - Animated list item entry (staggered fade-in)
   - Empty state messaging

3. **Progress Indicators**
   - Visual progress bars for each category
   - Completion status checkmarks
   - Overall requirements message
   - Color-coded feedback

4. **Navigation**
   - Back button to return to Step 1
   - Progress bar shows current step
   - Navbar link to return to Phase 1

## Color Coding

- **Strengths**: Green (💪)
  - Background: `bg-green-50`
  - Border: `border-green-300`
  - Accent: `text-green-700`
  - Button: `bg-green-600`

- **Weaknesses**: Red (📉)
  - Background: `bg-red-50`
  - Border: `border-red-300`
  - Accent: `text-red-700`
  - Button: `bg-red-600`

- **Opportunities**: Blue (📈)
  - Background: `bg-blue-50`
  - Border: `border-blue-300`
  - Accent: `text-blue-700`
  - Button: `bg-blue-600`

- **Threats**: Orange (⚠️)
  - Background: `bg-orange-50`
  - Border: `border-orange-300`
  - Accent: `text-orange-700`
  - Button: `bg-orange-600`

## Integration with App Flow

### Entering Phase 2

1. User completes Phase 1 (Learning)
2. Clicks "Start Your Analysis" button in CTASection
3. App state updates: `currentPhase = 2`
4. Phase 2 loads with `initialChallenge` from Phase 1
5. User is taken to Step 1 (Problem Statement)

### Phase 1 to Phase 2 Connection

```javascript
// In App.jsx
const handleStartAnalysis = () => {
  setCurrentPhase(2)
}

// Challenge persists from Phase 1
<Phase2 
  initialChallenge={challenge}
  onComplete={handlePhase2Complete}
/>
```

### Returning to Phase 1

- Click logo in navbar
- Go back button on Step 2
- Both trigger `handleBackToPhase1()` which resets to Phase 1

## State Flow

```
Phase 1: User enters challenge
    ↓
[Store challenge in App state]
    ↓
User clicks "Start Your Analysis"
    ↓
Phase 2: Initialize with challenge
    ↓
Step 1: User reviews/edits problem statement
    ↓
Click "Next: Analyze SWOT"
    ↓
Step 2: User builds 2×2 SWOT matrix
    ↓
When complete: Click "Generate Action Plan"
    ↓
onComplete callback triggers with:
{
  problem: "User's problem statement",
  swot: {
    strengths: [...],
    weaknesses: [...],
    opportunities: [...],
    threats: [...]
  }
}
```

## Usage Instructions

### For Users

1. **Accessing Phase 2**:
   - Complete Phase 1 learning section
   - Click "Start Your Analysis" button

2. **Step 1: Problem Statement**:
   - Review your challenge (from Phase 1)
   - Edit if needed
   - Click "Next: Analyze SWOT" when ready

3. **Step 2: SWOT Input**:
   - Read the problem statement at top
   - For each quadrant:
     - Type an item in the input field
     - Press Enter or click "Add"
     - Repeat until satisfied
   - Track progress with the bars
   - Click "Generate Action Plan" when all quadrants have items

### For Developers

#### Adding New SWOT Categories

In `SWOTInputGrid.jsx`, modify the `swotCategories` array:

```javascript
const swotCategories = [
  {
    key: 'strengths',           // State key
    title: 'Strengths',         // Display name
    icon: '💪',                 // Emoji
    description: 'What you do well',  // Description
    color: 'green',             // Reference color
    bgColor: 'bg-green-50',     // Tailwind class
    borderColor: 'border-green-300',  // Tailwind class
    accentColor: 'text-green-700',    // Tailwind class
    buttonColor: 'bg-green-600 hover:bg-green-700'  // Tailwind class
  },
  // ... more categories
]
```

#### Customizing Validation

In `Phase2.jsx`, modify completion logic:

```javascript
const isPhase2Complete = 
  swotData.strengths.length > 0 &&
  // Add custom requirements here
```

#### Handling Form Submission

Modify `handleGenerateActionPlan()` in Phase2.jsx:

```javascript
const handleGenerateActionPlan = () => {
  const analysisData = {
    problem: problemStatement,
    swot: swotData,
    timestamp: new Date()
    // Add more data as needed
  }
  
  if (onComplete) {
    onComplete(analysisData)
  }
  
  // Future: Send to Phase 3 or save to database
}
```

## Styling & Animations

### Transitions
- Card hover: 300ms ease-in-out
- Item animations: 50ms stagger delay
- Button scale: 105% on hover, 95% on active

### Responsive Design
- **Mobile**: Single column, optimized spacing
- **Tablet**: 2-column grid
- **Desktop**: Full 2×2 grid layout

### Animations Available
- `fadeIn`: Item entry
- `slideUp`: Section entrance
- Smooth color transitions
- Progressive reveal

## Error Handling

1. **Empty Problem Statement**:
   - Shows error message: "Please describe your organizational challenge"
   - Button disabled until text entered

2. **Empty SWOT Categories**:
   - Yellow warning box displays requirement
   - "Generate Action Plan" button disabled
   - Progress bars show incomplete status

3. **Invalid Input**:
   - Whitespace automatically trimmed
   - Empty inputs ignored with silent failure
   - Character limits can be added if needed

## Future Enhancements

1. **AI Integration**: Suggest SWOT items based on problem
2. **Templates**: Pre-populated templates by industry
3. **Collaboration**: Share analysis with team members
4. **History**: Save and retrieve past analyses
5. **Export**: PDF/Excel export of completed analysis
6. **Real-time Validation**: Server-side verification

## Data Persistence

Currently, data is stored in React state. To add persistence:

```javascript
// Save to localStorage
useEffect(() => {
  localStorage.setItem('swotAnalysis', JSON.stringify({
    problem: problemStatement,
    swot: swotData
  }))
}, [problemStatement, swotData])

// Load from localStorage
useEffect(() => {
  const saved = localStorage.getItem('swotAnalysis')
  if (saved) {
    const data = JSON.parse(saved)
    setProblemStatement(data.problem)
    setSWOTData(data.swot)
  }
}, [])
```

## Testing Interactive Features

### Manual Testing Checklist

- [ ] Type in problem statement and submit
- [ ] Go back and edit problem
- [ ] Add items to each SWOT category
- [ ] Press Enter to add items (keyboard test)
- [ ] Delete items with × button
- [ ] Watch progress bars update
- [ ] Verify button disabled/enabled states
- [ ] Check responsive layout on mobile/tablet/desktop
- [ ] Test animations smooth
- [ ] Verify error messages appear
- [ ] Complete analysis and trigger onComplete

## Performance Considerations

- Input re-renders isolated to specific quadrant
- Array operations optimized with `.filter()` and `.map()`
- State updates batched where possible
- CSS animations use transforms (GPU-accelerated)
- Lazy loading ready for Phase 3 component

---

**Phase 2 is ready for testing and seamless integration with Phase 1!**
